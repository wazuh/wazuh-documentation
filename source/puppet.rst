Deploy Ossec with Puppet
========================

Prerequisites
-------------

Before we get started with installing Puppet, ensure that you have the following prerequisites:

**Private Network DNS**: Forward and reverse DNS must be configured, and every server must have a unique hostname. If you do not have DNS confegured, you must use your hosts file for name resolution. We will assume that you will use your private network for communication within your infrastructure.

**Firewall Open Ports**: The Puppet master must be reachable on port 8140.


Install Puppet
--------------

For **Debian** and **Ubuntu** version:
**************************************

The newest versions of Puppet can be installed from the apt.puppetlabs.com package repository.

To enable the repository:

Download the “puppetlabs-release” package for your OS version.

You can see a full list of these packages on the front page of https://apt.puppetlabs.com/. 

For example, to enable the repository for Ubuntu 12.04 Precise Pangolin::

   wget https://apt.puppetlabs.com/puppetlabs-release-precise.deb
   sudo dpkg -i puppetlabs-release-precise.deb
   sudo apt-get update

To enable the repository for Ubuntu 14.04 Trusty Tahr::

   wget https://apt.puppetlabs.com/puppetlabs-release-trusty.deb
   sudo dpkg -i puppetlabs-release-trusty.deb
   sudo apt-get update


On your puppet master node, run one of the following::

   $ sudo apt-get install puppetmaster-passenger

We recommend this one, as it will save you a step in the post-install tasks. It will install Puppet and its prerequisites, and automatically configure a production-capacity web server::

   $ sudo apt-get install puppetmaster

This will install Puppet, its prerequisites, and an init script (/etc/init.d/puppetmaster) for running a test-quality puppet master server.

To upgrade to the latest version of Puppet, you can run::

   $ sudo apt-get update
   $ sudo puppet resource package puppetmaster ensure=latest

Update /etc/puppet/puppet.conf and add the dns_alt_names line to the section [main], replacing puppet.example.com with your own FQDN:

   [main]
   dns_alt_names = puppet,puppet.example.com

.. note:: Also remove the line **templatedir=$confdir/templates**, which has been deprecated.

Start the puppet master::

   $ sudo service puppetmaster start

For different operating system can follow the instrucctions at http://docs.puppetlabs.com/guides/install_puppet/pre_install.html


For **Centos** and **RedHat** version:
**************************************

The newest versions of Puppet can be installed from the yum.puppetlabs.com package repository.

Enterprise Linux 7::

   $ sudo rpm -ivh https://yum.puppetlabs.com/puppetlabs-release-pc1-el-7.noarch.rpm

Enterprise Linux 6::

  $ $ sudo rpm -ivh https://yum.puppetlabs.com/puppetlabs-release-pc1-el-6.noarch.rpm

On your puppet master node(s), run::

   $ sudo yum install puppet-server

This will install Puppet and an init script (/etc/init.d/puppetmaster) for running a test-quality puppet master server.

To upgrade to the latest version of Puppet, you can run::

   $ sudo puppet resource package puppet-server ensure=latest

Update /etc/puppet/puppet.conf and add the dns_alt_names line to the section [main], replacing puppet.example.com with your own FQDN:

   [main]
   dns_alt_names = puppet,puppet.example.com

.. note:: Also remove the line **templatedir=$confdir/templates**, which has been deprecated.

Start the puppet master::

   $ sudo service puppetmaster start

For different operating system can follow the instrucctions at http://docs.puppetlabs.com/guides/install_puppet/pre_install.html

Install PuppetDB
----------------

After configuring my puppetmaster to run on Passenger on Apache, the next step was to add Puppet DB so that I could take advantage of exported resources, as well as have a central store of facts/catalogs that i could query.

Whilst you can use the embedded HSQLDB database, I opted for the scale-out offered by a backend PostgreSQL database (which is recommended by Puppet Labs for deployments of more than 100 nodes). MySQL is not supported, as it doesn’t support recursive queries.

To install in Ubuntu & Debian
*****************************
::

   $ sudo apt-get update
   $ apt-get install postgresql puppetdb puppetdb-terminus

To install in Centos & RedHat
*****************************
::

   $ yum install postgresql-server puppetdb puppetdb-terminus

Common configuration
********************

Next, I created a PostgreSQL user and database::

   # su - postgres
   $ createuser -DRSP puppetdb
   $ createdb -O puppetdb puppetdb

The user is created so that it cannot create databases (-D), or roles (-R) and doesn’t have superuser privileges (-S) – it’ll prompt for a password (-P). Let’s assume a password of "yourpassword"” has been used. The database is created and owned (-O) by the puppetdb user.

Access to the database can then be tested::

   # psql -h 127.0.0.1 -p 5432 -U puppetdb -W puppetdb
   Password for user puppetdb: 
   psql (8.4.13)
   Type "help" for help.
 
   puppetdb=> \q

Configure /etc/puppetdb/conf.d/database.ini as appropriate::

   [database]
   classname = org.postgresql.Driver
   subprotocol = postgresql
   subname = //127.0.0.1:5432/puppetdb
   username = puppetdb
   password = yourpassword
   log-slow-statements = 10

Create /etc/puppet/puppetdb.conf::

   [main]
   server = puppet.wazuh.com
   port = 8081

Create /etc/puppet/routes.yaml::

   ---
   master:
     facts:
       terminus: puppetdb
       cache: yaml

Finally, update /etc/puppet/puppet.conf::

   [master]
    storeconfigs = true
    storeconfigs_backend = puppetdb

Once all steps are complete, restart your puppetmaster and run **puppet agent --test** from once of your nodes (or wait for your scheduled runs)::

   # puppet agent --test

Now PuppetDB is working.

Install and configure Puppet Agents
-----------------------------------

First you need to add the respository descrive in the `Install Puppet`_ section

For **Debian** and **Ubuntu** version:
**************************************

Install Puppet on Agent Nodes::

   $ sudo apt-get install puppet

Upgrading::

   $ sudo apt-get update
   $ sudo puppet resource package puppet ensure=latest

Add the server value to the [main] section of the node’s puppet.conf file, replacing puppet.example.com with your Puppet master’s FQDN::

   [main]
   server = puppet.example.com

Restart the Puppet service::

   $ sudo service puppet restart

For **Centos** and **RedHat** version:
**************************************

Install Puppet on Agent Nodes::

   $ sudo yum install puppet

Upgrading::

   $ sudo puppet resource package puppet ensure=latest

Add the server value to the [main] section of the node’s puppet.conf file, replacing puppet.example.com with your Puppet master’s FQDN::

   [main]
   server = puppet.example.com

Restart the Puppet service::

   systemctl start puppet

Generate and Sign Certificates
******************************

Run the puppet agent to generate a certificate for the puppet master to sign::

   $ sudo puppet agent -t

Log into to your **Puppet master** and list the certifications that need approval::

   $ sudo puppet cert list 

It should output a list with your node’s hostname.

Approve the certificate, replacing **hostname.example.com** with your node’s name::

   $ sudo puppet cert sign hostname.example.com

Back on the puppet node, run the puppet agent again::

   $ sudo puppet agent -t

And now the catalog need to be finished.

.. warning:: Remember the Private Network DNS is a requisite for the correct certificate sign.

Install Ossec module
--------------------



Deploy Ossec
------------


