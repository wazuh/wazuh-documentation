.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to configure syslog output in the Wazuh server administration section of our documentation. 
  
.. _manual_syslog_output:

Configuring Syslog output
=========================

Wazuh may be configured to send alerts to syslog as follows:

Configuration
-------------

Syslog output is configured in the ``ossec.conf`` file. All of the available options are detailed in :ref:`syslog output <reference_ossec_syslog_output>`.

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

To apply the changes, restart Wazuh:

  .. include:: /_templates/common/restart_manager.rst

