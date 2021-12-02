.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
      :description: Wazuh 4.3.0 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_3_0:

4.3.0 Release notes
===================

This section lists the changes in version 4.3.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.


Highlights
----------

Manager
^^^^^^^


Agent
^^^^^


Wazuh Kibana plugin
^^^^^^^^^^^^^^^^^^^

- `#3424 <https://github.com/wazuh/wazuh-kibana-app/pull/3424>`_ Sample data for Office 365 was added to this new version. Now Wazuh Kibana plugin includes events from Office 365 so that the sample data module covers the cases described in the Office 365 schemas.
- `#3524 <https://github.com/wazuh/wazuh-kibana-app/pull/3524>`_ `#3518 <https://github.com/wazuh/wazuh-kibana-app/pull/3518>`_ Base Module Panel view and a new configuration viewer for the new Office 365 module has been added to Wazuh:
   - A base Module Panel view with Office 365 setup was added to this new version. In addition, the Module Panel displays information about the active module. A drill-down table is in charge of doing the drill-down of the parent view, with a search bar and the filtered graphs and table.
   - Configuration viewer for the new Office365 module was added to the Configuration section of the Management menu. This module is only configurable for managers.

.. raw:: html
    
    <div class="images-rn-420-container">
    <div class="images-rn-420">

.. thumbnail::  ../images/release-notes/4.3.0/Management-Configuration.png 
      :align: center
      :title: Management / Configuration

.. thumbnail::  ../images/release-notes/4.3.0/Office 365-General.png
      :align: center
      :title: Office 365 / General

.. raw:: html

    </div>  

- `#3262 <https://github.com/wazuh/wazuh-kibana-app/issues/3262>`_ `#3327 <https://github.com/wazuh/wazuh-kibana-app/pull/3327>`_ `#3321 <https://github.com/wazuh/wazuh-kibana-app/pull/3321>`_ `#3367 <https://github.com/wazuh/wazuh-kibana-app/pull/3367>`_ `#3373 <https://github.com/wazuh/wazuh-kibana-app/pull/3373>`_ Improved the frontend handle errors strategy: UI, Toasts, console log and log in file:
   - The first attempt to Logger Service (orchestrator) is added, this service is responsible for application logs and for the error orchestration (business rules for errors). Not all errors are sent to the backend, only logs categorized with a certain level or higher.
   - Now the implementation of the ErrorBoundary component and HOC are included to catch components with errors on rendering. In addition, ``loglevel`` dependency to log errors, warnings, etc is also added.
   - The ErrorBoundary HOC to react components was added in his version. It implements error handling HOC in each main react-component (pre-migration).
   - Now try catch strategy is implemented on WzLog by executing Wazuh new error handling strategy on the front-end side. This development was made in order to improve better error handling in the front-end.

- `#3368 <https://github.com/wazuh/wazuh-kibana-app/pull/3368>`_ - `#3344 <https://github.com/wazuh/wazuh-kibana-app/pull/3344>`_ Added Intelligence tab to Mitre Att&ck module:
   - A new Intelligence tab to the Mitre Att&ck module was added with information about the Mitre resources: groups, mitigations, tactics, techniques using the new Wazuh API endpoints. In addition, the Framework tab was adapted to the new Wazuh API endpoints.



What's new
----------

This release includes new features or enhancements.

Manager
^^^^^^^

- `#8178 <https://github.com/wazuh/wazuh/pull/8178>`_ Added support for Arch Linux OS in Vulnerability Detector. Thanks to Aviel Warschawski (@avielw).
- `#8749 <https://github.com/wazuh/wazuh/pull/8749>`_ Added a log message in the ``cluster.log`` file to notify that wazuh-clusterd has been stopped.
- `#9077 <https://github.com/wazuh/wazuh/pull/9077>`_ Added message with the PID of ``wazuh-clusterd`` process when launched in foreground mode.
- `#10492 <https://github.com/wazuh/wazuh/pull/10492>`_ Added time calculation when extra information is requested to the ``cluster_control`` binary.
- `#9209 <https://github.com/wazuh/wazuh/pull/9209>`_ Added a context variable to indicate origin module in socket communication messages.
- `#9733 <https://github.com/wazuh/wazuh/pull/9733>`_ Added unit tests for framework/core files to increase coverage.
- `#9204 <https://github.com/wazuh/wazuh/pull/9204>`_ Added a verbose mode in the wazuh-logtest tool.
- `#8830 <https://github.com/wazuh/wazuh/pull/8830>`_ Added Vulnerability Detector support for Amazon Linux.
- `#10693 <https://github.com/wazuh/wazuh/pull/10693>`_ Introduced new option ``<force>`` to set the behavior when Authd finds conflicts on agent enrollment requests.
- `#9099 <https://github.com/wazuh/wazuh/pull/9099>`_ Added saniziters to the unit tests execution.
- `#8237 <https://github.com/wazuh/wazuh/pull/8237>`_ Vulnerability Detector introduces vulnerability inventory.
  - The manager will only deliver alerts when new vulnerabilities are detected in agents or when they stop applying.
