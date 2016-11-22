.. _ossec_elk:

Integration with ELK Stack
==========================

.. topic:: Documentation structure

   This document will guide you through the installation, configuration and integration of ELK Stack and Wazuh HIDS (our `OSSEC fork <http://github.com/wazuh/wazuh>`_). We will make use of expanded logging features that have been implemented for the manager, along with custom Logstash/Elasticsearch configurations, our OSSEC Wazuh Ruleset, our Wazuh RESTful API and Kibana with hardcoded modifications.

.. toctree::
   :maxdepth: 2

   ossec_elk_architecture
   ossec_elk_java
   ossec_elk_logstash
   ossec_elk_elasticsearch
   ossec_elk_kibana
