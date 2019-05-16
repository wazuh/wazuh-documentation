.. Copyright (C) 2019 Wazuh, Inc.

How it works
============

- `State vs alerts`_
- `Available information of scans`_
- `Integrity mechanism`_

State vs alerts
---------------

Agents have their own local database where they store the state of each check: *passed*, *failed*, or *invalid*. It allows the agent to send only the differences between each scan, if nothing has changed from the last scan, only the summary event will be sent, avoiding network flooding every time a scan ends.

On the other side, the manager will contain the last scan performed in each agent updated at real-time. This way, the scan status can be consulted
in the Wazuh app as well as alerts about result changes of each particular check.

Available information of scans
------------------------------

Queriable information of the scans
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Every scan comes along with useful information about it. The JSON format is used to send the agents events to the manager.
There are basically three types of events:

- Check event
- Summary event
- Enabled policies event


Example of a check event:

.. code-block:: json

    {  
        "type":"check",
        "id":1479401170,
        "policy":"System audit for SSH hardening",
        "policy_id":"system_audit_ssh",
        "check":{  
            "id":1507,
            "title":"SSH Hardening - 8: Wrong Grace Time.",
            "description":"The option LoginGraceTime should be set to 30.",
            "rationale":"The option LoginGraceTime specifies how long in seconds after a connection request the server will wait before disconnecting if the user has not successfully logged in. 30 seconds is the recommended time for avoiding open connections without authenticate.",
            "remediation":"Change the LoginGraceTime option value in the sshd_config file.",
            "compliance":{  
                "pci_dss":"2.2.4"
            },
            "rules":[  
                "f:$sshd_file -> !r:^\\s*LoginGraceTime\\s+30\\s*$;"
            ],
            "file":"/etc/ssh/sshd_config",
            "result":"failed"
        }
    }


Example of a summary event:

.. code-block:: json

    {  
        "type":"summary",
        "scan_id":1289362433,
        "name":"System audit for password-related vulnerabilities",
        "policy_id":"system_audit_pw",
        "file":"system_audit_pw.yml",
        "description":"Guidance for establishing a secure configuration for password vulnerabilities.",
        "references":"https://www.cisecurity.org/cis-benchmarks/",
        "passed":2,
        "failed":2,
        "invalid":0,
        "total_checks":4,
        "score":50,
        "start_time":1556011249,
        "end_time":1556011249,
        "hash":"9e5250664623114d80d97a434fd78c9b7c52e0d3c92e3f448a4720ab1d40d84f",
        "hash_file":"4fe1308a35e1d062718a8e39f9420a740e95a6f145030a0f7e8b169d2b94654b",
        "force_alert":"1"
    }


Example of an enabled policies event:

.. code-block:: json

    {
        "type":"policies",
        "policies":[
            "cis_debian",
            "system_audit",
            "system_audit_ssh"
        ]
    }

The information of the different types of events are stored on the manager side inside the agent's database. This database has the following tables:

+------------------------------+------------------------------------------------------------------------+
| Table                        | Description                                                            |
+------------------------------+------------------------------------------------------------------------+
| sca_policy                   | Stores the information about the policy file itselt.                   |
+------------------------------+------------------------------------------------------------------------+
| sca_scan_info                | Stores the information about the last scan.                            |
+------------------------------+------------------------------------------------------------------------+
| sca_check                    | Stores the information about the checks.                               |
+------------------------------+------------------------------------------------------------------------+
| sca_check_compliance         | Stores the information about the compliances of a check event.         |
+------------------------------+------------------------------------------------------------------------+
| sca_check_rules              | Stores the information about the rules of a check event.               |
+------------------------------+------------------------------------------------------------------------+


Check results
^^^^^^^^^^^^^

A scan event has two possible results, they can be ``passed`` or ``failed``. A ``failed`` status is set when the check requirements are met.
Take the following example from the cis file ``cis_debian_linux_rcl.yml``:

.. code-block:: yaml

 - id: 5031
   title: "Ensure IPv4 forwarding is disabled"
   description: "The net.ipv4.ip_forward flag are used to tell the system whether it can forward packets or not."
   rationale: "Setting the flags to 0 ensures that a system with multiple interfaces (for example, a hard proxy), will never be able to forward packets, and therefore, never serve as a router."
   remediation: "Set the following parameter in /etc/sysctl.conf or a /etc/sysctl.d/* file: net.ipv4.ip_forward = 0"
   compliance:
    - cis_csc: "5.1"
    - cis: "3.1.1"
   condition: any
   rules:
     - 'f:/proc/sys/net/ipv4/ip_forward -> 1;'

