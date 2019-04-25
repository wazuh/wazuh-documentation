.. Copyright (C) 2019 Wazuh, Inc.

.. _release_3_7_2:

3.7.2 Release Notes
===================

This section shows the most relevant fixes in version 3.7.2. More details about these changes are provided in the component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.7.2/CHANGELOG.md>`_

Logcollector and Analysis daemon fixes
--------------------------------------

The :ref:`Logcollector module <manual_log_analysis>` received two improvements in Wazuh 3.7.2:

- Fixed bugs related to the management of special characters such as the new line delimiter (``\n``), or binary data. From now on, Logcollector will discard log lines containing binary characters.
- Fixed errors when Logcollector tries to open or analyze files that disappeared, or when querying if a file reached its end.

In addition to this, the Analysis daemon has been fixed to avoid errors when Windows agents in version 3.7.0 report files whose owner username contains whitespace characters.
