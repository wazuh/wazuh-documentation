.. Copyright (C) 2018 Wazuh, Inc.

.. _index:

================
Welcome to Wazuh
================

.. meta::
  :description: Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.

.. rst-class:: row

------------
Capabilities
------------

.. rst-class:: col-12

Wazuh helps you to gain deeper security visibility into your infrastructure by monitoring hosts at an operating system and application level. This solution, based on lightweight multi-platform agents, provides the following capabilities:

.. raw:: html

  <div class="accordion col-12" id="accordion-capabilities">
  <div class="card">
  <div class="card-header" id="fim-header">
  <button class="btn btn-accordion d-none d-sm-inline-block" type="button" data-toggle="collapse" data-target="#collapse-fim" aria-expanded="true" aria-controls="collapse-fim">File integrity monitoring</button>
  <span class="capability-title d-inline-block d-sm-none">File integrity monitoring</span>
  </div> <!-- End of .card-header -->

  <div id="collapse-fim" class="collapse show" aria-labelledby="fim-header" data-parent="#accordion-capabilities">
  <div class="card-body row">
  <div class="card-text col-12 col-md-6">

Wazuh monitors the file system, identifying changes in content, permissions, ownership, and attributes of files that you need to keep an eye on. In addition, it natively identifies users and applications used to create or modify files.

File integrity monitoring capabilities can be used in combination with threat intelligence to identify threats or compromised hosts. In addition, several regulatory compliance standards, such as PCI DSS, require it.

.. raw:: html

  </div> <!-- End of .card-text -->
  <div class="card-image col-12 col-md-6 d-none d-sm-inline-block">

.. image:: images/index_capabilities/wazuh_fileintegrity.png
   :class: d-block w-100

.. raw:: html

  </div> <!-- End of .card-image -->
  </div> <!-- End of .card-body -->
  </div> <!-- End of #collapse-fim -->
  </div> <!-- End of .card -->


  <div class="card">
  <div class="card-header" id="intrusion-header">
  <button class="btn btn-accordion collapsed d-none d-sm-inline-block" type="button" data-toggle="collapse" data-target="#collapse-intrusion" aria-expanded="true" aria-controls="collapse-intrusion">Intrusion and anomaly detection</button>
  <span class="capability-title d-inline-block d-sm-none">Intrusion and anomaly detection</span>
  </div> <!-- End of .card-header -->

  <div id="collapse-intrusion" class="collapse" aria-labelledby="intrusion-header" data-parent="#accordion-capabilities">
  <div class="card-body row">
  <div class="card-text col-12 col-md-6">

Wazuh agents scan the monitored systems looking for malware, rootkits and suspicious anomalies. They can detect hidden files, cloaked processes or unregistered network listeners, as well as inconsistencies in system call responses.

In addition to agent capabilities, the server component uses a signature-based approach to intrusion detection, using its regular expression engine to analyze collected log data and look for indicators of compromise.

.. raw:: html

  </div> <!-- End of .col-12.col-md-6 -->
  <div class="card-image col-12 col-md-6 d-none d-sm-inline-block">

.. image:: images/index_capabilities/wazuh_intrusiondetection.png
   :class: d-block w-100

.. raw:: html

  </div> <!-- End of .col-12.col-md-6 -->
  </div> <!-- End of .card-body -->
  </div> <!-- End of #collapse-intrusion -->
  </div> <!-- End of .card -->


  <div class="card">
  <div class="card-header" id="log-header">
  <button class="btn btn-accordion collapsed d-none d-sm-inline-block" type="button" data-toggle="collapse" data-target="#collapse-log" aria-expanded="true" aria-controls="collapse-log">Automated log analysis</button>
  <span class="capability-title d-inline-block d-sm-none">Automated log analysis</span>
  </div> <!-- End of .card-header -->

  <div id="collapse-log" class="collapse" aria-labelledby="log-header" data-parent="#accordion-capabilities">
  <div class="card-body row">
  <div class="card-text col-12 col-md-6">

Wazuh agents read operating system and application logs, and securely forward them to a central manager for rule-based analysis and storage.

