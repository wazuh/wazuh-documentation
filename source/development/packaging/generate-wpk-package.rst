.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh provides an automated way of building WPK packages using docker. Learn how to create a WPK package in this section of the Wazuh documentation.

.. _create-wpk:

WPK
===

Wazuh provides an automated way of building WPK packages using docker so there is no need for any other dependency.

To generate a WPK package, you need an X509 certificate, and CA, see :ref:`Custom WPK packages creation <create-wpk-key>` to learn more.

To create a WPK package, follow these steps:

Requirements
^^^^^^^^^^^^

 * Docker
 * Git

Download our wazuh repository from GitHub and go to the wpk directory.

.. code-block:: console

 $ git clone https://github.com/wazuh/wazuh && cd wazuh/packages/wpk && git checkout v|WAZUH_CURRENT|

Execute the ``generate_wpk_package.sh`` script, with the different options you desire. This script will build a Docker image with all the necessary tools to create the WPK and run a container that will build it:

.. code-block:: console

  $ ./generate_wpk_package.sh -h

.. code-block:: none
  :class: output

  Usage: packages/wpk/generate_wpk_package.sh [OPTIONS]
  It is required to use -k or --aws-wpk-key, --aws-wpk-cert parameters

    -t,   --target-system <target> [Required] Select target wpk to build [linux/windows/macos].
    -b,   --branch <branch>        [Required] Select Git branch.
    -d,   --destination <path>     [Required] Set the destination path of package.
    -pn,  --package-name <name>    [Required] Path to package file (rpm, deb, apk, msi, pkg) to pack in wpk.
    -o,   --output <name>          [Required] Name to the output package.
    -k,   --key-dir <path>         [Optional] Set the WPK key path to sign package.
    --aws-wpk-key                  [Optional] AWS Secrets manager Name/ARN to get WPK private key.
    --aws-wpk-cert                 [Optional] AWS secrets manager Name/ARN to get WPK certificate.
    --aws-wpk-key-region           [Optional] AWS Region where secrets are stored.
    -c,   --checksum               [Optional] Generate checksum on destination folder. By default: no.
    --dont-build-docker            [Optional] Locally built docker image will be used instead of generating a new one. By default: yes.
    --tag <name>                   [Optional] Tag to use with the docker image.
    -h,   --help                   Show this help.


To use this tool, the previously required :ref:`certificate <create-wpk-key>` and the key must be in the same directory.

Linux WPK
^^^^^^^^^

To build a WPK for Linux, you need to first download a package of the desired version.

The following example demonstrates the process for Debian ``amd64``, but you can follow similar steps for RPM-based distributions and other supported architectures:

.. code-block:: console

  # curl -O |DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_X86|_amd64.deb

Below, you will find an example of Linux WPK package building.

.. code-block:: console

  # ./generate_wpk_package.sh -t linux -b v|WAZUH_CURRENT| -d /tmp/wpk -k /tmp/keys -o LinuxAgent.wpk -pn /tmp/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_X86|_amd64.deb

This script builds a Wazuh |WAZUH_CURRENT| Linux WPK package named LinuxAgent.wpk and stores it in ``/tmp/wpk``. This action is done using the previously generated keys that are saved in ``/tmp/keys``.

If the ``-c`` or ``--checksum`` option is used, a file is created containing the SHA512 checksum in the same output path. This location is configurable and you can indicate where you want to store it.

Windows WPK
^^^^^^^^^^^

To build a WPK for Windows, you need to first download an MSI package of the desired version:

.. code-block:: console

  # curl -O https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_WINDOWS|/windows/wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi

Below, you will find an example of Windows WPK package building.

.. code-block:: console

  # ./generate_wpk_package.sh -t windows -b v|WAZUH_CURRENT_WINDOWS| -d /tmp/wpk -k /tmp/keys -o WindowsAgent.wpk -pn /tmp/wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi

This script builds a Wazuh |WAZUH_CURRENT_WINDOWS| Windows WPK package named WindowsAgent.wpk and stores it in ``/tmp/wpk``. This action is done using the previously generated keys that are saved in ``/tmp/keys``.

If the ``-c`` or ``--checksum`` option is used, a file is created containing the SHA512 checksum in the same output path. This location is configurable and you can indicate where you want to store it.

macOS WPK
^^^^^^^^^

To build a WPK for macOS you need to first download a PKG package of the desired version:

The following example demonstrates the process for a ``intel64`` Architecture, but you can follow similar steps for ``arm64``:

.. code-block:: console

  # curl -O https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_OSX|/macos/wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.intel64.pkg

Below, you will find an example of macOS WPK package building.

.. code-block:: console

  # ./generate_wpk_package.sh -t macos -b v|WAZUH_CURRENT_OSX| -d /tmp/wpk -k /tmp/keys -o macOSAgent.wpk -pn /tmp/wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.intel64.pkg

This script builds a Wazuh |WAZUH_CURRENT_OSX| macOS WPK package named macOSAgent.wpk and stores it in ``/tmp/wpk``. This action is done using the previously generated keys that are saved in ``/tmp/keys``.

If the ``-c`` or ``--checksum`` option is used, a file is created containing the SHA512 checksum in the same output path. This location is configurable and you can indicate where you want to store it.

Using checksums
^^^^^^^^^^^^^^^

Here you can see an example of how to build a WPK with checksum:

.. code-block:: console

    # ./generate_wpk_package.sh -t linux -b v|WAZUH_CURRENT| -d /tmp/wpk -k /tmp/keys -o LinuxAgent.wpk -pn /tmp/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_X86|_amd64.deb -c /tmp/wpk_checksum
