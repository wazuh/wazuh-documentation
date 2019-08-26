.. Copyright (C) 2019 Wazuh, Inc.

.. _create-custom-rpm:

Creating custom RPM packages
=============================

Wazuh provides an automated way of building RPM packages using docker so there is no need for any other dependency.

To create a WPK package follow these steps:

Requirements
^^^^^^^^^^^^^

 * Docker
 * Git

Download our wazuh-packages repository from GitHub and go to the wpk directory.

 .. code-block:: console

        $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/rpms

Execute the ``generate_wpk_package.sh`` script, with the different options you desire. This script will build a Docker image with all the necessary tools to create the WPK and run a container that will build it:

.. code-block:: console

    #  ./generate_rpm_package.sh -h

    Usage: ./generate_rpm_package.sh [OPTIONS]

        -b, --branch <branch>     [Required] Select Git branch or tag e.g. master
        -t, --target <target>     [Required] Target package to build [manager/api/agent].
        -a, --architecture <arch> [Optional] Target architecture of the package [x86_64/i386].
        -r, --revision <rev>      [Optional] Package revision that append to version e.g. x.x.x-rev
        -l, --legacy              [Optional] Build package for CentOS 5.
        -s, --store <path>        [Optional] Set the destination path of package.
        -j, --jobs <number>       [Optional] Number of parallel jobs when compiling.
        -p, --path <path>         [Optional] Installation path for the package. By default: /var.
        -d, --debug               [Optional] Build the binaries with debug symbols and create debuginfo packages. By default: no.
        -c, --checksum <path>     [Optional] Generate checksum on the desired path (by default, if no path is specified it will be generated on the same directory than the package).
        -h, --help                Show this help.

Below, you will find some examples of how to build a RPM package.

.. code-block:: console
    ./generate_rpm_package.sh -b v3.10.0 -s /tmp -t manager -a x86_64 -r my_rev.

This will generate a 3.10.0 manager package with revision ``my_rev`` for ``x86_64`` systems.

.. code-block:: console
    ./generate_rpm_package.sh -b v3.10.0 -s /tmp -t api -a i386 -r my_rev

This will generate a 3.10.0 api package with revision ``my_rev`` for ``i386`` systems and store it in ``/tmp`` .

.. code-block:: console
    ./generate_rpm_package.sh -b v3.10.0 -t agent -a x86_64 -p /opt

This will generate a 3.10.0 agent package with ``/opt`` as installation directory for ``x86_64`` systems.

