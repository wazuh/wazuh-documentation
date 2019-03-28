.. Copyright (C) 2019 Wazuh, Inc.

.. _faq:

FAQ
===

#. `How can I sign up?`_
#. `How do I register an agent?`_
#. `How can I access to the Wazuh APP?`_
#. `Is my trial environment maintained when I finally purchase Wazuh Cloud?`_
#. `What is the difference between a trial and a customer?`_
#. `Is it possible to change the URL to access the environment?`_
#. `How Syslog data is sent to the environment?`_
#. `How do I contact the support?`_
#. `Is my data safe?`_
#. `Is it possible to export my data?`_
#. `How can I see how much space I consumed?`_
#. `What happens if I consume all the data from my tier?`_
#. `What will happen when my subscription ends after 1 year?`_
#. `How I jump to a higher tier? And what happens with my current environment?`_
#. `How do I get SSH access to my environment?`_
#. `Can I send data directly to Elasticsearch (Filebeat, Metricbeat, etc)?`_
#. `Can I move from cold storage (offline) to online data?`_

How can I sign up?
------------------

You can sign up for the Wazuh Cloud Service by filling out the form on the `Official page <https://staging.wazuh.com/cloud/wazuh-saas-subscription/>`_.


How do I register an agent?
---------------------------

If you want to register an agent instance in the Wazuh Cloud architecture, follow the guide in `this documentation <https://documentation.wazuh.com/current/user-manual/registering/index.html>`_.


How can I access to the Wazuh APP?
----------------------------------

You can access the Wazuh APP connected to the cloud by clicking on the DNS address provided in the PDF when you signed up.


Is my trial environment maintained when I finally purchase Wazuh Cloud?
-----------------------------------------------------------------------

We will offer the option to move from a "trial" to production soon, but, for now, it is not possible. A new customer starts with a clean environment.


What is the difference between a trial and a customer?
------------------------------------------------------

Wazuh scales with your business needs. You can deploy as many agents as needed, monitoring your cloud and on-premises environments. This includes physical servers, endpoints, virtual machines and cloud instances. In addition, network devices and other Syslog sources can also be monitored by having them reporting events to one of the agent systems or directly to our cloud infrastructure. 
Our subscription model is based on indexed data per month, with different subscription tiers for all environment sizes, starting at 250GB per month. The service also includes: 

- 12 months of cold storage, with the ability to extend it. 
- Support and maintenance for deployed agents and SAAS infrastructure. 
- Monthly health-checks and tuning, done by our engineers. 
- Software and detection ruleset upgrades. 
- Compliance mapping for GDPR, PCI DSS and GPG13. 
- Integration with threat intelligence sources (Open Threat Exchange). 


Is it possible to change the URL to access the environment?
-----------------------------------------------------------

We don't change the URL for security reasons. You can point a custom DNS to the URL we provide you.


How Syslog data is sent to the environment?
-------------------------------------------

Syslog data is sent by the wazuh agent. It’s not possible to send it directly.


How do I contact the support?
-----------------------------

You can send questions to technical support by sending an email:

a) If you have a trial environment, send an email to cloud@wazuh.com.
b) If you have paid the subscription, send an email to support@wazuh.com.

In addition, you can ask questions and participate with other users of the community:

- Join Wazuh Slack channel to contribute to the project, ask questions, participate in discussions, share your doubts and thoughts with our user's community. `Join us on Slack <https://wazuh.com/community/join-us-on-slack/>`_ 
- In our Google group, you can ask questions and participate in discussions. Share your doubts and thoughts with the community. `Google group <https://groups.google.com/forum/#!forum/wazuh/>`_

Is my data safe?
----------------

As part of our cloud infrastructure, Wazuh provides a single-tenant data store, so your data is completely isolated from other customer’s data.
We create a backup of data every 30 min to an S3 bucket, which is later moved to Glacier. We also backup Kibana and Wazuh UI settings.


Is it possible to export my data?
---------------------------------

It is not possible for now, but we are working on a tool for this.


How can I see how much space I consumed?
----------------------------------------

- You will get emails letting them know the percentage they use: 20%, 40%, etc.
- You can contact support so we can let you know.


What happens if I consume all the data from my tier?
----------------------------------------------------

When you consume all the data from your tier, they are rotated. The oldest data will move to offline.


What will happen when my subscription ends after 1 year?
--------------------------------------------------------

We will let you know in advance that your subscription is about to expire. So, it will be possible to renovate it. In case you don't renovate it, we will remove your environment in 1 week, included the data.


How I jump to a higher tier? And what happens with my current environment?
--------------------------------------------------------------------------

Contact your sales representative. The change is transparent for you.


How do I get SSH access to my environment?
------------------------------------------

All you need to visualize your data is to access the Kibana interface in your browser with the IP address that you obtained and install the agent in the machines that you want to be monitored. So you can not access the machine by SSH.


Can I send data directly to Elasticsearch (Filebeat, Metricbeat, etc)?
----------------------------------------------------------------------

All the data must be sent using Wazuh agents, so it is not possible.


Can I move from cold storage (offline) to online data?
------------------------------------------------------

No, it is not possible. You must export the data and upload the snapshots to your environment. We provide a VM for that.