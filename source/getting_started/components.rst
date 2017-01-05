.. _components:

Components
==========

Wazuh is born as an OSSEC HIDS fork that, based on the integration with Elastic Stack and OpenSCAP, evolves into a more comprehensive solut
ion. Below is a brief description of these tools and what they do:

.. image:: ../images/ossec_openscap_elastic.png
   :align: center
   :width: 100%

- `OSSEC HIDS <http://ossec.github.io>`_ is a Host based Intrusion Detection System used both to get security visibility and for compliance purposes. Its architecture is based on a multi-platform agent that do forward system data (e.g log messages, file hashes, detected anomalies) to a central system, where it is further analyzed and processed, resulting in security alerts.

+ `OpenSCAP <https://www.open-scap.org>`_ is an OVAL (Open Vulnerability Assessment Language) interpreter used to check system configuration and detect vulnerable applications. It is recognized as a standardized compliance and hardening checking solution for enterprise-level infrastructure.

- `Elastic Stack <https://www.elastic.co>`_ is collection of tools (Filebeat, Logstash, Elasticsearch, Kibana) to collect, parse, index, store and search log data. It provides a browser-based visualization frontend interface to easily consume data.

Wazuh agent
-----------

Wazuh manager
-------------
