.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_your_environment_understanding_storage:

Understanding storage
=====================

.. meta::
  :description: Learn about your tier choice. 

You will be able to visualize on your WUI a certain size of data that matches your tier, this is named :ref:`hot storage <cloud_glossary_hot_storage>`. This data is optimized to perform searches, analysis and visualizations, and will be available as soon as Wazuh manager processes it. If the environment's data exceeds the tier, the oldest data will be rotated. Which means that it will not appear on the WUI but will still be available for download.

If the environment's storage surpasses the tier, that data will still be accessible as :ref:`cold storage <cloud_glossary_cold_storage>` (offline data) for a year without size limits. Alerts are stored as cold storage within 10 to 30 minutes after they are processed. Besides, your environment configuration will get a daily backup and will be held for 30 days. You may download this data using the :ref:`Wazuh Cloud API<cloud_apis>`.


To fit the environment demands, the proper tier can be selected. Some of the tiers include:

- 100GB

- 250GB

- 500GB

- 1TB

- 1TB+
