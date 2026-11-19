.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh Console is organized: the header, the sidebar sections, the Overview page, and what the Editor and Viewer roles can do.

.. _cloud_getting_started_console_overview:

Wazuh Console overview
======================

Wazuh Console is the web application where you manage your Wazuh Cloud organization, environments, and billing. This page describes its layout, the **Overview** page, and the roles that control what each member can do.

Header
------

The header at the top of every page contains the following elements:

-  **Organization switcher**: Shows the organization you are working in. If you belong to more than one organization, select it to open the **Organizations** list. Use **Search organization** to find an organization and select it to switch.
-  **Notifications**: The bell icon shows your most recent notifications. Select **See all notifications** to open the full list in your user settings.
-  **Account menu**: The user icon opens a menu with the following options:

   -  **User Settings**: Manage your personal details, password, multi-factor authentication, and notifications. See :doc:`User settings </cloud-service/account-billing/user-settings>`.
   -  **Log out**: End your session.

Sidebar
-------

The sidebar on the left gives access to every section of Wazuh Console. To make it narrower, select **Collapse** at the bottom of the sidebar.

.. TODO: Confirm with engineering whether the CTI sidebar group is visible to all organizations in production. Its visibility is configurable.

.. list-table::
   :header-rows: 1
   :widths: 20 25 55

   * - Group
     - Item
     - Description
   * - —
     - **Overview**
     - Summary of your environments and deployments, with the steps that remain to set them up.
   * - —
     - **Organization**
     - Organization settings, members, invitations, and API keys. See :doc:`Organization </cloud-service/organization/index>`.
   * - **Wazuh Cloud**
     - **Create Environment**
     - Create a paid environment. See :doc:`Create an environment </cloud-service/your-environment/create-environment>`. Only visible to editors.
   * - **Wazuh Cloud**
     - **Environments**
     - The list of your cloud environments. From here you can also start a trial with **Create Trial**.
   * - **CTI**
     - **Deployments**
     - Self-hosted Wazuh deployments registered in your organization. See :doc:`Wazuh CTI </cloud-service/cti/index>`.
   * - **CTI**
     - **Feeds**
     - The threat intelligence feeds available to your deployments.
   * - **Billing**
     - **Subscriptions**
     - Subscriptions, payments, and payment methods. See :doc:`Subscriptions </cloud-service/account-billing/subscriptions>`. Only visible to editors.
   * - **Billing**
     - **Invoices**
     - Your invoices and their PDF downloads. See :doc:`Invoices </cloud-service/account-billing/invoices>`. Only visible to editors.
   * - **Help**
     - **Support**
     - How to contact Wazuh support or sales. See :doc:`Support </cloud-service/support>`.
   * - **Help**
     - **Documentation**
     - Links to the Wazuh Cloud guides. See :doc:`Support </cloud-service/support>`.

Overview page
-------------

The **Overview** page is the first page you see after you log in.

When your organization has no environments or deployments yet, the page shows **Welcome to Wazuh Console** and two cards to get started:

-  **Run Wazuh in the cloud**: Lists what Wazuh Cloud includes and how to get an environment running. Editors can select **Start free 14-day trial** or **Create environment**.
-  **Connect your own Wazuh**: Explains how to connect a self-hosted Wazuh deployment to receive threat intelligence. Editors can select **Register a deployment**. **Read the setup guide** opens the registration guide.

When your organization has at least one environment or deployment, the page shows two sections:

-  **Wazuh Cloud**: The number of environments and how many are active, with your most recent environments. The table shows the **Name**, **Status**, **Agents**, and **Support** of each environment. Select a row to open the environment, or select **See all environments**. While you have no active environment, a **Finish setting up** card lists the remaining steps, with **Start a trial** and **Create environment** buttons. Otherwise, the **Add another** card lets you select **Create environment**.
-  **Wazuh CTI**: The number of registered deployments, with your most recent deployments. The table shows the **Deployment**, **Version**, **Feed**, and **Feed status** of each deployment. Select **See all deployments** to open the full list.

If an environment is suspended for non-payment, the page shows a warning at the top of the **Wazuh Cloud** section, with a link to review your subscription.

At the bottom of the page, **Learn and get help** contains the following cards:

-  **Trial experience**: **Setup guide** and **Testing guide** open guides to set up and test your trial environment on the Wazuh website.
-  **Support**: **Go to support** opens the :doc:`Support </cloud-service/support>` page.
-  **Documentation**: **Go to documentation** opens the **Documentation** page.

Roles
-----

Every member of an organization has one of two roles: **Editor** or **Viewer**. The person who creates the organization is an editor. Invited members get the role chosen in their invitation.

-  **Editor**: Can do everything in Wazuh Console for the organization.
-  **Viewer**: Can see the organization's environments, deployments, and settings, but can't change them. Viewers can't open the billing pages.

Wazuh Console hides the buttons for editor-only actions from viewers. If a viewer opens one of these pages directly, Wazuh Console shows **You don't have permissions to access this resource.**

.. list-table::
   :header-rows: 1
   :widths: 60 20 20

   * - Action
     - Editor
     - Viewer
   * - View environments, their settings, usage, logs, and AI reports
     - Yes
     - Yes
   * - See the default credentials and open the Wazuh dashboard of an environment
     - Yes
     - Yes
   * - Create, buy, edit, cancel, or delete environments, and start trials
     - Yes
     - No
   * - Enable or disable AI reports and manage custom DNS
     - Yes
     - No
   * - Register, edit, or delete deployments, and assign subscriptions to them
     - Yes
     - No
   * - View subscriptions and invoices, add or delete payment methods, and pay or cancel subscriptions
     - Yes
     - No
   * - Edit the organization, invite members, and manage API keys
     - Yes
     - No
   * - Use the **Support** and **Documentation** pages
     - Yes
     - Yes

To invite members and choose their role, see :doc:`Members </cloud-service/organization/members>`.
