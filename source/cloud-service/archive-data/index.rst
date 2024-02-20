.. Copyright (C) 2015, Wazuh, Inc.


.. meta::
  :description: Wazuh provides two types of storage for your data: indexed and archive. Learn more about the archive data in this section. 

Archive data
=============

Wazuh provides two types of storage for your data:

-  **Indexed data**, formerly known as hot storage.
-  **Archive data**, formerly known as cold storage.

When Wazuh ingests and indexes events from agents, the data becomes searchable and analyzable in the Wazuh WUI. This information is stored in indexed data, which is limited by your :ref:`indexed data retention and indexed data capacity <cloud_settings_indexed_data>` (formerly known as tier) settings. Simultaneously, the data is sent to archive data with a maximum delay of 30 minutes after initial processing by Wazuh. Archive data is stored in an AWS S3 bucket, allowing you to store logs for extended periods and meet compliance requirements. Additionally, you can reindex the data to other environments for further investigations.

Environment example for data storage
------------------------------------

This example environment is configured with the following settings:

- Indexed data retention: 3 months
- Indexed data capacity (formerly known as tier): 100 GB
- Archive data: 1 year

Assuming that Wazuh ingests 5GB of data daily, with 20% of events generating alerts, it indexes 1GB per day. In this scenario, the indexed data can retain alerts for up to 100 days (1GB per day - 100GB), but it will be rotated to maintain only 3 months of data as specified in the indexed data retention setting. However, all information from the past year is still accessible in the archive data according to the archive data setting.

This configuration ensures that recent alerts are readily available in the indexed data, while older data is securely stored in the archive data for compliance and historical purposes.

For more information about the archive data feature in the Wazuh Cloud service, please refer to the following sections:

.. toctree::
  :maxdepth: 1

  configuration
  filename-format
  access
