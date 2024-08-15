.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Creating a custom Wazuh signed package (WPK) file.

Creating a custom WPK
=====================

.. _create-wpk-key:

Prerequisites
-------------

To create a WPK file, an X509 certificate and root CA are required. They provide a secure mechanism for signing and verifying WPK packages. If you already have them, jump to the :ref:`building the WPK <build-wpk-package>` section. Else, perform these steps on the Wazuh server:

#. Create a root CA:

   .. code-block:: console

      # openssl req -x509 -new -nodes -newkey rsa:2048 -keyout wpk_root.key -out wpk_root.pem -batch

#. Create a certificate and key:

   .. code-block:: console

      # openssl req -new -nodes -newkey rsa:2048 -keyout wpkcert.key -out wpkcert.csr -subj '/C=US/ST=CA/O=Wazuh'

   Set the location as follows:

   -  ``/C=US`` is the country.
   -  ``/ST=CA`` is the state.
   -  ``/O=Wazuh`` is the organization's name.

#. Sign this certificate with the root CA:

   .. code-block:: console

      # openssl x509 -req -days 365 -in wpkcert.csr -CA wpk_root.pem -CAkey wpk_root.key -out wpkcert.pem -CAcreateserial

.. _build-wpk-package:

Building the WPK
----------------

There are two different methods of creating a WPK:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Using Docker
^^^^^^^^^^^^

Wazuh provides an automated way of building WPK packages using Docker, so no other dependency is needed.

To generate a WPK package, you need an X509 certificate, and CA. See :ref:`prerequisites <create-wpk-key>` to learn more.

Perform these steps on the Wazuh server to create a WPK package using Docker:

Requirements

-  Docker
-  Git

#. Download the ``wazuh-packages`` repository from GitHub and navigate to the WPK directory:

   .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/wpk && git checkout v|WAZUH_CURRENT|

#. Execute the ``generate_wpk_package.sh`` script with the different options you desire. This script will build a Docker image with all the necessary tools to create the WPK and run a container that will build it:

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
          -c,   --checksum                            [Optional] Generatez checksum.
          -h,   --help                                Show this help.

To use this tool, the previously created :ref:`certificate and key <create-wpk-key>` must be in the same directory.

Linux WPK
~~~~~~~~~

Run the command below to build a Linux WPK:

.. code-block:: console

   # ./generate_wpk_package.sh -t linux -b v|WAZUH_CURRENT| -d /<DESTINATION_PATH> -k /<PATH_TO_GENERATED_WPK_KEYS> -o wazuh-agent_v|WAZUH_CURRENT|_linux.wpk

This script builds a Wazuh version |WAZUH_CURRENT| Linux WPK file named ``wazuh-agent_v|WAZUH_CURRENT|_linux.wpk`` and stores it in ``/<DESTINATION_PATH>`` (You can use a destination path of your choice).  It does this using the previously generated keys saved in ``/<PATH_TO_GENERATED_WPK_KEYS>`` (See :ref:`prerequisites <create-wpk-key>`).

Replace ``/<PATH_TO_GENERATED_WPK_KEYS>`` with the directory path of the previously generated keys (Example: ``/tmp/keys``).

Windows WPK
~~~~~~~~~~~

To build a WPK for Windows, you need to first download an MSI package of the desired version:

.. code-block:: console

   # curl -O https://packages.wazuh.com/4.x/windows/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_WINDOWS|.msi

Run the command below to build a Windows WPK:

.. code-block:: console

   # ./generate_wpk_package.sh -t windows -b v|WAZUH_CURRENT| -d /<DESTINATION_PATH> -k /<PATH_TO_GENERATED_WPK_KEYS> -o wazuh-agent_v|WAZUH_CURRENT|_windows.wpk -pn /<PATH_TO>/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_WINDOWS|.msi

This script builds a Wazuh |WAZUH_CURRENT| Windows WPK package named ``wazuh-agent_v|WAZUH_CURRENT|_windows.wpk`` and stores it in ``/<DESTINATION_PATH>``. (You can use a destination path of your choice). It does this using the previously generated keys saved in ``/<PATH_TO_GENERATED_WPK_KEYS>`` and the downloaded MSI package in ``/<PATH_TO>/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_WINDOWS|.msi``.

Replace ``/<PATH_TO_GENERATED_WPK_KEYS>`` with the directory path of the previously generated keys and ``<PATH_TO>/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_WINDOWS|.msi`` with the directory path to the downloaded MSI package.

If the ``-c`` or ``--checksum`` option is used, a file is created containing the SHA512 checksum in the same output path. The location of this file is configurable, and you can indicate where you want to store it.

