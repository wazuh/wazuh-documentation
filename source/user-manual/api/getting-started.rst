.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This guide provides the essential information needed to utilize the Wazuh server API.

Getting started
===============

This guide provides the essential information needed to utilize the Wazuh server API.

Starting and stopping the Wazuh server API
------------------------------------------

The Wazuh server API is automatically installed and runs as part of the Wazuh manager service. You can manage or monitor the Wazuh server API by executing the ``systemctl`` or ``service`` commands with the Wazuh manager service:

.. tabs::

   .. group-tab:: Systemd

      .. code-block:: console

         # systemctl start/status/stop/restart wazuh-manager

   .. group-tab:: SysV Init

      .. code-block:: console

         # service wazuh-manager start/status/stop/restart

Using the Wazuh server API console in the Wazuh dashboard
---------------------------------------------------------

You can interact with the Wazuh server API via the built-in API Console in the Wazuh dashboard. To do this, follow the steps below:

#. Log into the Wazuh dashboard with a user that has administrator privileges. For example, the default ``admin`` user has administrator privileges.

#. Navigate to **Server management** > **Dev Tools** to access the Wazuh server API console on the dashboard, click on the menu icon and navigate.

   .. thumbnail:: /images/manual/api/api-console-access.png
      :title: Access the Wazuh server API console
      :alt: Access the Wazuh server API console
      :align: center
      :width: 80%

#. In the **API Console**:

   -  Select HTTP method (GET, POST, PUT, DELETE)
   -  Enter the endpoint (e.g. ``/agents``, ``/manager/info``)
   -  Add any query parameters (e.g. ``?pretty=true&limit=10``)
   -  Click the **Play** button.

All requests are automatically authenticated using your current dashboard session. See :doc:`requests-responses` to learn more about the basic concepts.

.. thumbnail:: /images/manual/api/api-console-execution.gif
   :title: Execute API request in console
   :alt: Execute API request in console
   :align: center
   :width: 80%

.. _api_log_in:

Authentication – Obtaining a JWT token
--------------------------------------

All API endpoints (except the login endpoint itself) require authentication using a JSON Web Token (JWT). Users must include a JSON Web Token (JWT) in every request. JWT is an open standard (RFC 7519) that defines a compact and self-contained method for securely transmitting information between parties as a JSON object.

Authenticate the Wazuh server API via command line
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To ensure secure access, all Wazuh server API endpoints require authentication. Follow the steps outlined in the :api-ref:`POST /security/user/authenticate <operation/api.controllers.security_controller.login_user>` reference guide to obtain a token necessary for accessing the API endpoints:

#. Run the following command to send a user authentication POST request to the Wazuh server API and store the returned JWT in the ``TOKEN`` variable. Replace ``<WAZUH_API_USER>`` and ``<WAZUH_API_PASSWORD>`` with your credentials.

   .. code-block:: console

      # TOKEN=$(curl -u <WAZUH_API_USER>:<WAZUH_API_PASSWORD> -k -X POST "https://localhost:55000/security/user/authenticate?raw=true")

   .. note::

      -  If SSL (HTTPS) is enabled in the API and it is using the default self-signed certificates, you need to add the parameter ``-k`` to avoid the server connection verification. We recommend using the ``raw=true`` query parameter when authenticating via cURL commands, as it simplifies handling by returning the token in plain text, especially useful for long JWTs.
      -  The default Wazuh server API credential is ``wazuh:wazuh``, This should be changed after installation to avoid vulnerabilities. But if the Wazuh deployment was performed using the installation script, the Wazuh API user is ``wazuh`` and you can extract the password from ``wazuh-install-files.tar`` by running the command ``tar -axf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt -O | grep -P "\'wazuh\'" -A 1``.
      -  You can :doc:`reset the password </user-manual/user-administration/password-management>` for the ``wazuh`` user if you cannot retrieve the password.

