Integrating OSSEC-ELK Stack
=============================================================

Introduction
--------------------
Welcome to OSSEC-ELK Stack integration guide by Wazuh, throught some simple steps you will set up an entire ELK Stack architecture to monitor, collect, process, index and display your OSSEC Alerts.

The full guide is based on OSSEC Wazuh version, we contribute with OSSEC community by developing extended funcionality.

These are some features we are talking about:

* **OSSEC-Wazuh Ruleset**
   Weekly OSSEC Ruleset updates
* **OSSEC PCI DSS 3.0 & CIS Requirements**
   Detailed groups and Benchmarks (ex: 1.4 Debian Linux Benchmark, 11.4 PCI...)
* **OSSEC JSON Custom Output**
   Groups array, timestamps, Agents name, locations, file integrity..
* **Logstash input/filter/output plugins**
   GeoIP, names format, elasticsearch template, elasticsearch ossec cluster.
* **Elasticsearch**
   Custom index mapping template to fit OSSEC alert fields. 
* **Kibana 4**
   OSSEC Alerts, PCI Complianace, CIS Compliance, Agents management, Agents Info Dashboards.
   Hiding non useful fields, display short summary of PCI Requirements on mouseover on PCI Alerts.

.. note:: This functionalty requires OSSEC-Wazuh version and OSSEC-Wazuh Ruleset, keep reading this guide to install it.


Architecture explanation
-------------------------
The whole architecture is based on log analysis, collect, index and display alerts. To acomplish this we are going to use the following tools:

**OSSEC-HIDS**

`OSSEC Official Website <http://www.ossec.net/>`_

OSSEC is an Open Source Host-based Intrusion Detection System that performs log analysis, file integrity checking, policy monitoring, rootkit detection, real-time alerting and active response.

**Logstash**

`Logstash Official Website <https://www.elastic.co/products/logstash/>`_

Logstash is a data pipeline that helps you process logs and other event data from a variety of systems. Logstash will read and process send our OSSEC JSON Files to Elasticsearch Cluster.

**Elasticsearch**

`Elasticsearch Official Website <https://www.elastic.co/products/elasticsearch/>`_

Search & Analyze Data in Real Time. Distributed, scalable, and highly available. Real-time search and analytics capabilities. Elasticsearch will index and sotre all our OSSEC alerts, this way we will be able to search and explore thousands of alerts in few clicks.

**Kibana**

`Kibana Official Website <https://www.elastic.co/products/kibana/>`_

Kibana is a friendly WEB interface to explore all elasticsearch indexes, Kibana support custom dashboard creations, in our case Security Compliance dashboards and OSSEC high risk security alerts.

**Scaling to large deployments**

To multi-node and high availability architectures we will use some extra tools like Logstash-Forwarder or Redis Server.


Installaing
-------------------------
Requisites
^^^^^^^^^^^^^^^^^^^
SSH acces to at least one server and sudo privilegies.

1. Logstash
^^^^^^^^^^^^^^^^^^^
Collect and transport data.
Logstash will be on charge of taking our OSSEC alerts files, process and send them to Elasticsearch server.


1.1 Logstash-Forwarder
""""""""""""""""""

Elasticsearch
^^^^^^^^^^^^^^^^^^^

Kibana
^^^^^^^^^^^^^^^^^^^

.. toctree::
   :maxdepth: 2

