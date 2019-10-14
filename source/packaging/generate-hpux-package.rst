.. Copyright (C) 2019 Wazuh, Inc.

.. _create-hpux:

Generate Wazuh HPUX packages
============================

Wazuh provides an automated way of building HPUX packages, keep in mind that to build an HPUX package you must run this tool in an HPUX system.

To create an HPUX package follow these steps:

Requirements
^^^^^^^^^^^^

 * GCC: download.
 * depothelper: download.

Download our wazuh-packages repository from GitHub and go to the ``hpux`` directory.

.. code-block:: console

 $ curl -L https://github.com/wazuh/wazuh-packages/tarball/master | tar zx
 $ cd wazuh-wazuh-packages-*
 $ cd hpux

Execute the ``generate_wazuh_packages.sh`` script, with the different options you desire.

.. code-block:: console

 # ./generate_wazuh_packages.sh -h

 Usage: ./generate_wazuh_packages.sh [OPTIONS]

     -e Install all the packages necessaries to build the TAR package
     -b <branch> Select Git branch. Example v3.10.2
     -s <tar_directory> Directory to store the resulting tar package. By default, an output folder will be created.
     -p <tar_home> Installation path for the package. By default: /var
     -c,  --checksum Compute the SHA512 checksum of the TAR package.
     -h Shows this help

Below, you will find an example of how to build HPUX packages.

First, install the needed dependencies:

.. code-block:: console

 # ./generate_wazuh_packages.sh -e

Below, you will find some examples of how to build an HPUX package.

.. code-block:: console

 # ./generate_wazuh_packages.sh -b v3.10.2

 This will generate a 3.10.2 HPUX package.

.. code-block:: console

 # ./generate_wazuh_packages.sh -b v3.10.2 -c

 This will generate a 3.10.2 HPUX package with checksum.

 .. code-block:: console

 # ./generate_wazuh_packages.sh -b v3.10.2  -p /opt

 This will generate a 3.10.2 HPUX package with ``opt`` as installation directory.