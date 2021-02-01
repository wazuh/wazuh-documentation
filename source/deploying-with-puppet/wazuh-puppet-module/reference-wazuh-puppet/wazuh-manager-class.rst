.. Copyright (C) 2020 Wazuh, Inc.

.. _reference_wazuh_manager_class:

Wazuh manager class
===================

``class wazuh::manager``
------------------------


.. _ref_server_vars_alerts:

Alerts
------

$ossec_alert_level
  Sets the minimum severity level for alerts that will be stored to alerts.log and/or alerts.json.

  `Default 3`

$ossec_email_alert_level
  Threshold defining minimum severity for a rule to fire an email alert.
  Some rules circumvent this threshold (``alert_email`` option).

  `Default 12`

.. _ref_server_vars_authd:

Authd configuration variables
-----------------------------

$ossec_auth_disabled
  Toggles the execution of the Auth daemon on or off.

  `Default no`


$ossec_auth_port
  Defines the TCP port number for listening to connections.

  `Default 1515`


$ossec_auth_use_source_ip
  Toggles the use of the client’s source IP address or the use of “any” to add an agent.

  `Default yes`


$ossec_auth_force_insert
  Toggles whether or not to force the insertion of an agent if there is a duplicate name or IP address. This will remove the old agent with same name or IP address.

  `Default yes`


$ossec_auth_force_time
  When forcing to remove old agents with the same name or IP address, this options specify that the deletion will be performed only if the agent’s keepalive has more than the defined number of seconds.

  `Default 0`


$ossec_auth_purgue
  Toggles the deletion of client keys on or off when agents are removed.

  `Default yes`

$ossec_auth_use_password
  Toggles shared password authentication on or off.

  `Default no`

$ossec_auth_ciphers
  Sets the list of ciphers for network communication using SSL.

  `Default 'HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH'`

$ossec_auth_ssl_verify_host
  Toggles source host verification on and off when a CA certificate is specified. This means that the client source IP address will be validated using the Common Name field.

  `Default no`

$ossec_auth_ssl_manager_cert
  Specifies the full path to the server SSL certificate.

  `Default yes`

$ossec_auth_ssl_manager_key
  Specifies the full path to the server’s SSL key.

  `Default yes`

$ossec_auth_ssl_auto_negotiate
  Toggles whether or not to auto select the SSL/TLS method.

  `Default yes`


.. _ref_server_vars_cluster:

Cluster variables
-----------------

$ossec_cluster_name
  Specifies the name of the cluster this node belongs to.

  `Default wazuh`

$ossec_cluster_node_name
  Specifies the name of the current node of the cluster.

  `Default node01`

$ossec_cluster_node_type
  Specifies the role of the node.

  `Default master`

$ossec_cluster_key
  Defines the key used to encrypt the communication between the nodes. This key must be 32 characters long.

  `Default KEY`

$ossec_cluster_port
  Specifies the port to use for the cluster communications.

  `Default 1516`

$ossec_cluster_bind_addr
  Specifies which IP address will communicate with the cluster when the node has multiple network interfaces.

  `Default 0.0.0.0`

$ossec_cluster_nodes
  Lists all master nodes in the cluster using the `<node>` tag for each one.

  `Default ['NODE_IP']`

$ossec_cluster_hidden
  Toggles whether or not to show information about the cluster that generated an alert. If this is set to `yes`, information about the cluster that generated the event won’t be included in the alert.

  `Default no`

$ossec_cluster_disabled
  Toggles whether the cluster is enabled or not. If this value is set to `yes`, the cluster won’t start.

  `Default yes`


.. _ref_server_vars_global:

Global variables
----------------

$ossec_emailnotification
  Whether or not to send email notifications.

  `Default yes`

$ossec_emailto
    Email to address. ``['user1@mycompany.com','user2@mycompany.com']``

$ossec_smtp_server
  SMTP mail server.

$ossec_emailfrom
  Email from address.

  `Default ossec@${domain}`

$ossec_email_maxperhour
  Global Configuration with the maximum number of emails per hour.

  `Default 12`

$ossec_email_log_source
  This selects the alert file to be read from.

  `Default 'alerts.log'`

$ossec_email_idsname
  Define email ID name

  `Default undef`

$ossec_white_list
  Allow white-listing of IP addresses.

  `Default []`

$ossec_remote_connection
  Specifies a type of incoming connection to accept: secure or syslog.

  `Default secure`

