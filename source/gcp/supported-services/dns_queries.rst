.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh GCP Pub/Sub module allows you to fetch logs from Google DNS queries. Learn more about the module's usage in this section.

.. _gcp_dns_queries:

DNS queries
===========

Wazuh has default rules for `DNS queries <https://cloud.google.com/monitoring/api/resources#tag_dns_query>`__ to a private DNS handled by the `Google Cloud DNS <https://cloud.google.com/dns/docs>`__ service. Those logs can be collected using the ``gcp-pubsub`` module. Details on how to configure the module can be found :ref:`gcp-pubsub configuration reference <gcp-pubsub>`.

.. thumbnail:: ../../images/gcp/gcp-dns-query.png
    :align: center
    :width: 100%
