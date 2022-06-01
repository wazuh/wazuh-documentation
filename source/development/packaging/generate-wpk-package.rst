.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Wazuh provides an automated way of building WPK packages using docker. Learn how to create a WPK package in this section of the Wazuh documentation.

.. _create-wpk:

WPK
===

Wazuh provides an automated way of building WPK packages using docker so there is no need for any other dependency.

To generate a WPK package, an X509 certificate, and CA, see :ref:`Custom WPK packages creation <create-wpk-key>`.

To create a WPK package, follow these steps:

Requirements
^^^^^^^^^^^^

 * Docker
 * Git

Download our wazuh-packages repository from GitHub and go to the wpk directory.

.. code-block:: console

 $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/wpk && git checkout v|WAZUH_LATEST|

Execute the ``generate_wpk_package.sh`` script, with the different options you desire. This script will build a Docker image with all the necessary tools to create the WPK and run a container that will build it:

.. code-block:: console

  $ ./generate_wpk_package.sh -h

.. code-block:: none
  :class: output

  Usage: ./generate_wpk_package.sh [OPTIONS]

      -t,   --target-system <target>              [Required] Select target wpk to build [linux/windows/macos].
      -b,   --branch <branch>                     [Required] Select Git branch or tag e.g.
      -d,   --destination <path>                  [Required] Set the destination path of package.
      -pn,  --package-name <name>                 [Required for windows and macos] Package name to pack on wpk.
      -o,   --output <name>                       [Required] Name to the output package.
      -k,   --key-dir <arch>                      [Required] Set the WPK key path to sign package.
      --aws-wpk-key                               [Optional] AWS Secrets manager Name/ARN to get WPK private key.
      --aws-wpk-cert                              [Optional] AWS secrets manager Name/ARN to get WPK certificate.
      --aws-wpk-key-region                        [Optional] AWS Region where secrets are stored.
      -a,   --architecture <arch>                 [Optional] Target architecture of the package [x86_64].
      -j,   --jobs <number>                       [Optional] Number of parallel jobs when compiling.
      -p,   --path <path>                         [Optional] Installation path for the package. By default: /var.
      -c,   --checksum                            [Optional] Generate checksum.
      -h,   --help                                Show this help.

To use this tool, the previously required :ref:`certificate <create-wpk-key>` and the key must be in the same directory.

Linux WPK
^^^^^^^^^

Below, you will find an example of Linux WPK package building.

.. code-block:: console

  # ./generate_wpk_package.sh -t linux -b v|WAZUH_LATEST| -d /tmp/wpk -k /tmp/keys -o LinuxAgent.wpk

This script builds a Wazuh |WAZUH_LATEST| Linux WPK package named LinuxAgent.wpk and stores it in ``/tmp/wpk``. This action is done using the previously generated keys that are saved in ``/tmp/keys``.

Windows WPK
^^^^^^^^^^^

To build a WPK for Windows, you need to first download an MSI package of the desired version:

.. code-block:: console

  # curl -O https://packages.wazuh.com/|CURRENT_MAJOR|/windows/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi

Below, you will find an example of Windows WPK package building.

.. code-block:: console

  # ./generate_wpk_package.sh -t windows -b v|WAZUH_LATEST| -d /tmp/wpk -k /tmp/keys -o WindowsAgent.wpk -pn /tmp/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi

This script builds a Wazuh |WAZUH_LATEST| Windows WPK package named WindowsAgent.wpk and stores it in ``/tmp/wpk``. This action is done using the previously generated keys that are saved in ``/tmp/keys``.

If the ``-c`` or ``--checksum`` option is used, a file is created containing the SHA512 checksum in the same output path. This location is configurable and you can indicate where you want to store it.

macOS WPK
^^^^^^^^^

To build a WPK for macOS you need to first download a PKG package of the desired version:

.. code-block:: console

  # curl -O https://packages.wazuh.com/|CURRENT_MAJOR|/macos/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_OSX|.pkg

Below, you will find an example of macOS WPK package building.

.. code-block:: console

  # ./generate_wpk_package.sh -t macos -b v|WAZUH_LATEST| -d /tmp/wpk -k /tmp/keys -o macOSAgent.wpk -pn /tmp/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_OSX|.pkg

This script builds a Wazuh |WAZUH_LATEST| macOS WPK package named macOSAgent.wpk and stores it in ``/tmp/wpk``. This action is done using the previously generated keys that are saved in ``/tmp/keys``.

If the ``-c`` or ``--checksum`` option is used, a file is created containing the SHA512 checksum in the same output path. This location is configurable and you can indicate where you want to store it.

Here you can see an example of how to build a WPK generation with checksum:

.. code-block:: console

  # ./generate_wpk_package.sh -t linux -b v|WAZUH_LATEST| -d /tmp/wpk -k /tmp/keys -o LinuxAgent.wpk -c /tmp/wpk_checksum
