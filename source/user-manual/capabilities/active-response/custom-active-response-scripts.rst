.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn more about the active response scripts you can create in this section of the documentation.

Custom active response scripts
==============================

You can write active response scripts in any programming language supported by the target endpoint. The active response configuration determines the command to execute, the conditions that trigger the response, and the endpoint where the script runs.

.. _developing_active_response_scripts:

Developing active response scripts
-------------------------------------

Wazuh sends active response data to the script as a JSON message through ``STDIN``. The script reads this message and extracts the information it needs to perform the requested action.

For example, Wazuh sends the following message to the ``block-ip`` active response script:

.. code-block:: json

   {
     "wazuh": {
       "active_response": {
         "name": "block-ip",
         "executable": "block-ip",
         "location": "all",
         "agent_id": "001",
         "type": "stateless"
       },
       "agent": {
         "id": "001",
         "name": "test-agent"
       }
     },
     "source": {
       "ip": "192.168.1.100"
     },
     "user": {
       "name": "username"
     },
     "command": "enable"
   }

Active response message structure
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

An active response script receives a JSON message with the following structure:

.. code-block:: json

   {
     "wazuh": {
       "active_response": {
         "name": "",
         "executable": "",
         "location": "",
         "agent_id": "",
         "type": "",
         "stateful_timeout": 0
       },
       "agent": {
         "id": "",
         "name": ""
       }
     },
     "source": {},
     "user": {},
     "command": ""
   }

The message contains the following fields:

-  ``wazuh.active_response``: Provides metadata about the active response, including its name, executable, execution location, response type, and, for stateful responses, the timeout in seconds.

-  ``wazuh.agent``: Identifies the Wazuh agent that executes the active response.

-  ``source``, ``user``, ``wazuh.rule.id``, and other top-level WCS fields: Contain relevant data from the finding that triggers the response. For example, ``source.ip`` identifies the source IP address associated with the finding.

-  ``command``: Specifies the action that the script must perform. The ``enable`` value initiates the response, while ``disable`` reverts it.

A stateless or stateful active response script must handle this message differently, depending on its type.

Stateless active response
^^^^^^^^^^^^^^^^^^^^^^^^^^

Stateless active responses are one-time actions without a way to revert or stop them.

Wazuh allows you to program stateless custom active responses in any programming language. They need to be able to perform the following actions for proper execution:

#. Read ``STDIN`` to get the JSON message.

#. Parse the JSON message.

#. Confirm that the ``command`` field has the ``enable`` action.

#. Extract the necessary information for its execution.

Stateful active response
^^^^^^^^^^^^^^^^^^^^^^^^^^

A stateful active response performs an action and reverts or stops its action after a specified period.
You can develop stateful custom active responses in any programming language supported by the endpoint. The script must perform the following operations:

#. Read the JSON message from ``STDIN``.

#. Parse the JSON message.

#. Inspect the ``command`` field to determine whether it contains the ``enable`` or ``disable`` action:

   -  When the command is ``enable``, execute the main response action.

   -  When the command is ``disable``, stop or revert the response action.

#. Extract the information required to perform and control the action. For example, the ``block-ip`` script uses the ``source.ip`` field to identify the IP address to block or unblock.

#. Generate or extract the key required to identify the active response in JSON format. For example, the key can contain the IP address that the script blocks.

.. toctree::
   :maxdepth: 2

   python-active-response-script-sample
