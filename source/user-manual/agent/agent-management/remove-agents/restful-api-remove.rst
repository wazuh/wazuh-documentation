.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section includes examples of using the DELETE /agents request to delete agents.

Remove agents using the Wazuh server API
----------------------------------------

This section includes examples of using the :api-ref:`DELETE /agents <operation/api.controllers.agent_controller.delete_agents>` request to delete a list of agents or agents disconnected for a given period. This action is performed on the Wazuh server or on an authorized endpoint.

The examples use an :ref:`authentication token <api_log_in>`. To get your token, replace ``<USER>:<PASSWORD>`` with your Wazuh server API credentials, ``<WAZUH_MANAGER_IP>`` with the Wazuh manager IP address or FQDN (Fully Qualified Domain Name), and run the following command:

.. code-block:: console

   # TOKEN=$(curl -u <USER>:<PASSWORD> -k -X GET "https://<WAZUH_MANAGER_IP>:55000/security/user/authenticate?raw=true")

.. note::

   You can locate your Wazuh server API user password in the ``wazuh-install-files.tar`` file generated during the installation process of the Wazuh server. You can also :doc:`reset the password </user-manual/user-administration/password-management>` for the Wazuh server API user if you have forgotten it.

Removing agents in a list
^^^^^^^^^^^^^^^^^^^^^^^^^

You can remove specific Wazuh agents using a list. Use the parameter ``agents_list`` to set a list of agent IDs separated by commas. For example, to remove agents ID ``005``, ``006``, and ``007``, run the following query:

.. code-block:: console

   # curl -k -X DELETE "https://<WAZUH_MANAGER_IP>:55000/agents?pretty=true&older_than=0s&agents_list=005,006,007&status=all" -H  "Authorization: Bearer $TOKEN"

Replace ``<WAZUH_MANAGER_IP>`` with the IP address or FQDN of the Wazuh server.

.. code-block:: json
   :class: output

   {
       "data": {
           "affected_items": [
               "005",
               "006",
               "007"
           ],
           "total_affected_items": 3,
           "total_failed_items": 0,
           "failed_items": [],
       },
       "message": "All selected agents were deleted",
       "error": 0,
   }

.. _remove_disconnected_agents:

Removing disconnected agents
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can remove Wazuh agents that never connected or agents that have been disconnected for a given period. Use the parameter ``older_than`` to set a period of no known activity. Use ``status`` to select the never connected and disconnected Wazuh agents. For example, to remove Wazuh agents inactive for more than 21 days, execute the following query:

.. code-block:: console

   # curl -k -X DELETE "https://<WAZUH_MANAGER_IP>:55000/agents?pretty=true&older_than=21d&agents_list=all&status=never_connected,disconnected" -H  "Authorization: Bearer $TOKEN"

Replace ``<WAZUH_MANAGER_IP>`` with the IP address or FQDN of the Wazuh server.

.. code-block:: json
   :class: output

   {
      "data": {
         "affected_items": [
            "003"
         ],
         "total_affected_items": 1,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All selected agents were deleted",
      "error": 0
   }