$ossec_remote_port
  Specifies the port to use to listen for events.

  `Default 1514`

$ossec_remote_protocol
  Specifies the protocol to use. It is available for secure connections and syslog events.

  `Default tcp`

$ossec_remote_local_ip
  Local ip address to use to listen for connections.

  `Default undef`

$ossec_remote_queue_size
  Sets the capacity of the remote daemon queue in number of agent events.

  `Default 131072`

.. _ref_server_vars_localfile:

Localfile variables
-------------------

$ossec_local_files
  Files list for log analysis

  This files are listed in params_manager.pp in section $default_local_files


.. _ref_server_vars_rootcheck:

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
  How often the rootcheck scan will run (in seconds).

  `Default 43200`

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


.. _ref_server_vars_syscheck:

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

  `Default ['/etc/mtab','/etc/hosts.deny','/etc/mail/statistics','/etc/random-seed','/etc/random.seed','/etc/adjtime','/etc/httpd/logs','/etc/utmpx','/etc/wtmpx','/etc/cups/certs','/etc/dumpdates','/etc/svc/volatile','/sys/kernel/security','/sys/kernel/debug','/dev/core',]`

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

.. _ref_server_vars_syslog_output:

Syslog output variables
-----------------------

$syslog_output
  Allows a Wazuh manager to send the OSSEC alerts to one or more syslog servers

  `Default false`

$syslog_output_level
  The minimum level of the alerts to be forwarded.

  `Default 2`

$syslog_output_port
  The port to forward alerts to.

  `Default 514`

$syslog_output_server
  The IP Address of the syslog server.

  `Default undef`

$syslog_output_format
  Format of alert output.

  `Default undef`


.. _ref_server_vars_vuln_detector:

Vulnerability Detector variables
--------------------------------

$configure_vulnerability_detector
  Enables Vulnerability detector section render on this host.

  `Default yes`

$vulnerability_detector_enabled
  Enables the module.

  `Default no`

$vulnerability_detector_interval
  Time between vulnerabilities scans.

  `Default 5m`

$vulnerability_detector_ignore_time
  Time during which vulnerabilities that have already been alerted will be ignored.

  `Default 6h`

$vulnerability_detector_run_on_start
  Runs updates and vulnerabilities scans immediately when service is started.

  `Default yes`

$vulnerability_detector_provider_canonical
  Enables canonical as feed to update.

  `Default yes`

$vulnerability_detector_provider_canonical_enabled
  Enables updating from canonical feed.

  `Default no`

$vulnerability_detector_provider_canonical_os
  Feed to update.

  `Default ['trusty','xenial','bionic']`

$vulnerability_detector_provider_canonical_update_interval
  How often the vulnerability database is updated. It has priority over the `update_interval` option of the provider block.

  `Default 1h`

$vulnerability_detector_provider_debian
  Enables debian as feed to update.

  `Default yes`

$vulnerability_detector_provider_debian_enabled
  Enables updating from debian feed.

  `Default no`

$vulnerability_detector_provider_debian_os
  Feed to update.

  `Default ['trusty','xenial','bionic']`

$vulnerability_detector_provider_debian_update_interval
  How often the vulnerability database is updated. It has priority over the `update_interval` option of the provider block.

  `Default 1h`

$vulnerability_detector_provider_redhat
  Enables redhat as feed to update.

  `Default yes`


$vulnerability_detector_provider_redhat_enabled
  Enables updating from redhat feed.

  `Default no`

$vulnerability_detector_provider_redhat_os
  Feed to update.

  `Default []`

$vulnerability_detector_provider_redhat_update_from_year
  Year from which the provider will be updated.

  `Default 2010`

$vulnerability_detector_provider_redhat_update_interval
  How often the vulnerability database is updated. It has priority over the `update_interval` option of the provider block.

  `Default 1h`

$vulnerability_detector_provider_nvd
  Enables NVD as feed to update.

  `Default yes`

$vulnerability_detector_provider_nvd_enabled
  Enables updating from NVD feed.

  `Default no`

$vulnerability_detector_provider_nvd_os
  Feed to update.

  `Default []`

$vulnerability_detector_provider_nvd_update_from_year
  Year from which the provider will be updated.

  `Default 2010`

$vulnerability_detector_provider_nvd_update_interval
  How often the vulnerability database is updated. It has priority over the `update_interval` option of the provider block.

  `Default 1h`


