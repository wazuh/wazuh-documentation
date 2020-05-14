.. Copyright (C) 2019 Wazuh, Inc.

.. _gcp:

Using Wazuh to monitor GCP services
===================================

.. meta::
  :description: Discover how Wazuh can help you to monitor your Google Cloud Platform (GCP) infrastructure.

.. versionadded:: 3.13.0

Wazuh helps to increase the security of a GCP infrastructure by collecting and analyzing log data. Thanks to the module for GCP, Wazuh can trigger alerts based on the events obtained from these services via Cloud Pub/Sub.

The Wazuh module for GCP (``gcp-pubsub``) provides the capability to monitor GCP based services. Each section below contains detailed instructions to configure and set up all of the supported services, and also the required Wazuh configuration to collect the logs.

This module requires dependencies in order to work, and also the right credentials in order to access to the services. Take a look at the :ref:`gcp_prerequisites` section before proceeding.


.. topic:: Contents

  .. toctree::
    :maxdepth: 1

    prerequisites/index
    configuration
    supported-services/index
