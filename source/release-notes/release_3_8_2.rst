.. Copyright (C) 2019 Wazuh, Inc.

.. _release_3_8_2:

3.8.2 Release notes
===================

This section shows the most relevant fixes in version 3.8.2. A complete list of changes is provided in the `change log <https://github.com/wazuh/wazuh/blob/v3.8.2/CHANGELOG.md>`_.

Wazuh manager
-------------

- Fixed a bug crashing Analysisd when accumulating logs. This bug affected decoders that use the option ``<accumulate>``, like the decoder for OpenLDAP logs, provided out of the box.
- Some fields of alerts related to Windows Eventchannel logs included unwanted backslashes (``\``) and trailing whitespaces. This was due to a log cleaning issue in the manager.

Wazuh agent
-----------

- Prevent Modulesd from crashing when the configuration contained a ``<wodle name="command">`` stanza without an explicit ``<tag>`` option.
