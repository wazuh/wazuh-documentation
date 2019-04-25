.. Copyright (C) 2019 Wazuh, Inc.

.. _manual_email_report:

Configuring email alerts
========================

Wazuh can be configured to send email alerts to one or more email addresses when certain rules are triggered or for daily event reports.

Sample email:

::


    From: Wazuh <you@example.com>               5:03 PM (2 minutes ago)
    to: me
    -----------------------------
    Wazuh Notification.
    2017 Mar 08 17:03:05

    Received From: localhost->/var/log/secure
    Rule: 5503 fired (level 5) -> "PAM: User login failed."
    Src IP: 192.168.1.37
    Portion of the log(s):

    Mar  8 17:03:04 localhost sshd[67231]: pam_unix(sshd:auth): authentication failure; logname= uid=0 euid=0 tty=ssh ruser= rhost=192.168.1.37
    uid: 0
    euid: 0
    tty: ssh

     --END OF NOTIFICATION

Generic email options
---------------------

In order to configure Wazuh to send email alerts, the email settings must be configured in the ``<global>`` section of the ``ossec.conf`` file:

::

  <ossec_config>
      <global>
          <email_notification>yes</email_notification>
          <email_to>me@test.com</email_to>
          <smtp_server>mail.test.com..</smtp_server>
          <email_from>wazuh@test.com</email_from>
      </global>
      ...
  </ossec_config>

To see all of the available email configuration options, go to the :ref:`global section <reference_ossec_global>`.

Once the above has been configured, the ``email_alert_level`` needs to be set to the minimum alert level that will trigger an email. By default, this level is set to 7.

::

  <ossec_config>
    <alerts>
        <email_alert_level>10</email_alert_level>
    </alerts>
    ...
  </ossec_config>

This example will set the minimum level to 10. For more information, see the :ref:`alerts section <reference_ossec_alerts>`.

After the ``alert_level`` has been configured, Wazuh needs to be restarted for the change to take effect.

a) For Systemd:

.. code-block:: console

  # systemctl status wazuh-manager

b) For SysV Init:

.. code-block:: console

  # service wazuh-manager status


.. warning::
 Wazuh doesn't handle SMTP authentication. If your email service uses this, you will need to :ref:`configure a server relay<smtp_authentication>`.


Granular email options
----------------------

Wazuh also allows granular configuration options for email alerts. Below are some sample granular configurations. For more information, see the :ref:`email_alerts section <reference_ossec_email_alerts>`.

.. warning::

  The minimum level configured in the ``alerts`` section will also apply to and override these configurations.  For example, if you configure your system to send an email when the `rule 526` is triggered, but the rule has a level lower than the minimum level specified, the alert will not be sent.

Email alert based on level
^^^^^^^^^^^^^^^^^^^^^^^^^^
This is configured as follows:

::

 <email_alerts>
   <email_to>you@example.com</email_to>
   <level>4</level>
   <do_not_delay />
 </email_alerts>

This will send an email to ``you@example.com`` when any rule with a level greater than or equal to 4 is triggered.

.. note:: Remember, if the level here is less than the ``email_alert_level`` configured in the previous section, this will not be sent.

Email alert based on level and agent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This is configured as follows:

::

 <email_alerts>
   <email_to>you@example.com</email_to>
   <event_location>server1</event_location>
   <do_not_delay />
 </email_alerts>

This will send an email to ``you@example.com`` when the rules trigger on the ``server1``.

The ``event_location`` field can be configured to monitor a specific log, hostname or network (IP).

Email based on rules ID
^^^^^^^^^^^^^^^^^^^^^^^
::

 <email_alerts>
   <email_to>you@example.com</email_to>
   <rule_id>515, 516</rule_id>
   <do_not_delay />
 </email_alerts>

This will send an email when the rules 515 or 516 are triggered on any agent.

Email based on the group
^^^^^^^^^^^^^^^^^^^^^^^^

Email alerts can be configured to send an email based on one or more rule groups:
::

 <email_alerts>
   <email_to>you@example.com</email_to>
   <group>pci_dss_10.6.1</group>
 </email_alerts>

This will send an alert when any rule that is part of the ``pci_dss_10.6.1`` group is triggered on any Wazuh monitored device.

Multiples options and multiples email
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This example shows capability of email alerts can be.  Email alerts can be to be sent to multiple email addresses, each with it's own unique criteria:

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

- An email to alice@test.com if any alert on server1 or server2 is triggered,
- An email to is@test.com if the alerts came from ``/log/secure/``,
- An email to bob@test.com if the alerts came from any machine on the ``192.168.0.0/24`` network, and
- An email to david@test.com if the alerts have a level equal to or higher than 12.

Force forwarding an alert by email
----------------------------------

It's also possible to force an email alert on rule declaration that is below the configured minimum level. In order to do so, you need to use one of the below :ref:`options<rules_options>`.

The possible values for this option are:

- **alert_by_email**: Always alert by email.
- **no_email_alert**: Never alert by email.
- **no_log**: Do not log this alert.

For example:

::

   <rule id="502" level="3">
     <if_sid>500</if_sid>
     <options>alert_by_email</options>
     <match>Ossec started</match>
     <description>Ossec server started.</description>
   </rule>

This configuration will send an email every time rule 502 is triggered regardless of what the minimum level is set to.


.. toctree::
   :hidden:
   :maxdepth: 1

   smtp_authentication
