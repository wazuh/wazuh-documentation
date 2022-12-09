.. Copyright (C) 2015, Wazuh, Inc.

.. warning::

  Add the following configuration to mitigate Apache Log4j2 Remote Code Execution (RCE) vulnerability - CVE-2021-44228 - ESA-2021-31.
  
  .. code-block:: console

    # mkdir -p /etc/elasticsearch/jvm.options.d
    # echo '-Dlog4j2.formatMsgNoLookups=true' > /etc/elasticsearch/jvm.options.d/disabledlog4j.options
    # chmod 2750 /etc/elasticsearch/jvm.options.d/disabledlog4j.options
    # chown root:elasticsearch /etc/elasticsearch/jvm.options.d/disabledlog4j.options

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable elasticsearch
      # systemctl start elasticsearch



  .. group-tab:: SysV init

    Choose one option according to the operating system used.

    a) RPM-based operating system:

      .. code-block:: console

        # chkconfig --add elasticsearch
        # service elasticsearch start
    
    b) Debian-based operating system:

      .. code-block:: console

        # update-rc.d elasticsearch defaults 95 10
        # service elasticsearch start

.. End of include file
