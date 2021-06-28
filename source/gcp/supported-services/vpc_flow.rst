.. Copyright (C) 2021 Wazuh, Inc.

.. _gcp_vpc_flow:

VPC Flow logs
=============

.. note::
    This service is supported by Wazuh using the **gcp-pubsub** module. Details on how to configure this module can be found :ref:`here <gcp-pubsub>`.

`VPC Flow Logs <https://cloud.google.com/vpc/docs/flow-logs>`__ records a sample of network flows sent from and received by VM instances, including instances used as Google Kubernetes Engine nodes. Flow logs are aggregated by the connection from Compute Engine VMs and exported in real time.

.. note:: To be able to send VPC Flow logs to Wazuh, Cloud Logging must be configured to export these logs to Pub/Sub first. More information about how Pub/Sub works and how to configure it :ref:`here <pubsub>`.


Enabling VPC Flow Logs
----------------------

VPC Flow Logs can be enabled in the VPC networks page in the Google Cloud Console. They can be enabled for both new and existing subnets. Follow its `official documentation <https://cloud.google.com/vpc/docs/using-flow-logs#enabling-vpc-flow-logs>`__ for the most up-to-date instructions on how to enable this feature.


Exporting VPC Flow logs to Pub/Sub
----------------------------------

In the :ref:`Pub/Sub <pubsub>` page, it was explained how to set up a sink to logs for a Pub/Sub topic. However, this would export every single log available, and not only the VPC Flow logs. It is possible to configure the sink to export VPC Flow logs only to a topic, ignoring logs coming from other services, by adding a filtering condition to the sink. To do so, follow the same instructions as explained in the :ref:`Pub/Sub <pubsub>` section but adding the following filter in **Step 3 - Choose logs to include in sink**:

.. code-block:: console

    resource.type="gce_subnetwork"
    log_name="projects/<YOUR-PROJECT-ID>/logs/compute.googleapis.com%2Fvpc_flows"

.. thumbnail:: ../../images/gcp/gcp-vpc-flow-sink.png
    :align: center
    :width: 70%