#. Verify that the token has been generated:

   .. code-block:: console

      # echo $TOKEN

   The output should be a lengthy string similar to the following:

   .. code-block:: none
      :class: output

      eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YXp1aCIsImF1ZCI6IldhenVoIEFQSSBSRVNUIiwibmJmIjoxNzA3ODk4NTEzLCJleHAiOjE3MDc4OTk0MTMsInN1YiI6IndhenVoIiwicnVuX2FzIjpmYWxzZSwicmJhY19yb2xlcyI6WzFdLCJyYmFjX21vZGUiOiJ3aGl0ZSJ9.ACcJ3WdV3SnTOC-PV2oGZGCyH3GpStSOu161UHHT7w6eUm_REOP_g8SqqIJDDW0gCcQNJTEECortIuI4zj7nybNhACRlBrDBZoG4Re4HXEpAchyFQXwq0SsZ3HHSj7eJinBF0pJDG0D8d1_LkcoxaX3FpxpsCZ4xzJ492CpnVZLT8qI4

   If the authentication fails, the output will either display an error message or remain blank. In such cases, double-check your user credentials and ensure you have network connectivity to the Wazuh server API.

#. Send an API request to confirm that everything is working as expected:

   .. code-block:: console

      # curl -k -X GET "https://localhost:55000/" -H "Authorization: Bearer $TOKEN"

   .. code-block:: none
      :class: output

      {
         "data": {
            "title": "Wazuh API REST",
            "api_version": "4.14.1",
            "revision": "rc2",
            "license_name": "GPL 2.0",
            "license_url": "https://github.com/wazuh/wazuh/blob/v4.14.1/LICENSE",
            "hostname": "thecotilking-VirtualBox",
            "timestamp": "2026-01-23T13:57:11Z"
         },
         "error": 0
      }

Once authenticated, you can access any API endpoint using the below structure. Replace ``<METHOD>`` with the desired method and ``<ENDPOINT>`` with the string corresponding to the endpoint you wish to access. If you are not using an environment variable, replace ``$TOKEN`` with the obtained JWT.

.. code-block:: console

   # curl -k -X <METHOD> "https://localhost:55000/<ENDPOINT>" -H  "Authorization: Bearer $TOKEN"

Authenticate the Wazuh server API via scripts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Automating interactions with the Wazuh server API requires obtaining a JWT token programmatically. The examples below show how to authenticate and make authenticated requests using popular scripting languages like Python and Bash.

When you call the authentication endpoint ``/security/user/authenticate``, you can choose how the API returns the token:

-  By default (without any special parameter) - the response is a structured JSON object containing the token inside a ``data`` field. This format is convenient when your script can easily parse JSON.
-  With the query parameter ``?raw=true`` - the API returns only the plain text token (no JSON wrapper). This is much simpler when using tools like cURL in shell scripts, because you can capture the token directly into a variable without extra parsing steps.

These scripts are intended for users looking to enhance their operational efficiency through automation or those seeking to understand how to programmatically access the Wazuh server API for custom integrations.

Authenticate via Python script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can authenticate to the Wazuh server API and obtain a JWT using a Python script. The following script ``wazuh_api_authenticator.py`` gets the token and uses it to retrieve basic Wazuh server API information and Wazuh agent status summary.

#. Copy the script below into a file named ``wazuh_api_authenticator.py``, Replace ``<WAZUH_API_USER>`` and ``<WAZUH_API_PASSWORD>`` with the correct credentials:

   .. code-block:: python3
      :emphasize-lines: 15,16

      #!/usr/bin/env python3

      import json
      import requests
      import urllib3
      from base64 import b64encode

      # Disable insecure https warnings (for self-signed SSL certificates)
      urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

      # Configuration
      protocol = 'https'
      host = 'localhost'
      port = 55000
      user = '<WAZUH_API_USER>'
      password = '<WAZUH_API_PASSWORD>'
      login_endpoint = 'security/user/authenticate'

      login_url = f"{protocol}://{host}:{port}/{login_endpoint}"
      basic_auth = f"{user}:{password}".encode()
      login_headers = {'Content-Type': 'application/json',
                       'Authorization': f'Basic {b64encode(basic_auth).decode()}'}

      print("\nLogin request ...\n")
      response = requests.post(login_url, headers=login_headers, verify=False)
      token = json.loads(response.content.decode())['data']['token']
      print(token)

      # New authorization header with the JWT we got
      requests_headers = {'Content-Type': 'application/json',
                          'Authorization': f'Bearer {token}'}

      print("\n- API calls with TOKEN environment variable ...\n")

      print("Getting API information:")

      response = requests.get(f"{protocol}://{host}:{port}/?pretty=true", headers=requests_headers, verify=False)
      print(response.text)

      print("\nGetting agents status summary:")

      response = requests.get(f"{protocol}://{host}:{port}/agents/summary/status?pretty=true", headers=requests_headers, verify=False)
      print(response.text)

      print("\nEnd of the script.\n")

