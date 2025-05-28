.. Copyright (C) 2015, Wazuh, Inc.

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable wazuh-managerfilebeat
      # systemctl start wazuh-managerfilebeat



  .. group-tab:: SysV init

    Choose one option according to the operating system used.

    a) RPM-based operating system:

      .. code-block:: console

        # chkconfig --add wazuh-manager
        # service wazuh-manager start
    
    b) Debian-based operating system:

      .. code-block:: console

        # update-rc.d wazuh-manager defaults 95 10
        # service wazuh-manager start

.. End of include file
