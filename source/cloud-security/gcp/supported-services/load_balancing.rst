.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh GCP Pub/Sub module allows you to process Google Load Balancing Logs. Learn more about the module's usage in this section.

.. _gcp_load_balancing:

HTTP(S) Load Balancing Logging
==============================

`HTTP(S) Load Balancing Logging <https://cloud.google.com/load-balancing/docs/https/https-logging-monitoring>`__ allows the user to enable, disable, and view logs for an HTTP(S) Load Balancing backend service. To be able to send HTTP(S) Load Balancing Logging logs to Wazuh, Cloud Logging must be configured to export these logs to Pub/Sub first.

Enabling HTTP(S) Load Balancing Logging
---------------------------------------

HTTP(S) Load Balancing Logging can be enabled on the Load Balancing page in the Google Cloud Console. Follow the `Google Cloud Load Balancing <https://cloud.google.com/load-balancing/docs/https/https-logging-monitoring#enabling_logging_on_a_new_backend_service>`__ documentation for the most up-to-date instructions on how to enable this feature.


Exporting HTTP(S) Load Balancing Logging logs to Pub/Sub
--------------------------------------------------------

The :ref:`Pub/Sub <pubsub>` page explains how to set up a sink to logs for a Pub/Sub topic. However, this would export every single log available, and not only the HTTP(S) Load Balancing Logging logs. It is possible to configure the sink to export HTTP(S) Load Balancing Logging logs only to a topic, ignoring logs coming from other services, by adding a filtering condition to the sink. To do so, follow the same instructions as explained in the :ref:`Pub/Sub <pubsub>` section but add the following filter in **Step 3 - Choose logs to include in sink**:

.. code-block:: console

    resource.type=http_load_balancer

.. thumbnail:: /images/cloud-security/gcp/gcp-load-balancer-sink.png
    :align: center
    :width: 100%
