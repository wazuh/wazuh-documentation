.. _reference_ossec_database_output:

database_output
===============

.. topic:: XML section name

	.. code-block:: xml

		<database_output>

MySQL and PostgreSQL database output is supported. It is configured with the options below.

+-------------+----------------------+
| Options     | Allowed values       |
+=============+======================+
| `hostname`_ | Any valid IP address |
+-------------+----------------------+
| `username`_ | Any valid username   |
+-------------+----------------------+
| `password`_ | Any password         |
+-------------+----------------------+
| `database`_ | Database name        |
+-------------+----------------------+
| `type`_     | mysql or postgresql  |
+-------------+----------------------+



``hostname``
------------

Specify the IP address of the database server.

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Any valid IP address

``username``
------------

Specify the username to access the database.

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Any valid username

``password``
------------

Specify the password to access the database.

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Any password

``database``
------------

Specify the name of the database in which to store the alerts.

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Database name

``type``
--------

Type of database

.. note::

    Wazuh must be compiled with the database type that is to be used.

.. topic:: Default value

	n/a

.. topic:: Allowed values

	mysql/postgresql
