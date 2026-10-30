.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following section explains how to install the Wazuh agent from sources across different operating systems.

Installing the Wazuh agent from sources
=======================================

The Wazuh agent is a lightweight monitoring software. It is a multi-platform component that provides visibility into the endpoint’s security by collecting critical system and application logs/events. The following section explains how to install it from sources across different operating systems.

This section covers installing dependencies, downloading and compiling the source code, running the installation wizard, and uninstalling the Wazuh agent if necessary.

Installing dependencies
-----------------------

Before compiling Wazuh from sources, you need to install the required build tools and libraries for the destination operating system. This section covers the essential development tools, compilers, and build utilities needed to compile the Wazuh agent successfully on different platforms.

.. tabs::

   .. group-tab:: Linux

      .. note::

         You need root user privileges to run all the commands described below. The build downloads external dependencies, so it requires an Internet connection. Building the Wazuh agent requires GCC 13 or later and CMake 3.22.1 or later.

      #. Install the development tools and compilers with the package manager of your distribution. These commands are tested with the Wazuh 5.0.0 RC2 sources on Ubuntu 26.04, Ubuntu 24.04, CentOS Stream 10, and Amazon Linux 2023. Other systems and versions are likely to work, but we can't guarantee it.

         .. tabs::

            .. group-tab:: APT

               .. code-block:: console

                  # apt-get update
                  # apt-get install gcc g++ make cmake curl procps policycoreutils

            .. group-tab:: Yum

               .. code-block:: console

                  # yum install make cmake gcc14 gcc14-c++ gcc14-libstdc++-static procps-ng policycoreutils tar gzip
                  # export CC=gcc14-gcc CXX=gcc14-g++

               Amazon Linux 2023 includes GCC 11 by default. These commands install GCC 14 and select it for the build. Run the build and the ``install.sh`` script in the same shell, so that they use GCC 14.

            .. group-tab:: DNF

               .. code-block:: console

                  # dnf install make cmake gcc gcc-c++ curl procps-ng policycoreutils dnf-plugins-core
                  # dnf config-manager --set-enabled crb
                  # dnf install libstdc++-static

   .. group-tab:: Windows

      This section covers installing dependencies on Ubuntu and Windows endpoints. For Windows agent installation, Wazuh uses cross-compilation from a Linux environment to build the Windows installer package.

      .. note::

         This procedure is tested on Ubuntu 24.04 and Ubuntu 26.04, and might work with other Debian and Ubuntu versions.

      #. Set up the Ubuntu build environment. Install these dependencies to build the Windows Wazuh agent installer on Ubuntu:

         .. code-block:: console

            # apt-get install curl gcc-mingw-w64 g++-mingw-w64-i686 g++-mingw-w64-x86-64 nsis make cmake zip

      #. Set up the Windows build environment. To generate the installer, the following dependencies must be in place on the Windows machine:

         -  `WIX Toolset v3.11 <http://wixtoolset.org/>`__

            .. note::

               The ``wazuh-installer-build-msi.bat`` script expects WiX Toolset v3.11 in its default path. If you install another 3.x version, add its ``bin`` directory to the ``PATH`` variable first.

         -  .NET Framework 3.5.1.
         -  Microsoft Windows SDK, only to sign the installer with signtool.

   .. group-tab:: macOS

      The build needs the Xcode Command Line Tools and CMake 3.22.1 or later.

      .. tabs::

         .. group-tab:: Apple silicon

            #. Install brew, a package manager for macOS:

               .. code-block:: console

                  $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

               .. note::

                  In some macOS versions, this first command may fail, reporting that ``homebrew/core`` is a shallow clone. If this happens, run the following commands to solve it.

                  .. code-block:: console

                     $ rm -rf "/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core"
                     $ brew tap homebrew/core

                  Then, re-run the Homebrew installation command above.

            #. Add Homebrew to the PATH of your shell:

               .. code-block:: console

                  $ echo >> ~/.zprofile
                  $ echo 'eval "$(/opt/homebrew/bin/brew shellenv zsh)"' >> ~/.zprofile
                  $ eval "$(/opt/homebrew/bin/brew shellenv zsh)"

            #. Install CMake through Brew:

               .. code-block:: console

                  $ brew install cmake

         .. group-tab:: Intel

            Homebrew no longer supports Intel Macs, so install the build tools without it.

            #. Install the Xcode Command Line Tools:

               .. code-block:: console

                  $ xcode-select --install

            #. Download and install `CMake <https://cmake.org/download/>`__ for macOS, then add its bin directory to PATH:

               .. code-block:: console

                  $ export PATH="/Applications/CMake.app/Contents/bin:$PATH"

