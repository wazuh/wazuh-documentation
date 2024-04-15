.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh MITRE ATT&CK module provides you with threat intelligence capability. Learn more about it in this section of the documentation.

Threat intelligence
===================

The Wazuh MITRE ATT&CK module provides you with threat intelligence capability. You can use it to gain further context on alerts in your environment. `MITRE ATT&CK <https://attack.mitre.org/>`_ is a repository for information about attack tactics and techniques, and what to do to detect and mitigate them. The Wazuh MITRE ATT&CK module shows alerts that detail the threat actors, attack tactics,  and techniques used in a security event. This module is helpful when an attack generates alerts and a user wants to know more about it. Refer to the :doc:`/user-manual/ruleset/mitre` for more details about MITRE mapping to rules.

The Wazuh threat intelligence capability helps to meet the following NIST 800-53 controls:

- **RA-10 Threat hunting**: *“Threat hunting is an active means of cyber defense in contrast to traditional protection measures, such as firewalls, intrusion detection and prevention systems, quarantining malicious code in sandboxes, and Security Information and Event Management technologies and systems. Cyber threat hunting involves proactively searching organizational systems, networks, and infrastructure for advanced threats. The objective is to track and disrupt cyber adversaries as early as possible in the attack sequence and to measurably improve the speed and accuracy of organizational responses. Indications of compromise include unusual network traffic, unusual file changes, and the presence of malicious code. Threat hunting teams leverage existing threat intelligence and may create new threat intelligence, which is shared with peer organizations, Information Sharing and Analysis Organizations (ISAO), Information Sharing and Analysis Centers (ISAC), and relevant government departments and agencies.”*

- **PM-16 Threat awareness program**: *“Because of the constantly changing and increasing sophistication of adversaries, especially the advanced persistent threat (APT), it may be more likely that adversaries can successfully breach or compromise organizational systems. One of the best techniques to address this concern is for organizations to share threat information, including threat events (i.e., tactics, techniques, and procedures) that organizations have experienced, mitigations that organizations have found are effective against certain types of threats, and threat intelligence (i.e., indications and warnings about threats). Threat information sharing may be bilateral or multilateral. Bilateral threat sharing includes government-to-commercial and government-to-government cooperatives. Multilateral threat sharing includes organizations taking part in threat-sharing consortia. Threat information may require special agreements and protection, or it may be freely shared.”*

The NIST 800-53 controls above require organizations to perform threat hunting and stay continuously updated about cyber threats and adversaries. Wazuh helps you meet these controls by mapping alerts to MITRE ATT&CK techniques and providing an intelligence dashboard for reviewing adversary tactics, techniques, software, and mitigations.

Use cases 
---------

Review MITRE ATT&CK techniques in your environment 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, Wazuh helps meet the **PM-16 Threat awareness program** requirement by providing the **MITRE ATT&CK** module for threat information sharing. Review various MITRE ATT&CK techniques and see the events associated with those techniques in your environment. To perform this review, follow the steps below:

#. Select the **MITRE ATT&CK** module on the Wazuh dashboard.

   .. thumbnail:: /images/compliance/nist/mitre-attack-module.png    
      :title: MITRE ATT&CK module
      :alt: MITRE ATT&CK module
      :align: center
      :width: 80%

#. Select **Framework**. Here, you can see the available MITRE tactics and their associated techniques.

#. Select any technique to display its details as well as the events in your environment associated with that technique. In this example, we choose **T1112 Modify Registry**.

   .. thumbnail:: /images/compliance/nist/select-framework.png    
      :title: Select Framework
      :alt: Select Framework
      :align: center
      :width: 80%

   .. thumbnail:: /images/compliance/nist/t1112-modify-registry.png    
      :title: T1112 Modify Registry
      :alt: T1112 Modify Registry
      :align: center
      :width: 80%

You can proceed to review the events for possible malicious activity.

Review intelligence on threat actors 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, Wazuh helps meet the **RA-10 Threat hunting** requirement by providing a threat intelligence platform for threat hunters.

In this scenario, you review intelligence from MITRE about various threat actors, techniques, mitigations, and tools. Wazuh provides this information in the Intelligence section of the MITRE ATT&CK module. This review helps support the NIST PM-16 Threat awareness program control and keeps security administrators informed about threats. Follow the steps below to perform this review:

#. Select the **MITRE ATT&CK** module from the Wazuh dashboard.

   .. thumbnail:: /images/compliance/nist/mitre-attack-module.png    
      :title: MITRE ATT&CK module
      :alt: MITRE ATT&CK module
      :align: center
      :width: 80%

#. Select **Intelligence**. Here, you can see the available MITRE intelligence sections.

#. Select **Groups**. Here, you can see the different threat groups identified by MITRE. In this use case, choose **G0018**.

   .. thumbnail:: /images/compliance/nist/select-groups.png    
      :title: Select Groups
      :alt: Select Groups
      :align: center
      :width: 80%

   You can see the group description, the software they use, and their associated techniques.

   .. thumbnail:: /images/compliance/nist/group-description.png    
      :title: Group description
      :alt: Group description
      :align: center
      :width: 80%

   .. thumbnail:: /images/compliance/nist/associated-techniques.png    
      :title: Associated techniques
      :alt: Associated techniques
      :align: center
      :width: 80%