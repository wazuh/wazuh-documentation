.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 5.0.0 has been released. Check out our release notes to discover the changes and additions of this release.

5.0.0 Release notes - TBD
=========================

This section lists the changes in version 5.0.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#31295 <https://github.com/wazuh/wazuh/issues/31295>`__ Added cluster-by-default deployment model: all Wazuh Server installations now run as a cluster node, removing the distinction between clustered and non-clustered deployments. The ``cluster.disabled`` configuration option has been removed.
-  `#33269 <https://github.com/wazuh/wazuh/issues/33269>`__ Added stateless metadata enrichment in ``remoted``, centralizing event metadata handling for stateless messages and removing the dependency on ``wazuh-db`` for that ingestion path.
-  `#33493 <https://github.com/wazuh/wazuh/issues/33493>`__ Added Engine enrichment support: IOC matching, GeoIP lookup, and event filters.
-  `#34477 <https://github.com/wazuh/wazuh/issues/34477>`__ Added Engine adaptation tier 2: raw archives handling, uncategorized event routing, input-level throttling, and internal metrics exposure.
-  `#33377 <https://github.com/wazuh/wazuh/issues/33377>`__ `#33570 <https://github.com/wazuh/wazuh/issues/33570>`__ Upgraded embedded Python interpreter from 3.10 to 3.12.
-  `#30535 <https://github.com/wazuh/wazuh/issues/30535>`__ Adapted Vulnerability Detector input pipeline to the new Wazuh 5.0 synchronization algorithm, covering first-scan, inventory-change, and feed-update scenarios.
-  `#34608 <https://github.com/wazuh/wazuh/issues/34608>`__ Removed legacy configuration surfaces, database schemas, build targets, and compatibility layers in the second server cleanup phase.
-  `#33124 <https://github.com/wazuh/wazuh/pull/33124>`__ Removed Filebeat as the log-shipping component; event forwarding now uses native Wazuh server connectivity to the Wazuh Indexer via ``indexer-connector``.
-  `#30922 <https://github.com/wazuh/wazuh/issues/30922>`__ Removed deprecated manager daemons: ``ossec-authd``, ``wazuh-agentlessd``, ``wazuh-maild``, ``wazuh-dbd``.
-  `#30924 <https://github.com/wazuh/wazuh/issues/30924>`__ Removed deprecated C CLI tools: ``manage_agents``, ``agent-auth``.
-  `#31028 <https://github.com/wazuh/wazuh/issues/31028>`__ Removed OpenSCAP server-side module.
-  `#31299 <https://github.com/wazuh/wazuh/issues/31299>`__ Removed inventory-related API endpoints.
-  `#28425 <https://github.com/wazuh/wazuh/issues/28425>`__ Removed legacy API security configuration endpoints.
-  `#35623 <https://github.com/wazuh/wazuh/issues/35623>`__ Added CVSS v4.0 support to the Vulnerability Scanner.
-  `#35771 <https://github.com/wazuh/wazuh/issues/35771>`__ Added Engine metrics collection, normalization, and indexing pipeline.
-  `#36000 <https://github.com/wazuh/wazuh/issues/36000>`__ Added new CVE 5.0 schema fields to the Vulnerability Detector content model.
-  `#35881 <https://github.com/wazuh/wazuh/issues/35881>`__ Reduced ``wazuh-manager`` Debian package dependencies, removing ``adduser``, ``lsb-release``, ``debconf``, and ``libc6``.
-  `#29734 <https://github.com/wazuh/wazuh/issues/29734>`__ Upgraded external dependencies: ``curl``, ``sqlite``, ``xz``, and ``libarchive``.
-  `#34479 <https://github.com/wazuh/wazuh/issues/34479>`__ Implemented cooperative-cancellation graceful termination for ``wmodules``.
-  `#35358 <https://github.com/wazuh/wazuh/pull/35358>`__ Included source IP in ``wazuh-remoted`` log messages.
-  `#35478 <https://github.com/wazuh/wazuh/issues/35478>`__ Preserved manager configuration files during package upgrades.
-  `#35479 <https://github.com/wazuh/wazuh/issues/35479>`__ Improved Wazuh server directory layout.
-  `#35525 <https://github.com/wazuh/wazuh/issues/35525>`__ Updated manager index names to align with the new sync model.
-  `#35905 <https://github.com/wazuh/wazuh/issues/35905>`__ Added caller module context to indexer-connector logs.
-  `#35908 <https://github.com/wazuh/wazuh/issues/35908>`__ Removed SELinux integration from the manager.
-  `#37706 <https://github.com/wazuh/wazuh/issues/37706>`__ Added default API role mappings for the indexer users ``wazuh-admin``, ``wazuh-readonly`` and ``wazuh-demo``.
-  `#35579 <https://github.com/wazuh/wazuh/issues/35579>`__ Added manager watermarks.
-  `#36805 <https://github.com/wazuh/wazuh/issues/36805>`__ Randomized the cluster key generated during manager installation instead of using a hardcoded default.
-  `#36311 <https://github.com/wazuh/wazuh/issues/36311>`__ Changed the default Indexer user used by the Manager from ``admin`` to the restricted ``wazuh-server`` user, aligning with the Indexer RBAC least-privilege model.
-  `#36705 <https://github.com/wazuh/wazuh/issues/36705>`__ Enabled shared-password agent enrollment by default, persisting the auto-generated ``authd.pass`` and synchronizing it to worker nodes, with fail-closed password validation.
-  `#32698 <https://github.com/wazuh/wazuh/issues/32698>`__ Adapted API integration tests.

Wazuh agent
^^^^^^^^^^^

-  `#29533 <https://github.com/wazuh/wazuh/issues/29533>`__ `#31838 <https://github.com/wazuh/wazuh/issues/31838>`__ Added local state persistence for agent modules (FIM, System Inventory, SCA), removing the dependency on ``rsync`` with the Wazuh Server and reducing network traffic and server-side processing overhead.
-  `#33378 <https://github.com/wazuh/wazuh/issues/33378>`__ Changed the Wazuh Manager installation path to ``/var/wazuh-manager`` (replacing ``/var/ossec``) and removed agent ID ``000``, fully decoupling agent and manager processes on shared hosts.
-  `#34849 <https://github.com/wazuh/wazuh/issues/34849>`__ Changed Vulnerability Detection to use the Wazuh Indexer as the sole authoritative CVE data source, removing direct CTI network access from the agent-side Vulnerability Detector.
-  `#33199 <https://github.com/wazuh/wazuh/issues/33199>`__ Adjusted agent-side Vulnerability Detector inventory emission and synchronization (OS, packages, hotfixes) to align with the updated VD behavior in Wazuh 5.0.
-  `#31478 <https://github.com/wazuh/wazuh/issues/31478>`__ Simplified rootcheck: removed the server-side database, sync path, and API surface; findings are now indexed through the standard alert pipeline.
-  `#33382 <https://github.com/wazuh/wazuh/issues/33382>`__ Updated logcollector file-tailing initial read strategy for more consistent behavior across log rotation scenarios.
-  `#34462 <https://github.com/wazuh/wazuh/issues/34462>`__ Updated Windows Event Channel log collection to emit native XML from ``EvtRender()`` without an XML declaration header.
-  `#35330 <https://github.com/wazuh/wazuh/issues/35330>`__ Increased default limits for agent event throughput and inventory message sizes.
-  `#30435 <https://github.com/wazuh/wazuh/issues/30435>`__ Removed deprecated agent binaries and legacy modules as part of the Wazuh 5.0 agent cleanup.
-  `#31582 <https://github.com/wazuh/wazuh/issues/31582>`__ Removed NSIS-based Windows agent installer; Windows agent now ships exclusively as an MSI package.
-  `#35880 <https://github.com/wazuh/wazuh/issues/35880>`__ Reduced ``wazuh-agent`` Debian package dependencies, removing ``adduser``, ``lsb-release``, and ``debconf``.
-  `#35471 <https://github.com/wazuh/wazuh/issues/35471>`__ Standardized agent-start and buffer-status events to a WCS-aligned JSON format.

Wazuh indexer
^^^^^^^^^^^^^

