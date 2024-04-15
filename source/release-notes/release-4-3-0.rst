.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
      :description: Wazuh 4.3.0 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_3_0:

4.3.0 Release notes - 5 May 2022
================================

This section lists the changes in version 4.3.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.


Highlights
----------


Wazuh 4.3.0 includes many new additions, such as a remarkable enhancement with the new :doc:`Wazuh indexer </getting-started/components/wazuh-indexer>` and :doc:`Wazuh dashboard </getting-started/components/wazuh-dashboard>` that improve the user experience and facilitate the management of the whole platform.

Version 4.3.0 enhances the performance of the Wazuh solution and adds new integrations such as the following:

- Vulnerability Detector support for Amazon Linux and Arch Linux
- New agent integrations with logs from Office 365 and GitHub
- Improved RESTful API availability thanks to the API now using multiple processes
- Now the Wazuh manager cluster uses multiple processes for improved performance
- Wazuh now supports Logcollector with native macOS logs (Unified Logging System)
- AWS S3 Server Access logs, Google Cloud Storage buckets, and access logs are now supported too

Below you will find more information about each of these new features.

With Wazuh 4.3.0, two new installers called the Wazuh indexer, and the Wazuh dashboard are available to users to facilitate installation, upgrades, and configuration. The Wazuh indexer is a customized OpenSearch distribution with configurations and tools needed to run out of the box for Wazuh. The Wazuh dashboard is a customized OpenSearch dashboards distribution with the Wazuh plugin embedded, plus new configurations and customizations.

The new Wazuh dashboard is a flexible and intuitive web interface for mining, analyzing, and visualizing data. It provides out-of-the-box dashboards, allowing users to navigate the interface that now presents a renewed design with a new palette of colors. The versioning equivalent to the Wazuh manager will allow upgrades without the risk of incompatibilities.

An installation assistant ``wazuh-install.sh`` is available to users, allowing any type of installation, whether an all-in-one, single node, or multi-node. This is possible by simply defining a configuration file, with everything connected and secured, including random passwords and generated certificates. In addition, Debian and RPM packages for ppc64le architectures are made available to users.

.. thumbnail::  ../images/release-notes/4.3.0/Wazuh-dashboard.png
      :align: center
      :width: 60%
      :title: This new version brings the new Wazuh dashboard


Now, the agent is able to collect the installed packages inventory on Amazon Linux and Arch Linux, giving support to Vulnerability Detector for reporting vulnerability exposures. In addition, the Vulnerability Detector now manages a vulnerability inventory and produces alerts during the first agents scan and when a new vulnerability is either found or solved.

.. thumbnail:: /images/release-notes/4.3.0/vulnerability-detection.png
      :title: vulnerability detection inventory
      :alt: vulnerability detection inventory
      :align: center      

New integrations to collect auditing logs from Office 365 and GitHub are added to the agent in this new version. A side panel component that displays information about the active module of the Office 365 setup is introduced, and the Wazuh dashboard now includes events from Office 365. Moreover, Wazuh now supports Logcollector with native macOS logs (Unified Logging System), AWS S3 Server Access logs, and Google Cloud Storage buckets and access logs.

.. hlist::
    :columns: 2

    - .. thumbnail:: ../images/release-notes/4.3.0/Management-Configuration.png
    - .. thumbnail:: ../images/release-notes/4.3.0/Office-365-General.png


The RESTful API availability has been enhanced thanks to the API now using multiple processes. The performance of several API endpoints is also improved, which is especially palpable in large environments. Additionally, the agent batch is upgraded with an increased limit of agents per request and a new set of filters.

.. thumbnail::  ../images/release-notes/4.3.0/agent-batch-upgraded.png
      :align: center
      :title: The agent batch is upgraded


Wazuh v4.3.0 brings significant changes to the cluster, which now uses multiple processes to improve the performance. The results in the table below show a significant improvement for the cluster in this new version. The cluster tasks are performed 423% faster than in the previous version, approximately five times faster, while the RAM consumption decreased to a third. This performance is especially appreciable during the setup phase, where the cluster load is at its highest.

.. thumbnail::  ../images/release-notes/4.3.0/cluster-tasks.png
      :align: center
      :title: The cluster tasks are performed faster


We want to mention another Wazuh 4.3.0 significant new feature. It is related to a new Intelligence tab added to the MITRE ATT&CK module. This tab provides further information about MITRE resources such as groups, mitigations, tactics, and techniques using the new Wazuh API endpoints. Additionally, the Framework tab is adapted to the new Wazuh API endpoints.

Finally, it is important to remark that we maintain support for all installation alternatives. Indeed we maintain and extend this support by adding more recent versions.


What's new
----------

This release includes new features or enhancements.

Manager
^^^^^^^

- `#8178 <https://github.com/wazuh/wazuh/pull/8178>`_ Wazuh adds support for Arch Linux OS in Vulnerability Detector.
- `#8749 <https://github.com/wazuh/wazuh/pull/8749>`_ A log message in the ``cluster.log`` file is added to notify that wazuh-clusterd has been stopped.
- `#9077 <https://github.com/wazuh/wazuh/pull/9077>`_ Wazuh improves API and cluster processes behavior by adding the PID of the ``wazuh-clusterd`` processes and the API when these processes are started in foreground mode.
- `#10492 <https://github.com/wazuh/wazuh/pull/10492>`_ Time calculation is added when extra information is requested to the ``cluster_control`` binary.
- `#9209 <https://github.com/wazuh/wazuh/pull/9209>`_ Wazuh adds a context variable to indicate the origin module in socket communication messages.
- `#9733 <https://github.com/wazuh/wazuh/pull/9733>`_ A unit tests for framework/core files is added to increase coverage.
- `#9204 <https://github.com/wazuh/wazuh/pull/9204>`_ A verbose mode is added in the wazuh-logtest tool.
- `#8830 <https://github.com/wazuh/wazuh/pull/8830>`_ Wazuh adds Vulnerability Detector support for Amazon Linux.
- `#10693 <https://github.com/wazuh/wazuh/pull/10693>`_ The new option ``<force>`` to set the behavior is introduced when Authd finds conflicts on agent enrollment requests.
- `#9099 <https://github.com/wazuh/wazuh/pull/9099>`_ Wazuh adds sanitizers to the unit tests execution.
- `#8237 <https://github.com/wazuh/wazuh/pull/8237>`_ Vulnerability Detector introduces vulnerability inventory.
- The manager will only deliver alerts when new vulnerabilities are detected in agents or when they stop applying.
- `#11031 <https://github.com/wazuh/wazuh/pull/11031>`_ A mechanism to ensure the worker synchronization permissions are reset after a fixed period of time is added.
- `#11799 <https://github.com/wazuh/wazuh/pull/11799>`_ A new mechanism is now added to create and handle PID files for each child process of the API and cluster.
- `#8083 <https://github.com/wazuh/wazuh/pull/8083>`_ The internal handling of agent keys is changed in Remoted to speed up key reloading.
- `#7885 <https://github.com/wazuh/wazuh/pull/7885>`_ The option ``<server>`` of the Syslog output now supports hostname resolution.
- `#7763 <https://github.com/wazuh/wazuh/pull/7763>`_ The product's UNIX user and group are renamed to "wazuh".
- `#7865 <https://github.com/wazuh/wazuh/pull/7865>`_ The MITRE database is redesigned to provide full and searchable data.
- `#7358 <https://github.com/wazuh/wazuh/pull/7358>`_ The static fields related to FIM are ported to dynamic fields in Analysisd.
- `#8351 <https://github.com/wazuh/wazuh/pull/8351>`_ All randomly generated IDs used for cluster tasks are changed. Now, uuid4 is used to ensure IDs are not repeated.
- `#8873 <https://github.com/wazuh/wazuh/pull/8873>`_ The sendsync error log is Improved to provide more details of the used parameters.
- `#9708 <https://github.com/wazuh/wazuh/pull/9708>`_ The ``walk_dir`` function is changed to be iterative instead of recursive.
- `#10183 <https://github.com/wazuh/wazuh/pull/10183>`_ The Integrity sync behavior is refactored so that new synchronizations do not start until extra-valid files are processed.
- `#10101 <https://github.com/wazuh/wazuh/pull/10101>`_ Cluster synchronization is changed so that the content of the etc/shared folder is synchronized.
- `#8351 <https://github.com/wazuh/wazuh/pull/8351>`_ All XML file loads are changed. Now, ``defusedxml`` library is used to avoid possible XML-based attacks.
- `#8535 <https://github.com/wazuh/wazuh/pull/8535>`_ Configuration validation from execq socket is changed to com socket.
- `#8392 <https://github.com/wazuh/wazuh/pull/8392>`_ The utils unittest is updated to improve ``process_array`` function coverage.
- `#8885 <https://github.com/wazuh/wazuh/pull/8885>`_ The ``request_slice`` calculation is changed to improve efficiency when accessing wazuh-db data.
- `#9273 <https://github.com/wazuh/wazuh/pull/9273>`_ The retrieval of information from ``wazuh-db`` is improved to reach the optimum size in a single iteration.
- `#9234 <https://github.com/wazuh/wazuh/pull/9234>`_ The way framework uses context cached functions and adds a note on context_cached docstring is optimized.
- `#9332 <https://github.com/wazuh/wazuh/pull/9332>`_ The framework regexes is improved to be more specific and less vulnerable.
- `#9423 <https://github.com/wazuh/wazuh/pull/9423>`_ The framework exceptions are unified for non-active agents.
- `#9433 <https://github.com/wazuh/wazuh/pull/9433>`_ The RBAC policies are changed to case insensitive.
- `#9548 <https://github.com/wazuh/wazuh/pull/9548>`_ Framework stats module is refactored into SDK and core components to comply with Wazuh framework code standards.
- `#10309 <https://github.com/wazuh/wazuh/pull/10309>`_ The size of the agents' chunks sent to the upgrade socket is changed to make the upgrade endpoints faster.
- `#9408 <https://github.com/wazuh/wazuh/pull/9408>`_ The rootcheck and syscheck SDK code are refactored to make it clearer.
- `#9738 <https://github.com/wazuh/wazuh/pull/9738>`_ The Azure-logs module is adapted to use Microsoft Graph API instead of Active Directory Graph API.
- `#8060 <https://github.com/wazuh/wazuh/pull/8060>`_ Analysisd now reconnects to Active Response if Remoted or Execd gets restarted.
- `#10335 <https://github.com/wazuh/wazuh/pull/10335>`_ Agent key polling now supports cluster environments.
- `#10357 <https://github.com/wazuh/wazuh/pull/10357>`_ The support of Vulnerability Detector is extended for Debian 11 (Bullseye).
- `#10326 <https://github.com/wazuh/wazuh/pull/10326>`_ The remoted performance with an agent TCP connection sending queue is improved.
- `#9093 <https://github.com/wazuh/wazuh/pull/9093>`_ Agent DB synchronization has been boosted by caching the last data checksum in Wazuh DB.
- `#8892 <https://github.com/wazuh/wazuh/pull/8892>`_ Logtest now scans new ruleset files when loading a new session.
- `#8237 <https://github.com/wazuh/wazuh/pull/8237>`_ CVE alerts by Vulnerability Detector now include the time of detection, severity, and score.
- `#10849 <https://github.com/wazuh/wazuh/pull/10849>`_ The manager startup is fixed when ``<database_output>`` is enabled.
- Improved cluster performance using multiprocessing:
   - `#10767 <https://github.com/wazuh/wazuh/pull/10767>`_ The cluster ``local_integrity`` task is changed to run in a separate process to improve overall performance.
   - `#10807 <https://github.com/wazuh/wazuh/pull/10807>`_ Now, the cluster communication with the database for agent information synchronization runs in a separate parallel process.
   - `#10920 <https://github.com/wazuh/wazuh/pull/10920>`_ Now, the cluster processing of the extra-valid files in the master node is carried out in a separate parallel process.
   - `#11328 <https://github.com/wazuh/wazuh/pull/11328>`_ The cluster's file compression task in the master node is carried out in a separate parallel process.
   - `#11364 <https://github.com/wazuh/wazuh/pull/11364>`_ Now, the processing of Integrity files in worker nodes is carried out in a separate parallel process.
   - `#11386 <https://github.com/wazuh/wazuh/pull/11386>`_ Use cluster and API single processing when the wazuh user doesn't have permissions to access ``/dev/shm``.
