.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh analysis engine analyzes the log data received from agents. Learn more about it in this section.
  
.. _configuration_assessment:

Configuration assessment
========================

The Security configuration assessment module can be used to create and determine the state of hardening and configuration policies on agents. SCA performs scans to discover exposures or misconfigurations in monitored endpoints. Those scans assess the configuration of the hosts using policy files that contain rules to be tested against the actual configuration of the host.

The SCA module can help meet the following PCI DSS requirements:

- **Requirement 2 - Apply Secure Configuration to All System Components**: This requirement ensures the changing default passwords, removing unnecessary software, functions, and accounts, and disabling or removing unnecessary services all in order to reduce the potential attack surface.  
- **Requirement 8 - Identify Users and Authentication Access to System Components**: This requirement ensures that the identification of an individual or process on a computer system is conducted by associating an identity with a person or process through an identifier, such as a user, system, or application ID. These IDs (also referred to as “accounts”) fundamentally establish the identity of an individual or process by assigning unique identification to each person or process to distinguish one user or process from another. When each user or process can be uniquely identified, it ensures there is accountability for actions performed by that identity. When such accountability is in place, actions taken can be traced to known and authorized users and processes.

To achieve the above requirements, SCA can run checks to assess whether it is necessary to change password related configuration to ensure strong passwords, remove unnecessary software, disable unnecessary services, or audit the TCP/IP stack configuration. Sources of industry-accepted system hardening standards may include, but are not limited to: Center for Internet Security (CIS), International Organization for Standardization (ISO), SysAdmin Audit Network Security (SANS), National Institute of Standards Technology (NIST).

Out-of-the-box, Wazuh includes CIS baselines for Debian and Red Hat. Other baselines can be created for other systems or applications as well. More details on configuring SCA checks can be found in the :doc:`SCA documentation section </user-manual/capabilities/sec-config-assessment/index>`.


Use cases
---------

Below are some PCI DSS requirement use cases that can be met with the SCA module.

- PCI DSS 2.2.6 requires that system security parameters are configured to prevent misuse. An example of a system security parameter that may be abused if it is misconfigured is IP forwarding. When IP forwarding is configured on a device, it may serve as a router and can be abused.

In order to perform checks for this specific use case, the SCA module has check 18081 ``Ensure IP forwarding is disabled``. When an SCA scan is run, we are able to detect if this use case is satisfied.

.. thumbnail:: ../images/pci/ensure-ip-forwarding-is-disabled.png
    :title: Ensure IP forwarding is disabled
    :align: center
    :width: 100%

- PCI DSS 8.3.7 states that individuals are not allowed to submit a new password/passphrase that is the same as any of the last four passwords/passphrases used.

In order to check the password reuse policy and help meet requirement 8.3.7, we have the SCA check 18157 - ``Ensure password reuse is limited``. As such, when an SCA scan is run we are able to detect if the password history policy meets the requirement.

.. thumbnail:: ../images/pci/ensure-password-reuse-is-limited.png
    :title: Ensure password reuse is limited
    :align: center
    :width: 100%



