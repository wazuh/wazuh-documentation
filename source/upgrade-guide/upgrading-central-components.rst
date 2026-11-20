.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to upgrade the Wazuh central components, including the indexer, server, and dashboard, for all-in-one and multi-node deployments.

Wazuh central components
========================

This section guides you through the upgrade process of the Wazuh indexer, the Wazuh server, and the Wazuh dashboard.

-  **All-in-one deployments:** Execute all commands and configuration actions on the same node since all components run on a single system.
-  **Multi-node cluster deployments:** Run commands and apply configurations on the respective node where the component being upgraded is located.

.. note::

   Since Wazuh 5.0, the following Rootcheck configuration options and database files have been removed:

   - **File check options:** ``<check_files>``, ``<rootkit_files>``, and the database file ``rootkit_files.txt``.
   - **Trojan scan options:** ``<check_trojans>``, ``<rootkit_trojans>``, and the database file ``rootkit_trojans.txt``.
   - **Policy check options:** ``<check_unixaudit>``, ``<check_winaudit>``, ``<check_winapps>``, ``<check_winmalware>``, and the database files ``system_audit_rcl.txt``, ``system_audit_ssh.txt``, ``win_applications_rcl.txt``, ``win_audit_rcl.txt``, and ``win_malware_rcl.txt``.

   These functionalities overlap with, or are replaced by, the Security Configuration Assessment (SCA) and File Integrity Monitoring (FIM) capabilities. If any of these options are configured in your ``ossec.conf`` file, remove them before upgrading to avoid configuration parsing warnings.

.. _preparing-the-upgrade:

Preparing the upgrade
---------------------

Perform the steps below before upgrading any of the Wazuh components. In case Wazuh is installed in a multi-node cluster configuration, repeat the following steps for every node.

#. Ensure you have added the Wazuh repository to every Wazuh indexer, server, and dashboard node before proceeding to perform the upgrade actions.

   .. tabs::
      
      .. group-tab:: Yum
      
         .. include:: /_templates/installations/common/yum/add-repository.rst
      
      .. group-tab:: APT
      
         .. include:: /_templates/installations/common/deb/add-repository.rst

#. (Recommended) Export customizations from the Wazuh dashboard. This step helps to preserve visualizations, dashboards, and other saved objects in case there are any issues during the upgrade process.

   #. Navigate to **Dashboard management** > **Dashboards Management** > **Saved objects** on the Wazuh dashboard.
   #. Select which objects to export and click **Export**, or click **Export all objects** to export everything.

   .. image:: /images/upgrade-guide/saved-objects-export.png
      :alt: Wazuh dashboard Saved objects page with an index pattern selected and the Export and Export all objects buttons highlighted

#. Stop the Wazuh dashboard service if installed in the node:

   .. tabs::

      .. tab:: Systemd

         .. code-block:: console

            # systemctl stop wazuh-dashboard

      .. tab:: SysV init

         .. code-block:: console

            # service wazuh-dashboard stop

Upgrading the Wazuh indexer
---------------------------

The Wazuh indexer cluster remains operational throughout the upgrade. The rolling upgrade process allows nodes to be updated one at a time, ensuring continuous service availability and minimizing disruptions. The steps detailed in the following sections apply to both single-node and multi-node Wazuh indexer clusters.

Preparing the Wazuh indexer cluster for upgrade
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on any of the Wazuh indexer nodes replacing ``<WAZUH_INDEXER_IP_ADDRESS>`` and ``<USERNAME>``. Enter the password of ``<USERNAME>`` when prompted.

