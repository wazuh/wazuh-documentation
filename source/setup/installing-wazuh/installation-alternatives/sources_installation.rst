.. _sources_installation:

Installing Wazuh from source code
===================================================

This guide replaces only the part of *Install Wazuh manager (deb/rpm)* of :ref:`Installation via packages <installation_main>`.

Wazuh Manager
---------------------------------------------------

1. Download and extract the latest version::

    curl -Ls https://github.com/wazuh/wazuh/archive/v1.1.1.tar.gz | tar zx

2. Run the *install.sh* script. It will guide you through the installation and compile the source::

    cd wazuh-*
    ./install.sh

3. The script will ask about what kind of installation you want to install. Type **server** in order to install Wazuh Manager::

    1- What kind of installation do you want (server, agent, local, hybrid or help)? server

4. Start the services using this command::

    /var/ossec/bin/ossec-control start

Wazuh API
---------------------------------------------------

1. Download and extract the latest version::

    curl -Ls https://github.com/wazuh/wazuh-api/archive/v1.2.1.tar.gz | tar zx

2. Run the *install.sh* script. It will guide you through the installation::

    cd wazuh-api-*
    ./install_api.sh

3. Start the services using this command::

    Systemd systems: systemctl start wazuh-api
    SysVinit systems: service wazuh-api start
