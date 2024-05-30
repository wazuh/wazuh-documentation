# Change Log
All notable changes to this project will be documented in this file.

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
