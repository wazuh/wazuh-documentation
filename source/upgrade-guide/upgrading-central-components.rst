.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to upgrade the Wazuh central components, including the indexer, server, and dashboard, for all-in-one and multi-node deployments.

Wazuh central components
========================

This section guides you through the upgrade process of the Wazuh indexer, the Wazuh server, and the Wazuh dashboard.

-  **All-in-one deployments:** Execute all commands and configuration actions on the same node since all components run on a single system.
-  **Multi-node cluster deployments:** Run commands and apply configurations on the respective node where the component being upgraded is located.

Preparing the upgrade
---------------------

In case Wazuh is installed in a multi-node cluster configuration, repeat the following steps for every node.

#. Ensure you have added the Wazuh repository to every Wazuh indexer, server, and dashboard node before proceeding to perform the upgrade actions.

   .. tabs::

      .. group-tab:: Yum

         .. include:: /_templates/installations/common/yum/add-repository.rst

      .. group-tab:: APT

         .. include:: /_templates/installations/common/deb/add-repository.rst



#. Stop the Filebeat and Wazuh dashboard services if installed in the node.

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

#. Disable shard replication to prevent shard replicas from being created while Wazuh indexer nodes are being taken offline for the upgrade.

   .. code-block:: bash

      curl -X PUT "https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cluster/settings" \
      -u <USERNAME>:<PASSWORD> -k -H "Content-Type: application/json" -d '{
         "persistent": {
            "cluster.routing.allocation.enable": "primaries"
         }
      }'

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

      # curl -X POST "https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_flush" -u <USERNAME>:<PASSWORD> -k

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

      # curl -k -u <USERNAME>:<PASSWORD> https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cat/nodes?v

#. Stop the Wazuh indexer service.

   .. tabs::

      .. tab:: Systemd

         .. code-block:: console

            # systemctl stop wazuh-indexer

      .. tab:: SysV init

         .. code-block:: console

            # service wazuh-indexer stop

#. Upgrade the Wazuh indexer to the latest version.

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum upgrade wazuh-indexer|WAZUH_INDEXER_RPM_PKG_INSTALL|

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install wazuh-indexer

#. Restart the Wazuh indexer service.

   .. include:: /_templates/installations/indexer/common/enable_indexer.rst

Repeat steps 1 to 3 above on all Wazuh indexer nodes before proceeding to the :ref:`post-upgrade actions <post-upgrade-actions>`.

.. _post-upgrade-actions:

Post-upgrade actions
^^^^^^^^^^^^^^^^^^^^

Perform the following steps on any of the Wazuh indexer nodes replacing ``<WAZUH_INDEXER_IP_ADDRESS>``, ``<USERNAME>``, and ``<PASSWORD>``.

#. Check that the newly upgraded Wazuh indexer nodes are in the cluster.

   .. code-block:: console

      # curl -k -u <USERNAME>:<PASSWORD> https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cat/nodes?v

#. Re-enable shard allocation.

   .. code-block:: bash

      # curl -X PUT "https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cluster/settings" \
      -u <USERNAME>:<PASSWORD> -k -H "Content-Type: application/json" -d '{
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

      # curl -k -u <USERNAME>:<PASSWORD> https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cat/nodes?v

   .. code-block:: console
      :class: output
      
      ip         heap.percent ram.percent cpu load_1m load_5m load_15m node.role node.roles                                        cluster_manager name
      172.18.0.3           34          86  32    6.67    5.30     2.53 dimr      cluster_manager,data,ingest,remote_cluster_client -               wazuh2.indexer
      172.18.0.4           21          86  32    6.67    5.30     2.53 dimr      cluster_manager,data,ingest,remote_cluster_client *               wazuh1.indexer
      172.18.0.2           16          86  32    6.67    5.30     2.53 dimr      cluster_manager,data,ingest,remote_cluster_client -               wazuh3.indexer

