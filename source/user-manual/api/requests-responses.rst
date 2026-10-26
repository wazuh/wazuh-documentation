.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to build and interpret requests to the Wazuh manager API, and what its responses, HTTP status codes, and query parameters mean.

Wazuh manager API requests and responses
========================================

Each Wazuh manager API request carries an HTTP method and an endpoint, and each response returns JSON with an HTTP status code.

Request structure
-----------------

A standard Wazuh manager API request consists of an HTTP method, an API URL, and an authorization header.

#. **HTTP Method**

   -  GET: Retrieve information
   -  POST: Create resources
   -  PUT: Update resources
   -  DELETE: Remove resources

#. **API URL / Endpoint**

   -  Format: ``https://<WAZUH_MANAGER_IP_ADDRESS>:55000/<ENDPOINT>``
   -  Use ``https`` (recommended) or ``http`` depending on your configuration
   -  Common endpoints: ``/agents``, ``/cluster/<NODE_NAME>/info``, ``/security/users``

#. **Authorization Header**

   -  All endpoints (except login) require a JWT
   -  Format: ``-H "Authorization: Bearer $TOKEN"``

Below is an example ``cURL`` request to get the Wazuh agent operating system summary:

.. code-block:: console

   # curl -k -X GET "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/agents/summary/os?pretty=true" -H "Authorization: Bearer $TOKEN"

The ``cURL`` command for each request contains the following fields:

+------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------+
| Field                                                                                                      | Description                                                                                                |
+============================================================================================================+============================================================================================================+
| ``-X GET/POST/PUT/DELETE``                                                                                 | Specify a request method to use when communicating with the HTTP server.                                   |
+------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------+
| ``http://<WAZUH_MANAGER_IP_ADDRESS>:55000/<ENDPOINT> https://<WAZUH_MANAGER_IP_ADDRESS>:55000/<ENDPOINT>`` | The API URL to use. Specify ``http`` or ``https`` depending on whether SSL is activated in the API or not. |
+------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------+
| ``-H "Authorization: Bearer <YOUR_JWT_TOKEN>"``                                                            | Include an extra header in the request to specify the JWT.                                                 |
+------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------+
| ``-k``                                                                                                     | Skip certificate verification. Use it when the client does not trust the Wazuh manager CA.                 |
+------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------+

-  All endpoints except ``POST /security/user/authenticate``, ``POST /security/user/authenticate/run_as``, ``DELETE /security/user/authenticate``, and ``PUT /security/user/revoke`` accept the ``pretty`` parameter to convert the JSON response to a human-readable format.

Response format
---------------

All responses are in JSON format, and most of them follow this structure:

+-------------+--------------------------+---------------------------------------------------------------------------------------------------------------------+
| Field       | Optional Sub-fields      | Description                                                                                                         |
+=============+==========================+=====================================================================================================================+
| ``data``    | ``affected_items``       | List each of the successfully affected items in the request.                                                        |
|             +--------------------------+---------------------------------------------------------------------------------------------------------------------+
|             | ``total_affected_items`` | Total number of successfully affected items.                                                                        |
|             +--------------------------+---------------------------------------------------------------------------------------------------------------------+
|             | ``failed_items``         | List containing each of the failed items in the request.                                                            |
|             +--------------------------+---------------------------------------------------------------------------------------------------------------------+
|             | ``total_failed_items``   | Total number of failed items.                                                                                       |
+-------------+--------------------------+---------------------------------------------------------------------------------------------------------------------+
| ``message`` |                          | Result description.                                                                                                 |
+-------------+--------------------------+---------------------------------------------------------------------------------------------------------------------+
| ``error``   |                          | For HTTP ``200`` responses, it determines if the response was complete (``0``), failed (``1``), or partial (``2``). |
|             |                          |                                                                                                                     |
|             |                          | For HTTP ``4xx`` or ``5xx`` responses, it determines the error code related to the failure.                         |
+-------------+--------------------------+---------------------------------------------------------------------------------------------------------------------+

Most responses follow this standard structure:

.. code-block:: none

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

**Error field meanings** (in HTTP ``200`` responses):

-  0: Full success
-  1: Complete failure
-  2: Partial success (at least one item succeeded and at least one failed)

Common HTTP status codes
------------------------

+------+-----------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Code | Meaning               | Typical cause                                                                                                                                                               |
+======+=======================+=============================================================================================================================================================================+
| 200  | OK                    | Request successful (even if partial/failure inside).                                                                                                                        |
+------+-----------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 400  | Bad Request           | Invalid parameters or payload                                                                                                                                               |
+------+-----------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 401  | Unauthorized          | Invalid credentials on login, or a missing, invalid, or expired JWT                                                                                                         |
+------+-----------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 403  | Forbidden             | Valid token with insufficient RBAC permissions, or a client IP address blocked after too many failed logins (error ``6000``)                                                |
+------+-----------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 404  | Not Found             | Endpoint, resource, or cluster node does not exist                                                                                                                          |
+------+-----------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 405  | Method Not Allowed    | The endpoint doesn't support the HTTP method used, for example ``POST`` on a read-only endpoint                                                                             |
+------+-----------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 413  | Payload Too Large     | The request body is larger than ``max_upload_size`` (``10485760`` bytes by default), or a ``run_as`` authorization context is larger than ``auth_context_max_payload_size`` |
+------+-----------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 429  | Too Many Requests     | Per-address limit exceeded: 300 authenticated or 10 unauthenticated requests a minute by default                                                                            |
+------+-----------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 500  | Internal Server Error | Server-side issue. Check the API log.                                                                                                                                       |
+------+-----------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

