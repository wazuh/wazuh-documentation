.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In this integration guide, you can find how to integrate your Wazuh deployment with Elastic Stack, OpenSearch, and Splunk.

Integrations guide: Elastic, OpenSearch, and Splunk
===================================================

Wazuh offers extensive compatibility and robust integration features that allow users to connect it with other security solutions and platforms. Integrating Wazuh with other security solutions enables users to manage Wazuh data in diverse ways.

Elastic, OpenSearch, and Splunk are software platforms designed for search, analytics, and data management. They are used to collect, index, search, and analyze large volumes of data in real-time and historical contexts.

Up to Wazuh v4.4, the following integrated applications allowed users to manage Wazuh and its security data using third-party platforms:

-  `Wazuh for Splunk <https://documentation.wazuh.com/4.4/deployment-options/splunk/splunk-app.html>`__
-  `Wazuh for Elastic <https://documentation.wazuh.com/4.4/deployment-options/elastic-stack/index.html>`__

However, since version 4.5, we don’t develop these integrated applications any longer. We only support them with critical security updates. In this document, we describe how to integrate your Wazuh deployment with the following third-party security platforms:

-  :doc:`Elastic Stack <elastic-stack/index>`
-  :doc:`OpenSearch <opensearch/index>`
-  :doc:`Splunk <splunk/index>`

Integration methods
-------------------

We describe how to configure the following integration alternatives for each of the security platforms mentioned above:

-  Wazuh indexer integration
-  Wazuh server integration

Additionally, we demonstrate how to import the provided dashboards for these platforms.

Wazuh indexer integration
^^^^^^^^^^^^^^^^^^^^^^^^^

.. thumbnail:: /images/integrations/image15.png
   :title: Wazuh indexer integration diagram
   :align: center
   :width: 80%

The Wazuh agent collects security data from monitored endpoints. These data are analyzed by the Wazuh server and indexed in the Wazuh indexer. The Wazuh indexer integration forwards analyzed security data from the Wazuh indexer to the third-party security platform indexer in the form of indexes. Indexes are collections of documents with similar properties.

Wazuh indexer integration requires a running Wazuh indexer and uses `Logstash <https://www.elastic.co/logstash/>`__ as a :ref:`data forwarder <data_forwarders>` for forwarding alerts to a third-party security platform. Logstash forwards the alerts generated after querying the Wazuh indexer. This integration requires that you install Logstash on a dedicated server or on the server hosting the third-party indexer.

We recommend the Wazuh indexer integration if you want to continue analyzing security data in Wazuh and archive it in a data lake for storage or out-of-band analysis. The Wazuh indexer and third-party platform indexer both create indexes for the same alerts. This integration results in the redundancy of indexes which can lead to high resource costs.

Wazuh server integration
^^^^^^^^^^^^^^^^^^^^^^^^

.. thumbnail:: /images/integrations/image7.png
   :title: Wazuh server integration diagram
   :align: center
   :width: 80%

The Wazuh agent collects security data from monitored endpoints. The Wazuh server analyzes the data and generates alerts on the Wazuh dashboard. Wazuh stores security alerts locally in the ``/var/ossec/logs/alerts/alerts.log`` and ``/var/ossec/logs/alerts/alerts.json`` alerts files. The Wazuh server integration operates by reading the ``/var/ossec/logs/alerts/alerts.json`` file and forwarding the alerts to the third-party platform using a :ref:`data forwarder <data_forwarders>`

We recommend Wazuh server integration over indexer integration if you don’t have enough resources for hosting both the third-party security platform indexer and the Wazuh indexer. This is particularly relevant for users operating Wazuh at a large scale, generating numerous alerts.

To implement the Wazuh server integration, a data forwarder must be installed on the same system as the Wazuh server. In multi-node configurations, the data forwarder should be installed on each Wazuh server node.

.. note::

   To make sure Wazuh logs the alerts to ``/var/ossec/logs/alerts/alerts.json``, check that the :ref:`global_jsonout_output` option in the Wazuh server configuration ``/var/ossec/etc/ossec.conf`` file is set to ``yes``.

Integration considerations
--------------------------

.. _data_forwarders:

Data forwarders
^^^^^^^^^^^^^^^

Third-party security platforms typically have a dedicated data collector or data forwarder which is required for implementing these integrations. These forwarders facilitate the data flow from the Wazuh indexer or server to the third-party security platforms.

