.. Copyright (C) 2020 Wazuh, Inc.

.. _index:

================
Welcome to Wazuh
================

.. meta::
  :description: Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Wazuh is a free and open source platform for threat detection, security monitoring, incident response and regulatory compliance. It can be used to monitor endpoints, cloud services and containers, and to aggregate and analyze data from external sources. Wazuh provides the following capabilities:

.. raw:: html

  <div class="section" id="capabilities">

.. raw:: html

   <div class="items row">

.. raw:: html

   <div class="capab left col-xl-4">
      <div class="line"></div>

.. topic:: Security Analytics
  :class: security active

  Wazuh is used to collect, aggregate, index and analyze security data, helping organizations detect intrusions, threats and behavioral anomalies.

  As cyber threats are becoming more sophisticated, real-time monitoring and security analysis are needed for fast threat detection and remediation. That is why our light-weight agent provides the necessary monitoring and response capabilities, while our server component provides the security intelligence and performs data analysis.

.. topic:: Intrusion Detection
  :class: intrusion

  Wazuh agents scan the monitored systems looking for malware, rootkits and suspicious anomalies. They can detect hidden files, cloaked processes or unregistered network listeners, as well as inconsistencies in system call responses.

  In addition to agent capabilities, the server component uses a signature-based approach to intrusion detection, using its regular expression engine to analyze collected log data and look for indicators of compromise.

.. topic:: Log Data Analysis
  :class: logdata

  Wazuh agents read operating system and application logs, and securely forward them to a central manager for rule-based analysis and storage.

  The Wazuh rules help make you aware of application or system errors, misconfigurations, attempted and/or successful malicious activities, policy violations and a variety of other security and operational issues.

.. topic:: File Integrity Monitoring
  :class: fim

  Wazuh monitors the file system, identifying changes in content, permissions, ownership, and attributes of files that you need to keep an eye on. In addition, it natively identifies users and applications used to create or modify files.

  File integrity monitoring capabilities can be used in combination with threat intelligence to identify threats or compromised hosts. In addition, several regulatory compliance standards, such as PCI DSS, require it.

.. topic:: Vulnerability Detection
  :class: vulne

  Wazuh agents pull software inventory data and send this information to the server, where it is correlated with continuously updated CVE (Common Vulnerabilities and Exposure) databases, in order to identify well-known vulnerable software.

  Automated vulnerability assessment helps you find the weak spots in your critical assets and take corrective action before attackers exploit them to sabotage your business or steal confidential data.

.. topic:: Configuration Assessment
  :class: config

  Wazuh monitors system and application configuration settings to ensure they are compliant with your security policies, standards and/or hardening guides. Agents perform periodic scans to detect applications that are known to be vulnerable, unpatched, or insecurely configured.

  Additionally, configuration checks can be customized, tailoring them to properly align with your organization. Alerts include recommendations for better configuration, references and mapping with regulatory compliance.

.. topic:: Incident Response
  :class: incident

  Wazuh provides out-of-the-box active responses to perform various countermeasures to address active threats, such as blocking access to a system from the threat source when certain criteria are met.

  In addition, Wazuh can be used to remotely run commands or system queries, identifying indicators of compromise (IOCs) and helping perform other live forensics or incident response tasks.

.. topic:: Regulatory Compliance
  :class: compliance

  Wazuh provides some of the necessary security controls to become compliant with industry standards and regulations. These features, combined with its scalability and multi-platform support help organizations meet technical compliance requirements.

  Wazuh is widely used by payment processing companies and financial institutions to meet PCI DSS (Payment Card Industry Data Security Standard) requirements. Its web user interface provides reports and dashboards that can help with this and other regulations (e.g. GPG13 or GDPR).

