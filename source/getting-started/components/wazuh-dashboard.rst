.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_dashboard:

[WIP] Wazuh dashboard
=====================

The Wazuh dashboard is a flexible and intuitive web interface for mining, analyzing, and visualizing data. It is also used for management and monitoring of the Wazuh infrastructure. 

Modules directory for data visualization, mining, and analysis
-------------------------------------------------------------- 
You can search alerts classified by modules and filter them using the different views. You will be able to explore the alerts both at Wazuh cluster level, and in a particular agent. The Wazuh dashboard includes a *Modules directory* and out-of-the-box dashboards for Security information management, Auditing and Policy Monitoring, Threat Detection and Response, and Regulatory Compliance. 

Users can navigate and visualize security events, detected vulnerable applications, file integrity monitoring data, configuration assessment results, cloud infrastructure monitoring events, regulatory compliance, such as PCI DSS, GDPR, CIS, HIPAA, and NIST 800-53 standards, as well as use the Wazuh dashboard for other data visibility purposes.

Moreover, the Wazuh dashboard is flexible. This component provides enhanced visibility of your infrastructure by allowing you to create visualizations and dashboards according to the environment needs.




.. raw:: html

  </div>

.. raw:: html

  <div class="screenshots">
     <div id="another_slider" class="carousel slide" data-ride="carousel">
       <div class="carousel-inner">
         <div class="carousel-item active">


         
.. raw:: html
    
  <div class="images-rn-420-container">
  <div class="images-rn-420">

.. thumbnail::  ../../images/getting_started/dashboard_modules_infomanagement.png 
    :align: center
    :title: Modules directory

.. thumbnail::  ../../images/getting_started/dashboard_modules_auditing_and_policy.png 
    :align: center
    :title: Modules directory

.. raw:: html

  </div> 


.. raw:: html
    
  <div class="images-rn-420-container">
  <div class="images-rn-420">

.. thumbnail::  ../../images/getting_started/dashboard_modules_threat_detection.png 
    :align: center
    :title: Modules directory

.. thumbnail::  ../../images/getting_started/dashboard_modules_compliance.png 
    :align: center
    :title: Modules directory

.. raw:: html

  </div> 


.. raw:: html

          </div>

          <a class="carousel-control-prev" href="#another_slider" role="button" data-slide="prev">
            <span class="fas fa-angle-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#another_slider" role="button" data-slide="next">
            <span class="fas fa-angle-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>

        </div>
      </div>

.. raw:: html

   </div>



.. raw:: html

   </div></div>




Management directory of Wazuh infrastructure
----------------------------------------------

The Wazuh dashboard provides you with a directory dedicated to administrate and monitor your infrastructure. From there, you can manage and configure your Wazuh cluster rules and decoders, and CDB lists. The component runs on top of the indexed content in a Wazuh indexer cluster so users can view and edit the Wazuh manager configuration. Additionally, agent groups and centralized configuration can be managed and edited through the interface as well. Identity and access management can be controlled through the web interface, where you can create and manage users, and assign roles as needed.

Data analysis visualization gives you full visibility into your cluster infrastructure for fast threat detection and remediation. Users can check the status, logs, and statistics of Wazuh clusters and create their own downloadable reports using predefined templates, or personalize their own if required. Wazuh provides the tools for comprehensive and streamlined security analytics.


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



 

Monitoring deployed agents
--------------------------


From the web interface you manage your agents, their configuration, and data inventory. Inspecting the status of any agent deployed to your system is streamlined with filters for fine-tuning and quick access to data. You can also create deployment commands to install and configure new Wazuh agents. 



Dev tools
---------

The Wazuh dashboard also includes an API console for users to interact with the Wazuh API through the Wazuh API Console. The Wazuh API accommodates complete remote management of the Wazuh infrastructure and, from the API Console, you can easily perform everyday actions such as adding agents, restarting components, or looking up syscheck details.

Additionally, the Wazuh dashboard provides you with the Ruleset Test tool used by the system to detect attacks, intrusions, software misuse, configuration problems, application errors, malware, rootkits, system anomalies, or security policy violations.

The new Ruleset Test tool also integrates an input box for reading sample logs and an output box to visualize the test results. This feature of the Wazuh dashboard allows you to test sample logs directly on the Wazuh user interface and see how the ruleset reacts to specific log messages.