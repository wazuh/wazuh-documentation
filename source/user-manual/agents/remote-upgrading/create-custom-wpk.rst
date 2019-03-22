.. Copyright (C) 2018 Wazuh, Inc.

.. _create-custom-wpk:

Creating custom WPK packages
============================

1. Get a X509 certificate and CA
--------------------------------

Create root CA
^^^^^^^^^^^^^^

.. code-block:: console

    # openssl req -x509 -new -nodes -newkey rsa:2048 -keyout wpk_root.key -out wpk_root.pem -batch

Create a certificate and key
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: console

    # openssl req -new -nodes -newkey rsa:2048 -keyout wpkcert.key -out wpkcert.csr -subj '/C=US/ST=CA/O=Wazuh'

Set the location as follows:

    - /C=US is the country.
    - /ST=CA is the state.
    - /O=Wazuh is the organization's name.

Sign this certificate with the root CA
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: console

    # openssl x509 -req -days 365 -in wpkcert.csr -CA wpk_root.pem -CAkey wpk_root.key -out wpkcert.pem -CAcreateserial

2. Compile a package
--------------------

WPK packages will generally contain the complete agent code, however, this is not required.

A WPK package must contain an installation program in binary form or a script in any language supported by the agent (Bash, Python, etc). Canonical WPK packages must contain a Bash script named ``upgrade.sh`` for UNIX or ``upgrade.bat`` for Windows. This program must:

    * fork itself, as the parent will return 0 immediately,
    * restart the agent, and
    * the installer must write a file called upgrade_result containing a status number (0 means OK) before exiting.

Requirements
^^^^^^^^^^^^

    * Python 2.7 or 3.5+
    * The Python ``cryptography`` package. This may be obtained using the following command:

    .. code-block:: console

        $ pip install cryptography

Canonical WPK package example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Install development tools and compilers. In Linux this can easily be done using your distribution's package manager:

  a) For RPM-based distributions:

  .. code-block:: console

      # yum install make gcc policycoreutils-python automake autoconf libtool unzip

  b) For Debian-based distributions:

  .. code-block:: console

      # apt-get install make gcc libc6-dev curl policycoreutils automake autoconf libtool unzip

2. Download and extract the latest version:

  .. code-block:: console

    # curl -Ls https://github.com/wazuh/wazuh/archive/v3.8.2.tar.gz | tar zx

3. Modify the ``wazuh-3.8.2/etc/preloaded-vars.conf`` file that was downloaded to deploy an :ref:`unattended update <unattended-installation>` in the agent by uncommenting the following lines:

  .. code-block:: console

      USER_LANGUAGE="en"
      USER_NO_STOP="y"
      USER_UPDATE="y"

4. Compile the project from the ``src`` folder:

  .. code-block:: console

      # cd wazuh-3.8.2/src
      # make deps
      # make TARGET=agent

5. Install the root CA if you want to overwrite the root CA with the file you created previously:

  .. code-block:: console

      # cd ../
      # cp path/to/wpk_root.pem etc/wpk_root.pem

6. Compile the WPK package using your SSL certificate and key:

  .. code-block:: console

      # contrib/agent-upgrade/wpkpack.py output/myagent.wpk path/to/wpkcert.pem path/to/wpkcert.key *

Definitions:
    - **output/myagent.wpk** is the name of the output WPK package.
    - **path/to/wpkcert.pem** is the path to your SSL certificate.
    - **path/to/wpkcert.key** is the path to your SSL certificate's key.
    - **\*** is the file (or the files) to be included into the WPK package. In this case, all the contents will be added.

In this example, the Wazuh project's root directory contains the proper ``upgrade.sh`` file.

.. note::
    This is only an example. If you want to distribute a WPK package using this method, it's important to begin with an empty directory.

Windows WPK package:
^^^^^^^^^^^^^^^^^^^^

Generating a WPK Wazuh package in Windows is a little more difficult than in Linux, since the Wazuh project must be compiled in an operating system based on linux.

Therefore, for this guide we are going to use "OpenSSL" and a folder that contains a compiled version of Wazuh.

After compiling the version of Wazuh wanted in Linux following steps 2,3 and 4 of the previous section, we will create our own SSL certificate and the key file using OpenSSL.

1. Install `Python <https://www.python.org/downloads/>`_

2. Install OpenSSL:

    - Access the `official website <http://www.openssl.org/>`_.
    - Then, download the binary file for Windows: https://www.openssl.org/community/binaries.html
    - Install it.

3. Use OpenSSL to generate the certificate:

    The standard installation of OpenSSL under Windows is made on ``C:\OpenSSL-Win32`` and the executable is stored in the sub-repertory ``bin``. To execute the programm via the Windows ``cmd``, provide the full path:
        
        .. code-block:: console
            
            C:\OpenSSL-Win32\bin\openssl.exe ( or >C:\OpenSSL-Win64\bin\openssl.exe )
        
    Now, to generate the certificate and the key run this command:

        .. code-block:: console

            C:\OpenSSL-Win32\bin\openssl.exe req -new -nodes -newkey rsa:2048 -keyout wpkcert.key -out wpkcert.csr -subj '/C=US/ST=CA/O=Wazuh'

    .. note::
        In order to execute this command, you must have administrator rights.

4. Send the folder with the compiled Wazuh files:

    To perform this step, users can use the tool of their choice, but we find very useful to use `Putty <https://www.putty.org/>`_

5. Install the root CA if you want to overwrite the root CA with the file you created previously:

    .. code-block:: console

        copy C:\OpenSSL-Win32\bin\PEM\wpkcert.csr wazuh-3.8.2\etc

6. Compile the WPK package using your SSL certificate and key:

    .. code-block:: console

        python C:/wpkpack_route/wpkpack.py C:\OpenSSL-Win32\bin\PEM\wpkcert.csr C:\OpenSSL-Win32\bin\PEM\wpkcert.key *.*