.. topic:: Cloud Security Monitoring
  :class: cloud

  Wazuh helps monitoring cloud infrastructure at an API level, using integration modules that are able to pull security data from well known cloud providers, such as Amazon AWS, Azure or Google Cloud. In addition, Wazuh provides rules to assess the configuration of your cloud environment, easily spotting weaknesses.

  In addition, Wazuh light-weight and multi-platform agents are commonly used to monitor cloud environments at the instance level.

.. topic:: Containers Security
  :class: docker

  Wazuh provides security visibility into your Docker hosts and containers, monitoring their behavior and detecting threats, vulnerabilities and anomalies. The Wazuh agent has native integration with the Docker engine allowing users to monitor images, volumes, network settings, and running containers.

  Wazuh continuously collects and analyzes detailed runtime information. For example, alerting for containers running in privileged mode, vulnerable applications, a shell running in a container, changes to persistent volumes or images, and other possible threats.

.. raw:: html

   </div>

.. raw:: html

   <div class="right col-xl-8">

.. raw:: html

   <div class="info">

.. topic:: Security Analytics
   :class: security active

   Wazuh is used to collect, aggregate, index and analyze security data, helping organizations detect intrusions, threats and behavioral anomalies.

   As cyber threats are becoming more sophisticated, real-time monitoring and security analysis are needed for fast threat detection and remediation. That is why our light-weight agent provides the necessary monitoring and response capabilities, while our server component provides the security intelligence and performs data analysis.

.. topic:: Log Data Analysis
   :class: logdata

   Wazuh agents read operating system and application logs, and securely forward them to a central manager for rule-based analysis and storage.

   The Wazuh rules help make you aware of application or system errors, misconfigurations, attempted and/or successful malicious activities, policy violations and a variety of other security and operational issues.

.. topic:: File Integrity Monitoring
   :class: fim

   Wazuh monitors the file system, identifying changes in content, permissions, ownership, and attributes of files that you need to keep an eye on. In addition, it natively identifies users and applications used to create or modify files.

   File integrity monitoring capabilities can be used in combination with threat intelligence to identify threats or compromised hosts. In addition, several regulatory compliance standards, such as PCI DSS, require it.

.. topic:: Vulnerability Detection
   :class: vulne

   Wazuh agents pull software inventory data and send this information to the server, where it is correlated with continuously updated CVE (Common Vulnerabilities and Exposure) databases, in order to identify well-known vulnerable software.

   Automated vulnerability assessment helps you find the weak spots in your critical assets and take corrective action before attackers exploit them to sabotage your business or steal confidential data.

.. topic:: Configuration Assessment
   :class: config

   Wazuh monitors system and application configuration settings to ensure they are compliant with your security policies, standards and/or hardening guides. Agents perform periodic scans to detect applications that are known to be vulnerable, unpatched, or insecurely configured.

   Additionally, configuration checks can be customized, tailoring them to properly align with your organization. Alerts include recommendations for better configuration, references and mapping with regulatory compliance.

.. topic:: Incident Response
   :class: incident

   Wazuh provides out-of-the-box active responses to perform various countermeasures to address active threats, such as blocking access to a system from the threat source when certain criteria are met.

   In addition, Wazuh can be used to remotely run commands or system queries, identifying indicators of compromise (IOCs) and helping perform other live forensics or incident response tasks.

.. topic:: Regulatory Compliance
   :class:   compliance

   Wazuh provides some of the necessary security controls to become compliant with industry standards and regulations. These features, combined with its scalability and multi-platform support help organizations meet technical compliance requirements.

   Wazuh is widely used by payment processing companies and financial institutions to meet PCI DSS (Payment Card Industry Data Security Standard) requirements. Its web user interface provides reports and dashboards that can help with this and other regulations (e.g. GPG13 or GDPR).

.. topic:: Intrusion Detection
   :class: intrusion

   Wazuh agents scan the monitored systems looking for malware, rootkits and suspicious anomalies. They can detect hidden files, cloaked processes or unregistered network listeners, as well as inconsistencies in system call responses.

   In addition to agent capabilities, the server component uses a signature-based approach to intrusion detection, using its regular expression engine to analyze collected log data and look for indicators of compromise.

