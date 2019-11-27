.. Copyright (C) 2019 Wazuh, Inc.

a) For Systemd:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable filebeat.service
    # systemctl start filebeat.service

b) For SysV Init:

  .. code-block:: console

    # update-rc.d filebeat defaults 95 10
    # service filebeat start

.. End of include file
