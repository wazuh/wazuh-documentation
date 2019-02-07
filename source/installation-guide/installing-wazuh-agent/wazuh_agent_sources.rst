.. Copyright (C) 2018 Wazuh, Inc.

.. _agent-sources:

Install Wazuh agent from sources
=================================

This guide describes how to install the Wazuh agent from source code.

- `Installing Linux agent`_.
- `Installing Windows agent`_.

.. note:: Many of the commands described below need to be executed with root user privileges.

Installing Linux agent
----------------------

1. Install development tools and compilers. In Linux this can easily be done using your distribution's package manager:

  a) For RPM-based distributions:

  .. code-block:: console

      # yum install make gcc policycoreutils-python automake autoconf libtool

  b) For Debian-based distributions:

  .. code-block:: console

      # apt-get install make gcc libc6-dev curl policycoreutils automake autoconf libtool

2. Download and extract the latest version:

  .. code-block:: console

    # curl -Ls https://github.com/wazuh/wazuh/archive/v3.8.2.tar.gz | tar zx

3. Run the ``install.sh`` script. This will run a wizard that will guide you through the installation process using the Wazuh sources:

  .. code-block:: console

    # cd wazuh-*
    # ./install.sh

.. note:: Since Wazuh 3.5 it is necessary to have internet connection when following this step.

.. note:: You can also run an :ref:`unattended installation <unattended-installation>`.

4. The script will ask about what kind of installation you want. Type ``agent`` in order to install a Wazuh agent:

  .. code-block:: none

    1- What kind of installation do you want (manager, agent, local, hybrid or help)? agent

.. note:: Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the :doc:`user manual<../../user-manual/registering/index>`.

Installing Windows agent
------------------------

This section describes how to download and build the Wazuh HIDS Windows agent from sources. This process begins with compiling the agent on a Linux system to generate the .msi installer for the Windows installation.

.. note:: The following procedure has been tested on Ubuntu 16.04, other Debian based distributions and CentOS 7. It may work with other Debian/Ubuntu versions and RPM based distributions as well.

1. Set up the build environment. Install these dependencies to build the Wazuh Agent for Windows under Linux:

  a) For RPM-based distributions: the `EPEL repository <https://fedoraproject.org/wiki/EPEL>`_ is added to install the needed cross-compilers. Follow the instructions over there to accomplish this.
  
    .. code-block:: console
    
      # yum install mingw32-gcc
      # yum install mingw64-gcc
      # yum install nsis
  
  b) For Debian-based distributions:

    .. code-block:: console

      # apt-get install gcc-mingw-w64
      # apt-get install nsis
      # apt-get install make

2. Download the Wazuh source code and unzip it:

  .. code-block:: console

    # curl -Ls https://github.com/wazuh/wazuh/archive/v3.8.2.tar.gz | tar zx
    # cd wazuh-*/src

3. Compile the agent by running the ``make`` command:

  a) To build the 32-bit Windows agent:

    .. code-block:: console

      # make deps
      # make TARGET=winagent

  b) To build the 64-bit Windows agent:

    .. code-block:: console

      # make deps
      # make TARGET=winagent-x64

The following output will appear at the end of the building process:

  a) Building the 32-bit Windows agent:

    .. code-block:: console

      Done building winagent

  b) Building the 64-bit Windows agent:

    .. code-block:: console

      Done building winagent-x64

4. Once the agent has been compiled, transfer the Wazuh folder to the target Windows system. It is recommended that this folder be compressed at first to speed up the process.

  .. code-block:: console

    # zip -r wazuh.zip ../../wazuh-3.8.2

5. Set up Windows build environment. To generate the installer, the following dependencies must be in place on the Windows machine:

* `WiX Toolset <http://wixtoolset.org/>`_.
* Microsoft Windows SDK v7.0 (or greater).
* .NET Framework v3.5.1 (or greater, depending on the installed SDK version).

6. Once in Windows, run the ``wazuh-3.8.2/src/win32/wazuh-installer-build-msi.bat`` script and follow the instructions to generate the MSI installer. Make sure to select the proper architecture for the compiled binaries (x86 / x86_64). If you do not want to sign the installer, you will have to comment or delete the ``signtool`` line.

.. note:: The installer is now ready.  It can be launched with a normal or unattended installation. For more information about this process, please visit our :doc:`installation section for Windows<./wazuh_agent_windows>`.

.. note:: Once the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the user manual.
