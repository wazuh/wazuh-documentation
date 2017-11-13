.. _agent-sources:

Install Wazuh agent from sources
=================================

This guide describes how to install an Wazuh agent from source code.

- `Installing Linux agent`_.
- `Installing Windows agent`_.

.. note:: Many of the commands described below need to be executed with root user privileges.

Installing Linux agent
----------------------

1. Install development tools and compilers. In Linux this can easily be done using your distribution's package manager:

  a) For RPM-based distributions:

  .. code-block:: bash

      sudo yum install make gcc

      # If you want to use Auth, also install:
      sudo yum install openssl-devel

  b) For Debian-based distributions:

  .. code-block:: bash

      sudo apt-get install gcc make libc6-dev

      # If you want to use Auth, also install:
      sudo apt-get install libssl-dev

2. Download and extract the latest version:

  .. code-block:: bash

    $ curl -Ls https://github.com/wazuh/wazuh/archive/v3.0.0.tar.gz | tar zx

3. Run the ``install.sh`` script, this will display a wizard that will guide you through the installation process using the Wazuh sources:

  .. code-block:: bash

    $ cd wazuh-*
    $ ./install.sh

.. note:: You can also run an :doc:`unattended installation<../unattended-installation>`.

4. The script will ask about what kind of installation you want. Type ``agent`` in order to install a Wazuh agent:

  .. code-block:: bash

    1- What kind of installation do you want (server, agent, local, hybrid or help)? agent

.. note:: At this point your agent is installed and you just need to register and configure it to talk to your manager. For more information about this process please visit our user manual.

Installing Windows agent
------------------------

This section describes how to download and build the Wazuh HIDS Windows agent from sources. First of all, we will compile the agent on a Linux system to end up generating the .msi installer on Windows.

.. note:: The following procedure has been tested to work with Ubuntu 16.04 and other Debian based distributions as building environment, may work fine with other Debian/Ubuntu versions as well.

Set up Ubuntu build environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install these dependencies to build the Windows Wazuh agent installer on Ubuntu:

  .. code-block:: bash

   $ apt-get install gcc-mingw-w64
   $ apt-get install nsis
   $ apt-get install make

Set up Windows build environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To generate the installer we need to solve the following dependencies in Windows:

* `WiX Toolset <http://wixtoolset.org/>`_.
* .NET framework 3.5.1 or higher.
* Microsoft Windows SDK.

Source code download
^^^^^^^^^^^^^^^^^^^^

Download the Wazuh source code and unzip it:

  .. code-block:: bash

   $ curl -Ls https://github.com/wazuh/wazuh/archive/v3.0.0.tar.gz | tar zx
   $ cd wazuh-*/src

Compiling the agent
^^^^^^^^^^^^^^^^^^^

Run the make command:

  .. code-block:: bash

    $ make TARGET=winagent

You should expect the following output at the end of the building process:

  .. code-block:: bash

   Done building winagent


Once the agent has been compiled, we should transfer the ``src`` folder to a Windows system. This folder could be compressed at first to speed up the process.

      .. code-block:: bash

        $ zip -r ../src *

Once in Windows, we only need to run ``src/win32/wazuh-installer-build-msi.bat`` to start the installer generation. If we don't want to sign the installer, we will have to comment or delete the signtool line.

.. note:: At this point the installer is ready. You can launch it with a normal or unattended installation. For more information about this process please visit our :doc:`installation section for Windows<./wazuh_agent_windows>`.