Installing the Wazuh agent
--------------------------

This section covers downloading the Wazuh source code, compiling it, and running the installation wizard.

.. tabs::

   .. group-tab:: Linux

      #. Download and extract the Wazuh source code:

         .. code-block:: console

            # curl -Ls https://github.com/wazuh/wazuh/archive/v|WAZUH_CURRENT_FROM_SOURCES|-|WAZUH_AGENT_CURRENT_REV|.tar.gz | tar zx
            # cd wazuh-|WAZUH_CURRENT_FROM_SOURCES|-|WAZUH_AGENT_CURRENT_REV|

      #. If you have previously compiled for another platform, you must clean the build using the Makefile in ``src/``:

         .. code-block:: console

            # make -C src clean
            # make -C src clean-deps

      #. Download the external dependencies and build the Wazuh agent:

         .. code-block:: console

            # make -C src TARGET=agent deps
            # make -C src TARGET=agent -j$(nproc)

      #. Run the ``install.sh`` script. The script starts a wizard that guides you through the installation:

         .. code-block:: console

            # ./install.sh

      #. When the script asks what kind of installation you want, type ``2`` to install the Wazuh agent:

         .. code-block:: none

            1- Installation type:
               1) manager
               2) agent
               Select an option [1-2]: 2

      #. When prompted, enter the IP address or hostname of the Wazuh manager.

         .. code-block:: none

            2- Clean install: no existing agent installation detected.
            3- What's the IP Address or hostname of the Wazuh manager?: 192.168.33.149

      #. Create an enrollment token on the Wazuh manager. Replace ``<WAZUH_MANAGER_ADDRESS>`` with the IP address or hostname that the agents connect to. The address must be in the subject alternative names of the Wazuh manager certificate:

         .. code-block:: console

            # /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <WAZUH_MANAGER_ADDRESS>

      #. Save the token that the command prints to a file on the endpoint, for example, ``/root/token``. Then enroll the Wazuh agent:

         .. code-block:: console

            # /var/ossec/bin/wazuh-agent-auth --token-file /root/token

      #. Start the Wazuh agent and enable it to start at boot:

         .. code-block:: console

            # systemctl daemon-reload
            # systemctl enable --now wazuh-agent

      #. On the Wazuh manager, check that the Wazuh agent is connected. The status of a connected agent is ``active``. The password of the ``wazuh`` user is the ``WAZUH_MANAGER_API_PASSWORD`` value in ``/etc/wazuh-manager/export/credentials.env``:

         .. code-block:: console
            :emphasize-lines: 1

            # TOKEN=$(curl -s --cacert /etc/wazuh-manager/export/ca.pem -u wazuh:<WAZUH_PASSWORD> -X POST "https://localhost:55000/security/user/authenticate?raw=true")
            # curl -s --cacert /etc/wazuh-manager/export/ca.pem -X GET "https://localhost:55000/agents?select=id,name,status,ip&pretty=true" -H "Authorization: Bearer $TOKEN"

   .. group-tab:: Windows

      This process involves compiling the Wazuh agent and generating an MSI installer package.

      #. Download the Wazuh source code on the Ubuntu machine and unzip it:

         .. code-block:: console

            # curl -Ls https://github.com/wazuh/wazuh/archive/v|WAZUH_CURRENT_WIN_FROM_SOURCES|-|WAZUH_REVISION_WINDOWS|.tar.gz | tar zx
            # cd wazuh-|WAZUH_CURRENT_WIN_FROM_SOURCES|-|WAZUH_REVISION_WINDOWS|

      #. Compile the Wazuh agent by running the ``make`` command:

         .. code-block:: console

            # make -C src TARGET=winagent deps
            # make -C src TARGET=winagent

         The following output will appear at the end of the building process:

         .. code-block:: none
            :class: output

            Done building winagent

      #. Move the repository to the Windows machine. We recommend compressing it to speed up the process:

         .. code-block:: console

            # cd .. && zip -r wazuh.zip wazuh-|WAZUH_CURRENT_WIN_FROM_SOURCES|-|WAZUH_REVISION_WINDOWS|

      #. Decompress the repository on the Windows machine, run the ``wazuh-installer-build-msi.bat`` script from the win32 folder:

         .. code-block:: doscon

            > cd wazuh-|WAZUH_CURRENT_WIN_FROM_SOURCES|-|WAZUH_REVISION_WINDOWS|\src\win32
            > .\wazuh-installer-build-msi.bat

         The script signs the installer with ``signtool`` after it generates the MSI file. Without a code-signing certificate, the signing step fails, but the MSI file is still generated.

      #. Specify the version and the revision number when prompted. In the following output, the version is set to ``5.0.0``, and the revision is set to rc2. This generates the Windows installer ``wazuh-agent-5.0.0-rc2.msi``.

         .. code-block:: doscon

            C:\wazuh\wazuh-5.0.0-rc2\src\win32>REM IF VERSION or REVISION are empty, ask for their value

            C:\wazuh\wazuh-5.0.0-rc2\src\win32>IF [] == [] set /p VERSION=Enter the version of the Wazuh agent (x.y.z):
            Enter the version of the Wazuh agent (x.y.z):5.0.0

            C:\wazuh\wazuh-5.0.0-rc2\src\win32>IF [] == [] set /p REVISION=Enter the revision of the Wazuh agent:
            Enter the revision of the Wazuh agent:rc2

            C:\wazuh\wazuh-5.0.0-rc2\src\win32>SET MSI_NAME=wazuh-agent-5.0.0-rc2.msi

      #. Install the ``wazuh-agent-|WAZUH_CURRENT_WIN_FROM_SOURCES|-|WAZUH_REVISION_WINDOWS|.msi`` package with an enrollment token created on the Wazuh manager. Replace ``<TOKEN>`` with the token:

         .. code-block:: doscon

            > start /wait msiexec.exe /i wazuh-agent-|WAZUH_CURRENT_WIN_FROM_SOURCES|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_ENROLLMENT_TOKEN="<TOKEN>"

      #. Run the following command to start the Wazuh agent.

         .. code-block:: doscon

            > NET START WazuhSvc

         For more installation options, see the :doc:`installation guide </installation-guide/wazuh-agent/wazuh-agent-package-windows>`.

   .. group-tab:: macOS

      This section covers installing the Wazuh agent from sources on macOS systems.

      #. Download and extract the Wazuh source code:

         .. code-block:: console

            # curl -Ls https://github.com/wazuh/wazuh/archive/v|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.tar.gz | tar zx
            # cd wazuh-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|

         .. note::

            All the commands described below need to be executed with root user privileges. Make sure CMake is in the PATH of the root shell. On Apple silicon, run ``eval "$(/opt/homebrew/bin/brew shellenv)"`` in that shell. On an Intel Mac, run the ``export PATH`` command from the Intel tab.

      #. If you have previously compiled for another platform, you must clean the build using the Makefile in ``src``:

         .. code-block:: console

            # make -C src clean
            # make -C src clean-deps

      #. Run the ``install.sh`` script. The script starts a wizard that guides you through the installation:

         .. code-block:: console

            # USER_DIR="/Library/Ossec" ./install.sh

         .. note::

            The ``USER_DIR`` variable sets the Wazuh agent installation path to ``/Library/Ossec``.

      #. When the script asks what kind of installation you want, type ``2`` to install the Wazuh agent:

         .. code-block:: none

            1- Installation type:
               1) manager
               2) agent
               Select an option [1-2]: 2

      #. When prompted, enter the IP address or hostname of the Wazuh manager:

         .. code-block:: none

            2- Clean install: no existing agent installation detected.
            3- What's the IP Address or hostname of the Wazuh manager?: 192.168.33.149

         .. note::

            To install without prompts, set the variables described in ``etc/preloaded-vars.conf`` before you run ``install.sh``.

      #. Save the token created on the Wazuh manager to a file, for example, ``/var/root/token``. Then enroll the Wazuh agent and start it:

         .. code-block:: console

            # /Library/Ossec/bin/wazuh-agent-auth --token-file /var/root/token
            # /Library/Ossec/bin/wazuh-control start

