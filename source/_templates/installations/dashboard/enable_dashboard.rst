.. Copyright (C) 2015, Wazuh, Inc.

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable wazuh-dashboard
      # systemctl start wazuh-dashboard



  .. group-tab:: SysV init

    Choose one option according to your operating system:

    a) RPM-based operating system:

      .. code-block:: console

        # chkconfig --add wazuh-dashboard
        # service wazuh-dashboard start
    
    b) Debian-based operating system:

      .. code-block:: console

        # update-rc.d wazuh-dashboard defaults 95 10
        # service wazuh-dashboard start

.. End of include file
