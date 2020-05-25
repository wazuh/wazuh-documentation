.. Copyright (C) 2019 Wazuh, Inc.

.. _kibana_overview:

Overview
^^^^^^^^

This section provides access to the Wazuh environment security events monitoring.
Each subsection shows generated Wazuh alerts grouped by a security events type and organized in dashboards containing easy to analyze charts and tables.
The Wazuh alerts can be interactively explored on their corresponding :ref:`Discover <kibana_overview_discover>` pages and presented in PDF format :ref:`reports <kibana_overview_discover>`.

By default, the *Overview* section presents the subsections organized in the following groups:

#. `Security information management`_
#. `Threat detection and response`_
#. `Auditing and Policy monitoring`_
#. `Regulatory compliance`_

.. thumbnail:: ../../images/kibana-app/sections/overview/wazuh-kibana-overview.png
  :align: center
  :width: 100%

The *Overview* page can be customized by adding or removing the extensions. It can be done by clicking on the eye icon located in the right top corner of each group, and then enabling or disabling
available extensions:

.. thumbnail:: ../../images/kibana-app/sections/overview/wazuh-kibana-extensions.png
  :align: center
  :width: 100%

Security information management
-------------------------------

This group contains the following subsections:

- ``Security events`` dashboard allows browsing through the Wazuh security alerts, identifying issues and threats in the monitored by Wazuh environment.

- :ref:`Integrity monitoring <manual_file_integrity>` dashboard presents the Wazuh alerts related to the file changes, including permissions, content, ownership, and attributes.

- :ref:`Amazon AWS <amazon_services>` dashboard shows security events related to the Amazon AWS services, collected directly via AWS API. By default, this dashbord is disabled.

.. thumbnail:: ../../images/kibana-app/sections/overview/wazuh-kibana-security-events.png
  :align: center
  :width: 100%

Threat detection and response
-----------------------------

This group contains the following subsections:

- :ref:`Vulnerabilities <vulnerability-detection>` dashboard  helps to discover which applications in the monitored environment are affected by well-knows vulnerabilities.
- :ref:`VirusTotal <virustotal-scan>` dashboard shows alerts resulting from VirusTotal analysis of suspicious files via integration with their API.
- :ref:`Osquery <osquery>` dashboard allows to exploring an operating system as a high-performance relational database.
- :ref:`Docker listener <docker-monitor-index>` dashboard gives access to monitoring and view the collected activities from Docker containers such as creation, running, starting, stopping, or pausing events.

Auditing and Policy monitoring
------------------------------

This group contains the following subsections:

- :ref:`Policy monitoring <manual_policy_monitoring>` helps to verify that the scanned systems are configured according to the user's security policies baseline.
- :ref:`System auditing <auditing-whodata>` dashboard provides the information from an audit of users' behavior, monitoring commands execution, and alerting on access to critical files.
- :ref:`OpenSCAP <openscap_module>` dashboard allows configuration assessment and automation of compliance monitoring using SCAP checks.
- :ref:`CIS-CAT <ciscat_module>` dashboard presents configuration assessment using Center of Internet Security scanner and SCAP checks.

.. thumbnail:: ../../images/kibana-app/sections/overview/wazuh-kibana-policy-monitoring.png
  :align: center
  :width: 100%

Regulatory compliance
---------------------

This subsection presents dashboards containing information about the following compliances:

- :ref:`PCI DSS <pci_dss>`: global security standard for entities that process, store or transmit payment cardholder data:

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

.. _kibana_overview_discover:

Discover
--------

Each subsection in the *Overview* section has the ``Discover`` button located in the right top corner of the screen. It opens a page where the user can interactively explore the Wazuh alerts from the currently selected index pattern. It is possible to submit search queries, filter the search results, view alerts data, and also, by clicking on the fields on the left side of the window, add columns for a quick value comparison between alerts.
The user can see the number of alerts that match the search query and get field value statistics:

.. thumbnail:: ../../images/kibana-app/sections/overview/wazuh-kibana-discover.png
  :align: center
  :width: 100%

.. _kibana_overview_reports:

PDF report generation
---------------------

Each *Overview* subsection has an option for generating a report by clicking on the printer icon button located on the top right corner of the page. The reports are stored on the same machine where Kibana is installed, in the ``/usr/share/kibana/optimize/wazuh/downloads/reports`` folder. A status message will indicate if the report was generated successfully, or if the process was aborted:

.. thumbnail:: ../../images/kibana-app/sections/overview/wazuh-kibana-reports-generation.png
  :align: center
  :width: 100%

The list of the reports is available on *Management > Reporting*, from where they can be downloaded or deleted. The reports are generated in PDF format and downloaded to a user's computer:

.. thumbnail:: ../../images/kibana-app/sections/overview/wazuh-kibana-reports.png
  :align: center
  :width: 100%
