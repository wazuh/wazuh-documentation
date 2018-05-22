.. Copyright (C) 2018 Wazuh, Inc.

.. _manager_logs_section:

Logs
====

This tab will show you the Wazuh manager logs from any daemon and any information level. This means it will show you 
information messages, warning messages, error messages.

.. thumbnail:: ../../../../images/kibana-app/manager/logs-1.png
    :title: logs-1
    :align: center
    :width: 100%

Filter by daemon
----------------

You'll be able to filter by specific Wazuh daemon using the daemons selector. By default messages from all daemons are shown, but you
could select *wazuh-modulesd* or *ossec-analysisd* for a more in deep researching.

.. thumbnail:: ../../../../images/kibana-app/manager/logs-2.png
    :title: logs-2
    :align: center
    :width: 30%


Filter by level
----------------

Since Wazuh generates tons of information messages, you could need to look only for error messages or warning messages. Use the level 
selector to filter by level.

.. thumbnail:: ../../../../images/kibana-app/manager/logs-3.png
    :title: logs-3
    :align: center
    :width: 30%

See your logs in real-time
--------------------------

The Wazuh App allows you to see the Wazuh manager logs in real-time. Click on the real-time button to enable it, click it again to disable it.

.. thumbnail:: ../../../../images/kibana-app/manager/logs-4.png
    :title: logs-4
    :align: center
    :width: 25%

This is useful while you are testing a custom modification, new features, check the restarting process, etc.

Search specific log using the search bar
----------------------------------------

Type any text on the search bar to filter logs matching your search criteria.

.. thumbnail:: ../../../../images/kibana-app/manager/logs-5.png
    :title: logs-5
    :align: center
    :width: 100%