-  `#462 <https://github.com/wazuh/wazuh-indexer-plugins/issues/462>`__ Create Wazuh Indexer users and roles.
-  `#884 <https://github.com/wazuh/wazuh-indexer/issues/884>`__ Add custom GitHub Action to validate commiter's emails by domain.
-  `#902 <https://github.com/wazuh/wazuh-indexer/issues/902>`__ wazuh-indexer fails to start on OpenSearch 3.0.0.
-  `#934 <https://github.com/wazuh/wazuh-indexer/issues/934>`__ Improve workflow to build Wazuh Indexer packages.
-  `#999 <https://github.com/wazuh/wazuh-indexer/issues/999>`__ Reporting plugin in Wazuh Indexer by default.
-  `#528 <https://github.com/wazuh/wazuh-indexer-plugins/issues/528>`__ Wazuh Indexer roles are not reserved.
-  `#1032 <https://github.com/wazuh/wazuh-indexer/issues/1032>`__ Cross-Cluster Search environment.
-  `#1 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/1>`__ Initialize ``wazuh-indexer-security-analytics`` repository.
-  `#1335 <https://github.com/wazuh/wazuh-indexer/issues/1335>`__ Add wazuh-indexer-notifications to the Wazuh indexer package.
-  `#1195 <https://github.com/wazuh/wazuh-indexer/issues/1195>`__ Map alerting and notifications roles to kibanaserver user.
-  `#1249 <https://github.com/wazuh/wazuh-indexer/issues/1249>`__ Indexer cluster has a yellow status in 5.0.0.
-  `#743 <https://github.com/wazuh/wazuh-indexer-plugins/issues/743>`__ Publish Security Analytics to Maven using a custom GH Action.
-  `#1299 <https://github.com/wazuh/wazuh-indexer/issues/1299>`__ `#1365 <https://github.com/wazuh/wazuh-indexer/issues/1365>`__ Indexer Docker image for the ARM architecture.
-  `#1 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/1>`__ Initialize ``wazuh-indexer-common-utils`` repository.
-  `#1394 <https://github.com/wazuh/wazuh-indexer/issues/1394>`__ Add ``--set-as-main`` flag support to repository bumper — ``wazuh-indexer``.
-  `#1 <https://github.com/wazuh/wazuh-indexer-alerting/issues/1>`__ Initialize ``wazuh-indexer-alerting`` repository.
-  `#1433 <https://github.com/wazuh/wazuh-indexer/issues/1433>`__ Wazuh Indexer nightly Docker images.
-  `#1636 <https://github.com/wazuh/wazuh-indexer/issues/1636>`__ Performance improvements & default configurations.
-  `#853 <https://github.com/wazuh/wazuh-indexer/issues/853>`__ Migrate issue templates from ``6.0.0``.
-  `#857 <https://github.com/wazuh/wazuh-indexer/issues/857>`__ Migrate workflows from ``6.0.0`` and tools.
-  `#862 <https://github.com/wazuh/wazuh-indexer/issues/862>`__ Migrate packages smoke tests to 5.x.
-  `#893 <https://github.com/wazuh/wazuh-indexer/issues/893>`__ Resolve deprecated settings for OpenSearch 3.0.
-  `#904 <https://github.com/wazuh/wazuh-indexer/issues/904>`__ Missing improvements in main branch.
-  `#907 <https://github.com/wazuh/wazuh-indexer/issues/907>`__ lintian overrides files not being read during packages.
-  `#913 <https://github.com/wazuh/wazuh-indexer/issues/913>`__ Automatic tests for wazuh-indexer DEB packages fail.
-  `#928 <https://github.com/wazuh/wazuh-indexer/issues/928>`__ Migrate smoke tests from Allocator to docker.
-  `#895 <https://github.com/wazuh/wazuh-indexer/issues/895>`__ Nightly Indexer packages are failing due to builder workflow is not defined in main branch.
-  `#985 <https://github.com/wazuh/wazuh-indexer/issues/985>`__ Propagate repository bumper functionality from 4.13.0 through 6.0.0.
-  `#1040 <https://github.com/wazuh/wazuh-indexer/issues/1040>`__ [BUG] Builder workflow not detecting the previous version.
-  `#1080 <https://github.com/wazuh/wazuh-indexer/issues/1080>`__ Multi-tenancy disabled by default.
-  `#1122 <https://github.com/wazuh/wazuh-indexer/issues/1122>`__ Implicit versioning in workflows names.
-  `#1129 <https://github.com/wazuh/wazuh-indexer/issues/1129>`__ GitHub Actions update.
-  `#1120 <https://github.com/wazuh/wazuh-indexer/issues/1120>`__ Refactor Indexer package build workflow to use single branch input.
-  `#1191 <https://github.com/wazuh/wazuh-indexer/issues/1191>`__ Enhance maintenance workflows.
-  `#1219 <https://github.com/wazuh/wazuh-indexer/issues/1219>`__ [BUG] CodeQL GH Workflow failure.
-  `#1227 <https://github.com/wazuh/wazuh-indexer/issues/1227>`__ [BUG] SecurityAdmin tool references 'transport port' logic instead of 'http port'.
-  `#1270 <https://github.com/wazuh/wazuh-indexer/issues/1270>`__ Update build scripts to include the Security Analytics plugin.
-  `#1325 <https://github.com/wazuh/wazuh-indexer/issues/1325>`__ Docker client version too old error while testing indexer-rpm-x86_64 package.
-  `#1339 <https://github.com/wazuh/wazuh-indexer/issues/1339>`__ Dedicated runners for the package builder workflow.
-  `#1340 <https://github.com/wazuh/wazuh-indexer/issues/1340>`__ Duplicated CodeQL configurations.
-  `#1067 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1067>`__ 5.0.0-beta2 ruleset consumer.
-  `#1538 <https://github.com/wazuh/wazuh-indexer/issues/1538>`__ `#1719 <https://github.com/wazuh/wazuh-indexer/issues/1719>`__ Create Wazuh Indexer users and roles (T2).
-  `#1576 <https://github.com/wazuh/wazuh-indexer/issues/1576>`__ Missing plugin ``workload-management`` warning from ``opensearch-security``.
-  `#1653 <https://github.com/wazuh/wazuh-indexer/issues/1653>`__ Unify indexer upgrade block message.
-  `#865 <https://github.com/wazuh/wazuh-indexer/issues/865>`__ `#1068 <https://github.com/wazuh/wazuh-indexer/issues/1068>`__ 5.x repo clean-up.
-  `#905 <https://github.com/wazuh/wazuh-indexer/issues/905>`__ Delete VERSION file code.
-  `#891 <https://github.com/wazuh/wazuh-indexer/issues/891>`__ Remove ``performance-analyzer`` from indexer packages.
-  `#1580 <https://github.com/wazuh/wazuh-indexer/issues/1580>`__ SQL plugin master key warning.
-  `#1582 <https://github.com/wazuh/wazuh-indexer/issues/1582>`__ ``StreamTransportService`` not available warnings.
-  `#1577 <https://github.com/wazuh/wazuh-indexer/issues/1577>`__ SLF4J "no provider" warnings during startup.
-  `#1272 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1272>`__ Remove non-essential plugins.


Plugins
~~~~~~~

