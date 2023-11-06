.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh offers a Security Configuration Assessment module that assists security teams to scan and detect misconfigurations within their environment.

Configuration assessment
========================

Configuration assessment is a process that verifies whether endpoints adhere to a set of predefined rules regarding configuration settings and approved application usage. It involves comparing the current configuration against established industry standards and organizational policies to identify vulnerabilities and misconfigurations.

Regular configuration assessments are essential in maintaining a secure and compliant environment, as they help organizations proactively identify and patch vulnerabilities. This practice strengthens security controls and minimizes the risk of security incidents.

Wazuh SCA module
----------------

Wazuh offers a :doc:`Security Configuration Assessment (SCA) </user-manual/capabilities/sec-config-assessment/index>` module that assists security teams to scan and detect misconfigurations within their environment. The Wazuh agent uses policy files to scan endpoints that it monitors. These files contain predefined checks to be carried out on each monitored endpoint. 

Wazuh includes :doc:`SCA policies </user-manual/capabilities/sec-config-assessment/available-sca-policies>` out-of-the-box based on the Center for Internet Security (CIS) security benchmarks. These benchmarks serve as essential guidelines on best practices for protecting IT systems and data from cyberattacks. They provide clear instructions for establishing a secure baseline configuration and offer guidance to ensure that users implement effective measures to safeguard their critical assets and mitigate potential vulnerabilities. By adhering to these standards, you can enhance your overall security posture and mitigate the risk of cyber threats against your business. 

Some other benefits of the Wazuh Security Configuration Assessment (SCA) module include:

-  **Security posture management**: Wazuh SCA helps organizations ensure that their endpoints are configured securely. This minimizes vulnerabilities resulting from misconfigurations and reduces the risk of security breaches.
-  **Compliance monitoring**: It allows organizations to assess and implement compliance with regulatory standards, best practices, and internal security policies.
-  **Continuous monitoring**: Wazuh SCA continuously monitors the configuration of the endpoints and alerts when it discovers misconfigurations. 

Overview of Wazuh SCA policies
------------------------------

The Wazuh SCA module uses policies written in YAML format. Each policy consists of :ref:`checks <sca_check_overview>`, and each check comprises one or more rules. These rules can examine various aspects of an endpoint, such as the presence of files, directories, Windows registry keys, running processes, and more.

By default, the Wazuh agent runs scans for every policy (``.yaml`` or ``.yml`` files) present in the ruleset directory. This directory can be found in the following locations on every operating system that runs the Wazuh agent:

-  Linux and Unix-based agents: ``/var/ossec/ruleset/sca``.
-  Windows agents: ``C:\Program Files (x86)\ossec-agent\ruleset\sca``.
-  macOS agents: ``/Library/Ossec/ruleset/sca``.

Wazuh also allows you to :doc:`create custom policies </user-manual/capabilities/sec-config-assessment/creating-custom-policies>` that can be used to scan endpoints and verify if they conform to your organization’s policies.

See a snippet of a CIS policy file ``/var/ossec/ruleset/sca/cis_ubuntu22-04.yml`` which is included out-of-the-box on Ubuntu 22.04 endpoints. The SCA policy which is based on the CIS benchmarks, runs checks on the endpoint to determine if it conforms to the best practices for system hardening. The SCA policy with ID ``28500`` checks if the ``/tmp`` directory is on a separate partition.

