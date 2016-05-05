.. _ossec_puppet:

OSSEC deployment with Puppet
============================

Puppet master installation
--------------------------

Before we get started with Puppet, check the following network requirements:

- Private network DNS: Forward and reverse DNS must be configured, and every server must have a unique hostname. If you do not have DNS configured, you must use your hosts file for name resolution. We will assume that you will use your private network for communication within your infrastructure.

+ Firewall open ports: The Puppet master must be reachable on port 8140.

Installation on CentOS
^^^^^^^^^^^^^^^^^^^^^^

Install your Yum repository, and puppet-server package, for your Enterprise Linux distribution. For example, for EL7: ::

   $ sudo rpm -ivh https://yum.puppetlabs.com/puppetlabs-release-pc1-el-7.noarch.rpm
   $ sudo yum install puppetserver


Installation on Debian
^^^^^^^^^^^^^^^^^^^^^^

To install your Puppet master on Debian/Ubuntu systems, we need first to add our distribution repository. This can be done, downloading and installing a package named ``puppetlabs-release-distribution.deb`` where "distribution" needs to be substituted by your distribution codename (e.g. wheezy, jessie, trusty, utopic). See below the commands to install Puppet master package for a "jessie" distribution: :: 

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

   $ sudo service puppeserver start

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

The next step edit ``pg_hba.conf`` and modify the METHOD to ``md5`` in the next two lines

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

Test database access and create extension pg_trgm: ::

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

Once all steps are complete, restart your Puppet master and run ``puppet agent --test``: ::

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

Log into to your Puppet master, and list the certifications that need approval: ::

   $ sudo puppet cert list 

It should output a list with your node’s hostname.

Approve the certificate, replacing ``hostname.example.com`` with your agent node’s name: ::

   $ sudo puppet cert sign hostname.example.com

Back on the Puppet agent node, run the puppet agent again: ::

   $ sudo puppet agent -t

.. note:: Remember the Private Network DNS is a requisite for the correct certificate sign.

OSSEC Puppet module
-------------------

.. note:: This Puppet module has been authored by Nicolas Zin, and updated by Jonathan Gazeley and Michael Porter. Wazuh has forked it with the purpose of maintaing it. Thank you to the authors for the contribution.

Download and install OSSEC module from Puppet Forge: ::

   $ sudo puppet module install wazuh-ossec
   Notice: Preparing to install into /etc/puppet/modules ...
   Notice: Downloading from https://forgeapi.puppetlabs.com ...
   Notice: Installing -- do not interrupt ...
   /etc/puppet/modules
   └─┬ wazuh-ossec (v2.0.1)
     ├── jfryman-selinux (v0.2.5)
     ├── puppetlabs-apt (v2.2.0)
     ├── puppetlabs-concat (v1.2.4)
     ├── puppetlabs-stdlib (v4.9.0)
     └── stahnma-epel (v1.1.1)

This module installs and configures OSSEC HIDS agent and manager.

The manager is configured by installing the ``ossec::server`` class, and using optionally:

 - ``ossec::command``: to define active/response command (like ``firewall-drop.sh``).
 - ``ossec::activeresponse``: to link rules to active/response commands.
 - ``ossec::addlog``: to define additional log files to monitor.

Usage
^^^^^

OSSEC manager: ::

   class { 'ossec::server':
     mailserver_ip => 'localhost',
     ossec_emailto => ['user@mycompany.com']
   }

   ossec::command { 'firewallblock':
     command_name       => 'firewall-drop',
     command_executable => 'firewall-drop.sh',
     command_expect     => 'srcip'
   }

   ossec::activeresponse { 'blockWebattack':
      command_name => 'firewall-drop',
      ar_level     => 9,
      ar_rules_id  => [31153,31151],
      ar_repeated_offenders => '30,60,120'
   }

   ossec::addlog { 'monitorLogFile':
     logfile => '/var/log/secure',
     logtype => 'syslog'
   }


OSSEC agent: ::

   class { "ossec::client":
     ossec_server_ip => "10.10.130.66"
   }


Example
^^^^^^^

Here is an example of a manifest ``ossec.pp``: 

OSSEC manager: ::

   node "server.yourhost.com" {

   class { 'ossec::server':
     mailserver_ip => 'smtp.gmail.com',
     ossec_emailto => ['jose@wazuh.com']
   }

   ossec::command { 'firewallblock':
     command_name       => 'firewall-drop',
     command_executable => 'firewall-drop.sh',
     command_expect     => 'srcip'
   }

   ossec::activeresponse { 'blockWebattack':
     command_name => 'firewall-drop',
     ar_level     => 9,
     ar_rules_id  => [31153,31151],
     ar_repeated_offenders => '30,60,120'
   }

   ossec::addlog { 'monitorLogFile':
     logfile => '/var/log/secure',
     logtype => 'syslog'
   }
   }

OSSEC agent: ::

   node "client.yourhost.com" {

   class { "ossec::client":
     ossec_server_ip => "192.168.209.166"
   }

   }   

Reference
^^^^^^^^^

OSSEC manager class
"""""""""""""""""""

