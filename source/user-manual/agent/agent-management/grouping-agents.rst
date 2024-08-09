.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh agents can either be configured locally with the Wazuh agent configuration file or remotely using the centralized configuration. Learn more in this section of the documentation.

Grouping agents
===============

There are two methods for configuring enrolled Wazuh agents. They can either be configured locally with the Wazuh agent configuration file or remotely using the :doc:`centralized configuration </user-manual/reference/centralized-configuration>`. If the centralized configuration is used, Wazuh agents may be assigned to groups where each group possesses a unique configuration. This greatly simplifies the overall configuration process.

.. note::

   Refer to the `agent groups and centralized configuration <https://wazuh.com/blog/agent-groups-and-centralized-configuration//>`__ document for more information.

Unless otherwise assigned, all newly connected Wazuh agents automatically belong to the *'default'* group. This group is created during the installation process with the configuration files placed in the ``/var/ossec/etc/shared/default/`` folder on the Wazuh server. These files will be pushed from the Wazuh manager to all Wazuh agents belonging to this group.

Each group has a configuration file ``/var/ossec/etc/shared/<GROUP_NAME>/agent.conf`` located on the Wazuh server, where ``<GROUP_NAME>`` is the name of the agent group. This file is empty by default, and here, you can define :doc:`centralized agent configurations </user-manual/reference/centralized-configuration>`. After creating a group, you can modify the group's configuration file to apply configurations to all agents in that group.

Assigning agents to a group
---------------------------

Below are the steps to assign agents to a group with a specific configuration:

#. Once a Wazuh agent has been added and connected to the Wazuh manager, assign it to a group using the :doc:`/var/ossec/bin/agent_groups </user-manual/reference/tools/agent-groups>` tool or the :doc:`Wazuh server API </user-manual/api/index>`. Below are examples of how to assign a Wazuh agent with ID ``002`` to the group ``dbms`` using these methods:

   -  Using the ``/var/ossec/bin/agent_groups`` tool:

      .. code-block:: console

         # /var/ossec/bin/agent_groups -a -i 002 -g dbms

      .. note::

         The group must be created and configured before assigning agents. You can create agent groups using the :doc:`/var/ossec/bin/agent_groups </user-manual/reference/tools/agent-groups>` tool. The group name can only contain upper/lower case letters, numbers, dots, underscores, and hyphens.

   -  Using the Wazuh server API endpoint :api-ref:`PUT /agents/{agent_id}/group/{group_id} <operation/api.controllers.agent_controller.put_agent_single_group>`:

      .. code-block:: console

         # curl -k -X PUT "https://<WAZUH_MANAGER_IP>:55000/agents/002/group/dbms?pretty=true" -H  "Authorization: Bearer $TOKEN"

      .. code-block:: none
         :class: output

         {
             "data": {
                 "affected_items": ["002"],
                 "total_affected_items": 1,
                 "total_failed_items": 0,
                 "failed_items": [],
             },
             "message": "All selected agents were assigned to dbms",
             "error": 0,
         }

   Agents assigned to a group can be checked using one of the following commands:

   -  Using ``/var/ossec/bin/agent_groups``:

      .. code-block:: console

         # /var/ossec/bin/agent_groups -l -g dbms

      .. code-block:: none
         :class: output

         5 agent(s) in group 'dbms':
           ID: 002  Name: agent-dbms-e1.
           ID: 003  Name: agent-dbms-e2.
           ID: 004  Name: agent-dbms-a1.
           ID: 005  Name: agent-dbms-a2.
           ID: 006  Name: agent-dbms-a3.

   -  Using the Wazuh server API endpoint :api-ref:`GET /groups/{group_id}/agents <operation/api.controllers.agent_controller.get_agents_in_group>`:

      .. code-block:: console

         # curl -k -X GET "https://<WAZUH_MANAGER_IP>:55000/groups/dbms/agents?pretty=true&select=id,name" -H  "Authorization: Bearer $TOKEN"

      .. code-block:: none
         :class: output

         {
             "data": {
                 "affected_items": [
                     {"name": "agent-dbms-e1", "id": "002"},
                     {"name": "agent-dbms-e2", "id": "003"},
                     {"name": "agent-dbms-a1", "id": "004"},
                     {"name": "agent-dbms-a2", "id": "005"},
                     {"name": "agent-dbms-a3", "id": "006"},
                 ],
                 "total_affected_items": 5,
                 "total_failed_items": 0,
                 "failed_items": [],
             },
             "message": "All selected agents information was returned",
             "error": 0,
         }

#. Once a group is created, its ``agent.conf`` file can be edited to include the specific configuration you wish to assign to this group. For this example, the file to be edited is located at ``/var/ossec/etc/shared/dbms/agent.conf`` and each agent belonging to this group will receive this file.

#. After connecting to the Wazuh manager, each agent assigned to the group will receive the files contained in the ``/var/ossec/etc/shared/dbms/`` folder from the Wazuh manager, including the ``agent.conf`` file that was modified in the previous step. The length of time it takes for the Wazuh manager to push these files to the Wazuh agents depends on the size of the files, the number of agents in the group, and the connection protocol used. For example, depending on network bandwidth and performance, it may take 8 minutes to receive a 10 MB folder (excluding ``merged.mg`` file) on 100 agents using UDP. However, if TCP is used, it may take less time.

#. Once a specific agent belongs to a group, it will not be automatically reassigned to this group even if it is re-enrolled under another name or ID. After re-enrollment, it will be added to the default group which is the default behavior. If you want the Wazuh agent to be automatically reassigned after re-enrollment, it must be explicitly activated by the user in the ``/var/ossec/etc/local_internal_options.conf`` file by adding the option ``remoted.guess_agent_group=1`` (see section ``remoted`` in :doc:`internal options </user-manual/reference/internal-options>`).

   When this option is added, on re-enrollment, the checksum of the ``merged.mg`` file sent by the Wazuh agent is compared with that of the other agents enrolled with the Wazuh manager.

merged.mg
^^^^^^^^^
