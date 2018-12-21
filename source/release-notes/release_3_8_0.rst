.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_8_0:

3.8.0 Release Notes
===================


This section shows the most relevant improvements and fixes in version 3.8.0. More details about these changes are provided in each component changelog.

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v3.8.0/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/v3.8.0/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/v3.8.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v3.8.0-6.4.3/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-splunk <https://github.com/wazuh/wazuh-splunk/blob/v3.8.0-7.2.0/CHANGELOG.md>`_

Logcollector extension for Windows eventchannel
-----------------------------------------------

One of the most important changes in this release consists on the enhancement for the data collector engine that retrieves events from Windows eventchannel.

Using a new way to gather logs, Logcollector can get every event generated at the Windows agents that support eventchannel.
This new eventchannel keeps the older one's functionality and configuration, adding interesting changes like the usage of the JSON decoder. This modifies the entire Windows ruleset, as it makes rule addition completer and easier.

As the old eventchannel didn't gather all the fields contained in Windows events, we have tried to accomplish this with the new enhancement. 
The following images display a new eventchannel alert at Kibana and the same event at Windows Event Viewer, showing up that every field from it is taken into account.

.. thumbnail:: ../images/manual/log_analysis/windows_alert_kibana1.png
    :title: Windows alert fields at Kibana
    :align: center
    :width: 100%

.. thumbnail:: ../images/manual/log_analysis/windows_alert_kibana2.png
    :title: Windows alert fields at Kibana
    :align: center
    :width: 100%

.. thumbnail:: ../images/manual/log_analysis/windows_eventviewer.png
    :title: Windows event viewer
    :align: center
    :width: 100%

The following image compares the event number with the provider name along the time. It shows different event alerts like installing an application from MSI packages, logging on or adding new users.
This chart is now added by default to our app at Kibana.

.. thumbnail:: ../images/manual/log_analysis/windows_alerts_rn.png
    :title: Windows alert visualization at Kibana
    :align: center
    :width: 100%