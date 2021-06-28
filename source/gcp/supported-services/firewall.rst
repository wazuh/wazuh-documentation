.. Copyright (C) 2021 Wazuh, Inc.

.. _gcp_firewall:

Firewall Rules Logging
======================

.. note::
    This service is supported by Wazuh using the **gcp-pubsub** module. Details on how to configure this module can be found :ref:`here <gcp-pubsub>`.

`Firewall Rules Logging <https://cloud.google.com/vpc/docs/firewall-rules-logging>`__ logs traffic to and from Compute Engine virtual machine (VM) instances. This includes Google Cloud products built on Compute Engine VMs, such as Google Kubernetes Engine (GKE) clusters and App Engine flexible environment instances.

.. note:: To be able to send Firewall Rules Logging logs to Wazuh, Cloud Logging must be configured to export these logs to Pub/Sub first. More information about how Pub/Sub works and how to configure it :ref:`here <pubsub>`.


Enabling Firewall Rules Logging
-------------------------------

Firewall Rules Logging can be enabled in the Firewall page in the Google Cloud Console. Follow its `official documentation <https://cloud.google.com/vpc/docs/using-firewall-rules-logging#enable>`__ for the most up-to-date instructions on how to enable this feature.


Exporting Firewall Rules Logging logs to Pub/Sub
------------------------------------------------

In the :ref:`Pub/Sub <pubsub>` page, it was explained how to set up a sink to logs for a Pub/Sub topic. However, this would export every single log available, and not only the Firewall Rules Logging logs. It is possible to configure the sink to export Firewall Rules Logging logs only to a topic, ignoring logs coming from other services, by adding a filtering condition to the sink. To do so, follow the same instructions as explained in the :ref:`Pub/Sub <pubsub>` section but adding the following filter in **Step 3 - Choose logs to include in sink**:

.. code-block:: console

    resource.type="gce_subnetwork"
    log_name="projects/<YOUR-PROJECT-ID>/logs/compute.googleapis.com%2Ffirewall"

.. thumbnail:: ../../images/gcp/gcp-vpc-flow-sink.png
    :align: center
    :width: 50%
