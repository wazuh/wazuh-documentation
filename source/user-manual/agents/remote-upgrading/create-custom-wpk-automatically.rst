.. Copyright (C) 2019 Wazuh, Inc.

.. _create-custom-wpk-automatically:

Automated custom WPK packages creation
=======================================

Wazuh provides an automated way of building WPK packages using docker so there is no need for any other dependency, to create a WPK package this way only docker and a X509 certificate are needed, in the case of Windows WPK a msi package is needed.

1. Get a X509 certificate and CA
--------------------------------

1. Create root CA

.. code-block:: console

    # openssl req -x509 -new -nodes -newkey rsa:2048 -keyout wpk_root.key -out wpk_root.pem -batch

2. Create a certificate and key

.. code-block:: console

    # openssl req -new -nodes -newkey rsa:2048 -keyout wpkcert.key -out wpkcert.csr -subj '/C=US/ST=CA/O=Wazuh'

3. Set the location as follows:

    - /C=US is the country.
    - /ST=CA is the state.
    - /O=Wazuh is the organization's name.

4. Sign this certificate with the root CA

.. code-block:: console

    # openssl x509 -req -days 365 -in wpkcert.csr -CA wpk_root.pem -CAkey wpk_root.key -out wpkcert.pem -CAcreateserial

2. Build WPK
-------------

Requirements
^^^^^^^^^^^^

    * Docker

Download our wazuh-packages repository from GitHub, there you can find tools for building different kinds of packages, and go to the wpk directory.

  .. code-block:: console

    $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-installers/wpk

Execute the `generate_wpk_package.sh` script, with the different options you desire. This script will build a Docker image with all the necessary tools to create the WPK and run a container that will build it:

  .. code-block:: console

    $ ./generate_wpk_package.sh -h

    Usage: /wazuh-installers/wpk-docker/generate_wpk_package.sh [OPTIONS]

    -t,   --target-system <target>              [Required] Select target wpk to build [linux/windows]
    -b,   --branch <branch>                     [Required] Select Git branch or tag e.g.
    -d,   --destination <path>                  [Required] Set the destination path of package.
    -k,   --key-dir <arch>                      [Required] Set the WPK key path to sign package.
    -a,   --architecture <arch>                 [Optional] Target architecture of the package [x86_64].
    -j,   --jobs <number>                       [Optional] Number of parallel jobs when compiling.
    -pd,  --package-directory <directory>       [Required for windows] Path to the package name to pack on wpk.
    -o,   --output <name>                       [Required] Name to the output package.
    -h,   --help                                Show this help.

To use this tool the certificate and the key must be in the same directory.

2.1. Linux WPK
^^^^^^^^^^^^^^

An example of how to build a Linux WPK would be:

  .. code-block:: console

    # ./generate_wpk_package.sh -t linux -b branch_tag -d output/path -k path/to/keys -o myagent.wpk

2.2. Windows WPK
^^^^^^^^^^^^^^^^

To build a WPK for Windows you need to first download a msi package of the desired version:

  .. code-block:: console

    # curl -Ls https://packages.wazuh.com/3.x/windows/wazuh-agent-3.9.2-1.msi --output wazuh-agent-3.9.2-1.msi

An example of how to build a Windows WPK package would be:

  .. code-block:: console

    # /generate_wpk_package.sh -t windows -b branch_tag -d output/path -k path/to/keys -o myagent.wpk -pd path/to/wazuhagent.msi

Definitions:
    - **branch_tag** is the branch of the wazuh repository you want to build the sources from.
    - **output/path** is the path to the directory where you want to store your WPK.
    - **myagent.wpk** is the name of the WPK.
    - **path/to/keys** is the path to your SSL certificate and key both of them must be in the same directory.
    - **path/to/wazuhagent.msi** is the path to the msi package.
