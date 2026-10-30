.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the requirements to ensure the Wazuh agent enrollment is successful.

Requirements
============

Make sure that your environment meets these requirements before you enroll a Wazuh agent:

#. An installed and running Wazuh manager.

#. An installed and running Wazuh agent on the endpoint that you want to enroll.

#. Outbound connectivity from the Wazuh agent to the Wazuh manager services. The ports required depend on the agent version:

   -  Wazuh 5.0 agents: 1517/TCP (HTTPS) for both enrollment and ongoing agent communication.
   -  Wazuh 4.x agents:

      -  1514/TCP for agent communication.
      -  1515/TCP for enrollment via agent configuration.

   -  55000/TCP for enrollment through the Wazuh manager API (both agent versions). Only the master node serves the Wazuh manager API.

.. note::

   On the Wazuh manager, the 1517 and 1514 listeners are bound to 0.0.0.0 by default and accept connections from any address. If you restricted them to local connections with ``<bind_addr>127.0.0.1</bind_addr>`` (for ``<https>``) or ``<local_ip>127.0.0.1</local_ip>`` (for ``<legacy>``) in ``wazuh-manager.conf``, set them back to ``0.0.0.0`` to accept Wazuh agents from other endpoints.

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

   Wazuh 4.x agents can enroll with and connect to Wazuh 5.0 managers. However, some agent-side components are not fully supported until the agent is upgraded to Wazuh 5.0. This affects File Integrity Monitoring (FIM), Security Configuration Assessment (SCA), System Inventory, Active Response, and Vulnerability Detection.

   We recommend upgrading Wazuh 4.x agents to Wazuh 5.0 after enrollment to ensure full compatibility with Wazuh 5.0 functionality. For more information, see :ref:`Upgrade agents remotely <upgrade_agents_remotely>`.


.. note::

   You can find instructions for installing and enrolling agents in the Wazuh dashboard. Go to **Agents management** > **Summary**, and click **Deploy new agent**.
