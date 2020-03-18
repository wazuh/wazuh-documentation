.. Copyright (C) 2020 Wazuh, Inc.

To verify that the Wazuh cluster is enabled and all the nodes are connected, execute:

  .. code-block:: console

    # /var/ossec/bin/cluster_control -l
    NAME         TYPE    VERSION  ADDRESS
    master-node  master  3.11.4   10.0.0.3
    worker-node1 worker  3.11.4   10.0.0.4
    worker-node2 worker  3.11.4   10.0.0.5

Note that ``10.0.0.3``, ``10.0.0.4``, ``10.0.0.5`` are example IPs.

.. End of include file
