.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This guide will teach you about monitoring system calls with Wazuh: control rules, file system rules, and system call rules. 
   
How it works
============

.. note::
   This guide is based on the official `Audit guide <https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/sec-Defining_Audit_Rules_and_Controls.html>`_.

The Linux Audit system is a feature of the Linux kernel that provides a framework for monitoring. It is usually installed by default on RedHat and CentOS operating systems but can be manually installed on other Linux distributions. It captures and records various events, including system calls, file system activity, and network activity, among others.

When an event occurs on an endpoint, the Linux kernel generates an audit record that contains information about the event, such as the date and time, the user who initiated the event, the type of event, and any relevant parameters. The audit daemon collects and stores these audit records in a secure audit log file.

You can view and analyze the audit log files using various audit management tools, which provide insights into system activity, detect security issues, and help identify potential threats.

You can configure the Linux Audit system to monitor specific events based on user-defined rules and policies. This enables security teams to customize the auditing process to their specific needs and requirements. It uses a set of rules to define what is to be monitored and captured in the log files. The following are the three types of audit rules specification:

- **File system rules**: These rules track access to files and directories.

- **Control rules**: These allow the behavior and default configuration of the Linux Audit system to be modified.

- **System call rules**: These rules log specific programs’ system calls.

Audit rules are specified interactively using the ``auditctl`` utility, but to make changes persistent, you need to add the audit rules to the ``/etc/audit/audit.rules`` file.

.. note::
   You need root user privileges to run all the commands described below.

File system rules
-----------------

You can use these rules to monitor file access on a Linux endpoint. They track when specific files are accessed or modified, or monitor changes to entire directories. File system rules can also track failed attempts to access files.

To define a file system rule, use the following syntax:

   .. code-block:: console

      # auditctl -w <PATH> -p <PERMISSIONS> -k <KEY_NAME>

Where:

+----------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``-w <PATH>``        | ``<PATH>``: specifies what file or directory to audit.                                                                                                          |
+----------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``-p <PERMISSIONS>`` | ``<PERMISSIONS>`` are the permissions that are for auditing, including the following:                                                                           |
+                      +---------------------------------------------------+-----------+-------------------------------------------------------------------------------------------------+
|                      | Values                                            | r         | read access to a file or a directory                                                            |
+                      +                                                   +-----------+-------------------------------------------------------------------------------------------------+
|                      |                                                   | w         | write access to a file or a directory                                                           |
+                      +                                                   +-----------+-------------------------------------------------------------------------------------------------+
|                      |                                                   | x         | execute access to a file or a directory                                                         |
+                      +                                                   +-----------+-------------------------------------------------------------------------------------------------+
|                      |                                                   | a         | change in the file's or directory's attribute                                                   |
+----------------------+---------------------------------------------------+-----------+-------------------------------------------------------------------------------------------------+
| ``-k <KEY_NAME>``    | ``<KEY_NAME>`` assigns a unique identifier to the rule. It tags the audit events that match the rule to make searching for and analyzing related events easier. |
|                      |                                                                                                                                                                 |
|                      | Wazuh requires this argument to analyze the logs more accurately.                                                                                               |
+----------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+

For example, the following command defines a rule that logs all write access and every attribute change of the ``/etc/passwd`` file:

.. code-block:: console

   # auditctl -w /etc/passwd -p wa -k passwd_changes

Control rules
-------------

These rules enforce security policies on the system, including implementing access controls and limiting the actions that specific users or processes can perform. For example, a policy that prevents processes from executing certain commands or accessing specific system resources. 

The table illustrates some examples of how to modify the behavior of the audit system.

+----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``auditctl -b``      | Set the maximum amount of existing audit buffers in the kernel.                                                                                             |
+----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``auditctl -f``      | Define the action to be executed upon detecting a critical error.                                                                                           |
+----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``auditctl -e``      | Enable/disable the audit feature or set its configuration as read-only.                                                                                     |
+----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``auditctl -s``      | Display the status of the Linux Audit System, including the enabled audit rules, failure modes, and other relevant information.                             |
+----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``auditctl -l``      | List all the audit rules that are currently loaded into the system.                                                                                         |
+----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``auditctl -D``      | Delete all currently loaded audit rules.                                                                                                                    |
+----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------+

