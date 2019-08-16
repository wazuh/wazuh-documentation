.. Copyright (C) 2019 Wazuh, Inc.

How SCA works
=============

.. contents:: Table of Contents
   :depth: 10

States vs alerts
--------------------

Each agent has its own local database where it stores the current state of each check: *passed*, *failed*, or *invalid*, allowing
agents to send only the differences detected between scans. If there has been no change, only the scan *summary* event will be sent,
thus avoiding unnecessary0 network traffic while keeping the manager up to date. The manager will then use those updates to issue
alerts that will be shown in the Kibana App.

Available information of scans
------------------------------

A check event has three possible results (``passed``, ``failed``, and ``not applicable``) that are
Take the following example from policy  ``cis_debian9_L2.yml``:

.. code-block:: yaml

  - id: 3511
    title: "Ensure auditd service is enabled"
    description: "Turn on the auditd daemon to record system events."
    rationale: "The capturing of system events provides system administrators [...]"
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
    "type": "check",
    "id": 355612303,
    "policy": "CIS benchmark for Debian/Linux 9 L2",
    "policy_id": "cis_debian9_L2",
    "check": {
      "id": 3511,
      "title": "Ensure auditd service is enabled",
      "description": "Turn on the auditd daemon to record system events.",
      "rationale": "The capturing of system events provides system administrators [...]",
      "remediation": "Run the following command to enable auditd: # systemctl enable auditd",
      "compliance": {
        "cis": "4.1.2",
        "cis_csc": "6.2,6.3"
      },
      "rules": [
        "c:systemctl is-enabled auditd -> r:^enabled"
      ],
      "command": "systemctl is-enabled auditd",
      "result": "passed"
    }
  }

The *result* is ``passed`` because the rule founds "enabled" at the beginning of a line in the output of the
command `systemctl is-enabled auditd`.

.. note::
  A *check* can be marked as *not applicable* in the case an error occurs while performing the check.
  In that case, instead of including the field *result*, fields: *status* and *reason* will be included.


Integrity mechanisms
--------------------------

To ensure integrity between agent-side and manager-side states, for that particular agent,
two integrity mechanisms have been included in SCA, one for policy files and the second for scan results.

Integrity of policy files
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This mechanism is in charge of keeping policy files and scan results aligned. Whenever a change in a policy files is detected,
SCA will invalidate the results stored in the database for that policy and request a fresh dump of them.

In a nutshell, whenever the hash of a policy file changes, the recovery steps performed are:

#. A message appears in the manager log file, e.g:

    .. code-block:: none

        INFO: Policy 'cis_debian9_L2' information for agent '002' is outdated. Latest scan results requested.

#. The manager flushes its stored data for that policy.
#. The agent sends the scan results for that policy.
#. The manager updates its database, and fires alerts for the new scan results.

.. note::

  Alerts for every check result of the updated policy will be fired. This way, false negatives are avoided.


Integrity of the scan results
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To illustrate how the integrity of scan results is kept, we will use an example in which the agent-side database
and the manager-side differ. This scenary could happen due to, for instance, a network issue.

.. table:: States stores in the Agent and Manager sides
    :widths: auto

    +----------+------------------+--------------------+
    | Check ID | Agent-side state | Manager-side state |
    +==========+==================+====================+
    | 1000     | ``passed``       | ``passed``         |
    +----------+------------------+--------------------+
    | 1001     | ``failed``       | ``failed``         |
    +----------+------------------+--------------------+
    | 1002     | ``failed``       | *missing*          |
    +----------+------------------+--------------------+
    | 1003     | ``passed``       | ``passed``         |
    +----------+------------------+--------------------+

For those databases, the corresponding SHA256 hashes are:

 .. code-block:: none

    Agent:   1642AB1DC478052AC3556B5E700CD82ADB69728008301882B9CBEE0696FF2C84
    Manager: B43037CA28D95A69B6F9E03FCD826D2B253A6BB1B6AD28C4AE57A3A766ACE610

Given that the two hashes do not match, the manager will request the agent for its latest scan data,
and refresh its database with the newly received status information.
