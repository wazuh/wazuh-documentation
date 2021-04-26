.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_your_environment_technical_faq:

Technical FAQ
=============

.. meta::
  :description: Learn about some technical FAQ. 

This frequently-asked-questions list answers some of your more common questions about configuring Wazuh Cloud environments.

- `How can I send data to my environment?`_

- `Is it possible to change the URL to access the environment?`_

- `What will happen when I use my full tier?`_

- `Can I move from cold storage to hot storage data?`_

- `What if I need to change the size of my tier?`_

- `How do I get SSH access to my environment?`_

- `How can I update my environment?`_

- `How can I connect my agents without Internet access to my environment?`_

- `Can I send syslog data directly to the environment?`_

- `Can I send data directly to Elasticsearch?`_

- `Can I integrate with my Single Sign-On (SSO) method (LDAP, Okta, Active Directories)?`_

- `Do I have access to Wazuh API?`_

- `Do I have access to Elasticsearch API?`_

- `How can I forward my logs to another solution or SOC?`_

How can I send data to my environment?
--------------------------------------

All the communications will be performed through Wazuh agents once they are registered into the environment.
  
Is it possible to change the URL to access the environment?
-----------------------------------------------------------

It is possible to get a new URL by opening a support ticket, but the previous URL will be kept too.

What will happen when I use my full tier?
-----------------------------------------

When the tier is reached, the oldest events disappear from your index. Events removed from your index are still available in cold storage.

Can I move from cold storage to hot storage data?
--------------------------------------------------------------------

It is possible to :ref:`download the data from the cold storage<cloud_your_environment_accessing_cold_storage>` and re-index it into your local environments but not in your cloud environment.

What if I need to change the size of my tier?
---------------------------------------------

You can upgrade or downgrade the tier by contacting our team on the **Help** section of your Wazuh Cloud Console.

How do I get SSH access to my environment?
------------------------------------------

SSH access is not allowed for security reasons. Environments are managed from the Wazuh Cloud Console and Wazuh WUI.

How can I update my environment?
--------------------------------

We take care of the updates so your environment will get the latest version of Wazuh with no downtime.

How can I connect my agents without Internet access to my environment?
----------------------------------------------------------------------

See our guide to :ref:`connecting agents without Internet access<cloud_your_environment_agents_without_internet>`.
  
Can I send syslog data directly to the environment?
---------------------------------------------------

No, it is not possible due to security reasons as that information is plain data. However, you have several options explained on the :ref:`Forward syslog events to Wazuh <cloud_your_environment_send_syslog>` section.

Can I send data directly to Elasticsearch?
----------------------------------------------------------------------

No, all the communications will be performed through Wazuh agents.

Can I integrate with my Single Sign-On (SSO) method (LDAP, Okta, Active Directories)?
----------------------------------------------------------------------------------------

Yes, you can access the Wazuh WUI of your environment through your SSO. Address us through the **Help** section and we will take care of it.


Do I have access to Wazuh API?
------------------------------

You have access to the Dev tools through your Wazuh WUI where you can use the API. Wazuh API is not exposed, but you may contact us through the **Help** section to allow Wazuh API access from a specific IP.


Do I have access to Elasticsearch API?
--------------------------------------

Elasticsearch API is not accessible by default. In case you want to access it, address us through the **Help** section and we will authorize the connection from a specific IP. Then you will have access to ``GET`` methods of your Elasticsearch API.


How can I forward my logs to another solution or SOC?
-----------------------------------------------------

You can download your data by :ref:`accessing cold storage<cloud_your_environment_accessing_cold_storage>`. Then, you will be able to push it to other solutions or Security Operations Center (SOC).
