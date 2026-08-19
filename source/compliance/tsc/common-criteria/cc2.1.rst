.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh helps meet the COSO Principle 13 (CC2.1) requirement by providing capabilities that generate quality information for the proper functioning of internal control measures.

Common Criteria 2.1 (COSO Principle 13)
=========================================

The TSC **Common Criteria CC2.1** specifies the use of relevant information and communication within an organization. It states, "*The entity obtains or generates and uses relevant, quality information to support the functioning of internal control.*"

This principle emphasizes the importance of accurate, timely information to manage risks and achieve organizational objectives effectively. It also highlights the need for efficient communication channels so information can be conveyed and used by the appropriate individuals and departments within the organization. There are four objectives needed to meet this requirement:

-  *Identifies Information Requirements: A process is in place to identify the information required and expected to support the functioning of the other components of internal control and the achievement of the entity's objectives.*
-  *Captures Internal and External Sources of Data: Information systems capture internal and external data sources.*
-  *Processes Relevant Data Into Information: Information systems process and transform relevant data into information.*
-  *Maintains Quality Throughout Processing: Information systems produce information that is timely, current, accurate, complete, accessible, protected, verifiable, and retained. Information is reviewed to assess its relevance in supporting the internal control components.*

To comply with **Principle 13**, an entity must have processes in place to identify and gather relevant information, assess its quality, and use it to support proper decision-making, such as internal control activities. It should also establish a functional communication channel to ensure timely distribution of information to the appropriate individuals and departments.

Wazuh helps meet the COSO **Principle 13 CC2.1** requirement by providing capabilities that generate quality information for the proper functioning of internal control measures. An example is log data analysis. The Wazuh Logcollector module retrieves and centralizes log data from different sources, such as operating systems, applications, network devices, and security appliances. Once Wazuh collects the log data, it applies various analysis techniques to extract valuable insights and detect potential security issues. This is done by matching the received data with the Wazuh out-of-the-box decoders and rules.

Use case: Collecting and analyzing logs across multiple endpoints
--------------------------------------------------------------------

The use case below shows how log data analysis can detect specific events on monitored endpoints.

Wazuh dashboard
^^^^^^^^^^^^^^^^

#. Click **Threat Hunting** from the Wazuh dashboard:

   .. thumbnail:: /images/compliance/tsc/common-criteria/overview-threat-hunting-card.png
      :title: Wazuh Overview dashboard - Threat Hunting
      :alt: Wazuh Overview dashboard - Threat Hunting
      :align: center
      :width: 80%

   The images below show the Wazuh **Threat Hunting** dashboard.

   .. thumbnail:: /images/compliance/tsc/common-criteria/threat-hunting-dashboard.png
      :title: Threat Hunting dashboard
      :alt: Threat Hunting dashboard
      :align: center
      :width: 80%

   The Wazuh ruleset also labels these triggered events correctly. For example, the image below shows details for the triggered finding: ``Secret or credential accessed from vault``.

#. Navigate to the **Findings** section and click on a finding to view details.

   .. thumbnail:: /images/compliance/tsc/common-criteria/vault-secret-finding-details.png
      :title: Secret or credential accessed from vault finding details
      :alt: Secret or credential accessed from vault finding details
      :align: center
      :width: 80%
