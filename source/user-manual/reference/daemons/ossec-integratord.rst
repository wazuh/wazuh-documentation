.. Copyright (C) 2019 Wazuh, Inc.

.. _ossec-integratord:

ossec-integratord
=================

The ``ossec-integratord`` is a daemon that allows Wazuh to connect to external APIs and alerting tools such as Slack, VirusTotal and PagerDuty.

For further details please refer to the following :ref:`page <manual_integration>`.

ossec-integratord options
-------------------------

+-----------------+-------------------------------+
| **-d**          | Basic debug mode.             |
+-----------------+-------------------------------+
| **-dd**         | Verbose debug mode.           |
+-----------------+-------------------------------+
| **-f**          | Run in foreground.            |
+-----------------+-------------------------------+
| **-h**          | Display the help message.     |
+-----------------+-------------------------------+
| **-V**          | Version and license message.  |
+-----------------+-------------------------------+
| **-t**          | Test configuration.           |
+-----------------+-------------------------------+
| **-u <user>**   | Run as 'user'                 |
+-----------------+-------------------------------+
| **-g <group>**  | Run as 'group'                |
+-----------------+-------------------------------+
| **-c <config>** | Read the 'config' file        |
+-----------------+-------------------------------+
| **-D <dir>**    | Chroot to 'dir'               |
+-----------------+-------------------------------+
