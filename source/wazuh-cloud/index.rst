.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_cloud:

Wazuh Cloud
===========

Wazuh solution delivered as a service
-------------------------------------

Wazuh monitoring solution consists of a highly scalable, two-tier architecture to manage and monitor your environment.
The Wazuh agent runs on each monitored system, collecting events and forwarding those to the Wazuh cloud infrastructure, composed by analysis servers, which are used to process events data, and an ElasticStack cluster where information is indexed and stored.

Wazuh cloud infrastructure is composed by cloud instances, used to analyze and index data collected by the agents, detecting intrusion attempts, policy violations, file changes, malware and vulnerabilities. 
In addition, an Elastic Stack cluster is used to provide a full-text search and analytics engine, with a flexible and intuitive web user interface. 
As part of our cloud infrastructure, Wazuh provides a single-tenant data store, so your data is completely isolated from other customer’s data.
Data is processed through dedicated containers and store both in an ElasticStack cluster, where it is available through the user interface, and a compliance-ready cold storage environment, where it can be readily requested for a date range as needed.


.. toctree::
   :maxdepth: 1

   cloud-getting-started
   faq
   support
