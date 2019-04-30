.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_agent_aix:

Install Wazuh agent on AIX
==============================

The Wazuh agent for AIX can be downloaded from our :doc:`packages list<../packages-list/index>`. You can choose a only installation or an installation with a registration / configuration included:

  a) Only installation:

    .. code-block:: console

      # rpm -ivh wazuh-agent-3.9.0-1.aix.ppc.rpm

    .. note:: With Only installation, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the :doc:`user manual<../../user-manual/agents/registering/index>`.

  b) Installation with a registration / configuration included:

    You can automate the agent registration and configuration using environment variables. 

    .. code-block:: console

      # WAZUH_MANAGER_IP="192.168.1.2" rpm -ivh wazuh-agent-3.9.0-1.aix.ppc.rpm  

    .. note:: See the following document for additional registering and configuration options: :doc:`Automated registering and configuration variables <automated_reg-config_variables>`.   


