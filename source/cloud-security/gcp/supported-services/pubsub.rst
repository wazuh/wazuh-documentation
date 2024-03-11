.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: 
  
Monitoring Google Cloud Pub/Sub
===============================

Wazuh integrates with the Google Cloud Pub/Sub messaging and ingestion service using the Wazuh module for Google Cloud Pub/Sub. Google Cloud Pub/Sub is widely used for event-driven systems and streaming analytics. It allows sending and receiving messages between different applications. Integrating with the Pub/Sub service allows the Wazuh module for Google Cloud Pub/Sub to fetch different events like the ones listed below from your Google Cloud environment:

-  :doc:`Audited resources <>`
-  :doc:`DNS queries <>`
-  :doc:`VPC Flow Logs <>`
-  :doc:`Firewall Rules Logging <>`
-  :doc:`HTTP(S) Load Balancing Logging <>`

Once these events are collected, Wazuh processes them using its :doc:`detection rules </user-manual/ruleset/index>` and displays the appropriate alerts on the Wazuh dashboard.

The data flow between Google Cloud Pub/Sub and Wazuh is shown below. Visit this `Google Cloud documentation <https://cloud.google.com/pubsub/docs/pubsub-basics>`__ to learn more about the Pub/Sub service.

#. A publisher service or application sends messages to a Google Cloud Pub/Sub topic.
#. Each published message remains stored until the Wazuh module for Google Cloud Pub/Sub reads and processes them.
#. Wazuh pulls the messages using its subscription to the Google Cloud Pub/Sub service.
#. Wazuh receives all messages from its subscription and acknowledges each one to the Google Cloud Pub/Sub service.
#. The Google Cloud Pub/Sub service then removes messages from the subscription’s message queue.

   .. thumbnail:: /images/cloud-security/gcp/gcp-wazuh-dataflow.png
      :title: Data flow between Google Cloud Pub/Sub and Wazuh
      :alt: Data flow between Google Cloud Pub/Sub and Wazuh
      :align: center
      :width: 80%

Configuring Google Cloud Pub/Sub
--------------------------------

To integrate Wazuh with Google Cloud Pub/Sub, you first need to create a topic, and subscription, and then configure the Wazuh server with the subscription details and credentials.

In this section, we describe how to perform each of these steps.

Creating a topic
^^^^^^^^^^^^^^^^

#. In the Google Cloud console, click on **Pub/Sub** or search for **Pub/Sub** in the search bar and select it.
#. Click on the **Topics** tab and select the **Create Topic** button.
#. Enter a name for your topic in **Topic ID** and click **CREATE** to create the topic.

   .. thumbnail:: /images/cloud-security/gcp/gcp-create-topic.png
      :title: Create topic
      :alt: Create topic
      :align: center
      :width: 80%

Creating a topic will automatically create a new subscription. If a subscription was not created, or you need to add more subscriptions, follow the steps below.  If not, skip the section below.

Adding a subscription 
^^^^^^^^^^^^^^^^^^^^^

#. In the left-hand navigation pane, click on **Pub/Sub** to open the **Pub/Sub** section.
#. Click on **Topics** and select the topic you just created.
#. In the Subscription tab, click on the **Create subscription** button and fill in the **subscription** form:

   -  Fill in the **Subscription ID**
   -  Select a topic from **Select a Cloud Pub/Sub topic**
   -  Choose **Pull** in the **Delivery type** field
   -  Select the duration of the **Message retention duration**
   -  Select the duration in days of the **Expiration period**

You can create as many subscriptions as you wish.

.. thumbnail:: /images/cloud-security/gcp/gcp-create-subscription.png
   :title: Create subscription
   :alt: Create subscription
   :align: center
   :width: 80%

At this point, the Pub/Sub environment is ready to manage the message flow between the publishing services and the Wazuh module for Google Cloud Pub/Sub.

