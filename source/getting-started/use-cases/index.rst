.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how the Wazuh capabilities work and check out some common Wazuh use cases in this section of our documentation.

Use cases
=========

The Wazuh platform helps organizations and individuals protect their data assets through threat prevention, detection, and response. Besides, Wazuh is also employed to meet regulatory compliance requirements, such as PCI DSS or HIPAA, and configuration standards like CIS hardening guides.

Moreover, Wazuh is also a solution for users of IaaS (Amazon AWS, Azure, or Google Cloud) to monitor virtual machines and cloud instances. This is done at a system level utilizing the :doc:`Wazuh security agent <../components/wazuh-agent>` and at an infrastructure level pulling data directly from the cloud provider API.

Additionally, Wazuh is employed to protect containerized environments by providing cloud-native runtime security. This feature is based on an integration with the Docker engine API and the Kubernetes API. The Wazuh security agent can run on the Docker host providing a complete set of threat detection and response capabilities.

Below you can find examples of some of the most common use cases of the Wazuh platform.

=================================  ================================  ==============================  ==================================
Endpoint security                  Threat intelligence               Security operations             Cloud security
=================================  ================================  ==============================  ==================================
:doc:`configuration-assessment`    :doc:`threat-hunting`             :doc:`incident-response`        :doc:`container-security`
:doc:`malware-detection`           :doc:`log-analysis`               :doc:`regulatory-compliance`    Posture management
:doc:`file-integrity`              :doc:`vulnerability-detection`    :doc:`it-hygiene`               :doc:`cloud-workload-protection`
=================================  ================================  ==============================  ==================================

.. toctree::
   :hidden:

   configuration-assessment
   malware-detection
   file-integrity
   threat-hunting
   log-analysis
   vulnerability-detection
   incident-response
   regulatory-compliance
   it-hygiene
   container-security
   cloud-workload-protection
