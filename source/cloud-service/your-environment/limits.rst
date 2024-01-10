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

This limit governs the number of dashboards, visualizations, and queries that can be executed concurrently, as well as their efficiency and impact on performance. While Wazuh Cloud ensures optimal performance and responsiveness, it is important to note that the quality and efficiency of queries, visualizations, and dashboards created by users also play a significant role. Users are responsible for creating well-optimized queries and visualizations to maximize the effectiveness and efficiency of their operations within the Wazuh interface.

API rate limits
^^^^^^^^^^^^^^^

All our APIs have a rate limit in place to prevent abuse and ensure optimal performance and stability. These rate limits define the maximum number of requests that can be made per second to specific APIs. While it is extremely rare to reach these limits, they are in place to protect the system and maintain a smooth experience for all users.

The following APIs have rate limits:

- Agent registration: This limit controls the maximum number of registration requests that can be processed per second, ensuring a seamless onboarding experience for agents connecting to the Wazuh Cloud environment.

- Wazuh API: This limit specifies the maximum number of requests that can be made per second to the Wazuh API, ensuring the stability and availability of the API.

- Indexer API: This limit defines the maximum number of requests that can be made per second to the Wazuh Indexer API, enabling efficient retrieval and manipulation of indexed data.

- Access to the Archived data: This limit determines the maximum number of requests that can be processed per second for accessing archived data, ensuring efficient retrieval of archived data when needed.
