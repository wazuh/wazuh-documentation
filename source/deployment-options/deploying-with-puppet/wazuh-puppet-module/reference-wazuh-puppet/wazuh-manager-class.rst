.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the Wazuh manager class and its variables to configure the Wazuh manager in this section of the Wazuh documentation. 

.. _reference_wazuh_manager_class:

Wazuh manager class
===================

``class wazuh::manager``
------------------------

This contains variables that can be used to configure the Wazuh manager.

.. _ref_server_vars_alerts:

Alerts
------

$ossec_alert_level
  Sets the minimum severity level for alerts that will be stored in alerts.log and/or alerts.json.

  `Default 3`

  `Type Integer`

$ossec_email_alert_level
  Threshold defining minimum severity for a rule to fire an email alert. Some rules circumvent this threshold (``alert_email`` option).

  `Default 12`

  `Type Integer`

.. _ref_server_vars_authd:

Authd configuration variables
-----------------------------

$ossec_auth_disabled
  Toggles the execution of the Auth daemon on or off.

  `Default no`

  `Type String`

$ossec_auth_port
  Defines the TCP port number for listening to connections.

  `Default 1515`

  `Type Integer`

$ossec_auth_use_source_ip
  Toggles the use of the client’s source IP address or the use of “any” to add an agent.

  `Default yes`

  `Type String`

$ossec_auth_purgue
  Toggles the deletion of client keys on or off when agents are removed.

  `Default yes`

  `Type String`

$ossec_auth_use_password
  Toggles shared password authentication on or off.

  `Default no`

  `Type String`

$ossec_auth_ciphers
  Sets the list of ciphers for network communication using SSL.

  `Default 'HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH'`

  `Type String`

$ossec_auth_ssl_verify_host
  Toggles source host verification on and off when a CA certificate is specified. This means that the client source IP address will be validated using the Common Name field.

  `Default no`

  `Type String`

$ossec_auth_ssl_manager_cert
  Specifies the full path to the server SSL certificate.

  `Default /var/ossec/etc/sslmanager.cert`

  `Type String`

$ossec_auth_ssl_manager_key
  Specifies the full path to the server’s SSL key.

  `Default /var/ossec/etc/sslmanager.key`

  `Type String`

$ossec_auth_ssl_auto_negotiate
  Toggles whether or not to auto select the SSL/TLS method.

  `Default yes`

  `Type String`


.. _ref_server_vars_cluster:

Cluster variables
-----------------

$ossec_cluster_name
  Specifies the name of the cluster this node belongs to.

  `Default wazuh`

  `Type String`

$ossec_cluster_node_name
  Specifies the name of the current node of the cluster.

  `Default node01`

  `Type String`

$ossec_cluster_node_type
  Specifies the role of the node.

  `Default master`

  `Type String`

$ossec_cluster_key
  Defines the key used to encrypt the communication between the nodes. This key must be 32 characters long.

  `Default KEY`

  `Type String`

$ossec_cluster_port
  Specifies the port to use for the cluster communications.

  `Default 1516`

  `Type String`

$ossec_cluster_bind_addr
  Specifies which IP address will communicate with the cluster when the node has multiple network interfaces.

  `Default 0.0.0.0`

  `Type String`

$ossec_cluster_nodes
  Lists all master nodes in the cluster using the `<node>` tag for each one.

  `Default ['NODE_IP']`

  `Type String`

$ossec_cluster_hidden
  Toggles whether or not to show information about the cluster that generated an alert. If this is set to `yes`, information about the cluster that generated the event won’t be included in the alert.

  `Default no`

  `Type String`

$ossec_cluster_disabled
  Toggles whether the cluster is enabled or not. If this value is set to `yes`, the cluster won’t start.

  `Default yes`

  `Type String`


.. _ref_server_vars_global:

Global variables
----------------

$ossec_emailnotification
  Whether or not to send email notifications.  If this variable is not set to `true`, the email tags will not be added to `ossec.conf`.

  `Default false`

  `Type Boolean`

