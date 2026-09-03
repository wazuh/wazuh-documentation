.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure the Active Response capability in this section of the Wazuh documentation.

Configuration
=============

Configure active response to define when and how Wazuh automatically executes actions in response to specific events.

Wazuh dashboard
----------------

Configure active response commands and their triggers from the Wazuh dashboard. Follow these steps to create an active response and configure its trigger.

#. From the Wazuh dashboard main menu, navigate to **Explore** > **Active Responses**.

#. Click **Create active response** and complete the configuration form with the following details:

   -  **Name**: The name of the active response. Use this name when attaching the active response to a trigger action.

   -  **Description**: An optional description of the active response and its purpose.

   -  **Executable**: The active response script or executable that runs when the response triggers. You do not need to specify the file extension unless multiple scripts share the same name.

   -  **Extra arguments**: Optional arguments required by the active response script.

   -  **Location**: Specifies where the active response executes:

      -  **All**: Executes the active response on every agent. Use this option with caution, as an incorrect configuration can affect the entire environment.

      -  **Local**: Executes the active response on the agent that generates the finding.

      -  **Defined agent**: Executes the active response on a specific agent, regardless of where the event occurs. Enter the target Wazuh agent ID in the **Agent ID** field.

   -  **Type**: Specifies the type of active response:

      -  **Stateful**: Executes the response for a specified period and automatically reverts the action when the timeout expires.

      -  **Stateless**: Executes the response once on the specified endpoint(s) and does not automatically revert the action.

   -  **Stateful timeout**: Specifies how long, in seconds, a stateful active response remains active before it automatically reverts the action.

#. Click **Create** to save the configuration.

.. note::

   Restarting a Wazuh manager is not required after creating or modifying an active response configuration. The Wazuh manager automatically distributes the updated active response configuration to the agents where the active response is configured to run.

Monitored endpoint
--------------------

Wazuh provides out-of-the-box active response scripts for performing common response actions on monitored endpoints. These scripts are included with the Wazuh agent and do not require additional scripts to be deployed on the endpoint.

For example, the ``block-ip`` script blocks or unblocks network access from a specified IP address using supported firewall mechanisms available on the endpoint. On Linux endpoints, Wazuh also provides the ``disable-account`` script to disable or re-enable user accounts.

See the :doc:`Default active response scripts <default-active-response-scripts>` section for a complete list of the available scripts, the actions they perform, and the operating systems they support.

When a required response action is not available through the default scripts, you can create a custom active response script. Wazuh supports custom scripts written in any programming language. Before the Wazuh agent can execute a custom script, place it in the agent's active response directory for that platform and configure the required permissions.

A custom active response script must also implement the JSON message format that Wazuh uses to communicate with active response scripts. See :ref:`Developing active response scripts <developing_active_response_scripts>` for the required message format, and the subsections below for the script location and permissions on Linux/Unix, macOS, and Windows endpoints.

Linux/Unix
^^^^^^^^^^

#. Add your custom active response script or executable to the ``/var/ossec/active-response/bin`` directory on Linux/Unix endpoints.

#. Change the script permissions and ownership as shown below:

   .. code-block:: console

      $ sudo chmod 750 /var/ossec/active-response/bin/<CUSTOM_SCRIPT>
      $ sudo chown root:wazuh /var/ossec/active-response/bin/<CUSTOM_SCRIPT>

macOS
^^^^^

#. Add your custom active response script or executable to the ``/Library/Ossec/active-response/bin`` directory on macOS endpoints.

#. Change the script permissions and ownership as shown below:

   .. code-block:: console

      $ sudo chmod 750 /Library/Ossec/active-response/bin/<CUSTOM_SCRIPT>
      $ sudo chown root:wazuh /Library/Ossec/active-response/bin/<CUSTOM_SCRIPT>

Windows
^^^^^^^

Add your custom active response script or executable to the ``C:\Program Files (x86)\ossec-agent\active-response\bin`` directory on Windows endpoints.
