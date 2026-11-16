.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: This section of the Wazuh documentation explains what a role-based access control system is and how you can use it with Wazuh.

Wazuh RBAC - How to create and map internal users
=================================================

Wazuh Role-Based Access Control (RBAC) allows access to Wazuh resources based on the roles and policies assigned to the users. It is an easy-to-use administration system that enables you to manage users' or entities' permissions to system resources.

The Wazuh platform includes an internal user database for authentication. You can also use it alongside an external authentication system, such as SAML, LDAP, or Active Directory. Learn how to create and map Wazuh users in these sections.

- `Creating and setting a Wazuh admin user`_
- `Creating and setting a Wazuh read-only user`_
- `Creating an internal user and mapping it to Wazuh`_
- `Limiting a user to one agent group`_


Creating and setting a Wazuh admin user
---------------------------------------

Follow these steps to create an internal user, create a new role mapping, and give administrator permissions to the user.

#. Log in to the Wazuh dashboard as an administrator.

#. Click the upper-left menu icon **☰** to open the options, go to **Indexer management** > **Users and data access**, and then **Internal users** to open the internal users page.

   .. thumbnail:: /images/manual/user-administration/rbac/internal-user.jpg
      :title: Internal users page
      :alt: Internal users page
      :align: center
      :width: 80%

#. Click **Create internal user**, provide a username and password, type ``admin`` as the Backend role, and click **Create** to complete the action. A backend role is a role name that the Wazuh indexer maps to its own roles in ``roles_mapping.yml``. The default mapping gives the ``admin`` backend role the ``all_access`` role.

#. To map the user with Wazuh, follow these steps:

   #. Click the upper-left menu icon **☰** to open the menu on the Wazuh dashboard, go to **Server management** > **API access control**, and then **Roles mapping** to open the page.

      .. thumbnail:: /images/manual/user-administration/rbac/role-mapping.jpg
         :title: Wazuh role mapping
         :alt: Wazuh role mapping
         :align: center
         :width: 80%

   #. Click **Create Role mapping** and complete the empty fields with the following parameters:

      - **Role mapping name**: Assign a name to the role mapping.
      - **Roles**: Select ``administrator``.
      - **Internal users**: Select the internal user created previously.

   #. Click **Save role mapping** to save and map the user with Wazuh as *administrator*.

   #. With ``run_as`` set to true, the Wazuh dashboard calls the Wazuh manager API on behalf of the logged-in user, so the Wazuh manager API applies the role mapping of that user. It is true by default. Check that ``wazuh_core.hosts.default.run_as`` is true in ``/etc/wazuh-dashboard/opensearch_dashboards.yml``.

   #. If you changed ``run_as`` in the previous step, restart the Wazuh dashboard. A role mapping applies at once, without a restart:

      .. include:: /_templates/common/restart_dashboard.rst

Creating and setting a Wazuh read-only user
-------------------------------------------

Follow these steps to create an internal user, create a new role mapping, and give read-only permissions to the user.

#. Log in to the Wazuh dashboard as an administrator.

#. Click the upper-left menu icon **☰** to open the options, go to **Indexer management** > **Users and data access**, and then **Internal users** to open the internal users page.

   .. thumbnail:: /images/manual/user-administration/rbac/internal-user.jpg
      :title: Internal users page
      :alt: Internal users page
      :align: center
      :width: 80%

#. Click **Create internal user**, provide a username and password, and click **Create** to complete the action.

#. To map the user to the appropriate role, follow these steps:

   #. Click the upper-left menu icon **☰** to open the options, go to **Indexer management** > **Users and data access**, and then **Roles** to open the roles page.

   #. Click **Create role**, complete the empty fields with the following parameters, and then click **Create** to complete the task.

      - **Name**: Assign a name to the role.
      - **Cluster permissions**: ``cluster_composite_ops_ro``
      - **Index**: ``*``
      - **Index permissions**: ``read``

   #. Select the **Mapped users** tab and click **Manage mapping**.

   #. Add the user you created in the previous steps and click **Map** to confirm the action.

#. To map the user with Wazuh, follow these steps:

   #. Click **☰** to open the menu on the Wazuh dashboard, go to **Server management** > **API access control**, and then **Roles mapping** to open the page.

      .. thumbnail:: /images/manual/user-administration/rbac/role-mapping.jpg
         :title: Wazuh role mapping
         :alt: Wazuh role mapping
         :align: center
         :width: 80%

   #. Click **Create Role mapping** and complete the empty fields with the following parameters:

      - **Role mapping name**: Assign a name to the role mapping.
      - **Roles**: Select ``readonly``.
      - **Internal users**: Select the internal user created previously.

   #. Click **Save role mapping** to save and map the user with Wazuh as *read-only*.

   #. With ``run_as`` set to true, the Wazuh dashboard calls the Wazuh manager API on behalf of the logged-in user, so the Wazuh manager API applies the role mapping of that user. It is true by default. Check that ``wazuh_core.hosts.default.run_as`` is true in ``/etc/wazuh-dashboard/opensearch_dashboards.yml``.

   #. If you changed ``run_as`` in the previous step, restart the Wazuh dashboard. A role mapping applies at once, without a restart:

      .. include:: /_templates/common/restart_dashboard.rst

   .. note::

      The read-only user can't change anything, and some pages show a permission error or an empty list: **Index Management**, **Snapshot Management**, **Notifications**, **Reporting**, **API access control**, and **Log test**. To give the user read access to Reporting, Notifications, and Snapshot Management, also map the user to the ``reports_read_access``, ``notifications_read_access``, and ``snapshot_management_read_access`` roles in **Indexer management** > **Users and data access** > **Roles**. Index Management has no read-only role. Log test needs the ``cluster:monitor/content_manager/logtest`` permission, which no built-in role includes. Don't map the user to the ``kibana_user`` role, because it gives write access to the Wazuh dashboard configuration.

