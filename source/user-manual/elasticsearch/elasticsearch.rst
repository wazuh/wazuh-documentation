.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Once you've installed the Wazuh Kibana plugin some new indices will be generated in Elasticsearch. Learn more about it in this section.

Elasticsearch indices
=====================

Once you've installed the Wazuh Kibana plugin some new indices will be generated in Elasticsearch. Let's see a more in deep view about them.
The user shouldn't take care about them and shouldn't modify them unless the Wazuh team suggest it.

The ``.kibana`` index
---------------------

This index is mainly used by Kibana itself. It's useful to tell Kibana how are the index patterns we are using along other technical details. This index should be similar for any user and it's a bit long to show its content here. Also its content is useless for the user knowledge.

The ``wazuh-alerts-`` indices
-----------------------------

They are auto-generated and they store the Wazuh alerts. Filebeat will send data to Elasticsearch and will create an index per day.

If you want to change the name of these indices with a custom one, you can follow :ref:`this guide <kibana_configure_indices>`.

The ``wazuh-monitoring-`` indices
---------------------------------

They are auto-generated and they store the Wazuh agents statuses periodically. The Wazuh Kibana plugin is which will send data to Elasticsearch and will create an index per day. This feature can be disabled. You can also adjust the insertion frequency. These indices are mainly used by the ``Agents status`` visualization from the Overview dashboard in the Wazuh Kibana plugin.

The ``wazuh-statistics-`` indices
---------------------------------
This index is used to view Wazuh usage statistics.
It is filled with information collected by making requests to the Wazuh manager API.  Information on the status of Wazuh and its components is displayed using these indices. 

More information
----------------

- `Elasticsearch documentation - Exploring Your Cluster <https://www.elastic.co/guide/en/elasticsearch/reference/6.x/getting-started-explore.html>`_
