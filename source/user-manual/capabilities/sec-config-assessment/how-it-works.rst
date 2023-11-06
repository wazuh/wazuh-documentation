.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how the Configuration Assessment capability of Wazuh works in this section of the documentation. 
  
How Configuration Assessment works
=============

Each Wazuh agent has its own local database where it stores the current state of each SCA check. The Wazuh server maintains an SCA database for all agents that are enrolled to it. Wazuh agents only send the differences detected between scans to the Wazuh server. If there has been no change, only a summary of the SCA scan is sent, thus avoiding unnecessary network traffic while keeping the SCA database on the Wazuh server up to date. The Wazuh server then uses those updates to issue alerts that are shown in the Wazuh dashboard.

Integrity and alerting flow are depicted in the sequence diagram below.

  .. thumbnail:: /images/sca/sca-sequence-diagram.png
     :title: SCA integrity and alerting flow
     :alt: SCA integrity and alerting flow
     :align: center
     :width: 80%

.. _sca_check_overview:

Overview of an SCA check
------------------------

Checks are the core of an SCA policy, as they describe the scan to be performed in the endpoint. The checks contain fields that define what actions the agent should take to scan the endpoint, and how to evaluate the scan results. Each check definition comprises:

- Metadata information including a rationale, remediation, and a description of the check.
- A logical description with the ``condition`` and ``rules`` fields.

As part of the metadata, the SCA policy can contain an optional compliance field used to specify if the check is relevant to any compliance specifications. SCA checks usually indicate standards or policies that they aim to comply with. For example, we map CIS benchmark, PCI-DSS, NIST, and TSC controls to the relevant SCA checks.

See below SCA policy ID ``2651`` for Debian 10 operating system as an example of a policy definition.

.. code-block:: yaml

   - id: 2651
       title: "Ensure SSH HostbasedAuthentication is disabled"
       description: "The HostbasedAuthentication parameter specifies if authentication is allowed through trusted hosts via the user of .rhosts, or /etc/hosts.equiv, along with successful public key client host authentication. This option only applies to SSH Protocol Version 2."
       rationale: "Even though the .rhosts files are ineffective if support is disabled in /etc/pam.conf, disabling the ability to use .rhosts files in SSH provides an additional layer of protection."
       remediation: "Edit the /etc/ssh/sshd_config file to set the parameter as follows: HostbasedAuthentication no"
       compliance:
          - cis: ["5.2.9"]
          - cis_csc: ["16.3"]
          - pci_dss: ["4.1"]
          - hipaa: ["164.312.a.2.IV", "164.312.e.1", "164.312.e.2.I", "164.312.e.2.II"]
          - nist_800_53: ["SC.8"]
          - tsc: ["CC6.7"]
       condition: all
       rules:
          - 'c:sshd -T -> r:HostbasedAuthentication\s+no'

Scan Results
------------

SCA scan results appear as alerts with SCA scan data whenever a particular check changes its status between scans. Moreover, Wazuh agents only send those events necessary to keep the global status of the scan updated, avoiding potential events flooding.

Any given check event has three possible results:

-  Passed
-  Failed
-  Not applicable

This result is determined by the set of rules and the rule result aggregator of the check.

Take the following SCA check from policy ``cis_debian10.yml`` as an example. The example SCA check shown scans the Debian 10 endpoint to verify if you have implemented a “deny all” policy on your endpoint firewall:

.. code-block:: yaml

   - id: 2603
       title: "Ensure IPv6 default deny firewall policy"
       description: "A default deny all policy on connections ensures that any unconfigured network usage will be rejected."
       rationale: "With a default accept policy the firewall will accept any packet that is not configured to be denied. It is easier to white list acceptable usage than to black list unacceptable usage."
       remediation: "Run the following commands to implement a default DROP policy: # ip6tables -P INPUT DROP # ip6tables -P OUTPUT DROP # ip6tables -P FORWARD DROP. Notes: Changing firewall settings while connected over network can result in being locked out of the system. Remediation will only affect the active system firewall, be sure to configure the default policy in your firewall management to apply on boot as well."
       compliance:
         - cis: ["3.5.4.2.1"]
         - cis_csc: ["9.4"]
         - pci_dss: ["1.2.1"]
         - tsc: ["CC8.1"]
       condition: all
       rules:
         - "c:ip6tables -L -> r:^Chain INPUT && r:policy DROP"
         - "c:ip6tables -L -> r:^Chain FORWARD && r:policy DROP"
         - "c:ip6tables -L -> r:^Chain OUTPUT && r:policy DROP"

After evaluating the aforementioned check, the following event is generated:

