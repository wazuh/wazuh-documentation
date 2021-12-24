.. Copyright (C) 2021 Wazuh, Inc.

.. warning::

  Run these commands to mitigate Apache Log4j 2 Remote Code Execution (RCE) Vulnerability - CVE-2021-44228. 
  
  .. code-block:: console

    # curl -so /tmp/apache-log4j-2.17.0-bin.tar.gz https://dlcdn.apache.org/logging/log4j/2.17.0/apache-log4j-2.17.0-bin.tar.gz
    # tar -xf /tmp/apache-log4j-2.17.0-bin.tar.gz -C /tmp/
    
    # cp /tmp/apache-log4j-2.17.0-bin/log4j-api-2.17.0.jar /usr/share/elasticsearch/lib/
    # cp /tmp/apache-log4j-2.17.0-bin/log4j-core-2.17.0.jar /usr/share/elasticsearch/lib/
    # cp /tmp/apache-log4j-2.17.0-bin/log4j-slf4j-impl-2.17.0.jar /usr/share/elasticsearch/plugins/opendistro_security/
    # cp /tmp/apache-log4j-2.17.0-bin/log4j-api-2.17.0.jar /usr/share/elasticsearch/performance-analyzer-rca/lib/
    # cp /tmp/apache-log4j-2.17.0-bin/log4j-core-2.17.0.jar /usr/share/elasticsearch/performance-analyzer-rca/lib/

    # rm -f /usr/share/elasticsearch/lib//log4j-api-2.11.1.jar
    # rm -f /usr/share/elasticsearch/lib/log4j-core-2.11.1.jar
    # rm -f /usr/share/elasticsearch/plugins/opendistro_security/log4j-slf4j-impl-2.11.1.jar
    # rm -f /usr/share/elasticsearch/performance-analyzer-rca/lib/log4j-api-2.13.0.jar
    # rm -f /usr/share/elasticsearch/performance-analyzer-rca/lib/log4j-core-2.13.0.jar

    # rm -rf /tmp/apache-log4j-2.17.0-bin
    # rm -f /tmp/apache-log4j-2.17.0-bin.tar.gz

.. tabs::


  .. tab:: Systemd


    .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable elasticsearch
      # systemctl start elasticsearch



  .. tab:: SysV Init

    Choose one option according to the OS used:

    a) Debian based OS

      .. code-block:: console

        # update-rc.d elasticsearch defaults 95 10
        # service elasticsearch start

    b) RPM based OS

      .. code-block:: console

        # chkconfig --add elasticsearch
        # service elasticsearch start

.. End of include file
