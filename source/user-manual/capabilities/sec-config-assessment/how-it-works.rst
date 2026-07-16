.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how the Wazuh Security Configuration Assessment capability works, how to configure it, and how to create custom SCA policies.

How SCA works
=============

The Wazuh agent performs SCA scans using policy files. Each policy file defines the security configuration checks to run on monitored endpoints. During a scan, the Wazuh agent evaluates endpoint settings against the rules defined in each policy to determine whether they follow the expected security configuration.

By default, the Wazuh agent runs scans for every policy (``.yaml`` or ``.yml`` files) present in the ruleset directory. This directory can be found in the following locations on every operating system that runs the Wazuh agent:

- Linux and Unix-based agents: ``/var/ossec/ruleset/sca``.
- Windows agents: ``C:\Program Files (x86)\ossec-agent\ruleset\sca``.
- macOS agents: ``/Library/Ossec/ruleset/sca``.

After each scan, the following happens:

#. The Wazuh agent synchronizes the SCA results with the Wazuh manager.
#. The Wazuh manager processes the scan results and sends the SCA state data to the Wazuh indexer where it is stored in the ``wazuh-states-sca-*`` index.
#. The Wazuh dashboard queries this index to provide centralized visibility into endpoint compliance status and security configuration findings.

To optimize synchronization, the Wazuh agent tracks the current state of each SCA check and sends only the updates required to keep the manager synchronized. When no changes are detected between scans, the agent sends a scan summary instead of generating new SCA events.

The sequence diagram below depicts the integrity and alerting flow.

.. thumbnail:: /images/sca/sca-sequence-diagram.png
   :title: SCA module integrity and alerting flow
   :alt: SCA module integrity and alerting flow
   :align: center
   :width: 80%

Understanding SCA scan results
-------------------------------

SCA scan results appear as findings with SCA scan data when a check's status changes between scans. Wazuh agents send only the events necessary to keep the SCA state synchronized, which avoids potential event flooding.

Any given check event has three possible results:

- Passed: The endpoint configuration satisfies the conditions defined in the check.
- Failed: The endpoint configuration does not satisfy the conditions defined in the check.
- Not applicable: The check cannot be evaluated, for example, because a required file, command output, or registry value is unavailable or it does not apply to the operating system or software.

The set of rules and the :ref:`check <sca_policy_file_checks_section>` result aggregator determine this result.

On the Wazuh dashboard, navigate to **Endpoint Security** > **Configuration assessment** to view the scan summaries for the Wazuh agents.

.. thumbnail:: /images/sca/configuration-assessment-dashboard.png
   :title: Configuration Assessment scan summary
   :alt: Configuration Assessment scan summary
   :align: center
   :width: 80%

The **Inventory** tabs under the **Configurations Assessment** dashboard, provides the current SCA state for monitored endpoints. It displays the SCA policies evaluated on each endpoint and their individual checks, and the check result.

.. thumbnail:: /images/sca/sca-inventory.png
   :title: SCA inventory
   :alt: SCA inventory
   :align: center
   :width: 80%

The **Findings** tabs under the **Configurations Assessment** dashboard, displays the SCA findings generated when the result of a check changes between scans.

.. thumbnail:: /images/sca/sca-findings.png
   :title: SCA findings
   :alt: SCA findings
   :align: center
   :width: 80%

Example: Firewall check on an Ubuntu 22.04 endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

On the Wazuh dashboard, navigate to **Endpoint security** > **Configuration assessment** > **Inventory** and select the Ubuntu 22.04 endpoint to view its SCA results. The policy name on the Wazuh dashboard is **CIS Ubuntu Linux 22.04 LTS Benchmark v2.0.0** and is stored in the ``/var/ossec/ruleset/sca/cis_ubuntu22-04.yml`` file. The highlighted result shows check ``28588``, which verifies that a default deny policy is configured for the IPv6 firewall.

.. thumbnail:: /images/sca/sca-scans-ubuntu-endpoint.png
   :title: SCA scans for an Ubuntu 22.04 endpoint
   :alt: SCA scans for an Ubuntu 22.04 endpoint
   :align: center
   :width: 80%

You can expand each scan result to display additional information. On the Wazuh dashboard, navigate to the **Endpoint security** > **Configuration assessment** > **Inventory**. Click on **Inspect details** to see more information on the scan result.

.. thumbnail:: /images/sca/configuration-assessment-additional-information.png
   :title: Expanded SCA check result
   :alt: Expanded SCA check result
   :align: center
   :width: 80%

The YAML definition for this SCA check for ``28588`` is shown below.

