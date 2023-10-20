.. Copyright (C) 2015, Wazuh, Inc.
  
.. meta::
  :description: Learn how to migrate from Open Distro for Elasticsearch or from OSSEC to Wazuh. This guide gives instructions to make these migration actions.

.. _migration_guide:

Migration guide
================

From Wazuh 4.0.0 to Wazuh 4.2.7, the default Wazuh installation included the Wazuh server and `Open Distro for Elasticsearch <https://opendistro.github.io/for-elasticsearch/>`_, a project that is now archived and has been succeeded by OpenSearch. This guide includes instructions to migrate from Open Distro for Elasticsearch to the :doc:`Wazuh indexer </getting-started/components/wazuh-indexer>` and :doc:`Wazuh dashboard </getting-started/components/wazuh-dashboard>`, the new components introduced in Wazuh 4.3.0.

- :doc:`Migrating to the Wazuh indexer </migration-guide/wazuh-indexer>`: Follow this section to migrate from Open Distro for Elasticsearch 1.13 to the Wazuh indexer. This new component consists of a distribution of `Opensearch <https://github.com/opensearch-project/OpenSearch>`_ with additional tools that Wazuh has created to assist with the installation and configuration of the search engine. 

- :doc:`Migrating to the Wazuh dashboard </migration-guide/wazuh-dashboard>`: This section will guide you through the migration from Open Distro for Elasticsearch Kibana 1.13 to the Wazuh dashboard. This new web interface for the Wazuh platform is a customized `OpenSearch Dashboards <https://github.com/opensearch-project/OpenSearch-Dashboards>`_ distribution that includes the `Wazuh plugin <https://github.com/wazuh/wazuh-dashboard-plugins>`_.

This guide also includes a :doc:`Migrating from OSSEC </migration-guide/migrating-from-ossec/index>` section. Following this guide, you will learn how to migrate your existing OSSEC installation to the last version of Wazuh. Our solution is free, open-source, and unifies XDR and SIEM capabilities within a unique top-notch security platform. Migrating to Wazuh, your organizations get a comprehensive, easy-to-use, reliable, and scalable solution.

.. toctree::
   :hidden:

   wazuh-indexer
   wazuh-dashboard
   migrating-from-ossec/index