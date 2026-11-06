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

   -  55000/TCP only if you enroll agents through the Wazuh manager API, or for agents with anti-tampering that remove themselves. Wazuh 5.x agents enroll and connect on 1517/TCP. Only the master node serves the Wazuh manager API.

.. note::

   On the Wazuh manager, the 1517 and 1514 listeners are bound to 0.0.0.0 by default and accept connections from any address. If you restricted them to local connections with ``<bind_addr>127.0.0.1</bind_addr>`` (for ``<https>``) or ``<local_ip>127.0.0.1</local_ip>`` (for ``<legacy>``) in ``wazuh-manager.conf``, set them back to ``0.0.0.0`` to accept Wazuh agents from other endpoints.

Supported operating systems
---------------------------

Wazuh 5.0 supports Wazuh agent installation on the following operating systems:

-  Linux:

   -  AlmaLinux: 8, 9, 10
   -  Amazon Linux: 2, 2023
   -  CentOS: 7
   -  CentOS Stream: 8, 9, 10
   -  Debian: 10, 11, 12, 13
   -  Fedora: 42, 43, 44, 45
   -  openSUSE Leap: 15, 16
   -  Oracle Linux: 7 (x86_64 only), 8, 9, 10
   -  Red Hat Enterprise Linux: 7 (x86_64 only), 8, 9, 10
   -  Rocky Linux: 8, 9, 10
   -  SUSE Linux Enterprise Server: 15, 16
   -  Ubuntu: 20.04, 22.04, 24.04, 26.04

-  macOS: 15, 26 (Intel and Apple silicon), 27 (Apple silicon only)
-  Windows: 10, 11 (x86_64)
-  Windows Server: 2012 R2, 2016, 2019, 2022, 2025 (x86_64)

Linux packages are available for x86_64 and aarch64 unless stated otherwise.

.. note::

   The Wazuh agent might also install on Red Hat Enterprise Linux 6, Red Hat Enterprise Linux 7 (aarch64), CentOS 6 and 8, Oracle Linux 6, Amazon Linux 1, Debian 7, 8, and 9, Windows 7 and 8, Windows 11 (ARM64), and Windows Server 2008 R2. Wazuh doesn't test these versions, and some capabilities might not work on them.

.. note::

   Wazuh 4.x agents can enroll with and connect to Wazuh 5.0 managers. However, some agent-side components are not fully supported until the agent is upgraded to Wazuh 5.0. This affects File Integrity Monitoring (FIM), Security Configuration Assessment (SCA), System Inventory, Active Response, and Vulnerability Detection.

   We recommend upgrading Wazuh 4.x agents to Wazuh 5.0 after enrollment to ensure full compatibility with Wazuh 5.0 functionality. For more information, see :ref:`Upgrade agents remotely <upgrade_agents_remotely>`.


.. note::

   You can find instructions for installing and enrolling agents in the Wazuh dashboard. Go to **Agents management** > **Summary**, and click **Deploy new agent**.
