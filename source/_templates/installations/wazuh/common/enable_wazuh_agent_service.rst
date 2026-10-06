.. Copyright (C) 2015, Wazuh, Inc.

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable wazuh-agent
      # systemctl start wazuh-agent


  .. group-tab:: SysV init

    Choose one option according to your operating system.

    a) RPM-based operating systems:

      .. code-block:: console

        # chkconfig --add wazuh-agent
        # service wazuh-agent start

    b) Debian-based operating systems:

      .. code-block:: console

        # update-rc.d wazuh-agent defaults 95 10
        # service wazuh-agent start



  .. group-tab:: No service manager

     On some systems, you need to start the agent manually:

     .. code-block:: console

       # /var/ossec/bin/wazuh-control start

.. End of include file
