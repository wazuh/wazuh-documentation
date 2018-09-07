.. Copyright (C) 2018 Wazuh, Inc.

.. _azure_monitoring_instances:

Monitoring Instances
====================

In order to have knowledge of what happens in the virtual machines of our infrastructure, we will carry out the installation of a Wazuh agent in those that we want to monitor. 

The Wazuh agent runs on the hosts that you want to monitor (Windows, Linux, Solaris, BSD, and Mac operating systems). It is used to collect different types of system and application data that it forwards to the Wazuh server through an encrypted and authenticated channel. In order to establish this secure channel, a registration process involving unique pre-shared keys is utilized. It is multi-platform and provides the following capabilities:

- log and data collection
- file integrity monitoring
- rootkit and malware detection
- security policy monitoring

In addition, it communicates with the Wazuh manager, sending data in near real-time through an encrypted and authenticated channel.