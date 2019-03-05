.. Copyright (C) 2018 Wazuh, Inc.

.. _setup_puppet_master:

Installing Puppet master
========================

Installation on CentOS/RHEL/Fedora
----------------------------------

Install the Puppet yum repository and then the "puppetserver" package. See this `index <https://yum.puppetlabs.com/>`_ to find the correct rpm file needed to install the puppet repo for your Linux distribution. For example, to install Puppet 5 for CentOS 7 or RHEL 7, do the following:

.. code-block:: console

   # rpm -ivh https://yum.puppetlabs.com/puppet5/puppet5-release-el-7.noarch.rpm
   # yum -y install puppetserver

.. note:: 

  For a correct installation we recommend the use of Puppet versions equal or greater than 5. 


Installation on Debian/Ubuntu
-----------------------------

Install ``curl``, ``apt-transport-https`` and ``lsb-release``:

.. code-block:: console

	# apt-get update
	# apt-get install curl apt-transport-https lsb-release

Get the appropriate Puppet apt repository, and then the "puppetserver" package. See https://apt.puppetlabs.com to find the correct deb file to install the Puppet 5 repo for your Linux distribution.

.. code-block:: console

  # wget https://apt.puppetlabs.com/puppet5-release-xenial.deb
  # dpkg -i puppet5-release-xenial.deb
  # apt update
  # apt-get install -y puppetserver

.. note:: For a correct installation we recommend the use of Puppet versions equal or greater than 5. 


.. note:: The releases supported by the manifest to install Wazuh are as follows: 

      Ubuntu: **precise | trusty | vivid | wily | xenial | yakketi**

      Debian: **jessie | wheezy | stretch | sid**


Memory Allocation
-----------------

By default, Puppet Server will be configured to use 2GB of RAM. However, if you want to experiment with Puppet Server on a VM, you can safely allocate as little as 512MB of memory. To change Puppet Server memory allocation, you can edit the following init config file.

  * ``/etc/sysconfig/puppetserver`` -- CentOS/RHEL/Fedora
  * ``/etc/default/puppetserver`` -- Debian/Ubuntu

Replace 2g with the amount of memory you want to allocate to Puppet Server. For example, to allocate 1GB of memory, use ``JAVA_ARGS="-Xms1g -Xmx1g"``; for 512MB, use ``JAVA_ARGS="-Xms512m -Xmx512m"``.

Configuration
-------------

Edit the ``/etc/puppetlabs/puppet/puppet.conf`` file, adding this line to the ``[main]`` section (create the section if it does not exist), and replacing ``puppet.example.com`` with your own FQDN: ::

   dns_alt_names = puppet,puppet.example.com

.. note:: If you find ``templatedir=$confdir/templates`` in the config file, delete that line.  It has been deprecated.

Then, restart your Puppet Server to apply changes:

  a) For Systemd:

  .. code-block:: console

        # systemctl start puppetserver
        # systemctl enable puppetserver

  b) For SysV Init:

  .. code-block:: console

        # service puppetserver start
        # update-rc.d puppetserver

PuppetDB installation (Optional)
--------------------------------

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
