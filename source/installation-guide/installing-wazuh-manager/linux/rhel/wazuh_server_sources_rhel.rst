.. Copyright (C) 2020 Wazuh, Inc.

.. _wazuh_server_sources_rhel:

Red Hat Enterprise Linux from sources
=====================================

This guide describes how to install the manager and API for Red Hat Enterprise Linux or greater from source code. In addition, for distributed architectures, you will find some guidance on how to install Filebeat.

Installing Wazuh manager
------------------------

1. Install the development tools and compilers. In Linux, this can easily be done using your distribution's package manager:

    .. code-block:: console

      # yum install make gcc policycoreutils automake autoconf libtool

    1.1 **Optional**. Install the following dependencies **only if the installation directory is not** ``/var/ossec``. Since v3.9.0, ``make deps`` will download a pre-compiled version of CPython, built to be installed in ``/var/ossec``. Otherwise, it will download a modified version of CPython sources and it will be necessary to compile it.

      To install the build dependencies of CPython, follow these steps:

      .. code-block:: console

          # yum install epel-release yum-utils -y
          # yum-builddep python34 -y

      .. note:: The Python version from the previous command may change depending of the OS used to build the binaries. More information in `Install dependencies <https://devguide.python.org/setup/#install-dependencies>`_.

2. Download and extract the latest version:

  .. code-block:: console

    # curl -Ls https://github.com/wazuh/wazuh/archive/v|WAZUH_LATEST|.tar.gz | tar zx

3. Run the ``install.sh`` script. This will display a wizard to guide you through the installation process using the Wazuh sources:

  .. warning::
    If you want to enable the database output, :ref:`check out <manual_database_output>` this section before running the installation script.

  .. code-block:: console

    # cd wazuh-*
    # ./install.sh

  If you have previously compiled for another platform, you must clean the build using the Makefile in ``src``:

  .. code-block:: console

    # cd wazuh-*
    # make -C src clean
    # make -C src clean-deps

4. When the script asks what kind of installation you want, type ``manager`` to install the Wazuh manager:

  .. code-block:: none
    :class: output

    1- What kind of installation do you want (manager, agent, local, hybrid or help)? manager

.. note::
  During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``manager``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default path of installation is ``/var/ossec``. A commonly used custom path might be ``/opt``.

.. warning::
  Be extremely careful not to select a critical installation directory if you choose a different path than the default. If the directory already exist the installer will ask if delete the directory or if installing Wazuh inside.

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

    .. code-block:: console

      # curl --silent --location https://rpm.nodesource.com/setup_10.x | bash -
      # yum -y install nodejs
      # npm config set user 0

2. Download and execute the installation script:

  .. code-block:: console

      # curl -s -o install_api.sh https://raw.githubusercontent.com/wazuh/wazuh-api/v|WAZUH_LATEST|/install_api.sh && bash ./install_api.sh download

3. Once the process is complete, you can check the service status with:

  * For Systemd:

    .. code-block:: console

      # systemctl status wazuh-api

  * For SysV Init:

    .. code-block:: console

      # service wazuh-api status

.. note:: You can also run an :ref:`unattended installation <unattended-installation>` for the Wazuh manager and API.

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch.

While `Filebeat can be installed from sources <https://www.elastic.co/guide/en/beats/devguide/current/beats-contributing.html>`_,
the process is more complex than you may like and it is beyond the scope of Wazuh documentation. We recommend :ref:`installing Filebeat via repository package  <wazuh_server_packages_rhel_filebeat>`.

Next steps
----------

Once you have installed the manager, API and Filebeat (only needed for distributed architectures), you are ready to install :ref:`Elastic Stack <installation_elastic>`.

Uninstall
---------

To uninstall Wazuh manager and Wazuh API:

    .. code-block:: console

      # OSSEC_INIT="/etc/ossec-init.conf"
      # . $OSSEC_INIT 2> /dev/null

Stop the service:

  .. code-block:: console

    # service wazuh-manager stop 2> /dev/null
    # service wazuh-api stop 2> /dev/null

Stop the daemon:

  .. code-block:: console

    # $DIRECTORY/bin/ossec-control stop 2> /dev/null

Remove files and service artifacts:

  .. code-block:: console

    # rm -rf $DIRECTORY $OSSEC_INIT

Delete the service:

  For SysV Init:

    .. code-block:: console

      # [ -f /etc/rc.local ] && sed -i'' '/ossec-control start/d' /etc/rc.local
      # find /etc/{init.d,rc*.d} -name "*wazuh" | xargs rm -f

  For Systemd:

    .. code-block:: console

        # find /etc/systemd/system -name "wazuh*" | xargs rm -f
        # systemctl daemon-reload

Remove users:

  .. code-block:: console

    # userdel ossec 2> /dev/null
    # userdel ossecm 2> /dev/null
    # userdel ossecr 2> /dev/null
    # groupdel ossec 2> /dev/null
