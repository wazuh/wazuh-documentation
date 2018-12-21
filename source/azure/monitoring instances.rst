.. Copyright (C) 2018 Wazuh, Inc.

.. _azure_monitoring_instances:

.. meta::
  :description: Discover the numerous ways that Wazuh provides to monitor your Microsoft Azure instances.

Monitoring Instances
====================

In order to know what happens on the virtual machines of our infrastructure, we will carry out the installation of the Wazuh agent in those we want to monitor.

The Wazuh agent runs on the hosts that you want to monitor (Windows, Linux, Solaris, BSD and macOS operating systems). It is used to collect different types of system and application data that forwards to the Wazuh server through an encrypted and authenticated channel. In order to establish this secure channel, a registration process involving unique pre-shared keys is utilized.

The Wazuh agent is multiplatform and provides the following capabilities:

- Log data collection
- File integrity monitoring
- Rootkit and malware detection
- Security policy monitoring

.. note:: You can find instructions to install the Wazuh agent on different Operating Systems in :ref:`this section <installation_agents>`.