-  `#434 <https://github.com/wazuh/wazuh-indexer-plugins/issues/434>`__ Implement indices creation for 5.0.0.
-  `#466 <https://github.com/wazuh/wazuh-indexer-plugins/issues/466>`__ Create ISM rollover policy for stateless indices.
-  `#934 <https://github.com/wazuh/wazuh-indexer/issues/934>`__ Improve workflow to build Wazuh Indexer packages.
-  `#511 <https://github.com/wazuh/wazuh-indexer-plugins/issues/511>`__ States Persistence - SCA index.
-  `#499 <https://github.com/wazuh/wazuh-indexer-plugins/issues/499>`__ Propagate repository bumper functionality from 4.13.0 through 6.0.0.
-  `#489 <https://github.com/wazuh/wazuh-indexer-plugins/issues/489>`__ Checkpoint - Review documentation for the initialization plugin.
-  `#529 <https://github.com/wazuh/wazuh-indexer-plugins/issues/529>`__ Missing documentation for default users and roles (RBAC).
-  `#533 <https://github.com/wazuh/wazuh-indexer-plugins/issues/533>`__ Implement retry mechanism.
-  `#63 <https://github.com/wazuh/wazuh-indexer-reporting/issues/63>`__ Reporting revamp documentation.
-  `#553 <https://github.com/wazuh/wazuh-indexer-plugins/issues/553>`__ ECS as a base for stream indices.
-  `#580 <https://github.com/wazuh/wazuh-indexer-plugins/issues/580>`__ WCS integrations tooling.
-  `#584 <https://github.com/wazuh/wazuh-indexer-plugins/issues/584>`__ WCS indices categorization.
-  `#591 <https://github.com/wazuh/wazuh-indexer-plugins/issues/591>`__ Index names and aliases prefixed after major version.
-  `#593 <https://github.com/wazuh/wazuh-indexer-plugins/issues/593>`__ Fine-tune exceeded limits on WCS indices.
-  `#590 <https://github.com/wazuh/wazuh-indexer-plugins/issues/590>`__ Cloud Services subcategories.
-  `#605 <https://github.com/wazuh/wazuh-indexer-plugins/issues/605>`__ WCS protocol / message format fields.
-  `#1122 <https://github.com/wazuh/wazuh-indexer/issues/1122>`__ Implicit versioning in workflows names.
-  `#571 <https://github.com/wazuh/wazuh-indexer-plugins/issues/571>`__ Document indices for Inventory Enrichment Tier 2.
-  `#560 <https://github.com/wazuh/wazuh-indexer-plugins/issues/560>`__ States modification timestamp.
-  `#606 <https://github.com/wazuh/wazuh-indexer-plugins/issues/606>`__ WCS integration fields.
-  `#622 <https://github.com/wazuh/wazuh-indexer-plugins/issues/622>`__ Generalize changes to the ECS through source files patching.
-  `#638 <https://github.com/wazuh/wazuh-indexer-plugins/issues/638>`__ `#875 <https://github.com/wazuh/wazuh-indexer-plugins/issues/875>`__ WCS Security Compliance fields.
-  `#1249 <https://github.com/wazuh/wazuh-indexer/issues/1249>`__ Indexer cluster has a yellow status in 5.0.0.
-  `#735 <https://github.com/wazuh/wazuh-indexer-plugins/issues/735>`__ Schema definition for CTI based IOCs.
-  `#743 <https://github.com/wazuh/wazuh-indexer-plugins/issues/743>`__ Publish Security Analytics to Maven using a custom GH Action.
-  `#753 <https://github.com/wazuh/wazuh-indexer-plugins/issues/753>`__ IoC content download.
-  `#756 <https://github.com/wazuh/wazuh-indexer-plugins/issues/756>`__ Engine filters index.
-  `#796 <https://github.com/wazuh/wazuh-indexer-plugins/issues/796>`__ Engine filters API.
-  `#806 <https://github.com/wazuh/wazuh-indexer-plugins/issues/806>`__ F5 BIG-IP index mappings review.
-  `#804 <https://github.com/wazuh/wazuh-indexer-plugins/issues/804>`__ Policy management endpoint update.
-  `#831 <https://github.com/wazuh/wazuh-indexer-plugins/issues/831>`__ ``wazuh-events-raw-v5`` datastream.
-  `#833 <https://github.com/wazuh/wazuh-indexer-plugins/issues/833>`__ Support for Engine settings.
-  `#851 <https://github.com/wazuh/wazuh-indexer-plugins/issues/851>`__ WCS support for discarded events.
-  `#832 <https://github.com/wazuh/wazuh-indexer-plugins/issues/832>`__ ``wazuh-events-v5-unclassified`` datastream.
-  `#853 <https://github.com/wazuh/wazuh-indexer-plugins/issues/853>`__ Content Manager API documentation check.
-  `#2 <https://github.com/wazuh/wazuh-indexer-notifications/issues/2>`__ Initialize ``wazuh-indexer-notifications`` repository.
-  `#884 <https://github.com/wazuh/wazuh-indexer-plugins/issues/884>`__ Initialize active response index.
-  `#829 <https://github.com/wazuh/wazuh-indexer-plugins/issues/829>`__ IoC content delivery.
-  `#918 <https://github.com/wazuh/wazuh-indexer-plugins/issues/918>`__ Import standard space to the Wazuh Engine.
-  `#1 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/1>`__ Initialize ``wazuh-indexer-common-utils`` repository.
-  `#812 <https://github.com/wazuh/wazuh-indexer-plugins/issues/812>`__ `#37 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/37>`__ Promotion endpoint update: rules.
-  `#940 <https://github.com/wazuh/wazuh-indexer-plugins/issues/940>`__ `#1110 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1110>`__ Metrics and Monitoring indices.
-  `#72 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/72>`__ WCS compliant findings.
-  `#38 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/38>`__ Content Management API updates.
-  `#961 <https://github.com/wazuh/wazuh-indexer-plugins/issues/961>`__ Consumer's updating status.
-  `#56 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/56>`__ Rule testing capabilities in logtest.
-  `#975 <https://github.com/wazuh/wazuh-indexer-plugins/issues/975>`__ Add ``--set-as-main`` flag support to repository bumper — ``wazuh-indexer-plugins``.
-  `#82 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/82>`__ Missing findings.
-  `#993 <https://github.com/wazuh/wazuh-indexer-plugins/issues/993>`__ Load standard policy to Engine on space hash update.
-  `#1010 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1010>`__ Version check API endpoint.
-  `#1 <https://github.com/wazuh/wazuh-indexer-alerting/issues/1>`__ Initialize ``wazuh-indexer-alerting`` repository.
-  `#1069 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1069>`__ Custom user-agent for communications with CTI.
-  `#1096 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1096>`__ WCS field for event correlation.
-  `#1029 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1029>`__ Dynamic configuration of standard threat detectors.
-  `#1084 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1084>`__ YAML representation for ruleset resources.
-  `#1170 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1170>`__ Enable draft policy by default.
-  `#1051 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1051>`__ Support Revert bump functionality in wazuh-indexer-plugins.
-  `#1213 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1213>`__ Data retention policies for stream indices.
-  `#73 <https://github.com/wazuh/wazuh-indexer-alerting/issues/73>`__ Missing documentation for the Alerting plugin.
-  `#1276 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1276>`__ Configurable resource creation limits.
-  `#1277 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1277>`__ Safeguard sensitive configurations.
-  `#1328 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1328>`__ Reduce TTL for historical information about deletes in-memory.
-  `#1356 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1356>`__ Integration's mode.
-  `#442 <https://github.com/wazuh/wazuh-indexer-plugins/issues/442>`__ Add dependabot scan to the content-manager plugin.
-  `#448 <https://github.com/wazuh/wazuh-indexer-plugins/issues/448>`__ Adapt wazuh-indexer-setup plugin for 5.x.
-  `#477 <https://github.com/wazuh/wazuh-indexer-plugins/issues/477>`__ `#539 <https://github.com/wazuh/wazuh-indexer-plugins/issues/539>`__ `#547 <https://github.com/wazuh/wazuh-indexer-plugins/issues/547>`__ `#562 <https://github.com/wazuh/wazuh-indexer-plugins/issues/562>`__ `#582 <https://github.com/wazuh/wazuh-indexer-plugins/issues/582>`__ `#641 <https://github.com/wazuh/wazuh-indexer-plugins/issues/641>`__ `#697 <https://github.com/wazuh/wazuh-indexer-plugins/issues/697>`__ `#741 <https://github.com/wazuh/wazuh-indexer-plugins/issues/741>`__ `#811 <https://github.com/wazuh/wazuh-indexer-plugins/issues/811>`__ `#906 <https://github.com/wazuh/wazuh-indexer-plugins/issues/906>`__ `#1015 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1015>`__ `#1123 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1123>`__ Third-party integrations maintenance.
-  `#475 <https://github.com/wazuh/wazuh-indexer-plugins/issues/475>`__ Resolve deprecated settings for OpenSearch 3.0.
-  `#482 <https://github.com/wazuh/wazuh-indexer-plugins/issues/482>`__ `#1068 <https://github.com/wazuh/wazuh-indexer/issues/1068>`__ `#1114 <https://github.com/wazuh/wazuh-indexer/issues/1114>`__ Migrate WCS changes from 4.x.
-  `#515 <https://github.com/wazuh/wazuh-indexer-plugins/issues/515>`__ States Persistence - Checksum-based integrity.
-  `#506 <https://github.com/wazuh/wazuh-indexer-plugins/issues/506>`__ States Persistence - FIM indices rework.
-  `#1129 <https://github.com/wazuh/wazuh-indexer/issues/1129>`__ GitHub Actions update.
-  `#576 <https://github.com/wazuh/wazuh-indexer-plugins/issues/576>`__ States Persistence tier 2 - Metadata fields.
-  `#599 <https://github.com/wazuh/wazuh-indexer-plugins/issues/599>`__ `#630 <https://github.com/wazuh/wazuh-indexer-plugins/issues/630>`__ Support ECS v9.1.0.
-  `#607 <https://github.com/wazuh/wazuh-indexer-plugins/issues/607>`__ Dangling nested fields under ``gen_ai`` object.
-  `#1191 <https://github.com/wazuh/wazuh-indexer/issues/1191>`__ Enhance maintenance workflows.
-  `#615 <https://github.com/wazuh/wazuh-indexer-plugins/issues/615>`__ Automatically regenerate dependant stateless modules on base module change.
-  `#623 <https://github.com/wazuh/wazuh-indexer-plugins/issues/623>`__ Restructuring of the WCS files.
-  `#624 <https://github.com/wazuh/wazuh-indexer-plugins/issues/624>`__ Restructuring of the repository tooling.
-  `#626 <https://github.com/wazuh/wazuh-indexer-plugins/issues/626>`__ Fix ``mdbook`` to version ``0.4.x``.
-  `#645 <https://github.com/wazuh/wazuh-indexer-plugins/issues/645>`__ Safekeep YAML definition of the WCS.
-  `#650 <https://github.com/wazuh/wazuh-indexer-plugins/issues/650>`__ Data Streams.
-  `#647 <https://github.com/wazuh/wazuh-indexer-plugins/issues/647>`__ Dangling index template names.
-  `#688 <https://github.com/wazuh/wazuh-indexer-plugins/issues/688>`__ WCS compliance fields update.
-  `#1270 <https://github.com/wazuh/wazuh-indexer/issues/1270>`__ Update build scripts to include the Security Analytics plugin.
-  `#755 <https://github.com/wazuh/wazuh-indexer-plugins/issues/755>`__ Extend policy schema.
-  `#775 <https://github.com/wazuh/wazuh-indexer-plugins/issues/775>`__ Relocate ``agent`` fields under ``wazuh``.
-  `#852 <https://github.com/wazuh/wazuh-indexer-plugins/issues/852>`__ Hash per IoC type.
-  `#1341 <https://github.com/wazuh/wazuh-indexer/issues/1341>`__ Upgrade to JDK 25.
-  `#869 <https://github.com/wazuh/wazuh-indexer-plugins/issues/869>`__ Space reset endpoint.
-  `#637 <https://github.com/wazuh/wazuh-indexer-plugins/issues/637>`__ WCS fields clean-up.
-  `#879 <https://github.com/wazuh/wazuh-indexer-plugins/issues/879>`__ Restructure ecs folder.
-  `#899 <https://github.com/wazuh/wazuh-indexer-plugins/issues/899>`__ Policy update endpoint extension.
-  `#920 <https://github.com/wazuh/wazuh-indexer-plugins/issues/920>`__ Ruleset metadata normalization.
-  `#932 <https://github.com/wazuh/wazuh-indexer-plugins/issues/932>`__ Support fo multi-space logtest executions.
-  `#931 <https://github.com/wazuh/wazuh-indexer-plugins/issues/931>`__ Missing API documentation for the wazuh-indexer-setup plugin.
-  `#943 <https://github.com/wazuh/wazuh-indexer-plugins/issues/943>`__ Safeguard deletion of root decoder.
-  `#950 <https://github.com/wazuh/wazuh-indexer-plugins/issues/950>`__ Custom policies metadata.
-  `#927 <https://github.com/wazuh/wazuh-indexer-plugins/issues/927>`__ Update documentation for extended Sigma rule syntax and API validation.
-  `#963 <https://github.com/wazuh/wazuh-indexer-plugins/issues/963>`__ Strict wazuh-events-v5 data stream template.
-  `#986 <https://github.com/wazuh/wazuh-indexer-plugins/issues/986>`__ Update CTI API consumers.
-  `#1016 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1016>`__ Dynamic inclusion of detection rules in standard threat detectors.
-  `#1022 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1022>`__ Type mismatch on IoC mappings.
-  `#1063 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1063>`__ Vulnerability scanner reference field removal.
-  `#1061 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1061>`__ [BUG] Allow objects in the check property when creating filters.
-  `#1067 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1067>`__ 5.0.0-beta2 ruleset consumer.
-  `#146 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/146>`__ Normalize space values.
-  `#1121 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1121>`__ ``rule`` and ``threat`` fields alignment.
-  `#1113 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1113>`__ Initialization from snapshots rework.
-  `#1131 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1131>`__ Allow promoting rules without a root decoder.
-  `#1160 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1160>`__ Update ruleset consumer to beta-2.
-  `#214 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/214>`__ Improve time correlation between events and findings.
-  `#1184 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1184>`__ Allow logtest on ``custom`` space.
-  `#101 <https://github.com/wazuh/wazuh-indexer-notifications/issues/101>`__ Active response events completeness.
-  `#219 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/219>`__ Undocumented plugin settings.
-  `#1215 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1215>`__ Improve documentation about rules.
-  `#1200 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1200>`__ Content Manager logging review.
-  `#1288 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1288>`__ Wazuh Indexer states unification.
-  `#1271 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1271>`__ Default zstd index codec.
-  `#1275 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1275>`__ Internal indices - Disable automatic refresh on low-activity indices.
-  `#1345 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1345>`__ Immediate recovery when a feed update fails.
-  `#1334 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1334>`__ Findings case management pt.2.
-  `#1349 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1349>`__ Allow dates on Content Manager's REST API.
-  `#1353 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1353>`__ Update the Content Manager OpenAPI (``openapi.yml``) to match the current API.
-  `#440 <https://github.com/wazuh/wazuh-indexer-plugins/issues/440>`__ Remove plugins not planned for 5.x.
-  `#470 <https://github.com/wazuh/wazuh-indexer-plugins/issues/470>`__ CSV documentation for WCS contains removed fields.
-  `#530 <https://github.com/wazuh/wazuh-indexer-plugins/issues/530>`__ Outdated documentation for the initialization plugin.
-  `#604 <https://github.com/wazuh/wazuh-indexer-plugins/issues/604>`__ ECS object removal.
-  `#689 <https://github.com/wazuh/wazuh-indexer-plugins/issues/689>`__ Removal of alerts and archives index templates.
-  `#1348 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1348>`__ Make Unclassified events standard WCS category.
-  `#1354 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1354>`__ Some Wazuh indices get 1 replica on multi-node clusters due to ``auto_expand_replicas``.


