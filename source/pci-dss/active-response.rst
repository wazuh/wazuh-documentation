.. Copyright (C) 2019 Wazuh, Inc.

.. _pci_dss_active_response:

Active response
===============

Although :ref:`active response <automatic_remediation>` is not explicitly discussed in PCI DSS, it is important to mention that an automated remediation to security violations and threats is a powerful tool that reduces your risk.

Active response allows a scripted action to be performed whenever an event matches certain rules in your Wazuh ruleset. Remedial action could be a firewall block or drop, traffic shaping or throttling, account lockout, etc...
