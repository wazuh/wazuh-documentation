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

- `What is a tier?`_

- `What happens if the tier limit or indexed data size setting is reached?`_

- `Can I cancel at any time?`_  

- `How can I get help?`_
  
What is Wazuh Cloud?
--------------------

Wazuh Cloud hosts and manages all the Wazuh components in one integrated platform, you simply need to access your environment and deploy the Wazuh agent to your endpoints. Wazuh provides protection with *Security Information and Event Management* (SIEM) and *Endpoint Detection and Response* (EDR).


Can I try it for free?
----------------------

Yes, Wazuh provides a free trial for you to create a cloud environment and access the Wazuh Cloud. You can :ref:`sign up for a 14-day free trial <cloud_sign_up>`, and no credit card information is required to complete this process.

Will I be charged when my trial is over?
----------------------------------------

No, Wazuh does not request credit card information to start your trial. Charges are only applied if you decide to keep using the service beyond the trial period.

Is it PCI DDS compliant?
------------------------

Yes, the Wazuh Cloud platform is validated as PCI DSS Level 1 Service Provider compliant.

Is it SOC 2 compliant?
----------------------

Yes, the Wazuh Cloud platform is compliant with SOC 2 standards.

.. _cloud_getting-started_support:

How can I get support?
----------------------

Every environment includes support after the first payment.

Where is Wazuh Cloud hosted?
----------------------------

Wazuh Cloud is hosted on Amazon Web Services (AWS).

What is a profile?
------------------

A profile refers to a predefined set of settings that you can choose from when configuring your Wazuh Cloud environment. We have three profiles available: Small, Medium, and Large. These profiles are designed to simplify the process by providing preconfigured settings that cater to different needs and requirements. If none of the predefined profiles meet your specific requirements, you can configure your settings individually.

What is a setting?
------------------

A setting in the context of Wazuh Cloud refers to each of the configuration options available for a cloud environment. These settings determine the limitations and capabilities of an environment. For example, the "Active Agents" setting specifies the maximum number of active agents allowed in your environment. It's important to note that the settings chosen for an environment directly impact its pricing, as they affect the resources allocated and functionalities available.

What is a tier?
---------------

The concept of a tier, which represents the size limitation, in bytes, of the hot storage, is no longer used. It has been replaced by the *indexed data size* setting.

What happens if the tier limit or indexed data size setting is reached?
-----------------------------------------------------------------------

When the tier limit or indexed data size setting is reached, the oldest events will be automatically removed from your index. This data is available in cold storage for you to access. See the :ref:`Cold storage <cloud_your_environment_accessing_cold_storage>` section to learn more about data logging and storage.

Can I cancel at any time?
-------------------------

Yes, you can cancel at any time with no penalty. You can keep using your environment until the end of your :doc:`current billing cycle </cloud-service/account-billing/billing-history>`, and no future charges are incurred after this period.

How can I get help?
-------------------

You can contact the Wazuh team anytime through the **Help** section on your Wazuh Cloud Console. You can also fill out `this form <https://wazuh.com/cloud/#subscription>`_ to get help from the Wazuh team.