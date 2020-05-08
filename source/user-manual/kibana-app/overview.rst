.. Copyright (C) 2019 Wazuh, Inc.

.. _kibana_overview:

Overview
^^^^^^^^

This section provides access to the Wazuh environment security events monitoring. Each subsection presents the triggered Wazuh alerts grouped by a security events type and organized in dashboards containing easy to analyze charts and tables.

By default, Wazuh Kiba plugin offers the following subections:

Security information management
-------------------------------

This subsection contains ``Security events`` and :ref:`Integrity monitoring <manual_file_integrity>` dashboards. The first allows browsing through the Wazuh security alerts, identifying issues and threats in the monitored by Wazuh environment.
The second presents the Wazuh alerts related to the file changes, including permissions, content, ownership, and attributes:

.. thumbnail:: ../../images/kibana-app/sections/overview/wazuh-kibana-security-events.png
  :align: center
  :width: 100%

Threat detection and response
-----------------------------

This section presents :ref:`Vulnerabilities <vulnerability-detection>` dashboard, which helps to discover which applications in the monitored environment are affected by well-knows vulnerabilities.

Auditing and Policy monitoring
------------------------------

This subsection contains :ref:`Policy monitoring <manual_policy_monitoring>` and :ref:`System auditing <auditing-whodata>` dashboards. The first helps to verify that the scanned systems are configured according to the user's security policies baseline.
The second provides the information from an audit of users' behavior, monitoring commands execution, and alerting on access to critical files.

.. thumbnail:: ../../images/kibana-app/sections/overview/wazuh-kibana-policy-monitoring.png
  :align: center
  :width: 100%

Regulatory compliance
---------------------

This subsection presents dashboards containing information about the following compliances:

- :ref:`PCI DSS <pci_dss>`: global security stanard for entities that process, store or transmit payment cardholder data:

.. thumbnail:: ../../images/kibana-app/sections/overview/wazuh-kibana-pci-dss.png
  :align: center
  :width: 100%

- :ref:`GDPR <gdpr>`: General Data Protection Regulation sets guidelines for processing of personal data:

.. thumbnail:: ../../images/kibana-app/sections/overview/wazuh-kibana-gdpr.png
  :align: center
  :width: 100%

- ``HIPAA``: Health Insurance Portability and Accountability Act of 1996 provides data privacy and security provisions for safeguarding medical information:

.. thumbnail:: ../../images/kibana-app/sections/overview/wazuh-kibana-hipaa.png
  :align: center
  :width: 100%

- ``NIST 800-53``: National Institute of Standards and Technology Special Publication 800-53 sets guidelines for federal information systems:

.. thumbnail:: ../../images/kibana-app/sections/overview/wazuh-kibana-nist.png
  :align: center
  :width: 100%


Discover
--------

Each dashboard in the Overview section has the *Discover* button, which gives access to the section allowing interactively explore the Wazuh alerts from the currently selected index pattern. It is possible to submit search queries, filter the search results, view alerts data, and also, by clicking on the fields on the left side of the window, add columns for a quick value comparison between alerts.
The user can see the number of alerts that match the search query and get field value statistics:

.. thumbnail:: ../../images/kibana-app/sections/overview/wazuh-kibana-discover.png
  :align: center
  :width: 100%
