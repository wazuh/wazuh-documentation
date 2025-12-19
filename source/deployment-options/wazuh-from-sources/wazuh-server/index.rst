.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section covers installing dependencies, downloading and compiling the source code, running the installation wizard, and uninstalling the manager if needed.

Installing the Wazuh manager from sources
=========================================

The Wazuh manager is the core component of the Wazuh server that processes and analyzes security data from Wazuh agents and other sources. It includes the analysis engine for log processing, rule evaluation, and alert generation, along with services for the Wazuh agent enrollment and connection.

This section covers installing dependencies, downloading and compiling the source code, running the installation wizard, and uninstalling the manager if needed.

.. _installing_manager_from_sources_dependencies:

Installing dependencies
-----------------------

Before compiling Wazuh from sources, you need to install the required build tools and libraries for the destination operating system. This section covers the essential development tools, compilers, and build utilities needed to compile the Wazuh manager successfully.

.. tabs::

   .. group-tab:: APT

      .. code-block:: console

         # apt-get update
         # apt-get install python3 gcc g++ make libc6-dev curl policycoreutils automake autoconf libtool libssl-dev procps build-essential

      CMake 3.18 installation

      .. code-block:: console

         # curl -OL https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz && cd cmake-3.18.3 && ./bootstrap --no-system-curl && make -j$(nproc) && make install
         # cd .. && rm -rf cmake-*

   .. group-tab:: Yum

      .. tabs::

         .. tab:: CentOS 7

            .. code-block:: console

               # yum update -y
               # yum install make gcc gcc-c++ policycoreutils-python automake autoconf libtool centos-release-scl openssl-devel wget bzip2 devtoolset-7 procps -y
               # curl -OL http://packages.wazuh.com/utils/gcc/gcc-9.4.0.tar.gz && tar xzf gcc-9.4.0.tar.gz  && cd gcc-9.4.0/ && ./contrib/download_prerequisites && ./configure --enable-languages=c,c++ --prefix=/usr --disable-multilib --disable-libsanitizer && make -j$(nproc) && make install && ln -fs /usr/bin/g++ /bin/c++ && ln -fs /usr/bin/gcc /bin/cc && cd .. && rm -rf gcc-* && scl enable devtoolset-7 bash

            CMake 3.18 installation

            .. code-block:: console

               # curl -OL https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz && cd cmake-3.18.3 && ./bootstrap --no-system-curl && make -j$(nproc) && make install
               # cd .. && rm -rf cmake-*

         .. tab:: CentOS 8

            .. code-block:: console

               # yum install make cmake gcc gcc-c++ python3 python3-policycoreutils automake autoconf libtool openssl-devel yum-utils procps -y
               # curl -OL http://packages.wazuh.com/utils/gcc/gcc-9.4.0.tar.gz && tar xzf gcc-9.4.0.tar.gz  && cd gcc-9.4.0/ && ./contrib/download_prerequisites && ./configure --enable-languages=c,c++ --prefix=/usr --disable-multilib --disable-libsanitizer && make -j$(nproc) && make install && ln -fs /usr/bin/g++ /bin/c++ && ln -fs /usr/bin/gcc /bin/cc && cd .. && rm -rf gcc-* && scl enable devtoolset-7 bash
               # yum-config-manager --enable PowerTools
               # yum install libstdc++-static -y

            CMake 3.18 installation

            .. code-block:: console

               # curl -OL https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz && cd cmake-3.18.3 && ./bootstrap --no-system-curl && make -j$(nproc) && make install
               # cd .. && rm -rf cmake-*
               # export PATH=/usr/local/bin:$PATH

         .. tab:: CentOS 9

            .. code-block:: console

               # yum install make cmake gcc gcc-c++ python3 python3-policycoreutils automake autoconf libtool openssl-devel yum-utils procps -y
               # curl -OL http://packages.wazuh.com/utils/gcc/gcc-9.4.0.tar.gz && tar xzf gcc-9.4.0.tar.gz  && cd gcc-9.4.0/ && ./contrib/download_prerequisites && ./configure --enable-languages=c,c++ --prefix=/usr --disable-multilib --disable-libsanitizer && make -j$(nproc) && make install && ln -fs /usr/bin/g++ /bin/c++ && ln -fs /usr/bin/gcc /bin/cc && cd .. && rm -rf gcc-* && scl enable devtoolset-7 bash
               # yum config-manager --set-enabled crb
               # yum install libstdc++-static -y

   .. group-tab:: DNF

      .. code-block:: console

         # dnf update -y
         # dnf install make cmake gcc gcc-c++ python3 python3-policycoreutils automake autoconf libtool openssl-devel yum-utils procps -y
         # curl -OL http://packages.wazuh.com/utils/gcc/gcc-9.4.0.tar.gz && tar xzf gcc-9.4.0.tar.gz && cd gcc-9.4.0/ && ./contrib/download_prerequisites && ./configure --enable-languages=c,c++ --prefix=/usr --disable-multilib --disable-libsanitizer && make -j$(nproc) && make install && ln -fs /usr/bin/g++ /bin/c++ && ln -fs /usr/bin/gcc /bin/cc && cd .. && rm -rf gcc-*
         # dnf config-manager --set-enabled crb
         # dnf install libstdc++-static -y

      CMake 3.18 installation

      .. code-block:: console

         # curl -OL https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz && cd cmake-3.18.3 && ./bootstrap --no-system-curl && make -j$(nproc) && make install
         # cd .. && rm -rf cmake-*
         # export PATH=/usr/local/bin:$PATH

