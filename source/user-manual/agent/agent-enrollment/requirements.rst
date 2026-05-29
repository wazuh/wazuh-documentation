.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the requirements to ensure the Wazuh agent enrollment is successful.

Requirements
============

Make sure that your environment meets these requirements before you enroll a Wazuh agent:

#. An installed and running Wazuh manager.

#. An installed and running Wazuh agent on the endpoint that you want to enroll.

#. Outbound connectivity from the Wazuh agent to the Wazuh manager services. You can configure the following ports:

   -  1514/TCP for agent communication.
   -  1515/TCP for enrollment through automatic agent request.
   -  55000/TCP for enrollment through the Wazuh manager API.

Supported operating systems
---------------------------

Wazuh 5.0 supports Wazuh agent installation on the following operating systems:

-  Linux:

   -  RHEL / CentOS (AMD64): 6 and later
   -  RHEL / CentOS (ARM64): 7 and later
   -  AlmaLinux: 8 and later
   -  Rocky Linux: 8 and later
   -  Amazon Linux: 1 and later
   -  Debian: 7 and later
   -  Fedora: 41 and later
   -  openSUSE Leap: 15
   -  Oracle Linux: 6 and later
   -  SUSE / SLES: 15
   -  Ubuntu: 18.04 and later

-  macOS: 14 or later
-  Windows: 7 and later
-  Windows Server: 2008 R2 and later

.. note::

   Wazuh 4.x agents can enroll with and connect to Wazuh 5.0 managers.

.. note::

   You can find instructions for installing and enrolling agents in the Wazuh dashboard. Go to **Agents management** > **Summary**, and click **Deploy new agent**.
