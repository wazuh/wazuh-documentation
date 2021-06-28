.. Copyright (C) 2019 Wazuh, Inc.

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

Performance
-----------

The Wazuh module for GCP Pub/Sub uses a `Python library <https://googleapis.dev/python/pubsub/2.7.1/index.html/>`_ to pull the messages from the topic. Its implementation has design limitations when integrated with the Wazuh module.

The module's performance benefits from horizontal scaling. To achieve the performance boost, it is necessary to configure the module for the same subscription on different machines (either managers or agents).

In addition, it is possible to use multiple threads to pull a larger number of messages using the ``num_threads`` parameter in the :ref:`module configuration <num_threads>`.
