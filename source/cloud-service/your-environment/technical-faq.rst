.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Get answers to the most frequently asked questions about the Wazuh Cloud in this technical FAQ and get the most out of the Wazuh Cloud service.  

.. _cloud_your_environment_technical_faq:

Technical FAQ
=============

- `How can I send data to my environment?`_

- `Is it possible to change the URL to access the environment?`_

- `What happens if the tier limit is reached?`_

- `Can I move data from cold to hot storage?`_

- `What if I need to change the size of my tier?`_

- `How do I get SSH access to my environment?`_

- `How can I update my environment?`_

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

All the communications are performed through Wazuh agents once they are registered into the environment.
  
Is it possible to change the URL to access the environment?
-----------------------------------------------------------

It is possible to get a new URL by opening a support ticket through the **Help** section on the Wazuh Cloud Console, but the previous URL is also kept.

What happens if the tier limit is reached?
------------------------------------------

When the tier limit is reached, the oldest events are removed from your index. This data is available in cold storage for you to access. To learn more about data logging and storage, see the :ref:`Cold storage <cloud_your_environment_accessing_cold_storage>` section.

Can I move data from cold to hot storage?
-----------------------------------------

It is possible to download the data from the cold storage and reindex it into your local environments, but at this moment it is not possible to reindex it in your cloud environment.

What if I need to change the size of my tier?
---------------------------------------------

You can upgrade or downgrade the tier by contacting the Wazuh team through the **Help** section of your Wazuh Cloud Console.

How do I get SSH access to my environment?
------------------------------------------

SSH access is not allowed for security reasons. Environments are managed from the Wazuh Cloud Console and Wazuh WUI.

How can I update my environment?
--------------------------------

Wazuh takes care of the updates so your environment gets the latest version of Wazuh with no downtime.
 
Can I send syslog data directly to the environment?
---------------------------------------------------

No, all the communications are performed through Wazuh agents once they are registered into the environment. However, you have alternative options. For more information on how to forward syslog events to your environment, see the :ref:`Forward syslog events <cloud_your_environment_send_syslog>` section.

Can I send data directly to the Elasticsearch of my environment?
----------------------------------------------------------------------

No, all the communications are performed through Wazuh agents.

Can I integrate with my Single Sign-On (SSO) method (LDAP, Okta, Active Directories)?
----------------------------------------------------------------------------------------

Yes, you can access the Wazuh WUI of your environment through your SSO tool. To perform this action, you need to contact the Wazuh team through the **Help** section of your Wazuh Cloud Console.


Do I have access to Wazuh API?
------------------------------

You have access to the **Dev tools** through your Wazuh WUI where you can use the API. Wazuh API is not exposed, but you can contact the Wazuh team through the **Help** section of your Wazuh Cloud Console to allow Wazuh API access from a specific IP address.


Do I have access to Elasticsearch API?
--------------------------------------

Elasticsearch API is not accessible by default. If you want to access it, contact the Wazuh team through the **Help** section of your Wazuh Cloud Console to authorize the connection from a specific IP address. After authorization is granted, you have access to ``GET`` methods of the Elasticsearch API.


How can I forward my logs to another solution or SOC?
-----------------------------------------------------

You can download your data from cold storage. Then, you can push it to other solutions or Security Operations Center (SOC).

Is my environment shared with other customers?
----------------------------------------------

No, your environment is isolated from other customers. That means that your account is the only one with access to your environment.

What are the available regions?
-------------------------------

Available regions:

* North Virginia: ``us-east-1``
  
* Ohio: ``us-east-2``

* London: ``eu-west-2``

* Frankfurt: ``eu-central-1``

* Mumbai: ``ap-south-1``

* Singapore: ``ap-southeast-1``

* Sydney: ``ap-southeast-2``

When selecting a region to host your environment, if you are not sure which one is the best option for you, select one that is the closest to your location since this typically reduces latency for indexing and search requests.
