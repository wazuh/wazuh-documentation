.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: wazuh-logtest tool allows the testing and verification of decoders and rules against provided log samples on the Wazuh server. Learn more in this section of the documentation.
    
Testing decoders and rules
==========================

``/var/ossec/bin/wazuh-logtest`` tool allows the testing and verification of decoders and rules against provided log samples on the Wazuh server. You can utilize it through any of the following options:

-  Wazuh dashboard
-  Command line tool
-  Wazuh server API

With ``/var/ossec/bin/wazuh-logtest``, you can:

#. Input event logs. 
#. Verify which decoders match them and identify the associated fields.
#. Check which alerts match the event logs.

``/var/ossec/bin/wazuh-logtest`` shares the same rules with the Wazuh analysis engine. It operates based on unique sessions, each loading its own set of rules and decoders.

It also has a ``firedtimes`` counter which keeps track of all the matching occurrences of the rules and maintains these counters throughout the duration of the session.

Configuration
-------------

``/var/ossec/bin/wazuh-logtest`` comes out-of-the-box in the Wazuh server. In a Wazuh cluster, the master node processes the event logs. You can change its configuration parameters in the :doc:`\<rule_test\> </user-manual/reference/ossec-conf/rule-test>` section of the :doc:`/var/ossec/etc/ossec.conf </user-manual/reference/ossec-conf/index>` file of the Wazuh server.

By default, the ``/var/ossec/bin/wazuh-logtest`` configuration is set as follows:

.. code-block:: xml

   <rule_test>
     <enabled>yes</enabled>
     <threads>1</threads>
     <max_sessions>64</max_sessions>
     <session_timeout>15m</session_timeout>
   </rule_test>

+-----------------+----------------------------------------------+----------------+------------------------------------+
|    Parameter    |                Description                   |    Default     |    Values allowed                  |
+=================+==============================================+================+====================================+
| enabled         | Enables and disables logtest                 |      ``yes``   | ``yes``, ``no``                    |
+-----------------+----------------------------------------------+----------------+------------------------------------+
| threads         | Number of logtest threads                    |                | ``1``–``128``, ``auto``.           |
|                 |                                              |       ``1``    | *auto* creates one thread per CPU  |
+-----------------+----------------------------------------------+----------------+------------------------------------+
| max_sessions    | Number of open sessions allowed              |      ``64``    | ``1``–``500``                      |
+-----------------+----------------------------------------------+----------------+------------------------------------+
| session_timeout | Minimum time inactive to close a session     |                | Positive number and a suffix       |
|                 |                                              |      ``15m``   | character indicating a time unit.  |
|                 |                                              |                | ``s`` for seconds, ``m`` for       |
|                 |                                              |                | minutes, ``h`` for hours.          |
|                 |                                              |                | The max value allowed is ``365d``  |
+-----------------+----------------------------------------------+----------------+------------------------------------+

If a session is idle longer than the ``session_timeout``, it gets closed.

If the number of open sessions reaches ``max_sessions``, opening a new session results in the closure of the longest inactive session.

Using the Wazuh dashboard and the command line tool
---------------------------------------------------

Follow the following steps to try ``/var/ossec/bin/wazuh-logtest`` using the Wazuh dashboard or the command line tool:

#. Run the tool.

	-  Go to **Tools** > **Ruleset test** in the Wazuh dashboard.
	-  Run ``/var/ossec/bin/wazuh-logtest`` from the command line.

#. Paste the following log:

   .. code-block:: none

      Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928

   .. code-block:: none
      :class: output
      :emphasize-lines: 15,17,19

      **Phase 1: Completed pre-decoding.
         full event: 'Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928'
         timestamp: 'Oct 15 21:07:00'
         hostname: 'linux-agent'
         program_name: 'sshd'

      **Phase 2: Completed decoding.
         name: 'sshd'
         parent: 'sshd'
         srcip: '18.18.18.18'
         srcport: '48928'
         srcuser: 'blimey'

      **Phase 3: Completed filtering (rules).
         id: '5710'
         level: '5'
         description: 'sshd: Attempt to login using a non-existent user'
         groups: '["syslog","sshd","authentication_failed","invalid_login"]'
         firedtimes: '1'
         gdpr: '["IV_35.7.d","IV_32.2"]'
         gpg13: '["7.1"]'
         hipaa: '["164.312.b"]'
         mail: 'false'
         mitre.id: '["T1110.001","T1021.004","T1078"]'
         mitre.tactic: '["Credential Access","Lateral Movement","Defense Evasion","Persistence","Privilege Escalation","Initial Access"]'
         mitre.technique: '["Password Guessing","SSH","Valid Accounts"]'
         nist_800_53: '["AU.14","AC.7","AU.6"]'
         pci_dss: '["10.2.4","10.2.5","10.6.1"]'
         tsc: '["CC6.1","CC6.8","CC7.2","CC7.3"]'
      **Alert to be generated.

