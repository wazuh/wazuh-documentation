.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: By installing the Wazuh agent on your AWS EC2 instances, you gain insights and monitor activities within these instances. Learn more in this section of the documentation.

Monitoring AWS instances
========================

By installing the Wazuh agent on your AWS EC2 instances, you gain insights and monitor activities within these instances.

The Wazuh agent runs as a service on an EC2 instance, and collects and forwards system, security and application data to the Wazuh server through an encrypted and authenticated channel.

To install the Wazuh agent on an EC2 instance, follow the instructions available in the :doc:`agent installation guide </installation-guide/wazuh-agent/index>`. The Wazuh agent allows you to monitor your EC2 instance with these capabilities:

-  :doc:`/user-manual/capabilities/log-data-collection/index`
-  :doc:`/user-manual/capabilities/file-integrity/index`
-  :doc:`/user-manual/capabilities/malware-detection/index`
-  :doc:`/user-manual/capabilities/policy-monitoring/index`
-  :doc:`/user-manual/capabilities/system-inventory/index`
-  :doc:`/user-manual/capabilities/vulnerability-detection/index`

To learn more about the different Wazuh capabilities, check out :doc:`this section </user-manual/capabilities/index>`.