.. _ref_server_vars_wazuh_api:

Wazuh API variables
-------------------

$wazuh_api_host
  IP or hostname of the Wazuh manager where the Wazuh API is running.

  `Default 0.0.0.0`

$wazuh_api_port
  Port where the Wazuh API will listen.

  `Default 55000`

$wazuh_api_behind_proxy_server
  Set this option to “yes” in case the Wazuh API is running behind a proxy server.

  `Default true`

$wazuh_api_https_enabled
  Enable or disable SSL (https) in the Wazuh API.

  `Default true`

$wazuh_api_https_key
  Path of the file with the private key.

  `Default api/configuration/ssl/server.key`

$wazuh_api_https_cert
  Path to the file with the certificate.

  `Default api/configuration/ssl/server.crt`

$wazuh_api_https_use_ca
  Whether to use a certificate from a Certificate Authority.

  `Default false`

$wazuh_api_https_ca
  Path to the certificate of the Certificate Authority (CA).

  `Default api/configuration/ssl/ca.crt`

$wazuh_api_logs_level
  Sets the verbosity level of the Wazuh API logs.

  `Default info`

$wazuh_api_logs_path
  Path where to save the Wazuh API logs.

  `Default logs/api.log`

$wazuh_api_cors_enabled
  Enable or disable the use of CORS in the Wazuh API.

  `Default false`

$wazuh_api_cors_source_route
  Sources for which the resources will be available. For example `http://client.example.org.`

  `Default "*"`

$wazuh_api_cors_expose_headers
  Which headers can be exposed as part of the response.

  `Default "*"`

$wazuh_api_cors_allow_headers
  Which HTTP headers can be used during the actual request.

  `Default "*"`

$wazuh_api_cors_allow_credentials
  Tells browsers whether to expose the response to frontend JavaScript.

  `Default false`

$wazuh_api_cache_enabled
  Enables or disables caching for certain API responses (currently, all `/rules` endpoints)

  `Default true`

$wazuh_api_cache_time
  Time in seconds that the cache lasts before expiring.

  `Default 0.75`

$wazuh_api_access_max_login_attempts
  Set a maximum number of login attempts during a specified block_time number of seconds.

  `Default 5`

$wazuh_api_access_block_time
  Established period of time (in seconds) to attempt login requests. If the established number of requests (`max_login_attempts`) is exceeded within this time limit, the IP is blocked until the end of the block time period.

  `Default 300`

$wazuh_api_access_max_request_per_minute
  Establish a maximum number of requests the Wazuh API can handle per minute (does not include authentication requests). If the number of requests for a given minute is exceeded, all incoming requests (from any user) will be blocked.

  `Default 300`

$wazuh_api_use_only_authd
  Forces the use of ossec-authd when registering and removing agents.

  `Default false`

$wazuh_api_drop_privileges
  Run wazuh-api process as ossec user

  `Default true`

$wazuh_api_experimental_features
  Enable features under development

  `Default false`


.. _ref_server_vars_wodle_openscap:

Wodle OpenSCAP variables
------------------------

$configure_wodle_openscap
  Enables Wodle OpenSCAP section render on this host.

  `Default true`

$wodle_openscap_disabled
  Disables the OpenSCAP wodle.

  `Default yes`

$wodle_openscap_timeout
  Timeout for each evaluation.

  `Default 1800`

$wodle_openscap_interval
  Interval between OpenSCAP executions.

  `Default 1d`

$wodle_openscap_scan_on_start
  Run evaluation immediately when service is started.

  `Default yes`

.. _ref_server_vars_ciscat:

Wodle CIS-CAT variables
-----------------------

$configure_wodle_cis_cat
  Enables Wodle CIS-CAT section render on this host.

  `Default true`

$wodle_ciscat_disabled
  Disables the CIS-CAT wodle.

  `Default yes`

$wodle_ciscat_timeout
  Timeout for each evaluation. In case the execution takes longer than the specified timeout, it stops.

  `Default 1800`

$wodle_ciscat_interval
  Interval between CIS-CAT executions.

  `Default 1d`

$wodle_ciscat_scan_on_start
  Run evaluation immediately when service is started.

  `Default yes`

$wodle_ciscat_java_path
  Define where Java is located. If this parameter is not set, the wodle will search for the Java location in the default environment variable `$PATH`.

  `Default 'wodles/java'`

