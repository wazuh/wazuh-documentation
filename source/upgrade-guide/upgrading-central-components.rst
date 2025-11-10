.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to upgrade the Wazuh central components, including the indexer, server, and dashboard, for all-in-one and multi-node deployments.

Wazuh central components
========================

This section guides you through the upgrade process of the Wazuh indexer, the Wazuh server, and the Wazuh dashboard.

-  **All-in-one deployments:** Execute all commands and configuration actions on the same node since all components run on a single system.
-  **Multi-node cluster deployments:** Run commands and apply configurations on the respective node where the component being upgraded is located.

.. warning::

   Downgrading to version 4.11 and earlier is not possible. Since version 4.12.0, Wazuh uses a newer version of Apache Lucene.

   Apache Lucene does not support downgrades, meaning once you upgrade to Wazuh 4.12.0 or later, you cannot roll back to 4.11 and earlier versions without a fresh installation of the indexer.

   To avoid data loss, create an :ref:`index snapshot <migrating_indices_take_snapshots>` before upgrading. For more details, refer to the `Opensearch documentation <https://opensearch.org/docs/latest/install-and-configure/upgrade-opensearch/rolling-upgrade/>`__.

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

#. Stop the Filebeat and Wazuh dashboard services if installed in the node:

   .. tabs::

      .. tab:: Systemd

         .. code-block:: console

            # systemctl stop filebeat
            # systemctl stop wazuh-dashboard

      .. tab:: SysV init

         .. code-block:: console

            # service filebeat stop
            # service wazuh-dashboard stop

Upgrading the Wazuh indexer
---------------------------

The Wazuh indexer cluster remains operational throughout the upgrade. The rolling upgrade process allows nodes to be updated one at a time, ensuring continuous service availability and minimizing disruptions. The steps detailed in the following sections apply to both single-node and multi-node Wazuh indexer clusters.

Preparing the Wazuh indexer cluster for upgrade
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on any of the Wazuh indexer nodes replacing ``<WAZUH_INDEXER_IP_ADDRESS>``, ``<USERNAME>``, and ``<PASSWORD>``.

#. Backup the existing Wazuh indexer security configuration files:

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh --options "-backup /etc/wazuh-indexer/opensearch-security -icl -nhnv"

   .. code-block:: none
      :class: output

      Security Admin v7
      Will connect to 127.0.0.1:9200 ... done
      Connected as "CN=admin,OU=Wazuh,O=Wazuh,L=California,C=US"
      OpenSearch Version: 2.19.2
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
      Will retrieve '/whitelist' into /etc/wazuh-indexer/opensearch-security/whitelist.yml
         SUCC: Configuration for 'whitelist' stored in /etc/wazuh-indexer/opensearch-security/whitelist.yml
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

#. Manually reapply any custom settings to the ``/etc/wazuh-indexer/jvm.options`` file from your backup file.

#. Restart the Wazuh indexer service.

   .. include:: /_templates/installations/indexer/common/enable_indexer.rst

Repeat steps 1 to 5 above on all Wazuh indexer nodes before proceeding to the :ref:`post-upgrade actions <post-upgrade-actions>`.

.. _post-upgrade-actions:

Post-upgrade actions
^^^^^^^^^^^^^^^^^^^^

Perform the following steps on any of the Wazuh indexer nodes replacing ``<WAZUH_INDEXER_IP_ADDRESS>``, ``<USERNAME>``, and ``<PASSWORD>``.

#. Run the ``indexer-security-init.sh`` script to apply the security configuration files from backup into the new Wazuh indexer:

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh

   .. code-block:: none
      :class: output

      Security Admin v7
      Will connect to 127.0.0.1:9200 ... done
      Connected as "CN=admin,OU=Wazuh,O=Wazuh,L=California,C=US"
      OpenSearch Version: 2.19.3
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
      Will update '/whitelist' with /etc/wazuh-indexer/opensearch-security/whitelist.yml
         SUCC: Configuration for 'whitelist' created or updated
      Will update '/audit' with /etc/wazuh-indexer/opensearch-security/audit.yml
         SUCC: Configuration for 'audit' created or updated
      Will update '/allowlist' with /etc/wazuh-indexer/opensearch-security/allowlist.yml
         SUCC: Configuration for 'allowlist' created or updated
      SUCC: Expected 10 config types for node {"updated_config_types":["allowlist","tenants","rolesmapping","nodesdn","audit","roles","whitelist","actiongroups","config","internalusers"],"updated_config_size":10,"message":null} is 10 (["allowlist","tenants","rolesmapping","nodesdn","audit","roles","whitelist","actiongroups","config","internalusers"]) due to: null
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

