.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh manager is one of the central components of the Wazuh platform that analyzes data from agents, external APIs, and network devices. Learn more in this section of the documentation.

Wazuh manager
=============

The Wazuh manager is one of the central components of the Wazuh platform. It transforms event data received from :doc:`Wazuh agents </getting-started/components/wazuh-agent>`, external APIs, and network devices into standardized schema documents using the :ref:`Wazuh Common Schema (WCS) <wazuh_common_schema>`. It then enriches this data with threat intelligence and contextual information, such as GeoIP data and indicators of compromise (IOCs), and then forwards it to the Wazuh indexer and other configured destinations for security monitoring and analysis.

The Wazuh manager uses multiple threat intelligence sources and enriches events with contextual data to enhance detection accuracy and security visibility. This includes mapping events to the MITRE ATT&CK framework, detecting vulnerabilities with the `Wazuh CTI <https://cti.wazuh.com/>`__ service, and aligning security findings with regulatory standards such as PCI DSS, GDPR, HIPAA, CIS benchmarks, and NIST 800-53.

For installation and configuration steps, refer to the :doc:`Wazuh manager installation </installation-guide/wazuh-server/index>` guide.

.. note::

   By default, the Wazuh manager does not monitor its own endpoint. To enable security monitoring and log collection on the Wazuh manager endpoint, install a Wazuh agent on that endpoint.

.. topic:: Contents

   .. toctree::
      :maxdepth: 2

      wazuh-manager-architecture
      wazuh-normalization-engine
      wazuh-indexer-connector
      wazuh-manager-services
      logging
      reference