- `#12446 <https://github.com/wazuh/wazuh/pull/12446>`_ Support for Windows 11 is added in Vulnerability Detector.
- `#12491 <https://github.com/wazuh/wazuh/pull/12491>`_ The Ubuntu OVAL feed URL to security-metadata.canonical.com is changed.
- `#12652 <https://github.com/wazuh/wazuh/pull/12652>`_ Now, ``Analysisd`` warns about missing rule dependencies instead of rejecting the ruleset.
- `#8399 <https://github.com/wazuh/wazuh/pull/8399>`_ The data reporting for Rootcheck scans in the agent_control tool has been deprecated.
- `#8846 <https://github.com/wazuh/wazuh/pull/8846>`_ The old framework functions used to calculate agent status are now removed.




Agent
^^^^^

- `#8016 <https://github.com/wazuh/wazuh/pull/8016>`_ An option is added to allow the agent to refresh the connection to the manager.
- `#8532 <https://github.com/wazuh/wazuh/pull/8532>`_ A new module to collect audit logs from GitHub is introduced.
- `#8461 <https://github.com/wazuh/wazuh/pull/8461>`_ FIM now expands wildcarded paths in the configuration on Windows agents.
- `#8754 <https://github.com/wazuh/wazuh/pull/8754>`_ FIM reloads wildcarded paths on full scans.
- `#8306 <https://github.com/wazuh/wazuh/pull/8306>`_ Wazuh adds a new ``path_suffix`` option to the AWS module configuration.
- `#8331 <https://github.com/wazuh/wazuh/pull/8331>`_ A new ``discard_regex`` option  is added to the AWS module configuration.
- `#8482 <https://github.com/wazuh/wazuh/pull/8482>`_ Wazuh adds support for the S3 Server Access bucket type in the AWS module.
- `#9119 <https://github.com/wazuh/wazuh/pull/9119>`_ Wazuh adds support for Google Cloud Storage buckets using a new GCP module called ``gcp-bucket``.
- `#9119 <https://github.com/wazuh/wazuh/pull/9119>`_ Wazuh adds support for Google Cloud Storage access logs to the ``gcp-bucket`` module.
- `#9420 <https://github.com/wazuh/wazuh/pull/9420>`_ Wazuh adds support for VPC endpoints in the AWS module.
- `#9279 <https://github.com/wazuh/wazuh/pull/9279>`_ Wazuh adds support for GCS access logs in the GCP module.
- `#10198 <https://github.com/wazuh/wazuh/pull/10198>`_ An AIM role session duration parameter to the AWS module is added.
- `#8826 <https://github.com/wazuh/wazuh/pull/8826>`_ Wazuh adds support for variables in SCA policies.
- `#7721 <https://github.com/wazuh/wazuh/pull/7721>`_ FIM now fills an audit rule file to support who-data, although Audit is in immutable mode.
- `#8957 <https://github.com/wazuh/wazuh/pull/8957>`_ An integration to collect audit logs from Office 365 is introduced.
- `#10168 <https://github.com/wazuh/wazuh/pull/10168>`_ A new field ``DisplayVersion`` to Syscollector to help Vulnerability Detector match vulnerabilities for Windows is added.
- `#10148 <https://github.com/wazuh/wazuh/pull/10148>`_ Wazuh adds support for macOS agent upgrade via WPK.
- `#8632 <https://github.com/wazuh/wazuh/pull/8632>`_ Wazuh adds Logcollector support for macOS logs (Unified Logging System).
- `#8381 <https://github.com/wazuh/wazuh/pull/8381>`_ The agent now reports the version of the running AIX operating system to the manager.
- `#8604 <https://github.com/wazuh/wazuh/pull/8604>`_ The reliability of the user ID parsing in FIM who-data mode on Linux is improved.
- `#10230 <https://github.com/wazuh/wazuh/pull/10230>`_ AWS ``service_endpoint`` parameter description to suit FIPS endpoints too is reworded.
- `#5047 <https://github.com/wazuh/wazuh/pull/5047>`_ The support of Logcollector for MySQL 4.7 logs is extended.
- `#9887 <https://github.com/wazuh/wazuh/pull/9887>`_ Agents running on FreeBSD and OpenBSD now report their IP addresses.
- `#8202 <https://github.com/wazuh/wazuh/pull/8202>`_ The verbosity of FIM debugging logs is reduced.
- `#9992 <https://github.com/wazuh/wazuh/pull/9992>`_ The agent's IP resolution frequency has been limited to prevent high CPU load.
- `#10236 <https://github.com/wazuh/wazuh/pull/10236>`_ Syscollector is optimized to use less memory.
- `#10337 <https://github.com/wazuh/wazuh/pull/10337>`_ Wazuh adds support of ZscalerOS system information in the agent.
- `#10259 <https://github.com/wazuh/wazuh/pull/10259>`_ Syscollector is extended to collect missing Microsoft product hotfixes.
- `#10396 <https://github.com/wazuh/wazuh/pull/10396>`_ The osquery integration is updated to find the new osqueryd location as of version 5.0.
- `#9123 <https://github.com/wazuh/wazuh/pull/9123>`_ The internal FIM data handling has been simplified to find files by their path instead of their inode.
- `#9764 <https://github.com/wazuh/wazuh/pull/9764>`_  The WPK installer rollback on Windows is reimplemented.
- `#10208 <https://github.com/wazuh/wazuh/pull/10208>`_ Active responses for Windows agents now support native fields from Eventchannel.
- `#10651 <https://github.com/wazuh/wazuh/pull/10651>`_ Error logs by Logcollector when a file is missing have been changed to info logs.
- `#8724 <https://github.com/wazuh/wazuh/pull/8724>`_ The agent MSI installer for Windows now detects the platform version to install the default configuration.
- `#3659 <https://github.com/wazuh/wazuh/pull/3659>`_ Agent logs for inability to resolve the manager hostname now have info level.
- `#11276 <https://github.com/wazuh/wazuh/pull/11276>`_ An ID number to connection enrollment logs is added.
- `#10838 <https://github.com/wazuh/wazuh/pull/10838>`_ Standardized the use of the ``only_logs_after`` parameter in the external integration modules.
- `#10900 <https://github.com/wazuh/wazuh/pull/10900>`_ The oscap module files are removed as it was already deprecated in version 4.0.0.
- `#12150 <https://github.com/wazuh/wazuh/pull/12150>`_ DockerListener integration shebang is updated to python3 for Wazuh agents.
- `#12779 <https://github.com/wazuh/wazuh/pull/12779>`_ The ico and jpg files have been updated with the new Wazuh logo for the Windows installer.


RESTful API
^^^^^^^^^^^

