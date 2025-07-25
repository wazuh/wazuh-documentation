.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In this section, we show how to generate the Wazuh agent package for different environments using dedicated automation scripts.

Wazuh agent
===========

In this section, we show how to generate the Wazuh agent package for different environments using dedicated automation scripts. We show package generation for Linux, macOS, Windows, Solaris, and Wazuh signed packages (WPK).

Follow the steps outlined in each sub-section to build the Wazuh agent package for your preferred environment.

Linux endpoint
--------------

Wazuh provides an automated way of building DEB and RPM Linux agent packages using Docker.

Requirements
^^^^^^^^^^^^

Ensure that you meet the following requirements to continue:

-  :doc:`Docker </deployment-options/docker/docker-installation>`
-  `Git <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>`__

Creating the agent package
^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to create the Wazuh DEB and RPM  agent packages:

#. Clone the `wazuh <https://github.com/wazuh/wazuh>`__ repository from GitHub and navigate to the ``packages/`` directory. Select the version, v|WAZUH_CURRENT|.


   .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh && cd wazuh/packages && git checkout v|WAZUH_CURRENT|

#. Run the command below  to build a DEB or an RPM Wazuh agent package:

   .. note::

      Use the following architecture equivalences:

      -  ``amd64`` -> x86_64
      -  ``arm64`` -> aarch64
      -  ``armhf`` -> armv7hl

   .. tabs::

      .. group-tab:: DEB

         .. code-block:: console

            # ./generate_package.sh -t agent -a amd64 -p /opt/ossec --system deb

         This command generates a  Wazuh agent v|WAZUH_CURRENT| DEB package with ``/opt/ossec/`` as the installation directory for ``x86_64`` systems.

      .. group-tab:: RPM

         .. code-block:: console

            # ./generate_package.sh -t agent -a amd64 -p /opt/ossec --system rpm

         This command generates a  Wazuh agent v|WAZUH_CURRENT| RPM package with ``/opt/ossec/`` as the installation directory for ``x86_64`` systems.

You can run the ``generate_package.sh`` script with the ``-h`` flag to explore your desired options:

.. code-block:: console

   $ ./generate_package.sh -h

macOS endpoint
--------------

Wazuh provides an automated way of building the Wazuh agent package for macOS environments.

.. note::

   To build the Wazuh agent package for macOS, you must perform this operation in a macOS environment.

Requirements
^^^^^^^^^^^^

Ensure that you meet the following requirements to continue.

-  `Packages <http://s.sudre.free.fr/Software/Packages/about.html>`__
-  `Brew <https://brew.sh/>`__
-  **git**: Install with Homebrew using this command:  ``brew install git``.

If ``Packages`` and ``Brew`` are not already installed on your system, they will be installed when you run the ``generate_wazuh_packages.sh`` script below.

Creating the agent package
^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to create a macOS package:

#. Clone the `wazuh <https://github.com/wazuh/wazuh>`__ repository from GitHub and navigate to the ``macos/`` directory. Select the version, ``v|WAZUH_CURRENT|``.

   .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh && cd wazuh/packages && git checkout v|WAZUH_CURRENT| && cd macos

#. Install the build dependencies using the command:

   .. code-block:: console

      $ ./generate_wazuh_packages.sh -i

#. Build the macOS package. Find some examples below.

   .. code-block:: console

      # ./generate_wazuh_packages.sh -s /tmp

   This will build a version ``v|WAZUH_CURRENT|`` Wazuh agent macOS package and store it in ``/tmp``.

   .. code-block:: console

      # ./generate_wazuh_packages.sh -s /tmp -j 6

   This will also build a ``v|WAZUH_CURRENT|`` Wazuh agent macOS package and store it in ``/tmp`` but will use 6 jobs to compile the sources.

   .. code-block:: console

      # ./generate_wazuh_packages.sh -s /tmp -j 6 -c

   In addition to the previous settings, this will generate a ``.sha512`` file containing the checksum of the package.

You can run the ``generate_package.sh`` script with the ``-h`` flag to explore your desired options:

.. code-block:: console

   $ ./generate_package.sh -h

Apple notarization process
^^^^^^^^^^^^^^^^^^^^^^^^^^

With macOS Mojave, Apple introduced the notarization process to improve the security of the final users. With macOS Mojave is recommended to notarize any installer/app, but with the release of macOS Catalina, it is mandatory to notarize any app or installer distributed outside of the App Store. To successfully notarize your package, you must have the following items:

