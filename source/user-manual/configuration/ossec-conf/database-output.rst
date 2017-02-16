.. _reference_ossec_database_output:

Database output
===============

.. topic:: XML section name

	.. code-block:: xml

		<database_output>

MySQL and PostgreSQL database outputs are supported. It should be configured with the options below.

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
| `type`_     | Mysql, Postgresql    |
+-------------+----------------------+



``hostname``
------------

IP Address of the database server

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Any valid IP address

``username``
------------

Username to access the database

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Any valid username

``password``
------------

Password to access the database

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Any password

``database``
------------

Database name to store the alerts

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Database name

``type``
--------

Type of database

.. note::

     OSSEC must be compiled with the database type that is to be used.

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Mysql/Postgresql
