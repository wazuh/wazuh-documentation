.. Copyright (C) 2021 Wazuh, Inc.

.. _gcp_load_balancing:

HTTP(S) Load Balancing Logging
==============================

.. note::
    This service is supported by Wazuh using the **gcp-pubsub** module. Details on how to configure this module can be found :ref:`here <gcp-pubsub>`.

`HTTP(S) Load Balancing Logging <https://cloud.google.com/load-balancing/docs/https/https-logging-monitoring>`__ allows the user to enable, disable, and view logs for an HTTP(S) Load Balancing backend service.

.. note:: To be able to send HTTP(S) Load Balancing Logging logs to Wazuh, Cloud Logging must be configured to export these logs to Pub/Sub first. More information about how Pub/Sub works and how to configure it :ref:`here <pubsub>`.


Enabling HTTP(S) Load Balancing Logging
---------------------------------------

HTTP(S) Load Balancing Logging can be enabled in the Load Balancing page in the Google Cloud Console. Follow its `official documentation <https://cloud.google.com/load-balancing/docs/https/https-logging-monitoring#enabling_logging_on_a_new_backend_service>`__ for the most up-to-date instructions on how to enable this feature.


Exporting HTTP(S) Load Balancing Logging logs to Pub/Sub
--------------------------------------------------------

In the :ref:`Pub/Sub <pubsub>` page, it was explained how to set up a sink to logs for a Pub/Sub topic. However, this would export every single log available, and not only the HTTP(S) Load Balancing Logging logs. It is possible to configure the sink to export HTTP(S) Load Balancing Logging logs only to a topic, ignoring logs coming from other services, by adding a filtering condition to the sink. To do so, follow the same instructions as explained in the :ref:`Pub/Sub <pubsub>` section but adding the following filter in **Step 3 - Choose logs to include in sink**:

.. code-block:: console

    resource.type=http_load_balancer

.. thumbnail:: ../../images/gcp/gcp-load-balancer-sink.png
    :align: center
    :width: 50%
