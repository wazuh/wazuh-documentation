.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_agent_linux_deb:

Install Wazuh agent on Debian/Ubuntu
====================================

The DEB packages are suitable for Debian, Ubuntu, and other Debian-based systems.

.. note:: All the commands described below need to be executed with root user privileges.

Adding the Wazuh repository
---------------------------

1. To perform this procedure, the ``curl``, ``apt-transport-https`` and ``lsb-release`` packages must be installed on your system. If they are not already present, install them using the commands below:

  .. code-block:: console

    # apt-get install curl apt-transport-https lsb-release

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

      # apt-get install wazuh-agent
      
    Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :doc:`user manual<../../user-manual/registering/index>`.

  b) Deployment:

    You can automate the agent registration and configuration using variables. It is necessary to define at least the variable ``WAZUH_MANAGER_IP``. The agent will use this value to register and it will be the assigned manager for forwarding events. 

    .. code-block:: console

      # WAZUH_MANAGER_IP="10.0.0.2" apt-get install wazuh-agent  

    See the following document for additional deployment options: :doc:`deployment variables <deployment_variables>`.      

4. **(Optional)** Disable the Wazuh updates:

  We recommend maintaining the Wazuh Manager version greater or equal than Wazuh Agents. If a Wazuh Agent has a greater version, it is possible message sending misunderstandable for the Wazuh Manager caused by some new feature. Because of this, we recommended to disable the Wazuh repository in order to prevent accidental upgrades. To do this, use the following command:

  .. code-block:: console

    # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
    # apt-get update

  .. code-block:: console

    # echo "wazuh-agent hold" | sudo dpkg --set-selections

Alternatively, if you want to download the wazuh-agent package directly, or check the compatible versions, you can do it from :ref:`here <packages>`.