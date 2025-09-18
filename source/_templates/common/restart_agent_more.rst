.. Copyright (C) 2015, Wazuh, Inc.

.. tabs::

   .. group-tab:: Systemd

      .. code-block:: console

         # systemctl restart wazuh-agent

   .. group-tab:: SysV init

      .. code-block:: console

         # service wazuh-agent restart

   .. group-tab:: No service manager

      .. code-block:: console

         # /var/ossec/bin/wazuh-control restart

.. End of include file
