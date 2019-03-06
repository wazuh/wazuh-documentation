
PuppetDB installation (Optional)
================================

.. warning:: Some of these steps may be outdated. If it is not necessary to install, continue in the next section. 

After configuring Puppet Server to run on Apache with Passenger, the next step is to add PuppetDB so that you can take advantage of exported resources, as well as have a central storage location for Puppet facts and catalogs.

Installation on CentOS/RHEL 7 (Adjust if your version is different.)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: console

   # rpm -Uvh https://yum.postgresql.org/9.4/redhat/rhel-latest-x86_64/pgdg-centos94-9.4-2.noarch.rpm
   # yum install puppetdb-terminus.noarch puppetdb postgresql94-server postgresql94 postgresql94-contrib.x86_64
   # /usr/pgsql-9.4/bin/postgresql94-setup initdb
   # systemctl start postgresql-9.4
   # systemctl enable postgresql-9.4

Installation on Debian/Ubuntu
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: console

  # sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
  # wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
  # apt-get update
  # apt-get install puppetdb-terminus puppetdb postgresql-9.4 postgresql-contrib-9.4

Configuration
^^^^^^^^^^^^^

For CentOS/RHEL/Fedora only, the next step is to edit ``/var/lib/pgsql/9.4/data/pg_hba.conf`` and modify the METHOD to be ``md5`` in these two lines:

.. code-block:: console

  # IPv4 local connections:
  host    all             all             127.0.0.1/32            md5
  # IPv6 local connections:
  host    all             all             ::1/128                 md5

Restart service after change configuration:

.. code-block:: console

   # systemctl restart postgresql-9.4

Create a PostgreSQL user and database:

.. code-block:: console

   # su - postgres
   $ createuser -DRSP puppetdb
   $ createdb -O puppetdb puppetdb
   $ exit

The user is created with no permission to create databases (-D), or roles (-R) and does not have superuser privileges (-S). It will prompt for a password (-P). Let’s assume a password of "yourpassword"” has been used. The database is created and owned (-O) by the puppetdb user.

Create the extension pg_trgm is the RegExp-optimized index extension:

.. code-block:: console

   # su - postgres
   $ psql puppetdb -c 'create extension pg_trgm'
   $ exit

Test database access:

.. code-block:: console

   # psql -h 127.0.0.1 -p 5432 -U puppetdb -W puppetdb
   Password for user puppetdb:
   psql (9.4.11)
   Type "help" for help.
   puppetdb=> \q

Configure ``/etc/puppetlabs/puppetdb/conf.d/database.ini``: ::

   [database]
   classname = org.postgresql.Driver
   subprotocol = postgresql
   subname = //127.0.0.1:5432/puppetdb
   username = puppetdb
   password = yourpassword
   log-slow-statements = 10

Create ``/etc/puppetlabs/puppet/puppetdb.conf``: ::

   [main]
   server_urls = https://puppetdb.example.com:8081

Create ``/etc/puppetlabs/puppet/routes.yaml``: ::

   ---
   master:
     facts:
       terminus: puppetdb
       cache: yaml

Finally, update ``/etc/puppetlabs/puppet/puppet.conf``: ::

   [master]
    storeconfigs = true
    storeconfigs_backend = puppetdb

Start puppetdb service:

.. code-block:: console

   # systemctl start puppetdb

Once these steps are completed, restart your Puppet Server and run ``puppet agent --test``:

.. code-block:: console

   # puppet agent --test

Now PuppetDB is working.
