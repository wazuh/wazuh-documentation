.. _reference_wazuh_agent_class:

Wazuh agent class
=================
$ossec_active_response
  Allows active response on this host.

  `Default true`

$ossec_rootcheck
  Enable rootchek on this host.

  `Default true`

$ossec_rootcheck_frequency
  Setup frequency rootcheck

  `Default 36000`

$ossec_rootcheck_checkports
  Enable rootcheck checkports option

  `Default true`

$ossec_rootcheck_checkfiles
  Enable rootcheck checkfiles option

  `Default true`

$ossec_server_ip
  Wazuh Manager IP.

$ossec_server_hostname
  Hostname of the server.

$ossec_server_port
  Server port configuration

  `Default 1514`

$ossec_scanpaths
  Agents can be Linux or Windows. For this reason don't have ossec_scanpaths by default.

  `Default []`

$ossec_emailnotification
  Whether to send email notifications or not.

  `Default yes`

$ossec_ignorepaths
  Files/Directory list to ignore

  `Default []`

$ossec_local_files
  Files list for log analysis

  This files are listed in params.pp in section $default_local_files

$ossec_syscheck_frequency
  Frequency that syscheck is executed default every 12 hours

  `Default 43200`

$ossec_prefilter
  Command to run to prevent prelinking from creating false positives.

  This option can potentially impact performance negatively. The configured command will be run for each and every file checked.

  `Default false`

$ossec_service_provider
  This option asocciate Operative System Family

$ossec_config_profiles
  Specify the agent.conf profile(s) to be used by the agent.

  `Default []`

$selinux
  Whether to install a SELinux policy to allow rotation of OSSEC logs.

  `Default false`

$agent_name
   Configure agent hostname

  `Default $::hostname`

$agent_ip_address
   Configure agent IP Adress

  `Default $::ipaddress`

$manage_repo
  Install Wazuh through Wazuh repositories.

  `Default true`

$manage_epel_repo
  Install epel repo and inotify-tools

  `Default true`

$agent_package_name


$agent_package_version

   `Default installed`

$agent_service_name

$manage_client_keys
  Manage client keys option.

  `Default export`

$agent_auth_password

$agent_seed

$max_clients

$ar_repeated_offenders
  A comma separated list of increasing timeouts in minutes for repeat offenders.

  There can be a maximum of 5 entries.

  `Default empty`

$enable_wodle_openscap

$wodle_openscap_content

$service_has_status

$ossec_conf_template

  `Default wazuh/wazuh_agent.conf.erb`

.. _ref_agent_addlog:


function wazuh::addlog
----------------------

$log_name
  Wazuh log name

$agent_log
  `Default false`

$logfile
  /path/to/log/file.

$logtype
  The OSSEC log_format of the file.

  `Default syslog`
