.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh threat intelligence capabilities, including Wazuh CTI and the MITRE ATT&CK module, give you context on threats, adversaries, and vulnerabilities. Learn more about it in this section.

Threat intelligence
===================

Wazuh provides threat intelligence capabilities that give you context on threats, adversaries, and vulnerabilities affecting your environment. These capabilities come from two main sources, the Wazuh Cyber Threat Intelligence (CTI) service and the Wazuh MITRE ATT&CK module.

Wazuh CTI is the upstream source of threat intelligence and security content that powers Wazuh capabilities such as event enrichment, threat detection, and vulnerability detection. Refer to :doc:`Wazuh CTI </wazuh-cti/how-it-works>` for more details.

MITRE ATT&CK is a repository for information about attack tactics and techniques, and what to do to detect and mitigate them. The Wazuh MITRE ATT&CK module shows findings that detail the threat actors, attack tactics, and techniques used in a security event. This module is helpful when an attack generates findings, and you want to know more about it. Refer to :ref:`MITRE ATT&CK <data_analysis_rules_mitre>` for more details about MITRE mapping to rules.

The Wazuh threat intelligence capability helps to meet the following NIST 800-53 controls:

-  **RA-10 Threat hunting:** Search your systems and networks proactively for advanced threats that have evaded your other security controls.

-  **PM-16 Threat awareness program:** Run a threat awareness program that shares information about adversary tactics, techniques, and mitigations across the organization and with partners.

Wazuh helps you meet these controls by mapping findings to MITRE ATT&CK techniques and providing an intelligence dashboard for reviewing adversary tactics, techniques, software, and mitigations.

Use cases
---------

Review MITRE ATT&CK techniques in your environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh helps meet the RA-10 Threat hunting requirement by providing the MITRE ATT&CK module for threat hunting. Review the MITRE ATT&CK techniques and see the events associated with those techniques in your environment. To perform this review, follow the steps below:

#. Click the upper-left menu icon (**☰**) and go to **Threat intelligence** > **MITRE ATT&CK**.

#. Click **Framework** to see the available MITRE tactics and their associated techniques.

#. Select any technique to display its details and the associated events in your environment.

   .. thumbnail:: /images/compliance/nist/mitre-attack-technique-details.png
      :title: MITRE ATT&CK technique details
      :alt: MITRE ATT&CK technique details
      :align: center
      :width: 80%

You can proceed to review the events for possible malicious activity.

Review intelligence on threat actors
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh helps meet the PM-16 Threat awareness program requirement by providing a threat intelligence platform for threat awareness.

In this scenario, you review intelligence from MITRE about multiple threat actors, techniques, mitigations, and tools. Wazuh provides this information in the Intelligence section of the MITRE ATT&CK module. This review helps support the NIST PM-16 Threat awareness program control and keeps security administrators informed about threats. Follow the steps below to perform this review:

#. Click the upper-left menu icon (**☰**) and go to **Threat intelligence** > **MITRE ATT&CK**.

#. Click **Intelligence** to see the available MITRE intelligence sections.

#. Select **Groups** to see the different threat groups identified by MITRE.

   You can see the group description, the software they use, and their associated techniques.

   .. thumbnail:: /images/compliance/nist/mitre-attack-intelligence-groups.png
      :title: MITRE ATT&CK Intelligence groups
      :alt: MITRE ATT&CK Intelligence groups
      :align: center
      :width: 80%

   .. thumbnail:: /images/compliance/nist/mitre-attack-group-details.png
      :title: MITRE ATT&CK group details
      :alt: MITRE ATT&CK group details
      :align: center
      :width: 80%
