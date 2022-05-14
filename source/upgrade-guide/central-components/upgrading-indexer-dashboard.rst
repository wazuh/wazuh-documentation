.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section of the Wazuh documentation guides through the upgrade process of the Wazuh indexer and the Wazuh dashboard.
  
Wazuh indexer and dashboard
===========================

This section guides through the upgrade process of the Wazuh indexer and the Wazuh dashboard.

.. note::
   
   Root user privileges are required to execute all the commands described below.

Preparing the Wazuh indexer
---------------------------

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

#. Add the Wazuh repository. You can skip this step if the repository is already present and enabled on the node.

   .. tabs::


     .. group-tab:: Yum


       .. include:: /_templates/installations/common/yum/add-repository.rst



     .. group-tab:: APT


       .. include:: /_templates/installations/common/deb/add-repository.rst




Upgrading the Wazuh indexer
---------------------------

In the case of having a Wazuh indexer cluster with multiple nodes, the cluster will remain available throughout the upgrading process. This rolling upgrade allows shutting down one Wazuh indexer node at a time for minimal disruption of service.

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

#. Clear the browser cache and cookies.

Next steps
----------

The next step consists in upgrading the Wazuh agents. Follow the instructions in the :doc:`../upgrading-agent` section.
