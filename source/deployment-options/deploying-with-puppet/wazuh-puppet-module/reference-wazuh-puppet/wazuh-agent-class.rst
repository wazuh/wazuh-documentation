.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the Wazuh agent class and its variables to configure the Wazuh agent in this section of the Wazuh documentation. 

.. _reference_wazuh_agent_class:

Wazuh agent class
=================

``class wazuh::agent``
----------------------

This contains variables that can be used to configure the Wazuh agent.

.. _ref_agent_vars_ar:

Active-Response variables
-------------------------
$configure_active_response
  Enables active response on this host.

  `Default true`

  `Type Boolean`

$active_response_disabled
  Toggles the active-response capability on and off.

  `Default no`

  `Type String`

$active_response_ca_verification
  This option enables or disables the WPK validation using the root CA certificate. If this parameter is set to no, the agent will accept any WPK package coming from the manager.

  `Default yes`

  `Type String`

$active_response_repeated_offenders
  Sets timeouts in minutes for repeat offenders. This is a list of increasing timeouts that can contain a maximum of 5 entries.

  `Default []`


.. _ref_agent_vars_enroll:

Agent enrollment variables
--------------------------

$wazuh_enrollment_enabled
  Enables/disables agent enrollment. If this variable is not set to ‘yes’ the complete enrollment tag will not be added to `ossec.conf`.

  `Default undef`

  `Type String`

$wazuh_enrollment_manager_address
  Hostname or IP address of the manager where the agent will be enrolled.

  `Default undef`

  `Type String`

$wazuh_enrollment_port
  Specifies the port on the manager to send enrollment request.

  `Default undef`

  `Type String`
   
   Depends on **wazuh_enrollment_enabled**

$wazuh_enrollment_agent_name
  Agent name that will be used for enrollment.

  `Default undef`

  `Type String`
  
   Depends on **wazuh_enrollment_enabled**


$wazuh_enrollment_groups
  Groups name to which the agent belongs.

  `Default undef`

  `Type String`
  
   Depends on **wazuh_enrollment_enabled**

$wazuh_enrollment_agent_address
  Force IP address from the agent. If this is not set, the manager will extract the source IP address from the enrollment message.

  `Default undef`

  `Type String`
  
   Depends on **wazuh_enrollment_enabled**

$wazuh_enrollment_ssl_cipher
  Override SSL used ciphers.

  `Default undef`

  `Type String`
  
   Depends on **wazuh_enrollment_enabled**

$wazuh_enrollment_server_ca_path
  Used for manager verification. If no CA certificate is set server will not be verified.

  `Default undef`

  `Type String`
  
   Depends on **wazuh_enrollment_enabled**

$wazuh_enrollment_agent_cert_path
  Required when agent verification is enabled in the manager.

  `Default undef`

  `Type String`
  
   Depends on **wazuh_enrollment_enabled**

$wazuh_enrollment_agent_key_path
  Required when agent verification is enabled in the manager.

  `Default undef`

  `Type String`
  
   Depends on **wazuh_enrollment_enabled**

$wazuh_enrollment_auth_pass
  Enrollment password.

  `Default undef`

  `Type String`
  
   Depends on **wazuh_enrollment_enabled**

$wazuh_enrollment_auth_pass_path
  Required when enrollment is using password verification.

  `Default '/var/ossec/etc/authd.pass'`

  `Type String`
  
   Depends on **wazuh_enrollment_enabled**

$wazuh_enrollment_auto_method
  Auto negotiates the most secure common SSL/TLS method with the manager, use “yes” for auto negotiate or “no” for TLS v1.2 only.

  `Default undef`

  `Type String`
  
   Depends on **wazuh_enrollment_enabled**

$wazuh_delay_after_enrollment
  Specifies the time agents should wait after a successful registration.

   Related parameter :ref:`delay_after_enrollment <enrollment_delay_after_enrollment>`
        
  `Default undef`

  `Type String`
  
   Depends on **wazuh_enrollment_enabled**

