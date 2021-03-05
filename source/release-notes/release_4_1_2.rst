.. Copyright (C) 2021 Wazuh, Inc.

.. _release_4_1_2:

4.1.2 Release notes
===================

This section lists the changes in version 4.1.2. More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/4.1/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/4.1-7.10/CHANGELOG.md>`_


Wazuh core
----------

Changed
^^^^^^^

- The default value of the agent disconnection time option has been increased to 10 minutes.
- The warning log from Remoted about sending messages to disconnected agents has been changed to level-1 debug log.

**API**

- API logs showing request parameters and body will be generated with API log level info instead of debug.

**External dependencies:**

- Upgraded aiohttp version from 3.6.2 to 3.7.4.

Fixed
^^^^^
- Fix a bug in the unit tests that randomly caused false failures.
- Fixed a bug in the Analysisd configuration that did not apply the setting json_null_fields.
- Fixed the checking of the option ipv6 in Remoted.
- Fixed the checking of the option rids_closing_time in Remoted.


Wazuh Kibana plugin
-------------------

Added
^^^^^

- Refactor of some prompts.
- Add run_as setting to example host configuration in Add new API view.

Fixed
^^^^^

- Fix SCA policy detail showing name and check results about another policy.
- Fix that alerts table is empty when switching pinned agents.
- Creating a role mapping before the existing ones are loaded, the page bursts.
- Fix pagination in SCA checks table when expand some row.
- Fix manager is shown in suggestions in Agents section.
- Fix disabled loading on inventory when request fail.
- Fix restarting selected cluster instead of all of them.
- Fix pinned agents don't trigger a new filtered query.
- Overlay Wazuh menu when Kibana menu is opened or docked.
