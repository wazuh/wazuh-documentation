.. _agent-sources:

Install Wazuh agent from sources
=================================

This guide describes how to install an Wazuh agent from source code.

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

    $ curl -Ls https://github.com/wazuh/wazuh/archive/v2.1.0.tar.gz | tar zx

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

This section describes how to download and build the Wazuh HIDS Windows agent from sources. The following procedure has been tested to work with Ubuntu 16.04 as building environment, may work fine with other Debian/Ubuntu versions as well.

Set up Ubuntu build environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install these dependencies to build the Windows Wazuh agent installer on Ubuntu:

  .. code-block:: bash

   $ apt-get install gcc-mingw-w64
   $ apt-get install nsis
   $ apt-get install make

Source code download
^^^^^^^^^^^^^^^^^^^^

Download the Wazuh source code and unzip it:

  .. code-block:: bash

   $ curl -Ls https://github.com/wazuh/wazuh/archive/v2.1.0.tar.gz | tar zx
   $ cd wazuh-*/src

Compiling the agent
^^^^^^^^^^^^^^^^^^^

Run the make command:

  .. code-block:: bash

    $ make TARGET=winagent

You should expect the following output near the end of the building process:

  .. code-block:: bash

   ...
   Output: "wazuh-agent-2.0.exe"
   Install: 7 pages (448 bytes), 3 sections (3144 bytes), 774 instructions (21672 bytes), 322 strings (32417 bytes), 1 language table (346 bytes).
   Uninstall: 5 pages (320 bytes),
   1 section (1048 bytes), 351 instructions (9828 bytes), 186 strings (3380 bytes), 1 language table (290 bytes).
   Datablock optimizer saved 99975 bytes (~6.7%).

   Using zlib compression.

   EXE header size:               77312 / 75264 bytes
   Install code:                  14910 / 58403 bytes
   Install data:                1290055 / 3762640 bytes
   Uninstall code+data:           20917 / 21333 bytes
   CRC (0x44FA2346):                  4 / 4 bytes

   Total size:                  1403198 / 3917644 bytes (35.8%)
   ...
   Done building winagent


Now you should have a Wazuh agent installer for Windows here: ``./win32/wazuh-agent-2.0.exe``, you can use our guide :ref:`here <wazuh_agent_windows>` to install it.

.. note:: At this point your agent is installed and you just need to register and configure it to talk to your manager. For more information about this process please visit our user manual.
