.. _ossec_installation_win:

Windows agent
=============

Agent pre-compiled installer
----------------------------

You can find a pre-compiled version of the OSSEC agent for Windows, both for 32 and 64 bits architectures, at `our repository <http://ossec.wazuh.com/windows/>`.

Current version is 2.8.3 and these are the MD5 and SHA1 checksums:

* md5sum: 633d898d51eb49050c735abd278e08c8
* sha1sum: 4ebcb31e4eccd509ae34148dd7b1b78d75b58f53

Compiling from sources
----------------------

This section describes how to download and compile your OSSEC HIDS Windows agent (version 2.8.3). You can use either a CentOS or a Debian system as a compilation environment.

Source code download
^^^^^^^^^^^^^^^^^^^^

Download the source code and checksum files: ::

   $ wget https://bintray.com/artifact/download/ossec/ossec-hids/ossec-hids-2.8.3.tar.gz
   $ wget https://bintray.com/artifact/download/ossec/ossec-hids/ossec-hids-2.8.3.tar.gz.sha256

Generate SHA256 checksum and compare with downloaded one: ::

   $ sha256sum ossec-hids-2.8.3.tar.gz
   $ cat ossec-hids-2.8.3.tar.gz.sha256

The expected hash checksum, in both cases, is: ::

917989e23330d18b0d900e8722392cdbe4f17364a547508742c0fd005a1df7dd

.. note:: Both checksums need to match, meaning that data has not been corrupted through the download process. If that is not the case, please try it again through a reliable connexion.

Build environment on CentOS
^^^^^^^^^^^^^^^^^^^^^^^^^^^

First, you need to install MinGW and Nsis (to build the installer). Let's start installing the EPEL repository: ::

   $ wget https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
   $ rpm -i epel-release-latest-7.noarch.rpm

After that, we install MinGW gcc and other libraries for the Nsis compilation: ::

   $ yum install gcc-c++ gcc scons mingw32-gcc mingw64-gcc zlib-devel bzip2 unzip

Now, to install Nsis, follow these steps: ::

   $ wget http://downloads.sourceforge.net/project/nsis/NSIS%203%20Pre-release/3.0b2/nsis-3.0b2-src.tar.bz2
   $ wget http://downloads.sourceforge.net/project/nsis/NSIS%203%20Pre-release/3.0b2/nsis-3.0b2.zip
   $ mkdir /usr/local/nsis
   $ mv nsis-3.0b2-src.tar.bz2 nsis-3.0b2.zip /usr/local/nsis
   $ cd /usr/local/nsis
   $ tar -jxvf nsis-3.0b2-src.tar.bz2 
   $ unzip nsis-3.0b2.zip

Then we need to build ``makensis``, which will actually build the OSSEC Installer Package for Windows: ::

   $ cd /usr/local/nsis/nsis-3.0b2-src/
   $ scons SKIPSTUBS=all SKIPPLUGINS=all SKIPUTILS=all SKIPMISC=all NSIS_CONFIG_CONST_DATA=no PREFIX=/usr/local/nsis/nsis-3.0b2 install-compiler
   $ mkdir /usr/local/nsis/nsis-3.0b2/share
   $ cd /usr/local/nsis/nsis-3.0b2/share
   $ ln -s /usr/local/nsis/nsis-3.0b2 nsis
   $ cp ../bin/makensis /bin

Build environment on Debian
^^^^^^^^^^^^^^^^^^^^^^^^^^^

To compile the OSSEC agent on a Debian system install these packages: ::

   $ apt-get install gcc-mingw-w64
   $ apt-get install nsis
   $ apt-get install make

Compiling the agent
-------------------

Extract ossec-hids and run ``gen_win.sh`` and ``make.sh`` scripts: ::

   $ tar -xvzf ossec-hids-2.8.3.tar.gz
   $ cd ossec-hids-2.8.3/src/win32
   $ ./gen-win.sh
   $ cd ../win-pkg
   $ sh ./make.sh

You should expect the following output: ::

   Making windows agent
   ...

   Output: "ossec-win32-agent.exe"
   Install: 7 pages (448 bytes), 3 sections (3144 bytes), 586 instructions (16408 bytes), 287 strings (31800 bytes), 1 language table (346 bytes).
   Uninstall: 5 pages (320 bytes), 
   1 section (1048 bytes), 347 instructions (9716 bytes), 181 strings (3323 bytes), 1 language table (290 bytes).
   Datablock optimizer saved 100205 bytes (~7.9%).

   Using zlib compression.

   EXE header size:               57856 / 56320 bytes
   Install code:                  14081 / 52522 bytes
   Install data:                1073649 / 3854506 bytes
   Uninstall code+data:           21037 / 21453 bytes
   CRC (0xAB53A27C):                  4 / 4 bytes

   Total size:                  1166627 / 3984805 bytes (29.2%)

Now you should have the OSSEC agent installer for Windows, ``ossec-win32-agent.exe``, ready to be used.
