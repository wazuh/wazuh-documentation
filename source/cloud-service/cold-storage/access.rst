.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_cold_storage_access:

.. meta::
  :description: Learn about cold storage

Access
======

To access your cold storage you need an AWS token that grants permission on the AWS S3 bucket of your environment. This token can be generated using the Wazuh Cloud API.

.. note::
   Check out the :ref:`Tools section <cloud_cold_storage_tools>` to list and download your cold storage automatically.

Follow this process to get access to your cold storage:

1. Before your start using the Wazuh Cloud API, you need an API key. Check out how to  :ref:`generate your API key <cloud_apis_auth>`.

2. Use the ``POST /storage/token`` endpoint of the :cloud-api-ref:`Wazuh Cloud API <tag/storage>` to get the AWS token. The response would be similar to:

.. code-block:: console

   {
     "environment_id": "0123456789ab",
     "credentials": {
       "access_key_id": "mUdT2dBjlHd...Gh7Ni1yZKR5If",
       "secret_access_key": "qEzCk63a224...5aB+e4fC1BR0G",
       "session_token": "MRg3t7HIuoA...4o4BXSAcPfUD8",
       "expires_in": 3600
     }
   }


3. In this example, we use the AWS-CLI tool. First, add the token to the AWS credentials file (``~/.aws/credentials``):

.. code-block:: console
   
   [wazuh_cloud_storage]
   aws_access_key_id = mUdT2dBjlHd...Gh7Ni1yZKR5If
   aws_secret_access_key = qEzCk63a224...5aB+e4fC1BR0G
   aws_session_token = MRg3t7HIuoA...4o4BXSAcPfUD8

4. Finally, replace ``<cloud_id>`` and ``<region>`` with your Cloud ID and region in the following command to list your files.

.. code-block:: console
   
   $ aws --profile wazuh_cloud_storage --region <region> s3 ls cloud-cold-<region>/<cloud_id>/
