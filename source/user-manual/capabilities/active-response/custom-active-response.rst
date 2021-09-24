.. Copyright (C) 2021 Wazuh, Inc.

.. _custom-active-response:

Custom Active Response
======================

It is possible to create a custom AR in any programming language, and configure a :ref:`command <reference_ossec_commands>` and an :ref:`active response <reference_ossec_active_response_manager>` to refer to it.

The full alert is passed to the AR via ``STDIN`` within a JSON object and each AR is responsible for extracting the information necessary for its execution.

The JSON message format is as follows:

.. code-block:: json

  {
    "version":1,
    "origin":{
        "name":"worker01",
        "module":"wazuh-execd"
    },
    "command":"add/delete",
    "parameters":{
        "extra_args":[],
        "alert":{},
        "program":"program-name"
    }
  }


**Additional steps for a Stateful AR**

A *Stateful* AR will undo its original action after the period of time specified in the active response. So, as part of the timeout behavior, when the recived command is ``add`` the AR must send a control message to the ``execd`` through ``STDOUT`` to check the keys, wait for the response via ``STDIN`` and check the ``command`` field if it has to continue the execution or abort it.

The keys must be sufficient to identify an execution instance, for example to block a user on a specific host, with the ip and the user keys it is enough.

The control message format is as follows:

.. code-block:: json

  {
    "version":1,
    "origin":{
        "name":"program-name",
        "module":"active-response"
    },
    "command":"check_keys",
    "parameters":{
        "keys":["10.0.0.1", "root"]
    }
  }


The response message from execd is a follows:

.. code-block:: json

  {
    "version":1,
    "origin":{
        "name":"node01",
        "module":"wazuh-execd"
    },
    "command":"continue/abort",
    "parameters":{}
  }

.. warning:: 

    When the ``STDIN`` reading occurs, it must be read up to the newline character (``\n``), in the same way when writing to ``STDOUT`` the newline character must be added at the end, otherwise a deadlock may occur in ``execd`` and in the ``AR`` waiting for messages.


The AR can be done in whatever language you are comfortable with, but it should at least be able to:

1. Read through ``STDIN``.

2. Parse the read JSON object.

3. Extract the necessary information for its execution.

4. Write ``STDOUT`` to send control message to execd.

5. Wait for the response via ``STDIN``.

6. Check the ``command`` field.

.. note::
  **Only for Windows Agents** For scripts developed in python for example, it is necessary to create the executable file(``.exe``) of this script and configure it in :ref:`command <reference_ossec_commands>`. To create the ``.exe`` file it is possible to use tools such as ``pyinstaller``.

Here is an example of the message that is passed to the ``firewall-drop`` AR:

.. code-block:: json

  {
    "version":1,
    "origin":{
        "name":"worker01",
        "module":"wazuh-execd"
    },
    "command":"add",
    "parameters":{
        "extra_args":[],
        "alert":{
            "timestamp":"2021-02-01T20:58:44.830+0000",
            "rule":{
                "level":15,
                "description":"Shellshock attack detected",
                "id":"31168",
                "mitre":{
                    "id":["T1068","T1190"],
                    "tactic":["Privilege Escalation","Initial Access"],
                    "technique":["Exploitation for Privilege Escalation","Exploit Public-Facing Application"]
                },
                "info":"CVE-2014-6271https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6271",
                "firedtimes":2,
                "mail":true,
                "groups":["web","accesslog","attack"],
                "pci_dss":["11.4"],
                "gdpr":["IV_35.7.d"],
                "nist_800_53":["SI.4"],
                "tsc":["CC6.1","CC6.8","CC7.2","CC7.3"]
            },
            "agent":{
                "id":"000",
                "name":"ubuntu-bionic"
            },
            "manager":{
                "name":"ubuntu-bionic"
            },
            "id":"1612213124.6448363",
            "full_log":"192.168.0.223 - - [01/Feb/2021:20:58:43 +0000] \"GET / HTTP/1.1\" 200 612 \"-\" \"() { :; }; /bin/cat /etc/passwd\"",
            "decoder":{
                "name":"web-accesslog"
            },
            "data":{
                "protocol":"GET",
                "srcip":"192.168.0.223",
                "id":"200",
                "url":"/"
            },
            "location":"/var/log/nginx/access.log"
        },
        "program":"/var/ossec/active-response/bin/firewall-drop"
    }
  }
