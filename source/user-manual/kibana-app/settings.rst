.. Copyright (C) 2019 Wazuh, Inc.

.. _kibana_settings:

Settings
^^^^^^^^

This section allows to configure and receive the information about the Wazuh Kibana plugin:

.. _kibana_settings_api:

API
---

The Wazuh API configuration page lists all inserted Wazuh API entries. The star icon indicates the currently used Wazuh API to show information in the Wazuh Kibana plugin. A working API is needed to add or edit an entry. The connection status of each entry can be checked by clicking the ``Check connection`` button found in the ``Action`` column:

.. thumbnail:: ../../images/kibana-app/sections/settings/wazuh-kibana-settings-api.png
  :align: center
  :width: 100%

.. _kibana_settings_configuration:

Configuration
-------------

This page presents and allows to change the Wazuh Kibana plugin configuration settings. The :ref:`configuration file <kibana_config_file>` is located at ``/usr/share/kibana/optimize/wazuh/config/wazuh.yml``:

.. thumbnail:: ../../images/kibana-app/sections/settings/wazuh-kibana-settings-config.png
  :align: center
  :width: 100%

Logs
----

This section lists the Wazuh Kibana plugin log messages stored on the ``/usr/share/kibana/optimize/wazuh/logs/wazuhapp.log`` file:

.. thumbnail:: ../../images/kibana-app/sections/settings/wazuh-kibana-settings-logs.png
  :align: center
  :width: 100%

About
-----

Under this tab the user can find information about the currently installed Wazuh Kibana plugin package, such as version, revision and installation date. The changes to each Wazuh Kibana plugin release can be found in the `changelog file <https://github.com/wazuh/wazuh-kibana-app/blob/master/CHANGELOG.md>`_:

.. thumbnail:: ../../images/kibana-app/sections/settings/wazuh-kibana-settings-about.png
  :align: center
  :width: 100%