Security analytics
~~~~~~~~~~~~~~~~~~

-  `#1 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/1>`__ Initialize ``wazuh-indexer-security-analytics`` repository.
-  `#743 <https://github.com/wazuh/wazuh-indexer-plugins/issues/743>`__ Publish Security Analytics to Maven using a custom GH Action.
-  `#832 <https://github.com/wazuh/wazuh-indexer-plugins/issues/832>`__ ``wazuh-events-v5-unclassified`` datastream.
-  `#57 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/57>`__ Findings enrichment.
-  `#47 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/47>`__ Extended Sigma rules syntax.
-  `#37 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/37>`__ `#812 <https://github.com/wazuh/wazuh-indexer-plugins/issues/812>`__ Lifecycle space support for Log Types and Rules.
-  `#60 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/60>`__ Configure Spotless.
-  `#39 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/39>`__ Detector configuration constraints.
-  `#56 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/56>`__ Rule testing capabilities in logtest.
-  `#88 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/88>`__ Add ``--set-as-main`` flag support to repository bumper — ``wazuh-indexer-security-analytics``.
-  `#1 <https://github.com/wazuh/wazuh-indexer-alerting/issues/1>`__ Initialize ``wazuh-indexer-alerting`` repository.
-  `#117 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/117>`__ Per-space threat detectors.
-  `#145 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/145>`__ Support Revert bump functionality in wazuh-indexer-security-analytics.
-  `#181 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/181>`__ Dynamic rule fields in findings.
-  `#173 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/173>`__ Missing Sigma modifiers.
-  `#182 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/182>`__ Case-insensitive Sigma operators.
-  `#208 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/208>`__ Restrict threat detectors sources.
-  `#973 <https://github.com/wazuh/wazuh-indexer-plugins/issues/973>`__ [BUG] Resources not removed in Security Analytics.
-  `#1029 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1029>`__ Dynamic configuration of standard threat detectors.
-  `#1220 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1220>`__ Findings case management.
-  `#1276 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1276>`__ Configurable resource creation limits.
-  `#1334 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1334>`__ Findings case management pt.2.
-  `#1356 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1356>`__ Integration's mode.
-  `#1341 <https://github.com/wazuh/wazuh-indexer/issues/1341>`__ Upgrade to JDK 25.
-  `#72 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/72>`__ WCS compliant findings.
-  `#111 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/111>`__ Limited number of rules for detectors.
-  `#112 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/112>`__ Standard Threat Detectors.
-  `#147 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/147>`__ Remove duplicated metadata fields for rules.
-  `#146 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/146>`__ Normalize space values.
-  `#214 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/214>`__ Improve time correlation between events and findings.
-  `#1121 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1121>`__ ``rule`` and ``threat`` fields alignment.
-  `#219 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/219>`__ Undocumented plugin settings.
-  `#38 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/38>`__ Content Management API updates.


Notifications
~~~~~~~~~~~~~

-  `#2 <https://github.com/wazuh/wazuh-indexer-notifications/issues/2>`__ Initialize ``wazuh-indexer-notifications`` repository.
-  `#1 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/1>`__ Initialize ``wazuh-indexer-common-utils`` repository.
-  `#6 <https://github.com/wazuh/wazuh-indexer-notifications/issues/6>`__ Active response channel backend.
-  `#22 <https://github.com/wazuh/wazuh-indexer-notifications/issues/22>`__ Add ``--set-as-main`` flag support to repository bumper — ``wazuh-indexer-notifications``.
-  `#41 <https://github.com/wazuh/wazuh-indexer-notifications/issues/41>`__ Batch processing for Active Response (Bulk Upload).
-  `#54 <https://github.com/wazuh/wazuh-indexer-notifications/issues/54>`__ Support Revert bump functionality in wazuh-indexer-notifications.
-  `#45 <https://github.com/wazuh/wazuh-indexer-notifications/issues/45>`__ Default notification channels.
-  `#101 <https://github.com/wazuh/wazuh-indexer-notifications/issues/101>`__ Active response events completeness.
-  `#1276 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1276>`__ Configurable resource creation limits.
-  `#1368 <https://github.com/wazuh/wazuh-indexer/issues/1368>`__ Update Actions using Node.js 20.


Alerting
~~~~~~~~

-  `#1 <https://github.com/wazuh/wazuh-indexer-alerting/issues/1>`__ `#3 <https://github.com/wazuh/wazuh-indexer-alerting/issues/3>`__ Initialize ``wazuh-indexer-alerting`` repository.
-  `#19 <https://github.com/wazuh/wazuh-indexer-alerting/issues/19>`__ Support Revert bump functionality in wazuh-indexer-alerting.
-  `#8 <https://github.com/wazuh/wazuh-indexer-alerting/issues/8>`__ Implement dedicated monitor for Active Response.
-  `#1276 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1276>`__ Configurable resource creation limits.
-  `#7 <https://github.com/wazuh/wazuh-indexer-alerting/issues/7>`__ Alerting logs review.


Reporting
~~~~~~~~~