$ossec_emailto
    Email to address. ``['user1@mycompany.com','user2@mycompany.com']``

  `Default ['recipient@example.wazuh.com']`

  `Type List`

   Depends on **ossec_emailnotification**

$ossec_smtp_server
  SMTP mail server.

  `Default smtp.example.wazuh.com`

  `Type String`

   Depends on **ossec_emailnotification**

$ossec_emailfrom
  Email from address.

  `Default ossecm@example.wazuh.com`

  `Type String`

   Depends on **ossec_emailnotification**

$ossec_email_maxperhour
  Global Configuration with the maximum number of emails per hour.

  `Default 12`

  `Type Integer`

   Depends on **ossec_emailnotification**

$ossec_email_log_source
  This selects the alert file to be read from.

  `Default 'alerts.log'`

  `Type String`

   Depends on **ossec_emailnotification**

$ossec_email_idsname
  Define email ID name

  `Default undef`

$ossec_white_list
  Allow white-listing of IP addresses.

  `Default['127.0.0.1','localhost.localdomain$','10.0.0.2']`

  `Type List`

$ossec_remote_connection
  Specifies a type of incoming connection to accept: secure or syslog.

  `Default secure`

  `Type String`

$ossec_remote_port
  Specifies the port to use to listen for events.

  `Default 1514`

  `Type Integer`

$ossec_remote_protocol
  Specifies the protocol to use. It is available for secure connections and syslog events.

  `Default tcp`

  `Type String`

$ossec_remote_local_ip
  Local IP address to use to listen for connections.

  `Default undef`

  `Type String`

$ossec_remote_allowed_ips
  IP address that is allowed to send syslog messages to the server.

  `Default undef`

  `Type String`

   Needed if **ossec_remote_connection** is set to syslog

$ossec_remote_queue_size
  Sets the capacity of the remote daemon queue in number of agent events.

  `Default 131072`

  `Type String`

  Added if **ossec_remote_connection** is set to secure

.. _ref_server_vars_localfile:

Localfile variables
-------------------

$ossec_local_files
  Files list for log analysis

  These files are listed in params_manager.pp in section $default_local_files.


.. _ref_server_vars_rootcheck:

Rootcheck variables
-------------------

$configure_rootcheck
  Enables rootcheck section render on this host.

  `Default true`

  `Type Boolean`

$ossec_rootcheck_disabled
  Disable rootcheck on this host (Linux).

  `Default no`

  `Type String`

$ossec_rootcheck_check_files
  Enable rootcheck checkfiles option.

  `Default yes`

  `Type String`

$ossec_rootcheck_check_trojans
  Enable rootcheck checktrojans option.

  `Default yes`

  `Type String`

$ossec_rootcheck_check_dev
  Enable rootcheck checkdev option.

  `Default yes`

  `Type String`

$ossec_rootcheck_check_sys
  Enable rootcheck checksys option.

  `Default yes`

  `Type String`

$ossec_rootcheck_check_pids
  Enable rootcheck checkpids option.

  `Default yes`

  `Type String`

$ossec_rootcheck_check_ports
  Enable rootcheck checkports option.

  `Default yes`

  `Type String`

$ossec_rootcheck_check_if
  Enable rootcheck checkif option.

  `Default yes`

  `Type String`

$ossec_rootcheck_frequency
  How often the rootcheck scan will run (in seconds).

  `Default 36000`

  `Type String`

$ossec_rootcheck_ignore_list
  List of files or directories to be ignored. These files and directories will be ignored during scans.

  `Default []`

  `Type String`

$ossec_rootcheck_rootkit_files
  Change the location of the rootkit files database.

  `Default 'etc/shared/rootkit_files.txt'`

  `Type String`

$ossec_rootcheck_rootkit_trojans
  Change the location of the rootkit trojans database.

  `Default 'etc/shared/rootkit_trojans.txt'`

  `Type String`

$ossec_rootcheck_skip_nfs
  Enable or disable the scanning of network mounted filesystems (Works on Linux and FreeBSD). Currently, skip_nfs will exclude checking files on CIFS or NFS mounts.

  `Default yes`

  `Type String`