- `#8083 <https://github.com/wazuh/wazuh/pull/8083>`_ Changed the internal handling of agent keys in Remoted and Remoted to speed up key reloading.
- `#7885 <https://github.com/wazuh/wazuh/pull/7885>`_ The option ``<server>`` of the Syslog output now supports hostname resolution. 
- `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ The product's UNIX user and group have been renamed to "wazuh".
- `#7865 <https://github.com/wazuh/wazuh/pull/7865>`_ The MITRE database has been redesigned to provide full and searchable data.
- `#7358 <https://github.com/wazuh/wazuh/pull/7358>`_ The static fields related to FIM have been ported to dynamic fields in Analysisd.
- `#8351 <https://github.com/wazuh/wazuh/pull/8351>`_ Changed all randomly generated IDs used for cluster tasks. Now, uuid4 is used to ensure IDs are not repeated.
- `#8873 <https://github.com/wazuh/wazuh/pull/8873>`_ Improved sendsync error log to provide more details of the used parameters.
- `#9708 <https://github.com/wazuh/wazuh/pull/9708>`_ Changed ``walk_dir`` function to be iterative instead of recursive.
- `#10183 <https://github.com/wazuh/wazuh/pull/10183>`_ Refactored Integrity sync behavior so that new synchronizations do not start until extra-valid files are processed.
- `#10101 <https://github.com/wazuh/wazuh/pull/10101>`_ Changed cluster synchronization, now the content of the etc/shared folder is synchronized.
- `#8351 <https://github.com/wazuh/wazuh/pull/8351>`_ Changed all XML file loads. Now, ``defusedxml`` library is used to avoid possible XML-based attacks.
- `#8535 <https://github.com/wazuh/wazuh/pull/8535>`_ Changed configuration validation from execq socket to com socket.
- `#8392 <https://github.com/wazuh/wazuh/pull/8392>`_ Updated utils unittest to improve ``process_array`` function coverage.
- `#8885 <https://github.com/wazuh/wazuh/pull/8885>`_ Changed ``request_slice`` calculation to improve efficiency when accessing wazuh-db data.
- `#9273 <https://github.com/wazuh/wazuh/pull/9273>`_ Improved the retrieval of information from ``wazuh-db`` so it reaches the optimum size in a single iteration.
- `#9234 <https://github.com/wazuh/wazuh/pull/9234>`_ Optimized the way framework uses context cached functions and added a note on context_cached docstring.
- `#9332 <https://github.com/wazuh/wazuh/pull/9332>`_ Improved framework regexes to be more specific and less vulnerable.
- `#9423 <https://github.com/wazuh/wazuh/pull/9423>`_ Unified framework exceptions for non-active agents.
- `#9433 <https://github.com/wazuh/wazuh/pull/9433>`_ Changed RBAC policies to case insensitive.
- `#9548 <https://github.com/wazuh/wazuh/pull/9548>`_ Refactored framework stats module into SDK and core components to comply with Wazuh framework code standards.
- `#10309 <https://github.com/wazuh/wazuh/pull/10309>`_ Changed the size of the agents chunks sent to the upgrade socket to make the upgrade endpoints faster.
- `#9408 <https://github.com/wazuh/wazuh/pull/9408>`_ Refactored rootcheck and syscheck SDK code to make it clearer.
- `#9738 <https://github.com/wazuh/wazuh/pull/9738>`_ Adapted Azure-logs module to use Microsoft Graph API instead of Active Directory Graph API.
- `#8060 <https://github.com/wazuh/wazuh/pull/8060>`_ Analysisd now reconnects to Active Response if Remoted or Execd get restarted.
- `#10335 <https://github.com/wazuh/wazuh/pull/10335>`_ Agent key polling now supports cluster environments.
- `#10357 <https://github.com/wazuh/wazuh/pull/10357>`_ Extended support of Vulnerability Detector for Debian 11 (Bullseye).
- `#10326 <https://github.com/wazuh/wazuh/pull/10326>`_ Improved Remoted performance with an agent TCP connection sending queue.
- `#9093 <https://github.com/wazuh/wazuh/pull/9093>`_ Agent DB synchronization has been boosted by caching the last data checksum in Wazuh DB.
- `#8892 <https://github.com/wazuh/wazuh/pull/8892>`_ Logtest now scans new ruleset files when loading a new session.
- `#8237 <https://github.com/wazuh/wazuh/pull/8237>`_ CVE alerts by Vulnerability Detector now include the time of detection, severity, and score.
- `#10849 <https://github.com/wazuh/wazuh/pull/10849>`_ Fixed manager startup when ``<database_output>`` is enabled.
- `#10767 <https://github.com/wazuh/wazuh/pull/10767>`_ Changed the cluster "local_integrity" task to run in a separate process to improve overall performance.
- `#10807 <https://github.com/wazuh/wazuh/pull/10807>`_ The cluster communication with the database for agent information synchronization runs in a parallel separate process.
- `#10920 <https://github.com/wazuh/wazuh/pull/10920>`_ The cluster processing of the extra-valid files in the master node is carried out in a parallel separate process.
- `#8399 <https://github.com/wazuh/wazuh/pull/8399>`_ The data reporting for Rootcheck scans in the agent_control tool has been deprecated.
- `#8846 <https://github.com/wazuh/wazuh/pull/8846>`_ Removed old framework functions used to calculate agent status.


Agent
^^^^^

