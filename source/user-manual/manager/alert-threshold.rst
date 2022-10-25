.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh manager is the system that analyzes the data received from all registered agents. Find out more about how to define an alert level threshold.
  
.. _alert-threshold:

Defining an alert level threshold
==================================

Each event collected by the Wazuh agent is transmitted to the Wazuh Manager. The Manager will assign the event a severity level depending on which rules it matches from the ruleset. By default, it will only log alerts with a severity level of 3 or higher.  

Configuration
-------------

The alert level threshold is configured in the ``ossec.conf`` file using the ``<alerts>`` XML tag. The available options for this are detailed in :ref:`Alerts reference <reference_ossec_alerts>`

.. code-block:: xml

  <ossec_config>
    <alerts>
        <log_alert_level>6</log_alert_level>
    </alerts>
  </ossec_config>

This will set the minimum severity level that will trigger alerts that will be stored in the ``alerts.log`` and/or the ``alerts.json`` file(s).

When any value is changed in the ``ossec.conf`` file, the service must be restarted before the changes will take effect.

.. include:: /_templates/common/restart_manager.rst

