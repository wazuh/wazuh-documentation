.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 3.12.0 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_3_12_0:

3.12.0 Release notes - 24 March 2020
====================================

This section lists the changes in version 3.12.0. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.12.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/3.12-7.6/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/3.12/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/3.12/CHANGELOG.md>`_


Wazuh core
----------

**File integrity monitoring**

- Added synchronization capabilities for FIM.
- Added SQL database for the FIM module. Its storage can be switched between disk and memory.
- Added FIM module unit testing for Unix source code.
- Added FIM module unit testing for Windows source code.
- Moved the FIM logic engine to the agent.

**Logcollector**

- Avoided reopening the current socket when Logcollector fails to send an event.
- Prevent Logcollector from starving when has to reload files.
- Made Logcollector continuously attempt to reconnect with the agent daemon.

**AWS**

- Added support for monitoring Cisco Umbrella S3 buckets.
- Added support for monitoring AWS S3 buckets in GovCloud regions. 

**Other fixes and improvements**

- Added multi-target support for unit testing
- Added a status validation when starting Wazuh.
- Added automatic reconnection with the Eventchannel service when it is restarted.
- Made Windows agents send the keep-alive independently.
- Source IP address checking by default in the registration process is no longer enforced.
- Fixed a small memory leak in clustered.
- Fixed a crash in the fluent forwarder when SSL is not enabled.
- Replaced non-reentrant functions to avoid race condition hazards.
- Fixed the registration of more than one agent as any when forcing to use the source IP address.
- Fixed Windows upgrades in custom directories.
- Fixed the format of the alert payload passed to the Slack integration.

Wazuh Kibana App
----------------

- Support for Wazuh v3.12.0
- Added a new setting to hide manager alerts from dashboards.
- Added a new setting to be able to change API from the top menu.
- Added a new setting to enable/disable the known fields health check.
- Added suport for PCI 11.2.1 and 11.2.3 rules.
- Restructuration of the `optimize/wazuh` directory.
- Improved performance of Dasboards reports generation.
- Discover time range selector is now displayed on the Cluster section.
- Added the win_auth_failure rule group to Authentication failure metrics.
- Negative values in Syscheck attributes now have their correct value in reports.

Wazuh API
---------

- Enabled HTTPS by default in installation script.
- Added distinct parameter to syscheck endpoints.
- Added `condition` field to SCA endpoints.
- Fixed a bug that made requests not being distributed to the selected node_id.

Wazuh ruleset
-------------

- Extended the rules to detect shellshock attacks.
- Updated Roundcube decoder to support versions greater than 1.4.
- Added rules and decoders for Junos.
- Fixed GPG requirement in Windows rules.
- Improved Cisco decoders and fixed Owlh rule's IDs conflict.
- Fixed checkpoint decoders to read events with a different format.
