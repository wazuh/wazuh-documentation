.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh GCP module allows you to collect and process logs from several Google service. Learn more about the supported services in this section.


.. _gcp_supported_services:

Supported services
==================

.. meta::
  :description: Supported services

The Wazuh GCP module is able to retrieve logs from Google Cloud Pub/Sub and from Google Cloud Storage buckets.

Supported services using Google Cloud Pub/Sub
---------------------------------------------

The following GCP services are supported by the Wazuh GCP module by pulling the data from Google Cloud Pub/Sub:

.. toctree::
   :maxdepth: 2

   cloud_audit_logs
   dns_queries
   vpc_flow
   firewall
   load_balancing

To check the ``gcp-pubsub`` configuration used to pull data from Google Cloud Pub/Sub, see the :ref:`gcp-pubsub <gcp-pubsub>` section.

Supported services using Google Cloud Storage buckets
-----------------------------------------------------

The following GCP services are supported by the Wazuh GCP module by pulling the data from Google Cloud Storage buckets:

.. toctree::
   :maxdepth: 2

   access_logs

To check the `gcp-bucket` configuration used to pull data from Google Cloud Storage buckets, see the :ref:`gcp-bucket <gcp-bucket>` section.