In the Wazuh indexer integration alternative, the forwarder executes periodic queries to the Wazuh indexer. These queries are performed in blocks, with the time range of each query matching the specified query period. Consequently, there may be a delay in the arrival of alerts at the destination, depending on the frequency set for querying new alerts.

.. thumbnail:: /images/integrations/image20.png
   :title: Wazuh indexer queries diagram
   :align: center
   :width: 80%

In the Wazuh server integration, the forwarder periodically checks the Wazuh alerts file. If it detects changes since the last read, it loads all the new alerts and sends them to the third-party platform.

Similarly, checking for new alerts periodically means that the alerts reach the destination with a delay. This delay depends on the frequency established to check for new alerts.

.. thumbnail:: /images/integrations/image21.png
   :title: Alerts file checking diagram
   :align: center
   :width: 80%

We discuss the data forwarders that we use in the integration alternatives.

There are several ways to ingest data into third-party indexers, which include using `content sources <https://www.elastic.co/guide/en/workplace-search/current/workplace-search-content-sources.html>`__, `Elastic Agent <https://www.elastic.co/guide/en/observability/current/deploy-agent-to-send-data.html>`__, `Beats <https://www.elastic.co/guide/en/observability/current/deploy-beats-to-send-data.html>`__, or `Logstash <https://www.elastic.co/logstash/>`__. Each method has different trade-offs and use cases. In this documentation, we consider only Logstash and Splunk Forwarder and explain our considerations.

Logstash
~~~~~~~~

`Elastic Logstash <https://www.elastic.co/logstash/>`__ is a free and open server-side data processing pipeline that ingests data from multiple sources, transforms it, and then sends it to your desired destination. Logstash has an Apache 2.0 license base and non-open source extensions under the x-pack denomination. Logstash supports scheduling queries at intervals of up to a second.

Logstash supports reading data from indexes using  an input plugin and supports transformations with an output plugin. In summary, Logstash is the most compatible data forwarder for the Wazuh indexer and server integrations.

Splunk Forwarder
~~~~~~~~~~~~~~~~

`Splunk forwarder <https://www.splunk.com/en_us/download/universal-forwarder.html>`__ is a powerful data collection and forwarding tool provided by Splunk. It serves as an agent that collects data from various sources, transforms it if necessary, and sends it to the Splunk indexing infrastructure for further analysis and visualization.

The Splunk forwarder supports data collection from diverse sources such as log files, metrics, network devices, and APIs. It provides robust mechanisms to parse, filter, and enrich the collected data before sending it to the Splunk indexers. This enables users to extract relevant information, apply custom formatting, and enhance the data's overall quality and usefulness.

Redistributable dashboards
^^^^^^^^^^^^^^^^^^^^^^^^^^

In this guide you can find configuration steps to set your integration and use the dashboards we provide for third-party security platforms. These dashboards help you get insights from your security data using these platforms.

-  :ref:`elastic_dashboards`
-  :ref:`openSearch_dashboards`
-  :doc:`Splunk dashboards <>`

Capacity planning
^^^^^^^^^^^^^^^^^

When integrating Wazuh with other security solutions, you need to carefully plan your storage resources and escalation needs beforehand. While the details on capacity planning are out of the scope of this guide, here are a few considerations.

When using the Wazuh indexer integration, you need to put the following points into consideration:

-  The disk space available on the third-party endpoint.
-  The network bandwidth the third-party indexer needs to ingest the collected data.
-  The network bandwidth the data forwarder uses to forward the security data.
-  The scalability of the data forwarder infrastructure to read all the data from the Wazuh indexer and forward it to the third-party security platform.

When using the Wazuh server integration, you need to put the following points into consideration:

-  The disk space each Wazuh server must have to forward the data.
-  The network bandwidth the Wazuh server and the third-party security platform need to receive and forward the security data respectively. 
-  The additional CPU/RAM resources the data forwarder requires to work.
-  The disk space on the destination platform to accommodate the forwarded data it receives.

After the integration, you might have the same data in both Wazuh and third-party security platforms. To minimize the amount of duplicated data, you can archive the data from the Wazuh server or indexer for storage or later analysis. Also, you need to plan backups and recovery of data in case of failure. 


.. toctree::
   :hidden:

   elastic-stack/index
   opensearch/index
   splunk/index