.. Copyright (C) 2018 Wazuh, Inc.

.. _manual_syslog_output:

Configuring syslog output
=========================

Wazuh may be configured to send alerts to syslog as follows:

Configuration
-------------

Syslog output is configured in the ``ossec.conf`` file. All of the available options are detailed in :ref:`Syslog output <reference_ossec_syslog_output>`.

::

  <ossec_config>
    <syslog_output>
      <level>9</level>
      <server>192.168.1.241</server>
    </syslog_output>

    <syslog_output>
      <server>192.168.1.240</server>
    </syslog_output>
  </ossec_config>

The above configuration will send alerts to ``192.168.1.240`` and, if the alert level is higher than 9, also to ``192.168.1.241``.

After, restart Wazuh:

  a. For Systemd:

  .. code-block:: console

    # systemctl restart wazuh-manager

  b. For SysV Init:

  .. code-block:: console

    # service wazuh-manager restart
