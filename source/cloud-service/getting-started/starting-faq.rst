.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Get answers to the most frequently asked questions about Wazuh Cloud: trials, billing, compliance, hosting, support, and data limits.

.. _cloud_starting_faq:

Cloud service FAQ
=================

This page answers common questions about Wazuh Cloud, its trial, billing, hosting, support, and data limits.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

What is Wazuh Cloud?
--------------------

Wazuh Cloud is the software as a service (SaaS) edition of Wazuh. It provides a hosted platform for all Wazuh central components. You create an environment in Wazuh Console, enroll Wazuh agents, and use security information and event management (SIEM) and extended detection and response (XDR) capabilities to monitor security events, investigate alerts, and respond to incidents.

What is Wazuh Console?
----------------------

Wazuh Console, at `https://console.pro.cloud.wazuh.com <https://console.pro.cloud.wazuh.com>`__, is the web application where you manage your organization, members, environments, subscriptions, and invoices. See :doc:`Wazuh Console overview </cloud-service/getting-started/console-overview>`.

Can I try it for free?
----------------------

Yes. You can :doc:`start a 14-day free trial </cloud-service/getting-started/start-trial>`. Your organization can have one active trial at a time, and can start another trial 90 days after the previous one started.

Do I need a credit card to start a trial?
-----------------------------------------

No. A payment method is optional when you create a trial. You can add one later with **Edit trial**, or buy the environment at any time during the trial.

Will I be charged when my trial is over?
----------------------------------------

We don't charge you during the trial. What happens when it ends depends on the payment method:

-  If the trial has a payment method, it becomes a paid environment and we charge the price you selected.
-  If the trial has no payment method, the environment and its data are deleted when the trial ends.

We send you reminder emails 7 days and 2 days before the trial ends. If no agent connects to the trial environment within 4 days, the trial is cancelled and the environment is terminated.

Is Wazuh Cloud PCI DSS compliant?
---------------------------------

Yes. Wazuh Cloud is validated as a PCI DSS Level 1 Service Provider.

Is Wazuh Cloud SOC 2 compliant?
-------------------------------

Yes, Wazuh Cloud complies with SOC 2 standards.

.. _cloud_getting-started_support:

How can I get support?
----------------------

Go to **Help** > **Support** in Wazuh Console:

-  Organizations with a paid environment or subscription use **Access Support Portal** to open tickets with our engineers.
-  During a trial, use **Contact us** to send a request to our team.
-  To talk to our sales team, use **Contact sales**.

See :doc:`Support </cloud-service/support>`.

Where is Wazuh Cloud hosted?
----------------------------

Wazuh Cloud is hosted on Amazon Web Services (AWS).

Which regions are available?
----------------------------

You select the region when you create an environment, and you can't change it later. The following regions are available:

.. include:: /_templates/cloud-service-regions.rst

What is a setting?
------------------

A setting is a configuration option for a Wazuh Cloud environment, such as **Active Agents**, **EPS**, or **Indexed Data Retention**. Settings define the limits and functionality of the environment, and they determine its price. See :doc:`Settings </cloud-service/your-environment/settings>`.

What is the indexed data?
-------------------------

Indexed data is the data available on the Wazuh dashboard. Wazuh ingests events from agents, indexes them, and makes them searchable and analyzable.

What is the archive data?
-------------------------

Wazuh archives data in an AWS S3 bucket for long-term storage. Unlike indexed data, archive data is not searchable or analyzable. It consists of compressed files. For more information, see the :doc:`Archive data </cloud-service/archive-data/index>` section.

.. _cloud_starting_faq_data_reached:

What happens if the indexed data capacity setting is reached?
-------------------------------------------------------------

When the indexed data capacity is reached, Wazuh automatically removes the oldest events from the index. The removed data remains available as archive data. See the :doc:`Archive data </cloud-service/archive-data/index>` section to learn more.

How is indexed data rotated?
----------------------------

Rotation depends on two settings: indexed data retention and indexed data capacity. For example, with 3-month retention and 100 GB capacity, if you use 100 GB in the first month, rotation starts immediately. If you use only 20 GB, data from month one rotates at month four.

What happens if the EPS limit is exceeded?
------------------------------------------

.. TODO: Confirm with engineering that the queue-then-discard behavior still applies to the single EPS setting of Wazuh Console environments.

If incoming events per second exceed the **EPS** setting of your environment, events queue. When the queue is full, Wazuh discards incoming events, which can cause event loss. The environment details page shows **Limit exceeded** in the **Events per second (EPS)** chart when this happens.

Can I increase my settings?
---------------------------

Yes. Use **Edit settings** on the environment details page to increase the settings of a paid environment. To lower a setting or change the billing period, contact support. See :doc:`Settings </cloud-service/your-environment/settings>`.

Can I cancel at any time?
-------------------------

Yes. You can cancel at any time with no penalty. A cancelled paid environment stays available until the end of the current billing period, and no future charges are incurred after this period. A cancelled trial environment is deleted right away. See :doc:`Cancel an environment </cloud-service/your-environment/cancel-environment>`.