$wazuh_enrollment_use_source_ip
  Force manager to compute IP address from agent message.

  `Default undef`

  `Type String`
  
   Depends on **wazuh_enrollment_enabled**

.. _ref_agent_vars_client:

Client variables
----------------

$wazuh_reporting_endpoint
  Specifies the IP address or the hostname of the Wazuh manager to report.

  `Default undef`

  `Type String`
  
$wazuh_register_endpoint
  Specifies the IP address or the hostname of the Wazuh manager to register against. It is used to run the **agent-auth** tool.

  `Type String`

$ossec_port
  Specifies the port to send events to the manager. This must match the associated listening port configured on the Wazuh manager.

  `Default 1514`

  `Type String`

$ossec_protocol
  Specifies the protocol to use when connecting to the manager.

  `Default tcp`

  `Type String`
  
$wazuh_max_retries
  The number of connection retries.

  `Default 5`

  `Type String`
  
$wazuh_retry_interval
  Time interval between connection attempts (seconds).

  `Default 5`

  `Type String`
  
$ossec_notify_time
  Specifies the time in seconds between agent check-ins to the manager.

  `Default 10`

  `Type String`
  
$ossec_time_reconnect
  Specifies the time in seconds before a reconnection is attempted. This should be set to a higher number than the `notify_time` parameter.

  `Default 60`

  `Type String`

$ossec_auto_restart
  Toggles on and off the automatic restart of agents when a new valid configuration is received from the manager.

  `Default yes`

  `Type String`

$ossec_crypto_method
  Choose the encryption of the messages that the agent sends to the manager.

  `Default aes`

  `Type String`
  
$client_buffer_queue_size
  Sets the capacity of the agent buffer in number of events.

  `Default 5000`

$client_buffer_events_per_second
  Specifies the number of events that can be sent to the manager per second.

  `Default 500`

  `Type String`


.. _ref_agent_vars_localfile:

Localfile variables
-------------------

$ossec_local_files
  Files list for log analysis

  These files are listed in params_agent.pp in section $default_local_files. If a change is needed it should be modified in the params_agent.pp.

  Default depends on the OS family.

.. _ref_agent_vars_rootcheck:

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

  `Type List`

$ossec_rootcheck_rootkit_files
  Change the location of the rootkit files database.

  `Default '/var/ossec/etc/shared/rootkit_files.txt'`

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

  `Type List`

$ossec_rootcheck_windows_disabled
  Disables rootcheck if host has Windows OS.

  `Default no`

  `Type String`

$ossec_rootcheck_windows_windows_apps
  Specifies the path to a Windows application definition file.

  `Default './shared/win_applications_rcl.txt'`

$ossec_rootcheck_windows_windows_malware
  Specifies the path to a Windows malware definitions file.

  `Default './shared/win_applications_rcl.txt'`

  `Type String`


.. _ref_agent_vars_sca:

SCA variables
-------------

$configure_sca
  Enables SCA section render on this host.

  `Default true`

  `Type boolean`

$sca_amazon_enabled
  Enable SCA on this host (Amazon Linux 2).

  `Default yes`

   Depends on **configure_sca and apply_template_os**

$sca_amazon_scan_on_start
  The SCA module will perform the scan immediately when started (Amazon Linux 2).

  `Default yes`

   Depends on **configure_sca and apply_template_os**

$sca_amazon_interval
  The interval between module executions.

  `Default 12h`

   Depends on **configure_sca and apply_template_os**

$sca_amazon_skip_nfs
  Enable or disable the scanning of network mounted filesystems (Works on Linux and FreeBSD). Currently, skip_nfs will exclude checking files on CIFS or NFS mounts.

  `Default yes`

   Depends on **configure_sca and apply_template_os**

$sca_amazon_policies
  A list of policies to run assessments can be included in this section.

  `Default []`

   Depends on **configure_sca and apply_template_os**

