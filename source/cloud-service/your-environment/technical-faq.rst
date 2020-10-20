.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_your_environment_technical_faq:

Technical FAQ
=============

.. meta::
  :description: Learn about some technical FAQ. 

While configuring an environment some questions may arise. This list gathers some of the most frequently asked questions about this topic.

Is it possible to change the URL to access the environment?
-----------------------------------------------------------

It is possible to get a new URL by opening a support ticket, but the previous URL will kept too. Besides, it is possible to use a custom DNS pointing to the URL we provide.

Can I send syslog data directly to the environment?
---------------------------------------------------

No, it is not possible due to security reasons as that information is plain data. However, you have several options:

Rsyslog on Linux
^^^^^^^^^^^^^^^^

- Use **rsyslog on a Linux host** with a Wazuh agent to log to a file and send those logs to the environment.

1. Configure rsyslog to receive syslog events. Enable the TCP or UDP settings by editing ``/etc/rsyslog.conf``.

For TCP:

.. code-block::

   $ModLoad imtcp
   $InputTCPServerRun <PORT>

For UDP:

.. code-block::

   $ModLoad imudp
   $UDPServerRun <PORT>
   
2. Configure rsyslog to forward events to a file by editing ``/etc/rsyslog.conf``.

.. code-block::

   # Storing Messages from a Remote System into a specific File
   if $fromhost-ip startswith 'xxx.xxx.xxx.' then /var/log/<file_name.log>
   & ~

3. Deploy a Wazuh agent on the same host with rsyslog.

4. Configure the agent to read the syslog output file editing ``/var/ossec/etc/ossec.conf``.

.. code-block:: XML

   <localfile>
   <log_format>syslog</log_format>
   <location>/var/log/<file_name.log></location>
   </localfile>

5. Restart rsyslog and wazuh agent.

   
Logstash on Windows
^^^^^^^^^^^^^^^^^^^
   
- Use **Logstash on a Windows host** with a Wazuh agent to receive syslog and log to a file and send those logs to the environment.

Can I send data directly to Elasticsearch (Filebeat, Metricbeat, etc)?
----------------------------------------------------------------------

No, all data flow relies on Wazuh agents for security reasons.

What happens if I consume all the data of my tier?
--------------------------------------------------

Hot (online) storage data is rotated, the oldest data will still be able to be accessed as cold (offline) storage.

Can I move from cold storage (offline) to hot storage (online) data?
--------------------------------------------------------------------

It is not possible. However, you may export the data and load it into the snapshots in your environment. 

What if I need to change the size of my tier?
---------------------------------------------

You can easily change the amount of data you are able to visualize on the WUI just by contacting our team. After the demand, our team will take care of it.

Will Elasticsearch's replica shards consume data of my tier?
------------------------------------------------------------

No, data consumption is calculated only from primary shards, so you don't have to worry about replica shards consuming any of your remaining space.

How do I get SSH access to my environment?
------------------------------------------

SSH access is not allowed for security reasons. Only Wazuh team is able to access the environment.

How can I update my environment?
--------------------------------

We take care of the updates so your environment will get the latest version of Wazuh and Elastic Stack with no downtime.

How can I connect my agents without Internet access to my environment?
----------------------------------------------------------------------

Some aproaches to solve this issue are suggested:

- **Using a forwarding proxy:** Deploy an instance with NGINX in a public subnet with internet access and configure it to send it to to your environment. Then set the Wazuh Manager IP to the NGINX IP when installing Wazuh on that agent.

- **Using AWS Private Link:** If your agent is located in your AWS VPC open a ticket requesting your VPC endpoint service name. Then create a new Endpoint pointing to that endpoint service (AWS > VPC > Endpoints). Once it is created Wazuh will approve the connection and notify you when it is ready to use. Then you will be able to register your agent replacing the Wazuh Manager IP with your adquired endpoint's DNS.
