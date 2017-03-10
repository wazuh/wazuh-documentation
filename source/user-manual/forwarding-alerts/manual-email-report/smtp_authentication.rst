.. _smtp_authentication:

SMTP server with authentication
===============================

In order to use emails with authentication like gmail, we need to configure a server relay because Wazuh does not handle authentication. Here you can see a guide to the configuration of ``postfix``:

Installing Postfix by default will allow us to send emails, on the basics, we do not need to configure anything, so we are not configuring an SMTP private server or relaying server. Wazuh will sent email as the sender with specify, with no TLS, no encryption just the basic, BUT IN SOME CASES we need to use an authenticated SMTP to send email (for example, because the recipient is rejecting emails from Postfix because they are not identified) so we move on next configuration:

#. Install the needed packages:

    Ubuntu
    ::

      apt-get install postfix mailutils libsasl2-2 ca-certificates libsasl2-modules

    CentOS
    ::

      yum update && yum install postfix mailx cyrus-sasl cyrus-sasl-plain


#. Set Postfix config file ``/etc/postfix/main.cf``. Add this lines to the end of the file:

    Ubuntu
    ::

      relayhost = [smtp.gmail.com]:587
      smtp_sasl_auth_enable = yes
      smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
      smtp_sasl_security_options = noanonymous
      smtp_tls_CAfile = /etc/ssl/certs/thawte_Primary_Root_CA.pem
      smtp_use_tls = yes

    CentOS
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
      postmap /etc/postfix/sasl_passwd
      chmod 400 /etc/postfix/sasl_passwd

#. Secure DB password

    ::
      
      chown root:root /etc/postfix/sasl_passwd /etc/postfix/sasl_passwd.db
      chmod 0600 /etc/postfix/sasl_passwd /etc/postfix/sasl_passwd.db

#. Reload Postfix

    ::

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
