.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_wazuh_agent:

Upgrading the Wazuh agent
=========================

The following steps show how to upgrade the Wazuh agent from 3.x to the latest available version. Since Wazuh 3.x, it is possible to upgrade the Wazuh agents remotely from the Wazuh manager or locally. Upgrading the Wazuh agents remotely is possible by using the ``agent_upgrade`` tools or the Wazuh API. More information about the process can be found in the :ref:`Remote agent upgrade<upgrading-agent>` section.

To perform the upgrade locally, follow the instructions for the operating system of the Wazuh agent:

.. tabs::

  .. group-tab:: Yum


    #. If the Wazuh repository is disabled it is necessary to enable it to get the latest package:

        .. code-block:: console

          # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/wazuh.repo


    #. Upgrade the Wazuh agent to the latest version:

        .. code-block:: console

          # yum upgrade wazuh-agent


    #. It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues as the Wazuh agent should always be in the same or an older version than the Wazuh manager:

        .. code-block:: console

          # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo


  .. group-tab:: APT

    #. If the Wazuh repository is disabled it is necessary to enable it to get the latest package. Skip this step if the package is set to a ``hold`` state instead of disabling the repository:

        .. code-block:: console

          # sed -i "s/^#deb/deb/" /etc/apt/sources.list.d/wazuh.list


    #. Upgrade the Wazuh agent to the latest version:

        .. code-block:: console

          # apt-get update
          # apt-get install wazuh-agent


    #. It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues as the Wazuh agent should always be in the same or an older version than the Wazuh manager. Skip this step if the package is set to a ``hold`` state:

        .. code-block:: console

          # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
          # apt-get update


  .. group-tab:: ZYpp

    #. If the Wazuh repository is disabled it is necessary to enable it to get the latest package:

        .. code-block:: console

          # sed -i "s/^enabled=0/enabled=1/" /etc/zypp/repos.d/wazuh.repo


    #. Upgrade the Wazuh agent to the latest version:

        .. code-block:: console

          # zypper update wazuh-agent


    #. It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues as the Wazuh agent should always be in the same or an older version than the Wazuh manager:

        .. code-block:: console

          # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo


  .. group-tab:: Windows

    The Wazuh agent upgrading process for Windows systems requires to download the latest `Windows installer <https://packages.wazuh.com/|CURRENT_MAJOR|/windows/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi>`_. There are two ways of using the installer, both of them require ``administrator rights``.

    a) Using the GUI installer. Open the installer and follow the instructions to upgrade the Wazuh agent:

        .. image:: ../images/installation/windows.png
          :align: left


    b) Using the command line. To upgrade the Wazuh agent from the command line, run the installer using Windows PowerShell or the command prompt. The ``/q`` argument is used for unattended installations:

      .. code-block:: console

        # wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q


  .. group-tab:: macOS

    The Wazuh agent upgrading process for macOS systems requires to download the latest `macOS installer <https://packages.wazuh.com/|CURRENT_MAJOR|/macos/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_OSX|.pkg>`_. There are two ways of using the installer.

    a) Using the GUI will perform a simple upgrade. Double click on the downloaded file and follow the wizard. If you are not sure how to answer some of the prompts, simply use the default answers:

     .. image:: ../images/installation/macos.png
         :align: left
         :scale: 50 %


    b) Using the command line:

      .. code-block:: console

        # installer -pkg wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_OSX|.pkg -target /


  .. group-tab:: AIX

    The Wazuh agent upgrading process for AIX systems requires to download the latest `AIX installer <https://packages.wazuh.com/|CURRENT_MAJOR|/aix/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_AIX|.aix.ppc.rpm>`_ and run the following command:

    .. code-block:: console

      # rpm -U wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_AIX|.aix.ppc.rpm



  .. group-tab:: Solaris 11

    The Wazuh agent upgrading process for Solaris 11 systems requires to download the latest `Solaris 11 i386 installer <https://packages.wazuh.com/|CURRENT_MAJOR|/solaris/i386/11/wazuh-agent_v|WAZUH_LATEST|-sol11-i386.pkg>`_ or `Solaris 11 sparc installer <https://packages.wazuh.com/|CURRENT_MAJOR|/solaris/sparc/11/wazuh-agent_v|WAZUH_LATEST|-sol11-sparc.pkg>`_ depending on the Solaris 11 host architecture.

    #. Stop the Wazuh agent:

        .. code-block:: console

          # /var/ossec/bin/ossec-control stop


    #. After that, upgrade the Wazuh agent. Choose one option depending on the host architecture:

        * Solaris 11 i386:

            .. code-block:: console

              # pkg install -g wazuh-agent_v|WAZUH_LATEST|-sol11-i386.pkg wazuh-agent

        * Solaris 11 sparc:

            .. code-block:: console

              # pkg install -g wazuh-agent_v|WAZUH_LATEST|-sol11-sparc.pkg wazuh-agent


    #. Start the Wazuh agent:

        .. code-block:: console

          # /var/ossec/bin/ossec-control start


  .. group-tab:: Solaris 10

    The Wazuh agent upgrading process for Solaris 10 systems requires to download the latest `Solaris 10 i386 installer <https://packages.wazuh.com/|CURRENT_MAJOR|/solaris/i386/10/wazuh-agent_v|WAZUH_LATEST|-sol10-i386.pkg>`_ or `Solaris 10 sparc installer <https://packages.wazuh.com/|CURRENT_MAJOR|/solaris/sparc/10/wazuh-agent_v|WAZUH_LATEST|-sol10-sparc.pkg>`_ depending on the Solaris 10 host architecture.

    #. Stop the Wazuh agent:

        .. code-block:: console

          # /var/ossec/bin/ossec-control stop


    #. Backup the ``ossec.conf`` configuration file:

        .. code-block:: console

          # cp /var/ossec/etc/ossec.conf ~/ossec.conf.bk
          # cp /var/ossec/etc/client.keys ~/client.keys.bk


    #. Remove the Wazuh agent:

        .. code-block:: console

          # pkgrm wazuh-agent


    #. After that, install the Wazuh agent. Choose one option depending on the host architecture:

        * Solaris 10 i386:

            .. code-block:: console

              # pkgadd -d wazuh-agent_v|WAZUH_LATEST|-sol10-i386.pkg wazuh-agent

        * Solaris 10 sparc:

            .. code-block:: console

              # pkgadd -d wazuh-agent_v|WAZUH_LATEST|-sol10-sparc.pkg wazuh-agent


    #. Restore the ``ossec.conf`` configuration file:

        .. code-block:: console

          # mv ~/ossec.conf.bk /var/ossec/etc/ossec.conf
          # chown root:ossec /var/ossec/etc/ossec.conf


    #. Start the wazuh-agent:

        .. code-block:: console

          # /var/ossec/bin/ossec-control start


  .. group-tab:: HP-UX

      The Wazuh agent upgrading process for HP-UX systems requires to download the latest `HP-UX installer <https://packages.wazuh.com/|CURRENT_MAJOR|/hp-ux/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar>`_.

      #. Stop the Wazuh agent:

          .. code-block:: console

            # /var/ossec/bin/ossec-control stop


      #. Backup the ``ossec.conf`` configuration file:

          .. code-block:: console

            # cp /var/ossec/etc/ossec.conf ~/ossec.conf.bk
            # cp /var/ossec/etc/client.keys ~/client.keys.bk


      #. Deploy the Wazuh agent files:

          .. code-block:: console

            # tar -xvf wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar


      #. Restore the ``ossec.conf`` configuration file:

          .. code-block:: console

            # mv ~/ossec.conf.bk /var/ossec/etc/ossec.conf
            # chown root:ossec /var/ossec/etc/ossec.conf
            # mv ~/client.keys.bk /var/ossec/etc/client.keys
            # chown root:ossec /var/ossec/etc/client.keys


      #. Start the wazuh-agent:

          .. code-block:: console

            # /var/ossec/bin/ossec-control start


Once the Wazuh agent is upgraded, if it still uses UDP, which was the default protocol for versions prior to Wazuh 4.x, it must be changed to TCP in the ``ossec.conf`` file:

.. code-block:: console
  :emphasize-lines: 6

  <wazuh_config>
    <client>
      <server>
        <address>172.16.1.17</address>
        <port>1514</port>
        <protocol>udp</protocol>
      </server>
