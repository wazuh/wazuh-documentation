.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how the agentless monitoring of Wazuh works: connection, monitoring, checking the setup, and alert. 
  
How it works
============

To monitor endpoints without an agent, Wazuh requires an SSH connection between the Wazuh server and the endpoint to be monitored. The Wazuh agentless monitoring module can perform the following actions:

- Monitor files, directories, or configuration of an endpoint
- Run commands on an endpoint

.. _monitor-files-directories-configuration-endpoint:

Monitor files, directories, or configuration of an endpoint 
-----------------------------------------------------------

You can configure the Wazuh agentless monitoring module to monitor files, directories, and Cisco PIX firewall and router configurations. If there is a change to the monitored files and directories or the configuration of the firewall or router, this triggers an alert.

.. _run-commands-endpoint:

Run commands on an endpoint
---------------------------

You can specify commands to be run on the monitored endpoint, and the agentless monitoring module detects the output of these commands. When the output of executed commands changes, it detects them and triggers an alert.

