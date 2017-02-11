.. _sources_installation:

Installing from sources
===================================================

This guide replaces only the section "*Install Wazuh manager (deb/rpm)*" on :ref:`Installation via packages <installation_main>`.

Wazuh Manager
---------------------------------------------------

1. Install development tools and compilers. In Linux this can easily be done using your distribution packages manager:

  a) For RPM based distributions::

      sudo yum install make gcc git

  If you want to use Auth, also install::

      sudo yum instal openssl-devel

  b) For Debian based distributions::

      sudo apt-get install gcc make git libc6-dev

  If you want to use Auth, also install::

      sudo apt-get install libssl-dev


2. Download and extract the latest version::

    curl -Ls https://github.com/wazuh/wazuh/archive/v1.1.1.tar.gz | tar zx

3. Run the *install.sh* script. It will guide you through the source installation and compilation::

    cd wazuh-*
    ./install.sh

4. The script will ask about what kind of installation you want. Type **server** in order to install Wazuh Manager::

    1- What kind of installation do you want (server, agent, local, hybrid or help)? server

5. Start the services using this command::

    /var/ossec/bin/ossec-control start

Wazuh API
---------------------------------------------------

1. It is required NodeJS >= 4.6.1 in order to run the API. If you do not have NodeJS installed or your version is older than 4.6.1, we recommend to add the official repositories because they have more recent versions.

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

3. Python >= 2.7 is required in order to run the API. It is installed by default or included in the official repositories in the most of Linux distributions. It is possible to set the path of Python in the API configuration at */var/ossec/api/configuration/config.js*::

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

For CentOS 6 and Redhat 6, you can install the package *python27*, that installs Python 2.7 at */opt/rh/python27*:

    a) For CentOS 6::

        yum install -y centos-release-SCL
        yum install -y python27

    b) For RHEL 6::

        yum install scl-utils

        # Choose option:
            # Enable RHSCL (option 1)
            yum-config-manager --enable rhel-server-rhscl-6-rpms

            # Enable RHSCL manually (option 2)
            nano /etc/yum.repos.d/redhat-rhui.repo
            # In section [rhui-REGION-rhel-server-rhscl], change enabled from 0 to 1
                [rhui-REGION-rhel-server-rhscl]
                name=Red Hat Enterprise Linux Server 6 RHSCL (RPMs)
                # ...
                enabled=1

        yum install python27
