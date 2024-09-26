.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to upgrade the Wazuh indexer, server, and dashboard to the latest version available.

Wazuh central components
========================

This section guides you through the upgrade process of the Wazuh indexer, the Wazuh server, and the Wazuh dashboard. To migrate from Open Distro for Elasticsearch 1.13 to the Wazuh indexer and dashboard components, read the corresponding :doc:`/migration-guide/wazuh-indexer` and :doc:`/migration-guide/wazuh-dashboard` sections.

.. note:: You need root user privileges to run all the commands described below.

Preparing the upgrade
---------------------

In the case Wazuh is installed in a multi-node cluster configuration, repeat the following steps for every node.

#. Add the Wazuh repository. You can skip this step if the repository is already present and enabled on the node.

   .. tabs::


     .. group-tab:: Yum


       .. include:: /_templates/installations/common/yum/add-repository.rst



     .. group-tab:: APT


       .. include:: /_templates/installations/common/deb/add-repository.rst




#. Stop the Filebeat service and the Wazuh dashboard service if installed in the node.

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

.. note::

   Note that this upgrade process doesn't update plugins installed manually. Outdated plugins might cause the upgrade to fail.

   To ensure compatibility with the latest Wazuh indexer and Wazuh dashboard, please update manually installed plugins accordingly. For additional information, check the `distribution matrix <https://github.com/wazuh/wazuh-packages/tree/v|WAZUH_CURRENT|#distribution-version-matrix>`__.

The cluster remains available throughout the upgrading process in a Wazuh indexer cluster with multiple nodes. This rolling upgrade allows for the shutting down of one Wazuh indexer node at a time for minimal disruption of service.

Repeat the following steps for every Wazuh indexer node.

#. Disable shard allocation.

   .. code-block:: bash

      curl -X PUT "https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cluster/settings"  -u <USERNAME>:<PASSWORD> -k -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": "primaries"
        }
      }
      '

#. Stop non-essential indexing and perform a synced flush.

   .. code-block:: console

      # curl -X POST "https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_flush/synced" -u <USERNAME>:<PASSWORD> -k

#. Shut down the Wazuh indexer in the node.

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

            # apt-get install wazuh-indexer|WAZUH_INDEXER_DEB_PKG_INSTALL|

#. Restart the Wazuh indexer service.

   .. include:: /_templates/installations/indexer/common/enable_indexer.rst

#. Check that the newly upgraded Wazuh indexer node joins the cluster.

   .. code-block:: console

      # curl -k -u <USERNAME>:<PASSWORD> https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cat/nodes?v

#. Re-enable shard allocation.

   .. code-block:: bash

      curl -X PUT "https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cluster/settings" -u <USERNAME>:<PASSWORD> -k -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": "all"
        }
      }
      '

#. Check the status of the Wazuh indexer cluster again to see if the shard allocation has finished.

   .. code-block:: console

      # curl -k -u <USERNAME>:<PASSWORD> https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cat/nodes?v

.. _upgrading_wazuh_server:

Upgrading the Wazuh server
--------------------------

When upgrading a multi-node Wazuh manager cluster, run the upgrade in every node to make all the Wazuh manager nodes join the cluster. Start with the master node to reduce server downtime.

   .. note:: Upgrading from Wazuh 4.2.x or lower creates the ``wazuh`` operating system user and group to replace ``ossec``. To avoid upgrade conflicts, make sure that the ``wazuh`` user and group are not present in your operating system.

Upgrading the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Upgrade the Wazuh manager to the latest version.

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         # yum upgrade wazuh-manager|WAZUH_MANAGER_RPM_PKG_INSTALL|

   .. group-tab:: APT

      .. code-block:: console

         # apt-get install wazuh-manager|WAZUH_MANAGER_DEB_PKG_INSTALL|

.. note::

   If the ``/var/ossec/etc/ossec.conf`` configuration file was modified, it will not be replaced by the upgrade. You will therefore have to add the settings of the new capabilities manually. More information can be found in :doc:`/user-manual/index`.

Configuring vulnerability detection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If upgrading from version 4.7 and earlier, edit ``/var/ossec/etc/ossec.conf`` to configure the new vulnerability detection module as follows.

#. Add the new ``<vulnerability-detection>`` block and remove the old ``<vulnerability-detector>`` if it exists.

   .. include:: /_templates/installations/manager/configure_vulnerability_detection.rst

#. Configure the :doc:`indexer </user-manual/reference/ossec-conf/indexer>` block with the details of your Wazuh indexer host.

   During the upgrade from 4.7, if an Indexer configuration does not exist in the ``/var/ossec/etc/ossec.conf`` file, a default Indexer configuration is automatically appended to ``/var/ossec/etc/ossec.conf`` as part of a new ``<ossec_conf>`` block.

   .. include:: /_templates/installations/manager/configure_indexer_connection.rst

#. Save the Wazuh indexer username and password into the Wazuh manager keystore using the :doc:`Wazuh-keystore </user-manual/reference/tools/wazuh-keystore>` tool.

   .. code-block:: console

      # echo '<INDEXER_USERNAME>' | /var/ossec/bin/wazuh-keystore -f indexer -k username
      # echo '<INDEXER_PASSWORD>' | /var/ossec/bin/wazuh-keystore -f indexer -k password

   .. note::

      In case you've forgotten your Wazuh indexer password, follow the :doc:`password management </user-manual/user-administration/password-management>` guide to reset the password.

Configuring Filebeat
^^^^^^^^^^^^^^^^^^^^

#. Download the Wazuh module for Filebeat:

   .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.4.tar.gz | sudo tar -xvz -C /usr/share/filebeat/module

#. Download the alerts template:

   .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_CURRENT|/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Restart Filebeat:

   .. include:: /_templates/installations/basic/elastic/common/enable_filebeat.rst

#. Upload the new Wazuh template and pipelines for Filebeat.

   .. code-block:: console

      # filebeat setup --pipelines
      # filebeat setup --index-management -E output.logstash.enabled=false

Upgrading the Wazuh dashboard
-----------------------------

.. note::

   Note that this upgrade process doesn't update plugins installed manually. Outdated plugins might cause the upgrade to fail.

   To ensure compatibility with the latest Wazuh indexer and Wazuh dashboard, please update manually installed plugins accordingly. For additional information, check the `distribution matrix <https://github.com/wazuh/wazuh-packages/tree/v|WAZUH_CURRENT|#distribution-version-matrix>`__.

Configuration options might differ across versions. Follow these steps to ensure a smooth upgrade.

#. Backup the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file to save your settings.
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

#. Manually reapply any settings changes to the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file.
#. Restart the Wazuh dashboard:

    .. include:: /_templates/installations/dashboard/enable_dashboard.rst

Next steps
----------

The Wazuh server, indexer, and dashboard are now successfully upgraded. The next step consists in upgrading the Wazuh agents. Follow the instructions in:

-  :doc:`Upgrading the Wazuh agent </upgrade-guide/wazuh-agent/index>`.
