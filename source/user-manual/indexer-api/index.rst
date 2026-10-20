.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh indexer API is an open source RESTful API that allows interaction with the Wazuh indexer. Learn more in this section of the documentation.

Wazuh indexer API
=================

The Wazuh indexer API is an open source RESTful API that allows interaction with the Wazuh indexer from the Wazuh dashboard, a command-line tool such as cURL, or any script or program capable of making web requests. The Wazuh indexer API provides endpoints for managing and querying data within the Wazuh indexer. Using this API, you can search events and findings, manage indexes and data streams, and handle data related to security detections and compliance reports. The Wazuh indexer API supports automation and scalability, offering a flexible approach to accessing and analyzing data for security insights, obtaining operational metrics, and reporting.

The Wazuh indexer API capabilities include the following:

-  Index and data stream management
-  User management
-  Managing and searching through indexes
-  Log ingestion
-  Notification management
-  Node management in a single-node or multi-node cluster
-  Snapshot and repository management
-  Statistical information collection
-  Error handling
-  Configuration management
-  Index lifecycle management
-  Detection content and security analytics management

Refer to the :doc:`Wazuh indexer API reference <reference>` for details about all the Wazuh indexer API endpoints. Take a look at the :doc:`Wazuh indexer API use cases <use-case>` for practical examples of how you can use the Wazuh indexer API.

The Wazuh indexer stores time-based data in data streams and the current state of monitored endpoints in stateful indexes. The examples in this guide query the following index patterns:

+----------------------------------+--------------+-----------------------------------------------------------------------------------------------------------------------------------------+
| **Index pattern**                | **Type**     | **Content**                                                                                                                             |
+==================================+==============+=========================================================================================================================================+
| ``wazuh-events-v5-*``            | Data streams | Normalized events, one data stream per category, such as ``wazuh-events-v5-access-management`` and ``wazuh-events-v5-system-activity``. |
+----------------------------------+--------------+-----------------------------------------------------------------------------------------------------------------------------------------+
| ``wazuh-findings-v5-*``          | Data streams | Findings. Events that match a detection rule, together with the rule metadata.                                                          |
+----------------------------------+--------------+-----------------------------------------------------------------------------------------------------------------------------------------+
| ``wazuh-events-raw-v5``          | Data stream  | All events received from the Wazuh manager, when raw event indexing is enabled. It's disabled by default.                               |
+----------------------------------+--------------+-----------------------------------------------------------------------------------------------------------------------------------------+
| ``wazuh-states-vulnerabilities`` | Index        | Vulnerability detection results.                                                                                                        |
+----------------------------------+--------------+-----------------------------------------------------------------------------------------------------------------------------------------+

.. topic:: Contents

   .. toctree::
      :maxdepth: 3

      getting-started
      configuration
      securing-indexer-api
      use-case
      reference
