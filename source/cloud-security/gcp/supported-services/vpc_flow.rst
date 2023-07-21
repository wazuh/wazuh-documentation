.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh GCP Pub/Sub module allows you to process Google VPC Flow Logs. Learn more about the module's usage in this section.

.. _gcp_vpc_flow:

VPC Flow logs
=============

`VPC Flow Logs <https://cloud.google.com/vpc/docs/flow-logs>`__ records a sample of network flows sent from and received by VM instances, including instances used as Google Kubernetes Engine nodes. Flow logs are aggregated by the connection from Compute Engine VMs and exported in real time.


Enabling VPC Flow Logs
----------------------

VPC Flow Logs can be enabled on the VPC networks page in the Google Cloud Console. They can be enabled for both new and existing subnets. Follow the `Google Virtual Private Cloud <https://cloud.google.com/vpc/docs/using-flow-logs#enabling-vpc-flow-logs>`__ documentation for the most up-to-date instructions on how to enable this feature.


Exporting VPC Flow logs to Pub/Sub
----------------------------------

The :ref:`Pub/Sub <pubsub>` page explains how to set up a sink to logs for a Pub/Sub topic. However, this would export every single log available, and not only the VPC Flow logs. It is possible to configure the sink to export VPC Flow logs only to a topic, ignoring logs coming from other services, by adding a filtering condition to the sink. To do so, follow the same instructions as explained in the :ref:`Pub/Sub <pubsub>` section but add the following filter in **Step 3 - Choose logs to include in sink**:

.. code-block:: console

    resource.type="gce_subnetwork"
    log_name="projects/<YOUR-PROJECT-ID>/logs/compute.googleapis.com%2Fvpc_flows"

.. thumbnail:: /images/cloud-security/gcp/gcp-vpc-flow-sink.png
    :align: center
    :width: 70%