The above result shows that rule id ``5710`` matches the event log.

If you paste the log six more times, you can see that rule id ``5710`` "sshd: Attempt to login using a non-existent user" matches each time. It is important to note that in *Phase 3, filtering (rules)*, the ``firedtimes`` counter increases with each repetition. If you paste the log one more time, rule ID 5712 matches instead, indicating an attempted SSH brute force attack on the system. This rule triggers when there have been eight failed attempts to log in to SSH with a non-existing user, all originating from the same IP address, and occurring within a two-minute timeframe. 

.. code-block:: none
   :class: output
   :emphasize-lines: 15, 17

   **Phase 1: Completed pre-decoding.
   	full event: 'Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928'
   	timestamp: 'Oct 15 21:07:00'
   	hostname: 'linux-agent'
   	program_name: 'sshd'
   
   **Phase 2: Completed decoding.
   	name: 'sshd'
   	parent: 'sshd'
   	srcip: '18.18.18.18'
   	srcport: '48928'
   	srcuser: 'blimey'
   
   **Phase 3: Completed filtering (rules).
   	id: '5712'
   	level: '10'
   	description: 'sshd: brute force trying to get access to the system. Non existent user.'
   	groups: '["syslog","sshd","authentication_failures"]'
   	firedtimes: '1'
   	frequency: '8'
   	gdpr: '["IV_35.7.d","IV_32.2"]'
   	hipaa: '["164.312.b"]'
   	mail: 'false'
   	mitre.id: '["T1110"]'
   	mitre.tactic: '["Credential Access"]'
   	mitre.technique: '["Brute Force"]'
   	nist_800_53: '["SI.4","AU.14","AC.7"]'
   	pci_dss: '["11.4","10.2.4","10.2.5"]'
   	tsc: '["CC6.1","CC6.8","CC7.2","CC7.3"]'
   **Alert to be generated.

Using the Wazuh server API
--------------------------

The `logtest API  endpoint <https://documentation.wazuh.com/|WAZUH_CURRENT_MINOR|/user-manual/api/reference.html#tag/Logtest>`__ is part of the Wazuh server APIs which you can use to interact with Wazuh from the Wazuh server or an authorized endpoint.

You can use the Wazuh server API to interact with the ``/var/ossec/bin/wazuh-logtest`` utility via the two endpoints below.

.. |logtest| replace:: `/logtest <https://documentation.wazuh.com/|WAZUH_CURRENT_MINOR|/user-manual/api/reference.html#operation/api.controllers.logtest_controller.run_logtest_tool>`__

.. |logtest_sessions| replace:: `/logtest/sessions/{token} <https://documentation.wazuh.com/|WAZUH_CURRENT_MINOR|/user-manual/api/reference.html#operation/api.controllers.logtest_controller.end_logtest_session>`__

+-------------------------------+-----------------+-----------------------------------------------------------------------+
| Endpoint                      | Method          | Description                                                           |
+===============================+=================+=======================================================================+
| |logtest|                     | PUT             | Check if an alert matches a log and query the related information.    |
+-------------------------------+-----------------+-----------------------------------------------------------------------+
| |logtest_sessions|            | DELETE          | Delete the session corresponding to ``{token}``                       |
+-------------------------------+-----------------+-----------------------------------------------------------------------+

Logging into the Wazuh server API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

All Wazuh server API calls require authentication and must include a JSON Web Token. You can use the cURL command to log in. The Wazuh server API provides a JWT token upon successful authentication.

