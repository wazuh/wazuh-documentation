.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_agent_deb:

Install Wazuh agent with DEB packages
=====================================

The DEB packages are suitable for Debian, Ubuntu, and other Debian-based systems.

.. note:: All the commands described below need to be executed with root user privileges.

Installing Wazuh agent
----------------------

1. To perform this procedure, the ``curl``, ``apt-transport-https`` and ``lsb-release`` packages must be installed on your system. If they are not already present, install them using the commands below:

  .. code-block:: console

    # apt-get install curl apt-transport-https lsb-release

2. Add the repository:

  .. code-block:: console

    # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add - \
    echo "deb https://packages.wazuh.com/3.x/apt/ stable main" | tee /etc/apt/sources.list.d/wazuh.list \
    apt-get update

3. On your terminal, install the Wazuh agent. You can choose only installation or an installation with a registration / configuration included:

  a) Only installation:

    .. code-block:: console

      # apt-get install wazuh-agent
      
    .. note:: Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the :doc:`user manual<../../user-manual/registering/index>`.

  b) Installation with a registration / configuration included:

    You can automate the agent registration and configuration using variables. 

    .. code-block:: console

      # WAZUH_MANAGER_IP="10.0.0.2" apt-get install wazuh-agent  

    .. note:: See the following document for additional automated deployment options: :doc:`automated deployment variables <automated_deployment_variables>`.      

4. (Optional) Disable the Wazuh updates:

  It is recommended that the Wazuh repository be disabled in order to prevent accidental upgrades. To do this, use the following command:

  .. code-block:: console

    # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
    # apt-get update

  Alternately, you can set the package state to ``hold``, which will stop updates (although you can still upgrade it manually using ``apt-get install``).

  .. code-block:: console

    # echo "wazuh-agent hold" | sudo dpkg --set-selections

Alternatively, if you want to download the wazuh-agent package directly, or check the compatible versions, you can do it from :ref:`here <packages>`.