.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh server API is an open source RESTful API that allows interaction with the Wazuh manager. Learn more in this section of the documentation.

Wazuh server API
================

The Wazuh server API is an open source RESTful API that allows interaction with the Wazuh manager from a web browser, a command-line tool such as cURL, or any script or program capable of making web requests. The Wazuh dashboard relies on the Wazuh server API to remotely manage the Wazuh server infrastructure. You can utilize the Wazuh server API to perform common tasks such as adding agents, restarting the manager(s) or agent(s), or looking up details about File Integrity Monitoring (FIM).

Here is a list of the Wazuh server API capabilities:

-  Wazuh agent management
-  Wazuh manager control and overview
-  Cluster control and overview
-  File integrity monitoring control and search
-  MITRE ATT&CK and CIS-CAT overview
-  Ruleset information
-  Testing and verification of rules and decoders
-  Syscollector information
-  Role-Based Access Control (RBAC)
-  API management (HTTPS, configuration)
-  Users management
-  Statistical information
-  Error handling
-  Query remote configuration

Refer to the :doc:`Wazuh server API reference </user-manual/api/reference>` for details about all the Wazuh server API endpoints. Also consider :doc:`use cases <use-cases>` for example usage of the Wazuh server API.

.. topic:: Contents

   .. toctree::
      :maxdepth: 2

      getting-started
      configuration
      securing-api
      rbac/index
      queries
      use-cases
      reference
