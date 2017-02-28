.. _audit-configuration:


Configuration
================================================

Manager
------------------------------------------------

Audit generates numerous events and it is hard to distinguish if those events correspond to a *write access*, *read access*, *execute access*, *attribute change*, or *system call rule*, using Wazuh decoders and rules. This is why we use the *key* argument in audit rules to facilitate the processing of events by Wazuh. As previously explained, each audit rule has the option to add a descriptive *key* value to identify what rule generated a particular audit log entry. We will use a CDB list to determine the types of audit rule that has fire. This list will have the following syntax: ::

    key_name:value

where:

 - **Key_name** is the string you used in the argument *-k* of a *file system rule* or a *call system rule*.
 - **Value** is one of the following values:

  - write: File system rules with -p **w**.
  - read: File system rules with -p **r**.
  - execute: File system rules with -p **x**.
  - attribute: File system rules with -p **a**.
  - command: System call rules.

By default, OSSEC includes a CDB list with the following keys: ::

    $ cat /var/ossec/etc/lists/audit-keys

    audit-wazuh-w:write
    audit-wazuh-r:read
    audit-wazuh-a:attribute
    audit-wazuh-x:execute
    audit-wazuh-c:command

You can add your own key with its value to the list like this:
::

    echo "my_key_write_type:write" >> /var/ossec/etc/lists/audit-keys

Each time you modify a CDB list, you must compile it: ::

    /var/ossec/bin/ossec-makelists


Agent
------------------------------------------------

Installing Audit
++++++++++++++++++++++++++++++++++++++++++++++++

In order to use the Audit system, you must have the audit package installed on your system. If you do not have this  package installed, execute the following command as the root user to install it.

Red Hat, CentOS and Fedora: ::

    $ yum install audit

Debian and Ubuntu based Linux distributions: ::

    $ apt-get install auditd

Editing ossec.conf
++++++++++++++++++++++++++++++++++++++++++++++++
Wazuh must be aware of the events detected by Audit. So, it is needs to be configured to read the audit log file: ::

    <localfile>
      <log_format>audit</log_format>
      <location>/var/log/audit/audit.log</location>
    </localfile>

Restarting OSSEC
++++++++++++++++++++++++++++++++++++++++++++++++
Finally, we must restart Wazuh agent in order to apply the changes: ::

    $ /var/ossec/bin/ossec-control restart

Now everything is ready to process audit events. You only need to create the proper audit rules (via *auditctl* or */etc/audit/audit.rules*). In the next section we will describe some good use cases.
