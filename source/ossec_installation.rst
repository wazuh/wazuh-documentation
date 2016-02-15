OSSEC Installation
==================

Two different installation options: **OSSEC 2.8.3** and **OSSEC Wazuh Fork**.

**OSSEC 2.8.3** is the latest stable version from http://ossec.github.io. Wazuh provides the repositories needed in the OSSEC 2.8.3 installation guide. Please note that in this case the OSSEC manager wouldn't have the additional features for its use with `ELK Stack <http://documentation.wazuh.com/en/latest/ossec_elk.html>`_ and the `OSSEC Wazuh RESTFUL API <http://documentation.wazuh.com/en/latest/ossec_api.html>`_.

**OSSEC Wazuh Fork** has been developed with additional features for the OSSEC manager, such as extended JSON logging capabilities, that allow the integration of `OSSEC with ELK Stack <http://documentation.wazuh.com/en/latest/ossec_elk.html>`_ (Elasticsearch, Logstash and Kibana) and other log management tools. Also this installation is ready for the use of the `OSSEC Wazuh RESTFUL API <http://documentation.wazuh.com/en/latest/ossec_api.html>`_.

.. toctree::
   :maxdepth: 2

   ossec_installation_2.8.3
   ossec_wazuh
