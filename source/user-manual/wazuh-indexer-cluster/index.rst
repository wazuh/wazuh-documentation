.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh indexer cluster consists of multiple Wazuh indexer nodes that work together to store and process platform data. Learn more in this section of the documentation.

Wazuh indexer cluster
=====================

The Wazuh indexer cluster consists of multiple Wazuh indexer nodes that work together to store and process platform data. Deploying the Wazuh indexer as a cluster provides horizontal scalability, high availability, and improved performance.

The Wazuh indexer is the central data store of the Wazuh platform. It stores normalized events, vulnerability data, inventory data, and other platform information as JSON documents organized into data streams and indices. It also hosts platform modules such as Setup, Content Manager, Reporting, Security Analytics, Notifications, and Alerting. Detection workflows and content management run on the Wazuh indexer, so proper cluster sizing and operation are essential for a healthy Wazuh deployment.

Data is distributed across shards and replica shards on multiple indexer nodes. This distribution improves query performance, enables horizontal scaling, and keeps the Wazuh event and state data available during node or hardware failures.

.. toctree::
   :titlesonly:

   cluster-architecture-and-node-types
   required-ports
   cluster-configuration
   add-wazuh-indexer-nodes/index
   cluster-management
   removing-a-wazuh-indexer-node
   troubleshooting
