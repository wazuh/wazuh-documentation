.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Edit your Wazuh Console personal details, change your password, set up multi-factor authentication, and manage your notifications.

.. _cloud_account_user_settings:

User settings
=============

You can edit your personal details, change your password, protect your account with multi-factor authentication (MFA), and choose how Wazuh Console notifies you. These settings apply to your user account in every organization you belong to.

To open your user settings:

#. In the header, open the account menu.
#. Select **User Settings**.

The **User settings** page has the following tabs:

-  **Personal Details**
-  **Password and Security**
-  **Notifications**
-  **Notification Settings**

Personal Details
----------------

The **Personal Details** tab shows your profile. All fields are required.

+-------------------------+--------------------------------------------------------------------------+
| Field                   | Description                                                              |
+=========================+==========================================================================+
| **First name**          | Your first name.                                                         |
+-------------------------+--------------------------------------------------------------------------+
| **Last name**           | Your last name.                                                          |
+-------------------------+--------------------------------------------------------------------------+
| **Notifications email** | The address where Wazuh Console sends you emails. Organization           |
|                         | invitations are matched against this address.                            |
+-------------------------+--------------------------------------------------------------------------+
| **Phone number**        | Your phone number.                                                       |
+-------------------------+--------------------------------------------------------------------------+
| **Company**             | Your company name.                                                       |
+-------------------------+--------------------------------------------------------------------------+
| **Country**             | Your country.                                                            |
+-------------------------+--------------------------------------------------------------------------+
| **State**               | Your state. This field appears only for some countries.                  |
+-------------------------+--------------------------------------------------------------------------+

To edit your personal details:

#. Select the **Personal Details** tab.
#. Change the fields you want to update.
#. Click **Save changes**.

Wazuh Console shows **Profile updated successfully.**

.. note::

   The email address you use to sign in can't be changed. You can change the **Notifications email** to receive emails at a different address.

Changing the **Company** in your profile doesn't rename your organization. To rename the organization, see :doc:`Organization </cloud-service/organization/index>`.

Password and Security
---------------------

The **Password and Security** tab lets you change your password and manage multi-factor authentication.

Changing your password
^^^^^^^^^^^^^^^^^^^^^^

#. Select the **Password and Security** tab.
#. In **Current password**, enter your current password.
#. In **New password** and **Confirm password**, enter the new password. It must be between 12 and 72 characters long.
#. Click **Update password**.

Wazuh Console shows **Password updated successfully.**

If you don't remember your current password, click **Forgot password?** to receive an email with a link to reset it. See :doc:`Create an account </cloud-service/getting-started/create-account>`.

Setting up multi-factor authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

With MFA, Wazuh Console asks for a 6-digit verification code from an authenticator app each time you sign in, in addition to your password. You need an authenticator app that supports time-based one-time passwords (TOTP) on your phone or computer.

#. Select the **Password and Security** tab.
#. Under **Multi-factor authentication is not configured**, click **Set up MFA**.
#. Open your authenticator app and scan the QR code. If you can't scan it, click **Can't scan the QR code?** and enter the setup key shown in your authenticator app.
#. Click **Continue**.
#. In **Verification code**, enter the 6-digit code that your authenticator app shows.
#. Click **Continue**.
#. Under **Save your recovery code**, copy the recovery code and store it somewhere safe.

   .. warning::

      This code will not be shown again. Make sure to copy it before continuing.

#. Click **I have saved my recovery code**.

The tab shows **Multi-factor authentication is active**. The next time you sign in, Wazuh Console asks for a verification code.

Using the recovery code
^^^^^^^^^^^^^^^^^^^^^^^

The recovery code lets you sign in once if your authenticator app is unavailable. Enter it instead of the verification code when you sign in. After you use it, the code is invalid. Generate a new recovery code as soon as you can.

Generating a new recovery code
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Generate a new recovery code if you used your code or think someone else might know it. Generating a new code immediately invalidates the previous one.

#. Select the **Password and Security** tab.
#. Under **Recovery code**, click **Generate new recovery code**.
#. Click **Generate new code** to confirm.
#. Click the eye icon (**Show recovery code**) to show the code, and store it somewhere safe.
#. Click **Ready**.

The code is not shown again after you click **Ready** or leave the page.

Disabling multi-factor authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Disabling MFA removes an important layer of security from your account. We don't recommend it.

#. Select the **Password and Security** tab.
#. Under **Disable multi-factor authentication**, click **Disable MFA**.
#. Click **Disable MFA** again to confirm.

Wazuh Console shows **Multi-factor authentication has been disabled.** You can set up MFA again at any time.

If you lose access to your authenticator app and your recovery code, contact Wazuh. See :doc:`Support </cloud-service/support>`.

.. TODO: Confirm with support the procedure to recover an account when the user loses both the authenticator app and the recovery code.

Notifications
-------------

The **Notifications** tab lists the notifications you received, with the **Notification** text and the date and time it was **Received**. Unread notifications are highlighted, and Wazuh Console marks them as read when you open the tab.

You can also see your latest notifications from the notification bell in the header. Click **See all notifications** to open this tab.

Notification Settings
---------------------

The **Notification Settings** tab lets you choose how you receive each type of notification. Your notification types are listed under **Your notifications**.

#. Select the **Notification Settings** tab.
#. Expand a notification type to see its channels.
#. Turn each channel on or off:

   -  **Notification bell**: The notification appears in the notification bell of the header and in the **Notifications** tab.
   -  **Email**: The notification is sent to your **Notifications email**.

Wazuh Console saves each change immediately. A notification type with every channel turned off shows **Off**. Some notification types are required, and you can't turn off their channels.
