.. _manual_email_report_ga:

General Alerts
==============

In order to configure Wazuh to send alerts through email, you need to configure the email settings inside the ``<global>`` section:


Configuration
-------------

Wazuh doesn't handle authentication. If you want to use an email with it, you need to configure a server relay.

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

To see all the available options to configure it, go to :ref:`global section <reference_ossec_global>`



SMTP server with authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In order to use emails with authentication like gmail, we need to configure a server relay because Wazuh does not handle authentication. Here you can see a guide to the configuration of ``postfix``:

- `Ubuntu`_
- `Centos`_

Ubuntu
~~~~~~

#. Install the needed packages:

  ::

    apt-get install postfix mailutils libsasl2-2 ca-certificates libsasl2-modules

#. Set Postfix config file ``/etc/postfix/main.cf``. Add this lines to the end of the file:

  ::

    relayhost = [smtp.gmail.com]:587
    smtp_sasl_auth_enable = yes
    smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
    smtp_sasl_security_options = noanonymous
    smtp_tls_CAfile = /etc/ssl/certs/thawte_Primary_Root_CA.pem
    smtp_use_tls = yes

#. Configure email address and password:

  ::

    echo [smtp.gmail.com]:587 USERNAME@gmail.com:PASSWORD > /etc/postfix/sasl_passwd
    chmod 400 /etc/postfix/sasl_passwd
    postmap /etc/postfix/sasl_passwd
    systemctl reload postfix

#. Test you configuration with:

  ::

    echo "Test mail from postfix" | mail -s "Test Postfix" you@example.com

  You shoul receive an email on ``you@example.com``

#. Configure Wazuh in the ``/var/ossec/etc/ossec.conf``:

  ::

    <global>
      <email_notification>no</email_notification>
      <smtp_server>localhost</smtp_server>
      <email_from>USERNAME@gmail.com</email_from>
      <email_to>you@example.com</email_to>
    </global>

Centos
~~~~~~

#. Install the needed packages:

  ::

    yum update && yum install postfix mailx cyrus-sasl cyrus-sasl-plain

#. Set Postfix config file ``/etc/postfix/main.cf``. Add this lines to the end of the file:

  ::

    relayhost = [smtp.gmail.com]:587
    smtp_sasl_auth_enable = yes
    smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
    smtp_sasl_security_options = noanonymous
    smtp_tls_CAfile = /etc/ssl/certs/ca-certificates.crt
    smtp_use_tls = yes

#. Configure email address and password:

  ::

    echo [smtp.gmail.com]:587 USERNAME@gmail.com:PASSWORD > /etc/postfix/sasl_passwd
    chmod 400 /etc/postfix/sasl_passwd
    postmap /etc/postfix/sasl_passwd
    systemctl reload postfix

#. Test you configuration with:

  ::

    echo "Test mail from postfix" | mail -s "Test Postfix" you@example.com

  You shoul receive an email on ``you@example.com``

#. Configure Wazuh in the ``/var/ossec/etc/ossec.conf``:

  ::

    <global>
      <email_notification>no</email_notification>
      <smtp_server>localhost</smtp_server>
      <email_from>USERNAME@gmail.com</email_from>
      <email_to>you@example.com</email_to>
    </global>

Alert section
-------------

``email_alert_level`` is the option we use for general configuration. This option stablish the minimum level to send an alert. By default is set to 7.

Here there is some examples about how to configure Wazuh in order to send email once a level is reached. For example:

::

  <ossec_config>
    <alerts>
        <email_alert_level>10</email_alert_level>
    </alerts>
    ...
  </ossec_config>

This will set the minimum level to 10.

More information: :ref:`alerts section <reference_ossec_global>`.


Once you have configured the alert_level, Wazuh needs to be restarted for the change take effect

a) For Systemd:
::

  systemctl status wazuh-manager

b) For SysV Init:
::

  service wazuh-manager status

Mail example:


Mail Example:

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
