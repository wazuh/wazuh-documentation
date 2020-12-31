.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable wazuh-manager
      # systemctl start wazuh-manager


  .. group-tab:: SysV Init

    Choose one option according to the OS used:

    a) RPM based OS:

      .. code-block:: console

        # chkconfig --add wazuh-manager
        # service wazuh-manager start

    b) Debian based OS:

      .. code-block:: console

        # update-rc.d wazuh-manager defaults 95 10
        # service wazuh-manager start

.. End of include file