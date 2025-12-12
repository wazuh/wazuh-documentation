.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out how to monitor your environment usage in Wazuh Cloud. Learn more about it in this section of the documentation.

Monitor usage
=============

This section provides details on using your environment, helping you to optimize its performance.

Viewing environment usage metrics
---------------------------------

To see metrics of your Wazuh Cloud environment, follow these steps:

#. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`__.
#. Go to the **Environments** page and select your specific environment.
#. Click on the **Metrics** tab.

Agents metric
-------------

The **Agents** metric shows the number of Wazuh agents in the active, disconnected, never connected, and pending states. It also displays the limit of active agents, which is configurable through the :ref:`active agents <cloud_settings_active_agents>` setting.

Exceeding the active agents limit might cause operational issues and decrease system stability. Though the system can handle a temporary surplus of active agents, we advise immediate action:

-  Upgrade the :ref:`active agents <cloud_settings_active_agents>` setting to match the actual count.
-  Reduce active agents.

This ensures a smooth operation and stability of your environment.

Data indexed metric
-------------------

The **data indexed** metric presents a histogram that shows how much security data has been indexed in your environment over time:

-  X-axis: time
-  Y-axis: indexed data volume (in gigabytes)
-  It also displays the date of the oldest indexed alert currently stored.

This metric helps you verify whether your :ref:`indexed data capacity and indexed data retention <cloud_settings_indexed_data>` are sufficient for your needs. The Wazuh Cloud environment automatically rotates (deletes) data when either:

-  The used storage exceeds the configured indexed data capacity, or
-  The alert date exceeds the configured indexed data retention period.

How to interpret this metric:

-  If your environment age is less than the configured retention period, the oldest alert date should align with the environment age.
-  If your environment age is greater than or equal to the retention period, the oldest alert date should align with the retention period.

In both cases, your configuration is working correctly and no action is required. If the oldest alert date does not align with either, it indicates premature data rotation. In this case, you should:

-  Increase the :ref:`indexed data capacity <cloud_settings_indexed_data>`, or
-  Adjust your rule configurations to filter out less critical events and reduce data volume.

.. note::

   Oldest alert date never exceeds the configured retention period, rotation enforces this limit.

Monitoring the data indexed metric ensures that your storage and retention settings continue to match your operational needs. If usage trends change, you can upgrade or downgrade your environment's settings to maintain optimal performance and data availability.

Events - Dropped over time and Events - Processed vs dropped metrics
--------------------------------------------------------------------

The Wazuh Cloud dashboard provides two key metrics to help you understand the efficiency of event ingestion and processing in your environment:

-  **Events - Dropped over time**: A histogram that shows the number of events lost or dropped during a given period. Drops occur when the rate of incoming events exceeds the environment's configured average/peak EPS (events per second) limit. When this happens, the event queues fill up, and additional events are discarded.
-  **Events - Processed vs dropped**: A pie chart that compares the proportion of successfully processed events against those that were dropped. This provides a quick visual summary of overall event handling performance.

Consistent or frequent event drops indicate that your environment may not be able to handle the current event rate. If this continues, important alerts could be lost, reducing visibility into your security posture.

If you observe a pattern of drops in these metrics, consider the following actions to address this:

-  **Increase the EPS setting**: Adjust the :ref:`average/peak EPS <cloud_settings_data_ingestion_rate>` configuration to better align with your actual event rate. This ensures your environment can process more events without loss.
-  **Review agent configuration**: Some agents may be sending excessive or unnecessary data. Tune their configuration to reduce noise, such as by filtering out less critical events before they are sent.
-  **Use the leaky bucket algorithm**: Implement a `leaky bucket <https://documentation.wazuh.com/current/user-manual/agent/agent-management/antiflooding.html>`__ configuration on agents to smooth out event flow. This prevents sudden spikes in event bursts that could overwhelm queues and cause drops.

By combining these strategies, you can ensure that your environment remains within its processing limits, reducing the risk of lost events while maintaining efficient and reliable event ingestion.


