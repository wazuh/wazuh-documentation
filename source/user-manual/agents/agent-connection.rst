.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out more about how to check the connection to the Wazuh Manager in this section of our documentation. 
  
.. _agent-connection:

Checking connection with the Wazuh manager
==========================================

Locally, you can check the :doc:`wazuh-agentd.state </user-manual/reference/statistics-files/wazuh-agentd-state>` file. The Wazuh agent keeps reporting its status in this file. To check the current status and verify the agent is connected to the manager, run the following command on the endpoint.

.. tabs::

   .. group-tab:: Linux

      .. code-block:: console

         $ sudo grep ^status /var/ossec/var/run/wazuh-agentd.state

.. code-block:: console
   :class: output

   status='connected'

Remotely, from the Wazuh server, you can check the status of any agent using the :doc:`agent_control <../reference/tools/agent-control>` utility. To get the status of an agent, run the following command replacing the ``-i`` parameter with your agent ID.

.. tabs::

   .. group-tab:: Linux

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

Agent communication with the manager requires outbound connectivity from agent to manager. It uses the port ``1514/TCP`` by default.

If the agent is not connected it may mean it was not enrolled succesfully. Check the :doc:`/user-manual/agent-enrollment/index` for details. You can also check to see if an agent is connected correctly by verifying if the TCP connection to the manager is established. The result should match the agent and manager IP addresses.

.. tabs::

   .. group-tab:: Linux

      .. code-block:: console

         # netstat -vatunp|grep wazuh-agentd


.. code-block:: console
   :class: output

   tcp        0      0 172.16.1.211:48364      172.16.1.11:1514        ESTABLISHED 796/wazuh-agentd