-  `#737 <https://github.com/wazuh/wazuh-indexer/issues/737>`__ Quality check workflows.
-  `#42 <https://github.com/wazuh/wazuh-indexer-reporting/issues/42>`__ Propagate repository bumper functionality from 4.13.0 through 6.0.0.
-  `#999 <https://github.com/wazuh/wazuh-indexer/issues/999>`__ Reporting plugin in Wazuh Indexer by default.
-  `#48 <https://github.com/wazuh/wazuh-indexer-plugins/issues/48>`__ Add generated states-inventory-processes stateful index template to the wazuh-setup plugin.
-  `#65 <https://github.com/wazuh/wazuh-indexer-reporting/issues/65>`__ Code cleanup.
-  `#62 <https://github.com/wazuh/wazuh-indexer-reporting/issues/62>`__ Email notifications for scheduled and on demand reports.
-  `#136 <https://github.com/wazuh/wazuh-indexer-reporting/issues/136>`__ Add ``--set-as-main`` flag support to repository bumper — ``wazuh-indexer-reporting``.
-  `#153 <https://github.com/wazuh/wazuh-indexer-reporting/issues/153>`__ Support Revert bump functionality in wazuh-indexer-reporting.
-  `#1276 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1276>`__ Configurable resource creation limits.
-  `#70 <https://github.com/wazuh/wazuh-indexer-reporting/issues/70>`__ [BUG] Email checker failing during migration.
-  `#1122 <https://github.com/wazuh/wazuh-indexer/issues/1122>`__ Implicit versioning in workflows names.
-  `#1129 <https://github.com/wazuh/wazuh-indexer/issues/1129>`__ GitHub Actions update.
-  `#1191 <https://github.com/wazuh/wazuh-indexer/issues/1191>`__ Enhance maintenance workflows.


Common utils
~~~~~~~~~~~~

