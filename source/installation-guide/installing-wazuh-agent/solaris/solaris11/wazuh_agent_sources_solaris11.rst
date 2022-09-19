.. Copyright (C) 2020 Wazuh, Inc.

.. _wazuh_agent_sources_solaris11:

Solaris 11 from sources
=======================

This section describes how to download and build the Wazuh HIDS Solaris agent from sources for the following versions:

- For Solaris 11 i386
- For Solaris 11 SPARC

Installing Wazuh agent
----------------------

.. note:: All the commands described below need to be executed with root user privileges. Since Wazuh 3.5 it is necessary to have internet connection when following this process.

1. Install development tools and compilers.

  1.1 Install pkgutil an update it.

     .. code-block:: console

        # pkgadd -d http://get.opencsw.org/now
        # /opt/csw/bin/pkgutil -y -U

  1.2  Install python 2.7

     .. code-block:: console

        # /opt/csw/bin/pkgutil -y -i python27
        # ln -sf /opt/csw/bin/python2.7 /usr/bin/python

  1.3  Install the following tools:

     .. code-block:: console

        # /opt/csw/bin/pkgutil -y -i git gmake gcc5core

2. Download the latest version.

     .. code-block:: console

        # git clone -b v|WAZUH_LATEST_SPARC| https://github.com/wazuh/wazuh.git

     .. note:: If you can't download the file due to an Open SSL error, then you should copy the directory with the scp utility.

3. Run the ``install.sh`` script. This will run a wizard that will guide you through the installation process using the Wazuh sources:

     .. code-block:: console

        # cd wazuh*
        # ./install.sh

    If you have previously compiled for another platform, you must clean the build using the Makefile in ``src``:

      .. code-block:: console

        # gmake -C src clean
        # gmake -C src clean-deps

   .. note::
     During the installation, users can decide the installation path. Execute the ``./install.sh`` and select the language, set the installation mode to ``agent``, then set the installation path (``Choose where to install Wazuh [/var/ossec]``). The default path of installation is ``/var/ossec``. A commonly used custom path might be ``/opt``. When choosing a different path than the default, if the directory already exist the installer will ask if delete the directory or if installing Wazuh inside. You can also run an :ref:`unattended installation <unattended-installation>`.

   .. note:: Since Wazuh 3.5 it is necessary to have internet connection when following this process.

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

    # find /etc/{init.d,rc*.d} -name "*wazuh" | xargs rm -f

Remove users:

  .. code-block:: console

    # userdel ossec 2> /dev/null
    # userdel ossecm 2> /dev/null
    # userdel ossecr 2> /dev/null
    # groupdel ossec 2> /dev/null
