.. _wazuh_agent_other_linux:

Linux agent
===========================

1. Install development tools and compilers. In Linux this can easily be done using your distribution's package manager:

  a) For RPM-based distributions::

      sudo yum install make gcc 

  If you want to use Auth, also install::

      sudo yum install openssl-devel

  b) For Debian-based distributions::

      sudo apt-get install gcc make libc6-dev

  If you want to use Auth, also install::

      sudo apt-get install libssl-dev


2. Download and extract the latest version::

    curl -Ls https://github.com/wazuh/wazuh/archive/v2.0.0.tar.gz | tar zx

3. Run the *install.sh* script. It will guide you through the installation and compile the source::

    cd wazuh-*
    ./install.sh

4. The script will ask about what kind of installation you want. Type **agent** in order to install a Wazuh agent::

    1- What kind of installation do you want (server, agent, local, hybrid or help)? agent

5. Start the services using this command::

    /var/ossec/bin/ossec-control start
