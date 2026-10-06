.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section provides several use cases to demonstrate some of the potentials of the Wazuh server API.

Use cases
---------

This section provides several use cases to demonstrate some of the potentials of the Wazuh server API. You can find details about all possible API requests in the :ref:`reference <api_reference>` section.

Exploring the ruleset
^^^^^^^^^^^^^^^^^^^^^

Often when an alert fires, it is helpful to know details about the rule itself. The following request enumerates the attributes of rule ``1002``:

.. code-block:: console

   # curl -k -X GET "https://localhost:55000/rules?rule_ids=1002&pretty=true" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "filename": "0020-syslog_rules.xml",
               "relative_dirname": "ruleset/rules",
               "id": 1002,
               "level": 2,
               "status": "enabled",
               "details": {
                  "match": {
                     "pattern": "core_dumped|failure|error|attack| bad |illegal |denied|refused|unauthorized|fatal|failed|Segmentation Fault|Corrupted"
                   }
               },
               "pci_dss": [],
               "gpg13": [
                  "4.4"
               ],
               "gdpr": [],
               "hipaa": [],
               "nist_800_53": [],
               "groups": [
                  "syslog",
                  "errors"
               ],
               "description": "Unknown problem somewhere in the system."
            }
         ],
         "total_affected_items": 1,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All selected rules were returned",
      "error": 0
   }

It can also be helpful to know which rules matching a specific criteria are available. For example, you can view all the rules in the ``web`` group, with a PCI tag of ``10.6.1``, and containing the word ``failures`` with the command below:

