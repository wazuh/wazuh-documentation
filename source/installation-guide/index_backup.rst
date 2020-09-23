.. Copyright (C) 2020 Wazuh, Inc.

.. _installation_guide:



Wazuh Stack installation guide
==============================

.. meta::
  :description: Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.
​
​
Wazuh is a free and open source platform for threat detection, security monitoring, incident response and regulatory compliance. It can be used to monitor endpoints, cloud services and containers, and to aggregate and analyze data from external sources. Wazuh provides the following capabilities:
​

.. raw:: html
​
  <div class="section" id="capabilities">
​
.. raw:: html
​
   <div class="items row">
​
.. raw:: html
​
   <div class="capab left col-xl-4">
      <div class="line"></div>
​
.. topic:: All in one
  :class: all-in-one
​
  Wazuh is used to collect, aggregate, index and analyze security data, helping organizations detect intrusions, threats and behavioral anomalies.
​
  As cyber threats are becoming more sophisticated, real-time monitoring and security analysis are needed for fast threat detection and remediation. That is why our light-weight agent provides the necessary monitoring and response capabilities, while our server component provides the security intelligence and performs data analysis.
​
​
​
.. topic:: Distributed
  :class: distributed
​
  Wazuh agents scan the monitored systems looking for malware, rootkits and suspicious anomalies. They can detect hidden files, cloaked processes or unregistered network listeners, as well as inconsistencies in system call responses.
​
  In addition to agent capabilities, the server component uses a signature-based approach to intrusion detection, using its regular expression engine to analyze collected log data and look for indicators of compromise.
​
​
​
.. topic:: Wazuh Cloud
  :class: cloud
​
  Wazuh agents read operating system and application logs, and securely forward them to a central manager for rule-based analysis and storage.
​
  The Wazuh rules help make you aware of application or system errors, misconfigurations, attempted and/or successful malicious activities, policy violations and a variety of other security and operational issues.
​
​
​
.. raw:: html
​
   </div>
   <div class="right col-xl-8">
   <div class="info">
​
.. topic:: All in one
   :class: all-in-one
​
   Wazuh is used to collect, aggregate, index and analyze security data, helping organizations detect intrusions, threats and behavioral anomalies.
​
   As cyber threats are becoming more sophisticated, real-time monitoring and security analysis are needed for fast threat detection and remediation. That is why our light-weight agent provides the necessary monitoring and response capabilities, while our server component provides the security intelligence and performs data analysis.
​
   .. thumbnail:: images/installation/all-in-one.png
     :title: Distributed architecture
     :align: center
     :width: 100%
​
.. topic:: Distributed
   :class: distributed
​
   Wazuh agents read operating system and application logs, and securely forward them to a central manager for rule-based analysis and storage.
​
   The Wazuh rules help make you aware of application or system errors, misconfigurations, attempted and/or successful malicious activities, policy violations and a variety of other security and operational issues.
​
   .. thumbnail:: images/installation/distributed.png
     :title: Distributed architecture
     :align: center
     :width: 100%
​
.. topic:: Wazuh Cloud
   :class: cloud
​
   Wazuh monitors the file system, identifying changes in content, permissions, ownership, and attributes of files that you need to keep an eye on. In addition, it natively identifies users and applications used to create or modify files.
​
   File integrity monitoring capabilities can be used in combination with threat intelligence to identify threats or compromised hosts. In addition, several regulatory compliance standards, such as PCI DSS, require it.
​
   .. thumbnail:: images/installation/cloud.png
     :title: Distributed architecture
     :align: center
     :width: 100%
  
​
​
.. raw:: html
​
   </div>
   </div>
   </div>
   </div></div>
   <div class="section" id="available-documentation">
​
.. toctree::
   :titlesonly:
   :includehidden:
​
   getting-started/index
   installation-guide/index
   upgrade-guide/index
   user-manual/index
   development/index
   containers
   deployment
   compliance
   monitoring
   migrating-from-ossec/index
   learning-wazuh/index
   release-notes/index
   other-installation-options/index
​
.. raw:: html
​
   </div>