-  All responses include an HTTP status code: 2xx (success), 4xx (client error), or 5xx (server error).
-  List endpoints, such as ``GET /agents``, return HTTP ``200`` with only the items the user is allowed to read, and no items if the user can't read any. A request that names a specific resource the user can't access, such as ``GET /agents?agents_list=001``, returns HTTP ``403``.

Useful query parameters
-----------------------

These parameters are accepted by most list-type endpoints. The Wazuh manager API limits their values: ``q`` and ``search`` accept up to 1024 characters, ``select`` up to 100 fields, ``limit`` up to 100000, and ``offset`` up to 2147483647. A value over a limit returns HTTP ``400`` with a message that names the parameter.

+----------------------------+--------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+
| Parameter                  | Description                                                              | Recommended Use                                                                             |
+============================+==========================================================================+=============================================================================================+
| ``pretty=true``            | Formats JSON output with indentation (human-readable)                    | Always use during testing/debugging                                                         |
+----------------------------+--------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+
| ``limit=N``                | Maximum number of items returned (default: 500, max: 100,000)            | Use with caution for large values                                                           |
+----------------------------+--------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+
| ``offset=N``               | Skip the first N items (for pagination)                                  | Combine with ``limit`` for large result sets                                                |
+----------------------------+--------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+
| ``wait_for_complete=true`` | Disable request timeout (useful for long operations like agent upgrades) | For requests that can take longer than the request timeout, such as ``PUT /agents/upgrade`` |
+----------------------------+--------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+

-  By default, responses that contain data collections return a maximum of 500 elements. You can use the ``offset`` and ``limit`` parameters to iterate through large collections. The ``limit`` parameter allows for up to 100,000 items. However, we recommend not exceeding the default limit of 500 items to avoid unexpected behaviors like timeouts and excessively large responses. Use with caution.

Logging and timeouts
--------------------

-  The Wazuh manager API writes its log to ``/var/wazuh-manager/logs/api.log``\ **,** or to ``/var/wazuh-manager/logs/api.json`` when the log format is JSON (you can change the verbosity level in the Wazuh manager API configuration file ``/var/wazuh-manager/api/configuration/api.yaml``). The Wazuh manager API logs are rotated daily, compressed using Gzip, and stored in ``/var/wazuh-manager/logs/api/<YEAR>/<MONTH>/``. The log masks sensitive values in each request, such as passwords, keys, credentials, and the Authorization header, at any depth.
-  The Wazuh manager API aborts a request that has not completed within the time set in the ``intervals.request_timeout`` setting (10 seconds by default) of ``/var/wazuh-manager/api/configuration/api.yaml``. Use the ``wait_for_complete`` parameter to disable this timeout for calls that might take longer, such as ``PUT /agents/upgrade``.

.. note::

   To adjust the maximum API response time, uncomment and set ``intervals.request_timeout`` in the ``/var/wazuh-manager/api/configuration/api.yaml`` file on the Wazuh manager, then restart the Wazuh manager.

Example responses
-----------------

The following samples show a complete, a failed, and a partial HTTP ``200`` response, then HTTP ``401`` and HTTP ``403`` error responses.

Success response (HTTP ``200``, complete):

The command output looks similar to this:

.. code-block:: json
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

Example response with errors (HTTP ``200``, error ``1``):

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
     "data": {
       "affected_items": [],
       "total_affected_items": 0,
       "total_failed_items": 1,
       "failed_items": [
         {
           "error": {
             "code": 1761,
             "message": "Could not send restart/reload command. This operation via API requires agent version 5.0 or higher."
           },
           "id": [
             "004"
           ]
         }
       ],
       "nodes": {
         "node01": {
           "failed_items": {
             "1761": [
               "004"
             ]
           }
         }
       }
     },
     "message": "Restart command was not sent to any agent",
     "error": 1
   }

This error occurs when the targeted Wazuh agent runs a version earlier than Wazuh 5.0.0, which cannot receive restart or reload commands through the API. If the agent has never connected to the node, the API reports error ``1774`` instead.

Example of partial response (HTTP ``200``, error ``2``):

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
     "data": {
       "affected_items": [
         {
           "registerIP": "any",
           "ip": "192.168.71.11",
           "id": "001",
           "name": "Ubuntu",
           "status": "disconnected",
           "dateAdd": "2026-10-01T21:49:19+00:00"
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
             "999"
           ]
         }
       ]
     },
     "message": "Some agents information was not returned",
     "error": 2
   }

Example response to report an unauthorized request (HTTP ``401``):

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
     "title": "Unauthorized",
     "detail": "Invalid token"
   }

Example response to report a permission denied error (HTTP ``403``):

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
     "title": "Permission Denied",
     "detail": "Permission denied: Resource type: *:*",
     "remediation": "Please, make sure you have permissions to execute the current request. For more information on how to set up permissions, please visit https://documentation.wazuh.com/5.0/user-manual/api/rbac/configuration.html",
     "error": 4000,
     "dapi_errors": {
       "unknown-node": {
         "error": "Permission denied: Resource type: *:*"
       }
     }
   }
