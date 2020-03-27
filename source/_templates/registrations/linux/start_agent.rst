.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::

 .. group-tab:: Using Systemd

  .. code-block:: console

   # systemctl restart wazuh-agent

 .. group-tab:: SysV Init

  .. code-block:: console

   # service wazuh-agent restart

 .. group-tab:: For Unix host

  .. code-block:: console

   # /var/ossec/bin/ossec-control start
   

.. End of include file
