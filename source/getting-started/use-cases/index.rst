.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about how the Wazuh capabilities work and check out some common Wazuh use cases in this section of our documentation.

.. _use_cases:

Use cases
=========

The Wazuh platform is used to protect and monitor systems in different ways. Because of all of its capabilities, it is widely used for threat prevention, detection, and response. Besides, the Wazuh platform is used to meet regulatory compliance requirements, such as PCI DSS or HIPAA, and configuration standards like CIS hardening guides.

Wazuh is the ideal security solution for users of IaaS (Amazon AWS, Azure, or Google Cloud) to monitor virtual machines and cloud instances. This is done at a system level utilizing the :ref:`Wazuh security agent <wazuh_agent>`, and at an infrastructure level pulling data directly from the cloud provider API.

Additionally, Wazuh is often employed to protect containerized environments providing cloud-native runtime security. This feature is based on an integration with the Docker engine API and Kubernetes API. Moreover, for better protection, the Wazuh security agent can run on the Docker host providing a complete set of threat detection and response capabilities.

Below you can find examples of some of the most common use cases of the Wazuh solution.

.. list-table::
   :width: 100%
   :widths: 50 50

   * - :ref:`log_analysis` 
     - :ref:`file_integrity`
   * - :ref:`rootkits_detection`
     - :ref:`incident_response`
   * - :ref:`configuration_assessment`
     - :ref:`system_inventory`
   * - :ref:`vulnerability_detection`
     - :ref:`cloud_security`
   * - :ref:`containers_security`
     - :ref:`regulatory_compliance`


.. toctree::
   :hidden:

   log-analysis
   file-integrity
   rootkits-detection
   incident-response
   configuration-assessment
   system-inventory
   vulnerability-detection
   cloud-security
   containers-security
   regulatory-compliance
