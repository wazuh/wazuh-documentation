.. _manual_email_report:

Email report
============

It is possible to configure Wazuh to send the alerts through emails also.

Configuration
-------------

To configure the email report, we need to go to the ``ossec.conf`` file. We use the ``report`` option. More information: :ref:`Report <reference_ossec_reports>`
::

  <ossec_config>
    <reports>
        <category>syscheck</category>
        <title>Daily report: File changes</title>
        <email_to>example@test.com</email_to>
    </reports>
  </ossec_config>

This configuration will send a daily report of all the :ref:`syscheck <manual_file_integrity>` alerts generated.

You can also filter the rules to report by level, source, username, rule id..

For example:
::

  <ossec_config>
    <reports>
        <level>10</level>
        <title>Daily report: Alerts with level bigger than 10</title>
        <email_to>example@test.com</email_to>
    </reports>
  </ossec_config>

This configuration will send a report with all the rules with level bigger than 10.
