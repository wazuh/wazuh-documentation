.. _create-custom-wpk:

Creating custom WPK packages
==============================

1. Get a X509 certificate and CA
---------------------------------

Create root CA
^^^^^^^^^^^^^^^^^^^

.. code-block:: console

    # openssl req -x509 -new -nodes -newkey rsa:2048 -keyout wpk_root.key -out wpk_root.pem -batch

Create certificate and key
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: console

    # openssl req -new -nodes -newkey rsa:2048 -keyout wpkcert.key -out wpkcert.csr -subj '/C=US/ST=CA/O=Wazuh'

Where:
    - /C=US is the country.
    - /ST=CA is the state.
    - /O=Wazuh is the organization's name.

Sign this certificate with the root CA:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: console

    # openssl x509 -req -days 365 -in wpkcert.csr -CA wpk_root.pem -CAkey wpk_root.key -out wpkcert.pem -CAcreateserial

2. Compile a package
---------------------

WPK packages will usually contain a complete agent code, but this is not necessary.

A WPK package must contain an installation program, in binary form or a script in any language supported by the agent (Bash, Python, etc).
Canonical WPK packages should contain a Bash script with name ``upgrade.sh`` for UNIX or ``upgrade.bat`` for Windows. This program must:

    * Fork itself, the parent will return 0 immediately.
    * Restart the agent.
    * Before exiting, the installer must write a file called upgrade_result containing a status number (0 means OK). For instance: ``0``

Requirements
^^^^^^^^^^^^^^

    * Python 2.7 or 3.5+
    * Cryptography package for Python. You may get the Cryptography package using Pip:

    .. code-block:: console

        pip install cryptography

Canonical WPK package example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Download sources from GitHub at branch 3.0:

.. code-block:: console

    # curl -Lo wazuh-3.0.zip https://github.com/wazuh/wazuh/archive/3.0.zip && unzip wazuh-3.0.zip

2. Modify the ``wazuh-3.0/etc/preload-vars.conf`` file from downloaded sources to deploy
an :doc:`unattended update <../../../installation-guide/unattended-installation>` in the agent. It has to be uncommented the following lines.

.. code-block:: console

    USER_LANGUAGE="en"
    USER_NO_STOP="y"
    USER_UPDATE="y"

3. Compile the project:

.. code-block:: console

    # make -C wazuh-3.0/src TARGET=agent

4. Change to the base directory:

.. code-block:: console

    # cd wazuh-3.0

5. Install the root CA, only if you want to overwrite the root CA with the file you created before:

.. code-block:: console

    # cp path/to/wpk_root.pem etc/wpk_root.pem

6. Compile the WPK package. You need your SSL certificate and key:

.. code-block:: console

    # contrib/agent-upgrade/wpkpack.py output/myagent.wpk path/to/wpkcert.pem path/to/wpkcert.key *

Where:
    - **output/myagent.wpk** is the name of the output WPK package.
    - **path/to/wpkcert.pem** is the path to your SSL certificate.
    - **path/to/wpkcert.key** is the path to your SSL certificate's key.
    - **\*** is the file (or the files) to be included into the WPK package.

In this particular case, the Wazuh Project's root directory contains the proper ``upgrade.sh`` file.

.. note::
    This is a mere example. If you want to distribute a WPK package this way you should first clean the directory.
