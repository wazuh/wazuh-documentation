.. Copyright (C) 2020 Wazuh, Inc.

.. _alert-threshold:

Defining an alert level threshold
==================================

Each event collected by the Wazuh agent is transmitted to the Wazuh Manager. The Manager will assign the event a severity level depending of which rules it matches from the ruleset. By default it will only log alerts with a severity level of 3 or higher.

Configuration
-------------

The alert level threshold is configured in the ``ossec.conf`` file using the ``<alerts>`` XML tag. The available options for this are detailed in :ref:`Alerts reference <reference_ossec_alerts>`

.. code-block:: xml

  <wazuh_config>
    <alerts>
        <log_alert_level>6</log_alert_level>
    </alerts>
  </wazuh_config>

This will set the minimum severity level that will trigger alerts that will be stored in the ``alerts.log`` and/or the ``alerts.json`` file(s).

When any value is changed in the ``ossec.conf`` file, the service must be restarted before the changes will take effect.

a. For Systemd:

.. code-block:: console

  # systemctl restart wazuh-manager

b. For SysV Init:

.. code-block:: console

  # service wazuh-manager restart
