.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh GCP module allows you to fetch logs from Google Pub/Sub and Google Storage. Learn more about GCP credentials configuration in this section.


.. _gcp_credentials:

Configuring GCP credentials
===========================

In order to make the Wazuh GCP module pull log data from Google Pub/Sub or Google Storage, it will be necessary to provide access credentials so that it can connect to them.

To do this, it is recommended to create a service account with the Pub/Sub or Storage permissions and then create a key. It is important to save this key as a JSON file as it will be used as the authentication method for the GCP module.

Creating a service account
--------------------------

Within the **Service Accounts** section, create a new service account and add the following roles depending on which module to use: ``gcp-pubsub``, ``gcp-bucket``, or both.

- For ``gcp-pubsub``, add two roles with *Pub/Sub* permissions: **Pub/Sub Publisher** and **Pub/Sub Subscriber**.
- For ``gcp-bucket``, add the following role with *Google Cloud Storage bucket* permissions: **Storage Legacy Bucket Writer**.


Creating a private key
----------------------

After creating a service account, add a new key to it. To do this, click **Create Key**, select  **JSON**, and click **Create** to complete the action.

.. thumbnail:: /images/cloud-security/gcp/gcp-account-key.png
    :align: center
    :width: 100%

The new key should have this format:

::

	{
	   "type": "service_account",
	   "project_id": "wazuh-gcloud-123456",
	   "private_key_id": "1f7578bc********************d1ce352",
	   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEv********qkPl0H6HrM\n-----END PRIVATE KEY-----\n",
	   "client_email": "wazuh-mail@wazuh-gcloud-123456.iam.gserviceaccount.com",
	   "client_id": "102784232161964177687",
	   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
	   "token_uri": "https://oauth2.googleapis.com/token",
	   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/wazuh-gcloud-acc%40wazuh-gcloud-123456.iam.gserviceaccount.com"
	}

Check the official `Google Cloud Pub/Sub <https://cloud.google.com/pubsub/docs/building-pubsub-messaging-system#create_service_account_credentials>`_ documentation to learn more about how to configure the GCP credentials JSON file.

Authentication options
----------------------

Currently, the GCP integration only allows the credentials to be provided using an authentication file.

Using an authentication file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As explained before, the GCP integration requires a credentials file in JSON format containing the private key to access Google Cloud Pub/Sub or Google Cloud Storage bucket.

Regardless of the service, the authentication file is always specified in the ``ossec.conf`` configuration file using the ``<credentials_file>`` tag. Take a look at the following example:

.. code-block:: xml
   :emphasize-lines: 6, 14

    <gcp-pubsub>
        <pull_on_start>yes</pull_on_start>
        <interval>1m</interval>
        <project_id>wazuh-dev-123456</project_id>
        <subscription_name>wazuh-subscription</subscription_name>
        <credentials_file>/var/ossec/wodles/gcloud/credentials.json</credentials_file>
    </gcp-pubsub>

    <gcp-bucket>
        <run_on_start>yes</run_on_start>
        <interval>1m</interval>
        <bucket type="access_logs">
            <name>wazuh-test-bucket</name>
            <credentials_file>/var/ossec/wodles/gcloud/credentials.json</credentials_file>
            <only_logs_after>2021-JUN-01</only_logs_after>
            <path>access_logs/</path>
            <remove_from_bucket>no</remove_from_bucket>
        </bucket>
    </gcp-bucket>


Check the :doc:`gcp-pubsub </user-manual/reference/ossec-conf/gcp-pubsub>` and :doc:`gcp-bucket </user-manual/reference/ossec-conf/gcp-bucket>` sections from the ossec.conf reference page for more information about the ``<credentials_file>`` and other available parameters.
