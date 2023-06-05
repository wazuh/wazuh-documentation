.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Agentless monitoring allows you to monitor devices or systems with no agent via SSH. Learn how it works and its configuration in this section.

.. _manual_agentless:

Agentless monitoring
====================

The Wazuh server analyzes the data it receives from the Wazuh agents to monitor, detect, and trigger alerts for security events and incidents on endpoints. However, some endpoints may have limitations that prevent the installation of the Wazuh agent. Wazuh solves this problem by using the agentless monitoring capability.

Agentless monitoring refers to a type of endpoint monitoring that does not require the installation of an agent or software. This approach uses existing protocols to access and gather information from the monitored endpoint. 

The Wazuh agentless monitoring capability uses the SSH (Secure Shell) protocol to collect and transfer events from endpoints to the Wazuh server. The supported platforms include routers, firewalls, switches, and Linux/BSD systems. It allows endpoints with software installation restrictions to meet security and compliance requirements.

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        how-it-works
        agentless-configuration
        visualization
        use-cases