.. code-block:: yaml

   - id: 28588
     name: "Ensure ip6tables default deny firewall policy."
     description: "A default deny all policy on connections ensures that any unconfigured network usage will be rejected. Note: - Changing firewall settings while connected over network can result in being locked out of the system - Remediation will only affect the active system firewall, be sure to configure the default policy in your firewall management to apply on boot as well."
     rationale: "With a default accept policy the firewall will accept any packet that is not configured to be denied. It is easier to white list acceptable usage than to black list unacceptable usage. Internal Only - General."
     remediation: "IF IPv6 is enabled on your system: Run the following commands to implement a default DROP policy: # ip6tables -P INPUT DROP # ip6tables -P OUTPUT DROP # ip6tables -P FORWARD DROP."
     compliance:
       cmmc: ["AC.L2-3.1.20", "CM.L2-3.4.7", "SC.L2-3.13.1", "SC.L2-3.13.6"]
       fedramp: ["SC-7"]
       gdpr: ["IV_32.1.a", "IV_32.1.b", "IV_32.1.c", "IV_32.1.d", "IV_32.2", "IV_32.3", "IV_32.4"]
       hipaa: ["164.312(e)(1)", "164.312(b)"]
       iso_27001: ["A.13.1.1", "A.13.1.2", "A.12.4.1"]
       nis2: ["21.2.e", "21.2.i", "21.2.a"]
       nist_800_171: ["3.1.20", "3.4.7", "3.13.1", "3.13.6"]
       nist_800_53: ["SC-7"]
       pci_dss: ["1.1", "1.3", "1.2", "1.4"]
       tsc: ["CC6.6", "CC6.1", "CC6.2", "CC6.3", "CC6.4", "CC6.5", "CC6.7", "CC6.8", "CC7.1", "CC7.2", "CC7.3", "CC7.4", "CC7.5", "CC4.1", "CC4.2"]
     mitre:
       tactic:
         id:
           - "TA0001"
           - "TA0011"
         name:
           - "Initial Access"
           - "Command and Control"
       technique:
         id:
           - "T1046"
           - "T1090"
           - "T1133"
         name:
           - "Network Service Discovery"
           - "Proxy"
           - "External Remote Services"
       subtechnique:
         id:
           - "T1090.001"
           - "T1090.002"
           - "T1557.001"
         name:
           - "Internal Proxy"
           - "External Proxy"
           - "LLMNR/NBT-NS Poisoning and SMB Relay"
     condition: all
     rules:
       - "c:ip6tables -L -> r:^Chain INPUT && r:policy DROP"
       - "c:ip6tables -L -> r:^Chain FORWARD && r:policy DROP"
       - "c:ip6tables -L -> r:^Chain OUTPUT && r:policy DROP"
   # 4.3.3.2 Ensure ip6tables loopback traffic is configured. (Automated)
   - id: 28589
     name: "Ensure ip6tables loopback traffic is configured."
     description: "Configure the loopback interface to accept traffic. Configure all other interfaces to deny traffic to the loopback network (::1). Note: - Changing firewall settings while connected over network can result in being locked out of the system - Remediation will only affect the active system firewall, be sure to configure the default policy in your firewall management to apply on boot as well."
     rationale: "Loopback traffic is generated between processes on machine and is typically critical to operation of the system. The loopback interface is the only place that loopback network (::1) traffic should be seen, all other interfaces should ignore traffic on this network as an anti-spoofing measure. Internal Only - General."
     remediation: "Run the following commands to implement the loopback rules: # ip6tables -A INPUT -i lo -j ACCEPT # ip6tables -A OUTPUT -o lo -j ACCEPT # ip6tables -A INPUT -s ::1 -j DROP."
     compliance:
       cmmc: ["AC.L2-3.1.20", "CM.L2-3.4.7", "SC.L2-3.13.1", "SC.L2-3.13.6"]
       fedramp: ["SC-7"]
       gdpr: ["IV_32.1.a", "IV_32.1.b", "IV_32.1.c", "IV_32.1.d", "IV_32.2", "IV_32.3", "IV_32.4"]
       hipaa: ["164.312(e)(1)", "164.312(b)"]
       iso_27001: ["A.13.1.1", "A.13.1.2", "A.12.4.1"]
       nis2: ["21.2.e", "21.2.i", "21.2.a"]
       nist_800_171: ["3.1.20", "3.4.7", "3.13.1", "3.13.6"]
       nist_800_53: ["SC-7"]
       pci_dss: ["1.1", "1.3", "1.2", "1.4"]
       tsc: ["CC6.6", "CC6.1", "CC6.2", "CC6.3", "CC6.4", "CC6.5", "CC6.7", "CC6.8", "CC7.1", "CC7.2", "CC7.3", "CC7.4", "CC7.5", "CC4.1", "CC4.2"]
     mitre:
       tactic:
         id:
           - "TA0001"
           - "TA0011"
         name:
           - "Initial Access"
           - "Command and Control"
       technique:
         id:
           - "T1046"
           - "T1090"
           - "T1133"
         name:
           - "Network Service Discovery"
           - "Proxy"
           - "External Remote Services"
       subtechnique:
         id:
           - "T1090.001"
           - "T1090.002"
           - "T1557.001"
         name:
           - "Internal Proxy"
           - "External Proxy"
           - "LLMNR/NBT-NS Poisoning and SMB Relay"
     condition: all
     rules:
       - 'c:ip6tables -L INPUT -v -n -> r:.*ACCEPT.*all.*lo.*[*!+-].*::/0.*::/0'
       - 'c:ip6tables -L INPUT -v -n -> r:.*DROP.*all.*[*!+-].*[*!+-].*::1.*::/0'
       - 'c:ip6tables -L OUTPUT -v -n -> r:.*ACCEPT.*all.*[*!+-].*lo.*::/0.*::/0'
   # 4.3.3.3 Ensure ip6tables outbound and established connections are configured. (Manual) - Not Implemented
   # 4.3.3.4 Ensure ip6tables firewall rules exist for all open ports. (Automated) Not Implemented

Evaluating this check generates the following event:

.. code-block:: json

   {
     "_index": "wazuh-states-sca",
     "_id": "wazuh_003_b127c9987a3963a172ffef149db2fed2d1c64c13",
     "_score": 0,
     "_source": {
       "check": {
         "compliance": {
           "cmmc": [
             "AC.L2-3.1.20",
             "CM.L2-3.4.7",
             "SC.L2-3.13.1",
             "SC.L2-3.13.6"
           ],
           "fedramp": [
             "SC-7"
           ],
           "gdpr": [
             "IV_32.1.a",
             "IV_32.1.b",
             "IV_32.1.c",
             "IV_32.1.d",
             "IV_32.2",
             "IV_32.3",
             "IV_32.4"
           ],
           "hipaa": [
             "164.312(e)(1)",
             "164.312(b)"
           ],
           "iso_27001": [
             "A.13.1.1",
             "A.13.1.2",
             "A.12.4.1"
           ],
           "nis2": [
             "21.2.e",
             "21.2.i",
             "21.2.a"
           ],
           "nist_800_171": [
             "3.1.20",
             "3.4.7",
             "3.13.1",
             "3.13.6"
           ],
           "nist_800_53": [
             "SC-7"
           ],
           "pci_dss": [
             "1.1",
             "1.3",
             "1.2",
             "1.4"
           ],
           "tsc": [
             "CC6.6",
             "CC6.1",
             "CC6.2",
             "CC6.3",
             "CC6.4",
             "CC6.5",
             "CC6.7",
             "CC6.8",
             "CC7.1",
             "CC7.2",
             "CC7.3",
             "CC7.4",
             "CC7.5",
             "CC4.1",
             "CC4.2"
           ]
         },
         "condition": "all",
         "description": "A default deny all policy on connections ensures that any unconfigured network usage will be rejected. Note: - Changing firewall settings while connected over network can result in being locked out of the system - Remediation will only affect the active system firewall, be sure to configure the default policy in your firewall management to apply on boot as well.",
         "id": "28588",
         "mitre": {
           "subtechnique": {
             "id": [
               "T1090.001",
               "T1090.002",
               "T1557.001"
             ],
             "name": [
               "Internal Proxy",
               "External Proxy",
               "LLMNR/NBT-NS Poisoning and SMB Relay"
             ]
           },
           "tactic": {
             "id": [
               "TA0001",
               "TA0011"
             ],
             "name": [
               "Initial Access",
               "Command and Control"
             ]
           },
           "technique": {
             "id": [
               "T1046",
               "T1090",
               "T1133"
             ],
             "name": [
               "Network Service Discovery",
               "Proxy",
               "External Remote Services"
             ]
           }
         },
         "name": "Ensure ip6tables default deny firewall policy.",
         "rationale": "With a default accept policy the firewall will accept any packet that is not configured to be denied. It is easier to white list acceptable usage than to black list unacceptable usage. Internal Only - General.",
         "remediation": "IF IPv6 is enabled on your system: Run the following commands to implement a default DROP policy: # ip6tables -P INPUT DROP # ip6tables -P OUTPUT DROP # ip6tables -P FORWARD DROP.",
         "result": "Failed",
         "rules": [
           "[\"c:ip6tables -L -> r:^Chain INPUT && r:policy DROP\"",
           "\"c:ip6tables -L -> r:^Chain FORWARD && r:policy DROP\"",
           "\"c:ip6tables -L -> r:^Chain OUTPUT && r:policy DROP\"]"
         ]
       },
       "checksum": {
         "hash": {
           "sha1": "79b51b5eac2fe4e739a52b612826be1a428fd55c"
         }
       },
       "policy": {
         "description": "This document provides prescriptive guidance for establishing a secure configuration posture for Ubuntu Linux 22.04 LTS based on CIS benchmark for Ubuntu Linux 22.04 LTS.",
         "file": "cis_ubuntu22-04.yml",
         "id": "cis_ubuntu22-04",
         "name": "CIS Ubuntu Linux 22.04 LTS Benchmark v2.0.0.",
         "references": [
           "[\"https://www.cisecurity.org/cis-benchmarks/\"]"
         ]
       },
       "state": {
         "document_version": 1,
         "modified_at": "2026-07-11T15:53:19.503Z"
       },
       "wazuh": {
         "agent": {
           "groups": [
             "default"
           ],
           "host": {
             "architecture": "x86_64",
             "hostname": "server",
             "os": {
               "name": "Ubuntu",
               "platform": "ubuntu",
               "type": "linux",
               "version": "22.04.3 LTS (Jammy Jellyfish)"
             }
           },
           "id": "003",
           "name": "Ubuntu",
           "version": "v5.0.0"
         },
         "cluster": {
           "name": "wazuh"
         }
       }
     },
     "fields": {
       "state.modified_at": [
         "2026-07-11T15:53:19.503Z"
       ]
     }
   }

Remediation
~~~~~~~~~~~

The scan result above is **Failed** because the rule didn't find ``Chain INPUT * policy DROP``, ``Chain FORWARD * policy DROP``, and ``Chain OUTPUT * policy DROP`` in the output of the command ``ip6tables -L``.

The steps below show how to apply the remediation that Wazuh suggests to harden the endpoint:

#. Run the following recommended commands on the monitored endpoint to apply the firewall rules:

   .. code-block:: console

      # ip6tables -P INPUT DROP
      # ip6tables -P OUTPUT DROP
      # ip6tables -P FORWARD DROP

#. Save the firewall rules:

   .. code-block:: console

      # ip6tables-save > /etc/ip6tables.conf

#. Restart the Wazuh agent to trigger a new SCA scan:

   .. code-block:: console

      # systemctl restart wazuh-agent

The scan result for check ``28588`` changes to **Passed** as shown in the image below:

.. thumbnail:: /images/sca/configuration-assessment-scan-result.png
   :title: Check 28588 passed after remediation
   :alt: Check 28588 passed after remediation
   :align: center
   :width: 80%

Integrity mechanisms
---------------------

Wazuh uses two integrity mechanisms to keep agent-side and server-side SCA states in synchronization. These mechanisms ensure the integrity of the policy files and the scan results.

Integrity of policy files
^^^^^^^^^^^^^^^^^^^^^^^^^^

This integrity mechanism keeps policy files and scan results aligned. When it detects a change in a policy file, SCA invalidates the results stored in the database for that policy and requests a new scan to generate new results.

When the hash of a policy file changes, Wazuh performs the following recovery steps:

#. The Wazuh manager flushes its stored data for that SCA policy.
#. The Wazuh agent sends the new scan results of the SCA policy.
#. The Wazuh manager processes the new scan results, updates the SCA state in its local database and synchronizes the updated state with the Wazuh indexer.

.. note::

   Wazuh triggers findings for every check in a policy when the policy is updated. This avoids false negatives.

Integrity of the scan results
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To illustrate how Wazuh maintains the integrity of scan results, consider an example where the agent-side and server-side databases differ. This scenario can happen when there's a network issue.

The table below shows an example of the SCA state stored in the Wazuh agent and Wazuh manager databases.

.. table:: States stored in the Wazuh agent and Wazuh manager databases
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

For these databases, the corresponding SHA256 hashes are:

.. code-block:: none

   Wazuh agent:   1642AB1DC478052AC3556B5E700CD82ADB69728008301882B9CBEE0696FF2C84
   Wazuh manager: B43037CA28D95A69B6F9E03FCD826D2B253A6BB1B6AD28C4AE57A3A766ACE610

Since the two hashes don't match, the Wazuh manager requests the latest scan data from the Wazuh agent and refreshes its database with the newly received status information.

.. _sca_how_to_configure:

How to configure SCA
----------------------

The Wazuh SCA module is enabled by default on Wazuh agents, allowing security configuration assessments to run automatically without additional configuration. The following sections describe how to manage SCA policies, customize the module configuration, and create custom policies for your environment.

The SCA module is configured in the Wazuh agent configuration file under the ``<sca>`` section. By default, the configuration file is located in the following paths:

- Linux and other Unix-based systems: ``/var/ossec/etc/ossec.conf``.
- Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``.
- macOS: ``/Library/Ossec/etc/ossec.conf``.

The following example shows the SCA configuration with the available configuration options. You can modify these options to customize how the Wazuh agent performs security configuration assessments.

.. code-block:: xml

   <sca>
     <!-- General settings -->
     <enabled>yes</enabled>
     <scan_on_start>yes</scan_on_start>
     <interval>12h</interval>
     <max_eps>100</max_eps>
     <!-- SCA policies -->
     <policies>
       <policy>/var/ossec/etc/shared/cis_debian10.yml</policy>
       <policy>/var/ossec/etc/shared/cis_apache_24.yml</policy>
       <policy enabled="no">/custom/policies/disabled_policy.yml</policy>
     </policies>
     <!-- Database synchronization settings -->
     <synchronization>
       <enabled>yes</enabled>
       <interval>5m</interval>
       <integrity_interval>1h</integrity_interval>
       <max_eps>75</max_eps>
     </synchronization>
   </sca>

Where:

- ``<enabled>``: Enables or disables the Wazuh SCA module.
- ``<scan_on_start>``: Runs an SCA scan immediately after the Wazuh agent starts.
- ``<interval>``: Specifies how often the Wazuh agent performs SCA scans.
- ``<max_eps>``: Limits the maximum number of SCA events per second that the Wazuh agent can generate.
- ``<synchronization>``: Configures how the Wazuh agent synchronizes SCA state with the Wazuh manager.

  - ``<enabled>``: Enables or disables SCA state synchronization between the Wazuh agent and the Wazuh manager. The default value is ``yes``.
  - ``<interval>``: Defines how often the Wazuh agent initiates the synchronization process with the Wazuh manager to synchronize SCA state data.
  - ``<integrity_interval>``: Specifies how often the Wazuh agent performs an integrity check to verify that the SCA policy files match those stored on the Wazuh manager.
  - ``<response_timeout>``: Specifies how long the Wazuh agent waits for a synchronization response before timing out.
  - ``<max_eps>``: Specifies the maximum number of SCA synchronization events that the Wazuh agent can send per second.

- Optional

  - ``<policies>``: Contains the list of SCA policy files that the Wazuh agent loads.

    - ``<policy>``: Specifies an individual SCA policy file. Set ``enabled="no"`` to disable a policy without removing it from the configuration.

For a detailed description of the SCA configuration parameters, check the SCA reference.

Enabling and disabling policies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By default, the Wazuh agent scans every policy (``.yaml`` or ``.yml`` file) in its ruleset folder:

- Linux and Unix-based agents: ``/var/ossec/ruleset/sca``.
- Windows agents: ``C:\Program Files (x86)\ossec-agent\ruleset\sca``.
- macOS agents: ``/Library/Ossec/ruleset/sca``.

.. note::

   Installations and updates don't preserve the contents of these default ruleset folders. Place your policies under an alternative folder if you want to modify or add new ones.

To enable a policy file outside the Wazuh agent installation folder, add the policy file path to the ``<sca>`` block in the Wazuh agent configuration file. For example:

.. code-block:: xml

   <sca>
     <policies>
       <policy><FULLPATH_TO_CUSTOM_SCA_POLICY_FILE></policy>
     </policies>
   </sca>

You can also specify a path relative to the Wazuh installation directory:

.. code-block:: xml

   <sca>
     <policies>
       <policy>etc/shared/<CUSTOM_SCA_POLICY_FILE></policy>
     </policies>
   </sca>

You can disable policies on the Wazuh agent in two ways. The simplest is to rename the policy file by adding ``.disabled`` (or anything other than ``.yaml`` or ``.yml``) after its YAML extension.

The second way is to disable the policy from the Wazuh agent ``ossec.conf`` file by adding a line like the following to the ``<policy>`` section of the SCA module:

.. code-block:: xml

   <sca>
     <policies>
       <policy enabled="no">etc/shared/<POLICY_FILE_TO_DISABLE></policy>
     </policies>
   </sca>

.. _managing_sca_policies_using_centralized_configuration:

Managing SCA policies using centralized configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As described in the centralized configuration section, the Wazuh manager can push files and configurations to connected Wazuh agents.

You can enable this feature to push policy files to Wazuh agents in defined groups. By default, every Wazuh agent belongs to the ``default`` group, which is used here as an example:

#. Edit the Wazuh agent ``local_internal_options.conf`` file to allow SCA policies sent from the Wazuh manager to execute commands:

   .. tabs::

      .. group-tab:: Linux

         .. code-block:: console

            # echo "sca.remote_commands=1" >> /var/ossec/etc/local_internal_options.conf

      .. group-tab:: Windows

         .. code-block:: doscon

            > notepad "C:\Program Files (x86)\ossec-agent\local_internal_options.conf"

         Append the command ``sca.remote_commands=1``.

      .. group-tab:: macOS

         .. code-block:: console

            # echo "sca.remote_commands=1" >> /Library/Ossec/etc/local_internal_options.conf

   .. note::

      Enabling remote command execution lets the Wazuh manager execute commands on the monitored endpoint. Remote commands are disabled by default as a security measure, which helps reduce the attack surface if the Wazuh manager is compromised. You don't need to enable remote commands if you add the policy files to each agent without using Wazuh to push them. For example, you can create the policy file directly on the monitored endpoint, or use ``scp`` to copy it there.

#. On the Wazuh manager, place a new policy file in the ``/var/ossec/etc/shared/default`` folder and change its ownership. Replace ``<NEW_POLICY_FILE>`` with your policy name:

   .. code-block:: console

      # chown wazuh:wazuh /var/ossec/etc/shared/default/<NEW_SCA_POLICY_FILE>

#. Add the following configuration block to the Wazuh manager ``/var/ossec/etc/shared/default/agent.conf`` file to configure the new policy file in the Wazuh agent:

   .. code-block:: xml
      :emphasize-lines: 5

      <agent_config>
        <!-- Shared agent configuration here -->
        <sca>
          <policies>
            <policy>etc/shared/<NEW_POLICY_FILE></policy>
          </policies>
        </sca>
      </agent_config>

   Wazuh saves every file pushed remotely from the server in the ``/<WAZUH_HOME_DIRECTORY>/etc/shared/`` directory on the agent endpoints, regardless of the group they belong to. We specify the policy's relative file path in the configuration because the full file path might differ depending on the endpoint's operating system.

The new ``<sca>`` block in the Wazuh manager ``/var/ossec/etc/shared/default/agent.conf`` file merges with the ``<sca>`` block on the Wazuh agent side, and Wazuh adds the new configuration.

.. _sca_creating_custom_policies:

Creating custom SCA policies
------------------------------

Wazuh has built-in SCA policies for common operating systems and applications. However, you can also create custom SCA policies to assess security configurations that are specific to your environment, internal security standards, or third-party applications that are not covered by the default policies.

Every custom SCA policy is defined in a YAML file. You need to consider the following four sections when creating a custom policy file, although not all of them are required.

.. _sca_policy_file_sections:

.. table:: Policy file sections
   :widths: auto

   +--------------------+----------------+
   | Section            | Required       |
   +====================+================+
   | policy             | Yes            |
   +--------------------+----------------+
   | requirements       | No             |
   +--------------------+----------------+
   | variables          | No             |
   +--------------------+----------------+
   | checks             | Yes            |
   +--------------------+----------------+

An SCA policy looks like the following:

.. code-block:: YAML
   :emphasize-lines: 10,18,27,31

   # Security Configuration Assessment
   # Audit for UNIX systems
   # Copyright (C) 2015, Wazuh Inc.
   #
   # This program is free software; you can redistribute it
   # and/or modify it under the terms of the GNU General Public
   # License (version 2) as published by the FSF - Free Software
   # Foundation

   policy:
     id: "unix_audit"
     file: "sca_unix_audit.yml"
     name: "System audit for Unix based systems"
     description: "Guidance for establishing a secure configuration for Unix based systems."
     references:
       - https://www.ssh.com/ssh/

   requirements:
     title: "Check that the SSH service and password-related files are present on the system"
     description: "Requirements for running the SCA scan against the Unix based systems policy."
     condition: any
     rules:
       - 'f:$sshd_file'
       - 'f:/etc/passwd'
       - 'f:/etc/shadow'

   variables:
     $sshd_file: /etc/ssh/sshd_config
     $pam_d_files: /etc/pam.d/common-password,/etc/pam.d/password-auth,/etc/pam.d/system-auth,/etc/pam.d/system-auth-ac,/etc/pam.d/passwd

   checks:
     - id: 3000
       title: "SSH Hardening: Port should not be 22"
       description: "The ssh daemon should not be listening on port 22 (the default value) for incoming connections."
       rationale: "Changing the default port you may reduce the number of successful attacks from zombie bots, an attacker or bot doing port-scanning can quickly identify your SSH port."
       remediation: "Change the Port option value in the sshd_config file."
       compliance:
         - pci_dss: ["2.2.4"]
         - nist_800_53: ["CM.1"]
       condition: all
       rules:
         - 'f:$sshd_file -> !r:^# && r:Port && !r:\s*\t*22$'

     - id: 3001
       title: "SSH Hardening: Protocol should be set to 2"

.. note::
   If the ``requirements`` aren't satisfied for a specific policy file, the scan for that file won't start.

Policy section
^^^^^^^^^^^^^^

The policy section defines the metadata for the SCA policy, including its identifier, name, description, and other general attributes.

