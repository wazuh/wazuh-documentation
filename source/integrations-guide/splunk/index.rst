.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find out how to integrate Wazuh with Splunk in this integration guide.

Splunk integration
==================

Splunk is a security platform that enables you to collect, search, analyze, visualize, and report real-time and historical data. Splunk indexes the data stream and parses it into a series of individual events that you can view and search.

Splunk users connect to Splunk through the command-line interface or through Splunk Web to administer their deployment. Splunk enables users to also manage, create knowledge objects, run searches, and create pivots and reports.

Wazuh integrates with Splunk in these ways:

-  `Wazuh indexer integration using Logstash`_
-  Wazuh server integration

   -  :ref:`Using Logstash <>`
   -  :ref:`Using the Splunk forwarder <>`

.. thumbnail:: /images/integrations/image11.png
   :title: Splunk integration diagram
   :align: center
   :width: 80%

Wazuh indexer integration using Logstash
----------------------------------------

Before configuring Logstash, you need to set up the Splunk indexer to receive the forwarded events.

Configuring the Splunk indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
