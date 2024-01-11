.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out how to monitor your environment usage in Wazuh Cloud. Learn more about it in this section of the documentation.

.. _cloud_your_environment_monitor_usage:

Monitor usage
=============

This section provides details on using your environment, helping you to optimize its performance.

Viewing environment usage metrics
---------------------------------

To see metrics of your Wazuh Cloud environment, follow these steps:

1. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_.
2. Go to the **Environments** page and select your specific environment.
3. Click on the **Metrics** tab.
   

Agents metric
-------------

The ``agents`` metric shows the number of Wazuh agents in the ``active``, ``disconnected``, ``never connected``, and ``pending`` states. It also displays the limit of active agents, which is configurable through the :ref:`active agents <cloud_settings_active_agents>` setting.


Exceeding the active agents limit might cause operational issues and decrease system stability. Though the system can handle a temporary surplus of active agents, we advise immediate action.

 -  Upgrade the :ref:`active agents <cloud_settings_active_agents>` setting to match the actual count
 -  Reduce active agents.
 
 This ensures a smooth operation and stability of your environment.


Data indexed metric
-------------------

The ``data indexed`` metric presents a histogram showing the usage of indexed data over time. The x-axis represents time, while the y-axis indicates the volume of data in gigabytes consumed by your indexed data. Additionally, this metric displays the date of the oldest indexed alert.

This metric allows you to monitor and evaluate if the :ref:`indexed data capacity and indexed data retention <cloud_settings_indexed_data>` settings are sufficient for your needs. The environment automatically rotates data when the used bytes exceed the indexed data capacity or when the date of the alerts surpasses the indexed data retention.

When the environment age is less than the indexed data retention setting, your oldest indexed alert should match the environment age. Otherwise, it should match the indexed data retention. In both cases, your configuration is correct, and no action is needed. If not, it indicates premature data rotation. In this case, we recommend increasing the :ref:`indexed data capacity <cloud_settings_indexed_data>` setting or refining your rule configurations to filter out less critical events, reducing the indexed data.

Your oldest indexed alert will never be dated beyond the indexed data retention setting because alerts are rotated in such cases.

Monitoring this metric allows you to ensure that your indexed data storage aligns with your needs. You can take actions, such as upgrading or downgrading the settings, to maintain optimal storage and retention of data.

*Events dropped over time* and *Events processed vs dropped* metrics
----------------------------------------------------------------

The "Events Dropped Over Time" metric displays a histogram of events that have been lost or dropped over a specific period. These events are dropped because the rate of incoming events exceeds the limit set by the average/peak EPS setting, causing the event queues to become full and resulting in event loss.

The "Events Processed vs. Dropped" pie chart provides a visual comparison between the number of events that were successfully processed and those that were dropped due to exceeding the average/peak EPS setting.

If you observe a consistent pattern of event drops over time, it's an indication that your environment may need an adjustment to accommodate the higher event rate. Consider increasing the :ref:`average/peak EPS <cloud_settings_data_ingestion_rate>` setting to avoid ongoing event drops.

-  **Review agent configuration**: Examine the settings of your agents. Some agents might be sending an excessive number of events. Adjust their configurations to send fewer events or implement filters to send only critical events, effectively managing the event rate.

-  **Adjust the agent leaky bucket**: Consider implementing a "leaky bucket" strategy in your agent configuration. The leaky bucket algorithm enables control over the rate of events sent to the Wazuh Cloud environment. Configuring the leaky bucket helps smooth out the event flow, preventing sudden spikes that might cause event drops.

These adjustments at the agent level can be a complementary strategy to ensure that your environment operates within the defined event processing rate, reducing the likelihood of event loss while maintaining efficient event processing.



