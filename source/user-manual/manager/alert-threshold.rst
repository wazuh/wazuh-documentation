.. Copyright (C) 2019 Wazuh, Inc.

.. _alert-threshold:

Defining an alert level threshold
==================================

Each event on the Wazuh Agent is set to a certain severity level with 1 as the default. All events from this level up will trigger an alert in the Wazuh Manager.

Configuration
-------------

The alert level threshold is configured in the ``ossec.conf`` file using the ``<alerts>`` XML tag. The available options for this are detailed in :ref:`Alerts reference <reference_ossec_alerts>`

::

  <ossec_config>
    <alerts>
        <log_alert_level>6</log_alert_level>
    </alerts>
  </ossec_config>

This will set the minimum severity level that will trigger alerts that will be stored in the ``alerts.log`` and/or the ``alerts.json`` file(s).

When any value is changed in the ``ossec.conf`` file, the service must be restarted before the changes will take effect.

a. For Systemd:

.. code-block:: console

  # systemctl restart wazuh-manager

b. For SysV Init:

.. code-block:: console

  # service wazuh-manager restart
