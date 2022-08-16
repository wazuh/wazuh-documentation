.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out more about how to check the connection to the Wazuh Manager in this section of our documentation. 
  
.. _agent-connection:

Checking connection with the Wazuh manager
==========================================

Locally, you can check the :doc:`wazuh-agentd.state </user-manual/reference/statistics-files/wazuh-agentd-state>` file. The Wazuh agent keeps its status reported in this file. To check the current status and verify the agent is connected to the manager, run the following command on the endpoint.

.. tabs::

   .. group-tab:: Linux

      .. code-block:: console

         $ sudo grep ^status /var/ossec/var/run/wazuh-agentd.state

.. code-block:: console
   :class: output

   status='connected'

Remotely, from the Wazuh server, you can check the status of any agent using the ``agent_control`` utility. To get the status of an agent, run the following command replacing the parameter for ``-i`` with your agent ID.

.. code-block:: console

  # /var/ossec/bin/agent_control -i <YOUR_AGENT_ID> | grep ^\s+Status

.. code-block:: console
   :class: output

      Status:     Active

In addition, you can check the status of an agent requesting to the Wazuh API the `statistical information of an agent <https://documentation.wazuh.com/current/user-manual/api/reference.html#operation/api.controllers.agent_controller.get_component_stats>`_.

.. code-block:: none

   GET /agents/<YOUR_AGENT_ID>/stats/agent

.. code-block:: JSON
   :emphasize-lines: 5

   {
     "data": {
       "affected_items": [
         {
           "status": "connected",
           "last_keepalive": "2022-08-16T20:36:27Z",
           "last_ack": "2022-08-16T20:36:30Z",
           "msg_count": 1441,
           "msg_sent": 2326,
           "msg_buffer": 0,
           "buffer_enabled": true
         }
       ],
       "total_affected_items": 1,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "Statistical information for each agent was successfully read",
     "error": 0
   }

Before you check the agent's connection with the manager, first ensure the agent is pointing to the manager IP address. This is set in ``ossec.conf`` using the ``<client>`` XML tag. For more on this, see :ref:`Client reference <reference_ossec_client>`.

.. code-block:: xml

  <ossec_config>
    <client>
      <server>
        <address>10.0.0.10</address>
        <protocol>tcp</protocol>
      </server>
    </client>
  </ossec_config>

This will set 10.0.0.10 as the Wazuh server. Once this is done, you will need to restart the Agent:

  a. For Systemd:

    .. code-block:: console

      # systemctl restart wazuh-agent

  b. For SysV Init:

    .. code-block:: console

      # service wazuh-agent restart

After you register the agent and it has successfully connected, you can see a list of agents that are connected to the manager with:

.. code-block:: console

  # /var/ossec/bin/agent_control -lc

You can also check to see if an agent is connected correctly by verifying if the TCP connection to the manager is established:

.. code-block:: console

  # netstat -vatunp|grep wazuh-agentd

The result should match the agent and manager IP addresses.

In the :doc:`agent_control section <../reference/tools/agent-control>`, you can find information about the status of the agents that are registered with the manager.
