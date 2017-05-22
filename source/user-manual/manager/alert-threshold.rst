.. _alert-threshold:

Defining an alert level threshold
==================================

Every posible event on the Wazuh Agent is set with certain level, by defatult is 1, all events from this level will trigger and alert into Wazuh Manager.

Configuration
-------------

All configuracion of Remote Service is done via ``ossec.conf`` using ``<alerts>`` XML tag, all the available options are detailed in :ref:`Alerts reference <reference_ossec_alerts>`

::

  <ossec_config>
    <alerts>
        <log_alert_level>6</log_alert_level>
    </alerts>
  </ossec_config>

This will set to level 6 the minimum severity level for alerts to be stored to alerts.log and/or alerts.json.

When you change any value on ``ossec.conf`` file, you need to restart the service to enabling previously changed values.

a. For Systemd:

::

  systemctl restart wazuh-manager

b. For SysV Init:

::

  service wazuh-manager restart