#. Check the status of the Wazuh indexer cluster again to see if the shard allocation has finished.

   .. code-block:: console

      # curl -k -u <USERNAME> https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cat/nodes?v

   .. code-block:: console
      :class: output

      ip         heap.percent ram.percent cpu load_1m load_5m load_15m node.role node.roles                                        cluster_manager name
      172.18.0.3           34          86  32    6.67    5.30     2.53 dimr      cluster_manager,data,ingest,remote_cluster_client -               wazuh2.indexer
      172.18.0.4           21          86  32    6.67    5.30     2.53 dimr      cluster_manager,data,ingest,remote_cluster_client *               wazuh1.indexer
      172.18.0.2           16          86  32    6.67    5.30     2.53 dimr      cluster_manager,data,ingest,remote_cluster_client -               wazuh3.indexer

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

When upgrading a multi-node Wazuh manager cluster, run the upgrade in every node. Start with the master node to reduce server downtime. To successfully upgrade the Wazuh server, follow these steps in order:

#. :ref:`Upgrade the Wazuh manager <upgrading_wazuh_manager>`.
#. :ref:`Configure the vulnerability detection <configuring_vulnerability_detection>`. (if required based on the version you are upgrading from).
#. :ref:`Configure Filebeat <configuring_filebeat>`.

.. note::

   Upgrading from Wazuh 4.2.x or lower creates the ``wazuh`` operating system user and group to replace ``ossec``. To avoid upgrade conflicts, make sure that the ``wazuh`` user and group are not present in your operating system.

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

   .. warning::

      If the ``/var/ossec/etc/ossec.conf`` configuration file was modified, it will not be replaced by the upgrade. You will therefore have to add the settings of the new capabilities manually. More information can be found in the :doc:`/user-manual/index`.

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

Configuring CDB lists
^^^^^^^^^^^^^^^^^^^^^

When upgrading from Wazuh 4.12.x or earlier, follow these steps to configure the newly added CDB lists.

#. Edit the ``/var/ossec/etc/ossec.conf`` file and update the ``<ruleset>`` block with the CDB lists highlighted below. 

   .. code-block:: xml
      :emphasize-lines: 9-11

      <ruleset>
          <!-- Default ruleset -->
          <decoder_dir>ruleset/decoders</decoder_dir>
          <rule_dir>ruleset/rules</rule_dir>
          <rule_exclude>0215-policy_rules.xml</rule_exclude>
          <list>etc/lists/audit-keys</list>
          <list>etc/lists/amazon/aws-eventnames</list>
          <list>etc/lists/security-eventchannel</list>
          <list>etc/lists/malicious-ioc/malware-hashes</list>
          <list>etc/lists/malicious-ioc/malicious-ip</list>
          <list>etc/lists/malicious-ioc/malicious-domains</list>
          <!-- User-defined ruleset -->
          <decoder_dir>etc/decoders</decoder_dir>
          <rule_dir>etc/rules</rule_dir>
      </ruleset>

#. Restart the Wazuh manager to apply the configuration changes

   .. include:: /_templates/common/restart_manager.rst

.. _configuring_vulnerability_detection:

Configuring the vulnerability detection and indexer connector
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh Inventory Harvester and Vulnerability Detection modules rely on the :doc:`indexer connector </user-manual/reference/ossec-conf/indexer>` setting to forward system inventory data and detected vulnerabilities to the Wazuh indexer.

If upgrading from version 4.8.x or later, skip the vulnerability detection and indexer connector configurations and proceed to :ref:`configuring_filebeat`. No action is needed as the vulnerability detection and indexer connector blocks are already configured.

When upgrading from Wazuh version 4.7.x or earlier, follow these steps to configure the vulnerability detection and indexer connector blocks.

#. Update the configuration file

   Edit the ``/var/ossec/etc/ossec.conf`` file to include the new ``<vulnerability-detection>`` block. Remove the old ``<vulnerability-detector>`` block if it exists.

   The updated configuration enables the Wazuh Vulnerability Detection module to index vulnerabilities and alerts, with the vulnerability feed refreshing every 60 minutes. Add the following block to the configuration file:

   .. code-block:: xml

      <vulnerability-detection>
         <enabled>yes</enabled>
         <index-status>yes</index-status>
         <feed-update-interval>60m</feed-update-interval>
      </vulnerability-detection>

#. Configure the indexer block

   #. Ensure the ``<indexer>`` block contains the details of your Wazuh indexer host. During the upgrade, a default ``<indexer>`` configuration is added under ``<ossec_conf>`` if none exists in ``/var/ossec/etc/ossec.conf``. By default, the configuration includes one host with the IP address ``0.0.0.0``:

      .. code-block:: xml
         :emphasize-lines: 4

         <indexer>
            <enabled>yes</enabled>
            <hosts>
               <host>https://0.0.0.0:9200</host>
            </hosts>
            <ssl>
               <certificate_authorities>
                  <ca>/etc/filebeat/certs/root-ca.pem</ca>
               </certificate_authorities>
               <certificate>/etc/filebeat/certs/filebeat.pem</certificate>
               <key>/etc/filebeat/certs/filebeat-key.pem</key>
            </ssl>
         </indexer>

      Replace ``0.0.0.0`` with the IP address or hostname of your Wazuh indexer node. You can find this value in the Filebeat configuration file at ``/etc/filebeat/filebeat.yml``. Ensure that the ``<certificate>`` and ``<key>`` names match the files located in ``/etc/filebeat/certs/``.

   #. If using a Wazuh indexer cluster, add a ``<host>`` entry in the Wazuh manager ``/var/ossec/etc/ossec.conf`` file for each node in the cluster. For example, for a two-node configuration:

      .. code-block:: xml

         <hosts>
            <host>https://10.0.0.1:9200</host>
            <host>https://10.0.0.2:9200</host>
         </hosts>

      The Wazuh server will prioritize reporting to the first indexer node in the list and switch to the next available node if it becomes unavailable.