- `#7988 <https://github.com/wazuh/wazuh/pull/7988>`_ A new ``PUT /agents/reconnect`` endpoint is added to force agents reconnection to the manager.
- `#6761 <https://github.com/wazuh/wazuh/pull/6761>`_ The ``select`` parameter is added to the ``GET /security/users``, ``GET /security/roles``, ``GET /security/rules`` and ``GET /security/policies`` endpoints.
- `#8100 <https://github.com/wazuh/wazuh/pull/8100>`_ The type and status filters are added to ``GET /vulnerability/{agent_id}`` endpoint.
- `#7490 <https://github.com/wazuh/wazuh/pull/7490>`_ An option is added to configure SSL ciphers.
- `#8919 <https://github.com/wazuh/wazuh/pull/8919>`_ An option is added to configure the maximum response time of the API.
- `#8945 <https://github.com/wazuh/wazuh/pull/8945>`_ A new ``DELETE /rootcheck/{agent_id}`` endpoint is added.
- `#9028 <https://github.com/wazuh/wazuh/pull/9028>`_ A new ``GET /vulnerability/{agent_id}/last_scan`` endpoint is added to check the latest vulnerability scan of an agent.
- `#9028 <https://github.com/wazuh/wazuh/pull/9028>`_ A new ``cvss`` and ``severity`` fields and filters are added to ``GET /vulnerability/{agent_id}`` endpoint.
- `#9100 <https://github.com/wazuh/wazuh/pull/9100>`_ An option  is added to configure the maximum allowed API upload size.
- `#9142 <https://github.com/wazuh/wazuh/pull/9142>`_ A new unit and integration tests for API models are added.
- `#9077 <https://github.com/wazuh/wazuh/pull/9077>`_ A message with the PID of ``wazuh-apid`` process when launched in foreground mode  is added.
- `#9144 <https://github.com/wazuh/wazuh/pull/9144>`_ Wazuh adds ``external id``, ``source``, and ``url`` to the MITRE endpoints responses.
- `#9297 <https://github.com/wazuh/wazuh/pull/9297>`_ Custom healthchecks for legacy agents are added in API integration tests, improving maintainability.
- `#9914 <https://github.com/wazuh/wazuh/pull/9914>`_ A new unit test for the API python module  is added to increase coverage.
- `#10238 <https://github.com/wazuh/wazuh/pull/10238>`_ A docker logs separately in API integration tests environment are added to get cleaner reports.
- `#10437 <https://github.com/wazuh/wazuh/pull/10437>`_ A new ``disconnection_time`` field is added to ``GET /agents`` response.
- `#10457 <https://github.com/wazuh/wazuh/pull/10457>`_ New filters are added to agents' upgrade endpoints.
- `#8288 <https://github.com/wazuh/wazuh/pull/8288>`_ New MITRE API endpoints and framework functions are added to access all the MITRE information.
- `#10947 <https://github.com/wazuh/wazuh/pull/10947>`_ Show agent-info permissions flag is added when using cluster_control and in the ``GET /cluster/healthcheck`` API endpoint.
- `#11931 <https://github.com/wazuh/wazuh/pull/11931>`_ Save agents' ossec.log if an API integration test fails.
- `#12085 <https://github.com/wazuh/wazuh/pull/12085>`_ POST /security/user/authenticate/run_as endpoint is added to API bruteforce blocking system.
- `#12638 <https://github.com/wazuh/wazuh/pull/12638>`_ A new API endpoint is added to obtain summaries of agent vulnerabilities' inventory items.
- `#12727 <https://github.com/wazuh/wazuh/pull/12727>`_ The new fields external_references, condition, title, published, and updated are added to GET /vulnerability/{agent_id} API endpoint.
- `#13262 <https://github.com/wazuh/wazuh/pull/13262>`_ The possibility to include strings in brackets in values of the q parameter is added.
- `#7490 <https://github.com/wazuh/wazuh/pull/7490>`_ The SSL protocol configuration parameter is renamed.
- `#8827 <https://github.com/wazuh/wazuh/pull/8827>`_ The API spec examples and JSON body examples are reviewed and updated.
- The performance of several API endpoints is improved. This is especially appreciable in environments with a big number of agents:
   - `#8937 <https://github.com/wazuh/wazuh/pull/8937>`_ The endpoint parameter ``PUT /agents/group`` is improved.
   - `#8938 <https://github.com/wazuh/wazuh/pull/8938>`_ The endpoint parameter ``PUT /agents/restart`` is improved.
   - `#8950 <https://github.com/wazuh/wazuh/pull/8950>`_ The endpoint parameter ``DELETE /agents`` is improved.
   - `#8959 <https://github.com/wazuh/wazuh/pull/8959>`_ The endpoint parameter ``PUT /rootcheck`` is improved.
   - `#8966 <https://github.com/wazuh/wazuh/pull/8966>`_ The endpoint parameter ``PUT /syscheck`` is improved.
   - `#9046 <https://github.com/wazuh/wazuh/pull/9046>`_ The endpoint parameter ``DELETE /groups`` is improved and API response is changed to be more consistent.
- `#8945 <https://github.com/wazuh/wazuh/pull/8945>`_ The endpoint parameter ``DELETE /rootcheck`` is changed to ``DELETE /experimental/rootcheck``.
- `#9012 <https://github.com/wazuh/wazuh/pull/9012>`_ The time it takes for ``wazuh-apid`` process is reduced to check its configuration when using the -t parameter.
- `#9019 <https://github.com/wazuh/wazuh/pull/9019>`_ The malfunction in the ``sort`` parameter of syscollector endpoints is fixed.
- `#9113 <https://github.com/wazuh/wazuh/pull/9113>`_ The API integration tests stability when failing in entrypoint is improved.
- `#9228 <https://github.com/wazuh/wazuh/pull/9228>`_ The SCA API integration tests dynamic to validate responses coming from any agent version are fixed.
- `#9227 <https://github.com/wazuh/wazuh/pull/9227>`_ All the date fields in the API responses to use ISO8601 are refactored and standardized.
- `#9263 <https://github.com/wazuh/wazuh/pull/9263>`_ The ``Server`` header from API HTTP responses is removed.
- `#9371 <https://github.com/wazuh/wazuh/pull/9371>`_ The JWT implementation by replacing HS256 signing algorithm with RS256 is improved.
- `#10009 <https://github.com/wazuh/wazuh/pull/10009>`_ The limit of agents to upgrade using the API upgrade endpoints is removed.
- `#10158 <https://github.com/wazuh/wazuh/pull/10158>`_ The Windows agent's FIM responses are changed to return permissions as JSON.
- `#10389 <https://github.com/wazuh/wazuh/pull/10389>`_ The API endpoints are adapted to changes in ``wazuh-authd`` daemon ``force`` parameter.
- `#10512 <https://github.com/wazuh/wazuh/pull/10512>`_ The ``use_only_authd`` API configuration option and related functionality are deprecated. ``wazuh-authd`` will always be required for creating and removing agents.
- `#10745 <https://github.com/wazuh/wazuh/pull/10745>`_ The API validators and related unit tests are improved.
- `#10905 <https://github.com/wazuh/wazuh/pull/10905>`_ The specific module healthchecks in API integration tests environment is improved.
- `#10916 <https://github.com/wazuh/wazuh/pull/10916>`_ The thread pool executors for process pool executors to improve API availability is changed.
- `#11410 <https://github.com/wazuh/wazuh/pull/11410>`_ The HTTPS options to use files instead of relative paths are changed.
- `#8599 <https://github.com/wazuh/wazuh/pull/8599>`_ The select parameter from GET /agents/stats/distinct endpoint is removed.
- `#8099 <https://github.com/wazuh/wazuh/pull/8099>`_ The ``GET /mitre`` endpoint is removed.
- `#11410 <https://github.com/wazuh/wazuh/pull/11410>`_ The option to set the log ``path`` in the configuration is deprecated.


Ruleset
^^^^^^^

- `#11306 <https://github.com/wazuh/wazuh/pull/11306>`_ Carbanak detection rules are added.
- `#11309 <https://github.com/wazuh/wazuh/pull/11309>`_ Cisco FTD rules and decoders are added.
- `#11284 <https://github.com/wazuh/wazuh/pull/11284>`_ Decoders for AWS EKS service are added.
- `#11394 <https://github.com/wazuh/wazuh/pull/11394>`_ F5 BIG IP ruleset is added.
- `#11191 <https://github.com/wazuh/wazuh/pull/11191>`_ GCP VPC storage, firewall, and flow rules are added.
- `#11323 <https://github.com/wazuh/wazuh/pull/11323>`_ GitLab 12.0 ruleset are added.
- `#11289 <https://github.com/wazuh/wazuh/pull/11289>`_ Microsoft Exchange Server rules and decoders are added.
- `#11390 <https://github.com/wazuh/wazuh/pull/11390>`_ Microsoft Windows persistence by using registry keys detection is added.
- `#11274 <https://github.com/wazuh/wazuh/pull/11274>`_ Oracle Database 12c rules and decoders are added.
- `#8476 <https://github.com/wazuh/wazuh/pull/8476>`_ Rules for Carbanak step 1.A - User Execution: Malicious files are added.
- `#11212 <https://github.com/wazuh/wazuh/pull/11212>`_ Rules for Carbanak step 2.A - Local discoveries are added.
- `#9075 <https://github.com/wazuh/wazuh/pull/9075>`_ Rules for Carbanak step 2.B - Screen capture is added.
- `#9097 <https://github.com/wazuh/wazuh/pull/9097>`_ Rules for Carbanak step 5.B - Lateral movement via SSH are added.
- `#11342 <https://github.com/wazuh/wazuh/pull/11342>`_ Rules for Carbanak step 9.A - User monitoring is added.
- `#11373 <https://github.com/wazuh/wazuh/pull/11373>`_ Rules for Cloudflare WAF are added.
- `#11013 <https://github.com/wazuh/wazuh/pull/11013>`_ Ruleset for ESET Remote console is added.
- `#8532 <https://github.com/wazuh/wazuh/pull/8532>`_ Ruleset for GitHub audit logs are added.
- `#11137 <https://github.com/wazuh/wazuh/pull/11137>`_ Ruleset for Palo Alto v8.X - v10.X are added.
- `#11431 <https://github.com/wazuh/wazuh/pull/11431>`_ SCA policy for Amazon Linux 1 is added.
- `#11480 <https://github.com/wazuh/wazuh/pull/11480>`_ SCA policy for Amazon Linux 2 is added.
- `#7035 <https://github.com/wazuh/wazuh/pull/7035>`_ SCA policy for apple macOS 10.14 Mojave is added.
- `#7036 <https://github.com/wazuh/wazuh/pull/7036>`_ SCA policy for apple macOS 10.15 Catalina is added.
- `#11454 <https://github.com/wazuh/wazuh/pull/11454>`_ SCA policy for macOS Big Sur is added.
- `#11250 <https://github.com/wazuh/wazuh/pull/11250>`_ SCA policy for Microsoft IIS 10 is added.
- `#11249 <https://github.com/wazuh/wazuh/pull/11249>`_ SCA policy for Microsoft SQL 2016 is added.
- `#11247 <https://github.com/wazuh/wazuh/pull/11247>`_ SCA policy for Mongo Database 3.6 is added.
- `#11248 <https://github.com/wazuh/wazuh/pull/11248>`_ SCA policy for NGINX is added.
- `#11245 <https://github.com/wazuh/wazuh/pull/11245>`_ SCA policy for Oracle Database 19c is added.
- `#11154 <https://github.com/wazuh/wazuh/pull/11154>`_ SCA policy for PostgreSQL 13 is added.
- `#11223 <https://github.com/wazuh/wazuh/pull/11223>`_ SCA policy for SUSE Linux Enterprise Server 15
- `#11432 <https://github.com/wazuh/wazuh/pull/11432>`_ SCA policy for Ubuntu 14 is added.
- `#11452 <https://github.com/wazuh/wazuh/pull/11452>`_ SCA policy for Ubuntu 16 is added.
- `#11453 <https://github.com/wazuh/wazuh/pull/11453>`_ SCA policy for Ubuntu 18 is added.
- `#11430 <https://github.com/wazuh/wazuh/pull/11430>`_ SCA policy for Ubuntu 20 is added.
- `#11286 <https://github.com/wazuh/wazuh/pull/11286>`_ SCA policy for Solaris 11.4 is added.
- `#11122 <https://github.com/wazuh/wazuh/pull/11122>`_ Sophos UTM Firewall ruleset is added.
- `#11357 <https://github.com/wazuh/wazuh/pull/11357>`_ Wazuh-api ruleset is added.
- `#11016 <https://github.com/wazuh/wazuh/pull/11016>`_ Audit rules are updated.
- `#11177 <https://github.com/wazuh/wazuh/pull/11177>`_ AWS s3 ruleset is updated.
- `#11344 <https://github.com/wazuh/wazuh/pull/11344>`_  Exim 4 decoder and rules to latest format is updated.
- `#8738 <https://github.com/wazuh/wazuh/pull/8738>`_ MITRE DB with the latest MITRE JSON specification is updated.
- `#11255 <https://github.com/wazuh/wazuh/pull/11255>`_ Multiple rules to remove alert_by_email option are updated.
- `#11795 <https://github.com/wazuh/wazuh/pull/11795>`_ NextCloud ruleset is updated.
- `#11232 <https://github.com/wazuh/wazuh/pull/11232>`_ ProFTPD decoder is updated.
- `#11242 <https://github.com/wazuh/wazuh/pull/11242>`_ RedHat Enterprise Linux 8 SCA up to version 1.0.1 is updated.
- `#11100 <https://github.com/wazuh/wazuh/pull/11100>`_ Rules and decoders for FortiNet products are updated.
- `#11429 <https://github.com/wazuh/wazuh/pull/11429>`_ SCA policy for CentOS 7 is updated.
- `#8751 <https://github.com/wazuh/wazuh/pull/8751>`_ SCA policy for CentOS 8 is updated.
- `#11263 <https://github.com/wazuh/wazuh/pull/11263>`_ SonicWall decoder values are fixed.
- `#11388 <https://github.com/wazuh/wazuh/pull/11388>`_ SSHD ruleset is updated.
- `#8552 <https://github.com/wazuh/wazuh/pull/8552>`_ From file 0580-win-security_rules.xml, rules with id 60198 and 60199 are moved to file 0585-win-application_rules.xml, with rule ids 61071 and 61072 respectively.

