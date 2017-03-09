.. _manual_email_report_granular_alerts:

Granular Alerts
===============

.. warning::

  You need to configure your :ref:`global settings<manual_email_report_ga>` first

Wazuh also allows very granular configuration options for your alerts through email. Here you will find some examples about the granular configuration.
The minimum level you configured inside ``alerts`` section, will be also valid here. So, for example, if you configure your system to send email once the rule 526 is triggered, if that rule has a level lower than the configured on the previous section the alert will not be sent.

Email alert based on level and agent
------------------------------------
The general configuration will be:
::

  <email_alerts>
    <email_to>you@example.com</email_to>
    <level>4</level>
    <do_not_delay />
  </email_alerts>

This will send to ``you@example`` and email if the any rule with level greater or equal to 10 is triggered.


Email alert based on level and agent
------------------------------------
The general configuration will be:
::

  <email_alerts>
    <email_to>you@example.com</email_to>
    <event_location>server1</event_location>
    <do_not_delay />
  </email_alerts>

This will send to ``you@example`` and email if the for the rules triggered on the ``server1``.
Also, ``event_location`` can be configured to monitor a specific log, hostname or network (IP)

Email based on rules ID
-----------------------
::

  <email_alerts>
    <email_to>you@example.com</email_to>
    <rule_id>515, 516</rule_id>
    <do_not_delay />
  </email_alerts>

This will send an email if the rules 515 or 516 are triggered on any agent.

Email based on the group
------------------------

Each rule can have one or more groups configured. We can use this groups to filter the rules that we want to send through email:
::

  <email_alerts>
    <email_to>you@example.com</email_to>
    <group>pci_dss_10.6.1</group>
  </email_alerts>

This will send an alert if any rule part of the ``pci_dss_10.6.1`` group is triggered on any machine.

Multiples options and multiples email
-------------------------------------

This example will show you the real capacity of this capability:

::

  <ossec_config>
    <email_alerts>
        <email_to>alice@test.com</email_to>
        <event_location>server1|server2</event_location>
    </email_alerts>
    <email_alerts>
        <email_to>is@test.com</email_to>
        <event_location>/log/secure$</event_location>
    </email_alerts>
    <email_alerts>
        <email_to>bob@test.com</email_to>
        <event_location>192.168.</event_location>
    </email_alerts>
    <email_alerts>
        <email_to>david@test.com</email_to>
        <level>12</level>
    </email_alerts>
   </ossec_config>

This configuration will send:

- An email will be send to alice@test.com if any alert on server1 or server2 is triggered
- An email will be send to is@test.com if the alerts came from ``/log/secure/``
- An email will be sent to bob@test.com if the alerts came from any machine on the ``192.168.0.0/24`` network
- An email will be sent to david@test.com if the alerts have a level equals or higher than 12.

Daily report
------------

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
