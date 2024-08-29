.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Tenants in the Wazuh dashboard are containments for saving index patterns, visualizations, dashboards, and other objects. Learn more in this section of the documentation.

Enabling multi-tenancy
======================

Tenants in the Wazuh dashboard are containments for saving index patterns, visualizations, dashboards, and other objects. Tenants are useful for safely sharing your work with other users. You can control which roles have access to a tenant and whether those roles have read or write access. By default, all the Wazuh dashboard users have access to two independent tenants:

-  Global: This tenant is shared between every Wazuh dashboard user.
-  Private: This tenant is exclusive to each user and can’t be shared. Users in the private tenant can’t access routes or index patterns made by users in the global tenant.
-  Custom: Administrators can create custom tenants and assign them to specific roles. Once created, these tenants can then provide spaces for specific groups of users.

Configuration
-------------

Perform the following instructions below on the Wazuh dashboard to enable multi-tenancy.

#. Edit the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` configuration file and make the following changes:

   -  Set the ``opensearch_security.multitenancy.enabled`` setting to ``true``.
   -  Add the following line:

      .. code-block:: yaml

         opensearch_security.multitenancy.tenants.preferred: ["Global", "Private"]

   This setting lets you change ordering in the **Tenants** tab of the Wazuh dashboard. By default, the list starts with global and private (if enabled) and then proceeds alphabetically. You can add tenants here to move them to the top of the list.

   .. code-block:: yaml

      opensearch.requestHeadersAllowlist: ["securitytenant","Authorization"]
      opensearch_security.multitenancy.enabled: true
      opensearch_security.multitenancy.tenants.preferred: ["Global", "Private"]
      opensearch_security.readonly_mode.roles: ["kibana_read_only"]

   -  Additionally, you can edit the ``uiSettings.overrides.defaultRoute`` to set a default tenant, for example, global, each time a user logs in.

      .. code-block:: yaml

         uiSettings.overrides.defaultRoute: /app/wz-home?security_tenant=global

#. Restart the Wazuh dashboard so changes can take effect.

   .. include:: /_templates/common/restart_dashboard.rst