-  **Apple developer ID**: This is used to request the certificates to sign the binaries, the ``.pkg`` file, and notarize the package. You can request one using the `signing your apps for gatekeeper <https://developer.apple.com/developer-id/>`__ documentation. Besides, you need to enable two-factor authentication (2FA) and enroll in the Apple Developer program.
-  **Apple application certificate and apple installer certificate**: These certificates are used to sign the code and the ``.pkg`` file. In the `create developer ID certificates <https://developer.apple.com/help/account/certificates/create-developer-id-certificates/>`__ documentation, you can find more information about how to request them. Once you have downloaded them, you must add them to your login keychain and make sure that codesign and productsign can access the certificates and the private key.
-  **Xcode 10 or greater**: To properly sign the binaries, sign the package, and notarize it, you must install and download it.
-  **Temporary password for xcrun altool**: To notarize the package, you must use your Apple Developer ID and your password, but, for security reasons, only application specific passwords are allowed. To request one, you can use the `sign in to apps with your Apple Account using app-specific passwords <https://support.apple.com/en-us/102654>`__ documentation.

Once you have set up the environment, you can build and notarize the package as follows:

.. code-block:: console

   $ sudo ./generate_wazuh_packages.sh -j 4 -r 1 --notarize \
     --keychain "/Users/<USERNAME>/Library/Keychains/login.keychain-db" \
     --application-certificate <YOUR_DEVELOPER_ID_APPLICATION> \
     --installer-certificate <YOUR_DEVELOPER_ID_INSTALLATION> \
     --developer-id <YOUR_APPLE_ID@email.com> --keychain-password <LOGIN_PASSWORD> \
     --altool-password <TEMPORARY_PASSWORD_FOR_ALTOOL>

The script will automatically sign the code and enable the hardened runtime, build the package and sign it, upload the package for its notarization. Once it is notarized, the script will staple the notarization ticket to the package. The package can then be installed on those hosts without an internet connection.

The result of the notarization will be stored in the ``wazuh/packages/macos/request_result.txt`` file.

Common issues
^^^^^^^^^^^^^^

-  ``xcrun: error: unable to find utility "altool", not a developer tool or in PATH``: This error appears when ``xcrun`` is unable to find ``altool``. To solve this, you need to run:

   .. code-block:: console

      $ sudo xcode-select -r

   If this doesn't solve the issue, you need to specify the path where ``Xcode`` is installed or unpacked: 

   .. code-block:: console

      $ sudo xcode-select -s </PATH_TO_Xcode.app>

-  ``errSecInternalComponent when running codesign``: Check the status of the login keychain. To solve it, you need to close all the keychains and then run the script again.

-  ``error: The specified item could not be found in the keychain``: This error may appear if ``codesign`` or ``productsign`` can't access the Certificates, the private key or both. Check in the Keychain of your Mac hosts if they can be read by ``codesign`` and ``productsign``.

Additional information
^^^^^^^^^^^^^^^^^^^^^^^

-  `Enable hardened runtime (macOS) <https://help.apple.com/xcode/mac/current/#/devf87a2ac8f>`_
-  `About Code Signing <https://developer.apple.com/library/archive/documentation/Security/Conceptual/CodeSigningGuide/Introduction/Introduction.html>`_
-  `Code Signing Tasks <https://developer.apple.com/library/archive/documentation/Security/Conceptual/CodeSigningGuide/Procedures/Procedures.html#//apple_ref/doc/uid/TP40005929-CH4-SW26>`_
-  `Customizing the notarization workflow <https://developer.apple.com/documentation/security/notarizing_your_app_before_distribution/customizing_the_notarization_workflow?language=objc>`_
-  `Entitlements <https://developer.apple.com/documentation/bundleresources/entitlements>`_
-  `Hardened Runtime Entitlements <https://developer.apple.com/documentation/security/hardened_runtime_entitlements?language=objc>`_
-  `Resolving common notarization issues <https://developer.apple.com/documentation/security/notarizing_your_app_before_distribution/resolving_common_notarization_issues>`_

Windows endpoint
----------------

Wazuh simplifies the process of building Windows agent packages by providing an automated tool specifically designed for this purpose.

Requirements
^^^^^^^^^^^^

