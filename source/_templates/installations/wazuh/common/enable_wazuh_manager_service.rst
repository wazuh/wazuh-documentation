.. Copyright (C) 2015, Wazuh, Inc.

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable wazuh-manager
      # systemctl start wazuh-manager


  .. group-tab:: SysV init

    Choose one option according to your operating system:

    a) RPM-based operating system:

      .. code-block:: console

        # chkconfig --add wazuh-manager
        # service wazuh-manager start

    b) Debian-based operating system:

      .. code-block:: console

        # update-rc.d wazuh-manager defaults 95 10
        # service wazuh-manager start

.. End of include file
