.. Copyright (C) 2019 Wazuh, Inc.

.. _release_3_8_1:

3.8.1 Release notes
===================

This section shows the most relevant improvements and fixes in version 3.8.1. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.8.1/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.8.1/CHANGELOG.md>`_

Wazuh core
----------

- Fixed memory leak in Logcollector when reading Windows eventchannel.
- Fixed version comparisons on Red Hat systems in vulnerability detector module.

Wazuh API
---------

- Fixed an issue with the log rotation module which may makes the Wazuh API unavailable on Debian systems.
- Fixed improper error handling. Prevented internal paths to be printed in error output.
