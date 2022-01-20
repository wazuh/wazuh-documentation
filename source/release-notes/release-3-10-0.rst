.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Wazuh 3.10.0 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_3_10_0:

3.10.0 Release notes
====================

This section shows the most relevant improvements and fixes in version 3.10.0. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.10.0/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.10.0/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.10.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.10.0-7.3.2/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.10.0-7.3.0/CHANGELOG.md>`_

Wazuh core
----------

**Security Configuration Assessment**

- Improved internal logic engine and policy syntax changes. Available SCA policies have been also adapted to this refactor.
- A numerical comparator has been included as part of the rules syntax.
- Compliance mapping information is now part of the alert groups.
- Policies present at the default folder are now automatically loaded.
- The Manager will request the last assessment results when the DB is empty between scans.

For further information, check our :ref:`SCA documentation <manual_sec_config_assessment>`.

**HIPAA/NIST support**

- ``HIPAA`` and ``NIST 800 53`` groups were added to the compliance groups parser.
- New corresponding fields in the Wazuh Elastic Stack template.

Thanks to this additions, the app includes new ``HIPAA`` and ``NIST 800 53`` compliance dashboards.

.. thumbnail:: ../images/release-notes/3.10.0/HIPAA.png
  :title: Wazuh App HIPAA Dashboard
  :align: center
  :width: 100%

.. thumbnail:: ../images/release-notes/3.10.0/NIST.png
  :title: Wazuh App NIST Dashboard
  :align: center
  :width: 100%

**File integrity monitoring**

- FIM now identifies equivalent paths adding them only once.
- It has been fixed an error in Windows who-data when handling the directories list.
- Who-data Linux alerts with hexadecimal fields are now correctly handled.

**AWS module**

- Fixed the exception handling when using an invalid bucket.
- Fixed an error when getting profiles in custom AWS buckets.
- Fixed the error message when an AWS bucket is empty.

**IPv6 Compatibility**

- Increased the IP address internal representation size to support IPv6.
- IPv6 loopback address has been added to localhosts list in the DB output module.

**Other fixes and improvements**

- The log collection module now extends the duplicate file detection with inode comparison, useful for symbolic and hard links.
- Agentless queries now accept ``]`` and ``>`` characters as terminal prompt characters.
- The mail module now supports alerts with the ``full_log`` field when using ``alerts.json`` as alerts source.
- On overwriting rules, list field is now correctly copied from the original to the overwriting rule.
- Fixed an error in the hardware inventory collector for PowerPC architectures.


Wazuh API
---------

- A new API request has been created to get the full summary of agents:

  .. code-block:: js

      GET /summary/agents

  .. code-block:: js
      :class: output

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


- Support for ``HIPAA``, ``NIST 800 53`` and ``GPG13`` compliance: adding new API requests and filters.
- Improvements in stored passwords security: encryption changed from MD5 to BCrypt.
- Fixed API installation in Docker CentOS 7 containers.


Wazuh Ruleset
-------------

981 rules have been mapped to support ``HIPAA`` and ``NIST 800 53`` compliance. In addition, the SCA policies have been fully reviewed, adapted to the module refactor and added support for new platforms.

It has been added rules and decoders for other technologies:

- Rules for the VIPRE antivirus.
- Support for Cisco-ASA devices with new rules and decoders.
- Added Windows Software Restriction Policy rules.
- Added Perdition(imap/pop3 proxy) rules.
- Added support for NAXSI web application firewall.


Wazuh Kibana App
----------------

- ``HIPAA`` and ``NIST 800 53`` new dashboards for the recently added regulatory compliance mapping.
- Added support for custom Kibana spaces.
- Wazuh Kibana app now works as a native plugin and can be safely hidden/displayed depending on the selected space.
- New alerts summary in `Overview > FIM` panel.
- Alerts search bar fixed for Kibana v7.3.0, now queries are applied as expected.
- Hide attributes field from non-Windows agents in the FIM table.
- Fixed broken view in `Management > Configuration > Amazon S3 > Buckets`.
- Restored Remove column feature in Discover tabs.
- The app installation date is now correctly updated.


Wazuh Splunk App
----------------

- ``HIPAA`` and ``NIST 800 53`` new dashboards for the recently added regulatory compliance mapping.
- New design and several UI/UX changes.
- Wazuh Splunk app has been adapted for Microsoft Edge Browser.
- Debug level added for app logs.
- Modules are being shown only when supported by the agent OS.
- API sensitive information is now hidden on every transition.
- Non-active Agent data is now being shown correctly.

**Other additions and improvements for both Apps**

- Export all the information of a Wazuh group and its related agents in a PDF document.
- Export the configuration of a certain agent as a PDF document.
- Added an interactive and user-friendly guide for agents registering, ending in a copy & paste snippet.
