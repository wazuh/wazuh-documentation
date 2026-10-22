.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Installing the Wazuh agent on your AWS EC2 instances gives you insights into and monitors activity within those instances.

Monitoring AWS instances
========================

By installing the Wazuh agent on your AWS EC2 instances, you gain insights and monitor activities within these instances.

The Wazuh agent runs as a service on an EC2 instance. It collects system, security, and application data and forwards it to the Wazuh manager through an encrypted and authenticated channel.

To install the Wazuh agent on an EC2 instance, follow the instructions available in the :doc:`agent installation guide </installation-guide/wazuh-agent/index>`. The Wazuh agent provides several capabilities for monitoring your EC2 instance, including:

-  :doc:`Log data collection </user-manual/capabilities/log-data-collection/index>`
-  :doc:`File integrity monitoring </user-manual/capabilities/file-integrity/index>`
-  :doc:`Security Configuration Assessment </user-manual/capabilities/sec-config-assessment/index>`
-  :doc:`System inventory </user-manual/capabilities/system-inventory/index>`
-  :doc:`Vulnerability detection </user-manual/capabilities/vulnerability-detection/index>`

For more information about these and other Wazuh capabilities, see the :doc:`Wazuh capabilities </user-manual/capabilities/index>` documentation.
