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

**Security Configuration Assessment**

- The Security Configuration Assessment (SCA) module has been refactored: It has an improved internal logic motor and the policy syntax has changed. Available SCA policies have been also adapted to this refactor.
- A numerical comparator has been included as part of the rules syntax.
- Each check compliance are shown as groups on alerts to, i.e., creating new visualizations about compliance in the Wazuh App.
- All present policies at the default location are now loaded by default in order to avoid configuration issues.
- It has been fixed a data inconsistency when switching between manager nodes: the manager will request the last assessment results when the DB is empty between scans.

**File integrity monitoring**

- FIM can now identify resembled paths with the same semantics and add them only once.
- It has been fixed an error in Windows who-data when handling the directories list.
- Who-data alerts based on audit logs containing hex fields are now correctly handled.

**AWS wodle**

- Fixed the exception handling when using an invalid bucket in AWS wodle.
- Fix error when getting profiles in custom AWS buckets.
- Fixed error message in empty AWS bucket case.

**IPv6 Compatibility**

- Increased the IP internal representation size to support IPv6.
- IPv6 loopback address has been added to localhosts list in the DB output module.

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

- A new API request has been created to get the full summary of agents:

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


- Support for ``HIPAA``, ``NIST 800-53`` and ``gpg13`` compliances: adding new API requests and filters.
- Improvements in stored passwords security: encryption changed from MD5 to BCrypt.
- Fixed API installation in Docker CentOS 7 containers.


Wazuh Ruleset
-------------

Our rules and SCA policies have been mapped to support ``HIPAA`` and ``NIST_800_53`` compliance. In addition, the SCA policies have been fully reviewed, adapted to the module refactor and added support for new platforms.

It has been added rules and decoders for other technologies:

- Rules for the VIPRE antivirus.
- Support for Cisco-ASA devices with new rules and decoders.
- Added Windows Software Restriction Policy rules.
- Added Perdition(imap/pop3 proxy) rules.
- Added support for NAXSI web application firewall.


Wazuh Kibana App
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
- The app installation date was not being updated properly, now it's fixed.
- APIs passwords are now obfuscated in server responses.

**Other additions and improvements**

- Export all the information of a Wazuh group and its related agents in a PDF document.
- Export the configuration of a certain agent as a PDF document. Supports granularity for exporting just certain sections of the configuration.


Wazuh Splunk App
----------------

- New design and several UI/UX changes.
- Wazuh Splunk app has been adapted for Microsoft Edge Browser.
- Added an interactive guide for registering agents, things are now easier for the user, guiding it through the steps needed ending in a copy & paste snippet for deploying his agent.
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
