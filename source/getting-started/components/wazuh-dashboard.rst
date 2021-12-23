.. Copyright (C) 2021 Wazuh, Inc.

Wazuh dashboard
===============

Wazuh dashboard is a flexible and intuitive web interface for mining, analyzing, and visualizing data. It is also used for the management and monitoring of the Wazuh infrastructure. From the Wazuh dashboard, identity and access management can be controlled by creating and managing users and assigning roles as needed. 

Data visualization, mining, and analysis
----------------------------------------

Wazuh provides out-of-the-box dashboards, allowing you to seamlessly navigate through the user interface. Users can quickly visualize security events, detected vulnerable applications, file integrity monitoring data, configuration assessment results, cloud infrastructure monitoring events, and regulatory compliance, such as PCI DSS, GDPR, CIS, HIPAA, and NIST 800-53 standards.  Users are able to explore the alerts at the Wazuh cluster level and on a specific agent.

Moreover, the application is flexible and allows users to create their own visualizations and dashboards. With Wazuh, customizing data visualization according to the environment needs gets users enhanced visibility of their infrastructure.



.. raw:: html

  <div class="screenshots">
     <div id="another_slider" class="carousel slide" data-ride="carousel" data-interval="2000">
       <div class="carousel-inner">
         <div class="carousel-item active">
            <div class="row">
               <div class="col-12 col-lg-6">

.. thumbnail::  ../../images/getting_started/module_info_management.png 
    :align: center
    :title: Modules directory

.. raw:: html

  </div> 
   <div class="col-12 col-lg-6">


.. thumbnail::  ../../images/getting_started/module_policy.png 
    :align: center
    :title: Modules directory

.. raw:: html

         </div>
         </div>
  </div>

  <div class="carousel-item">
   <div class="row">
      <div class="col-12 col-lg-6">

.. thumbnail::  ../../images/getting_started/module_threat_detection.png 
    :align: center
    :title: Modules directory

.. raw:: html

   </div> 
      <div class="col-12 col-lg-6">

.. thumbnail::  ../../images/getting_started/module_compliance.png 
    :align: center
    :title: Modules directory

.. raw:: html

  </div>
  </div>
  </div>
  </div>
   </div>
   </div>



Monitoring deployed agents
--------------------------

From the Wazuh dashboard, you manage the agents, their configuration, and data inventory. Inspecting the status, statistics, and health of any agent deployed to your system is streamlined with filters for fine-tuning and quick access to data. You can also create deployment commands to install and configure new Wazuh agents. 

Additionally, agent groups and centralized configuration can be managed and edited through the interface as well.



.. thumbnail::  ../../images/getting_started/dashboard_screenshot_agent.png 
      :align: center
      :title: Agent dashboard overview

  

Management of Wazuh infrastructure
----------------------------------

The Wazuh dashboard provides you with a directory dedicated to administrate and monitor your infrastructure. From there, you can manage and configure your Wazuh cluster rules and decoders, and CDB lists. 

Data analysis visualization gives you full visibility into your cluster infrastructure for fast threat detection and remediation. Users can check the status, logs, and statistics of Wazuh clusters and create their own downloadable reports using predefined templates, or personalize their own if required. Wazuh provides the tools for comprehensive and efficient security analytics.


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



Dev tools
---------

User can easily access developer tools integrated directly into the Wazuh dashboard. 

The Ruleset Test tool provides an input box for reading sample logs and an output box to visualize the test results. This feature of the Wazuh dashboard allows you to test sample logs directly on the web user interface and see how the ruleset reacts to specific log messages.

The Wazuh dashboard also includes an API Console for users to interact with the Wazuh API. This API accommodates complete remote management of the Wazuh infrastructure and, from the API Console, you can easily perform everyday actions such as adding agents, restarting components, creating roles, or looking up syscheck details.


.. raw:: html
    
    <div class="images-rn-420-container">
    <div class="images-rn-420">


.. thumbnail::  ../../images/getting_started/dashboard_API_console1.png 
      :align: center
      :title: API Console


.. thumbnail::  ../../images/getting_started/dashboard_API_console2.png 
      :align: center
      :title: API Console


.. raw:: html

    </div> 
