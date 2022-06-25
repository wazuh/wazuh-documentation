.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Google Cloud Pub/Sub is a real-time messaging service to send and receive messages between independent applications. Learn how to configure this service.

.. _pubsub:

Configuring Google Cloud Pub/Sub
================================

Google Cloud Pub/Sub is a fully-managed real-time messaging service that allows you to send and receive messages between independent applications.

We use it to get security events from the Google Cloud instances without creating a special logic to avoid reprocessing events.

In this section we will see how to create a topic, a subscription and a sink to fully configure Google Cloud Pub/Sub to work with Wazuh.

Create a topic
--------------

Every publishing application sends messages to topics. Wazuh will retrieve the logs from this topic.

.. thumbnail:: ../../images/gcp/gcp-topic.png
    :align: center
    :width: 100%

Create a subscription
---------------------

Use the button below the topic details (choose *pull* delivery). You can create as many subscriptions as you wish.

.. thumbnail:: ../../images/gcp/gcp-subscription.png
    :align: center
    :width: 100%

At this point, the Pub/Sub environment is ready to manage the message flow between the publishing and subscribing applications.

Get your credentials
--------------------

If you do not have credentials yet, follow the steps in the :ref:`credentials section <gcp_credentials>`.

Export logs via sink
--------------------

Log activities should appear under the **Logs Router** section. Cloud Audit logs can be published to a Cloud Pub/Sub topic through the sinks. Create a sink and use the topic as destination.

.. thumbnail:: ../../images/gcp/gcp-sink.png
    :align: center
    :width: 100%

After you set everything up, you should see activity in the ``Log Viewer`` section. Follow the `link <https://cloud.google.com/pubsub/docs/quickstart-py-mac#set_up_your_project_and_topic_and_subscriptions>`__ if you need help to set up Cloud Pub/Sub topic and subscription.
