.. _index:

.. warning::

    You are looking at documentation for an older release. Not what you want? See the `current release documentation <https://documentation.wazuh.com/current>`_.

Welcome to Wazuh
================

Wazuh helps you to gain deeper security visibility into your infrastructure by monitoring hosts at an operating system and application level. This solution, based on lightweight multi-platform agents, provides the following capabilities:

.. topic:: File integrity monitoring

    Wazuh monitors the file system, identifying changes in content, permissions, ownership, and attributes of files that you need to keep an eye on.

.. topic:: Intrusion and anomaly detection

    Agents scan the system looking for malware, rootkits or suspicious anomalies. They can detect hidden files, cloaked processes or unregistered network listeners, as well as inconsistencies in system call responses.

.. topic:: Automated log analysis

    Wazuh agents read operating system and application logs, and securely forward them to a central manager for rule-based analysis and storage. The Wazuh rules help bring to your attention application or system errors, misconfigurations, attempted and/or successful malicious activities, policy violations and a variety of other security and operational issues.

.. topic:: Policy and compliance monitoring

    Wazuh monitors configuration files to ensure they are compliant with your security policies, standards or hardening guides. Agents perform periodic scans to detect applications that are known to be vulnerable, unpatched, or insecurely configured.

This diverse set of capabilities is provided by integrating OSSEC, OpenSCAP and Elastic Stack, making them work together as a unified solution, and simplifying their configuration and management.

Wazuh provides an updated log analysis ruleset, and a RESTful API that allows you to monitor the status and configuration of all Wazuh agents.

Wazuh also includes a rich web application (fully integrated as a Kibana app), for mining log analysis alerts and for monitoring and managing your Wazuh infrastructure.

Example screenshots
-------------------

.. |AGENT_DISCOVER| thumbnail:: images/screenshots/Agent_discover_1024x1024.png
   :title: Agent discover
   :align: center
   :width: 100%
.. |AGENT_OVERVIEW| thumbnail:: images/screenshots/Agent_overview_1024x1024.png
   :title: Agent overview
   :align: center
   :width: 100%
.. |DISCOVER_ALERT| thumbnail:: images/screenshots/Discover_alert_1024x1024.png
   :title: Discover alerts
   :align: center
   :width: 100%
.. |MANAGER_RULESET| thumbnail:: images/screenshots/Manager_ruleset_1024x1024.png
   :title: Log analysis rules
   :align: center
   :width: 100%
.. |OVERVIEW_FIM| thumbnail:: images/screenshots/Overview_fim_1024x1024.png
   :title: Overview file integrity monitoring
   :align: center
   :width: 100%
.. |OVERVIEW_GENERAL| thumbnail:: images/screenshots/Overview_general_1024x1024.png
   :title: Overview alerts
   :align: center
   :width: 100%

==================  ==================  ==================
|OVERVIEW_GENERAL|  |OVERVIEW_FIM|      |MANAGER_RULESET|
|AGENT_DISCOVER|    |AGENT_OVERVIEW|    |DISCOVER_ALERT|
==================  ==================  ==================

Available documentation
-----------------------

.. toctree::
   :maxdepth: 1

   getting-started/index
   installation-guide/index
   user-manual/index
   docker/index
   deploying-with-puppet/index
   pci-dss/index
   amazon/index
   migrating-from-ossec/index

.. note:: If you want to contribute to this documentation or our project please head over to our `Github repositories <https://github.com/wazuh>`_. You can also join our `users mailing list <https://groups.google.com/d/forum/wazuh>`_, by sending an email to ``wazuh+subscribe@googlegroups.com``, to ask questions and participate in discussions.
