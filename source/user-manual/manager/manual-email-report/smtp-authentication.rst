.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to use Postfix to send email alerts using Gmail.

SMTP server with authentication
===============================

Wazuh email alerts does not support SMTP servers with authentication such as Gmail. However, you can use a server relay, like Postfix, to send these emails. Follow this guide for instructions on configuring Postfix with Gmail.

#. Run this command to install the required packages. If prompted about the **Mail server configuration type**, select **No configuration**.

   .. tabs::

      .. group-tab:: CentOS

         .. code-block:: console

            # yum update && yum install postfix mailx cyrus-sasl cyrus-sasl-plain

      .. group-tab:: Ubuntu

         .. code-block:: console

            # apt-get update && apt-get install postfix mailutils libsasl2-2 ca-certificates libsasl2-modules

#. Append these lines to ``/etc/postfix/main.cf`` to configure Postfix. Create the file if missing.

   .. tabs::

      .. group-tab:: CentOS

         .. code-block:: cfg

            relayhost = [smtp.gmail.com]:587
            smtp_sasl_auth_enable = yes
            smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
            smtp_sasl_security_options = noanonymous
            smtp_tls_CAfile = /etc/ssl/certs/ca-bundle.crt
            smtp_use_tls = yes

      .. group-tab:: Ubuntu

         .. code-block:: cfg

            relayhost = [smtp.gmail.com]:587
            smtp_sasl_auth_enable = yes
            smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
            smtp_sasl_security_options = noanonymous
            smtp_tls_CAfile = /etc/ssl/certs/ca-certificates.crt
            smtp_use_tls = yes
            smtpd_relay_restrictions = permit_mynetworks, permit_sasl_authenticated, defer_unauth_destination

#. Set the sender email address and password. Replace *USERNAME* and *PASSWORD* with your own data.

   .. code-block:: console

      # echo [smtp.gmail.com]:587 USERNAME@gmail.com:PASSWORD > /etc/postfix/sasl_passwd
      # postmap /etc/postfix/sasl_passwd
      # chmod 400 /etc/postfix/sasl_passwd

   .. note::

      The password must be an `App Password <https://security.google.com/settings/security/apppasswords>`__. App Passwords can only be used with accounts that have `2-Step Verification <https://myaccount.google.com/signinoptions/two-step-verification>`__ turned on.

#. Secure your password DB file.

   .. code-block:: console

      # chown root:root /etc/postfix/sasl_passwd /etc/postfix/sasl_passwd.db
      # chmod 0600 /etc/postfix/sasl_passwd /etc/postfix/sasl_passwd.db

#. Restart Postfix.


   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl restart postfix

      .. group-tab:: SysV init

         .. code-block:: console

            # service postfix restart

#. Run the following command to test the configuration. Replace ``you@example.com`` with your email address. Check, then, that you receive this test email.

   .. code-block:: console

      # echo "Test mail from postfix" | mail -s "Test Postfix" -r "you@example.com" you@example.com

#. Configure email notifications in the Wazuh server ``/var/ossec/etc/ossec.conf`` file as follows:

   .. code-block:: xml

      <global>
        <email_notification>yes</email_notification>
        <smtp_server>localhost</smtp_server>
        <email_from>USERNAME@gmail.com</email_from>
        <email_to>you@example.com</email_to>
      </global>

#. Restart the Wazuh manager to apply the changes. 

   .. include:: /_templates/common/restart_manager.rst