#. Run the following command replacing ``<WAZUH_API_USER>`` and ``<PASSWORD>`` with your credentials:

   .. code-block:: bash

      TOKEN=$(curl -u <WAZUH_API_USER>:<PASSWORD> -k -X POST "https://localhost:55000/security/user/authenticate?raw=true")

   By default, the user is ``wazuh``, and the password is ``wazuh``.

   In case you do not know your credentials, run the command below on your Wazuh server to retrieve your Wazuh server API credentials:

   .. code-block:: console

      tar -O -xvf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt | grep -A 2 "# Password for wazuh API user"

   .. code-block:: none
      :class: output

      # Password for wazuh API user
        api_username: '<WAZUH_API_USER>'
        api_password: '<WAZUH_API_PASSWORD>'

#. Check that everything works correctly.

   .. code-block:: bash

      curl -k -X GET "https://localhost:55000/?pretty=true" -H "Authorization: Bearer $TOKEN"

   .. code-block:: none
      :class: output

      {
         "data": {
            "title": "Wazuh API REST",
            "api_version": "<CURRENT_API_VERSION>",
            "revision": <CURRENT_REVISION>,
            "license_name": "GPL 2.0",
            "license_url": "https://github.com/wazuh/wazuh/blob/v<CURRENT_API_VERSION>/LICENSE",
            "hostname": "Wazuh",
            "timestamp": "<CURRENT_TIME>"
         },
         "error": 0
      }
      
First request
^^^^^^^^^^^^^

The first time you send a processing request, it has no logtest API session token. Since there is no active session, a processing log request is sent to logtest in the Wazuh analysis engine.

Use the following sample data for request:

+------------------+--------------------------------------+----------------------------------------------------------------------------------------------+
| Field            | Description                          | Example                                                                                      |
+==================+======================================+==============================================================================================+
| log_format       | Type of log                          | ``syslog``                                                                                   |
+------------------+--------------------------------------+----------------------------------------------------------------------------------------------+
| event            | Log to process                       | ``Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928`` |
+------------------+--------------------------------------+----------------------------------------------------------------------------------------------+
| location         | Origin of the log                    | ``master->/var/log/syslog``                                                                  |
+------------------+--------------------------------------+----------------------------------------------------------------------------------------------+
| token (optional) | logtest session id                   |                                                                                              |
+------------------+--------------------------------------+----------------------------------------------------------------------------------------------+

You must send the data to the logtest endpoint in JSON format. You can first store the request in a variable as follows:

.. code-block:: console

   LOGTEST_REQ=$(echo '{'\
       '"event": "Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928",'\
       '"log_format": "syslog",'\
       '"location": "master->/var/log/syslog"'\
       '}')

Then, send the request to the logtest endpoint:

.. code-block:: console

   curl -k -X PUT "https://localhost:55000/logtest?pretty=true" \
   -H "Authorization: Bearer $TOKEN" \
   -H  "Content-Type: application/json" \
   -d "$LOGTEST_REQ"

.. code-block:: JSON
   :class: output

   {
      "error": 0,
      "data": {
         "messages": [

           "INFO: (7202): Session initialized with token '35604a22'"

        ],

        "token": "35604a22",

        "output": {
            "timestamp": "2023-04-25T13:50:43.764000Z",
            "rule": {
               "level": 5,
               "description": "sshd: Attempt to login using a non-existent user",

              "id": "5710",

              "mitre": {
                  "id": [
                     "T1110.001",
                     "T1021.004",
                     "T1078"
                  ],
                  "tactic": [
                     "Credential Access",
                     "Lateral Movement",
                     "Defense Evasion",
                     "Persistence",
                     "Privilege Escalation",
                     "Initial Access"
                  ],
                  "technique": [
                     "Password Guessing",
                     "SSH",
                     "Valid Accounts"
                  ]
               },

              "firedtimes": 1,

              "mail": false,
               "groups": [
                  "syslog",
                  "sshd",
                  "authentication_failed",
                  "invalid_login"
               ],
               "gdpr": [
                  "IV_35.7.d",
                  "IV_32.2"
               ],
               "gpg13": [
                  "7.1"
               ],
               "hipaa": [
                  "164.312.b"
               ],
               "nist_800_53": [
                  "AU.14",
                  "AC.7",
                  "AU.6"
               ],
               "pci_dss": [
                  "10.2.4",
                  "10.2.5",
                  "10.6.1"
               ],
               "tsc": [
                  "CC6.1",
                  "CC6.8",
                  "CC7.2",
                  "CC7.3"
               ]
            },
            "agent": {
               "id": "000",
               "name": "centos7"
            },
            "manager": {
               "name": "centos7"
            },
            "id": "1682430643.3725",
            "full_log": "Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928",
            "predecoder": {
               "program_name": "sshd",
               "timestamp": "Oct 15 21:07:00",
               "hostname": "linux-agent"
            },
            "decoder": {
               "parent": "sshd",
               "name": "sshd"
            },
            "data": {
               "srcip": "18.18.18.18",
               "srcport": "48928",
               "srcuser": "blimey"
            },
            "location": "master->/var/log/syslog"
         },
         "alert": true,
         "codemsg": 0
      }
   }