.. code-block:: console

   # curl -k -X GET "https://localhost:55000/rules?pretty=true&limit=500&search=failures&group=web&pci_dss=10.6.1" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
   :class: output

   {
     "data": {
       "affected_items": [
         {
           "filename": "0260-nginx_rules.xml",
           "relative_dirname": "ruleset/rules",
           "id": 31316,
           "level": 10,
           "status": "enabled",
           "details": {
             "frequency": "8",
             "timeframe": "240",
             "if_matched_sid": "31315",
             "same_source_ip": "",
             "mitre": "\n      "
           },
           "pci_dss": [
             "10.6.1",
             "10.2.4",
             "10.2.5",
             "11.4"
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
             "AU.6",
             "AU.14",
             "AC.7",
             "SI.4"
           ],
           "groups": [
             "authentication_failures",
             "tsc_CC7.2",
             "tsc_CC7.3",
             "tsc_CC6.1",
             "tsc_CC6.8",
             "nginx",
             "web"
           ],
           "description": "Nginx: Multiple web authentication failures."
         }
       ],
       "total_affected_items": 1,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "All selected rules were returned",
     "error": 0
   }

Testing rules and decoders
^^^^^^^^^^^^^^^^^^^^^^^^^^

You can use the Wazuh server API to start a :doc:`wazuh-logtest </user-manual/ruleset/testing>` session or use an existing session for testing and validating custom or default rules and decoders. The following request creates a logtest session and displays matching rules and decoders for the provided log. It also reveals the predecoding phase, alongside other information.

.. code-block:: console

   # curl -k -X PUT "https://localhost:55000/logtest" -H  "Authorization: Bearer $TOKEN" -H  "Content-Type: application/json" -d "{\"event\":\"Jun 29 15:54:13 focal multipathd[557]: sdb: failed to get sysfs uid: No data available\",\"log_format\":\"syslog\",\"location\":\"user->/var/log/syslog\"}"

.. code-block:: json
   :class: output

   {
     "error": 0,
     "data": {
       "token": "bc3ca27a",
       "messages": [
         "WARNING: (7309): 'null' is not a valid token",
         "INFO: (7202): Session initialized with token 'bc3ca27a'"
       ],
       "output": {
         "timestamp": "2020-10-15T09:40:53.630+0000",
         "rule": {
           "level": 0,
           "description": "FreeIPA messages grouped",
           "id": "82202",
           "firedtimes": 1,
           "mail": false,
           "groups": [
             "freeipa"
           ]
         },
         "agent": {
           "id": "000",
           "name": "wazuh-master"
         },
         "manager": {
           "name": "wazuh-master"
         },
         "id": "1602754853.1000774",
         "cluster": {
           "name": "wazuh",
           "node": "master-node"
         },
         "full_log": "Jun 29 15:54:13 focal multipathd[557]: sdb: failed to get sysfs uid: No data available",
         "predecoder": {
           "program_name": "multipathd",
           "timestamp": "Jun 29 15:54:13",
           "hostname": "focal"
         },
         "decoder": {
           "name": "freeipa"
         },
         "location": "user->/var/log/syslog"
       },
       "alert": false,
       "codemsg": 1
     }
   }

Analyzing the File Integrity Monitoring (FIM) database of a Wazuh agent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can utilize the Wazuh server API to display information about all files monitored by the Wazuh FIM module. The following example shows all events associated with Python ``.py`` files installed on a monitored endpoint with agent ID ``001``:

.. code-block:: console

   # curl -k -X GET "https://localhost:55000/syscheck/001?pretty=true&search=.py" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
   :class: output

   {
     "data": {
       "affected_items": [
         {
           "file": "/etc/python2.7/sitecustomize.py",
           "perm": "rw-r--r--",
           "sha1": "67b0a8ccf18bf5d2eb8c7f214b5a5d0d4a5e409d",
           "changes": 1,
           "md5": "d6b276695157bde06a56ba1b2bc53670",
           "inode": 29654607,
           "size": 155,
           "uid": "0",
           "gname": "root",
           "mtime": "2020-04-15T17:20:14Z",
           "sha256": "43d81125d92376b1a69d53a71126a041cc9a18d8080e92dea0a2ae23be138b1e",
           "date": "2020-05-25T14:28:41Z",
           "uname": "root",
           "type": "file",
           "gid": "0"
         },
         {
           "file": "/etc/python3.6/sitecustomize.py",
           "perm": "rw-r--r--",
           "sha1": "67b0a8ccf18bf5d2eb8c7f214b5a5d0d4a5e409d",
           "changes": 1,
           "md5": "d6b276695157bde06a56ba1b2bc53670",
           "inode": 29762235,
           "size": 155,
           "uid": "0",
           "gname": "root",
           "mtime": "2020-04-18T01:56:04Z",
           "sha256": "43d81125d92376b1a69d53a71126a041cc9a18d8080e92dea0a2ae23be138b1e",
           "date": "2020-05-25T14:28:41Z",
           "uname": "root",
           "type": "file",
           "gid": "0"
         }
       ],
       "total_affected_items": 2,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "FIM findings of the agent were returned",
     "error": 0
   }

You can find a file using its SHA1 or MD5 hash. In the following examples, we retrieve the same using both its SHA1 and MD5 hash:

.. code-block:: console

   # curl -k -X GET "https://localhost:55000/syscheck/001?pretty=true&hash=bc929cb047b79d5c16514f2c553e6b759abfb1b8" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
   :class: output

   {
     "data": {
       "affected_items": [
         {
           "file": "/sbin/swapon",
           "perm": "rwxr-xr-x",
           "sha1": "bc929cb047b79d5c16514f2c553e6b759abfb1b8",
           "changes": 1,
           "md5": "085c1161d814a8863562694b3819f6a5",
           "inode": 14025822,
           "size": 47184,
           "uid": "0",
           "gname": "root",
           "mtime": "2020-01-08T18:31:23Z",
           "sha256": "f274025a1e4870301c5678568ab9519152f49d3cb907c01f7c71ff17b1a6e870",
           "date": "2020-05-25T14:29:44Z",
           "uname": "root",
           "type": "file",
           "gid": "0"
         }
       ],
       "total_affected_items": 1,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "FIM findings of the agent were returned",
     "error": 0
   }

.. code-block:: console

   # curl -k -X GET "https://localhost:55000/syscheck/001?pretty=true&hash=085c1161d814a8863562694b3819f6a5" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
   :class: output

   {
     "data": {
       "affected_items": [
         {
           "file": "/sbin/swapon",
           "perm": "rwxr-xr-x",
           "sha1": "bc929cb047b79d5c16514f2c553e6b759abfb1b8",
           "changes": 1,
           "md5": "085c1161d814a8863562694b3819f6a5",
           "inode": 14025822,
           "size": 47184,
           "uid": "0",
           "gname": "root",
           "mtime": "2020-01-08T18:31:23Z",
           "sha256": "f274025a1e4870301c5678568ab9519152f49d3cb907c01f7c71ff17b1a6e870",
           "date": "2020-05-25T14:29:44Z",
           "uname": "root",
           "type": "file",
           "gid": "0"
         }
       ],
       "total_affected_items": 1,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "FIM findings of the agent were returned",
     "error": 0
   }

Getting information about the manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can retrieve various details about the Wazuh manager through the Wazuh server API. These details include configuration, status, logs, and more. The following example demonstrates how to retrieve the status of each Wazuh daemon:

.. code-block:: console

   # curl -k -X GET "https://localhost:55000/manager/status?pretty=true" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
   :class: output

   {
     "data": {
       "affected_items": [
         {
           "wazuh-agentlessd": "running",
           "wazuh-analysisd": "running",
           "wazuh-authd": "running",
           "wazuh-csyslogd": "running",
           "wazuh-dbd": "stopped",
           "wazuh-monitord": "running",
           "wazuh-execd": "running",
           "wazuh-integratord": "running",
           "wazuh-logcollector": "running",
           "wazuh-maild": "running",
           "wazuh-remoted": "running",
           "wazuh-reportd": "stopped",
           "wazuh-syscheckd": "running",
           "wazuh-clusterd": "running",
           "wazuh-modulesd": "running",
           "wazuh-db": "running",
           "wazuh-apid": "stopped"
         }
       ],
       "total_affected_items": 1,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "Processes status were successfully read in specified node",
     "error": 0
   }

You can dump the Wazuh manager current configuration with the request below (the response is shortened for brevity):

.. code-block:: console

   # curl -k -X GET "https://localhost:55000/manager/configuration?pretty=true&section=global" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
   :class: output

   {
     "data": {
       "affected_items": [
         {
           "global": {
             "jsonout_output": "yes",
             "alerts_log": "yes",
             "logall": "no",
             "logall_json": "no",
             "email_notification": "yes",
             "email_to": "me@test.example",
             "smtp_server": "mail.test.example",
             "email_from": "wazuh@test.example",
             "email_maxperhour": "12",
             "email_log_source": "alerts.log",
             "white_list": [
               "127.0.0.1",
               "^localhost.localdomain$",
               "8.8.8.8",
               "8.8.4.4"
             ]
           }
         }
       ],
       "total_affected_items": 1,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "Configuration was successfully read in specified node",
     "error": 0
   }

Exploring Wazuh agent management
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can use the Wazuh server API to manage the Wazuh agents.

The following request enumerates two active agents:

.. code-block:: console

   # curl -k -X GET "https://localhost:55000/agents?pretty=true&offset=1&limit=2&select=status%2Cid%2Cmanager%2Cname%2Cnode_name%2Cversion&status=active" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
   :class: output

   {
     "data": {
       "affected_items": [
         {
           "node_name": "worker2",
           "status": "active",
           "manager": "wazuh-worker2",
           "version": "Wazuh v4.7.4",
           "id": "001",
           "name": "wazuh-agent1"
         },
         {
           "node_name": "worker2",
           "status": "active",
           "manager": "wazuh-worker2",
           "version": "Wazuh v4.7.4",
           "id": "002",
           "name": "wazuh-agent2"
         }
       ],
       "total_affected_items": 9,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "All selected agents information was returned",
     "error": 0
   }

Add a new Wazuh agent by sending an API request with the agent name and its IP address:

.. code-block:: console

   # curl -k -X POST "https://localhost:55000/agents?pretty=true" -H  "Authorization: Bearer $TOKEN" -H  "Content-Type: application/json" -d "{\"name\":\"NewHost\",\"ip\":\"10.0.10.11\"}"

.. code-block:: json
   :class: output

   {
     "data": {
       "id": "013",
       "key": "MDEzIE5ld0hvc3RfMiAxMC4wLjEwLjEyIDkzOTE0MmE4OTQ4YTNlMzA0ZTdiYzVmZTRhN2Q4Y2I1MjgwMWIxNDI4NWMzMzk3N2U5MWU5NGJiMDc4ZDEzNjc="
     },
     "error": 0
   }

Ingest security events
^^^^^^^^^^^^^^^^^^^^^^

.. versionadded:: 4.6.0

You can utilize the Wazuh server API to ingest security events into the Wazuh manager for analysis.

There's a limit of 30 requests per minute and 100 events per request. This limit prevents endpoints from ingesting large amounts of data too fast. Check :ref:`max_request_per_minute <api_configuration_access>` to lower this limit even further or disable the feature.

.. code-block:: console

   # curl -k -X POST "https://localhost:55000/events" -H  "Authorization: Bearer $TOKEN" -H  "Content-Type: application/json" -d '{"events": ["Event value 1", "{\"someKey\": \"Event value 2\"}"]}'

.. code-block:: json
   :class: output

   {
     "data": {
       "affected_items": [

       ],
       "total_affected_items": 2,
       "total_failed_items": 0,
       "failed_items": []
     },
     "message": "All events were forwarded to analisysd",
     "error": 0
   }

Conclusion
^^^^^^^^^^
In conclusion, these examples showcase the capabilities of the Wazuh API. Explore the :ref:`reference <api_reference>` document to discover the full range of available Wazuh server API requests.
