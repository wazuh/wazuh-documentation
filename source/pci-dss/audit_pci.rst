.. _audit_pci_dss:


Audit
================================================

ToDo

10.2.2 All actions taken by any individual with root or administrative privileges
-----------------------------------------------------------------------------------------------------------
::

    -a exit,always -F euid=0 -F arch=b64 -S execve -k audit-wazuh-c
    -a exit,always -F euid=0 -F arch=b32 -S execve -k audit-wazuh-c

10.2.3 Access to all audit trails
-----------------------------------------------------------------------------------------------------------

::

    -w /var/log/audit -p w -k audit-wazuh-w
    -w /var/log/audit -p a -k audit-wazuh-a
    -w /var/log/audit -p r -k audit-wazuh-r
    -w /var/log/audit -p x -k audit-wazuh-x

    -w /var/log/auth.log -p w -k audit-wazuh-w
    -w /var/log/auth.log -p a -k audit-wazuh-a
    -w /var/log/auth.log -p r -k audit-wazuh-r
    -w /var/log/auth.log -p x -k audit-wazuh-x

    -w /var/log/syslog -p w -k audit-wazuh-w
    -w /var/log/syslog -p a -k audit-wazuh-a
    -w /var/log/syslog -p r -k audit-wazuh-r
    -w /var/log/syslog -p x -k audit-wazuh-x

10.2.4 Invalid logical access attempts
-----------------------------------------------------------------------------------------------------------

::

    -a always,exit -F arch=b64 -S all -F exit=-13 -k access

folder with restrictions ... produce exit status -13


10.2.7 Creation and deletion of system level objects.
-----------------------------------------------------------------------------------------------------------

According to Payment Card Industry (PCI) Data Security Standard Glossary, Abbreviations and Acronyms System-level object has the following definition: ::

    Anything on a system component that is required for its operation, including but not limited to application executable and configuration files, system configuration files, static and shared libraries & DLL‹s, system executables, device drivers and device coniguration files, and added third-party components.

::

    -a always,exit -S all -F dir=/etc -F perm=w -k audit-wazuh-w
    -a always,exit -S all -F dir=/etc -F perm=a -k audit-wazuh-a
    -a always,exit -S all -F dir=/boot -F perm=w -k audit-wazuh-w
    -a always,exit -S all -F dir=/boot -F perm=a -k audit-wazuh-a
    -a always,exit -S all -F dir=/usr/lib -F perm=w -k audit-wazuh-w
    -a always,exit -S all -F dir=/usr/lib -F perm=a -k audit-wazuh-a
    -a always,exit -S all -F dir=/bin -F perm=w -k audit-wazuh-w
    -a always,exit -S all -F dir=/bin -F perm=a -k audit-wazuh-a
    -a always,exit -S all -F dir=/lib -F perm=w -k audit-wazuh-w
    -a always,exit -S all -F dir=/lib -F perm=a -k audit-wazuh-a
    -a always,exit -S all -F dir=/lib64 -F perm=w -k audit-wazuh-w
    -a always,exit -S all -F dir=/lib64 -F perm=a -k audit-wazuh-a
    -a always,exit -S all -F dir=/sbin -F perm=w -k audit-wazuh-w
    -a always,exit -S all -F dir=/sbin -F perm=a -k audit-wazuh-a
    -a always,exit -S all -F dir=/usr/bin -F perm=w -k audit-wazuh-w
    -a always,exit -S all -F dir=/usr/bin -F perm=a -k audit-wazuh-a
    -a always,exit -S all -F dir=/usr/sbin -F perm=w -k audit-wazuh-w
    -a always,exit -S all -F dir=/usr/sbin -F perm=a -k audit-wazuh-a