#. Store Wazuh indexer credentials

   Save the Wazuh indexer username and password into the Wazuh manager keystore using the :doc:`Wazuh-keystore </user-manual/reference/tools/wazuh-keystore>` tool:

   .. code-block:: console

      # echo '<INDEXER_USERNAME>' | /var/ossec/bin/wazuh-keystore -f indexer -k username
      # echo '<INDEXER_PASSWORD>' | /var/ossec/bin/wazuh-keystore -f indexer -k password

   If you have forgotten your Wazuh indexer password, refer to the :doc:`password management guide </user-manual/user-administration/password-management>` to reset it.

#. Restart the Wazuh manager to apply the configuration changes

   .. include:: /_templates/common/restart_manager.rst

.. _configuring_filebeat:

Configuring Filebeat
^^^^^^^^^^^^^^^^^^^^

When upgrading Wazuh, you must also update the Wazuh Filebeat module and the alerts template to ensure compatibility with the latest Wazuh indexer version. Follow these steps to configure Filebeat properly:

#. Download the Wazuh module for Filebeat:

   .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.4.tar.gz | sudo tar -xvz -C /usr/share/filebeat/module

#. Download the alerts template:

   .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_CURRENT|/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Backup the ``/etc/filebeat/filebeat.yml`` file to preserve your custom Filebeat configuration settings. Create a copy of the file using the following command:

   .. code-block:: console

      # cp /etc/filebeat/filebeat.yml  /etc/filebeat/filebeat.yml.old

#. Upgrade Filebeat to the latest version:

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum upgrade filebeat

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install filebeat

#. Restore your custom Filebeat configuration settings:

   .. code-block:: console

      # cp /etc/filebeat/filebeat.yml.old  /etc/filebeat/filebeat.yml

#. Restart Filebeat:

   .. include:: /_templates/installations/basic/elastic/common/enable_filebeat.rst

#. Upload the new Wazuh template and pipelines for Filebeat:

   .. code-block:: console

      # filebeat setup --pipelines
      # filebeat setup --index-management -E output.logstash.enabled=false

#. If you are upgrading from Wazuh versions v4.8.x or v4.9.x, manually update the ``wazuh-states-vulnerabilities-*`` mappings using the following command. Replace ``<WAZUH_INDEXER_IP_ADDRESS>``, ``<USERNAME>``, and ``<PASSWORD>`` with the values applicable to your deployment.

   Skip this step if upgrading from other versions.

   .. code-block:: bash

      curl -X PUT "https://<WAZUH_INDEXER_IP_ADDRESS>:9200/wazuh-states-vulnerabilities-*/_mapping"  -u <USERNAME> -k -H 'Content-Type: application/json' -d'
      {
        "properties": {
          "vulnerability": {
            "properties": {
              "under_evaluation": {
                "type": "boolean"
              },
              "scanner": {
                "properties": {
                  "source": {
                    "type": "keyword",
                    "ignore_above": 1024
                  }
                }
              }
            }
          }
        }
      }
      '

Upgrading the Wazuh dashboard
-----------------------------

Backup the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file to save your settings.  For example, create a copy of the file using the following command:

.. code-block:: console

   # cp /etc/wazuh-dashboard/opensearch_dashboards.yml /etc/wazuh-dashboard/opensearch_dashboards.yml.old

#. Upgrade the Wazuh dashboard.

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum upgrade wazuh-dashboard|WAZUH_DASHBOARD_RPM_PKG_INSTALL|

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install wazuh-dashboard|WAZUH_DASHBOARD_DEB_PKG_INSTALL|

         .. note::

            When prompted, choose to replace the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file with the updated version.

#. Manually reapply any configuration changes to the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file. Ensure that the values of ``server.ssl.key`` and ``server.ssl.certificate`` match the files located in ``/etc/wazuh-dashboard/certs/``.

#. Ensure the value of ``uiSettings.overrides.defaultRoute`` in the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file is set to ``/app/wz-home`` as shown below:

   .. code-block:: yaml

      uiSettings.overrides.defaultRoute: /app/wz-home

#. Restart the Wazuh dashboard:

   .. include:: /_templates/installations/dashboard/enable_dashboard.rst

   You can now access the Wazuh dashboard via:  ``https://<DASHBOARD_IP_ADDRESS>/app/wz-home``.


#. Import the saved customizations exported while :ref:`preparing the upgrade <preparing-the-upgrade>`.

   #. Navigate to **Dashboard management** > **Dashboard Management** > **Saved objects** on the Wazuh dashboard.
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
