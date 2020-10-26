.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_getting_started_starting_faq:

FAQ
===

.. meta::
  :description: Learn about some FAQ while getting started. 

While starting with Cloud Service some questions may arise. This list answers some of the most frequently asked ones.


- `What is Wazuh Cloud Service?`_

- `Can I try it for free?`_

- `Is it PCI DDS compliant?`_

- `How can I get help?`_

- `Where is Wazuh Cloud Service hosted?`_

- `What is a tier?`_

- `What will happen when I use all of my tier?`_
  
  
What is Wazuh Cloud Service?
----------------------------

Wazuh hosted EDR Service. It is Wazuh Cloud platform for threat detection, integrity monitoring, incidence response and regulatory compliance. Supports unlimited endpoints, provides a managed infrastructure, threat intelligence feed, and includes professional support.

Can I try it for free?
----------------------

You may :ref:`sign up for a free trial<cloud_getting_started_sign_up>` to test an environment. No credit card is required.

Is it PCI DDS compliant?
------------------------

Yes. Our Wazuh Cloud platform has been validated as PCI DSS Level 1 Service Provider compliant. The validation was provided by a QSA (Qualified Security Assessor) firm qualified by the PCI Security Standards Council to validate an entity’s adherence to PCI DSS. A further detailed explanation can be found `in our blog <https://wazuh.com/blog/wazuh-cloud-platform-achieves-pci-dss-compliance/>`_.

How can I get help?
-------------------

Contact us anytime through the **Help** section on your Wazuh Cloud Console.

Where is Wazuh Cloud Service hosted?
------------------------------------

In AWS. This allows us to provide a quality service guaranteed by Amazon Web Services. We include regions such as  US east, US west, Europe or Asia Pacific.

What is a tier?
---------------

A tier is the total size (in GB) of data from the alerts which are available online through your Web User Interface. This data consists of the threat inteligence feed generated from Wazuh.


What will happen when I use all of my tier?
---------------------------------------------

You will be able to see the most recent data according to your tier. The older information will be removed so the total visible data matches your tier. You will still be able to access older data as :ref:`cold storage <cloud_glossary_cold_storage>`, where it will be stored for a year with no size limits and will be easily accessible.

As an example: A user with a 100GB tier that is generating 10GB of alerts per day, will be able to search and visualize the alerts of the last 10 days in the Wazuh WUI (10GB/day x 10 days = 100GB). When those 100GB of data are being used, the oldest data is rotated (keeping 100GB of total data on the WUI), but will remain accessible as cold storage for a year.
