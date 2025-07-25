# Change Log
All notable changes to this project will be documented in this file.

## [v5.0.0]

### Added

- Added documentation for the reporting plugin in the Wazuh dashboard package generation guide. ([#8682](https://github.com/wazuh/wazuh-documentation/pull/8682))

### Changed

- Replaced `indexer_cluster_initial_master_nodes` with `indexer_initial_cluster_manager_nodes` in Puppet deployment documentation. ([#8666](https://github.com/wazuh/wazuh-documentation/pull/8666))

### Removed

- Removed `compatibility.override_main_response_version` setting from Wazuh Indexer configuration as it is no longer supported in OpenSearch 3.0. ([#8609](https://github.com/wazuh/wazuh-documentation/pull/8609)) 

### [v4.14.0]

### Added

- Added AlmaLinux 10 support to Wazuh agent packages list and vulnerability detection compatibility matrix. ([#8691](https://github.com/wazuh/wazuh-documentation/pull/8691))

### Changed

- Updated the Filebeat package revision number. ([#8627](https://github.com/wazuh/wazuh-documentation/pull/8627))
- Updated centralized configuration (`agent.conf`) documentation to reflect that agents apply changes automatically (hot reload) without requiring a manual restart. ([#8711](https://github.com/wazuh/wazuh-documentation/pull/8711))

## [v4.13.1]

- Support for Wazuh 4.13.1

## [v4.13.0]

### Added

- Added support for CentOS Stream 10. ([#8607](https://github.com/wazuh/wazuh-documentation/pull/8607))
- Added support for Red Hat Enterprise Linux 10. ([#8608](https://github.com/wazuh/wazuh-documentation/pull/8608))
- Added the *Wazuh indexer configuration on hardened endpoints* section. ([#8437](https://github.com/wazuh/wazuh-documentation/pull/8437))
- Added steps to preserve custom settings in the JVM configuration file during the indexer upgrade. ([#8603](https://github.com/wazuh/wazuh-documentation/pull/8603))
- Added the CentOS Stream 9 SCA policy reference to the Available SCA policies section. ([#8602](https://github.com/wazuh/wazuh-documentation/pull/8602))
- Added steps for installing a single node stack via Puppet in *Deployment with Puppet*. ([#8611](https://github.com/wazuh/wazuh-documentation/pull/8611))
- Added information about filters in the Windows agent to block UNC and mapped drive paths to mitigate *NetNTLMv2* vulnerabilities. ([#8665](https://github.com/wazuh/wazuh-documentation/pull/8665))
- Added the Wazuh global queries documentation. ([#8722](https://github.com/wazuh/wazuh-documentation/pull/8722))

### Changed

- Updated the Available SCA policies section. ([#8602](https://github.com/wazuh/wazuh-documentation/pull/8602))
- Added instructions for retrieving the correct Puppet agent node name and to set the ``<PUPPET_AGENT_NODE_NAME>`` placeholder in the manifest. ([#8664](https://github.com/wazuh/wazuh-documentation/pull/8664))
- Updated the *Deployment on Docker* section. ([#8688](https://github.com/wazuh/wazuh-documentation/pull/8688))

## [v4.12.0]

### Added

- Added reference to macOS arm64 WPK. ([#7883](https://github.com/wazuh/wazuh-documentation/pull/7883))
- Added Ubuntu 24.04 SCA to the list of available SCAs. ([#8021](https://github.com/wazuh/wazuh-documentation/pull/8021))
- Added the `<aws_profile>` authentication parameter to the Amazon Security Lake documentation. ([#8199](https://github.com/wazuh/wazuh-documentation/pull/8199))
- Added ARM64 to the central components architecture references. ([#8173](https://github.com/wazuh/wazuh-documentation/pull/8173))
- Added a note warning that downgrades to 4.11 and earlier versions from 4.12 and later are not possible. ([#8425](https://github.com/wazuh/wazuh-documentation/pull/8425))
- Added new configuration options to the MS Graph integration documentation. ([#8226](https://github.com/wazuh/wazuh-documentation/pull/8226)) ([#8495](https://github.com/wazuh/wazuh-documentation/pull/8495)) ([#8496](https://github.com/wazuh/wazuh-documentation/pull/8496))
- **Post-release**: Added troubleshooting steps to the *Virtual Machine (OVA)* installation guide. ([#8562](https://github.com/wazuh/wazuh-documentation/pull/8562))
- **Post-release**: Added a note in the installation guide about firewall configuration to prevent communication issues between Wazuh components. ([#8622](https://github.com/wazuh/wazuh-documentation/pull/8622))
- **Post-release**: Added instruction to run Windows backup commands in CMD (Command Prompt) and not PowerShell. ([#8672](https://github.com/wazuh/wazuh-documentation/pull/8672))
- **Post-release**: Added clarification references to the *Agent upgrade module* section. ([#8687](https://github.com/wazuh/wazuh-documentation/pull/8687))
- **Post-release**: Added the *Wazuh AI Analyst service* section to the Cloud service documentation. ([#8690](https://github.com/wazuh/wazuh-documentation/pull/8690))
- **Post-release**: Added DNF package manager support for installation and configuration steps. ([#8689](https://github.com/wazuh/wazuh-documentation/pull/8689))
- **Post-release**: Added security update for the `remove-threat.py` script and a warning to the Detecting and removing malware using VirusTotal integration POC guide. ([#8697](https://github.com/wazuh/wazuh-documentation/pull/8697))
- **Post-release**: Added note about manual replication of `ossec.conf` between master and worker nodes. ([#8720](https://github.com/wazuh/wazuh-documentation/pull/8720))

### Changed

- Updated Wazuh dashboard package generation guide. ([#7961](https://github.com/wazuh/wazuh-documentation/pull/7961))
- Updated images in FIM PoC. [#7979](https://github.com/wazuh/wazuh-documentation/pull/7979)
- Added clarification about PCRE2 case sensitivity and modifiers in the ruleset XML syntax guide. ([#8717](https://github.com/wazuh/wazuh-documentation/pull/8717))
- Replaced the `--version` parameter with `--commit-sha` in the Wazuh dashboard package generation guide. ([#8216](https://github.com/wazuh/wazuh-documentation/pull/8216))
- Updated the Filebeat package references in Packages list. ([#8348](https://github.com/wazuh/wazuh-documentation/pull/8348))
- Updated Microsoft Entra ID SSO setup steps for the administrator role. ([#8399](https://github.com/wazuh/wazuh-documentation/pull/8399)) ([#8424](https://github.com/wazuh/wazuh-documentation/pull/8424))
- Updated filebeat installation commands. ([#8410](https://github.com/wazuh/wazuh-documentation/pull/8410))
- Updated the *Profiles* section in *Configuring AWS credentials*. ([#8426](https://github.com/wazuh/wazuh-documentation/pull/8426)) ([#8429](https://github.com/wazuh/wazuh-documentation/pull/8429))
- Updated the *Who-data monitoring on Linux* section. ([#8435](https://github.com/wazuh/wazuh-documentation/pull/8435)), ([#8492](https://github.com/wazuh/wazuh-documentation/pull/8492))
- Updated the *Agents* sub-section in *Deployment on Kubernetes*. ([#8475](https://github.com/wazuh/wazuh-documentation/pull/8475))
- Updated the available SCA policies table. ([#8500](https://github.com/wazuh/wazuh-documentation/pull/8500))
- **Post-release**: Updated the 4.12.0 release notes highlights text. ([#8510](https://github.com/wazuh/wazuh-documentation/pull/8510))
- **Post-release**: Changed the *Packages list* title to *Open Virtual Appliances* in the *Virtual Machine (OVA)* section. ([#8514](https://github.com/wazuh/wazuh-documentation/pull/8514))
- **Post-release**: Updated the launchctl `unload` and `load` commands with `launchctl bootout system` and `launchctl bootstrap system`. ([#8591](https://github.com/wazuh/wazuh-documentation/pull/8591))
- **Post-release**: Updated the Wazuh repository addition steps for RHEL 9-compatible systems. ([#8594](https://github.com/wazuh/wazuh-documentation/pull/8594))
- **Post-release**: Updated the `alienvault_reputation.ipset` download link in the *Blocking a known malicious actor* PoC. ([#8594](https://github.com/wazuh/wazuh-documentation/pull/8604))
- **Post-release**: Updated agent upgrade documentation to include examples for upgrading multiple agents at once using the `-a` flag. ([#8617](https://github.com/wazuh/wazuh-documentation/pull/8617))
- **Post-release**: Updated the *Wazuh package generation* guide. ([#8600](https://github.com/wazuh/wazuh-documentation/pull/8600)) ([#8626](https://github.com/wazuh/wazuh-documentation/pull/8626))
- **Post-release**: Added steps to export and import dashboard customizations in the upgrade guide. ([#8618](https://github.com/wazuh/wazuh-documentation/pull/8618))
- **Post-release**: Updated the vulnerability detection capability section. ([#8693](https://github.com/wazuh/wazuh-documentation/pull/8693))
- **Post-release**: Changed the warning note on using the `$` and `&` characters when changing passwords in Docker deployments. ([#8694](https://github.com/wazuh/wazuh-documentation/pull/8694))

### Fixed

- **Post-release**: Updated the package list to include missing ARM64 architecture references for the Wazuh indexer and Wazuh dashboard. ([#8511](https://github.com/wazuh/wazuh-documentation/pull/8511))
- **Post-release**: Fixed Filebeat DEB package URLs in the package list. ([#8577](https://github.com/wazuh/wazuh-documentation/pull/8577))
- **Post-release**: Removed outdated version notices from documentation. ([#8578](https://github.com/wazuh/wazuh-documentation/pull/8578))
- **Post-release**: Fixed command errors in the "Starting the service" section of the Wazuh server cluster documentation. ([#8587](https://github.com/wazuh/wazuh-documentation/pull/8587))
- **Post-release**: Removed extra `PUT /rules/files/{filename}` reference from `rules:delete` ([#8599](https://github.com/wazuh/wazuh-documentation/pull/8599))
- **Post-release**: Fixed incorrect reference from **Ubuntu** to **Windows** endpoint in the SCA use case documentation. ([#8629](https://github.com/wazuh/wazuh-documentation/pull/8629))
- **Post-release**: Fixed incorrect URL and filepaths in the YARA download steps of the *Leveraging LLMs for Alert Enrichment* PoC. ([#8686](https://github.com/wazuh/wazuh-documentation/pull/8686))
- **Post-release**: Corrected inaccurate references to the Wazuh Syscollector module. ([#8713](https://github.com/wazuh/wazuh-documentation/pull/8713))

## [v4.11.2]

### Added

- Added the ``authentication_pool_size`` option to the Wazuh server API configuration section. ([#8287](https://github.com/wazuh/wazuh-documentation/pull/8287))
- Added clarifications that `<disabled>` is required in `active-response` blocks in *Use cases* and *Active response* reference sections. ([#8428](https://github.com/wazuh/wazuh-documentation/pull/8428))
- Added new section on creating agent groups. ([#8436](https://github.com/wazuh/wazuh-documentation/pull/8436))

### Changed

- **Post-release**: Clarified the conditions for the Wazuh repository disabling recommendation upon installation. ([#8408](https://github.com/wazuh/wazuh-documentation/pull/8408))
- **Post-release**: Updated certificate location reference for Logstash and file permissions change command. ([#8415](https://github.com/wazuh/wazuh-documentation/pull/8415))
- **Post-release**: Moved the note in the **Configuring vulnerability detection** documentation to appear after the `<indexer>` block. ([#8427](https://github.com/wazuh/wazuh-documentation/pull/8427))
- **Post-release**: Included checkout command in Amazon Security Lake integration guide. ([#8423](https://github.com/wazuh/wazuh-documentation/pull/8423))
- **Post-release**: Updated Vulnerability Detection Proof of Concept. ([#8422](https://github.com/wazuh/wazuh-documentation/pull/8422))

### Fixed

- **Post-release**: Added missing Oracle Linux to the vulnerability detection compatibility matrix and fixed heading level. ([#8391](https://github.com/wazuh/wazuh-documentation/pull/8391))
- **Post-release**: Added specific version for Email app in Shuffle integration section. ([#8420](https://github.com/wazuh/wazuh-documentation/pull/8420))
- **Post-release**: Fixed mispelled word "address" occurrences. ([#8421](https://github.com/wazuh/wazuh-documentation/pull/8421))
- **Post-release**: Fixed `wazuh-certs-tool` download command from static version number to use `WAZUH_CURRENT_VERSION` ([#8473](https://github.com/wazuh/wazuh-documentation/pull/8473))
- **Post-release**: Add missing changes in Download configuration files from remote location section. ([#8476](https://github.com/wazuh/wazuh-documentation/pull/8476))
- **Post-release**: Reverted new configuration options added to the MS Graph integration documentation. ([#8495](https://github.com/wazuh/wazuh-documentation/pull/8495))

## [v4.11.1]

- **Post-release**: Added missing entry to 4.11.1 release notes. ([#8280](https://github.com/wazuh/wazuh-documentation/pull/8280))
- **Post-release**: Added clarification about the user account used to access the Wazuh dashboard. ([#8282](https://github.com/wazuh/wazuh-documentation/pull/8282))

## [v4.11.0]

### Added

- Added architecture information to assistant pages. ([#7830](https://github.com/wazuh/wazuh-documentation/pull/7830))
- Added CISA to the vulnerability source enumerations and compatibility matrix. ([#8201](https://github.com/wazuh/wazuh-documentation/pull/8201))
- **Post-release**: Added new configuration options to the MS Graph integration documentation. ([#8226](https://github.com/wazuh/wazuh-documentation/pull/8226))
- **Post-release**: Added Wazuh indexer API documentation. ([#8231](https://github.com/wazuh/wazuh-documentation/pull/8231))

### Changed

- Updated note about uninstalling Wazuh agents in Solaris. ([#7925](https://github.com/wazuh/wazuh-documentation/pull/7925))
- Updated screenshots from System Inventory.  ([#8044](https://github.com/wazuh/wazuh-documentation/pull/8044))
- Updated the Virtual Machine (OVA) and Amazon Machine Images (AMI) sections. Updated the operating system component to AL2023. ([#8201](https://github.com/wazuh/wazuh-documentation/pull/8201))
- **Post-release**: Updated the explanation of the `frequency` option in the `localfile` documentation.
- **Post-release**: Updated the Filebeat installation commands. ([#8390](https://github.com/wazuh/wazuh-documentation/pull/8390))

### Removed

- Removed note about plugins and upgrading Wazuh central components. ([#8020](https://github.com/wazuh/wazuh-documentation/pull/8020))

### Fixed

- **Post-release**: Removed prompt symbol from code block. ([#8211](https://github.com/wazuh/wazuh-documentation/pull/8211))
- **Post-release**: Increased note and code block indentation. ([8213](https://github.com/wazuh/wazuh-documentation/pull/8213))
- **Post-release**: Fixed script argument in dashboard package generation command. ([8265](https://github.com/wazuh/wazuh-documentation/pull/8265))
- **Post-release**: Fixed OpenSearch Dashboards version reference. ([8265](https://github.com/wazuh/wazuh-documentation/pull/8265))

## [v4.10.2]

### Fixed

- Removed prompt symbol from code block. ([#8561](https://github.com/wazuh/wazuh-documentation/pull/8561))
- Added specific version for Email app in Shuffle integration section. ([#8565](https://github.com/wazuh/wazuh-documentation/pull/8565))

## [v4.10.1]

- Support for Wazuh 4.10.1

## [v4.10.0]

### Added

- Added documentation for the MDM Intune integration. ([#7661](https://github.com/wazuh/wazuh-documentation/pull/7661))
- Added the agent uninstall RBAC action. ([#7708](https://github.com/wazuh/wazuh-documentation/pull/7708))
- Added the ``anti_tampering`` configuration block documentation. ([#7580](https://github.com/wazuh/wazuh-documentation/pull/7580))
- Added PowerPC package references back to the packages list. ([#7724](https://github.com/wazuh/wazuh-documentation/pull/7724))
- Added dependencies to the dependency requirements in the Offline installation guide using the installation assistant. ([#7931](https://github.com/wazuh/wazuh-documentation/pull/7931))
- Added ``wazuh.updates.disabled`` to the *Wazuh dashboard settings* reference document. ([#7977](https://github.com/wazuh/wazuh-documentation/pull/7977))
- Added a troubleshooting guide to the Vulnerability detection capability section. ([#8014](https://github.com/wazuh/wazuh-documentation/pull/8014))

### Changed

- Replaced the commands to start and stop the Wazuh agent on macOS systems. ([#7498](https://github.com/wazuh/wazuh-documentation/pull/7498))
- Updated the available options and examples for the MSI package generation command. ([#7501](https://github.com/wazuh/wazuh-documentation/pull/7501))
- Updated the available SCA policies table. ([#7698](https://github.com/wazuh/wazuh-documentation/pull/7698))
- Updated default and allowed ``chunk_size`` values for upgrading agents using wpk files. ([#7717](https://github.com/wazuh/wazuh-documentation/pull/7717))
- Updated upgrading steps for Wazuh on Docker and Wazuh on Kubernetes deployments. ([#7859](https://github.com/wazuh/wazuh-documentation/pull/7859))
- Replaced ``wazuh-packages`` repository references with ``wazuh-virtual-machines`` in the OVA generation guide. ([#7926](https://github.com/wazuh/wazuh-documentation/pull/7926))
- Updated agent dashboard screenshots: Inventory, Stats, and Configuration. ([#7942](https://github.com/wazuh/wazuh-documentation/pull/7942))
- Updated references for the new Wazuh dashboard Agents management section. ([#7944](https://github.com/wazuh/wazuh-documentation/pull/7944))
- Replaced VirusTotal screenshot in the getting started guide. ([#7946](https://github.com/wazuh/wazuh-documentation/pull/7946))
- Updated malware detection screenshots to include VirusTotal. ([#7975](https://github.com/wazuh/wazuh-documentation/pull/7975))
- Updated **Inventory Data** page screenshots to reflect the newly added tabs: **Software**, **Network**, and **Processes**. ([#7976 ](https://github.com/wazuh/wazuh-documentation/pull/7976))
- Changed ``urllib3`` dependency version to ``1.26.20`` and fixed references to the minimum Python version. ([#7978](https://github.com/wazuh/wazuh-documentation/pull/7978))
- Updated references to the ``wazuh-packages`` repository in commands for building agent packages to reflect the latest repository structure. ([#7995](https://github.com/wazuh/wazuh-documentation/pull/7995))
- Updated dashboard query configuration screenshots. ([#8027](https://github.com/wazuh/wazuh-documentation/pull/8027))
- Improved Password management section. ([#8026](https://github.com/wazuh/wazuh-documentation/pull/8026))

### Fixed

- Updated URL in Puppet agent installation step. ([#7920](https://github.com/wazuh/wazuh-documentation/pull/7920))
- Added ``gnupg`` to the dependencies installation step in the Install Ansible guide. ([#7932](https://github.com/wazuh/wazuh-documentation/pull/7932))
- Added step in the *Upgrading Wazuh Docker* guide. ([#7929](https://github.com/wazuh/wazuh-documentation/pull/7929))
- Fixed Securing your Wazuh installation steps for distributed deployments in Password management section. ([#8026](https://github.com/wazuh/wazuh-documentation/pull/8026))

### Removed

- Removed the step to disable the Wazuh manager service from the *Uninstalling the Wazuh central components* guide. ([#7814](https://github.com/wazuh/wazuh-documentation/pull/7814))
- Removed ``wazuh-packages`` repository reference from release notes. ([#7970](https://github.com/wazuh/wazuh-documentation/pull/7970))

## [v4.9.2]

### Added

- Updated the API host default value. ([#7933](https://github.com/wazuh/wazuh-documentation/pull/7933))

## [v4.9.1]

### Added

- Added dependency requirements to the offline installation guide. ([#7755](https://github.com/wazuh/wazuh-documentation/pull/7755))
- Added `SECURITY.md` to the Wazuh documentation repository. ([#7764](https://github.com/wazuh/wazuh-documentation/pull/7764))
- Added support for Python 3.12 in configuration steps. ([#7673](https://github.com/wazuh/wazuh-documentation/pull/7673))
- Added ARM64 Wazuh manager package references to Packages list. ([#7806](https://github.com/wazuh/wazuh-documentation/pull/7806))
- Added *macOS Sequoia 15* to the Available SCA policies list. ([#7864](https://github.com/wazuh/wazuh-documentation/pull/7864))

### Changed

- Replaced  Wazuh keystore password insertion commands with a safer method and added a new parameter to the list of available options. ([#7593](https://github.com/wazuh/wazuh-documentation/pull/7593))
- Restored Wazuh dashboard package revision number. ([#7762](https://github.com/wazuh/wazuh-documentation/pull/7762))

### Fixed

- Added a step for creating a retention policy using the Visual editor in the *Index life management* section. ([#7685](https://github.com/wazuh/wazuh-documentation/pull/7685))
- Fixed debugging command for the Wazuh dashboard. ([#7769](https://github.com/wazuh/wazuh-documentation/pull/7769))
- Fixed Wazuh indexer repository reference in the Wazuh indexer package generation guide. ([#7779](https://github.com/wazuh/wazuh-documentation/pull/7779))
- Fixed highlighting in Docker compose configuration file example. ([#7867](https://github.com/wazuh/wazuh-documentation/pull/7867))

### Removed

- Removed the command to delete `opensearch_dashboards.yml` in the *Upgrading the Wazuh dashboard* section. ([#7777](https://github.com/wazuh/wazuh-documentation/pull/7777))
- Removed the step to delete ss4o index templates in *Upgrading the Wazuh indexer*. ([#7810](https://github.com/wazuh/wazuh-documentation/pull/7810))

## [v4.9.0]

### Added

- Added AWS Security Hub section to the monitoring AWS based services documentation. ([#7111](https://github.com/wazuh/wazuh-documentation/pull/7111)) ([#7649](https://github.com/wazuh/wazuh-documentation/pull/7649))
- Added custom Filebeat user information and deleted obsolete information about ossec.conf file on Wazuh server. ([#7382](https://github.com/wazuh/wazuh-documentation/pull/7382))
- Added journald log collection documentation. ([#7363](https://github.com/wazuh/wazuh-documentation/pull/7363))
- Added documentation for Wazuh dashboard Packages generation. ([#7356](https://github.com/wazuh/wazuh-documentation/pull/7356))
- Added documentation for Wazuh Indexer Packages generation. ([#7355](https://github.com/wazuh/wazuh-documentation/pull/7355))
- Added instructions to collect core dumps in Red Hat based endpoints. ([#7347](https://github.com/wazuh/wazuh-documentation/pull/7347))
- Added documentation for Wazuh as a custom source for the Amazon Security Lake integration. ([#7310](https://github.com/wazuh/wazuh-documentation/pull/7310)) ([#7586](https://github.com/wazuh/wazuh-documentation/pull/7586))
- Added instructions to collect core dumps in Windows endpoints. ([#7299](https://github.com/wazuh/wazuh-documentation/pull/7299))
- Added python and pip installation templates. ([#7298](https://github.com/wazuh/wazuh-documentation/pull/7298))
- Added a note to warns of default auditd rule in some system that prevent Wazuh from working properly. ([#7291](https://github.com/wazuh/wazuh-documentation/pull/7291))
- Added core dumps collection documentation. ([#7281](https://github.com/wazuh/wazuh-documentation/pull/7281))
- Added HAProxy helper documentation. ([#7279](https://github.com/wazuh/wazuh-documentation/pull/7279)) ([#7403](https://github.com/wazuh/wazuh-documentation/pull/7403))
- Added ability to disable the edition of configuration through API endpoints and UI. ([#7220](https://github.com/wazuh/wazuh-documentation/pull/7220))
- Added journald log format to localfile reference. ([#7202](https://github.com/wazuh/wazuh-documentation/pull/7202))
- Added required dependencies for AIX agent installation. ([#7196]https://github.com/wazuh/wazuh-documentation/pull/7196)
- Added functionality to forward alerts to Fluentd. ([#6691](https://github.com/wazuh/wazuh-documentation/pull/6691))
- Added the ``<forward_to>`` global option to the ``ossec.conf`` configuration reference. ([#6974](https://github.com/wazuh/wazuh-documentation/pull/6974))
- Added guide to install Wazuh components offline using the assistant. ([#6920](https://github.com/wazuh/wazuh-documentation/pull/6920)) ([#7571](https://github.com/wazuh/wazuh-documentation/pull/7571)) ([#7672](https://github.com/wazuh/wazuh-documentation/pull/7672))
- Added storage roles to the *Creating Google Cloud credentials* steps. ([#7577](https://github.com/wazuh/wazuh-documentation/pull/7577))
- Added the *NumPy* dependency to the AWS prerequisites. ([#7589](https://github.com/wazuh/wazuh-documentation/pull/7589))
- Updated the Available SCA policies table. ([#7644](https://github.com/wazuh/wazuh-documentation/pull/7644)) ([#7697](https://github.com/wazuh/wazuh-documentation/pull/7697))
- Added a note advising on the minimum GCC compiler version required to build the Wazuh agent from source. ([#7648](https://github.com/wazuh/wazuh-documentation/pull/7648))

### Changed

- Updated note related to 'never,task' rule in auditd. ([#7381](https://github.com/wazuh/wazuh-documentation/pull/7381))
- Update API script file name. ([#7296](https://github.com/wazuh/wazuh-documentation/pull/7296))
- Updated syscollector scan minimum value ([#7247](https://github.com/wazuh/wazuh-documentation/pull/7247))
- Updated new WPK paths and names. ([#7246](https://github.com/wazuh/wazuh-documentation/pull/7246))
- Updated Windows agent GUI image. ([#7241](https://github.com/wazuh/wazuh-documentation/pull/7241))
- Updated manual package generation documentation after package migration. ([#7204](https://github.com/wazuh/wazuh-documentation/pull/7204))
- Removed the container ``path`` option and changed the container ``name`` in the Azure Storage use case to keep consistency with the values shown in the images. ([#6835](https://github.com/wazuh/wazuh-documentation/pull/6835))
- Updated the ``/groups/{group_id}/files/{file_name}`` endpoint references. ([#7006](https://github.com/wazuh/wazuh-documentation/pull/7006))
- Bumped cloud services Python minimum version to 3.8. ([#7130](https://github.com/wazuh/wazuh-documentation/pull/7130))
- Changed the ``azure-storage-blob`` dependency version. ([#7443](https://github.com/wazuh/wazuh-documentation/pull/7443))
- Updated single sign-on user administration section in the User manual to address OpenSearch changes. ([#7630](https://github.com/wazuh/wazuh-documentation/pull/7630)) ([#7635](https://github.com/wazuh/wazuh-documentation/pull/7635))
- Updated the Google Cloud Platform posture management documentation. ([#7668](https://github.com/wazuh/wazuh-documentation/pull/7668))
- Updated the Custom logos in the Wazuh dashboard documentation. ([#7665](https://github.com/wazuh/wazuh-documentation/pull/7665)) ([#7678](https://github.com/wazuh/wazuh-documentation/pull/7678))
- Updated the Creating the ``wazuh-archives-*`` index pattern GIF image in the Event logging section of the Wazuh server documentation. ([#7669](https://github.com/wazuh/wazuh-documentation/pull/7669)).
- Updated the Wazuh agent documentation in User manual. ([#7637](https://github.com/wazuh/wazuh-documentation/pull/7637))
- Updated the Wazuh server cluster documentation in User manual. ([#7704](https://github.com/wazuh/wazuh-documentation/pull/7704))
- Updated the Wazuh dashboard documentation in User manual. ([#7711](https://github.com/wazuh/wazuh-documentation/pull/7711))

### Fixed

- Fix Amazon Security Lake Source integration validation step. ([#7360](https://github.com/wazuh/wazuh-documentation/pull/7360))
- Updated commands in installing the Wazuh agent from sources section. ([#6973](https://github.com/wazuh/wazuh-documentation/pull/6973))
- Fixed **Indexer management** and **Dashboard management** references. ([#7583](https://github.com/wazuh/wazuh-documentation/pull/7583))
- Fixed the name of the property **customization.logo.reports**. ([#7646](https://github.com/wazuh/wazuh-documentation/pull/7646))
- Fixed ``wazuh-template.json`` links. ([#7652](https://github.com/wazuh/wazuh-documentation/pull/7652))

### Removed

- Removed unreferenced files. ([#7222](https://github.com/wazuh/wazuh-documentation/pull/7222))
- Removed the ``logs.level`` app setting and the references to the plugin log files and *App logs* application. ([#6810](https://github.com/wazuh/wazuh-documentation/pull/6810))
- Removed PowerPC package references from the packages list. ([#7684](https://github.com/wazuh/wazuh-documentation/pull/7684)) ([#7729](https://github.com/wazuh/wazuh-documentation/pull/7729))
- Removed references to Alpine Linux Wazuh agent installation and upgrade. ([#7729](https://github.com/wazuh/wazuh-documentation/pull/7729))
- Removed the Policy monitoring capability section. ([#7725](https://github.com/wazuh/wazuh-documentation/pull/7725))

## [v4.8.2]

- Support for Wazuh 4.8.2

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