.. _sca_policy_file_policy_section:
.. table:: Policy section

   +--------------------+----------------+-------------------+-------------------------------+------------------------+
   | Field              | Mandatory      | Type              | Allowed values                | Description            |
   +====================+================+===================+===============================+========================+
   | id                 | Yes            | String            | Any string                    | Policy ID              |
   +--------------------+----------------+-------------------+-------------------------------+------------------------+
   | file               | Yes            | String            | Any string                    | Policy filename        |
   +--------------------+----------------+-------------------+-------------------------------+------------------------+
   | name               | Yes            | String            | Any string                    | Policy title           |
   +--------------------+----------------+-------------------+-------------------------------+------------------------+
   | description        | Yes            | String            | Any string                    | Brief description      |
   +--------------------+----------------+-------------------+-------------------------------+------------------------+
   | references         | No             | Array of strings  | Any string (empty by default) | Links to references    |
   +--------------------+----------------+-------------------+-------------------------------+------------------------+
   | regex_type         | No             | String            | "osregex" (default), "pcre2"  | Policy regex engine    |
   +--------------------+----------------+-------------------+-------------------------------+------------------------+

Requirement section
^^^^^^^^^^^^^^^^^^^^

Requirements determine whether a policy should run on an endpoint before any checks are evaluated. If the requirements are not met, the policy is skipped. The **requirements** section specifies the conditions that determine whether a policy should run on an endpoint. Use this section to restrict policy execution based on factors such as the operating system, installed packages, or other system characteristics.

.. _sca_policy_file_requirements_section:
.. table:: Requirements section

   +--------------------+----------------+-------------------+------------------------+
   | Field              | Mandatory      | Type              | Allowed values         |
   +====================+================+===================+========================+
   | title              | Yes            | String            | Any string             |
   +--------------------+----------------+-------------------+------------------------+
   | description        | Yes            | String            | Any string             |
   +--------------------+----------------+-------------------+------------------------+
   | condition          | Yes            | String            | Any string             |
   +--------------------+----------------+-------------------+------------------------+
   | rules              | Yes            | Array of strings  | Any string             |
   +--------------------+----------------+-------------------+------------------------+

Variables section
^^^^^^^^^^^^^^^^^^

The variables section defines reusable values that can be referenced throughout the policy. Using variables reduces duplication and simplifies policy maintenance when the same value is used in multiple checks. There is no limit on the number of variables to add within a rule.

.. _sca_policy_file_variables_section:
.. table:: Variables section

   +--------------------+----------------+-------------------+------------------------+
   | Field              | Mandatory      | Type              | Allowed values         |
   +====================+================+===================+========================+
   | variable_name      | Yes            | Array of strings  | Any string             |
   +--------------------+----------------+-------------------+------------------------+

The variable names are preceded by ``$``. For example:

- ``$list_of_files``: ``/etc/ssh/sshd_config``, ``/etc/sysctl.conf``, ``/var/log/dmesg``
- ``$list_of_folders``: ``/etc``, ``/var``, ``/tmp``
- ``$program_name``: ``apache2``

Variables can be placed anywhere in the left part of the rule. Therefore, regarding the variables above, the following rules could be built:

.. code-block:: yaml

    f:$list_of_files -> r:^Content to be found
    c:systemctl is-enabled $program_name -> r:^enabled

Checks section
^^^^^^^^^^^^^^

.. _sca_check_overview:

The checks section contains the security checks performed during policy evaluation. Each check defines the condition to verify, the expected result, and the remediation guidance presented when a check fails. Each check is composed of several fields as described in the table below:

.. _sca_policy_file_checks_section:
.. table:: Checks section

   +-------------+-----------+----------------------------+--------------------+
   |    Field    | Mandatory |            Type            |   Allowed values   |
   +=============+===========+============================+====================+
   |      id     |    Yes    |           Numeric          | Any integer number |
   +-------------+-----------+----------------------------+--------------------+
   |    title    |    Yes    |           String           |     Any string     |
   +-------------+-----------+----------------------------+--------------------+
   | description |     No    |           String           |     Any string     |
   +-------------+-----------+----------------------------+--------------------+
   |  rationale  |     No    |           String           |     Any string     |
   +-------------+-----------+----------------------------+--------------------+
   | remediation |     No    |           String           |     Any string     |
   +-------------+-----------+----------------------------+--------------------+
   |  compliance |     No    | Array of arrays of strings |     Any string     |
   +-------------+-----------+----------------------------+--------------------+
   |  references |     No    |      Array of strings      |     Any string     |
   +-------------+-----------+----------------------------+--------------------+
   |  condition  |    Yes    |           String           |   all, any, none   |
   +-------------+-----------+----------------------------+--------------------+
   |    rules    |    Yes    |      Array of strings      |     Any string     |
   +-------------+-----------+----------------------------+--------------------+
   | regex_type  |    No     |           String           |"pcre2" or "osregex"|
   +-------------+-----------+----------------------------+--------------------+

Check evaluation is governed by its rule result aggregation strategy, as set in its ``condition`` field, and the results of
the evaluation of its rules.

.. note::

   -  The ``id`` field under the ``policy`` and ``checks`` sections must be unique across policy files.
   -  If you set a ``regex_type``, it overrides the regex engine type defined in the policy.

Condition
~~~~~~~~~

The result of each SCA check is governed by the conditions set in the ``condition`` field, and the results of the evaluation of its rules. The condition field specifies how rule results are aggregated in order to calculate the final value of a check. There are three options:

- ``all``: The check is evaluated as **Passed** if all of its rules are satisfied and as **Failed** as soon as one rule is not satisfied.
- ``any``: The check is evaluated as **Passed** as soon as any of its rules are satisfied.
- ``none``: The check is evaluated as **Passed** if none of its rules are satisfied and as **Failed** as soon as one rule is satisfied.

