.. _setup_puppet:

Setup Puppet
============================

Puppet master installation
--------------------------

Before we get started with Puppet, check the following network requirements:

- **Private network DNS**: Forward and reverse DNS must be configured, and every server must have a unique hostname. If you do not have DNS configured, you must use your hosts file for name resolution. We will assume that you will use your private network for communication within your infrastructure.

+ **Firewall open ports**: The Puppet master must be reachable on port 8140.

Installation on CentOS
^^^^^^^^^^^^^^^^^^^^^^

Install your Yum repository, and puppet-server package, for your Enterprise Linux distribution. For example, for EL7: ::

   $ sudo rpm -ivh https://yum.puppetlabs.com/puppetlabs-release-pc1-el-7.noarch.rpm
   $ sudo yum install puppetserver


Installation on Debian
^^^^^^^^^^^^^^^^^^^^^^

To install your Puppet master on Debian/Ubuntu systems, we first need to add our distribution repository. This can be done, downloading and installing a package named ``puppetlabs-release-distribution.deb`` where "distribution" needs to be substituted by your distribution codename (e.g. wheezy, jessie, trusty, utopic). See below the commands to install the Puppet master package for a "jessie" distribution: ::

   $ wget https://apt.puppetlabs.com/puppetlabs-release-pc1-trusty.deb
   $ sudo dpkg -i puppetlabs-release-pc1-trusty.deb
   $ sudo apt-get update && apt-get install puppetserver

Memory Allocation
^^^^^^^^^^^^^^^^^

By default, Puppet Server will be configured to use 2GB of RAM. However, if you want to experiment with Puppet Server on a VM, you can safely allocate as little as 512MB of memory. To change the Puppet Server memory allocation, you can edit the init config file.

  * ``/etc/sysconfig/puppetserver`` -- RHEL
  * ``/etc/default/puppetserver`` -- Debian

Replace 2g with the amount of memory you want to allocate to Puppet Server. For example, to allocate 1GB of memory, use ``JAVA_ARGS="-Xms1g -Xmx1g"``; for 512MB, use ``JAVA_ARGS="-Xms512m -Xmx512m"``.

Configuration
^^^^^^^^^^^^^

Configure ``/etc/puppetlabs/puppet/puppet.conf`` adding the ``dns_alt_names`` line to the ``[main]`` section, and replacing ``puppet.example.com`` with your own FQDN: ::

   [main]
   dns_alt_names = puppet,puppet.example.com

.. note:: If found in the configuration file, remove the line ``templatedir=$confdir/templates``, which has been deprecated.

Then, restart your Puppet master to apply changes: ::

   $ sudo service puppetserver start

PuppetDB installation
---------------------

After configuring your Puppet master to run on Apache with Passenger, the next step is to add Puppet DB so that you can take advantage of exported resources, as well as have a central storage place for Puppet facts and catalogs.

Installation on CentOS
^^^^^^^^^^^^^^^^^^^^^^
::

   $ sudo rpm -Uvh http://yum.postgresql.org/9.4/redhat/rhel-7-x86_64/pgdg-centos94-9.4-1.noarch.rpm
   $ yum install puppetdb-terminus.noarch puppetdb postgresql94-server postgresql94 postgresql94-contrib.x86_64
   $ sudo /usr/pgsql-9.4/bin/postgresql94-setup initdb
   $ systemctl start postgresql-9.4
   $ systemctl enable postgresql-9.4

Installation on Debian
^^^^^^^^^^^^^^^^^^^^^^
::

  $ sudo echo "deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main" >> /etc/apt/sources.list.d/pgdg.list
  $ wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | \
    sudo apt-key add -
  $ sudo apt-get update
  $ apt-get install puppetdb-terminus puppetdb postgresql-9.4 postgresql-contrib-9.4

Configuration
^^^^^^^^^^^^^

The next step is to edit ``pg_hba.conf`` and modify the METHOD to ``md5`` in the next two lines

::

  /var/lib/pgsql/9.4/data/pg_hba.conf -- CentOS

::

  # IPv4 local connections:
  host    all             all             127.0.0.1/32            ``md5``
  # IPv6 local connections:
  host    all             all             ::1/128                 ``md5``

Create a PostgreSQL user and database: ::

   # su - postgres
   $ createuser -DRSP puppetdb
   $ createdb -O puppetdb puppetdb

The user is created so that it cannot create databases (-D), or roles (-R) and doesn’t have superuser privileges (-S). It’ll prompt for a password (-P). Let’s assume a password of "yourpassword"” has been used. The database is created and owned (-O) by the puppetdb user.

Test the database access and create the extension pg_trgm: ::

   # psql -h 127.0.0.1 -p 5432 -U puppetdb -W puppetdb
   Password for user puppetdb:
   psql (8.4.13)
   Type "help" for help.

   puppetdb=> CREATE EXTENSION pg_trgm;
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

Once all steps are completed, restart your Puppet master and run ``puppet agent --test``: ::

   $ puppet agent --test

Now PuppetDB is working.

Puppet agents installation
--------------------------

In this section we assume you have already installed APT and Yum Puppet repositories.

Installation on CentOS
^^^^^^^^^^^^^^^^^^^^^^
::

   $ sudo yum install puppet
   $ sudo puppet resource package puppet ensure=latest

Installation on Debian
^^^^^^^^^^^^^^^^^^^^^^
::

   $ sudo apt-get install puppet
   $ sudo apt-get update
   $ sudo puppet resource package puppet ensure=latest

Configuration
^^^^^^^^^^^^^

Add the server value to the ``[main]`` section of the node’s ``/etc/puppet/puppet.conf`` file, replacing ``puppet.example.com`` with your Puppet master’s FQDN::

   [main]
   server = puppet.example.com

Restart the Puppet service::

   $ service puppet restart

Puppet certificates
-------------------

Run Puppet agent to generate a certificate for the Puppet master to sign: ::

   $ sudo puppet agent -t

Log into to your Puppet master, and list the certificates that need approval: ::

   $ sudo puppet cert list

It should output a list with your node’s hostname.

Approve the certificate, replacing ``hostname.example.com`` with your agent node’s name: ::

   $ sudo puppet cert sign hostname.example.com

Back on the Puppet agent node, run the puppet agent again: ::

   $ sudo puppet agent -t

.. note:: Remember the Private Network DNS is a requisite for the correct certificate sign.
