.. Copyright (C) 2022 Wazuh, Inc.

.. _create-aix:

AIX
===

Wazuh provides an automated way of building AIX packages, keep in mind that to build an AIX package you must run this tool in an AIX system.

To create an AIX package follow these steps:

Requirements
^^^^^^^^^^^^

 * curl

Download our wazuh-packages repository from GitHub and go to the aix directory.

.. code-block:: console

 $ curl -L https://github.com/wazuh/wazuh-packages/tarball/v|WAZUH_LATEST| | tar zx
 $ cd wazuh-wazuh-packages-*
 $ cd aix

Execute the ``generate_wazuh_packages.sh`` script, with the different options you desire.

.. code-block:: console

  # ./generate_wazuh_packages.sh -h

.. code-block:: none
  :class: output

  Usage: ./generate_wazuh_packages.sh [OPTIONS]

      -b, --branch <branch>               Select Git branch or tag e.g. v|WAZUH_LATEST|
      -e, --environment                   Install all the packages necessaries to build the RPM package
      -s, --store  <rpm_directory>        Directory to store the resulting RPM package. By default: /tmp/build
      -p, --install-path <rpm_home>       Installation path for the package. By default: /var
      -c, --checksum <path>               Compute the SHA512 checksum of the RPM package.
      --chroot                            Create a chroot jail to build the package in /usr/pkg
      -h, --help                          Shows this help

First, install the needed dependencies:

.. code-block:: console

 # ./generate_wazuh_packages.sh -e

Below, you will find some examples of how to build an AIX package.

.. code-block:: console

  # ./generate_wazuh_packages.sh -b v|WAZUH_LATEST_AIX|

This will generate a |WAZUH_LATEST_AIX| Wazuh agent AIX package.

.. code-block:: console

  # ./generate_wazuh_packages.sh -b v|WAZUH_LATEST_AIX| -c

This will generate a |WAZUH_LATEST_AIX| Wazuh agent AIX package with checksum.

.. code-block:: console

  # ./generate_wazuh_packages.sh -b v|WAZUH_LATEST_AIX|  -p /opt/ossec

This will generate a |WAZUH_LATEST_AIX| Wazuh agent AIX package with ``/opt/ossec`` as installation directory.
