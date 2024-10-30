.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the ``wazuh-integratord``, a daemon that allows Wazuh to connect to external APIs and alerting tools such as Slack and PagerDuty.


.. _wazuh-integratord:

wazuh-integratord
=================

The ``wazuh-integratord`` is a daemon that allows Wazuh to connect to external APIs and alerting tools such as Slack and PagerDuty.

For further details please refer to the following :doc:`page </user-manual/manager/integration-with-external-apis>`.

wazuh-integratord options
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