#. Backup the existing Wazuh indexer security configuration files:

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh --options "-backup /etc/wazuh-indexer/opensearch-security -icl -nhnv"

   .. code-block:: none
      :class: output

      Security Admin v7
      Will connect to 127.0.0.1:9200 ... done
      Connected as "CN=admin,OU=Wazuh,O=Wazuh,L=California,C=US"
      OpenSearch Version: 3.6.0
      Contacting opensearch cluster 'opensearch' and wait for YELLOW clusterstate ...
      Clustername: wazuh-cluster
      Clusterstate: GREEN
      Number of nodes: 1
      Number of data nodes: 1
      .opendistro_security index already exists, so we do not need to create one.
      Will retrieve '/config' into /etc/wazuh-indexer/opensearch-security/config.yml
         SUCC: Configuration for 'config' stored in /etc/wazuh-indexer/opensearch-security/config.yml
      Will retrieve '/roles' into /etc/wazuh-indexer/opensearch-security/roles.yml
         SUCC: Configuration for 'roles' stored in /etc/wazuh-indexer/opensearch-security/roles.yml
      Will retrieve '/rolesmapping' into /etc/wazuh-indexer/opensearch-security/roles_mapping.yml
         SUCC: Configuration for 'rolesmapping' stored in /etc/wazuh-indexer/opensearch-security/roles_mapping.yml
      Will retrieve '/internalusers' into /etc/wazuh-indexer/opensearch-security/internal_users.yml
         SUCC: Configuration for 'internalusers' stored in /etc/wazuh-indexer/opensearch-security/internal_users.yml
      Will retrieve '/actiongroups' into /etc/wazuh-indexer/opensearch-security/action_groups.yml
         SUCC: Configuration for 'actiongroups' stored in /etc/wazuh-indexer/opensearch-security/action_groups.yml
      Will retrieve '/tenants' into /etc/wazuh-indexer/opensearch-security/tenants.yml
         SUCC: Configuration for 'tenants' stored in /etc/wazuh-indexer/opensearch-security/tenants.yml
      Will retrieve '/nodesdn' into /etc/wazuh-indexer/opensearch-security/nodes_dn.yml
         SUCC: Configuration for 'nodesdn' stored in /etc/wazuh-indexer/opensearch-security/nodes_dn.yml
      Will retrieve '/allowlist' into /etc/wazuh-indexer/opensearch-security/allowlist.yml
         SUCC: Configuration for 'allowlist' stored in /etc/wazuh-indexer/opensearch-security/allowlist.yml
      Will retrieve '/audit' into /etc/wazuh-indexer/opensearch-security/audit.yml
         SUCC: Configuration for 'audit' stored in /etc/wazuh-indexer/opensearch-security/audit.yml

#. Disable shard replication to prevent shard replicas from being created while Wazuh indexer nodes are being taken offline for the upgrade.

   .. code-block:: bash

      curl -X PUT "https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cluster/settings"  -u <USERNAME> -k -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": "primaries"
        }
      }
      '

   .. code-block:: json
      :class: output

      {
        "acknowledged" : true,
        "persistent" : {
          "cluster" : {
            "routing" : {
              "allocation" : {
                "enable" : "primaries"
              }
            }
          }
        },
        "transient" : {}
      }

#. Perform a flush operation on the cluster to commit transaction log entries to the index.

   .. code-block:: console

      # curl -X POST "https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_flush" -u <USERNAME> -k

   .. code-block:: json
      :class: output

      {
         "_shards" : {
            "total" : 19,
            "successful" : 19,
            "failed" : 0
         }
      }

#. Run the following command on the Wazuh manager node(s) if running a single-node Wazuh indexer cluster.

   .. tabs::

      .. tab:: Systemd

         .. code-block:: console

            # systemctl stop wazuh-manager

      .. tab:: SysV init

         .. code-block:: console

            # service wazuh-manager stop

Upgrading the Wazuh indexer nodes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on each Wazuh indexer node to upgrade them. Upgrade nodes with the ``cluster_manager`` role last to maintain cluster connectivity among online nodes.

.. note::

   You can check the role of Wazuh indexer nodes in the cluster using the following command:

   .. code-block:: console

      # curl -k -u <USERNAME> https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cat/nodes?v

#. Stop the Wazuh indexer service.

   .. tabs::

      .. tab:: Systemd

         .. code-block:: console

            # systemctl stop wazuh-indexer

      .. tab:: SysV init

         .. code-block:: console

            # service wazuh-indexer stop

#. Backup the ``/etc/wazuh-indexer/jvm.options`` file to preserve your custom JVM settings. Create a copy of the file using the following command:

   .. code-block:: console

      # cp /etc/wazuh-indexer/jvm.options /etc/wazuh-indexer/jvm.options.old

#. Upgrade the Wazuh indexer to the latest version.

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum upgrade wazuh-indexer|WAZUH_INDEXER_RPM_PKG_INSTALL|

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install wazuh-indexer|WAZUH_INDEXER_DEB_PKG_INSTALL|

         .. note::

            When prompted, choose to replace the ``/etc/wazuh-indexer/jvm.options`` file with the updated version.

            If prompted about the ``/etc/wazuh-indexer/opensearch.yml`` file, keep your current version. Replacing it removes the node and certificate settings of your installation.

#. Manually reapply any custom settings to the ``/etc/wazuh-indexer/jvm.options`` file from your backup file.

#. Restart the Wazuh indexer service.

   .. include:: /_templates/installations/indexer/common/enable_indexer.rst

Repeat steps 1 to 5 above on all Wazuh indexer nodes before proceeding to the :ref:`post-upgrade actions <post-upgrade-actions>`.

.. _post-upgrade-actions:

Post-upgrade actions
^^^^^^^^^^^^^^^^^^^^

Perform the following steps on any of the Wazuh indexer nodes replacing ``<WAZUH_INDEXER_IP_ADDRESS>`` and ``<USERNAME>``. Enter the password of ``<USERNAME>`` when prompted.

