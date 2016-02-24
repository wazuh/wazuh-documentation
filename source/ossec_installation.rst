.. _ossec_installation:

OSSEC Installation
==================

Two different installation options: **OSSEC 2.8.3** and **OSSEC Wazuh Fork**. Please read carefully below to learn the differencies between these two options since it might be key for the utilization of further items of your interest in this documentation.

**OSSEC 2.8.3** is the latest stable version as stated at http://ossec.github.io. Wazuh provides the repositories and the instructions on how to install it in this section: the OSSEC 2.8.3 installation guide. Please note that this version doesn't come with additional the features required by the OSSEC manager for its use with `ELK Stack <http://documentation.wazuh.com/en/latest/ossec_elk.html>`_ and the `OSSEC Wazuh RESTFUL API <http://documentation.wazuh.com/en/latest/ossec_api.html>`_.

**OSSEC Wazuh Fork** contains additional features for the OSSEC manager, such as extended JSON logging capabilities, that allow the integration with `ELK Stack <http://documentation.wazuh.com/en/latest/ossec_elk.html>`_ (Elasticsearch, Logstash and Kibana) and other log management tools. As well, this installation is ready for the utilization of the `OSSEC Wazuh RESTFUL API <http://documentation.wazuh.com/en/latest/ossec_api.html>`_.

.. toctree::
   :maxdepth: 2

   ossec_installation_2.8.3
   ossec_wazuh
