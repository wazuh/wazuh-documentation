.. Copyright (C) 2019 Wazuh, Inc.

.. _create-custom-hpux:

Creating custom AIX packages
=============================

Wazuh provides an automated way of building HPUX packages, keep in mind that to build an HPUX package you must run this tool in an HPUX system.

To create an HPUX package follow these steps:

Requirements
^^^^^^^^^^^^^

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

 These scripts build a wazuh package for HPUX.
 USAGE: Command line options available:
 -h, --help Displays this help.
 -d, --download Download Wazuh repository.
 -b, --build Builds HPUX package.
 -u, --utils Download and install utilities and dependencies.
 -c, --clean-all Clean sources and generated files.

 USAGE EXAMPLE:
 --------------
 ./generate_wazuh_packages.sh [option] [branch_tag] [revision]
 ./generate_wazuh_packages.sh -d branches/3.3 1

Below, you will find an example of how to build HPUX packages.

First, install the needed dependencies:

.. code-block:: console

 # ./generate_wazuh_packages.sh -u

Download the sources:

.. code-block:: console

 # ./generate_wazuh_packages.sh -d v3.10.0

Build the package

.. code-block:: console

 # ./generate_wazuh_packages.sh -b v3.10.0