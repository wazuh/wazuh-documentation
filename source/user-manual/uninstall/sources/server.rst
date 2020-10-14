.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to uninstall Wazuh server from sources

.. _uninstalling_wazuh_server_from_sources:


Uninstall a Wazuh server installed from sources
===============================================


To uninstall Wazuh manager:

    .. code-block:: console

      # OSSEC_INIT="/etc/ossec-init.conf"
      # . $OSSEC_INIT 2> /dev/null

Stop the service:

  .. code-block:: console

    # service wazuh-manager stop 2> /dev/null
    # service wazuh-api stop 2> /dev/null

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
