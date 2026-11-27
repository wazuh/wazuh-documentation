.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how the Wazuh Security Configuration Assessment capability works, including SCA scan results, integrity mechanisms, and remediation.

How it works
============

The Wazuh agent runs SCA scans using policy files. Each policy file defines the checks to run on the endpoint. During a scan, the Wazuh agent evaluates the endpoint settings against the rules in each policy.

By default, the Wazuh agent scans every policy file (``.yaml`` or ``.yml``) in its ruleset directory. It installs only the policy for its operating system. For the ruleset directory on each operating system, see :ref:`Enabling and disabling policies <sca_enabling_and_disabling_policies>`.

After each scan, the following happens:

#. The Wazuh agent synchronizes the SCA results with the Wazuh manager.
#. The Wazuh manager processes the scan results and sends the SCA state data to the ``wazuh-states-sca`` index in the Wazuh indexer.
#. The Wazuh dashboard shows the SCA results and findings from this index.

The following diagram shows the integrity and findings flow.

.. thumbnail:: /images/sca/sca-sequence-diagram.png
   :title: SCA module integrity and findings flow
   :alt: SCA module integrity and findings flow
   :align: center
   :width: 80%

Understanding SCA scan results
-------------------------------

Wazuh generates a finding when the result of a check changes between scans. The exception is a policy update, described in :ref:`Integrity mechanisms <sca_integrity_mechanisms>`.

Each check has one of three results:

- Passed: The endpoint configuration satisfies the conditions defined in the check.
- Failed: The endpoint configuration doesn't satisfy the conditions defined in the check.
- Not applicable: The check can't be evaluated, for example, because a required file, command output, or registry value is unavailable.

The set of rules and the :ref:`check's <sca_policy_file_checks_section>` condition field (``all``, ``any``, or ``none``) determine this result.

The Wazuh dashboard shows the **Overall score** of each SCA policy. The score is the percentage of applicable checks that passed. Checks with the Not applicable result don't count toward the score. For example, 119 passed checks and 118 failed checks give a score of 50.211%.

On the Wazuh dashboard, navigate to **Endpoint security** > **Configuration Assessment** to view the scan summaries for the Wazuh agents.

.. thumbnail:: /images/sca/configuration-assessment-dashboard.png
   :title: Configuration Assessment scan summary
   :alt: Configuration Assessment scan summary
   :align: center
   :width: 80%

The **Inventory** tab lists the SCA policies evaluated on each endpoint, their checks, and the result of each check.

.. thumbnail:: /images/sca/sca-inventory.png
   :title: SCA inventory
   :alt: SCA inventory
   :align: center
   :width: 80%

The **Findings** tab shows the findings generated when a check result changes between scans.

.. thumbnail:: /images/sca/sca-findings.png
   :title: SCA findings
   :alt: SCA findings
   :align: center
   :width: 80%

Example: Firewall check on an Ubuntu 24.04 endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

On the Wazuh dashboard, navigate to **Endpoint security** > **Configuration Assessment** > **Inventory** and select the Ubuntu 24.04 endpoint to view its SCA results. The policy file is ``/var/ossec/ruleset/sca/cis_ubuntu24-04.yml``. The highlighted result shows check ``35622``, which verifies that the ufw service is enabled and active.

.. thumbnail:: /images/sca/sca-scans-ubuntu-endpoint.png
   :title: SCA scans for an Ubuntu 24.04 endpoint
   :alt: SCA scans for an Ubuntu 24.04 endpoint
   :align: center
   :width: 80%

Click **Inspect details** to see more information on the scan result.

.. thumbnail:: /images/sca/configuration-assessment-additional-information.png
   :title: Expanded SCA check result
   :alt: Expanded SCA check result
   :align: center
   :width: 80%

The following excerpt from the ``cis_ubuntu24-04.yml`` policy file shows the condition and rules of check ``35622``:

