.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about Wazuh Cloud limits. 

Limits
======

The Wazuh Cloud service sets predefined limits for specific key metrics that affect your environment performance and capacity. These limits cannot be directly configured by users. If an environment reaches these limits, there might be restrictions in normal service functioning. In case of any issues arising from these limitations, contact the Wazuh support team for assistance and guidance for resolution.


Limit definitions
-----------------

The following are the limits associated with specific functionalities and APIs in the Wazuh Cloud service.

Dashboards, visualizations, and queries
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This limit governs the concurrent execution of dashboards, visualizations, and queries, affecting their efficiency and performance impact. While Wazuh Cloud ensures optimal performance and responsiveness, it's important to note that the quality and efficiency of user-created queries, visualizations, and dashboards also play a significant role. Users are responsible for creating well-optimized queries and visualizations to maximize the effectiveness and efficiency of their operations within the Wazuh interface.

API rate limits
^^^^^^^^^^^^^^^

All our APIs incorporate a rate limit to prevent abuse and ensure optimal performance and stability. This limit sets the maximum allowable number of requests per second for specific APIs. Although reaching this limit is extremely rare, they serve as a safeguard to protect the system and maintain a smooth experience for all users.

The following APIs have rate limits:

-  **Agent registration**: This limit controls the maximum rate of registration requests processed per second, ensuring a seamless onboarding process for agents connecting to the Wazuh Cloud environment.

-  **Wazuh API**: This limit specifies the maximum requests allowable per second to the Wazuh API, ensuring its stability and availability.

-  **Indexer API**: This limit sets the maximum requests allowed per second to the Wazuh Indexer API, enabling efficient retrieval and manipulation of indexed data.

-  **Access to the Archive data**: This limit sets the maximum requests processed per second for accessing archive data, ensuring efficient retrieval when necessary.
