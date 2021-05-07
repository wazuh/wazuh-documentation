.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_your_environment_accessing_cold_storage:

.. meta::
  :description: Learn about accessing your environment's cold storage

Cold storage
============

Wazuh provides two types of storage for your indexed data: hot storage and cold storage.

Wazuh ingests and indexes the events sent by the agents, making the data searchable and analyzable on the Wazuh WUI. This information is available in hot storage and limited by the :ref:`tier <cloud_glossary_tier>`.

At the same time, data is sent to cold storage, with a delay of a maximum of 30 minutes since it is first processed by Wazuh. The cold storage is an AWS S3 bucket to store your logs for longer periods of time and meet compliance requirements. Also, you can reindex the data to other environments for investigations.


- This is an example of how Wazuh manages storaging data:

  An environment with a tier of 100GB has 50 agents connected, and each one of them generates 100MB per day. Wazuh ingests 5GB per day (50 agents x 100MB/day = 5000MB = 5GB).
  Assuming that 20% of the events generate an alert, Wazuh indexes 1GB per day (20% 5GB = 1GB). In this scenario, the hot storage contains 100 days (100GB / 1GB/day = 100 days).

  When those 100GB of data are exceeded, the oldest data is rotated and sent to cold storage where the information remains accesible, keeping 100GB of total data in the hot storage.

.. _cloud_cold_storage_configuration:

Configuration
-------------

Your environment is configured by default to send the following data to cold storage:

- `Wazuh output`_
- `Wazuh configuration`_

Wazuh output
^^^^^^^^^^^^

There are two types of Wazuh output files:

- The file ``/var/ossec/logs/archives/archives.json`` contains all events whether they tripped a rule or not. This is sent to cold storage if the setting ``logall_json`` is set to ``yes``.
- The file ``/var/ossec/logs/alerts/alerts.json`` contains only events that tripped a rule with high enough priority, according to a configurable threshold. This is always sent to cold storage.

Both files are delivered to cold storage as soon as they are rotated and compressed. This process usually takes between 10 to 30 minutes from the moment the event is received.

There is no limit on the amount of data stored in the cold storage, but the time limit is one year. After this period of time, the data is removed.

.. note::

  Files with ``.log`` extension are never sent to cold storage.

Wazuh configuration
^^^^^^^^^^^^^^^^^^^

Data corresponding to Wazuh configuration such us ``/var/ossec/etc`` or ``/var/ossec/api/configuration`` is compressed and backed up once a day.

Configuration backup is stored in cold storage for up to 30 days, after which it is deleted.

.. _cloud_cold_storage_format:

Filename format
---------------

The files are stored in a directory structure that indicates the date and time the file was delivered to the cold storage. 

The main path follows this format:

``wazuh-cloud-cold-<region>/<cloud_id>/<category>[/<subcategory>]/<year>/<month>/<day>``

Each file has the following name:

``<cloud_id>_<category>[_<subcategory>]_<YYYYMMDDTHHmm>_<UniqueString>.<format>``

The files include the following fields:

+-------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| field                         | Description                                                                                                                                                                                                                  |
+===============================+==============================================================================================================================================================================================================================+
| ``<region>``                  | Region where the environment is located.                                                                                                                                                                                     |
+-------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<cloud_id>``                | Cloud ID of the environment.                                                                                                                                                                                                 |
+-------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<category>``                | This field is either *output* or *config*.                                                                                                                                                                                   |
+-------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<subcategory>``             | This field is only used by the output category and contains *alerts* or *archives* files.                                                                                                                                    |
+-------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<year>``                    | Year when the file was delivered.                                                                                                                                                                                            |
+-------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<month>``                   | Month when the file was delivered.                                                                                                                                                                                           |
+-------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<day>``                     | Day when the file was delivered.                                                                                                                                                                                             |
+-------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<YYYYMMDDTHHmm>``           | Digits of the year, month, day, hour, and minute when the file was delivered. Hours are in 24-hour format and in UTC. A log file delivered at a specific time can contain records written at any point before that time.     |
+-------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<UniqueString>``            | The 16-character UniqueString component of the file name prevents overwriting files. It has no meaning and log processing software should ignore it.                                                                         |
+-------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<format>``                  | It is the encoding of the file. This field is *json.gz* for *output* files, which is a JSON text file in compressed gzip format, and *tar.gz* for *configuration* files.                                                     |
+-------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

.. _cloud_cold_storage_access:

.. meta::
  :description: Learn about cold storage

Access
------

To access your cold storage you need an AWS token that grants permission on the AWS S3 bucket of your environment. This token can be generated using the Wazuh Cloud API.

.. note::
   See the :ref:`Tools <cloud_cold_storage_tools>` section to learn how to list and download your cold storage automatically.

Follow these steps to get access to your cold storage:

1. Before your start using the Wazuh Cloud API, you need an API key. To generate your API key, see the :ref:`Authentication <cloud_apis_auth>` section. .

2. Use the ``POST /storage/token`` endpoint of the :cloud-api-ref:`Wazuh Cloud API <tag/storage>` to get the AWS token. This is an example of a response:

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

3.  Add the token to the AWS credentials file ``~/.aws/credentials``:

   .. code-block:: console
      
      [wazuh_cloud_storage]
      aws_access_key_id = mUdT2dBjlHd...Gh7Ni1yZKR5If
      aws_secret_access_key = qEzCk63a224...5aB+e4fC1BR0G
      aws_session_token = MRg3t7HIuoA...4o4BXSAcPfUD8

   In this example, the AWS-CLI tool is used.

4. Replace ``<cloud_id>`` and ``<region>`` with your Cloud ID and region in the following command to list your files.

   .. code-block:: console
      
      $ aws --profile wazuh_cloud_storage --region <region> s3 ls cloud-cold-<region>/<cloud_id>/

You now have access to your cold storage.

.. _cloud_cold_storage_tools:

.. meta::
  :description: Learn about cold storage

Tools
-----

The `wcloud-cold-storage.py` tool allows you to download the cold storage of your environment, creating and refreshing the token to access the cold storage automatically.

1. Download the `wcloud-cold-storage.py <https://wazuh-cloud-tools.s3-us-west-1.amazonaws.com/examples/wcloud-cold-storage.py>`_ tool.

2. Run the following command and specify your Cloud ID and region:

.. code-block::

   $ wcloud-cold-storage.py --cloud-id <cloud_id> --api-key <file_path> --output_path /home/cloud/data --region <region> --start_date 2021-01-01 --end_date 2020-04-27

You can now download the cold storage of your environment automatically.

.. toctree::
  :hidden:
  :maxdepth: 1

  Configuration <https://documentation.wazuh.com/current/cloud-service/cold-storage/index.html#configuration>
  Filename format <https://documentation.wazuh.com/current/cloud-service/cold-storage/index.html#filename-format>
  Access <https://documentation.wazuh.com/current/cloud-service/cold-storage/index.html#access>
  Tools <https://documentation.wazuh.com/current/cloud-service/cold-storage/index.html#tools>