Wazuh Kibana plugin
^^^^^^^^^^^^^^^^^^^

- `#3557 <https://github.com/wazuh/wazuh-kibana-app/pull/3557>`_ GitHub and Office365 modules are added.
- `#3541 <https://github.com/wazuh/wazuh-kibana-app/pull/3541>`_ A new ``Panel`` module tab for GitHub and Office365 modules is added.
- `#3639 <https://github.com/wazuh/wazuh-kibana-app/pull/3639>`_ Wazuh adds the ability to filter the results for the ``Network Ports`` table in the ``Inventory data`` section.
- `#3324 <https://github.com/wazuh/wazuh-kibana-app/pull/3324>`_ A new endpoint service is added to collect the frontend logs into a file.
- `#3327 <https://github.com/wazuh/wazuh-kibana-app/pull/3327>`_ `#3321 <https://github.com/wazuh/wazuh-kibana-app/pull/3321>`_ `#3367 <https://github.com/wazuh/wazuh-kibana-app/pull/3367>`_ `#3373 <https://github.com/wazuh/wazuh-kibana-app/pull/3373>`_ `#3374 <https://github.com/wazuh/wazuh-kibana-app/pull/3374>`_ `#3390 <https://github.com/wazuh/wazuh-kibana-app/pull/3390>`_ `#3410 <https://github.com/wazuh/wazuh-kibana-app/pull/3410>`_ `#3408 <https://github.com/wazuh/wazuh-kibana-app/pull/3408>`_ `#3429 <https://github.com/wazuh/wazuh-kibana-app/pull/3429>`_ `#3427 <https://github.com/wazuh/wazuh-kibana-app/pull/3427>`_ `#3417 <https://github.com/wazuh/wazuh-kibana-app/pull/3417>`_ `#3462 <https://github.com/wazuh/wazuh-kibana-app/pull/3462>`_ `#3451 <https://github.com/wazuh/wazuh-kibana-app/pull/3451>`_ `#3442 <https://github.com/wazuh/wazuh-kibana-app/pull/3442>`_ `#3480 <https://github.com/wazuh/wazuh-kibana-app/pull/3480>`_ `#3472 <https://github.com/wazuh/wazuh-kibana-app/pull/3472>`_ `#3434 <https://github.com/wazuh/wazuh-kibana-app/pull/3434>`_ `#3392 <https://github.com/wazuh/wazuh-kibana-app/pull/3392>`_ `#3404 <https://github.com/wazuh/wazuh-kibana-app/pull/3404>`_ `#3432 <https://github.com/wazuh/wazuh-kibana-app/pull/3432>`_ `#3415 <https://github.com/wazuh/wazuh-kibana-app/pull/3415>`_ `#3469 <https://github.com/wazuh/wazuh-kibana-app/pull/3469>`_ `#3448 <https://github.com/wazuh/wazuh-kibana-app/pull/3448>`_ `#3465 <https://github.com/wazuh/wazuh-kibana-app/pull/3465>`_ `#3464 <https://github.com/wazuh/wazuh-kibana-app/pull/3464>`_ `#3478 <https://github.com/wazuh/wazuh-kibana-app/pull/3478>`_ The frontend handle errors strategy is improved: UI, Toasts, console log, and log in file.
- `#3368 <https://github.com/wazuh/wazuh-kibana-app/pull/3368>`_ `#3344 <https://github.com/wazuh/wazuh-kibana-app/pull/3344>`_ `#3726 <https://github.com/wazuh/wazuh-kibana-app/pull/3726>`_ Intelligence tab is added to the MITRE ATT&CK module.
- `#3424 <https://github.com/wazuh/wazuh-kibana-app/pull/3424>`_ Sample data for office365 events are added.
- `#3475 <https://github.com/wazuh/wazuh-kibana-app/pull/3475>`_ A separate component to check for sample data is created.
- `#3506 <https://github.com/wazuh/wazuh-kibana-app/pull/3506>`_ A new hook for getting value suggestions is added.
- `#3531 <https://github.com/wazuh/wazuh-kibana-app/pull/3531>`_ Dynamic simple filters and simple GitHub filters fields are added.
- `#3524 <https://github.com/wazuh/wazuh-kibana-app/pull/3524>`_ Configuration viewer for Module Office 365 is added to the Configuration section of the Management menu.
- `#3518 <https://github.com/wazuh/wazuh-kibana-app/pull/3518>`_ A side panel component that displays information about the active module of the Office 365 setup is introduced.
- `#3533 <https://github.com/wazuh/wazuh-kibana-app/pull/3533>`_ Specifics and custom filters for Office 365 search bar are added.
- `#3544 <https://github.com/wazuh/wazuh-kibana-app/pull/3544>`_ Pagination and filter are added to drilldown tables at the Office pannel.
- `#3568 <https://github.com/wazuh/wazuh-kibana-app/pull/3568>`_ Simple filters change between panel and drilldown panel.
- `#3525 <https://github.com/wazuh/wazuh-kibana-app/pull/3525>`_ New fields are added to the Inventory table and Flyout Details.
- `#3691 <https://github.com/wazuh/wazuh-kibana-app/pull/3691>`_ Columns selector are added in agents table.
- `#3742 <https://github.com/wazuh/wazuh-kibana-app/pull/3742>`_ A new workflow is added for creating wazuh packages.
- `#3783 <https://github.com/wazuh/wazuh-kibana-app/pull/3783>`_ ``template`` and ``fields`` checks in the health check run correctly according to the app configuration.
- `#3804 <https://github.com/wazuh/wazuh-kibana-app/pull/3804>`_ A toast message lets you know when there is an error creating a new group.
- `#3846 <https://github.com/wazuh/wazuh-kibana-app/pull/3846>`_ A step to start the agent is added to the deploy new Windows agent guide.
- `#3893 <https://github.com/wazuh/wazuh-kibana-app/pull/3893>`_ 3 new panels are added to Vulnerabilities/Inventory.
- `#3893 <https://github.com/wazuh/wazuh-kibana-app/pull/3893>`_ A new field of Vulnerabilities is added to the details flyout.
- `#3924 <https://github.com/wazuh/wazuh-kibana-app/pull/3924>`_ Missing fields used in visualizations are added to the known fields related to alerts.
- `#3946 <https://github.com/wazuh/wazuh-kibana-app/pull/3946>`_ A troubleshooting link is added to the "index pattern was refreshed" toast.
- `#4041 <https://github.com/wazuh/wazuh-kibana-app/pull/4041>`_ More number options are added to the tables widget in Modules -> "Mitre".
- `#3121 <https://github.com/wazuh/wazuh-kibana-app/pull/3121>`_ Ossec to wazuh is changed in all sample-data files.
- `#3279 <https://github.com/wazuh/wazuh-kibana-app/pull/3279>`_ Empty fields are modified in FIM tables and ``syscheck.value_name`` in discovery now shows an empty tag for visual clarity.
- `#3346 <https://github.com/wazuh/wazuh-kibana-app/pull/3346>`_ The MITRE tactics and techniques resources are adapted to use the API endpoints.
- `#3517 <https://github.com/wazuh/wazuh-kibana-app/pull/3517>`_ The filterManager subscription is moved to the hook useFilterManager.
- `#3529 <https://github.com/wazuh/wazuh-kibana-app/pull/3529>`_ Filter is changed from "is" to "is one of" in the custom search bar.
- `#3494 <https://github.com/wazuh/wazuh-kibana-app/pull/3494>`_ Refactor ``modules-defaults.js`` to define what buttons and components are rendered in each module tab.
- `#3663 <https://github.com/wazuh/wazuh-kibana-app/pull/3663>`_ `#3806 <https://github.com/wazuh/wazuh-kibana-app/pull/3806>`_ The deprecated and new references for the ``authd`` configuration are updated.
- `#3549 <https://github.com/wazuh/wazuh-kibana-app/pull/3549>`_ Time subscription is added to the Discover component.
- `#3446 <https://github.com/wazuh/wazuh-kibana-app/pull/3446>`_ Testing logs using the Ruletest Test don't display the rule information if not matching a rule.
- `#3649 <https://github.com/wazuh/wazuh-kibana-app/pull/3649>`_ The format permissions are changed in the FIM inventory.
- `#3686 <https://github.com/wazuh/wazuh-kibana-app/pull/3686>`_ `#3728 <https://github.com/wazuh/wazuh-kibana-app/pull/3728>`_ The request to agents that do not return data is now changed to avoid unnecessary heavy load requests.
- `#3788 <https://github.com/wazuh/wazuh-kibana-app/pull/3788>`_ Rebranding. Replaced the brand logos, set module icons with brand colors
- `#3795 <https://github.com/wazuh/wazuh-kibana-app/pull/3795>`_ User used for sample data management is changed.
- `#3792 <https://github.com/wazuh/wazuh-kibana-app/pull/3792>`_ The agent install codeblock copy button and PowerShell terminal warning is changed.
- `#3811 <https://github.com/wazuh/wazuh-kibana-app/pull/3811>`_ The naming related to the plugin platform from a specific one to a generic one using the term plugin platform is replaced.
- `#3893 <https://github.com/wazuh/wazuh-kibana-app/pull/3893>`_ Dashboard tab of Vulnerabilities module is removed, three new panels to Vulnerabilities/Inventory are added, and details Flyout fields are enhanced.
- `#3908 <https://github.com/wazuh/wazuh-kibana-app/pull/3908>`_ Now, all available fields are shown in the Discover Details Flyout table. Furthermore, the open row icon width is fixed in the first column when the table has a few columns.
- `#3924 <https://github.com/wazuh/wazuh-kibana-app/pull/3924>`_ Missing fields used in visualizations to the known fields related to alerts are added.
- `#3946 <https://github.com/wazuh/wazuh-kibana-app/pull/3946>`_ Troubleshooting link to "index pattern was refreshed" toast is added.
- `#3196 <https://github.com/wazuh/wazuh-kibana-app/pull/3196>`_ The table in Vulnerabilities/Inventory is refactored.
- `#3949 <https://github.com/wazuh/wazuh-kibana-app/pull/3949>`_ Google Groups app icons are changed.
- `#3857 <https://github.com/wazuh/wazuh-kibana-app/pull/3857>`_ Sorting for Agents or Configuration checksum column in the table of Management/Groups is removed due to this is not supported by the API.


