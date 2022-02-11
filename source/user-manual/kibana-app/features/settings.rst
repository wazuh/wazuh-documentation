.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: The Wazuh Kibana plugin gives you a quick view of your agents, alerts, and cluster. Learn how to configure its features in this section. 
  
.. _kibana_settings:

Settings
========

The *Settings* page allows you to configure and customize your Wazuh app experience. This section is automatically opened the first time you open the app in order to configure your first Wazuh API credentials, so the app can work properly. 

API
---

In this section, you can list all your inserted API credentials. The star icon indicates the currently used API to show information on the app. Each entry has multiple available actions to manage it. Keep in mind that a working API is needed in order to add or edit an entry. Check your API connection status prior to adding them to the app.

.. thumbnail:: ../../../images/kibana-app/features/settings/api.png
  :align: center
  :width: 100%

Extensions
----------

Wazuh provides multiple integrations and capabilities to monitor and analyze your hosts. If you're using some of them, you can enable multiple extensions on the app to visualize tailored dashboards, which provide rich and useful information. Some of these extensions are disabled by default because you have to previously enable them on your manager configuration in order to generate alerts.

.. thumbnail:: ../../../images/kibana-app/features/settings/extensions.png
  :align: center
  :width: 100%

Index pattern
-------------

The index pattern functionality is completely described at the :ref:`kibana_index_pattern` section.

.. thumbnail:: ../../../images/kibana-app/features/settings/pattern.png
  :align: center
  :width: 100%

Configuration
-------------

You can take a quick look to the full Wazuh app configuration file here. The documentation for the ``wazuh.yml`` file can be found on the :ref:`kibana_config_file` section.

.. thumbnail:: ../../../images/kibana-app/features/settings/configuration.png
  :align: center
  :width: 100%

Logs
----

The Wazuh app stores log information on the ``/usr/share/kibana/optimize/wazuh-logs/wazuhapp-plain.log`` file. These logs can be helpful for troubleshooting purposes. The *Logs* section allows you to check the last 20 log messages along with its date and severity level.

.. thumbnail:: ../../../images/kibana-app/features/settings/logs.png
  :align: center
  :width: 100%

About
-----

This section provides information about your currently installed Wazuh app package, such as version, revision, and installation date. If you want to discover what's new on each app release, you can go to our `Changelog file <https://github.com/wazuh/wazuh-kibana-app/blob/master/CHANGELOG.md>`_ to check it out.

.. thumbnail:: ../../../images/kibana-app/features/settings/about.png
  :align: center
  :width: 100%
