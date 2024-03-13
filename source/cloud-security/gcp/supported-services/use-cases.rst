.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: 
  
Use cases
=========

In this section, we explore how to use the Wazuh module for Pub/Sub to collect and monitor different types of logs from your Google Cloud environment, such as cloud audit logs, DNS queries, VPC Flow Logs, Firewall Rules Logging, and HTTP(S) load balancing.

Cloud audit logs
----------------

Google Cloud provides four types of `audit logs <https://cloud.google.com/logging/docs/audit>`__ for each project, folder, and organization in your environment:

-  **Admin Activity** audit logs contain log entries for API calls or other administrative actions that modify the configuration or metadata of resources. This is useful for tracking administrative activities and changes made to the configuration of resources.
-  **Data Access** audit logs contain API calls that read the configuration or metadata of resources and user-driven API calls that create, modify, or read user-provided resource data. This is valuable for monitoring access to data, including who is reading or modifying resource configurations and user-provided data.
-  **System Event** audit logs contain log entries for Google Cloud administrative actions that modify the configuration of resources. The Google system generates these audit logs, which helps track system-level administrative actions that impact the configuration of resources.
-  **Policy Denied** audit logs are recorded when a Google Cloud service denies access to a user or service account because of a security policy violation.

These audit logs provide a comprehensive view of activities and events within a Google Cloud environment, supporting security, compliance, and operational needs.

Configuring Google Cloud audit logs collection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To collect Google Cloud audit logs, it is necessary to first ingest the audit logs into a Pub/Sub topic defining a custom log router.

.. note::

   Before you perform the steps below make sure that you have already configured the :doc:`Google Cloud Pub/Sub integration <>` and the :doc:`Wazuh module for Google Cloud Pub/Sub <>`.

#. Visit the `Google Cloud Logging section <https://console.cloud.google.com/logs/router>`__ and click on **Create sink**.

   .. thumbnail:: /images/cloud-security/gcp/gcp-log-router-create-sink.png
      :title: Create sink
      :alt: Create sink
      :align: center
      :width: 80%

#. Provide a descriptive name for the sink and click on **NEXT**.

   .. thumbnail:: /images/cloud-security/gcp/gcp-sink-details.png
      :title: Sink details
      :alt: Sink details
      :align: center
      :width: 80%

#. You need to select the sink destination after providing the name of the sink. Under **Select sink service**, select *Cloud Pub/Sub topic*, and then create or choose a topic to be used as a destination. Then click on **NEXT**.

   .. thumbnail:: /images/cloud-security/gcp/gcp-select-sink.png
      :title: Sink destination
      :alt: Sink destination
      :align: center
      :width: 80%

#. Under **Choose logs to include in sink**, use the following query to collect all the audit logs from every project. It is possible to edit it to only collect audit logs from a particular project:

   .. code-block:: none
      
      logName=~("projects/.*/logs/cloudaudit.googleapis.com%2F(activity|data_access|system_event|policy)")

#. If it is not necessary to filter any logs out of the sink, click on **CREATE SINK**.

   .. thumbnail:: /images/cloud-security/gcp/gcp-create-logs-routing-sink.png
      :title: Create sink
      :alt: Create sink
      :align: center
      :width: 80%

Once this process is finished, you can configure the :doc:`Wazuh module for Google Cloud Pub/Sub <>`  to process the audit logs of the selected resources as usual.

Visualizing the events on the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After configuring the Wazuh Google Cloud Pub/Sub module to fetch the audit logs from Google Cloud, it is possible to visualize the alerts generated in the Wazuh dashboard.

Set the operator for ``data.gcp.logName`` field to ``exists``.

.. thumbnail:: /images/cloud-security/gcp/filter-logname.png
   :title: Set logname filter
   :alt: Set logname filter
   :align: center
   :width: 80%

Available logs must appear as shown in the picture below.