$ossec_rootcheck_system_audit
  Specifies the path to an audit definition file for Unix-like systems.

  `Default []`

  `Type String`


.. _ref_server_vars_syscheck:

Syscheck variables
------------------

$configure_syscheck
  Enables syscheck section rendering on this host. If this variable is not set to *true* the complete syscheck tag will not be added to *ossec.conf*.

  `Default true`

  `Type Boolean`

$ossec_syscheck_disabled
  Disable syscheck on this host.

  `Default no`

  `Type String`

$ossec_syscheck_frequency
  Enables syscheck section render on this host.

  `Default 43200`

  `Type String`

$ossec_syscheck_scan_on_start
  Specifies if syscheck scans immediately when started.

  `Default yes`

  `Type String`

$ossec_syscheck_auto_ignore
  Specifies whether or not syscheck will ignore files that change too many times (manager only).

  `Default undef`

  `Type String`

$ossec_syscheck_directories_1
  List of directories to be monitored. The directories should be comma-separated

  `Default '/etc,/usr/bin,/usr/sbin'`

  `Type String`

$ossec_syscheck_realtime_directories_1
  This will enable real-time/continuous monitoring on directories listed on `ossec_syscheck_directories_1`. Real time only works with directories, not individual files.

  `Default no`

  `Type String`

$ossec_syscheck_whodata_directories_1
  This will enable who-data monitoring on directories listed on `ossec_syscheck_directories_1`.

  `Default no`

$ossec_syscheck_directories_2
  List of directories to be monitored. The directories should be comma-separated

  `Default '/etc,/usr/bin,/usr/sbin'`

  `Type String`

$ossec_syscheck_realtime_directories_2
  This will enable real-time/continuous monitoring on directories listed on `ossec_syscheck_directories_2`. Real time only works with directories, not individual files.

  `Default no`

  `Type String`

$ossec_syscheck_whodata_directories_2
  This will enable who-data monitoring on directories listed on `ossec_syscheck_directories_2`.

  `Default no`

  `Type String`

$ossec_syscheck_report_changes_directories_2
  Report file changes. This is limited to text files at this time.

  `Default no`

  `Type String`

$ossec_syscheck_ignore_list
  List of files or directories to be ignored. Ignored files and directories are still scanned, but the results are not reported.

  `Default ['/etc/mtab','/etc/hosts.deny','/etc/mail/statistics','/etc/random-seed','/etc/random.seed','/etc/adjtime','/etc/httpd/logs','/etc/utmpx','/etc/wtmpx','/etc/cups/certs','/etc/dumpdates','/etc/svc/volatile','/sys/kernel/security','/sys/kernel/debug','/dev/core',]`

  `Type List`

$ossec_syscheck_ignore_type_1
  Simple regex pattern to filter out files.

  `Default '^/proc'`

  `Type String`

$ossec_syscheck_ignore_type_2
  Another simple regex pattern to filter out files.

  `Default '.log$|.swp$'`

  `Type String`

$ossec_syscheck_max_eps
  Sets the maximum event reporting throughput. Events are messages that will produce an alert.

  `Default 50`

  `Type String`

$ossec_syscheck_process_priority
  Sets the nice value for Syscheck process.

  `Default 10`

  `Type String`

$ossec_syscheck_synchronization_enabled
  Specifies whether there will be periodic inventory synchronizations or not.

  `Default yes`

  `Type String`

$ossec_syscheck_synchronization_interval
  Specifies the initial number of seconds between every inventory synchronization. If synchronization fails the value will be duplicated until it reaches the value of `max_interval`.

  `Default 5m`

  `Type String`

$ossec_syscheck_synchronization_max_eps
  Sets the maximum synchronization message throughput.

  `Default 10`

  `Type String`

$ossec_syscheck_synchronization_max_interval
  Specifies the maximum number of seconds between every inventory synchronization.

  `Default 1h`

  `Type String`

$ossec_syscheck_skip_nfs
  Specifies if syscheck should scan network mounted filesystems. This option works on Linux and FreeBSD systems. Currently, `skip_nfs` will exclude checking files on CIFS or NFS mounts.

  `Default yes`

  `Type String`


