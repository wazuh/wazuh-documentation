.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh threat intelligence capabilities, including Wazuh CTI and the MITRE ATT&CK module, give you context on threats, adversaries, and vulnerabilities. Learn more about it in this section.

Threat intelligence
===================

Wazuh provides threat intelligence capabilities that give you context on threats, adversaries, and vulnerabilities affecting your environment. These capabilities come from two main sources, the Wazuh Cyber Threat Intelligence (CTI) service and the Wazuh MITRE ATT&CK module.

Wazuh CTI is the upstream source of threat intelligence and security content that powers Wazuh capabilities such as event enrichment, threat detection, and vulnerability detection. Refer to :doc:`Wazuh CTI </wazuh-cti/how-it-works>` for more details.

MITRE ATT&CK is a repository for information about attack tactics and techniques, and what to do to detect and mitigate them. The Wazuh MITRE ATT&CK module shows findings that detail the threat actors, attack tactics, and techniques used in a security event. This module is helpful when an attack generates findings, and you want to know more about it. Refer to :ref:`MITRE ATT&CK <data_analysis_rules_mitre>` for more details about MITRE mapping to rules.

The Wazuh threat intelligence capability helps to meet the following NIST 800-53 controls:

-  **RA-10 Threat hunting:** "*Threat hunting is an active means of cyber defense in contrast to traditional protection measures, such as firewalls, intrusion detection and prevention systems, quarantining malicious code in sandboxes, and Security Information and Event Management technologies and systems. Cyber threat hunting involves proactively searching organizational systems, networks, and infrastructure for advanced threats. The objective is to track and disrupt cyber adversaries as early as possible in the attack sequence and to measurably improve the speed and accuracy of organizational responses. Indications of compromise include unusual network traffic, unusual file changes, and the presence of malicious code. Threat hunting teams leverage existing threat intelligence and may create new threat intelligence, which is shared with peer organizations, Information Sharing and Analysis Organizations (ISAO), Information Sharing and Analysis Centers (ISAC), and relevant government departments and agencies.*"

-  **PM-16 Threat awareness program:** "*Because of the constantly changing and increasing sophistication of adversaries, especially the advanced persistent threat (APT), it may be more likely that adversaries can successfully breach or compromise organizational systems. One of the best techniques to address this concern is for organizations to share threat information, including threat events (i.e., tactics, techniques, and procedures) that organizations have experienced, mitigations that organizations have found are effective against certain types of threats, and threat intelligence (i.e., indications and warnings about threats). Threat information sharing may be bilateral or multilateral. Bilateral threat sharing includes government-to-commercial and government-to-government cooperatives. Multilateral threat sharing includes organizations taking part in threat-sharing consortia. Threat information may require special agreements and protection, or it may be freely shared.*"

The NIST 800-53 controls above require organizations to perform threat hunting and stay continuously updated about cyber threats and adversaries. Wazuh helps you meet these controls by mapping findings to MITRE ATT&CK techniques and providing an intelligence dashboard for reviewing adversary tactics, techniques, software, and mitigations.

Use cases
---------

Review MITRE ATT&CK techniques in your environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh helps meet the PM-16 Threat awareness program requirement by providing the MITRE ATT&CK module for threat information sharing. Review the MITRE ATT&CK techniques and see the events associated with those techniques in your environment. To perform this review, follow the steps below:

#. Click the upper-left menu icon (**☰**) and go to **Threat intelligence** > **MITRE ATT&CK**.

#. Click **Framework** to see the available MITRE tactics and their associated techniques.

#. Select any technique to display its details and the associated events in your environment.

   .. thumbnail:: /images/compliance/nist/mitre-attack-dashboard.png
      :title: MITRE ATT&CK Dashboard tab
      :alt: MITRE ATT&CK Dashboard tab
      :align: center
      :width: 80%

You can proceed to review the events for possible malicious activity.

Review intelligence on threat actors
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh helps meet the RA-10 Threat hunting requirement by providing a threat intelligence platform for threat hunters.

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

   .. thumbnail:: /images/compliance/nist/mitre-attack-framework.png
      :title: MITRE ATT&CK Framework tab
      :alt: MITRE ATT&CK Framework tab
      :align: center
      :width: 80%
