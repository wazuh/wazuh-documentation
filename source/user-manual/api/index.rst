.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh server API is an open source RESTful API that enables secure interaction with the Wazuh server infrastructure. Learn more in this section of the documentation.

Wazuh server API
================

The Wazuh server API is an open source RESTful API that enables secure interaction with the Wazuh server infrastructure. You can interact with it using the built-in API console in the Wazuh dashboard, a command-line tool such as cURL, or any script or program capable of making web requests.

The Wazuh dashboard relies on the Wazuh server API to remotely manage the Wazuh server infrastructure. You can utilize the Wazuh server API to perform common tasks such as adding agents, restarting the manager(s) or agent(s), or retrieving detailed File Integrity Monitoring (FIM) events and status, managing users, roles, and permissions and more.

Here is a list of the Wazuh server API capabilities:

-  Wazuh agent management
-  Wazuh manager control and overview
-  Cluster control and overview
-  File integrity monitoring control and search
-  MITRE ATT&CK overview
-  Ruleset information
-  Testing and verification of rules and decoders
-  Syscollector information
-  Role-Based Access Control (RBAC)
-  API management (HTTPS, configuration)
-  Users management
-  Statistical information
-  Error handling
-  Query remote configuration

Refer to the :doc:`Wazuh server API reference </user-manual/api/reference>` for details about all the Wazuh server API endpoints. For practical, real-world examples of how to use these capabilities, see the :doc:`use cases <use-cases>` section.

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
