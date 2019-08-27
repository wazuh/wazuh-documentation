.. Copyright (C) 2019 Wazuh, Inc.

.. _create-custom-rpm:

Creating custom RPM packages
=============================

Wazuh provides an automated way of building RPM packages using docker so there is no need for any other dependency.

To create an RPM package follow these steps:

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

 Usage: ./generate_wazuh_packages.sh [OPTIONS]

 -b, --branch <branch> Select Git branch or tag e.g.
 -e, --environment Install all the packages necessaries to build the RPM package
 -s, --store <rpm_directory> Directory to store the resulting RPM package. By default: /tmp/build
 -p, --install-path <rpm_home> Installation path for the package. By default: /var
 -c, --checksum Compute the SHA512 checksum of the RPM package.
 -h, --help Shows this help

Below, you will find some examples of how to build AIX packages.

.. code-block:: console

 # ./generate_wazuh_packages.sh -e -b v3.10.0 -s /tmp

This will download and install all the necessary dependencies, build a 3.10.0 package and store it in ``/tmp``.

.. code-block:: console

 # ./generate_wazuh_packages.sh -b v3.10.0 -s /tmp -p /opt

This will build a 3.10.0 package with ``/opt`` as installation directory and store it in ``/tmp``.