Next steps
----------

To learn about enrollment tokens and other enrollment methods, see the :doc:`Wazuh agent enrollment </user-manual/agent/agent-enrollment/index>` section.

Uninstall
---------

.. tabs::

   .. group-tab:: Linux

      #. To uninstall the Wazuh agent, set ``WAZUH_HOME`` to the installation path, ``/var/ossec`` by default:

         .. code-block:: console

            # WAZUH_HOME="/WAZUH/INSTALLATION/PATH"

      #. Stop the service:

         .. code-block:: console

            # service wazuh-agent stop 2> /dev/null

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
                  # find /etc/{init.d,rc*.d} -name "*wazuh-agent*" | xargs rm -f

            .. group-tab:: Systemd

               .. code-block:: console

                  # find /etc/systemd/system /usr/lib/systemd/system -name "wazuh-agent*" | xargs rm -f
                  # systemctl daemon-reload

      #. Remove the ``wazuh`` user and group:

         .. code-block:: console

            # userdel wazuh 2> /dev/null
            # groupdel wazuh 2> /dev/null

   .. group-tab:: Windows

      To uninstall the agent, the original MSI file will be needed to perform the unattended process:

      .. code-block:: doscon

         msiexec.exe /x wazuh-agent-|WAZUH_CURRENT_WIN_FROM_SOURCES|-|WAZUH_REVISION_WINDOWS|.msi /qn

      The uninstall keeps ``C:\Program Files (x86)\ossec-agent`` with copies of the agent key and configuration as .save files.

      If you don't plan to reinstall, run the following command to delete the folder:

      .. code-block:: doscon

         > rmdir /s /q "C:\Program Files (x86)\ossec-agent"

   .. group-tab:: macOS

      #. To uninstall the Wazuh agent, set ``WAZUH_HOME`` to the installation path. The installation steps above use ``/Library/Ossec``:

         .. code-block:: console

            # WAZUH_HOME="/WAZUH/INSTALLATION/PATH"

      #. Stop the service:

         .. code-block:: console

            # launchctl bootout system /Library/LaunchDaemons/com.wazuh.agent.plist 2> /dev/null

      #. Stop the daemon:

         .. code-block:: console

            # $WAZUH_HOME/bin/wazuh-control stop 2> /dev/null

      #. Remove the installation folder and all its content:

         .. code-block:: console

            # rm -rf $WAZUH_HOME

      #. Delete the service:

         .. code-block:: console

            # rm -f /Library/LaunchDaemons/com.wazuh.agent.plist

      #. Remove Wazuh user and group:

         .. code-block:: console

            # dscl . -delete "/Users/wazuh" > /dev/null 2>&1
            # dscl . -delete "/Groups/wazuh" > /dev/null 2>&1
