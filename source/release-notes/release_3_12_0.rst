.. Copyright (C) 2020 Wazuh, Inc.

.. _release_3_12_0:

3.12.0 Release notes
====================

This section lists the changes in version 3.11.4. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.12.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/3.12-7.6/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/3.12/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/3.12/CHANGELOG.md>`_


Wazuh core
----------

**File integrity monitoring**

- Add synchronization capabilities for FIM.
- Add SQL database for the FIM module. Its storage can be switched between disk and memory.
- Add FIM module unit testing for Unix source code.
- Add FIM module unit testing for Windows source code.
- Move the FIM logic engine to the agent.

**Logcollector**

- Avoid reopening the current socket when Logcollector fails to send a event.
- Prevent Logcollector from starving when has to reload files.
- Make Logcollector continuously attempt to reconnect with the agent daemon.

**AWS**

- Add support for monitoring Cisco Umbrella S3 buckets.
- Add support for monitoring AWS S3 buckets in GovCloud regions. 

**Other fixes and improvements**

- Add multi-target support for unit testing
- Add a status validation when starting Wazuh.
- Add automatic reconnection with the Eventchannel service when it is restarted.
- Make Windows agents send the keep-alive independently.
- Do not enforce source IP checking by default in the registration process.
- Fix a small memory leak in clusterd.
- Fix a crash in the fluent forwarder when SSL is not enabled.
- Replace non-reentrant functions to avoid race condition hazards.
- Fix the registration of more than one agent as any when forcing to use the source IP.
- Fix Windows upgrades in custom directories.
- Fix the format of the alert payload passed to the Slack integration.

Wazuh Kibana App
----------------

- Support for Wazuh v3.12.0
- Add a new setting to hide manager alerts from dashboards.
- Add a new setting to be able to change API from the top menu.
- Add a new setting to enable/disable the known fields health check.
- Add suport for PCI 11.2.1 and 11.2.3 rules.
- Restructure of the optimize/wazuh directory.
- Improve performance of Dasboards reports generation.
- Discover time range selector is now displayed on the Cluster section.
- Add the win_auth_failure rule group to Authentication failure metrics.
- Negative values in Syscheck attributes now have their correct value in reports.

Wazuh API
---------

- Enabled HTTPS by default in installation script.
- Add distinct parameter to syscheck endpoints.
- Add `condition` field to SCA endpoints.
- Fix a bug that made requests not being distributed to the selected node_id.

Wazuh ruleset
-------------

- Extend the rules to detect shellshock attacks (by @iasdeoupxe).
- Update Roundcube decoder to support versions greater than 1.4 (by @iasdeoupxe).
- Add rules and decoders for Junos.
- Fix GPG requirement in Windows rules.
- Improve Cisco decoders and fix Owlh rule's IDs conflict.
- Fixed checkpoint decoders to read events with a different format.
