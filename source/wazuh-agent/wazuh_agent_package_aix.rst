.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent on AIX

.. _wazuh_agent_package_aix:

AIX
===

The Wazuh agent for AIX can be downloaded from our :ref:`packages list <packages>` or directly from `here <https://packages.wazuh.com/3.x/aix/wazuh-agent-3.10.2-1.aix.ppc.rpm>`_. You can choose between installation or deployment:

  a) Installation:

    .. code-block:: console

      # rpm -ivh wazuh-agent-3.11.3-1.aix.ppc.rpm

    With this simple installation, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :ref:`user manual<register_agents>`.

  b) Deployment:

    You can automate the agent registration and configuration using variables. It is necessary to define at least the variable ``WAZUH_MANAGER``. The agent will use this value to register and this will be the assigned manager for forwarding events.

    .. code-block:: console

      # WAZUH_MANAGER="10.0.0.2" rpm -ivh wazuh-agent-3.11.3-1.aix.ppc.rpm

    See the following document for additional deployment options: :ref:`deployment variables <deployment_variables_aix>`.

Uninstall
---------

To uninstall the agent:

    .. code-block:: console

      # rpm -e wazuh-agent

There are files marked as configuration files. Due to this designation, the package manager does not remove those files from the filesystem. The complete file removal action is on user's responsibility. It can be done removing the folder ``/var/ossec``.