#. Install the Python ``requests`` module, if it doesn't exist:

   .. code-block:: console

      # python3 -m pip install requests

   .. note::

      The Python module ``urllib3`` version 2.0 and above only supports OpenSSL version 1.1.1 or later. If your system has an older version of OpenSSL, you will need to either:

      -  Upgrade OpenSSL to version 1.1.1 or higher.
      -  Downgrade ``urllib3`` to a version compatible with your current OpenSSL version.

      Please ensure your software dependencies are properly aligned to avoid compatibility issues.

#. Run the Python script ``wazuh_api_authenticator.py``:

   .. code-block:: console

      # python3 wazuh_api_authenticator.py

   .. code-block:: none
      :class: output

      Login request ...
      eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3YXp1aCIsImF1ZCI6IldhenVoIEFQSSBSRVNUIiwibmJmIjoxNjAyMjMxNjU2LCJleHAiOjE2MDIyMzUyNTYsInN1YiI6IndhenVoIiwicmJhY19yb2xlcyI6WzFdLCJyYmFjX21vZGUiOiJ3aGl0ZSJ9.V60_otHPaT4NTkrS6SF3GHva0Z9r5p4mqe5Cn0hk4o4
      - API calls with TOKEN environment variable ...
      Getting API information:
      {
         "data": {
            "title": "Wazuh API REST",
            "api_version": "4.14.1",
            "revision": "rc2",
            "license_name": "GPL 2.0",
            "license_url": "https://github.com/wazuh/wazuh/blob/v4.14.1/LICENSE",
            "hostname": "thecotilking-VirtualBox",
            "timestamp": "2026-01-23T13:57:11Z"
         },
         "error": 0
      }
      Getting agents status summary:
      {
         "data": {
             "connection": {
                 "active": 1,
                 "disconnected": 0,
                 "never_connected": 0,
                 "pending": 0,
                 "total": 1
             },
             "configuration": {
                 "synced": 1,
                 "not_synced": 0,
                 "total": 1
             }
         },
         "error": 0
      }
      End of the script.

Authenticate via Bash script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can also authenticate to the Wazuh server API using a Bash script. The following script ``wazuh_api_authenticator.sh`` authenticates with the Wazuh server API to obtain a JWT. It then uses the token within the request header to retrieve a summary of operating systems used by Wazuh agents.

#. Copy the script below into a file named ``wazuh_api_authenticator.sh``, replace ``<WAZUH_API_USER>`` and ``<WAZUH_API_PASSWORD>`` with the correct credentials:

   .. code-block:: bash
      :emphasize-lines: 5

      #!/bin/bash

      echo -e "\n- Getting token...\n"

      TOKEN=$(curl -u <WAZUH_API_USER>:<WAZUH_API_PASSWORD> -k -X POST "https://localhost:55000/security/user/authenticate?raw=true")

      echo -e "\n- API calls with TOKEN environment variable ...\n"

      echo -e "Getting default information:\n"

      curl -k -X GET "https://localhost:55000/?pretty=true" -H  "Authorization: Bearer $TOKEN"

      echo -e "\n\nGetting /agents/summary/os:\n"

      curl -k -X GET "https://localhost:55000/agents/summary/os?pretty=true" -H  "Authorization: Bearer $TOKEN"

      echo -e "\n\nEnd of the script.\n"

#. Run the Bash script ``wazuh_api_authenticator.sh``:

   .. code-block:: console

      # bash wazuh_api_authenticator.sh

   .. code-block:: none
      :class: output

      - Getting token...
      Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                       Dload  Upload   Total   Spent    Left  Speed
      100  3059  100  3059    0     0  17089      0 --:--:-- --:--:-- --:--:-- 17089
      - API calls with TOKEN environment variable ...
      Getting default information:
      {
         "data": {
            "title": "Wazuh API REST",
            "api_version": "4.14.1",
            "revision": "rc2",
            "license_name": "GPL 2.0",
            "license_url": "https://github.com/wazuh/wazuh/blob/v4.14.1/LICENSE",
            "hostname": "thecotilking-VirtualBox",
            "timestamp": "2026-01-23T13:57:11Z"
         },
         "error": 0
      }
      Getting /agents/summary/os:
      {
          "data": {
              "affected_items": [
                  "windows"
              ],
              "total_affected_items": 1,
              "total_failed_items": 0,
              "failed_items": []
          },
          "message": "Showing the operative system of all specified agents",
          "error": 0
      }
      End of the script.
