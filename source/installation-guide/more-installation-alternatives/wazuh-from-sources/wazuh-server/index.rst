.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Wazuh manager sources installation

.. _wazuh_server_source_installation:

Installing Wazuh server from sources
====================================

The Wazuh server collects and analyzes data from deployed agents. It runs the Wazuh manager, the Wazuh API and Filebeat. Alternatively, the Wazuh manager package compatible versions can be checked or downloaded directly :ref:`here <packages>`.


Installing Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::


  .. group-tab:: Yum

    .. code-block:: console

        # yum install make cmake gcc gcc-c++ python3 python3-policycoreutils automake autoconf libtool
  
  .. group-tab:: APT


    .. code-block:: console

      # apt-get install python gcc make libc6-dev curl policycoreutils automake autoconf libtool

  .. group-tab:: ZYpp


    .. code-block:: console

        # zypper install make gcc policycoreutils-python automake autoconf libtool



**Optional**. Install the following dependencies **only if the installation directory is not** ``/var/ossec``. Since v3.9.0, ``make deps`` or ``make deps TARGET=server`` will download a pre-compiled version of CPython, built to be installed in ``/var/ossec``. Otherwise, it will download a modified version of CPython sources and it will be necessary to compile it.

To install the build dependencies of CPython, follow these steps:

.. tabs::


  .. group-tab:: Yum

    .. code-block:: console

        # yum install epel-release yum-utils -y
        # yum-builddep python34 -y


  .. group-tab:: APT


    .. code-block:: console

        # echo "deb-src http://deb.debian.org/debian $(lsb_release -cs) main" >> /etc/apt/sources.list
        # apt-get update
        # apt-get build-dep python3.5 -y


  .. group-tab:: ZYpp


    .. code-block:: console

          # zypper install epel-release yum-utils -y
          # zypper-builddep python34 -y



.. note:: The Python version from the previous command may change depending on the OS used to build the binaries. More information in `Install dependencies <https://devguide.python.org/setup/#install-dependencies>`_.

#. Download and extract the latest version:

    .. code-block:: console

      # curl -Ls https://github.com/wazuh/wazuh/archive/v|WAZUH_LATEST|.tar.gz | tar zx

#. Run the ``install.sh`` script. This will display a wizard to guide you through the installation process using the Wazuh sources:

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

#. When the script asks what kind of installation you want, type ``manager`` to install the Wazuh manager:

    .. code-block:: none

      1- What kind of installation do you want (manager, agent, local, hybrid or help)? manager

    .. note::
      During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``manager``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default path of installation is ``/var/ossec``. A commonly used custom path might be ``/opt``.

    .. warning::
      Be extremely careful not to select a critical installation directory if you choose a different path than the default. If the directory already exist the installer will ask if delete the directory or if installing Wazuh inside.

#. The installer asks if you want to start Wazuh at the end of the installation. If you choosed not to, you can start it later with:

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl start wazuh-manager


  .. group-tab:: SysV Init

    .. code-block:: console

      # service wazuh-manager start



Installing Filebeat
-------------------

Filebeat is a data shipping tool that is installed on the Wazuh server to securely forward alerts and archived events to Elasticsearch.Once the Wazuh manager is installed, you may install Filebeat as well as the other Elastic Stack components from `sources <https://www.elastic.co/guide/en/beats/devguide/current/beats-contributing.html>`_ or using :ref:`packages  <packages>`.


Uninstall
~~~~~~~~~

To uninstall Wazuh manager:

    .. code-block:: console

      # OSSEC_INIT="/etc/ossec-init.conf"
      # . $OSSEC_INIT 2> /dev/null

Stop the service:

  .. code-block:: console

    # service wazuh-manager stop 2> /dev/null

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