Ensure that you meet the following requirements to continue.

-  `Docker <https://docs.docker.com/engine/install/>`__
-  `Git <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>`__
-  `WiX Toolset <https://github.com/wixtoolset/wix3/releases/tag/wix3141rtm>`__
-  `.NET framework 4.8.1 <https://dotnet.microsoft.com/en-us/download/dotnet-framework/thank-you/net481-web-installer>`__
-  `Microsoft Windows SDK <https://developer.microsoft.com/en-us/windows/downloads/windows-sdk/>`__

Creating the agent package
^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to generate a Windows agent package:

.. note::

   The automated tool must be executed within a Windows system to ensure compatibility and proper functionality.

The process of successfully generating the Windows Microsoft Software Installer (MSI) package consists of two key stages:

-  **Windows agent compilation**: This step requires a Unix-based system with both Docker and Git installed. The Unix environment is necessary for compiling the Windows agent before packaging.
-  **Windows MSI package generation**: Once the agent is compiled, a Windows-based system is needed to create the MSI package. This system must have the *WiX Toolset*, *.NET Framework 4.8.1*, and the *Microsoft Windows SDK* installed, as these tools are essential for packaging and installer creation.

Compiling the Windows package
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Clone the `wazuh <https://github.com/wazuh/wazuh>`__ repository from GitHub and navigate to the ``windows/`` directory. Select the version, ``v4.12.0``.

   .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh && cd wazuh/packages && git checkout v4.12.0 && cd windows

#. Execute the ``generate_compiled_windows_agent.sh`` script. This script will build a Docker image with all the necessary tools to compile and obtain the Windows agent compiled in a ZIP file.

   .. code-block:: console

      $ ./generate_compiled_windows_agent.sh -o winagent -s <PATH_TO_AGENT.ZIP>

   Replace ``<PATH_TO_AGENT.ZIP>`` with the path to the directory where to store the zip file.

   .. note::

      The ``-s`` parameter needs an absolute path. This is where the ZIP file containing the compiled Windows agent will be stored.

Generating the MSI package
~~~~~~~~~~~~~~~~~~~~~~~~~~

After obtaining the ZIP file containing the compiled Wazuh agent, you need to transfer it along with the ``generate_wazuh_msi.ps1`` script to the target Windows host. One way to securely transfer these files from a Linux or macOS system is by using SCP (Secure Copy Protocol).

To transfer the files via SCP, use the following command from your Windows machine:

.. code-block:: ps1con

   > scp USERNAME@LINUX_HOST_IP:/<PATH_TO_AGENT.ZIP> C:\Users\<PATH_TO_WORKING_DIRECTORY>
   > scp USERNAME@LINUX_HOST_IP:/<PATH_TO_SCRIPT> C:\Users\<PATH_TO_WORKING_DIRECTORY>

Replace:

-  ``USERNAME`` with your Linux user account.
-  ``LINUX_HOST_IP`` with the IP address of the Linux system.
-  ``<PATH_TO_AGENT.ZIP>`` with the full path to the agent ZIP file on the Linux system.
-  ``<PATH_TO_SCRIPT>`` with the full path to the PowerShell script on the Linux system.
-  ``<PATH_TO_WORKING_DIRECTORY>`` with the full path to where to store the copied files on the Windows system.

Once the files are transferred, you can extract the ZIP file on the Windows host using PowerShell (version 5 or higher) with the following command:

.. code-block:: ps1con

   > Expand-Archive -LiteralPath .\COMPRESSED_AGENT .\

Replace ``COMPRESSED_AGENT`` with the path to the zip file containing the compressed agent. Then copy the ``generate_wazuh_msi.ps1`` script into the ``src/win32`` directory.

.. code-block:: ps1con

   > cp generate_wazuh_msi.ps1 .\AGENT_UNCOMPRESSED_FOLDER\src\win32

Execute the ``generate_wazuh_msi.ps1`` script:

.. code-block:: ps1con

   > cd .\AGENT_UNCOMPRESSED_FOLDER\src\win32
   > .\generate_wazuh_msi.ps1

.. note::

   The ``generate_wazuh_msi.ps1`` script requires ``cv2pdb.exe`` V3 to function correctly. Ensure that ``cv2pdb.exe`` is accessible via the system's ``PATH``. Using an incompatible version may result in errors or unexpected behavior.