macOS WPK
~~~~~~~~~

To build a WPK for macOS, you need to first download a PKG package of the desired version:

.. code-block:: console

   # curl -O https://packages.wazuh.com/4.x/macos/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_OSX|.pkg

Run the command below to build a macOS WPK:

.. code-block:: console

   # ./generate_wpk_package.sh -t macos -b v|WAZUH_CURRENT| -d /<DESTINATION_PATH> -k /<PATH_TO_GENERATED_WPK_KEYS> -o wazuh-agent_v|WAZUH_CURRENT|_macOS.wpk -pn /tmp/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_OSX|.pkg

This script builds a Wazuh |WAZUH_CURRENT| macOS WPK package named ``wazuh-agent_v|WAZUH_CURRENT|_macOS.wpk`` and stores it in ``/<DESTINATION_PATH>``. (You can use a destination path of your choice). It does this using the previously generated keys saved in ``/<PATH_TO_GENERATED_WPK_KEYS>``.

Replace ``/<PATH_TO_GENERATED_WPK_KEYS>`` with the directory path of the previously generated keys.

If the ``-c`` or ``--checksum`` option is used, a file is created containing the SHA512 checksum in the same output path. The location of this file is configurable, and you can indicate where you want to store it.

Below is an example of how to build a WPK generation with checksum:

.. code-block:: console

   # ./generate_wpk_package.sh -t linux -b v|WAZUH_CURRENT| -d /<DESTINATION_PATH> -k /<PATH_TO_GENERATED_WPK_KEYS> -o LinuxAgent.wpk -c /tmp/wpk_checksum

Generating WPK packages manually
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform these actions on the Wazuh server.

Requirements

-  Python 2.7 or 3.5+
-  The Python ``cryptography`` package. This can be obtained using the following command:

   .. code-block:: console

      $ pip install cryptography

Linux WPK
~~~~~~~~~

#. Install the development tools and compilers. This can easily be done using your distribution package manager.

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum install make gcc policycoreutils-python automake autoconf libtool unzip

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install make gcc libc6-dev curl policycoreutils automake autoconf libtool unzip

#. Download and extract the latest version:

   .. code-block:: console

      # curl -Ls https://github.com/wazuh/wazuh/archive/v|WAZUH_CURRENT|.tar.gz | tar zx

#. Modify the ``wazuh-|WAZUH_CURRENT|/etc/preloaded-vars.conf`` file that was downloaded to deploy an :doc:`unattended update </user-manual/reference/unattended-installation>` in the Wazuh agent by uncommenting the following lines:

   .. code-block:: ini

      USER_LANGUAGE="en"
      USER_NO_STOP="y"
      USER_UPDATE="y"
      USER_BINARYINSTALL="y"

#. Compile the project from the ``src`` folder:

   .. code-block:: console

      # cd wazuh-|WAZUH_CURRENT|/src
      # make deps TARGET=agent
      # make TARGET=agent

