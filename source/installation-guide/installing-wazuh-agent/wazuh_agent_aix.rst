.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_agent_aix:

Install Wazuh agent on AIX
==========================

The Wazuh agent for AIX can be downloaded from our :doc:`packages list<../packages-list/index>`. You can choose installation or a deployment:

  a) Installation:

    .. code-block:: console

      # rpm -ivh wazuh-agent-3.9.0-1.aix.ppc.rpm

    With this simple installation, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :doc:`user manual<../../user-manual/registering/index>`.

  b) Deployment:

    You can automate the agent registration and configuration using variables. It is necessary to define at least the variable ``WAZUH_MANAGER_IP``. The agent will use this value to register and it will be the assigned manager for forwarding events. 

    .. code-block:: console

      # WAZUH_MANAGER_IP="10.0.0.2" rpm -ivh wazuh-agent-3.9.0-1.aix.ppc.rpm  

    See the following document for additional deployment options: :doc:`deployment variables <deployment_variables>`.   

