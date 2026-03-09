.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: You can use the Security configuration assessment module to create configuration policies on agents. Learn more about it in this section.
  
.. _configuration_assessment:

Configuration assessment
========================

The Security configuration assessment module determines the state of hardening and configuration policies on agents. SCA performs scans to discover exposures or misconfigurations in monitored endpoints. Those scans assess the hosts' configurations using policy files that contain rules to be tested against the hosts' actual configurations.

The SCA module helps to meet the following PCI DSS requirements:

-  **Requirement 2 - Apply Secure Configuration to All System Components**: This requirement ensures that default passwords are changed, unnecessary software, functions, and accounts are removed, and unnecessary services are disabled or removed, thereby reducing the potential attack surface.  
-  **Requirement 8 - Identify Users and Authentication Access to System Components**: This requirement ensures that the identification of an individual or process on a computer system is conducted by associating an identity with a person or process through an identifier, such as a user, system, or application ID. These IDs (also referred to as “accounts”) establish an individual’s or process’s identity by assigning a unique identifier to each, distinguishing one user or process from another. When each user or process can be uniquely identified, accountability for actions performed under that identity is ensured. When such accountability is in place, actions taken can be traced to known and authorized users and processes.

To achieve the above requirements, SCA runs assessment checks. These checks assess whether it is necessary to change password-related configuration to ensure strong passwords, remove unnecessary software, disable unnecessary services, or audit the TCP/IP stack configuration. Sources of system hardening standards accepted by the industry include, but are not limited to: the Center for Internet Security (CIS), the International Organization for Standardization (ISO), the SysAdmin, Audit, Network Security (SANS), and the National Institute of Standards and Technology (NIST).

Out-of-the-box, Wazuh includes CIS baselines for a wide range of operating systems and applications. This includes Debian, MacOS, Red Hat, and Windows operating systems. For more information, see a :doc:`list of the available SCA policies </user-manual/capabilities/sec-config-assessment/available-sca-policies>`. You can create other baselines for other systems or applications as well. Find more details on configuring SCA checks in the :doc:`SCA documentation section </user-manual/capabilities/sec-config-assessment/index>`.


Use cases
---------

Below are some PCI DSS requirement use cases that can be met with the SCA module.

-  PCI DSS 2.2.4 requires enabling only the necessary services, protocols, daemons, and functions, and removing or disabling all unnecessary functionality. Mounting /tmp as a separate partition is an example of a secure configuration that limits the attack surface. Without a dedicated /tmp partition, mount options such as noexec, nosuid, and nodev cannot be enforced, potentially allowing attackers to execute malicious code in ``/tmp``.

   To perform checks for this specific use case, the SCA module includes check 28500: **Ensure /tmp is a separate partition** on Ubuntu 22.04 LTS endpoints. When an SCA scan is run, you can determine whether this use case is satisfied.

   .. thumbnail:: /images/compliance/pci/ensure-ip-forwarding-is-disabled.png
      :title: Ensure /tmp is a separate partition
      :align: center
      :width: 80%
  
   Note that the SCA check IDs for the same requirement may vary depending on the endpoint on which the SCA scan is being run.

-  PCI DSS 8.3.7 states that individuals are not allowed to submit a new password/passphrase that matches any of the last four passwords/passphrases used. Enforcing password history prevents users from recycling recent credentials, making it harder for attackers to regain access using previously compromised passwords.
  
   We have the SCA check 28733: **Ensure password history remember is configured** for Ubuntu 22.04 LTS endpoints. It checks that the ``pam_pwhistory`` module is configured with a remember value of at least 24 in ``/etc/pam.d/common-password``, ensuring users cannot recycle recent passwords and helping meet requirement 8.3.7. So, when an SCA scan runs, you can detect if the password history policy meets the requirement.
   
   .. thumbnail:: /images/compliance/pci/ensure-password-reuse-is-limited.png
      :title: Ensure password history remember is configured
      :align: center
      :width: 80%



