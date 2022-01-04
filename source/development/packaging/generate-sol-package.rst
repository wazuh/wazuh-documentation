.. Copyright (C) 2021 Wazuh, Inc.

.. _create-sol:

Solaris
=======

Wazuh provides an automated way of building a solaris 10 and 11, keep in mind that to build these packages you must use the corresponding system.

To create an Solaris package follow these steps:

Requirements
^^^^^^^^^^^^

 * Git

Download our wazuh-packages repository from GitHub and go to the ``solaris`` directory of the |WAZUH_PACKAGES_BRANCH| branch.

.. code-block:: console

  $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/solaris && git checkout |WAZUH_PACKAGES_BRANCH|

Choose the version of solaris you want to build the package for and go to that directory.

Run the ``generate_wazuh_packages.sh`` script to build the package. Here you can see all the different parameters:

.. code-block:: console

  # ./generate_wazuh_packages.sh -h

.. code-block:: none
 :class: output

 Usage: ./generate_wazuh_packages.sh [OPTIONS]
 
    -b, --branch <branch>
          Select Git branch or tag.
    -e, --environment
          Install all the packages necessaries to build the package.
    -s, --store  <pkg_directory>
          Directory to store the resulting package. By default, an output folder will be created.
    -p, --install-path <pkg_home>
          Installation path for the package. By default: /var.
    -c, --checksum
          Compute the SHA512 checksum of the pkg package.
    -h, --help
          Shows this help.

Below, you will find an example of how to build a Solaris package.

First install the needed dependencies:

.. code-block:: console

  # ./generate_wazuh_packages.sh -e

Download and build the sources:

.. code-block:: console

  # ./generate_wazuh_packages.sh -b v|WAZUH_LATEST|

To build a SPARC package you just need to run the same script in a SPARC system.

We also provide an automated way of building packages for i386 Solaris systems using vagrant:

Requirements
^^^^^^^^^^^^^

    * Virtual Box
    * Vagrant

Bring the machine up ``vagrant [OPTION] ... up solaris10/solaris11/both``:

.. code-block:: console

  # vagrant -h up

.. code-block:: none
  :class: output

  -- CUSTOM USE OF VAGRANT FOR THIS MACHINE --

      vagrant [OPTION] ... up X
      To bring up a Solaris machine, X must be solaris10 or solaris11 or both.

      vagrant [OPTION] ... ssh/provision/delete

      Example:
      vagrant --branch-tag=v|WAZUH_LATEST| --ram=1024 --cpus=4 up solaris10 solaris11

      -h, --help:
      Show help

      --branch-tag x, -b x:
      Generate package for branch/tag x

      --ram x
      Select the amount of ram assigned to the new machine.

      --cpus x
      Select the number of CPUs assigned to the new machine.

      -- DEFAULT USE OF VAGRANT (FOR ALL MACHINES) --

  Usage: vagrant [options] <command> [<args>]

      -v, --version                    Print the version and exit.
      -h, --help                       Print this help.

Preparation
^^^^^^^^^^^

Download our wazuh-packages repository from GitHub, enter into the solaris directory, change to the desired branch, copy the desired solaris directory into the ``package_generation/src`` directory and enter in the ``package_generation`` directorty.

.. code-block:: console

  $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/solaris && git checkout |WAZUH_PACKAGES_BRANCH|
  $ cp solarisXX package_generation/src/
  $ cd package_generation

Examples
^^^^^^^^

Below, you will find some examples of how to build a Solaris package using this tool.

.. code-block:: console

  # vagrant --branch-tag=v|WAZUH_LATEST| up solaris10

This will generate a |WAZUH_LATEST| Wazuh agent package for Solaris 10

.. code-block:: console

  # vagrant --branch-tag=v|WAZUH_LATEST| up solaris11

This will generate a |WAZUH_LATEST| Wazuh agent package for Solaris 11

.. code-block:: console

  # vagrant --branch-tag=v|WAZUH_LATEST| up solaris10 solaris11

This will generate a |WAZUH_LATEST| Wazuh agent package for Solaris 10 and Solaris 11

After the process has ended the package will be stored in the ``src`` folder.

To finish destroy the machines:

.. code-block:: console

  # vagrant destroy solaris10 solaris11
