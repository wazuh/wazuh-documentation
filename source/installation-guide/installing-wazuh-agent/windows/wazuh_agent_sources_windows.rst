.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_agent_sources_windows:

Windows from sources
====================

This section describes how to download and build the Wazuh HIDS Windows Agent from sources. This process begins with compiling the Agent on a Linux system to generate the .msi installer for the Windows installation.

.. note:: The following procedure has been tested on Ubuntu 16.04 and other Debian based distributions and may work with other Debian/Ubuntu versions as well.

1. Set up the Ubuntu build environment. Install these dependencies to build the Windows Wazuh agent installer on Ubuntu:

    .. code-block:: console

      # apt-get install gcc-mingw-w64
      # apt-get install nsis
      # apt-get install make

2. Set up Windows build environment. To generate the installer, the following dependencies must be in place on the Windows machine:

  - `WiX Toolset <http://wixtoolset.org/>`_.
  - .NET framework 3.5.1.
  - Microsoft Windows SDK.

3. Download the Wazuh source code and unzip it:

    .. code-block:: console

      # curl -Ls https://github.com/wazuh/wazuh/archive/v3.10.2.tar.gz | tar zx
      # cd wazuh-|WAZUH_LATEST|/src

4. Compile the Agent by running the ``make`` command:

    .. code-block:: console

      # make deps
      # make TARGET=winagent

    The following output will appear at the end of the building process:

    .. code-block:: console

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
