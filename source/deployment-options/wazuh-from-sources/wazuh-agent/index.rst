.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following section explains how to install the Wazuh agent from sources across different operating systems.

Installing the Wazuh agent from sources
=======================================

The Wazuh agent is a lightweight monitoring software. It is a multi-platform component that provides visibility into the endpoint’s security by collecting critical system and application logs/events. The following section explains how to install it from sources across different operating systems.

This section covers installing dependencies, downloading and compiling the source code, running the installation wizard, and uninstalling the Wazuh agent if necessary.

.. warning::

   Support for the following operating systems ends in Wazuh 5.0.0: Red Hat 5, CentOS 5, Oracle Linux 5, SUSE Linux Enterprise Server 11, Windows XP, Windows Vista, Windows Server 2003, Solaris, AIX, and HP-UX.

Installing dependencies
-----------------------

Before compiling Wazuh from sources, you need to install the required build tools and libraries for the destination operating system. This section covers the essential development tools, compilers, and build utilities needed to compile the Wazuh agent successfully on different platforms.

.. tabs::

   .. group-tab:: Linux

      .. note::

         You need root user privileges to run all the commands described below. Since Wazuh 3.5, an Internet connection is required to follow this process.

      .. note::

         CMake 3.12.4 is the minimal library version required to build the Wazuh agent solution.

      .. note::

         GCC 9.4 is the minimal compiler version required to build the Wazuh agent solution.

      #.  Install development tools and compilers. In Linux, this can easily be done using your distribution’s package manager:

         .. tabs::

            .. group-tab:: APT

               .. code-block:: console

                  # apt-get install python3 gcc g++ make libc6-dev curl policycoreutils automake autoconf libtool libssl-dev procps build-essential

               CMake 3.18 installation

               .. code-block:: console

                  # curl -OL https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz && cd cmake-3.18.3 && ./bootstrap --no-system-curl && make -j$(nproc) && make install
                  # cd .. && rm -rf cmake-*

            .. group-tab:: Yum

               .. tabs::

                  .. tab:: CentOS 6/7

                     .. code-block:: console

                        # yum update -y
                        # yum install make gcc gcc-c++ policycoreutils-python automake autoconf libtool centos-release-scl openssl-devel wget bzip2 procps -y
                        # curl -OL http://packages.wazuh.com/utils/gcc/gcc-9.4.0.tar.gz && tar xzf gcc-9.4.0.tar.gz  && cd gcc-9.4.0/ && ./contrib/download_prerequisites && ./configure --enable-languages=c,c++ --prefix=/usr --disable-multilib --disable-libsanitizer && make -j$(nproc) && make install && ln -fs /bin/g++ /usr/bin/c++ && ln -fs /bin/gcc /usr/bin/cc && cd .. && rm -rf gcc-*

                     CMake 3.18 installation

                     .. code-block:: console

                        # curl -OL https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz
                        # cd cmake-3.18.3 && ./bootstrap --no-system-curl
                        # make -j$(nproc) && make install
                        # cd .. && rm -rf cmake-*

                  .. tab:: CentOS 8

                     .. code-block:: console

                        # yum install make gcc gcc-c++ python3 python3-policycoreutils automake autoconf libtool openssl-devel cmake procps -y
                        # curl -OL http://packages.wazuh.com/utils/gcc/gcc-9.4.0.tar.gz && tar xzf gcc-9.4.0.tar.gz  && cd gcc-9.4.0/ && ./contrib/download_prerequisites && ./configure --enable-languages=c,c++ --prefix=/usr --disable-multilib --disable-libsanitizer && make -j$(nproc) && make install && ln -fs /bin/g++ /usr/bin/c++ && ln -fs /bin/gcc /usr/bin/cc && cd .. && rm -rf gcc-*
                        # yum-config-manager --enable PowerTools
                        # yum install libstdc++-static -y

                     CMake 3.18 installation

                     .. code-block:: console

                        # curl -OL https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz && cd cmake-3.18.3 && ./bootstrap --no-system-curl && make -j$(nproc) && make install
                        # cd .. && rm -rf cmake-*
                        # export PATH=/usr/local/bin:$PATH

                  .. tab:: CentOS 9

                     .. code-block:: console

                        # yum install make gcc gcc-c++ python3 python3-policycoreutils automake autoconf libtool openssl-devel cmake procps -y
                        # curl -OL http://packages.wazuh.com/utils/gcc/gcc-9.4.0.tar.gz && tar xzf gcc-9.4.0.tar.gz  && cd gcc-9.4.0/ && ./contrib/download_prerequisites && ./configure --enable-languages=c,c++ --prefix=/usr --disable-multilib --disable-libsanitizer && make -j$(nproc) && make install && ln -fs /bin/g++ /usr/bin/c++ && ln -fs /bin/gcc /usr/bin/cc && cd .. && rm -rf gcc-*
                        # yum config-manager --set-enabled crb
                        # yum install libstdc++-static -y

                     CMake 3.18 installation

                     .. code-block:: console

                        # curl -OL https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz && cd cmake-3.18.3 && ./bootstrap --no-system-curl && make -j$(nproc) && make install
                        # cd .. && rm -rf cmake-*
                        # export PATH=/usr/local/bin:$PATH

            .. group-tab:: DNF

               .. code-block:: console

                  # dnf update -y
                  # dnf groupinstall "Development Tools"
                  # dnf install gmp-devel mpfr-devel libmpc-devel isl-devel make cmake gcc gcc-c++ python3 python3-policycoreutils automake autoconf libtool openssl-devel yum-utils procps -y
                  # curl -OL http://packages.wazuh.com/utils/gcc/gcc-9.4.0.tar.gz && tar xzf gcc-9.4.0.tar.gz && cd gcc-9.4.0/ && ./configure --enable-languages=c,c++ --prefix=/usr --disable-multilib --disable-libsanitizer && make -j$(nproc) && make install && ln -fs /usr/bin/g++ /bin/c++ && ln -fs /usr/bin/gcc /bin/cc && cd .. && rm -rf gcc-*
                  # dnf config-manager --set-enabled crb
                  # dnf install libstdc++-static -y

               CMake 3.18 installation

               .. code-block:: console

                  # curl -OL https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz && cd cmake-3.18.3 && ./bootstrap --no-system-curl && make -j$(nproc) && make install
                  # cd .. && rm -rf cmake-*
                  # export PATH=/usr/local/bin:$PATH

            .. group-tab:: ZYpp

               .. code-block:: console

                  # zypper install -y make gcc12 gcc12-c++ policycoreutils-python automake autoconf libtool libopenssl-devel curl
                  # ln -sf /usr/bin/gcc-12 /usr/bin/gcc
                  # ln -sf /usr/bin/g++-12 /usr/bin/g++

               CMake 3.18 installation

               .. code-block:: console

                  # curl -OL https://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz && tar -zxf cmake-3.18.3.tar.gz && cd cmake-3.18.3 && ./bootstrap --no-system-curl && make -j$(nproc) && make install
                  # cd .. && rm -rf cmake-*

               .. note::

                  For Suse 11, it is possible that some of the tools are not found in the package manager. In that case, you can add the following official repository:

                  .. code-block:: console

                     # zypper addrepo http://download.opensuse.org/distribution/11.4/repo/oss/ oss

            .. group-tab:: Pacman

               GCC/G++ 14 is the recommended version to build Wazuh.

               .. code-block:: console

                  # pacman --noconfirm -Syu curl gcc14 make sudo wget expect gnupg perl-base perl fakeroot python brotli automake autoconf libtool gawk libsigsegv nodejs base-devel inetutils cmake

   .. group-tab:: Windows

      This section covers installing dependencies on Ubuntu and Windows endpoints. For Windows agent installation, Wazuh uses cross-compilation from a Linux environment to build the Windows installer package.

      .. note::

         This procedure is tested on Ubuntu 22.04 and might work with other Debian/Ubuntu versions as well. It is required to use MinGW 10.

      #. Set up the Ubuntu build environment. Install these dependencies to build the Windows Wazuh agent installer on Ubuntu:

         .. code-block:: console

            # apt-get install curl gcc-mingw-w64 g++-mingw-w64-i686 g++-mingw-w64-x86-64 nsis make cmake

      #. Set up Windows build environment. To generate the installer, the following dependencies must be in place on the Windows machine:

         -  `WIX Toolset v3.11 <http://wixtoolset.org/>`_.

            .. note::

               If you install a WiX Toolset version other than v3.11 on your Windows endpoint, update the batch file at: ``wazuh-4.12.0/src/win32/wazuh-installer-build-msi.bat``. On line 3, replace ``"WiX Toolset v3.11"`` with the exact version you installed.

         -  .NET Framework 3.5.1.
         -  Microsoft Windows SDK.

   .. group-tab:: macOS

      This section covers installing dependencies on macOS systems. The process involves installing Homebrew and setting up build tools.

      #. Install Homebrew, the package manager for macOS.

         .. code-block:: console

            $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

         .. note::

            On some macOS versions, this command may fail with a message indicating that ``homebrew/core`` is a shallow clone.
            To fix this issue, run:

            .. code-block:: console

               $ rm -rf "/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core"
               $ brew tap homebrew/core

            Then, re-run the Homebrew installation command above.

      #. Install development tools and compilers through Brew:

         .. code-block:: console

            $ brew install automake autoconf libtool cmake

   .. group-tab:: AIX

      This section covers installing dependencies on IBM AIX systems. The process involves setting up the build environment and installing dependencies.

      AIX 6.1 TL9 or greater is the supported version for the following installation procedure.

      .. note::

         All the commands described below need to be executed with root user privileges. Since Wazuh 3.5, an Internet connection is required for this process.

      #. Download the ``wget`` tool.

         .. code-block:: console

            # rpm -Uvh --nodeps http://packages-dev.wazuh.com/deps/aix/wget-1.19-1.aix6.1.ppc.rpm

      #. Download the following script.

         .. code-block:: console

            # wget https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_CURRENT|/packages/aix/generate_wazuh_packages.sh --no-check-certificate

         .. note::

            If you can’t download the script this way, then you should download it using another machine and copy it to the AIX machine via the scp utility.

      #. Download bash and libiconv.

         .. code-block:: console

            # rpm -Uvh --nodeps http://packages-dev.wazuh.com/deps/aix/bash-4.4-4.aix6.1.ppc.rpm
            # rpm -Uvh --nodeps http://packages-dev.wazuh.com/deps/aix/libiconv-1.14-22.aix6.1.ppc.rpm

      #. Install the necessary dependencies using the script.

         .. code-block:: console

            # chmod +x generate_wazuh_packages.sh
            # ./generate_wazuh_packages.sh -e

         .. note::

            This step may take a few minutes.

   .. group-tab:: HP-UX

      This section covers installing dependencies on HP-UX systems. The process involves setting up the build environment and installing dependencies.

      .. note::

         All the commands described below need to be executed with root user privileges. Since Wazuh 3.5, an internet connection is required for this process.

      #. Download the ``depothelper-2.10-hppa_32-11.31.depot`` file.

         .. code-block:: console

            # /usr/local/bin/wget https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_CURRENT|/packages/hp-ux/depothelper-2.20-ia64_64-11.31.depot --no-check-certificate

         .. note::

            If you can’t download the script this way, then you should download it using another machine and copy it to the HP-UX machine via the scp utility.

      #. Install the package manager. The absolute path to the depot file is used.

         .. code-block:: console

            # swinstall -s /ABSOLUTE/PATH/depothelper-2.10-hppa_32-11.31.depot \*

      #. Download the ``wget`` tool (If it is not installed).

         .. code-block:: console

            # /usr/local/bin/depothelper -f wget

      #. Download the following script

         .. code-block:: console

            # /usr/local/bin/wget https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_CURRENT|/packages/hp-ux/generate_wazuh_packages.sh --no-check-certificate

         .. note::

            If you can't download the script this way, then you should copy it via the scp utility.

      #. Install the necessary dependencies using the script.

         .. code-block:: console

            # chmod +x generate_wazuh_packages.sh
            # ./generate_wazuh_packages.sh -e

         .. note::

            This step may take a long time.

   .. group-tab:: Solaris

      This section covers installing dependencies on Oracle Solaris systems. The process involves setting up build tools and installing dependencies for both i386 and SPARC architectures.

      .. note::

         All the commands described below need to be executed with root user privileges. Since Wazuh 3.5, an internet connection is required for this process.

      .. tabs::

         .. tab:: Solaris 10

            #. Run the bash shell and install pkgutil.

               .. code-block:: console

                  # bash
                  # PATH="${PATH}:/usr/sbin:/usr/bin:/usr/sbin/:/opt/csw/gnu/:/usr/sfw/bin/:/opt/csw/bin/"
                  # export PATH
                  # pkgadd -d http://get.opencsw.org/now

            #. Install the following tools:

               .. code-block:: console

                  # /opt/csw/bin/pkgutil -y -i git cmake automake autoconf gmake libtool wget curl gcc5core gcc5g++ gtar

            #. Download and build the gcc/g++ 5.5 compiler:

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

            #. Install cmake library:

               .. code-block:: console

                  # curl -sL http://packages.wazuh.com/utils/cmake/cmake-3.18.3.tar.gz | gtar xz
                  # cd cmake-3.18.3
                  # ./bootstrap
                  # gmake && gmake install
                  # cd .. && rm -rf cmake-3.18.3
                  # ln -sf /usr/local/bin/cmake /usr/bin/cmake

            #. Download and install perl 5.10.1.

               .. code-block:: console

                  # wget http://www.cpan.org/src/5.0/perl-5.10.1.tar.gz
                  # gunzip ./perl-5.10.1.tar.gz && tar xvf perl-5.10.1.tar
                  # cd perl-5.10.1
                  # ./Configure -Dcc=gcc -d -e -s
                  # gmake clean && gmake -d -s
                  # gmake install -d -s
                  # cd ..

            #. Remove the old version of perl and replace it with perl 5.10.1.

               .. code-block:: console

                  # rm /usr/bin/perl
                  # mv /opt/csw/bin/perl5.10.1 /usr/bin/
                  # mv /usr/bin/perl5.10.1 /usr/bin/perl
                  # rm -rf perl-5.10.1*

         .. tab:: Solaris 11

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

                            # /opt/csw/bin/pkgutil -y -i git gmake cmake gcc5core gcc5g++

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

                Now that the agent is installed, the next step is to enroll the agent with the Wazuh server. For more information about this process, please check the :doc:`/user-manual/agent/agent-enrollment/index` section.

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
