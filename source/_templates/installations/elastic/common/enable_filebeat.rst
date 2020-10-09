.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable filebeat.service
      # systemctl start filebeat.service



  .. group-tab:: SysV Init

    Choose one option according to the OS used:

    a) RPM based OS:

      .. code-block:: console

        # chkconfig --add filebeat
        # service filebeat start
    
    b) Debian based OS:

      .. code-block:: console

        # update-rc.d filebeat defaults 95 10
        # service filebeat start

.. End of include file
