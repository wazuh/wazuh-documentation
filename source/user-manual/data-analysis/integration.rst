.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: An integration is a logical grouping of decoders, KVDBs, and rules that belong to a common log source or product. Learn how to create one in this section.

.. _data_analysis_integration:

Integration
===========

An integration is a logical grouping of decoders, KVDBs, and rules that belong to a common log source or product. Every decoder must belong to exactly one integration and integrations are the unit you use to organize, enable, and order content.

Follow these steps to create an integration:

#. Navigate to the **Ruleset management** > **Overview** page and ensure you are in the draft space.

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

The category assigned to an integration is applied to all events decoded by that integration's decoders. This value is stored in the ``wazuh.integration.category`` field for every processed event and used during the output stage to route events to the appropriate data stream, such as ``wazuh-events-v5-cloud-services``.
