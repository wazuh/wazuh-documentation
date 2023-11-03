.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: You can use the Configuration assessment application to create configuration policies on agents. Learn more about it in this section.
  
.. _configuration_assessment:

Configuration assessment
========================

The Configuration assessment application determines the state of hardening and configuration policies on agents. SCA performs scans to discover exposures or misconfigurations in monitored endpoints. Those scans assess the configuration of the hosts using policy files that contain rules to be tested against the actual configuration of the host.

The SCA module helps to meet the following PCI DSS requirements:

-  **Requirement 2 - Apply Secure Configuration to All System Components**: This requirement ensures the changing of default passwords, removing unnecessary software, functions, and accounts, and disabling or removing unnecessary services all in order to reduce the potential attack surface.  
-  **Requirement 8 - Identify Users and Authentication Access to System Components**: This requirement ensures that the identification of an individual or process on a computer system is conducted by associating an identity with a person or process through an identifier, such as a user, system, or application ID. These IDs (also referred to as “accounts”) fundamentally establish the identity of an individual or process by assigning unique identification to each person or process to distinguish one user or process from another. When each user or process is uniquely identified, it ensures there is accountability for actions performed by that identity. When such accountability is in place, actions taken are traced to known and authorized users and processes.

To achieve the above requirements, SCA runs assessment checks. These checks assess whether it is necessary to change password related configuration to ensure strong passwords, remove unnecessary software, disable unnecessary services, or audit the TCP/IP stack configuration. Sources of system hardening standards accepted by the industry include, but are not limited to: the Center for Internet Security (CIS), the International Organization for Standardization (ISO), SysAdmin Audit Network Security (SANS), National Institute of Standards Technology (NIST).

Out-of-the-box, Wazuh includes CIS baselines for a wide range of operating systems and applications. This includes Debian, macOS, Red hat, and Windows operating systems. For more information, see a :ref:`list of the available SCA policies <share_policy_files_and_configuration_with_the_Wazuh_agents>`. You can create other baselines for other systems or applications as well. Find more details on configuring SCA checks in the :doc:`SCA documentation section </user-manual/capabilities/sec-config-assessment/index>`.


Use cases
---------

Below are some PCI DSS requirement use cases that can be met with the SCA module.

-  PCI DSS 2.2.4 requires enabling only necessary services, protocols, daemons, and functions to remove or disable all unnecessary functionality. IP forwarding is an example of a system service that may be abused if misconfigured. When IP forwarding is configured on a device, it may serve as a router to be abused.

   In order to perform checks for this specific use case, the SCA module has check 18081 **Ensure IP forwarding is disabled** for Ubuntu 14.04 endpoints. When an SCA scan runs, you can detect if this use case is satisfied.

   .. thumbnail:: /images/compliance/pci/ensure-ip-forwarding-is-disabled.png
      :title: Ensure IP forwarding is disabled
      :align: center
      :width: 80%
  
   Note that the SCA check IDs for the same requirement may vary depending on the endpoint the SCA scan is being run on.

-  PCI DSS 8.3.7 states that individuals are not allowed to submit a new password/passphrase that is the same as any of the last four passwords/passphrases used.
  
   We have the SCA check 18157 **Ensure password reuse is limited** for Ubuntu 14.04 endpoints. It checks the password reuse policy and helps meet requirement 8.3.7. So, when an SCA scan runs, you can detect if the password history policy meets the requirement.
   
   .. thumbnail:: /images/compliance/pci/ensure-password-reuse-is-limited.png
      :title: Ensure password reuse is limited
      :align: center
      :width: 80%



