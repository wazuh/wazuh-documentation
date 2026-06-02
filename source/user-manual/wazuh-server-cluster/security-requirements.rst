.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the security requirements for deploying the Wazuh server cluster, including network isolation, cluster key management, node hardening, and monitoring.

Security requirements
=====================

The below table shows the security requirements for deploying the Wazuh server cluster.

+--------------------------------+----------------------------------------------------------------------------------+------------------------------------------------------------------------+
| Requirement                    | Recommendation                                                                   | Rationale                                                              |
+================================+==================================================================================+========================================================================+
| **1. Network isolation**       |                                                                                  |                                                                        |
+--------------------------------+----------------------------------------------------------------------------------+------------------------------------------------------------------------+
| Restrict port ``1516`` to a    | - Set firewall rules (iptables or cloud security groups) to block port ``1516``  | - Port ``1516`` is used by the Wazuh cluster nodes to talk to          |
| management-only network        |   from public access.                                                            |   one another. Exposing it publicly gives attackers a direct path into |
| segment.                       | - Place cluster nodes on a dedicated VLAN or private subnet.                     |   your cluster.                                                        |
|                                | - Use a VPN or private network link for clusters that span multiple data         | - Network segmentation limits the blast radius if one part of your     |
|                                |   centers.                                                                       |   environment is compromised.                                          |
|                                | - Test connectivity after setup to confirm only trusted nodes can connect.       |                                                                        |
+--------------------------------+----------------------------------------------------------------------------------+------------------------------------------------------------------------+
| **2. Cluster key management**  |                                                                                  |                                                                        |
+--------------------------------+----------------------------------------------------------------------------------+------------------------------------------------------------------------+
| Treat the cluster key like a   | - Generate keys using a cryptographically secure method (e.g., openssl rand).    | - The cluster key authenticates nodes to each other. Anyone who has it |
| root password to protect it.   | - Use a different key for each environment: production, staging, and             |   can impersonate a node or intercept cluster traffic.                 |
|                                |   development.                                                                   | - Separate keys per environment will prevent a breach in one           |
|                                | - Lock down file permissions so only the Wazuh service account can read the key  |   environment from compromising the other.                             |
|                                |   file.                                                                          |                                                                        |
|                                | - Store the key in a secrets manager (e.g., HashiCorp Vault, AWS Secrets         |                                                                        |
|                                |   Manager).                                                                      |                                                                        |
|                                | - Rotate the key on a scheduled basis and after any staff changes.               |                                                                        |
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
|                                | - Install a host-based intrusion detection system (e.g., OSSEC, ``auditd``).     |                                                                        |
|                                | - Disable or remove services and software that Wazuh does not need.              |                                                                        |
|                                | - Where possible, run Wazuh on dedicated servers - not shared with other         |                                                                        |
|                                |   applications.                                                                  |                                                                        |
+--------------------------------+----------------------------------------------------------------------------------+------------------------------------------------------------------------+
| **4. Monitoring and alerting** |                                                                                  |                                                                        |
+--------------------------------+----------------------------------------------------------------------------------+------------------------------------------------------------------------+
| Monitor cluster communication  | - Alert on unexpected connections to port ``1516`` from unknown sources.         | - Your security monitoring system is itself a high-value target.       |
| for anomalies.                 | - Track and alert on repeated authentication failures between nodes.             |   Attackers who compromise it can blind you from other security        |
|                                | - Monitor for node disconnections, especially unexpected ones.                   |   events.                                                              |
|                                | - Log and review any configuration changes to cluster settings.                  | - Early detection of cluster anomalies lets you respond before damage  |
|                                | - Use Wazuh rules or custom rules to monitor the cluster logs (e.g.,             |   is done.                                                             |
|                                |   ``/var/ossec/logs/ossec.log``, ``/var/ossec/logs/cluster.log``).               |                                                                        |
+--------------------------------+----------------------------------------------------------------------------------+------------------------------------------------------------------------+