.. _ref_server_vars_syslog_output:

Syslog output variables
-----------------------

$syslog_output
  Allows a Wazuh manager to send the OSSEC alerts to one or more syslog servers. If this variable is not set to *true* the complete syslog_output tag will not be added to *ossec.conf*.

  `Default false`

  `Type Boolean`

$syslog_output_level
  The minimum level of the alerts to be forwarded.

  `Default 2`

  `Type Integer`

   Depends on **syslog_output**

$syslog_output_port
  The port to forward alerts to.

  `Default 514`

  `Type Integer`

   Depends on **syslog_output**

$syslog_output_server
  The IP address of the syslog server.

  `Default undef`

  `Type String`

   Depends on **syslog_output**

   Required if **syslog_output** is set to true

$syslog_output_format
  Format of alert output.

  `Default undef`

  `Type String`

   Depends on **syslog_output**



.. _ref_server_vars_vuln_detection:

Vulnerability Detection variables
---------------------------------

$configure_vulnerability_detection
  Enables Vulnerability detection section rendering on this host. If this variable is not set to *true*, the complete vulnerability-detection tag will not be added to *ossec.conf*.

  `Default yes`

  `Type Boolean`

$vulnerability_detection_enabled
  Enables the vulnerability detection module.

  `Default yes`

  `Type String`

   Depends on **configure_vulnerability_detection**

$vulnerability_detection_index_status
  Enables indexing of vulnerability inventory data.

  `Default yes`

  `Type String`

   Depends on **configure_vulnerability_detection**

$vulnerability_detection_feed_update_interval
  Time interval for periodic feed updates.

  `Default 60m`

  `Type String`

   Depends on **configure_vulnerability_detection**

$configure_vulnerability_indexer
  Enables Vulnerability detection indexer section rendering on this host. If this variable is not set to *true*, the vulnerability-indexer tag will not be added to *ossec.conf*.

  `Default yes`

  `Type Boolean`

$vulnerability_indexer_enabled
  Enables the Vulnerability detection indexer module.

  `Default yes`

  `Type String`

   Depends on **configure_vulnerability_indexer**

$vulnerability_indexer_hosts_host
  host or IP of Wazuh indexer nodes.

  `Default ['127.0.0.1']`

  `Type String`

   Depends on **configure_vulnerability_indexer**

$vulnerability_indexer_hosts_port
  Port of Wazuh indexer.

  `Default 9200`

  `Type String`

   Depends on **configure_vulnerability_indexer**

$vulnerability_indexer_ssl_ca
  Path of ca certificate.

  `Default /etc/filebeat/certs/root-ca.pem`

  `Type String`

   Depends on **configure_vulnerability_indexer**

$vulnerability_indexer_ssl_certificate
  Path of Filebeat certificate.

  `Default /etc/filebeat/certs/filebeat.pem`

  `Type String`

   Depends on **configure_vulnerability_indexer**

$vulnerability_indexer_ssl_key
  Path of Filebeat key.

  `Default /etc/filebeat/certs/filebeat-key.pem`

  `Type String`

   Depends on **configure_vulnerability_indexer**

.. _ref_server_vars_wazuh_api:

Wazuh API variables
-------------------

$wazuh_api_host
  IP address or hostname of the Wazuh manager where the Wazuh API is running.

  `Default 0.0.0.0`

  `Type String`

$wazuh_api_port
  Port where the Wazuh API will listen.

  `Default 55000`

  `Type String`


$wazuh_api_https_enabled
  Enable or disable SSL (https) in the Wazuh API.

  `Default true`

  `Type String`

$wazuh_api_https_key
  File with the private key.

  `Default server.key (in api/configuration/ssl)`

  `Type String`

$wazuh_api_https_cert
  File with the certificate.

  `Default server.crt (in api/configuration/ssl)`

  `Type String`

$wazuh_api_https_use_ca
  Whether to use a certificate from a Certificate Authority.

  `Default false`

  `Type String`

$wazuh_api_https_ca
  Certificate of the Certificate Authority (CA).

  `Default ca.crt (in api/configuration/ssl)`

  `Type String`

