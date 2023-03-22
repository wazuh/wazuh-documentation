.. Copyright (C) 2015, Wazuh, Inc.

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl disable wazuh-manager
      # systemctl daemon-reload


  .. group-tab:: SysV init

    Choose one option according to your operating system.

    a) RPM-based operating systems:

      .. code-block:: console

        # chkconfig wazuh-manager off
        # chkconfig --del wazuh-manager

    b) Debian-based operating systems:

      .. code-block:: console

        # update-rc.d -f wazuh-manager remove

.. End of include file