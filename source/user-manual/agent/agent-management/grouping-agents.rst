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

Creating agent groups
---------------------

There are three methods for creating agent groups which include:

-  :ref:`The Wazuh dashboard <agent-group-dashboard>`

-  :ref:`The agent_groups tool <agent-groups-tool>`

-  :ref:`The Wazuh API <agent-group-api>`

.. _agent-group-dashboard:

The Wazuh dashboard
^^^^^^^^^^^^^^^^^^^

To create agent groups from the Wazuh dashboard:

#. Navigate to **Agents management > Groups** and click the **Add new group** button.

#. Enter a name for the agent group and click on the **Save new group** button.

.. thumbnail:: /images/manual/agent/new-group-agent-dashboard.gif
   :title: Creating an agent in Wazuh Dashboard
   :align: center
   :width: 80%
   
.. _agent-groups-tool:

The agent_groups tool
^^^^^^^^^^^^^^^^^^^^^

The :doc:`agent_groups </user-manual/reference/tools/agent-groups>` tool offers the ability to create and manage Wazuh agent groups directly from the command line.  The tool is used as follows to create a Wazuh agent group:

.. note::
   
   You need root user privileges to execute the commands below.

.. code-block:: console

   # /var/ossec/bin/agent_groups -a -g <GROUP_ID> -q

Where:

-  The flag ``-a`` ``-g`` adds a group.

-  The ``<GROUP_ID>`` indicates a unique group name. Replace ``<GROUP_ID>`` with the name of the group you want to create.

-  The flag ``-q`` triggers the silent or no confirmation mode.
         
Run the following commands on the Wazuh server to create the agent groups ``Windows``, ``macOS``, and  ``Linux``:

.. code-block:: console
   
   # /var/ossec/bin/agent_groups -a -g Windows -q
   # /var/ossec/bin/agent_groups -a -g macOS -q
   # /var/ossec/bin/agent_groups -a -g Linux -q

An example output is as follows:

.. code-block:: none
   :class: output
   
   Group 'Windows' created.
   
To ensure the groups are created correctly, run the following command to list all existing groups:

.. code-block:: console
   
   # /var/ossec/bin/agent_groups -l
   
An example output is as follows:

.. code-block:: none
   :class: output
   
   Groups (5):
     Linux (0)
     Test (0)
     Windows (0)
     default (2)
     macOS (0)
   Unassigned agents: 0.

.. _agent-group-api:

The Wazuh API 
^^^^^^^^^^^^^

Using the :doc:`Wazuh API </user-manual/api/reference>` to create and manage groups programmatically is effective for automating group management tasks. Perform the steps below to create agent groups using the Wazuh API:

#. On the Wazuh dashboard, navigate to **Server management**, and select **Dev Tools**.

#. Run the queries below to create the agent groups ``Windows``, ``macOS``, and ``Linux``:

   .. code-block:: none
      
      POST /groups {"group_id": "Windows"}
      POST /groups {"group_id": "macOS"}
      POST /groups {"group_id": "Linux"}
      
   .. thumbnail:: /images/manual/agent/new-group-agent-api.gif
      :title: Creating an agent with Wazuh API
      :align: center
      :width: 80%
      
#.  You can also use the command line interface to create agent groups via the Wazuh API. The equivalent command to run from the console with root user privileges to create the ``Linux`` group would be:
   
   .. code-block:: console
         
      # curl -k -X POST "https://<WAZUH_MANAGER_IP>:55000/groups?pretty=true" -H "Content-Type: application/json" -d '{"group_id": "Linux"}' -H  "Authorization: Bearer $(curl -u <API_USER>:<API_PASSWORD> -k -X POST 'https://<WAZUH_MANAGER_IP>:55000/security/user/authenticate?raw=true')"
         
   Replace:
   
   -  The ``<WAZUH_MANAGER_IP>`` variable with the IP address of your Wazuh server. In case you have a distributed deployment, use the IP address of the master node.
   -  The ``<API_USER>`` variable with your :doc:`Wazuh API </user-manual/api/getting-started>` username.
   -  The ``<API_PASSWORD>`` variable with the password of your :doc:`Wazuh API </user-manual/api/getting-started>` user.
   
   The output of the command is as follows:
   
   .. code-block:: none
      :class: output
      
      {
         "message": "Group 'Linux' created.",
         "error": 0
      }

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

         # curl -k -X PUT "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/agents/002/group/dbms?pretty=true" -H  "Authorization: Bearer $TOKEN"

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

         # curl -k -X GET "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/groups/dbms/agents?pretty=true&select=id,name" -H  "Authorization: Bearer $TOKEN"

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

