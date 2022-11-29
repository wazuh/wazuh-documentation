.. Copyright (C) 2015, Wazuh, Inc.

.. tabs::


  .. tab:: Systemd


    .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable elasticsearch
      # systemctl start elasticsearch



  .. tab:: SysV init

    Choose one option according to the OS used:

    a) Debian based OS

      .. code-block:: console

        # update-rc.d elasticsearch defaults 95 10
        # service elasticsearch start

    b) RPM based OS

      .. code-block:: console

        # chkconfig --add elasticsearch
        # service elasticsearch start

.. End of include file
