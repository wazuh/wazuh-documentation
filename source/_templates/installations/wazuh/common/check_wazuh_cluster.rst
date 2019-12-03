.. Copyright (C) 2019 Wazuh, Inc.

Finally, you can check if the Wazuh cluster is working and connected with:

  .. code-block:: console

    # /var/ossec/bin/cluster_control -l
    NAME         TYPE    VERSION  ADDRESS
    master-node  master  3.10.2   10.0.0.3
    worker-node1 worker  3.10.2   10.0.0.4
    worker-node2 worker  3.10.2   10.0.0.5

Note that ``10.0.0.3``, ``10.0.0.4``, ``10.0.0.5`` are examples IPs. You will find your particular Wazuh server node IPs.

.. End of include file
