.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn the security requirements for deploying a Wazuh manager cluster: network isolation, the cluster key, node hardening, and monitoring.

Security requirements
=====================

The nodes of a Wazuh manager cluster connect to each other on port ``1516``. The traffic is encrypted with keys derived from the cluster key for each connection, with no TLS. Anyone who has the cluster key can impersonate a node. The following table shows the security requirements for deploying the Wazuh server cluster.

+--------------------------------+----------------------------------------------------------------------------------+------------------------------------------------------------------------+
| Requirement                    | Recommendation                                                                   | Rationale                                                              |
+================================+==================================================================================+========================================================================+
| **1. Network isolation**       |                                                                                  |                                                                        |
+--------------------------------+----------------------------------------------------------------------------------+------------------------------------------------------------------------+
| Restrict port ``1516`` to a    | - Set firewall rules (iptables or cloud security groups) so only the cluster     | - Port ``1516`` is used by the Wazuh cluster nodes to talk to          |
| management-only network        |   nodes reach port ``1516`` of the master node.                                  |   one another. Exposing it publicly gives attackers a direct path into |
| segment.                       | - Set ``<bind_addr>`` on the master node to an address on that network, not      |   your cluster.                                                        |
|                                |   ``0.0.0.0``.                                                                   | - Network segmentation limits the blast radius if one part of your     |
|                                | - Place cluster nodes on a dedicated VLAN or private subnet.                     |   environment is compromised.                                          |
|                                | - Use a VPN or private network link for clusters that span multiple data         |                                                                        |
|                                |   centers.                                                                       |                                                                        |
|                                | - Never send port ``1516`` through the load balancer of the Wazuh agents.        |                                                                        |
+--------------------------------+----------------------------------------------------------------------------------+------------------------------------------------------------------------+
| **2. Cluster key management**  |                                                                                  |                                                                        |
+--------------------------------+----------------------------------------------------------------------------------+------------------------------------------------------------------------+
| Treat the cluster key like a   | - Generate the key with a cryptographically secure method, for example           | - The cluster key authenticates nodes to each other. Anyone who has it |
| root password to protect it.   |   ``openssl rand -hex 16``.                                                      |   can impersonate a node.                                              |
|                                | - Use a different key for each environment: production, staging, and             | - Separate keys per environment will prevent a breach in one           |
|                                |   development.                                                                   |   environment from compromising the other.                             |
|                                | - The key is in the ``<cluster>`` block of                                       |                                                                        |
|                                |   ``/etc/wazuh-manager/wazuh-manager.conf``. Keep the default owner and mode of  |                                                                        |
|                                |   that file, and don't copy it to other systems.                                 |                                                                        |
|                                | - Store the key in a secrets manager (e.g., HashiCorp Vault, AWS Secrets         |                                                                        |
|                                |   Manager).                                                                      |                                                                        |
|                                | - Rotate the key on a scheduled basis and after any staff changes. Change it on  |                                                                        |
|                                |   every node and restart them.                                                   |                                                                        |
|                                | - Never commit the key to a version control system (Git).                        |                                                                        |
+--------------------------------+----------------------------------------------------------------------------------+------------------------------------------------------------------------+
| **3. Node hardening**          |                                                                                  |                                                                        |
+--------------------------------+----------------------------------------------------------------------------------+------------------------------------------------------------------------+
| Secure cluster nodes as        | - Keep the OS and all packages up to date with security patches.                 | - Cluster nodes hold sensitive security event data and control your    |
| critical infrastructure.       | - Enable mandatory access controls: SELinux (RHEL/CentOS) or AppArmor            |   detection capabilities. A compromised node undermines your entire    |
|                                |   (Ubuntu/Debian).                                                               |   SIEM.                                                                |
|                                | - Restrict SSH: disable root login, use key-based auth only, limit which IPs can | - Ensuring defense in depth, so that if an attacker gets past your     |
|                                |   connect.                                                                       |   network controls, hardened nodes slow them down.                     |
|                                | - Enable audit logging to track who does what on each node.                      |                                                                        |
|                                | - Install a Wazuh 5.x agent on each node to monitor it. The Wazuh manager        |                                                                        |
|                                |   doesn't monitor its own host.                                                  |                                                                        |
|                                | - Disable or remove services and software that Wazuh does not need.              |                                                                        |
|                                | - Where possible, run Wazuh on dedicated servers - not shared with other         |                                                                        |
|                                |   applications.                                                                  |                                                                        |
+--------------------------------+----------------------------------------------------------------------------------+------------------------------------------------------------------------+
| **4. Monitoring and alerting** |                                                                                  |                                                                        |
+--------------------------------+----------------------------------------------------------------------------------+------------------------------------------------------------------------+
| Monitor cluster communication  | - Alert on unexpected connections to port ``1516`` from unknown sources.         | - Your security monitoring system is itself a high-value target.       |
| for anomalies.                 | - Track and alert on connections the master node closes because it can't decrypt |   Attackers who compromise it can blind you from other security        |
|                                |   them, error ``3025`` in its cluster log.                                       |   events.                                                              |
|                                | - Monitor for node disconnections, especially unexpected ones.                   | - Early detection of cluster anomalies lets you respond before damage  |
|                                | - Log and review any configuration changes to cluster settings.                  |   is done.                                                             |
|                                | - Collect the cluster logs with the Wazuh agent of each node:                    |                                                                        |
|                                |   ``/var/wazuh-manager/logs/wazuh-manager.log`` and                              |                                                                        |
|                                |   ``/var/wazuh-manager/logs/cluster.log``.                                       |                                                                        |
+--------------------------------+----------------------------------------------------------------------------------+------------------------------------------------------------------------+
