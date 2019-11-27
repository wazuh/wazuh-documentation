.. Copyright (C) 2019 Wazuh, Inc.

a) For Systemd:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable elasticsearch.service
    # systemctl start elasticsearch.service

b) For SysV Init:

  .. code-block:: console

    # update-rc.d elasticsearch defaults 95 10
    # service elasticsearch start

.. End of include file
