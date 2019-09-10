.. Copyright (C) 2019 Wazuh, Inc.

.. _release_3_10_0:

3.10.0 Release notes
====================

This section shows the most relevant improvements and fixes in version 3.10.0. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/3.10/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/3.10/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/3.10/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/3.10-7.3/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/3.10/CHANGELOG.md>`_

Wazuh core
----------

**Security Configuration Assessment (SCA)**

- Security Configuration Assessment (SCA) module has been refactored: It has a new internal logic motor and the policy syntax has changed. Its existing policies have also been improved and rewritten according to the refactor. 
- SCA now supports symbolic link following and includes a numerical comparator for its rules.
- Corresponding SCA compliance checks groups are now shown on SCA source alerts. HIPAA and NIST 800-53 compliances are now mapped as ruleset groups.
- All present SCA policies files are loaded at the default location. 
- Fixed SCA integrity check when switching between manager nodes: the manager will request a scan when the integrity fails or the table of results is empty.

**File integrity monitoring**

- FIM can now identify resembled paths with the same semantics and add them only once.
- Fixed error in Windows who-data when handling the directories list.

**AWS wodle**

- Fixed the exception handling when using an invalid bucket in AWS wodle.
- Fix error when getting profiles in custom AWS buckets. 
- Fixed error message in empty AWS bucket case.

**IPv6 Compatibility**

- Increased IP internal representation size for IPv6 lenght.
- IPv6 loopback address added to localhosts list in DB output module

**Other fixes and improvements**

- Agentless queries now accept ``]`` and ``>`` characters as terminal prompt characters.
- Sources installer now supports NetBSD
- On overwriting rules, list rule field is now correctly copied from the original to the overwriting rule.
- Fixed an error in the hardware inventory collector for PowerPC architectures.
- Fixed compilation error on FreeBSD 13 and macOS 10.14. Also fixed compilation error for local installation.
- Fixed incompatibility between ``alerts.json`` source alert by email option and alerts from rules containing ``no_full_log`` option.
- LogCollector now has extended duplicate file detection.
- Syscollector logging messages and Remoted failed agent authentication messages are more user-friendly.
- More readable message when some of required Wazuh daemons are down. Now is possible to restart cluster nodes except when ossec-execd is down.



Wazuh API
---------

- New API requests to retrieve HIPAA, NIST 800-53 and gpg13 compliances rules group list.
- New HIPAA, NIST 800-53 and gpg13 compliances API request filters.
- Improvements in stored passwords security: encryption changed from MD5 to BCrypt.
- New API request to get full summary of agents.

.. code-block:: js

    GET /sca/001
    {
        "error": 0,
        "data": {
            "totalItems": 3,
            "items": [
                {
                    "pass": 2,
                    "references": "https://www.ssh.com/ssh/",
                    "invalid": 0,
                    "description": "Guidance for establishing a secure configuration for SSH service vulnerabilities.",
                    "end_scan": "2019-04-30 05:29:50",
                    "score": 22,
                    "fail": 7,
                    "hash_file": "4c7d05c9501ea38910e20ae22b1670b4f778669bd488482b4a19d179da9556ea",
                    "start_scan": "2019-04-30 05:29:50",
                    "total_checks": 9,
                    "name": "System audit for SSH hardening",
                    "policy_id": "system_audit_ssh"
                },
                ...
            ]
        }
    }


- Dive into your SCA scan results using the API.
- Fixed exception handling for DELETE/agents API calls.
- Disabled cache usage in POST/agents API calls. 
- Fixed API installation in Docker CentOS 7 containers.

Wazuh app
---------


- Added an interactive guide for registering agents, things are now easier for the user, guiding it through the steps needed ending in a copy & paste snippet for deploying his agents.
- Added ``HIPAA`` and ``NIST-800-53`` new dashboards for the recently added regulatory compliance groups into the Wazuh core.
- Wazuh app now works under custom Kibana spaces and correctly fits the Kibana dark mode.
- Wazuh app now works as a native plugin when using Kibana spaces and can be safely hidden/displayed depending on the selected space.
- Added an alerts summary in ``Overview >`` FIM panel
- Alerts search bar fixed for Kibana v7.3.0, now queries are applied as expected.
- Hide attributes field from non-Windows agents in the FIM table.
- Fixed broken view in `Management > Configuration > Amazon S3 > Buckets`, some information was missing.
- Keep user's filters when switching from Discover to panel.
- Restored Remove column feature in Discover tabs.
- Apps using Kibana v7.3.0 had a bug once the user goes back from ``Agent > FIM > Files to Agent > FIM > dashboard``, filters disappear and now it's working properly.
- Fixed visual bug in Management > Cluster monitoring and a button position 1e3b748.
- The app installation date was not being updated properly, now it's fixed 


**Other additions and improvements**

- Export all the information of a Wazuh group and its related agents in a PDF document.
- Export the configuration of a certain agent as a PDF document. Supports granularity for exporting just certain sections of the configuration.
