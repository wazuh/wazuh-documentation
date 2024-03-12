.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The cluster_control tool allows you to get real-time information about the health of the cluster. Learn more about deploying a Wazuh cluster in this section.

Cluster management
===================

The **cluster_control** tool allows you to obtain real-time information about the cluster health, connected nodes, and the agents reporting to the cluster. This information can also be obtained using the Wazuh API :api-ref:`cluster endpoints <tag/Cluster>`.

For example, the following snippet shows the connected nodes in the cluster:

.. code-block:: console

    # /var/ossec/bin/cluster_control -l

.. code-block:: none
    :class: output

    NAME      TYPE    VERSION  ADDRESS
    worker-1  worker  |WAZUH_CURRENT|    172.17.0.101
    worker-2  worker  |WAZUH_CURRENT|    172.17.0.102
    master    master  |WAZUH_CURRENT|    172.17.0.100

This information can also be obtained using the Wazuh API endpoint :api-ref:`GET /cluster/nodes <operation/api.controllers.cluster_controller.get_cluster_nodes>`:

.. code-block:: console

    # curl -k -X GET "https://localhost:55000/cluster/nodes?pretty=true" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
        "data": {
            "affected_items": [
                {
                    "ip": "192.168.56.103",
                    "version": "|WAZUH_CURRENT|",
                    "type": "worker",
                    "name": "node02",
                },
                {
                    "ip": "192.168.56.105",
                    "version": "|WAZUH_CURRENT|",
                    "type": "worker",
                    "name": "node03",
                },
                {
                    "ip": "192.168.56.101",
                    "version": "|WAZUH_CURRENT|",
                    "type": "master",
                    "name": "node01",
                },
            ],
            "total_affected_items": 3,
            "total_failed_items": 0,
            "failed_items": [],
        },
        "message": "All selected nodes information was returned",
        "error": 0,
    }

If you want to see more examples and check all its options, refer to :doc:`the cluster_control manual <../reference/tools/cluster-control>` or the :api-ref:`cluster endpoints <tag/Cluster>`.


Upgrading from older versions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you already have a cluster installation from a **version older or equal to 3.2.2**, you should do some changes to your cluster configuration:

    * Remove ``<interval>`` section.
    * Remove worker nodes from ``<nodes>`` section. Only the master node is allowed.

The cluster will work with an old configuration but it is recommended to update it.