.. code-block:: yaml

   - id: 35622
     name: "Ensure ufw service is enabled."
     description: "UncomplicatedFirewall (ufw) is a frontend for iptables. ufw provides a framework for managing netfilter, as well as a command-line and available graphical user interface for manipulating the firewall. Note: - When running ufw enable or starting ufw via its initscript, ufw will flush its chains. This is required so ufw can maintain a consistent state, but it may drop existing connections (eg ssh). ufw does support adding rules before enabling the firewall. - Run the following command before running ufw enable. # ufw allow proto tcp from any to any port 22 - The rules will still be flushed, but the ssh port will be open after enabling the firewall. Please note that once ufw is 'enabled', ufw will not flush the chains when adding or removing rules (but will when modifying a rule or changing the default policy) - By default, ufw will prompt when enabling the firewall while running under ssh. This can be disabled by using ufw --force enable."
     rationale: "The ufw service must be enabled and running in order for ufw to protect the system."
     impact: "Changing firewall settings while connected over network can result in being locked out of the system."
     remediation: |
       Run the following command to unmask the `ufw` daemon:

       ```
       # systemctl unmask ufw.service
       ```

       Run the following command to enable and start the `ufw` daemon:

       ```
       # systemctl --now enable ufw.service active
       ```

       Run the following command to enable ufw:

       ```
       # ufw enable.
       ```
     references:
       - 'http://manpages.ubuntu.com/manpages/precise/en/man8/ufw.8.html'
     compliance:
       cmmc: ["AC.L2-3.1.20", "CM.L2-3.4.7", "SC.L2-3.13.1", "SC.L2-3.13.6"]
       fedramp: ["SC-7"]
       gdpr: ["IV_32.1.a", "IV_32.1.b", "IV_32.1.c", "IV_32.1.d", "IV_32.2", "IV_32.3", "IV_32.4"]
       hipaa: ["164.312.e.1", "164.312.b", "164.308.a.8"]
       iso_27001: ["A.8.20", "A.8.21", "A.8.15"]
       nis2: ["21.2.e", "21.2.i", "21.2.a"]
       nist_800_171: ["3.1.20", "3.4.7", "3.13.1", "3.13.6"]
       nist_800_53: ["SC-7"]
       pci_dss: ["1.2.1", "1.4.1"]
       tsc: ["CC6.6", "CC6.1", "CC6.2", "CC6.3", "CC6.4", "CC6.5", "CC6.7", "CC6.8", "CC7.1", "CC7.2", "CC7.3", "CC7.4", "CC7.5", "CC4.1", "CC4.2"]
     mitre:
       tactic:
         id:
           - "TA0001"
           - "TA0003"
           - "TA0007"
           - "TA0011"
         name:
           - "Initial Access"
           - "Persistence"
           - "Discovery"
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
         name:
           - "Internal Proxy"
           - "External Proxy"
     condition: all
     rules:
       - "c:systemctl is-enabled ufw.service -> r:^enabled"
       - "c:systemctl is-active ufw -> r:^active"
       - 'c:ufw status -> r:Status:\s+active'

Remediation
~~~~~~~~~~~

Check ``35622`` fails because ufw is inactive (``ufw status`` returns ``Status: inactive``). Some commands in the remediation of the scan result, such as ``systemctl --now enable ufw.service active`` and ``ufw enable``, aren't valid as written. Use the following steps instead, which keep the endpoint connected to the Wazuh manager:

#. Run the following commands on the monitored endpoint. They allow SSH, DNS, and the Wazuh agent connections to the Wazuh manager, then set the default deny policy and turn on ``ufw``. Replace ``<WAZUH_MANAGER_IP>`` with the IP address of your Wazuh manager, and add an allow rule for any other connection the endpoint needs:

   .. code-block:: console

      # ufw allow in 22/tcp
      # ufw allow out 53
      # ufw allow out to <WAZUH_MANAGER_IP>
      # ufw default deny incoming
      # ufw default deny outgoing
      # ufw default deny routed
      # ufw --force enable

#. Restart the Wazuh agent to trigger a new SCA scan:

   .. code-block:: console

      # systemctl restart wazuh-agent

The scan result for check ``35622`` changes to **Passed** at the next SCA synchronization, usually 5 to 15 minutes after the restart:

.. thumbnail:: /images/sca/configuration-assessment-scan-result.png
   :title: Check 35622 passed after remediation
   :alt: Check 35622 passed after remediation
   :align: center
   :width: 80%

.. _sca_integrity_mechanisms:

Integrity mechanisms
---------------------

Wazuh keeps the SCA results on the Wazuh agent and in the Wazuh indexer in sync. The Wazuh agent stores the results in a local database and sends the changes to the Wazuh manager after each scan. When a policy file changes, Wazuh discards the stored results for that policy and scans it again. You then get a finding for every check in the policy. Every 24 hours by default, set by ``integrity_interval``, the Wazuh agent sends a checksum of its results. The Wazuh manager compares it with the results in the Wazuh indexer. If they differ, for example after a network issue, the Wazuh agent sends all its results again.
