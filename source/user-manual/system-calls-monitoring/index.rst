.. _system_calls_monitoring:

System calls monitoring
==================================

.. topic:: Introduction

    The `Linux Audit system <https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html>`_ provides a way to track security-relevant information on your system. Based on pre-configured rules, Audit generates log entries to record as much information about the events that are happening on your system as possible. This information is crucial for mission-critical environments to determine the violator of the security policy and the actions they performed.

.. topic:: Contents

    .. toctree::
       :maxdepth: 1

       audit-configuration
       audit-examples

How it works
-------------------------------

Audit works on a set of rules that define what is to be captured in the log files. There are three types of Audit rules that can be specified:

- Control rules: allow the Audit system's behavior and some of its configuration to be modified.

- File system rules: also known as file watches, allow the auditing of access to a particular file or a directory.

- System call rules: allow logging of system calls that any specified program makes.


.. note::
   This guide is based on the `Audit official guide <https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/sec-Defining_Audit_Rules_and_Controls.html>`_.

.. note::
   Audit rules can be specified on the command line with the *auditctl* utility (note that these rules are not persistent across reboots), or written in the */etc/audit/audit.rules* file.

.. warning::
   All commands which interact with the Audit service and the Audit log files require root privileges. Ensure you execute these commands as the root user.


Control rules
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Below some example that ilustrates how to modify the behaviour of Audit system:

- auditctl -b: sets the maximum amount of existing Audit buffers in the kernel.
- auditctl -e: enables and disables the Audit system or locks its configuration.
- auditctl -s: reports the status of the Audit system.
- auditctl -l: lists all currently loaded Audit rules.
- auditctl -D: deletes all currently loaded Audit rules.

File System Rules
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To define a file system rule, use the following syntax: ::

   -w path_to_file -p permissions -k key_name

where:

- w: *path_to_file* is the file or directory that is audited.

- p: *permissions* are the permissions that are logged:

- r: read access to a file or a directory.
- w: write access to a file or a directory.
- x: execute access to a file or a directory.
- a: change in the file's or directory's attribute.

- k: *key_name* is an optional string that helps you identify which rule or a set of rules generated a particular log entry. This argument is **required by OSSEC** in order to analyze the logs more accurately.

For example, to define a rule that logs all write access to, and every attribute change of, the */etc/passwd* file, execute the following command:::

   $ auditctl -w /etc/passwd -p wa -k passwd_changes

System Call Rules
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To define a system call rule, use the following syntax:::

   -a action,filter -S system_call -F field=value -k key_name

where:

- a: tells the kernel's rule matching engine that we want to append a rule at the end of the rule list. But we need to specify which rule list it goes on and what action to take when it triggers.

- Valid actions are:

 - always: always create an event.

 - never: never create an event.

- The filter specifies which kernel rule-matching filter is applied to the event. The rule-matching filter can be one of the following:

 - task: is checked only during the fork or clone syscalls. It is rarely used in practice.

 - exit: is the place where all syscall and file system audit requests are evaluated.

 - user: is used to filter (remove) some events that originate in user space.  By default, any event originating in user space is allowed. So, if there are some events that you do not want to see, then this is a place where some can be removed.

 - exclude: is used to exclude certain events from being      emitted. The msgtype field is used to tell the kernel which message      types you do not want to record. This filter can remove the event as      a whole and is not selective about any other attribute. The user and      exit filters are better suited to selectively auditing events.

- S: *system_call* specifies the system call by its name. Several system calls can be grouped into one rule, each specified after the -S option. A list of all system calls can be found with the command ``ausyscall --dump``.

- F: *field=value* specifies additional options that furthermore modify the rule to match events based on a specified architecture, group ID, process ID, and others.

- k: key_name is an optional string that helps you identify which rule or a set of rules generated a particular log entry. This argument is **required by OSSEC** in order to analyze the logs more accurately.

For example, to define a rule that creates a log entry every time a file is deleted or renamed by a system user whose ID is 500 or larger (the -F auid!=4294967295 option is used to exclude users whose login UID is not set), execute the following command:::

   $ auditctl -a always,exit -S unlink -S unlinkat -S rename -S renameat -F auid>=500 -F auid!=4294967295 -k delete


It is also possible to define a file system rule using the system call rule syntax. The following command creates a rule for system calls that is analogous to the **-w /etc/shadow -p wa** file system rule:::

   $ auditctl -a always,exit -F path=/etc/shadow -F perm=wa
