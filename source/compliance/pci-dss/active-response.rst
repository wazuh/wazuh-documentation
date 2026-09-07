.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how the Wazuh Active Response module helps meet PCI DSS requirements for regularly testing the security of systems and networks.

Active response
================

The Wazuh Active Response module automates incident response by executing predefined actions when events match specified rules in the Wazuh ruleset. These actions can block or drop network traffic, throttle connections, lock user accounts, or perform other user-defined response actions.

The Wazuh Active Response module helps to meet the following PCI DSS requirement:

-  **Requirement 11 - Test Security of Systems and Networks Regularly**: Vulnerabilities are being discovered continually by malicious individuals and researchers, and being introduced by new software. System components, processes, and bespoke and custom software must be tested frequently to verify security controls continue to reflect a changing environment.

This requirement mandates regular testing of systems and networks to detect and respond to security issues and potential intrusions. With the Wazuh Active Response module, you can respond to intrusions and unauthorized file changes. More details on configuring the Wazuh Active Response module are available in the :doc:`active response </user-manual/capabilities/active-response/index>` documentation section.

Use case
--------

Below is a PCI DSS requirement that the Wazuh Active Response module can meet.

PCI DSS requirement 11.5
^^^^^^^^^^^^^^^^^^^^^^^^^

PCI DSS requirement 11.5 mandates that you detect and respond to network intrusions and unexpected file changes. You can configure scripts to run when specific actions occur, enabling a response to these intrusions. Wazuh comes with preconfigured active response scripts. Refer to the :doc:`default active response scripts </user-manual/capabilities/active-response/default-active-response-scripts>` section to access these scripts.

In the example below, the Wazuh Active Response module automatically blocks a malicious IP address when it matches one in the reputation database. A blocked IP address prevents the attacker from accessing web resources on the monitored Apache web server. See :doc:`Blocking a known malicious actor </proof-of-concept-guide/block-malicious-actor-ip-reputation>` for more information.

.. thumbnail:: /images/compliance/pci/active-response-blocked-ip-finding.png
   :title: Active response blocked IP finding
   :align: center
   :width: 80%