System call rules
-----------------

These rules monitor system calls made by specific users or processes. They track specific or all system calls a particular user or process makes. System call rules can be specified in several ways, including by a syscall number, name, or by a combination of both.

To define a system call rule, use the following syntax:

.. code-block:: console

   # auditctl -a <ACTION>,<FILTER> -S <SYSTEM_CALL> -F FIELD=VALUE -k <KEY_NAME>

Where:

+---------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``-a <ACTION>, <FILTER>`` | Tells the kernel's rule matching engine to append a rule at the end of the rule list.                                                                           |
|                           |                                                                                                                                                                 |
|                           | We must specify which rule list to append it to and what action to take when it triggers.                                                                       |
+                           +--------------+---------+----------------------------------------------------------------------------------------------------------------------------------------+
|                           | ``<ACTION>`` | always  | Sets the rule to always generate an audit event when the specified action occurs, regardless of whether it succeeded or failed.        |
+                           +              +---------+----------------------------------------------------------------------------------------------------------------------------------------+
|                           |              | never   | Sets the rule to never generate an audit event for the specified action, even if the event would normally be audited.                  |
+                           +--------------+---------+----------------------------------------------------------------------------------------------------------------------------------------+
|                           | The ``<FILTER>`` value specifies which kernel rule-matching filter is applied to the event                                                                      |
+                           +--------------+---------+----------------------------------------------------------------------------------------------------------------------------------------+
|                           | ``<FILTER>`` | task    | Only audit events fork or clone syscalls.                                                                                              |
|                           |              |         |                                                                                                                                        |
|                           |              |         | This is rarely used in practice.                                                                                                       |
+                           +              +---------+----------------------------------------------------------------------------------------------------------------------------------------+
|                           |              | exit    | All syscall and file system audit requests are evaluated.                                                                              |
+                           +              +---------+----------------------------------------------------------------------------------------------------------------------------------------+
|                           |              | user    | This is used to remove some events that originate in user space.                                                                       |
|                           |              |         |                                                                                                                                        |
|                           |              |         | By default, any event originating in user space is allowed.                                                                            |
+                           +              +---------+----------------------------------------------------------------------------------------------------------------------------------------+
|                           |              | exclude | This is used to exclude certain events from being logged.                                                                              |
|                           |              |         |                                                                                                                                        |
|                           |              |         | *msgtype* is used to tell the kernel which message to filter out.                                                                      |
|                           |              |         |                                                                                                                                        |
|                           |              |         | For more granular control over which events to audit, use the user and exit filters instead.                                           |
|                           |              |         |                                                                                                                                        |
+---------------------------+--------------+---------+----------------------------------------------------------------------------------------------------------------------------------------+
| ``-S <SYSTEM_CALL>``      | This specifies which *system_call* to audit. Multiple system calls can be specified in a single rule.                                                           |
|                           |                                                                                                                                                                 |
|                           | A list of all system calls can be found with the command ``ausyscall --dump``.                                                                                  |
+---------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``-F <FIELD=VALUE>``      | Use ``FIELD=VALUE`` to specify additional criteria to narrow down which events to audit, based on: architecture, group ID, process ID, and more.                |
|                           |                                                                                                                                                                 |
|                           | Multiple ``-F`` options can be used in a single rule.                                                                                                           |
+---------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``-k <KEY_NAME>``         | ``<KEY_NAME>`` assigns a unique identifier to the rule. It tags the audit events that match the rule to make searching for and analyzing related events easier. |
|                           |                                                                                                                                                                 |
|                           | Wazuh requires this argument to analyze the logs more accurately.                                                                                               |
+---------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+

For example, the following configuration defines a rule that creates a log entry every time a file is deleted or renamed by a system user whose ID is 500 or larger:

.. code-block:: console

   # auditctl -a always,exit -S unlink -S unlinkat -S rename -S renameat -F auid>=500 -F auid!=4294967295 -k delete


.. Note::
   ``-F auid!=4294967295`` option is used to exclude users whose login UID is not set.

It is also possible to define a file system rule using the system call rule syntax. The following command creates a rule for system calls that is similar to the ``-w /etc/shadow -p wa`` file system rule:

.. code-block:: console

   # auditctl -a always,exit -F path=/etc/shadow -F perm=wa
