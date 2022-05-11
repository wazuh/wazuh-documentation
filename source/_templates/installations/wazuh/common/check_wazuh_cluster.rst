.. Copyright (C) 2022 Wazuh, Inc.

To verify that the Wazuh cluster is enabled and all the nodes are connected, execute the following command.

  .. code-block:: console

    # /var/ossec/bin/cluster_control -l

Expand the output to see an example response. Note that ``10.0.0.3``, ``10.0.0.4``, and ``10.0.0.5`` are example IPs.

  .. code-block:: none
    :class: output accordion-output
    
      NAME         TYPE    VERSION  ADDRESS
      master-node  master  4.2.0    10.0.0.3
      worker-node1 worker  4.2.0    10.0.0.4
      worker-node2 worker  4.2.0    10.0.0.5



.. End of include file