.. thumbnail:: /images/cloud-security/gcp/dashboard-gcp-logs.png
   :title: Available logs in the wazuh dashboard
   :alt: Available logs in the wazuh dashboard
   :align: center
   :width: 80%

Visit the `Google Cloud documentation <https://cloud.google.com/logging/docs/audit/services>`__ to learn more about the different Google services capable of writing audit logs.

DNS queries
-----------

Wazuh has default rules for `DNS queries <https://cloud.google.com/monitoring/api/resources#tag_dns_query>`__ made to a private DNS handled by the `Google Cloud DNS <https://cloud.google.com/dns/docs>`__ service. Those logs can be collected using the Wazuh module for Google Cloud Pub/Sub. Details on how to configure the module can be found in the :doc:`gcp-pubsub configuration reference </user-manual/reference/ossec-conf/gcp-pubsub>`.

.. note::
   
   Before you perform the steps below make sure that you have already configured the :doc:`Google Cloud Pub/Sub integration <>` and the :doc:`Wazuh module for Google Cloud Pub/Sub <>`.

Configuring Google DNS logs collection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To collect the DNS queries made to the Google DNS service, we use DNS policies to enable or disable logging for your networks. When you enable query logging, every DNS query to a Cloud DNS private managed zone is logged.

#. On Google Cloud Console, click the Shell button to activate **Cloud Shell** and authenticate your Google Cloud SDK.

   .. thumbnail:: /images/cloud-security/gcp/gcp-activate-cloud-shell.png
      :title: Activate Cloud shell
      :alt: Activate Cloud shell
      :align: center
      :width: 80%

#. Enable logging:

   To enable logging for a network that does not have a DNS policy, run the ``dns policies create`` command:

   .. code-block:: none

      gcloud dns policies create <POLICY_NAME> --networks=<NETWORK_NAME>  --enable-logging --description=<DESCRIPTION>

   Where:

   -  ``<POLICY_NAME>``: Contains the name of the DNS policy
   -  ``<NETWORK>``: One or more networks in a comma-separated list
   -  ``<DESCRIPTION>``: A description of the policy

   Example:

   .. code-block:: none

      $ gcloud dns policies create enable-dns-logging --enable-logging --description="Enable DNS logging" --networks=wazuh-dev-net

   To enable logging for a network that has an existing DNS policy, run the ``dns policies update`` command:

   .. code-block:: none

      gcloud dns policies update <POLICY_NAME> --networks=<NETWORK_NAME>  --enable-logging

   Where:

   -  ``<POLICY_NAME>``: Takes the name of the DNS policy
   -  ``<NETWORK>``: one or more networks in a comma-separated list
   
   Example:

   .. code-block:: none

      $ gcloud dns policies update enable-dns-logging --enable-logging --networks=wazuh-dev-net

Exporting DNS queries logs to Pub/Sub
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once DNS Cloud logging is configured, the generated logs must be ingested into a Pub/Sub topic so that Wazuh can collect them using the :doc:`Google Pub/Sub integration <>`. To achieve that, it is necessary to define a custom log router.

#. Visit the `Google Cloud Logging section <https://console.cloud.google.com/logs/router>`__ and click on **CREATE SINK**.

   .. thumbnail:: /images/cloud-security/gcp/gcp-log-router-create-sink.png
      :title: Create sink
      :alt: Create sink
      :align: center
      :width: 80%

#. Provide a descriptive name for the sink and click on **NEXT**.

   .. thumbnail:: /images/cloud-security/gcp/gcp-sink-details2.png
      :title: Sink details
      :alt: Sink details
      :align: center
      :width: 80%

#. Once the name for the sink is chosen, it is necessary to select the sink destination. As a sink service, choose **Cloud Pub/Sub topic**, and then create or choose a topic to be used as a destination. Then click on **NEXT**.

   .. thumbnail:: /images/cloud-security/gcp/gcp-sink-destination2.png
      :title: Sink destination
      :alt: Sink destination
      :align: center
      :width: 80%