#. Run the ``indexer-security-init.sh`` script to apply the security configuration files from backup into the new Wazuh indexer:

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh

   .. code-block:: none
      :class: output

      Security Admin v7
      Will connect to 127.0.0.1:9200 ... done
      Connected as "CN=admin,OU=Wazuh,O=Wazuh,L=California,C=US"
      OpenSearch Version: 3.6.0
      Contacting opensearch cluster 'opensearch' and wait for YELLOW clusterstate ...
      Clustername: wazuh-cluster
      Clusterstate: GREEN
      Number of nodes: 1
      Number of data nodes: 1
      .opendistro_security index already exists, so we do not need to create one.
      Populate config from /etc/wazuh-indexer/opensearch-security/
      Will update '/config' with /etc/wazuh-indexer/opensearch-security/config.yml
         SUCC: Configuration for 'config' created or updated
      Will update '/roles' with /etc/wazuh-indexer/opensearch-security/roles.yml
         SUCC: Configuration for 'roles' created or updated
      Will update '/rolesmapping' with /etc/wazuh-indexer/opensearch-security/roles_mapping.yml
         SUCC: Configuration for 'rolesmapping' created or updated
      Will update '/internalusers' with /etc/wazuh-indexer/opensearch-security/internal_users.yml
         SUCC: Configuration for 'internalusers' created or updated
      Will update '/actiongroups' with /etc/wazuh-indexer/opensearch-security/action_groups.yml
         SUCC: Configuration for 'actiongroups' created or updated
      Will update '/tenants' with /etc/wazuh-indexer/opensearch-security/tenants.yml
         SUCC: Configuration for 'tenants' created or updated
      Will update '/nodesdn' with /etc/wazuh-indexer/opensearch-security/nodes_dn.yml
         SUCC: Configuration for 'nodesdn' created or updated
      Will update '/audit' with /etc/wazuh-indexer/opensearch-security/audit.yml
         SUCC: Configuration for 'audit' created or updated
      Will update '/allowlist' with /etc/wazuh-indexer/opensearch-security/allowlist.yml
         SUCC: Configuration for 'allowlist' created or updated
      SUCC: Expected 9 config types for node {"updated_config_types":["allowlist","tenants","rolesmapping","nodesdn","audit","roles","actiongroups","config","internalusers"],"updated_config_size":9,"message":null} is 9 (["allowlist","tenants","rolesmapping","nodesdn","audit","roles","actiongroups","config","internalusers"]) due to: null
      Done with success

#. Check that the newly upgraded Wazuh indexer nodes are in the cluster.

   .. code-block:: console

      # curl -k -u <USERNAME> https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cat/nodes?v

#. Re-enable shard allocation.

   .. code-block:: bash

      curl -X PUT "https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cluster/settings" -u <USERNAME> -k -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": "all"
        }
      }
      '

   .. code-block:: json
      :class: output

      {
        "acknowledged" : true,
        "persistent" : {
          "cluster" : {
            "routing" : {
              "allocation" : {
                "enable" : "all"
              }
            }
          }
        },
        "transient" : {}
      }

#. Check the status of the Wazuh indexer cluster again to see if the shard allocation has finished. The allocation is complete when ``status`` is ``green`` and ``relocating_shards``, ``initializing_shards``, and ``unassigned_shards`` are ``0``.

   .. code-block:: console

      # curl -k -u <USERNAME> "https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cluster/health?pretty"

   .. code-block:: json
      :class: output

      {
        "cluster_name" : "wazuh-cluster",
        "status" : "green",
        "timed_out" : false,
        "number_of_nodes" : 3,
        "number_of_data_nodes" : 3,
        "discovered_master" : true,
        "discovered_cluster_manager" : true,
        "active_primary_shards" : 30,
        "active_shards" : 60,
        "relocating_shards" : 0,
        "initializing_shards" : 0,
        "unassigned_shards" : 0,
        "delayed_unassigned_shards" : 0,
        "number_of_pending_tasks" : 0,
        "number_of_in_flight_fetch" : 0,
        "task_max_waiting_in_queue_millis" : 0,
        "active_shards_percent_as_number" : 100.0
      }

.. note::

   Note that the upgrade process doesn't update plugins installed manually. Outdated plugins might cause the upgrade to fail.

   #. Run the following command on each Wazuh indexer node to list installed plugins and identify those that require an update:

      .. code-block:: console

         # /usr/share/wazuh-indexer/bin/opensearch-plugin list

      In the output, plugins that require an update will be labeled as "outdated".

   #. Remove the outdated plugins and reinstall the latest version replacing ``<PLUGIN_NAME>`` with the name of the plugin:

      .. code-block:: console

         # /usr/share/wazuh-indexer/bin/opensearch-plugin remove <PLUGIN_NAME>
         # /usr/share/wazuh-indexer/bin/opensearch-plugin install <PLUGIN_NAME>

