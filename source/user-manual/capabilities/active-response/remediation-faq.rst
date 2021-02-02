.. Copyright (C) 2021 Wazuh, Inc.

.. _remediation-faq:

FAQ
===

#. `Can I use a custom script for active responses?`_
#. `Can I configure active responses for only one host?`_
#. `Can an active response remove the action after a period of time?`_

Can I use a custom script for active responses?
-----------------------------------------------
Yes. You can create your own script and configure a command and active response to refer to it. Keep in mind that, since version v4.2, execd passes the full alert to the script via **STDIN** within a json object and each script is responsible for extracting the information necessary for its execution.
The json message format is as follows:

.. code-block:: xml

  {
    "version":1,
    "origin":{
        "name":"worker01",
        "module":"wazuh-execd"
        },
    "command":"add/delete",
    "parameters":{
        "extra_args":[],
        "alert":{ //full alert json
        },
        "program":"program-name"
    }
  }

The script can be done in whatever language you are comfortable with, but it should at least be able to read through STDIN, parse the read json object, and extract the necessary information for its execution.

Here is an example of the message that is passed to the firewall-drop script:

.. code-block:: xml

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

Can I configure active responses for only one host?
---------------------------------------------------
Yes, using the location option. More information: :ref:`Active Response options <reference_ossec_active_response>`

Can an active response remove the action after a period of time?
----------------------------------------------------------------
Yes, using the ``<timeout_allowed>`` tag on the command and the ``<timeout>`` tag on the active response. More information: :ref:`Example <remediation-examples>`
