Compiling Windows agent
=======================

The last version avaliable for Ossec Windows Agent is **2.8.1**, the compilation for version 2.8.2 does not work properly.

This manual is bassed in ossec-hids 2.8.1 version, you can download in the from this sources::

   $ wget https://github.com/ossec/ossec-hids/archive/2.8.1.zip

Under CentOS
------------

First, you need to install MinGW and nsis (to build the installer). 
For MinGW install epel repository:: 

   $ wget https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
   $ rpm -i epel-release-latest-7.noarch.rpm

After that, we install MinGW gcc and other libraries for the nsis compilation::

   $ yum install gcc-c++ gcc scons mingw32-gcc zlib-devel

For the nsis installation we need to download two packages::

   $ wget http://sourceforge.net/projects/nsis/files/NSIS%203%20Pre-release/3.0b2/nsis-3.0b2-src.tar.bz2/download
   $ wget http://sourceforge.net/projects/nsis/files/NSIS%203%20Pre-release/3.0b2/nsis-3.0b2.zip/download

After downloading the two packages, I created a directory named 'nsis' in /usr/local.   You can create this diretcory wherever you want, as long as the users who will need it have permissions to access it.  Move the two packages you have just downloaded into the directory 'nsis' that you just have created.  The commands to do this are below::

   $ mkdir /usr/local/nsis
   $ mv nsis-3.0b2-src.tar.bz2 /usr/local/nsis
   $ mv nsis-3.0b2.zip /usr/local/nsis

After moving the files into /usr/local/nsis , extract the two packages.  The commands I used are below::

   $ tar -jxvf nsis-3.0b2-src.tar.bz2 
   $ unzip nsis-3.0b2.zip

The nsis-3.0b2 directory contains a pre-compiled package of the software for Windows. Inside the nsis-3.0b2-src directory will be an INSTALL file.
The program you will be building is called 'makensis'.  This is what will actually build the Installer Package on a Linux box.
Inside the nsis-3.0b2-src directory isssue the following command:: 

   $ scons SKIPSTUBS=all SKIPPLUGINS=all SKIPUTILS=all SKIPMISC=all NSIS_CONFIG_CONST_DATA=no PREFIX=/path/to/your/extracted/zip/directory install-compiler
   $ mkdir /usr/local/nsis/nsis-3.0b2/share
   $ cd /usr/local/nsis/nsis-3.0b2/share
   $ ln -s /usr/local/nsis/nsis-3.0b2 nsis
   $ cp ../bin/makensis /bin

After that we have installed all software necessary for make the Ossec Agent Compilation follow the steps at the `Common compilation`_.



Under Ubuntu & Debian
---------------------

For compile the agent under Ubuntu need to install the next packages::

   $ apt-get install gcc-mingw-w64
   $ apt-get install nsis
   $ apt-get install make

After that we have installed all software necessary for make the Ossec Agent Compilation follow the steps at the `Common compilation`_.

Common compilation
------------------

First unpack ossec-hids::

   $ unzip 2.8.1.zip
   $ cd cd ossec-hids-2.8.1/src/win32
   $ ./gen-win.sh

Now, you will have the win-pkg directory under src. Just go there and run make.sh. Your Windows agent package should be created in a few minutes::

   $ cd ../win-pkg
   $ sh ./make.sh

You will see the following in the screen::

   Making windows agent
   rootcheck/win-common.c: In function "__os_winreg_querykey":
   rootcheck/win-common.c:279: warning: pointer targets in passing argument 7 of "RegEnumValueA" differ in signedness
   win-registry.c: In function "os_winreg_querykey":
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

You have **ossec-win32-agent.exe** in the same folder ready for be used.
