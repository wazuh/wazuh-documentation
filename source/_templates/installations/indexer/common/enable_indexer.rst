.. Copyright (C) 2015, Wazuh, Inc.

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable wazuh-indexer
      # systemctl start wazuh-indexer



  .. group-tab:: SysV init

    Choose one option according to the operating system used.

    a) RPM-based operating system:

      .. code-block:: console

        # chkconfig --add wazuh-indexer
        # service wazuh-indexer start
    
    b) Debian-based operating system:

      .. code-block:: console

        # update-rc.d wazuh-indexer defaults 95 10
        # service wazuh-indexer start

.. End of include file
