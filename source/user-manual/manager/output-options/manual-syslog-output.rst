.. _manual_syslog_output:

Configuring syslog output
=========================

Wazuh may be configured to send alerts to syslog as follows:

Configuration
-------------

Syslog output is configured in ``ossec.conf``. All the available options are detailed in :ref:`Syslog output <reference_ossec_syslog_output>`

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

The above configuration will send alerts to ``192.168.1.240``and, if the alert level is higher than 9, will also send the alert to ``192.168.1.241``.

After the configuration of the ``ossec.conf`` file, the client-syslog must be enabled followed by a restart of Wazuh using the following command:
::

  /var/ossec/bin/ossec-control enable client-syslog
  /var/ossec/bin/ossec-control restart
