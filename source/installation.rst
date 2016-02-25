.. _installation:

Installation guide
==================

Two different installation options: **OSSEC HIDS** and **Wazuh HIDS**. Please read carefully below to learn the differencies between these two options since it might be key for the utilization of further items of your interest in this documentation.

**OSSEC HIDS** installers contain the latest stable version as stated at `OSSEC project Github repository <http://ossec.github.io>`_. Wazuh creates and maintains OSSEC installers for the Open Source community, and you can find the instructions on how to use them in this :ref:`documentation section <ossec_installation>`. 

**Wazuh HIDS** is an OSSEC fork, that contains additional features for the OSSEC manager, such as compliance support and extended JSON logging capabilities, that allow the integration with :ref:`ELK Stack <ossec_elk>` (Elasticsearch, Logstash and Kibana) and other log management tools. As well, this installation is ready for the utilization of the :ref:`Wazuh RESTful API <ossec_api>`.

.. toctree::
   :maxdepth: 2

   ossec_installation
   wazuh_installation
   first_steps