Wazuh Splunk app
^^^^^^^^^^^^^^^^

- Support for Wazuh 4.3.0
- `#1166 <https://github.com/wazuh/wazuh-splunk/pull/1166>`_ Alias field is added to API to facilitate distinguishing between different managers.
- `#1126 <https://github.com/wazuh/wazuh-splunk/pull/1226>`__ Ensure backwards compatibility.
- `#1148 <https://github.com/wazuh/wazuh-splunk/issues/1148>`_ A Security Section is added to manage security related configurations.
- `#1171 <https://github.com/wazuh/wazuh-splunk/pull/1171>`_ Crud Policies are added to the security section.
- `#1168 <https://github.com/wazuh/wazuh-splunk/pull/1168>`_ Crud Roles are added to the security section.
- `#1169 <https://github.com/wazuh/wazuh-splunk/pull/1169>`_ Crud Role Mapping is added to the security section.
- `#1173 <https://github.com/wazuh/wazuh-splunk/pull/1173>`_ Crud Users is added to the security section.
- `#1147 <https://github.com/wazuh/wazuh-splunk/issues/1147>`_ Created a permissions validation service.
- `#1164 <https://github.com/wazuh/wazuh-splunk/issues/1164>`_ Implemented the access control on the App's views.
- `#1155 <https://github.com/wazuh/wazuh-splunk/issues/1155>`_ Implemented a service to fetch Wazuh's users and their roles.
- `#1156 <https://github.com/wazuh/wazuh-splunk/issues/1156>`_ Implemented a server to fetch Splunk's users and their roles.
- `#1149 <https://github.com/wazuh/wazuh-splunk/issues/1149>`_ A run_as checkbox is added to the API configuration.
- `#1174 <https://github.com/wazuh/wazuh-splunk/pull/1174>`_ The ability to use the Authorization Context login method is added.
- `#1228 <https://github.com/wazuh/wazuh-splunk/issues/1228>`_  Extensions now can only be changed by Splunk Admins.
- `#1186 <https://github.com/wazuh/wazuh-splunk/pull/1186>`_ Wazuh rebranding.
- `#1172 <https://github.com/wazuh/wazuh-splunk/pull/1172>`_ Deprecated authd options are updated.
- `#1236 <https://github.com/wazuh/wazuh-splunk/pull/1236>`_ Refactored branding color styles to improve maintainability.
- `#1243 <https://github.com/wazuh/wazuh-splunk/pull/1243>`_ Wazuh API's name is changed to its alias in the quick settings selector.

Other
^^^^^

- `#10247 <https://github.com/wazuh/wazuh/pull/10247>`_ External SQLite library dependency is upgraded to version 3.36.
- `#10247 <https://github.com/wazuh/wazuh/pull/10247>`_ External BerkeleyDB library dependency is upgraded to version 18.1.40.
- `#10247 <https://github.com/wazuh/wazuh/pull/10247>`_ External OpenSSL library dependency is upgraded to version 1.1.1l.
- `#10927 <https://github.com/wazuh/wazuh/pull/10927>`_ External Google Test library  dependency is upgraded to version 1.11.
- `#11436 <https://github.com/wazuh/wazuh/pull/11436>`_ External Aiohttp library dependency is upgraded to version 3.8.1.
- `#11436 <https://github.com/wazuh/wazuh/pull/11436>`_ External Werkzeug library dependency is upgraded to version 2.0.2.
- `#11436 <https://github.com/wazuh/wazuh/pull/11436>`_ Embedded Python is upgraded to version 3.9.9.


Packages
^^^^^^^^
- `#1518 <https://github.com/wazuh/wazuh-packages/pull/1518>`_ Changed default attributes in Wazuh dashboard package. (A wazuh-dashboard new package with `-2` revision was released)
- `#1496 <https://github.com/wazuh/wazuh-packages/pull/1496>`_ Hide passwords in log file.
- `#1500 <https://github.com/wazuh/wazuh-packages/pull/1500>`_ The dashboard IP messages are fixed.
- `#1499 <https://github.com/wazuh/wazuh-packages/pull/1499>`_ Improved APT locked message and retry time.
- `#1497 <https://github.com/wazuh/wazuh-packages/pull/1497>`_ Unhandled promise for the dashboard is fixed.
- `#1494 <https://github.com/wazuh/wazuh-packages/pull/1494>`_ Update ova ``motd`` message 4.3.
- `#1471 <https://github.com/wazuh/wazuh-packages/pull/1471>`_ Remove service disable from RPM and Debian packages.
- `#1471 <https://github.com/wazuh/wazuh-packages/pull/1471>`_ Disabled multitenancy by default in the dashboard and changed the app default route.
- `#1434 <https://github.com/wazuh/wazuh-packages/pull/1434>`_ Set as a warning the unhandled promises in the Wazuh dashboard.
- `#1395 <https://github.com/wazuh/wazuh-packages/pull/1395>`_ Remove IP message from OVA.
- `#1390 <https://github.com/wazuh/wazuh-packages/pull/1390>`_ Remove demo certificates from indexer and dashboard packages.
- `#1307 <https://github.com/wazuh/wazuh-packages/pull/1307>`_ Add centos8 vault repository due to EOL.
- `#1302 <https://github.com/wazuh/wazuh-packages/pull/1302>`_ The user deletion warning RPM manager is fixed.
- `#1292 <https://github.com/wazuh/wazuh-packages/pull/1292>`_ The issue where Solaris 11 was not executed in clean installations is fixed.
- `#1280 <https://github.com/wazuh/wazuh-packages/pull/1280>`_ The error where Wazuh could continue running after uninstalling is fixed.
- `#1274 <https://github.com/wazuh/wazuh-packages/pull/1274>`_ The AIX partition size is fixed.
- `#1147 <https://github.com/wazuh/wazuh-packages/pull/1147>`__ The Solaris 11 upgrade from previous packages is fixed.
- `#1126 <https://github.com/wazuh/wazuh-packages/pull/1126>`_ Add new GCloud integration files to Solaris 11.
- `#689 <https://github.com/wazuh/wazuh-packages/pull/689>`_ Update SPECS.
- `#888 <https://github.com/wazuh/wazuh-packages/pull/888>`_ An error in CentOS 5 building is fixed.
- `#944 <https://github.com/wazuh/wazuh-packages/pull/944>`_ Add new SCA files to Solaris 11.
- `#915 <https://github.com/wazuh/wazuh-packages/pull/915>`_ Improved support for ppc64le on CentOS and Debian.
- `#1005 <https://github.com/wazuh/wazuh-packages/pull/1005>`_ The error with ``wazuh`` user in Debian packages is fixed.
- `#1023 <https://github.com/wazuh/wazuh-packages/pull/1023>`_ Add ossec user and group during compilation.
- `#1261 <https://github.com/wazuh/wazuh-packages/pull/1261>`_ Merge Wazuh Dashboard v3 #.
- `#1256 <https://github.com/wazuh/wazuh-packages/pull/1256>`_ The certs permissions in RPM is fixed.
- `#1208 <https://github.com/wazuh/wazuh-packages/pull/1208>`_ Kibana app now supports ``pluginPlatform.version`` property in the app manifest.
- `#1162 <https://github.com/wazuh/wazuh-packages/pull/1162>`_ The certificates creation using parameters 4.3 is fixed.
- `#1193 <https://github.com/wazuh/wazuh-packages/pull/1193>`_ The Archlinux package generation parameters 4.3 are fixed.
- `#1132 <https://github.com/wazuh/wazuh-packages/pull/1132>`_ Add new 2.17.1 log4j mitigation version 4.3.
- `#1123 <https://github.com/wazuh/wazuh-packages/pull/1123>`_ The client keys Ownership for 3.7.x and previous versions is fixed.
- `#1106 <https://github.com/wazuh/wazuh-packages/pull/1106>`_ A new log4j remediation 4.3 is added.
- `#1112 <https://github.com/wazuh/wazuh-packages/pull/1112>`_ The Linux ``wpk`` generation 4.3 is fixed.
- `#1096 <https://github.com/wazuh/wazuh-packages/pull/1096>`_ Add log4j mitigation 4.3.
- `#1086 <https://github.com/wazuh/wazuh-packages/pull/1086>`_ Increase admin.pem cert expiration date 4.3.
- `#1078 <https://github.com/wazuh/wazuh-packages/pull/1078>`_ Remove wazuh user from unattended/OVA/AMI 4.3.
- `#1074 <https://github.com/wazuh/wazuh-packages/pull/1074>`_ The ``groupdel`` ossec error during upgrade to 4.3.0 is fixed.
- `#1067 <https://github.com/wazuh/wazuh-packages/pull/1067>`_ The curl kibana.yml 4.3 is fixed.
- `#1060 <https://github.com/wazuh/wazuh-packages/pull/1060>`_ Remove ``restore-permissions.sh`` from Debian Packages.
- `#1048 <https://github.com/wazuh/wazuh-packages/pull/1048>`_ Bump unattended 4.3.0.
- `#1012 <https://github.com/wazuh/wazuh-packages/pull/1012>`_ Removed cd usages in unattended installer and fixed uninstaller 4.3.
- `#1023 <https://github.com/wazuh/wazuh-packages/pull/1023>`_ Add ossec user and group during compilation.
- `#1020 <https://github.com/wazuh/wazuh-packages/pull/1020>`_ Removed warning and added text in ``wazuh-passwords-tool.sh`` final message 4.3.

