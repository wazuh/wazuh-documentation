.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out how to increase the security of AWS infrastructures by using Wazuh capabilities to monitor AWS instances with Wazuh.
  
.. _amazon_instances:

Monitoring AWS instances
========================

Installing the Wazuh agent on the AWS EC2 instances provides information and monitoring about what's going on inside of them.

The agent runs as a service on the instance and collects different types of system and application data that forwards to the Wazuh manager through an encrypted and authenticated channel.

Thanks to the Wazuh agent, there are some capabilities available to monitor the instances:

-  :doc:`Log data collection </user-manual/capabilities/log-data-collection/index>`
-  :doc:`File integrity monitoring </user-manual/capabilities/file-integrity/index>`
-  :doc:`/user-manual/capabilities/malware-detection/index`
-  Security policy monitoring
-  :doc:`System inventory </user-manual/capabilities/system-inventory/index>`
-  :doc:`Vulnerability detection </user-manual/capabilities/vulnerability-detection/index>`

To learn more about the different Wazuh capabilities, check out :doc:`this section </user-manual/index>`.

.. note::
  To install the Wazuh agent, follow the instructions available in the :doc:`agent installation guide </installation-guide/wazuh-agent/index>`.
