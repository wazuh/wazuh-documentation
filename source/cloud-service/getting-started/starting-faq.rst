.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_getting_started_starting_faq:

FAQ
===

.. meta::
  :description: Learn about some FAQ while getting started. 

While running Cloud Service for the some questions may arise. This list answers some of the most frequently asked ones.


- `What is Wazuh Cloud Service?`_

- `Can I try it for free?`_

- `Is it PCI DDS compliant?`_

- `Will I get support?`_

- `Where is Wazuh Cloud Service hosted?`_

- `What is a tier?`_

- `What will happen when I am using all my tier?`_
  
  
What is Wazuh Cloud Service?
----------------------------

Wazuh hosted EDR with several security features.

Can I try it for free?
----------------------

You may sign up for a free trial to test an environment. No credit card is required.

Is it PCI DDS compliant?
------------------------

Yes. Recently, our Wazuh Cloud platform has been validated as PCI DSS Level 1 Service Provider compliant. The validation was provided by a QSA (Qualified Security Assessor) firm qualified by the PCI Security Standards Council to validate an entity’s adherence to PCI DSS. A further detailed explanation can be found `in our blog <https://wazuh.com/blog/wazuh-cloud-platform-achieves-pci-dss-compliance/>`_.

Will I get support?
-------------------

Yes, every environment creation includes a standard support 8/5 with 2 healthchecks per year and 8 hours max. response times. Premium service holds a 24/7 support coverage with 4 healthchecks per year and 4 hours max. response times. Contact us anytime through the **Help** section on your Wazuh Cloud Console.

Where is Wazuh Cloud Service hosted?
------------------------------------

In AWS.

What is a tier?
---------------

A tier is the total size (in GB) of data from the alerts which are available online through your Web User Interface. This data consists of the security messages generated from Wazuh.


What will happen when I am using all my tier?
---------------------------------------------

You will be able to see the most recent data according to your tier. The older information will be rotated to :ref:`cold storage <cloud_glossary_cold_storage>`, where it will be stored for a year with no size limits and easily accessible.

As an example: A user with a 100GB tier that is generating 10GB of alerts per day, will be able to search and visualize the alerts of the last 10 days in the Wazuh WUI. When those 100GB of data are being used, the oldest data is rotated (keeping 100GB of data on the WUI), but will be accessible as cold storage.
