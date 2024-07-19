# Change Log
All notable changes to this project will be documented in this file.

## [v4.9.0]

### Added

- Added custom Filebeat user information and deleted obsolete information about ossec.conf file on Wazuh server. ([#7382](https://github.com/wazuh/wazuh-documentation/pull/7382))
- Added journald log collection documentation. ([#7363](https://github.com/wazuh/wazuh-documentation/pull/7363))
- Added documentation for Wazuh dashboard Packages generation. ([#7356](https://github.com/wazuh/wazuh-documentation/pull/7356))
- Added documentation for Wazuh Indexer Packages generation. ([#7355](https://github.com/wazuh/wazuh-documentation/pull/7355))
- Added instructions to collect core dumps in Red Hat based endpoints. ([#7347](https://github.com/wazuh/wazuh-documentation/pull/7347))
- Added documentation for Wazuh as a custom source ASL integration. ([#7310](https://github.com/wazuh/wazuh-documentation/pull/7310))
- Added instructions to collect core dumps in Windows endpoints. ([#7299](https://github.com/wazuh/wazuh-documentation/pull/7299))
- Added python and pip installation templates. ([#7298](https://github.com/wazuh/wazuh-documentation/pull/7298))
- Added a note to warns of default auditd rule in some system that prevent Wazuh from working properly. ([#7291](https://github.com/wazuh/wazuh-documentation/pull/7291))
- Aded core dumps collection documentation. ([#7281](https://github.com/wazuh/wazuh-documentation/pull/7281))
- Added HAProxy helper documentation. ([#7279](https://github.com/wazuh/wazuh-documentation/pull/7279)) ([#7403](https://github.com/wazuh/wazuh-documentation/pull/7403))
- Added ability to disable the edition of configuration through API endpoints and UI. ([#7220](https://github.com/wazuh/wazuh-documentation/pull/7220))
- Added journald log format to localfile reference. ([#7202](https://github.com/wazuh/wazuh-documentation/pull/7202))
- Added required dependencies for AIX agent installation. ([#7196]https://github.com/wazuh/wazuh-documentation/pull/7196)
- Added functionality to forward alerts to Fluentd. ([#6691](https://github.com/wazuh/wazuh-documentation/pull/6691))
- Added the ``<forward_to>`` global option to the ``ossec.conf`` configuration reference. ([#6974](https://github.com/wazuh/wazuh-documentation/pull/6974))
- Added guide to install Wazuh components offline using the assistant. ([#6920](https://github.com/wazuh/wazuh-documentation/pull/6920))

### Changed

- Updated note related to 'never,task' rule in auditd. ([#7381](https://github.com/wazuh/wazuh-documentation/pull/7381))
- Update API script file name. ([#7296](https://github.com/wazuh/wazuh-documentation/pull/7296))
- Updated syscollector scan minimun value ([#7247](https://github.com/wazuh/wazuh-documentation/pull/7247))
- Updated new WPK paths and names. ([#7246](https://github.com/wazuh/wazuh-documentation/pull/7246))
- Updated Windows agent GUI image. ([#7241](https://github.com/wazuh/wazuh-documentation/pull/7241))
- Updated manual package generation documentation after package migration. ([#7204](https://github.com/wazuh/wazuh-documentation/pull/7204))
- Removed the container ``path`` option and changed the container ``name`` in the Azure Storage use case to keep consistency with the values shown in the images. ([#6835](https://github.com/wazuh/wazuh-documentation/pull/6835))
- Updated the ``/groups/{group_id}/files/{file_name}`` endpoint references. ([#7006](https://github.com/wazuh/wazuh-documentation/pull/7006))
- Bumped cloud services Python minimum version to 3.8. ([#7130](https://github.com/wazuh/wazuh-documentation/pull/7130))
- Changed the ``azure-storage-blob`` dependency version. ([#7443](https://github.com/wazuh/wazuh-documentation/pull/7443))

### Fixed

- Fix Amazon Security Lake Source integration validation step. ([#7360](https://github.com/wazuh/wazuh-documentation/pull/7360))
- Updated commands in installing the Wazuh agent from sources section. ([#6973](https://github.com/wazuh/wazuh-documentation/pull/6973))

### Removed

- Remove unreferenced files. ([#7222](https://github.com/wazuh/wazuh-documentation/pull/7222))
- Removed the agent info task from the multiprocessing task list. ([#7173](https://github.com/wazuh/wazuh-documentation/pull/7173))
- Removed the ``logs.level`` app setting and the references to the plugin log files and *App logs* application. ([#6810](https://github.com/wazuh/wazuh-documentation/pull/6810))

## [v4.8.1]

### Added

- Added clarification about the conditions to trigger an alert. ([#7506](https://github.com/wazuh/wazuh-documentation/pull/7506))

### Changed

- Updated the available options table for `wazuh-passwords-tool.sh`. ([#7412](https://github.com/wazuh/wazuh-documentation/pull/7412))
- Updated `docker` and `urllib3` package version references. ([#7483](https://github.com/wazuh/wazuh-documentation/pull/7483))
- Replaced `:ref:` with `:doc:` in AWS documentation. ([#7487](https://github.com/wazuh/wazuh-documentation/pull/7487))

### Fixed

- Fixed MS Graph module configuration example. ([#7378] (https://github.com/wazuh/wazuh-documentation/pull/7378))

## [v4.8.0]

### Added

- Added the `timeout` and `retries` settings to the `integratord` configuration. ([#6442](https://github.com/wazuh/wazuh-documentation/pull/6442))
- Added support for deploying with Ansible on Windows. ([#6640](https://github.com/wazuh/wazuh-documentation/pull/6640))
- Added Wazuh v4.8.0 release notes. ([#6550](https://github.com/wazuh/wazuh-documentation/pull/6550))
- Added the ``update_check`` configuration option. ([#6673](https://github.com/wazuh/wazuh-documentation/pull/6673))
- Added the Filebeat deployment into Wazuh manager worker nodes for distributed deployments with Puppet. ([#6872](https://github.com/wazuh/wazuh-documentation/pull/6872))
- Added keystore management tool section. ([#7000](https://github.com/wazuh/wazuh-documentation/pull/7000)) ([#7072](https://github.com/wazuh/wazuh-documentation/pull/7072))
- Added available SCA policies in 4.8.0 version. ([#7049](https://github.com/wazuh/wazuh-documentation/pull/7049))
- Added environment variable for Wazuh indexer in Wazuh on Docker deployment. ([#6750](https://github.com/wazuh/wazuh-documentation/pull/6750)) ([#7057](https://github.com/wazuh/wazuh-documentation/pull/7057))
- Added step to remove the *ss4o* index templates from the Wazuh indexer upgrade guide. ([#7093](https://github.com/wazuh/wazuh-documentation/pull/7093))
- Added deprecation notice for the ``cache`` Wazuh API configuration option. ([#7106](https://github.com/wazuh/wazuh-documentation/pull/7106))
- Added warning about 4.8.0 upgrade. ([#7135](https://github.com/wazuh/wazuh-documentation/pull/7135))
- Added the ``indexer`` configuration option to the Wazuh API documentation. ([#7164](https://github.com/wazuh/wazuh-documentation/pull/7164))
- Added the ``offline-url`` vulnerability detection option to the Reference guide. ([#7193](https://github.com/wazuh/wazuh-documentation/pull/7193))
- Added a note in the Reference guide about the ``<vulnerability-detector>`` change. ([#7243](https://github.com/wazuh/wazuh-documentation/pull/7243))
- Added warning message about changing passwords for Docker and Kubernetes deployments. ([#7321](https://github.com/wazuh/wazuh-documentation/pull/7321))
- Added sub-section about assigning multiple agents to a group in *Grouping agents*. ([#7309](https://github.com/wazuh/wazuh-documentation/pull/7309))
- Added the ``vulnerability-detection.remediation_lru_size`` internal option to the reference guide. ([#7339](https://github.com/wazuh/wazuh-documentation/pull/7339))
- Updated the list of supported Debian and Ubuntu operating system versions in the Deployment with Puppet guide. ([#7331](https://github.com/wazuh/wazuh-documentation/pull/7331))
- Added steps to the password change process in the Deployment with Docker and Deployment with Kubernetes guides. ([#7365](https://github.com/wazuh/wazuh-documentation/pull/7365))
- Added vulnerability detection configurations to the Upgrade guide. ([#7369](https://github.com/wazuh/wazuh-documentation/pull/7369))
- Added the ``integrations`` -> ``virustotal`` -> ``public_key`` API configuration option. [#7359](https://github.com/wazuh/wazuh-documentation/pull/7359)

### Changed

- Updated the `logcollector.ip_update_interval` setting in the Internal options documentation. ([#6373](https://github.com/wazuh/wazuh-documentation/pull/6373))
- Updated OSD version to 2.10.0. ([#6568](https://github.com/wazuh/wazuh-documentation/pull/6568))
- Updated dashboard settings screenshots. ([#6711](https://github.com/wazuh/wazuh-documentation/pull/6711))
- Changed the Wazuh dashboard home URL in single sign on configuration to just the base path. ([#6775](https://github.com/wazuh/wazuh-documentation/pull/6775)) ([#6809](https://github.com/wazuh/wazuh-documentation/pull/6809))
- Enhanced the description and examples of the ``discard_regex`` and ``field`` feature. ([#6770](https://github.com/wazuh/wazuh-documentation/pull/6770))
- Changed custom branding configuration documents. ([#6779](https://github.com/wazuh/wazuh-documentation/pull/6779))
- Changed the ``ssl_protocol`` options and default value. ([#6790](https://github.com/wazuh/wazuh-documentation/pull/6790))
- Updated the minimum supported OS requirement for the Wazuh manager. ([#6811](https://github.com/wazuh/wazuh-documentation/pull/6811))
- Changed the AWS pyarrow PIP dependency version. ([#6814](https://github.com/wazuh/wazuh-documentation/pull/6814))
- Updated a step in Upgrading the Wazuh server. ([#6879](https://github.com/wazuh/wazuh-documentation/pull/6879))
- Updated Filebeat module revision to `0.4`. ([#6861](https://github.com/wazuh/wazuh-documentation/pull/6861))
- Updated AWS, Azure, and GCP cloud security dependency installation steps. ([#6847](https://github.com/wazuh/wazuh-documentation/pull/6847))
- Updated the vulnerability detection (VD) sections following the VD module refactor. ([#6792](https://github.com/wazuh/wazuh-documentation/pull/6792)) ([#7046](https://github.com/wazuh/wazuh-documentation/pull/7046)) ([#7058](https://github.com/wazuh/wazuh-documentation/pull/7058))
- Updated screenshot and module reference from **Security events** to **Threat Hunting** in Amazon Security Lake section. ([#6956](https://github.com/wazuh/wazuh-documentation/pull/6956))
- Improved steps in the Google Cloud Platform prerequisites section. ([#6964](https://github.com/wazuh/wazuh-documentation/pull/6964))
- Updated Azure Diagnostics images. ([#6987](https://github.com/wazuh/wazuh-documentation/pull/6987))
- Updated Azure Log Analytics images. ([#7002](https://github.com/wazuh/wazuh-documentation/pull/7002))
- Updated ``installation-guide/wazuh-server/step-by-step`` considering configuration requirements for vulnerability detection. ([#7149](https://github.com/wazuh/wazuh-documentation/pull/7149))
- Updated the ``user-manual/reference/unattended-installation`` section. ([#7162](https://github.com/wazuh/wazuh-documentation/pull/7162))
- Changed Docker version requirement to ``6.0.0``. ([#7133](https://github.com/wazuh/wazuh-documentation/pull/7133))
- Updated the Vulnerability detection PoC. ([#7215](https://github.com/wazuh/wazuh-documentation/pull/7215))
- Replaced ``localhost`` occurrences. ([#7234](https://github.com/wazuh/wazuh-documentation/pull/7234)) ([#7285](https://github.com/wazuh/wazuh-documentation/pull/7285))
- Updated the upgrading central components section. ([#7273](https://github.com/wazuh/wazuh-documentation/pull/7273))
- Updated the *Monitoring Office 365 audit logs* section. ([#7275](https://github.com/wazuh/wazuh-documentation/pull/7275))
- Updated *Installing the Wazuh manager from sources* with the latest vulnerability detection changes. ([#7316](https://github.com/wazuh/wazuh-documentation/pull/7316))
- Updated screenshots and references to the new 4.8.0 interface look. ([#7280](https://github.com/wazuh/wazuh-documentation/pull/7280))

### Fixed

- Added the ``wazuh::repo`` class in Puppet manifest example in install Wazuh agent via Puppet section. ([#6954](https://github.com/wazuh/wazuh-documentation/pull/6954))
- Removed steps to modify the number of shards from the offline installation guide. ([#6958](https://github.com/wazuh/wazuh-documentation/pull/6958))
- Fixed password update step for distributed deployments. ([#6967](https://github.com/wazuh/wazuh-documentation/pull/6967))
- Added fixes and updates to the MITRE ATT&CK framework section. ([#6962](https://github.com/wazuh/wazuh-documentation/pull/6962))
- Modified master node address name to uppercase. ([#7127](https://github.com/wazuh/wazuh-documentation/pull/7127))
- Added securing credentials steps to the Vulnerability detection capability section and the Upgrading central components section. ([#7235](https://github.com/wazuh/wazuh-documentation/pull/7235))
- Replaced *Wazuh app* and *Wazuh plugin* references with *Wazuh dashboard* references. ([#7274](https://github.com/wazuh/wazuh-documentation/pull/7274))

### Removed

- Deprecated ``/vulnerability`` API endpoints. ([#6738](https://github.com/wazuh/wazuh-documentation/pull/6738))
- Removed implicit ``id!=000`` WQL filter in the search bar. ([#6815](https://github.com/wazuh/wazuh-documentation/pull/6815))
- Removed ``launchctl`` unload step from macOS uninstalling manual. ([#7123](https://github.com/wazuh/wazuh-documentation/pull/7123))
- Removed ``Wazuh_Ruleset.pdf`` references. ([#7142](https://github.com/wazuh/wazuh-documentation/pull/7142))
- Removed documentation for the ``allow-os`` vulnerability detection option. ([#7177](https://github.com/wazuh/wazuh-documentation/pull/7177))
- Removed the *Migrating from OSSEC* section. ([#7301](https://github.com/wazuh/wazuh-documentation/pull/7301))
- Removed notes about the lack of multi-tenancy support in MS-Graph sections. ([#7379](https://github.com/wazuh/wazuh-documentation/pull/7379))

## [v4.7.5]

- Support for Wazuh 4.7.5

## [v4.7.4]

- Support for Wazuh 4.7.4

## [v4.7.3]

- Support for Wazuh 4.7.3

## [v4.7.2]

### Added

- Added custom role creation steps to GCP credentials configuration section. ([#6837](https://github.com/wazuh/wazuh-documentation/pull/6837))
- Added a subsection for alert visualization in AWS Security Lake. Added a note about time to display alerts. ([#6838](https://github.com/wazuh/wazuh-documentation/pull/6838))
- Added ``urllib3==1.26.18`` dependency to Docker installation steps. ([#6824](https://github.com/wazuh/wazuh-documentation/pull/6824))

### Changed

- Added minimum configuration reading permissions to RBAC section use case. ([#6850](https://github.com/wazuh/wazuh-documentation/pull/6850))
- Updated AWS profile configuration instructions. ([#6803](https://github.com/wazuh/wazuh-documentation/pull/6803))
- Updated configuration step in Yara use case and Apache web server installation step in Malware detection PoC. ([#6894](https://github.com/wazuh/wazuh-documentation/pull/6894))

## [v4.7.1]

### Added

- Added deb/rpm selection tabs in offline installation download step. ([#6686](https://github.com/wazuh/wazuh-documentation/pull/6686))
- Added missing RBAC policies for ``PUT /decoders/files/{filename}`` and ``PUT /rules/files/{filename}`` API endpoints. ([#6693](https://github.com/wazuh/wazuh-documentation/pull/6693))
- Added ``pyarrow_hotfix`` dependency to AWS Prerequisites section. ([#6766](https://github.com/wazuh/wazuh-documentation/pull/6766))
- Added clarifications to bucket policy configurations. ([#6769](https://github.com/wazuh/wazuh-documentation/pull/6769))

### Changed

- Updated the Wazuh Ansible documentation, including the Windows agent deployment example and the variable references. ([#6761](https://github.com/wazuh/wazuh-documentation/pull/6761))

## [v4.7.0]

### Added

- Added support for Amazon Linux 2023 in Vulnerability Detector. ([#6446](https://github.com/wazuh/wazuh-documentation/pull/6446))
- Clarified that Syscollector is now capable of fetching the PYPI and node packages. [#3464](https://github.com/wazuh/wazuh-documentation/pull/6346)
- Added the Maltiverse integration section. ([#6257](https://github.com/wazuh/wazuh-documentation/pull/6257))
- Added the New Custom Logs Buckets documentation. ([#6254](https://github.com/wazuh/wazuh-documentation/pull/6254))
- Added the `options` section for integrations. ([#5962](https://github.com/wazuh/wazuh-documentation/pull/5962))

### Changed

- Updated the Maltiverse rule id. ([#6420](https://github.com/wazuh/wazuh-documentation/pull/6420))
- Updated `PIP` and `process`` information in ports inventory. ([#6308](https://github.com/wazuh/wazuh-documentation/pull/6308))
- Updated the link to "Using Dashboards Query Language". ([#6588](https://github.com/wazuh/wazuh-documentation/pull/6588))
- Updated Filebeat module revision to `0.3`. ([#6760](https://github.com/wazuh/wazuh-documentation/pull/6760))
- Changed the `allow_higher_versions` default value to `no`. ([#6776](https://github.com/wazuh/wazuh-documentation/pull/6776))

### Fixed

- Fixed paths to log files in VirusTotal integration section. ([#6651](https://github.com/wazuh/wazuh-documentation/pull/6651))

### Removed

- Removed reference for Wazuh indexer and dashboard mixed node from Deploying with Ansible guide. ([#6653](https://github.com/wazuh/wazuh-documentation/pull/6653))

## [v4.6.0]

### Added

- Added integration for the Microsoft Graph API. ([#6317](https://github.com/wazuh/wazuh-documentation/pull/6317))
- Added support for Debian Bookworm in Vulnerability Detector. ([#6338](https://github.com/wazuh/wazuh-documentation/pull/6368))
- Added `<allow_higher_versions>` to 'remote' and 'auth' sections. ([#6333](https://github.com/wazuh/wazuh-documentation/pull/6333))
- Added agent version filter option. ([#6312](https://github.com/wazuh/wazuh-documentation/pull/6312))
- Added events webhook docs. ([#6151](https://github.com/wazuh/wazuh-documentation/pull/6151))
- Added documentation to include user `.aws/config` file as default config. ([#6005](https://github.com/wazuh/wazuh-documentation/pull/6005))
- Added the FIM wildcard Windows registers documentation. ([#5932](https://github.com/wazuh/wazuh-documentation/pull/5932))
- Support AlmaLinux in Vulnerability Detector. ([#5904](https://github.com/wazuh/wazuh-documentation/pull/5904))
- wazuh-authd can now generate X509 certificates. ([#5461](https://github.com/wazuh/wazuh-documentation/pull/5461))
- Added a note in the Microsoft Graph documentation stating that multi-tenant is not supported. ([#6505](https://github.com/wazuh/wazuh-documentation/pull/6505))
- Added the Email app version for the Shuffle integration. ([#6502](https://github.com/wazuh/wazuh-documentation/pull/6502))
- Added differentiation between commands from different Python versions. ([#6514](https://github.com/wazuh/wazuh-documentation/pull/6514))
- Added `path` parameter usage example to Azure Storage documentation. ([#6524](https://github.com/wazuh/wazuh-documentation/pull/6524))
- Added documentation to change passwords for Kubernetes deployments. ([#6591](https://github.com/wazuh/wazuh-documentation/pull/6591))
- Added the Wazuh v4.6.0 release notes. ([#6034](https://github.com/wazuh/wazuh-documentation/pull/6034)) ([#6561](https://github.com/wazuh/wazuh-documentation/pull/6561)) ([#6608](https://github.com/wazuh/wazuh-documentation/pull/6608)) ([#6682](https://github.com/wazuh/wazuh-documentation/pull/6682)) ([#6684](https://github.com/wazuh/wazuh-documentation/pull/6684))

### Changed

- Updated `securityadmin.sh` script output examples in SSO docs. ([#6436](https://github.com/wazuh/wazuh-documentation/pull/6436))
- Updated output examples for indexer 4.6.0. ([#6437](https://github.com/wazuh/wazuh-documentation/pull/6437))
- Updated the **Deploy new agent** section from UI screenshots. ([#6841](https://github.com/wazuh/wazuh-documentation/pull/6481))
- Changed the Python 3.11 `pyarrow` dependency version. ([#6513](https://github.com/wazuh/wazuh-documentation/pull/6513))
- Improved descriptions of the GCP wodle options. ([#6570](https://github.com/wazuh/wazuh-documentation/pull/6570))
- Changed references to `wazuh/wazuh-kibana-app` repository. ([#6637](https://github.com/wazuh/wazuh-documentation/pull/6637))
- Reduced the EPS limit default value for FIM. ([#6646](https://github.com/wazuh/wazuh-documentation/pull/6646))([#6657](https://github.com/wazuh/wazuh-documentation/pull/6657))
- Adjusted the default vacuum settings. ([#6705](https://github.com/wazuh/wazuh-documentation/pull/6705))

### Fixed

- Fixed the GCP configuration examples. ([#6509](https://github.com/wazuh/wazuh-documentation/pull/6509))
- Added several fixes to the Integration guide. ([#6526](https://github.com/wazuh/wazuh-documentation/pull/6526)) ([#6575](https://github.com/wazuh/wazuh-documentation/pull/6575))

### Removed

- Removed references to the Wazuh Kibana plugin and the Wazuh Splunk app. ([#6401](https://github.com/wazuh/wazuh-documentation/pull/6401))

## [v4.5.4]

### Added

- Added the Wazuh v4.5.4 release notes. ([#6645](https://github.com/wazuh/wazuh-documentation/pull/6645))

## [v4.5.3]
### Added

- Added support for Kibana 7.17.13. ([#6531](https://github.com/wazuh/wazuh-documentation/pull/6531))
- Add a nested query example in the Filtering data using API queries page. ([#6362](https://github.com/wazuh/wazuh-documentation/pull/6362))
- Added clarification to change one user password at a time on Docker. ([#6554](https://github.com/wazuh/wazuh-documentation/pull/6554))
- Added clarifications for multi-node deployment steps on Docker. ([#6555](https://github.com/wazuh/wazuh-documentation/pull/6555)) ([#6578](https://github.com/wazuh/wazuh-documentation/pull/6578))
- Added the Wazuh v4.5.3 release notes. ([#6522](https://github.com/wazuh/wazuh-documentation/pull/6522))([#6562](https://github.com/wazuh/wazuh-documentation/pull/6562))([#6566](https://github.com/wazuh/wazuh-documentation/pull/6566))([#6590](https://github.com/wazuh/wazuh-documentation/pull/6590))([#6602](https://github.com/wazuh/wazuh-documentation/pull/6602))

### Changed

- Updated the SUSE OVAL URL for offline update. ([#6435](https://github.com/wazuh/wazuh-documentation/pull/6435))
- Updated the `agent_upgrade` command `force` flag description in the agent upgrade module documentation. ([#6345](https://github.com/wazuh/wazuh-documentation/pull/6345))

### Fixed

- Fixed configuration inconsistency in Wazuh Puppet agent installation. ([#6506](https://github.com/wazuh/wazuh-documentation/pull/6506))
- Fixed an error on the API reference pages that was preventing the page from loading the header and the version selector. ([#6496](https://github.com/wazuh/wazuh-documentation/pull/6496))
- Fixed an error in the first link in the "On this page" lateral menu. ([#6464](https://github.com/wazuh/wazuh-documentation/pull/6464))
- Fixed Solaris 10 installation and upgrade steps. ([#6586](https://github.com/wazuh/wazuh-documentation/pull/6586))

## [v4.5.2]

### Added

- Added the `connection_overtake_time` setting to the remoted documentation. ([#6361](https://github.com/wazuh/wazuh-documentation/pull/6361))
- Explained how to use the Wazuh installation assistant `-p|--port` option in the Wazuh dashboard installation guide. ([#6322](https://github.com/wazuh/wazuh-documentation/pull/6322))
- Added instructions on how to install Ansible on CentOS/RHEL 8. ([#6341](https://github.com/wazuh/wazuh-documentation/pull/6341))
- Added steps for updating Wazuh API user passwords and enhanced instructions for changing passwords of Wazuh indexer users in Docker deployments. ([#6306](https://github.com/wazuh/wazuh-documentation/pull/6306))
- Added support for Kibana 7.17.12. ([#6400](https://github.com/wazuh/wazuh-documentation/pull/6400))
- Updated the Debian OVAL URL for offline update. ([#6430](https://github.com/wazuh/wazuh-documentation/pull/6430))
- Added the Wazuh v4.5.2 release notes. ([#6389](https://github.com/wazuh/wazuh-documentation/pull/6389))

## [v4.5.1]

### Added

- Included the new macOS Apple silicon installers. ([#6296](https://github.com/wazuh/wazuh-documentation/pull/6296))
- Added `discard_regex` parameter to the services section of the AWS module reference. ([#6207](https://github.com/wazuh/wazuh-documentation/pull/6207))
- Added support for Kibana 7.17.10 and 7.17.11. ([#6311](https://github.com/wazuh/wazuh-documentation/pull/6311))
- Added the Wazuh v4.5.1 release notes. ([#6309](https://github.com/wazuh/wazuh-documentation/pull/6309))
- Fixed the 'Setting up Puppet certificates' document indentation. ([#6355](https://github.com/wazuh/wazuh-documentation/pull/6355))
- Updated Windows service name. [(#6160](https://github.com/wazuh/wazuh-documentation/pull/6160))