.. code-block:: none
   :class: output

   This tool can be used to generate the Windows Wazuh agent msi package.

   PARAMETERS TO BUILD WAZUH-AGENT MSI (OPTIONALS):
       1. MSI_NAME: MSI package name output.
       2. SIGN: yes or no. By default 'no'.
       3. WIX_TOOLS_PATH: Wix tools path.
       4. SIGN_TOOLS_PATH: sign tools path.
       5. CERTIFICATE_PATH: Path to the .pfx certificate file.
       6. CERTIFICATE_PASSWORD: Password for the .pfx certificate file.

   USAGE:

       * WAZUH:
         $ ./generate_wazuh_msi.ps1  -MSI_NAME {{ NAME }} -SIGN {{ yes|no }} -WIX_TOOLS_PATH {{ PATH }} -SIGN_TOOLS_PATH {{ PATH }}
           Build a devel msi:    $ ./generate_wazuh_msi.ps1 -MSI_NAME wazuh-agent_4.11.1-1_windows_0ceb378.msi -SIGN no
           Build a prod msi:     $ ./generate_wazuh_msi.ps1 -MSI_NAME wazuh-agent-4.11.1-1.msi -SIGN yes

.. code-block:: ps1con

   > ./generate_wazuh_msi.ps1 -MSI_NAME WAZUH_PACKAGE.msi -SIGN no  -WIX_TOOLS_PATH "C:\Program Files (x86)\WiX Toolset v3.14\bin"

Replace ``WAZUH_PACKAGE`` with your desired name for the output MSI package.

Use the command below to use a specific certificate and password.

.. code-block:: ps1con

   > ./generate_wazuh_msi.ps1 -MSI_NAME WAZUH_PACKAGE.msi -SIGN yes -WIX_TOOLS_PATH "C:\Program Files (x86)\WiX Toolset v3.14\bin" -CERTIFICATE_PATH .\certificate.pfx -CERTIFICATE_PASSWORD mypassword

If you don't specify the ``CERTIFICATE_PATH`` and ``CERTIFICATE_PASSWORD`` parameters, the best-matching certificate from the Certificate Store is selected for signing the package. For more details, check the ``/a`` option of the sign command in `SignTool <https://learn.microsoft.com/en-us/windows/win32/seccrypto/signtool#sign-command-options>`__.

If the ``WIX_TOOLS`` and/or ``SIGN_TOOLS`` binaries are not added to the environment ``PATH``, specify the path as shown below:

.. code-block:: ps1con

   > ./generate_wazuh_msi.ps1 -MSI_NAME mypackage.msi -SIGN yes -WIX_TOOLS_PATH C:\PATH_TO_WIX_TOOL_FILES -SIGN_TOOLS_PATH C:\PATH_TO_SIGN_TOOL_FILES

Solaris endpoint
----------------

Using the script
^^^^^^^^^^^^^^^^

Wazuh provides an automated way of building the Wazuh agent package for Solaris 10 and 11 environments.

Requirements
~~~~~~~~~~~~

Ensure that you meet the following requirements to continue.

-  `Git <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>`__
-  cmake

.. note::

   To build a Solaris package, you must run the automated script in a Solaris environment.

Creating the agent package
~~~~~~~~~~~~~~~~~~~~~~~~~~

Follow the steps below to create a Solaris package:

#. Clone the `wazuh <https://github.com/wazuh/wazuh>`__ repository from GitHub and select the version, ``v4.12.0``.

   .. code-block:: console

      # git clone https://github.com/wazuh/wazuh && cd wazuh/packages && git checkout v4.12.0

#. Choose the version of Solaris you want to build the package for and go to that directory. Make the  ``generate_wazuh_packages.sh`` script executable and run it to build the package. Here you can see all the different parameters:

   .. code-block:: console

      # cd solaris/solaris11
      # chmod +x generate_wazuh_packages.sh && ./generate_wazuh_packages.sh -h

   .. code-block:: none
      :class: output

      NAME
              generate_wazuh_packages.sh - Generate a Solaris 11 package

      SYNOPSIS
              generate_wazuh_packages.sh [OPTIONS]

      DESCRIPTION
              -b, --branch <branch>
                      Select Git branch or tag e.g. master.

              -c, --checksum
                      Compute the SHA512 checksum of the package.

              -e, --environment
                      Install all the packages necessary to build the package.

              -h, --help
                      Shows this help.

              -p, --install-path <pkg_home>
                      Installation path for the package. By default: /var.

              -s, --store  <pkg_directory>
                      Directory to store the resulting package. By default, an output folder will be created.