#. Run the following command on the Wazuh manager node(s) to start the Wazuh manager service if you stopped it earlier.

   .. tabs::

      .. tab:: Systemd

         .. code-block:: console

            # systemctl start wazuh-manager

      .. tab:: SysV init

         .. code-block:: console

            # service wazuh-manager start

.. note::

   Note that the upgrade process doesn't update plugins installed manually. Outdated plugins might cause the upgrade to fail.

   -  Run the following command on each Wazuh indexer node to list installed plugins and identify those that require an update:

      .. code-block:: console

         # /usr/share/wazuh-indexer/bin/opensearch-plugin list

   In the output, plugins that require an update will be labeled as "outdated".

   -  Remove the outdated plugins and reinstall the latest version replacing ``<PLUGIN_NAME>`` with the name of the plugin:

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

Upgrade the Wazuh manager to the latest version:

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         # yum upgrade wazuh-manager|WAZUH_MANAGER_RPM_PKG_INSTALL|

   .. group-tab:: APT

      .. code-block:: console

         # apt-get install wazuh-manager|WAZUH_MANAGER_DEB_PKG_INSTALL|

.. warning::

   If the ``/var/ossec/etc/ossec.conf`` configuration file was modified, it will not be replaced by the upgrade. You will therefore have to add the settings of the new capabilities manually. More information can be found in the :doc:`/user-manual/index`.

.. _configuring_vulnerability_detection:

Configuring vulnerability detection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If upgrading from version 4.8.x or later, skip the vulnerability detection configuration and proceed to :ref:`configuring_filebeat`. No action is needed as the vulnerability detection block is already configured.

When upgrading from Wazuh version 4.7.x or earlier, follow these steps to configure the vulnerability detection block.

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

   a. Ensure the ``<indexer>`` block contains the details of your Wazuh indexer host. During the upgrade, a default ``<indexer>`` configuration is added under ``<ossec_conf>`` if none exists in ``/var/ossec/etc/ossec.conf``. By default, the configuration includes one host with the IP address ``0.0.0.0``:

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

   b. If using a Wazuh indexer cluster, add a ``<host>`` entry in the Wazuh manager ``/var/ossec/etc/ossec.conf`` file for each node in the cluster. For example, for a two-node configuration:

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


#. Restart Filebeat:

   .. include:: /_templates/installations/basic/elastic/common/enable_filebeat.rst

#. Upload the new Wazuh template and pipelines for Filebeat:

   .. code-block:: console

      # filebeat setup --pipelines
      # filebeat setup --index-management -E output.logstash.enabled=false

#. If you are upgrading from Wazuh versions v4.8.x or v4.9.x, manually update the ``wazuh-states-vulnerabilities-*`` mappings using the following command. Replace ``<WAZUH_INDEXER_IP_ADDRESS>``, ``<USERNAME>``, and ``<PASSWORD>`` with the values applicable to your deployment.

   Skip this step if upgrading from other versions.

   .. code-block:: bash

      curl -X PUT "https://<WAZUH_INDEXER_IP_ADDRESS>:9200/wazuh-states-vulnerabilities-*/_mapping" \
      -u <USERNAME>:<PASSWORD> -k -H "Content-Type: application/json" -d '{
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

            # yum upgrade wazuh-dashboard

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install wazuh-dashboard

      .. note::

         When prompted, choose to replace the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file with the updated version.

#. Manually reapply any configuration changes to the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file. Ensure that the values of ``server.ssl.key`` and ``server.ssl.certificate`` match the files located in ``/etc/wazuh-dashboard/certs/``.

#. Ensure the value of ``uiSettings.overrides.defaultRoute`` in the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file is set to ``/app/wz-home`` as shown below:

   .. code-block:: yaml

      uiSettings.overrides.defaultRoute: /app/wz-home

#. Restart the Wazuh dashboard:

   .. include:: /_templates/installations/dashboard/enable_dashboard.rst

You can now access the Wazuh dashboard via:  ``https://<DASHBOARD_IP_ADDRESS>/app/wz-home``.

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
