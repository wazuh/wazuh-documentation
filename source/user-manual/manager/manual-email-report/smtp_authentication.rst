.. Copyright (C) 2018 Wazuh, Inc.

.. _smtp_authentication:

SMTP server with authentication
===============================

If your SMTP server uses authentication (like Gmail, for instance), a server relay will need to be configured as Wazuh does not support this. **Postfix** can be configured to provide this capability. The following guide describes the minimal configuration needed to use Postfix to send emails:

#. Install the needed packages:

    Ubuntu

    .. code-block:: console

      # apt-get install postfix mailutils libsasl2-2 ca-certificates libsasl2-modules

    CentOS

    .. code-block:: console

      # yum update && yum install postfix mailx cyrus-sasl cyrus-sasl-plain


#. Configure Postfix in the ``/etc/postfix/main.cf`` file adding these lines to the end of the file:

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
      smtp_tls_CAfile = /etc/ssl/certs/ca-bundle.crt
      smtp_use_tls = yes

#. Configure the email address and password:

    .. code-block:: console

      # echo [smtp.gmail.com]:587 USERNAME@gmail.com:PASSWORD > /etc/postfix/sasl_passwd
      # postmap /etc/postfix/sasl_passwd
      # chmod 400 /etc/postfix/sasl_passwd

#. Secure the DB password

    .. code-block:: console

      # chown root:root /etc/postfix/sasl_passwd /etc/postfix/sasl_passwd.db
      # chmod 0600 /etc/postfix/sasl_passwd /etc/postfix/sasl_passwd.db

#. Restart Postfix

    .. code-block:: console

      # systemctl reload postfix

#. Test the configuration with:

    .. code-block:: console

      # echo "Test mail from postfix" | mail -s "Test Postfix" you@example.com

    You should receive an email at ``you@example.com``

#. Configure Wazuh in the ``/var/ossec/etc/ossec.conf`` as follows:

    ::

      <global>
        <email_notification>yes</email_notification>
        <smtp_server>localhost</smtp_server>
        <email_from>USERNAME@gmail.com</email_from>
        <email_to>you@example.com</email_to>
      </global>
