.. _audit_use_cases:

Monitoring accesses to a directory
------------------------------------------------

In this example, we are going to monitor every kind of access in the directory */home*: ::

    auditctl -w /home -p w -k audit-wazuh-w
    auditctl -w /home -p a -k audit-wazuh-a
    auditctl -w /home -p r -k audit-wazuh-r
    auditctl -w /home -p x -k audit-wazuh-x

.. note::
    It is possible to define the previous rules as an unique rule with *-p warx*, but as we explained in the previous section, each type of key must have its own key.

Let's see what happens when we execute the following commands: ::

    $ touch /home/malware.py
    $ nano /home/malware.py
    $ chmod u+x /home/malware.py
    $ /home/malware.py
    $ rm /home/malware.py

ToDo

Monitoring all root actions
------------------------------------------------

We want that all commands run by a user who has admin privileges to be logged. The audit configuration for this is quite simple: ::

    $ auditctl -a exit,always -F euid=0 -F arch=b64 -S execve -k audit-wazuh-c
    $ auditctl -a exit,always -F euid=0 -F arch=b32 -S execve -k audit-wazuh-c

An alert looks like:

ToDo

Privileges elevation
------------------------------------------------

By default, OSSEC is able to detect a privelege elevation by analyzing the corresponding log in */var/log/auth.log*. The below example show the user homer executing a root action: ::

    $ homer@springfield:/$ sudo ls /var/ossec/etc

OSSEC detects the action, extracting the *srcuser*, *dstuser* and *command* among other fields: ::

    {
      "rule": {
        "level": 3,
        "description": "Successful sudo to ROOT executed",
        "id": 5402,
        "firedtimes": 1,
        "groups": [
          "syslog",
          "sudo"
        ],
        "pci_dss": [
          "10.2.5",
          "10.2.2"
        ]
      },
      "agent": {
        "id": "000",
        "name": "ip-10-0-0-220"
      },
      "manager": {
        "name": "ip-10-0-0-220"
      },
      "srcuser": "homer",
      "dstuser": "root",
      "full_log": "Dec 27 18:30:45 ip-10-0-0-220 sudo:    homer : TTY=pts/2 ; PWD=/ ; USER=root ; COMMAND=/bin/ls /var/ossec/etc",
      "program_name": "sudo",
      "tty": "pts/2",
      "pwd": "/",
      "command": "/bin/ls",
      "decoder": {
        "fts": 1792,
        "parent": "sudo",
        "name": "sudo"
      },
      "timestamp": "2016 Dec 27 18:30:46",
      "location": "/var/log/auth.log"
    }

Although, it is possible that you need more information about the action, so you can use Audit.

On the other hand, if you have created a rule to monitor root actions, like in the previous use case, every action with *sudo* will be logged but with an inconvenient: probably the field **auid** will be 0 (root user) instead of the user who executed the action, that means you lost what the user does.

In order to keep the track of the user after sudo, it is necessary to configure *PAM*.

.. warning::
    Be very careful with PAM configuration, a bad configuration could make a system inaccessible.

Add the following line to every pam service that you consider it: ::

    session required        pam_loginuid.so

A common configuration should include: *login*, *common-session*, *cron* and *sshd*: ::

    $ grep -R "pam_loginuid.so" /etc/pam.d/

    /etc/pam.d/login:session    required     pam_loginuid.so
    /etc/pam.d/common-session:session required        pam_loginuid.so
    /etc/pam.d/cron:session    required     pam_loginuid.so
    /etc/pam.d/sshd:session    required     pam_loginuid.so


After configuring PAM, if we execute the previous command with the user *homer* we will see that the field *auid* is 1004, the id of the user homer.

::

    $ homer@springfield:/$ sudo ls /var/ossec/etc

::

    {
      "rule": {
        "level": 3,
        "description": "Audit: Command: /bin/ls",
        "id": 80792,
        "firedtimes": 4,
        "groups": [
          "audit",
          "audit_command"
        ]
      },
      "agent": {
        "id": "000",
        "name": "ip-10-0-0-220"
      },
      "manager": {
        "name": "ip-10-0-0-220"
      },
      "full_log": "type=SYSCALL msg=audit(1482865099.744:1291): arch=c000003e syscall=59 success=yes exit=0 a0=7ff1a3f81d08 a1=7ff1a3f7d388 a2=7ff1a3f8a930 a3=0 items=2 ppid=24202 pid=24203 auid=1004 uid=0 gid=0 euid=0 suid=0 fsuid=0 egid=0 sgid=0 fsgid=0 tty=pts2 ses=168 comm=\"ls\" exe=\"/bin/ls\" key=\"audit-wazuh-c\" type=EXECVE msg=audit(1482865099.744:1291): argc=2 a0=\"ls\" a1=\"/var/ossec/etc\" type=CWD msg=audit(1482865099.744:1291):  cwd=\"/\" type=PATH msg=audit(1482865099.744:1291): item=0 name=\"/bin/ls\" inode=262315 dev=ca:02 mode=0100755 ouid=0 ogid=0 rdev=00:00 nametype=NORMAL type=PATH msg=audit(1482865099.744:1291): item=1 name=(null) inode=262258 dev=ca:02 mode=0100755 ouid=0 ogid=0 rdev=00:00 nametype=NORMAL type=PROCTITLE msg=audit(1482865099.744:1291): proctitle=6C73002F7661722F6F737365632F657463",
      "audit": {
        "type": "SYSCALL",
        "id": "1291",
        "syscall": "59",
        "success": "yes",
        "exit": "0",
        "ppid": "24202",
        "pid": "24203",
        "auid": "1004",
        "uid": "0",
        "gid": "0",
        "euid": "0",
        "suid": "0",
        "fsuid": "0",
        "egid": "0",
        "sgid": "0",
        "fsgid": "0",
        "tty": "pts2",
        "session": "168",
        "command": "ls",
        "exe": "/bin/ls",
        "key": "audit-wazuh-c",
        "cwd": "/",
        "file": {
          "name": "/bin/ls",
          "inode": "262315",
          "mode": "0100755"
        }
      },
      "decoder": {
        "parent": "auditd",
        "name": "auditd"
      },
      "timestamp": "2016 Dec 27 18:58:20",
      "location": "/var/log/audit/audit.log"
    }