There are certain situations in which the aforementioned aggregators are evaluated as **Not applicable**.

- ``all``: If any rule returns **Not applicable**, and no rule returns **Failed**, the result is **Not applicable**.
- ``any``: The check is evaluated as **Not applicable** if no rule is evaluated as **Passed** and any rule returns **Not applicable**.
- ``none``: The check is evaluated as **Not applicable** if no rule is evaluated as **Passed** and any rule returns **Not applicable**.

.. table:: Condition / rule evaluation
   :widths: auto

   +------------------------------+-------------+-------------+-------------------+--------------------+
   | Condition \\ Rule evaluation |  Passed     |  Failed     | Not applicable    |     Result         |
   +==============================+=============+=============+===================+====================+
   |            ``all``           |     yes     |      no     |         no        |     Passed         |
   +------------------------------+-------------+-------------+-------------------+--------------------+
   |            ``all``           | \*          |      no     |        yes        |  Not applicable    |
   +------------------------------+-------------+-------------+-------------------+--------------------+
   |            ``all``           | \*          |     yes     | \*                |     Failed         |
   +------------------------------+-------------+-------------+-------------------+--------------------+
   |            ``any``           |     yes     | \*          | \*                |     Passed         |
   +------------------------------+-------------+-------------+-------------------+--------------------+
   |            ``any``           |      no     |     yes     |         no        |     Failed         |
   +------------------------------+-------------+-------------+-------------------+--------------------+
   |            ``any``           |      no     |  \*         |        yes        |  Not applicable    |
   +------------------------------+-------------+-------------+-------------------+--------------------+
   |           ``none``           |     yes     |  \*         | \*                |     Failed         |
   +------------------------------+-------------+-------------+-------------------+--------------------+
   |           ``none``           |      no     |  \*         |        yes        |  Not applicable    |
   +------------------------------+-------------+-------------+-------------------+--------------------+
   |           ``none``           |      no     |     yes     |         no        |     Passed         |
   +------------------------------+-------------+-------------+-------------------+--------------------+

\*: This result does not affect the final result.

Rules
~~~~~

Rules can check for the existence of files, directories, registry keys and values, running processes, and recursively test for the existence of files inside directories. When it comes to content checking, they are able to check for file contents, recursively check for the contents of files inside directories, command output, and registry value data.

Abstractly, rules start with a location and a type of location that is the target of the test, followed by the actual test specification. Such tests fall into two categories: existence and content checks. The type of location is listed in the :ref:`Rule types<rule_types>` table below, and the location could be a file name, directory, process name, command, or a registry key.

.. _rule_types:

There are five main types of rules as described below.

.. table:: Rule types
   :widths: auto

   +------------------------------+------------------+
   | Type                         | Character        |
   +==============================+==================+
   | File                         | ``f``            |
   +------------------------------+------------------+
   | Directory                    | ``d``            |
   +------------------------------+------------------+
   | Process                      | ``p``            |
   +------------------------------+------------------+
   | Commands                     | ``c``            |
   +------------------------------+------------------+
   | Registry (Windows Only)      | ``r``            |
   +------------------------------+------------------+

The operators for content checking are shown in the content comparison operators table below.

.. table:: Content comparison operators
   :widths: auto

   +--------------------------------------+------------------------------------------------------------------------------------------+------------------------------------------------------------+
   | Operation                            | Operator                                                                                 | Example                                                    |
   +======================================+==========================================================================================+============================================================+
   | Literal comparison, exact match      | *by omission (the absence of an operator signifies a literal comparison or exact match)* | ``f:/file -> CONTENT``                                     |
   +--------------------------------------+------------------------------------------------------------------------------------------+------------------------------------------------------------+
   | Lightweight Regular expression match | ``r:``                                                                                   | ``f:/file -> r:REGEX``                                     |
   +--------------------------------------+------------------------------------------------------------------------------------------+------------------------------------------------------------+
   | Numeric comparison (integers)        | ``n:``                                                                                   | ``f:/file -> n:REGEX_WITH_CAPTURE_GROUP compare <= VALUE`` |
   +--------------------------------------+------------------------------------------------------------------------------------------+------------------------------------------------------------+

The operators for numeric comparison are shown in the table below.

.. table:: Numeric comparison operators
   :widths: auto

   +--------------------------------+----------+---------------------------------------+
   | Arithmetic relational operator | Operator | Example                               |
   +================================+==========+=======================================+
   | less than                      | ``<``    | ``n:SomeProperty (\d) compare < 42``  |
   +--------------------------------+----------+---------------------------------------+
   | less than or equal to          | ``<=``   | ``n:SomeProperty (\d) compare <= 42`` |
   +--------------------------------+----------+---------------------------------------+
   | equal to                       | ``==``   | ``n:SomeProperty (\d) compare == 42`` |
   +--------------------------------+----------+---------------------------------------+
   | not equal to                   | ``!=``   | ``n:SomeProperty (\d) compare != 42`` |
   +--------------------------------+----------+---------------------------------------+
   | greater than or equal to       | ``>=``   | ``n:SomeProperty (\d) compare >= 42`` |
   +--------------------------------+----------+---------------------------------------+
   | greater than                   | ``>``    | ``n:SomeProperty (\d) compare > 42``  |
   +--------------------------------+----------+---------------------------------------+

You can place ``not`` at the beginning of a rule to negate it. For example:

.. code-block:: yaml

    not f:/some_file -> some_text

The SCA rule above fails if ``some_text`` is found within the contents of ``some_file``.

By combining the aforementioned rule types and operators, both existence and content checking can be performed.

.. note::
    - **Process** rules only allow existence checks.
    - **Command** rules only allow content (output) checks.

Existence checking rules
'''''''''''''''''''''''''