- `#8016 <https://github.com/wazuh/wazuh/pull/8016>`_ Added an option to allow the agent to refresh the connection to the manager.
- `#8532 <https://github.com/wazuh/wazuh/pull/8532>`_ Introduced a new module to collect audit logs from GitHub.
- `#8461 <https://github.com/wazuh/wazuh/pull/8461>`_ FIM now expands wildcarded paths in the configuration on Windows agents.
- `#8754 <https://github.com/wazuh/wazuh/pull/8754>`_ FIM reloads wildcarded paths on full scans.
- `#8306 <https://github.com/wazuh/wazuh/pull/8306>`_ Added new ``path_suffix`` option to AWS module configuration.
- `#8331 <https://github.com/wazuh/wazuh/pull/8331>`_ Added new ``discard_regex`` option to AWS module configuration.
- `#8482 <https://github.com/wazuh/wazuh/pull/8482>`_ Added support for the S3 Server Access bucket type in AWS module.
- `#9119 <https://github.com/wazuh/wazuh/pull/9119>`_ Added support for Google Cloud Storage buckets using a new GCP module called ``gcp-bucket``.
- `#9119 <https://github.com/wazuh/wazuh/pull/9119>`_ Added support for Google Cloud Storage access logs to the ``gcp-bucket`` module.
- `#9420 <https://github.com/wazuh/wazuh/pull/9420>`_ Added support for VPC endpoints in AWS module.
- `#9279 <https://github.com/wazuh/wazuh/pull/9279>`_ Added support for GCS access logs in the GCP module.
- `#10198 <https://github.com/wazuh/wazuh/pull/10198>`_ Added an iam role session duration parameter to AWS module.
- `#8826 <https://github.com/wazuh/wazuh/pull/8826>`_ Added support for variables in SCA policies.
- `#7721 <https://github.com/wazuh/wazuh/pull/7721>`_ FIM now fills an audit rule file to support who-data although Audit is in immutable mode.
- `#8957 <https://github.com/wazuh/wazuh/pull/8957>`_ Introduced an integration to collect audit logs from Office365.
- `#10168 <https://github.com/wazuh/wazuh/pull/10168>`_ Added a new field ``DisplayVersion`` to Syscollector to help Vulnerability Detector match vulnerabilities for Windows.
- `#10148 <https://github.com/wazuh/wazuh/pull/10148>`_ Added support for macOS agent upgrade via WPK.
- `#8632 <https://github.com/wazuh/wazuh/pull/8632>`_ Added Logcollector support for macOS logs (Unified Logging System).
- `#8381 <https://github.com/wazuh/wazuh/pull/8381>`_ The agent now reports the version of the running AIX operating system to the manager. 
- `#8604 <https://github.com/wazuh/wazuh/pull/8604>`_ Improved the reliability of the user ID parsing in FIM who-data mode on Linux.
- `#10230 <https://github.com/wazuh/wazuh/pull/10230>`_ Reword AWS ``service_endpoint`` parameter description to suit FIPS endpoints too.
- `#5047 <https://github.com/wazuh/wazuh/pull/5047>`_ Extended support of Logcollector for MySQL 4.7 logs. Thanks to @YoyaYOSHIDA.
- `#9887 <https://github.com/wazuh/wazuh/pull/9887>`_ Agents running on FreeBSD and OpenBSD now report their IP address.
- `#8202 <https://github.com/wazuh/wazuh/pull/8202>`_ Reduced verbosity of FIM debugging logs.
- `#9992 <https://github.com/wazuh/wazuh/pull/9992>`_ The agent's IP resolution frequency has been limited to prevent high CPU load.
- `#10236 <https://github.com/wazuh/wazuh/pull/10236>`_ Syscollector has been optimized to use lees memory.
- `#10337 <https://github.com/wazuh/wazuh/pull/10337>`_ Added support of ZscalerOS system information in the agent.
- `#10259 <https://github.com/wazuh/wazuh/pull/10259>`_ Syscollector has been extended to collect missing Microsoft product hotfixes.
- `#10396 <https://github.com/wazuh/wazuh/pull/10396>`_ Updated the osquery integration to find the new osqueryd location as of version 5.0.
- `#9123 <https://github.com/wazuh/wazuh/pull/9123>`_ The internal FIM data handling has been simplified to find files by their path instead of their inode.
- `#9764 <https://github.com/wazuh/wazuh/pull/9764>`_ Reimplemented the WPK installer rollback on Windows.
- `#10208 <https://github.com/wazuh/wazuh/pull/10208>`_ Active responses for Windows agents now support native fields from Eventchannel.
- `#10651 <https://github.com/wazuh/wazuh/pull/10651>`_ Error logs by Logcollector when a file is missing have been changed to info logs.
- `#8724 <https://github.com/wazuh/wazuh/pull/8724>`_ The agent MSI installer for Windows now detects the platform version to install the default configuration.
- `#3659 <https://github.com/wazuh/wazuh/pull/3659>`_ Agent logs for inability to resolve the manager hostname now have info level.
- `#10900 <https://github.com/wazuh/wazuh/pull/10900>`_ Removed oscap module files as it was already deprecated since v4.0.0.


RESTful API
^^^^^^^^^^^

- `#7988 <https://github.com/wazuh/wazuh/pull/7988>`_ Added new ``PUT /agents/reconnect`` endpoint to force agents reconnection to the manager.
- `#6761 <https://github.com/wazuh/wazuh/pull/6761>`_ Added ``select`` parameter to the ``GET /security/users``, ``GET /security/roles``, ``GET /security/rules`` and ``GET /security/policies`` endpoints.
- `#8100 <https://github.com/wazuh/wazuh/pull/8100>`_ Added type and status filters to ``GET /vulnerability/{agent_id}`` endpoint.
- `#7490 <https://github.com/wazuh/wazuh/pull/7490>`_ Added an option to configure SSL ciphers.
- `#8919 <https://github.com/wazuh/wazuh/pull/8919>`_ Added an option to configure the maximum response time of the API.
- `#8945 <https://github.com/wazuh/wazuh/pull/8945>`_ Added new ``DELETE /rootcheck/{agent_id}`` endpoint.
- `#9028 <https://github.com/wazuh/wazuh/pull/9028>`_ Added new ``GET /vulnerability/{agent_id}/last_scan`` endpoint to check the latest vulnerability scan of an agent.
- `#9028 <https://github.com/wazuh/wazuh/pull/9028>`_ Added new ``cvss`` and ``severity`` fields and filters to ``GET /vulnerability/{agent_id}`` endpoint.
- `#9100 <https://github.com/wazuh/wazuh/pull/9100>`_ Added an option to configure the maximum allowed API upload size.
- `#9142 <https://github.com/wazuh/wazuh/pull/9142>`_ Added new unit and integration tests for API models.
- `#9077 <https://github.com/wazuh/wazuh/pull/9077>`_ Added message with the PID of ``wazuh-apid`` process when launched in foreground mode.
- `#9144 <https://github.com/wazuh/wazuh/pull/9144>`_ Added ``external id``, ``source`` and ``url`` to the MITRE endpoints responses.
- `#9297 <https://github.com/wazuh/wazuh/pull/9297>`_ Added custom healthchecks for legacy agents in API integration tests, improving maintainability.
- `#9914 <https://github.com/wazuh/wazuh/pull/9914>`_ Added new unit tests for the API python module to increase coverage.
- `#10238 <https://github.com/wazuh/wazuh/pull/10238>`_ Added docker logs separately in API integration tests environment to get cleaner reports.
- `#10437 <https://github.com/wazuh/wazuh/pull/10437>`_ Added new ``disconnection_time`` field to ``GET /agents`` response.
- `#10457 <https://github.com/wazuh/wazuh/pull/10457>`_ Added new filters to agents upgrade endpoints.
- `#8288 <https://github.com/wazuh/wazuh/pull/8288>`_ Added new API endpoints to access all the MITRE information.
- `#10947 <https://github.com/wazuh/wazuh/pull/10947>`_ Show agent-info permissions flag when using cluster_control and in the ``GET /cluster/healthcheck`` API endpoint.
- `#7490 <https://github.com/wazuh/wazuh/pull/7490>`_ Renamed SSL protocol configuration parameter.
- `#8827 <https://github.com/wazuh/wazuh/pull/8827>`_ Reviewed and updated API spec examples and JSON body examples.
- Improved the performance of several API endpoints. This is specially appreciable in environments with a big number of agents:
  - `#8937 <https://github.com/wazuh/wazuh/pull/8937>`_ Improved ``PUT /agents/group`` endpoint.
  - `#8938 <https://github.com/wazuh/wazuh/pull/8938>`_ Improved ``PUT /agents/restart`` endpoint.
  - `#8950 <https://github.com/wazuh/wazuh/pull/8950>`_ Improved ``DELETE /agents`` endpoint.
  - `#8959 <https://github.com/wazuh/wazuh/pull/8959>`_ Improved ``PUT /rootcheck`` endpoint.
  - `#8966 <https://github.com/wazuh/wazuh/pull/8966>`_ Improved ``PUT /syscheck`` endpoint.
  - `#9046 <https://github.com/wazuh/wazuh/pull/9046>`_ Improved ``DELETE /groups`` endpoint and changed API response to be more consistent.