#. Delete the files that are no longer needed. This step can be skipped, but the size of the WPK will be considerably larger:

   .. code-block:: console

      $ rm -rf ./{api,framework}
      $ rm -rf gen_ossec.sh add_localfiles.sh
      $ rm -rf src/{addagent,analysisd,client-agent,config,error_messages,external/*,headers,logcollector,monitord,os_auth,os_crypto,os_csyslogd,os_dbd,os_execd}
      $ rm -rf src/{os_integrator,os_maild,os_net,os_regex,os_xml,os_zlib,remoted,reportd,shared,syscheckd,unit_tests,wazuh_db}
      $ rm -rf src/win32
      $ rm -rf src/*.a
      $ find etc/templates/config -not -name "sca.files" -delete 2>/dev/null
      $ find etc/templates/* -maxdepth 0 -not -name "en" -not -name "config" | xargs rm -rf

#. Install the root CA if you want to overwrite the root CA with the file you :ref:`created previously <create-wpk-key>`:

   .. code-block:: console

      # cd ../
      # cp <PATH_TO>/wpk_root.pem etc/wpk_root.pem

#. Compile the WPK package using your SSL certificate and key:

   .. code-block:: console

      # tools/agent-upgrade/wpkpack.py <PATH_TO>/myagent.wpk <PATH_TO>/wpkcert.pem /<PATH_TO>/wpkcert.key *

In this example, the Wazuh project's root directory contains the proper ``upgrade.sh`` file.

Definitions:

-  ``<PATH_TO>/myagent.wpk`` is the name of the output WPK package.
-  ``<PATH_TO>/wpkcert.pem`` is the path to the SSL certificate.
-  ``<PATH_TO>/wpkcert.key`` is the path to the SSL certificate's key.
-  ``*`` is the file or files to be included in the WPK package. In this case, all the contents are added.

Windows WPK
~~~~~~~~~~~

#. Install the development tools and compilers. This can easily be done using your distribution package manager:

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum install make gcc policycoreutils-python automake autoconf libtool unzip

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install make gcc libc6-dev curl policycoreutils automake autoconf libtool unzip

#. Download and extract the latest version of Wazuh sources:

   .. code-block:: console

      # curl -Ls https://github.com/wazuh/wazuh/archive/v|WAZUH_CURRENT|.tar.gz | tar zx

#. Download the latest version of the Wazuh MSI package:

   .. code-block:: console

      # curl -Ls https://packages.wazuh.com/4.x/windows/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_WINDOWS|.msi --output wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_WINDOWS|.msi

#. Install the root CA if you want to overwrite the root CA with the file you created previously:

   .. code-block:: console

      # cd ../
      # cp <PATH_TO>/wpk_root.pem etc/wpk_root.pem

#. Compile the WPK package using the MSI package and your SSL certificate and key:

   .. code-block:: console

      # tools/agent-upgrade/wpkpack.py <PATH_TO>/myagent.wpk <PATH_TO>/wpkcert.pem <PATH_TO>/wpkcert.key <PATH_TO>/wazuhagent.msi <PATH_TO>/upgrade.bat <PATH_TO>/do_upgrade.ps1

Definitions:

-  ``<PATH_TO>/myagent.wpk`` is the name of the output WPK package.
-  ``<PATH_TO>/wpkcert.pem`` is the path to the SSL certificate.
-  ``<PATH_TO>/wpkcert.key`` is the path to the SSL certificate's key.
-  ``<PATH_TO>/wazuhagent.msi`` is the path to the MSI file downloaded in step 3.
-  ``<PATH_TO>/upgrade.bat`` is the path to the ``upgrade.bat`` file. Find an example in ``src/win32`` in the Wazuh repository.
-  ``<PATH_TO>/do_upgrade.ps1`` is the path to the ``do_upgrade.ps1`` file. Find an example in ``src/win32`` in the Wazuh repository.

macOS WPK
~~~~~~~~~

#. Install development tools and compilers. This can easily be done using your distribution package manager:

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum install make gcc policycoreutils-python automake autoconf libtool unzip

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install make gcc libc6-dev curl policycoreutils automake autoconf libtool unzip

#. Download and extract the latest version of Wazuh sources:

   .. code-block:: console

      # curl -Ls https://github.com/wazuh/wazuh/archive/v|WAZUH_CURRENT|.tar.gz | tar zx
      # cd wazuh-|WAZUH_CURRENT|

#. Download the latest version of the Wazuh PKG package:

   .. code-block:: console

      # curl -Ls https://packages.wazuh.com/4.x/macos/wazuh-agent-|WAZUH_CURRENT|-1.pkg --output wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_OSX|.pkg

#. Install the root CA if you want to overwrite the root CA with the file you created previously:

   .. code-block:: console

      # cp <PATH_TO>/wpk_root.pem etc/wpk_root.pem

#. Copy the necessary script to the Wazuh sources folder to compile the WPK:

   .. code-block:: console

      # cp src/init/pkg_installer_mac.sh .

#. Compile the WPK package using the PKG package and your SSL certificate and key:

   .. code-block:: console

      # tools/agent-upgrade/wpkpack.py <PATH_TO>/myagent.wpk <PATH_TO>/wpkcert.pem <PATH_TO>/wpkcert.key wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_OSX|.pkg upgrade.sh pkg_installer_mac.sh

Where:

-  ``<PATH_TO>/myagent.wpk`` is the name of the output WPK package.
-  ``<PATH_TO>/wpkcert.pem`` is the path to the SSL certificate.
-  ``<PATH_TO>/wpkcert.key`` is the path to the SSL certificate's key.
-  ``wazuh-agent-4.8.0-1.pkg`` is the PKG file downloaded in step 3.
-  ``upgrade.sh`` is the script that runs first when the WPK is deployed in the target agent. Find an example in the base directory in the Wazuh repository.
-  ``pkg_installer_mac.sh`` is the script that manages the WPK upgrade procedure. Find an example in ``src/init`` in the Wazuh repository.

.. note::

   These are only examples. If you want to distribute a WPK package using these methods, it's important to begin with an empty directory.
