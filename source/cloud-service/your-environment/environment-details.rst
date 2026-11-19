.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn what the environment details page of Wazuh Console shows, what each environment status means, and what happens to unpaid environments.

.. _cloud_your_environment_environment_details:

Environment details
===================

The details page of an environment shows how to reach it, how it is configured, what it consumes, and what has happened to it. This page describes each part of the details page, the **Manage** menu, and the statuses an environment can have.

To open the details page:

#. In the sidebar, under **Wazuh Cloud**, select **Environments**.
#. Click **See detail** on the environment card, or click its row in the table view.

At the top of the page:

-  **See credentials** shows the default username and password of the Wazuh dashboard. It is available while the environment is active. See :doc:`Access the Wazuh dashboard </cloud-service/getting-started/access-wazuh-wui>`.
-  **Manage** opens the menu of actions on the environment. It is visible only to members with the Editor role.
-  **Open XDR** opens the Wazuh dashboard of the environment in a new tab.

Details page cards
------------------

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Card
     - Content
   * - **Information**
     - **Name**, **Created at**, **ID**, **Region**, and **Status**. Click the copy icon next to the **ID** to copy it. Wazuh support asks for this ID when you open a ticket. Editors can click **Edit name** to rename the environment.
   * - **Settings**
     - **Active Agents**, **EPS**, **Archive Data Retention**, **Support Plan**, **Billing**, **Indexed Data Capacity**, and **Indexed Data Retention**. Editors can click **Edit settings** to change them. See :doc:`Settings </cloud-service/your-environment/settings>`.
   * - Usage metrics
     - **Agents**, **Indexed capacity used**, **Archive capacity used**, **Indexed capacity evolution**, and **Events per second (EPS)**. See :doc:`Monitor usage </cloud-service/your-environment/monitor-environment-usage>`.
   * - **AI Reports**
     - The latest weekly AI reports and a link to the full list. See :doc:`AI Analyst </cloud-service/ai-analyst>`.
   * - **Logs**
     - The latest events of the environment. See :doc:`Logs </cloud-service/your-environment/logs>`.
   * - **Custom DNS**
     - Your own domain names for the environment. See :doc:`Custom DNS </cloud-service/your-environment/custom-dns>`.

Manage menu
-----------

You need the Editor role to use the **Manage** menu. The menu is unavailable once the environment is cancelled. The items depend on whether the environment is a trial or a paid environment.

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Item
     - Action
   * - **Edit name**
     - Renames the environment.
   * - **Edit trial**
     - Changes the settings of a trial environment. Trials only.
   * - **Edit settings**
     - Upgrades the settings of a paid environment. See :doc:`Settings </cloud-service/your-environment/settings>`.
   * - **Enable AI Report** / **Disable AI Report**
     - Turns the weekly AI reports on or off. See :doc:`AI Analyst </cloud-service/ai-analyst>`.
   * - **Request assistance**
     - Sends a request for help with your trial to the Wazuh team. Trials only.
   * - **Cancel Trial**
     - Cancels the trial and deletes its environment right away. Trials only. See :doc:`Cancel an environment </cloud-service/your-environment/cancel-environment>`.

.. _cloud_environment_details_statuses:

Environment statuses
--------------------

The **Status** of an environment appears on the **Environments** page and on the **Information** card.

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Status
     - Meaning
   * - **Pending**, **Provisioning**
     - The environment is being created.
   * - **Configuring**
     - The configuration of the environment is being applied.
   * - **Active**
     - The environment is ready to use.
   * - **Scaling**, **Configchange**
     - Changes to the environment, such as updated settings or a custom DNS, are being applied.
   * - **Maintenance**
     - The environment is under maintenance. It is available again when maintenance finishes.
   * - **Recovering**
     - The environment is recovering from a problem.
   * - **Impaired**
     - The environment has a problem and might be unavailable.
   * - **Suspended**
     - You can't access the environment. See `Suspension and termination for non-payment`_.
   * - **Hibernated**
     - The environment is paused.
   * - **Decommissioning**
     - The environment is being removed.
   * - **Terminated**
     - The environment is removed and its data is permanently deleted.
   * - **Cancelled**
     - The environment is cancelled and isn't available.

.. TODO: Confirm with engineering the customer-facing meaning of Hibernated and whether agents keep reporting while an environment is Suspended.

Other pills can appear next to the status:

-  **Trial**: the environment is on a trial.
-  **Cancels** followed by a date: the subscription is cancelled and the environment stays available until that date.

Suspension and termination for non-payment
------------------------------------------

When a payment for a paid environment fails, the subscription becomes past due. The environment keeps running for 7 days. If the payment is still missing after that, the environment is suspended:

-  A subscription billed monthly stays suspended for 7 days.
-  A subscription billed yearly stays suspended for 14 days.

If the subscription is still unpaid at the end of the suspension, the environment is terminated, all its data is permanently deleted, and the subscription is cancelled. Every member of your organization receives an email when the environment is suspended and when it is terminated.

While an environment is suspended, the **Overview**, the **Environments** page, and its details page show a warning, and its card or table row is highlighted:

-  If the environment is suspended because its subscription hasn't been paid, the warning links to **Review your subscription** and shows the date when the environment is terminated if it stays unpaid. Pay the amount due under **Billing** > **Subscriptions** and the environment becomes active again. See :doc:`Invoices </cloud-service/account-billing/invoices>` and :doc:`Payment methods </cloud-service/account-billing/payment-methods>`.
-  If the environment is suspended for another reason while its subscription is still running, the warning asks you to contact sales at `cs@wazuh.com <mailto:cs@wazuh.com>`__.

While a payment is due, you can't cancel the subscription or delete the environment. If you need more time to pay, contact Wazuh sales.
