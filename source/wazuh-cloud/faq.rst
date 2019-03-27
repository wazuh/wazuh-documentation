.. Copyright (C) 2019 Wazuh, Inc.

.. _faq:

FAQ
===

#. `How can I Sign Up?`_
#. `How do I register an agent?`_
#. `How can I access to the Wazuh APP?`_
#. `Is my trial environment maintained when I finally purchase Wazuh Cloud?`_
#. `What is the difference between a trial and a customer?`_
#. `Is it possible to change the URL to access the environment?`_
#. `How syslog data is sent to the environment?`_
#. `How do I contact the support?`_
#. `Is my data safe?`_
#. `Is it possible to export my data?`_
#. `How can I see how much space I consumed?`_
#. `What happens if I consume all the data of my tier?`_
#. `What will happen when my subscription ends after 1 year?`_
#. `How I jump to a higher tier?, and what happens with my current environment?`_
#. `How do I get SSH access to my environment?`_
#. `Can I send data directly to Elasticsearch (Filebeat, Metricbeat, etc)?`_
#. `Can I move from cold storage (offline) to online data?`_

How can I Sign Up?
------------------

To Sign Up to the Wazuh Cloud Service just fill the form in the `Official page <https://staging.wazuh.com/cloud/wazuh-saas-subscription/>`_

How do I register an agent?
---------------------------

To register an agent instance in the Wazuh Cloud architecture, follow the guide in `this documentation <https://documentation.wazuh.com/current/user-manual/registering/index.html>`_.

How can I access to the Wazuh APP?
----------------------------------

To access the Wazuh APP connected to the Cloud, just click the DNS direction provided in the PDF when Signed up.

Is my trial environment maintained when I finally purchase Wazuh Cloud?
-----------------------------------------------------------------------



What is the difference between a trial and a customer?
------------------------------------------------------

Wazuh scales with your business needs. You can deploy as many agents as needed, monitoring your cloud and on-premises environments. This includes physical servers, endpoints, virtual machines and cloud instances. In addition, network devices and other Syslog sources can also be monitored by having them reporting events to one of the agent systems or directly to our cloud infrastructure. 
Our subscription model is based on indexed data per month, with different subscription tiers for all environment sizes, starting at 250GB per month. The service also includes: 
    • 12 months of cold storage, with the ability to extend it. 
    • Support and maintenance for deployed agents and SAAS infrastructure. 
    • Monthly health-checks and tuning, done by our engineers. 
    • Software and detection ruleset upgrades. 
    • Compliance mapping for GDPR, PCI DSS and GPG13. 
    • Integration with threat intelligence sources (Open Threat Exchange).


Is it possible to change the URL to access the environment?
-----------------------------------------------------------



How syslog data is sent to the environment?
-------------------------------------------

Syslog data is sent by the wazuh agent. It’s not possible to send it directly.

How do I contact the support?
-----------------------------

- Join Wazuh Slack channel to contribute to the project, ask questions, participate in discussions, share your doubts and thoughts with our users community. `Join us on Slack <https://wazuh.com/community/join-us-on-slack/>`_ 

- In our Google group you can ask questions and participate in discussions. Share your doubts and thoughts with the community. `Google group <https://groups.google.com/forum/#!forum/wazuh/>`_

Is my data safe?
----------------



Is it possible to export my data?
---------------------------------



How can I see how much space I consumed?
----------------------------------------



What happens if I consume all the data of my tier?
--------------------------------------------------



What will happen when my subscription ends after 1 year?
--------------------------------------------------------



How I jump to a higher tier? and what happens with my current environment?
--------------------------------------------------------------------------



How do I get SSH access to my environment?
------------------------------------------

All you need to visualize your data is to access the Kibana interface in your browser with the IP address that you obtained and install the agent in the machines that you want to be monitored. So you can not access the machine by SSH.

Can I send data directly to Elasticsearch (Filebeat, Metricbeat, etc)?
----------------------------------------------------------------------



Can I move from cold storage (offline) to online data?
------------------------------------------------------

