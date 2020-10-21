.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading-agent:

Upgrading agent
===============

The following is a description of the upgrade procedure by means of a use case.

Upgrading an agent remotely can be performed at the command line and through the Wazuh API.

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

Multiple agents can be upgraded at the same time using the RESTful API.

1.  List all outdated agents:

    .. code-block:: console

        # curl -u foo:bar -X GET "http://localhost:55000/agents/outdated?pretty=true"

    .. code-block:: json
        :class: output

        {
          "data": {
            "affected_items": [
              {
                "name": "wazuh-agent1",
                "version": "Wazuh v3.13.2",
                "id": "001"
              },
              {
                "name": "wazuh-agent2",
                "version": "Wazuh v3.13.2",
                "id": "002"
              },
              {
                "name": "wazuh-agent3",
                "version": "Wazuh v3.13.2",
                "id": "003"
              }
            ],
            "total_affected_items": 3,
            "total_failed_items": 0,
            "failed_items": []
          },
          "message": "All selected agents information was returned",
          "error": 0
        }


2. Upgrade the agents with IDs 002 and 003:

    .. code-block:: console

        # curl -u foo:bar -X PUT "http://localhost:55000/agents/upgrade?agents_list=002,003&pretty=true"

    .. code-block:: json
        :class: output

        {
          "data": {
            "affected_items": [
              {
                "agent": "002",
                "task_id": 1
              },
              {
                "agent": "003",
                "task_id": 2
              }
            ],
            "total_affected_items": 2,
            "total_failed_items": 0,
            "failed_items": []
          },
          "message": "All upgrade tasks have been created",
          "error": 0
        }


3. Check the upgrade result:

    .. code-block:: console

        # curl -u foo:bar -X GET "http://localhost:55000/agents/upgrade_result?agents_list=002,003&pretty=true"

    .. code-block:: json
        :class: output

        {
          "data": {
            "affected_items": [
              {
                "message": "Success",
                "agent": "002",
                "task_id": 2,
                "node": "worker2",
                "module": "upgrade_module",
                "command": "upgrade",
                "status": "Updated",
                "create_time": "2020/10/21 17:13:45",
                "update_time": "2020/10/21 17:14:07"
              },
              {
                "message": "Success",
                "agent": "003",
                "task_id": 3,
                "node": "worker1",
                "module": "upgrade_module",
                "command": "upgrade",
                "status": "Updated",
                "create_time": "2020/10/21 17:13:45",
                "update_time": "2020/10/21 17:14:11"
              }
            ],
            "total_affected_items": 2,
            "total_failed_items": 0,
            "failed_items": []
          },
          "message": "All agents have been updated",
          "error": 0
        }


4.  Following the upgrade, the agent is automatically restarted.  Check the agent version to ensure it has been properly upgraded follows:

    .. code-block:: console

        # curl -u foo:bar -X GET "http://localhost:55000/agents?agents_list=002,003&pretty=true&select=version"

    .. code-block:: json
        :class: output

        {
          "data": {
            "affected_items": [
              {
                "id": "002",
                "version": "Wazuh v4.1.0"
              },
              {
                "id": "003",
                "version": "Wazuh v4.1.0"
              }
            ],
            "total_affected_items": 2,
            "total_failed_items": 0,
            "failed_items": []
          },
          "message": "All selected agents information was returned",
          "error": 0
        }
