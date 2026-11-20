.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Check the terms used in Wazuh Cloud and Wazuh Console, such as organization, environment, Cloud ID, indexed data, archive data, and feeds.

.. _cloud_service_glossary:

Glossary
========

This glossary defines the terms used in Wazuh Cloud and Wazuh Console.

.. contents::
   :local:
   :depth: 2
   :backlinks: none

Active agents
-------------

The **Active Agents** setting defines the maximum number of Wazuh agents that can be connected to an environment at the same time. The allowed values range from 100 to 10,000.

API key
-------

An API key is a secret token that authenticates requests to the Wazuh Console API on behalf of your organization. Editors create and delete API keys in the **API Keys** tab of the **Organization** page. API keys do not expire. See :doc:`Authentication </cloud-service/apis/authentication>`.

.. _cloud_glossary_archive_data:

Archive data
------------

Archive data is the output that Wazuh generates, such as alerts and archives, stored in an AWS S3 bucket. It lets you keep logs for long periods and meet compliance requirements. You can download it with temporary credentials from the Wazuh Console API. See :doc:`Archive data </cloud-service/archive-data/index>`.

Archive data retention
----------------------

The **Archive Data Retention** setting defines how long an environment keeps its archive data. The allowed values are 1, 3, 6, 12, and 24 months.

.. _cloud_glossary_cloud_id:

Cloud ID
--------

The Cloud ID is the unique identifier of a Wazuh Cloud environment. It is a 12-character string of lowercase letters and digits. Wazuh Console shows it in the **ID** field of the environment details page. It is also part of the environment URL and of the archive data path. Also called environment ID.

Deployment
----------

A deployment is a Wazuh installation registered to your organization to receive threat intelligence from the Wazuh CTI service. Wazuh Console lists deployments under **CTI** > **Deployments**.

Editor
------

Editor is the organization role with full access. Editors can create and change environments, manage billing, invite members, and create API keys.

.. _cloud_glossary_environment:

Environment
-----------

An environment is a deployment of all the Wazuh central components, ready to use and running on Wazuh Cloud. Each environment has its own Wazuh dashboard, settings, and subscription.

EPS
---

Events per second (EPS) is the rate of events that an environment can analyze. Wazuh Console recommends an **EPS** value for the settings you select.

Feed
----

A feed is a stream of threat intelligence that your deployments pull from the Wazuh CTI service.

-  **Open Feed**: Free for every deployment. Some content arrives with a delay.
-  **Professional Feed**: Paid. Content arrives without delay. It requires a seat assigned to the deployment.

.. _cloud_glossary_hot_storage:

Indexed data
------------

Indexed data is the data available in the Wazuh dashboard. It contains the information that Wazuh indexes as soon as it ingests the events that agents send, so you can search and analyze it.

Wazuh calculates indexed data using the primary shards of the ``wazuh-*`` indices.

Indexed data capacity
---------------------

The **Indexed Data Capacity** setting defines the maximum size, in GB, of the indexed data of an environment. Wazuh Console recommends a value based on the other settings.

Indexed data retention
----------------------

The **Indexed Data Retention** setting defines how long an environment keeps its indexed data. The allowed values range from 1 to 6 months.

Organization
------------

An organization groups the users, environments, deployments, subscriptions, and API keys of a company. Wazuh Console creates an organization automatically the first time you sign in, named after your company. You can belong to more than one organization and switch between them from the header.

.. _cloud_glossary_region:

Region
------

A region is the geographic area where the data center that hosts your environment is located. You cannot change the region after you create an environment. Choose a region close to you to reduce latency.

Available regions:

.. include:: /_templates/cloud-service-regions.rst

Seat
----

A seat is a Professional Feed subscription that you assign to one deployment. A seat has no effect until you assign it to a deployment.

.. TODO: Confirm with engineering that each Wazuh Cloud environment includes a Professional Feed seat. Wazuh Console lists "Professional Feed seat included" among the Wazuh Cloud benefits.

Each Wazuh Cloud environment includes a Professional Feed seat.

Subscription
------------

A subscription is the recurring payment for an environment or for Professional Feed seats. Environment subscriptions are billed monthly or yearly. Editors manage subscriptions under **Billing** > **Subscriptions**.

Support plan
------------

The **Support Plan** setting defines the level of technical support for an environment. The available plans are Standard and Premium.

Trial
-----

A trial is a free Wazuh Cloud environment that lasts 14 days. Your organization can have one active trial at a time. See :doc:`Start a trial </cloud-service/getting-started/start-trial>`.

Viewer
------

Viewer is the organization role with read-only access. Viewers can see environments and deployments, but they cannot change them or open billing pages.

Wazuh Cloud
-----------

Wazuh Cloud is the software as a service (SaaS) offering of Wazuh. It hosts and manages Wazuh environments for you.

Wazuh Console
-------------

Wazuh Console is the web application at https://console.pro.cloud.wazuh.com that you use to manage your organization, Wazuh Cloud environments, CTI deployments and feeds, and billing.

.. _cloud_glossary_wazuh_cloud_api:

Wazuh Console API
-----------------

The Wazuh Console API is the application programming interface of Wazuh Console. You can use it, for example, to get credentials to access the archive data of an environment. See :doc:`Wazuh Console API </cloud-service/apis/index>`.
