.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh Cloud stores your data as indexed data and archive data. Learn how archive data works and how it complements indexed data.

.. _cloud_archive_data:

Archive data
============

Wazuh Cloud stores the data of your environment in two places: indexed data and archive data. This section explains how archive data works, how files are named, and how to download them.

-  **Indexed data**: When Wazuh ingests and indexes events from agents, the data becomes searchable and analyzable in the Wazuh dashboard. The **Indexed Data Retention** and **Indexed Data Capacity** settings of your environment limit how much indexed data your environment keeps.
-  **Archive data**: Wazuh also sends the data to archive data, with a maximum delay of 30 minutes after it processes the events. Archive data is stored in an AWS S3 bucket, so you can keep logs for long periods and meet compliance requirements. You can also reindex this data into other environments for further investigation. The **Archive Data Retention** setting of your environment defines how long archive data is kept.

See :doc:`Environment settings </cloud-service/your-environment/settings>` to review or change the retention and capacity settings of your environment. The **Archive capacity used** metric on the environment details page shows how much archive storage your environment uses. See :doc:`Monitor environment usage </cloud-service/your-environment/monitor-environment-usage>` for details.

Data storage example
--------------------

An example environment has the following settings:

-  **Indexed Data Retention**: 3 months
-  **Indexed Data Capacity**: 100 GB
-  **Archive Data Retention**: 12 months

Wazuh ingests 5 GB of data daily, and 20% of the events generate alerts, so it indexes 1 GB per day. With 100 GB of capacity, the indexed data could hold alerts for up to 100 days, but Wazuh rotates it to keep only 3 months, as the indexed data retention setting specifies. All the information from the past 12 months remains available in archive data, as the archive data retention setting specifies.

This configuration keeps recent alerts readily available in indexed data, while older data stays securely stored in archive data for compliance and historical purposes.

.. toctree::
   :maxdepth: 1

   filename-format
   access
