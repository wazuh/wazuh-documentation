.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to monitor the agents, indexed and archive capacity, and events per second of your Wazuh Cloud environment in Wazuh Console.

Monitor usage
=============

The usage metrics of an environment show how close it is to the limits set by its :doc:`settings </cloud-service/your-environment/settings>`. This page explains each metric and what to do when your environment reaches a limit.

Viewing the usage metrics
-------------------------

#. In the sidebar, under **Wazuh Cloud**, select **Environments**.
#. Click **See detail** on the environment.

The usage metrics appear on the details page, below the **Settings** card. Each metric has a refresh icon that reloads its value. If a metric can't be loaded, it shows **Not available**.

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Metric
     - What it shows
   * - **Agents**
     - The number of agents registered in the environment compared to the **Active Agents** setting, as a percentage and as a count.
   * - **Indexed capacity used**
     - The size of the indexed data compared to the **Indexed Data Capacity** setting, as a percentage and in GB.
   * - **Archive capacity used**
     - The size of the archive data, in GB.
   * - **Indexed capacity evolution**
     - A chart of the indexed data size, in GB, over the last 24 hours.
   * - **Events per second (EPS)**
     - A chart of the events per second over the last 24 hours, compared to the **EPS** setting. A **Limit exceeded** pill appears when the rate went above the EPS setting during that period.

When a limit is reached
-----------------------

Active agents
^^^^^^^^^^^^^

If more agents are active than the **Active Agents** setting allows, agent connections can become unstable. The environment tolerates a temporary surplus, but take action:

-  Upgrade the **Active Agents** setting with **Edit settings**. See :ref:`Upgrading a paid environment <cloud_settings_adjust>`.
-  Reduce the number of active agents.

Indexed capacity
^^^^^^^^^^^^^^^^

When the indexed data reaches the **Indexed Data Capacity**, Wazuh removes the oldest indices, even if they are within the **Indexed Data Retention** period. The removed data remains available as :doc:`archive data </cloud-service/archive-data/index>`.

If **Indexed capacity used** stays close to 100% or **Indexed capacity evolution** grows steadily, older data might be removed before the end of the retention period. To keep your data searchable for the whole retention period:

-  Upgrade the **Indexed Data Capacity** setting with **Edit settings**.
-  Reduce the volume of data, for example by tuning your rules and agent configuration to filter out less relevant events.

Events per second
^^^^^^^^^^^^^^^^^

When the incoming event rate exceeds the **EPS** setting, events queue and, when the queue is full, Wazuh drops the events above the limit. Dropped events are lost and don't generate alerts. If the **Events per second (EPS)** chart shows **Limit exceeded** regularly:

-  Upgrade the **EPS** setting with **Edit settings**.
-  Review the configuration of your agents. Some agents might send unnecessary events. Tune their configuration to send only the events you need.
