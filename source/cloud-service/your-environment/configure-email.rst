.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh can be configured to send email alerts to one or more email addresses when certain rules are triggered. Learn more about it here. 

.. _cloud_your_environment_configure_email_alerts:

SMTP configuration
==================

Wazuh can be :ref:`configured to send email alerts <manual_email_report>` to one or more email addresses when certain rules are triggered or for daily event reports.

This configuration requires an SMTP and you can use your own SMTP or the Wazuh Cloud SMTP.

  .. note::

    If your SMTP requires authentication, you need to open a ticket through the **Help** section of your Wazuh Cloud Console to configure it.

The Wazuh Cloud SMTP is limited to 100 emails per hour, regardless of the ``email_maxperhour`` setting. To enable the Wazuh Cloud SMTP, configure the following settings:

.. code-block::

   <global>
     . . .
     <smtp_server>wazuh-smtp</smtp_server>
     <email_from>no-reply@wazuh.com</email_from>
     ...
   </global>

The Wazuh Cloud SMTP is now successfully configured.
