.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to build and interpret requests to the Wazuh server API.

Understanding the Wazuh server API requests and responses
=========================================================

This section explains how to build and interpret requests to the Wazuh server API, including the most important headers, parameters, response structure, and common patterns.

Request structure
-----------------

A standard Wazuh server API request consists of three essential components:

#. **HTTP Method**

   -  GET: Retrieve information
   -  POST: Create resources
   -  PUT: Update resources
   -  DELETE: Remove resources

#. **API URL / Endpoint**

   -  Format: ``http://<WAZUH_MANAGER_IP>:55000/<ENDPOINT>``
   -  Use https (recommended) or http depending on your configuration
   -  Common endpoints: ``/agents``, ``/manager/info``, ``/rules``, ``/security/users``.

#. **Authorization Header**

   -  All endpoints (except login) require a JWT token
   -  Format: ``-H "Authorization: Bearer $TOKEN"``

Below is an example cURL request to get Wazuh agent OS summary:

.. code-block:: console

   # curl -k -X GET "https://<WAZUH_MANAGER_IP>:55000/agents/summary/os?pretty=true" -H  "Authorization: Bearer $TOKEN"

The cURL command for each request contains the following fields:

+---------------------------------------------------------+----------------------------------------------------------------------------------------------------+
| **Field**                                               | **Description**                                                                                    |
+=========================================================+====================================================================================================+
| ``-X GET/POST/PUT/DELETE``                              | Specify a request method to use when communicating with the HTTP server.                           |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------------+
| ``http://<WAZUH_MANAGER_IP>:55000/<ENDPOINT>``          | The API URL to use. Specify http or https depending on whether SSL is activated in the API or not. |
| ``https://<WAZUH_MANAGER_IP>:55000/<ENDPOINT>``         |                                                                                                    |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------------+
| ``-H "Authorization: Bearer <YOUR_JWT_TOKEN>"``         | Include an extra header in the request to specify the JWT.                                         |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------------+
| ``-k``                                                  | Suppress SSL certificate errors (only if you use the default self-signed certificates).            |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------------+

-  All requests (except ``POST /security/user/authenticate`` and ``POST /security/user/authenticate/run_as``) accept the ``pretty`` parameter to convert the JSON response to a human-readable format.

Response format
---------------

All responses are in JSON format, and most of them follow this structure:

+------------------+-------------------------+---------------------------------------------------------------------------------------------------------------------+
| **Field**        | **Optional Sub-fields** | **Description**                                                                                                     |
+==================+=========================+=====================================================================================================================+
| data             | affected_items          | List each of the successfully affected items in the request.                                                        |
|                  +-------------------------+---------------------------------------------------------------------------------------------------------------------+
|                  | total_affected_items    | Total number of successfully affected items.                                                                        |
|                  +-------------------------+---------------------------------------------------------------------------------------------------------------------+
|                  | failed_items            | List containing each of the failed items in the request.                                                            |
|                  +-------------------------+---------------------------------------------------------------------------------------------------------------------+
|                  | total_failed_items      | Total number of failed items.                                                                                       |
+------------------+-------------------------+---------------------------------------------------------------------------------------------------------------------+
| message          |                         | Result description.                                                                                                 |
+------------------+-------------------------+---------------------------------------------------------------------------------------------------------------------+
| error            |                         | For HTTP ``200`` responses, it determines if the response was complete (``0``), failed (``1``), or partial (``2``). |
|                  |                         | For HTTP ``4xx`` or ``5xx`` responses, it determines the error code related to the failure.                         |
+------------------+-------------------------+---------------------------------------------------------------------------------------------------------------------+

Most responses follow this standard structure:

.. code-block:: none
   :class: output

   {
     "data": {
       "affected_items": [ ... ],          // List of successfully processed items
       "total_affected_items": 5,          // Count of successful items
       "failed_items": [ ... ],            // List of failed items with details
       "total_failed_items": 2             // Count of failed items
     },
     "message": "Operation completed successfully",  // Human-readable result description
     "error": 0                                  // 0 = complete success, 1 = failed, 2 = partial
   }

**Error field meanings** (in HTTP 200 responses):

-  0 - Full success
-  1 - Complete failure
-  2 - Partial success (some items succeeded, some failed)

Common HTTP status codes
------------------------

+-------+-----------------------+------------------------------------------+
| Code  | Meaning               | Typical cause                            |
+=======+=======================+==========================================+
| 200   | OK                    | Request successful (even if partial/fail |
|       |                       | ure inside).                             |
+-------+-----------------------+------------------------------------------+
| 400   | Bad Request           | Invalid parameters or payload            |
+-------+-----------------------+------------------------------------------+
| 401   | Unauthorized          | Missing or invalid JWT token             |
+-------+-----------------------+------------------------------------------+
| 403   | Forbidden             | Valid token but insufficient RBAC permis |
|       |                       | sions                                    |
+-------+-----------------------+------------------------------------------+
| 404   | Not Found             | Endpoint or resource does not exist      |
+-------+-----------------------+------------------------------------------+
| 429   | Too Many Requests     | Rate limit exceeded (if enabled)         |
+-------+-----------------------+------------------------------------------+
| 500   | Internal Server Error | Server-side issue – check API logs       |
+-------+-----------------------+------------------------------------------+

