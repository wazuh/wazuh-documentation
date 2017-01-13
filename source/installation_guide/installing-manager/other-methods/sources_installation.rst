.. _sources_installation:

Installing from sources
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

1. It is required NodeJS >= 4.6.1 in order to run the API. If you do not have installed NodeJS or your version is older than 4.6.1, we recommend to add the official repositories because they have more recent versions. Also, it is required the *pip* package.

**Debian, Ubuntu, and other Debian-based systems**
::

    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    apt-get install -y nodejs

    apt-get install -y python-pip

**Red Hat, CentOS and other RPM-based systems**
::

    curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
    yum -y install nodejs

    yum install -y python-pip

.. note::
	`Official guide to install NodeJS <https://nodejs.org/en/download/package-manager/>`_.


2. Download and execute the installation script::

    curl -s -o install_api.sh https://raw.githubusercontent.com/wazuh/wazuh-api/master/install_api.sh && bash ./install_api.sh download
