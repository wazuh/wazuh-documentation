.. Copyright (C) 2019 Wazuh, Inc.

.. _sources_installation:

Install Wazuh server from sources
=================================

This guide describes how to install the manager and API from source code. In addition, for distributed architectures, you will find some guidance on how to install Filebeat.

.. note:: Many of the commands described below need to be executed with root user privileges.

Installing Wazuh manager
------------------------

1. Install the development tools and compilers. In Linux, this can easily be done using your distribution's package manager:

  a) For RPM-based distributions:

    .. code-block:: console

      # yum install make gcc policycoreutils-python automake autoconf libtool

  b) For Debian-based distributions:

    .. code-block:: console

      # apt-get install python gcc make libc6-dev curl policycoreutils automake autoconf libtool

2. Download and extract the latest version:

  .. code-block:: console

    # curl -Ls https://github.com/wazuh/wazuh/archive/v3.8.2.tar.gz | tar zx

3. Run the ``install.sh`` script. This will display a wizard to guide you through the installation process using the Wazuh sources:

  .. warning::
    If you want to enable the database output, :ref:`check out <manual_database_output>` this section before running the installation script.

  .. code-block:: console

    # cd wazuh-*
    # ./install.sh

  .. note:: Since Wazuh 3.5 it is necessary to have internet connection when following this step.

4. When the script asks what kind of installation you want, type ``manager`` to install the Wazuh Manager:

  .. code-block:: none

    1- What kind of installation do you want (manager, agent, local, hybrid or help)? manager

5. The installer asks if you want to start Wazuh at the end of the installation. If you chosen not to, you can start it later with:

  a. For Systemd:

    .. code-block:: console

      # systemctl start wazuh-manager

  b. For SysV Init:

    .. code-block:: console

      # service wazuh-manager start

  If you want to confirm that it started:

  a. For Systemd:

    .. code-block:: console

      # systemctl status wazuh-manager

  b. For SysV Init:

    .. code-block:: console

      # service wazuh-manager status

Installing Wazuh API
--------------------

1. NodeJS >= 4.6.1 is required in order to run the Wazuh API. If you do not have NodeJS installed or your version is older than 4.6.1, we recommend you add the official repository as this has more recent versions.

  a) For RPM-based distributions:

    .. code-block:: console

      # curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
      # yum -y install nodejs
      # npm config set user 0

  b) For Debian-based distributions:

    .. code-block:: console

      # curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
      # apt-get install -y nodejs
      # npm config set user 0

  .. note::

    If you are using **Ubuntu 12.04 (Precise)** or **Debian 7 (Wheezy)** you must install NodeJS 6 using the command below: ``# curl -sL https://deb.nodesource.com/setup_6.x | bash -``

    For more information, see the `Official guide to install NodeJS <https://nodejs.org/en/download/package-manager/>`_.

2. Download and execute the installation script:

  .. code-block:: console

      # curl -s -o install_api.sh https://raw.githubusercontent.com/wazuh/wazuh-api/v3.8.2/install_api.sh && bash ./install_api.sh download

3. Python >= 2.7 is required in order to run the API. It is installed by default or included in the official repositories of most Linux distributions.

It is possible to set a custom Python path for the API in ``/var/ossec/api/configuration/config.js``, in case the stock version of Python in your distro is too old:

  .. code-block:: javascript

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

  CentOS 6 and Red Hat 6 come with Python 2.6, however, you can install Python 2.7 in parallel and still maintain the older version(s):

  a) For CentOS 6:

    .. code-block:: console

    	# yum install -y centos-release-scl
    	# yum install -y python27

  b) For RHEL 6:

    .. code-block:: console

    	# yum install python27

    You may need to first enable a repository in order to get python27, with a command like this:

    .. code-block:: console

    	#   yum-config-manager --enable rhui-REGION-rhel-server-rhscl
    	#   yum-config-manager --enable rhel-server-rhscl-6-rpms

.. note:: You can also run an :ref:`unattended installation <unattended-installation>` for the Wazuh manager and API.

Installing Filebeat
-------------------

While Filebeat can be installed from sources (`see this doc <https://www.elastic.co/guide/en/beats/devguide/current/beats-contributing.html>`_), the process is more complex than you may like and it is beyond the scope of Wazuh documentation. We recommend installing Filebeat via repository package, otherwise, you can install it from a binary tarball that should work for any Linux distro. See more `here <https://www.elastic.co/downloads/beats/filebeat>`_.

.. warning::
    In a single-host architecture (where Wazuh server and Elastic Stack are installed in the same system), the installation of Filebeat is not needed since Logstash will be able to read the event/alert data directly from the local filesystem without the assistance of a forwarder.

Next steps
----------

Once you have installed the manager, API and Filebeat (only needed for distributed architectures), you are ready to install :ref:`Elastic Stack <installation_elastic>`.