- `#8945 <https://github.com/wazuh/wazuh/pull/8945>`_ Changed ``DELETE /rootcheck`` endpoint to ``DELETE /experimental/rootcheck``.
- `#9012 <https://github.com/wazuh/wazuh/pull/9012>`_ Reduced the time it takes for ``wazuh-apid`` process to check its configuration when using the -t parameter.
- `#9019 <https://github.com/wazuh/wazuh/pull/9019>`_ Fixed malfunction in the ``sort`` parameter of syscollector endpoints.
- `#9113 <https://github.com/wazuh/wazuh/pull/9113>`_ Improved API integration tests stability when failing in entrypoint.
- `#9228 <https://github.com/wazuh/wazuh/pull/9228>`_ Made SCA API integration tests dynamic to validate responses coming from any agent version.
- `#9227 <https://github.com/wazuh/wazuh/pull/9227>`_ Refactored and standardized all the date fields in the API responses to use ISO8601.
- `#9263 <https://github.com/wazuh/wazuh/pull/9263>`_ Removed ``Server`` header from API HTTP responses.
- `#9371 <https://github.com/wazuh/wazuh/pull/9371>`_ Improved JWT implementation by replacing HS256 signing algorithm with RS256.
- `#10009 <https://github.com/wazuh/wazuh/pull/10009>`_ Removed limit of agents to upgrade using the API upgrade endpoints.
- `#10158 <https://github.com/wazuh/wazuh/pull/10158>`_ Changed Windows agents FIM responses to return permissions as JSON.
- `#10389 <https://github.com/wazuh/wazuh/pull/10389>`_ Adapted API endpoints to changes in ``wazuh-authd`` daemon ``force`` parameter.
- `#10512 <https://github.com/wazuh/wazuh/pull/10512>`_ Deprecated ``use_only_authd`` API configuration option and related functionality. ``wazuh-authd`` will always be required for creating and removing agents.
- `#10745 <https://github.com/wazuh/wazuh/pull/10745>`_ Improved API validators and related unit tests.
- `#10905 <https://github.com/wazuh/wazuh/pull/10905>`_ Improved specific module healthchecks in API integration tests environment.
- `#10916 <https://github.com/wazuh/wazuh/pull/10916>`_ Changed thread pool executors for process pool executors to improve API availability.
- `#8599 <https://github.com/wazuh/wazuh/pull/8599>`_ Removed select parameter from GET /agents/stats/distinct endpoint.
- `#8099 <https://github.com/wazuh/wazuh/pull/8099>`_ Removed ``GET /mitre`` endpoint.


Ruleset
^^^^^^^

- `#10428 <https://github.com/wazuh/wazuh/pull/10428>`_ Added Rules and Decoders for Wazuh API.
- `#10458 <https://github.com/wazuh/wazuh/pull/10458>`_ Added Rules and Decoders for TrendMicro Cloud One.
- `#10496 <https://github.com/wazuh/wazuh/pull/10496>`_ Added Rules for Sophos UTM Firewall.
- `#10369 <https://github.com/wazuh/wazuh/pull/10369>`_ Added SCA policy for Solaris 11.4.
- `#10658 <https://github.com/wazuh/wazuh/pull/10658>`_ Added Rules for Cloudflare WAF.
- `#10667 <https://github.com/wazuh/wazuh/pull/10667>`_ Added Rules and Decoders for FortiAuth.
- `#10315 <https://github.com/wazuh/wazuh/pull/10315>`_ Updated Amazon Linux 2 SCA up to version 2.0.0.
- `#10354 <https://github.com/wazuh/wazuh/pull/10354>`_ Updated RedHat Enterprise Linux 8 SCA up to version 1.0.1.
- `#10507 <https://github.com/wazuh/wazuh/pull/10507>`_ Updated Amazon rules to add more granularity.
- `#10558 <https://github.com/wazuh/wazuh/pull/10558>`_ Updated macOS Big Sur SCA up to 1.2.0 version.


Wazuh Kibana plugin
^^^^^^^^^^^^^^^^^^^

