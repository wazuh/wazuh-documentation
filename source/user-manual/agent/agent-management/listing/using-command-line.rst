.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The agent_control tool allows for the retrieval of a list of the available Wazuh agents. Learn more in this section of the documentation.

Listing agents using the CLI
----------------------------

The ``/var/ossec/bin/agent_control`` tool on the Wazuh server, used with ``-l`` option, allows for the retrieval of a list of the available Wazuh agents:

.. code-block:: console

   # /var/ossec/bin/agent_control -l

.. code-block:: none
   :class: output

   Wazuh agent_control. List of available agents:
      ID: 000, Name: vpc-ossec-manager (server), IP: 127.0.0.1, Active/Local
      ID: 1040, Name: ip-10-0-0-76, IP: 10.0.0.76, Active
      ID: 003, Name: vpc-agent-debian, IP: 10.0.0.121, Active
      ID: 005, Name: vpc-agent-ubuntu-public, IP: 10.0.0.126, Active
      ID: 006, Name: vpc-agent-windows, IP: 10.0.0.124, Active
      ID: 1024, Name: ip-10-0-0-252, IP: 10.0.0.252, Never connected
      ID: 1028, Name: vpc-debian-it, IP: any, Never connected
      ID: 1030, Name: diamorphine-POC, IP: 10.0.0.59, Active
      ID: 015, Name: vpc-agent-centos, IP: 10.0.0.123, Active
      ID: 1031, Name: WIN-UENN0U6R5SF, IP: 10.0.0.124, Never connected
      ID: 1032, Name: vpc-agent-ubuntu, IP: 10.0.0.122, Active
      ID: 1033, Name: vpc-agent-debian8, IP: 10.0.0.128, Active
      ID: 1034, Name: vpc-agent-redhat, IP: 10.0.0.127, Active
      ID: 1035, Name: vpc-agent-centos7, IP: 10.0.0.101, Never connected
      ID: 1041, Name: vpc-agent-centos-public, IP: 10.0.0.125, Active

   List of agentless devices:
      ID: 010, Name: agentless-ubuntu, IP: 10.0.0.135, Active