The Wazuh rules help make you aware of application or system errors, misconfigurations, attempted and/or successful malicious activities, policy violations and a variety of other security and operational issues.

.. raw:: html

  </div> <!-- End of .col-12.col-md-6 -->
  <div class="card-image col-12 col-md-6 d-none d-sm-inline-block">

.. image:: images/index_capabilities/wazuh_logdataanalysis.png
   :class: d-block w-100

.. raw:: html

  </div> <!-- End of .col-12.col-md-6 -->
  </div> <!-- End of .card-body -->
  </div> <!-- End of #collapse-log -->
  </div> <!-- End of .card -->


  <div class="card">
  <div class="card-header" id="configuration-header">
  <button class="btn btn-accordion collapsed d-none d-sm-inline-block" type="button" data-toggle="collapse" data-target="#collapse-configuration" aria-expanded="true" aria-controls="collapse-configuration">Policy and compliance monitoring</button>
  <span class="capability-title d-inline-block d-sm-none">Policy and compliance monitoring</span>
  </div> <!-- End of .card-header -->

  <div id="collapse-configuration" class="collapse" aria-labelledby="configuration-header" data-parent="#accordion-capabilities">
  <div class="card-body row">
  <div class="card-text col-12 col-md-6">

Wazuh monitors system and application configuration settings to ensure they are compliant with your security policies, standards and/or hardening guides. Agents perform periodic scans to detect applications that are known to be vulnerable, unpatched, or insecurely configured.

Additionally, configuration checks can be customized, tailoring them to properly align with your organization. Alerts include recommendations for better configuration, references and mapping with regulatory compliance.

.. raw:: html

  </div> <!-- End of .col-12.col-md-6 -->
  <div class="card-image col-12 col-md-6 d-none d-sm-inline-block">

.. image:: images/index_capabilities/wazuh_configuration.png
   :class: d-block w-100

.. raw:: html

  </div> <!-- End of .col-12.col-md-6 -->
  </div> <!-- End of .card-body -->
  </div> <!-- End of #collapse-configuration -->
  </div> <!-- End of .card -->
  </div> <!-- End of #accordion-capabilities -->

.. rst-class:: col-12

  This diverse set of capabilities is provided by integrating OSSEC, OpenSCAP and Elastic Stack into a unified solution and simplifying their configuration and management.

  Wazuh provides an updated log analysis ruleset and a RESTful API that allows you to monitor the status and configuration of all Wazuh agents.

  Wazuh also includes a rich web application (fully integrated as a Kibana app) for mining log analysis alerts and for monitoring and managing your Wazuh infrastructure.

-----------
Screenshots
-----------

.. raw:: html

  <div id="carouselWazuhDocu" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
  <div class="carousel-item active">

.. image:: images/kibana-app/showcase/extensions.png
   :class: d-block w-100

.. raw:: html

  </div>
  <div class="carousel-item">

.. image:: images/kibana-app/showcase/agents-general.png
   :class: d-block w-100

.. raw:: html

  </div>
  <div class="carousel-item">

.. image:: images/kibana-app/showcase/discover.png
   :class: d-block w-100

.. raw:: html

  </div>
  <div class="carousel-item">

.. image:: images/kibana-app/showcase/ruleset.png
   :class: d-block w-100

.. raw:: html

  </div>
  <div class="carousel-item">

.. image:: images/kibana-app/showcase/overview-fim.png
   :class: d-block w-100

.. raw:: html

  </div>
  <div class="carousel-item">

.. image:: images/kibana-app/showcase/overview-general.png
   :class: d-block w-100

.. raw:: html

  </div>
  <a class="carousel-control-prev" href="#carouselWazuhDocu" role="button" data-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselWazuhDocu" role="button" data-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="sr-only">Next</span>
  </a>
  </div>
  </div>

-----------------------
Available documentation
-----------------------

.. toctree::
   :maxdepth: 1

   getting-started/index
   installation-guide/index
   user-manual/index
   development/index
   docker/index
   deploying-with-puppet/index
   deploying-with-ansible/index
   pci-dss/index
   gdpr/index
   amazon/index
   azure/index
   docker-monitor/index
   installing-splunk/index
   migrating-from-ossec/index
   release-notes/index
