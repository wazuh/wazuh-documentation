.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Check out how to install the Wazuh server from sources in this section of our documentation. 

.. _wazuh_server_source_installation:

Installing Wazuh server from sources
====================================

The Wazuh server collects and analyzes data from deployed agents. It runs the Wazuh manager, the Wazuh API and Filebeat. Alternatively, the Wazuh manager package compatible versions can be checked or downloaded directly :ref:`here <packages>`.


Installing Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~

.. note:: CMake 3.12.4 is the minimal library version required to build the Wazuh server solution.

.. tabs::


  .. group-tab:: Yum


      .. tabs::


        .. tab:: CentOS 6/7

          .. code-block:: console

            # yum update
            # yum install make gcc gcc-c++ policycoreutils-python automake autoconf libtool centos-release-scl openssl-devel
            # yum update
            # yum install devtoolset-7
            # scl enable devtoolset-7 bash


          CMake 3.18 installation

          .. code-block:: console

            # curl -OL https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz
            # cd cmake-3.18.3 && ./bootstrap --no-system-curl
            # make -j$(nproc) && make install
            # cd .. && rm -rf cmake-*


        .. tab:: CentOS 8

          .. code-block:: console

            # yum install make cmake gcc gcc-c++ python3 python3-policycoreutils automake autoconf libtool openssl-devel cmake
            # rpm -i $(rpm -q libstdc++-devel --queryformat "http://mirror.centos.org/centos/8/PowerTools/x86_64/os/Packages/libstdc++-static-%{VERSION}-%{RELEASE}.%{arch}.rpm\n")


          **Optional** CMake 3.18 installation from sources

          .. code-block:: console

            # curl -OL https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz
            # cd cmake-3.18.3 && ./bootstrap --no-system-curl
            # make -j$(nproc) && make install
            # cd .. && rm -rf cmake-*
            # export PATH=/usr/local/bin:$PATH


  .. group-tab:: APT


    .. code-block:: console

      # apt-get install python gcc g++ make libc6-dev curl policycoreutils automake autoconf libtool


    CMake 3.18 installation

    .. code-block:: console

      # curl -OL https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz
      # cd cmake-3.18.3 && ./bootstrap --no-system-curl
      # make -j$(nproc) && make install
      # cd .. && rm -rf cmake-*

  .. group-tab:: ZYpp


    .. code-block:: console

        # zypper install make cmake gcc gcc-c++ policycoreutils-python automake autoconf libtool

    CMake 3.18 installation

    .. code-block:: console

      # curl -OL https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz
      # cd cmake-3.18.3 && ./bootstrap --no-system-curl
      # make -j$(nproc) && make install
      # cd .. && rm -rf cmake-*

  .. group-tab:: Pacman


    .. code-block:: console

        # pacman --noconfirm -Syu curl gcc make sudo wget expect gnupg perl-base \
        perl fakeroot python brotli automake autoconf libtool gawk libsigsegv nodejs \
        base-devel inetutils cmake


**Optional**. Install the following dependencies **only when compiling the CPython from sources**. Since v4.2.0, ``make deps TARGET=server`` will download a portable version of CPython ready to be installed. Nevertheless, you can download the CPython sources adding the ``PYTHON_SOURCE`` flag when running ``make deps``.

To install the required dependencies to build the python interpreter, follow these steps:

.. tabs::


  .. group-tab:: Yum

    .. code-block:: console

        # yum install epel-release yum-utils -y
        # yum-builddep python34 -y


  .. group-tab:: APT


    .. code-block:: console

        # sed -Ei 's/^# deb-src /deb-src /' /etc/apt/sources.list
        # apt-get update
        # apt-get build-dep python3.9 -y


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

    If you have previously compiled for another platform or **you want to install Wazuh in a custom path**, you must clean the build using the Makefile in ``src``:

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

To uninstall Wazuh manager, set WAZUH_HOME with the current installation path:

    .. code-block:: console

      # WAZUH_HOME="/WAZUH/INSTALLATION/PATH"

Stop the service:

  .. code-block:: console

    # service wazuh-manager stop 2> /dev/null

Stop the daemon:

  .. code-block:: console

    # $WAZUH_HOME/bin/wazuh-control stop 2> /dev/null

Remove the installation folder and all its content:

  .. code-block:: console

    # rm -rf $WAZUH_HOME

Delete the service:

  For SysV Init:

    .. code-block:: console

      # [ -f /etc/rc.local ] && sed -i'' '/wazuh-control start/d' /etc/rc.local
      # find /etc/{init.d,rc*.d} -name "*wazuh*" | xargs rm -f

  For Systemd:

    .. code-block:: console

        # find /etc/systemd/system -name "wazuh*" | xargs rm -f
        # systemctl daemon-reload

Remove users:

  .. code-block:: console

    # userdel wazuh 2> /dev/null
    # groupdel wazuh 2> /dev/null
