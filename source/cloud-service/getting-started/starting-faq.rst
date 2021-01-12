.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_getting_started_starting_faq:

FAQ
===

.. meta::
  :description: Learn about some FAQ while getting started. 

While starting with Cloud Service some questions may arise. This list answers some of the most frequently asked ones.


- `What is Wazuh Cloud Service?`_

- `Can I try it for free?`_

- `Will I be charged when my trial is over?`_
  
- `Is it PCI DDS compliant?`_

- `How can I get support?`_

- `How can I get help?`_

- `Where is Wazuh Cloud Service hosted?`_

- `What is a tier?`_

- `What will happen when I use all of my tier?`_

- `Can I cancel at any time?`_  

- `What if I have more questions?`_
  
What is Wazuh Cloud Service?
----------------------------

Wazuh hosted EDR Service. It is Wazuh Cloud platform for threat detection, integrity monitoring, incidence response and regulatory compliance. Supports unlimited endpoints, provides a managed infrastructure, threat intelligence feed, and includes professional support.

Can I try it for free?
----------------------

You may :ref:`sign up for a free trial<cloud_getting_started_sign_up>` to test an environment. No credit card is required.

Will I be charged when my trial is over?
----------------------------------------

No. No credit card is required for your trial, so you will only be charged if you decide to keep using our service beyond the trial period.


Is it PCI DDS compliant?
------------------------

Yes. Our Wazuh Cloud platform has been validated as PCI DSS Level 1 Service Provider compliant. The validation was provided by a QSA (Qualified Security Assessor) firm qualified by the PCI Security Standards Council to validate an entity’s adherence to PCI DSS. `Contact us <https://wazuh.com/cloud/>`_ if you want to know more about our AoC. Learn more about this `in our blog <https://wazuh.com/blog/wazuh-cloud-platform-achieves-pci-dss-compliance/>`_.

.. _cloud_getting_started_support:

How can I get support?
----------------------

Every environment will get standard support since the moment billing details are added. This support includes 8/5 coverage, 2 healthchecks per year, 8 hours maximum response times, and support via JIRA. We also offer premium support with 24/7 coverage, 4 healthchecks per year and 4 hours maximum response times. Learn more about this `here <https://wazuh.com/cloud/>`_.

How can I get help?
-------------------

Contact us anytime through the **Help** section on your Wazuh Cloud Console.

Where is Wazuh Cloud Service hosted?
------------------------------------

In AWS. This allows us to provide a quality service guaranteed by Amazon Web Services. We include regions such as:

- US east (N. Virginia, Ohio)

- Europe (London, Frankfurt)

- Asia Pacific (Singapore)

What is a tier?
---------------

A tier is the total size (in GB) of data from the alerts and archives which are available online through your Web User Interface. This data consists of the threat inteligence feed generated from Wazuh.


What will happen when I use all of my tier?
---------------------------------------------

You will be able to see the most recent data according to your tier. The older information will be removed so the total visible data matches your tier. You will still be able to access older data as :ref:`cold storage <cloud_glossary_cold_storage>`, where it will be stored for a year with no size limits and will be easily accessible.

As an example: A user with a 100GB tier that is generating 10GB of alerts per day, will be able to search and visualize the alerts of the last 10 days in the Wazuh WUI (10GB/day x 10 days = 100GB). When those 100GB of data are exceeded, the oldest data is rotated (keeping 100GB of total data on the WUI), but will remain accessible as cold storage for a year.

Can I cancel at any time?
-------------------------

Sure. You can cancel at any time with no penalty. You will be able to keep using our service until the end of the current period and won't be charged afterwards.

What if I have more questions?
------------------------------

We would be happy to answer them. Do you have questions regarding the service? Fill the form `here <https://wazuh.com/cloud/>`_. Already using or testing our service? Address us through the **Help** section on your Wazuh Cloud Console.