Follow the steps below  to build a Solaris package.

#. First, install the needed dependencies:

   .. code-block::console

      $ ./generate_wazuh_packages.sh -e

#. Download and build the sources:

   .. code-block:: console

      $ ./generate_wazuh_packages.sh -b v4.12.0

.. note::

   To build a Solaris package for a SPARC-based system, the same command above could be run in a SPARC system. SPARC (Scalable Processor Architecture) is a 32-bit and 64-bit microprocessor architecture, developed by Sun Microsystems. It is a Reduced Instruction Set Computing (RISC) type computer architecture, often used with UNIX-based operating systems like Solaris.

Using Vagrant
^^^^^^^^^^^^^

Wazuh also provides an automated way of building packages for i386 Solaris systems using Vagrant.

Requirements
~~~~~~~~~~~~

-  Virtual Box
-  Vagrant

Creating the agent package
~~~~~~~~~~~~~~~~~~~~~~~~~~

Follow the steps described below to build the Solaris package corresponding to your environment:

.. tabs::

   .. group-tab:: Solaris 10

      #. Clone the `wazuh <https://github.com/wazuh/wazuh>`__ repository and switch to your target branch. Copy the source files for your Solaris 10 into ``wazuh/packages/solaris/package_generation/src``, then change to the ``wazuh/packages/solaris/package_generation`` directory:

         .. code-block:: console

            # git clone https://github.com/wazuh/wazuh && cd wazuh/packages && git checkout v4.12.0
            # cd solaris && cp -r solaris10 package_generation/src/ && cd package_generation

      #. Build the Solaris package using Vagrant:

         .. code-block:: console

            # vagrant --branch-tag=v4.12.0 up solaris10_cmake

   .. group-tab:: Solaris 11

      #. Clone the `wazuh <https://github.com/wazuh/wazuh>`__ repository and switch to your target branch. Copy the source files for your Solaris 11 into ``wazuh/packages/solaris/package_generation/src``, then change to the ``wazuh/packages/solaris/package_generation`` directory.

         .. code-block:: console

            # git clone https://github.com/wazuh/wazuh && cd wazuh/packages && git checkout v4.12.0
            # cd solaris && cp -r solaris11 package_generation/src/ && cd package_generation

      #. Build the Solaris package using Vagrant:

         .. code-block:: console

            # vagrant --branch-tag=v4.12.0 up solaris11_cmake

.. note::

   You can generate both packages in a single command as follows:

   .. code-block:: console

      # vagrant --branch-tag=v4.12.0 up solaris10_cmake solaris11_cmake

   The generated packages are stored in the ``wazuh/packages/solaris/package_generation/src/`` directory.

Destroying the VMs
~~~~~~~~~~~~~~~~~~

Run the command below to destroy the VMs once the package generation is completed.

.. code-block:: console

   # vagrant destroy solaris10_cmake solaris11_cmake

Wazuh signed package (WPK)
--------------------------

Wazuh signed package (WPK) is a lightweight package format that includes the agent binaries along with a digital signature to ensure its integrity. It is particularly useful for remotely upgrading Wazuh agents directly from the Wazuh manager, eliminating the need for external configuration management tools.

Wazuh provides an automated way of building WPK using Docker, so there is no need for any other dependencies.

To generate a WPK package, you need an X509 certificate and a certificate authority (CA). See :doc:`Creating a custom WPK </user-manual/agent/agent-management/remote-upgrading/wpk-files/create-custom-wpk>` to learn more.

Follow the steps below to create a WPK package:

Requirements
^^^^^^^^^^^^

Ensure that you meet the following requirements to continue.

-  :doc:`Docker </deployment-options/docker/docker-installation>`
-  `Git <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>`__

Initial steps
^^^^^^^^^^^^^

#. Clone the `wazuh <https://github.com/wazuh/wazuh>`__ repository and navigate to the ``wpk/`` directory. Select the version, ``v4.12.0``.

   .. code-block:: console

      # git clone https://github.com/wazuh/wazuh && cd wazuh/packages && git checkout v4.12.0 && cd wpk

