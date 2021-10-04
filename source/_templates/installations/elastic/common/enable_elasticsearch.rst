.. Copyright (C) 2021 Wazuh, Inc.

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable elasticsearch
      # systemctl start elasticsearch



  .. group-tab:: SysV Init

    Choose one option according to the operating system used.

    a) RPM based operating system:

      .. code-block:: console

        # chkconfig --add elasticsearch
        # service elasticsearch start
    
    b) Debian based operating system:

      .. code-block:: console

        # update-rc.d elasticsearch defaults 95 10
        # service elasticsearch start

.. End of include file
