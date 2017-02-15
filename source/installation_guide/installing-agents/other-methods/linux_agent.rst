.. _wazuh_agent_other_linux:

Linux Server
===========================

1. Download and extract the latest version::

    curl -Ls https://github.com/wazuh/wazuh/archive/v1.1.1.tar.gz | tar zx

2. Run the *install.sh* script. It will guide you through the installation and compile the source::

    cd wazuh-*
    ./install.sh

3. The script will ask about what kind of installation you want. Type **agent** in order to install a Wazuh agent::

    1- What kind of installation do you want (server, agent, local, hybrid or help)? agent

4. Start the services using this command::

    /var/ossec/bin/ossec-control start