$wazuh_api_logs_level
  Sets the verbosity level of the Wazuh API logs.

  `Default info`

  `Type String`

$wazuh_api_logs_format
  Set the format of the Wazuh API logs.

  `Default plain`

$wazuh_api_cors_enabled
  Enable or disable the use of CORS in the Wazuh API.

  `Default false`

  `Type String`

$wazuh_api_cors_source_route
  Sources for which the resources will be available. For example `http://client.example.org.`

  `Default "*"`

  `Type String`

$wazuh_api_cors_expose_headers
  Specifies which headers can be exposed as part of the response.

  `Default "*"`

  `Type String`

$wazuh_api_cors_allow_headers
  Specifies which HTTP headers can be used during the actual request.

  `Default "*"`

  `Type String`

$wazuh_api_cors_allow_credentials
  Tells browsers whether to expose the response to frontend JavaScript.

  `Default false`

  `Type String`

$wazuh_api_cache_enabled
  Enables or disables caching for certain API responses (currently, all `/rules` endpoints)

  `Default true`

  `Type String`

$wazuh_api_cache_time
  Time in seconds that the cache lasts before expiring.

  `Default 0.75`

  `Type String`

$wazuh_api_access_max_login_attempts
  Set a maximum number of login attempts during a specified block_time number of seconds.

  `Default 5`

  `Type Integer`

$wazuh_api_access_block_time
  Established period of time (in seconds) to attempt login requests. If the established number of requests (`max_login_attempts`) is exceeded within this time limit, the IP address is blocked until the end of the block time period.

  `Default 300`

  `Type Integer`

$wazuh_api_access_max_request_per_minute
  Establish a maximum number of requests the Wazuh API can handle per minute (does not include authentication requests). If the number of requests for a given minute is exceeded, all incoming requests (from any user) will be blocked. This feature can be disabled by setting its value to 0.

  `Default 300`

  `Type Integer`

$wazuh_api_drop_privileges
  Run wazuh-api process as wazuh user

  `Default true`

  `Type String`

$wazuh_api_experimental_features
  Enable features under development

  `Default false`

  `Type String`


.. _ref_server_vars_wodle_openscap:

Wodle OpenSCAP variables
------------------------

$configure_wodle_openscap
  Enables the Wodle OpenSCAP section rendering on this host. If this variable is not set to *true* the complete open-scap wodle tag will not be added to *ossec.conf*.

  `Default true`

  `Type boolean`

$wodle_openscap_disabled
  Disables the OpenSCAP wodle.

  `Default yes`

  `Type String`

   Depends on **wodle_openscap_disabled**

$wodle_openscap_timeout
  Timeout for each evaluation.

  `Default 1800`

  `Type String`

   Depends on **wodle_openscap_disabled**

$wodle_openscap_interval
  The interval between OpenSCAP executions.

  `Default 1d`

  `Type String`

   Depends on **wodle_openscap_disabled**

$wodle_openscap_scan_on_start
  Run evaluation immediately when service is started.

  `Default yes`

  `Type String`

   Depends on **wodle_openscap_disabled**


.. _ref_server_vars_ciscat:

Wodle CIS-CAT variables
-----------------------

$configure_wodle_cis_cat
  Enables Wodle CIS-CAT section render on this host. If this variable is not set to *true* the complete cis-cat wodle tag will not be added to *ossec.conf*.

  `Default true`

  `Type Boolean`

$wodle_ciscat_disabled
  Disables the CIS-CAT wodle.

  `Default yes`

  `Type String`

   Depends on **configure_wodle_cis_cat**

$wodle_ciscat_timeout
  Timeout for each evaluation. In case the execution takes longer than the specified timeout, it stops.

  `Default 1800`

  `Type String`

   Depends on **configure_wodle_cis_cat**

$wodle_ciscat_interval
  The interval between CIS-CAT executions.

  `Default 1d`

  `Type String`

   Depends on **configure_wodle_cis_cat**

$wodle_ciscat_scan_on_start
  Run evaluation immediately when service is started.

  `Default yes`

  `Type String`

   Depends on **configure_wodle_cis_cat**

