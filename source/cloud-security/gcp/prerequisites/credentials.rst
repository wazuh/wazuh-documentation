.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh GCP module allows you to fetch logs from Google Pub/Sub and Google Storage. Learn more about GCP credentials configuration in this section.


.. _gcp_credentials:

Configuring GCP credentials
===========================

In order to make the Wazuh GCP module pull log data from Google Pub/Sub or Google Storage, it will be necessary to provide access credentials so that it can connect to them.

To do this, it is recommended to create a service account with the Pub/Sub or Storage permissions and then create a key. It is important to save this key as a JSON file as it will be used as the authentication method for the GCP module.

Creating a custom role
----------------------

The ``gcp-bucket`` module requires permissions to access storage buckets and objects. These permissions were originally assigned using the **Storage Legacy Bucket Writer** role, but it is no longer available for selection, so it will be necessary to create a new one.

To create the new role, follow these steps:

#. Go to the **Roles** section and click on **Create Role**.
#. Establish a **Title** and click on **Add Permissions**.
#. On the search bar, filter available permissions by typing **Storage Legacy Bucket Writer**. Select the following ones:

   - ``storage.bucket.get``
   - ``storage.objects.create``
   - ``storage.objects.delete``
   - ``storage.objects.list``

#. Click on **Create**.

.. thumbnail:: /images/cloud-security/gcp/gcp-bucket-role.png
    :align: center
    :width: 100%

Creating a service account
--------------------------

Within the **Service Accounts** section, create a new service account and add the following roles depending on which module to use: ``gcp-pubsub``, ``gcp-bucket``, or both.

- For ``gcp-pubsub``, add two roles with *Pub/Sub* permissions: **Pub/Sub Publisher** and **Pub/Sub Subscriber**.
- For ``gcp-bucket``, add the following role with *Google Cloud Storage bucket* permissions: **Storage Bucket Writer**.

.. thumbnail:: /images/cloud-security/gcp/gcp-service-account.png
    :align: center
    :width: 100%

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
	   "private_key_id": "1f7578bcd3e41b54febdac907f9dea7b5d1ce352",
	   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCxjzFuu7kO+sfY\nXPq0EZo1Oth9YjCyrhIQr6XavJQyD/OT9gcd9Q5+/VvLwCXBijEgVdXFQf5Tcsh2\ndpp/hOjGuc7Lh9Kk+DtebUDZ9AIF92LvRX2yKJJ4a6zqV9iEqCfxAhSrwsYMLnp0\nGbxG0ACUR/VdLv8U2ctNDG4DL8jk6yYowABbsL/074GOFWtwW99w1BJb09+l0f2l\njIom15iY897W1gjOBskM7fsHm3WwlCwD/+4PPodp8PRIjvefnMwx7E0Lu6IcJ8Kg\n4Rhm1Rk5hJWKWEgQHmZ4ik4kc/FKdHRMGERkMY5VVYoZ6bUx7OdhF7Vt3HVZDA88\nsx9fbTBxAgMBAAECggEAAWSAHMA4KVfqLVY9WSAyN2yougMFIsGevqbCBD8qYmIh\npO1vDNsZLAHMsIJnSWdOD1TdAlkMJ5dk3xj7CTj/ol9esdX03vpbbNgqhAsX4PgZ\nvIqs+7K5w1wE1SmvNwsilQ9RHi++4eWTbEmvYlbLSl5uHDb8JSu4HniUfE3po3H5\nWDj01OMSe9dhaXrzhqOn2qo37XJ9xF1VCSkY3JRj3cY7W7crVE3UmDyYT+ZE1Tei\nyYhrZh1QDFeQVCFiHEP3RA1T/MYaFn1ylkwGcvgFvoB81vOJaVEXh1Xldwx/6KZC\nyrXBlnVqa//IuCtEE4zTl146G99kRdQFrAdqTadlSQKBgQDauQefH+zCpxTaO03E\nlzGoXr9mxo6Rzhim60e+uDgkCnDhElc3rqiuxFH6QNORa2/A/zvc7iHYZsu8QAvB\n776S9rrpxHoc1271fLqzMBR6gDkTzh/MjUJnsPNjnfehE2h6U8Zoeq755Xv9S85I\nuk9bIJzs5JH6xBEDxnIb/ier5wKBgQDP0i9jTb5TgrcqYYpjURsHGQRv+6lOaZrC\nD94vNDmhTLg3kW5b2BD0ZeZwGCwiSOSqL/5fjlRie94pPnIn6pm5uGgndgdRLQvw\nIdpRyvAUAOY7SnoLhZjVue4syzwV3k7+d4x7LrzpZclBH8uc3sLU3vOSsmFRIkf+\nfK9qcVv15wKBgQDL2fHRi/algQW9U9JqbKQakZwAVQThvd1aDSVECvxAEv8btnVV\nb1LF+DGTdUH6YdC5ZujLQ6KFx2ERZfvPV/wdixmv8LADG4LOB98WTLR5a/JGlDEs\n+2ctr01YxgzasnUItfXQwK8+N3U1Iab0P7jgbOf1Hh80QfK9uwH1Nw6QdwKBgCuP\nigFNpWxJxOzsPx6sPHcTZlu2q3lVJ2wv+Ul5r+7AbwiuwiwcMQmZZmDuoCmbj9qg\nbrhG1CdEgX+xqCn3wbstDR/gXI5GW+88mU91szbuLVQWO1i46x05eNQI0ZJf47zx\nABA97rkZbcLp0DsUclA+X13LaByii+aq6fXsxvLXAoGBALzkBzJ/SOvotz/UnBxl\nGU9QWmptZttaqtLKizPNQZpY1KO9VxeyoGbkTnN0M58ktpIp8LGlSJejk/tkRKBG\nUFRW/v49GW3eCgl4D+MOTFLCJDT68D2lp4F9hdBHsoH17ZdHy8rennmJN3QExIjx\n0xoq6OYjjzNwhFqkPl0H6HrM\n-----END PRIVATE KEY-----\n",
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
