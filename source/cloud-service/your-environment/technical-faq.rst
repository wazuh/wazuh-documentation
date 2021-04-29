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

- `Can I move data from cold to hot storage?`_

- `What if I need to change the size of my tier?`_

- `How do I get SSH access to my environment?`_

- `How can I update my environment?`_

- `How can I connect my agents without Internet access to my environment?`_

- `Can I send syslog data directly to the environment?`_

- `Can I send data directly to the Elasticsearch of my environment?`_

- `Can I integrate with my Single Sign-On (SSO) method (LDAP, Okta, Active Directories)?`_

- `Do I have access to Wazuh API?`_

- `Do I have access to Elasticsearch API?`_

- `How can I forward my logs to another solution or SOC?`_

- `Is my environment shared with other customers?`_

- `What are the available regions?`_

How can I send data to my environment?
--------------------------------------

All the communications will be performed through Wazuh agents once they are registered into the environment.
  
Is it possible to change the URL to access the environment?
-----------------------------------------------------------

It is possible to get a new URL by opening a support ticket, but the previous URL will be kept too.

What will happen when I use my full tier?
-----------------------------------------

When the tier is reached, the oldest events disappear from your index. Events removed from your index are still available in cold storage.

Can I move data from cold to hot storage?
-----------------------------------------

It is possible to download the data from the cold storage and re-index it into your local environments but, at this moment, it is not possible to re-index it in your cloud environment.

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

No, all the communications will be performed through Wazuh agents. Check out our guide about :ref:`how to forward syslog events to Wazuh Cloud <cloud_your_environment_send_syslog>`.

Can I send data directly to the Elasticsearch of my environment?
----------------------------------------------------------------------

No, all the communications will be performed through Wazuh agents.

Can I integrate with my Single Sign-On (SSO) method (LDAP, Okta, Active Directories)?
----------------------------------------------------------------------------------------

Yes, you can access the Wazuh WUI of your environment through your SSO tool. Address us through the **Help** section and we will take care of it.


Do I have access to Wazuh API?
------------------------------

You have access to the Dev tools through your Wazuh WUI where you can use the API. Wazuh API is not exposed, but you may contact us through the **Help** section to allow Wazuh API access from a specific IP address.


Do I have access to Elasticsearch API?
--------------------------------------

Elasticsearch API is not accessible by default. In case you want to access it, address us through the **Help** section and we will authorize the connection from a specific IP address. Then you will have access to ``GET`` methods of the Elasticsearch API.


How can I forward my logs to another solution or SOC?
-----------------------------------------------------

You can download your data from cold storage. Then, you will be able to push it to other solutions or Security Operations Center (SOC).

Is my environment shared with other customers?
----------------------------------------------

No, your environment is isolated from other customers. That means you are the only customer using the Wazuh components of your environment.

What are the available regions?
-------------------------------

Available regions are:

* North Virginia: ``us-east-1``
  
* Ohio: ``us-east-2``

* London: ``eu-west-2``

* Frankfurt: ``eu-central-1``

* Singapore: ``ap-southeast-1``
