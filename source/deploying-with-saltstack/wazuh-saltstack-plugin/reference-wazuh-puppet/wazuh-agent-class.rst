.. _reference_wazuh_agent_class:

Wazuh agent class
=================

$ossec_server_ip
  IP of the server.

$ossec_server_hostname
  Hostname of the server.

$ossec_active_response
  Allows active response on this host.

  `Default true`

$ossec_emailnotification
  Whether to send email notifications or not.

  `Default yes`

$ossec_prefilter
  Command to run to prevent prelinking from creating false positives.

  This option can potentially impact performance negatively. The configured command will be run for each and every file checked.

  `Default false`

$selinux
  Whether to install a SELinux policy to allow rotation of OSSEC logs.

  `Default false`

$agent_name
  `Default $::hostname`

$agent_ip_address
  `Default $::ipaddress`

$manage_repo
  Install Wazuh through Wazuh repositories.

  `Default true`

$manage_epel_repo
  Install epel repo and inotify-tools

  `Default true`

$ossec_scanpaths
  Agents can be Linux or Windows. For this reason don't have ossec_scanpaths by default.

  `Default []`

$manage_client_keys
  Manage client keys option.

  `Default true`

$ar_repeated_offenders
  A comma separated list of increasing timeouts in minutes for repeat offenders.

  There can be a maximum of 5 entries.

  `Default empty`

.. _ref_agent_addlog:

function wazuh::addlog
----------------------

$log_name
  .

$agent_log
  `Default false`

$logfile
  /path/to/log/file.

$logtype
  The OSSEC log_format of the file.

  `Default syslog`
