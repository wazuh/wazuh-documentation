.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to install the Wazuh agent from sources. Wazuh can be installed on all major operating systems, including Linux, Windows, macOS, among others.

Installing the Wazuh agent from sources
=======================================

The Wazuh agent is a single and lightweight monitoring software. It is a multi-platform component that provides visibility into the endpoint’s security by collecting critical system and application records. The following section explains how to install it from sources.

.. tabs::

    .. group-tab:: Linux

        .. note::
        
           You need root user privileges to run all the commands described below. Since Wazuh 3.5, it is necessary to have an Internet connection when following this process.

        .. note::
        
            CMake 3.12.4 is the minimal library version required to build the Wazuh agent solution.

        #.  Install development tools and compilers. In Linux, this can easily be done using your distribution’s package manager:

            .. tabs::

                .. group-tab:: Yum

                    .. tabs::

                        .. tab:: CentOS 6/7

                            .. code-block:: console

                                # yum update -y
                                # yum install make gcc gcc-c++ policycoreutils-python automake autoconf libtool centos-release-scl openssl-devel wget bzip2 -y
                                # curl -OL http://packages.wazuh.com/utils/gcc/gcc-9.4.0.tar.gz && tar xzf gcc-9.4.0.tar.gz  && cd gcc-9.4.0/ && ./contrib/download_prerequisites && ./configure --enable-languages=c,c++ --prefix=/usr --disable-multilib --disable-libsanitizer && make -j$(nproc) && make install && ln -fs /bin/g++ /usr/bin/c++ && ln -fs /bin/gcc /usr/bin/cc && cd .. && rm -rf gcc-*

                            CMake 3.18 installation

                            .. code-block:: console

                                # curl -OL https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz
                                # cd cmake-3.18.3 && ./bootstrap --no-system-curl
                                # make -j$(nproc) && make install
                                # cd .. && rm -rf cmake-*

                        .. tab:: CentOS 8

                            .. code-block:: console

                                # yum install make gcc gcc-c++ python3 python3-policycoreutils automake autoconf libtool openssl-devel cmake
                                # yum-config-manager --enable powertools
                                # yum install libstdc++-static -y

                            CMake 3.18 installation

                            .. code-block:: console

                                # curl -OL https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz && cd cmake-3.18.3 && ./bootstrap --no-system-curl && make -j$(nproc) && make install
                                # cd .. && rm -rf cmake-*
                                # export PATH=/usr/local/bin:$PATH

                .. group-tab:: APT

                    .. code-block:: console

                        # apt-get install python gcc g++ make libc6-dev curl policycoreutils automake autoconf libtool libssl-dev

                    CMake 3.18 installation

                    .. code-block:: console

                        # curl -OL https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz && cd cmake-3.18.3 && ./bootstrap --no-system-curl && make -j$(nproc) && make install
                        # cd .. && rm -rf cmake-*

                .. group-tab:: ZYpp

                    .. code-block:: console

                        # zypper install -y make gcc gcc-c++ policycoreutils-python automake autoconf libtool libopenssl-devel curl

                    CMake 3.18 installation

                    .. code-block:: console

                        # curl -OL https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz && cd cmake-3.18.3 && ./bootstrap --no-system-curl && make -j$(nproc) && make install
                        # cd .. && rm -rf cmake-*

                    .. note::
                    
                        For Suse 11, it is possible that some of the tools are not found in the package manager, in that case you can add the following official repository:

                            .. code-block:: console

                                # zypper addrepo http://download.opensuse.org/distribution/11.4/repo/oss/ oss

                .. group-tab:: Pacman
                
                    GCC/G++ 9.4 is the recommended version to build wazuh.

                    .. code-block:: console

                        # pacman --noconfirm -Syu curl gcc make sudo wget expect gnupg perl-base perl fakeroot python brotli automake autoconf libtool gawk libsigsegv nodejs base-devel inetutils cmake

                .. group-tab:: APK

                    Alpine Package Keeper is the default package manager that Alpine Linux uses to manage its packages.

                    .. code-block:: console

                        # apk --update add automake autoconf cmake curl gcc gettext-dev g++ linux-headers libgcc libtool make procps python3 openssl-dev 

        #.  Download and extract the latest version:

            .. code-block:: console

                # curl -Ls https://github.com/wazuh/wazuh/archive/v|WAZUH_CURRENT_FROM_SOURCES|.tar.gz | tar zx

        #.  Run the ``install.sh`` script. This will run a wizard that will guide you through the installation process using the Wazuh sources:

            .. code-block:: console

                # cd wazuh-|WAZUH_CURRENT_FROM_SOURCES|
                # ./install.sh

            If you have previously compiled for another platform, you must clean the build using the Makefile in ``src``:

            .. code-block:: console

                # cd wazuh-|WAZUH_CURRENT_FROM_SOURCES|
                # make -C src clean
                # make -C src clean-deps

            .. note::
            
                During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``agent``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default path of installation is ``/var/ossec``. A commonly used custom path might be ``/opt``. When choosing a different path than the default, if the directory already exists, the installer will ask to delete the directory or proceed by installing Wazuh inside it. You can also run an :doc:`unattended installation </user-manual/reference/unattended-installation>`.

        #.  The script will ask about what kind of installation you want. Type agent in order to install a Wazuh agent:

            .. code-block:: none
                :class: output

                1- What kind of installation do you want (manager, agent, local, hybrid or help)? agent

                
        .. rubric:: Next steps
           :class: h2
           
        Now that the agent is installed, the next step is to enroll the agent with the Wazuh server. For more information about this process, please check the :doc:`/user-manual/agent-enrollment/index` section.

        .. raw:: html

            <h2>Uninstall</h2>

        To uninstall the Wazuh agent, set WAZUH_HOME with the current installation path:

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
        
        .. tabs::
          
            .. tab:: SysV init

                .. code-block:: console

                    # [ -f /etc/rc.local ] && sed -i'' '/wazuh-control start/d' /etc/rc.local
                    # find /etc/{init.d,rc*.d} -name "*wazuh*" | xargs rm -f

            .. tab:: Systemd

                .. code-block:: console

                    # find /etc/systemd/system -name "wazuh*" | xargs rm -f
                    # systemctl daemon-reload

        Remove Wazuh user and group:

            .. code-block:: console

                # userdel wazuh 2> /dev/null
                # groupdel wazuh 2> /dev/null

    .. group-tab:: Windows

        .. note::
        
            The following procedure has been tested on Ubuntu 22.04 and may work with other Debian/Ubuntu versions as well. It is required to use MinGW 10.

        #.  Set up the Ubuntu build environment. Install these dependencies to build the Windows Wazuh agent installer on Ubuntu:

            .. code-block:: console

                # apt-get install curl gcc-mingw-w64 g++-mingw-w64-i686 g++-mingw-w64-x86-64 nsis make cmake

        #.  Set up Windows build environment. To generate the installer, the following dependencies must be in place on the Windows machine:

            -   `WiX Toolset <http://wixtoolset.org/>`_.
            -   .NET framework 3.5.1.
            -   Microsoft Windows SDK.

        #.  Download the Wazuh source code on the Ubuntu machine and unzip it:

            .. code-block:: console

                # curl -Ls https://github.com/wazuh/wazuh/archive/v|WAZUH_CURRENT_FROM_SOURCES|.tar.gz | tar zx
                # cd wazuh-|WAZUH_CURRENT_FROM_SOURCES|/src

        #.  Compile the Agent by running the ``make`` command:

            .. code-block:: console

                # make deps TARGET=winagent
                # make TARGET=winagent

            The following output will appear at the end of the building process:

            .. code-block:: none
                :class: output

                Done building winagent

        #.  Moves the entire repository to the Windows machine. It is recommended to compress it to speed up the process.

            .. code-block:: console

                # cd ../.. && zip -r wazuh.zip wazuh-|WAZUH_CURRENT_FROM_SOURCES|

        #.  Decompress the repository on the Windows machine, run the ``wazuh-installer-build-msi.bat`` script from the win32 folder.

            .. code-block:: doscon

                > cd wazuh-|WAZUH_CURRENT_FROM_SOURCES|\src\win32
                > .\wazuh-installer-build-msi.bat

            If you do not want to sign the installer, you will have to comment or delete the signtool line in the previous script.

            .. code-block:: doscon

                :: signtool sign /a /tr http://rfc3161timestamp.globalsign.com/advanced /d "%MSI_NAME%" /td SHA256 "%MSI_NAME%"
                
        #.  Specify the version and the revision number when prompted. This will also generate the Windows installer file. In the following output, the version is set as |WAZUH_CURRENT_WIN_FROM_SOURCES| and the revision is set as |WAZUH_CURRENT_WIN_FROM_SOURCES_REV|. This generates the Windows installer ``wazuh-agent-|WAZUH_CURRENT_WIN_FROM_SOURCES|-|WAZUH_CURRENT_WIN_FROM_SOURCES_REV|.msi``
        
            .. code-block:: doscon
            
                C:\wazuh\wazuh-|WAZUH_CURRENT_FROM_SOURCES|\src\win32>REM IF VERSION or REVISION are empty, ask for their value

                C:\wazuh\wazuh-|WAZUH_CURRENT_FROM_SOURCES|\src\win32>IF [] == [] set /p VERSION=Enter the version of the Wazuh agent (x.y.z):
                Enter the version of the Wazuh agent (x.y.z):|WAZUH_CURRENT_WIN_FROM_SOURCES|

                C:\wazuh\wazuh-|WAZUH_CURRENT_FROM_SOURCES|\src\win32>IF [] == [] set /p REVISION=Enter the revision of the Wazuh agent:
                Enter the revision of the Wazuh agent:1

                C:\wazuh\wazuh-|WAZUH_CURRENT_FROM_SOURCES|\src\win32>SET MSI_NAME=wazuh-agent-|WAZUH_CURRENT_WIN_FROM_SOURCES|-|WAZUH_CURRENT_WIN_FROM_SOURCES_REV|.msi

        #.   Proceed to install wazuh-agent-|WAZUH_CURRENT_FROM_SOURCES|-|WAZUH_CURRENT_WIN_FROM_SOURCES_REV|.msi  by following the :doc:`installation guide </installation-guide/wazuh-agent/wazuh-agent-package-windows>`.

        .. rubric:: Next steps
           :class: h2
           
        Now that the agent is installed, the next step is to enroll the agent with the Wazuh server. For more information about this process, please check the :doc:`/user-manual/agent-enrollment/index` section.

        .. raw:: html

            <h2>Uninstall</h2>

        To uninstall the agent, the original MSI file will be needed to perform the unattended process:

        .. code-block:: doscon

            msiexec.exe /x wazuh-agent-|WAZUH_CURRENT_WIN_FROM_SOURCES|-|WAZUH_CURRENT_WIN_FROM_SOURCES_REV|.msi /qn

    .. group-tab:: macOS

        #. Install brew, a package manager for macOS:

            .. code-block:: console

                $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

            .. warning::
                In some macOS versions, this first command may fail reporting that `homebrew/core` is shallow clone. If this happens, run the following commands to solve it.

                .. code-block:: console

                    $ rm -rf "/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core"
                    $ brew tap homebrew/core

                After that, run again the first one to properly install brew:

                .. code-block:: console

                    $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

        #. Install development tools and compilers through brew.

            .. code-block:: console

                $ brew install automake autoconf libtool cmake

        #.  Download and extract the latest version:

            .. code-block:: console

                # curl -Ls https://github.com/wazuh/wazuh/archive/v|WAZUH_CURRENT_FROM_SOURCES|.tar.gz | tar zx

            .. note::
            
                All the commands described below need to be executed with root user privileges.

        #.  Run the ``install.sh`` script. This will run a wizard that will guide you through the installation process using the Wazuh sources:

            .. code-block:: console

                # cd wazuh-|WAZUH_CURRENT_FROM_SOURCES|
                # USER_DIR="/Library/Ossec" ./install.sh

            .. note::
            
                Note that with the variable ``USER_DIR``, it has been indicated that the agent installation path is ``/Library/Ossec``

            If you have previously compiled for another platform, you must clean the build using the Makefile in ``src``:

            .. code-block:: console

                # cd wazuh-|WAZUH_CURRENT_FROM_SOURCES|
                # make -C src clean
                # make -C src clean-deps

            .. note::
            
                During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``agent``, then set the installation path (``Choose where to install Wazuh [/Library/Ossec]``). The default path of installation is ``/Library/Ossec``. When choosing a different path than the default, if the directory already exists, the installer will ask to delete the directory or proceed by installing Wazuh inside it. You can also run an :doc:`unattended installation </user-manual/reference/unattended-installation>`.

        #. The script will ask about what kind of installation you want. Type agent in order to install a Wazuh agent:

            .. code-block:: none
                :class: output

                1- What kind of installation do you want (manager, agent, local, hybrid, or help)? agent

        .. rubric:: Next steps
           :class: h2
          
        Now that the agent is installed, the next step is to enroll the agent with the Wazuh server. For more information about this process, please check the :doc:`/user-manual/agent-enrollment/index` section.

        .. raw:: html

            <h2>Uninstall</h2>

        To uninstall Wazuh agent, set ``WAZUH_HOME`` with the current installation path:

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

            # rm -rf /Library/StartupItems/WAZUH

        Remove Wazuh user and group:

        .. code-block:: console

            # dscl . -delete "/Users/wazuh" > /dev/null 2>&1
            # dscl . -delete "/Groups/wazuh" > /dev/null 2>&1

    .. group-tab:: AIX

        AIX 6.1 TL4 or greater is the supported version for the following installation procedure. 

        .. note::

            All the commands described below need to be executed with root user privileges. Since Wazuh 3.5, it is necessary to have an Internet connection when following this process.

        #.  Install development tools and compilers.

            #.  Download the ``wget`` tool.

                .. code-block:: console

                    # rpm -Uvh --nodeps http://packages-dev.wazuh.com/deps/aix/wget-1.19-1.aix6.1.ppc.rpm

            #.  Download the following script.

                .. code-block:: console

                    # wget https://raw.githubusercontent.com/wazuh/wazuh-packages/|WAZUH_CURRENT_MINOR_FROM_SOURCES|/aix/generate_wazuh_packages.sh --no-check-certificate

                .. note::
                
                    If you can’t download the script this way, then you should download it using another machine and copy it to the AIX machine via the scp utility.

            #.  Download bash and libiconv.
            
                .. code-block:: console
                
                    # rpm -Uvh --nodeps http://packages-dev.wazuh.com/deps/aix/bash-4.4-4.aix6.1.ppc.rpm
                    # rpm -Uvh --nodeps http://packages-dev.wazuh.com/deps/aix/libiconv-1.14-22.aix6.1.ppc.rpm

            #.  Install the necessary dependencies using the script.

                .. code-block:: console

                    # chmod +x generate_wazuh_packages.sh
                    # ./generate_wazuh_packages.sh -e

            .. note::
            
                This step may take a few minutes.

        #.  Download the latest version.

            .. code-block:: console

                # wget -O wazuh.tar.gz --no-check-certificate https://api.github.com/repos/wazuh/wazuh/tarball/v|WAZUH_CURRENT_FROM_SOURCES| 
                # gunzip -c wazuh.tar.gz | tar -xvf -

            .. note::
            
                If you can't download the repository this way, then you should copy it via the scp utility.

        #.  Compile the sources.

            .. code-block:: console

                # cd wazuh-|WAZUH_CURRENT_FROM_SOURCES|
                # cd src
                # gmake clean-deps
                # gmake clean
                # gmake deps TARGET=agent RESOURCES_URL=http://packages.wazuh.com/deps/15
                # gmake TARGET=agent USE_SELINUX=no PREFIX=/var/ossec

        #.  Run the ``install.sh`` script. This will run a wizard that will guide you through the installation process using the Wazuh sources:

            .. code-block:: console

                # cd ..
                # ./install.sh

            If you have previously compiled for another platform, you must clean the build using the Makefile in ``src``:

            .. code-block:: console

                # gmake -C src clean-deps
                # gmake -C src clean

            .. note::
            
                During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``agent``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default path of installation is ``/var/ossec``. A commonly used custom path might be ``/opt``. When choosing a different path than the default, if the directory already exists, the installer will ask to delete the directory or proceed by installing Wazuh inside it. You can also run an  :doc:`unattended installation </user-manual/reference/unattended-installation>`.

        #.  Finally, apply the following configuration:

            .. code-block:: console

                # sed '/System inventory/,/^$/{/^$/!d;}' /var/ossec/etc/ossec.conf > /var/ossec/etc/ossec.conf.tmp
                # mv /var/ossec/etc/ossec.conf.tmp /var/ossec/etc/ossec.conf

            .. note::
            
                Note that the above commands have been executed for the default installation path ``/var/ossec``. If you have installed the agent in another path, you will have to modify the path of those commands.

        .. rubric:: Next steps
           :class: h2
          
        Now that the agent is installed, the next step is to enroll the agent with the Wazuh server. For more information about this process, please check the :doc:`/user-manual/agent-enrollment/index` section.

        .. raw:: html

            <h2>Uninstall</h2>

        To uninstall Wazuh agent, set ``WAZUH_HOME`` with the current installation path:

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

        Remove Wazuh user and group:

            .. code-block:: console

                # userdel wazuh 2> /dev/null
                # groupdel wazuh 2> /dev/null

    .. group-tab:: HP-UX

        .. note::
        
            All the commands described below need to be executed with root user privileges. Since Wazuh 3.5, it is necessary to have an Internet connection when following this process.

        #.  Install development tools and compilers.

            #.  Download the ``depothelper-2.10-hppa_32-11.31.depot`` file.

                .. code-block:: console

                    # /usr/local/bin/wget https://github.com/wazuh/wazuh-packages/raw/master/hp-ux/depothelper-2.10-hppa_32-11.31.depot --no-check-certificate

                .. note::
                
                    If you can’t download the script this way, then you should download it using another machine and copy it to the HP-UX machine via the scp utility.

            #.  Install the package manager. The absolute path to the depot file is used.

                .. code-block:: console

                    # swinstall -s /ABSOLUTE/PATH/depothelper-2.10-hppa_32-11.31.depot \*

            #.  Download the ``wget`` tool (If it is not installed).

                .. code-block:: console

                    # /usr/local/bin/depothelper -f wget

            #.  Download the following script

                .. code-block:: console

                    # /usr/local/bin/wget https://raw.githubusercontent.com/wazuh/wazuh-packages/master/hp-ux/generate_wazuh_packages.sh --no-check-certificate

                .. note::
                
                    If you can't download the script this way, then you should copy it via the scp utility.

            #.  Install the necessary dependencies using the script.

                .. code-block:: console

                    # chmod +x generate_wazuh_packages.sh
                    # ./generate_wazuh_packages.sh -e

            .. note::
            
                This step may take a long time.

        #.  Download the latest version.

            .. code-block:: console

                # /usr/local/bin/curl -k -L -O https://github.com/wazuh/wazuh/archive/v|WAZUH_CURRENT_FROM_SOURCES|.zip && /usr/local/bin/unzip v|WAZUH_CURRENT_FROM_SOURCES|

            .. note::
            
                If you can't download the repository this way, then you should copy it via the scp utility.

        #.  Compile the sources.

            .. code-block:: console

                # cd wazuh-|WAZUH_CURRENT_FROM_SOURCES|
                # /usr/local/bin/gmake -C src deps RESOURCES_URL=http://packages.wazuh.com/deps/14 TARGET=agent
                # /usr/local/bin/gmake -C src TARGET=agent USE_SELINUX=no

        #.  Run the ``install.sh`` script. This will run a wizard that will guide you through the installation process using the Wazuh sources:

            .. code-block:: console

                # ./install.sh

            If you have previously compiled for another platform, you must clean the build using the Makefile in ``src``:

            .. code-block:: console

                # /usr/local/bin/gmake -C src clean-deps
                # /usr/local/bin/gmake -C src clean

            .. note::
            
                During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``agent``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default path of installation is ``/var/ossec``. A commonly used custom path might be ``/opt``. When choosing a different path than the default, if the directory already exists, the installer will ask to delete the directory or proceed by installing Wazuh inside it. You can also run an  :doc:`unattended installation </user-manual/reference/unattended-installation>`.

        .. rubric:: Next steps
           :class: h2
          
        Now that the agent is installed, the next step is to enroll the agent with the Wazuh server. For more information about this process, please check the :doc:`/user-manual/agent-enrollment/index` section.

        .. raw:: html

            <h2>Uninstall</h2>

        To uninstall Wazuh agent, set ``WAZUH_HOME`` with the current installation path:

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

        Remove Wazuh user and group:

            .. code-block:: console

                # userdel wazuh 2> /dev/null
                # groupdel wazuh 2> /dev/null

    .. group-tab:: Solaris

        This section describes how to download and build the Wazuh agent from sources for the following Solaris versions:

        -   For Solaris i386
        -   For Solaris SPARC

        .. tabs::

            .. tab:: Solaris 10

                .. note::
                
                    All the commands described below need to be executed with root user privileges. Since Wazuh 3.5, it is necessary to have an Internet connection when following this process.

                #.  Install development tools and compilers.

                    #.  Run the bash shell and install pkgutil.

                        .. code-block:: console

                            # bash
                            # PATH="${PATH}:/usr/sbin:/usr/bin:/usr/sbin/:/opt/csw/gnu/:/usr/sfw/bin/:/opt/csw/bin/"
                            # export PATH
                            # pkgadd -d http://get.opencsw.org/now

                    #.  Install the following tools:

                        .. code-block:: console

                            # /opt/csw/bin/pkgutil -y -i git cmake automake autoconf gmake libtool wget curl gcc5core gcc5g++ gtar

                    #.  Download and build the gcc/g++ 5.5 compiler:

                        .. code-block:: console

                            # curl -L http://packages.wazuh.com/utils/gcc/gcc-5.5.0.tar.gz | gtar xz && cd gcc-5.5.0
                            # curl -L http://packages.wazuh.com/utils/gcc/mpfr-2.4.2.tar.bz2 | gtar xj && mv mpfr-2.4.2 mpfr
                            # curl -L http://packages.wazuh.com/utils/gcc/gmp-4.3.2.tar.bz2 | gtar xj && mv gmp-4.3.2 gmp
                            # curl -L http://packages.wazuh.com/utils/gcc/mpc-0.8.1.tar.gz | gtar xz && mv mpc-0.8.1 mpc
                            # curl -L http://packages.wazuh.com/utils/gcc/isl-0.14.tar.bz2 | gtar xj && mv isl-0.14 isl
                            # unset CPLUS_INCLUDE_PATH && unset LD_LIBRARY_PATH
                            # export PATH=/usr/sbin:/usr/bin:/usr/ccs/bin:/opt/csw/bin
                            # mkdir -p /usr/local
                            # ./configure --prefix=/usr/local/gcc-5.5.0 --enable-languages=c,c++ --disable-multilib --disable-libsanitizer --disable-bootstrap --with-ld=/usr/ccs/bin/ld --without-gnu-ld --with-gnu-as --with-as=/opt/csw/bin/gas
                            # gmake && gmake install
                            # export CPLUS_INCLUDE_PATH=/usr/local/gcc-5.5.0/include/c++/5.5.0
                            # export LD_LIBRARY_PATH=/usr/local/gcc-5.5.0/lib
                            # echo "export PATH=/usr/sbin:/usr/bin:/usr/ccs/bin:/opt/csw/bin" >> /etc/profile
                            # echo "export CPLUS_INCLUDE_PATH=/usr/local/gcc-5.5.0/include/c++/5.5.0" >> /etc/profile
                            # echo "export LD_LIBRARY_PATH=/usr/local/gcc-5.5.0/lib" >> /etc/profile
                            # rm -rf gcc-*
                            # ln -sf /usr/local/gcc-5.5.0/bin/g++ /usr/bin/g++
                            # cd ..

                        .. note::
                        
                            The ``gmake`` step will take several minutes to complete. This is normal behavior.

                    #.  Install cmake library:

                        .. code-block:: console

                            # curl -sL http://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz | gtar xz
                            # cd cmake-3.18.3
                            # ./bootstrap
                            # gmake && gmake install
                            # cd .. && rm -rf cmake-3.18.3
                            # ln -sf /usr/local/bin/cmake /usr/bin/cmake

                    #.  Download and install perl 5.10.1.
                    
                        .. code-block:: console
                        
                            # wget http://www.cpan.org/src/5.0/perl-5.10.1.tar.gz
                            # gunzip ./perl-5.10.1.tar.gz && tar xvf perl-5.10.1.tar
                            # cd perl-5.10.1
                            # ./Configure -Dcc=gcc -d -e -s
                            # gmake clean && gmake -d -s
                            # gmake install -d -s
                            # cd ..
                    
                    #.  Remove the old version of perl and replace it with perl 5.10.1.
                    
                        .. code-block:: console
                        
                            # rm /usr/bin/perl
                            # mv /opt/csw/bin/perl5.10.1 /usr/bin/
                            # mv /usr/bin/perl5.10.1 /usr/bin/perl
                            # rm -rf perl-5.10.1*

                #.  Download the latest version of Wazuh.

                    .. code-block:: console

                        # /opt/csw/bin/git clone -b v|WAZUH_CURRENT_FROM_SOURCES| https://github.com/wazuh/wazuh.git

                #.  Compile the sources.

                    *   For Solaris 10 i386:

                        .. code-block:: console

                            # export PATH=/usr/local/gcc-5.5.0/bin:/usr/sbin:/usr/bin:/usr/ccs/bin:/opt/csw/bin:/opt/csw/gnu
                            # export CPLUS_INCLUDE_PATH=/usr/local/gcc-5.5.0/include/c++/5.5.0
                            # export LD_LIBRARY_PATH=/usr/local/gcc-5.5.0/lib
                            # cd wazuh/src
                            # gmake clean
                            # gmake deps TARGET=agent 
                            # gmake -j 4 TARGET=agent PREFIX=/var/ossec USE_SELINUX=no
                            # cd ..

                    *   For Solaris 10 SPARC:

                        .. code-block:: console

                            # export PATH=/usr/local/gcc-5.5.0/bin:/usr/sbin:/usr/bin:/usr/ccs/bin:/opt/csw/bin:/opt/csw/gnu
                            # export CPLUS_INCLUDE_PATH=/usr/local/gcc-5.5.0/include/c++/5.5.0
                            # export LD_LIBRARY_PATH=/usr/local/gcc-5.5.0/lib
                            # cd wazuh/src
                            # gmake clean
                            # gmake deps TARGET=agent RESOURCES_URL=http://packages.wazuh.com/deps/15
                            # gmake -j 4 TARGET=agent PREFIX=/var/ossec USE_SELINUX=no
                            USE_BIG_ENDIAN=yes
                            # cd ..

                #.  Patch solaris 10 sh files to change the shebang.

                    .. code-block:: console

                        # for file in $(find . -name "*.sh");do
                        sed 's:#!/bin/sh:#!/usr/xpg4/bin/sh:g' $file > $file.new
                        mv $file.new $file && chmod +x $file
                        done

                #.  Run the ``install.sh`` script. This will run a wizard that will guide you through the installation process using the Wazuh sources:

                    .. code-block:: console

                        # bash install.sh

                    If you have previously compiled for another platform, you must clean the build using the Makefile in src:

                    .. code-block:: console

                        # gmake -C src clean
                        # gmake -C src clean-deps

                    .. note::

                        During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``agent``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default path of installation is ``/var/ossec``. A commonly used custom path might be ``/opt``. When choosing a different path than the default, if the directory already exists, the installer will ask to delete the directory or proceed by installing Wazuh inside it. You can also run an :doc:`unattended installation </user-manual/reference/unattended-installation>`.

                #. The script will ask about what kind of installation you want. Type ``agent`` in order to install a Wazuh agent:

                    .. code-block:: none
                        :class: output

                        1- What kind of installation do you want (manager, agent, local, hybrid, or help)? agent

                .. rubric:: Next steps
                   :class: h2
                  
                Now that the agent is installed, the next step is to enroll the agent with the Wazuh server. For more information about this process, please check the :doc:`/user-manual/agent-enrollment/index` section.

                .. raw:: html

                    <h3>Uninstall</h3>

                To uninstall Wazuh agent, set ``WAZUH_HOME`` with the current installation path:

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

                    # find /etc/{init.d,rc*.d} -name "*wazuh*" | xargs rm -f

                Remove Wazuh user and group:

                .. code-block:: console

                    # userdel wazuh 2> /dev/null
                    # groupdel wazuh 2> /dev/null

            .. tab:: Solaris 11

                .. note::
                
                    All the commands described below need to be executed with root user privileges. Since Wazuh 3.5, it is necessary to have an Internet connection when following this process.

                #.  Install development tools and build the needed compilers.

                    #.  Install pkgutil and update it.

                        .. code-block:: console

                            # pkgadd -d http://get.opencsw.org/now
                            # export PATH="${PATH}:/usr/sfw/bin:/opt/csw/bin:/opt/ccs/bin"
                            # pkgutil -y -U

                    #.  Install python 2.7. 

                        .. code-block:: console

                            # /opt/csw/bin/pkgutil -y -i python27
                            # ln -sf /opt/csw/bin/python2.7 /usr/bin/python

                    #.  Install the following tools:

                        .. code-block:: console

                            # pkgutil -y -i git gmake cmake gcc5core gcc5g++

                    #.  Install a gcc version to include all files needed in the next step:

                        .. code-block:: console

                            # pkg install gcc-45

                    #.  Download and build the gcc/g++ 5.5 compiler:

                        .. code-block:: console

                            # curl -O https://packages.wazuh.com/utils/gcc/gcc-5.5.0.tar.gz && gtar xzf gcc-5.5.0.tar.gz
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

                        .. note::
                        
                            The ``gmake`` step will take several minutes to complete. This is normal behavior.

                    #.  Install cmake library:

                        .. code-block:: console

                            # curl -O -L https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && gtar xzf cmake-3.18.3.tar.gz && ln -sf cmake-3.18.3 cmake
                            # cd cmake && ./bootstrap
                            # gmake
                            # gmake install
                            # cd .. && rm -rf cmake-*

                #.  Download the latest version.

                    .. code-block:: console

                        # git clone -b v|WAZUH_CURRENT_FROM_SOURCES| https://github.com/wazuh/wazuh.git

                    .. note::
                    
                        If you can’t download the file due to an Open SSL error, then you should copy the directory with the scp utility.

                #.  Run the ``install.sh`` script. This will run a wizard that will guide you through the installation process using the Wazuh sources:

                    .. code-block:: console

                        # cd wazuh*
                        # ./install.sh

                    If you have previously compiled for another platform, you must clean the build using the Makefile in ``src``:

                    .. code-block:: console

                        # gmake -C src clean
                        # gmake -C src clean-deps

                    .. note::

                        During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``agent``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default path of installation is ``/var/ossec``. A commonly used custom path might be ``/opt``. When choosing a different path than the default, if the directory already exists, the installer will ask to delete the directory or proceed by installing Wazuh inside it. You can also run an :doc:`unattended installation </user-manual/reference/unattended-installation>`.
                    

                #.  The script will ask about what kind of installation you want. Type ``agent`` in order to install a Wazuh agent:

                    .. code-block:: none
                        :class: output

                        1- What kind of installation do you want (manager, agent, local, hybrid, or help)? agent

                .. rubric:: Next steps
                   :class: h2
                  
                Now that the agent is installed, the next step is to enroll the agent with the Wazuh server. For more information about this process, please check the :doc:`/user-manual/agent-enrollment/index` section.

                .. raw:: html

                    <h3>Uninstall</h3>

                To uninstall the Wazuh agent, set WAZUH_HOME with the current installation path:

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

                    # find /etc/{init.d,rc*.d} -name "*wazuh*" | xargs rm -f

                Remove Wazuh user and group:

                .. code-block:: console

                    # userdel wazuh 2> /dev/null
                    # groupdel wazuh 2> /dev/null
