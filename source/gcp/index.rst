.. Copyright (C) 2019 Wazuh, Inc.

.. meta::
  :description: Learn more about how to use Wazuh to monitor Google Cloud Platform services with Wazuh in this section of our documentation. 
  
.. _gcp:

Using Wazuh to monitor GCP services
===================================

.. meta::
  :description: Discover how Wazuh can help you to monitor your Google Cloud Platform (GCP) infrastructure.

.. versionadded:: 3.13.0

Wazuh helps to increase the security of a GCP infrastructure by collecting and analyzing log data. Wazuh uses the Google Cloud Pub/Sub messaging and ingestion service. It is widely used for event-driven systems and streaming analytics. It allows to send and receive messages between applications. The Wazuh module uses it to fetch different kinds of events (Data access, Admin activity, System events, DNS queries, etc.) from the Google Cloud infrastructure. Once events are collected, Wazuh processes them using its `threat detection rules <../user-manual/ruleset/index.html>`__.

The Wazuh module for GCP (``gcp-pubsub``) provides the capability to monitor GCP based services. 

Each section below contains detailed instructions to configure and set up all of the supported services, and also the required Wazuh configuration to collect the logs.

This module requires dependencies in order to work, and also the right credentials in order to access to the services. Take a look at the :ref:`gcp_prerequisites` section before proceeding.


.. topic:: Contents

  .. toctree::
    :maxdepth: 1

    prerequisites/index
    Configuration <../user-manual/reference/ossec-conf/gcp-pubsub>
    supported-services/index

Data flow
---------

The data flow between the Wazuh module and Cloud Pub/Sub looks as follows:

#. A publisher application creates a topic in the Cloud Pub/Sub service and sends messages to the topic. In this example, the publisher applications will be sending Activity logs and Cloud DNS events.

#. Each published message is retained until it is acknowledged by the Wazuh module consuming messages from that subscription.

#. The Wazuh module pulls the messages using its subscription to the Cloud Pub/Sub service.

#. The Wazuh module receives all messages from its subscription and acknowledges each one to the Cloud Pub/Sub service.

#. Finally, the messages are removed from the subscription’s message queue.

.. thumbnail:: ../images/gcp/gcp-data-flow.png
    :align: center
    :width: 100%
