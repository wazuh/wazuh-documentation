.. Copyright (C) 2019 Wazuh, Inc.

.. _release_3_10_0:

3.10.0 Release notes
====================

This section shows the most relevant improvements and fixes in version 3.10.0. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.10.0/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.10.0/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.10.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.10.0-6.8.2/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.10.0-7.3.0/CHANGELOG.md>`_

Wazuh core
----------

**Security Configuration Assessment (SCA)**

- Security Configuration Assessment (SCA) module has been refactored: It has a new internal logic motor and the policy syntax has changed. Its existing policies have also been improved and rewritten according to the refactor. 
- Now supports symbolic links following so a soft link, a hard link and the real file looks like just one for SCA module. Also now includes a numerical comparator for its rules.
- Its compliances are now shown as groups on alerts to, i.e., filter alerts on APP side.
- All present policies files are loaded at the default location.
- Fixed integrity check when switching between manager nodes: the manager will request a scan when the integrity fails or the table of results is empty.

**File integrity monitoring**

- FIM can now identify resembled paths with the same semantics and add them only once.
- Fixed error in Windows who-data when handling the directories list.
- Who-data alerts based on audit logs containing hex fields are now correctly handled.

**AWS wodle**

- Fixed the exception handling when using an invalid bucket in AWS wodle.
- Fix error when getting profiles in custom AWS buckets. 
- Fixed error message in empty AWS bucket case.

**IPv6 Compatibility**

- Increased IP internal representation size for IPv6 lenght.
- IPv6 loopback address added to localhosts list in DB output module.

**Other fixes and improvements**

- Agentless queries now accept ``]`` and ``>`` characters as terminal prompt characters.
- On overwriting rules, list rule field is now correctly copied from the original to the overwriting rule.
- Fixed an error in the hardware inventory collector for PowerPC architectures.
- Fixed incompatibility between ``alerts.json`` source alert by email option and alerts from rules containing ``no_full_log`` option.
- LogCollector now has extended duplicate file detection.
- Syscollector logging messages and Remoted failed agent authentication messages are more user-friendly.
- More readable message when some of Wazuh required daemons are down. Now is possible to restart cluster nodes except when ossec-execd is down.


Wazuh API
---------

- New API requests to retrieve ``HIPAA``, ``NIST 800-53`` and ``gpg13`` compliances rules group list.
- New ``HIPAA``, ``NIST 800-53`` and ``gpg13`` compliances API request filters.
- Improvements in stored passwords security: encryption changed from MD5 to BCrypt.
- New API request to get full summary of agents:

.. code-block:: js

        # curl -u foo:bar "http://localhost:55000/summary/agents?pretty"
    {
    "error": 0,
    "data": {

        ...
        "agent_status": {
            "Total": 6,
            "Active": 6,
            "Disconnected": 0,
            "Never connected": 0,
            "Pending": 0
        },
        "agent_version": {
            "items": [
                {
                "version": "Wazuh v3.10.0",
                "count": 1
                },
                {
                "version": "Wazuh v3.9.5",
                "count": 5
                }
            ],
            "totalItems": 6
        },
        "last_registered_agent": {
            "os": {
                "arch": "x86_64",
                "codename": "Bionic Beaver",
                "major": "18",
                "minor": "04",
                "name": "Ubuntu",
                "platform": "ubuntu",
                "uname": "Linux |ee7d4f51c0ae |4.18.0-16-generic |#17~18.04.1-Ubuntu SMP Tue Feb 12 13:35:51 UTC 2019 |x86_64",
                "version": "18.04.2 LTS"
            },
        ...
        }
    }
    
    
- Now users can dive into its SCA scan results using the API.
- Fixed exception handling for DELETE/agents API calls.(OUT)
- Disabled cache usage in POST/agents API calls. (OUT)
- Fixed API installation in Docker CentOS 7 containers.


Wazuh Ruleset
-------------

- SCA policies have been improved and refactored.
- SCA policies have been mapped with ``HIPAA`` and ``NIST_800_53`` compliances.
- Add rules for VIPRE antivirus.
- Add Windows Software Restriction Policy rules.
- Add Perdition(imap/pop3 proxy) rules.
- Add support for NAXSI web application firewall.
- Add rule to alert about system time changes.
- Add rule to detect sudo actions from users other than root.
- Add recon group to SSH rule.
- Add rule to detect untrusted kernel modules being loaded.
- Add rules for RAID and disk failures.
- Add rule for ZFS error message.
- Add rule for systemd status=1/FAILURE.
- Fix false positives on rootkit trojans detection.
- Fix rules about shellshock attack adding the proper GDPR mapping.
- Wazuh ruleset now includes decoders and rules for Panda-PAPS.
- Wazuh ruleset now supports CheckPoint Smart-1 firewalls with new decoders and rules.
- Extend event detection for Windows Defender decoders.
- Improved postfix decoder there are more extracted fields.
- Our ruleset now supports Cisco-ASA devices with new rules and decoders.
- Fixed false positives when using Sonicwall decoders.
- Fix for 0380-windows_decoder.xml Windows decoder. It now supports ISS logs an extracts new useful fields.

Wazuh Kibana APP
----------------

- Added an interactive guide for registering agents, things are now easier for the user, guiding it through the steps needed ending in a copy & paste snippet for deploying his agents.
- Added ``HIPAA`` and ``NIST-800-53`` new dashboards for the recently added regulatory compliance groups into the Wazuh core.
- Wazuh app now works under custom Kibana spaces.
- Wazuh app now works as a native plugin when using Kibana spaces and can be safely hidden/displayed depending on the selected space.
- Added an alerts summary in ``Overview >`` FIM panel.
- Alerts search bar fixed for Kibana v7.3.0, now queries are applied as expected.
- Hide attributes field from non-Windows agents in the FIM table.
- Fixed broken view in `Management > Configuration > Amazon S3 > Buckets`, some information was missing.
- Restored Remove column feature in Discover tabs.
- The app installation date was not being updated properly, now it's fixed .
- APIs passwords are now obfuscated in server responses.

**Other additions and improvements**

- Export all the information of a Wazuh group and its related agents in a PDF document.
- Export the configuration of a certain agent as a PDF document. Supports granularity for exporting just certain sections of the configuration.


Wazuh Splunk APP
----------------

- New design and several UI/UX changes.
- Wazuh Splunk APP has been adapted for Microsoft Edge Browser
- Added an interactive guide for registering agents, things are now easier for the user, guiding it through the steps needed ending in a copy & paste snippet for deploying his agent #623
- Added ``HIPAA`` and ``NIST-800-53`` new dashboards for the recently added regulatory compliance groups into the Wazuh core.
- Debug level added for app logs.
- Improved app performance.
- Modules are being shown only when supported by the agent OS.
- API sensitive information is now hidden on every transition.
- Non-active Agent data is now being shown correctly.
- Devtools content is now successfully loaded.

**Other additions and improvements**

- Export all the information of a Wazuh group and its related agents in a PDF document.
- Export the configuration of a certain agent as a PDF document. Supports granularity for exporting just certain sections of the configuration.