Resolved issues
---------------

This release resolves known issues.


Manager
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#8223 <https://github.com/wazuh/wazuh/pull/8223>`_               A memory defect is fixed in Remoted when closing connection handles.
`#7625 <https://github.com/wazuh/wazuh/pull/7625>`_               A timing problem is fixed in the manager that might prevent Analysisd from sending Active responses to agents.
`#8210 <https://github.com/wazuh/wazuh/pull/8210>`_               A bug in Analysisd that did not apply field lookup in rules that overwrite other ones is fixed.
`#8902 <https://github.com/wazuh/wazuh/pull/8902>`_               The manager is now prevented from leaving dangling agent database files.
`#8254 <https://github.com/wazuh/wazuh/pull/8254>`_               The remediation message for error code 6004 is updated.
`#8157 <https://github.com/wazuh/wazuh/pull/8157>`_               A bug when deleting non-existing users or roles in the security SDK is now fixed.
`#8418 <https://github.com/wazuh/wazuh/pull/8418>`_               A bug with ``agent.conf`` file permissions when creating an agent group is now fixed.
`#8422 <https://github.com/wazuh/wazuh/pull/8422>`_               Wrong exceptions with wdb pagination mechanism are fixed.
`#8747 <https://github.com/wazuh/wazuh/pull/8747>`_               An error when loading some rules with the ``\`` character is fixed.
`#9216 <https://github.com/wazuh/wazuh/pull/9216>`_               The ``WazuhDBQuery`` class is changed to properly close socket connections and prevent file descriptor leaks.
`#10320 <https://github.com/wazuh/wazuh/pull/10320>`_             An error in the API configuration when using the ``agent_upgrade`` script is fixed.
`#10341 <https://github.com/wazuh/wazuh/pull/10341>`_             The ``JSONDecodeError`` in Distributed API class methods is handled.
`#9738 <https://github.com/wazuh/wazuh/pull/9738>`_               An issue with duplicated logs in Azure-logs module is fixed and several improvements are applied to it.
`#10680 <https://github.com/wazuh/wazuh/pull/10680>`_             The query parameter validation is fixed to allow usage of special chars in Azure module.
`#8394 <https://github.com/wazuh/wazuh/pull/8394>`_               A bug running ``wazuh-clusterd`` process when it was already running is fixed.
`#8732 <https://github.com/wazuh/wazuh/pull/8732>`_               Cluster is now allowed to send and receive messages with a size higher than request_chunk.
`#9077 <https://github.com/wazuh/wazuh/pull/9077>`_               A bug that caused ``wazuh-clusterd`` process to not delete its PID files when running in foreground mode and it is stopped is fixed.
`#10376 <https://github.com/wazuh/wazuh/pull/10376>`_             Race condition due to lack of atomicity in the cluster synchronization mechanism is fixed.
`#10492 <https://github.com/wazuh/wazuh/pull/10492>`_             A bug when displaying the dates of the cluster tasks that have not finished yet is fixed. Now, ``n/a`` is displayed in these cases.
`#9196 <https://github.com/wazuh/wazuh/pull/9196>`_               Missing field ``value_type`` in FIM alerts is fixed.
`#9292 <https://github.com/wazuh/wazuh/pull/9292>`_               A typo in the SSH Integrity Check script for Agentless is fixed.
`#10421 <https://github.com/wazuh/wazuh/pull/10421>`_             Multiple race conditions in Remoted are fixed.
`#10390 <https://github.com/wazuh/wazuh/pull/10390>`_             The manager agent database is fixed to prevent dangling entries from removed agents.
`#9765 <https://github.com/wazuh/wazuh/pull/9765>`_               The alerts generated by FIM when a lookup operation on a SID fails are fixed.
`#10866 <https://github.com/wazuh/wazuh/pull/10866>`_             A bug that caused cluster agent-groups files to be synchronized multiple times unnecessarily is fixed.
`#10922 <https://github.com/wazuh/wazuh/pull/10922>`_             An issue in Wazuh DB that compiled the SQL statements multiple times unnecessarily is fixed.
`#10948 <https://github.com/wazuh/wazuh/pull/10948>`_             A crash in Analysisd when setting Active Response with agent_id = 0 is fixed.
`#11161 <https://github.com/wazuh/wazuh/pull/11161>`_             An uninitialized Blowfish encryption structure warning is fixed.
`#11262 <https://github.com/wazuh/wazuh/pull/11262>`_             A memory overrun hazard in Vulnerability Detector is fixed.
`#11282 <https://github.com/wazuh/wazuh/pull/11282>`_             A bug when using a limit parameter higher than the total number of objects in the wazuh-db queries is fixed.
`#11440 <https://github.com/wazuh/wazuh/pull/11440>`_             A false positive for MySQL in Vulnerability Detector is prevented.
`#11448 <https://github.com/wazuh/wazuh/pull/11448>`_             The segmentation fault when the wrong configuration is set is fixed.
`#11440 <https://github.com/wazuh/wazuh/pull/11440>`_             A false positive in Vulnerability Detector is fixed when scanning OVAl for Ubuntu Xenial and Bionic.
`#11835 <https://github.com/wazuh/wazuh/pull/11835>`_             An argument injection hazard is fixed in the Pagerduty integration script. Thank you Jose Maria Zaragoza (@JoseMariaZ) for reporting this issue.
`#11863 <https://github.com/wazuh/wazuh/pull/11863>`_             Memory leaks in the feed parser at Vulnerability Detector are fixed. Architecture data member from the RHEL 5 feed. RHSA items containing no CVEs. Unused RHSA data member when parsing Debian feeds.
`#12368 <https://github.com/wazuh/wazuh/pull/12368>`_             Now, Authd ignores the pipe signal if Wazuh DB gets closed.
`#12415 <https://github.com/wazuh/wazuh/pull/12415>`_             A buffer handling bug is fixed in Remoted that left the syslog TCP server stuck. 
`#12644 <https://github.com/wazuh/wazuh/pull/12644>`_             A memory leak in Vulnerability Detector is fixed when discarding kernel packages.
`#12655 <https://github.com/wazuh/wazuh/pull/12655>`_             A memory leak at wazuh-logtest-legacy  is fixed when matching a level-0 rule.
`#12489 <https://github.com/wazuh/wazuh/pull/12489>`_             Now, the cluster is disabled by default when the "disabled" tag is not included.
`#13067 <https://github.com/wazuh/wazuh/pull/13067>`_             A bug in the Vulnerability Detector CPE helper that may lead to producing false positives about Firefox ESR is fixed.
==============================================================    =============


Agent
^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#8784 <https://github.com/wazuh/wazuh/pull/8784>`_               A bug in FIM that did not allow monitoring new directories in real-time mode if the limit was reached at some point is fixed.
`#8941 <https://github.com/wazuh/wazuh/pull/8941>`_               A bug in FIM that threw an error when a query to the internal database returned no data is fixed.
`#8362 <https://github.com/wazuh/wazuh/pull/8362>`_               An error where the IP address was being returned along with the port for Amazon NLB service is fixed.
`#8372 <https://github.com/wazuh/wazuh/pull/8372>`_               AWS module is fixed to properly handle the exception raised when processing a folder without logs.
`#8433 <https://github.com/wazuh/wazuh/pull/8433>`_               A bug with the AWS module when pagination is needed in the bucket is fixed.
`#8672 <https://github.com/wazuh/wazuh/pull/8672>`_               An error with the ipGeoLocation field in AWS Macie logs id fixed.
`#10333 <https://github.com/wazuh/wazuh/pull/10333>`_             An incorrect debug message in the GCloud integration module is changed.
`#7848 <https://github.com/wazuh/wazuh/pull/7848>`_               Data race conditions are fixed in FIM.
`#10011 <https://github.com/wazuh/wazuh/pull/10011>`_             A wrong command line display in the Syscollector process report on Windows is fixed.
`#10249 <https://github.com/wazuh/wazuh/pull/10249>`_             An issue that causes shutdown when agentd or analysisd is stopped is fixed.
`#10405 <https://github.com/wazuh/wazuh/pull/10405>`_             Wrong keepalive message from the agent when file merged.mg is missing is fixed.
`#10381 <https://github.com/wazuh/wazuh/pull/10381>`_             Missing logs from the Windows agent when it's getting stopped are fixed.
`#10524 <https://github.com/wazuh/wazuh/pull/10524>`_             Missing packages reporting in Syscollector for macOS due to empty architecture data is fixed.
`#7506 <https://github.com/wazuh/wazuh/pull/7506>`_               FIM on Linux to parse audit rules with multiple keys for who-data is fixed.
`#10639 <https://github.com/wazuh/wazuh/pull/10639>`_             Windows 11 version collection in the agent is fixed.
`#10602 <https://github.com/wazuh/wazuh/pull/10602>`_             Missing Eventchannel location in Logcollector configuration reporting is fixed.
`#10794 <https://github.com/wazuh/wazuh/pull/10794>`_             CloudWatch Logs integration is updated to avoid crashing when AWS raises Throttling errors.
`#10718 <https://github.com/wazuh/wazuh/pull/10718>`_             AWS modules' log file filtering is fixed when there are logs with and without a prefix mixed in a bucket.
`#10884 <https://github.com/wazuh/wazuh/pull/10884>`_             A bug on the installation script that made upgrades not to update the code of the external integration modules id fixed.
`#10921 <https://github.com/wazuh/wazuh/pull/10921>`_             An issue with the AWS integration module trying to parse manually created folders as if they were files is fixed.
`#11086 <https://github.com/wazuh/wazuh/pull/11086>`_             Some installation errors in OS with no subversion are fixed.
`#11115 <https://github.com/wazuh/wazuh/pull/11115>`_             A typo in an error log about enrollment SSL certificate is fixed.
`#11121 <https://github.com/wazuh/wazuh/pull/11121>`_             A unit tests for Windows agent when built on MinGW 10 is fixed.
`#10942 <https://github.com/wazuh/wazuh/pull/10942>`_             Windows agent compilation warnings are fixed.
`#11207 <https://github.com/wazuh/wazuh/pull/11207>`_             The OS version reported by the agent on OpenSUSE Tumbleweed is fixed.
`#11329 <https://github.com/wazuh/wazuh/pull/11329>`_             The Syscollector is prevented from truncating the open port inode numbers on Linux.
`#11365 <https://github.com/wazuh/wazuh/pull/11365>`_             An agent auto-restart on configuration changes, when started via ``wazuh-control`` on a Systemd based Linux OS is fixed.
`#10952 <https://github.com/wazuh/wazuh/pull/10952>`_             A bug in the AWS module resulting in unnecessary API calls when trying to obtain the different Account IDs for the bucket is fixed.
`#11278 <https://github.com/wazuh/wazuh/pull/11278>`_             Azure integration's configuration parsing to allow omitting optional parameters is fixed.
`#11296 <https://github.com/wazuh/wazuh/pull/11296>`_             Azure Storage credentials validation bug is fixed.
`#11455 <https://github.com/wazuh/wazuh/pull/11455>`_             The read of the hostname in the installation process for openSUSE is fixed.
`#11425 <https://github.com/wazuh/wazuh/pull/11425>`_             The graceful shutdown when the agent loses connection is fixed.
`#11736 <https://github.com/wazuh/wazuh/pull/11736>`_             The error "Unable to set server IP address" is fixed on the Windows agent.
`#11608 <https://github.com/wazuh/wazuh/pull/11608>`_             The reparse option is fixed in the AWS VPCFlow and Config integrations.
`#12324 <https://github.com/wazuh/wazuh/pull/12324>`_             The way the AWS Config integration parses the dates used to search in the database for previous records was fixed.
`#12676 <https://github.com/wazuh/wazuh/pull/12676>`_             Now, Logcollector audit format parses logs with a custom name_format.
`#12704 <https://github.com/wazuh/wazuh/pull/12704>`_             An issue with the Agent bootstrap is fixed, it might lead to a startup timeout when it cannot resolve a manager hostname.
`#13088 <https://github.com/wazuh/wazuh/pull/13088>`_             A bug in the agent's leaky bucket throughput regulator that could leave it stuck if the time is advanced on Windows is fixed.
==============================================================    =============


RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#8196 <https://github.com/wazuh/wazuh/pull/8196>`_               An inconsistency in RBAC resources for ``group:create``, ``decoders:update``, and ``rules:update`` actions are fixed.
`#8378 <https://github.com/wazuh/wazuh/pull/8378>`_               The handling of an API error message occurring when Wazuh is started with a wrong ``ossec.conf`` is fixed. Now, the execution continues and raises a warning.
`#8548 <https://github.com/wazuh/wazuh/pull/8548>`_               A bug with the ``sort`` parameter that caused a wrong response when sorting by several fields is fixed.
`#8597 <https://github.com/wazuh/wazuh/pull/8597>`_               The description of ``force_time`` parameter in the API spec reference is fixed.
`#8537 <https://github.com/wazuh/wazuh/pull/8537>`_               API incorrect path in remediation message when a maximum number of requests per minute is reached is fixed.
`#9071 <https://github.com/wazuh/wazuh/pull/9071>`_               Agents' healthcheck error in the API integration test environment is fixed.
`#9077 <https://github.com/wazuh/wazuh/pull/9077>`_               A bug with ``wazuh-apid`` process handling of PID files when running in foreground mode is fixed.
`#9192 <https://github.com/wazuh/wazuh/pull/9192>`_               A bug with RBAC ``group_id`` matching is fixed.
`#9147 <https://github.com/wazuh/wazuh/pull/9147>`_               Temporal development keys and values from ``GET /cluster/healthcheck`` response are removed.
`#9227 <https://github.com/wazuh/wazuh/pull/9227>`_               Several errors when filtering by dates are fixed.
`#9262 <https://github.com/wazuh/wazuh/pull/9262>`_               The limit in some endpoints like ``PUT /agents/group/{group_id}/restart`` and added a pagination method is fixed.
`#9320 <https://github.com/wazuh/wazuh/pull/9320>`_               A bug with the ``search`` parameter resulting in invalid results is fixed.
`#9368 <https://github.com/wazuh/wazuh/pull/9368>`_               Wrong values of ``external_id`` field in MITRE resources are fixed.
`#9399 <https://github.com/wazuh/wazuh/pull/9399>`_               The way how the API integration testing environment checks that wazuh-apid daemon is running before starting the tests is fixed.
`#9777 <https://github.com/wazuh/wazuh/pull/9777>`_               A healthcheck is added to verify that ``logcollector`` stats are ready before starting the API integration test.
`#10159 <https://github.com/wazuh/wazuh/pull/10159>`_             The API integration test healthcheck used in the ``vulnerability`` test cases is fixed.
`#10179 <https://github.com/wazuh/wazuh/pull/10179>`_             An error with ``PUT /agents/node/{node_id}/restart`` endpoint when no agents are present in selected node is fixed.
`#10322 <https://github.com/wazuh/wazuh/pull/10322>`_             An RBAC experimental API integration test expecting a 1760 code in implicit requests is fixed.
`#10289 <https://github.com/wazuh/wazuh/pull/10289>`_             A cluster race condition that caused the API integration test to randomly fail is fixed.
`#10619 <https://github.com/wazuh/wazuh/pull/10619>`_             The ``PUT /agents/node/{node_id}/restart`` endpoint to exclude exception codes properly is fixed.
`#10666 <https://github.com/wazuh/wazuh/pull/10666>`_             The ``PUT /agents/group/{group_id}/restart`` endpoint to exclude exception codes properly is fixed.
`#10656 <https://github.com/wazuh/wazuh/pull/10656>`_             The agent endpoints q parameter to allow more operators when filtering by groups is fixed.
`#10830 <https://github.com/wazuh/wazuh/pull/10830>`_             The API integration tests related to rule, decoder, and task endpoints are fixed.
`#11411 <https://github.com/wazuh/wazuh/pull/11411>`_             Exceptions handling when starting the Wazuh API service is improved.
`#11598 <https://github.com/wazuh/wazuh/pull/11598>`_             The race condition while creating RBAC database is fixed.
`#12102 <https://github.com/wazuh/wazuh/pull/12102>`_             The API integration tests failures caused by race conditions are fixed.
==============================================================    =============


Ruleset
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#11117 <https://github.com/wazuh/wazuh/pull/11117>`_             Bad characters are fixed on rules 60908 and 60884 - win-application rules.
`#11369 <https://github.com/wazuh/wazuh/pull/11369>`_             Microsoft logs rules are fixed.
`#11405 <https://github.com/wazuh/wazuh/pull/11405>`_             PHP rules for MITRE and groups are fixed.
`#11214 <https://github.com/wazuh/wazuh/pull/11214>`_             Rules id for Microsoft Windows PowerShell is fixed.
==============================================================    =============

Wazuh Kibana plugin
^^^^^^^^^^^^^^^^^^^

