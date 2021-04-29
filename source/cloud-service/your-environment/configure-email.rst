.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_your_environment_configure_email_alerts:

.. meta::
  :description: Learn about how to configure your email alerts

SMTP configuration
==================

Wazuh can be :ref:`configured to send email alerts <manual_email_report>` to one or more email addresses when certain rules are triggered or for daily event reports.

This configuration requires an SMTP. You can use your own SMTP or the Wazuh Cloud SMTP.

.. note::

  In case your SMTP requires authentication, please open a ticket to configure it.

The Wazuh Cloud SMTP is limited to 100 emails per hour (regardless of **<email_maxperhour>** setting). To enable it, just configure the following settings:

.. code-block::

   <global>
     . . .
     <smtp_server>wazuh-smtp</smtp_server>
     <email_from>no-reply@wazuh.com</email_from>
     ...
   </global>

When using the Wazuh Cloud SMTP, the ``email_from`` must be `no-reply@wazuh.com`.
