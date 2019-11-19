.. Copyright (C) 2019 Wazuh, Inc.

a) For Systemd:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable kibana.service
    # systemctl start kibana.service

b) For SysV Init:

  .. code-block:: console

    # update-rc.d kibana defaults 95 10
    # service kibana start

.. End of enable_start_filebeat.rst
