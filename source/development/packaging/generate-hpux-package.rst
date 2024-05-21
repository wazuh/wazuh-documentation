.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh provides an automated way of building HPUX packages. Learn how to build your own Wazuh HPUX packages in this section of our documentation.

.. _create-hpux:

==========
HPUX agent
==========

Wazuh provides an automated way of building HPUX packages, keep in mind that to build an HPUX package you must run this tool in an HPUX system.

To create an HPUX package follow these steps:

Requirements
^^^^^^^^^^^^

 * GCC: download.
 * depothelper: download.

Download our wazuh-packages repository from GitHub and go to the ``hpux`` directory.

.. code-block:: console

 $ curl -L https://github.com/wazuh/wazuh-packages/tarball/v|WAZUH_CURRENT| | tar zx
 $ cd wazuh-wazuh-packages-*
 $ cd hp-ux

Execute the ``generate_wazuh_packages.sh`` script, with the different options you desire.

.. code-block:: console

  # ./generate_wazuh_packages.sh -h

.. code-block:: none
  :class: output

  Usage: ./generate_wazuh_packages.sh [OPTIONS]

      -e Install all the packages necessaries to build the package
      -b <branch> Select Git branch. Example v|WAZUH_CURRENT_HPUX|
      -s <pkg_directory> Directory to store the resulting package. By default, an output folder will be created.
      -p <pkg_home> Installation path for the package. By default: /var
      -c, --checksum Compute the SHA512 checksum of the package.
      -d <path_to_depot>, --depot Change the path to depothelper package (by default current path).
      -h Shows this help

Below, you will find an example of how to build HPUX packages.

First, install the needed dependencies:

.. code-block:: console

  # ./generate_wazuh_packages.sh -e

Below, you will find some examples of how to build an HPUX package.

.. code-block:: console

  # ./generate_wazuh_packages.sh -b v|WAZUH_CURRENT_HPUX|

This will generate a |WAZUH_CURRENT_HPUX| Wazuh agent HPUX package.

.. code-block:: console

  # ./generate_wazuh_packages.sh -b v|WAZUH_CURRENT_HPUX| -c

This will generate a |WAZUH_CURRENT_HPUX| Wazuh agent HPUX package with checksum.

.. code-block:: console

  # ./generate_wazuh_packages.sh -b v|WAZUH_CURRENT_HPUX|  -p /opt/ossec

This will generate a |WAZUH_CURRENT_HPUX| Wazuh agent HPUX package with ``/opt/ossec`` as installation directory.
