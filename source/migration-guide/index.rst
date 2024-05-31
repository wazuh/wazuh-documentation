.. Copyright (C) 2015, Wazuh, Inc.
  
.. meta::
  :description: Learn how to migrate from Open Distro for Elasticsearch to the Wazuh indexer and Wazuh dashboard. This guide gives instructions to perform the migration.

Migration guide
================

From Wazuh 4.0.0 to Wazuh 4.2.7, the default Wazuh installation included the Wazuh server and `Open Distro for Elasticsearch <https://opendistro.github.io/for-elasticsearch/>`_, a project that is now archived and has been succeeded by OpenSearch. This guide includes instructions to migrate from Open Distro for Elasticsearch to the :doc:`Wazuh indexer </getting-started/components/wazuh-indexer>` and :doc:`Wazuh dashboard </getting-started/components/wazuh-dashboard>`, the new components introduced in Wazuh 4.3.0.

- :doc:`Migrating to the Wazuh indexer </migration-guide/wazuh-indexer>`: Follow this section to migrate from Open Distro for Elasticsearch 1.13 to the Wazuh indexer. This new component consists of a distribution of `Opensearch <https://github.com/opensearch-project/OpenSearch>`_ with additional tools that Wazuh has created to assist with the installation and configuration of the search engine. 

- :doc:`Migrating to the Wazuh dashboard </migration-guide/wazuh-dashboard>`: This section will guide you through the migration from Open Distro for Elasticsearch Kibana 1.13 to the Wazuh dashboard. This new web interface for the Wazuh platform is a customized `OpenSearch Dashboards <https://github.com/opensearch-project/OpenSearch-Dashboards>`_ distribution that includes different sections, visualizations and tools to manage the Wazuh indexer information and the Wazuh Server.

.. toctree::
   :hidden:

   wazuh-indexer
   wazuh-dashboard
   files-backup/index