- `#3639 <https://github.com/wazuh/wazuh-kibana-app/pull/3639>`_ Added ability to filter the results fo the ``Network Ports`` table in the ``Inventory data`` section.
- `#3324 <https://github.com/wazuh/wazuh-kibana-app/pull/3324>`_ Added new endpoint service to collect the frontend logs into a file.
- `#3327 <https://github.com/wazuh/wazuh-kibana-app/pull/3327>`_ `#3321 <https://github.com/wazuh/wazuh-kibana-app/pull/3321>`_ `#3367 <https://github.com/wazuh/wazuh-kibana-app/pull/3367>`_ `#3373 <https://github.com/wazuh/wazuh-kibana-app/pull/3373>`_ `#3374 <https://github.com/wazuh/wazuh-kibana-app/pull/3374>`_ `#3390 <https://github.com/wazuh/wazuh-kibana-app/pull/3390>`_ `#3410 <https://github.com/wazuh/wazuh-kibana-app/pull/3410>`_ `#3408 <https://github.com/wazuh/wazuh-kibana-app/pull/3408>`_ `#3429 <https://github.com/wazuh/wazuh-kibana-app/pull/3429>`_ `#3427 <https://github.com/wazuh/wazuh-kibana-app/pull/3427>`_ `#3417 <https://github.com/wazuh/wazuh-kibana-app/pull/3417>`_ `#3462 <https://github.com/wazuh/wazuh-kibana-app/pull/3462>`_ `#3451 <https://github.com/wazuh/wazuh-kibana-app/pull/3451>`_ `#3442 <https://github.com/wazuh/wazuh-kibana-app/pull/3442>`_ `#3480 <https://github.com/wazuh/wazuh-kibana-app/pull/3480>`_ `#3472 <https://github.com/wazuh/wazuh-kibana-app/pull/3472>`_ `#3434 <https://github.com/wazuh/wazuh-kibana-app/pull/3434>`_ `#3392 <https://github.com/wazuh/wazuh-kibana-app/pull/3392>`_ `#3404 <https://github.com/wazuh/wazuh-kibana-app/pull/3404>`_ `#3432 <https://github.com/wazuh/wazuh-kibana-app/pull/3432>`_ `#3415 <https://github.com/wazuh/wazuh-kibana-app/pull/3415>`_ `#3469 <https://github.com/wazuh/wazuh-kibana-app/pull/3469>`_ `#3448 <https://github.com/wazuh/wazuh-kibana-app/pull/3448>`_ `#3465 <https://github.com/wazuh/wazuh-kibana-app/pull/3465>`_ `#3464 <https://github.com/wazuh/wazuh-kibana-app/pull/3464>`_ `#3478 <https://github.com/wazuh/wazuh-kibana-app/pull/3478>`_ Improved the frontend handle errors strategy: UI, Toasts, console log and log in file.
- `#3196 <https://github.com/wazuh/wazuh-kibana-app/pull/3196>`_ Added fields status and type in vulnerabilities table.
- `#3368 <https://github.com/wazuh/wazuh-kibana-app/pull/3368>`_ `#3344 <https://github.com/wazuh/wazuh-kibana-app/pull/3344>`_ Added Intelligence tab to Mitre Att&ck module.
- `#3424 <https://github.com/wazuh/wazuh-kibana-app/pull/3424>`_ Added sample data for office365 events.
- `#3475 <https://github.com/wazuh/wazuh-kibana-app/pull/3475>`_ Created a separate component to check for sample data.
- `#3506 <https://github.com/wazuh/wazuh-kibana-app/pull/3506>`_ Added a new hook for getting value suggestions.
- `#3531 <https://github.com/wazuh/wazuh-kibana-app/pull/3531>`_ Added dinamic simple filters and adding simple GitHub filters fields
- `#3524 <https://github.com/wazuh/wazuh-kibana-app/pull/3524>`_ Added configuration viewer for Module Office365 on the Configuration section of the Management menu.
- `#3518 <https://github.com/wazuh/wazuh-kibana-app/pull/3518>`_ Added base Module Panel view with Office365 setup.
- `#3533 <https://github.com/wazuh/wazuh-kibana-app/pull/3533>`_ Added specifics and custom filters for Office365 search bar.
- `#3544 <https://github.com/wazuh/wazuh-kibana-app/pull/3544>`_ Adding Pagination and filter to drilldown tables at Office pannel.
- `#3568 <https://github.com/wazuh/wazuh-kibana-app/pull/3568>`_ Simple filters change between panel and drilldown panel.
- `#3525 <https://github.com/wazuh/wazuh-kibana-app/pull/3525>`_ Added new fields in Inventory table and Flyout Details.
- `#3691 <https://github.com/wazuh/wazuh-kibana-app/pull/3691>`_ Added columns selector in agents table.
- `#3121 <https://github.com/wazuh/wazuh-kibana-app/pull/3121>`_ Changed ossec to wazuh in sample-data.
- `#3279 <https://github.com/wazuh/wazuh-kibana-app/pull/3279>`_ Changed empty fields in FIM tables and ``syscheck.value_name`` in discovery now show an empty tag for visual clarity.
- `#3346 <https://github.com/wazuh/wazuh-kibana-app/pull/3346>`_ Adapted the Mitre tactics and techniques resources to use the API endpoints.
- `#3517 <https://github.com/wazuh/wazuh-kibana-app/pull/3517>`_ Moved the filterManager subscription to the hook useFilterManager.
- `#3529 <https://github.com/wazuh/wazuh-kibana-app/pull/3529>`_ Change filter from is to is one of in custom searchbar.
- `#3494 <https://github.com/wazuh/wazuh-kibana-app/pull/3494>`_ Refactored as module tabs and buttons are rendered.
- `#3663 <https://github.com/wazuh/wazuh-kibana-app/pull/3663>`_ Updated depracated and new references authd.
- `#3549 <https://github.com/wazuh/wazuh-kibana-app/pull/3549>`_ Added time subscription to Discover component.
- `#3494 <https://github.com/wazuh/wazuh-kibana-app/pull/3494>`_ Refactored as module tabs and buttons are rendered.
- `#3446 <https://github.com/wazuh/wazuh-kibana-app/pull/3446>`_ Testing logs using the Ruletest Test don't display the rule information if not matching a rule.
- `#3649 <https://github.com/wazuh/wazuh-kibana-app/pull/3649>`_ Changed format permissions in FIM inventory.
- `#3686 <https://github.com/wazuh/wazuh-kibana-app/pull/3686>`_ Changed of request for one that does not return data that is not necessary to optimize times.


