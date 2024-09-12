.. Copyright (C) 2020 Wazuh, Inc.

.. _wazuh_agent_package_debian7_or_greater:

Debian from package
===================

The DEB package is suitable for Debian 7 or greater. For other operating systems or Linux distributions, please check the list: :ref:`Install Wazuh agent <installation_agents>`.

.. note:: All the commands described below need to be executed with root user privileges.

Adding the Wazuh repository
---------------------------

1. To perform this procedure, the ``curl``, ``apt-transport-https`` and ``lsb-release`` packages must be installed on your system. If they are not already present, install them using the commands below:

  .. code-block:: console

    # apt-get install curl apt-transport-https lsb-release gnupg2 procps

2. Install the Wazuh repository GPG key:

  .. code-block:: console

    # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -

3. Add the repository:

  .. code-block:: console

    # echo "deb https://packages.wazuh.com/3.x/apt/ stable main" | tee /etc/apt/sources.list.d/wazuh.list

4. Update the package information:

  .. code-block:: console

    # apt-get update

Installing Wazuh agent
----------------------

1. On your terminal, install the Wazuh agent. You can choose installation or deployment:

  a) Installation:

    .. code-block:: console

      # apt-get install wazuh-agent=|WAZUH_LATEST|-|WAZUH_REVISION_DEB_AGENT_X86|

    Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :ref:`user manual<register_agents>`.

  b) Deployment:

    You can automate the agent registration and configuration using variables. It is necessary to define at least the variable ``WAZUH_MANAGER``. The agent will use this value to register and it will be the assigned manager for forwarding events.

    .. code-block:: console

      # WAZUH_MANAGER="10.0.0.2" apt-get install wazuh-agent=|WAZUH_LATEST|-|WAZUH_REVISION_DEB_AGENT_X86|

    See the following document for additional deployment options: :ref:`deployment variables <deployment_variables_apt>`.

2. **(Optional)** Disable the Wazuh updates:

  We recommend maintaining the Wazuh manager version greater or equal to that of the Wazuh agents. As a result, we recommended disabling the Wazuh repository in order to prevent accidental upgrades. To do this, use the following command:

  .. code-block:: console

    # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
    # apt-get update

Alternatively, if you want to download the wazuh-agent package directly, or check the compatible versions, you can do it from :ref:`here <packages>`.

Uninstall
---------

To uninstall the agent:

    .. code-block:: console

      # apt-get remove wazuh-agent

There are files marked as configuration files. Due to this designation, the package manager doesn't remove those files from the filesystem. The complete files removal action can be done using the following command:

    .. code-block:: console

      # apt-get remove --purge wazuh-agent
