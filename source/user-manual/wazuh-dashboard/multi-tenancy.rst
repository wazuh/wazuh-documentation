.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Tenants are useful for safely sharing your work with other users. Learn how to enable multi-tenancy in the Wazuh dashboard. 
  

Enabling multi-tenancy
======================
        
Tenants in the Wazuh dashboard are spaces for saving index patterns, visualizations, dashboards, and other objects. Tenants are useful for safely sharing your work with other users. You can control which roles have access to a tenant and whether those roles have read or write access. By default, all the Wazuh dashboard users have access to two independent tenants:

   - Global: This tenant is shared between every Wazuh dashboard user.

   - Private: This tenant is exclusive to each user and can’t be shared. You can’t use it to access routes or index patterns made by the user’s global tenant.

 

Configuration
-------------

To enable multi-tenancy, follow the instructions below. 

#. Edit the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` configuration file and make the following changes: 
 
   - Set the ``opensearch_security.multitenancy.enabled`` setting to `true`. 

   - Add the following line: ``opensearch_security.multitenancy.tenants.preferred: ["Global", "Private"]``. 

     This setting lets you change ordering in the Tenants tab of the Wazuh dashboard. By default, the list starts with global and private (if enabled) and then proceeds alphabetically. You can add tenants here to move them to the top of the list.

    .. code-block:: yaml
      :emphasize-lines: 2,3

       opensearch.requestHeadersAllowlist: ["securitytenant","Authorization"]
       opensearch_security.multitenancy.enabled: true
       opensearch_security.multitenancy.tenants.preferred: ["Global", "Private"]
       opensearch_security.readonly_mode.roles: ["kibana_read_only"]

    Additionally, you can edit the ``uiSettings.overrides.defaultRoute`` to set a default tenant, for example, `global`, each time a user logs in. 

    .. code-block:: yaml
      :emphasize-lines: 1

        uiSettings.overrides.defaultRoute: /app/wazuh?security_tenant=global

#. Restart the Wazuh dashboard so changes can take effect. 

   .. include:: /_templates/common/restart_dashboard.rst
