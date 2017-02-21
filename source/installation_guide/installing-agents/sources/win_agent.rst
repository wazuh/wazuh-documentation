.. _wazuh_agent_other_windows:

Windows agent
=============

Compiling from sources
----------------------

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
-------------------

Run the make command: ::

   $ make TARGET=winagent

You should expect the following output near the end of the compile process: ::

   ...
   Output: "wazuh-win32-agent.exe"
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


Now you should have a Wazuh agent installer for Windows here: ``./win32/wazuh-win32-agent.exe``, ready to be used.
