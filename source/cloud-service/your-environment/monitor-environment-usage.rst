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

The agents metric provides information about the number of Wazuh agents in different states, including active, disconnected, never connected, and pending. It also displays the limit of active agents, which can be configured through the :ref:`active agents <cloud_settings_active_agents>` setting.


It is crucial to note that exceeding the limit of active agents may lead to operational issues and a potential decrease in system stability. While the system can tolerate a temporary increase in active agents beyond the limit, we strongly recommend taking immediate action to either upgrade the :ref:`active agents <cloud_settings_active_agents>` setting to accommodate the actual number of active agents or reduce the number of active agents accordingly. This ensures the continued smooth operation and stability of your environment.


Data indexed metric
-------------------

The data indexed metric presents a histogram that visualizes the usage of indexed data over time. The x-axis represents time, while the y-axis indicates the amount of data in gigabyte used by your indexed data. Additionally, the metric displays the date of the oldest indexed alert.

This metric allows you to monitor and evaluate if the :ref:`indexed data capacity and indexed data retention <cloud_settings_indexed_data>` settings are sufficient for your needs. The environment automatically rotates data when the used bytes exceed the indexed data capacity or when the date of the alerts surpasses the indexed data retention.

When the environment age is less than the indexed data retention setting, your oldest indexed alert should match the environment age. Otherwise, it should match the indexed data retention. In both cases, your configuration is correct, and no action is needed. If not, it indicates premature data rotation. In this case, we recommend increasing the :ref:`indexed data capacity <cloud_settings_indexed_data>` setting or refining your rule configurations to filter out less critical events, reducing the indexed data.

Your oldest indexed alert will never be dated beyond the indexed data retention setting because alerts are rotated in such cases.

By monitoring this metric, you can ensure that your indexed data storage meets your requirements and take necessary actions, such as upgrading or downgrading the settings, to maintain optimal storage and retention of data.

Events dropped over time and Events processed vs dropped metrics
----------------------------------------------------------------

The "Events Dropped Over Time" metric displays a histogram of events that have been lost or dropped over a specific period. These events are dropped because the rate of incoming events exceeds the limit set by the average/peak EPS setting, causing the event queues to become full and resulting in event loss.

The "Events Processed vs. Dropped" pie chart provides a visual comparison between the number of events that were successfully processed and those that were dropped due to exceeding the average/peak EPS setting.

If you observe a consistent pattern of event drops over time, it's an indication that your environment may need an adjustment to accommodate the higher event rate. Consider increasing the :ref:`average/peak EPS <cloud_settings_data_ingestion_rate>` setting to avoid ongoing event drops.

Also, as an alternative, you can adjust your agent configuration:

- Review agent configuration: Examine the configuration settings of your agents. You may find that some agents are sending an excessive number of events. Adjusting the configurations of these agents to send fewer events or implementing filters to send only critical events can help manage the event rate.

- Adjust the agent leaky bucket: Another option is to implement a "leaky bucket" strategy within your agent configuration. The leaky bucket algorithm allows you to control the rate at which events are sent to the Wazuh Cloud environment. By configuring the leaky bucket, you can smooth out the event flow, preventing sudden spikes that might lead to event drops.

These adjustments at the agent level can be a complementary strategy to ensure that your environment operates within the defined event processing rate, reducing the likelihood of event loss while maintaining efficient event processing.



