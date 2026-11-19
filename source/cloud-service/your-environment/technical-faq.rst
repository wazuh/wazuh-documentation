.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Get answers to frequently asked technical questions about Wazuh Cloud environments, such as limits, access, APIs, regions, and statuses.

Technical FAQ
=============

This page answers frequently asked technical questions about Wazuh Cloud environments.

- `How can I send data to my environment?`_
- `Can I change the URL to access the environment?`_
- `What happens if the indexed data capacity is reached?`_
- `Can I index the archive data again?`_
- `How can I upgrade or downgrade a setting?`_
- `What happens if the active agents setting is reached?`_
- `What happens if the EPS setting is reached?`_
- `Can I get SSH access to my environment?`_
- `How is my environment updated?`_
- `Can I send data directly to the Wazuh indexer of my environment?`_
- `Can I use Single Sign-On (SSO)?`_
- `Do I have access to the Wazuh server API?`_
- `Do I have access to the Wazuh indexer API?`_
- `How can I forward my data to another solution or SOC?`_
- `Is my environment shared with other customers?`_
- `What are the available regions?`_
- `What statuses can my environment have?`_

How can I send data to my environment?
--------------------------------------

Your environment receives data through the Wazuh agents enrolled in it. See :doc:`Enroll agents </cloud-service/getting-started/enroll-agents>`.

Can I change the URL to access the environment?
-----------------------------------------------

Yes. You can configure your own domain name for the environment from Wazuh Console. The default URL keeps working. See :doc:`Custom DNS </cloud-service/your-environment/custom-dns>`.

.. _cloud_technical_faq_size_reached:

What happens if the indexed data capacity is reached?
-----------------------------------------------------

When the indexed data reaches the **Indexed Data Capacity** setting, Wazuh removes the oldest indices, regardless of the **Indexed Data Retention** setting. The removed data remains available as archive data. See :doc:`Archive data </cloud-service/archive-data/index>` and :doc:`Monitor usage </cloud-service/your-environment/monitor-environment-usage>`.

Can I index the archive data again?
-----------------------------------

You can download the archive data and index it again in your own local Wazuh deployment. You can't index it again in your Wazuh Cloud environment.

.. _cloud_technical_faq_change_setting:

How can I upgrade or downgrade a setting?
-----------------------------------------

You can increase the settings of a paid environment from Wazuh Console with **Edit settings**. To lower a setting or to switch between monthly and yearly billing, contact Wazuh support. See :ref:`Upgrading a paid environment <cloud_settings_adjust>`.

What happens if the active agents setting is reached?
-----------------------------------------------------

If more agents are active than the **Active Agents** setting allows, agent connections can become unstable. The environment tolerates a temporary surplus, but if it persists, upgrade the setting or reduce the number of active agents.

What happens if the EPS setting is reached?
-------------------------------------------

When the incoming event rate exceeds the **EPS** setting, events queue. When the queue is full, Wazuh drops the events above the limit, and those events are lost. The **Events per second (EPS)** chart on the environment details page shows **Limit exceeded** when this happens.

Can I get SSH access to my environment?
---------------------------------------

No. For security reasons, SSH and shell access aren't available. You manage the environment from Wazuh Console and work with your data in the Wazuh dashboard. See :doc:`Limitations </cloud-service/your-environment/limitations>`.

How is my environment updated?
------------------------------

Wazuh manages the updates of your environment. You can't change the Wazuh version yourself. The **Version** of each environment appears on the **Environments** page.

.. TODO: Confirm with engineering whether Wazuh version updates of cloud environments cause downtime and how customers are notified.

Can I send data directly to the Wazuh indexer of my environment?
----------------------------------------------------------------

No. Your environment receives data through Wazuh agents.

Can I use Single Sign-On (SSO)?
-------------------------------

Wazuh Console doesn't support SSO. To authenticate Wazuh dashboard users with an external identity provider, contact Wazuh support. See :doc:`Authentication and authorization </cloud-service/your-environment/manage-auth>`.

Do I have access to the Wazuh server API?
-----------------------------------------

You can use the Wazuh server API from **Dev Tools** in the Wazuh dashboard. The Wazuh server API isn't exposed outside the environment by default. To request access from a specific IP address, contact Wazuh support. See :doc:`Limitations </cloud-service/your-environment/limitations>`.

Do I have access to the Wazuh indexer API?
------------------------------------------

The Wazuh indexer API isn't exposed by default. To request access from a specific IP address, contact Wazuh support. When access is granted, you can use the ``GET`` methods of the Wazuh indexer API. See :doc:`Limitations </cloud-service/your-environment/limitations>`.

.. TODO: Confirm with engineering that server and indexer API access on request (by source IP, GET only for the indexer) applies to Wazuh Cloud 5.0 environments.

How can I forward my data to another solution or SOC?
-----------------------------------------------------

Download your data from the archive data and send it to the other solution or Security Operations Center (SOC). See :doc:`Archive data </cloud-service/archive-data/index>`.

Is my environment shared with other customers?
----------------------------------------------

No. Your environment is isolated from other customers, and only your organization has access to it.

.. TODO: Confirm with engineering the isolation statement for 5.0 environments, which share load balancers between environments.

What are the available regions?
-------------------------------

.. include:: /_templates/cloud-service-regions.rst

If you aren't sure which region to choose, select the one closest to your location. This usually reduces latency. You can't change the region after you create the environment.

What statuses can my environment have?
--------------------------------------

See :ref:`Environment statuses <cloud_environment_details_statuses>`.