#. Once a specific agent belongs to a group, it will not be automatically reassigned to this group even if it is re-enrolled under another name or ID. After re-enrollment, it will be added to the default group.

merged.mg
^^^^^^^^^

When a Wazuh agent is enrolled in the Wazuh manager for the first time, the Wazuh manager generates a ``merged.mg`` file based on the Wazuh agent's configuration and group membership. Whenever the Wazuh agent's configuration or group membership changes, the Wazuh manager updates the ``merged.mg`` file and sends it to the Wazuh agent.

On the Wazuh server, the file is located at ``var/ossec/etc/shared/merged.mg``.

On the Wazuh agent, it is located at ``/var/ossec/etc/shared/merged.mg`` for Linux and ``C:\Program Files (x86)\ossec-agent\shared\merged.mg`` on Windows.

Multiple groups
---------------

Agents can be members of multiple groups. When a Wazuh agent is associated with multiple groups, it will receive configuration files from each group. However, the configuration received from the most recently assigned group takes precedence over those from other groups.

Managing multiple groups
------------------------

The following activities can be carried out when managing multiple Wazuh agent groups.

-  `Assigning multiple groups to a Wazuh agent`_
-  `Listing groups and configuration`_
-  `Making changes to group assignment`_
-  `Shared files behavior`_

The ``/var/ossec/bin/agent_groups`` tool and the :doc:`Wazuh server API </user-manual/api/index>`  help to manage agent groups by listing them and allowing them to assign/change/unassign groups to Wazuh agents. We explore three use cases managing multiple groups over existing Wazuh agents.

Assigning multiple groups to a Wazuh agent
------------------------------------------

There are three different methods to assign a Wazuh agent to one or more groups:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Using the Wazuh server API
^^^^^^^^^^^^^^^^^^^^^^^^^^

In this example, agent ``001`` has been added to the ``webserver`` and ``apache`` groups using the Wazuh server API endpoint :api-ref:`PUT /agents/{agent_id}/group/{group_id} <operation/api.controllers.agent_controller.put_agent_single_group>`:

.. code-block:: console

   # curl -k -X PUT "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/agents/001/group/webserver?pretty=true" -H  "Authorization: Bearer $TOKEN"

.. code-block:: none
   :class: output

   {
       "data": {
           "affected_items": ["001"],
           "total_affected_items": 1,
           "total_failed_items": 0,
           "failed_items": [],
       },
       "message": "All selected agents were assigned to webserver",
       "error": 0,
   }

.. code-block:: console

   # curl -k -X PUT "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/agents/001/group/apache?pretty=true" -H  "Authorization: Bearer $TOKEN"

.. code-block:: none
   :class: output

   {
       "data": {
           "affected_items": ["001"],
           "total_affected_items": 1,
           "total_failed_items": 0,
           "failed_items": [],
       },
       "message": "All selected agents were assigned to apache",
       "error": 0,
   }

