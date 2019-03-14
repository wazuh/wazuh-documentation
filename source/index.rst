.. Copyright (C) 2018 Wazuh, Inc.

.. _index:

Welcome to Wazuh
================

.. meta::
  :description: Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.

Wazuh helps you to gain deeper security visibility into your infrastructure by monitoring hosts at an operating system and application level. This solution, based on lightweight multi-platform agents, provides the following capabilities:

.. topic:: File integrity monitoring

    Wazuh monitors the file system, identifying changes in content, permissions, ownership, and attributes of files that you need to keep an eye on.

.. topic:: Intrusion and anomaly detection

    Agents scan the system looking for malware, rootkits or suspicious anomalies. They can detect hidden files, cloaked processes or unregistered network listeners, as well as inconsistencies in system call responses.

.. topic:: Automated log analysis

    Wazuh agents read operating system and application logs, and securely forward them to a central manager for rule-based analysis and storage. The Wazuh rules help make you aware of application or system errors, misconfigurations, attempted and/or successful malicious activities, policy violations and a variety of other security and operational issues.

.. topic:: Policy and compliance monitoring

    Wazuh monitors configuration files to ensure they are compliant with your security policies, standards and/or hardening guides. Agents perform periodic scans to detect applications that are known to be vulnerable, unpatched, or insecurely configured.

This diverse set of capabilities is provided by integrating OSSEC, OpenSCAP and Elastic Stack into a unified solution and simplifying their configuration and management.

Wazuh provides an updated log analysis ruleset and a RESTful API that allows you to monitor the status and configuration of all Wazuh agents.

Wazuh also includes a rich web application (fully integrated as a Kibana app) for mining log analysis alerts and for monitoring and managing your Wazuh infrastructure.

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
