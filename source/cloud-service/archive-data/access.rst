.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to request temporary AWS credentials from the Wazuh Console API and use the AWS CLI to list and download your Wazuh Cloud archive data.

.. _cloud_archive_data_access:

Access
======

Your archive data is stored in an AWS S3 bucket. To access it, request temporary AWS credentials from the Wazuh Console API and use them with the AWS CLI or any other S3-compatible tool. The credentials grant read access to the archive data of one environment.

Prerequisites
-------------

-  **An organization API key.** You need the Editor role to create one. See :doc:`API keys </cloud-service/organization/api-keys>`.
-  **The Cloud ID of your environment.** To get it:

   #. In the sidebar, under **Wazuh Cloud**, select **Environments**.
   #. Select your environment to open its details page.
   #. Next to **ID**, click the **Copy environment ID** button.

-  **The AWS CLI** installed on your computer. See the `AWS CLI documentation <https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html>`__.

Request temporary credentials
-----------------------------

Send a ``POST`` request to the ``/platform/environments/<CLOUD_ID>/storage/credentials`` endpoint of the Wazuh Console API. Replace ``<CLOUD_ID>`` with the Cloud ID of your environment and ``<API_KEY>`` with your organization API key. See the :cloud-api-ref:`API reference <tag/storage>` for the full specification.

.. code-block:: console

   $ curl -X POST "https://console.cloud.wazuh.com/api/v1/platform/environments/<CLOUD_ID>/storage/credentials" \
     -H "Authorization: Bearer <API_KEY>" \
     -H "Content-Type: application/json" \
     -d '{"token_expiration": 3600}'

The ``token_expiration`` field sets how long the credentials are valid, in seconds. The allowed values are from ``900`` (15 minutes) to ``43200`` (12 hours).

The response contains the temporary credentials:

.. code-block:: json
   :class: output

   {
     "data": {
       "access_key_id": "ASIAXXXXXXXXXXXXXXXX",
       "secret_access_key": "qEzCk63a224...5aB+e4fC1BR0G",
       "session_token": "MRg3t7HIuoA...4o4BXSAcPfUD8",
       "expires_at": "2026-03-05T16:00:00Z",
       "bucket": "wazuh-cloud-cold-us-east-1/0123456789ab",
       "region": "us-east-1"
     }
   }

.. list-table::
   :header-rows: 1
   :widths: 25 75

   -  -  Field
      -  Description
   -  -  ``access_key_id``
      -  AWS access key ID.
   -  -  ``secret_access_key``
      -  AWS secret access key.
   -  -  ``session_token``
      -  AWS session token. The credentials do not work without it.
   -  -  ``expires_at``
      -  Date and time, in UTC, when the credentials expire.
   -  -  ``bucket``
      -  S3 location of the archive data of your environment, in the format ``wazuh-cloud-cold-<REGION>/<CLOUD_ID>``. Use it as ``s3://<bucket>/`` in AWS CLI commands.
   -  -  ``region``
      -  AWS region where the archive data is stored.

When the credentials expire, request them again.

Error responses
^^^^^^^^^^^^^^^

``401`` and ``503`` errors return a JSON body with an ``errors.detail`` message, for example ``{"errors": {"detail": "Unauthorized"}}``. ``422`` errors return a ``detail`` list that describes each invalid field.

.. list-table::
   :header-rows: 1
   :widths: 20 80

   -  -  Status
      -  Cause
   -  -  ``401``
      -  The API key is missing or invalid, or the environment does not exist or does not belong to the organization of the API key.
   -  -  ``422``
      -  The request body is not valid. For example, ``token_expiration`` is missing or out of range.
   -  -  ``503``
      -  The credentials are temporarily unavailable. Try again later.

Configure an AWS CLI profile
----------------------------

Add the credentials to the AWS credentials file, ``~/.aws/credentials``, as a named profile. Include the session token.

.. code-block:: ini

   [wazuh_cloud_storage]
   aws_access_key_id = ASIAXXXXXXXXXXXXXXXX
   aws_secret_access_key = qEzCk63a224...5aB+e4fC1BR0G
   aws_session_token = MRg3t7HIuoA...4o4BXSAcPfUD8

Each time you request credentials, replace the three values in this profile.

List archive data
-----------------

The following command lists the archive data files of the environment ``0123456789ab``. Use the ``bucket`` and ``region`` values from the response.

.. code-block:: console

   $ aws --profile wazuh_cloud_storage --region us-east-1 s3 ls --recursive s3://wazuh-cloud-cold-us-east-1/0123456789ab/

.. code-block:: none
   :class: output

   2024-04-19 17:50:06        493 0123456789ab/output/alerts/2024/04/19/0123456789ab_output_alerts_20240419T2050_VqaWCpX9oPfDkRpD.json.gz
   2024-04-19 18:00:05      77759 0123456789ab/output/alerts/2024/04/19/0123456789ab_output_alerts_20240419T2100_kdBY42OvE9QJuiia.json.gz

See :doc:`Filename format </cloud-service/archive-data/filename-format>` for the meaning of each part of the path.

Download archive data
---------------------

Download multiple files
^^^^^^^^^^^^^^^^^^^^^^^

The following command downloads all the archive data files of the environment ``0123456789ab`` into the ``/home/test/`` directory.

.. code-block:: console

   $ aws --profile wazuh_cloud_storage --region us-east-1 s3 cp --recursive s3://wazuh-cloud-cold-us-east-1/0123456789ab/ /home/test/

.. code-block:: none
   :class: output

   download: s3://wazuh-cloud-cold-us-east-1/0123456789ab/output/alerts/2024/04/19/0123456789ab_output_alerts_20240419T2050_VqaWCpX9oPfDkRpD.json.gz to output/alerts/2024/04/19/0123456789ab_output_alerts_20240419T2050_VqaWCpX9oPfDkRpD.json.gz
   download: s3://wazuh-cloud-cold-us-east-1/0123456789ab/output/alerts/2024/04/19/0123456789ab_output_alerts_20240419T2100_kdBY42OvE9QJuiia.json.gz to output/alerts/2024/04/19/0123456789ab_output_alerts_20240419T2100_kdBY42OvE9QJuiia.json.gz

To download only part of the archive data, add a longer prefix to the S3 path. For example, ``s3://wazuh-cloud-cold-us-east-1/0123456789ab/output/alerts/2024/04/`` downloads the alerts delivered in April 2024.

Download a single file
^^^^^^^^^^^^^^^^^^^^^^

The following command downloads one file of the environment ``0123456789ab`` into the ``/home/test/`` directory.

.. code-block:: console

   $ aws --profile wazuh_cloud_storage --region us-east-1 s3 cp s3://wazuh-cloud-cold-us-east-1/0123456789ab/output/alerts/2024/04/19/0123456789ab_output_alerts_20240419T2050_VqaWCpX9oPfDkRpD.json.gz /home/test/

.. code-block:: none
   :class: output

   download: s3://wazuh-cloud-cold-us-east-1/0123456789ab/output/alerts/2024/04/19/0123456789ab_output_alerts_20240419T2050_VqaWCpX9oPfDkRpD.json.gz to /home/test/0123456789ab_output_alerts_20240419T2050_VqaWCpX9oPfDkRpD.json.gz
