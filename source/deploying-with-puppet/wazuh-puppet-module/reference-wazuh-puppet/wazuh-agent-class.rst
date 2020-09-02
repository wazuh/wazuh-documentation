.. Copyright (C) 2020 Wazuh, Inc.

.. _reference_wazuh_agent_class:

Wazuh agent class
=================


Client variables
----------------

$wazuh_reporting_endpoint
  Specifies the IP address or the hostname of the Wazuh manager to report.

$wazuh_register_endpoint
  Specifies the IP address or the hostname of the Wazuh manager to register against.

$ossec_port
  Specifies the port to send events to on the manager. This must match the associated listening port configured on the Wazuh manager.

  `Default 1514`

$ossec_protocol
  Specifies the protocol to use when connecting to the manager.

  `Default tcp`

$wazuh_max_retries
  Number of connection retries.

  `Default 5`

$wazuh_retry_interval
  Time interval between connection attempts (seconds).

  `Default 5`

$ossec_notify_time
  Specifies the time in seconds between agent checkins to the manager.

  `Default 10`

$ossec_time_reconnect
  Specifies the time in seconds before a reconnection is attempted. This should be set to a higher number than the `notify_time` parameter.

  `Default 60`

$ossec_auto_restart
  Toggles on and off the automatic restart of agents when a new valid configuration is received from the manager.

  `Default yes`

$ossec_crypto_method
  Choose the encryption of the messages that the agent sends to the manager.

  `Default aes`


Client buffer Variables
-----------------------

$client_buffer_queue_size
  Sets the capacity of the agent buffer in number of events.

  `Default 5000`

$client_buffer_events_per_second
  Specifies the number of events that can be sent to the manager per second.

  `Default 500`


Rootcheck variables
-------------------

$configure_rootcheck
  Enables rootcheck section render on this host.

  `Default true`

$ossec_rootcheck_disabled
  Disable rootcheck on this host (Linux).

  `Default no`

$ossec_rootcheck_check_files
  Enable rootcheck checkfiles option.

  `Default yes`

$ossec_rootcheck_check_trojans
  Enable rootcheck checktrojans option.

  `Default yes`

$ossec_rootcheck_check_dev
  Enable rootcheck checkdev option.

  `Default yes`

$ossec_rootcheck_check_sys
  Enable rootcheck checksys option.

  `Default yes`

$ossec_rootcheck_check_pids
  Enable rootcheck checkpids option.

  `Default yes`

$ossec_rootcheck_check_ports
  Enable rootcheck checkports option.

  `Default yes`

$ossec_rootcheck_check_if
  Enable rootcheck checkif option.

  `Default yes`

$ossec_rootcheck_frequency
  Frequency that the rootcheck is going to be executed (in seconds).

  `Default 36000`

$ossec_rootcheck_ignore_list
  List of files or directories to be ignored. These files and directories will be ignored during scans.

  `Default []`

$ossec_rootcheck_rootkit_files
  Change the location of the rootkit files database.

  `Default '/var/ossec/etc/shared/rootkit_files.txt'`

$ossec_rootcheck_rootkit_trojans
  Change the location of the rootkit trojans database.

  `Default '/var/ossec/etc/shared/rootkit_trojans.txt'`

$ossec_rootcheck_skip_nfs
  Enable or disable the scanning of network mounted filesystems (Works on Linux and FreeBSD). Currently, skip_nfs will exclude checking files on CIFS or NFS mounts.

  `Default yes`

$ossec_rootcheck_system_audit
  Specifies the path to an audit definition file for Unix-like systems.

  `Default []`

$ossec_rootcheck_windows_disabled
  Disables rootcheck if host has Windows OS.

  `Default no`

$ossec_rootcheck_windows_windows_apps
  Specifies the path to a Windows application definition file.

  `Default './shared/win_applications_rcl.txt'`

$ossec_rootcheck_windows_windows_malware
  Specifies the path to a Windows malware definitions file.

  `Default './shared/win_malware_rcl.txt'`


SCA variables
------------------

$configure_sca
  Enables sca section render on this host.

  `Default true`

$sca_amazon_enabled
  Enable SCA on this host (Amazon Linux 2).

  `Default yes`

$sca_amazon_scan_on_start
  The SCA module will perform the scan immediately when started (Amazon Linux 2).

  `Default yes`

$sca_amazon_interval
  Interval between module executions.

  `Default 12h`

$sca_amazon_skip_nfs
  Enable or disable the scanning of network mounted filesystems (Works on Linux and FreeBSD). Currently, `skip_nfs` will exclude checking files on CIFS or NFS mounts.

  `Default yes`

$sca_amazon_policies
  In this section it can be included a list of policy files to run assessments.

  `Default []`

Syscheck variables
------------------

$configure_syscheck
  Enables syscheck section render on this host.

  `Default true`

$ossec_syscheck_disabled
  Disable syscheck on this host.

  `Default no`

$ossec_syscheck_frequency
  Enables syscheck section render on this host.

  `Default true`

$ossec_syscheck_scan_on_start
  Specifies if syscheck scans immediately when started.

  `Default yes`

$ossec_syscheck_auto_ignore
  Specifies whether or not syscheck will ignore files that change too many times (manager only).

  `Default undef`

