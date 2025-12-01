.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about Wazuh Cloud settings.

Settings
========

Every cloud environment is configured based on specific settings that define its limitations and pricing. We offer six settings, comprising four basic and two advanced settings. Advanced settings are calculated from basic settings, but you can modify them.

To monitor your environment and check whether settings are being reached, see the :doc:`Monitor usage <monitor-environment-usage>` section.

Understanding environment settings
----------------------------------

.. _cloud_settings_active_agents:

Active agents
^^^^^^^^^^^^^

This basic setting sets the maximum count of active Wazuh agents that the environment can support. Please note that while registering an unlimited number of Wazuh agents is possible, the active agent count is limited by this setting.

If the maximum number of active agents is reached, the environment might start to malfunction, causing instability with agent connections. Although the system can temporarily handle exceeding the active agent limit, appropriate measures will be taken if the situation persists.

.. _cloud_settings_indexed_data:

Indexed data
^^^^^^^^^^^^

Indexed data is the data available on the Wazuh dashboard. Wazuh ingests events from agents, indexes them, and makes them searchable and analyzable.

Two settings define indexed data behavior:

- **Indexed data retention**: It determines the maximum duration for which data remains indexed. This is a basic setting.

- **Indexed data capacity**: It defines the maximum size, in bytes, of the indexed data. This is an advanced setting, and the interface provides a suggestion when selecting the Indexed data retention.

Data remains indexed until retention or capacity is reached. When either is reached, rotation removes the oldest data until the condition clears.

To configure index management policies, see :doc:`/user-manual/wazuh-indexer-cluster/index-lifecycle-management` documentation.

.. _cloud_settings_archive_data:

Archive data
^^^^^^^^^^^^^

This basic setting (previously cold storage) defines how long Wazuh stores analyzed data in an AWS S3 bucket. Unlike indexed data, archive data is not searchable or analyzable. It is a set of compressed files.

When the specified retention period has passed, Wazuh removes any archived files that are older than the configured time window.

.. _cloud_support_type:

Support plan
^^^^^^^^^^^^

This setting indicates whether the support level is premium or standard.

.. _cloud_settings_data_ingestion_rate:

Average/Peak EPS
^^^^^^^^^^^^^^^^^^^

This advanced setting is the average and maximum number of events per second (EPS) the environment analyzes. The interface suggests a value when you select the :ref:`Active agents <cloud_settings_active_agents>` setting.

If ingestion exceeds the peak EPS, events queue. When the queue is full, Wazuh discards new events, which causes event loss. Queueing is managed automatically by the cloud service, ensuring optimal resource utilization.

The environment is configured with the `limits eps option <https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/global.html#limits>`__ using the following parameters:

- timeframe = 1 seconds
- maximum = Peak EPS / number of server nodes

The number of server nodes is automatically determined by the cloud service based on the workload. For instance, if the Average/Peak EPS setting is 100/500 EPS and there is a cluster of 2 nodes at the current time, each node can process up to 250 events per second (500 peak EPS / 2 server nodes).

.. _cloud_settings_adjust:

Adjusting environment settings
------------------------------

Managing your environment settings is crucial to meeting your evolving needs and optimizing the performance of your cloud environment. While some settings can be determined upfront, such as the number of active agents, indexed data retention, archive data, and support plan, it's important to note that these requirements may change over time.

Advanced settings might be more challenging to determine in advance. While the interface provides recommendations based on our experience, your specific workload might differ. Hence, we recommend deploying, monitoring, and adjusting the settings as needed to align with your evolving requirements.

To change a setting, open a `support <https://wazuh.com/services/professional-support/>`__ ticket. Here is the breakdown of the process:

-  **Upgrading a setting**: If you upgrade a setting, you are charged a prorated amount for the remainder of the current billing cycle. The change takes effect immediately after payment and your next billing cycle reflects the higher cost.

-  **Downgrading a setting**: If you downgrade a setting, the change takes effect at the start of the next billing cycle, and your cost is reduced accordingly.

Before any changes or payments are made, we confirm requested changes with you before applying them to ensure accuracy and alignment with your requirements.

By monitoring your environment and making necessary adjustments to the settings, you can ensure that your cloud environment remains optimized and aligned with your evolving needs.