class ossec::server
 - ``$mailserver_ip``: SMTP mail server.
 - ``$ossec_emailfrom`` (default: ``ossec@${domain}``: Email "from".
 - ``$ossec_emailto``: Email "to". ``['user1@mycompany.com','user2@mycompany.com']``
 - ``$ossec_active_response`` (default: ``true``): Enable/disable active-response (both on manager and agent).
 - ``$ossec_global_host_information_level`` (default: 8): Alerting level for the events generated by the host change monitor (from 0 to 16).
 - ``$ossec_global_stat_level`` (default: 8): Alerting level for the events generated by the statistical analysis (from 0 to 16).
 - ``$ossec_email_alert_level`` (default: 7): It correspond to a threshold (from 0 to 156 to sort alert send by email. Some alerts circumvent this threshold (when they have ``alert_email`` option).
 - ``$ossec_emailnotification`` (default: yes): Whether to send email notifications.
 - ``$manage_repo`` (default: ``true``): Install Ossec through Wazuh repositories.
 - ``manage_epel_repo`` (default: ``true``): Install epel repo and inotify-tools
 - ``$manage_paths`` (default: ``[ {'path' => '/etc,/usr/bin,/usr/sbin', 'report_changes' => 'no', 'realtime' => 'no'}, {'path' => '/bin,/sbin', 'report_changes' => 'yes', 'realtime' => 'yes'} ]``): Follow the instructions bellow.
 - ``$ossec_white_list``: Allow white listing of IP addresses.
 - ``$manage_client_keys``: (default: ``true``): Manage client keys option.
 - ``use_mysql``: (default: ``false``). Set to ``true`` to enable database integration for alerts and other outputs.
 - ``mariadb``: (default: ``false``). Set to ``true`` to enable to use mariadb instead of mysql.
 - ``mysql_hostname``: MySQL hostname.
 - ``mysql_name``: MySQL Database name.
 - ``mysql_password``: MySQL password.
 - ``mysql_username``: MySQL username.
 - ``ossec_extra_rules_config``: To use it, after enabling the Wazuh ruleset (either manually or via the automated script), take a look at the changes made to the ossec.conf file. You will need to put these same changes into the "$ossec_extra_rules_config" array parameter when calling the ossec::server class.
 - ``ossec_email_maxperhour``: (default: ``12``): Global Configuration with a larger maximum emails per hour
 - ``ossec_email_idsname``: (default: ``undef``) 



Consequently, if you add or remove any of the Wazuh rules later on, you'll need to ensure to add/remove the appropriate bits in the "$ossec_extra_rules_config" array parameter as well.

function ossec::email_alert
 - ``$alert_email``: Email to send to.
 - ``$alert_group``: (default: ``false``): Array of name of rules group.

.. note:: No email will be send below the global ``$ossec_email_alert_level``.

function ossec::command
 - ``$command_name``: Human readable name for ``ossec::activeresponse`` usage.
 - ``$command_executable``: Name of the executable. OSSEC comes preloaded with ``disable-account.sh``, ``host-deny.sh``, ``ipfw.sh``, ``pf.sh``, ``route-null.sh``, ``firewall-drop.sh``, ``ipfw_mac.sh``, ``ossec-tweeter.sh``, ``restart-ossec.sh``.
 - ``$command_expect`` (default: ``srcip``).
 - ``$timeout_allowed`` (default: ``true``).

function ossec::activeresponse
 - ``$command_name``.
 - ``$ar_location`` (default: ``local``): It can be set to ``local``,``server``,``defined-agent``,``all``.
 - ``$ar_level`` (default: 7): Can take values between 0 and 16.
 - ``$ar_rules_id`` (default: ``[]``): List of rules ID.
 - ``$ar_timeout`` (default: 300): Usually active reponse blocks for a certain amount of time.
 - ``$ar_repeated_offenders`` (default: empty): A comma separated list of increasing timeouts in minutes for repeat offenders. There can be a maximum of 5 entries.
function ossec::addlog
 - ``$log_name``.
 - ``$logfile`` /path/to/log/file.
 - ``$logtype`` (default: syslog): The OSSEC ``log_format`` of the file. 

OSSEC agent class
"""""""""""""""""

 - ``$ossec_server_ip``: IP of the server.
 - ``$ossec_server_hostname``: Hostname of the server.
 - ``$ossec_active_response`` (default: ``true``): Allows active response on this host.
 - ``$ossec_emailnotification`` (default: ``yes``): Whether to send email notifications or not.
 - ``$selinux`` (default: ``false``): Whether to install a SELinux policy to allow rotation of OSSEC logs.
 - ``agent_name`` (default: ``$::hostname``)
 - ``agent_ip_address`` (default: ``$::ipaddress``)
 - ``$manage_repo`` (default: ``true``): Install Ossec through Wazuh repositories.
 - ``manage_epel_repo`` (default: ``true``): Install epel repo and inotify-tools
 - ``$ossec_scanpaths`` (default: ``[]``): Agents can be Linux or Windows for this reason don't have ``ossec_scanpaths`` by default.
 - ``$manage_client_keys``: (default: ``true``): Manage client keys option.

ossec_scanpaths configuration
"""""""""""""""""""""""""""""

Leaving this unconfigured will result on OSSEC using the module defaults. By default, it will monitor /etc, /usr/bin, /usr/sbin, /bin and /sbin on Ossec Server, with real time monitoring disabled and report_changes enabled.

To overwrite the defaults or add in new paths to scan, you can use hiera to overwrite the defaults.

To tell OSSEC to enable real time monitoring of the default paths:

ossec::server::ossec_scanpaths:
  - path: /etc
    report_changes: 'no'
    realtime: 'no'
  - path: /usr/bin
    report_changes: 'no'
    realtime: 'no'
  - path: /usr/sbin
    report_changes: 'no'
    realtime: 'no'
  - path: /bin
    report_changes: 'yes'
    realtime: 'yes'
  - path: /sbin
    report_changes: 'yes'
    realtime: 'yes'

**Note: Configuring the ossec_scanpaths variable will overwrite the defaults. i.e. if you want to add a new directory to monitor, you must also add the above default paths to be monitored.**