#. Use the following query to collect all the DNS queries:

   .. code-block:: none

      resource.type = "dns_query"

#. If it is not necessary to filter any logs out of the sink, click on **Create sink**.

   .. thumbnail:: /images/cloud-security/gcp/gcp-choose-logs.png
      :title: Choose logs to include in sink
      :alt: Choose logs to include in sink
      :align: center
      :width: 80%

You can confirm that logs are generated in your environment by running the query in the **Logs Explorer**, as shown in the picture below.

.. thumbnail:: /images/cloud-security/gcp/gcp-query-logs-explorer.png
   :title: Query in the Logs explorer
   :alt: Query in the Logs explorer
   :align: center
   :width: 80%

Visualizing the events on the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once you configure the sink, apply the filter below on the Google Cloud module of the Wazuh dashboard to filter for DNS queries logs.

Set the value of ``data.gcp.logName`` field to ``projects/<YOUR-PROJECT-ID>/logs/compute.googleapis.com%2Fdns_queries``.

Replace ``<YOUR-PROJECT-ID>`` with your project ID on Google Cloud.

.. thumbnail:: /images/cloud-security/gcp/filter-dns-query-logs.png
   :title: Filter DNS query logs
   :alt: Filter DNS query logs
   :align: center
   :width: 80%

Available logs must appear as shown in the picture below.

.. thumbnail:: /images/cloud-security/gcp/dns-query-available-logs.png
   :title: Available DNS query logs
   :alt: Available DNS query logs
   :align: center
   :width: 80%

VPC Flow Logs
-------------

`VPC Flow Logs <https://cloud.google.com/vpc/docs/flow-logs>`__ record a sample of network flows sent from and received by VM instances, including instances used as Google Kubernetes Engine nodes. VPC Flow Logs are aggregated by the connection from Compute Engine VMs and exported in real-time.

.. note::
   
   Before you perform the steps below make sure that you have already configured the :doc:`Google Cloud Pub/Sub integration <>` and the :doc:`Wazuh module for Google Cloud Pub/Sub <>`.

Enabling VPC Flow Logs
^^^^^^^^^^^^^^^^^^^^^^

VPC Flow Logs can be enabled on the VPC networks page in the Google Cloud Console. They can be enabled for both new and existing subnets. Follow the `Google Virtual Private Cloud <https://cloud.google.com/vpc/docs/using-flow-logs#enabling-vpc-flow-logs>`__ documentation for the most up-to-date instructions on how to enable this feature.

Exporting VPC Flow Logs to Pub/Sub
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The :doc:`Export logs via sink <>` section explains how to create a sink to export logs to a Pub/Sub topic. However, this would export every single log available, not just the VPC Flow Logs. It is possible to configure the sink to export VPC Flow Logs only to a topic, ignoring logs coming from other services by adding a filtering condition to the sink. To do so, follow the same instructions as explained in the :doc:`Export logs via sink <>` section but add the following filter in Step 3 - **Choose logs to include in sink**:

.. code-block:: none

   resource.type="gce_subnetwork"
   log_name="projects/<YOUR-PROJECT-ID>/logs/compute.googleapis.com%2Fvpc_flows"

Replace ``<YOUR-PROJECT-ID>`` with your project ID on Google Cloud.

.. thumbnail:: /images/cloud-security/gcp/gcp-create-logs-routing-sink-vpc-flow.png
   :title: Create logs routing sink
   :alt: Create logs routing sink
   :align: center
   :width: 80%

You can confirm that logs are generated in your environment by running the query in the **Logs Explorer**, as shown in the picture below.

.. thumbnail:: /images/cloud-security/gcp/vpc-flow-logs-query.png
   :title: VPC flow logs query
   :alt: VPC flow logs query
   :align: center
   :width: 80%

Visualizing the events on Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^