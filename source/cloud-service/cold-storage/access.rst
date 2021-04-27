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

2. Use the ``/storage/token`` endpoint of the :cloud-api-ref:`Wazuh Cloud API <tag/storage>` to get the AWS token.


3. To list your files, use the AWS-CLI tool. First, add the token to the AWS credentials file (``~/.aws/credentials``):

.. code-block:: console
   
   [wazuh_cloud_storage]
   aws_access_key_id = 1
   aws_secret_access_key = 2
   aws_session_token = 3

4. Finally, list the files:

.. code-block:: console
   
   $ aws --profile wazuh_cloud_storage --region <region> s3 ls cloud-cold-<region>/<cloud_id>/

5. Replace ``<cloud_id>`` with the environment's Cloud ID and ``<region>`` with your region.

Available regions are:

* North Virginia: ``us-east-1``
  
* Ohio: ``us-east-2``

* London: ``eu-west-2``

* Frankfurt: ``eu-central-1``

* Singapore: ``ap-southeast-1``
