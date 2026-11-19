.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn what each Wazuh Cloud environment setting means and how to upgrade the settings of an environment from Wazuh Console.

Settings
========

The settings of an environment define its capacity and its price. This page explains each setting and how to change the settings and the name of an environment in Wazuh Console.

To check whether your environment is close to its limits, see :doc:`Monitor usage </cloud-service/your-environment/monitor-environment-usage>`.

Environment settings
--------------------

You choose the settings when you create an environment. The **Settings** card of the :doc:`environment details </cloud-service/your-environment/environment-details>` page shows the current values.

.. list-table::
   :header-rows: 1
   :widths: 25 50 25

   * - Setting
     - Description
     - Values
   * - **Active Agents**
     - Maximum number of Wazuh agents connected to the environment at the same time.
     - 100 to 10,000
   * - **EPS**
     - Events per second the environment analyzes.
     - 500 to 30,000
   * - **Indexed Data Retention**
     - How long indexed data is kept.
     - 1 to 6 months
   * - **Indexed Data Capacity**
     - Maximum size of the indexed data.
     - 25 GB to 100,000 GB
   * - **Archive Data Retention**
     - How long archive data is kept.
     - 1, 3, 6, 12, or 24 months
   * - **Support Plan**
     - Level of support from the Wazuh team.
     - **Standard Support** or **Premium Support**

.. _cloud_settings_active_agents:

Active agents
^^^^^^^^^^^^^

**Active Agents** sets the maximum number of Wazuh agents that can be connected to the environment at the same time. You can register more agents than this limit, but only this number can be active at once.

If the number of active agents exceeds the limit, agent connections can become unstable. The environment tolerates a temporary surplus, but if it persists, upgrade the setting or reduce the number of active agents.

.. _cloud_settings_data_ingestion_rate:

EPS
^^^

**EPS** is the number of events per second the environment can analyze. When you select **Active Agents**, Wazuh Console recommends an EPS value. The value must be at least half of the recommended value.

When the incoming event rate exceeds the EPS limit, events queue. When the queue is full, Wazuh drops the events above the limit, and those events are lost.

.. _cloud_settings_indexed_data:

Indexed data
^^^^^^^^^^^^

Indexed data is the data available in the Wazuh dashboard. Wazuh analyzes the events from your agents, indexes them, and makes them searchable. Two settings control indexed data:

-  **Indexed Data Retention**: the maximum time data stays indexed. When data is older than the retention period, Wazuh removes it.
-  **Indexed Data Capacity**: the maximum size of the indexed data. When the capacity is reached, Wazuh removes the oldest indices until the data fits again, regardless of the retention period. Wazuh Console recommends a capacity based on **EPS** and **Indexed Data Retention**. The value must be at least half of the recommended value.

Data removed from the index remains available as archive data for the archive retention period.

.. _cloud_settings_archive_data:

Archive data
^^^^^^^^^^^^

**Archive Data Retention** defines how long Wazuh keeps your analyzed data in an AWS S3 bucket. Unlike indexed data, archive data isn't searchable in the Wazuh dashboard. It is a set of compressed files that you can download. The recommended value is 12 months.

When the retention period passes, Wazuh removes the archived files older than the configured period. See :doc:`Archive data </cloud-service/archive-data/index>`.

.. _cloud_support_type:

Support plan
^^^^^^^^^^^^

**Support Plan** sets the level of support you receive from the Wazuh team: **Standard Support** or **Premium Support**.

.. TODO: Confirm with engineering or sales the differences between Standard Support and Premium Support (response times, channels) to document here.

.. _cloud_settings_adjust:

Upgrading a paid environment
----------------------------

You can increase the settings of a paid environment from Wazuh Console. You need the Editor role to upgrade an environment.

#. In the sidebar, under **Wazuh Cloud**, select **Environments** and open the details page of the environment.
#. Click **Edit settings** on the **Settings** card, or click **Manage** and select **Edit settings**. You can also select **Edit** in the options menu of the environment on the **Environments** page.

   The **Edit Environment** dialog opens. Values lower than the current ones are disabled.

#. Raise the settings you need. Compare the **Current Price** with the **Updated price**.
#. Click **Continue**. The **Confirm Upgrade** step shows the **Changes** and the **New Price**.
#. Under **Payment Information**, keep the selection to charge the payment method already on the subscription, or choose another card under **Existing Payment Method** or **New Payment Method**.
#. Click **Confirm upgrade**.

Confirming the upgrade charges your card today a prorated amount for the rest of the current billing period. Your next invoices reflect the higher price. The updated settings are applied a few minutes after the payment succeeds. Until then, the details page shows **Your new settings are being applied** and the status of the environment changes while the settings are applied.

To lower a setting or to switch between monthly and yearly billing, contact Wazuh support. In the sidebar, under **Help**, select **Support**.

When you can't upgrade
^^^^^^^^^^^^^^^^^^^^^^

**Edit settings** isn't available, or the upgrade is refused, in the following cases:

-  The environment is a trial. Use **Edit trial** instead. See `Editing a trial`_.
-  The environment is cancelled, or its subscription is scheduled for cancellation. Resume the subscription first. See :doc:`Cancel an environment </cloud-service/your-environment/cancel-environment>`.
-  A previous change is still being applied. Try again once the environment is **Active**.
-  The subscription has a payment pending. Pay what is due first.
-  Every setting is already at its maximum.
-  The increase is too large to charge automatically. Contact support to make the change.

If the payment fails, nothing is charged and the settings don't change.

Editing a trial
---------------

While a trial is active, you can change the settings it will have when it becomes a paid environment. You need the Editor role to edit a trial.

#. Open the details page of the trial environment.
#. Click **Edit settings** on the **Settings** card, or click **Manage** and select **Edit trial**.
#. Change the settings. You can't change the name, the region, or the billing period here.
#. Compare the **Current Price** with the price under **Select updated price**.
#. Click **Proceed to Confirmation**.
#. Optionally, under **Payment Information (optional)**, add or select a payment method.
#. Click **Save Changes**.

When the trial ends, your next invoice includes the updated pricing. To switch between monthly and yearly billing, contact Wazuh support.

Renaming an environment
-----------------------

You need the Editor role to rename an environment.

#. Open the details page of the environment.
#. Click **Edit name** on the **Information** card, or click **Manage** and select **Edit name**.
#. Enter a different **Name**.
#. Click **Save name**.