The above result shows that rule ID ``5710`` matches the event log.

The ``messages`` field shows the session token ``95375d4c``. You must add this token to the next requests to keep the session loaded, including its event history, and rules and decoders. If you don't add the token field to the next request, a new session initializes, reloading the rules and decoders.

Repeating the request with the same session
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Add the session token to the request and send it seven more times within two minutes. You can see that rule ID ``5710`` matches multiple times. In the ``rule`` object of the response, inside the ``output`` field, you can see the ``firedtimes`` counter increases with each repetition. But in the last request, rule ID ``5712`` triggers and captures the eighth event that rule ID ``5710`` matched previously for the same IP address. Change the token below to your own session token generated.

.. code-block:: bash
   :emphasize-lines: 3

   LOGTEST_REQ=$(echo '{'\

      '"token": "35604a22",'\

      '"event": "Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928",'\
       '"log_format": "syslog",'\
       '"location": "master->/var/log/syslog"'\
       '}')

.. note::

   Providing an invalid logtest session token results in a new session.

.. code-block:: console

   curl -k -X PUT "https://localhost:55000/logtest?pretty=true" \
   -H "Authorization: Bearer $TOKEN" \
   -H  "Content-Type: application/json" \
   -d "$LOGTEST_REQ"

.. code-block:: JSON
   :class: output

   {
      "error": 0,
      "data": {
         "token": "35604a22",
         "output": {
            "timestamp": "2023-04-25T13:51:36.409000Z",
            "rule": {
               "level": 10,
               "description": "sshd: brute force trying to get access to the system. Non existent user.",

              "id": "5712",

              "mitre": {
                  "id": [
                     "T1110"
                  ],
                  "tactic": [
                     "Credential Access"
                  ],
                  "technique": [
                     "Brute Force"
                  ]
               },
               "frequency": 8,
               "firedtimes": 1,
               "mail": false,
               "groups": [
                  "syslog",
                  "sshd",
                  "authentication_failures"
               ],
               "gdpr": [
                  "IV_35.7.d",
                  "IV_32.2"
               ],
               "hipaa": [
                  "164.312.b"
               ],
               "nist_800_53": [
                  "SI.4",
                  "AU.14",
                  "AC.7"
               ],
               "pci_dss": [
                  "11.4",
                  "10.2.4",
                  "10.2.5"
               ],
               "tsc": [
                  "CC6.1",
                  "CC6.8",
                  "CC7.2",
                  "CC7.3"
               ]
            },
            "agent": {
               "id": "000",
               "name": "centos7"
            },
            "manager": {
               "name": "centos7"
            },
            "id": "1682430696.3725",
            "previous_output": "Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928\nOct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928\nOct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928\nOct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928\nOct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928\nOct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928\nOct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928",
            "full_log": "Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928",
            "predecoder": {
               "program_name": "sshd",
               "timestamp": "Oct 15 21:07:00",
               "hostname": "linux-agent"
            },
            "decoder": {
               "parent": "sshd",
               "name": "sshd"
            },
            "data": {
               "srcip": "18.18.18.18",
               "srcport": "48928",
               "srcuser": "blimey"
            },
            "location": "master->/var/log/syslog"
         },
         "alert": true,
         "codemsg": 0
      }
   }

Closing the session
^^^^^^^^^^^^^^^^^^^

If you don't need the session any longer, you can close it to release the history of events, and rules and decoders loaded. The token in command below should also be changed to your own session token.

.. code-block:: console

   curl -k -X DELETE "https://localhost:55000/logtest/sessions/35604a22?pretty=true" -H "Authorization: Bearer $TOKEN"

.. code-block:: JSON
   :class: output

   {
      "error": 0,
      "data": {
            "messages": [
               "INFO: (7206): The session '35604a22' was closed successfully"
            ],
            "codemsg": 0
      }
   }
