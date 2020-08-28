.. Copyright (C) 2020 Wazuh, Inc.

.. _pubsub:

Configuring Google Cloud Pub/Sub
================================

Google Cloud Pub/Sub is a fully-managed real-time messaging service that allows you to send and receive messages between independent applications.

We use it to get security events from the Google Cloud instances without creating a special logic to avoid reprocessing events.

In this section we will see how to create a topic, a subscription and a sink to fully configure Google Cloud Pub/Sub to work with Wazuh:

#. Set up your GCP project and Cloud Pub/Sub topic and subscriptions:

    Follow the `link <https://cloud.google.com/pubsub/docs/quickstart-py-mac#set_up_your_project_and_topic_and_subscriptions>`__ to setup Cloud Pub/Sub topic and subscription.

#. Export logs via sink:

    Follow the `link <https://cloud.google.com/logging/docs/export/configure_export_v2#begin>`__ to exports logs to the previously created Pub/Sub topic using a sink.

After you set everything up, you should see activity in the ``Log Viewer`` section. 
