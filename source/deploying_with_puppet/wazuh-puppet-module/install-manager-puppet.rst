.. _install_manager_puppet:

Install manager via Puppet
==============================

The manager is configured by installing the ``ossec::server`` class, and optionally using:

 - ``ossec::command``: to define active response command (like ``firewall-drop.sh``).
 - ``ossec::activeresponse``: to link rules to active response commands.
 - ``ossec::addlog``: to define additional log files to monitor.


Here is an example of a manifest ``ossec.pp``:

Wazuh manager: ::


  node "server.yourhost.com" {
     class { 'ossec::server':
       mailserver_ip => 'localhost',
       ossec_emailto => ['user@mycompany.com'],
       use_mysql => true,
       mysql_hostname => '127.0.0.1',
       mysql_name => 'ossec',
       mysql_password => 'yourpassword',
       mysql_username  => 'ossec',
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

    class { '::mysql::server':
      root_password           => 'yourpassword',
      remove_default_accounts => true,
    }

    mysql::db { 'ossec':
      user     => 'ossec',
      password => 'yourpassword',
      host     => 'localhost',
      grant    => ['ALL'],
      sql      => '/var/ossec/contrib/sqlschema/mysql.schema'
    }
  }
