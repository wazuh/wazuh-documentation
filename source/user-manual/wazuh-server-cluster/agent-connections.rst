.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure the Wazuh agent to report to the Wazuh server cluster in this section of the documentation.

Agent connections
=================

The configuration of the Wazuh agents has to be modified to report to the Wazuh server cluster. We configure the Wazuh agent to report to the Wazuh server cluster by editing the ``<client></client>`` block in the agent’s configuration file ``/var/ossec/etc/ossec.conf``.

There are two methods to handle the Wazuh agent connection to the Wazuh server cluster nodes including:

-  :ref:`Pointing Wazuh agents to the Wazuh cluster (Failover mode) <connecting_failover_mode>`.
-  :ref:`Pointing Wazuh agents to the Wazuh cluster with a load balancer <connecting_with_load_balancer>`.

.. note::

   We recommend using a :doc:`load balancer </user-manual/wazuh-server-cluster/load-balancers>` for enrolling and connecting Wazuh agents. This way, the agents register and report to the Wazuh server cluster nodes in a distributed way, and it will be the load balancer who assigns which worker they will report to. Using this option we can better distribute the load, and in case of a fall in some worker nodes, its agents will reconnect to another one.

.. _connecting_failover_mode:

Connecting Wazuh agents to the Wazuh cluster (Failover mode)
------------------------------------------------------------

In this method, we add a list of Wazuh server nodes (master/workers) to the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf``. In case of a disconnection, the agent will connect to another node on the list to continue reporting.

After :doc:`configuring the Wazuh server cluster </user-manual/wazuh-server-cluster/cluster-nodes-configuration>`, we configure the Wazuh agents to connect and report to the Wazuh server cluster nodes as shown below.

Suppose we have the following IP addresses for the Wazuh server nodes:

.. code-block:: none

   master: 172.0.0.3
   worker01: 172.0.0.4
   worker02: 172.0.0.5

#. Edit the ``<client></client>`` block of the Wazuh agent ``/var/ossec/etc/ossec.conf`` file to add the IP addresses of the Wazuh server nodes:

   .. code-block:: xml

      <client>
          <server>
              <address>172.0.0.4</address>
              <port>1514</port>
              <protocol>tcp</protocol>
          </server>
          <server>
              <address>172.0.0.5</address>
              <port>1514</port>
              <protocol>tcp</protocol>
          </server>
          <server>
              <address>172.0.0.3</address>
              <port>1514</port>
              <protocol>tcp</protocol>
          </server>
          <config-profile>ubuntu, ubuntu18, ubuntu18.04</config-profile>
          <notify_time>10</notify_time>
          <time-reconnect>60</time-reconnect>
          <auto_restart>yes</auto_restart>
          <crypto_method>aes</crypto_method>
      </client>

#. Restart the Wazuh agent to apply changes:

   .. include:: /_templates/common/restart_agent.rst

Using this method, if the ``worker01`` node is not available, the agents will report to the ``worker02``. If both worker nodes are unavailable, the agent will report to the ``master`` node. This process is performed cyclically between all the nodes that we place in the ``/var/ossec/etc/ossec.conf`` of the agents.

.. _connecting_with_load_balancer:

Connecting Wazuh agents to the Wazuh cluster with a load balancer
-----------------------------------------------------------------

Wazuh agents can be configured to report to a :doc:`load balancer </user-manual/wazuh-server-cluster/load-balancers>` to evenly distribute incoming Wazuh agent traffic among all available Wazuh server nodes in a cluster. This way, Wazuh agents can report to newly added Wazuh server nodes without modifying the Wazuh agents' configuration.

Perform the following steps to point a Wazuh agent to a load balancer.

#. Edit the Wazuh agent configuration in ``/var/ossec/etc/ossec.conf`` to add the Load Balancer IP address. In the ``<server></server>`` block, replace the ``<LOAD_BALANCER_IP_ADDRESS>`` with the load balancer IP address:

   .. code-block:: xml
      :emphasize-lines: 3

      <client>
        <server>
          <address><LOAD_BALANCER_IP_ADDRESS></address>
          …
        </server>
      </client>

#. Restart the Wazuh agents to apply changes:

   .. include:: /_templates/common/restart_agent.rst
