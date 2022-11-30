.. Copyright (C) 2015, Wazuh, Inc.

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable filebeat
      # systemctl start filebeat



  .. group-tab:: SysV init

    Choose one option according to the operating system used.

    a) RPM-based operating system:

      .. code-block:: console

        # chkconfig --add filebeat
        # service filebeat start
    
    b) Debian-based operating system:

      .. code-block:: console

        # update-rc.d filebeat defaults 95 10
        # service filebeat start

.. End of include file
