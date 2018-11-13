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

        pip install cryptography

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

    $ curl -Ls https://github.com/wazuh/wazuh/archive/v3.7.0.tar.gz | tar zx

3. Modify the ``wazuh-3.7.0/etc/preloaded-vars.conf`` file that was downloaded to deploy an :ref:`unattended update <unattended-installation>` in the agent by uncommenting the following lines:

  .. code-block:: console

      USER_LANGUAGE="en"
      USER_NO_STOP="y"
      USER_UPDATE="y"

4. Compile the project from the ``src`` folder:

  .. code-block:: console

      # cd wazuh-3.7.0/src
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
