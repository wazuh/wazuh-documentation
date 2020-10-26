.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_your_environment_technical_faq:

Technical FAQ
=============

.. meta::
  :description: Learn about some technical FAQ. 

While configuring an environment some questions may arise. This list gathers some of the most frequently asked questions about this topic.

- `How can I send data to my environment?`_

- `Is it possible to change the URL to access the environment?`_

- `What happens if I consume all the data of my tier?`_

- `Can I move from cold storage (offline) to hot storage (online) data?`_

- `What if I need to change the size of my tier?`_

- `Will Elasticsearch's replica shards consume data of my tier?`_

- `How do I get SSH access to my environment?`_

- `How can I update my environment?`_

- `How can I connect my agents without Internet access to my environment?`_

- `Can I send syslog data directly to the environment?`_

- `Can I send data directly to Elasticsearch (Filebeat, Metricbeat, etc)?`_

- `How can I configure email alerts?`_

- `Can I integrate with my Single Sign-On (SSO) method?`_

- `Do I have access to Wazuh or Elasticsearch API?`_

How can I send data to my environment?
--------------------------------------

All the communications will be sent through Wazuh agents. This way it is guaranteed that your data will be secure.
  
Is it possible to change the URL to access the environment?
-----------------------------------------------------------

It is possible to get a new URL by opening a support ticket, but the previous URL will kept too. Besides, it is possible to use a custom DNS pointing to the URL we provide.

What happens if I consume all the data of my tier?
--------------------------------------------------

Hot (online) storage data is rotated, the oldest data will still be able to be accessed as cold (offline) storage for a year. Learn more about this on the :ref:`understanding storage<cloud_your_environment_understanding_storage>` section.

Can I move from cold storage (offline) to hot storage (online) data?
--------------------------------------------------------------------

It is possible to :ref:`download the data as cold storage<cloud_your_environment_accessing_cold_storage>` and load it into the snapshots in your local machines, but rotated data does not return to hot storage on your Wazuh Cloud Service environment. 

What if I need to change the size of my tier?
---------------------------------------------

You can easily change the amount of data you are able to visualize on the WUI just by contacting our team on the **Help** section of your Wazuh Cloud Console. After the demand, our team will take care of it.

Will Elasticsearch's replica shards consume data of my tier?
------------------------------------------------------------

No, data consumption is calculated only from primary shards, so you don't have to worry about replica shards consuming any of your remaining space.

How do I get SSH access to my environment?
------------------------------------------

You may manage your environment through the Console and your environment's WUI, SSH access is not allowed for security reasons. Only Wazuh team is able to access the environment.

How can I update my environment?
--------------------------------

We take care of the updates so your environment will get the latest version of Wazuh and Elastic Stack with no downtime.

How can I connect my agents without Internet access to my environment?
----------------------------------------------------------------------

Some aproaches to solve this issue are:

- **Using a forwarding proxy:** Deploy an instance with NGINX in a public subnet with internet access and configure it to send it to to your environment. Then set the Wazuh Manager IP to the NGINX IP when installing Wazuh on that agent.

- **Using AWS Private Link:** If your agent is located in your AWS VPC open a ticket requesting your VPC endpoint service name. Then create a new Endpoint pointing to that endpoint service (AWS > VPC > Endpoints). Once it is created Wazuh will approve the connection and notify you when it is ready to use. Then you will be able to register your agent replacing the Wazuh Manager IP with your adquired endpoint's DNS.

Find a more detailed guide in our :ref:`Connect agents without Internet <cloud_your_environment_agents_without_internet>` section.
  
Can I send syslog data directly to the environment?
---------------------------------------------------

No, it is not possible due to security reasons as that information is plain data. However, you have several options:

- Use **rsyslog on a Linux host** with a Wazuh agent to log to a file and send those logs to the environment.

- Use **Logstash on a Windows host** with a Wazuh agent to receive syslog and log to a file and send those logs to the environment.

These methods are explained on the :ref:`Forward syslog events to Wazuh <cloud_your_environment_send_syslog>` section.

Can I send data directly to Elasticsearch (Filebeat, Metricbeat, etc)?
----------------------------------------------------------------------

No, all data flow relies on Wazuh agents for security reasons.

How can I configure email alerts?
---------------------------------

You can configure email settings to send alerts or reports by email through the WUI. A guide on how to do this can be found on the :ref:`Configure email alerts <cloud_your_environment_configure_email_alerts>` section.

Can I integrate with my Single Sign-On (SSO) method?
----------------------------------------------------

Yes, you can access your WUI through your SSO (like Okta or Azure's Active Directories), address us through the **Help** section and we will take care of it.


Do I have access to Wazuh or Elasticsearch API?
-----------------------------------------------
