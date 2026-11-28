.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Invite people to your Wazuh Console organization, assign them the Editor or Viewer role, manage pending invitations, and accept invitations.

.. _cloud_organization_members:

Members and invitations
=======================

You can invite people to your organization, manage the invitations you send, and accept invitations to join other organizations. This page describes the member roles and each of these tasks.

Roles
-----

Every member of an organization has one of the following roles:

+------------+-------------------------------------------------------------------------------+
| Role       | Description                                                                   |
+============+===============================================================================+
| **Editor** | Editors can manage the organization's environments, subscriptions and         |
|            | members.                                                                      |
+------------+-------------------------------------------------------------------------------+
| **Viewer** | Viewers can see the organization's environments, but not change them or       |
|            | access billing.                                                               |
+------------+-------------------------------------------------------------------------------+

The person whose sign-in creates an organization is its first editor. Invited members receive the role chosen in their invitation. Wazuh Console hides the actions that need the Editor role from viewers, and viewers can't open the **Billing** pages.

Viewing members
---------------

#. In the sidebar, select **Organization**.
#. Select the **Members** tab.

The tab lists every member of the organization with the following columns:

-  **Name**: The name of the member.
-  **Role**: **Editor** or **Viewer**.
-  **Joined at**: The date and time the member joined the organization.

Click a column header to sort the list by that column.


Inviting a member
-----------------

You need the Editor role to invite members.

#. In the sidebar, select **Organization**.
#. In the **Members** tab or the **Pending Invitations** tab, click **Invite member**.
#. In **Email**, enter the email address of the person to invite.
#. In **Role**, select **Editor** or **Viewer**. The default role is **Viewer**.
#. Click **Create invitation**.

Wazuh Console shows **Invitation created successfully.** and emails the invitation to that address. The invitation appears in the **Pending Invitations** tab.

Keep the following in mind:

-  Each invitation expires 7 days after it is sent.
-  An organization can have only one pending invitation for each email address.
-  The invited person accepts the invitation only if the address matches the **Notifications email** of their Wazuh Console account. Ask them which address they use. See :doc:`User settings </cloud-service/account-billing/user-settings>`.
-  If the email can't be delivered, Wazuh Console shows **Invitation could not be sent. Please try again.**

Managing pending invitations
----------------------------

You need the Editor role to manage invitations.

#. In the sidebar, select **Organization**.
#. Select the **Pending Invitations** tab.

The tab lists the invitations that are not accepted yet, with their **Email**, **Role**, and **Created at** date. Use **Search Invitation** to filter the list by email address.

Open the options menu of an invitation and select one of the following actions:

+------------+---------------------------------------------------------------------------------+
| Action     | Description                                                                     |
+============+=================================================================================+
| **Show**   | Opens **Invitation details**, with the state, email, role, inviter, and the     |
|            | dates on which the invitation was created, sent, and expires.                   |
+------------+---------------------------------------------------------------------------------+
| **Resend** | Sends the invitation again with a fresh link. The invitation expires 7 days     |
|            | after it is resent, and the earlier link stops working.                         |
+------------+---------------------------------------------------------------------------------+
| **Cancel** | Cancels the invitation after you confirm. Its link stops working, and the       |
|            | invitation leaves the **Pending Invitations** tab.                              |
+------------+---------------------------------------------------------------------------------+
| **Delete** | Permanently deletes the invitation after you confirm.                           |
+------------+---------------------------------------------------------------------------------+

Accepting an invitation
-----------------------

When a member of an organization invites you, you receive an email with a link to the invitation. To accept it:

#. Open the invitation link in the email.
#. If you are not signed in to Wazuh Console, sign in. If you don't have an account, create one first with the invited email address. See :doc:`Create an account </cloud-service/getting-started/create-account>`.
#. In the **Organization invitation** dialog, check the **Organization**, the **Role** you are invited with, the person who invited you in **Invited by**, and the **Expires at** date.
#. Click **Accept invitation**. To decide later, click **Not now**.

Wazuh Console shows **Invitation accepted successfully.** and switches to the organization you joined. To return to another organization, use the organization selector in the header. See :doc:`Organization </cloud-service/organization/index>`.

If the invitation can't be accepted
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

+-------------------------------------------------------------+------------------------------------------------------------------+
| Message                                                     | What to do                                                       |
+=============================================================+==================================================================+
| **Invitation has expired.**                                 | Ask an editor of the organization to resend the invitation.      |
+-------------------------------------------------------------+------------------------------------------------------------------+
| **Invitation is no longer pending.**                        | The invitation was already accepted or was canceled. Ask an      |
|                                                             | editor of the organization for a fresh invitation if needed.     |
+-------------------------------------------------------------+------------------------------------------------------------------+
| **Invitation was not found.**                               | The link is incomplete or the invitation was deleted. Ask an     |
|                                                             | editor of the organization for a fresh invitation.               |
+-------------------------------------------------------------+------------------------------------------------------------------+
| **This invitation was sent to <EMAIL>. Sign out and sign in | The invitation was sent to a different address than the          |
| with that account to accept it.**                           | **Notifications email** of the account you are signed in with.   |
|                                                             | Sign in with the account that uses the invited address, change   |
|                                                             | your **Notifications email** to the invited address, or ask for  |
|                                                             | an invitation to your address.                                   |
+-------------------------------------------------------------+------------------------------------------------------------------+
| **Invitation could not be accepted.**                       | Open the invitation link again. If the problem continues,        |
|                                                             | contact Wazuh. See :doc:`Support </cloud-service/support>`.      |
+-------------------------------------------------------------+------------------------------------------------------------------+
