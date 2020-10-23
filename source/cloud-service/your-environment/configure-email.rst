.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_your_environment_configure_email_alerts:

.. meta::
  :description: Learn about how to configure your email alerts

Configure email alerts
======================

Configure the email settings to send alerts or reports by email through the environment's WUI:

• Select **Management** tab. Click on the **Configuration** button. Click on the **Edit configuration** option.

• Choose a Wazuh manager from the drop-down box.

In the global section, change the parameter **<email_notification>** to yes. Then, change the parameter **<email_to>** specifying one address to send the email to. If you want to send alerts to multiple addresses, each address must be listed in a separate section. Lists are not allowed.

The resulting configuration should look like this:

.. code-block::

   <global>
     . . .
     <email_notification>yes</email_notification>
     <smtp_server>wazuh-smtp</smtp_server>
     <email_from>no-reply@wazuh.com</email_from>
     <email_to>you@example.com</email_to>
     <email_maxperhour>12</email_maxperhour>
     <email_log_source>alerts.json</email_log_source>
   </global>


• Once the changes have been made, **save** the configuration and restart the manager by clicking the manager restart button.

• Repeat this process for all Wazuh managers.

Wazuh Cloud offers a free SMTP (**wazuh-smtp**) limited to 100 emails per hour (regardless of **<email_maxperhour>**). Contact us if you want to use your own authenticated SMTP server (unauthenticated SMTP servers not recommended).

If you need to change the sender email (**<email_from>** setting), please contact us.

