.. Copyright (C) 2021 Wazuh, Inc.
.. meta::
  :description: Check out the step-by-step guide on how to create a WPK package.
.. _create-wpk:

WPK
===

Wazuh provides an automated way of building WPK packages using docker so there is no need for any other dependency.

You can see how to generate a WPK package, an X509 certificate and CA :ref:`here <create-wpk-key>`.

To create a WPK package follow these steps:

Requirements
^^^^^^^^^^^^

 * Docker
 * Git

Download our wazuh-packages repository from GitHub and go to the wpk directory.

.. code-block:: console

 $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/wpk

If you want to build a version later or equal to |WAZUH_GCC_CHANGE|, you must change to |WAZUH_PACKAGES_BRANCH| branch.

.. code-block:: console

 $ git checkout |WAZUH_PACKAGES_BRANCH|

If you want to build a version prior to |WAZUH_GCC_CHANGE|, you must change to the corresponding tag, e.g. v|WAZUH_PREGCC_CHANGE|

.. code-block:: console

 $ git checkout v|WAZUH_PREGCC_CHANGE|

Execute the ``generate_wpk_package.sh`` script, with the different options you desire. This script will build a Docker image with all the necessary tools to create the WPK and run a container that will build it:

.. code-block:: console

  $ ./generate_wpk_package.sh -h

.. code-block:: none
  :class: output

  Usage: ./generate_wpk_package.sh [OPTIONS]
  
      -t,   --target-system <target>              [Required] Select target wpk to build [linux/windows]
      -b,   --branch <branch>                     [Required] Select Git branch or tag e.g. 
      -d,   --destination <path>                  [Required] Set the destination path of package.
      -k,   --key-dir <arch>                      [Required] Set the WPK key path to sign package.
      -a,   --architecture <arch>                 [Optional] Target architecture of the package [x86_64].
      -j,   --jobs <number>                       [Optional] Number of parallel jobs when compiling.
      -pd,  --package-directory <directory>       [Required for windows] Package name to pack on wpk.
      -p,   --path <path>                         [Optional] Installation path for the package. By default: /var.
      -o,   --output <name>                       [Required] Name to the output package.
      -c,   --checksum                            [Optional] Generate checksum
      -h,   --help                                Show this help.

To use this tool, the previously required :ref:`certificate <create-wpk-key>` and the key must be in the same directory.

Linux WPK
^^^^^^^^^

Below, you will find an example of Linux WPK package building.

.. code-block:: console

  # ./generate_wpk_package.sh -t linux -b v|WAZUH_LATEST| -d /tmp/wpk -k /tmp/keys -o LinuxAgent.wpk

This will build a |WAZUH_LATEST| Wazuh Linux WPK package named LinuxAgent.wpk, using the  with the previously generated keys that are saved in ``/tmp/keys`` and store it in ``/tmp/wpk``.

Windows WPK
^^^^^^^^^^^

To build a WPK for Windows you need to first download an MSI package of the desired version:

.. code-block:: console

  # curl -O https://packages.wazuh.com/|CURRENT_MAJOR|/windows/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi

Below, you will find an example of Windows WPK package building.

.. code-block:: console

  # ./generate_wpk_package.sh -t windows -b v|WAZUH_LATEST| -d /tmp/wpk -k /tmp/keys -o WindowsAgent.wpk -pd /tmp/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi

This will build a |WAZUH_LATEST| Wazuh Windows WPK package named WindowsAgent.wpk, using the  with the previously generated keys that are saved in ``/tmp/keys`` and store it in ``/tmp/wpk``.

If the ``-c`` or ``--checksum`` option is used there will be a file containing the SHA512 checksum in the same output path or you can indicate where you want to store it.

Here you can see an example of how to build a WPK generation with checksum:

.. code-block:: console

  # ./generate_wpk_package.sh -t linux -b v|WAZUH_LATEST| -d /tmp/wpk -k /tmp/keys -o LinuxAgent.wpk -c /tmp/wpk_checksum
