.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_dashboard:

[WIP] Wazuh dashboard
=====================

The Wazuh dashboard is a flexible and intuitive web interface for mining, analyzing, and visualizing data. It is also used for management and monitoring of the Wazuh infrastructure.

**Modules directory for data visualization, mining, and analysis**
  
You can search alerts classified by modules and filter them using the different views. You will be able to explore the alerts both at Wazuh cluster level, and in a particular agent. The Wazuh dashboard includes a *Modules directory* and out-of-the-box dashboards for Security information management, Auditing and Policy Monitoring, Threat Detection and Response, and Regulatory Compliance. 
  

.. raw:: html

   </div>

.. raw:: html

   <div class="screenshots">
      <div id="modules_slider" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">



.. thumbnail:: ../../images/getting_started/dashboard_modules_infomanagement.png
   :title: Security information management
   :align: center

.. raw:: html

          </div>

          <div class="carousel-item">

.. thumbnail:: ../../images/getting_started/dashboard_modules_auditing_and_policy.png
   :title: Auditing and policy monitoring
   :align: center


   
.. raw:: html

          </div>

          <div class="carousel-item">

.. thumbnail:: ../../images/getting_started/dashboard_modules_threat_detection.png
   :title: Threat detection and response
   :align: center


.. raw:: html

          </div>

          <div class="carousel-item">


.. thumbnail:: ../../images/getting_started/dashboard_modules_compliance.png
   :title: Regulatory compliance
   :align: center

   
.. raw:: html

          </div>

          <a class="carousel-control-prev" href="#modules_slider" role="button" data-slide="prev">
            <span class="fas fa-angle-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#modules_slider" role="button" data-slide="next">
            <span class="fas fa-angle-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>

        </div>
      </div>




User can navigate and visualize security events, detected vulnerable applications, file integrity monitoring data, configuration assessment results, cloud infrastructure monitoring events, regulatory compliance, such as PCI DSS, GDPR, CIS, HIPAA, and NIST 800-53 standards, as well as use the Wazuh dashboard for other data visibility purposes.

Moreover, the Wazuh dashboard is flexible. This component provides enhanced visibility of your infrastructure by allowing you to create your own visualizations and dashboards according to the environment needs.
  
**Management directory for your Wazuh infrastructure**

The Wazuh dashboard provides you with a directory dedicated to administrate and monitor your infrastructure. From there, you can manage and configure your Wazuh cluster rules and decoders, and CDB lists. Additionally, agent groups and centralized configuration can be managed and edited through the interface as well.

The Wazuh dashboard runs on top of the indexed content in a Wazuh indexer cluster so users can view and edit the Wazuh manager configuration, and check the status and logs of their Wazuh cluster.


.. raw:: html
    
    <div class="images-rn-420-container">
    <div class="images-rn-420">

.. thumbnail::  ../../images/getting_started/dashboard_administration.png 
      :align: center
      :title: Administration

.. thumbnail::  ../../images/getting_started/dashboard_status.png 
      :align: center
      :title: Status and reports

.. raw:: html

    </div> 



With this component you can manage your agents, their configuration and data inventory. You can also create deployment commands to install and configure new Wazuh agents. 

The Wazuh dashboard also includes an API console for users to interact with the Wazuh API.

- The modules are:
Search alerts classified by modules and filter them using the different views. You will be able to explore the alerts both at Wazuh cluster level, and in a particular agent. The modules are:


    - Security Information Management
        - Security events: Browse through your security alerts, identifying issues and threats in your environment.
        - Integrity monitoring: Alerts related to file changes, including permissions, content, ownership and attributes.
        - Amazon AWS: Security events related to your Amazon AWS services, collected directly via AWS API.
        - Google Cloud Platform: Security events related to your Google Cloud Platform services, collected directly via GCP API.
    - Auditing and Policy Monitoring
        - Policy monitoring: Verify that your systems are configured according to your security policies baseline.
        - Security configuration assessment: Scan your assets as part of a configuration assessment audit.
        - System auditing: Audit users behavior, monitoring command execution and alerting on access to critical files.
        - OpenSCAP: Configuration assessment and automation of compliance monitoring using SCAP checks.
        - CIS-CAT: Configuration assessment using Center of Internet Security scanner and SCAP checks.
    - Threat Detection and Response
        - Vulnerabilities: Discover what applications in your environment are affected by well-known vulnerabilities.
        - MITRE ATT&CK: Security events from the knowledge base of adversary tactics and techniques based on real-world observations.
        - VirusTotal: Alerts resulting from VirusTotal analysis of suspicious files via an integration with their API.
        - Osquery: Osquery can be used to expose an operating system as a high-performance relational database.
        - Docker listener: Monitor and collect the activity from Docker containers such as creation, running, starting, stopping or pausing events.
    - Regulatory Compliance
        - PCI DSS: Global security standard for entities that process, store or transmit payment cardholder data.
        - NIST 800-53: National Institute of Standards and Technology Special Publication 800-53 (NIST 800-53) sets guidelines for federal information systems.
        - GDPR: General Data Protection Regulation (GDPR) sets guidelines for processing of personal data.
        - HIPAA: Health Insurance Portability and Accountability Act of 1996 (HIPAA) provides data privacy and security provisions for safeguarding medical information.
        - TSC: Trust Services Criteria for Security, Availability, Processing Integrity, Confidentiality, and Privacy.
- View and edit the Wazuh manager configuration.
- Manage your ruleset (rules, decoders and CDB lists).
- Manage your groups of agents.
- Check the status and logs of your Wazuh cluster.
- Manage your agents, as well as see their configuration and data inventory. You can also deploy new agents.
- Explore and interact with the Wazuh API through our Dev Tools.