-  `#2 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/2>`__ Define active response channel type.
-  `#24 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/24>`__ Support Revert bump functionality in wazuh-indexer-common-utils.
-  `#8 <https://github.com/wazuh/wazuh-indexer-alerting/issues/8>`__ `#61 <https://github.com/wazuh/wazuh-indexer-alerting/issues/61>`__ Implement dedicated monitor for Active Response.


Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#811 <https://github.com/wazuh/wazuh-dashboard/pull/811>`__ `#866 <https://github.com/wazuh/wazuh-dashboard/pull/866>`__ `#961 <https://github.com/wazuh/wazuh-dashboard/pull/961>`__ `#1031 <https://github.com/wazuh/wazuh-dashboard/pull/1031>`__ `#1179 <https://github.com/wazuh/wazuh-dashboard/pull/1179>`__ `#1366 <https://github.com/wazuh/wazuh-dashboard/pull/1366>`__ Added the Health check service.
-  `#870 <https://github.com/wazuh/wazuh-dashboard/pull/870>`__ `#946 <https://github.com/wazuh/wazuh-dashboard/pull/946>`__ `#1366 <https://github.com/wazuh/wazuh-dashboard/pull/1366>`__ `#1379 <https://github.com/wazuh/wazuh-dashboard/pull/1379>`__ Added the Health Check app.
-  `#998 <https://github.com/wazuh/wazuh-dashboard/pull/998>`__ Added manager host configuration to the default configuration file.
-  `#1092 <https://github.com/wazuh/wazuh-dashboard/pull/1092>`__ Set the v9 theme as default.
-  `#805 <https://github.com/wazuh/wazuh-dashboard/issues/805>`__ Changed the location of the ``wazuh-dashboard`` service to match the other Wazuh components.
-  `#998 <https://github.com/wazuh/wazuh-dashboard/pull/998>`__ Changed the default value of the ``metaFields`` and ``timepicker:timeDefaults`` settings.
-  `#1278 <https://github.com/wazuh/wazuh-dashboard/pull/1278>`__ `#1279 <https://github.com/wazuh/wazuh-dashboard/pull/1279>`__ Excluded Wazuh dashboards and visualizations listing.
-  Removed creation of ``/usr/lib/.build-id/*`` links to prevent conflicts when installing Wazuh Dashboard alongside OpenSearch Dashboards on the same system.
-  `#1330 <https://github.com/wazuh/wazuh-dashboard/pull/1330>`__ Changed the log level of the cross compatibility service on start.
-  `#1328 <https://github.com/wazuh/wazuh-dashboard/pull/1328>`__ `#1365 <https://github.com/wazuh/wazuh-dashboard/pull/1365>`__ Changed pre install scripts to block Wazuh dashboard installation if there's an existing installation prior to 5.x.
-  `#1382 <https://github.com/wazuh/wazuh-dashboard/pull/1382>`__ Removed the Anomaly Detection plugin from the default Wazuh dashboard package.
-  `#1327 <https://github.com/wazuh/wazuh-dashboard/pull/1327>`__ `#1421 <https://github.com/wazuh/wazuh-dashboard/pull/1421>`__ Added version, revision, and stage to the Wazuh build metadata.
-  `#1434 <https://github.com/wazuh/wazuh-dashboard/issues/1434>`__ Made the Discover CSV download row limit configurable via the ``reports.csv.maxRows`` setting.

Plugins
~~~~~~~

-  `#7827 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7827>`__ Added default notification channels through the health check.
-  `#7597 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7597>`__ Added sample data generators for agent monitoring and server statistics.
-  `#7662 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7662>`__ Added ``"form-data": "^4.0.4"`` to the resolutions section to enforce the required dependency version.
-  `#7694 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7694>`__ Added prompts to views related to Server API connectivity and alerts index pattern issues.
-  Added a **Not applicable** status to the SCA ``CheckResult`` enum, including color mapping (``#B9A888``) and sample data support.
-  `#7833 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7833>`__ Added alerting sample monitors to the health check.
-  `#7917 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7917>`__, `#7975 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7975>`__, `#7990 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7990>`__, `#7994 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7994>`__ Added the **Normalization** application.
-  `#7924 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7924>`__ Added the default ``wazuh-events*`` index pattern.
-  `#7848 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7848>`__ Adapted alerts sample data to the Wazuh Common Schema.
-  `#7701 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7701>`__, `#8147 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8147>`__ Set cluster mode as the default for all Wazuh installations, including single-node deployments, and updated RBAC permissions to ``cluster:*`` actions.
-  `#7602 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7602>`__, `#7929 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7929>`__, `#7974 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7974>`__, `#7979 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7979>`__, `#8242 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8242>`__, `#8306 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8306>`__ `#8382 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8382>`__ `#8472 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8472>`__ `#8661 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8661>`__ Reworked SCA module visualizations, enabled global details for all agents without pinning, replaced the ``/sca`` endpoint with the ``wazuh-states-sca-*`` index pattern, and added sample data support.
-  `#7604 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7604>`__ `#8709 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8709>`__ Split the FIM registry inventory into two index patterns and updated fields in FIM file and registry sample data.
-  `#7622 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7622>`__, `#7694 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7694>`__, `#7756 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7756>`__, `#7829 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7829>`__ `#8317 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8317>`__ `#8551 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8551>`__ `#8642 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8642>`__ Reworked the health check.
-  `#7622 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7622>`__ Reworked several view components to use data sources.
-  `#7754 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7754>`__ Fixed date and format errors across multiple views.
-  `#7812 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7812>`__ Upgraded the ``brace-expansion`` dependency to versions ``1.1.12`` and ``2.0.2``.
-  `#7812 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7812>`__ Upgraded the ``tar-fs`` dependency to version ``2.1.4``.
-  `#7871 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7871>`__ `#8467 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8467>`__ Migrated ``wazuh.yml`` settings to ``opensearch_dashboards.yml`` and advanced settings.
-  `#7871 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7871>`__ Changed sample data index names.
-  `#7900 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7900>`__ Reworked the **Generate report** button.
-  `#7842 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7842>`__, `#7847 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7847>`__, `#7916 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7916>`__, `#7938 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7938>`__, `#8310 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8310>`__ `#8500 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8500>`__ `#8678 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8678>`__ Changed the dashboard renderer to use saved objects.
-  `#7934 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7934>`__ Changed the ``rule.groups`` filter to ``wazuh.integration.decoders``.
-  `#7981 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7981>`__ Applied the new home page navigation style to all dashboards.
-  `#7701 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7701>`__ Removed manager-specific logic in favor of cluster-based management.
-  `#7597 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7597>`__ Removed backend monitoring and statistics jobs.
-  `#7597 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7597>`__, `#7698 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7698>`__ Removed monitoring and statistics job settings from the configuration.
-  `#7597 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7597>`__ Removed the prompt related to disabled statistics jobs in the **Statistics** application.
-  `#7612 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7612>`__ `#8519 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8519>`__ Removed configuration for modules relying on deprecated daemons: ``wazuh-agentlessd``, ``wazuh-csyslogd``, ``wazuh-dbd``, ``wazuh-integratord``, ``wazuh-maild``, and ``wazuh-reportd``.
-  `#7645 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7645>`__ Removed deprecated modules: OpenSCAP, CIS-CAT, and Osquery.
-  `#7622 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7622>`__ Removed the ``/health-check`` and ``/blank-screen`` frontend routes.
-  `#7622 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7622>`__ Removed the **Miscellaneous** section from **App Settings**.
-  `#7622 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7622>`__ Removed deprecated health check and customization settings.
-  `#7871 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7871>`__ Removed legacy customization, alerts sample, and UI API editable settings.
-  `#7871 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7871>`__ Removed the **App Settings** application.
-  `#7871 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7871>`__ Removed ``GET /elastic/alerts`` and ``/utils/configuration*`` endpoints.
-  `#7871 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7871>`__ Removed tasks related to custom logo sanitization and reports directory migration.
-  `#7901 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7901>`__ Removed the **Rules**, **Decoders**, **CDB List**, and **Ruleset test** applications.
-  `#7899 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7899>`__ Removed the legacy reporting application, including server routes, UI, PDF generation logic, and related customization settings.
-  `#7932 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7932>`__, `#8271 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8271>`__ Removed several sections from **Server Management** > **Settings** and agent configuration.
-  `#7933 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7933>`__ Removed the ``wazuh-alerts*`` index pattern and replaced it with ``wazuh-events*`` as the default. Index pattern selection is now handled per module.
-  `#7933 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7933>`__ Removed deprecated ``ip.ignore`` and ``pattern`` settings.
-  `#7977 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7977>`__ Removed references to alerts and archives templates.
-  `#7857 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7857>`__, `#7868 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7868>`__, `#7891 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7891>`__, `#7982 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7982>`__ Removed indexer resource files from the source code and dependency installation process.
-  `#8015 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8015>`__ `#8212 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8212>`__ Added SSL certificate support for Wazuh API connections, allowing the dashboard to use client certificates and CA certificate validation when connecting to Wazuh Manager APIs configured with custom SSL certificates. The ``verify_ca`` value is automatically calculated based on whether certificate paths (``key``, ``cert``, ``ca``) are configured.
-  `#8015 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8015>`__ Added "Verify CA" column in the API Connections table to display whether CA certificate verification is enabled for each API host. The value is automatically determined based on certificate configuration.
-  `#8050 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8050>`__ Added ``server-api:run_as`` health check to warn when ``allow_run_as`` is disabled for configured API hosts.
-  `#8064 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8064>`__ Fixed styling issues for v9 theme.
-  `#8206 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8206>`__ Added Indexer management **Settings**.
-  `#8233 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8233>`__ `#8520 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8520>`__ `#8577 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8577>`__ Added ``wazuh-findings-v5*`` index patterns.
-  `#8264 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8264>`__ Added ``policy.name``, ``policy.description``, ``policy.file`` and ``event.outcome`` columns to the Configuration Assessment Findings table.
-  `#8248 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8248>`__ Added ``wazuh-state-fim*`` index pattern.
-  `#8066 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8066>`__ `#8512 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8512>`__ Changed default index pattern settings key from ``defaultIndex`` to ``wazuh-events*``.
-  `#8081 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8081>`__ `#8408 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8408>`__ Updated Office 365 dashboards to use new index pattern.
-  `#8072 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8072>`__ `#8354 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8354>`__ `#8420 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8420>`__ Updated GitHub dashboards to use new index pattern.
-  `#8074 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8074>`__ `#8247 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8247>`__ `#8496 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8496>`__ Updated File Integrity Monitoring dashboards to use new index pattern.
-  `#8069 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8069>`__ Updated Google Cloud dashboard to use new index pattern.
-  `#8065 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8065>`__ `#8593 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8593>`__ Updated Amazon web services dashboard to use new index pattern.
-  `#8073 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8073>`__ `#8335 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8335>`__ `#8343 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8343>`__ Updated Microsoft Graph API dashboard to use new index pattern.
-  `#8063 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8063>`__ `#8421 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8421>`__ Updated Threat Hunting dashboard with new index pattern definition.
-  `#8125 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8125>`__ Upgraded axios to 1.13.3.
-  `#8179 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8179>`__ `#8482 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8482>`__ Upgraded axios to 1.13.5.
-  `#8125 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8125>`__ Upgraded loglovel to 1.9.2.
-  `#8128 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8128>`__ `#8364 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8364>`__ `#8513 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8513>`__ Updated Docker module under Cloud Security, with new index pattern definition.
-  `#8136 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8136>`__ Changed Ossec references to wazuh-manager.
-  `#8137 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8137>`__ Changed default Dev Tools request from deprecated ``GET /manager/info`` to ``GET /cluster/<NODE_NAME>/info``.
-  `#8145 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8145>`__ Upgraded ESLint from version 8 to version 10 and migrated configuration from legacy ``.eslintrc.json`` to the new flat config format (``eslint.config.mjs``).
-  `#8157 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8157>`__ `#8335 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8335>`__ `#8568 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8568>`__ `#8606 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8606>`__ `#8628 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8628>`__ `#8633 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8633>`__ `#8674 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8674>`__ `#8703 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8703>`__ Updated Malware Detection dashboard with new index pattern definition.
-  `#8175 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8175>`__ `#8209 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8209>`__ Removed Manager UUID from Server APIs table and added Cluster UUID on About page.
-  `#8146 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8146>`__ Updated Security Operations dashboards with new index pattern definition.
-  `#8224 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8224>`__ Changed the monitoring and statistics index patterns to ``wazuh-metrics-agents*`` and ``wazuh-metrics-comms*``.
-  `#8231 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8231>`__ Renamed ``Events`` tab to ``Findings``.
-  `#8232 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8232>`__ Replaced the broken visualization in Configuration Assessment.
-  `#8230 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8230>`__ Swapped menu positions of Vulnerability detection and MITRE ATT&CK.
-  `#8220 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8220>`__ Removed the Cluster app and relocated some panels to the Status app.
-  `#8236 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8236>`__ Changed the default value of ``wazuh.updates.disabled`` from ``false`` to ``true``.
-  `#8239 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8239>`__ `#8303 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8303>`__ Centralized regulatory compliance modules (PCI DSS, GDPR, HIPAA, NIST 800-53, and TSC) into a single "Regulatory Compliance" application.
-  `#8262 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8262>`__ `#8283 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8283>`__ `#8292 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8292>`__ `#8507 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8507>`__ Updated Vulnerability Detection Discover tab filters, and inventory columns.
-  `#8269 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8269>`__ Changed FIM table columns and index source in the agent view.
-  `#8313 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8313>`__ `#8484 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8484>`__ `#8492 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8492>`__ `#8710 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8710>`__ Changed IT Hygiene memory visualization.
-  `#8320 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8320>`__ Changed default columns in Configuration assessment.
-  `#8049 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8049>`__ Removed deprecated settings of Policy monitoring.
-  `#8060 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8060>`__ Removed the UI permission validation for the upgrade and remove agent actions on Agent management > Summary.
-  `#8102 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8102>`__ Removed ``hideManagerAlerts`` setting.
-  `#8104 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8104>`__ `#8105 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8105>`__ `#8117 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8117>`__ Removed usage of agent ``000``.
-  `#8125 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8125>`__ Removed ``needle`` dependency.
-  `#8125 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8125>`__ Removed ``read-last-lines`` dependency.
-  `#8195 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8195>`__ Removed Key Request configuration options from the Registration Service view.
-  `#8214 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8214>`__ Removed Sample Data app and related endpoints to manage.
-  `#8215 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8215>`__ Removed the Docker app.
-  `#8218 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8218>`__ Removed the Statistics app.
-  `#8243 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8243>`__ Removed some options of the manager and agent configuration.
-  `#8289 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8289>`__ Added Indexer configuration UI section in **Server Management** > **Settings**.
-  `#8290 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8290>`__ Added CMMC regulatory compliance module.
-  `#8296 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8296>`__ Added FedRAMP regulatory compliance module.
-  `#8286 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8286>`__ Added ISO 27001 regulatory compliance module.
-  `#8298 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8298>`__ Added NIS2 regulatory compliance module.
-  `#8294 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8294>`__ Added NIST 800-171 regulatory compliance module.
-  `#8357 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8357>`__ `#8430 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8430>`__ Added ``wazuh-threatintel-enrichments*`` index patterns.
-  `#8398 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8398>`__ Added a Refresh button to the suggested filters search bar.
-  `#8403 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8403>`__ Added the ability to generate a PDF report in the Vulnerabilities dashboard.
-  `#8201 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8201>`__ Added a button that allows requesting a CTI content update.
-  `#8486 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8486>`__ `#7663 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7663>`__ `#8629 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8629>`__ Added the CTI Console registration flow (UI and registration status API).
-  `#8480 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8480>`__ Added the ``wazuh-metrics-normalization*`` index pattern.
-  `#8485 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8485>`__ `#8600 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8600>`__ `#8524 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8524>`__ Added the Normalization tab and dashboard in **Server management** > **Statistics**.
-  `#8307 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8307>`__ Changed index pattern usage in MITRE ATT&CK and Compliance panels in the agent overview.
-  `#8281 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8281>`__ `#8479 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8479>`__ `#8510 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8510>`__ Updated the Threat Hunting dashboard with the new index pattern definition.
-  `#8289 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8289>`__ Changed Cluster and Logging configuration sections in **Server Management** > **Settings** to use the full node configuration endpoint.
-  `#8318 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8318>`__ Reduced the requests done to get the index pattern to use in some views.
-  `#8350 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8350>`__ Set the downloaded local agent package name to match the remote one.
-  `#8417 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8417>`__ Changed FIM findings default columns.
-  `#8436 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8436>`__ Allowed only one server API configuration per indexer.
-  `#8459 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8459>`__ Updated the OS icon source field in the Endpoints summary table to display Linux agent icons.
-  `#8254 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8254>`__ Reworked the Statistics dashboard.
-  `#8498 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8498>`__ Updated the breadcrumb label in **Agents management** > **Summary**.
-  `#8524 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8524>`__ Renamed Listener Engine tab to Comms in **Server management** > **Statistics** section.
-  `#8307 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8307>`__ Removed the GPG13 option in the Compliance panel in the agent overview.
-  `#8718 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8718>`__ Expanded the case management form with title, description, severity, priority and TLP fields, comments that can be added or edited individually, and a confirmation dialog before discarding unsaved changes.
-  `#8768 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/8768>`__ Added queue usage in bytes and agent cache visualizations to **Server management** > **Statistics**, and relabeled the Comms "Queue usage" Y-axis to Bytes.
-  `#1434 <https://github.com/wazuh/wazuh-dashboard/issues/1434>`__ Enhanced the description of the ``reports.csv.maxRows`` setting.
-  `#8580 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8580>`__ `#8589 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8589>`__ `#8598 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8598>`__ `#8630 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8630>`__ Added the Case Management tab to the Findings document details flyout.
-  `#8583 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8583>`__ `#8608 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8608>`__ `#8630 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8630>`__ `#8720 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8720>`__ Created the case management app.
-  `#8611 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8611>`__ `#8663 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8663>`__ Added visualizations to **Vulnerability Detection** > **Inventory**.
-  `#8601 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8601>`__ `#8679 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8679>`__ `#8681 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8681>`__ `#8724 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8724>`__ Added the Incident Response app.
-  `#8643 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8643>`__ `#8693 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8693>`__ Added the ``wazuh.disabledSettings`` configuration to hide specific settings in the Indexer Settings UI.
-  `#8644 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8644>`__ Reduced peak resource usage during plugin startup by processing index-pattern initialization tasks in small batches instead of all at once.
-  `#8559 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8559>`__ `#8586 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8586>`__ `#8690 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8690>`__ Updated agent install and download commands to use the release stage for package naming.
-  `#8552 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8552>`__ Reworked the FIM overview and agent tab.
-  `#8573 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8573>`__ `#8617 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8617>`__ Updated MITRE ATT&CK dashboards to use techniques, subtechniques and tactics names.
-  `#8616 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8616>`__ Condensed the setting labels and added info tooltips in the registration service configuration view.
-  `#8706 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8706>`__ Adapted management of daemons status to the new API response schema.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#31746 <https://github.com/wazuh/wazuh/issues/31746>`__ Fixed Vulnerability Detector version matcher logic for improved detection accuracy.
-  `#33108 <https://github.com/wazuh/wazuh/issues/33108>`__ Fixed Cloudtrail log ingestion parsing errors.
-  `#34082 <https://github.com/wazuh/wazuh/issues/34082>`__ Fixed ``wazuh-db`` error assigning groups by avoiding the keyentries counter as index.
-  `#35043 <https://github.com/wazuh/wazuh/issues/35043>`__ Fixed token validation race condition after revoke.
-  `#35638 <https://github.com/wazuh/wazuh/issues/35638>`__ Handled the stop signal during vulnerability feed download.
-  `#37521 <https://github.com/wazuh/wazuh/issues/37521>`__ Fixed ``GET /cluster/{node_id}/daemons/stats`` always returning error 1014 for ``wazuh-manager-analysisd`` due to a protocol mismatch between ``WazuhSocketJSON`` and the engine's HTTP API socket.

Wazuh agent
^^^^^^^^^^^

-  `#29668 <https://github.com/wazuh/wazuh/issues/29668>`__ Fixed FIM checksum calculation that was incorrectly ignoring some file fields.
-  `#30513 <https://github.com/wazuh/wazuh/issues/30513>`__ Fixed syscollector reporting duplicate and bogus packages on macOS arm64.
-  `#32915 <https://github.com/wazuh/wazuh/issues/32915>`__ Fixed ``agent_control`` not displaying agent status information.
-  `#35071 <https://github.com/wazuh/wazuh/issues/35071>`__ Fixed SCA handling of invalid operators and missing values in regex patterns.
-  `#35156 <https://github.com/wazuh/wazuh/issues/35156>`__ Fixed agent modules initializing before agent metadata was fully ready.
-  `#35162 <https://github.com/wazuh/wazuh/issues/35162>`__ Fixed FIM inventory reporting file modification time as 1970-01-01.
-  `#35169 <https://github.com/wazuh/wazuh/issues/35169>`__ Fixed agent automatic reload failing after receiving centralized configuration.
-  `#35248 <https://github.com/wazuh/wazuh/issues/35248>`__ Fixed syscollector false positive package detection on macOS.
-  `#35329 <https://github.com/wazuh/wazuh/issues/35329>`__ Fixed agent uninstall on Windows after a WPK upgrade.
-  `#35474 <https://github.com/wazuh/wazuh/issues/35474>`__ Fixed agent 5.x sending a trailing null byte in messages.
-  `#35636 <https://github.com/wazuh/wazuh/issues/35636>`__ Fixed WUA hotfix collection regression in Windows agent v5.0.0.
-  `#35955 <https://github.com/wazuh/wazuh/issues/35955>`__ Fixed wodle command argument construction for Windows paths.
-  `#35960 <https://github.com/wazuh/wazuh/issues/35960>`__ Prevented Windows agent restart abort when the service is already stopping.
-  `#35978 <https://github.com/wazuh/wazuh/issues/35978>`__ Fixed timeout message displayed after a 4.13-to-5.0 upgrade on Windows.
-  `#35979 <https://github.com/wazuh/wazuh/issues/35979>`__ Fixed agent disconnection on direct 4.13-to-5.0 custom WPK upgrade.
-  `#35988 <https://github.com/wazuh/wazuh/issues/35988>`__ Excluded ``/bin`` and ``/sbin`` from FIM monitored directories on usrmerge distributions.
-  `#36002 <https://github.com/wazuh/wazuh/issues/36002>`__ Expanded Windows environment variables in SCA rule inputs.
-  `#36061 <https://github.com/wazuh/wazuh/issues/36061>`__ Made ``sync_end_delay`` interruptible to remove stale ``modulesd.pid`` after agent stop.
-  `#36092 <https://github.com/wazuh/wazuh/issues/36092>`__ Honored the shutdown signal in ``agent-upgrade`` ``StartMQ`` to avoid timeout warning on agent stop.
-  `#36126 <https://github.com/wazuh/wazuh/issues/36126>`__ Adjusted DockerListener messages as log entries to fix event categorization.
-  `#36134 <https://github.com/wazuh/wazuh/issues/36134>`__ Dropped orphan paths before promoting on agent startup to fix FIM.
-  `#37653 <https://github.com/wazuh/wazuh/issues/37653>`__ Lowered the ``wazuh-agentd`` connection socket error log to debug level to avoid duplicating the "Lost connection with manager" error on transient disconnections.
-  `#37626 <https://github.com/wazuh/wazuh/issues/37626>`__ Fixed a race condition when saving the Logcollector file status on shutdown.
-  `#37656 <https://github.com/wazuh/wazuh/issues/37656>`__ Fixed an unbounded memory leak in ``wazuh-modulesd`` caused by a missing RPM macro context cleanup on every package scan cycle.

Wazuh indexer
^^^^^^^^^^^^^

-  `#844 <https://github.com/wazuh/wazuh-indexer/issues/844>`__ Indexer 6.0.0 packages are being uploaded in 5.x path.
-  `#911 <https://github.com/wazuh/wazuh-indexer/issues/911>`__ wazuh-indexer fails to start due to seccomp error.
-  `#961 <https://github.com/wazuh/wazuh-indexer/issues/961>`__ CodeQL workflow fails.
-  `#1011 <https://github.com/wazuh/wazuh-indexer/issues/1011>`__ Outdated naming on auto-generated demo certificates.
-  `#1027 <https://github.com/wazuh/wazuh-indexer/issues/1027>`__ Wazuh Indexer RPM package fails to preserve the previous service state.
-  `#1110 <https://github.com/wazuh/wazuh-indexer/issues/1110>`__ Deprecation warning on the email checker action.
-  `#1135 <https://github.com/wazuh/wazuh-indexer/issues/1135>`__ [BUG] ``SysV`` service script permissions.
-  `#1189 <https://github.com/wazuh/wazuh-indexer/issues/1189>`__ [BUG] Invalid command output in distribution/src/bin/indexer-security-init.sh.
-  `#1205 <https://github.com/wazuh/wazuh-indexer/issues/1205>`__ [BUG] repository_bumper.sh builds broken links.
-  `#1223 <https://github.com/wazuh/wazuh-indexer/issues/1223>`__ [BUG] Demo certificates downloaded by default in 5.0 rpm package.
-  `#867 <https://github.com/wazuh/wazuh-indexer-plugins/issues/867>`__ ``linkchecker`` failures.
-  `#1379 <https://github.com/wazuh/wazuh-indexer/issues/1379>`__ IOException: Unknown ConfigType ordinal [11]`` in ``opensearch-alerting`.
-  `#1532 <https://github.com/wazuh/wazuh-indexer/issues/1532>`__ Wrong permissions for ``/etc/default/wazuh-indexer``.
-  `#1573 <https://github.com/wazuh/wazuh-indexer/issues/1573>`__ Warning messages running systemctl status.
-  `#1271 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1271>`__ Default zstd index codec.
-  `#1353 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1353>`__ Update the Content Manager OpenAPI (``openapi.yml``) to match the current API.
-  `#1752 <https://github.com/wazuh/wazuh-indexer/issues/1752>`__ [BUG] wazuh-readonly missing promotion and mapping permissions.


Plugins
~~~~~~~

-  `#461 <https://github.com/wazuh/wazuh-indexer-plugins/issues/461>`__ Wrong folder structure under ``ecs`` folder.
-  `#503 <https://github.com/wazuh/wazuh-indexer-plugins/issues/503>`__ Failing ECS event generators.
-  `#537 <https://github.com/wazuh/wazuh-indexer-plugins/issues/537>`__ Developer guide uses JDK11.
-  `#614 <https://github.com/wazuh/wazuh-indexer-plugins/issues/614>`__ WCS tooling does not detect some modules.
-  `#639 <https://github.com/wazuh/wazuh-indexer-plugins/issues/639>`__ [BUG] verify_integrations script not working correctly.
-  `#672 <https://github.com/wazuh/wazuh-indexer-plugins/issues/672>`__ Bug: ``dns.answers`` field type mismatch in cloud-services-gcp template.
-  `#698 <https://github.com/wazuh/wazuh-indexer-plugins/issues/698>`__ [BUG] Fix ``mdbook`` docs mermaid processor.
-  `#1329 <https://github.com/wazuh/wazuh-indexer/issues/1329>`__ [BUG] Repeated custom policies for ``.cti-policies``.
-  `#814 <https://github.com/wazuh/wazuh-indexer-plugins/issues/814>`__ New data structure for IoCs.
-  `#877 <https://github.com/wazuh/wazuh-indexer-plugins/issues/877>`__ [BUG] Flaky integration tests in setup plugin.
-  `#867 <https://github.com/wazuh/wazuh-indexer-plugins/issues/867>`__ ``linkchecker`` failures.
-  `#909 <https://github.com/wazuh/wazuh-indexer-plugins/issues/909>`__ [BUG] Race condition on ``.cti-consumers`` index creation.
-  `#913 <https://github.com/wazuh/wazuh-indexer-plugins/issues/913>`__ KV Store startup failure in Splunk 10.2.1.
-  `#973 <https://github.com/wazuh/wazuh-indexer-plugins/issues/973>`__ [BUG] Resources not removed in Security Analytics.
-  `#1004 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1004>`__ CodeQL failures.
-  `#1019 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1019>`__ Build failure in indexer package construction.
-  `#1042 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1042>`__ Telemetry ping on job registration.
-  `#1140 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1140>`__ [BUG] Missing ``wazuh-threatintel-filters`` index.
-  `#1166 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1166>`__ [BUG] ``space.hash`` field present in every resource type.
-  `#1173 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1173>`__ [BUG] Policy metadata duplicated at root level on updates.
-  `#1180 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1180>`__ [BUG] Unregistered deployments use ``-b`` content indices.
-  `#1209 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1209>`__ Enrichments dataset as unnested object.
-  `#1199 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1199>`__ [BUG] Blank ``to_offset`` parameter fetching consumer changes.
-  `#1577 <https://github.com/wazuh/wazuh-indexer/issues/1577>`__ SLF4J "no provider" warnings during startup.
-  `#1251 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1251>`__ [BUG] Content initialization fails due to race condition.
-  `#1314 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1314>`__ Use valid OpenSearch transport action name prefixes in the content manager plugin.
-  `#1342 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1342>`__ [BUG] Consumers local offset is not updated to the latest.
-  `#1373 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1373>`__ [BUG] Promotion changes on fresh install.
-  `#1362 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1362>`__ [BUG] Missing threat-intel indices.
-  `#1353 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1353>`__ Update the Content Manager OpenAPI (``openapi.yml``) to match the current API.


Security analytics
~~~~~~~~~~~~~~~~~~

-  `#1194 <https://github.com/wazuh/wazuh-indexer/issues/1194>`__ Failure while uploading artifacts in the package generation workflow.
-  `#867 <https://github.com/wazuh/wazuh-indexer-plugins/issues/867>`__ ``linkchecker`` failures.
-  `#61 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/61>`__ Failing CodeQL.
-  `#97 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/97>`__ [BUG] Detectors creation uses ``_id`` field.
-  `#82 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/82>`__ Missing findings.
-  `#110 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/110>`__ CodeQL failures.
-  `#1043 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1043>`__ [BUG] Removed rules are still referenced in the threat detectors.
-  `#148 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/148>`__ Race condition in correlation metadata index creation causes ``ResourceAlreadyExistsException``.
-  `#127 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/127>`__ [BUG] Rules using ``contains`` and white spaces do not work.
-  `#168 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/168>`__ RCA: missing findings.
-  `#1150 <https://github.com/wazuh/wazuh-indexer-plugins/issues/1150>`__ ClassCastException during Security Analytics space resource deletion on startup.


Notifications
~~~~~~~~~~~~~

-  `#8 <https://github.com/wazuh/wazuh-indexer-notifications/issues/8>`__ Failing CodeQL.
-  `#34 <https://github.com/wazuh/wazuh-indexer-notifications/issues/34>`__ CodeQL failures.
-  `#1577 <https://github.com/wazuh/wazuh-indexer/issues/1577>`__ SLF4J "no provider" warnings during startup.


Alerting
~~~~~~~~

-  `#168 <https://github.com/wazuh/wazuh-indexer-security-analytics/issues/168>`__ RCA: missing findings.
-  `#1577 <https://github.com/wazuh/wazuh-indexer/issues/1577>`__ SLF4J "no provider" warnings during startup.
-  `#1746 <https://github.com/wazuh/wazuh-indexer/issues/1746>`__ java.lang.OutOfMemoryError: Java heap space in Soak agent tests.


Reporting
~~~~~~~~~

-  `#75 <https://github.com/wazuh/wazuh-indexer-reporting/issues/75>`__ [BUG] Broken links reported by the GH Workflow.
-  `#74 <https://github.com/wazuh/wazuh-indexer-reporting/issues/74>`__ [BUG] Broken CodeQL workflow.
-  `#867 <https://github.com/wazuh/wazuh-indexer-plugins/issues/867>`__ ``linkchecker`` failures.
-  `#141 <https://github.com/wazuh/wazuh-indexer-reporting/issues/141>`__ CodeQL failures.


Common utils
~~~~~~~~~~~~

-  `#16 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/16>`__ CodeQL failures.
-  `#23 <https://github.com/wazuh/wazuh-indexer-common-utils/issues/23>`__ ``gh pr merge`` called with empty URL in ``5_bumper_repository.yml``.


Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#1276 <https://github.com/wazuh/wazuh-dashboard/pull/1276>`__ Fixed health check padding styles.
-  `#1285 <https://github.com/wazuh/wazuh-dashboard/pull/1285>`__ Sanitized redirect path to prevent open redirect.
-  `#1400 <https://github.com/wazuh/wazuh-dashboard/pull/1400>`__ Prevented an infinite remount loop when navigating from an app before its bundle finishes loading.

Plugins
~~~~~~~

-  `#7923 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7923>`__ Fixed a hardcoded version value in the **Deploy agent** wizard.
-  `#8099 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8099>`__ Fixed a visual bug in SCA score decimal precision on the Agent Overview.
-  `#8150 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8150>`__ Fixed the agent stats view was innaccesible for some version combinations.
-  `#8196 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8196>`__ Fixed the button tooltip showing administrator role requirement where it wasn't needed.
-  `#8216 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8216>`__ Fixed a message in the group selector of the deploy new agent guide related to missing permissions when there was no groups available or they could not be obtained.
-  `#8252 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8252>`__ Fixed the under evaluation filter was removed on filter addition in Vulnerability Detection.
-  `#8267 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8267>`__ `#8285 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8285>`__ Fixed home KPIs not being vertically centered.
-  `#8311 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8311>`__ Fixed MITRE ATT&CK Findings data grid not spanning the full available width.
-  `#8476 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8476>`__ Fixed MITRE ATT&CK overview and pinned-agent dashboard visualization titles and layout.
-  `#8358 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8358>`__ Fixed pinned agent being lost when opening module links (FIM, SCA, Vulnerability Detection, MITRE ATT&CK, agent menu) in a new tab from the agent overview.
-  `#8475 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8475>`__ Fixed File Integrity Monitoring files inventory table layout by using smaller default widths for ``file.owner``, ``file.uid``, and ``file.size``, allowing ``file.path`` to use more horizontal space.
-  `#8330 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8330>`__ Fixed long labels in IT Hygiene horizontal bar visualizations causing display issues.
-  `#8516 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8516>`__ Fixed rendering of the Tactics and Techniques cells in the MITRE ATT&CK flyout.
-  `#8525 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8525>`__ Fixed custom filter buttons not being rendered in PDF reports.
-  `#8447 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8447>`__ Fixed the message shown when the server cluster is disabled and the **Cluster** app is accessed.
-  `#8579 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8579>`__ Fixed MITRE technique fields being truncated in the Document Details flyout by showing the full list of clickable items.
-  `#8610 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8610>`__ Fixed FIM visualizations height.
-  `#8653 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8653>`__ Fixed the GitHub link in the About page pointing to the legacy ``wazuh-kibana-app`` repository.
-  `#8699 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8699>`__ Fixed SCA module columns width.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-indexer <https://github.com/wazuh/wazuh-indexer/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-indexer-plugins <https://github.com/wazuh/wazuh-indexer-plugins/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-indexer-security-analytics <https://github.com/wazuh/wazuh-indexer-security-analytics/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-indexer-notifications <https://github.com/wazuh/wazuh-indexer-notifications/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-indexer-alerting <https://github.com/wazuh/wazuh-indexer-alerting/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-indexer-reporting <https://github.com/wazuh/wazuh-indexer-reporting/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-indexer-common-utils <https://github.com/wazuh/wazuh-indexer-common-utils/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-dashboard/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v5.0.0/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v5.0.0/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v5.0.0/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v5.0.0/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v5.0.0/CHANGELOG.md>`__
