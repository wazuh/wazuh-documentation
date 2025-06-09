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

Creating the Wazuh Linux agent package
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