Setting up Google Cloud credentials for Wazuh
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you do not have credentials yet, follow the steps in the :doc:`credentials </cloud-security/gcp/prerequisites/credentials>` section.

Configuring the Wazuh module for Google Cloud Pub/Sub
-----------------------------------------------------

Follow the next steps to configure the Wazuh module for Google Cloud Pub/Sub on your Wazuh server or Wazuh agent to access the Pub/Sub services.

#. Append the following configuration to the ``/var/ossec/etc/ossec.conf`` configuration file of your preferred endpoint:

   .. code-block:: xml

      <ossec_config>
        <gcp-pubsub>
          <pull_on_start>yes</pull_on_start>
          <interval>1m</interval>
          <project_id><YOUR_PROJECT_ID></project_id>
          <subscription_name><YOUR_SUBSCRIPTION_ID></subscription_name>
          <credentials_file>/var/ossec/wodles/gcloud/<AUTHENTICATION_FILE_NAME>.json</credentials_file>
        </gcp-pubsub>
      </ossec_config>

   Where:

   -  ``<pull_on_start>`` pulls logs on the start or restart of the Wazuh manager or agent service, depending on where the module is configured, and by default is set to ``yes``.
   -  ``<interval>`` sets a time interval between module execution.
   -  ``<project_id>`` represents your Google Cloud project ID and ``<YOUR_PROJECT_ID>`` represents your project ID.
   -  ``<subscription_name>`` represents the subscription name created for this Topic, and <YOUR_SUBSCRIPTION_ID> represents your subscription ID.
   -  ``<credential_file>`` represents the path to the Google Cloud credentials file <AUTHENTICATION_FILE_NAME> represents the path to the Google Cloud credentials file. Ensure the JSON extension is present after the file. If you do not have credentials, follow the steps in the :doc:`configuring Google Cloud credentials </cloud-security/gcp/prerequisites/credentials>` section. 

   See the :doc:`gcp-pubsub </user-manual/reference/ossec-conf/gcp-pubsub>` section for more information on configuring the Wazuh module for Google Pub/Sub.

#. Restart the Wazuh manager or agent service to apply the changes:

   .. tabs::

      .. group-tab:: Wazuh manager

         .. code-block:: console

            # systemctl restart wazuh-manager

      .. group-tab:: Wazuh agent

         .. code-block:: console

            # systemctl restart wazuh-agent

Export logs via sink
--------------------

Google Cloud log activities appear under the **Log Router** section. Cloud audit logs can be published to a Cloud Pub/Sub topic through sinks. Create a sink and use the topic as a destination.

#. In the Google Cloud console pane, click on **Logging** or search for **Log Router** in the search bar and select it.
#. Select **Log Router** and click the **Create Sink** button.
#. Follow the steps below to complete the **Create logs routing sink** form.

   #. **Sink details**: provide a name and description for the logs routing sink.
   #. **Sink destination**: select the sink service type and destination.
   #. **Choose logs to include in sink**: create an inclusion filter to determine which logs are included.
   #. **Choose logs to filter out to sink**: create exclusion filters to determine which logs are excluded.
   #. Click the **CREATE SINK** button.

.. thumbnail:: /images/cloud-security/gcp/gcp-create-sink-destination.png
   :title: Create sink
   :alt: Create sink
   :align: center
   :width: 80%

After you set everything up, you should see activity in the **Logs Explorer** tab.

.. thumbnail:: /images/cloud-security/gcp/gcp-logs-explorer-activity.png
   :title: Activity in Logs explorer
   :alt: Activity in Logs explorer
   :align: center
   :width: 80%

Once the configuration is complete, you can visualize the logs on the Google Cloud module on your Wazuh dashboard.

.. thumbnail:: /images/cloud-security/gcp/visualize-gcp-logs.png
   :title: Visualize logs in the Google Cloud module
   :alt: Visualize logs in the Google Cloud module
   :align: center
   :width: 80%
