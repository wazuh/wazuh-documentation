.. Copyright (C) 2019 Wazuh, Inc.

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

.. note::
  During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``agent``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default path of installation is ``/var/ossec``. A commonly used custom path might be ``/opt``.

.. warning::
  When choosing a different path than the default, if the directory already exist the installer will ask if delete the directory or if installing Wazuh inside.
  
.. warning::
  Be extremely careful not to select a critical installation directory.

.. note:: Since Wazuh 3.5 it is necessary to have internet connection when following this step.

.. note:: You can also run an :ref:`unattended installation <unattended-installation>`.

4. The script will ask about what kind of installation you want. Type ``agent`` in order to install a Wazuh agent:

  .. code-block:: none

    1- What kind of installation do you want (manager, agent, local, hybrid or help)? agent

.. note:: Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the :doc:`user manual<../../user-manual/agents/registering/index>`.

Installing Windows agent
------------------------

This section describes how to download and build the Wazuh HIDS Windows agent from sources. This process begins with compiling the agent on a Linux system to generate the .msi installer for the Windows installation.

.. note:: The following procedure has been tested on Ubuntu 16.04 and other Debian based distributions and may work with other Debian/Ubuntu versions as well.

1. Set up the Ubuntu build environment. Install these dependencies to build the Windows Wazuh agent installer on Ubuntu:

  .. code-block:: console

   # apt-get install gcc-mingw-w64
   # apt-get install nsis
   # apt-get install make

2. Set up Windows build environment. To generate the installer, the following dependencies must be in place on the Windows machine:

* `WiX Toolset <http://wixtoolset.org/>`_.
* .NET framework 3.5.1.
* Microsoft Windows SDK.

3. Download the Wazuh source code and unzip it:

  .. code-block:: console

    # curl -Ls https://github.com/wazuh/wazuh/archive/v3.8.2.tar.gz | tar zx
    # cd wazuh-*/src

4. Compile the agent by running the ``make`` command:

  .. code-block:: console

    # make deps
    # make TARGET=winagent

The following output will appear at the end of the building process:

  .. code-block:: console

   Done building winagent


5. Once the agent has been compiled, transfer the Wazuh folder to the target Windows system. It is recommended that this folder be compressed at first to speed up the process.

  .. code-block:: console

    # zip -r wazuh.zip ../../wazuh-3.8.2

6. Once in Windows, run the ``wazuh-3.8.2/src/win32/wazuh-installer-build-msi.bat`` file to start the installer generation. If you do not want to sign the installer, you will have to comment or delete the signtool line.

.. note:: The installer is now ready.  It can be launched with a normal or unattended installation. For more information about this process, please visit our :doc:`installation section for Windows<./wazuh_agent_windows>`.

.. note:: Once the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the user manual.