.. code-block:: yaml
   :emphasize-lines: 2

   - id: 28500
     title: "Ensure /tmp is a separate partition."
     description: "The /tmp directory is a world-writable directory used for temporary storage by all users and some applications."
     rationale: "Making /tmp its own file system allows an administrator to set additional mount options such as the noexec option on the mount, making /tmp useless for an attacker to install executable code. It would also prevent an attacker from establishing a hard link to a system setuid program and wait for it to be updated. Once the program was updated, the hard link would be broken and the attacker would have his own copy of the program. If the program happened to have a security vulnerability, the attacker could continue to exploit the known flaw. This can be accomplished by either mounting tmpfs to /tmp, or creating a separate partition for /tmp."
     impact: "Since the /tmp directory is intended to be world-writable, there is a risk of resource exhaustion if it is not bound to a separate partition. Running out of /tmp space is a problem regardless of what kind of filesystem lies under it, but in a configuration where /tmp is not a separate file system it will essentially have the whole disk available, as the default installation only creates a single / partition. On the other hand, a RAM-based /tmp (as with tmpfs) will almost certainly be much smaller, which can lead to applications filling up the filesystem much more easily. Another alternative is to create a dedicated partition for /tmp from a separate volume or disk. One of the downsides of a disk-based dedicated partition is that it will be slower than tmpfs which is RAM-based. /tmp utilizing tmpfs can be resized using the size={size} parameter in the relevant entry in /etc/fstab."
     remediation: "First ensure that systemd is correctly configured to ensure that /tmp will be mounted at boot time. # systemctl unmask tmp.mount For specific configuration requirements of the /tmp mount for your environment, modify /etc/fstab or tmp.mount. Example of /etc/fstab configured tmpfs file system with specific mount options: tmpfs 0 /tmp tmpfs defaults,rw,nosuid,nodev,noexec,relatime,size=2G 0 Example of tmp.mount configured tmpfs file system with specific mount options: [Unit] Description=Temporary Directory /tmp ConditionPathIsSymbolicLink=!/tmp DefaultDependencies=no Conflicts=umount.target Before=local-fs.target umount.target After=swap.target [Mount] What=tmpfs Where=/tmp Type=tmpfs."
     references:
       - https://www.freedesktop.org/wiki/Software/systemd/APIFileSystems/
       - https://www.freedesktop.org/software/systemd/man/systemd-fstab-generator.html
     compliance:
       - cis: ["1.1.2.1"]
       - cis_csc_v7: ["14.6"]
       - cis_csc_v8: ["3.3"]
       - mitre_techniques: ["T1499", "T1499.001"]
       - mitre_tactics: ["TA0005"]
       - mitre_mitigations: ["M1022"]
       - cmmc_v2.0: ["AC.L1-3.1.1", "AC.L1-3.1.2", "AC.L2-3.1.5", "AC.L2-3.1.3", "MP.L2-3.8.2"]
       - hipaa: ["164.308(a)(3)(i)", "164.308(a)(3)(ii)(A)", "164.312(a)(1)"]
       - pci_dss_v3.2.1: ["7.1", "7.1.1", "7.1.2", "7.1.3"]
       - pci_dss_v4.0: ["1.3.1", "7.1"]
       - nist_sp_800-53: ["AC-5", "AC-6"]
       - soc_2: ["CC5.2", "CC6.1"]
     condition: all
     rules:
       - 'c:findmnt --kernel /tmp -> r:\s*/tmp\s'
       - "c:systemctl is-enabled tmp.mount -> r:generated|enabled"

The ``/tmp`` directory is used to store data that is needed for a short time by system and user applications. Mounting ``/tmp`` on a separate partition allows an administrator to set additional mount options such as the ``noexec``, ``nodev``, and ``nosuid``. Therefore making the directory useless for an attacker to install executable code. The SCA policy file also gives recommendations on how to remediate this issue.

Viewing SCA results
-------------------

The Wazuh dashboard has a **Configuration assessment** module that allows you to view SCA scan results for each agent.

.. thumbnail:: /images/getting-started/use-cases/sca/sca-module.png
   :title: Configuration assessment module
   :alt: Configuration assessment module
   :align: center
   :width: 80%
    
In the image below, you see the policy based on the CIS benchmark for Ubuntu Linux 22.04.

.. thumbnail:: /images/getting-started/use-cases/sca/cis-benchmark-ubuntu22-policy.png
   :title: Policy for CIS benchmark for Ubuntu 22.04
   :alt: Policy for CIS benchmark for Ubuntu 22.04
   :align: center
   :width: 80%

Interpreting SCA results
------------------------

On the Wazuh dashboard, we select a policy to see the checks that we run on the endpoint. In the image below, you can see 182 checks were run against the Ubuntu 22.04 endpoint. Out of these, 63 passed, 98 failed, and 21 are not applicable to the endpoint. It also shows a score of 39% which is calculated based on the number of tests passed.  

.. thumbnail:: /images/getting-started/use-cases/sca/cis-benchmark-ubuntu22-results.png
   :title: Results for CIS benchmark for Ubuntu 22.04 checks
   :alt: Policy for CIS benchmark for Ubuntu 22.04 checks
   :align: center
   :width: 80%

You can click on the checks to get more information. In the image below, you can see information such as rationale, remediation, and a description of the check with ID ``28500``.

.. thumbnail:: /images/getting-started/use-cases/sca/check-28500-results.png
   :title: Results for CIS benchmark for Ubuntu 22.04 check ID 28500
   :alt: Results for CIS benchmark for Ubuntu 22.04 check ID 28500
   :align: center
   :width: 80%

The above SCA scan result shows ``failed`` because the ``/tmp`` directory is not on a separate partition and the directory is not mounted at boot time. If the remediation is implemented, the result will change to ``passed`` thereby improving the security of the endpoint.

Implementing SCA remediation steps
----------------------------------

In the example in the previous section, implementing the remediation provided by the Wazuh SCA improves the security of the endpoint. This involves mounting the ``/tmp`` directory to a separate partition and adding some options such as ``nodev``, ``noexec``, and ``nosuid`` to the mount point. In the image below, you can see the status of the checks ``28500``–``28503`` have changed to ``passed``.

.. thumbnail:: /images/getting-started/use-cases/sca/sca-checks-status-changed.png
   :title: Status passed for the checks 28500–28503
   :alt: Status passed for the checks 28500–28503
   :align: center
   :width: 80%

By utilizing the Wazuh SCA module, you can detect misconfigurations, remediate them, and verify that your endpoints adhere to industry best practices. This proactive approach significantly reduces the likelihood of security breaches within your environment.