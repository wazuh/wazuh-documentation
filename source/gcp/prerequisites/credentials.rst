.. Copyright (C) 2021 Wazuh, Inc.
.. meta::
  :description: Learn more about GCP credentials configuration.


.. _gcp_credentials:

Configuring GCP credentials
===========================

In order to make the Wazuh GCP module pull log data from Google Pub/Sub, it will be necessary to provide access credentials so it can connect to them.

To do this, we will need to create a service account with the Pub/Sub permissions and then create a key. It is important to save this key as a JSON file. We will use this file as credentials for the GCP module.

Create a service account
------------------------

Within the **Service Accounts** section, create a new service account and add the following roles depending on which module to use: ``gcp-pubsub``, ``gcp-bucket`` or both:

- For ``gcp-pubsub`` add two roles with *Pub/Sub* permissions: **Pub/Sub Publisher** and **Pub/Sub Subscriber**.
- For ``gcp-bucket`` add the following role with *Google Cloud Storage bucket* permissions: **Storage Legacy Bucket Writer**

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
	   "private_key_id": "1f7578bcd3e41b54febdac907f9dea7b5d1ce352",
	   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCxjzFuu7kO+sfY\nXPq0EZo1Oth9YjCyrhIQr6XavJQyD/OT9gcd9Q5+/VvLwCXBijEgVdXFQf5Tcsh2\ndpp/hOjGuc7Lh9Kk+DtebUDZ9AIF92LvRX2yKJJ4a6zqV9iEqCfxAhSrwsYMLnp0\nGbxG0ACUR/VdLv8U2ctNDG4DL8jk6yYowABbsL/074GOFWtwW99w1BJb09+l0f2l\njIom15iY897W1gjOBskM7fsHm3WwlCwD/+4PPodp8PRIjvefnMwx7E0Lu6IcJ8Kg\n4Rhm1Rk5hJWKWEgQHmZ4ik4kc/FKdHRMGERkMY5VVYoZ6bUx7OdhF7Vt3HVZDA88\nsx9fbTBxAgMBAAECggEAAWSAHMA4KVfqLVY9WSAyN2yougMFIsGevqbCBD8qYmIh\npO1vDNsZLAHMsIJnSWdOD1TdAlkMJ5dk3xj7CTj/ol9esdX03vpbbNgqhAsX4PgZ\nvIqs+7K5w1wE1SmvNwsilQ9RHi++4eWTbEmvYlbLSl5uHDb8JSu4HniUfE3po3H5\nWDj01OMSe9dhaXrzhqOn2qo37XJ9xF1VCSkY3JRj3cY7W7crVE3UmDyYT+ZE1Tei\nyYhrZh1QDFeQVCFiHEP3RA1T/MYaFn1ylkwGcvgFvoB81vOJaVEXh1Xldwx/6KZC\nyrXBlnVqa//IuCtEE4zTl146G99kRdQFrAdqTadlSQKBgQDauQefH+zCpxTaO03E\nlzGoXr9mxo6Rzhim60e+uDgkCnDhElc3rqiuxFH6QNORa2/A/zvc7iHYZsu8QAvB\n776S9rrpxHoc1271fLqzMBR6gDkTzh/MjUJnsPNjnfehE2h6U8Zoeq755Xv9S85I\nuk9bIJzs5JH6xBEDxnIb/ier5wKBgQDP0i9jTb5TgrcqYYpjURsHGQRv+6lOaZrC\nD94vNDmhTLg3kW5b2BD0ZeZwGCwiSOSqL/5fjlRie94pPnIn6pm5uGgndgdRLQvw\nIdpRyvAUAOY7SnoLhZjVue4syzwV3k7+d4x7LrzpZclBH8uc3sLU3vOSsmFRIkf+\nfK9qcVv15wKBgQDL2fHRi/algQW9U9JqbKQakZwAVQThvd1aDSVECvxAEv8btnVV\nb1LF+DGTdUH6YdC5ZujLQ6KFx2ERZfvPV/wdixmv8LADG4LOB98WTLR5a/JGlDEs\n+2ctr01YxgzasnUItfXQwK8+N3U1Iab0P7jgbOf1Hh80QfK9uwH1Nw6QdwKBgCuP\nigFNpWxJxOzsPx6sPHcTZlu2q3lVJ2wv+Ul5r+7AbwiuwiwcMQmZZmDuoCmbj9qg\nbrhG1CdEgX+xqCn3wbstDR/gXI5GW+88mU91szbuLVQWO1i46x05eNQI0ZJf47zx\nABA97rkZbcLp0DsUclA+X13LaByii+aq6fXsxvLXAoGBALzkBzJ/SOvotz/UnBxl\nGU9QWmptZttaqtLKizPNQZpY1KO9VxeyoGbkTnN0M58ktpIp8LGlSJejk/tkRKBG\nUFRW/v49GW3eCgl4D+MOTFLCJDT68D2lp4F9hdBHsoH17ZdHy8rennmJN3QExIjx\n0xoq6OYjjzNwhFqkPl0H6HrM\n-----END PRIVATE KEY-----\n",
	   "client_email": "wazuh-mail@wazuh-gcloud-258815.iam.gserviceaccount.com",
	   "client_id": "102784232161964177687",
	   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
	   "token_uri": "https://oauth2.googleapis.com/token",
	   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/wazuh-gcloud-acc%40wazuh-gcloud-258815.iam.gserviceaccount.com"
	}

Please follow this `link <https://cloud.google.com/pubsub/docs/quickstart-py-mac#create_service_account_credentials>`_ if you need help configuring your GCP credentials JSON file for Google Cloud Pub/Sub.
