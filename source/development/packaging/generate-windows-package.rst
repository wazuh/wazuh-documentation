.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh provides an automated way of building Windows packages. Learn how to build your own Wazuh Windows packages in this section of our documentation.

.. _create-windows:

Windows agent
=============

Wazuh provides an automated way of building Windows packages.

Requirements
^^^^^^^^^^^^

 * Docker
 * Git
 * WiX Toolset.
 * .NET framework 3.5.1
 * Microsoft Windows SDK

To be able to generate the windows msi package, it is necessary to perform two stages.

- Windows agent compilation: You will need a ``Unix`` host with docker and git installed.
- Windows msi package generation: You will need a ``Windows`` host with WiX Toolset,.NET framework 3.5.1 and Microsoft Windows SDK.

Compiling windows agent
^^^^^^^^^^^^^^^^^^^^^^^

Download our wazuh repository from GitHub and go to the ``windows`` directory.

.. code-block:: console

    $ git clone https://github.com/wazuh/wazuh && cd wazuh/packages/windows && git checkout v|WAZUH_CURRENT_WINDOWS|

Execute the ``generate_compiled_windows_agent.sh`` script, with the different options you desire. This script will build a Docker
image with all the necessary tools to compile and obtain the Windows agent compiled in a zip file :

.. code-block:: console

  #  ./generate_compiled_windows_agent.sh -h

.. code-block:: none
  :class: output

  Usage: ./generate_compiled_windows_agent.sh [OPTIONS]

      -b, --branch <branch>     [Optional] Select Git branch to compile Wazuh code.
      --sources <path>          [Optional] Absolute path containing wazuh source code. This option will use local source code instead of downloading it from GitHub. By default: '../../src'.
      -o, --output <rev>        [Required] Name to the output package.
      -j, --jobs <number>       [Optional] Change number of parallel jobs when compiling the Windows agent. By default: 4.
      -s, --store <path>        [Optional] Set the directory where the package will be stored. By default the current path.
      -d, --debug               [Optional] Build the binaries with debug symbols. By default: no.
      -t, --trust_verification  [Optional] Build the binaries with trust load images verification. By default: 1 (only warnings).
      -c, --ca_name <CA name>   [Optional] CA name to be used to verify the trust of the agent. By default: DigiCert Assured ID Root CA.
      --dont-build-docker       [Optional] Locally built docker image will be used instead of generating a new one.
      --tag                     [Optional] Tag to use with the docker image.
      -h, --help                Show this help.

Below, you will find an example of how to build a compiled Windows agent.

.. code-block:: console

  # ./generate_compiled_windows_agent.sh -s /tmp -r myrevision

.. note::
    The ``-s`` parameter needs an absolute path. In this path you will get the zip with the compiled agent

Generating msi package
^^^^^^^^^^^^^^^^^^^^^^

Once you have obtained the zip with the compiled agent, You need to copy it along with ``generate_wazuh_msi.ps1`` script to the Windows host.

For versions 5 or higher of Windows powershell you can use the following command to unzip the Windows agent:

.. code-block:: console

  # Expand-Archive -LiteralPath .\compiled_agent.zip .\

Then copy the ``generate_wazuh_msi.ps1`` script into the ``src/win32`` directory.

.. code-block:: console

  # cp generate_wazuh_msi.ps1 .\[AGENT_UNCOMPRESSED_FOLDER]\src\win32

Execute the ``generate_wazuh_msi.ps1`` script, with the different options you desire:

.. code-block:: console

  # cd .\[AGENT_UNCOMPRESSED_FOLDER]\src\win32
  # .\generate_wazuh_msi.ps1

.. code-block:: none
  :class: output

  This tool can be used to generate the Windows Wazuh agent msi package.
      PARAMETERS TO BUILD WAZUH-AGENT MSI:
          1. MSI_NAME: MSI package name output.
          2. SIGN: yes or no. By default 'no'.
      OPTIONAL PARAMETERS:
          3. WIX_TOOLS_PATH: Wix tools path.
          4. SIGN_TOOLS_PATH: sign tools path.
          5. CERTIFICATE_PATH: Path to the .pfx certificate file.
          6. CERTIFICATE_PASSWORD: Password for the .pfx certificate file.

      USAGE:
          ./generate_wazuh_msi.ps1  -MSI_NAME {{ NAME }} -SIGN {{ yes|no }} -WIX_TOOLS_PATH {{ PATH }} -SIGN_TOOLS_PATH {{ PATH }} -CERTIFICATE_PATH {{ PFX_CERT_PATH }} -CERTIFICATE_PASSWORD {{ PFX_CERT_PASSWORD }}

Below is an example of how to build a Windows MSI package.

.. code-block:: console

   # ./generate_wazuh_msi.ps1 -MSI_NAME mypackage.msi -SIGN no

Here is an example of using a specific certificate and password.

.. code-block:: console

   # ./generate_wazuh_msi.ps1 -MSI_NAME mypackage.msi -SIGN yes -CERTIFICATE_PATH .\certificate.pfx -CERTIFICATE_PASSWORD mypassword

If you don't specify the ``CERTIFICATE_PATH`` and ``CERTIFICATE_PASSWORD`` parameters, the best matching certificate from the Certificate Store is selected for signing the package. For more details, check the `/a option of the sign command in SignTool <https://learn.microsoft.com/en-us/windows/win32/seccrypto/signtool#sign-command-options>`__ .

If the ``WIX_TOOLS`` and/or ``SIGN_TOOLS`` binaries are not added to the environment PATH, specify the path as shown in the following example:

.. code-block:: console

   # ./generate_wazuh_msi.ps1 -MSI_NAME mypackage.msi -SIGN yes -WIX_TOOLS_PATH C:\path_to_wix_tools_binary_files -SIGN_TOOLS_PATH C:\path_to_sign_tools_binary_files
