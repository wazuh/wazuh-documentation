.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Wazuh agent sources installation

.. _wazuh_agent_source_installation:

Installing Wazuh agent from sources
===================================

.. tabs::

  .. group-tab:: Linux


    .. note:: All the commands described below need to be executed with root user privileges. Since Wazuh 3.5 it is necessary to have internet connection when following this process.

    .. note:: CMake 3.12.4 is the minimal library version required to build the Wazuh agent solution.

    1. Install development tools and compilers. In Linux this can easily be done using your distribution's package manager:

     .. tabs::

      .. tab:: Yum

        .. tabs::

          .. tab:: CentOS 6/7

            .. code-block:: console

              # yum update
              # yum install make gcc gcc-c++ policycoreutils-python automake autoconf libtool centos-release-scl devtoolset-7
              # scl enable devtoolset-7 bash

            CMake 3.18 installation

            .. code-block:: console

              # curl -OL http://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz
              # cd cmake-3.18.3 && ./bootstrap --no-system-curl
              # make -j$(nproc) && make install
              # cd .. && rm -rf cmake-*

          .. tab:: CentOS 8

            .. code-block:: console

              # yum install make gcc gcc-c++ python3 python3-policycoreutils automake autoconf libtool
              # rpm -i http://mirror.centos.org/centos/8/PowerTools/x86_64/os/Packages/libstdc++-static-8.3.1-5.1.el8.x86_64.rpm

            CMake 3.18 installation

            .. code-block:: console

              # curl -OL http://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz
              # cd cmake-3.18.3 && ./bootstrap --no-system-curl
              # make -j$(nproc) && make install
              # cd .. && rm -rf cmake-*


      .. tab:: APT

        .. code-block:: console

         # apt-get install python gcc g++ make libc6-dev curl policycoreutils automake autoconf libtool


        CMake 3.18 installation

        .. code-block:: console

          # curl -OL http://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz
          # cd cmake-3.18.3 && ./bootstrap --no-system-curl
          # make -j$(nproc) && make install
          # cd .. && rm -rf cmake-*



      .. tab:: ZYpp

        .. code-block:: console

         # zypper install make gcc gcc-c++ policycoreutils-python automake autoconf libtool

        CMake 3.18 installation

        .. code-block:: console

          # curl -OL http://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz
          # cd cmake-3.18.3 && ./bootstrap --no-system-curl
          # make -j$(nproc) && make install
          # cd .. && rm -rf cmake-*

        .. note:: For Suse 11, it is possible that some of the tools are not found in the package manager, in that case you can add the following official repository:

        .. code-block:: console

         # zypper addrepo http://download.opensuse.org/distribution/11.4/repo/oss/ oss




    2. Download and extract the latest version:

     .. code-block:: console

      # curl -Ls https://github.com/wazuh/wazuh/archive/v|WAZUH_LATEST|.tar.gz | tar zx

    3. Run the ``install.sh`` script. This will run a wizard that will guide you through the installation process using the Wazuh sources:

     .. code-block:: console

      # cd wazuh-*
      # ./install.sh

     If you have previously compiled for another platform, you must clean the build using the Makefile in ``src``:

      .. code-block:: console

        # cd wazuh-*
        # make -C src clean
        # make -C src clean-deps

     .. note:: During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``agent``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default path of installation is ``/var/ossec``. A commonly used custom path might be ``/opt``. When choosing a different path than the default, if the directory already exist the installer will ask if delete the directory or if installing Wazuh inside. You can also run an :ref:`unattended installation <unattended-installation>`.


    4. The script will ask about what kind of installation you want. Type ``agent`` in order to install a Wazuh agent:

     .. code-block:: none
       :class: output

       1- What kind of installation do you want (manager, agent, local, hybrid or help)? agent

    Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :ref:`user manual<register_agents>`.

    .. raw:: html

       <h2>Uninstall</h2>

    To uninstall Wazuh agent, set WAZUH_HOME with the current installation path:

    .. code-block:: console

      # WAZUH_HOME="/WAZUH/INSTALLATION/PATH"

    Stop the service:

    .. code-block:: console

      # service wazuh-agent stop 2> /dev/null

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



  .. group-tab:: Windows

    .. note:: The following procedure has been tested on Ubuntu 16.04 and other Debian based distributions and may work with other Debian/Ubuntu versions as well.

    1. Set up the Ubuntu build environment. Install these dependencies to build the Windows Wazuh agent installer on Ubuntu:

     .. code-block:: console

      # apt-get install gcc-mingw-w64 g++-mingw-w64-i686 g++-mingw-w64-x86-64 nsis make cmake


    2. Set up Windows build environment. To generate the installer, the following dependencies must be in place on the Windows machine:

     - `WiX Toolset <http://wixtoolset.org/>`_.
     - .NET framework 3.5.1.
     - Microsoft Windows SDK.

    3. Download the Wazuh source code and unzip it:

     .. code-block:: console

      # curl -Ls https://github.com/wazuh/wazuh/archive/v|WAZUH_LATEST|.tar.gz | tar zx
      # cd wazuh-|WAZUH_LATEST|/src

    4. Compile the Agent by running the ``make`` command:

     .. code-block:: console

      # make deps
      # make TARGET=winagent

     The following output will appear at the end of the building process:

     .. code-block:: none
      :class: output

      Done building winagent


    5. Moves the entire repository to the Windows machine. It is recommended to compress it to speed up the process.

     .. code-block:: console

      # zip -r wazuh.zip ../../wazuh-|WAZUH_LATEST|

    6. Decompress the repository on the Windows machine, run the `wazuh-installer-build-msi.bat` script from the `win32` folder.

     .. code-block:: console

      cd wazuh-|WAZUH_LATEST|\src\win32
      .\wazuh-installer-build-msi.bat

    If you do not want to sign the installer, you will have to comment or delete the signtool line in the previous script.

     .. code-block:: console

      :: signtool sign /a /tr http://rfc3161timestamp.globalsign.com/advanced /d "%MSI_NAME%" /td SHA256 "%MSI_NAME%"

    .. note:: Once the Agent is deployed :ref:`with a normal or unattended installation <wazuh_agent_package_windows>`, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit :ref:`user manual<register_agents>`.

    .. raw:: html

        <h2>Uninstall</h2>

    To uninstall the agent, the original MSI file will be needed to perform the unattended process:

    .. code-block:: console

      msiexec.exe /x wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /qn



  .. group-tab:: macOS

    1. Install development tools and compilers. In macOS, this can be easily done by installing brew, a package manager for macOS:

      .. code-block:: console

       $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

      .. code-block:: console

       $ brew install automake autoconf libtool cmake

    2. Download and extract the latest version:

     .. code-block:: console

      $ curl -Ls https://github.com/wazuh/wazuh/archive/v|WAZUH_LATEST|.tar.gz | tar zx

     .. note:: All the commands described below need to be executed with root user privileges.

    3. Run the ``install.sh`` script. This will run a wizard that will guide you through the installation process using the Wazuh sources:

     .. code-block:: console

      # cd wazuh-*
      # USER_DIR="/Library/Ossec" ./install.sh

     .. note:: Note that with the variable `USER_DIR` it has been indicated that the agent installation path is ``/Library/Ossec``

     If you have previously compiled for another platform, you must clean the build using the Makefile in ``src``:

      .. code-block:: console

        # cd wazuh-*
        # make -C src clean
        # make -C src clean-deps

     .. note:: During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``agent``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default path of installation is ``/var/ossec``. A commonly used custom path might be ``/opt``. When choosing a different path than the default, if the directory already exist the installer will ask if delete the directory or if installing Wazuh inside. You can also run an :ref:`unattended installation <unattended-installation>`.

     .. note:: Since Wazuh 3.5 it is necessary to have internet connection when following this step.

    4. The script will ask about what kind of installation you want. Type ``agent`` in order to install a Wazuh agent:

     .. code-block:: none
      :class: output

      1- What kind of installation do you want (manager, agent, local, hybrid or help)? agent

    Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :ref:`user manual<register_agents>`.

    .. raw:: html

        <h2>Uninstall</h2>

    To uninstall Wazuh agent, set WAZUH_HOME with the current installation path:

    .. code-block:: console

      # WAZUH_HOME="/WAZUH/INSTALLATION/PATH"

    Stop the service:

    .. code-block:: console

     # service wazuh-agent stop 2> /dev/null

    Stop the daemon:

    .. code-block:: console

     # $WAZUH_HOME/bin/wazuh-control stop 2> /dev/null

    Remove the installation folder and all its content:

    .. code-block:: console

     # rm -rf $WAZUH_HOME

    Delete the service:

    .. code-block:: console

     # rm -rf /Library/StartupItems/OSSEC

    Remove users:

    .. code-block:: console

     # dscl . -delete "/Users/wazuh" > /dev/null 2>&1
     # dscl . -delete "/Groups/wazuh" > /dev/null 2>&1




  .. group-tab:: AIX


    .. note:: All the commands described below need to be executed with root user privileges. Since Wazuh 3.5 it is necessary to have internet connection when following this process.

    1. Install development tools and compilers.

     1.1 Download the ``wget`` tool.

     .. code-block:: console

        # rpm -Uvh --nodeps http://www.oss4aix.org/download/RPMS/wget/wget-1.19.2-1.aix5.1.ppc.rpm

     1.2  Download the following script

      .. code-block:: console

        # wget https://raw.githubusercontent.com/wazuh/wazuh-packages/master/aix/generate_wazuh_packages.sh --no-check-certificate

      .. note:: If you can't download the script this way, then you should copy it through the scp utility.

     1.3  Install the necessary dependencies using the script.

      .. code-block:: console

        # chmod +x generate_wazuh_packages.sh
        # ./generate_wazuh_packages.sh -e

      .. note:: This step may take a few minutes.

    2. Download the latest version.

     .. code-block:: console

        # wget -O wazuh.tar.gz --no-check-certificate https://api.github.com/repos/wazuh/wazuh/tarball/v|WAZUH_LATEST| && gunzip -c wazuh.tar.gz | tar -xvf -

     .. note:: If you can't download the repository this way, then you should copy it through the scp utility.

    3. Compile the sources.

     .. code-block:: console

        # cd wazuh-*
        # gmake -C src deps RESOURCES_URL=https://packages.wazuh.com/deps/|WAZUH_LATEST_MINOR|
        # gmake -C src TARGET=agent USE_SELINUX=no PREFIX=/var/ossec DISABLE_SHARED=yes

    4. Run the ``install.sh`` script. This will run a wizard that will guide you through the installation process using the Wazuh sources:

     .. code-block:: console

      # DISABLE_SHARED="yes" ./install.sh

     If you have previously compiled for another platform, you must clean the build using the Makefile in ``src``:

     .. code-block:: console

        # gmake -C src clean-deps
        # gmake -C src clean

    .. note:: During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``agent``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default path of installation is ``/var/ossec``. A commonly used custom path might be ``/opt``. When choosing a different path than the default, if the directory already exist the installer will ask if delete the directory or if installing Wazuh inside. You can also run an :ref:`unattended installation <unattended-installation>`.

    5. Finally apply the following configuration:

      .. code-block:: console

        # sed '/System inventory/,/^$/{/^$/!d;}' /var/ossec/etc/ossec.conf > /var/ossec/etc/ossec.conf.tmp
        # mv /var/ossec/etc/ossec.conf.tmp /var/ossec/etc/ossec.conf

     .. note:: Note that the above commands have been executed for the default installation path /var/ossec. If you have installed the agent in another path, you will have to modify the path of those commands.

    Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :ref:`user manual<register_agents>`.

    .. raw:: html

        <h2>Uninstall</h2>

    To uninstall Wazuh agent, set WAZUH_HOME with the current installation path:

    .. code-block:: console

      # WAZUH_HOME="/WAZUH/INSTALLATION/PATH"

    Stop the service:

    .. code-block:: console

     # service wazuh-agent stop 2> /dev/null

    Stop the daemon:

    .. code-block:: console

     # $WAZUH_HOME/bin/wazuh-control stop 2> /dev/null

    Remove the installation folder and all its content:

    .. code-block:: console

     # rm -rf $WAZUH_HOME

    Delete the service:

    .. code-block:: console

     # find /etc/rc.d -name "*wazuh*" | xargs rm -f

    Remove users:

    .. code-block:: console

     # userdel wazuh 2> /dev/null
     # groupdel wazuh 2> /dev/null



  .. group-tab:: HP-UX

    .. note:: All the commands described below need to be executed with root user privileges. Since Wazuh 3.5 it is necessary to have internet connection when following this process.

    1. Install development tools and compilers.

     1.1 Download the ``depothelper-2.10-hppa_32-11.31.depot`` file.

      .. code-block:: console

        # /usr/local/bin/wget https://github.com/wazuh/wazuh-packages/raw/master/hp-ux/depothelper-2.10-hppa_32-11.31.depot --no-check-certificate

      .. note:: If you can't download the script this way, then you should copy it through the scp utility.

     1.2 Install the package manager.

     .. code-block:: console

        # swinstall -s depothelper-2.10-hppa_32-11.31.depot \*

     1.3 Download the ``wget`` tool (If it is not installed).

     .. code-block:: console

        # /usr/local/bin/depothelper -f wget

     1.4  Download the following script

      .. code-block:: console

        # /usr/local/bin/wget https://raw.githubusercontent.com/wazuh/wazuh-packages/master/hp-ux/generate_wazuh_packages.sh --no-check-certificate

      .. note:: If you can't download the script this way, then you should copy it through the scp utility.

     1.5  Install the necessary dependencies using the script.

      .. code-block:: console

        # chmod +x generate_wazuh_packages.sh
        # ./generate_wazuh_packages.sh -e

      .. note:: This step may take a long time.

    2. Download the latest version.

     .. code-block:: console

        # /usr/local/bin/curl -k -L -O https://github.com/wazuh/wazuh/archive/v|WAZUH_LATEST|.zip && /usr/local/bin/unzip v|WAZUH_LATEST|

     .. note:: If you can't download the repository this way, then you should copy it through the scp utility.

    3. Compile the sources.

     .. code-block:: console

        # cd wazuh-*
        # /usr/local/bin/gmake -C src deps RESOURCES_URL=https://packages.wazuh.com/deps/4.0/
        # /usr/local/bin/gmake -C src TARGET=agent USE_SELINUX=no DISABLE_SHARED=yes

    4. Run the ``install.sh`` script. This will run a wizard that will guide you through the installation process using the Wazuh sources:

     .. code-block:: console

      # DISABLE_SHARED=yes ./install.sh

     If you have previously compiled for another platform, you must clean the build using the Makefile in ``src``:

     .. code-block:: console

      # /usr/local/bin/gmake -C src clean-deps
      # /usr/local/bin/gmake -C src clean

    .. note:: During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``agent``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default path of installation is ``/var/ossec``. A commonly used custom path might be ``/opt``. When choosing a different path than the default, if the directory already exist the installer will ask if delete the directory or if installing Wazuh inside. You can also run an :ref:`unattended installation <unattended-installation>`.

    Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :ref:`user manual<register_agents>`.

    .. raw:: html

       <h2>Uninstall</h2>

    To uninstall Wazuh agent, set WAZUH_HOME with the current installation path:

    .. code-block:: console

      # WAZUH_HOME="/WAZUH/INSTALLATION/PATH"

    Stop the service:

    .. code-block:: console

     # service wazuh-agent stop 2> /dev/null

    Stop the daemon:

    .. code-block:: console

     # $WAZUH_HOME/bin/wazuh-control stop 2> /dev/null

    Remove the installation folder and all its content:

    .. code-block:: console

     # rm -rf $WAZUH_HOME

    Delete the service:

    .. code-block:: console

     # find /sbin/{init.d,rc*.d} -name "*wazuh*" | xargs rm -f

    Remove users:

    .. code-block:: console

     # userdel wazuh 2> /dev/null
     # groupdel wazuh 2> /dev/null



  .. group-tab:: Solaris

    This section describes how to download and build the Wazuh HIDS Solaris agent from sources for the following versions:

    - For Solaris i386
    - For Solaris SPARC

    .. tabs::


      .. tab:: Solaris 10

        .. note:: All the commands described below need to be executed with root user privileges. Since Wazuh 3.5 it is necessary to have internet connection when following this process.

        1. Install development tools and compilers.

         1.1 Install pkgutil.

          .. code-block:: console

            # PATH="${PATH}:/usr/sbin:/usr/bin:/usr/sbin/:/opt/csw/gnu/:/usr/sfw/bin/:/opt/csw/bin/"
            # export PATH
            # pkgadd -d http://get.opencsw.org/now

         1.2  Install the following tools:

          .. code-block:: console

            # /opt/csw/bin/pkgutil -y -i git automake gmake cmake autoconf libtool wget curl gcc5core gcc5g++

         1.3  Download and build the gcc/g++ 5.5 compiler:

          .. code-block:: console

            # curl -k -O https://packages.wazuh.com/utils/gcc/gcc-5.5.0/gcc-5.5.0.tar.gz && gtar xzf gcc-5.5.0.tar.gz
            # ln -sf gcc-5.5.0 gcc
            # cd gcc
            # wget https://packages.wazuh.com/utils/gcc/mpfr-2.4.2.tar.bz2 && gtar xjf mpfr-2.4.2.tar.bz2 && ln -sf mpfr-2.4.2 mpfr
            # wget https://packages.wazuh.com/utils/gcc/gmp-4.3.2.tar.bz2 && gtar xjf gmp-4.3.2.tar.bz2 && ln -sf gmp-4.3.2 gmp
            # wget https://packages.wazuh.com/utils/gcc/mpc-0.8.1.tar.gz && gtar xzf mpc-0.8.1.tar.gz && ln -sf mpc-0.8.1 mpc
            # wget https://packages.wazuh.com/utils/gcc/isl-0.14.tar.bz2 && gtar xjf isl-0.14.tar.bz2 && ln -sf isl-0.14 isl
            # cd .. && mkdir -p gcc-build && cd gcc-build
            # ../gcc/configure --prefix=/usr/local/gcc-5.5.0 --enable-languages=c,c++ --disable-multilib --disable-libsanitizer --disable-bootstrap --with-gnu-as --with-as=/opt/csw/bin/gas
            # gmake
            # gmake install
            # echo "export PATH=/usr/local/gcc-5.5.0/bin:${PATH}" >> /etc/profile
            # PATH="/usr/local/gcc-5.5.0/bin:${PATH}"
            # export PATH
            # CPLUS_INCLUDE_PATH=/usr/local/gcc-5.5.0/include/c++/5.5.0/
            # export CPLUS_INCLUDE_PATH
            # LD_LIBRARY_PATH=/usr/local/gcc-5.5.0/lib/
            # export LD_LIBRARY_PATH
            # cd .. && rm -rf gcc-build && rm -rf gcc-5.5.0.tar.gz
            # rm -rf mpfr-2.4.2.tar.bz2 && rm -rf gmp-4.3.2.tar.bz2 && rm -rf mpc-0.8.1.tar.gz && rm -rf isl-0.14.tar.bz2

          .. note:: The ``gmake`` step will take several minutes to complete. This is a normal behavior.

         1.4  Install cmake library:

          .. code-block:: console

            # curl -k -O -L https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && gtar xzf cmake-3.18.3.tar.gz
            # ln -sf cmake-3.18.3 cmake
            # cd cmake && ./bootstrap
            # gmake
            # gmake install
            # PATH="/usr/local/bin/:${PATH}"
            # export PATH
            # cd .. && rm -rf cmake-*

        2. Download the latest version and a necessary file.

         .. code-block:: console

           # /opt/csw/bin/git clone -b v|WAZUH_LATEST| https://github.com/wazuh/wazuh.git
           # wget -P wazuh https://raw.githubusercontent.com/wazuh/wazuh-packages/master/solaris/solaris10/solaris10_patch.sh

        3. Create an user and group called `wazuh` needed for installation.

         .. code-block:: console

          # groupadd wazuh
          # useradd -g wazuh wazuh

        4. Run the following commands to update the makefile

         .. code-block:: console

          # mv wazuh/src/Makefile wazuh/src/Makefile.tmp
          # sed -n '/OSSEC_LDFLAGS+=-z relax=secadj/!p' wazuh/src/Makefile.tmp > wazuh/src/Makefile

        5. Compile the sources files.

         * For Solaris 10 i386:

          .. code-block:: console

            # cd wazuh/src
            # gmake clean
            # gmake deps
            # gmake -j 4 TARGET=agent PREFIX=/var/ossec USE_SELINUX=no DISABLE_SHARED=yes

         * For Solaris 10 SPARC:

          .. code-block:: console

            # cd wazuh/src
            # gmake clean
            # gmake deps
            # gmake -j 4 TARGET=agent PREFIX=/var/ossec USE_SELINUX=no USE_BIG_ENDIAN=yes DISABLE_SHARED=yes

        6. Run the ``solaris10_patch.sh`` that has previously been downloaded.

         .. code-block:: console

          # cd ../
          # chmod +x solaris10_patch.sh
          # ./solaris10_patch.sh

        7. Run the ``install.sh`` script. This will run a wizard that will guide you through the installation process using the Wazuh sources:

         .. code-block:: console

          # ./install.sh

         If you have previously compiled for another platform, you must clean the build using the Makefile in ``src``:

         .. code-block:: console

          # gmake -C src clean
          # gmake -C src clean-deps

         .. note:: During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``agent``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default path of installation is ``/var/ossec``. A commonly used custom path might be ``/opt``. When choosing a different path than the default, if the directory already exist the installer will ask if delete the directory or if installing Wazuh inside. You can also run an :ref:`unattended installation <unattended-installation>`.

        8. The script will ask about what kind of installation you want. Type ``agent`` in order to install a Wazuh agent:

         .. code-block:: none
           :class: output

           1- What kind of installation do you want (manager, agent, local, hybrid or help)? agent

        Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :ref:`user manual<register_agents>`.

        .. raw:: html

           <h2>Uninstall</h2>

        To uninstall Wazuh agent, set WAZUH_HOME with the current installation path:

        .. code-block:: console

         # WAZUH_HOME="/WAZUH/INSTALLATION/PATH"

        Stop the service:

        .. code-block:: console

         # service wazuh-agent stop 2> /dev/null

        Stop the daemon:

        .. code-block:: console

         # $WAZUH_HOME/bin/wazuh-control stop 2> /dev/null

        Remove the installation folder and all its content:

        .. code-block:: console

         # rm -rf $WAZUH_HOME

        Delete the service:

        .. code-block:: console

         # find /sbin/{init.d,rc*.d} -name "*wazuh*" | xargs rm -f

        Remove users:

        .. code-block:: console

         # userdel wazuh 2> /dev/null
         # groupdel wazuh 2> /dev/null


      .. tab:: Solaris 11

        .. note:: All the commands described below need to be executed with root user privileges. Since Wazuh 3.5 it is necessary to have internet connection when following this process.

        1. Install development tools and build the needed compilers.

          1.1 Install pkgutil an update it.

            .. code-block:: console

             # pkgadd -d http://get.opencsw.org/now
             # export PATH="${PATH}:/usr/sfw/bin:/opt/csw/bin:/opt/ccs/bin"
             # pkgutil -y -U

          1.2  Install python 2.7

           .. code-block:: console

            # /opt/csw/bin/pkgutil -y -i python27
            # ln -sf /opt/csw/bin/python2.7 /usr/bin/python

          1.3  Install the following tools:

           .. code-block:: console

            # pkgutil -y -i git gmake cmake gcc5core gcc5g++

          1.4  Install a gcc version to include all files needed in the next step:

           .. code-block:: console

            # pkg install gcc-45

          1.5  Download and build the gcc/g++ 5.5 compiler:

           .. code-block:: console

            # curl -O https://packages.wazuh.com/utils/gcc/gcc-5.5.0/gcc-5.5.0.tar.gz && gtar xzf gcc-5.5.0.tar.gz
            # ln -sf gcc-5.5.0 gcc
            # cd gcc && ./contrib/download_prerequisites
            # cd .. && mkdir -p gcc-build && cd gcc-build
            # ../gcc/configure --prefix=/usr/local/gcc-5.5.0 --enable-languages=c,c++ --disable-multilib --disable-libsanitizer --disable-bootstrap --with-ld=/usr/ccs/bin/ld --without-gnu-ld --with-gnu-as --with-as=/opt/csw/bin/gas
            # gmake
            # gmake install
            # export PATH=/usr/local/gcc-5.5.0/bin/:/usr/local/bin/:/usr/bin/:/usr/sbin/:$PATH
            # export CPLUS_INCLUDE_PATH=/usr/local/gcc-5.5.0/include/c++/5.5.0/
            # export LD_LIBRARY_PATH=/usr/local/gcc-5.5.0/lib/
            # cd ..

          .. note:: The ``gmake`` step will take several minutes to complete. This is a normal behavior.

          1.6  Install cmake library:

           .. code-block:: console

            # curl -O -L https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && gtar xzf cmake-3.18.3.tar.gz
            # ln -sf cmake-3.18.3 cmake
            # cd cmake && ./bootstrap
            # gmake
            # gmake install
            # cd .. && rm -rf cmake-*

        2. Download the latest version.

         .. code-block:: console

          # git clone -b v|WAZUH_LATEST| https://github.com/wazuh/wazuh.git

         .. note:: If you can't download the file due to an Open SSL error, then you should copy the directory with the scp utility.

        3. Run the ``install.sh`` script. This will run a wizard that will guide you through the installation process using the Wazuh sources:

         .. code-block:: console

           # cd wazuh*
           # ./install.sh

         If you have previously compiled for another platform, you must clean the build using the Makefile in ``src``:

         .. code-block:: console

          # gmake -C src clean
          # gmake -C src clean-deps

         .. note:: During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``agent``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default path of installation is ``/var/ossec``. A commonly used custom path might be ``/opt``. When choosing a different path than the default, if the directory already exist the installer will ask if delete the directory or if installing Wazuh inside. You can also run an :ref:`unattended installation <unattended-installation>`.

        .. note:: Since Wazuh 3.5 it is necessary to have internet connection when following this process.

        4. The script will ask about what kind of installation you want. Type ``agent`` in order to install a Wazuh agent:

         .. code-block:: none
          :class: output

          1- What kind of installation do you want (manager, agent, local, hybrid or help)? agent

        Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :ref:`user manual<register_agents>`.


        .. raw:: html

           <h2>Uninstall</h2>

        To uninstall Wazuh agent, set WAZUH_HOME with the current installation path:

        .. code-block:: console

         # WAZUH_HOME="/WAZUH/INSTALLATION/PATH"

        Stop the service:

        .. code-block:: console

         # service wazuh-agent stop 2> /dev/null

        Stop the daemon:

        .. code-block:: console

         # $WAZUH_HOME/bin/wazuh-control stop 2> /dev/null

        Remove the installation folder and all its content:

        .. code-block:: console

         # rm -rf $WAZUH_HOME

        Delete the service:

        .. code-block:: console

         # find /sbin/{init.d,rc*.d} -name "*wazuh*" | xargs rm -f

        Remove users:

        .. code-block:: console

         # userdel wazuh 2> /dev/null
         # groupdel wazuh 2> /dev/null
