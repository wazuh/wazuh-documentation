.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Upgrading an agent remotely can be performed at the command line and through the Wazuh API. Learn more about it in this section. 

.. _upgrading-agent:

Upgrading agent
===============

The following is a description of the upgrade procedure through a use case.

Upgrading an agent remotely can be performed at the command line and through the Wazuh API.

.. warning::
        It is recommended to use the Wazuh API to upgrade agents if running a Wazuh cluster.

Using the RESTful API
----------------------

1.  List all outdated agents using endpoint :api-ref:`GET /agents/outdated <operation/api.controllers.agent_controller.get_agent_outdated>`:

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


2. Upgrade the agents with ID 002 and 003 using endpoint :api-ref:`PUT /agents/upgrade <operation/api.controllers.agent_controller.put_upgrade_agents>`:

        The parameter `agents_list` of endpoints :api-ref:`PUT /agents/upgrade <operation/api.controllers.agent_controller.put_upgrade_agents>` and :api-ref:`PUT /agents/upgrade_custom <operation/api.controllers.agent_controller.put_upgrade_custom_agents>` allows the value `all`. When setting this value, an upgrade request will be sent to all agents.

    When upgrading more than 3000 agents at the same time, it's highly recommended to use the parameter `wait_for_complete` set to `true` to avoid a possible API timeout.

    This number of agents from which `wait_for_complete=true` is recommended, has been set after testing the endpoint in a Wazuh environment whose manager was installed in a host with specifications: 2.5 GHz AMD EPYC 7000 series processor and 4 GiB of memory. Using an agents list with a size less than or equal to 3000 and a host with the same or higher specs guarantees this endpoint to return a response before the API timeout.

    .. code-block:: console

        # curl -k -X PUT "https://localhost:55000/agents/upgrade?agents_list=002,003&pretty=true" -H  "Authorization: Bearer $TOKEN"


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
          "message": "All upgrade tasks were created",
          "error": 0
        }


3. Check the upgrade results using endpoint :api-ref:`GET /agents/upgrade_result <operation/api.controllers.agent_controller.get_agent_upgrade>`:

    .. code-block:: console

        # curl -k -X GET "https://localhost:55000/agents/upgrade_result?agents_list=002,003&pretty=true" -H  "Authorization: Bearer $TOKEN"

    .. code-block:: json
        :class: output

        {
          "data": {
            "affected_items": [
              {
                "message": "Success",
                "agent": "002",
                "task_id": 1,
                "node": "worker2",
                "module": "upgrade_module",
                "command": "upgrade",
                "status": "Updated",
                "create_time": "2020-10-21T17:13:45Z",
                "update_time": "2020-10-21T17:14:07Z"
              },
              {
                "message": "Success",
                "agent": "003",
                "task_id": 2,
                "node": "worker1",
                "module": "upgrade_module",
                "command": "upgrade",
                "status": "Updated",
                "create_time": "2020-10-21T17:13:45Z",
                "update_time": "2020-10-21T17:14:11Z"
              }
            ],
            "total_affected_items": 2,
            "total_failed_items": 0,
            "failed_items": []
          },
          "message": "All upgrade tasks were returned",
          "error": 0
        }


4.  Following the upgrade, the agents are automatically restarted. Check the agents version to ensure it has been properly upgraded using endpoint :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>`:

    .. code-block:: console

        # curl -k -X GET "https://localhost:55000/agents?agents_list=002,003&pretty=true&select=version" -H  "Authorization: Bearer $TOKEN"

    .. code-block:: json
        :class: output

        {
          "data": {
            "affected_items": [
              {
                "id": "002",
                "version": "Wazuh |WAZUH_CURRENT|"
              },
              {
                "id": "003",
                "version": "Wazuh |WAZUH_CURRENT|"
              }
            ],
            "total_affected_items": 2,
            "total_failed_items": 0,
            "failed_items": []
          },
          "message": "All selected agents information was returned",
          "error": 0
        }
