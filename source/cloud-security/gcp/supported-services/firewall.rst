.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh GCP Pub/Sub module allows you to collect firewall logs from your Google Virtual Machines. Learn more about the module's usage in this section.

.. _gcp_firewall:

Firewall Rules Logging
======================

`Firewall Rules Logging <https://cloud.google.com/vpc/docs/firewall-rules-logging>`__ logs traffic to and from Compute Engine virtual machine (VM) instances. This includes Google Cloud products built on Compute Engine VMs, such as Google Kubernetes Engine (GKE) clusters and App Engine flexible environment instances. To be able to send Firewall Rules Logging logs to Wazuh, Cloud Logging must be configured to export these logs to Pub/Sub first. 

Enabling Firewall Rules Logging
-------------------------------

Firewall Rules Logging can be enabled on the Firewall page in the Google Cloud Console. Follow the `Google Virtual Private Cloud <https://cloud.google.com/vpc/docs/using-firewall-rules-logging#enable>`__ documentation for the most up-to-date instructions on how to enable this feature.


Exporting Firewall Rules Logging logs to Pub/Sub
------------------------------------------------

The :ref:`Pub/Sub <pubsub>` page explains how to set up a sink to logs for a Pub/Sub topic. However, this would export every single log available, and not only the Firewall Rules Logging logs. It is possible to configure the sink to export Firewall Rules Logging logs only to a topic, ignoring logs coming from other services, by adding a filtering condition to the sink. To do so, follow the same instructions as explained in the :ref:`Pub/Sub <pubsub>` section but add the following filter in **Step 3 - Choose logs to include in sink**:

.. code-block:: console

    resource.type="gce_subnetwork"
    log_name="projects/<YOUR-PROJECT-ID>/logs/compute.googleapis.com%2Ffirewall"

.. thumbnail:: /images/cloud-security/gcp/gcp-vpc-flow-sink.png
    :align: center
    :width: 100%
