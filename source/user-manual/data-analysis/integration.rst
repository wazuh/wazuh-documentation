.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: An integration is a logical grouping of decoders, KVDBs, and rules that belong to a common log source or product. Learn how to create one in this section.

.. _data_analysis_integration:

Integration
===========

An integration is a logical grouping of decoders, KVDBs, and rules that belong to a common log source or product. Every decoder must belong to exactly one integration and integrations are the unit you use to organize, enable, and order content.

Follow these steps to create an integration:

#. Navigate to the **Ruleset Management** > **Overview** page and ensure you are in the draft space.

#. Click the **Actions** drop-down under **Integrations** and select **Create**.

   .. thumbnail:: /images/manual/data-analysis/ruleset-management-integration.png
      :title: Create an integration
      :alt: Create an integration
      :align: center
      :width: 80%

#. Fill in the information according to your requirements and click **Create integration**.

   .. thumbnail:: /images/manual/data-analysis/ruleset-management-create-integration.png
      :title: Create integration form
      :alt: Create integration form
      :align: center
      :width: 80%

Each integration must be assigned a category. The available categories are described in the following table:

+-------------------+--------------------------------------------------------------+
| Category          | Description                                                  |
+===================+==============================================================+
| Access Management | Authentication, authorization, identity, and access events   |
+-------------------+--------------------------------------------------------------+
| Applications      | Application-layer events (web servers, databases,            |
|                   | middleware, etc.)                                            |
+-------------------+--------------------------------------------------------------+
| Cloud Services    | Events from cloud provider services (AWS, Azure, GCP, etc.)  |
+-------------------+--------------------------------------------------------------+
| Network Activity  | Network-level events (firewalls, proxies, DNS, flow logs,    |
|                   | etc.)                                                        |
+-------------------+--------------------------------------------------------------+
| Security          | Security platform and tooling events (EDR, SIEM feeds,       |
|                   | scanners, etc.)                                              |
+-------------------+--------------------------------------------------------------+
| System Activity   | Operating system and host-level events (audit logs, syslog,  |
|                   | etc.)                                                        |
+-------------------+--------------------------------------------------------------+
| Other             | Events that do not fit any of the above categories           |
+-------------------+--------------------------------------------------------------+
| Unclassified      | Catch-all category for events that no other integration      |
|                   | classifies. These events are stored in the                   |
|                   | ``wazuh-events-v5-unclassified`` data stream only when       |
|                   | unclassified event indexing is enabled for the space         |
+-------------------+--------------------------------------------------------------+

The category assigned to an integration is applied to all events decoded by that integration's decoders. This value is stored in the ``wazuh.integration.category`` field for every processed event and used during the output stage to route events to the appropriate data stream, such as ``wazuh-events-v5-cloud-services``.

Supported log sources
---------------------

The Wazuh standard space includes integrations for more than 120 log sources, such as operating systems, network devices, cloud services, security products, applications, and databases. Each integration includes the decoders that parse the logs of one product and normalize them into Wazuh Common Schema fields. Some integrations also include rules. The rules in the ``normalized-*`` integrations, such as ``normalized-authentication`` and ``normalized-threats``, detect activity in normalized events from any log source.

A small set of integrations is enabled by default, including the integrations for Wazuh capabilities, Windows, Linux, and macOS system logs, the Linux Audit daemon, and Apache HTTP Server. A disabled integration doesn't decode incoming events or apply its rules, so enable the integration of each product you collect logs from.

Follow these steps to find and enable the integration for a log source:

#. Navigate to **Ruleset Management** > **Overview** and select the **Standard** space. The **Integrations** table lists every integration with its category, mode, status, and number of rules, decoders, and KVDBs.

   .. thumbnail:: /images/manual/data-analysis/ruleset-management-standard-integrations.png
      :title: Integrations table in the Standard space
      :alt: Integrations table in the Standard space
      :align: center
      :width: 80%

#. Search for the product name, or filter the table by **Category** or **Status**. For example, search for ``cisco`` to list the Cisco integrations.

   .. thumbnail:: /images/manual/data-analysis/ruleset-management-search-integrations.png
      :title: Search for an integration
      :alt: Search for an integration
      :align: center
      :width: 80%

#. Click the integration title to open its details. The **Rules**, **Decoders**, and **KVDBs** tabs list the content that the integration includes.

   .. thumbnail:: /images/manual/data-analysis/ruleset-management-integration-details.png
      :title: Integration details
      :alt: Integration details
      :align: center
      :width: 80%

#. Click **Actions** and select **Enable**. It can take a few minutes for the change to apply.

   .. thumbnail:: /images/manual/data-analysis/ruleset-management-enable-integration.png
      :title: Enable an integration
      :alt: Enable an integration
      :align: center
      :width: 80%

#. Validate the integration with a sample log from the product using :ref:`Log test <data_analysis_validate_log_test>` in the Standard space. The ``wazuh.integration.name`` field of the result shows the integration that decoded the event.

   .. thumbnail:: /images/manual/data-analysis/ruleset-management-logtest-integration.png
      :title: Log test result for an integration
      :alt: Log test result for an integration
      :align: center
      :width: 80%

After you enable the integration, configure the Wazuh agent or the Wazuh manager to collect the logs of the product.
