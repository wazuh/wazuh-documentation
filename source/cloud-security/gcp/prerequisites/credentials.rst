.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: 

Creating Google Cloud credentials
=================================

You need to authenticate Wazuh to Google Cloud to pull events and log data from the Google Pub/Sub or Google Storage services. You must create a new service account and add roles depending on the desired module. A service account must have Pub/Sub permissions, Storage permissions, or both, along with a private key. It is important to save this private key in a JSON format as it will be used as the authentication method for the Wazuh Google Cloud modules.

Creating a service account
--------------------------

#. On your Google Cloud Platform console, navigate to the **IAM & Admin** > **Service Accounts** section or search for *Service Account* in the top center search bar.
#. Click on **+ CREATE SERVICE ACCOUNT**.
#. Add a name and description and click on **CREATE AND CONTINUE**.
#. Add roles to the service account:

   -  For the Wazuh module for Google Cloud Pub/Sub, add two roles with *Pub/Sub* permissions: **Pub/Sub Publisher** and **Pub/Sub Subscriber**.
   -  For the Wazuh module for Google Cloud Storage buckets, add the following role with *Google Cloud Storage bucket* permissions: **Storage Object User**.

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
         "private_key_id": "1f7578bcd3e41b54febdac907f9dea7b5d1ce352",
         "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCxjzFuu7kO+sfY\nXPq0EZo1Oth9YjCyrhIQr6XavJQyD/OT9gcd9Q5+/VvLwCXBijEgVdXFQf5Tcsh2\ndpp/hOjGuc7Lh9Kk+DtebUDZ9AIF92LvRX2yKJJ4a6zqV9iEqCfxAhSrwsYMLnp0\nGbxG0ACUR/VdLv8U2ctNDG4DL8jk6yYowABbsL/074GOFWtwW99w1BJb09+l0f2l\njIom15iY897W1gjOBskM7fsHm3WwlCwD/+4PPodp8PRIjvefnMwx7E0Lu6IcJ8Kg\n4Rhm1Rk5hJWKWEgQHmZ4ik4kc/FKdHRMGERkMY5VVYoZ6bUx7OdhF7Vt3HVZDA88\nsx9fbTBxAgMBAAECggEAAWSAHMA4KVfqLVY9WSAyN2yougMFIsGevqbCBD8qYmIh\npO1vDNsZLAHMsIJnSWdOD1TdAlkMJ5dk3xj7CTj/ol9esdX03vpbbNgqhAsX4PgZ\nvIqs+7K5w1wE1SmvNwsilQ9RHi++4eWTbEmvYlbLSl5uHDb8JSu4HniUfE3po3H5\nWDj01OMSe9dhaXrzhqOn2qo37XJ9xF1VCSkY3JRj3cY7W7crVE3UmDyYT+ZE1Tei\nyYhrZh1QDFeQVCFiHEP3RA1T/MYaFn1ylkwGcvgFvoB81vOJaVEXh1Xldwx/6KZC\nyrXBlnVqa//IuCtEE4zTl146G99kRdQFrAdqTadlSQKBgQDauQefH+zCpxTaO03E\nlzGoXr9mxo6Rzhim60e+uDgkCnDhElc3rqiuxFH6QNORa2/A/zvc7iHYZsu8QAvB\n776S9rrpxHoc1271fLqzMBR6gDkTzh/MjUJnsPNjnfehE2h6U8Zoeq755Xv9S85I\nuk9bIJzs5JH6xBEDxnIb/ier5wKBgQDP0i9jTb5TgrcqYYpjURsHGQRv+6lOaZrC\nD94vNDmhTLg3kW5b2BD0ZeZwGCwiSOSqL/5fjlRie94pPnIn6pm5uGgndgdRLQvw\nIdpRyvAUAOY7SnoLhZjVue4syzwV3k7+d4x7LrzpZclBH8uc3sLU3vOSsmFRIkf+\nfK9qcVv15wKBgQDL2fHRi/algQW9U9JqbKQakZwAVQThvd1aDSVECvxAEv8btnVV\nb1LF+DGTdUH6YdC5ZujLQ6KFx2ERZfvPV/wdixmv8LADG4LOB98WTLR5a/JGlDEs\n+2ctr01YxgzasnUItfXQwK8+N3U1Iab0P7jgbOf1Hh80QfK9uwH1Nw6QdwKBgCuP\nigFNpWxJxOzsPx6sPHcTZlu2q3lVJ2wv+Ul5r+7AbwiuwiwcMQmZZmDuoCmbj9qg\nbrhG1CdEgX+xqCn3wbstDR/gXI5GW+88mU91szbuLVQWO1i46x05eNQI0ZJf47zx\nABA97rkZbcLp0DsUclA+X13LaByii+aq6fXsxvLXAoGBALzkBzJ/SOvotz/UnBxl\nGU9QWmptZttaqtLKizPNQZpY1KO9VxeyoGbkTnN0M58ktpIp8LGlSJejk/tkRKBG\nUFRW/v49GW3eCgl4D+MOTFLCJDT68D2lp4F9hdBHsoH17ZdHy8rennmJN3QExIjx\n0xoq6OYjjzNwhFqkPl0H6HrM\n-----END PRIVATE KEY-----\n",
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
