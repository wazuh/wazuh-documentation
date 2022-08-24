.. Copyright (C) 2015, Wazuh, Inc.
  
.. meta::
  :description: Learn how to migrate from Open Distro for Elasticsearch or from OSSEC to Wazuh. This guide gives instructions to make these migration actions.

.. _migration_guide:

Migration guide
================

This guide includes instructions for three different types of migrations. From version 4.3.0 onwards, users can take full advantage of Wazuh thanks to the two new components that have been added. The :doc:`Wazuh indexer </getting-started/components/wazuh-indexer>` is a highly scalable, full-text search and analytics engine. The :doc:`Wazuh dashboard </getting-started/components/wazuh-dashboard>` is a flexible and intuitive web interface for mining, analyzing, and visualizing data. 

- :doc:`Migrating to the Wazuh indexer </migration-guide/wazuh-indexer>`: Follow this section to migrate from Open Distro for Elasticsearch 1.13 to the Wazuh indexer. This new component consists of a distribution of `Opensearch <https://github.com/opensearch-project/OpenSearch>`_ with additional tools that Wazuh has created to assist with the installation and configuration of the search engine. 

- :doc:`Migrating to the Wazuh dashboard </migration-guide/wazuh-indexer>`: This section will guide you through the migration from Open Distro for Elasticsearch Kibana 1.13 to the Wazuh dashboard. This new web interface for the Wazuh platform provides out-of-the-box dashboards, allowing you to navigate effortlessly through the user interface.

- :doc:`Migrating from OSSEC </migration-guide/migrating-from-ossec/index>`: Following this guide, you will learn how to migrate your existing OSSEC installation to the last version of Wazuh. The OSSEC project has been in maintenance mode for a long time, and the last releases consist primarily of bug fixes reported by occasional contributors.

Wazuh is free, open-source, and unifies XDR and SIEM capabilities within a unique top-notch security platform. Migrating to Wazuh, your organizations get a comprehensive, easy-to-use, reliable, and scalable solution.

.. toctree::
   :hidden:

   wazuh-indexer
   wazuh-dashboard
   migrating-from-ossec/index