Others
^^^^^^

- `#10247 <https://github.com/wazuh/wazuh/pull/10247>`_ Upgraded external SQLite library dependency version to 3.36.
- `#10247 <https://github.com/wazuh/wazuh/pull/10247>`_ Upgraded external BerkeleyDB library dependency version to 18.1.40.
- `#10247 <https://github.com/wazuh/wazuh/pull/10247>`_ Upgraded external OpenSSL library dependency version to 1.1.1l.
- `#10927 <https://github.com/wazuh/wazuh/pull/10927>`_ Upgraded external Google Test library dependency version to 1.11.


Resolved issues
---------------

This release resolves known issues. 


Manager
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#8223 <https://github.com/wazuh/wazuh/pull/8223>`_               Fixed a memory defect in Remoted when closing connection handles.
`#7625 <https://github.com/wazuh/wazuh/pull/7625>`_               Fixed a timing problem in the manager that might prevent Analysisd from sending Active responses to agents.
`#8210 <https://github.com/wazuh/wazuh/pull/8210>`_               Fixed a bug in Analysisd that did not apply field lookup in rules that overwrite other ones.
`#8902 <https://github.com/wazuh/wazuh/pull/8902>`_               Prevented the manager from leaving dangling agent database files.
`#8254 <https://github.com/wazuh/wazuh/pull/8254>`_               Corrected remediation message for error code 6004.
`#8157 <https://github.com/wazuh/wazuh/pull/8157>`_               Fixed a bug when deleting non-existing users or roles in the security SDK.
`#8418 <https://github.com/wazuh/wazuh/pull/8418>`_               Fixed a bug with ``agent.conf`` file permissions when creating an agent group.
`#8422 <https://github.com/wazuh/wazuh/pull/8422>`_               Fixed wrong exceptions with wdb pagination mechanism.
`#8747 <https://github.com/wazuh/wazuh/pull/8747>`_               Fixed error when loading some rules with the ``\`` character.
`#9216 <https://github.com/wazuh/wazuh/pull/9216>`_               Changed ``WazuhDBQuery`` class to properly close socket connections and prevent file descriptor leaks.
`#10320 <https://github.com/wazuh/wazuh/pull/10320>`_             Fixed error in the api configuration when using the ``agent_upgrade`` script.
`#10341 <https://github.com/wazuh/wazuh/pull/10341>`_             Handle ``JSONDecodeError`` in Distributed API class methods.
`#9738 <https://github.com/wazuh/wazuh/pull/9738>`_               Fixed an issue with duplicated logs in Azure-logs module and applied several improvements to it.
`#10680 <https://github.com/wazuh/wazuh/pull/10680>`_             Fixed the query parameter validation to allow usage of special chars in Azure module.
`#8394 <https://github.com/wazuh/wazuh/pull/8394>`_               Fix a bug running ``wazuh-clusterd`` process when it was already running.
`#8732 <https://github.com/wazuh/wazuh/pull/8732>`_               Allow cluster to send and receive messages with size higher than request_chunk.
`#9077 <https://github.com/wazuh/wazuh/pull/9077>`_               Fixed a bug that caused ``wazuh-clusterd`` process to not delete its pidfile when running in foreground mode and it is stopped.
`#10376 <https://github.com/wazuh/wazuh/pull/10376>`_             Fixed race condition due to lack of atomicity in the cluster synchronization mechanism.
`#10492 <https://github.com/wazuh/wazuh/pull/10492>`_             Fixed bug when displaying the dates of the cluster tasks that have not finished yet. Now ``n/a`` is displayed in these cases.
`#9196 <https://github.com/wazuh/wazuh/pull/9196>`_               Fixed missing field ``value_type`` in FIM alerts.
`#9292 <https://github.com/wazuh/wazuh/pull/9292>`_               Fixed a typo in the SSH Integrity Check script for Agentless.
`#10421 <https://github.com/wazuh/wazuh/pull/10421>`_             Fixed multiple race conditions in Remoted.
`#10390 <https://github.com/wazuh/wazuh/pull/10390>`_             The manager's agent database has been fixed to prevent dangling entries from removed agents.
`#9765 <https://github.com/wazuh/wazuh/pull/9765>`_               Fixed the alerts generated by FIM when a lookup operation on an SID fails.
`#10866 <https://github.com/wazuh/wazuh/pull/10866>`_             Fixed a bug that caused cluster agent-groups files to be synchronized multiple times unnecessarily.
`#10922 <https://github.com/wazuh/wazuh/pull/10922>`_             Fixed an issue in Wazuh DB that compiled the SQL statements multiple times unnecessarily.
`#10948 <https://github.com/wazuh/wazuh/pull/10948>`_             Fixed a crash in Analysisd when setting Active Response with agent_id = 0.
==============================================================    =============


