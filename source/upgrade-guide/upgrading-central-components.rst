.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to upgrade the Wazuh server, indexer, and dashboard to the latest version available.
  
Wazuh central components
========================

This section guides through the upgrade process of the Wazuh server, the Wazuh indexer, and the Wazuh dashboard. To upgrade Wazuh with Elasticsearch and Kibana, read the corresponding documentation section:
   
-  :doc:`Upgrading Wazuh and Open Distro for Elasticsearch <elasticsearch-kibana-filebeat/upgrading-open-distro>`.
-  :doc:`Upgrading Wazuh and Elastic Stack basic license <elasticsearch-kibana-filebeat/upgrading-elastic-stack>`.

.. note::
   
   Root user privileges are required to execute all the commands described below.

Preparing the upgrade
---------------------

#. Add the Wazuh repository. You can skip this step if the repository is already present and enabled on the node. 

   .. tabs::


     .. group-tab:: Yum


       .. include:: /_templates/installations/common/yum/add-repository.rst



     .. group-tab:: APT


       .. include:: /_templates/installations/common/deb/add-repository.rst




#. Repeat the previous steps for every Wazuh node.

.. _upgrading_wazuh_server:

Upgrading the Wazuh server
--------------------------

#. Upgrade the Wazuh manager to the latest version.

   -  When upgrading a multi-node Wazuh manager cluster, run the upgrade in every node to make all the Wazuh manager nodes join the cluster. Start with the master node to reduce server downtime.

   .. note::

      If the ``/var/ossec/etc/ossec.conf`` configuration file was modified, it will not be replaced by the upgrade. You will therefore have to add the settings of the new capabilities manually. More information can be found in :doc:`/user-manual/index`.

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum upgrade wazuh-manager

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install wazuh-manager

#. Repeat the previous step for every Wazuh manager node.

.. note::

   -  Read the :doc:`/migration-guide/wazuh-indexer` section to migrate from Open Distro for Elasticsearch 1.13 to the Wazuh indexer.

Upgrading the Wazuh indexer
---------------------------

In the case of having a Wazuh indexer cluster with multiple nodes, the cluster will remain available throughout the upgrading process. This rolling upgrade allows shutting down one Wazuh indexer node at a time for minimal disruption of service.

Preparations
^^^^^^^^^^^^

#. Stop the Filebeat service and the Wazuh dashboard service if installed in the node.

   .. tabs::

      .. tab:: Systemd

         .. code-block:: console

            # systemctl stop filebeat

         .. code-block:: console

            # systemctl stop wazuh-dashboard

      .. tab:: SysV Init

         .. code-block:: console

            # service filebeat stop

         .. code-block:: console

            # service wazuh-dashboard stop

Upgrade
^^^^^^^

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

#. Shut down a single node.

   .. tabs::

      .. tab:: Systemd

         .. code-block:: console

            # systemctl stop wazuh-indexer

      .. tab:: SysV Init

         .. code-block:: console

            # service wazuh-indexer stop

#. Upgrade the node you have shut down.

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

      # curl -k -u <username>:<password> https://<WAZUH_INDEXER_IP>:9200/_cat/nodes

#. Re-enable shard allocation.

   .. code-block:: bash

      curl -X PUT "https://<WAZUH_INDEXER_IP>:9200/_cluster/settings" -u <username>:<password> -k -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": "all"
        }
      }
      '

#. Check again the status of the cluster before upgrading the next node to see if shard allocation has finished.

   .. code-block:: console

      # curl -k -u <username>:<password> https://<WAZUH_INDEXER_IP>:9200/_cat/nodes?v

#. Repeat these steps for every Wazuh indexer node.

Preparing Filebeat
------------------

#. Download the alerts template:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json
      
#. Restart Filebeat:

    .. include:: /_templates/installations/basic/elastic/common/enable_filebeat.rst

#. Upload the new Wazuh template. This step can be omitted in Wazuh indexer single-node installations.

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


Finishing the upgrade
---------------------

#. **Recommended action** - Disable the Wazuh repository when finished upgrading the Wazuh components in the node to prevent accidental upgrades.
  
   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

      .. group-tab:: APT

         .. code-block:: console

            # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
            # apt-get update

         Alternatively, you can set the package state to ``hold``. This will stop automatic upgrades but it will still be possible to upgrade it manually using ``apt-get install``.

         .. code-block:: console

            # echo "wazuh-manager hold" | sudo dpkg --set-selections

Next steps
----------

The Wazuh server, indexer, and dashboard are now successfully upgraded. The next step consists in upgrading the Wazuh agents. Follow the instructions in:

-  :doc:`Upgrading the Wazuh agent <upgrading-agent>`.
