.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh indexer API is an open source RESTful API that allows interaction with the Wazuh indexer. Learn more in this section of the documentation.

Wazuh indexer API
=================

The Wazuh indexer API is an open source RESTful API that allows interaction with the Wazuh indexer from the Wazuh dashboard, a command-line tool such as cURL, or any script or program capable of making web requests. The Wazuh indexer API provides endpoints for managing and querying data within the Wazuh indexer. Using this API, users can perform various operations, such as searching logs, managing indexes, and handling data related to security alerts and compliance reports. The Wazuh indexer API is designed to support automation and scalability, offering a flexible approach to accessing and analyzing data for security insights, obtaining operational metrics, and reporting.

Here is a list of some of the Wazuh indexer API capabilities:

-  Index management
-  User management
-  Managing and searching through indexes
-  Log ingestion
-  Manage notifications
-  Manage nodes in a single or multi-node cluster
-  Snapshot and repository management
-  Statistical information collection
-  Error handling
-  Configuration management
-  Index lifecycle management

Take a look at the :doc:`Wazuh indexer API use cases <use-case>` for practical examples of how the Wazuh indexer API can be utilized.

.. topic:: Contents

   .. toctree::
      :maxdepth: 3

      getting-started
      configuration
      securing-indexer-api
      use-case