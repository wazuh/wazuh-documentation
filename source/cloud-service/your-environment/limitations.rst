.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the access restrictions and fixed platform limits that apply to Wazuh Cloud environments.

Limitations
===========

Wazuh Cloud is a software as a service (SaaS) platform. Wazuh manages the infrastructure, scaling, updates, and security hardening of your environment. This page describes the access restrictions and fixed limits that keep the platform secure and stable for every customer.

If you need functionality beyond these defaults, contact Wazuh support. In Wazuh Console, in the sidebar, under **Help**, select **Support**.

Access through the Wazuh dashboard only
---------------------------------------

You work with your environment through the Wazuh dashboard and the connections your Wazuh agents use. You manage the environment itself, including its settings, custom DNS, and subscription, through Wazuh Console.

No shell or infrastructure access
---------------------------------

You don't have command-line, shell, or SSH access to the infrastructure of your environment. You can't edit configuration files or restart services directly.

Restricted API access
---------------------

-  The Wazuh server API and the Wazuh indexer API aren't exposed by default.
-  You can request access to these APIs through Wazuh support.
-  Even when access is enabled, write operations through the Wazuh indexer API aren't permitted.

Wazuh version updates
---------------------

Wazuh manages updates of your environment. You can't upgrade or change the Wazuh version of your environment yourself. The **Version** of each environment appears on the **Environments** page.

Region
------

You choose the region when you create the environment. You can't change it afterward.

Settings changes
----------------

You can increase the settings of a paid environment from Wazuh Console with **Edit settings**. To lower a setting or to switch between monthly and yearly billing, contact Wazuh support. See :doc:`Settings </cloud-service/your-environment/settings>`.

Platform limits
---------------

Wazuh Cloud applies fixed limits that you can't change. If your environment reaches one of them, the platform might restrict activity. Contact Wazuh support if this affects your work.

-  **Dashboards, visualizations, and queries**: the number of dashboards, visualizations, and queries that run at the same time is limited. Optimize your queries and visualizations to improve performance.
-  **API rate limits**: the following operations have a maximum number of requests per second:

   -  Agent enrollment.
   -  Requests to the Wazuh server API.
   -  Requests to the Wazuh indexer API.
   -  Access to archive data.

These limits protect the platform, and most environments never reach them.
