.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Get answers to the most frequently asked questions about the Wazuh Cloud in this technical FAQ and get the most out of the Wazuh Cloud service.  

.. _cloud_your_environment_technical_faq:

Technical FAQ
=============

- `How can I send data to my environment?`_

- `Is it possible to change the URL to access the environment?`_

- `What happens if the tier limit is reached?`_

- `What happens if indexed data capacity setting is reached?`_

- `Can I index the archive data again?`_

- `What if I need to change the size of my tier?`_

- `What if I need to upgrade or downgrade a setting?`_

- `What happens if active agents setting is reached?`_

- `What happens if average/peak EPS setting is reached?`_

- `How do I get SSH access to my environment?`_

- `How can I update my environment?`_

- `Can I send syslog data directly to the environment?`_

- `Can I send data directly to the Wazuh indexer of my environment?`_

- `Can I integrate with my Single Sign-On (SSO) method (LDAP, Okta, Active Directories)?`_

- `Do I have access to Wazuh API?`_

- `Do I have access to Wazuh indexer API?`_

- `How can I forward my logs to another solution or SOC?`_

- `Is my environment shared with other customers?`_

- `What are the available regions?`_

How can I send data to my environment?
--------------------------------------

All the communications are performed through Wazuh agents once they are registered to the environment.
  
Is it possible to change the URL to access the environment?
-----------------------------------------------------------

It is possible to get a new URL by opening a support ticket through the **Help** section on the Wazuh Cloud Console, but the previous URL is also kept.

What happens if the tier limit is reached?
------------------------------------------

See :ref:`See What happens if *indexed data capacity* setting is reached? <cloud_technical_faq_change_setting>`


.. _cloud_technical_faq_size_reached:

What happens if indexed data capacity setting is reached?
---------------------------------------------------------

When the selected indexed data capacity is reached, the oldest events will be automatically removed from your index regardless of the index data time. This data is available in archive data for you to access. See the :ref:`Archive data <cloud_your_environment_accessing_archive_data>` section to learn more about data logging and storage.

Can I index the archive data again?
------------------------------------

It's possible to download the data from the archive data and re-index it into your local environments. However, it isn't possible to re-index it in your cloud environment.

What if I need to change the size of my tier?
---------------------------------------------

See :ref:`What if I need to upgrade or downgrade a setting? <cloud_technical_faq_change_setting>`

.. _cloud_technical_faq_change_setting:

What if I need to upgrade or downgrade a setting?
-------------------------------------------------

You can upgrade or downgrade a setting by contacting the Wazuh team through the **Help** section of your Wazuh Cloud Console. See also :ref:`Adjusting environment settings <cloud_settings_adjust>`.

What happens if active agents setting is reached?
-------------------------------------------------

If the maximum number of active agents is reached, the environment may start to malfunction, causing instability with agent connections. While the system can tolerate temporarily exceeding the limit of active agents, appropriate measures will be taken if the situation persists.

What happens if average/peak EPS setting is reached?
-------------------------------------------------------

If the data ingestion is exceeded, events start to queue. If the queue becomes full, Wazuh discards the incoming events, which might lead to event loss. The cloud service automatically manages the queuing mechanism, ensuring optimal resource usage.

How do I get SSH access to my environment?
------------------------------------------

SSH access is not allowed for security reasons. Environments are managed from the Wazuh Cloud Console and Wazuh WUI.

How can I update my environment?
--------------------------------

Wazuh takes care of the updates, so your environment gets the latest version of Wazuh with no downtime.
 
Can I send syslog data directly to the environment?
---------------------------------------------------

No, all the communications are performed through Wazuh agents once they are registered into the environment. However, you have alternative options. For more information on how to forward syslog events to your environment, see the :ref:`Forward syslog events <cloud_your_environment_send_syslog>` section.

Can I send data directly to the Wazuh indexer of my environment?
----------------------------------------------------------------

No, all the communications are performed through Wazuh agents.

Can I integrate with my Single Sign-On (SSO) method (LDAP, Okta, Active Directories)?
----------------------------------------------------------------------------------------

Yes, you can access the Wazuh WUI of your environment through your SSO tool. To perform this action, you need to contact the Wazuh Support team through the **Help** section of your Wazuh Cloud Console.


Do I have access to Wazuh API?
------------------------------

You have access to the **Dev tools** through your Wazuh dashboard, where you can use the API. The Wazuh API is not exposed, but you can contact the Wazuh team through the **Help** section of your Wazuh Cloud Console to allow Wazuh API access from a specific IP address.


Do I have access to Wazuh indexer API?
--------------------------------------

The Wazuh indexer API is not accessible by default. If you want to access it, contact the Wazuh team through the **Help** section of your Wazuh Cloud Console to authorize the connection from a specific IP address. After authorization is granted, you have access to the ``GET`` methods of the Wazuh indexer API.

How can I forward my logs to another solution or SOC?
-----------------------------------------------------

You can download your data from archive data. Then, you can push it to other solutions or Security Operations Center (SOC).

Is my environment shared with other customers?
----------------------------------------------

No, your environment is isolated from other customers. That means your account is the only one with access to your environment.

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
