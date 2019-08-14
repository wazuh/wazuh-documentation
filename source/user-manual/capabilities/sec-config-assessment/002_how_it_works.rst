.. Copyright (C) 2019 Wazuh, Inc.


How SCA works
=============

.. contents:: Table of Contents
   :depth: 10

State vs alerts
---------------

Agents have their own local database where they store the state of each check: *passed*, *failed*, or *invalid*. This allows the agent to send only the differences between each scan, if nothing has changed from the last scan, only the summary event will be sent, avoiding network flooding every time a scan ends.

The manager will contain the last scan performed in each agent updated at real-time so that the scan status can be consulted in the Wazuh app as well as the alerts regarding changes of each particular check.

Available information of scans
------------------------------

Check results
^^^^^^^^^^^^^

A check event has three possible results: ``passed``, ``failed``, and ``not applicable``.
Take the following example from policy  ``cis_debian9_L2.yml``:

.. code-block:: yaml

  - id: 3511
    title: "Ensure auditd service is enabled"
    description: "Turn on the auditd daemon to record system events."
    rationale: "The capturing of system events provides system administrators with information to allow them to determine if unauthorized access to their system is occurring."
    remediation: "Run the following command to enable auditd: # systemctl enable auditd"
    compliance:
      - cis: ["4.1.2"]
      - cis_csc: ["6.2", "6.3"]
    condition: all
    rules:
      - 'c:systemctl is-enabled auditd -> r:^enabled'

After evaluating the aforementioned check, the following event is generated:

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


Integrity mechanisms
--------------------------

To ensure integrity between agent-side and manager-side states, for that particular agent,
two integrity mechanisms have been included in SCA, one for policy files and the second for scan results.

Integrity  of policy files
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This mechanism is in charge of keeping policy files and scan results aligned. Whenever a change in a policy files is detected,
SCA will invalidate the results stored in the database for that policy and request a fresh dump of them.

In a nutshell, whenever the hash of a policy file changes, the recovery steps performed are:

#. A message appears in the manager log file, e.g:

    .. code-block:: none

        INFO: Policy 'cis_debian9_L2' information for agent '%s' is outdated. Latest scan results requested.

#. The manager flushes its stored data for that policy.
#. The agent sends the scan results for that policy.
#. The manager updates its database, and fires alerts for the new scan results.

.. note::

  Alerts for every check result of the updated policy will be fired. This way, false negatives are avoided.


Integrity of the scan results
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To ilustrate how the integrity of scan results is kept, we will use an example in which the agent-side database
and the manager-side are different.

.. table:: Agent-side database
    :widths: auto

    +------------------------------+----------------+
    | Check ID                     | State          |
    +==============================+================+
    | 1000                         | passed         |
    +------------------------------+----------------+
    | 1001                         | failed         |
    +------------------------------+----------------+
    | 1002                         | failed         |
    +------------------------------+----------------+
    | 1003                         | passed         |
    +------------------------------+----------------+

which hashes to ``1642AB1DC478052AC3556B5E700CD82ADB69728008301882B9CBEE0696FF2C84``.

whereas on the manager-side, let's assume the database state is the following:

.. table:: Manager-side database
    :widths: auto

    +------------------------------+----------------+
    | Check ID                     | State          |
    +==============================+================+
    | 1000                         | passed         |
    +------------------------------+----------------+
    | 1001                         | failed         |
    +------------------------------+----------------+
    | 1003                         | passed         |
    +------------------------------+----------------+

which hashes to ``B43037CA28D95A69B6F9E03FCD826D2B253A6BB1B6AD28C4AE57A3A766ACE610``.

We can see the check **1002** is missing from the manager side, this could happen due to, for instance, a network issue.
In such scenario, given that the two hashes do not match, the manager will request the agent for the last scan data.