$wodle_ciscat_ciscat_path
  Define where CIS-CAT is located.

  `Default 'wodles/ciscat'`

.. _ref_server_vars_wodle_osquery:

Wodle osquery variables
-----------------------

$configure_wodle_osquery
  Enables Wodle osquery section render on this host.

  `Default true`

$wodle_osquery_disabled
  Disable the osquery wodle.

  `Default yes`

$wodle_osquery_run_daemon
  Makes the module run osqueryd as a subprocess or lets the module monitor the results log without running Osquery.

  `Default yes`

$wodle_osquery_log_path
  Full path to the results log written by Osquery.

  `Default '/var/log/osquery/osqueryd.results.log'`

$wodle_osquery_config_path
  Path to the Osquery configuration file. This path can be relative to the folder where the Wazuh agent is running.

  `Default '/etc/osquery/osquery.conf'`

$wodle_osquery_add_labels
  Add the agent labels defined as decorators.

  `Default yes`

.. _ref_server_vars_wodle_syscollector:

Wodle Syscollector variables
----------------------------

$wodle_syscollector_disabled
  Disable the Syscollector wodle.

  `Default no`

$wodle_syscollector_interval
  Time between system scans.

  `Default 1h`

$wodle_syscollector_scan_on_start
  Run a system scan immediately when service is started.

  `Default yes`

$wodle_syscollector_hardware
  Enables the hardware scan.

  `Default yes`

$wodle_syscollector_os
  Enables the OS scan.

  `Default yes`

$wodle_syscollector_network
  Enables the network scan.

  `Default yes`

$wodle_syscollector_packages
  Enables the packages scan.

  `Default yes`

$wodle_syscollector_ports
  Enables the ports scan.

  `Default yes`

$wodle_syscollector_processes
  Enables the processes scan.

  `Default yes`

.. _ref_server_vars_misc:

Misc Variables
--------------

$server_package_version
  Modified client.pp and server.pp to accept package versions as a parameter.

  `Default installed`

$ossec_service_provider
  Set service provider to Redhat on Redhat systems.

  `Default $::ossec::params::ossec_service_provide`


$manage_repos
  Install Wazuh through Wazuh repositories.

  `Default true`

$manage_client_keys
  Manage client keys option.

  `Default true`

$local_decoder_template
  Allow to use a custom local_decoder.xml in the manager.

  `Default wazuh/local_decoder.xml.erb`

$local_rules_template
  Allow to use a custom local_rules.xml in the manager.

  `Default wazuh/local_rules.xml.erb`

$shared_agent_template
  Enable the configuration to deploy through agent.conf

  `Default wazuh/ossec_shared_agent.conf.erb`


.. _ref_server_email_alert:

``function wazuh::email_alert``
-------------------------------

$alert_email
  Email to send to.

$alert_group
  An array of rule group names.

  `Default false`

.. note::
  No email will be sent for alerts with a severity below the global ``$ossec_email_alert_level``, unless the rule has alert_email set.

.. _ref_server_command:

``function wazuh::command``
---------------------------

$command_name
  Human readable name for wazuh::activeresponse usage.

$command_executable
  Name of the executable. OSSEC comes preloaded with disable-account.sh, host-deny.sh, ipfw.sh, pf.sh, route-null.sh, firewall-drop.sh, ipfw_mac.sh, ossec-tweeter.sh, restart-wazuh.sh.

$command_expect
  `Default srcip`

$timeout_allowed
  `Default true`

.. _ref_server_ar:

``function wazuh::activeresponse``
----------------------------------

$active_response_name
  Human readable name for wazuh::activeresponse usage.

$active_response_disabled
  Toggles the active-response capability on and off.

$active_response_command
  Links the active-response to the command.

$active_response_location
  It can be set to local, server, defined-agent, all.

  `Default local`

$active_response_level
  Can take values between 0 and 16.

  `Default n/a`

$active_response_agent_id
  Specifies the ID of the agent on which to execute the active response command (used when defined-agent is set).

  `Default n/a`

$active_response_rules_id
  List of rule IDs.

  `Default []`

$active_response_timeout
  Usually active response blocks for a certain amount of time.

  `Default undef`

$active_response_repeated_offenders
  A comma separated list of increasing timeouts in minutes for repeat offenders. There can be a maximum of 5 entries.

  `Default empty`

.. _ref_server_addlog:

``function wazuh::addlog``
--------------------------

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
