.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Create a Wazuh Console account, confirm your email address, log in with multi-factor authentication, and reset a forgotten password.

.. _cloud_getting_started_create_account:

Creating an account
===================

A Wazuh Console account gives you access to Wazuh Cloud. This page explains how to sign up, confirm your email address, log in, and reset your password.

.. TODO: Confirm the production Wazuh Console host (https://console.wazuh.com) with engineering.

Signing up
----------

#. Go to `https://console.wazuh.com/signup <https://console.wazuh.com/signup>`__. From the log in page, you can also select **Sign up**.
#. On the **Create your account** form, fill in the following fields:

   -  **First name** and **Last name**.
   -  **Email**: The address you use to log in.
   -  **Phone number**.
   -  **Company**: Wazuh Console names your organization after this value.
   -  **Country**, and **State** when your country requires one.
   -  **Password**: Between 12 and 72 characters.

#. Select **Create account**. By signing up, you accept the `Terms of service <https://wazuh.com/legal-resources/cloud-account-terms-of-use/>`__ and the `Privacy Statement <https://wazuh.com/privacy/>`__.

Wazuh Console shows **Check your email** and sends a confirmation link to the address you entered.

Confirming your email address
-----------------------------

#. Open the email you receive and click the confirmation link.
#. On the **Confirm your email address** page, select **Confirm my email**.

The confirmation link is valid for 7 days. If it expires, the page shows **This link is no longer valid**. Sign up again to get another link. If no email arrives, check your spam folder, or select **sign up again** on the **Check your email** page.

Logging in
----------

#. Go to `https://console.wazuh.com/login <https://console.wazuh.com/login>`__.
#. Enter your **Email** and **Password**.
#. Select **Log in**.

If multi-factor authentication is enabled for your account, Wazuh Console asks for a second factor:

#. On the **Enter your authentication code** page, enter the six-digit **Verification code** from your authenticator app.
#. Select **Continue**.

If you don't have access to your authenticator app, select **Use recovery code instead**, enter the **Recovery code** you saved when you set up multi-factor authentication, and select **Continue**. The recovery code is valid for one use only.

To enable multi-factor authentication, see :doc:`User settings </cloud-service/account-billing/user-settings>`. Wazuh Console doesn't support single sign-on (SSO).

Setting up multi-factor authentication again
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Authenticator app codes can't be transferred between sign-in systems. If your account used multi-factor authentication with Wazuh Cloud before you started using Wazuh Console, your password still works, but the codes in your authenticator app are not valid. After you log in, Wazuh Console shows **You are signed in** with a warning. To protect your account, set up multi-factor authentication again:

#. Select **Set up two-factor authentication**. Wazuh Console opens the **Password and Security** tab of your user settings.
#. Follow the steps in :doc:`User settings </cloud-service/account-billing/user-settings>` to register your authenticator app and save your recovery code.

To skip this step and go to Wazuh Console, select **Continue**.

Resetting a forgotten password
------------------------------

#. On the log in page, select **Forgot your password?**.
#. On the **Reset your password** page, enter your **Email** and select **Send reset instructions**.
#. Open the email you receive and click the reset link.
#. On the **Choose a new password** page, enter your **New password** and **Confirm password**.
#. Select **Reset password**.

The reset link is valid for 1 day. Resetting your password logs you out of every device.

Your organization
-----------------

The first time you log in, Wazuh Console creates an organization for you and gives you the **Editor** role in it. The organization is named after the **Company** you entered when you signed up. If your profile has no company, Wazuh Console names the organization after you, followed by ``personal``. For example, ``Jane Doe personal``.

Your organization holds your environments, subscriptions, invoices, and members. To learn about roles, see :doc:`Wazuh Console overview </cloud-service/getting-started/console-overview>`. To manage your organization, see :doc:`Organization </cloud-service/organization/index>`.

Accepting an invitation
-----------------------

When a member of another organization invites you, you receive an email with an invitation link.

#. Open the invitation link. If you are not logged in, Wazuh Console shows **You have been invited to Wazuh Console**.
#. Log in, or select **Sign up** to create an account first.
#. In the **Organization invitation** window, review the organization, the role, and the expiration date.
#. Select **Accept invitation**. To decide later, select **Not now**.

Invitations expire after 7 days. The invitation must be addressed to the **Notifications email** of your account. To learn more, see :doc:`Members </cloud-service/organization/members>`.
