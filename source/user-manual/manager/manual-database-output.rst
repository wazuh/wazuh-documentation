.. Copyright (C) 2019 Wazuh, Inc.

.. _manual_database_output:

Configuring database output
===========================

It's possible to configure Wazuh to output the alerts into a database. To do this, users must compile Wazuh with the database type that users want to use.

At this moment, `MySQL <https://www.mysql.com/>`_ and `PostgreSQL <https://www.postgresql.org/>`_ databases are supported.

In this section, users will find instructions to configure the database output for any of the database systems previously mentioned.

.. note::
  This tutorial assumes that the user has already installed MySQL or PostgreSQL and knows how to create the users and the databases. If it is needed instructions to install them on the users' host, please find some tutorials for the main distributions at the end of this page.

Prerequisites
-------------
  To enable the database output, it is needed to install the **development libraries** for the database system that users want to configure.

  a) For MySQL:

    RPM:

    .. code-block:: console

      # yum install mysql-devel

    Debian:

    .. code-block:: console

      # apt-get install libmysqlclient-dev

  b) For PostgreSQL:

    RPM:

    .. code-block:: console

      # yum install postgresql-devel

    Debian:

    .. code-block:: console

      # apt-get install libpq-dev

Installation
------------

As previously mentioned, the database output can be enabled when compiling Wazuh with the database type to use. On the :ref:`sources installation guide <sources_installation>`, users must pre-compile the source code before running the ``install.sh`` script.

Execute the following command before **step 3** from the installation guide:

.. code-block:: console

  # cd wazuh-*/src
  # make deps && make TARGET=server DATABASE=<mysql/pgsql>

To indicate what kind of database users will use, users need the ``DATABASE`` flag. The allowed values are *mysql* or *pgsql*.

The compilation process might take some time. After finishing this process, please continue with the sources installation guide. Now Wazuh will be installed with database support, but we must enable manually the feature after configuring it.

Database configuration
----------------------

Now that we have Wazuh installed with database support, we need to set up the database server. We'll create a new database, set up the database user and add the schema (located in the ``src/os_dbd`` directory of the source code) with the following commands, according to your database system:

**For MySQL:**

.. code-block:: sql

  # mysql -u root -p

  mysql> CREATE DATABASE Alerts_DB;
  Query OK, 0 rows affected (0.00 sec)

  mysql> CREATE USER 'MySQLadmin'@'<MANAGER_IP>' IDENTIFIED BY 'secret1234';
  Query OK, 0 rows affected (0.00 sec)

  mysql> GRANT INSERT,SELECT,UPDATE,CREATE,DELETE,EXECUTE on Alerts_DB.* to 'MySQLadmin'@'<MANAGER_IP>';
  Query OK, 0 rows affected (0.00 sec)

  mysql> FLUSH PRIVILEGES;
  Query OK, 0 rows affected (0.00 sec)

  mysql> quit;

  # mysql -u root -p Alerts_DB < src/os_dbd/mysql.schema

**For PostgreSQL:**

.. code-block:: console

  # sudo -u postgres createuser -P PostgreSQLadmin

  # sudo -u postgres createdb -O PostgreSQLadmin Alerts_DB

  # psql -U PostgreSQLadmin -d Alerts_DB -f src/os_dbd/postgresql.schema

Wazuh configuration
-------------------

In order for Wazuh to output alerts and other data into the database, the users must add a ``<database_output>`` section on the configuration file, located at ``/var/ossec/etc/ossec.conf``. Fill in the block with the right database name and credentials. The hostname must be the IP address of the database server.

**For MySQL:**

.. code-block:: xml

  <database_output>
    <hostname>192.168.1.122</hostname>
    <username>MySQLadmin</username>
    <password>secret1234</password>
    <database>Alerts_DB</database>
    <type>mysql</type>
  </database_output>

**For PostgreSQL:**

.. code-block:: xml

  <database_output>
    <hostname>192.168.1.122</hostname>
    <username>PostgreSQLadmin</username>
    <password>secret1234</password>
    <database>Alerts_DB</database>
    <type>postgresql</type>
  </database_output>

Find :ref:`here <reference_ossec_database_output>` the complete configuration reference for ``<database_output>``.

Last steps
----------

The setup process for the database output is finished. Now the only thing left is to restart the Wazuh manager:

  a. For Systemd:

  .. code-block:: console

    # systemctl retart wazuh-manager

  b. For SysV Init:

  .. code-block:: console

    # service wazuh-manager restart

Now the database will start being filled with data provided by the manager.
