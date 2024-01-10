.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Get answers to the most frequently asked questions about the Wazuh Cloud in this FAQ. Explore the potential of the Wazuh Cloud service.

.. _cloud_getting-started_starting_faq:

Cloud service FAQ
=================

.. meta::
  :description: Get answers to the most frequently asked questions about the Wazuh Cloud in this FAQ. What is Wazuh Cloud, how to start your free trial, is Wazuh PCI DSS compliant, and more. 



- `What is Wazuh Cloud?`_

- `Can I try it for free?`_

- `Will I be charged when my trial is over?`_
  
- `Is it PCI DDS compliant?`_

- `Is it SOC 2 compliant?`_

- `How can I get support?`_

- `Where is Wazuh Cloud hosted?`_

- `What is a profile?`_

- `What is a setting?`_

- `What is the indexed data?`_

- `What is the archived data?`_

- `What is a tier?`_

- `What happens if the tier limit is reached?`_

- `What happens if the indexed data capacity setting is reached?`_

- `How is indexed data rotated?`_

- `What happens if the average/peak EPS is exceeded?`_

- `Can I cancel at any time?`_
  
What is Wazuh Cloud?
--------------------

Wazuh Cloud provides a comprehensive solution by hosting and managing all Wazuh components within a single integrated platform. Wazuh cloud allows you to create your environment and enroll Wazuh agents. By leveraging Wazuh, you gain access to security capabilities, including Security Information and Event Management (SIEM) and Extended Detection and Response (XDR).


Can I try it for free?
----------------------

Yes, Wazuh provides a free trial to create a cloud environment and access the Wazuh Cloud service. You can :ref:`sign up for a 14-day free trial <cloud_sign_up>`, and no credit card information is required to complete this process.


Will I be charged when my trial is over?
----------------------------------------

No, Wazuh does not request credit card information to start your trial. Charges are only applied if you keep using the service beyond the trial period.

Is it PCI DDS compliant?
------------------------

Yes, the Wazuh Cloud platform is validated as PCI DSS Level 1 Service Provider compliant.

Is it SOC 2 compliant?
----------------------

Yes, the Wazuh Cloud platform is compliant with SOC 2 standards.

.. _cloud_getting-started_support:

How can I get support?
----------------------

Every environment includes support after the first payment. You can contact the Wazuh team anytime through the Help section on your Wazuh Cloud Console. You can also fill out `this form <https://wazuh.com/wazuh-cloud-info/>`_ to get help from the Wazuh team.

Where is Wazuh Cloud hosted?
----------------------------

Wazuh Cloud is hosted on Amazon Web Services (AWS).

What is a profile?
------------------

A profile refers to predefined settings available for configuring your Wazuh Cloud environment. We offer three profiles: Small, Medium, and Large. They provide ready-to-use environment templates that cater to different needs and requirements. If none of these predefined profiles meet your specific requirements, you can configure your settings individually.

What is a setting?
------------------

In the context of Wazuh Cloud, a setting  refers to each configuration option available for a cloud environment. These settings determine the limitations and functionalities of an environment. For example, the "Active Agents" setting specifies the maximum number of active agents allowed in your environment. Note that the settings chosen for an environment directly impact its pricing, as they affect the resources allocated and functionalities available.

What is the indexed data?
-------------------------

The indexed data, previously known as hot storage, includes the data available on the Wazuh WUI, which corresponds to the information indexed by Wazuh. This information becomes searchable and analyzable as soon as Wazuh ingests and indexes the events sent by the agents.

What is the archived data?
--------------------------

This Wazuh generated data is archived in an AWS S3 bucket for long-term storage purposes. Unlike the indexed data, this data is not searchable or analyzable. It simply consists of a collection of compressed files. For more information, please see the :ref:`Archived data <cloud_your_environment_accessing_archived_data>` section.

What is a tier?
---------------

The concept of a tier, which represents the size limitation, in bytes, of the indexed data (formerly known as hot storage), is no longer used. It has been replaced by the *indexed data capacity* setting.

What happens if the tier limit is reached?
------------------------------------------

See :ref:`What happens if the indexed data capacity setting is reached? <cloud_starting_faq_data_reached>`.

.. _cloud_starting_faq_data_reached:

What happens if the indexed data capacity setting is reached?
-------------------------------------------------------------

When the selected **indexed data capacity** is reached, the oldest events will be automatically removed from your index regardless of the **index data time**. This data is available in archived data for you to access. See the :ref:`Archived data <cloud_your_environment_accessing_archived_data>` section to learn more about data logging and storage.

How is indexed data rotated?
----------------------------

Data rotation is determined by two conditions: the indexed data retention and the indexed data capacity. For instance, if you have set a 3-month indexed data retention and a 100GB indexed data capacity, and you consume the entire 100GB within the first month, the data will start rotating. Similarly, even if you have not utilized all 100GB, the data from the first month will be rotated by the fourth month if only 20GB is used.

What happens if the average/peak EPS is exceeded?
----------------------------------------------------

If you send more events per second than allowed by the **average/peak EPS** setting, events start queuing, and if the queue becomes full, the incoming events will be discarded, which may lead to potential event loss.

Can I cancel at any time?
-------------------------

Yes, you can cancel at any time with no penalty. You can keep using your environment until the end of your :doc:`current billing cycle </cloud-service/account-billing/billing-history>`, and no future charges are incurred after this period.