Existence checks are created by setting rules without a content operator. The general form is as follows:

.. code-block:: yaml

    RULE_TYPE:target

Examples of existence checks:

- ``f:/etc/sshd_config`` checks the existence of ``/etc/sshd_config`` file.
- ``d:/etc`` checks the existence of the ``/etc`` directory.
- ``not p:sshd`` tests the presence of processes called ``sshd`` and fails if one is found.
- ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa`` checks for the existence of the ``HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa`` key.
- ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa -> LimitBlankPasswordUse`` checks for the existence of the ``LimitBlankPasswordUse`` value in the key.

Content checking rules
'''''''''''''''''''''''

The general form of a rule testing for contents is as follows:

.. code-block:: yaml

    RULE_TYPE:target -> CONTENT_OPERATOR:value

.. warning::
    - The context of a content check is limited to a **line**.
    - It is **mandatory** to respect the spaces around the ``->`` and ``compare`` separators.
    - If the **target** of a rule that checks for contents does not exist, the result will be ``Not applicable`` as it could not be checked.

Content check operator results can be negated by adding a ``!`` before them, for example:

.. code-block:: yaml

    f:/etc/ssh_config -> !r:PermitRootLogin

.. warning::

    Be careful when negating content operators as that makes them evaluate as **Passed** for anything that does not match with the check specified. For example, rule ``f:/etc/ssh_config -> !r:PermitRootLogin`` is evaluated as Passed if it finds any line that does not contain ``PermitRootLogin``.

Content check operators can be chained using the operator ``&&`` (AND) as follows:

.. code-block:: yaml

    f:/etc/ssh_config -> !r:^# && r:Protocol && r:2

This rule reads as Pass if there's a line whose first character is not ``#`` and contains ``Protocol`` and ``2``.

.. warning::
    - It is mandatory to respect the spaces around the ``&&`` operator.
    - There's no particular order of evaluation between tests chained using the ``&&`` operator.

Examples of content checks:

- ``c:systemctl is-enabled cups -> r:^enabled`` checks that the output of the command contains a line starting with enabled.
- ``f:$sshd_file -> n:^\s*MaxAuthTries\s*\t*(\d+) compare <= 4`` checks that MaxAuthTries is less or equal to 4.
- ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa -> LimitBlankPasswordUse -> 1`` checks that the value of ``LimitBlankPasswordUse`` is 1.

Examples
'''''''''

The following sections cover each rule type, illustrating them with several examples. It is also recommended to check the actual policies and, for minimalistic although complete examples, the `SCA test suite policies
<https://github.com/wazuh/wazuh-qa/tree/master/tests/legacy/test_sca/test_basic_usage/data>`_.

.. rubric:: Rule syntax for files

- Check that a file exists: ``f:<PATH_TO_FILE>``
- Check that a file does not exist: ``not f:<PATH_TO_FILE>``
- Check a file for an exact line match: ``f:<PATH_TO_FILE> -> <CONTENT>``
- Check file contents against a regular expression: ``f:<PATH_TO_FILE> -> r:<REGEX>``
- Check whether a numeric value meets a specified condition: ``f:<PATH_TO_FILE> -> n:<REGEX> compare <OPERATOR> <NUMBER>``

.. rubric:: Rule syntax for directories

- Check if a directory exists: ``d:/<PATH_TO_DIRECTORY>``
- Check whether a directory contains a specified file: ``d:/<PATH_TO_DIRECTORY> -> <FILE>``
- Check whether a directory contains files matching a regular expression: ``d:/<PATH_TO_DIRECTORY> -> r:^files``
- Check the contents of a specified file within a directory: ``d:/<PATH_TO_DIRECTORY> -> <FILE_NAME> -> <CONTENT>``

.. rubric:: Rule syntax for processes

- Check if a process is running: ``p:<PROCESS_NAME>``
- Check if a process is **not** running: ``not p:<PROCESS_NAME>``

.. rubric:: Rule syntax for commands

- Check command output for an exact match: ``c:<COMMAND> -> <OUTPUT>``
- Check the output of a command using regex: ``c:<COMMAND> -> r:<REGEX>``
- Check whether a numeric value in command output meets a specified condition: ``c:<COMMAND> -> n:<REGEX_WITH_A_CAPTURE_GROUP> compare >= <NUMBER>``

.. rubric:: Rule syntax for Windows Registry

- Check if a registry key exists: ``r:<PATH_TO_REGISTRY> -> <KEY>``
- Check registry key contents: ``r:<PATH_TO_DIRECTORY> -> <KEY> -> <CONTENT>``

.. rubric:: Composite rules

- Check if there is a line that does not begin with ``#`` and contains ``Port 22``: ``f:/etc/ssh/sshd_config -> !r:^# && r:Port\.+22``
- Check if there is no line that does not begin with ``#`` and contains ``Port 22``: ``not f:/etc/ssh/sshd_config -> !r:^# && r:Port\.+22``

.. rubric:: Other examples

- Check for file contents, whole line match: ``f:/proc/sys/net/ipv4/ip_forward -> 1``
- Check if a file exists: ``f:/proc/sys/net/ipv4/ip_forward``
- Check if a process is running: ``p:avahi-daemon``
- Check value of registry: ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Netlogon\Parameters -> MaximumPasswordAge -> 0``
- Check if a directory contains files: ``d:/home -> ^.mysql_history$``
- Check if a directory exists: ``d:/etc/mysql``
- Check the running configuration of sshd for the maximum authentication tries allowed: ``c:sshd -T -> !r:^\s*maxauthtries\s+4\s*$``
- Check if root is the only account with UID 0: ``f:/etc/passwd -> !r:^# && !r:^root: && r:^\w+:\w+:0:``
