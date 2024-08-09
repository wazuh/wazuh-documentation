.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how the Security Configuration Assessment capability of Wazuh works in this section of the documentation. 
  
How SCA works
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

See below SCA policy ID ``19115`` for Ubuntu 20.04 operating system as an example of a policy definition.

.. code-block:: yaml

   - id: 19115
       title: "Ensure SSH HostbasedAuthentication is disabled."
       description: "The HostbasedAuthentication parameter specifies if authentication is allowed through trusted hosts via the user of .rhosts, or /etc/hosts.equiv, along with successful public key client host authentication."
       rationale: "Even though the .rhosts files are ineffective if support is disabled in /etc/pam.conf, disabling the ability to use .rhosts files in SSH provides an additional layer of protection."
       remediation: "Edit the /etc/ssh/sshd_config file to set the parameter above any Include entries as follows: HostbasedAuthentication no Note: First occurrence of a option takes precedence, Match set statements withstanding. If Include locations are enabled, used, and order of precedence is understood in your environment, the entry may be created in a file in Include location."
       compliance:
          - cis: ["4.2.8"]
          - mitre_mitigations: ["M1042"]
          - mitre_tactics: ["TA0001"]
          - mitre_techniques: ["T1078", "T1078.001", "T1078.003"]
       condition: all
       rules:
          - 'c:sshd -T -> r:^\s*HostbasedAuthentication\s+no'
          - 'not f:/etc/ssh/sshd_config -> r:^\s*HostbasedAuthentication\s+yes'    

Scan Results
------------

SCA scan results appear as alerts with SCA scan data whenever a particular check changes its status between scans. Moreover, Wazuh agents only send those events necessary to keep the global status of the scan updated, avoiding potential events flooding.

Any given check event has three possible results:

-  Passed
-  Failed
-  Not applicable

This result is determined by the set of rules and the rule result aggregator of the check.

Take the following SCA check from policy ``cis_ubuntu20-04.yml`` as an example. The example SCA check shown scans the Ubuntu 20 endpoint to verify if you have implemented a “deny all” policy on your endpoint firewall:

.. code-block:: yaml

   - id: 19098
       title: "Ensure ip6tables default deny firewall policy."
       description: "A default deny all policy on connections ensures that any unconfigured network usage will be rejected. Note: - Changing firewall settings while connected over network can result in being locked out of the system - Remediation will only affect the ac$    rationale: "With a default accept policy the firewall will accept any packet that is not configured to be denied. It is easier to white list acceptable usage than to black list unacceptable usage."
       remediation: "IF IPv6 is enabled on your system: Run the following commands to implement a default DROP policy: # ip6tables -P INPUT DROP # ip6tables -P OUTPUT DROP # ip6tables -P FORWARD DROP."
       compliance:
         - cis: ["3.4.3.3.1"]
         - cis_csc_v8: ["4.4", "4.5"]
         - cis_csc_v7: ["9.4"]
         - cmmc_v2.0: ["AC.L1-3.1.20", "CM.L2-3.4.7", "SC.L1-3.13.1", "SC.L2-3.13.6"]
         - iso_27001-2013: ["A.13.1.1"]
         - mitre_mitigations: ["M1031", "M1037"]
         - mitre_tactics: ["TA0011"]
         - mitre_techniques: ["T1562", "T1562.004"]
         - nist_sp_800-53: ["SC-7(5)"]
         - pci_dss_v3.2.1: ["1.1.4", "1.3.1", "1.4"]
         - pci_dss_v4.0: ["1.2.1", "1.4.1"]
         - soc_2: ["CC6.6"]
       condition: all
       rules:
         - "c:ip6tables -L -> r:^Chain INPUT && r:policy DROP"
         - "c:ip6tables -L -> r:^Chain FORWARD && r:policy DROP"
         - "c:ip6tables -L -> r:^Chain OUTPUT && r:policy DROP"

After evaluating the aforementioned check, the following event is generated:

.. code-block:: json

    "data": {
      "sca": {
        "scan_id": "1023532995",
        "check": {
          "result": "failed",
          "remediation": "IF IPv6 is enabled on your system: Run the following commands to implement a default DROP policy: # ip6tables -P INPUT DROP # ip6tables -P OUTPUT DROP # ip6tables -P FORWARD DROP.",
          "compliance": {
            "pci_dss_v4": {
              "0": "1.2.1,1.4.1"
            },
            "cis_csc_v8": "4.4,4.5",
            "soc_2": "CC6.6",
            "pci_dss_v3": {
              "2": {
                "1": "1.1.4,1.3.1,1.4"
              }
            },
            "nist_sp_800-53": "SC-7(5)",
            "mitre_tactics": "TA0011",
            "mitre_techniques": "T1562,T1562.004",
            "cis": "3.4.3.3.1",
            "cmmc_v2": {
              "0": "AC.L1-3.1.20,CM.L2-3.4.7,SC.L1-3.13.1,SC.L2-3.13.6"
            },
            "iso_27001-2013": "A.13.1.1",
            "cis_csc_v7": "9.4",
            "mitre_mitigations": "M1031,M1037"
          },
          "description": "A default deny all policy on connections ensures that any unconfigured network usage will be rejected. Note: - Changing firewall settings while connected over network can result in being locked out of the system - Remediation will only affect the active system firewall, be sure to configure the default policy in your firewall management to apply on boot as well.",
          "id": "19098",
          "title": "Ensure ip6tables default deny firewall policy.",
          "rationale": "With a default accept policy the firewall will accept any packet that is not configured to be denied. It is easier to white list acceptable usage than to black list unacceptable usage.",
          "command": [
            "ip6tables -L"
          ]
        },
        "type": "check",
        "policy": "CIS Ubuntu Linux 20.04 LTS Benchmark v2.0.0"
      }
    },

You can view the scan summaries on the **Configuration Assessment** module on the Wazuh dashboard.

  .. thumbnail:: /images/sca/configuration-assessment-dashboard.png
     :title: Configuration Assessment module dashboard
     :alt: Configuration Assessment module dashboard
     :align: center
     :width: 80%

In addition, you can expand each result to display additional information.

  .. thumbnail:: /images/sca/configuration-assessment-additional-information.png
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

The scan result for check ``19098`` changes to **Passed** as shown in the image below:

  .. thumbnail:: /images/sca/configuration-assessment-scan-result.png
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