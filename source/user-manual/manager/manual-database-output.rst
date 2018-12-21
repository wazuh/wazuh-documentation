.. Copyright (C) 2018 Wazuh, Inc.

.. _manual_database_output:

Configuring database output
===========================

It's possible to configure Wazuh to output the alerts into a database. To do this, you must compile Wazuh with the database type that you want to use.

At this moment, `MySQL <https://www.mysql.com/>`_ and `PostgreSQL <https://www.postgresql.org/>`_ databases are supported.

In this section, you'll find instructions to configure the database output for any of the database systems previously mentioned.

.. note::
  This tutorial assumes that the user has already installed MySQL or PostgreSQL. If you need instructions to install them on your host, please find some tutorials for the main distributions at the end of this page.

.. warning::
  To enable the database output, you must install the **development libraries** for the database system that you want to configure.

Installation
------------

As previously mentioned, the database output can be enabled when compiling Wazuh with the database type to use. On the :ref:`sources installation guide <sources_installation>`, you must pre-compile the source code before running the ``install.sh`` script.

Execute the following command before **step 3** from the installation guide:

.. code-block:: console

  # cd wazuh-*/src
  # make deps && make TARGET=server DATABASE=<mysql/pgsql>

To indicate what kind of database you'll use, you need the ``DATABASE`` flag. The allowed values are *mysql* or *pgsql*.

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

In order for Wazuh to output alerts and other data into the database, you must add a ``<database_output>`` section on the configuration file, located at ``/var/ossec/etc/ossec.conf``. Fill in the block with the right database name and credentials. The hostname must be the IP address of the database server.

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

The setup process for the database output is finished. Now the only thing left is to enable this feature on the Wazuh manager and restart it. To do so, follow these steps:

1. Enable the ``ossec-dbd`` daemon to activate the database output feature:

  .. code-block:: console

    # /var/ossec/bin/ossec-control enable database

2. Restart the Wazuh manager:

  a. For Systemd:

  .. code-block:: console

    # systemctl retart wazuh-manager

  b. For SysV Init:

  .. code-block:: console

    # service wazuh-manager restart

Now the database will start being filled with data provided by the manager.

More information
----------------

The scope of this documentation doesn't include instructions for installing a database server, but below you can find some useful tutorials if you need to learn how to do it:

- `MySQL installation on CentOS systems <https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-centos-7>`_
- `Mysql installation on Ubuntu systems <https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04>`_
- `PostgreSQL installation on CentOS systems <https://www.linode.com/docs/databases/postgresql/how-to-install-postgresql-relational-databases-on-centos-7/>`_
- `PostgreSQL installation on Ubuntu systems <https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04>`_

.. note::
  `MariaDB <https://mariadb.org/>`_ is a community-driven version of MySQL, and it's also valid for this tutorial.
