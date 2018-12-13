.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_7_2:

3.7.2 Release Notes
===================

This section shows the most relevant improvements and fixes in version 3.7.2. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.7.2/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.7.2/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.7.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.7.2-6.5.3/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.7.2-7.2.1/CHANGELOG.md>`_

Improvements for Logcollector module
------------------------------------

The :ref:`Logcollector module <manual_log_analysis>`, in charge of analyzing system records and log files, received several improvements in Wazuh 3.7.2. We addressed some issues related to the management of special characters such as the new line delimiter (``\n``), or binary data. From now on, Logcollector will discard log lines containing binary characters.

In addition to this, we fixed some errors when Logcollector tries to open or analyze files that disappeared, or when querying if a file reached its end.
