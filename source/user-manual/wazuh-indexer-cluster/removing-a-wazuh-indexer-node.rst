.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to safely remove a Wazuh indexer node from a cluster by draining its shards before stopping the service.

Removing a Wazuh indexer node
=============================

This section shows how to remove a Wazuh indexer node from the cluster safely by draining its shards before stopping the service.

#. Exclude the node from shard allocation. The cluster starts relocating the shards hosted on that node to the remaining nodes:

   +----------------------------------------+------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | Action                                 | Wazuh dashboard console                                                                                                | Wazuh indexer API                                                                                                                                                                                                                              |
   +========================================+========================================================================================================================+================================================================================================================================================================================================================================================+
   | Exclude the node from shard allocation | ``PUT _cluster/settings { "persistent": { "cluster.routing.allocation.exclude._ip": "<REMOVED_WAZUH_INDEXER_IP>" } }`` | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> -XPUT https://<WAZUH_INDEXER_IP>:9200/_cluster/settings -H 'Content-Type: application/json' -d '{"persistent": {"cluster.routing.allocation.exclude._ip": "<REMOVED_WAZUH_INDEXER_IP>"}}'`` |
   +----------------------------------------+------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

   Replace ``<WAZUH_INDEXER_IP>`` with the address of any Wazuh indexer node that remains in the cluster, and ``<REMOVED_WAZUH_INDEXER_IP>`` with the address of the node you are removing. Curl exits with code 0 even when the Wazuh indexer rejects the request, so confirm that the response contains ``"acknowledged": true`` before stopping the node.

   The response confirms the setting was applied:

   +-------------------------------------------------------+---------------+
   | Field                                                 | Example value |
   +=======================================================+===============+
   | ``acknowledged``                                      | ``true``      |
   +-------------------------------------------------------+---------------+
   | ``persistent.cluster.routing.allocation.exclude._ip`` | ``10.0.0.11`` |
   +-------------------------------------------------------+---------------+

#. Monitor the relocation until the node being removed holds no shards at all and the cluster reports no relocating shards:

   +-------------------------------------------------+--------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | Action                                          | Wazuh dashboard console                                      | Wazuh indexer API                                                                                                                                                                    |
   +=================================================+==============================================================+======================================================================================================================================================================================+
   | Check how many shards each node still holds     | ``GET _cat/allocation?v&h=node,shards,disk.indices``         | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> "https://<WAZUH_INDEXER_IP>:9200/_cat/allocation?v&h=node,shards,disk.indices"``                                                  |
   +-------------------------------------------------+--------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | List the shards still on the node being removed | ``GET _cat/shards?v&h=index,shard,prirep,state,node&s=node`` | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> "https://<WAZUH_INDEXER_IP>:9200/_cat/shards?v&h=index,shard,prirep,state,node&s=node" | grep <REMOVED_WAZUH_INDEXER_NODE_NAME>`` |
   +-------------------------------------------------+--------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | Check the relocation progress                   | ``GET _cluster/health?pretty``                               | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> https://<WAZUH_INDEXER_IP>:9200/_cluster/health?pretty``                                                                          |
   +-------------------------------------------------+--------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

   The drain is complete when the node being removed shows 0 in the shards column. The shard listing returns no rows for it, and the cluster health reports zero relocating and zero unassigned shards:

   .. code-block:: none
      :class: output

      node       shards disk.indices
      indexer-1      33       412.6mb
      indexer-2       0            0b

   +-----------------------+---------------+
   | Field                 | Example value |
   +=======================+===============+
   | ``relocating_shards`` | ``0``         |
   +-----------------------+---------------+
   | ``unassigned_shards`` | ``0``         |
   +-----------------------+---------------+

#. Stop and disable the Wazuh indexer service on the node being removed:

   .. code-block:: console

      # systemctl stop wazuh-indexer
      # systemctl disable wazuh-indexer

#. Remove the node from the configuration of the remaining components. Delete its entries from ``discovery.seed_hosts`` and ``plugins.security.nodes_dn`` in ``/etc/wazuh-indexer/opensearch.yml`` on the remaining nodes, restarting them one at a time.

   .. note::

      Wait for the cluster to return to a green state between restarts to avoid errors resulting from a yellow cluster state.

#. Remove its ``<host>`` entry from ``/var/wazuh-manager/etc/wazuh-manager.conf`` and its address from ``opensearch.hosts`` in ``/etc/wazuh-dashboard/opensearch_dashboards.yml``, then restart the Wazuh manager and the Wazuh dashboard:

   .. code-block:: console

      # systemctl restart wazuh-manager
      # systemctl restart wazuh-dashboard

#. Clear the allocation exclusion and validate the cluster:

   +-----------------------------------+------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | Action                            | Wazuh dashboard console                                                                        | Wazuh indexer API                                                                                                                                                                                                      |
   +===================================+================================================================================================+========================================================================================================================================================================================================================+
   | Clear the allocation exclusion    | ``PUT _cluster/settings { "persistent": { "cluster.routing.allocation.exclude._ip": null } }`` | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> -XPUT https://<WAZUH_INDEXER_IP>:9200/_cluster/settings -H 'Content-Type: application/json' -d '{"persistent": {"cluster.routing.allocation.exclude._ip": null}}'`` |
   +-----------------------------------+------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | Confirm the node left the cluster | ``GET _cat/nodes?v``                                                                           | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> https://<WAZUH_INDEXER_IP>:9200/_cat/nodes?v``                                                                                                                      |
   +-----------------------------------+------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

You can also validate the final state with the validation script, passing the name of any remaining node:

.. code-block:: console

   # bash ./validate-cluster.sh <WAZUH_INDEXER_NODE_NAME> <WAZUH_INDEXER_IP> <INDEXER_USERNAME> <INDEXER_PASSWORD>

The cluster health confirms the removal:

+--------------------------+---------------+
| Field                    | Example value |
+==========================+===============+
| ``status``               | ``green``     |
+--------------------------+---------------+
| ``number_of_nodes``      | ``2``         |
+--------------------------+---------------+
| ``number_of_data_nodes`` | ``2``         |
+--------------------------+---------------+
