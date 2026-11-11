.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh agents connect to a Wazuh manager cluster: one node, or a load balancer in front of every node.

Wazuh agent connections
=======================

Every node of a Wazuh manager cluster serves the Wazuh agent API on port 1517, so a Wazuh agent can report to any node. A Wazuh 5.0 agent connects to a single address, set in the ``<endpoint>`` option of the ``<agent><manager>`` block of its ``ossec.conf`` file. It honors only one ``<manager>`` block: a second block replaces the first, and doesn't add a failover node.

You can connect Wazuh agents to the cluster in two ways:

-  :ref:`To a load balancer <connecting_with_load_balancer>`, recommended. The load balancer distributes the agents across the nodes, and agents keep reporting when a node fails.
-  :ref:`To a node <connecting_to_a_node>`. The agent depends on that node.

.. _connecting_with_load_balancer:

Connecting Wazuh agents to a load balancer
------------------------------------------

Point the Wazuh agents to a :doc:`load balancer </user-manual/wazuh-server-cluster/load-balancers>` in front of every node. Agents then report to new nodes without changes to their configuration.

The easiest way is to enroll each agent with an enrollment token for the load balancer address. The token sets the address, the CA to trust, and the enrollment credential. On the master node, create the token. The load balancer address must be in the agent listener certificate of the master node:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <LOAD_BALANCER_ADDRESS>

To point an enrolled Wazuh agent to the load balancer instead, edit its ``/var/ossec/etc/ossec.conf`` file:

.. code-block:: xml
   :emphasize-lines: 3

   <agent>
     <manager>
       <endpoint><LOAD_BALANCER_ADDRESS>:1517</endpoint>
     </manager>
   </agent>

Then restart the Wazuh agent:

.. include:: /_templates/common/restart_agent.rst

The agent keeps its identity and its trusted CA, so the load balancer address must be in the agent listener certificate of every node. See :doc:`Load balancers </user-manual/wazuh-server-cluster/load-balancers>`.

.. _connecting_to_a_node:

Connecting Wazuh agents to a node
---------------------------------

To connect a Wazuh agent to one node, enroll it with a token for that node's address, or set the node's address in ``<endpoint>``. The address must be in the agent listener certificate of the node. To create a token for a worker node's address, the address must also be in the agent listener certificate of the master node, where tokens are created. Otherwise, the command fails with ``ERROR 9025: Enrollment token refused: address not in certificate SAN``.

If that node fails, the agent stops reporting until the node is back, or until you point the agent to another node.

Wazuh 4.x agents
----------------

Wazuh 4.x agents connect to port 1514, and enroll on port 1515, only when the legacy listener is enabled on the nodes, and they can list several nodes in their ``<client><server>`` blocks. When you upgrade a Wazuh 4.x agent to 5.0, it keeps its identity and reads the address of its ``<client><server>`` block, with port 1517. Replace the ``<client>`` block with an ``<agent><manager><endpoint>`` block, as the agent log suggests.
