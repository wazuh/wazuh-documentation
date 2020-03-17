.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_agent_sources_macos:

macOS from sources
==================

This guide describes how to install the Wazuh agent from source code for macOS. For other operating systems, please check the list: :ref:`Install Wazuh agent <installation_agents>`.

Installing Wazuh agent
----------------------

1. Install development tools and compilers. In macOS, this can be easily done by installing brew, a package manager for macOS:

    .. code-block:: console

      $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

2. Download and extract the latest version:

    .. code-block:: console

      $ curl -Ls https://github.com/wazuh/wazuh/archive/v|WAZUH_LATEST|.tar.gz | tar zx

    .. note:: All the commands described below need to be executed with root user privileges.

3. Run the ``install.sh`` script. This will run a wizard that will guide you through the installation process using the Wazuh sources:

    .. code-block:: console

      # cd wazuh-*
      # USER_DIR="/Library/Ossec" ./install.sh

    .. note:: Note that with the variable `USER_DIR` it has been indicated that the agent installation path is ``/Library/Ossec``

   If you have previously compiled for another platform, you must clean the build using the Makefile in ``src``:

      .. code-block:: console

        # cd wazuh-*
        # make -C src clean
        # make -C src clean-deps

   .. note::
     During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``agent``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default path of installation is ``/var/ossec``. A commonly used custom path might be ``/opt``. When choosing a different path than the default, if the directory already exist the installer will ask if delete the directory or if installing Wazuh inside. You can also run an :ref:`unattended installation <unattended-installation>`.

   .. note:: Since Wazuh 3.5 it is necessary to have internet connection when following this step.

4. The script will ask about what kind of installation you want. Type ``agent`` in order to install a Wazuh agent:

 .. code-block:: none
    :class: output

    1- What kind of installation do you want (manager, agent, local, hybrid or help)? agent

Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :ref:`user manual<register_agents>`.

Uninstall
---------

To uninstall Wazuh agent:

    .. code-block:: console

      # OSSEC_INIT="/etc/ossec-init.conf"
      # . $OSSEC_INIT 2> /dev/null

Stop the service:

  .. code-block:: console

    # service wazuh-agent stop 2> /dev/null

Stop the daemon:

  .. code-block:: console

    # $DIRECTORY/bin/ossec-control stop 2> /dev/null

Remove files and service artifacts:

  .. code-block:: console

    # rm -rf $DIRECTORY $OSSEC_INIT

Delete the service:

  .. code-block:: console

    # rm -rf /Library/StartupItems/OSSEC

Remove users:

  .. code-block:: console

    # dscl . -delete "/Users/ossec" > /dev/null 2>&1
    # dscl . -delete "/Users/ossecm" > /dev/null 2>&1
    # dscl . -delete "/Users/ossecr" > /dev/null 2>&1
    # dscl . -delete "/Groups/ossec" > /dev/null 2>&1
