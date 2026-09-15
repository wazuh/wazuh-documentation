.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh provides modules that integrate with the Google Cloud Pub/Sub and Google Cloud Storage bucket services in this section of the documentation.

Monitoring Google Cloud services
=================================

Wazuh integrates with Google Cloud :doc:`Pub/Sub </cloud-security/gcp/pubsub>` and :doc:`Cloud Storage </cloud-security/gcp/cloud-storage-buckets>` to collect security-related logs from supported Google Cloud services. Pub/Sub provides messaging between applications, while Cloud Storage provides object storage for data in Google Cloud.

The Wazuh Google Cloud integration collects logs such as data access, administrative activity, system events, and DNS activity. Wazuh analyzes these logs to detect suspicious activity and provide visibility into security events across your Google Cloud environment.

The following sections describe the prerequisites and supported Google Cloud services for configuring the integration.

.. toctree::
   :maxdepth: 2

   prerequisites/index
   pubsub
   cloud-storage-buckets