Agent
^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#8784 <https://github.com/wazuh/wazuh/pull/8784>`_               Fixed a bug in FIM that did not allow monitoring new directories in real-time mode if the limit was reached at some point.
`#8941 <https://github.com/wazuh/wazuh/pull/8941>`_               Fixed a bug in FIM that threw an error when a query to the internal database returned no data.
`#8362 <https://github.com/wazuh/wazuh/pull/8362>`_               Fixed an error where the IP address was being returned along with the port for Amazon NLB service.
`#8372 <https://github.com/wazuh/wazuh/pull/8372>`_               Fixed AWS module to properly handle the exception raised when processing a folder without logs.
`#8433 <https://github.com/wazuh/wazuh/pull/8433>`_               Fixed a bug with AWS module when pagination is needed in the bucket.
`#8672 <https://github.com/wazuh/wazuh/pull/8672>`_               Fixed an error with the ipGeoLocation field in AWS Macie logs.
`#10333 <https://github.com/wazuh/wazuh/pull/10333>`_               Changed an incorrect debug message in the GCloud integration module.
`#7848 <https://github.com/wazuh/wazuh/pull/7848>`_               Data race conditions have been fixed in FIM.
`#10011 <https://github.com/wazuh/wazuh/pull/10011>`_             Fixed wrong command line display in the Syscollector process report on Windows.
`#10249 <https://github.com/wazuh/wazuh/pull/10249>`_             Prevented Modulesd from freezing if Analysisd or Agentd get stopped before it.
`#10405 <https://github.com/wazuh/wazuh/pull/10405>`_             Fixed wrong keepalive message from the agent when file merged.mg is missing.
`#10381 <https://github.com/wazuh/wazuh/pull/10381>`_             Fixed missing logs from the Windows agent when it's getting stopped.
`#10524 <https://github.com/wazuh/wazuh/pull/10524>`_             Fixed missing packages reporting in Syscollector for macOS due to empty architecture data.
`#7506 <https://github.com/wazuh/wazuh/pull/7506>`_               Fixed FIM on Linux to parse audit rules with multiple keys for who-data.
`#10639 <https://github.com/wazuh/wazuh/pull/10639>`_             Fixed Windows 11 version collection in the agent.
`#10602 <https://github.com/wazuh/wazuh/pull/10602>`_             Fixed missing Eventchannel location in Logcollector configuration reporting.
`#10794 <https://github.com/wazuh/wazuh/pull/10794>`_             Updated CloudWatch Logs integration to avoid crashing when AWS raises Throttling errors.
`#10718 <https://github.com/wazuh/wazuh/pull/10718>`_             Fixed AWS modules' log file filtering when there are logs with and without a prefix mixed in a bucket.
`#10884 <https://github.com/wazuh/wazuh/pull/10884>`_             Fixed a bug on the installation script that made upgrades not to update the code of the external integration modules.
`#10921 <https://github.com/wazuh/wazuh/pull/10921>`_             Fixed issue with AWS integration module trying to parse manually created folders as if they were files.
==============================================================    =============


RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#8196 <https://github.com/wazuh/wazuh/pull/8196>`_               Fixed inconsistency in RBAC resources for ``group:create``, ``decoders:update``, and ``rules:update`` actions.
`#8378 <https://github.com/wazuh/wazuh/pull/8378>`_               Fixed the handling of an API error message occurring when Wazuh is started with a wrong ``ossec.conf``. Now the execution continues and raises a warning.
`#8548 <https://github.com/wazuh/wazuh/pull/8548>`_               Fixed a bug with ``sort`` parameter that caused a wrong response when sorting by several fields.
`#8597 <https://github.com/wazuh/wazuh/pull/8597>`_               Fixed the description of ``force_time`` parameter in the API spec reference.
`#8537 <https://github.com/wazuh/wazuh/pull/8537>`_               Fixed API incorrect path in remediation message when maximum number of requests per minute is reached.
`#9071 <https://github.com/wazuh/wazuh/pull/9071>`_               Fixed agents' healthcheck error in the API integration test environment.
`#9077 <https://github.com/wazuh/wazuh/pull/9077>`_               Fixed a bug with ``wazuh-apid`` process handling of pidfiles when running in foreground mode.
`#9192 <https://github.com/wazuh/wazuh/pull/9192>`_               Fixed a bug with RBAC ``group_id`` matching.
`#9147 <https://github.com/wazuh/wazuh/pull/9147>`_               Removed temporal development keys and values from ``GET /cluster/healthcheck`` response.
`#9227 <https://github.com/wazuh/wazuh/pull/9227>`_               Fixed several errors when filtering by dates.
`#9262 <https://github.com/wazuh/wazuh/pull/9262>`_               Fixed limit in some endpoints like ``PUT /agents/group/{group_id}/restart`` and added a pagination method.
`#9320 <https://github.com/wazuh/wazuh/pull/9320>`_               Fixed bug with the ``search`` parameter resulting in invalid results.
`#9368 <https://github.com/wazuh/wazuh/pull/9368>`_               Fixed wrong values of ``external_id`` field in MITRE resources.
`#9399 <https://github.com/wazuh/wazuh/pull/9399>`_               Fixed how the API integration testing environment checks that wazuh-apid daemon is running before starting the tests.
`#9777 <https://github.com/wazuh/wazuh/pull/9777>`_               Add healthcheck to verify that ``logcollector`` stats are ready before starting the API integration test.
`#10159 <https://github.com/wazuh/wazuh/pull/10159>`_             Fixed API integration test healthcheck used in the ``vulnerability`` test cases.
`#10179 <https://github.com/wazuh/wazuh/pull/10179>`_             Fixed an error with ``PUT /agents/node/{node_id}/restart`` endpoint when no agents are present in selected node.
`#10322 <https://github.com/wazuh/wazuh/pull/10322>`_             Fixed RBAC experimental API integration tests expecting a 1760 code in implicit requests.
`#10289 <https://github.com/wazuh/wazuh/pull/10289>`_             Fixed cluster race condition that caused API integration test to randomly fail.
`#10619 <https://github.com/wazuh/wazuh/pull/10619>`_             Fixed ``PUT /agents/node/{node_id}/restart`` endpoint to exclude exception codes properly.
`#10666 <https://github.com/wazuh/wazuh/pull/10666>`_             Fixed ``PUT /agents/group/{group_id}/restart`` endpoint to exclude exception codes properly.
`#10656 <https://github.com/wazuh/wazuh/pull/10656>`_             Fixed agent endpoints q parameter to allow more operators when filtering by groups.
`#10830 <https://github.com/wazuh/wazuh/pull/10830>`_             Fixed API integration tests related to rule, decoder and task endpoints.
==============================================================    =============


