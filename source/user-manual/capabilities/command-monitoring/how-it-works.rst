.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how the command monitoring configuration works and its configuration in this section of our documentation. 
  
How it works
============

The command monitoring capability works on all endpoints where the Wazuh server or agent is installed. Wazuh uses the Command and the Logcollector modules to run commands on the endpoints and forward the output to the Wazuh server for analysis.

The steps below describe the sequence of actions from when a user configures the command monitoring module to when the Wazuh server generates alerts:

#. The user adds the desired command to the local agent configuration file or remotely through the Wazuh server. You can achieve this configuration by using either the Command or the Logcollector module.

#. The Wazuh agent periodically executes the command on the configured endpoint based on the set frequency or interval.

#. The Wazuh agent monitors the command’s execution and forwards its output to the Wazuh server for analysis.

#. The Wazuh server pre-decodes, decodes, and matches the received logs against predefined rules to generate security alerts. If the logs match the rules, an alert is generated and stored in the ``/var/ossec/logs/alerts/alerts.log`` and ``/var/ossec/logs/alerts/alerts.json`` files on the Wazuh server. The alert is simultaneously displayed on the Wazuh dashboard.

The image below shows the components involved in the command monitoring process.

.. thumbnail:: /images/manual/command-monitoring/command-monitoring.png
  :title: Command monitoring workflow
  :alt: Command monitoring workflow
  :align: center
  :width: 80%
 