-  All responses include an HTTP status code: 2xx (success), 4xx (client error), 5xx (server error), etc.

Useful query parameters
-----------------------

These parameters are accepted by most list-type endpoints.

+----------------------------+---------------------------------------------------------------------------------+----------------------------------------------------+
| Parameter                  | Description                                                                     | Recommended Use                                    |
+============================+=================================================================================+====================================================+
| ``pretty=true``            | Formats JSON output with indentation (human-readable)                           | Always use during testing/debugging                |
+----------------------------+---------------------------------------------------------------------------------+----------------------------------------------------+
| ``limit=N``                | Maximum number of items returned (default: 500, max: 100,000)                   | Use with caution for large values                  |
+----------------------------+---------------------------------------------------------------------------------+----------------------------------------------------+
| ``offset=N``               | Skip the first N items (for pagination)                                         | Combine with ``limit`` for large result sets       |
+----------------------------+---------------------------------------------------------------------------------+----------------------------------------------------+
| ``wait_for_complete=true`` | Disable request timeout (useful for long operations like agent upgrades)        | Only for specific long-running endpoints           |
+----------------------------+---------------------------------------------------------------------------------+----------------------------------------------------+

-  By default, responses that contain data collections return a maximum of 500 elements. You can use the ``offset`` and ``limit`` parameters to iterate through large collections. While the ``limit`` parameter allows for up to 100,000 items, we recommend not exceeding the default limit of 500 items to avoid unexpected behaviors like timeouts and excessively large responses. Use with caution.

Logging and timeouts
--------------------

-  The **Wazuh server API log** is stored on the Wazuh server at ``/var/ossec/logs`` directory as ``api.log`` or ``api.json``, depending on the chosen log format (you can change the verbosity level in the Wazuh server API configuration file ``/var/ossec/api/configuration/api.yaml``). The Wazuh server API logs are rotated daily, compressed using Gzip, and stored in ``/var/ossec/logs/api/<YEAR>/<MONTH>``.

-  All Wazuh server API requests will be aborted if no response is received after the time duration defined in the ``request_timeout`` field of the server API configuration file ``/var/ossec/api/configuration/api.yaml``. You can use the ``wait_for_complete`` parameter to disable this timeout, which is particularly useful for calls that might exceed the expected duration, such as :api-ref:`PUT /agents/upgrade <operation/api.controllers.agent_controller.put_upgrade_agents>`.

.. note::

   To adjust the maximum API response time, update the ``request_timeout`` value in the ``/var/ossec/api/configuration/api.yaml`` file on the Wazuh server.

Example responses
-----------------

Success response (HTTP 200 - complete):

.. code-block:: none
   :class: output

   {
     "data": {
       "affected_items": [
         "master-node",
         "worker1"
       ],
       "total_affected_items": 2,
       "failed_items": [],
       "total_failed_items": 0
     },
     "message": "Restart request sent to all specified nodes",
     "error": 0
   }

Example response with errors (HTTP 200 - error 1):

.. code-block:: none
   :class: output

   {
     "data": {
       "affected_items": [],
       "total_affected_items": 0,
       "total_failed_items": 4,
       "failed_items": [
         {
           "error": {
             "code": 1707,
             "message": "Cannot send request, agent is not active",
             "remediation": "Please, check non-active agents connection and try again. Visit
             https://documentation.wazuh.com/current/user-manual/registering/index.html and
             https://documentation.wazuh.com/current/user-manual/agents/agent-connection.html
             to obtain more information on registering and connecting agents"
           },
           "id": [
             "001",
             "002",
             "009",
             "010"
           ]
         },
       ]
     },
     "message": "Restart command was not sent to any agent",
     "error": 1
   }

Example of partial response (HTTP 200 - error 2):

.. code-block:: none
   :class: output

   {
     "data": {
       "affected_items": [
         {
           "ip": "10.0.0.9",
           "id": "001",
           "name": "Carlos",
           "dateAdd": "2020-10-07T08:14:32Z",
           "node_name": "unknown",
           "registerIP": "10.0.0.9",
           "status": "never_connected"
         }
       ],
       "total_affected_items": 1,
       "total_failed_items": 1,
       "failed_items": [
         {
           "error": {
             "code": 1701,
             "message": "Agent does not exist",
             "remediation": "Please, use `GET /agents?select=id,name` to find all available agents"
           },
           "id": [
             "005"
           ]
         }
       ]
     },
     "message": "Some agents information was not returned",
     "error": 2
   }

Example response to report an unauthorized request (HTTP 401):

.. code-block:: none
   :class: output

   {
     "title": "Unauthorized",
     "detail": "The server could not verify that you are authorized to access the URL requested. You either supplied the wrong credentials (e.g. a bad password), or your browser doesn't understand how to supply the credentials required.",
   }

Example response to report a permission denied error (HTTP 403):

.. code-block:: none
   :class: output

   {
     "title": "Permission Denied",
     "detail": "Permission denied: Resource type: *:*",
     "remediation": "Please, make sure you have permissions to execute the current request. For more information on how to set up permissions, please visit https://documentation.wazuh.com/current/user-manual/api/rbac/configuration.html",
     "error": 4000,
     "dapi_errors": {
       "unknown-node": {
         "error": "Permission denied: Resource type: *:*"
       }
     }
   }