.. code-block:: json

   "data": {
     "sca": {
       "scan_id": "1433689708",
       "check": {
         "result": "failed",
         "remediation": "Run the following commands to implement a default DROP policy: # ip6tables -P INPUT DROP # ip6tables -P OUTPUT DROP # ip6tables -P FORWARD DROP. Notes: Changing firewall settings while connected over network can result in being locked out of the system. Remediation will only affect the active system firewall, be sure to configure the default policy in your firewall management to apply on boot as well.",
         "compliance": {
           "pci_dss": "1.2.1",
           "tsc": "CC8.1",
           "cis_csc": "9.4",
           "cis": "3.5.4.2.1"
         },
         "description": "A default deny all policy on connections ensures that any unconfigured network usage will be rejected.",
         "id": "2603",
         "title": "Ensure IPv6 default deny firewall policy",
         "rationale": "With a default accept policy the firewall will accept any packet that is not configured to be denied. It is easier to white list acceptable usage than to black list unacceptable usage.",
         "command": [
           "ip6tables -L"
         ]
       },
       "type": "check",
       "policy": "CIS Benchmark for Debian/Linux 10"
     }
   },

You can view the scan summaries on the **Configuration assessment** module on the Wazuh dashboard.

  .. thumbnail:: /images/sca/dashboard-sca-tab.png
     :title: Dashboard Configuration assessment module
     :alt: Dashboard Configuration assessment module
     :align: center
     :width: 80%

In addition, you can expand each result to display additional information.

  .. thumbnail:: /images/sca/sca-additional-information.png
     :title: SCA additional information
     :alt: SCA additional information
     :align: center
     :width: 80%

The above SCA scan result is **Failed** because the rule did not find ``Chain INPUT * policy DROP``, ``Chain FORWARD * policy DROP``, and ``Chain OUTPUT * policy DROP`` in the output of the command ``ip6tables -L``. The steps below show how we implement the remediation steps suggested by Wazuh to harden the endpoint:

#. Run the following recommended commands on the monitored endpoint to apply the firewall rules:

   .. code-block:: console

      # ip6tables -P INPUT DROP
      # ip6tables -P OUTPUT DROP
      # ip6tables -P FORWARD DROP

#. Save the firewall rules and make them persist on system reboot:

   .. code-block:: console

      # ip6tables-save > /etc/ip6tables.conf
      # crontab -l | { cat; echo "@reboot /usr/sbin/ip6tables-restore /etc/ip6tables.conf"; } | crontab -

#. Restart the Wazuh agent to trigger a new SCA scan:

   .. code-block:: console

      # systemctl restart wazuh-agent

The scan result for check ``2603`` changes to **Passed** as shown in the image below:

  .. thumbnail:: /images/sca/sca-scan-result.png
     :title: SCA scan result
     :alt: SCA scan result
     :align: center
     :width: 80%

A check is marked as ``Not applicable`` in case an error occurs while performing the check. In such cases, instead of including the ``result`` field, the ``status`` and ``reason`` fields are included.

Integrity mechanisms
--------------------

Wazuh uses two integrity mechanisms  to ensure integrity between agent-side and server-side SCA states. One of the integrity mechanisms ensures the integrity of the policy files and the second ensures the integrity of scan results.

Integrity of policy files
^^^^^^^^^^^^^^^^^^^^^^^^^

This mechanism is in charge of keeping policy files and scan results aligned. Whenever a change in a policy file is detected, SCA invalidates the results stored in the database for that policy and requests a new scan to generate new results.

In a nutshell, whenever the hash of a policy file changes, the recovery steps performed are:

#. A similar message appears in the Wazuh server log file ``/var/ossec/logs/ossec.log``:

   .. code-block:: none
      :class: output

      2022/11/01 15:31:23 wazuh-analysisd: INFO: Policy 'cis_debian10' information for agent '001' is outdated. Requested latest scan results.

   The log shows the SCA policy file and the affected Wazuh agent.

#. The Wazuh server flushes its stored data for that SCA policy.
#. The Wazuh agent sends the new scan results of the SCA policy.
#. The Wazuh server updates its database and fires alerts for the new scan results.

.. note::

  Alerts are triggered for every check in a policy when the policy is updated. This way, false negatives are avoided.


Integrity of the scan results
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To illustrate how the integrity of scan results is kept, we use an example in which the agent-side database and the server-side differ. This scenario could happen when there is a network issue.

The table below shows an example of SCA state stored in the Wazuh agent and Wazuh server databases.

.. table:: States stored in the Wazuh agent and Wazuh server databases
    :widths: auto

    +----------+------------------+--------------------+
    | Check ID | Agent-side state | Manager-side state |
    +==========+==================+====================+
    | 1000     | Passed           | Passed             |
    +----------+------------------+--------------------+
    | 1001     | Failed           | Failed             |
    +----------+------------------+--------------------+
    | 1002     | Failed           | Missing            |
    +----------+------------------+--------------------+
    | 1003     | Passed           | Passed             |
    +----------+------------------+--------------------+

For those databases, the corresponding SHA256 hashes are:

 .. code-block:: none

    Wazuh agent:   1642AB1DC478052AC3556B5E700CD82ADB69728008301882B9CBEE0696FF2C84
    Wazuh server: B43037CA28D95A69B6F9E03FCD826D2B253A6BB1B6AD28C4AE57A3A766ACE610

Given that the two hashes do not match, the Wazuh server requests the latest scan data from the Wazuh agent and refreshes its database with the newly received status information.