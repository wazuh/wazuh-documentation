.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh provides an automated way of building macOS packages. Learn how to build your own Wazuh macOS packages in this section of our documentation.

.. _create-osx:

===========
macOS agent
===========

Wazuh provides an automated way of building macOS packages, keep in mind that to build an macOS package you must run this tool in an macOS system.

To create an macOS package follow these steps:

Requirements
^^^^^^^^^^^^

 * `Packages <http://s.sudre.free.fr/Software/Packages/about.html>`_
 * `Brew <https://brew.sh/>`_
 * git: on macOS install with homebrew use brew install git

If ``Packages`` and ``Brew`` are not already installed in your system, they can be installed using the generate_wazuh_packages.sh script

Download our wazuh-packages repository from GitHub and go to the macos directory.

.. code-block:: console

  $ git clone https://github.com/wazuh/wazuh && cd wazuh/packages/macos && git checkout v|WAZUH_CURRENT_OSX|

Execute the ``generate_wazuh_packages.sh`` script, with the different options you desire.

.. code-block:: console

  $ ./generate_wazuh_packages.sh -h

.. code-block:: none
  :class: output

  Usage: ./generate_wazuh_packages.sh [OPTIONS]

    Build options:
      -a, --architecture <arch>     [Optional] Target architecture of the package [intel64/arm64]. By Default: intel64.
      -b, --branch <branch>         [Optional] Select Git branch.
      -s, --store-path <path>       [Optional] Set the destination absolute path of package.
      -j, --jobs <number>           [Optional] Number of parallel jobs when compiling.
      -r, --revision <rev>          [Optional] Package revision that append to version e.g. x.x.x-rev
      -d, --debug                   [Optional] Build the binaries with debug symbols. By default: no.
      -c, --checksum <path>         [Optional] Generate checksum on the desired path (by default, if no path is specified it will be generated on the same directory than the package).
      --is_stage                    [Optional] Use release name in package
      -nc, --not-compile            [Optional] Set whether or not to compile the code.
      -h, --help                    [  Util  ] Show this help.
      -i, --install-deps            [  Util  ] Install build dependencies (Packages).
      -x, --install-xcode           [  Util  ] Install X-Code and brew. Can't be executed as root.
      -v, --verbose                 [  Util  ] Show additional information during the package generation.

    Signing options:
      --keychain                    [Optional] Keychain where the Certificates are installed.
      --keychain-password           [Optional] Password of the keychain.
      --application-certificate     [Optional] Apple Developer ID certificate name to sign Apps and binaries.
      --installer-certificate       [Optional] Apple Developer ID certificate name to sign pkg.
      --notarize                    [Optional] Notarize the package for its distribution on macOS.
      --notarize-path <path>        [Optional] Path of the package to be notarized.
      --developer-id                [Optional] Your Apple Developer ID.
      --team-id                     [Optional] Your Apple Team ID.
      --altool-password             [Optional] Temporary password to use altool from Xcode.


Below, you will find some examples of how to build macOS packages.

.. code-block:: console

  # ./generate_wazuh_packages.sh -s /tmp

This will build a |WAZUH_CURRENT_OSX| Wazuh agent macOS  package and store it in ``/tmp``.

.. code-block:: console

  # ./generate_wazuh_packages.sh -s /tmp -j 6

This will also build a |WAZUH_CURRENT_OSX| Wazuh agent macOS package and store it in ``/tmp`` but will use 6 jobs to compile the sources.

.. code-block:: console

  # ./generate_wazuh_packages.sh -s /tmp -j 6 -c

In addition to the previous settings this will generate a ``.sha512`` file containing the checksum of the package.

Apple notarization process
^^^^^^^^^^^^^^^^^^^^^^^^^^^

With macOS Mojave, Apple introduced the notarization process to improve the security of the final users. With macOS Mojave is recommended to notarize any installer/app, but with the release of macOS Catalina, it is mandatory to notarize any app or installer distributed outside of the App Store. To successfully notarize your package, you must have the following items:

* Apple Developer ID: this is used to request the certificates used to sign the binaries, the .pkg file and notarize the package. You can request one using this link. Besides, you need to enable two-factor authentication (2FA) and enroll in the Apple Developer program.
* Apple Application Certificate and Apple Installer Certificate: these certificates are used to sign the code and sign the .pkg file. In this link you can find more information about how to request them. Once you have downloaded them, you must add them to your login keychain and make sure that codesign and productsign can access to the certificates and the private key.
* Xcode 10 or greater: to properly sign the binaries, sign the package and notarize it, you must install and download it.
* Generate a temporary password for xcrun altool: to notarize the package, you must use your Apple Developer ID and your password, but, for security reasons, only application specific passwords are allowed. To request one, you can follow this link.

Once you have set up the environment, you can build and notarize the package as follows:

.. code-block:: console

  $ sudo ./generate_wazuh_packages.sh -j 4 -r 1 --notarize \
      --keychain "/Users/your-user/Library/Keychains/login.keychain-db" \
      --application-certificate "Your Developer ID Application" \
      --installer-certificate "Your Developer ID Installer" \
      --developer-id "your_apple_id@email.com" --keychain-password "login_password" \
      --altool-password "temporary-password-for-altool"

The script will automatically sign the code and enable the hardened runtime, build the package and sign it, upload the package for its notarization and once it is notarized, the script will staple the notarization ticket to the package. Thanks to this, the package will be able to be installed in those hosts without an internet connection.

The result of the notarization will be stored in wazuh-packages/macos/request_result.txt.

Common issues
^^^^^^^^^^^^^^

 * ``xcrun: error: unable to find utility "altool", not a developer tool or in PATH``: this error appears when ``xcrun`` is unable to find altool. To solve it you will need to run:

.. code-block:: console

 $ sudo xcode-select -r

If this doesn't solve the issue, you will need to specify the path where Xcode is installed or unpacked:
.. code-block:: console

  $ sudo xcode-select -s /path/to/Xcode.app

 * ``errSecInternalComponent when running codesign``: check the status of the login keychain. To solve it, you will need to close all the keychains and then run again the script.

 * ``error: The specified item could not be found in the keychain``: this error may appear if ``codesign`` or ``productsign`` can't access to the Certificates, the private key or both. Check in the Keychain of your Mac hosts if they can be read by ``codesign`` and ``productsign``.

Additional information
^^^^^^^^^^^^^^^^^^^^^^^

 * `Enable hardened runtime (macOS) <https://help.apple.com/xcode/mac/current/#/devf87a2ac8f>`_
 * `About Code Signing <https://developer.apple.com/library/archive/documentation/Security/Conceptual/CodeSigningGuide/Introduction/Introduction.html>`_
 * `Code Signing Tasks <https://developer.apple.com/library/archive/documentation/Security/Conceptual/CodeSigningGuide/Procedures/Procedures.html#//apple_ref/doc/uid/TP40005929-CH4-SW26>`_
 * `Customizing the Notarization Workflow <https://developer.apple.com/documentation/security/notarizing_your_app_before_distribution/customizing_the_notarization_workflow?language=objc>`_
 * `Entitlements <https://developer.apple.com/documentation/bundleresources/entitlements>`_
 * `Hardened Runtime Entitlements <https://developer.apple.com/documentation/security/hardened_runtime_entitlements?language=objc>`_
 * `Resolving Common Notarization Issues <https://developer.apple.com/documentation/security/notarizing_your_app_before_distribution/resolving_common_notarization_issues>`_
