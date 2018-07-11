.. Copyright (C) 2018 Wazuh, Inc.

.. _who-windows:

Auditing who-data in Windows
============================

How it works
^^^^^^^^^^^^

Configuration
^^^^^^^^^^^^^

Alert fields
^^^^^^^^^^^^

The following fields are received in alerts when who-data is enabled:

+------------------------------+--------------------------------------------------------------------------------------------------------------------+
| **(Audit) User**             | Contains the user ID and name of the user who started the process that modified the monitored file.                |
+------------------------------+                                                                                                                    +
| **audit.user.id**            |                                                                                                                    |
|                              |                                                                                                                    |
| **audit.user.name**          |                                                                                                                    |
+------------------------------+--------------------------------------------------------------------------------------------------------------------+
| **(Audit) Process id**       | Contains the ID and name of the process used to modify the monitored file.                                         |
|                              |                                                                                                                    |
| **(Audit) Process name**     |                                                                                                                    |
+------------------------------+                                                                                                                    +
| **audit.proccess.id**        |                                                                                                                    |
|                              |                                                                                                                    |
| **audit.proccess.name**      |                                                                                                                    |
+------------------------------+--------------------------------------------------------------------------------------------------------------------+