The following event is generated:

.. code-block:: json

    {  
        "type":"check",
        "id":618748202,
        "policy":"CIS benchmark for Debian/Linux",
        "policy_id":"cis_debian",
        "check":{  
            "id":5031,
            "title":"Ensure IP forwarding is disabled",
            "description":"The net.ipv4.ip_forward flag is used to tell the system whether it can forward packets or not.",
            "rationale":"Setting the flag to 0 ensures that a system with multiple interfaces (for example, a hard proxy), will never be able to forward packets, and therefore, never serve as a router.",
            "remediation":"Set the following parameter in /etc/sysctl.conf or a /etc/sysctl.d/* file: net.ipv4.ip_forward = 0",
            "compliance":{  
                "cis_csc":"5.1",
                "cis":"3.1.1"
            },
            "rules":[  
                "f:/proc/sys/net/ipv4/ip_forward -> 1;"
            ],
            "file":"/proc/sys/net/ipv4/ip_forward",
            "result":"passed"
        }
    }

The *result* is ``passed`` because the ``rules`` are looking for a ``1`` inside the ``/proc/sys/net/ipv4/ip_forward`` file. 
As it has the value ``0``, the result is marked as ``passed``.

.. note::
  A *check* can be marked as *not applicable* in the case an error happens when performing the check.
  In this case, the field *result* doesn't appear and the check returns two other fields: *status* and *reason*.

  
Enabled policies
^^^^^^^^^^^^^^^^

Each agent will send the policies it has enabled, so the manager can compare them with the agent database and erase the disabled policies (if any).

.. code-block:: json

    {
        "type":"policies",
        "policies":[
            "cis_debian",
            "system_audit",
            "system_audit_ssh"
        ]
    }


Integrity mechanism
-------------------

To maintain the integrity between the agent state for each check and the manager's database for that agent, an integrity mechanism has been included in SCA scans.

Integrity of the scan results
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Let's look at how it works with an example.

On the agent side we have the following state:

+------------------------------+----------------+
| Check ID                     | State          |
+------------------------------+----------------+
| 1000                         | passed         |
+------------------------------+----------------+
| 1001                         | failed         |
+------------------------------+----------------+
| 1002                         | failed         |
+------------------------------+----------------+
| 1003                         | passed         |
+------------------------------+----------------+

The agent will send a SHA256 hash inside the summary event with the calculated hash (being it ``1642AB1DC478052AC3556B5E700CD82ADB69728008301882B9CBEE0696FF2C84``).

On the manager side, let's asume the database state is the following:

+------------------------------+----------------+
| Check ID                     | State          |
+------------------------------+----------------+
| 1000                         | passed         |
+------------------------------+----------------+
| 1001                         | failed         |
+------------------------------+----------------+
| 1003                         | passed         |
+------------------------------+----------------+

We can see the check 1002 is missing, it may have suffered a network overload and missed that particular event.
In this case, the SHA256 hash calculated at the end of the scan on the manager side is ``B43037CA28D95A69B6F9E03FCD826D2B253A6BB1B6AD28C4AE57A3A766ACE610``.
As the SHA256 of the agent ``1642AB1DC478052AC3556B5E700CD82ADB69728008301882B9CBEE0696FF2C84`` and the SHA256 of the manager ``B43037CA28D95A69B6F9E03FCD826D2B253A6BB1B6AD28C4AE57A3A766ACE610`` do not match, the manager will request to the agent the last scan again to recover the missed data.

Integrity of the files
^^^^^^^^^^^^^^^^^^^^^^

Other integrity mechanism ensure that changes in agents' policies are detected and the whole information about that policy is updated in the manager database.

When the SHA256 of a policy file has changed, the recovery steps are the following:

- A informative message appears in the manager log file:

  .. code-block:: none

    2019/04/14 08:35:18 ossec-analysisd: INFO: Policy 'system_audit_ssh' outdated in agent '128'. Latest scan requested.

- The database for that policy is flushed.
- The last scan information of that policy is sent from the agent.
- The policy scan is restored and alerts are fired for the new scan.

.. note::

  Alerts about every check status of the outdated policy are fired again. This way, false negatives are avoided.