.. _upgrading_wazuh_server:

Upgrading the Wazuh server
--------------------------

When upgrading a multi-node Wazuh manager cluster, run the upgrade in every node. Start with the master node to reduce server downtime.

.. _upgrading_wazuh_manager:

Upgrading the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Upgrade the Wazuh manager to the latest version:

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum upgrade wazuh-manager|WAZUH_MANAGER_RPM_PKG_INSTALL|

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install wazuh-manager|WAZUH_MANAGER_DEB_PKG_INSTALL|

   .. note::

      If the ``/etc/wazuh-manager/wazuh-manager.conf`` configuration file was modified, it will not be replaced by the upgrade. You will therefore have to add the settings of the new capabilities manually. More information can be found in the :doc:`/user-manual/index`.

#. Run the following command on the Wazuh manager node(s) to start the Wazuh manager service if you stopped it earlier:

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl daemon-reload
            # systemctl enable wazuh-manager
            # systemctl start wazuh-manager

      .. group-tab:: SysV init

         .. code-block:: console

            # service wazuh-manager start

Upgrading the Wazuh dashboard
-----------------------------

#. Back up the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` and ``/etc/wazuh-dashboard/node.options`` files to save your settings. For example, create a copy of the files using the following commands:

   .. code-block:: console

      # cp /etc/wazuh-dashboard/opensearch_dashboards.yml /etc/wazuh-dashboard/opensearch_dashboards.yml.old
      # cp /etc/wazuh-dashboard/node.options /etc/wazuh-dashboard/node.options.old

#. Upgrade the Wazuh dashboard.

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum upgrade wazuh-dashboard|WAZUH_DASHBOARD_RPM_PKG_INSTALL|

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install wazuh-dashboard|WAZUH_DASHBOARD_DEB_PKG_INSTALL|

         .. note::

            When prompted, choose to replace the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` and ``/etc/wazuh-dashboard/node.options`` files with the updated versions.

#. Manually reapply any configuration changes to the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` and ``/etc/wazuh-dashboard/node.options`` files. Ensure that the values of ``server.ssl.key`` and ``server.ssl.certificate`` match the files located in ``/etc/wazuh-dashboard/certs/``.

#. Restart the Wazuh dashboard:

   .. include:: /_templates/installations/dashboard/enable_dashboard.rst

   You can now access the Wazuh dashboard via:  ``https://<DASHBOARD_IP_ADDRESS>/app/wz-home``.


#. Import the saved customizations exported while :ref:`preparing the upgrade <preparing-the-upgrade>`.

   #. Navigate to **Dashboard management** > **Dashboards Management** > **Saved objects** on the Wazuh dashboard.
   #. Click **Import**, add the ndjson file and click **Import**.

.. note::

   Note that the upgrade process doesn't update plugins installed manually. Outdated plugins might cause the upgrade to fail.

   #. Run the following command on the Wazuh dashboard server to list installed plugins and identify those that require an update:

      .. code-block:: console

         # sudo -u wazuh-dashboard /usr/share/wazuh-dashboard/bin/opensearch-dashboards-plugin list

      In the output, plugins that require an update will be labeled as "outdated".

   #. Remove the outdated plugins and reinstall the latest version replacing ``<PLUGIN_NAME>`` with the name of the plugin:

      .. code-block:: console

         # sudo -u wazuh-dashboard /usr/share/wazuh-dashboard/bin/opensearch-dashboards-plugin remove <PLUGIN_NAME>
         # sudo -u wazuh-dashboard /usr/share/wazuh-dashboard/bin/opensearch-dashboards-plugin install <PLUGIN_NAME>

.. note::

   **Recommended Action**: Disable Wazuh Updates.

   We recommend disabling the Wazuh package repositories after upgrade to prevent accidental upgrades that could break the environment.

   Execute the following command to disable the Wazuh repository:

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

      .. group-tab:: APT (Debian/Ubuntu)

         .. code-block:: console

            # sed -i "s/^deb /#deb /" /etc/apt/sources.list.d/wazuh.list
            # apt update

Next steps
----------

The Wazuh server, indexer, and dashboard are now successfully upgraded. You can verify the versions by running the following commands on the node(s) where the central components are installed:

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         # yum list installed wazuh-indexer
         # yum list installed wazuh-manager
         # yum list installed wazuh-dashboard

   .. group-tab:: APT

      .. code-block:: console

         # apt list --installed wazuh-indexer
         # apt list --installed wazuh-manager
         # apt list --installed wazuh-dashboard
   
Next, upgrade the Wazuh agents by following the instructions in :doc:`Upgrading the Wazuh agent </upgrade-guide/wazuh-agent/index>`.
