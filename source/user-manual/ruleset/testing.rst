.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Learn how to test Wazuh decoders and rules with Wazuh. The Wazuh logtest tool allows you to test how an event is decoded and if a rule matches the event.
    
Testing decoders and rules
==========================

Wazuh logtest is a tool to test new rules and decoders and verify the current ones. You can use it with any of the following alternatives.

-  Wazuh dashboard
-  Command line tool
-  Wazuh API

With Wazuh logtest, you do the following.

#. Input event logs in syslog and JSON formats.
#. Check what decoders match them and check what fields these decoders identify.
#. Check what alerts match the event logs.

Wazuh logtest shares the same rules engine with the Wazuh analysis module. It's based on unique sessions. Each session loads its own set of rules and decoders.

Configuration
-------------

Wazuh logtest is a functionality the Wazuh manager provides. In a Wazuh cluster, the master node processes the event logs. You can change the configuration parameters in the :doc:`ossec.conf </user-manual/reference/ossec-conf/index>` file in the :doc:`\<rule_test\> </user-manual/reference/ossec-conf/rule-test>` section.

By default, the configuration is set as follows.

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
| threads         | Number of Wazuh-Logtest threads              |                | ``1``–``128``, ``auto``            |
|                 |                                              |       ``1``    | | auto creates one thread per CPU  |
+-----------------+----------------------------------------------+----------------+------------------------------------+
| max_sessions    | Number of users connected simultaneously     |      ``64``    | ``1``–``500``                      |
+-----------------+----------------------------------------------+----------------+------------------------------------+
| session_timeout | Time interval in which a client must remain  |                | A positive number that should      |
|                 | offline to remove the resources associated   |      ``15m``   | contain a suffix character         |
|                 | with their session                           |                | indicating a time unit, such as,   |
|                 |                                              |                | ``s`` (seconds), ``m`` (minutes),  |
|                 |                                              |                | ``h`` (hours).                     |
|                 |                                              |                | The max value is ``365`` days      |
+-----------------+----------------------------------------------+----------------+------------------------------------+

Using the Wazuh dashboard and the command line tool
---------------------------------------------------

To try Wazuh logtest using the Wazuh dashboard or the command line tool, follow these steps.

#. Run the tool.

	-  Go to **Tools** > **Ruleset test** in the Wazuh dashboard.
	-  Run ``/var/ossec/bin/wazuh-logtest`` from the command line.

#. Paste the following log:

   .. code-block:: none

      Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928

   .. code-block:: none
      :class: output
      :emphasize-lines: 15,19

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

If you paste the log seven more times within two minutes, you can see that rule id ``5710`` matches multiple times. In *Phase 3, filtering (rules)*, the ``firedtimes`` counter increases with each repetition. But for the last log line, rule id ``5712`` makes the match. This rule captures the eighth event that was matching rule id ``5710`` previously for the same IP address.

.. code-block:: none
   :class: output
   :emphasize-lines: 15

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

Using the Wazuh API
-------------------

To use Wazuh logtest with the Wazuh API, you need the two endpoints detailed below.

+-------------------------------+-----------------+-----------------------------------------------------------------------+
| Endpoint                      | Method          | Description                                                           |
+===============================+=================+=======================================================================+
| ``/logtest``                  | PUT             | Check if a log matches an alert and query the related information.    |
+-------------------------------+-----------------+-----------------------------------------------------------------------+
| ``/logtest/sessions/{token}`` | DELETE          | Delete the saved session corresponding to ``{token}``                 |
+-------------------------------+-----------------+-----------------------------------------------------------------------+

``PUT /logtest`` accepts the following list of parameters as a *RequestBody*:

-  **token**: alphanumeric string
-  **log_format**: ``syslog`` or ``json``
-  **location**: path string
-  **event**: string

Logging into the Wazuh API
^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh API endpoints require authentication. All calls must include a JSON Web Token.
Use the cURL command to log in. The Wazuh API provides a JWT token upon success.

#. Run the following command replacing ``<user>`` and ``<password>`` with your own values. By default, the user is `wazuh`, and the password is `wazuh`.

   .. code-block:: bash

      TOKEN=$(curl -u <user>:<password> -k -X POST "https://localhost:55000/security/user/authenticate?raw=true")

#. Check that everything works correctly

   .. code-block:: bash

      curl -k -X GET "https://localhost:55000/" -H "Authorization: Bearer $TOKEN"

   .. code-block:: JSON
      :class: output

      {
         "data": {
               "title": "Wazuh API REST",
               "api_version": "4.2.0",
               "revision": 40100,
               "license_name": "GPL 2.0",
               "license_url": "https://github.com/wazuh/wazuh/blob/4.2/LICENSE",
               "hostname": "wazuh-manager",
               "timestamp": "2020-11-10T15:15:31+0000"
         },
         "error": 0
      }

First request
^^^^^^^^^^^^^

The first time you send a processing request it has no logtest session token. Since there is no active session, a processing
log request is sent to logtest in Analysisd.

