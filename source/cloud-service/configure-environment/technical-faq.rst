.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_configure_environment_technical_faq:

Technical FAQ
=============

.. meta::
  :description: Learn about some technical FAQ. 

While configuring an environment some questions may arise. This list gathers some of the most frequently asked questions about this topic.

Is it possible to change the URL to access the environment?
-----------------------------------------------------------

No, it is not possible for security reasons. However, it is possible to use a custom DNS pointing to the URL we provide.

Can I send syslog data directly to the environment?
---------------------------------------------------

No, it is not possible due to security reasons as that information is plain data. However, you have several options:

- Use rsyslog to log to a file and get a Wazuh agent to send those logs to the environment.

- Use logstash to receive syslog and log to a file, then get a Wazuh agent to send those logs to the environment.

Is my data safe?
----------------

We create backup of the alerts generated every 30 minutes to an AWS S3 bucket, also Kibana and Wazuh UI settings will have a backup.

What happens if I consume all the data of my tier?
--------------------------------------------------

Hot storage data is rotated, the oldest data will still be able to be accessed as cold storage.

How do I get SSH access to my environment?
------------------------------------------

SSH access is not allowed for security reasons. Only Wazuh team is able to access the environment.

Can I send data directly to Elasticsearch (Filebeat, Metricbeat, etc)?
----------------------------------------------------------------------

No, all data flow relies on Wazuh agents for security reasons.

Can I move from cold storage to hot storage data?
-------------------------------------------------

It is not possible. However, you may export the data and load it into the snapshots in your environment. 

How can I update my environment?
--------------------------------

We take care of the updates so your environment will get the latest version of Wazuh and Elastic Stack with no downtime.

Will replica shards consume data of my tier?
--------------------------------------------

No, data consumption is calculated only from primary shards, so you don't have to worry about replica shards consuming any of your remaining space.
