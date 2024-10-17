.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn more about how the agentless monitoring of Wazuh works in this section of our documentation. 

How it works
============

To monitor endpoints without an agent, Wazuh requires an SSH connection between the Wazuh server and the endpoints to be monitored. These endpoints can range from network devices, such as firewalls and routers, to computers. After a connection is established between the Wazuh manager and the monitored endpoint, the Wazuh agentless monitoring module can perform the following actions:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Monitor files, directories, or configuration of an endpoint
-----------------------------------------------------------

You can configure the Wazuh agentless monitoring module to monitor files and directories on SSH-accessible endpoints and configurations of network devices such as firewalls and routers. If there is a change to the monitored files and directories or the configuration of the network devices, an alert is triggered and this can be viewed on the Wazuh dashboard.

Run commands on an endpoint
---------------------------

You can specify commands to be run periodically on a monitored endpoint and track their output with the Wazuh agentless monitoring module. When the output of these commands changes, the module detects the change and triggers alerts that can be viewed on the Wazuh dashboard.
