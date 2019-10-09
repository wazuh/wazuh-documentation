.. Copyright (C) 2019 Wazuh, Inc.

.. _create-aix:

Creating  AIX packages
=============================

Wazuh provides an automated way of building AIX packages, keep in mind that to build an AIX package you must run this tool in an AIX system.

To create an AIX package follow these steps:

Requirements
^^^^^^^^^^^^^

 * curl

Download our wazuh-packages repository from GitHub and go to the aix directory.

.. code-block:: console

 $ curl -L https://github.com/wazuh/wazuh-packages/tarball/master | tar zx
 $ cd wazuh-wazuh-packages-*
 $ cd aix

Execute the ``generate_wazuh_packages.sh`` script, with the different options you desire.

.. code-block:: console

 # ./generate_wazuh_packages.sh -h

 Usage: ../wazuh-packages/aix/generate_wazuh_packages.sh [OPTIONS]

    -b, --branch <branch>               Select Git branch or tag e.g.
    -e, --environment                   Install all the packages necessaries to build the RPM package
    -s, --store  <rpm_directory>        Directory to store the resulting RPM package. By default: /tmp/build
    -p, --install-path <rpm_home>       Installation path for the package. By default: /var
    -c, --checksum <path>               Compute the SHA512 checksum of the RPM package.
    -h, --help                          Shows this help

First, install the needed dependencies:

.. code-block:: console

 # ./generate_wazuh_packages.sh -e

Below, you will find some examples of how to build an AIX package.

.. code-block:: console

 # ./generate_wazuh_packages.sh -b v3.10.2

 This will generate a 3.10.2 AIX package.

.. code-block:: console

 # ./generate_wazuh_packages.sh -b v3.10.2 -c

 This will generate a 3.10.2 AIX package with checksum.

 .. code-block:: console

 # ./generate_wazuh_packages.sh -b v3.10.2  -p /opt

 This will generate a 3.10.2 AIX package with ``/opt`` as installation directory.