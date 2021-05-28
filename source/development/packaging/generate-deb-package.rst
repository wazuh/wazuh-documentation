.. Copyright (C) 2021 Wazuh, Inc.

.. _create-deb:

Debian
======

Wazuh provides an automated way of building DEB packages using docker so there is no need for any other dependency.

To create an Debian package follow these steps:

Requirements
^^^^^^^^^^^^

 * Docker
 * Git

Download our wazuh-packages repository from GitHub and go to the debs directory of the |WAZUH_LATEST_MINOR| branch.

.. code-block:: console

 $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/debs && git checkout |WAZUH_LATEST_MINOR|

Execute the ``generate_debian_package.sh`` script, with the different options you desire. This script will build a Docker image with all the necessary tools to create the DEB and run a container that will build it:

.. code-block:: console

  # ./generate_debian_package.sh -h

.. code-block:: none
  :class: output

  Usage: ./generate_debian_package.sh [OPTIONS]
  
    -b, --branch <branch>     [Required] Select Git branch.
    -t, --target <target>     [Required] Target package to build: manager, api or agent.
    --packages-branch         [Required] Branch of the wazuh packages repository.
    -a, --architecture <arch> [Optional] Target architecture of the package [amd64/i386/ppc64le/arm64/armhf].
    -j, --jobs <number>       [Optional] Change number of parallel jobs when compiling the manager or agent.
    -r, --revision <rev>      [Optional] Package revision.
    -s, --store <path>        [Optional] Set the destination path of package. By default, an output folder will be created.
    -p, --path <path>         [Optional] Installation path for the package.
    -d, --debug               [Optional] Build the binaries with debug symbols.
    -c, --checksum <path>     [Optional] Generate checksum on the desired path (by default, if no path is specified it will be generated on the same directory than the package).
    --dont-build-docker       [Optional] Locally built docker image will be used instead of generating a new one.
    --sources <path>          [Optional] Absolute path containing wazuh source code. This option will use local source code instead of downloading it from GitHub.
    --dev                     [Optional] Use the SPECS files stored in the host instead of downloading them from GitHub.
    --future                  [Optional] Build test future package x.30.0 Used for development purposes.
    -h, --help                Show this help.

Below, you will find some examples of how to build a DEB package.

.. code-block:: console

  # ./generate_debian_package.sh -b v|WAZUH_LATEST| --packages-branch |WAZUH_LATEST_MINOR| -s /tmp -t manager -a amd64 -r my_rev.

This will generate a |WAZUH_LATEST| Wazuh manager package DEB with revision ``my_rev`` for ``amd64`` systems.

.. code-block:: console

  # ./generate_debian_package.sh -b v|WAZUH_LATEST| --packages-branch |WAZUH_LATEST_MINOR| -s /tmp -t api -a i386 -r my_rev

This will generate a |WAZUH_LATEST| Wazuh api package DEB with revision ``my_rev`` for ``i386`` systems and store it in ``/tmp``.

.. code-block:: console

  # ./generate_debian_package.sh -b v|WAZUH_LATEST| --packages-branch |WAZUH_LATEST_MINOR| -t agent -a amd64 -p /opt

This will generate a |WAZUH_LATEST| Wazuh agent DEB package with ``/opt`` as installation directory for ``amd64`` systems.
