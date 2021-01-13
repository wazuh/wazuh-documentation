.. Copyright (C) 2020 Wazuh, Inc.

.. _release_4_0_4:

4.0.4 Release notes
===================

This section lists the changes in version 4.0.4. More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/4.0.4/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/v4.0.4-7.9.3/CHANGELOG.md>`_


Wazuh core
----------

Added
^^^^^

**API**

- Missing secure headers for API responses to fulfill the OWASP recommendations.
- New option to disable uploading configurations containing remote commands. 

Changed 
^^^^^^^

**API**

- Deprecated endpoints to restore and update API configuration file.

Fixed
^^^^^

**API**

- Spec regexes for paths used in /manager/files and /cluster/{node_id}/files endpoints.

**Framework**

- Bug with add_manual(agents) function when authd is disabled.

**Core**

- The purge of the Redhat vulnerabilities database before updating it. 


Wazuh Kibana plugin
-------------------

Added
^^^^^

- Support for Wazuh v4.0.4.
