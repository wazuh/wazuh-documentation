.. Copyright (C) 2019 Wazuh, Inc.

.. _reference_ossec_database_output:

database_output
===============

.. topic:: XML section name

  .. code-block:: xml

    <database_output>
    </database_output>

.. note::
  To use this output feature, Wazuh must be compiled with the database type that is to be used. Read :ref:`this article <manual_database_output>` to learn about how to install and enable it.

MySQL and PostgreSQL database output is supported. The following options below are available to configure it:

Available options
-----------------

- `hostname`_
- `username`_
- `password`_
- `database`_
- `type`_

hostname
^^^^^^^^

Specify the IP address of the database server.

+--------------------+----------------------+
| **Default value**  | n/a                  |
+--------------------+----------------------+
| **Allowed values** | Any valid IP address |
+--------------------+----------------------+

username
^^^^^^^^

Specify the username to access the database.

+--------------------+--------------------+
| **Default value**  | n/a                |
+--------------------+--------------------+
| **Allowed values** | Any valid username |
+--------------------+--------------------+

password
^^^^^^^^

Specify the password to access the database.

+--------------------+--------------+
| **Default value**  | n/a          |
+--------------------+--------------+
| **Allowed values** | Any password |
+--------------------+--------------+

database
^^^^^^^^

Specify the name of the database in which to store the alerts.

+--------------------+---------------+
| **Default value**  | n/a           |
+--------------------+---------------+
| **Allowed values** | Database name |
+--------------------+---------------+

type
^^^^

Type of database (Mysql or PostgreSQL).

+--------------------+------------------+
| **Default value**  | n/a              |
+--------------------+------------------+
| **Allowed values** | mysql/postgresql |
+--------------------+------------------+

Sample configuration
--------------------

.. code-block:: xml

  <database_output>
    <hostname>192.168.1.122</hostname>
    <username>MySQLadmin</username>
    <password>secret1234</password>
    <database>Alerts_DB</database>
    <type>mysql</type>
  </database_output>
