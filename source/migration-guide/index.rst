.. Copyright (C) 2015, Wazuh, Inc.
  
.. meta::
  :description: Learn how to migrate from Open Distro for Elasticsearch or from OSSEC to Wazuh. This guide gives instructions to make these migration actions.

.. _migration_guide:

Migration guide
================

This guide includes instructions for three different types of migrations. The first option below is related to the :doc:`Wazuh indexer </getting-started/components/wazuh-indexer>`, a highly scalable, full-text search and analytics engine. The second is related to the :doc:`Wazuh dashboard </getting-started/components/wazuh-dashboard>`, the flexible and intuitive new web interface for mining, analyzing, and visualizing data. 

From Wazuh version 4.3.0 onwards, users can take full advantage of these two new components that have been added to the platform. Finally, on the thirst option, you get instructions for migrating from OSSEC to Wazuh.

- :doc:`Migrating to the Wazuh indexer </migration-guide/wazuh-indexer>`: Follow this section to migrate from Open Distro for Elasticsearch 1.13 to the Wazuh indexer. This new component consists of a distribution of `Opensearch <https://github.com/opensearch-project/OpenSearch>`_ with additional tools that Wazuh has created to assist with the installation and configuration of the search engine. 

- :doc:`Migrating to the Wazuh dashboard </migration-guide/wazuh-dashboard>`: This section will guide you through the migration from Open Distro for Elasticsearch Kibana 1.13 to the Wazuh dashboard. This new web interface for the Wazuh platform provides out-of-the-box dashboards, allowing users to navigate effortlessly through the user interface.

- :doc:`Migrating from OSSEC </migration-guide/migrating-from-ossec/index>`: Following this guide, you will learn how to migrate your existing OSSEC installation to the last version of Wazuh. Our solution is free, open-source, and unifies XDR and SIEM capabilities within a unique top-notch security platform. Migrating to Wazuh, your organizations get a comprehensive, easy-to-use, reliable, and scalable solution.

.. toctree::
   :hidden:

   wazuh-indexer
   wazuh-dashboard
   migrating-from-ossec/index