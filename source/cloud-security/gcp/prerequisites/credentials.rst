.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to authenticate Wazuh to Google Cloud to pull events and log data from the Google Pub/Sub or Google Storage services in this section of the documentation.

Creating Google Cloud credentials
=================================

You need to authenticate Wazuh to Google Cloud to pull events and log data from the Google Pub/Sub or Google Storage services. You must create a new service account and add roles depending on the desired module. A service account must have Pub/Sub permissions, Storage permissions, or both, along with a private key. It is important to save this private key in a JSON format as it will be used as the authentication method for the Wazuh Google Cloud modules.

Creating a service account
--------------------------

#. On your Google Cloud Platform console, navigate to the **IAM & Admin** > **Service Accounts** section or search for *Service Account* in the top center search bar.
#. Click on **+ CREATE SERVICE ACCOUNT**.
#. Add a name and description and click on **CREATE AND CONTINUE**.
#. Add roles to the service account:

   -  For the Wazuh module for Google Cloud Pub/Sub, add two roles with *Pub/Sub* permissions:

      -  **Pub/Sub Publisher**
      -  **Pub/Sub Subscriber**

   -  For the Wazuh module for Google Cloud Storage buckets, add the following roles with *Google Cloud Storage bucket* permissions:

      -  **Storage Object User**
      -  **Storage Insights Collector Service**

   Depending on your requirement, the service account can have the roles for authenticating to both Google Cloud Pub/Sub and Storage services.

#. Click **Done** to complete the creation of the service account.

Creating a credentials file for the service account
---------------------------------------------------

A credentials file is required by the Wazuh Google Cloud modules to access the Google Cloud Pub/Sub or Google Cloud Storage bucket services. You must add a new private key after creating a service account on Google Cloud. The private key, project ID, and other information are stored in a credentials file created on Google Cloud. The credential file is in JSON format.

Perform the following steps to add a new key to the service account.

#. Select the **Service Account** option from **IAM & Admin**.
#. From the **KEYS** tab, click on the **ADD KEY** dropdown button and select **Create Key**.
#. Select **JSON**, and click **CREATE** to complete the action.

   .. thumbnail:: /images/cloud-security/gcp/create-private-key-json.png
      :title: 
      :alt: 
      :align: center
      :width: 80%

   The credentials file will be downloaded on the endpoint accessing the Google Cloud console. See an example below of the format of a credentials file:

   .. code-block:: json

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

   Transfer the credentials file to the endpoint where you are performing the integration; either your Wazuh server or Wazuh agent. We recommend that you transfer the credentials file to the ``/var/ossec/wodles/gcloud/`` path, although you can also move this file to any path of your choice.

   Change the file ownership of the credentials file:

   .. code-block:: console

      $ sudo chown root:wazuh /var/ossec/wodles/gcloud/<AUTHENTICATION_FILE_NAME>.json
