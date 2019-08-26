.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_agent_sources_linux_deb:

Debian/Ubuntu
=============

This guide describes how to install the Wazuh Agent from source code for Debian, Ubuntu, and other Debian-based systems.

.. note:: All the commands described below need to be executed with root user privileges.

Installing Wazuh Agent
----------------------

1. Install development tools and compilers. In Linux this can easily be done using your distribution's package manager:

  * For Debian based system:

    .. code-block:: console

      # apt-get install make gcc libc6-dev curl policycoreutils automake autoconf libtool

  * For Ubuntu based system:

    .. code-block:: console

      # apt-get update
      # apt-get install make gcc libc6-dev curl automake autoconf libtool

2. Download and extract the latest version:

    .. code-block:: console

      # curl -Ls https://github.com/wazuh/wazuh/archive/v3.9.5.tar.gz | tar zx

3. Run the ``install.sh`` script. This will run a wizard that will guide you through the installation process using the Wazuh sources:

    .. code-block:: console

      # cd wazuh-*
      # ./install.sh

   If you have previously compiled for another platform, you must clean the build using the Makefile in ``src``:

      .. code-block:: console

        # cd wazuh-*
        # make -C src clean
        # make -C src clean-deps

   .. note::
     During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``agent``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default path of installation is ``/var/ossec``. A commonly used custom path might be ``/opt``. When choosing a different path than the default, if the directory already exist the installer will ask if delete the directory or if installing Wazuh inside. You can also run an :ref:`unattended installation <unattended-installation>`.

   .. note:: Since Wazuh 3.5 it is necessary to have internet connection when following this step.

4. The script will ask about what kind of installation you want. Type ``agent`` in order to install a Wazuh Agent:

 .. code-block:: none

    1- What kind of installation do you want (manager, agent, local, hybrid or help)? agent

Now that the Agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :doc:`user manual<../../user-manual/registering/index>`.
