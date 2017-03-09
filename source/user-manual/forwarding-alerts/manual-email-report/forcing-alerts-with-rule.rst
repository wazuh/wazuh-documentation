.. _manual_email_report_forcing:

Forcing alert
==============

.. warning::

  You need to configure your :ref:`global settings<manual_email_report_ga>` first

It's also possible to force the mail alert on the rule declaration. In order to do this, you need to use :ref:`option<rules_options>`

The possible values to this option are:

- alert_by_email: Always alert by email.
- no_email_alert: Never alert by email.
- no_log: Do not log this alert.

So for example this rule:

::

   <rule id="502" level="3">
     <if_sid>500</if_sid>
     <options>alert_by_email</options>
     <match>Ossec started</match>
     <description>Ossec server started.</description>
   </rule>

This will send an email everytime this rule is triggered. I doesn't matter the level minimum level configured on the ``<alerts>`` section in ``ossec.conf``

Mail example:

::


    From: Wazuh <test@gmail.com>               5:45 PM (2 minutes ago)
    to: me
    -----------------------------
    Wazuh Notification.
    2017 Mar 08 17:44:58

    Received From: localhost->ossec-monitord
    Rule: 502 fired (level 3) -> "Ossec server started."
    Portion of the log(s):

    ossec: Ossec started.



     --END OF NOTIFICATION