#. Execute the ``generate_wpk_package.sh`` script:

   .. code-block:: console

      # ./generate_wpk_package.sh -h

   This script will build a Docker image with all the necessary tools to create the WPK and run a container that will build it:

   .. code-block:: none
      :class: output

      Usage: ./generate_wpk_package.sh [OPTIONS]
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

To use this tool, the previously required :ref:`certificate <create-wpk-key>` and the key must be created in a dedicated directory.

Linux
^^^^^

To build a WPK for Linux, you need to first download a package of the desired version.

The following steps demonstrate the build process for Debian ``amd64``, but you can follow similar steps for RPM-based distributions and other supported architectures:

#. Download the Linux debian package:

   .. code-block:: console

      # curl -O https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_4.12.0-1_amd64.deb

#. Run the ``generate_wpk_package.sh`` script to build the Linux WPK package:

   .. code-block:: console

      # ./generate_wpk_package.sh -t linux -b v4.12.0 -d /tmp/wpk -k <PATH_TO_KEYS> -o LinuxAgent.wpk -pn Wazuh-agent_4.12.0-1_amd64.deb

   Replace ``<PATH_TO_KEYS>`` with the full path to where the X509 certificate and root CA are stored.

This script builds a Wazuh 4.12.0 Linux WPK package named ``LinuxAgent.wpk`` and stores it in ``/tmp/wpk``. This action is done using the previously generated keys that are saved in ``/tmp/keys``.

If you use the ``-c`` or ``--checksum`` option, a file containing the SHA512 checksum is created in the same output path. This location is configurable, allowing you to indicate where you want to store it.

macOS
^^^^^

To build a WPK for macOS, you need to first download a PKG package of the desired version:

The following steps demonstrate the build process for an intel64 architecture, but you can follow similar steps for arm64:

#. Download the intel64 package:

   .. code-block:: console

      # curl -O https://packages.wazuh.com/4.x/macos/wazuh-agent-4.12.0-1.intel64.pkg

#. Run the ``generate_wpk_package.sh`` script to build the macOS WPK package:

   .. code-block:: console

      # ./generate_wpk_package.sh -t macos -b v4.12.0 -d /tmp/wpk -k /PATH/TO/KEYS -o macOSAgent.wpk -pn wazuh-agent-4.12.0-1.intel64.pkg

   Replace ``/PATH/TO/KEYS`` with the full path to where the X509 certificate and root CA are stored.

This script builds a Wazuh 4.12.1 macOS WPK package named ``macOSAgent.wpk`` and stores it in ``/tmp/wpk``. This action is done using the previously generated keys that are saved in ``/tmp/keys``.

If the ``-c`` or ``--checksum`` option is used, a file is created containing the SHA512 checksum in the same output path. This location is configurable, and you can indicate where you want to store it.

Windows
^^^^^^^

To build a WPK for Windows, you need to first download an MSI package of the desired version:

#. Download the intel64 package:

   .. code-block:: console

      # curl -O https://packages.wazuh.com/4.x/windows/wazuh-agent-4.12.0-1.msi

#. Run the ``generate_wpk_package.sh`` script to build the Windows WPK package:

   .. code-block:: console

      # ./generate_wpk_package.sh -t windows -b v4.12.0 -d /tmp/wpk -k /<PATH_TO_KEYS> -o WindowsAgent.wpk -pn /tmp/wazuh-agent-4.12.0-1.msi

   Replace ``<PATH_TO_KEYS>`` with the full path to where the X509 certificate and root CA are stored.

This script builds a Wazuh 4.12.0 Windows WPK package named ``WindowsAgent.wpk`` and stores it in ``/tmp/wpk``. This action is done using the previously generated keys that are saved in ``/tmp/keys``.

If the ``-c`` or ``--checksum`` option is used, a file is created containing the SHA512 checksum in the same output path. This location is configurable, and you can indicate where you want to store it

Using checksums
---------------

Run the command below  to build a WPK with a checksum:

.. code-block:: console

   # ./generate_wpk_package.sh -t linux -b v4.12.0 -d /tmp/wpk -k /<PATH_TO_KEYS> -o LinuxAgent.wpk -pn wazuh-agent_4.12.0-1_amd64.deb -c /tmp/wpk_checksum

Replace ``<PATH_TO_KEYS>`` with the full path to where the X509 certificate and root CA are stored.
