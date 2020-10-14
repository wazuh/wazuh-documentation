.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to uninstall a Wazuh agent from sources

.. _uninstalling_wazuh_agents_from_sources:


Uninstall a Wazuh agent installed from sources
==============================================

To uninstall a Wazuh agent follow the instructions for your operating system:


.. _uninstalling_wazuh_agents_from_sources_linux:

Linux
-----

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

  For SysV Init:

    .. code-block:: console

      # [ -f /etc/rc.local ] && sed -i'' '/ossec-control start/d' /etc/rc.local
      # find /etc/{init.d,rc*.d} -name "*wazuh" | xargs rm -f

  For Systemd:

    .. code-block:: console

        # find /etc/systemd/system -name "wazuh*" | xargs rm -f
        # systemctl daemon-reload

Remove users:

  .. code-block:: console

    # userdel ossec 2> /dev/null
    # userdel ossecm 2> /dev/null
    # userdel ossecr 2> /dev/null
    # groupdel ossec 2> /dev/null


.. _uninstalling_wazuh_agents_from_sources_windows:

Windows
-------

To uninstall the agent, the original MSI file will be needed to perform the unattended process::

    msiexec.exe /x wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /qn


.. _uninstalling_wazuh_agents_from_sources_macos:

macOS
-----

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

.. _uninstalling_wazuh_agents_from_sources_aix:

AIX
---

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

    # find /etc/rc.d -name "*wazuh" | xargs rm -f

Remove users:

  .. code-block:: console

    # userdel ossec 2> /dev/null
    # userdel ossecm 2> /dev/null
    # userdel ossecr 2> /dev/null
    # groupdel ossec 2> /dev/null


.. _uninstalling_wazuh_agents_from_sources_solaris:

Solaris
-------

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


.. _uninstalling_wazuh_agents_from_sources_hpux:

HP-UX
-----

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


