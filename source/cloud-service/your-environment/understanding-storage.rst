.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_your_environment_understanding_storage:

Understanding storage
=====================

.. meta::
  :description: Learn about your tier choice. 

You will be able to visualize on your WUI a certain size of data that matches your tier, this is named :ref:`hot storage <cloud_glossary_hot_storage>`. This data is optimized to perform searches, analysis and visualizations, and will be available as soon as Wazuh manager processes it. If the environment's data exceeds the tier, the oldest data will be rotated. Which means it will not appear on the WUI but will still be available for download.

Select the most convenient tier to fit the environment demands, it is possible to use this `estimation tool <https://wazuh.com/cloud/#pricing>`_ to do so. The tiers include:  100GB, 250GB, 500GB, 1TB, and custom 1TB+ environments.


If the environment's storage surpasses the tier, that data will still be accessible as :ref:`cold storage <cloud_glossary_cold_storage>` (offline data) for a year without size limits. Alerts are stored as cold storage within 10 to 30 minutes after they are processed. Besides, your environment configuration will get a daily backup and will be held for 30 days. You may download this data using the :ref:`Wazuh Cloud API<cloud_apis>`. A guide is provided to :ref:`learn how to access cold storage <cloud_your_environment_accessing_cold_storage>`.

As an example:

A user with a 100GB tier that is generating 10GB of alerts per day, will be able to search and visualize the alerts of the last 10 days in the Wazuh WUI (10GB/day x 10 days = 100GB). When those 100GB of data are being used, the oldest data is rotated (keeping 100GB of total data on the WUI), but will be accessible as cold storage.