$wodle_ciscat_java_path
  Define where Java is located. If this parameter is not set, the wodle will search for the Java location in the default environment variable `$PATH`.

  `Default 'wodles/java'`

  `Type String`

   Depends on **configure_wodle_cis_cat**

$wodle_ciscat_ciscat_path
  Define where CIS-CAT is located.

  `Default 'wodles/ciscat'`

  `Type String`

   Depends on **configure_wodle_cis_cat**

.. _ref_server_vars_wodle_osquery:

Wodle osquery variables
-----------------------

$configure_wodle_osquery
  Enables the Wodle osquery section rendering on this host. If this variable is not set to *true*, the complete osquery wodle tag will not be added to *ossec.conf*.

  `Default true`

  `Type Boolean`

$wodle_osquery_disabled
  Disable the osquery wodle.

  `Default yes`

  `Type String`

   Depends on **configure_wodle_osquery**

$wodle_osquery_run_daemon
  Makes the module run osqueryd as a subprocess or lets the module monitor the results log without running Osquery.

  `Default yes`

  `Type String`

   Depends on **configure_wodle_osquery**

$wodle_osquery_log_path
  Full path to the results log written by Osquery.

  `Default '/var/log/osquery/osqueryd.results.log'`

  `Type String`

   Depends on **configure_wodle_osquery**

$wodle_osquery_config_path
  Path to the Osquery configuration file. This path can be relative to the folder where the Wazuh agent is running.

  `Default '/etc/osquery/osquery.conf'`

  `Type String`

   Depends on **configure_wodle_osquery**

$wodle_osquery_add_labels
  Add the agent labels defined as decorators.

  `Default yes`

  `Type String`

   Depends on **configure_wodle_osquery**



.. _ref_server_vars_wodle_syscollector:

Wodle Syscollector variables
----------------------------

$wodle_syscollector_disabled
  Disable the Syscollector wodle.

  `Default no`

$wodle_syscollector_interval
  Time between system scans.

  `Default 1h`

  `Type String`

$wodle_syscollector_scan_on_start
  Run a system scan immediately when service is started.

  `Default yes`

  `Type String`

$wodle_syscollector_hardware
  Enables the hardware scan.

  `Default yes`

  `Type String`

$wodle_syscollector_os
  Enables the OS scan.

  `Default yes`

  `Type String`

$wodle_syscollector_network
  Enables the network scan.

  `Default yes`

  `Type String`

$wodle_syscollector_packages
  Enables the scan of the packages.

  `Default yes`

  `Type String`

$wodle_syscollector_ports
  Enables the ports scan.

  `Default yes`

  `Type String`

$wodle_syscollector_processes
  Enables the scan of the processes.

  `Default yes`

  `Type String`


.. _ref_server_vars_misc:

Misc Variables
--------------

$server_package_version
  Modified client.pp and server.pp to accept package versions as a parameter.

  `Default |WAZUH_CURRENT_PUPPET|-1`

  `Type String`

$manage_repos
  Install Wazuh through Wazuh repositories.

  `Default true`

  `Type Boolean`

$manage_client_keys
  Manage client keys option.

  `Default true`

  `Type String`

$local_decoder_template
  Allow using a custom local_decoder.xml in the manager.

  `Default wazuh/local_decoder.xml.erb`

  `Type String`

$local_rules_template
  Allow using a custom local_rules.xml in the manager.

  `Default wazuh/local_rules.xml.erb`

  `Type String`

$shared_agent_template
  Enable the configuration to deploy through agent.conf

  `Default wazuh/ossec_shared_agent.conf.erb`

  `Type String`


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
  Name of the executable. WAZUH comes preloaded with disable-account, host-deny, ipfw, pf, route-null, firewall-drop, wazuh-slack, restart-wazuh.

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
  Usually Active Response blocks for a certain amount of time.

  `Default undef`

$active_response_repeated_offenders
  Sets timeouts in minutes for repeat offenders. This is a list of increasing timeouts that can contain a maximum of 5 entries.

  `Default empty`

.. _ref_server_addlog:
