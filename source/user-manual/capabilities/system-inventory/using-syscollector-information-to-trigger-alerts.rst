.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about using Syscollector information to trigger alerts in this section of the Wazuh documentation.

Using Syscollector information to trigger alerts
================================================

.. Note::
   This feature has been enabled again in Wazuh 4.4.

You can create rules to trigger alerts based on the information collected by the Syscollector module and show the information in the alerts' description. To do this, set the ``<decoded_as>`` field as ``syscollector`` in a rule declaration. Syscollector uses the event ID ``221`` and the rule level is ``0``, so by default, it is not shown on the Wazuh dashboard. Using the tag ``<if_sid>221</if_sid>`` in a custom rule, you can create rules whose alerts the Wazuh dashboard will show.

For example, the rules in the following custom rules trigger when a port is opened, modified, or closed.

.. code-block:: xml
      
   <group name="syscollector,">
     <!-- ports -->
     <rule id="100310" level="3" >
         <if_sid>221</if_sid>
         <field name="type">dbsync_ports</field>
         <description>Syscollector ports event.</description>
     </rule>

     <rule id="100311" level="3" >
         <if_sid>100310</if_sid>
         <field name="operation_type">INSERTED</field>
         <description>The port: $(port.local_port), with local ip: $(port.local_ip) has been opened. Syscollector creation event detected.</description>
     </rule>

     <rule id="100312" level="3" >
         <if_sid>100310</if_sid>
         <field name="operation_type">MODIFIED</field>
         <description>The port: $(port.local_port), with local ip: $(port.local_ip) has been modified. Syscollector modification event detected.</description>
     </rule>

     <rule id="100313" level="3" >
         <if_sid>100310</if_sid>
         <field name="operation_type">DELETED</field>
         <description>The port: $(port.local_port), with local ip: $(port.local_ip) has been closed. Syscollector deletion event detected.</description>
     </rule>
   </group>

The alert for a port opening operation is displayed in the Wazuh dashboard as follows:

.. thumbnail:: /images/manual/system-inventory/port-opening-operation-alert.png
  :title: Port opening operation alert
  :alt: Port opening operation alert
  :align: center
  :width: 80%

.. Note::
   The initial scan does not generate alerts. The alerts are triggered after the second Syscollector scan when an information difference (delta) is detected. This second scan will occur when the configured :ref:`interval <interval_syscollector>` is reached.

New searchable fields on the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can search for any Syscollector field on the Wazuh dashboard. The Wazuh indexer saves the Syscollector fields as ``data.type.value``. For example, for hardware type, the ``cpu_name`` field is ``data.hardware.cpu_name``. The table lists all searchable fields for the different Syscollector properties.

+----------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
| Type                 | Fields                                                                                                                                                                                                   | Example                           |
+======================+==========================================================================================================================================================================================================+===================================+
| **Hardware**         | cpu_name, cpu_cores, cpu_mhz, ram_total, ram_free, ram_usage                                                                                                                                             | data.hardware.cpu_mhz             |
+----------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
| **Operating System** | architecture, name, version, codename, major, minor, build, platform, sysname, release, release_version                                                                                                  | data.os.codename                  |
+----------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
| **Port**             | local_ip, local_port, remote_ip, remote_port, tx_queue, rx_queue, inode, state, pid, process                                                                                                             | data.port.inode                   |
+----------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
| **Program**          | name, priority, section, size, vendor, install_time, version, architecture, multiarch, source, description, location                                                                                     | data.program.name                 |
+----------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
|| **Process**         || name, state, ppid, utime, stime, cmd, args, euser, ruser, suser, egroup, sgroup, fgroup, rgroup, priority, nice, size, vm_size, resident, share, start_time, pgrp, session, nlwp, tgid, tty, processor  | data.process.state                |
+----------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
|| **Network**         || mac, adapter, type, state, mtu, tx_bytes, rx_bytes, tx_errors, rx_errors, tx_dropped, rx_dropped, tx_packets, rx_packets, ipv4, ipv6                                                                    || data.netinfo.iface.ipv4.address, |
||                     ||                                                                                                                                                                                                         || data.netinfo.iface.mac           |
+----------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------+
| **Hotfix**           | hotfix                                                                                                                                                                                                   | data.hotfix                       |
+----------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------+

To see Syscollector searchable fields on the Wazuh dashboard, you must either:

- Create a custom rule that uses the built-in Syscollector rule ``221``. This is the recommended option.
- :ref:`Modify the rule level <changing_existing_rule>` of the Syscollector rule ``221`` by overwriting it with a new rule in your ``/var/ossec/etc/rules/local_rules.xml`` file or in any custom rules file you have:

.. code-block:: xml
   :emphasize-lines: 2
   
   <group name="syscollector,">
     <rule id="221" level="3" overwrite="yes">
       <category>ossec</category>
       <decoded_as>syscollector</decoded_as>
       <description>Syscollector event.</description>
     </rule>
   </group>

After adding the configuration, restart the Wazuh manager.

.. code-block:: console
  
   # systemctl restart wazuh-manager


