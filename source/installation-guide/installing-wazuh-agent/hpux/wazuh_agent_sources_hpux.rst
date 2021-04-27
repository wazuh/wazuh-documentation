.. Copyright (C) 2020 Wazuh, Inc.

.. _wazuh_agent_sources_hpux:

HP-UX from sources
==================

This guide describes how to install the Wazuh agent from source code for HP-UX. For other operating systems, please check the list: :ref:`Install Wazuh agent <installation_agents>`.

Installing Wazuh agent
----------------------

.. note:: All the commands described below need to be executed with root user privileges. Since Wazuh 3.5 it is necessary to have internet connection when following this process.

1. Install development tools and compilers.
   
   1.1 Download the ``depothelper-2.10-hppa_32-11.31.depot`` file.

      .. code-block:: console

        # /usr/local/bin/wget https://github.com/wazuh/wazuh-packages/raw/master/hp-ux/depothelper-2.10-hppa_32-11.31.depot --no-check-certificate

      .. note:: If you can't download the script this way, then you should copy it through the scp utility.

   1.2 Install the package manager.

     .. code-block:: console

        # swinstall -s depothelper-2.10-hppa_32-11.31.depot \*

   1.3 Download the ``wget`` tool (If it is not installed).

     .. code-block:: console

        # /usr/local/bin/depothelper -f wget

   1.4  Download the following script

      .. code-block:: console

        # /usr/local/bin/wget https://raw.githubusercontent.com/wazuh/wazuh-packages/master/hp-ux/generate_wazuh_packages.sh --no-check-certificate

      .. note:: If you can't download the script this way, then you should copy it through the scp utility.

   1.5  Install the necessary dependencies using the script.

      .. code-block:: console

        # chmod +x generate_wazuh_packages.sh
        # ./generate_wazuh_packages.sh -e

      .. note:: This step may take a long time.

2. Download the latest version.

     .. code-block:: console

        # /usr/local/bin/curl -k -L -O https://github.com/wazuh/wazuh/archive/v|WAZUH_LATEST_HPUX|.zip && /usr/local/bin/unzip v|WAZUH_LATEST_HPUX|

     .. note:: If you can't download the repository this way, then you should copy it through the scp utility.

3. Compile the sources.

   .. code-block:: console

        # cd wazuh-*
        # /usr/local/bin/gmake -C src deps RESOURCES_URL=https://packages.wazuh.com/deps/|WAZUH_LATEST_MINOR|
        # /usr/local/bin/gmake -C src TARGET=agent USE_SELINUX=no DISABLE_SHARED=yes

4. Run the ``install.sh`` script. This will run a wizard that will guide you through the installation process using the Wazuh sources:

   .. code-block:: console

      # DISABLE_SHARED=yes ./install.sh

   If you have previously compiled for another platform, you must clean the build using the Makefile in ``src``:

   .. code-block:: console

      # /usr/local/bin/gmake -C src clean-deps
      # /usr/local/bin/gmake -C src clean

   .. note:: During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``agent``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default path of installation is ``/var/ossec``. A commonly used custom path might be ``/opt``. When choosing a different path than the default, if the directory already exist the installer will ask if delete the directory or if installing Wazuh inside. You can also run an :ref:`unattended installation <unattended-installation>`.

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

    # find /sbin/{init.d,rc*.d} -name "*wazuh" | xargs rm -f

Remove users:

  .. code-block:: console

    # userdel ossec 2> /dev/null
    # userdel ossecm 2> /dev/null
    # userdel ossecr 2> /dev/null
    # groupdel ossec 2> /dev/null
