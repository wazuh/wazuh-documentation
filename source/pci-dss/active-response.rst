.. _pci_dss_active_response:

Active response
===============

Although `active response <http://ossec-docs.readthedocs.org/en/latest/manual/ar/index.html>`_ is not explicitly discussed in PCI DSS, it is important to mention that an automated remediation to security violations and threats is a powerful tool that reduces the risk.

Active response allows a scripted action to be performed whenever a rule matchs in your Wazuh ruleset. Remedial action could be firewall block/drop, traffic shaping or throttling, account lockout, etc.
