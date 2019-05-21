.. Copyright (C) 2019 Wazuh, Inc.

.. _release_3_9_1:

3.9.1 Release notes
===================

This section shows the most relevant improvements and fixes in version 3.9.1. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.9.1/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.9.1/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.9.1/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.9.1-7.1.0/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.9.1-7.2.6/CHANGELOG.md>`_

Wazuh core
----------

This version includes mostly fixes, but there are a couple of modules that include significant changes.

- The Logcollector module has improved the wildcards support for Windows platforms. Now, it is possible to set more than one wildcard per path as is shown below:

  .. code-block:: xml

        <localfile>
            <location>C:\Users\user\Desktop\*test*</location>
            <log_format>syslog</log_format>
            <exclude>C:\Users\user\Desktop\*test*.json</log_format>
        </localfile>

Every file including `test` is monitored on that case, except the ones ending in `.json`.

- Support for the checking of directory existence in SCA rules. Now, rules with the format ``'d:/dir_1.../dir_n;'`` are used to check whether directories are found.

**Other important fixes**

- Removed 5-second reading timeout for File Integrity Monitoring scan.
- Fixed the agent_info files synchronization between cluster nodes.
- Changed the extraction point of the package name in the Vulnerability Detector OVALs.
- Fixed command output treatment for the SCA module.

Wazuh API
---------

*ToDo*

Wazuh app
---------

*ToDo*

Wazuh ruleset
-------------

SCA policies have been reviewed while reported bugs have been fixed for this version. Most of these changes affect to MAC OS X policies based on CIS benchmarks.

On the other side, Windows rules for EventLog and Security Essentials have been fixed as well as the field filters are now more restrictive to avoid false positives. Here an example:

  .. code-block:: xml

        <rule id="60675" level="0">
            <if_sid>60600</if_sid>
            <field name="win.system.providerName">^VSS$</field>
            <description>Group of VSS events</description>
            <options>no_full_log</options>
        </rule>

For the rule above, the ``$`` at the end of the provider name checking avoids the provider *BvSshServer* to fire that rule.