.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh GCP Pub/Sub module allows you to fetch logs from Google DNS queries. Learn more about the module's usage in this section.

.. _gcp_dns_queries:

DNS queries
===========

Wazuh has default rules for `DNS queries <https://cloud.google.com/monitoring/api/resources#tag_dns_query>`__ made to a private DNS handled by the `Google Cloud DNS <https://cloud.google.com/dns/docs>`__ service. Those logs can be collected using the ``gcp-pubsub`` module. Details on how to configure the module can be found in the :ref:`gcp-pubsub configuration reference <gcp-pubsub>`.

Configure Google DNS logs collection
------------------------------------

To collect the DNS queries made to the Google DNS service it is necessary to enable DNS logging. To do that, follow the `Google Cloud DNS logging guide <https://cloud.google.com/dns/docs/monitoring>`_.

Once DNS Cloud logging is configured, the generated logs must be ingested into a Pub/Sub topic so that Wazuh can collect them using the :ref:`Pub/Sub integration <pubsub>`. To achieve that, it is necessary to define a custom log router.

#. Visit the `Google Cloud Logging section  <https://console.cloud.google.com/logs/router>`_ and click on **CREATE SINK**.

    .. thumbnail:: /images/cloud-security/gcp/gcp-create-sink-button.png
	:align: center
	:width: 100%

#. Provide a descriptive name for the sink and click on **NEXT**.

    .. thumbnail:: /images/cloud-security/gcp/gcp-sink-dns-name.png
	:align: center
	:width: 80%

#. Once the name for the sink is chosen, it is necessary to select the sink destination. As sink service, choose **Cloud Pub/Sub topic**, and then create or choose a topic to be used as destination. Then click on **NEXT**.

    .. thumbnail:: /images/cloud-security/gcp/gcp-sink-dns-destination.png
	:align: center
	:width: 80%

#. Use the following query to collect all the DNS queries.

    .. code-block:: none

	resource.type = "dns_query"


#. If it is not necessary to filter any logs out of the sink, click on **CREATE SINK**.

    .. thumbnail:: /images/cloud-security/gcp/gcp-create-sink-dns.png
	:align: center
	:width: 80%

Once this process is finished, you can configure the :ref:`Wazuh GCP Pub/Sub integration <pubsub>` to process the audit logs of the selected resources as usual.

Wazuh dashboard visualization
-----------------------------

After configuring the GCP Pub/Sub module to fetch the DNS logs from Google Cloud, it is possible to visualize the alerts generated in the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/gcp/gcp-kibana-dns-overview.png
    :align: center
    :width: 80%

Google Cloud logs can be filtered by the **data.gcp.logName** field:

.. thumbnail:: /images/cloud-security/gcp/gcp-kibana-dns-log-filter.png
    :align: center
    :width: 80%

After selecting the **Exists in** button, only Google Cloud-related events will appear in the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/gcp/gcp-kibana-dns-filtered-logs.png
    :align: center
    :width: 80%

