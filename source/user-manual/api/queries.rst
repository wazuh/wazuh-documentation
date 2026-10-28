.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Filter the results of the Wazuh manager API with the Wazuh Query Language (WQL) through the q parameter.

Filtering data using Wazuh Query Language (WQL)
===============================================

Advanced filtering is possible using the Wazuh manager API queries. Queries are specified using the ``q`` parameter. A query combines a field name, an operator, and a value, and a separator joins several queries.

-  **Field name**: Field name to filter by, where an incorrect field name returns an error
-  **Operator**: Operator to filter by:

   -  ``=``: equal to
   -  ``!=``: not equal to
   -  ``<``: less than
   -  ``>``: greater than
   -  ``~``: contains (like)
   -  ``()``: grouping operators

-  **Value**: Value to filter by
-  **Separator**: Operator to join multiple "queries":

   -  ``,``: represents an ``OR``
   -  ``;``: represents an ``AND``

.. note::

   Reserved characters need to be percent-encoded, especially semicolons (``;`` → ``%3B`` ). You can use ``--data-urlencode`` inside cURL to make the process easier.

Comparisons are not case-sensitive. For example, ``os.name=ubuntu`` matches ``Ubuntu``. The ``<`` and ``>`` operators compare text character by character, so for ``os.major``, ``os.minor``, and ``os.version``, ``9`` is greater than ``18``. Use them only with values that have the same number of digits. The Wazuh manager API validates the whole query and rejects a query that doesn't follow this syntax, such as a fragment after a separator that isn't a complete term, with error ``1407``.

Some agent endpoints also accept filter parameters in addition to ``q``. In Wazuh 5.0, :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>`, :api-ref:`DELETE /agents <operation/api.controllers.agent_controller.delete_agents>`, :api-ref:`PUT /agents/upgrade <operation/api.controllers.agent_controller.put_upgrade_agents>`, and :api-ref:`PUT /agents/upgrade_custom <operation/api.controllers.agent_controller.put_upgrade_custom_agents>` no longer accept ``manager_host`` and ``node_name``. They accept ``os.arch``, ``os.major``, ``os.minor``, and ``os.type`` instead. :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>` also no longer accepts ``group_config_status``.

Examples
--------

For example, to filter Ubuntu Wazuh agents with a major version higher than 18, use the following query. Remember that the value of the parameter ``q`` is being encoded with ``--data-urlencode``:

.. code-block:: console

   # curl -G --data-urlencode "q=os.name=ubuntu;os.major>18" -k -X GET "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/agents?limit=500&pretty=true&select=id,name,os.name,os.version,os.major" -H "Authorization: Bearer $TOKEN"

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "os": {
                  "major": "24",
                  "name": "Ubuntu",
                  "version": "24.04.4 LTS (Noble Numbat)"
               },
               "id": "021",
               "name": "Ubuntu"
            }
         ],
         "total_affected_items": 1,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All selected agents information was returned",
      "error": 0
   }

The same field can be used multiple times to get a more accurate result. For example, filtering Ubuntu agents with a major version higher than 18 but lower than 30:

.. code-block:: console

   # curl -G --data-urlencode "q=os.name=ubuntu;os.major>18;os.major<30" -k -X GET "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/agents?limit=500&pretty=true&select=id,name,os.name,os.version,os.major" -H "Authorization: Bearer $TOKEN"

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "os": {
                  "major": "24",
                  "name": "Ubuntu",
                  "version": "24.04.4 LTS (Noble Numbat)"
               },
               "id": "021",
               "name": "Ubuntu"
            }
         ],
         "total_affected_items": 1,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All selected agents information was returned",
      "error": 0
   }

An example of using the OR (``,``) operator and LIKE AS (``~``) can be filtering agents whose operating system name contains ``ubuntu`` or ``macos``:

.. code-block:: console

   # curl -G --data-urlencode "q=os.name~ubuntu,os.name~macos" -k -X GET "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/agents?limit=500&pretty=true&select=id,name,os.name,os.version,os.major" -H "Authorization: Bearer $TOKEN"

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "os": {
                  "major": "15",
                  "name": "macOS",
                  "version": "15.6.1"
               },
               "id": "020",
               "name": "macOS"
            },
            {
               "os": {
                  "major": "24",
                  "name": "Ubuntu",
                  "version": "24.04.4 LTS (Noble Numbat)"
               },
               "id": "021",
               "name": "Ubuntu"
            }
         ],
         "total_affected_items": 2,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All selected agents information was returned",
      "error": 0
   }

The following example combines multiple operators. It gets the Wazuh agents with an ID lower than ``021`` whose operating system name contains ``windows`` or ``macos``:

.. code-block:: console

   # curl -G --data-urlencode "q=id<021;(os.name~windows,os.name~macos)" -k -X GET "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/agents?limit=500&pretty=true&select=id,name,os.name,os.version,os.major" -H "Authorization: Bearer $TOKEN"

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "os": {
                  "major": "10",
                  "name": "Microsoft Windows 11 Pro",
                  "version": "10.0.26200.9711"
               },
               "id": "019",
               "name": "Windows"
            },
            {
               "os": {
                  "major": "15",
                  "name": "macOS",
                  "version": "15.6.1"
               },
               "id": "020",
               "name": "macOS"
            }
         ],
         "total_affected_items": 2,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All selected agents information was returned",
      "error": 0
   }

The following query gets agents with an ID higher than ``0`` that run on Windows or whose operating system major version is either ``15`` or ``18``:

.. code-block:: console

   # curl -G --data-urlencode "q=id>0;(os.name~windows,(os.major=15,os.major=18))" -k -X GET "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/agents?limit=500&pretty=true&select=id,name,os.name,os.version,os.major" -H "Authorization: Bearer $TOKEN"

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "os": {
                  "major": "10",
                  "name": "Microsoft Windows 11 Pro",
                  "version": "10.0.26200.9711"
               },
               "id": "019",
               "name": "Windows"
            },
            {
               "os": {
                  "major": "15",
                  "name": "macOS",
                  "version": "15.6.1"
               },
               "id": "020",
               "name": "macOS"
            }
         ],
         "total_affected_items": 2,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All selected agents information was returned",
      "error": 0
   }
