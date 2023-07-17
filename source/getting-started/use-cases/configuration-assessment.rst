.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Automated Security Configuration Assessment is an essential capability to improve the enterprise security posture and to reduce its attack surface. 

Configuration assessment
========================

Automated Security Configuration Assessment (SCA) is an essential capability to improve the enterprise security posture and reduce its attack surface. The Wazuh SCA module helps maintain a standard configuration through the monitored endpoints. This is done via predefined checks based on the Center of Internet Security (CIS) hardening guides.

When the SCA module is enabled, the :doc:`Wazuh agent <../components/wazuh-agent>` performs scans periodically, reporting misconfigurations in the monitored system. Those scans assess the configuration of the system through policy files containing a set of checks to be run. For example, an SCA check can inspect the filesystem configuration, look for the presence of a software update or security patch, see that the local firewall is enabled, identify unnecessary running services, or verify the users’ password policy.

Policies for the SCA scans are written in YAML format, allowing users to understand them quickly. Using SCA syntax, users can extend the existing policies to fit their needs or write new ones. Each policy contains a set of checks, and each check has one or more rules. For example, a rule can be used to look for the existence of a file, a directory, a Windows registry key, or a running process, among others. It is also possible to execute a command and check its output against a regular expression.

Linux SCA rule example:

.. code-block:: yaml
   :emphasize-lines: 2

   - id: 5546
     title: "Ensure IP address forwarding is disabled"
     description: "The net.ipv4.ip_forward flag is used to tell the system whether it can forward packets or not."
     rationale: "Setting the flag to 0 ensures that a system with multiple interfaces (for example, a hard proxy), will never be able to forward packets, and therefore, never serve as a router."
     remediation: "Set the following parameter in /etc/sysctl.conf or a /etc/sysctl.d/* file: net.ipv4.ip_forward = 0 and set the active kernel parameters."
     compliance:
       - cis: ["3.1.1"]
       - cis_csc: ["3", "11"]
       - pci_dss: ["2.2.4"]
       - nist_800_53: ["CM.1"]
     condition: all
     rules:
       - 'c:sysctl net.ipv4.ip_forward -> r:^net.ipv4.ip_forward\s*=\s*0$'
       - 'c:grep -Rh net\.ipv4\.ip_forward /etc/sysctl.conf /etc/sysctl.d -> r:^net.ipv4.ip_forward\s*=\s*0$'

Windows SCA rule example:

.. code-block:: yaml
   :emphasize-lines: 2

   - id: 14038
     title: "Ensure Microsoft Firewall is enabled"
     compliance:
       - pci_dss: ["10.6.1", "1.4"]
       - hipaa: ["164.312.b", "164.312.a.1"]
       - nist_800_53: ["AU.6", "SC.7"]
       - tsc: ["CC6.1", "CC6.8", "CC7.2", "CC7.3", "CC6.7"]
     condition: all
     rules:
       - 'r:HKEY_LOCAL_MACHINE\software\policies\microsoft\windowsfirewall\domainprofile -> enablefirewall -> 1'

macOS SCA rule example:

.. code-block:: yaml
  :emphasize-lines: 2

  - id: 8522
    title: "Ensure nfs server is not running"
    description: "macOS can act as an NFS fileserver. NFS sharing could be enabled to allow someone on another computer to mount shares and gain access to information from the user's computer. File sharing from a user endpoint has long been considered questionable and Apple has removed that capability from the GUI. NFSD is still part of the Operating System and can be easily turned on to export shares and provide remote connectivity to an end user computer."
    rationale: "File serving should not be done from a user desktop, dedicated servers should be used.  Open ports make it easier to exploit the computer."
    remediation: "Ensure that the NFS Server is not running and is not set to start at boot Stop the NFS Server: sudo nfsd disable    Remove the exported Directory listing: rm /etc/export"
    compliance:
      - cis: ["4.5"]
    condition: none
    rules:
      - 'p:nfsd'
      - 'p:/sbin/nfsd'
      - 'f:/etc/exports'

Below is an example of the results of a configuration assessment evaluation. These can be obtained through the web user interface or directly through the Wazuh RESTful API.

.. thumbnail:: /images/getting-started/use-cases/sca-evaluation.png
   :title: SCA evaluation example
   :alt: SCA evaluation example
   :align: center
   :width: 80%

.. thumbnail:: /images/getting-started/use-cases/sca-inventory-tab.png
   :title: SCA inventory tab
   :alt: SCA inventory tab
   :align: center
   :width: 80%

.. thumbnail:: /images/getting-started/use-cases/sca-events-tab.png
   :title: SCA events tab
   :alt: SCA events tab
   :align: center
   :width: 80%
          
You can find more information about security configuration assessment in the :doc:`user manual </user-manual/capabilities/sec-config-assessment/index>`.
