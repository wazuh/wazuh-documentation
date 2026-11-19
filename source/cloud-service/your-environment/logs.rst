.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to review the events of your Wazuh Cloud environment, such as creation, status changes, and custom DNS changes, in Wazuh Console.

Logs
====

The environment logs record the events that affect an environment, such as its creation, status changes, settings changes, and custom DNS changes. This page explains how to review and filter these events in Wazuh Console.

The Logs card
-------------

The **Logs** card on the :doc:`environment details </cloud-service/your-environment/environment-details>` page shows the five most recent events. For each event, it shows:

-  **When**: the date and time of the event.
-  **Severity**: **Info**, **Warning**, or **Error**.
-  **Event**: a description of what happened.

Click an event to see its details. Click **See more** to open the full list. If the environment has no events, the card shows **No logs recorded yet.**

The Cloud Environment Logs page
-------------------------------

The **Cloud Environment Logs** page lists every event of the environment, most recent first.

#. Open the details page of the environment.
#. On the **Logs** card, click **See more**.

On this page you can:

-  Filter by **Severity**. Select **All severities** to show every severity.
-  Filter by **Date range**, using the **From** and **To** fields. Dates and times are in UTC.
-  Click the **Clear filters** icon to remove the filters.
-  Click the **When** or **Severity** column header to sort the list.
-  Click an event to see its details.

Click **Back to** followed by the environment name to return to the details page.

Event details
^^^^^^^^^^^^^

When you click an event, the **Event details** dialog shows its **When**, **Severity**, and **Event**, and a **Payload** section with the full data of the event in JSON format. Support might ask you for this data when you report an issue.

Event types
-----------

The **Event** column describes what happened to the environment:

.. list-table::
   :header-rows: 1
   :widths: 45 55

   * - Event
     - Meaning
   * - Environment created and provisioning started
     - The environment was created and its resources are being set up.
   * - Environment configuration in progress
     - The configuration of the environment is being applied.
   * - Environment active and ready to use
     - The environment is active.
   * - Environment settings updated
     - The settings of the environment changed.
   * - Environment resources scaled
     - The resources of the environment were resized.
   * - Environment under maintenance
     - The environment entered maintenance.
   * - Environment recovered and working normally
     - The environment recovered from a problem.
   * - Environment impaired and possibly unavailable
     - The environment has a problem and might be unavailable.
   * - Environment suspended
     - The environment was suspended.
   * - Environment resumed
     - The environment is running again after a suspension.
   * - Environment hibernated
     - The environment was paused.
   * - Environment decommissioning started
     - The environment is being removed.
   * - Environment terminated
     - The environment was removed.
   * - Environment restored
     - A terminated environment was brought back.
   * - Environment deleted
     - The environment was deleted.
   * - Custom DNS created
     - A custom DNS configuration was added.
   * - Custom DNS updated
     - A custom DNS configuration was changed.
   * - Custom DNS deleted
     - A custom DNS configuration was removed.
