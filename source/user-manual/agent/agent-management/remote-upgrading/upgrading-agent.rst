.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: A Wazuh agent can be upgraded remotely using the Wazuh dashboard, the command line, or the Wazuh manager API. Learn more in this section of the documentation.

Upgrading the Wazuh agent
=========================

You can upgrade a Wazuh agent remotely using the Wazuh dashboard, the command line, or the Wazuh manager API.

.. note::

   It is recommended to use the Wazuh manager API to upgrade agents if running a Wazuh cluster.

Using the Wazuh dashboard
-------------------------

#. Click the upper-left menu icon and navigate to **Agents management** > **Summary**. In the Wazuh agents table, the **Version** column marks Wazuh agents that run an older version than the Wazuh manager as **Outdated**.

#. Upgrade one or more Wazuh agents:

   -  To upgrade a single Wazuh agent, select **Upgrade** in the **Actions** column of that Wazuh agent, then confirm with **Upgrade**. If the Wazuh manager can't detect the package type, choose it in **Package type**. This action is only available for active Wazuh agents that are outdated.
   -  To upgrade several Wazuh agents, select them in the table, then click **More** > **Upgrade agents** and confirm with **Upgrade**.

#. Review the **Upgrade status**. It lists the Wazuh agents for which an upgrade task was created and any errors, with a suggested remediation.

#. While the upgrade runs, the **Version** column shows **Upgrading**. The list refreshes once each Wazuh agent reports its new version.

.. note::

   The Wazuh manager API user must have the ``agent:upgrade`` permission. Otherwise, the Wazuh dashboard reports that there are no permissions to upgrade one or more of the selected Wazuh agents.

Using the command line
----------------------

To upgrade agents using the command line, use the :doc:`/var/wazuh-manager/bin/agent_upgrade </user-manual/reference/tools/agent-upgrade>` tool as follows:

#. List all outdated Wazuh agents using the ``-l`` parameter:

   .. code-block:: console

      # /var/wazuh-manager/bin/agent_upgrade -l

   Output

   .. code-block:: none
      :class: output

      ID    Name                                Version
      008   windows11                           v4.14.3

      Total outdated agents: 1

#. Upgrade the Wazuh agent using the ``-a`` parameter followed by the agent ID (here, the agent ID is 008):

   .. code-block:: console

      # /var/wazuh-manager/bin/agent_upgrade -a 008

   Output

   .. code-block:: none
      :class: output

      Upgrade tasks created for 1 agent(s).
      Note: Agents will execute upgrades autonomously. Use agent logs to track progress.

   It is possible to specify multiple agent IDs using this method:

   .. code-block:: console

      # /var/wazuh-manager/bin/agent_upgrade -a 001 002

   Output

   .. code-block:: none
      :class: output

      Upgrade tasks created for 2 agent(s).
      Note: Agents will execute upgrades autonomously. Use agent logs to track progress.

#. Following the upgrade, the Wazuh agent restarts automatically. Wazuh 5.0 doesn't record the result of an upgrade task, so check that the Wazuh agent is no longer listed as outdated:

   .. code-block:: console

      # /var/wazuh-manager/bin/agent_upgrade -l

   Output

   .. code-block:: none
      :class: output

      All agents are updated.

   If the Wazuh agent is still listed after a few minutes, check the Wazuh agent log for errors.

Using the RESTful API
---------------------

#. List all outdated Wazuh agents using endpoint :api-ref:`GET /agents/outdated <operation/api.controllers.agent_controller.get_agent_outdated>`. Replace ``<WAZUH_MANAGER_IP>`` with the IP address or FQDN of the Wazuh manager:

   .. code-block:: console

      # curl -k -X GET "https://<WAZUH_MANAGER_IP>:55000/agents/outdated?pretty=true" -H  "Authorization: Bearer $TOKEN"

   Output:

   .. code-block:: none
      :class: output

      {
         "data": {
            "affected_items": [
               {
                  "os": {
                     "arch": "x86_64",
                     "major": "10",
                     "minor": "0",
                     "name": "Microsoft Windows 11 Home",
                     "platform": "windows",
                     "version": "10.0.26200.8457"
                  },
                  "lastKeepAlive": "2026-05-26T16:56:18+00:00",
                  "ip": "192.168.1.101",
                  "group": [
                     "default"
                  ],
                  "name": "windows11",
                  "registerIP": "any",
                  "id": "008",
                  "status_code": 0,
                  "dateAdd": "2026-05-26T16:48:55+00:00",
                  "version": "v4.14.3",
                  "status": "active"
               }
            ],
            "total_affected_items": 1,
            "total_failed_items": 0,
            "failed_items": []
         },
         "message": "All selected agents information was returned",
         "error": 0
      }

#. Upgrade the Wazuh agent using endpoint :api-ref:`PUT /agents/upgrade <operation/api.controllers.agent_controller.put_upgrade_agents>` (here, the Wazuh agent with ID 008). Replace ``<WAZUH_MANAGER_IP>`` with the IP address or FQDN of the Wazuh manager:

   .. code-block:: console

      # curl -k -X PUT "https://<WAZUH_MANAGER_IP>:55000/agents/upgrade?agents_list=008&pretty=true" -H  "Authorization: Bearer $TOKEN"

   Output

   .. code-block:: none
      :class: output

      {
         "data": {
            "affected_items": [
               {
                  "agent": "008",
                  "task_id": 3
               }
            ],
            "total_affected_items": 1,
            "total_failed_items": 0,
            "failed_items": []
         },
         "message": "All upgrade tasks were created",
         "error": 0
      }

   The ``agents_list`` parameter in the :api-ref:`PUT /agents/upgrade <operation/api.controllers.agent_controller.put_upgrade_agents>` and :api-ref:`PUT /agents/upgrade_custom <operation/api.controllers.agent_controller.put_upgrade_custom_agents>` endpoints allows the value ``all``. When this value is set, an upgrade request will be sent to all Wazuh agents.

   When upgrading more than 3000 Wazuh agents at the same time, it is highly recommended that the parameter ``wait_for_complete`` be set to true to avoid a possible API timeout.

   This recommendation is based on testing with a Wazuh manager on a server with a 2.5 GHz AMD EPYC 7000 series processor and 4 GiB memory. Using an agent list with 3000 agents or fewer on a system with similar or better specifications guarantees a response before the API timeout occurs.

#. Following the upgrade, the Wazuh agent restarts automatically. Wazuh 5.0 doesn't record the result of an upgrade task, so check the version of the Wazuh agent to confirm the upgrade using endpoint :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>`:

   .. code-block:: console

      # curl -k -X GET "https://<WAZUH_MANAGER_IP>:55000/agents?agents_list=008&pretty=true&select=version" -H  "Authorization: Bearer $TOKEN"

   Output

   .. code-block:: json
      :class: output

      {
        "data": {
              "affected_items": [
                {
                  "id": "008",
                  "version": "v5.0.0"
                }
              ],
              "total_affected_items": 1,
              "total_failed_items": 0,
              "failed_items": []
        },
        "message": "All selected agents information was returned",
        "error": 0
      }
