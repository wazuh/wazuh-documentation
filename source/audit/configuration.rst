.. _configuration:


Configuration
================================================

ToDo


Manager
------------------------------------------------

Audit generates a lot of events and it is hard to distinguish if those events correspond to a *write access*, *read access*, *execute access*, *attribute change* or *system call rule* using decoders and rules. We use the argument *key* of audit rules to facilitate the processing of events to OSSEC. As we explained before, each audit rule has the option to add a key to identify what rule generated a particular audit log entry. We will use a CDB list to let OSSEC know the type of an audit rule. This list will have the following syntax: ::

    key_name:value

where:

 - key_name: The string you used in the argument *-k* of a *file system rule* or a *call system rule*.
 - value: One of the following values:

  - write: File system rules with -p **w**.
  - read: File system rules with -p **r**.
  - execute: File system rules with -p **x**.
  - attribute: File system rules with -p **a**.
  - command: Call system rules.

By default, OSSEC includes a CDB list with the following keys: ::

    $ cat /var/ossec/etc/lists/audit-keys

    audit-wazuh-w:write
    audit-wazuh-r:read
    audit-wazuh-a:attribute
    audit-wazuh-x:execute
    audit-wazuh-c:command

In case you want to define your own keys, add your key with its value in the list:
::

    echo -e "my_key_write_type:write\n" >> /var/ossec/etc/lists/audit-keys

Every time you modify a list, you must compile it: ::

    /var/ossec/bin/ossec-makelists


Agent
------------------------------------------------

Installing Audit
++++++++++++++++++++++++++++++++++++++++++++++++

In order to use the Audit system, you must have the audit packages installed on your system. If you do not have these packages installed, execute the following command as the root user to install them.

Red Hat, CentOS and Fedora: ::

    $ yum install audit

Debian and Ubuntu based Linux distributions: ::

    $ apt-get install audit

Editing ossec.conf
++++++++++++++++++++++++++++++++++++++++++++++++
OSSEC must be aware of the events detected by Audit. So, it is needed to configure it to read the audit log file: ::

    <localfile>
      <log_format>audit</log_format>
      <location>/var/log/audit/audit.log</location>
    </localfile>

Restarting OSSEC
++++++++++++++++++++++++++++++++++++++++++++++++
Finally, we restart OSSEC in order to apply changes: ::

    $ /var/ossec/bin/ossec-control restart

Right now, everything is ready to process audit events. It is only necessary to create the proper audit rules (via *auditctl* or */etc/audit/audit.rules*). In the next section we will describe some useful use cases.
