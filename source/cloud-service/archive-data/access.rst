.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh provides two types of storage for your data: indexed and archive. Learn more about the archive data in this section. 

.. _cloud_archive_data_access:

Access
======

To access your archive data, you need an AWS token that grants permission on the AWS S3 bucket of your environment. This token can be generated using the Wazuh Cloud API.

   .. note::
      See the :doc:`Wazuh Cloud CLI </cloud-service/cli/index>` section to learn how to list and download your archive data automatically.


Generate your API key
---------------------

To obtain the api key token it is necessary to execute this step described in the `Wazuh Cloud CLI </cloud-service/cli/index>` section.


Get the AWS token
------------------

Use the ``POST /storage/token`` endpoint of the :cloud-api-ref:`Wazuh Cloud API <tag/storage>` to get the AWS token and access the archive data of a specific environment. In this example, we generate an AWS token valid for 3600 seconds for environment `012345678ab`.

   .. code-block::

      curl -XPOST https://api.cloud.wazuh.com/v2/storage/token -H "x-api-key: <YOUR_API_KEY>" -H "Content-Type: application/json" --data '
      {
         "environment_cloud_id": "012345678ab",
         "token_expiration": "3600"
      }'

   .. code-block:: console
      :class: output

      {
         "environment_cloud_id": "012345678ab",
         "aws": {
            "s3_path": "wazuh-cloud-cold-us-east-1/012345678ab",
            "region": "us-east-1",
            "credentials": {
               "access_key_id": "mUdT2dBjlHd...Gh7Ni1yZKR5If",
               "secret_access_key": "qEzCk63a224...5aB+e4fC1BR0G",
               "session_token": "MRg3t7HIuoA...4o4BXSAcPfUD8",
               "expires_in": 3600
            }
         }
      }



Generate AWS `wazuh_cloud_storage` profile
----------------------------------------

Add the token to the AWS credentials file ``~/.aws/credentials``.

   .. code-block:: console
      
      [wazuh_cloud_storage]
      aws_access_key_id = mUdT2dBjlHd...Gh7Ni1yZKR5If
      aws_secret_access_key = qEzCk63a224...5aB+e4fC1BR0G
      aws_session_token = MRg3t7HIuoA...4o4BXSAcPfUD8


Listing archive data
---------------------

This command lists the archive data files of the environment `012345678ab`.

.. code-block:: console

  # aws --profile wazuh_cloud_storage --region us-east-1 s3 ls --recursive s3://wazuh-cloud-cold-us-east-1/012345678ab/

.. code-block:: none
  :class: output

  2024-04-19 17:50:06        493 012345678ab/output/alerts/2024/04/19/012345678ab_output_alerts_20240419T2050_VqaWCpX9oPfDkRpD.json.gz
  2024-04-19 18:00:05      77759 012345678ab/output/alerts/2024/04/19/012345678ab_output_alerts_20240419T2100_kdBY42OvE9QJuiia.json.gz

Examples
--------

Downloading archive data
^^^^^^^^^^^^^^^^^^^^^^^^^

This command downloads in the `/home/test` directory the archive data files of the environment `012345678ab` between the specified dates.

.. code-block:: console

  # aws --profile wazuh_cloud_storage --region us-east-1 s3 cp --recursive s3://wazuh-cloud-cold-us-east-1/012345678ab/ /home/test/

.. code-block:: none
  :class: output

  download: s3://wazuh-cloud-cold-us-east-1/012345678ab/output/alerts/2024/04/19/012345678ab_output_alerts_20240419T2050_VqaWCpX9oPfDkRpD.json.gz to output/alerts/2024/04/19/012345678ab_output_alerts_20240419T2050_VqaWCpX9oPfDkRpD.json.gz
  download: s3://wazuh-cloud-cold-us-east-1/012345678ab/output/alerts/2024/04/19/012345678ab_output_alerts_20240419T2100_kdBY42OvE9QJuiia.json.gz to output/alerts/2024/04/19/012345678ab_output_alerts_20240419T2100_kdBY42OvE9QJuiia.json.gz
