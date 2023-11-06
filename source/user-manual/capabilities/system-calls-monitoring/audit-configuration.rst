.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to monitor system calls with Wazuh: its configuration, basic usage, how to monitor user actions, and more. 
  
.. _audit-configuration:

Configuration
=============

The Linux Audit system generates numerous events for write access, read access, execute access, attribute change, or system call rule. Wazuh uses the *key* argument in audit rules because it is difficult to distinguish audit events using rules and decoders alone. As previously explained, each audit rule can add a descriptive key value to identify what rule generated a particular audit log entry. We use a :doc:`CDB list </user-manual/ruleset/cdb-list>` to determine the types of audit rules fired. This list will have the following syntax:

   .. code-block:: console

      <KEY_NAME>:<VALUE>

where:

- ``<KEY_NAME>`` is the string you used in the argument *-k* of a file system or system call rule.
- ``<VALUE>`` is one of the following values:

   - write: File system rules with ``-p w``.
   - read: File system rules with ``-p r``.
   - execute: File system rules with ``-p x``.
   - attribute: File system rules with ``-p a``.
   - command: System call rules.

Wazuh server
------------

By default, Wazuh includes an audit CDB list. This CDB list contains audit keys that map against write, read, attribute change, execution, and command events.

Run the command below to view the content of the CDB list:

   .. code-block:: console

      # cat /var/ossec/etc/lists/audit-keys

   .. code-block:: console
      :class: output

      audit-wazuh-w:write
      audit-wazuh-r:read
      audit-wazuh-a:attribute
      audit-wazuh-x:execute
      audit-wazuh-c:command

You can add your custom key with its value to the list like this:

   .. code-block:: console

      # echo "<YOUR_KEY>:<VALUE>" >> /var/ossec/etc/lists/audit-keys

Where ``<YOUR_KEY>`` is the key set in the audit rule and ``<VALUE>`` is used by Wazuh to process the event.

Restart the Wazuh manager any time you modify the CDB list:

   .. code-block:: console

      # systemctl restart wazuh-manager

Out-of-the-box rules for Audit events are located in the ``/var/ossec/ruleset/rules/0365-auditd_rules.xml`` file on the Wazuh server.

Monitored endpoint
------------------

#. To use the Linux Audit system, you must install the audit package on your endpoint. If you do not have this package installed, execute the following command as the root user to install it:

   .. tabs::
   
      .. group-tab:: Yum
                   
         .. code-block:: console
         
            # yum install -y auditd
   
      .. group-tab:: APT
      
         .. code-block:: console
         
            # apt install -y auditd
   

   .. Note::
      If the audit package is already present on the endpoint before installing the Wazuh agent, the actions below should not be performed. This configuration will be added by default.

#. Add the configuration below to the Wazuh agent configuration ``/var/ossec/etc/ossec.conf`` file. This configures Wazuh to read the audit file log to process events the Linux Audit system detects:

   .. code-block:: xml  

      <localfile>
        <log_format>audit</log_format>
        <location>/var/log/audit/audit.log</location>
      </localfile>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

#. Create proper audit rules using the ``auditctl`` command or the audit rules file. 

Linux audit alerts are displayed in the **Threat Hunting** module of the Wazuh dashboard.
