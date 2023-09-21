.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.7.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.7.0 Release notes - TBD
=========================

This section lists the changes in version 4.7.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This version includes new features or improvements, such as the following:

Manager
^^^^^^^
- `#18026 <https://github.com/wazuh/wazuh/pull/18026>`__ Introduced native Maltiverse integration.
- `#16513 <https://github.com/wazuh/wazuh/pull/16513>`__ Added a file detailing the dependencies for the Wazuh RESTful API and wodles tests.
- `#15985 <https://github.com/wazuh/wazuh/pull/15985>`__ Added unit tests for the Syscollector legacy decoder.
- `#15999 <https://github.com/wazuh/wazuh/pull/15999>`__ Added unit tests for the ``manage_agents`` tool.
- `#16090 <https://github.com/wazuh/wazuh/pull/16090>`__ Added an option to customize the Slack integration.
- `#16008 <https://github.com/wazuh/wazuh/pull/16008>`__ An unnecessary sanity check related to Syscollector has been removed from ``wazuh-db``.
- `#17225 <https://github.com/wazuh/wazuh/pull/17225>`__ Deleted unused framework RBAC migration folder.

Agent
^^^^^

- `#17951 <https://github.com/wazuh/wazuh/pull/17951>`__ Added support for Custom Logs in Buckets via AWS SQS.
- `#16198 <https://github.com/wazuh/wazuh/pull/16198>`__ Added geolocation for ``aws.data.client_ip`` field. Thanks to `@rh0dy <https://github.com/rh0dy>`__.
- `#15699 <https://github.com/wazuh/wazuh/pull/15699>`__ Added package inventory support for Alpine Linux in Syscollector.
- `#15877 <https://github.com/wazuh/wazuh/pull/15877>`__ Added package inventory support for MacPorts in Syscollector.
- `#17982 <https://github.com/wazuh/wazuh/pull/17982>`__ Added package inventory support for PYPI and node in Syscollector.
- `#15000 <https://github.com/wazuh/wazuh/pull/15000>`__ Added related process information to the open ports inventory in Syscollector.
- `#16089 <https://github.com/wazuh/wazuh/pull/16089>`__ Fixed vendor data in package inventory for Brew packages on macOS.
- `#17966 <https://github.com/wazuh/wazuh/pull/17966>`__ The shared modules code has been sanitized according to the convention.
- `#18006 <https://github.com/wazuh/wazuh/pull/18006>`__ The package inventory internal messages have been modified to honor the schema compliance.
- `#16346 <https://github.com/wazuh/wazuh/pull/16346>`__ The agent's leaky bucket throughput limit has been extended to 100.000 EPS.



Resolved issues
---------------

This release resolves known issues as the following: 

Manager
^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#16683 <https://github.com/wazuh/wazuh/pull/16683>`__            Fixed an unexpected cluster error when a worker gets restarted.
`#16681 <https://github.com/wazuh/wazuh/pull/16681>`__            Fixed an issue that let the manager validate wrong XML configurations.
==============================================================    =============

Agent
^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#17006 <https://github.com/wazuh/wazuh/pull/17006>`__            Fixed detection of ``osquery 5.4.0+`` running outside the integration.
==============================================================    =============


RESTful API
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#16489 <https://github.com/wazuh/wazuh/pull/16489>`__            Addressed error handling for ``non-utf-8`` encoded file readings.
`#16914 <https://github.com/wazuh/wazuh/pull/16914>`__            Resolved an issue in the ``WazuhException`` class that disrupted the API executor subprocess.
`#16918 <https://github.com/wazuh/wazuh/issues/16918>`__          Corrected an empty value problem in the API specification key.
==============================================================    =============


Other
^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#17040 <https://github.com/wazuh/wazuh/pull/17040>`__            Fixed the signature of the internal function ``OSHash_GetIndex()``.
==============================================================    =============


Changelogs
----------

More details about these changes are provided in the changelog of each component:

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.7.0-2.9.0/CHANGELOG.md>`_
-  `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.7.0/CHANGELOG.md>`_
-  `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.7.0>`_