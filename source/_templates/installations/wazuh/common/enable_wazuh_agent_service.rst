.. Copyright (C) 2021 Wazuh, Inc.

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable wazuh-agent
      # systemctl start wazuh-agent


  .. group-tab:: SysV Init

    Choose one option according to the OS used:

    a) RPM based OS:

      .. code-block:: console

        # chkconfig --add wazuh-agent
        # service wazuh-agent start

    b) Debian based OS:

      .. code-block:: console

        # update-rc.d wazuh-agent defaults 95 10
        # service wazuh-agent start

.. End of include file