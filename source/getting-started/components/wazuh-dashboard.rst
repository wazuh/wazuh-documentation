.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Wazuh dashboard is a flexible and intuitive web interface for mining, analyzing, and visualizing data.

.. _wazuh_dashboard:

Wazuh dashboard
===============

The Wazuh dashboard is a flexible and intuitive web interface for mining, analyzing, and visualizing data. It is also used for the management and monitoring of the Wazuh infrastructure. System managers can create and manage users, as well as assign roles, from the Wazuh dashboard.

Data visualization, mining, and analysis
----------------------------------------

Wazuh provides out-of-the-box dashboards, allowing you to easily navigate the user interface. It enables users to visualize security events, detect vulnerable applications, file integrity monitoring data, configuration assessment results, and cloud infrastructure monitoring events. Users can also explore the alerts at the Wazuh cluster level on a specific agent and work with regulatory compliance data, such as PCI DSS, GDPR, CIS, HIPAA, and NIST 800-53 standards.

Moreover, the application is flexible and allows users to create their own visualizations and dashboards. With Wazuh data visualization customization, users get enhanced infrastructure visibility according to the environment's needs.


.. raw:: html

  <div class="screenshots">
     <div id="another_slider" class="carousel slide" data-ride="carousel" data-interval="2000">
       <div class="carousel-inner">
         <div class="carousel-item active">
            <div class="row">
               <div class="col-12 col-lg-6">

.. thumbnail::  /images/getting-started/module_info_management.png 
    :align: center
    :title: Modules directory

.. raw:: html

  </div> 
   <div class="col-12 col-lg-6">


.. thumbnail::  /images/getting-started/module_policy.png 
    :align: center
    :title: Modules directory

.. raw:: html

         </div>
         </div>
  </div>

  <div class="carousel-item">
   <div class="row">
      <div class="col-12 col-lg-6">

.. thumbnail::  /images/getting-started/module_threat_detection.png 
    :align: center
    :title: Modules directory

.. raw:: html

   </div> 
      <div class="col-12 col-lg-6">

.. thumbnail::  /images/getting-started/module_compliance.png 
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

Users are able to manage the agents, their configuration, and data inventory from the Wazuh dashboard. Inspecting the status, statistics, and health of any agent deployed to your system is streamlined with filters for fine-tuning and quick access to data. You can also create deployment commands to install and configure new Wazuh agents.

Additionally, agent groups and centralized configuration can be managed and edited through the interface.


.. thumbnail::  /images/getting-started/dashboard_screenshot_agent.png 
      :align: center
      :title: Agent dashboard overview

  

Management of Wazuh infrastructure
----------------------------------

The Wazuh dashboard provides a directory dedicated to monitoring and administering your infrastructure. You can manage and configure your Wazuh cluster rules, decoders, and CDB lists. 

Data analysis visualization gives you full visibility into your cluster infrastructure for fast threat detection and remediation. Users can check the status, logs, and statistics of Wazuh clusters and create their own downloadable reports using predefined templates, or personalize their own if required. Wazuh provides the tools for comprehensive and efficient security analytics.


.. hlist::
    :columns: 2


    - .. thumbnail::  /images/getting-started/dashboard_administration.png 
        :align: center
        :title: Administration

    - .. thumbnail::  /images/getting-started/dashboard_status.png 
        :align: center
        :title: Status and reports


Dev tools
---------

Users can easily access developer tools integrated directly into the Wazuh dashboard. 

The Ruleset Test tool provides an input box for reading sample logs and an output box to visualize the test results. This feature of the Wazuh dashboard allows you to test sample logs directly on the web user interface and see how the ruleset reacts to specific log messages.

.. thumbnail::  /images/getting-started/dashboard_ruleset_test.png 
      :align: center
      :title: Ruleset test


The Wazuh dashboard also includes an API Console for users to interact with the Wazuh API. This API accommodates complete remote management of the Wazuh infrastructure. You can easily perform everyday actions from the API Console, such as adding agents, restarting components, creating roles, or looking up syscheck details.


.. hlist::
    :columns: 2


    - .. thumbnail::  /images/getting-started/dashboard_API_console1.png 
            :align: center
            :title: API Console


    - .. thumbnail::  /images/getting-started/dashboard_API_console2.png 
            :align: center
            :title: API Console
