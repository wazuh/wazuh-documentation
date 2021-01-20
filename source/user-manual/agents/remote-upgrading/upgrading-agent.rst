.. Copyright (C) 2021 Wazuh, Inc.

.. _upgrading-agent:

Upgrading agent
===============

The following is a description of the upgrade procedure by means of a use case.

Upgrading an agent remotely can be performed at the command line and through the Wazuh API.

.. warning::
        It is recommended to use the Wazuh API to upgrade agents if running a Wazuh cluster.

Using the command line
----------------------

To upgrade agents using the command line, use the :doc:`agent_upgrade <../../reference/tools/agent_upgrade>` tool as follows:

1. List all outdated agents using the *'-l'* parameter:

    .. code-block:: console

        # agent_upgrade -l

    .. code-block:: none
        :class: output

        ID    Name                               Version
        002   VM_Debian9                         Wazuh v3.0.0
        003   VM_Debian8                         Wazuh v3.0.0
        009   VM_WinServ2016                     Wazuh v3.0.0

        Total outdated agents: 3

2. Upgrade the agent with ID 002 using the *'-a'* parameter followed by the agent ID:

    .. code-block:: console

        # agent_upgrade -a 002

    .. code-block:: none
        :class: output

        Sending WPK: [=========================] 100%
        Upgrade procedure started... Please wait.
        Agent upgraded: Wazuh v3.0.0 -> Wazuh v3.1.0


3. Following the upgrade, the agent is automatically restarted.  Check the agent version to ensure it has been properly upgraded as follows:

    .. code-block:: console

        # /var/ossec/bin/agent_control -i 002

    .. code-block:: none
        :class: output

        Wazuh agent_control. Agent information:
           Agent ID:   002
           Agent Name: VM_Debian9
           IP address: any/any
           Status:     Active

           Operating system:    Linux debian 4.9.0-3-amd64 #1 SMP Debian 4.9.30-2+deb9u2 (2017-06-26) x86_64 [Debian GNU/Linux|debian: 9 (stretch)]
           Client version:      Wazuh v3.1.0 / ab73af41699f13fdd81903b5f23d8d00
           Shared file hash:    89b437dc6c9e962be3fe9eb6a65cc027
           Last keep alive:     Mon Jul 31 10:43:04 2017

           Syscheck last started  at: Mon Jul 31 10:38:39 2017
           Rootcheck last started at: Fri Jul 28 18:17:59 2017


Using the RESTful API
----------------------

1.  List all outdated agents using endpoint :api-ref:`GET /agents/outdated <operation/api.controllers.agents_controller.get_agent_outdated>`:

    .. code-block:: console

        # curl -k -X GET "https://localhost:55000/agents/outdated?pretty=true" -H  "Authorization: Bearer $TOKEN"

    .. code-block:: json
        :class: output

        {
            "data": {
                "affected_items": [
                    {"version": "Wazuh v3.0.0", "id": "002", "name": "VM_Debian9"},
                    {"version": "Wazuh v3.0.0", "id": "003", "name": "VM_Debian8"},
                    {"version": "Wazuh v3.0.0", "id": "009", "name": "VM_WinServ2016"},
                ],
                "total_affected_items": 3,
                "total_failed_items": 0,
                "failed_items": [],
            },
            "message": "All selected agents information was returned",
            "error": 0,
        }


2. Upgrade the agent with ID 002 using endpoint :api-ref:`PUT /agents/{agent_id}/upgrade <operation/api.controllers.agents_controller.put_upgrade_agent>`:

    .. code-block:: console

        # curl -k -X PUT "https://localhost:55000/agents/002/upgrade?pretty=true" -H  "Authorization: Bearer $TOKEN"

    .. code-block:: json
        :class: output

        {
           "error": 0,
           "message": "Upgrade procedure started"
        }


3. Check the upgrade result using endpoint :api-ref:`GET /agents/{agent_id}/upgrade_result <operation/api.controllers.agents_controller.get_agent_upgrade>`:

    .. code-block:: console

        # curl -k -X GET "https://localhost:55000/agents/002/upgrade_result?pretty=true" -H  "Authorization: Bearer $TOKEN"

    .. code-block:: json
        :class: output

        {
           "error": 0,
           "message": "Agent was successfully upgraded"
        }


4.  Following the upgrade, the agent is automatically restarted. Check the agent version to ensure it has been properly upgraded using endpoint :api-ref:`GET /agents <operation/api.controllers.agents_controller.get_agents>`:

    .. code-block:: console

        # curl -k -X GET "https://localhost:55000/agents?agents_list=002&pretty=true&select=version" -H  "Authorization: Bearer $TOKEN"

    .. code-block:: json
        :class: output

        {
            "data": {
                "affected_items": [{"id": "002", "version": "Wazuh v4.0.0"}],
                "total_affected_items": 1,
                "total_failed_items": 0,
                "failed_items": [],
            },
            "message": "All selected agents information was returned",
            "error": 0,
        }
