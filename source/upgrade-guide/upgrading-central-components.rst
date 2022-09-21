.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to upgrade the Wazuh indexer, server, and dashboard to the latest version available.
  
Wazuh central components
========================

This section guides through the upgrade process of the Wazuh indexer, the Wazuh server, and the Wazuh dashboard. To migrate from Open Distro for Elasticsearch 1.13 to the Wazuh indexer and dashboard components, read the corresponding :doc:`/migration-guide/wazuh-indexer` and :doc:`/migration-guide/wazuh-dashboard` sections.

.. note::
   
   Root user privileges are required to execute all the commands described below.

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

      .. tab:: SysV Init

         .. code-block:: console

            # service filebeat stop
            # service wazuh-dashboard stop

#. **Recommended** — Backup configuration files and data.

   .. code-block:: console
      :caption: Destination folder

      # bkp_folder=~/wazuh_files_backup/$(date +%F_%H:%M)
      # mkdir -p $bkp_folder

   .. code-block:: console
      :caption: Wazuh indexer files

      # cp --parents /etc/wazuh-indexer/opensearch.yml $bkp_folder
      # cp --parents /usr/lib/sysctl.d/wazuh-indexer.conf $bkp_folder
      # cp --parents /etc/wazuh-indexer/jvm.options $bkp_folder

   .. code-block:: console
      :caption: Certificate files

      # cp --parents /etc/filebeat/certs/wazuh-server.pem $bkp_folder
      # cp --parents /etc/filebeat/certs/wazuh-server-key.pem $bkp_folder
      # cp --parents /etc/wazuh-dashboard/certs/wazuh-dashboard.pem $bkp_folder
      # cp --parents /etc/wazuh-dashboard/certs/wazuh-dashboard-key.pem $bkp_folder
      # cp --parents /etc/wazuh-indexer/certs/wazuh-indexer.pem $bkp_folder
      # cp --parents /etc/wazuh-indexer/certs/wazuh-indexer-key.pem $bkp_folder

   ..
      Certificates and role mapping files

   .. code-block:: console
      :caption: Wazuh manager files

      # cp -r --parents /var/ossec/api/configuration/ $bkp_folder
      # cp -r --parents /var/ossec/etc/ $bkp_folder
      # cp -r --parents /var/ossec/logs/ $bkp_folder
      #
      # cp -r --parents /var/ossec/queue/agent-groups/ $bkp_folder
      #
      # cp -r --parents /var/ossec/queue/agents-timestamp $bkp_folder
      # cp -r --parents /var/ossec/queue/agentless/ $bkp_folder
      # cp -r --parents /var/ossec/queue/cluster/ $bkp_folder
      # cp -r --parents /var/ossec/queue/rids/ $bkp_folder
      # cp -r --parents /var/ossec/queue/fts/ $bkp_folder
      # cp -r --parents /var/ossec/var/multigroups/ $bkp_folder

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console
            :caption: Wazuh manager files

            # systemctl stop wazuh-manager
            # cp -r --parents /var/ossec/queue/db/ $bkp_folder
            # systemctl start wazuh-manager

      .. group-tab:: SysV init

         .. code-block:: console
            :caption: Wazuh manager files

            # service wazuh-manager stop
            # cp -r --parents /var/ossec/queue/db/ $bkp_folder
            # service wazuh-manager start
   
   .. code-block:: console
      :caption: Wazuh dashboard files

      # cp --parents /etc/wazuh-dashboard/opensearch_dashboards.yml $bkp_folder
      # cp --parents /usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml $bkp_folder

   |  You can also export dashboard from **Management > Saved Objects**
   |  Dashboards are stored in the ``.kibana`` index.


Upgrading the Wazuh indexer
---------------------------

In the case of having a Wazuh indexer cluster with multiple nodes, the cluster will remain available throughout the upgrading process. This rolling upgrade allows shutting down one Wazuh indexer node at a time for minimal disruption of service. Repeat these steps for every Wazuh indexer node.

.. note::

   -  Replace ``<WAZUH_INDEXER_IP>``, ``<username>``, and ``<password>`` before running the commands below.

#. Disable shard allocation.

   .. code-block:: bash
   
      curl -X PUT "https://<WAZUH_INDEXER_IP>:9200/_cluster/settings"  -u <username>:<password> -k -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": "primaries"
        }
      }
      '

#. Stop non-essential indexing and perform a synced flush.

   .. code-block:: console

      # curl -X POST "https://<WAZUH_INDEXER_IP>:9200/_flush/synced" -u <username>:<password> -k

#. Shut down the Wazuh indexer in the node.

   .. tabs::

      .. tab:: Systemd

         .. code-block:: console

            # systemctl stop wazuh-indexer

      .. tab:: SysV Init

         .. code-block:: console

            # service wazuh-indexer stop

#. Upgrade the Wazuh indexer to the latest version.

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum upgrade wazuh-indexer

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install wazuh-indexer

#. Restart the service.

   .. include:: /_templates/installations/indexer/common/enable_indexer.rst

#. Check that the newly-upgraded node joins the cluster.

   .. code-block:: console

      # curl -k -u <username>:<password> https://<WAZUH_INDEXER_IP>:9200/_cat/nodes?v

#. Re-enable shard allocation.

   .. code-block:: bash

      curl -X PUT "https://<WAZUH_INDEXER_IP>:9200/_cluster/settings" -u <username>:<password> -k -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": "all"
        }
      }
      '

#. Check again the status of the cluster to see if shard allocation has finished.

   .. code-block:: console

      # curl -k -u <username>:<password> https://<WAZUH_INDEXER_IP>:9200/_cat/nodes?v

.. _upgrading_wazuh_server:

Upgrading the Wazuh server
--------------------------

When upgrading a multi-node Wazuh manager cluster, run the upgrade in every node to make all the Wazuh manager nodes join the cluster. Start with the master node to reduce server downtime.

   .. note:: Upgrading from Wazuh 4.2.x or lower creates the ``wazuh`` operating system user and group to replace ``ossec``. To avoid upgrade conflicts, make sure that the ``wazuh`` user and group are not present in your operating system.  

#. Upgrade the Wazuh manager to the latest version.

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum upgrade wazuh-manager

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install wazuh-manager

   .. note::

      If the ``/var/ossec/etc/ossec.conf`` configuration file was modified, it will not be replaced by the upgrade. You will therefore have to add the settings of the new capabilities manually. More information can be found in :doc:`/user-manual/index`.


#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.2.tar.gz | sudo tar -xvz -C /usr/share/filebeat/module   
               

#. Download the alerts template:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_CURRENT|/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json
      
#. Restart Filebeat:

    .. include:: /_templates/installations/basic/elastic/common/enable_filebeat.rst

#. Upload the new Wazuh template. This step can be omitted for Wazuh indexer single-node installations.

   .. code-block:: console

      # filebeat setup --index-management -E output.logstash.enabled=false
      
Upgrading the Wazuh dashboard
-----------------------------

#. Upgrade the Wazuh dashboard.

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum upgrade wazuh-dashboard

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install wazuh-dashboard

#. Restart the Wazuh dashboard:

    .. include:: /_templates/installations/dashboard/enable_dashboard.rst

#. Clear browsers caches and cookies.

Next steps
----------

The Wazuh server, indexer, and dashboard are now successfully upgraded. The next step consists in upgrading the Wazuh agents. Follow the instructions in:

-  :doc:`Upgrading the Wazuh agent </upgrade-guide/wazuh-agent/index>`.
