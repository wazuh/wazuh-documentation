.. Copyright (C) 2019 Wazuh, Inc.

.. _elasticsearch:

Elasticsearch indices
=====================

After the installation of the Wazuh Kibana plugin, some new indices will be generated in Elasticsearch. The user should not modify them unless the Wazuh team suggests it:

The ``.kibana`` index
---------------------

This index is mainly used by Kibana to store saved searches, visualizations, and dashboards. Kibana creates a new index if the index does not already exist.

The ``wazuh-alerts-3.x-`` indices
---------------------------------

These auto-generated indices store the Wazuh alerts. Filebeat sends the data to Elasticsearch and, by default, creates one index per day.

It is possible to change the name of these indices to a custom one. The process is described in the :ref:`configure the name of Elasticsearch indices <kibana_configure_indices>` section.

The ``wazuh-monitoring-3.x-`` indices
-------------------------------------

These auto-generated indices store the Wazuh agents' status. The information is updated periodically. The Wazuh Kibana plugin sends data to Elasticsearch and, by default, creates one index per day. These indices are used, for example, by the Wazuh agents' ``Status`` visualization.

More information
----------------

- `Elasticsearch documentation - Exploring Your Cluster <https://www.elastic.co/guide/en/elasticsearch/reference/6.x/getting-started-explore.html>`_
