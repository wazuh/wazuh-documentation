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
   $ sudo yum install puppet-server

Now upgrade to the latest Puppet version:

   $ sudo puppet resource package puppet-server ensure=latest

Installation on Debian
^^^^^^^^^^^^^^^^^^^^^^

To install your Puppet master on Debian/Ubuntu systems, we need first to add our distribution repository. This can be done, downloading and installing a package named ``puppetlabs-release-distribution.deb`` where "distribution" needs to be substituted by your distribution codename (e.g. wheezy, jessie, trusty, utopic). See below the commands to install Puppet master package for a "jessie" distribution: :: 

   $ wget https://apt.puppetlabs.com/puppetlabs-release-jessie.deb
   $ sudo dpkg -i puppetlabs-release-jessie.deb
   $ sudo apt-get update
   $ sudo apt-get install puppetmaster-passenger
   $ sudo apt-get install puppetmaster

This will install Puppet, its prerequisites, and an init script at ``/etc/init.d/puppetmaster``. As well, to upgrade to the latest version of Puppet, you can run: ::

   $ sudo apt-get update
   $ sudo puppet resource package puppetmaster ensure=latest

Configuration
^^^^^^^^^^^^^

Configure ``/etc/puppet/puppet.conf`` adding the ``dns_alt_names`` line to the ``[main]`` section, and replacing ``puppet.example.com`` with your own FQDN: ::

   [main]
   dns_alt_names = puppet,puppet.example.com

.. note:: If found in the configuration file, remove the line ``templatedir=$confdir/templates``, which has been deprecated.

Then, restart your Puppet master to apply changes: ::

   $ sudo service puppetmaster start

PuppetDB installation
---------------------

After configuring your Puppet master to run on Apache with Passenger, the next step is to add Puppet DB so that you can take advantage of exported resources, as well as have a central storage place for Puppet facts and catalogs.

Installation on CentOS
^^^^^^^^^^^^^^^^^^^^^^
::

   $ yum install postgresql-server puppetdb puppetdb-terminus

Installation on Debian
^^^^^^^^^^^^^^^^^^^^^^
::

   $ sudo apt-get update
   $ apt-get install postgresql puppetdb puppetdb-terminus

Configuration
^^^^^^^^^^^^^

Create a PostgreSQL user and database: ::

   # su - postgres
   $ createuser -DRSP puppetdb
   $ createdb -O puppetdb puppetdb

The user is created so that it cannot create databases (-D), or roles (-R) and doesn’t have superuser privileges (-S). It’ll prompt for a password (-P). Let’s assume a password of "yourpassword"” has been used. The database is created and owned (-O) by the puppetdb user.

Test database access: ::

   # psql -h 127.0.0.1 -p 5432 -U puppetdb -W puppetdb
   Password for user puppetdb: 
   psql (8.4.13)
   Type "help" for help.
 
   puppetdb=> \q

Configure ``/etc/puppetdb/conf.d/database.ini``: ::

   [database]
   classname = org.postgresql.Driver
   subprotocol = postgresql
   subname = //127.0.0.1:5432/puppetdb
   username = puppetdb
   password = yourpassword
   log-slow-statements = 10

Create ``/etc/puppet/puppetdb.conf``: ::

   [main]
   server = puppet.wazuh.com
   port = 8081

Create ``/etc/puppet/routes.yaml``: ::

   ---
   master:
     facts:
       terminus: puppetdb
       cache: yaml

Finally, update ``/etc/puppet/puppet.conf``: ::

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
     mailserver_ip => 'mailserver.mycompany.com',
     ossec_emailto => 'user@mycompany.com',
   }

   ossec::command { 'firewallblock':
     command_name       => 'firewall-drop',
     command_executable => 'firewall-drop.sh',
     command_expect     => 'srcip'
   }

   ossec::activeresponse { 'blockWebattack':
      command_name => 'firewall-drop',
      ar_level     => 9,
      ar_rules_id  => [31153,31151]
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
     ossec_emailto => 'jose@wazuh.com',
   }

   ossec::command { 'firewallblock':
     command_name       => 'firewall-drop',
     command_executable => 'firewall-drop.sh',
     command_expect     => 'srcip'
   }

   ossec::activeresponse { 'blockWebattack':
     command_name => 'firewall-drop',
     ar_level     => 9,
     ar_rules_id  => [31153,31151]
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
 - ``$manage_repo`` (default: ``true``): Install Ossec through Wazuh repositories.
 - ``manage_epel_repo`` (default: ``true``): Install epel repo and inotify-tools
 - ``$ossec_scanpaths`` (default: ``[]``): Agents can be Linux or Windows for this reason don't have ``ossec_scanpaths`` by default.

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