$sca_rhel_enabled
  Enable SCA on this host (RHEL).

  `Default true`

  `Type Boolean`

   Depends on **configure_sca and apply_template_os**

$sca_rhel_scan_on_start
  The SCA module will perform the scan immediately when started (RHEL).

  `Default yes`

  `Type String`

   Depends on **configure_sca and apply_template_os**

$sca_rhel_interval
  The interval between module executions.

  `Default 12h`

   Depends on **configure_sca and apply_template_os**

$sca_rhel_skip_nfs
  Enable or disable the scanning of network mounted filesystems (Works on Linux and FreeBSD). Currently, skip_nfs will exclude checking files on CIFS or NFS mounts.

  `Default yes`

   Depends on **configure_sca and apply_template_os**

$sca_rhel_policies
  A list of policies to run assessments can be included in this section.

  `Default []`

   Depends on **configure_sca and apply_template_os**

$sca_else_enabled
  Enable SCA on this host (Linux).

  `Default yes`

$sca_else_scan_on_start
  The SCA module will perform the scan immediately when started (Linux).

  `Default yes`

   Depends on **configure_sca and apply_template_os**

$sca_else_interval
  The interval between module executions.

  `Default 12h`

   Depends on **configure_sca and apply_template_os**

$sca_else_skip_nfs
  Enable or disable the scanning of network mounted filesystems (Works on Linux and FreeBSD). Currently, `skip_nfs` will exclude checking files on CIFS or NFS mounts.

  `Default yes`

   Depends on **configure_sca and apply_template_os**

$sca_else_policies
  A list of policies to run assessments can be included in this section.

  `Default []`

   Depends on **configure_sca and apply_template_os**


.. _ref_agent_vars_syscheck:

Syscheck variables
------------------

$configure_syscheck
  Enables syscheck section rendering on this host. If this variable is not set to ‘true’ the complete `syscheck` tag will not be added to `ossec.conf`.

  `Default true`

  `Type Boolean`

$ossec_syscheck_disabled
  Disable syscheck on this host.

  `Default no`

  `Type String`

$ossec_syscheck_frequency
  Enables syscheck section rendering on this host.

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
  List of directories to be monitored. The directories should be comma-separated.

  `Default '/etc,/usr/bin,/usr/sbin'`

  `Type String`

$ossec_syscheck_realtime_directories_1
  This will enable real-time/continuous monitoring on directories listed on `ossec_syscheck_directories_1`. Real time only works with directories, not individual files.

  `Default no`

  `Type String`

$ossec_syscheck_whodata_directories_1
  This will enable who-data monitoring on directories listed on `ossec_syscheck_directories_1`.

  `Default no`

  `Type String`

$ossec_syscheck_directories_2
  List of directories to be monitored. The directories should be comma-separated.

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
  List of files or directories to be ignored. Ignored files and directories are still being scanned, but the results are not reported.

  `[‘/etc/mtab’,’/etc/hosts.deny’,’/etc/mail/statistics’,’/etc/random-seed’,’/etc/random.seed’,’/etc/adjtime’,’/etc/httpd/logs’,’/etc/utmpx’,’/etc/wtmpx’,’/etc/cups/certs’,’/etc/dumpdates’,’/etc/svc/volatile’,’/sys/kernel/security’,’/sys/kernel/debug’,’/dev/core’,]`
  
  `Type String`

$ossec_syscheck_ignore_type_1
  Simple regex pattern to filter out files.

  `Default '^/proc'`

  `Type String`

$ossec_syscheck_ignore_type_2
  Another simple regex pattern to filter out files.

  `Default '.log$|.swp$'`

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

.. _ref_agent_vars_wodle_openscap:

Wodle OpenSCAP
--------------

$configure_wodle_openscap
  Enables the Wodle OpenSCAP section rendering on this host.  If this variable is not set to true the complete *open-scap wodle* tag will not be added to *ossec.conf*.

  `Default true`

  `Type Boolean`

