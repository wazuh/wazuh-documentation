.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh provides an automated way of building Solaris 10 and 11 packages. Learn how to build your own Wazuh Solaris 10 and 11 packages in this section.

.. _create-sol:

=============
Solaris agent
=============

Wazuh provides an automated way of building Solaris 10 and 11 packages, keep in mind that to build these packages you must use the corresponding system.

To create an Solaris package follow these steps:

Requirements
^^^^^^^^^^^^

 * Git

Download our wazuh-packages repository from GitHub and go to the ``solaris`` directory.

.. code-block:: console

  $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/solaris && git checkout v|WAZUH_CURRENT_SOLARIS|

Choose the version of solaris you want to build the package for and go to that directory.

Run the ``generate_wazuh_packages.sh`` script to build the package. Here you can see all the different parameters:

.. code-block:: console

  # ./generate_wazuh_packages.sh -h

.. code-block:: none
 :class: output

 Usage: ./generate_wazuh_packages.sh [OPTIONS]

    -b, --branch <branch>               Select Git branch or tag.
    -e, --environment                   Install all the packages necessaries to build the pkg package.
    -s, --store  <pkg_directory>        Directory to store the resulting pkg package. By default, an output folder will be created.
    -p, --install-path <pkg_home>       Installation path for the package. By default: /var.
    -c, --checksum                      Compute the SHA512 checksum of the pkg package.
    -h, --help                          Shows this help.

Below, you will find an example of how to build a Solaris package.

First install the needed dependencies:

.. code-block:: console

  # ./generate_wazuh_packages.sh -e

Download and build the sources:

.. code-block:: console

  # ./generate_wazuh_packages.sh -b v|WAZUH_CURRENT_SOLARIS|

To build a SPARC package you just need to run the same script in a SPARC system.

We also provide an automated way of building packages for i386 Solaris systems using Vagrant. Follow the following steps to learn how to do it.

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
      vagrant --branch-tag=v|WAZUH_CURRENT_SOLARIS| --ram=1024 --cpus=4 up solaris10 solaris11

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

Clone our wazuh-packages repository from GitHub and switch to your target branch. Copy the source files for your Solaris 10 or Solaris 11 target system into ``wazuh-packages/solaris/package_generation/src``. Change to the ``wazuh-packages/solaris/package_generation`` directory before building the package.

.. tabs::

  .. group-tab:: Solaris 10

    .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/solaris && git checkout v|WAZUH_CURRENT_SOLARIS10|
      $ cp solaris10 package_generation/src/
      $ cd package_generation

  .. group-tab:: Solaris 11

    .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/solaris && git checkout v|WAZUH_CURRENT_SOLARIS11|
      $ cp solaris11 package_generation/src/
      $ cd package_generation

Below, you will find some examples of how to build a Solaris package using this tool.

.. code-block:: console

  # vagrant --branch-tag=v|WAZUH_CURRENT_SOLARIS10| up solaris10_cmake

This will generate a |WAZUH_CURRENT_SOLARIS10| Wazuh agent package for Solaris 10

.. code-block:: console

  # vagrant --branch-tag=v|WAZUH_CURRENT_SOLARIS11| up solaris11_cmake

This will generate a |WAZUH_CURRENT_SOLARIS11| Wazuh agent package for Solaris 11

.. code-block:: console

  # vagrant --branch-tag=v|WAZUH_CURRENT_SOLARIS| up solaris10_cmake solaris11_cmake

This will generate a |WAZUH_CURRENT_SOLARIS| Wazuh agent package for Solaris 10 and Solaris 11

After the process has ended the package will be stored in the ``src`` folder.

To finish destroy the machines:

.. code-block:: console

  # vagrant destroy solaris10_cmake solaris11_cmake
