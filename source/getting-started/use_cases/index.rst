.. Copyright (C) 2019 Wazuh, Inc.
.. meta::
  :description: Explore some practical examples of the most common use cases of the Wazuh solution in this section of our documentation. 

.. _use_cases:

Use cases
=========

The Wazuh platform is used to protect and monitor systems in different ways. Because of all of its capabilities, it is often used for threat prevention, detection, and response. Besides, the Wazuh platform is used to meet regulatory compliance requirements (such PCI DSS or HIPAA) and configuration standards (CIS hardening guides).

Wazuh is a popular security solution among IaaS users (eg. Amazon AWS, Azure, or Google cloud), used to monitor virtual machines and cloud instances. This is done at a system level utilizing the :ref:`Wazuh security agent <wazuh_agent>`, and at an infrastructure level pulling data directly from the cloud provider API.

Additionally, Wazuh is often used to protect containerized environments providing cloud-native runtime security. This feature is based on an integration with the Docker engine API and Kubernetes API. Besides, for better protection, Wazuh security agent can run on the Docker host providing a complete set of threat detection and response capabilities.

In this section of the documentation you will find a brief example of some of the more common use cases of the Wazuh solution.

.. list-table::
   :width: 100%
   :widths: 50 50

   * - :ref:`security_analytics`
     - :ref:`intrusion_detection`
   * - :ref:`log_analysis`
     - :ref:`file_integrity`
   * - :ref:`vulnerability_detection`
     - :ref:`configuration_assessment`
   * - :ref:`active_response`
     - :ref:`regulatory_compliance`
   * - :ref:`cloud_security`
     - :ref:`containers_security`

.. toctree::
   :hidden:

   security_analytics
   intrusion_detection
   log_analysis
   file_integrity
   vulnerability_detection
   configuration_assessment
   active_response
   regulatory_compliance
   cloud_security
   containers_security