Ruleset
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#10315 <https://github.com/wazuh/wazuh/pull/10315>`_             Fixed enabled-like checks for Amazon Linux 2 SCA.
`#10354 <https://github.com/wazuh/wazuh/pull/10354>`_             Fixed enabled-like checks for RedHat Enterprise Linux 8 SCA.
`#10406 <https://github.com/wazuh/wazuh/pull/10406>`_             Fixed typos and not working tests for Centos 7 SCA. Thanks to RonnyMaas (@RonnyMaas).
`#10707 <https://github.com/wazuh/wazuh/pull/10707>`_             Fixed YML syntax problems in Solaris 11.4 SCA.
`#10375 <https://github.com/wazuh/wazuh/pull/10375>`_             Fixed a typo in the Xbox Live Networking Service check for SCA.
==============================================================    =============


Wazuh Kibana plugin
^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#3384 <https://github.com/wazuh/wazuh-kibana-app/pull/3384>`_    Fixed creation of log files.
`#3484 <https://github.com/wazuh/wazuh-kibana-app/pull/3484>`_    Fixed double fetching alerts count when pinnin/unpinning the agent in Mitre Att&ck/Framework.
`#3490 <https://github.com/wazuh/wazuh-kibana-app/pull/3490>`_    Query config refactor.
`#3412 <https://github.com/wazuh/wazuh-kibana-app/pull/3412>`_    Fixed rules and decoders test flyout clickout event.
`#3430 <https://github.com/wazuh/wazuh-kibana-app/pull/3430>`_    Notify when you are registering an agent without permissions.
`#3438 <https://github.com/wazuh/wazuh-kibana-app/pull/3438>`_    Remove not used ``redirectRule`` query param when clicking the row table on CDB Lists/Decoders.
`#3439 <https://github.com/wazuh/wazuh-kibana-app/pull/3439>`_    Fixed the code overflows over the line numbers in the API Console editor.
`#3440 <https://github.com/wazuh/wazuh-kibana-app/pull/3440>`_    Don't open the main menu when changing the seleted API or index pattern.
`#3443 <https://github.com/wazuh/wazuh-kibana-app/pull/3443>`_    Fix error message in conf managment.
`#3445 <https://github.com/wazuh/wazuh-kibana-app/pull/3445>`_    Fix size api selector when name is too long.
`#3456 <https://github.com/wazuh/wazuh-kibana-app/pull/3456>`_    Fixed error when edit a rule or decoder.
`#3458 <https://github.com/wazuh/wazuh-kibana-app/pull/3458>`_    Fixed index pattern selector doesn't display the ignored index patterns.
`#3553 <https://github.com/wazuh/wazuh-kibana-app/pull/3553>`_    Fixed error in /Management/Configuration when cluster is disabled.
`#3565 <https://github.com/wazuh/wazuh-kibana-app/pull/3565>`_    Fix the pinned filters were removed when accessing to the ``Panel`` tab of a module.
`#3645 <https://github.com/wazuh/wazuh-kibana-app/pull/3645>`_    Fixed multi-select component searcher handler.
`#3609 <https://github.com/wazuh/wazuh-kibana-app/pull/3609>`_    Fixed order logs properly in Management/Logs.
`#3661 <https://github.com/wazuh/wazuh-kibana-app/pull/3661>`_    Fixed the Wazuh API requests to ``GET //``.
`#3675 <https://github.com/wazuh/wazuh-kibana-app/pull/3675>`_    Fixed missing mitre tactics.
`#3488 <https://github.com/wazuh/wazuh-kibana-app/pull/3488>`_    Fix CDB list view not working with IPv6.
`#3466 <https://github.com/wazuh/wazuh-kibana-app/pull/3466>`_    Fixed the bad requests using Console tool to ``PUT /active-response`` API endpoint.
`#3605 <https://github.com/wazuh/wazuh-kibana-app/pull/3605>`_    Fixed group agent management table does not update on error.
`#3651 <https://github.com/wazuh/wazuh-kibana-app/pull/3651>`_    Fixed not showing packages details in agent inventory for a freeBSD agent SO.
`#3652 <https://github.com/wazuh/wazuh-kibana-app/pull/3652>`_    Fixed wazuh token deleted twice.
`#3687 <https://github.com/wazuh/wazuh-kibana-app/pull/3687>`_    Fixed handler of error on dev-tools.
`#3685 <https://github.com/wazuh/wazuh-kibana-app/pull/3685>`_    Fixed compatibility wazuh 4.3 - kibana 7.13.4.
`#3689 <https://github.com/wazuh/wazuh-kibana-app/pull/3689>`_    Fixed registry values without agent pinned in FIM>Events.
`#3688 <https://github.com/wazuh/wazuh-kibana-app/pull/3688>`_    Fixed breadcrumbs style compatibility for Kibana 7.14.2.
`#3682 <https://github.com/wazuh/wazuh-kibana-app/pull/3682>`_    Fixed security alerts table when filters change.
`#3692 <https://github.com/wazuh/wazuh-kibana-app/pull/3692>`_    Fixed error that shows we're using X-Pack when we have Basic.
`#3700 <https://github.com/wazuh/wazuh-kibana-app/pull/3700>`_    Fixed blank screen in Kibana 7.10.2.
==============================================================    =============


Others
^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#9168 <https://github.com/wazuh/wazuh/pull/9168>`_               Fixed error detection in the CURL helper library.
`#10899 <https://github.com/wazuh/wazuh/pull/10899>`_             Fixed external BerkeleyDB library support for GCC 11.
==============================================================    =============


Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.3.0-rc1/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/4.3-7.10---RC1/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.2.5-8.1.4/CHANGELOG.md>`_