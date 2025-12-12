.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Get answers to the most frequently asked questions about the Wazuh Cloud in this FAQ.

Cloud service FAQ
=================

.. contents::
   :local:
   :depth: 1
   :backlinks: none

What is Wazuh Cloud?
--------------------

Wazuh Cloud hosts and manages all the Wazuh central components in a single platform. You create an environment, enroll Wazuh agents, and use capabilities such as security information and event management (SIEM) and extended detection and response (XDR).

Can I try it for free?
----------------------

Yes, you can :doc:`sign up for a 14-day free trial <sign-up-trial>`. No credit card is required.

Will I be charged when my trial is over?
----------------------------------------

No. We do not charge you during the trial. After the trial expiration, the default payment method will be charged. You will receive a reminder 7 days before the trial expiration. Make sure you add your billing information, otherwise your environment will be deleted completely on the expiration date.

Is Wazuh Cloud PCI DSS compliant?
----------------------------------

Yes. Wazuh Cloud is validated as a PCI DSS Level 1 Service Provider.

Is Wazuh Cloud SOC 2 compliant?
--------------------------------

Yes, Wazuh Cloud complies with SOC 2 standards.

.. _cloud_getting-started_support:

How can I get support?
----------------------

Support is included after your first payment. Contact us from the **Help** section in the Wazuh Cloud Console. You can also fill out `this form <https://wazuh.com/wazuh-cloud-info/>`__ to get help from the Wazuh team.

Where is Wazuh Cloud hosted?
----------------------------

Wazuh Cloud is hosted on Amazon Web Services (AWS).

What is a profile?
------------------

A profile is a predefined set of settings for a Wazuh Cloud environment. We offer three profiles: Small, Medium, and Large. They provide ready-to-use environment templates that cater to different needs and requirements. If none fits your requirements, configure the settings individually.

What is a setting?
------------------

A setting is a configuration option for a Wazuh Cloud environment. Settings define limits and functionality. For example, the Active agents setting specifies the maximum number of active agents in your environment. Your chosen settings affect pricing.

What is the indexed data?
-------------------------

Indexed data (previously hot storage) is the data available on the Wazuh dashboard. Wazuh ingests events from agents, indexes them, and makes them searchable and analyzable.

What is the archive data?
--------------------------

Wazuh archives data in an AWS S3 bucket for long‑term storage. Unlike indexed data, archive data is not searchable or analyzable. It consists of compressed files. For more information, see the :doc:`Archive data <../archive-data/index>` section.

What happens if the tier limit is reached?
------------------------------------------

See :ref:`cloud_starting_faq_data_reached`.

.. _cloud_starting_faq_data_reached:

What happens if the indexed data capacity setting is reached?
-------------------------------------------------------------

When the indexed data capacity is reached, Wazuh automatically removes the oldest events from the index. The removed data remains available as archive data. See the :doc:`Archive data <../archive-data/index>` section to learn more.

How is indexed data rotated?
----------------------------

Rotation depends on two conditions: indexed data retention and indexed data capacity. For example, with 3‑month retention and 100 GB capacity, if you use 100 GB in the first month, rotation starts immediately. If you use only 20 GB, data from month one rotates at month four.

What happens if the average/peak EPS is exceeded?
--------------------------------------------------

If incoming events per second exceed the average/peak EPS setting, events queue. When the queue is full, Wazuh discards new events, which can cause event loss.

Can I increase the average/peak EPS?
------------------------------------

See :doc:`Adjusting environment settings <../your-environment/settings>`.

Can I cancel at any time?
-------------------------

Yes. You can cancel at any time with no penalty. You can use your environment until the end of your :doc:`current billing cycle </cloud-service/account-billing/billing-history>`, and no future charges are incurred after this period.