Following this, we can query for groups to which a Wazuh agent belongs using the Wazuh server API endpoint :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>`:

.. code-block:: console

   # curl -k -X GET "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/agents?pretty=true&agents_list=001&select=group" -H  "Authorization: Bearer $TOKEN"

.. code-block:: none
   :class: output

   {
       "data": {
           "affected_items": [{"group": ["default", "webserver", "apache"], "id": "001"}],
           "total_affected_items": 1,
           "total_failed_items": 0,
           "failed_items": [],
       },
       "message": "All selected agents information was returned",
       "error": 0,
   }

In this case, the remote configuration for the group apache takes precedence over the three groups when a conflict exists on any configuration parameter.

Using the CLI (agent_groups tool)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

With the CLI :doc:`/var/ossec/bin/agent_groups </user-manual/reference/tools/agent-groups>` tool, Wazuh agents can be assigned to groups in the same way. In this example, the agent ``001`` is added to the ``webserver`` group:

.. code-block:: console

   $ /var/ossec/bin/agent_groups -a -i 001 -g webserver

.. code-block:: none
   :class: output

   Do you want to add the group 'webserver' to the agent '001'? [y/N]: y
   Group 'webserver' added to agent '001'.

.. code-block:: console

   $ /var/ossec/bin/agent_groups -a -i 001 -g apache


.. code-block:: none
   :class: output

   Do you want to add the group 'apache' to the agent '001'? [y/N]: y
   Group 'apache' added to agent '001'.

During agent enrollment
^^^^^^^^^^^^^^^^^^^^^^^

To assign the Wazuh agent to one or more groups during the enrollment process, enroll the agent by setting the groups where the Wazuh agent will be included with the ``-G`` option:

.. code-block:: console

   # /var/ossec/bin/agent-auth -m WAZUH_MANAGER_IP -G webserver,apache

Listing groups and configuration
--------------------------------

It is possible to query agents belonging to groups in real-time, and the configuration and shared files applied to each one, depending on which groups they belong to.

For example, to list the Wazuh agents in the webserver group, we could run the following query using the ``/var/ossec/bin/agent_groups`` tool:

.. code-block:: console

   # /var/ossec/bin/agent_groups -l -g webserver

.. code-block:: none
   :class: output

   3 agent(s) in group 'webserver':
     ID: 001 Name: ag-windows-12.
     ID: 003 Name: ag-windows-east.
     ID: 004 Name: centos-7-apache

We can also query which groups the Wazuh agent ``001`` is a member of:

.. code-block:: console

   # /var/ossec/bin/agent_groups -s -i 001

.. code-block:: none
   :class: output

   The agent 'ag-windows-12' with ID '001' has the group: '[u'webserver', u'apache']'.

The priority of the groups increases from the left to the right, meaning the last group has the highest priority. In the example above, apache is the group that has the highest priority.

Making changes to group assignment
----------------------------------

Just as agents can be assigned to multiple groups, it is also possible to revert assignments and switch between available groups. The command below removes the Wazuh agent ``001`` from the ``apache`` group:

.. code-block:: console

   # /var/ossec/bin/agent_groups -r -i 001 -g apache -q

.. code-block:: none
   :class: output

   Group 'apache' unset for agent '001'.

To verify the successful removal from the group, run this command on the Wazuh server to check which groups Wazuh agent ``001`` belongs to.

.. code-block:: console

   # /var/ossec/bin/agent_groups -s -i 001

.. code-block:: none
   :class: output

   The agent 'ag-windows-12' with ID '001' has the group: '[u'webserver']'.

It is also possible to switch between groups and overwrite the existing assignment:

.. code-block:: console

   # /var/ossec/bin/agent_groups -s -i 001

.. code-block:: none
   :class: output

   The agent 'ag-windows-12' with ID '001' has the group: '[u'default', u'webserver']'.

From the output above, the Wazuh agent has the existing group assignment: ``default``, ``webserver``.

.. code-block:: console

   # /var/ossec/bin/agent_groups -a -f -i 001 -g apache

.. code-block:: none
   :class: output

   Group 'apache' set to agent '001'.

The previous group assignment has been overwritten and changed to ``apache``.

.. code-block:: console

   # /var/ossec/bin/agent_groups -s -i 001

.. code-block:: none
   :class: output

   The agent 'ag-windows-12' with ID '001' has the group: '[u'apache']'.

The ``-f`` parameter resets the groups assigned to the Wazuh agent and forces it to belong only to the new group.

Shared files behavior
---------------------

As previously mentioned, the Wazuh manager shares configuration files with its agents according to their group. In the case of belonging to multiple groups, the configuration files of every group are merged into one following these criteria:

-  Shared files, such as CIS benchmarks for rootkit detection, are joined in the shared folder. If there are repeated files, the last one added will overwrite the old ones.
-  The new ``agent.conf`` file added is appended to the existing one. When two groups have conflicting configurations, the last group assigned to the Wazuh agent will take precedence. Learn more about the configuration precedence in :doc:`centralized configuration manual </user-manual/reference/centralized-configuration>`.
-  Custom shared files set from the user to a particular group are also joined to send them to the Wazuh agents.

.. thumbnail:: /images/manual/agent/shared-files-behavior.png
   :title: Shared files behavior
   :alt: Shared files behavior
   :align: center
   :width: 80%
