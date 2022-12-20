.. Copyright (C) 2015, Wazuh, Inc.

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl disable wazuh-agent
      # systemctl daemon-reload


  .. group-tab:: SysV init

    Choose one option according to your operating system.

    a) RPM-based operating systems:

      .. code-block:: console

        # chkconfig wazuh-agent off
        # chkconfig --del wazuh-agent

    b) Debian-based operating systems:

      .. code-block:: console

        # update-rc.d -f wazuh-agent remove



  .. group-tab:: No service manager

     No action required.

.. End of include file