$wodle_openscap_disabled
  Disables the OpenSCAP wodle.

  `Default yes`

  `Type String`

$wodle_openscap_timeout
  Timeout for each evaluation.

  `Default 1800`

  `Type String`

$wodle_openscap_interval
  The interval between OpenSCAP executions.

  `Default 1d`

  `Type String`

$wodle_openscap_scan_on_start
  Run evaluation immediately when service is started.

  `Default yes`

  `Type String`

.. _ref_agent_vars_wodle_ciscat:

Wodle CIS-CAT
-------------

$configure_wodle_cis_cat
  Enables Wodle CIS-CAT section render on this host. If this variable is not set to true the complete *cis-cat wodle* tag will not be added to *ossec.conf*.

  `Default true`

  `Type Boolean`

$wodle_ciscat_disabled
  Disables the CIS-CAT wodle.

  `Default yes`

  `Type String`

$wodle_ciscat_timeout
  Timeout for each evaluation. In case the execution takes longer than the specified timeout, it stops.

  `Default 1800`

  `Type String`

$wodle_ciscat_interval
  The interval between CIS-CAT executions.

  `Default 1d`

  `Type String`

$wodle_ciscat_scan_on_start
  Run evaluation immediately when service is started.

  `Default yes`

  `Type String`

$wodle_ciscat_java_path
  Define where Java is located. If this parameter is not set, the wodle will search for the Java location in the default environment variable `$PATH`.

  `Default 'wodles/java'`

  `Type String`

$wodle_ciscat_ciscat_path
  Define where CIS-CAT is located.

  `Default 'wodles/ciscat'`

  `Type String`

.. _ref_agent_vars_wodle_osquery:

Wodle osquery variables
-----------------------

$configure_wodle_osquery
  Enables the Wodle osquery section rendering on this host. If this variable is not set to ‘true’, the complete *osquery wodle tag* will not be added to *ossec.conf*.

  `Default true`

  `Type String`

$wodle_osquery_disabled
  Disable the osquery wodle.

  `Default yes`

  `Type String`

$wodle_osquery_run_daemon
  Make the module run osqueryd as a subprocess or let the module monitor the results log without running Osquery.

  `Default yes`

  `Type String`

$wodle_osquery_log_path
  Full path to the results log written by Osquery.

  `Default '/var/log/osquery/osqueryd.results.log'`

  `Type String`

$wodle_osquery_config_path
  Path to the Osquery configuration file. This path can be relative to the folder where the Wazuh agent is running.

  `Default '/etc/osquery/osquery.conf'`

  `Type String`

$wodle_osquery_add_labels
  Add the agent labels defined as decorators.

  `Default yes`

  `Type String`

.. _ref_agent_vars_wodle_syscollector:

Wodle Syscollector
------------------

$wodle_syscollector_disabled
  Disable the Syscollector wodle.

  `Default no`

  `Type String`

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
  Enables the scan of the OS.

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
  Enables the scan of the ports.

  `Default yes`

  `Type String`

$wodle_syscollector_processes
  Enables the scan of the processes.

  `Default yes`

  `Type String`

.. _ref_agent_vars_misc:

Misc Variables
--------------

$agent_package_name
  Define package name defined in `params_agent.pp`

  `Default wazuh-agent`

  `Type String`

$agent_package_version
  Define package version

  `Default 4.4.5-1`

  `Type String`

$selinux
  Whether to install a SELinux policy to allow rotation of OSSEC logs.

  `Default false`

  `Type Boolean`

$agent_name
  Configure agent name.

  `Default undef`

  `Type String`

$manage_repo
  Install Wazuh through Wazuh repositories.

  `Default true`

  `Type Boolean`

$manage_client_keys
  Manage client keys option.

  `Default yes`

  `Type String`

$agent_auth_password
  Define password for agent-auth

  `Default undef`
  
  `Type String`

.. _ref_agent_addlog:
