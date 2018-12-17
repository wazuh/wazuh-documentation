.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_7_2:

3.7.2 Release Notes
===================

This section shows the most relevant fixes in version 3.7.2. More details about these changes are provided in the component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.7.2/CHANGELOG.md>`_

Improvements for Logcollector and Analysis modules
--------------------------------------------------

The :ref:`Logcollector module <manual_log_analysis>` received several improvements in Wazuh 3.7.2. We addressed some issues related to the management of special characters such as the new line delimiter (``\n``), or binary data. From now on, Logcollector will discard log lines containing binary characters.

We also ironed some errors when Logcollector tries to open or analyze files that disappeared, or when querying if a file reached its end.

In addition to this, We've fixed an issue where the agents with version 3.7.1 on Windows systems could cause some errors on the Analysis engine when reporting files if the username contained whitespace characters.
