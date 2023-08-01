.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: 

Configuring syslog on the Wazuh server
======================================

The Wazuh server can collect logs via syslog from endpoints such as firewalls, switches, routers, and other devices that don’t support the installation of Wazuh agents. Perform the following steps on the Wazuh server to receive syslog messages on a specific port.

#. Add the following configuration in between the ``<ossec_config>`` tags of the Wazuh server ``/var/ossec/etc/ossec.conf`` file to listen for syslog messages on TCP port 514:

   .. code-block:: xml

      <remote>
        <connection>syslog</connection>
        <port>514</port>
        <protocol>tcp</protocol>
        <allowed-ips>192.168.2.15/24</allowed-ips>
        <local_ip>192.168.2.10</local_ip>
      </remote>

   Where:

   - ``<connection>`` specifies the type of connection to accept. This value can either be secure or syslog.  
   - ``<port>`` is the port used to listen for incoming syslog messages from endpoints. We use port 514 in the example above.
   - ``<protocol>`` is the protocol used to listen for incoming syslog messages from endpoints. The allowed values are either tcp or udp.  
   - ``<allowed-ips>`` is the IP address or network range of the endpoints forwarding events to the Wazuh server. In the example above, we use 192.168.2.15/24.
   - ``<local_ip>`` is the IP address of the Wazuh server listening for incoming log messages. In the example above, we use 192.168.2.10.
   
   Refer to :doc:`remote - local configuration documentation </user-manual/reference/ossec-conf/remote>` for more information on remote syslog options.

#. Restart the Wazuh manager to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-manager

.. note:: The ``allowed-ips`` label is mandatory. The configuration will not take effect without it.
   If you have a central logging server like Syslog or Logstash in place, you can install the Wazuh agent on that server to streamline log collection. This setup enables seamless forwarding of logs from multiple sources to the Wazuh server, facilitating comprehensive analysis.