**Optional**: Install the following dependencies only when compiling the CPython from sources. Since v4.2.0, ``make deps TARGET=server`` will download a portable version of CPython ready to be installed. Nevertheless, you can download the CPython sources by adding the ``PYTHON_SOURCE`` flag when running ``make deps``.

Follow these steps to install the required dependencies to build the Python interpreter:

.. tabs::

   .. group-tab:: APT

      .. code-block:: console

         # echo "deb-src http://archive.ubuntu.com/ubuntu $(lsb_release -cs) main" >> /etc/apt/sources.list
         # apt-get update
         # apt-get build-dep python3 -y

   .. group-tab:: Yum

      .. code-block:: console

         # yum install epel-release yum-utils -y
         # yum-builddep python36 -y

   .. group-tab:: DNF

      .. code-block:: console

         # dnf install epel-release dnf-utils -y
         # dnf builddep python3 -y

.. note::

   The Python version from the previous command may change depending on the OS used to build the binaries. For more information, refer to the `Install dependencies <https://devguide.python.org/setup/#install-dependencies>`__ page.

Installing the Wazuh manager
----------------------------

This section walks you through downloading the Wazuh source code, compiling it, and running the installation wizard to set up the Wazuh manager on your system.

#. Download and extract the latest version:

   .. code-block:: console

      # curl -Ls https://github.com/wazuh/wazuh/archive/v|WAZUH_CURRENT_FROM_SOURCES|.tar.gz | tar zx
      # cd wazuh-|WAZUH_CURRENT_FROM_SOURCES|

#. If you have previously compiled for another platform, clean the build using the Makefile in ``src/``:

   .. code-block:: console

      # make -C src clean
      # make -C src clean-deps

#. Run the ``install.sh`` script. This will display a wizard to guide you through the installation process using the Wazuh sources:

   .. warning::

      If you want to enable the database output, check out the :ref:`Alert management <configuring_database_output>` section before running the installation script.

   .. code-block:: console

      # ./install.sh

   The initial run might take some time as it downloads and processes the :doc:`vulnerability detection </user-manual/capabilities/vulnerability-detection/index>` content. To speed up this process, you can set the ``DOWNLOAD_CONTENT`` environment variable to ``y`` beforehand. The adjusted command downloads a pre-prepared database during installation.

   .. code-block:: console

      # DOWNLOAD_CONTENT=y ./install.sh

#. When the script asks what kind of installation you want, type ``manager`` to install the Wazuh manager:

   .. code-block:: none

      1- What kind of installation do you want (manager, agent, local, hybrid, or help)? manager

   .. note::

      During the installation, users can decide the installation path. Execute the ``./install.sh`` script and select the language, set the installation mode to ``manager``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default installation path is ``/var/ossec``. A commonly used custom path is ``/opt``.

   .. warning::

      Be extremely careful not to select a critical installation directory if you choose a different path than the default. If the directory already exists, the installer will ask to delete the directory or proceed by installing Wazuh inside it.

#. The installer asks if you want to start Wazuh at the end of the installation. If you choose not to, you can start it later with:

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl start wazuh-manager

      .. group-tab:: SysV init

         .. code-block:: console

            # service wazuh-manager start

Installing other Wazuh components
---------------------------------

Once the Wazuh manager is installed from source, you can install the Wazuh indexer, Filebeat, and the Wazuh dashboard by following the :doc:`Installation guide </installation-guide/index>`. The Wazuh indexer and dashboard are excluded from the installation from sources procedure, as they rely on pre-built packages.

Uninstall
---------

This section provides instructions for completely removing the Wazuh manager installation from your system.

#. To uninstall the Wazuh manager, set ``WAZUH_HOME`` with the current installation path:

   .. code-block:: console

       # WAZUH_HOME="/WAZUH/INSTALLATION/PATH"

#. Stop the service:

   .. code-block:: console

       # service wazuh-manager stop 2> /dev/null

#. Stop the daemon:

   .. code-block:: console

       # $WAZUH_HOME/bin/wazuh-control stop 2> /dev/null

#. Remove the installation folder and all its content:

   .. code-block:: console

       # rm -rf $WAZUH_HOME

#. Delete the service:

   .. tabs::

       .. group-tab:: SysV init

           .. code-block:: console

               # [ -f /etc/rc.local ] && sed -i'' '/wazuh-control start/d' /etc/rc.local
               # find /etc/{init.d,rc*.d} -name "*wazuh*" | xargs rm -f

       .. group-tab:: Systemd

           .. code-block:: console

               # find /etc/systemd/system -name "wazuh*" | xargs rm -f
               # systemctl daemon-reload

#. Remove Wazuh user and group:

   .. code-block:: console

       # userdel wazuh 2> /dev/null
       # groupdel wazuh 2> /dev/null
