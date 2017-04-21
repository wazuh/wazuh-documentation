.. _agent-sources:

Install Wazuh agent from sources
=================================

This guide describes how to install an agent from source code.

Installing Linux agent
--------------------------

1. Install development tools and compilers. In Linux this can easily be done using your distribution's package manager:

  a) For RPM-based distributions::

      sudo yum install make gcc
      # If you want to use Auth, also install:
      sudo yum install openssl-devel

  b) For Debian-based distributions::

      sudo apt-get install gcc make libc6-dev
      # If you want to use Auth, also install:
      sudo apt-get install libssl-dev

2. Download and extract the latest version::

    curl -Ls https://github.com/wazuh/wazuh/archive/v2.0.0.tar.gz | tar zx

3. Run the *install.sh* script. It will guide you through the installation and compile the source::

    cd wazuh-*
    ./install.sh

4. The script will ask about what kind of installation you want. Type **agent** in order to install a Wazuh agent::

    1- What kind of installation do you want (server, agent, local, hybrid or help)? agent

5. When the installation is completed, edit file `/var/ossec/etc/ossec.conf` and replace the text *MANAGER_IP* with the manager's IP address. For example::

	<ossec_config>
	  <client>
	    <server-ip>1.2.3.4</server_ip>

6. At this point, you need to :ref:`register the agent in the manager <connecting_agents>`.

7. Start the services using this command::

    /var/ossec/bin/ossec-control start

Installing Windows agent
--------------------------

This section describes how to download and compile the Wazuh HIDS Windows agent. The following procedure has been tested to work with Ubuntu 16.04 as the compilation environment, and may work fine with other Debian/Ubuntu versions as well.

Set up Ubuntu build environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To compile the Windows Wazuh agent installer on Ubuntu, install these prerequisite packages: ::

   $ apt-get install gcc-mingw-w64
   $ apt-get install nsis
   $ apt-get install make

Source code download
^^^^^^^^^^^^^^^^^^^^

Download the Wazuh source code and unzip it: ::

   $ wget -O wazuh-master.zip https://github.com/wazuh/wazuh/archive/master.zip
   $ unzip wazuh-master.zip

Compiling the agent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the make command: ::

   $ make TARGET=winagent

You should expect the following output near the end of the compile process: ::

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


Now you should have a Wazuh agent installer for Windows here: ``./win32/wazuh-agent-2.0.exe``, :ref:`ready to be used <wazuh_agent_windows>`.

Next steps
----------

At this point the Wazuh agent is installed and configured. Now we should :ref:`connect it to the manager <connecting_agents>`.
