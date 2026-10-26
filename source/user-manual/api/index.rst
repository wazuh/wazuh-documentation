.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh manager API is an open source RESTful API that enables secure interaction with the Wazuh manager component.

Wazuh manager API
=================

The Wazuh manager API is an open source RESTful API that enables secure interaction with the Wazuh manager component. You can interact with it using the built-in API console in the Wazuh dashboard, cURL, or any program that makes web requests.

The Wazuh dashboard relies on the Wazuh manager API to remotely manage the Wazuh manager infrastructure. You can use the Wazuh manager API to perform common tasks such as adding and restarting Wazuh agents, managing agent groups, and managing the Wazuh manager cluster. The Wazuh manager API has no File Integrity Monitoring (FIM) endpoint in Wazuh 5.0. Wazuh 5.0 stores the FIM state of each agent in the Wazuh indexer, in the wazuh-states-fim-files, wazuh-states-fim-registry-keys, and wazuh-states-fim-registry-values indices.

Here is a list of the Wazuh manager API capabilities:

-  Wazuh agent management
-  Agent enrollment token management (create, list, revoke, and purge)
-  Agent and agent group reload
-  On-demand vulnerability scans of Wazuh agents
-  Wazuh manager node information, status, logs, configuration, and restart
-  Cluster control and overview
-  Cluster reload, which restarts the Wazuh manager daemons and keeps active agent connections
-  Node readiness, reported for each Wazuh manager daemon
-  Validity of the TLS certificate that wazuh-manager-remoted serves to Wazuh agents
-  MITRE ATT&CK overview
-  Role-Based Access Control (RBAC)
-  API management (HTTPS, configuration)
-  Users management
-  Statistical information
-  Error handling
-  Wazuh manager node configuration queries

Refer to the :doc:`Wazuh manager API reference </user-manual/api/reference>` for details about all the Wazuh manager API endpoints. For practical, real-world examples of how to use these capabilities, see the :doc:`use cases <use-cases>` section.

.. topic:: Contents

   .. toctree::
      :maxdepth: 2

      getting-started
      requests-responses
      api-examples
      configuration
      securing-api
      rbac/index
      queries
      use-cases
      reference
