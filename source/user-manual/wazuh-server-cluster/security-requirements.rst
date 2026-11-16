.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to protect the Wazuh manager cluster port, cluster key, and nodes from unauthorized access.

Security requirements
=====================

Cluster nodes store agent keys and enrollment credentials and control the configuration distributed to Wazuh agents. Protect the cluster port, cluster key, and nodes to prevent attackers from joining the cluster or intercepting its traffic.

Network isolation
-----------------

Worker nodes connect to the master node on the cluster port, ``1516`` by default. Only cluster nodes need to reach this port, so keep it off public networks.

-  Allow inbound connections to the cluster port on the master node only from the worker node addresses.
-  Place the cluster nodes on a dedicated virtual LAN (VLAN) or private subnet.
-  Use a VPN or a private link when the nodes run in different data centers.
-  Keep the cluster port out of any load balancer that serves Wazuh agents.
-  Test after setup that only the worker nodes can open a connection to the cluster port.

The master node listens on the address in ``<bind_addr>``, which is ``127.0.0.1`` by default. On a master node with more than one interface, set it to the private address that the worker nodes use, rather than ``0.0.0.0``.

Cluster key management
----------------------

The cluster key in ``<cluster><key>`` protects the cluster connection. Each node derives per-connection encryption keys from it, so a node without the right key can't decrypt cluster messages.

-  Treat the cluster key like a root password. Anyone who has it can try to join the cluster as a node.
-  Generate the key with a cryptographically secure method, such as ``openssl rand -hex 16``. The key must be exactly 32 letters and digits.
-  Use a different key for each environment, such as production, staging, and development.
-  Keep a copy of the key in a secrets manager. The key lives in plain text in ``/etc/wazuh-manager/wazuh-manager.conf`` on every node.
-  Keep the owner ``root:wazuh-manager`` and mode ``0660`` that the installer sets on the configuration file. Grant no other user access to it.
-  Never commit the configuration file with the key to a version control system.
-  Rotate the key on a schedule and after staff changes. Set the new key on every node, then restart each node.

Node hardening
--------------

A compromised node can change what Wazuh agents receive and can read agent credentials. Harden every node as critical infrastructure.

-  Keep the operating system and all packages up to date with security patches.
-  Enable mandatory access control, such as SELinux or AppArmor.
-  Restrict SSH access: disable root login, use key-based authentication, and limit source addresses.
-  Remove services and software that the Wazuh manager doesn't need.
-  Enable audit logging to record who does what on each node.
-  Run the Wazuh manager on dedicated endpoints when possible.

Monitoring
----------

Early detection of cluster anomalies lets you respond before an attacker reaches the Wazuh agents. Watch the cluster logs and the cluster port on every node.

-  Monitor ``/var/wazuh-manager/logs/cluster.log`` on every node. The ``wazuh-manager-clusterd`` daemon writes all its messages to this file.
-  Investigate repeated errors with code ``3025``, ``Could not decrypt message``. They mean that a peer uses a different cluster key.
-  Investigate worker connections that the master node rejects. Rejection reasons include a duplicate node name, a different cluster name, or a different Wazuh version.
-  Track unexpected node disconnections and connections to the cluster port from unknown sources.
-  Review every change to the ``<cluster>`` section of ``/etc/wazuh-manager/wazuh-manager.conf``.