Creating an internal user and mapping it to Wazuh
-------------------------------------------------

Follow these steps to create an internal user and map it to a role of your choice.

#. Log in to the Wazuh dashboard as an administrator.

#. Click the upper-left menu icon **☰** to open the options, go to **Indexer management** > **Users and data access**, and then **Internal users** to open the internal users page.

   .. thumbnail:: /images/manual/user-administration/rbac/internal-user.jpg
      :title: Internal users page
      :alt: Internal users page
      :align: center
      :width: 80%

#. Click **Create internal user**, provide a username and password, and click **Create** to complete the action.

#. To map the user to a given role, follow these steps:

   #. Click the upper-left menu icon **☰** to open the options, go to **Indexer management** > **Users and data access**, and then **Roles** to open the roles page. Then select the role you want to map the user to.

   #. Select the **Mapped users** tab and click **Manage mapping**.

   #. Add the user you created in the previous steps and click **Map** to confirm the action.

#. To map the user with Wazuh, follow these steps:

   #. Click **☰** to open the menu on the Wazuh dashboard, go to **Server management** > **API access control**, and then **Roles mapping** to open the page.

      .. thumbnail:: /images/manual/user-administration/rbac/role-mapping.jpg
         :title: Wazuh role mapping
         :alt: Wazuh role mapping
         :align: center
         :width: 80%

   #. Click **Create Role mapping** and complete the empty fields with the following parameters:

      - **Role mapping name**: Assign a name to the role mapping.
      - **Roles**: Select the Wazuh roles that you want to map the user to.
      - **Internal users**: Select the internal user created previously.

      Wazuh includes default roles, such as ``administrator``, ``readonly``, ``agents_admin``, and ``cluster_readonly``. You can also create custom policies and roles to suit your needs.

   #. Click **Save role mapping** to save and map the user with Wazuh.

   #. With ``run_as`` set to true, the Wazuh dashboard calls the Wazuh manager API on behalf of the logged-in user, so the Wazuh manager API applies the role mapping of that user. It is true by default. Check that ``wazuh_core.hosts.default.run_as`` is true in ``/etc/wazuh-dashboard/opensearch_dashboards.yml``.

   #. If you changed ``run_as`` in the previous step, restart the Wazuh dashboard. A role mapping applies at once, without a restart:

      .. include:: /_templates/common/restart_dashboard.rst

Limiting a user to one agent group
----------------------------------

Follow these steps to let an internal user see only the Wazuh agents of one group, and their findings and events. Replace ``<GROUP>`` with the group name.

#. Click **☰** to open the menu, go to **Server management** > **API access control**, and then **Policies**. Click **Create policy** and set these parameters in **New policy**:

   -  **Policy name**: a name for the policy.
   -  **Action**: select ``agent:read`` and click **Add**.
   -  **Resource**: select ``agent:group``, type ``<GROUP>`` in **Resource identifier**, and click **Add**.
   -  **Select an effect**: select the ``allow`` effect.

   Click **Create policy**.

   .. thumbnail:: /images/manual/user-administration/rbac/new-policy-agent-group.png
      :title: New policy form
      :alt: New policy form with empty Policy name, Action, Resource, Resource identifier and Select an effect fields
      :align: center
      :width: 80%

#. Go to **Roles**, click **Create role**, enter a **Role name**, and select the policy from step 1 in **Policies**. Save the role.

#. Go to **Roles mapping** and click **Create Role mapping**. Enter a **Role mapping name**, select the role from step 2 in **Roles**, select the user in **Internal users**, and click **Save role mapping**.

#. Go to **Indexer management** > **Users and data access** > **Roles** and click **Create role**. Enter a **Name** and add ``cluster_composite_ops_ro`` in **Cluster permissions**. Add two index permissions:

   -  **Index** ``*wazuh-findings-v5*`` and ``*wazuh-events-v5*``, **Index permissions** ``read``, and the document-level security query ``{"term": {"wazuh.agent.groups": "<GROUP>"}}``.
   -  **Index** ``wazuh-states-*``, ``*wazuh-metrics-*``, ``*wazuh-active-responses*``, and ``.kibana*``, **Index permissions** ``read``.

   Click **Create**. On the **Mapped users** tab, click **Manage mapping**, add the user, and click **Map**.

   **Agents management** > **Summary** then lists only the agents of ``<GROUP>``. **Threat Hunting** and the other modules then show only their findings and events.

   .. thumbnail:: /images/manual/user-administration/rbac/agents-management-summary-restricted.png
      :title: Agents management summary restricted to one agent group
      :alt: Agents management summary listing a single agent, Ubuntu24
      :align: center
      :width: 80%

Each finding keeps the groups its agent had when the finding was created. Findings created before the agent joined ``<GROUP>`` stay hidden from the user. Map the user only to roles that use this query on these indices. A role that reads them without the query gives access to every document.