================================================================  =============
Reference                                                         Description
================================================================  =============
`#3384 <https://github.com/wazuh/wazuh-kibana-app/pull/3384>`_    The creation of log files is fixed.
`#3484 <https://github.com/wazuh/wazuh-kibana-app/pull/3484>`_    The double fetching alerts count when pinning/unpinning the agent in MITRE ATT&CK/Framework is fixed.
`#3490 <https://github.com/wazuh/wazuh-kibana-app/pull/3490>`_    A refactor of the query Config is changed from Angular to React.
`#3412 <https://github.com/wazuh/wazuh-kibana-app/pull/3412>`_    The flyout closing when dragging and releasing mouse event outside the Rule-test and Decoder-test flyout is fixed.
`#3430 <https://github.com/wazuh/wazuh-kibana-app/pull/3430>`_    Now Wazuh notifies you when you are registering an agent without permission.
`#3438 <https://github.com/wazuh/wazuh-kibana-app/pull/3438>`_    Not used ``redirectRule`` query param when clicking the row table on CDB Lists/Decoders is removed.
`#3439 <https://github.com/wazuh/wazuh-kibana-app/pull/3439>`_    The code overflows over the line numbers in the API Console editor is fixed.
`#3440 <https://github.com/wazuh/wazuh-kibana-app/pull/3440>`_    The issue that avoids opening the main menu when changing the selected API or index pattern is fixed.
`#3443 <https://github.com/wazuh/wazuh-kibana-app/pull/3443>`_    An error message in conf management is fixed.
`#3445 <https://github.com/wazuh/wazuh-kibana-app/pull/3445>`_    An issue related to the size API selector when the name is too long is fixed.
`#3456 <https://github.com/wazuh/wazuh-kibana-app/pull/3456>`_    An error when editing a rule or decoder is fixed.
`#3458 <https://github.com/wazuh/wazuh-kibana-app/pull/3458>`_    An issue about the index pattern selector doesn't display the ignored index patterns is fixed.
`#3553 <https://github.com/wazuh/wazuh-kibana-app/pull/3553>`_    An error in /Management/Configuration when the cluster is disabled is fixed.
`#3565 <https://github.com/wazuh/wazuh-kibana-app/pull/3565>`_    An issue related to pinned filters removed when accessing the ``Panel`` tab of a module is fixed.
`#3645 <https://github.com/wazuh/wazuh-kibana-app/pull/3645>`_    Multi-select component searcher handler is fixed.
`#3609 <https://github.com/wazuh/wazuh-kibana-app/pull/3609>`_    The order logs properly in Management/Logs are fixed.
`#3661 <https://github.com/wazuh/wazuh-kibana-app/pull/3661>`_    The Wazuh API requests to ``GET //`` are fixed.
`#3675 <https://github.com/wazuh/wazuh-kibana-app/pull/3675>`_    Missing MITRE tactics are fixed.
`#3488 <https://github.com/wazuh/wazuh-kibana-app/pull/3488>`_    The CDB list views not working with IPv6 is fixed.
`#3466 <https://github.com/wazuh/wazuh-kibana-app/pull/3466>`_    The bad requests using the Console tool to ``PUT /active-response`` API endpoint are fixed.
`#3605 <https://github.com/wazuh/wazuh-kibana-app/pull/3605>`_    An issue related to the group agent management table does not update on error is fixed.
`#3651 <https://github.com/wazuh/wazuh-kibana-app/pull/3651>`_    An issue about not showing packages details in agent inventory for a FreeBSD agent SO is fixed.
`#3652 <https://github.com/wazuh/wazuh-kibana-app/pull/3652>`_    Wazuh token deleted twice is fixed.
`#3687 <https://github.com/wazuh/wazuh-kibana-app/pull/3687>`_    The handler of an error on dev-tools is fixed.
`#3685 <https://github.com/wazuh/wazuh-kibana-app/pull/3685>`_    The compatibility with wazuh 4.3 - kibana 7.13.4 is fixed.
`#3689 <https://github.com/wazuh/wazuh-kibana-app/pull/3689>`_    The registry values without agent pinned in FIM>Events are fixed.
`#3688 <https://github.com/wazuh/wazuh-kibana-app/pull/3688>`_    The breadcrumbs style compatibility for Kibana 7.14.2 is fixed.
`#3682 <https://github.com/wazuh/wazuh-kibana-app/pull/3682>`_    The security alerts table when filters change is fixed.
`#3692 <https://github.com/wazuh/wazuh-kibana-app/pull/3692>`_    An error that shows we're using X-Pack when we have Basic is fixed.
`#3700 <https://github.com/wazuh/wazuh-kibana-app/pull/3700>`_    The blank screen in Kibana 7.10.2 is fixed.
`#3704 <https://github.com/wazuh/wazuh-kibana-app/pull/3704>`_    Related decoders file link errors when users click on it are fixed.
`#3708 <https://github.com/wazuh/wazuh-kibana-app/pull/3708>`_    Flyouts in Kibana 7.14.2 are fixed.
`#3707 <https://github.com/wazuh/wazuh-kibana-app/pull/3707>`_    The bug of index patterns in health-check due to a bad copy of a PR is fixed.
`#3733 <https://github.com/wazuh/wazuh-kibana-app/pull/3733>`_    Styles and behavior of button filter in the flyout of ``Inventory`` section for ``Integrity monitoring`` and ``Vulnerabilities`` modules are fixed.
`#3733 <https://github.com/wazuh/wazuh-kibana-app/pull/3733>`_    The height of the ``Evolution`` card in the ``Agents`` section when has no data for the selected time range is fixed.
`#3722 <https://github.com/wazuh/wazuh-kibana-app/pull/3722>`_    The clearing of the query filter that doesn't update the data in Office 365 and GitHub Panel tab is updated.
`#3710 <https://github.com/wazuh/wazuh-kibana-app/pull/3710>`_    Wrong daemons in the filter list are fixed.
`#3724 <https://github.com/wazuh/wazuh-kibana-app/pull/3724>`_    A bug when creating a filename with spaces that throws a bad error is fixed.
`#3731 <https://github.com/wazuh/wazuh-kibana-app/pull/3731>`_    A bug in security User flyout nonexistent unsubmitted changes warning is fixed.
`#3732 <https://github.com/wazuh/wazuh-kibana-app/pull/3732>`_    The redirect to a new tab when clicking on a link is fixed.
`#3737 <https://github.com/wazuh/wazuh-kibana-app/pull/3737>`_    Missing settings in ``Management/Configuration/Global configuration/Global/Main settings`` is fixed.
`#3738 <https://github.com/wazuh/wazuh-kibana-app/pull/3738>`_    The ``Maximum call stack size exceeded`` error exporting key-value pairs of a CDB List is fixed.
`#3741 <https://github.com/wazuh/wazuh-kibana-app/pull/3741>`_    The regex lookahead and lookbehind for safari are fixed.
`#3744 <https://github.com/wazuh/wazuh-kibana-app/pull/3744>`_    Vulnerabilities Inventory flyout details filters are fixed.
`#3604 <https://github.com/wazuh/wazuh-kibana-app/pull/3604>`_    Removed API selector toggle from Settings menu since it performed no useful function.
`#3748 <https://github.com/wazuh/wazuh-kibana-app/pull/3748>`_    Dashboard PDF report error when switching pinned agent state is fixed.
`#3753 <https://github.com/wazuh/wazuh-kibana-app/pull/3753>`_    The rendering of the command to deploy a new Windows agent not working in some Kibana versions now works correctly.
`#3772 <https://github.com/wazuh/wazuh-kibana-app/pull/3772>`_    Action buttons no longer overlay with the request text in Tools/API Console.
`#3774 <https://github.com/wazuh/wazuh-kibana-app/issues/3774>`_  A bug in `Rule ID` value in reporting tables related to top results is now fixed. 
`#3787 <https://github.com/wazuh/wazuh-kibana-app/pull/3787>`_    An issue with github/office365 multi-select filters suggested values is now fixed.
`#3790 <https://github.com/wazuh/wazuh-kibana-app/pull/3790>`_    We fixed an issue related to updating the aggregation data of the Panel section when changing the time filter 
`#3804 <https://github.com/wazuh/wazuh-kibana-app/pull/3804>`_    We removed the button to remove an agent for a group in the agents' table when it is the default group.
`#3776 <https://github.com/wazuh/wazuh-kibana-app/pull/3776>`_    Adding a single agent to a group is fixed.
`#3777 <https://github.com/wazuh/wazuh-kibana-app/pull/3777>`_    The implicit filters from the search bar can be removable.
`#3778 <https://github.com/wazuh/wazuh-kibana-app/pull/3778>`_    Office365/Github module the side panel tab are fixed.
`#3780 <https://github.com/wazuh/wazuh-kibana-app/pull/3780>`_    No wrap text in MITRE ATT&CK intelligence table is fixed.
`#3781 <https://github.com/wazuh/wazuh-kibana-app/pull/3781>`_    The visualization tooltip position is fixed.
`#3787 <https://github.com/wazuh/wazuh-kibana-app/pull/3787>`_    github/office365 multi-select filters suggested values is fixed.
`#3796 <https://github.com/wazuh/wazuh-kibana-app/pull/3796>`_    The styles on the evolution card are fixed.
`#3831 <https://github.com/wazuh/wazuh-kibana-app/pull/3831>`_    Internal user no longer needs permission to make x-pack detection request.
`#3845 <https://github.com/wazuh/wazuh-kibana-app/pull/3845>`_    Agents details card style is fixed.
`#3854 <https://github.com/wazuh/wazuh-kibana-app/pull/3854>`_    Agents evolutions card is fixed.
`#3866 <https://github.com/wazuh/wazuh-kibana-app/pull/3866>`_    Routing redirection in events documents discovers links are fixed.
`#3868 <https://github.com/wazuh/wazuh-kibana-app/pull/3868>`_    Health-check is fixed.
`#3901 <https://github.com/wazuh/wazuh-kibana-app/pull/3901>`_    The table of Vulnerabilities/Inventory doesn't reload when changing the selected agent is fixed.
`#3901 <https://github.com/wazuh/wazuh-kibana-app/pull/3901>`_    The issue with the table in Modules/Vulnerabilities/Inventory that doesn't refresh when changing the selected agent is fixed.
`#3937 <https://github.com/wazuh/wazuh-kibana-app/pull/3937>`_    An asynchronism issue when multiple fields are missing in the Events view rows details is solved.
`#3942 <https://github.com/wazuh/wazuh-kibana-app/pull/3942>`_    A rendering problem in the map visualizations is fixed.
`#3877 <https://github.com/wazuh/wazuh-kibana-app/pull/3877>`_    Parse error when using # character not at the beginning of the line.
`#3944 <https://github.com/wazuh/wazuh-kibana-app/pull/3944>`_    The rule.mitre.id cell enhancement that doesn't support values with sub techniques is solved.
`#3947 <https://github.com/wazuh/wazuh-kibana-app/pull/3947>`_    An error when changing the selected time in some flyouts is fixed.
`#3957 <https://github.com/wazuh/wazuh-kibana-app/pull/3957>`_    An issue related to the user can log out when the Kibana server has a basepath configurated is solved.
`#3991 <https://github.com/wazuh/wazuh-kibana-app/pull/3991>`_    A fatal cron-job error when Wazuh API is down is fixed.
================================================================  =============


Wazuh Splunk app
^^^^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1137 <https://github.com/wazuh/wazuh-splunk/pull/1137>`_        Long agent names no longer overflow in the overview page.
`#1138 <https://github.com/wazuh/wazuh-splunk/pull/1138>`_        An issue that occurred when saving rules or decoders files is now fixed.
`#1141 <https://github.com/wazuh/wazuh-splunk/pull/1141>`_        An issue with unnecessary table requests when resizing the browser window is fixed.
`#1215 <https://github.com/wazuh/wazuh-splunk/pull/1215>`_        Agent counters are now centered correctly.
`#1216 <https://github.com/wazuh/wazuh-splunk/pull/1216>`_        Users can no longer add new agents without the right "create" permissions.
`#1217 <https://github.com/wazuh/wazuh-splunk/pull/1217>`_        The navigation bar for Security options no longer overlaps with the background header.
`#1223 <https://github.com/wazuh/wazuh-splunk/pull/1223>`_        An error when the agents view is re-initialized is now fixed.
`#1230 <https://github.com/wazuh/wazuh-splunk/pull/1230>`_        This issue is fixed and you can now see actions after adding the first API.
`#1232 <https://github.com/wazuh/wazuh-splunk/pull/1232>`_        The Agent status chart data is shown correctly.
`#1237 <https://github.com/wazuh/wazuh-splunk/pull/1237>`_        The Agent status graph is fixed to show the correct amount of agents.
`#1258 <https://github.com/wazuh/wazuh-splunk/pull/1258>`_        The sorting on the Groups table columns is fixed.
`#1260 <https://github.com/wazuh/wazuh-splunk/pull/1260>`_        Non-sortable columns are fixed on the Security section tables.
`#1271 <https://github.com/wazuh/wazuh-splunk/pull/1271>`_        Group report disabled configuration parameter error is fixed.
`#1266 <https://github.com/wazuh/wazuh-splunk/pull/1266>`_        Import CDB list file is fixed.
`#1282 <https://github.com/wazuh/wazuh-splunk/pull/1282>`_        Header menu height style issue is fixed.
`#1283 <https://github.com/wazuh/wazuh-splunk/pull/1283>`_        An error is fixed on the search string used on the Alerts Summary table in the Overview > Vulnerability section, causing the table to show no data.
==============================================================    =============


Others
^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#9168 <https://github.com/wazuh/wazuh/pull/9168>`_               Error detection in the CURL helper library is fixed.
`#10899 <https://github.com/wazuh/wazuh/pull/10899>`_             External Berkeley DB library support for GCC 11 is fixed.
`#11086 <https://github.com/wazuh/wazuh/pull/11086>`_             An installation error due to missing OS minor version on CentOS Stream is fixed.
`#11455 <https://github.com/wazuh/wazuh/pull/11455>`_             An installation error due to a missing command hostname on OpenSUSE Tumbleweed is fixed.
==============================================================    =============



Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.3.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.0-7.17.3/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.3.0-8.2.6/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/blob/4.3/CHANGELOG.md>`_