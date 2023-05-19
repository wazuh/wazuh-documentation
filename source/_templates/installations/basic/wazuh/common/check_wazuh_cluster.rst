.. Copyright (C) 2015, Wazuh, Inc.

To verify that the Wazuh cluster is enabled and all the nodes are connected, execute the following command:

  .. code-block:: console

    # /var/ossec/bin/cluster_control -l

An example output of the command looks as follows:

  .. code-block:: none
    :class: output
    
      NAME         TYPE    VERSION  ADDRESS
      master-node  master  4.4.2   10.0.0.3
      worker-node1 worker  4.4.2   10.0.0.4
      worker-node2 worker  4.4.2   10.0.0.5

Note that ``10.0.0.3``, ``10.0.0.4``, ``10.0.0.5`` are example IPs.

.. End of include file