$ossec_syscheck_directories_1
  List of directories to be monitored. The directories should be comma-separated

  `Default '/etc,/usr/bin,/usr/sbin'`

$ossec_syscheck_realtime_directories_1
  This will enable real-time/continuous monitoring on directories listed on `ossec_syscheck_directories_1`. Real time only works with directories, not individual files.

  `Default no`

$ossec_syscheck_whodata_directories_1
  This will enable who-data monitoring on directories listed on `ossec_syscheck_directories_1`.

  `Default no`

$ossec_syscheck_report_changes_directories_1
  Report file changes. This is limited to text files at this time.

  `Default no`

$ossec_syscheck_directories_2
  List of directories to be monitored. The directories should be comma-separated

  `Default '/etc,/usr/bin,/usr/sbin'`

$ossec_syscheck_realtime_directories_2
  This will enable real-time/continuous monitoring on directories listed on `ossec_syscheck_directories_2`. Real time only works with directories, not individual files.

  `Default no`

$ossec_syscheck_whodata_directories_2
  This will enable who-data monitoring on directories listed on `ossec_syscheck_directories_2`.

  `Default no`

$ossec_syscheck_report_changes_directories_2
  Report file changes. This is limited to text files at this time.

  `Default no`

$ossec_syscheck_ignore_list
  List of files or directories to be ignored. Ignored files and directories are still scanned, but the results are not reported.

  `Default ['/etc/mtab',          `
  `     '/etc/hosts.deny',        `
  `     '/etc/mail/statistics',   `
  `     '/etc/random-seed',       `
  `     '/etc/random.seed',       `
  `     '/etc/adjtime',           `
  `     '/etc/httpd/logs',        `
  `     '/etc/utmpx',             `
  `     '/etc/wtmpx',             `
  `     '/etc/cups/certs',        `
  `     '/etc/dumpdates',         `
  `     '/etc/svc/volatile',      `
  `     '/sys/kernel/security',   `
  `     '/sys/kernel/debug',      `
  `     '/dev/core',              `
  `   ]                           `



$ossec_syscheck_ignore_type_1
  Simple regex pattern to filter out files.

  `Default '^/proc'`


$ossec_syscheck_ignore_type_2
  Another simple regex pattern to filter out files.

  `Default '.log$|.swp$'`


$ossec_syscheck_max_eps
  Sets the maximum event reporting throughput. Events are messages that will produce an alert.

  `Default 100`

$ossec_syscheck_process_priority
  Sets the nice value for Syscheck process.

  `Default 10`

$ossec_syscheck_synchronization_enabled
  Specifies whether there will be periodic inventory synchronizations or not.

  `Default yes`

$ossec_syscheck_synchronization_interval
  Specifies the initial number of seconds between every inventory synchronization. If synchronization fails the value will be duplicated until it reaches the value of `max_interval`.

  `Default 5m`

$ossec_syscheck_synchronization_max_eps
  Sets the maximum synchronization message throughput.

  `Default 10`

$ossec_syscheck_synchronization_max_interval
  Specifies the maximum number of seconds between every inventory synchronization.

  `Default 1h`

$ossec_syscheck_skip_nfs
  Specifies if syscheck should scan network mounted filesystems. This option works on Linux and FreeBSD systems. Currently, `skip_nfs` will exclude checking files on CIFS or NFS mounts.

  `Default yes`






$ossec_emailnotification
  Whether to send email notifications or not.

  `Default yes`

$ossec_ignorepaths
  Files/Directory list to ignore

  `Default []`

$ossec_local_files
  Files list for log analysis

  This files are listed in params.pp in section $default_local_files


$ossec_prefilter
  Command used to prevent prelinking from creating false positives.

  This option can potentially impact performance negatively. The configured command will be run for each and every file checked.

  `Default false`

$ossec_service_provider
  This option associate Operative System Family

$ossec_config_profiles
  Specify the agent.conf profile(s) to be used by the agent.

  `Default []`

$selinux
  Whether to install a SELinux policy to allow rotation of OSSEC logs.

  `Default false`

$agent_name
  Configure agent host name of the system

  `Default $::hostname`

$agent_ip_address
  Configure agent IPv4 address for the default network interface.

  `Default $::ipaddress`

$manage_repo
  Install Wazuh through Wazuh repositories.

  `Default true`

$agent_package_name
  Define package name defined in params.pp

$agent_package_version
  Define package version

  `Default installed`

$agent_service_name
  Define service name defined in params.pps

$manage_client_keys
  Manage client keys option.

  `Default export`

$agent_auth_password
  Define password for agent-auth

  `Default undef`

$ar_repeated_offenders
  A comma separated list of increasing timeouts in minutes for repeat offenders.

  There can be a maximum of 5 entries.

  `Default empty`

$enable_wodle_openscap
  Enable openscap configuration in ossec.conf

  `Default false`

$wodle_openscap_content
  Depending linux distribution assign profile xccdf.

$ossec_conf_template
  Path of ossec configuration agent template.

  `Default wazuh/wazuh_agent.conf.erb`

.. _ref_agent_addlog:


function wazuh::addlog
----------------------

$log_name
  Configure Wazuh log name

$agent_log
  Path to log file.

  `Default false`

$logfile
  Path to log file.

$logtype
  The OSSEC log_format of the file.

  `Default syslog`