.. topic:: Cloud Security Monitoring
   :class: cloud

   Wazuh helps monitoring cloud infrastructure at an API level, using integration modules that are able to pull security data from well known cloud providers, such as Amazon AWS, Azure or Google Cloud. In addition, Wazuh provides rules to assess the configuration of your cloud environment, easily spotting weaknesses.

   In addition, Wazuh light-weight and multi-platform agents are commonly used to monitor cloud environments at the instance level.

.. topic:: Containers Security
   :class: docker

   Wazuh provides security visibility into your Docker hosts and containers, monitoring their behavior and detecting threats, vulnerabilities and anomalies. The Wazuh agent has native integration with the Docker engine allowing users to monitor images, volumes, network settings, and running containers.

   Wazuh continuously collects and analyzes detailed runtime information. For example, alerting for containers running in privileged mode, vulnerable applications, a shell running in a container, changes to persistent volumes or images, and other possible threats.

.. raw:: html

   </div>

.. raw:: html

   <div class="screenshots">
      <div id="slider" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">

.. thumbnail:: images/screenshots/01-Wazuh-Security-Analytics.png
   :title: Security Analytics
   :class: d-block w-100

.. raw:: html

          </div>

          <div class="carousel-item">

.. thumbnail:: images/screenshots/02-Wazuh-Intrusion-Detection.png
   :title: Wazuh Intrusion Detection
   :class: d-block w-100

.. raw:: html

          </div>

          <div class="carousel-item">

.. thumbnail:: images/screenshots/03-Wazuh-Log-Data-Analysis.png
   :title: Log Data Analysis
   :class: d-block w-100

.. raw:: html

          </div>

          <div class="carousel-item">

.. thumbnail:: images/screenshots/04-Wazuh-File-Integrity-Monitoring.png
   :title: File Integrity Monitoring
   :class: d-block w-100

.. raw:: html

          </div>

          <div class="carousel-item">

.. thumbnail:: images/screenshots/05-Wazuh-Vulnerability-Detection.png
   :title: Vulnerability Detection
   :class: d-block w-100

.. raw:: html

          </div>

          <div class="carousel-item">

.. thumbnail:: images/screenshots/06-Wazuh-Configuration-Assessment.png
   :title: Configuration Assessment
   :class: d-block w-100

.. raw:: html

          </div>

          <div class="carousel-item">

.. thumbnail:: images/screenshots/07-Wazuh-Incident-Response.png
   :title: Incident Response
   :class: d-block w-100

.. raw:: html

          </div>

          <div class="carousel-item">

.. thumbnail:: images/screenshots/08-Wazuh-Regulatory-Compliance.png
   :title: Regulatory Compliance
   :class: d-block w-100

.. raw:: html

          </div>

          <div class="carousel-item">

.. thumbnail:: images/screenshots/09-Wazuh-Cloud-Security.png
   :title: Cloud Security
   :class: d-block w-100

.. raw:: html

          </div>

          <div class="carousel-item">

.. thumbnail:: images/screenshots/10-Wazuh-Containers-Security.png
   :title: Containers Security
   :class: d-block w-100

.. raw:: html

          </div>

          <a class="carousel-control-prev" href="#slider" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#slider" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>

        </div>
      </div>

.. raw:: html

   </div>

.. raw:: html

   </div>

.. raw:: html

   </div></div>
   <div class="section" id="available-documentation">

.. toctree::
   :titlesonly:
   :includehidden:

   getting-started/index
   installation-guide/index
   upgrade-guide/index
   user-manual/index
   cloud-console/index
   development/index
   containers
   deployment
   compliance
   monitoring
   migrating-from-ossec/index
   learning-wazuh/index
   release-notes/index

.. raw:: html

   </div>


