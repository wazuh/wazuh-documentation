.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about Wazuh Cloud limits. 

Limits
======

Wazuh Cloud defines limits for key metrics that affect performance and capacity. You cannot change these limits. If an environment reaches a limit, the service might restrict activity. Contact Wazuh Support for help.

Limit definitions
-----------------

The following limits apply to specific functionality and APIs in Wazuh Cloud.

Dashboards, visualizations, and queries
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This limit governs concurrent execution of dashboards, visualizations, and queries. Wazuh Cloud maintains performance and responsiveness, but user‑created queries and visualizations also affect efficiency. Optimize your queries and visualizations to improve performance.

API rate limits
^^^^^^^^^^^^^^^

APIs include rate limits to prevent abuse and maintain performance and stability. A rate limit sets the maximum requests per second for a given API. Hitting these limits is rare. They protect the system and help ensure a smooth experience.

The following APIs have rate limits:

-  **Agent registration**: This controls the maximum rate of registration requests processed per second, ensuring a seamless onboarding process for agents connecting to the Wazuh Cloud environment.

-  **Wazuh server API**: This specifies the maximum requests allowable per second to the Wazuh server API, ensuring its stability and availability.

-  **Wazuh indexer API**: This sets the maximum requests allowed per second to the Wazuh indexer API, enabling efficient retrieval and manipulation of indexed data.

-  **Access to the Archive data**: This sets the maximum requests processed per second for accessing archive data, ensuring efficient retrieval when necessary.
