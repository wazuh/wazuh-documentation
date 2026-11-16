.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh agents connect to the nodes of a Wazuh manager cluster, directly or through a load balancer.

Wazuh agent connections
=======================

Wazuh agents 5.x connect to the Wazuh manager cluster over the HTTPS agent API on port ``1517``. Any node accepts them, so you choose one address for the agents and let the cluster handle the rest.

Each Wazuh agent 5.x has exactly one manager endpoint, set in the ``<agent><manager><endpoint>`` option of the agent configuration file. The file is:

-  ``/var/ossec/etc/ossec.conf`` on Linux
-  ``/Library/Ossec/etc/ossec.conf`` on macOS
-  ``C:\Program Files (x86)\ossec-agent\ossec.conf`` on Windows

The agent doesn't keep a list of nodes and doesn't fail over between them. If the file has more than one ``<manager>`` block, the agent uses the last one and logs a warning.

You can point the agents at the cluster in one of the following ways:

-  **Load balancer**: The agents use the load balancer address, and the load balancer spreads them across the nodes. If a node fails, the load balancer sends the agents to the remaining nodes.
-  **Single node**: Each agent uses the address of one node. If that node fails, the agent waits until the node returns.

We recommend a load balancer for any cluster with more than one node. For the load balancer setup, see :ref:`Load balancers <wazuh_manager_cluster_load_balancers_for_the_wazuh_manager_cluster>`. To connect the agents through it, see :ref:`Point the Wazuh agents at the load balancer <wazuh_manager_cluster_point_the_wazuh_agents_at_the_load_balancer>`.

What every node serves
----------------------

Every node serves the same agent API, so an agent works with whichever node answers. The master node also owns the operations that create or change an agent identity.

-  Events, inventory, and configuration downloads work on any node.
-  Enrollment requests reach any node. A worker node forwards them to the master node, which creates the agent identity.
-  Group changes and agent deletion go through the Wazuh manager API on the master node.

A newly enrolled agent is known to the worker nodes after the next synchronization cycle. Until then, a worker node can reject its requests. The agent retries and recovers on its own.

Connect Wazuh agents to a single node
-------------------------------------

Without a load balancer, each agent reports to the one node in its endpoint. You can spread agents by giving different agents different node addresses.

Wazuh agents 5.x don't support the failover list of Wazuh agents 4.x. If you upgrade a Wazuh agent 4.x that lists several ``<server>`` blocks, the upgraded agent uses only the last address, on port ``1517``.

You can also use an enrollment token minted for the master node address. Enroll new agents with it, and move enrolled agents with ``--certs-only``, as described in :ref:`Point the Wazuh agents at the load balancer <wazuh_manager_cluster_point_the_wazuh_agents_at_the_load_balancer>`. The master node mints tokens only for addresses in the SAN of its agent listener certificate. For a worker node address that it doesn't name, set the address by hand.

To set the node address by hand, complete these steps on each Wazuh agent.

#. Set the node address in the ``<agent><manager>`` block of the configuration file on the Wazuh agent:

   .. code-block:: xml

      <agent>
        <manager>
          <endpoint><NODE_ADDRESS>:1517/wazuh-manager/</endpoint>
        </manager>
      </agent>

   -  Replace ``<NODE_ADDRESS>`` with the IP address or DNS name of the master node or a worker node. The agent listener certificate of that node must name this address.

#. Restart the Wazuh agent to apply the change, for example with ``systemctl restart wazuh-agent`` on Linux.
#. Check on the master node that the agent is active:

   .. code-block:: console

      # /var/wazuh-manager/bin/cluster_control -a

   The output lists the agent with the active status.

Wazuh agents 4.x
----------------

Each node also accepts Wazuh agents 4.x on the legacy channel while the ``<remote><legacy>`` block is enabled. The installer enables it, with agent traffic on port ``1514`` and legacy enrollment on port ``1515``.

-  Wazuh agents 4.x keep their ``<client><server>`` configuration and connect to port ``1514``.
-  A worker node forwards legacy enrollment requests on port ``1515`` to the master node, like requests on port ``1517``.
-  Wazuh agents 4.x enroll on port 1515 with the enrollment password, because the installer sets ``<auth><use_password>`` to yes. The cluster copies the password file, ``authd.pass``, to every node.
-  A Wazuh agent upgraded to 5.x keeps its identity and switches to port ``1517``. It logs the ``<endpoint>`` line that replaces its ``<client><server>`` block. Without a trust anchor, it runs with TLS verification disabled. To give it one, run ``wazuh-agent-auth`` with ``--certs-only``, as in :ref:`Move an enrolled Wazuh agent <wazuh_manager_cluster_move_an_enrolled_wazuh_agent>`.

To balance the legacy ports, send ``1514`` and ``1515`` to every node, as described in :ref:`Balance the legacy channels for Wazuh 4.x agents <wazuh_manager_cluster_balance_the_legacy_channels_for_wazuh_4_x_agents>`.

