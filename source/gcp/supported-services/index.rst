.. Copyright (C) 2021 Wazuh, Inc.

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

The `gcp-pubsub` configuration used to pull data from Google Cloud Pub/Sub can be checked :ref:`here <gcp-pubsub>`.

Supported services using Google Cloud Storage buckets
-----------------------------------------------------

The following GCP services are supported by the Wazuh GCP module by pulling the data from Google Cloud Storage buckets:

.. toctree::
   :maxdepth: 2

   access_logs

The `gcp-bucket` configuration used to pull data from Google Cloud Storage buckets can be checked :ref:`here <gcp-bucket>`.
