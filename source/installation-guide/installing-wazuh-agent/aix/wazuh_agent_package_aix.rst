.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_agent_package_aix:

AIX from package
================

You can download the `AIX installer <https://packages.wazuh.com/3.x/aix/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_AIX|.aix.ppc.rpm>`_ from our :ref:`packages list <packages>`. You can choose installation or a deployment:

  a) Installation:

    .. code-block:: console

      # rpm -ivh wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_AIX|.aix.ppc.rpm

    With this simple installation, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :ref:`user manual<register_agents>`.

  b) Deployment:

    You can automate the agent registration and configuration using variables. It is necessary to define at least the variable ``WAZUH_MANAGER``. The agent will use this value to register and it will be the assigned manager for forwarding events.

    .. code-block:: console

      # WAZUH_MANAGER="10.0.0.2" rpm -ivh wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_AIX|.aix.ppc.rpm

    See the following document for additional deployment options: :ref:`deployment variables <deployment_variables_aix>`.

Uninstall
---------

To uninstall the agent:

    .. code-block:: console

      # rpm -e wazuh-agent

There are files marked as configuration files. Due to this designation, the package manager doesn't remove those files from the filesystem. The complete files removal action is a user responsibility. It can be done by removing the folder ``/var/ossec``.
