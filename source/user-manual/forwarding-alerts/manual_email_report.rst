.. _manual_email_report:

Email report
============

Wazuh may be configured to send alerts through emails as follows:

Configuration
-------------

Configuration of email alerts is done in the ``ossec.conf`` file using the ``report`` option. More information: :ref:`Report <reference_ossec_reports>`
::

  <ossec_config>
    <reports>
        <category>syscheck</category>
        <title>Daily report: File changes</title>
        <email_to>example@test.com</email_to>
    </reports>
  </ossec_config>

The above configuration will send a daily report of all :ref:`syscheck <manual_file_integrity>` alerts.

Rules may also be filtered by level, source, username, rule id, etc.

For example:
::

  <ossec_config>
    <reports>
        <level>10</level>
        <title>Daily report: Alerts with level higher than 10</title>
        <email_to>example@test.com</email_to>
    </reports>
  </ossec_config>

The above configuration will send a report with all rules that fired with a level higher than 10.
