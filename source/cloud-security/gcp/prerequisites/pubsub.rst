.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Google Cloud Pub/Sub is a real-time messaging service to send and receive messages between applications. Learn how to use this service with Wazuh here.
  
.. _pubsub:

Configuring Google Cloud Pub/Sub
================================

Google Cloud Pub/Sub is a fully-managed real-time messaging service that allows you to send and receive messages between independent applications.

We use it to get security events from the Google Cloud instances without creating a special logic to avoid reprocessing events.

In this section, we see how to create a topic, a subscription, and a sink to fully configure Google Cloud Pub/Sub to work with Wazuh.

.. warning::

   The Wazuh GCP module does not support multiple Pub/Sub sections in the same configuration. To configure more than one service, deploying multiple agents is required.

Create a topic
--------------

Every publishing application sends messages to topics. Wazuh will retrieve the logs from this topic.

.. thumbnail:: /images/cloud-security/gcp/gcp-topic.png
    :align: center
    :width: 100%

Create a subscription
---------------------

Follow the steps below to fill in the **Create subscription** form:

#. Fill in the **Subscription ID**
#. Select a topic from **Select a Cloud Pub/Sub topic**
#. Choose **Pull** in the **Delivery type** field
#. Select the duration of the **Message retention duration**
#. Select the duration in days of the **Expiration period**

You can create as many subscriptions as you wish.

.. thumbnail:: /images/cloud-security/gcp/gcp-subscription.png
    :align: center
    :width: 100%

At this point, the Pub/Sub environment is ready to manage the message flow between the publishing and subscribing applications.

Get your credentials
--------------------

If you do not have credentials yet, follow the steps in the :ref:`credentials section <gcp_credentials>`.

Export logs via sink
--------------------

Log activities should appear under the **Logs Router** section. Cloud Audit logs can be published to a Cloud Pub/Sub topic through the sinks. Create a sink and use the topic as a destination.

Follow the steps below to complete the **Create logs routing sink** form:

#. **Sink details**: provide a name and description for logs routing sink
#. **Sink destination**: select the sink service type and destination
#. **Choose logs to include in sink**: create an inclusion filter to determine which logs are included
#. **Choose logs to filter out to sink**: create exclusion filters to determine which logs are excluded
#. Click the **CREATE SINK** button.

.. thumbnail:: /images/cloud-security/gcp/gcp-sink.png
    :align: center
    :width: 100%

After you set everything up, you should see activity in the ``Log Viewer`` section. Follow the `link <https://cloud.google.com/pubsub/docs/building-pubsub-messaging-system#set_up_your_project_and_topic_and_subscriptions>`__ if you need help setting up Cloud Pub/Sub topic and subscription.
