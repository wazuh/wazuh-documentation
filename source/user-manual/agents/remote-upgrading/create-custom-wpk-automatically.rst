Automated custom WPK packages creation
=======================================

Wazuh provides an automated way of building WPK packages using docker so there is no need for any other dependency.

To create a WPK package your own WPK package follow these steps:

Get an X509 certificate and CA
--------------------------------

If you already have your own certificate this step can be skipped.

Create root CA

 .. code-block:: console

        # openssl req -x509 -new -nodes -newkey rsa:2048 -keyout wpk_root.key -out wpk_root.pem -batch

Create a certificate and key

 .. code-block:: console

        # openssl req -new -nodes -newkey rsa:2048 -keyout wpkcert.key -out wpkcert.csr -subj '/C=US/ST=CA/O=Wazuh'

Set the location as follows:

 - ``/C=US`` is the country.
 - ``/ST=CA`` is the state.
 - ``/O=Wazuh`` is the organization's name.

Sign this certificate with the root CA

 .. code-block:: console

        # openssl x509 -req -days 365 -in wpkcert.csr -CA wpk_root.pem -CAkey wpk_root.key -out wpkcert.pem -CAcreateserial


Requirements

 * Docker
 * git

Download our wazuh-packages repository from GitHub and go to the wpk directory.

 .. code-block:: console

        $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/wpk

Execute the ``generate_wpk_package.sh`` script, with the different options you desire. This script will build a Docker image with all the necessary tools to create the WPK and run a container that will build it:

 .. code-block:: console

        $ ./generate_wpk_package.sh -h

        Usage: ./generate_wpk_package.sh [OPTIONS]

            -t,   --target-system <target>              [Required] Select target wpk to build [linux/windows]
            -b,   --branch <branch>                     [Required] Select Git branch or tag e.g.
            -d,   --destination <path>                  [Required] Set the destination path of package.
            -k,   --key-dir <path>                      [Required] Set the WPK key path to sign package.
            -a,   --architecture <arch>                 [Optional] Target architecture of the package [x86_64].
            -j,   --jobs <number>                       [Optional] Number of parallel jobs when compiling.
            -pd,  --package-directory <directory>       [Required for windows] Package name to pack on wpk.
            -o,   --output <name>                       [Required] Name to the output package.
            -c,   --checksum <path>                     [Optional] Generate checksum
            -h,   --help                                Show this help.

To use this tool the certificate and the key must be in the same directory.

Linux WPK
----------

Here you can see how to build a WPK package for Linux systems.

 .. code-block:: console

        # ./generate_wpk_package.sh -t linux -b branch_tag -d output/path -k path/to/keys -o myagent.wpk

Windows WPK
------------

To build a WPK for Windows you need to first download an MSI package of the desired version:

 .. code-block:: console

        # curl -O https://packages.wazuh.com/3.x/windows/wazuh-agent-3.9.5-1.msi

Here you can see how to build a WPK package for Windows systems.

 .. code-block:: console

        # /generate_wpk_package.sh -t windows -b branch_tag -d output/path -k path/to/keys -o myagent.wpk -pd path/to/wazuhagent.msi

If the -c or --checksum option is used there will be a file containing the SHA512 checksum in the same output path or you can indicate where you want to store it.

To build a WPK generation with checksum would be:

 .. code-block:: console

        # ./generate_wpk_package.sh -t linux -b branch_tag -d output/path -c path/to/checksum -k path/to/keys -o myagent.wpk

Definitions:
 - ``branch_tag`` is the branch of the wazuh repository you want to build the sources from.
 - ``output/path`` is the path to the directory where you want to store your WPK.
 - ``myagent.wpk`` is the name of the WPK.
 - ``path/to/keys`` is the path to your SSL certificate and key both of them must be in the same directory.
 - ``path/to/wazuhagent.msi`` is the path to the MSI package.
 - ``path/to/checksum`` is the path to the directory where you want to store the SHA512 checksum

