.. Copyright (C) 2020 Wazuh, Inc.

.. _gcp_credentials:

Configuring GCP credentials
===========================

In order to make the Wazuh GCP module pull log data from Google Pub/Sub, it will be necessary to provide access credentials so it can connect to them.

To do this, we will need to create a service account with the Pub/Sub permissions and then create a key. It is important to save this key as a JSON file. We will use this file as credentials for the GCP module.

Create a service account
------------------------

Within the **Service Accounts** section, create a new service account and add two roles with *Pub/Sub* permissions: **publisher** and **subscriber**.

.. thumbnail:: ../../images/gcp/gcp-service-account.png
    :align: center
    :width: 100%

Create private key
------------------

After creating a service account, add a key for it. Save it as **JSON**:

.. thumbnail:: ../../images/gcp/gcp-account-key.png
    :align: center
    :width: 100%

Your key should have this format:

::

	{
	   "type": "service_account",
	   "project_id": "wazuh-gcloud-258815",
	   "private_key_id": "1f7578bc********************d1ce352",
	   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEv********qkPl0H6HrM\n-----END PRIVATE KEY-----\n",
	   "client_email": "wazuh-mail@wazuh-gcloud-258815.iam.gserviceaccount.com",
	   "client_id": "102784232161964177687",
	   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
	   "token_uri": "https://oauth2.googleapis.com/token",
	   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/wazuh-gcloud-acc%40wazuh-gcloud-258815.iam.gserviceaccount.com"
	}

Please follow this `link <https://cloud.google.com/pubsub/docs/quickstart-py-mac#create_service_account_credentials>`_ if you need help configuring your GCP credentials JSON file for Google Cloud Pub/Sub.