Use the following sample data for request.

+------------------+--------------------------------------+----------------------------------------------------------------------------------------------+
| Field            | Description                          | Example                                                                                      |
+==================+======================================+==============================================================================================+
| log_format       | Type of log, ``syslog`` or ``json``  | ``syslog``                                                                                   |
+------------------+--------------------------------------+----------------------------------------------------------------------------------------------+
| event            | Log to process                       | ``Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928`` |
+------------------+--------------------------------------+----------------------------------------------------------------------------------------------+
| location         | Origin of the log                    | ``master->/var/log/syslog``                                                                  |
+------------------+--------------------------------------+----------------------------------------------------------------------------------------------+
| token (optional) | logtest session id                   |                                                                                              |
+------------------+--------------------------------------+----------------------------------------------------------------------------------------------+

You must send the data to the logtest endpoint in JSON format. You can first store the request in a variable as follows.

   .. code-block:: bash

      LOGTEST_REQ=$(echo '{'\
          '"event": "Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928",'\
          '"log_format": "syslog",'\
          '"location": "master->/var/log/syslog"'\
          '}')

Then, send the request to logtest.

   .. code-block:: bash

      curl -k -X PUT "https://localhost:55000/logtest" \
      -H "Authorization: Bearer $TOKEN" \
      -H  "Content-Type: application/json" \
      -d "$LOGTEST_REQ"


   .. code-block:: JSON
      :class: output
      :emphasize-lines: 6, 13, 25

      {
         "error": 0,
         "data": {
               "token": "95375d4c",
               "messages": [
                  "INFO: (7202): Session initialized with token '95375d4c'"
               ],
               "output": {
                  "timestamp": "2020-11-10T17:46:23.289+0000",
                  "rule": {
                     "level": 5,
                     "description": "sshd: Attempt to login using a non-existent user",
                     "id": "5710",
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
                     "firedtimes": 1,
                     "mail": false,
                     "groups": [
                           "syslog",
                           "sshd",
                           "invalid_login",
                           "authentication_failed"
                     ],
                     "pci_dss": [
                           "10.2.4",
                           "10.2.5",
                           "10.6.1"
                     ],
                     "gpg13": [
                           "7.1"
                     ],
                     "gdpr": [
                           "IV_35.7.d",
                           "IV_32.2"
                     ],
                     "hipaa": [
                           "164.312.b"
                     ],
                     "nist_800_53": [
                           "AU.14",
                           "AC.7",
                           "AU.6"
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
                     "name": "wazuh-master"
                  },
                  "manager": {
                     "name": "wazuh-master"
                  },
                  "id": "1605030383.185271",
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
               "codemsg": 1
         }
      }

The above result shows that rule id ``5710`` matches the event log.

The ``messages`` field shows the session token ``95375d4c``. You must add this token to the next requests to keep the session loaded, including its event history, and rules and decoders. If you don't add the token field to the next request, a new session initializes, reloading the rules and decoders.

Repeating the request with the same session
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Add the session token to the request and send it seven more times within two minutes. In the ``rule`` object of the response, inside the ``output`` field, you can see the ``firedtimes`` counter increases for each repetition. Finally, rule ``5712`` is the one that makes the match. This rule captures the eighth event that matched rule id ``5710`` previously for the same IP address.

   .. code-block:: bash

      LOGTEST_REQ=$(echo '{'\
          '"token": "95375d4c",'\
          '"event": "Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928",'\
          '"log_format": "syslog",'\
          '"location": "master->/var/log/syslog"'\
          '}')

   .. code-block:: bash

      curl -k -X PUT "https://localhost:55000/logtest" \
      -H "Authorization: Bearer $TOKEN" \
      -H  "Content-Type: application/json" \
      -d "$LOGTEST_REQ"


   .. code-block:: JSON
      :class: output
      :emphasize-lines: 10

      {
         "error": 0,
         "data": {
               "token": "95375d4c",
               "output": {
                  "timestamp": "2020-11-10T18:04:42.440+0000",
                  "rule": {
                     "level": 10,
                     "description": "sshd: brute force trying to get access to the system.",
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
                     "pci_dss": [
                           "11.4",
                           "10.2.4",
                           "10.2.5"
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
                     "tsc": [
                           "CC6.1",
                           "CC6.8",
                           "CC7.2",
                           "CC7.3"
                     ]
                  },
                  "agent": {
                     "id": "000",
                     "name": "wazuh-master"
                  },
                  "manager": {
                     "name": "wazuh-master"
                  },
                  "id": "1605031482.185271",
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

If you don't require the session any longer, you can close it to release the history of events, rules and decoders loaded.

   .. code-block:: none

      curl -k -X DELETE "https://localhost:55000/logtest/sessions/95375d4c" -H "Authorization: Bearer $TOKEN"

   .. code-block:: JSON
      :class: output

      {
         "error": 0,
         "data": {
               "messages": [
                  "INFO: (7206): The session '95375d4c' was closed successfully"
               ],
               "codemsg": 0
         }
      }
