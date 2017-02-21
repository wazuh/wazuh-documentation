.. _sources_installation:

Installing from sources
===================================================

This guide describes how to install the manager and API from source code.

Manager
---------------------------------------------------

1. Install development tools and compilers. In Linux this can easily be done using your distribution's package manager:

  a) For RPM-based distributions::

      sudo yum install make gcc git

  If you want to use Auth, also install::

      sudo yum install openssl-devel

  b) For Debian-based distributions::

      sudo apt-get install gcc make git libc6-dev

  If you want to use Auth, also install::

      sudo apt-get install libssl-dev


2. Download and extract the latest version::

    curl -Ls https://github.com/wazuh/wazuh/archive/v2.0.0.tar.gz | tar zx

3. Run the *install.sh* script. It will guide you through the source installation and compilation::

    cd wazuh-*
    ./install.sh

4. The script will ask about what kind of installation you want. Type **server** to install Wazuh Manager::

    1- What kind of installation do you want (server, agent, local, hybrid or help)? server

5. Start the services using this command::

    /var/ossec/bin/ossec-control start

API
---------------------------------------------------

1. NodeJS >= 4.6.1 is required in order to run the Wazuh API. If you do not have NodeJS installed or your version is older than 4.6.1, we recommend you add the official repository as this has more recent versions.

**Debian, Ubuntu, and other Debian-based systems**
::

    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    apt-get install -y nodejs

**Red Hat, CentOS and other RPM-based systems**
::

    curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
    yum -y install nodejs

.. note::
	`Official guide to install NodeJS <https://nodejs.org/en/download/package-manager/>`_.


2. Download and execute the installation script::

    curl -s -o install_api.sh https://raw.githubusercontent.com/wazuh/wazuh-api/master/install_api.sh && bash ./install_api.sh download

3. Python >= 2.7 is required in order to run the API. It is installed by default or included in the official repositories of most Linux distributions. It is possible to set a custom Python path for the API to use, in */var/ossec/api/configuration/config.js*::

    config.python = [
        // Default installation
        {
            bin: "python",
            lib: ""
        },
        // Package 'python27' for CentOS 6
        {
            bin: "/opt/rh/python27/root/usr/bin/python",
            lib: "/opt/rh/python27/root/usr/lib64"
        }
    ];

For CentOS 6 and Red Hat 6, you can install the package *python27*.  It installs Python 2.7 at */opt/rh/python27* in parallel to the older Python version included in the distro:

    a) For CentOS 6::

        yum install -y centos-release-SCL
        yum install -y python27

    b) For RHEL 6::

        yum install python27

        # You may need enable the repository:
        #   yum-config-manager --enable REPOSITORY_NAME

        #   Examples:
        #   yum-config-manager --enable rhui-REGION-rhel-server-rhscl
        #   yum-config-manager --enable rhel-server-rhscl-6-rpms

Filebeat
---------------------------------------------------

While Filebeat can be installed from source (`see this doc <https://github.com/elastic/beats/blob/master/CONTRIBUTING.md>`_), the process is more complex than you may like, and it is beyond the scope of Wazuh documentation.  We recommend installing Filebeat via repository package, and if that is not available, to install it from a binary tarball that should work for any Linux distro.  See more `here <https://www.elastic.co/downloads/beats/filebeat>`_.

In a single-server configuration, you may entirely skip installing Filebeat, since Logstash will be able to read the event/alert data directly from the local filesystem without the assistance of a forwarder.
