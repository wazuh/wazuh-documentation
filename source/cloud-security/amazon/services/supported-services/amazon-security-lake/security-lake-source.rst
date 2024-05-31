.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure Amazon Security Lake.

Wazuh as a custom source
========================

.. versionadded:: 4.9.0

Wazuh Security Events can be converted to OCSF events and Parquet format, required by Amazon Security Lake, by using an AWS Lambda Python function, a Logstash instance and an AWS S3 bucket.

A properly configured Logstash instance can send the Wazuh Security events to an AWS S3 bucket, automatically invoking the AWS Lambda function that will transform and send the events to the Amazon Security lake dedicated S3 bucket.

The diagram below illustrates the process of converting Wazuh Security Events to OCSF events and to Parquet format for Amazon Security Lake.

.. thumbnail:: /images/aws/asl-overview.png
   :align: center
   :width: 80%

Prerequisites
--------------

-  Amazon Security Lake is enabled.
-  At least one up and running ``wazuh-indexer`` instance with populated ``wazuh-alerts-4.x-*`` indices.
-  A Logstash instance.
-  An S3 bucket to store raw events.
-  An AWS Lambda function, using the Python 3.12 runtime.
-  (Optional) An S3 bucket to store OCSF events, mapped from raw events.

AWS configuration
-----------------

Enabling Amazon Security Lake
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you haven't already, ensure that you have enabled Amazon Security Lake by following the instructions at `Getting started - Amazon Security Lake <https://docs.aws.amazon.com/security-lake/latest/userguide/getting-started.html#enable-service>`__.

For multiple AWS accounts, we strongly encourage you to use AWS Organizations and set up Amazon Security Lake at the Organization level.

Creating an S3 bucket to store events
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the `official documentation <https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html>`__ to create an S3 bucket within your organization. Use a descriptive name, for example: ``wazuh-aws-security-lake-raw``.

Creating a Custom Source in Amazon Security Lake
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configure a custom source for Amazon Security Lake via the AWS console. Follow the `official documentation <https://docs.aws.amazon.com/security-lake/latest/userguide/custom-sources.html>`__ to register Wazuh as a custom source.

To create the custom source:

#. Log into your AWS console and navigate to **Security Lake**.
#. Navigate to Custom Sources, and click **Create custom source**.
#. Enter a descriptive name for your custom source. For example, ``wazuh``.
#. Choose **Security Finding** as the OCSF Event class.
#. For **AWS account with permission to write data**, enter the AWS account ID and External ID of the custom source that will write logs and events to the data lake.
#. For **Service Access**, create and use a new service role or use an existing service role that gives Security Lake permission to invoke AWS Glue.

   .. thumbnail:: /images/aws/asl-custom-source-form.png
      :align: center
      :width: 80%

#. Click on **Create**. Upon creation, Amazon Security Lake automatically creates an AWS Service Role with permissions to push files into the Security Lake bucket, under the proper prefix named after the custom source name. An AWS Glue Crawler is also created to populate the AWS Glue Data Catalog automatically.

   .. thumbnail:: /images/aws/asl-custom-source.png
      :align: center
      :width: 80%

#. Finally, collect the S3 bucket details, as these will be needed in the next step. Make sure you have the following information:

   -  The Amazon Security Lake S3 region.
   -  The S3 bucket name (e.g, ``aws-security-data-lake-us-east-1-AAABBBCCCDDD``).

Creating an AWS Lambda function
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the `official documentation <https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html>`__ to create an AWS Lambda function:

#. Select Python 3.12 as the runtime.
#. Configure the Lambda to use 512 MB of memory and 30 seconds timeout.
#. Configure a trigger so every object with ``.txt`` extension uploaded to the S3 bucket created previously invokes the Lambda function.

   .. thumbnail:: /images/aws/asl-lambda-trigger.png
      :align: center
      :width: 80%

#. Create a zip deployment package and upload it to the S3 bucket created previously as per `these instructions <https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#gettingstarted-package-zip>`__. The code is hosted in the wazuh-indexer repository. Use the **Makefile** to generate the zip package **wazuh_to_amazon_security_lake.zip**.

   .. code-block:: console

      git clone https://github.com/wazuh/wazuh-indexer.git
      cd wazuh-indexer/integrations/amazon-security-lake
      make

#. Configure the Lambda with these environment variables.

   +--------------------------+--------------+--------------------------------------------------------------------------------------------------------+
   | **Environment variable** | **Required** | **Value**                                                                                              |
   +--------------------------+--------------+--------------------------------------------------------------------------------------------------------+
   | AWS_BUCKET               | True         | The name of the Amazon S3 bucket in which Security Lake stores your custom source data                 |
   +--------------------------+--------------+--------------------------------------------------------------------------------------------------------+
   | SOURCE_LOCATION          | True         | The *Data source name* of the *Custom Source*                                                          |
   +--------------------------+--------------+--------------------------------------------------------------------------------------------------------+
   | ACCOUNT_ID               | True         | Enter the ID that you specified when creating your Amazon Security Lake custom source                  |
   +--------------------------+--------------+--------------------------------------------------------------------------------------------------------+
   | REGION                   | True         | AWS Region to which the data is written                                                                |
   +--------------------------+--------------+--------------------------------------------------------------------------------------------------------+
   | S3_BUCKET_OCSF           | False        | S3 bucket to which the mapped events are written                                                       |
   +--------------------------+--------------+--------------------------------------------------------------------------------------------------------+
   | OCSF_CLASS               | False        | The OCSF class to map the events into. Can be ``SECURITY_FINDING`` (default) or ``DETECTION_FINDING``. |
   +--------------------------+--------------+--------------------------------------------------------------------------------------------------------+

   .. note::

      The ``DETECTION_FINDING`` class is not supported by Amazon Security Lake yet.

Validation
^^^^^^^^^^^

To validate that the Lambda function is properly configured and works as expected, add the sample events below to the ``sample.txt`` file and upload it to the S3 bucket.

.. code-block:: JSON

   {"cluster":{"name":"wazuh-cluster","node":"wazuh-manager"},"timestamp":"2024-04-22T14:20:46.976+0000","rule":{"mail":false,"gdpr":["IV_30.1.g"],"groups":["audit","audit_command"],"level":3,"firedtimes":1,"id":"80791","description":"Audit: Command: /usr/sbin/crond"},"location":"","agent":{"id":"004","ip":"47.204.15.21","name":"Ubuntu"},"data":{"audit":{"type":"NORMAL","file":{"name":"/etc/sample/file"},"success":"yes","command":"cron","exe":"/usr/sbin/crond","cwd":"/home/wazuh"}},"predecoder":{},"manager":{"name":"wazuh-manager"},"id":"1580123327.49031","decoder":{},"@version":"1","@timestamp":"2024-04-22T14:20:46.976Z"}
   {"cluster":{"name":"wazuh-cluster","node":"wazuh-manager"},"timestamp":"2024-04-22T14:22:03.034+0000","rule":{"mail":false,"gdpr":["IV_30.1.g"],"groups":["audit","audit_command"],"level":3,"firedtimes":1,"id":"80790","description":"Audit: Command: /usr/sbin/bash"},"location":"","agent":{"id":"007","ip":"24.273.97.14","name":"Debian"},"data":{"audit":{"type":"PATH","file":{"name":"/bin/bash"},"success":"yes","command":"bash","exe":"/usr/sbin/bash","cwd":"/home/wazuh"}},"predecoder":{},"manager":{"name":"wazuh-manager"},"id":"1580123327.49031","decoder":{},"@version":"1","@timestamp":"2024-04-22T14:22:03.034Z"}
   {"cluster":{"name":"wazuh-cluster","node":"wazuh-manager"},"timestamp":"2024-04-22T14:22:08.087+0000","rule":{"id":"1740","mail":false,"description":"Sample alert 1","groups":["ciscat"],"level":9},"location":"","agent":{"id":"006","ip":"207.45.34.78","name":"Windows"},"data":{"cis":{"rule_title":"CIS-CAT 5","timestamp":"2024-04-22T14:22:08.087+0000","benchmark":"CIS Ubuntu Linux 16.04 LTS Benchmark","result":"notchecked","pass":52,"fail":0,"group":"Access, Authentication and Authorization","unknown":61,"score":79,"notchecked":1,"@timestamp":"2024-04-22T14:22:08.087+0000"}},"predecoder":{},"manager":{"name":"wazuh-manager"},"id":"1580123327.49031","decoder":{},"@version":"1","@timestamp":"2024-04-22T14:22:08.087Z"}

A successful execution of the Lambda function will map these events into the OCSF Security Finding Class and write them to the Amazon Security Lake S3 bucket in Parquet format, properly partitioned based on the Custom Source name, Account ID, AWS Region and date, as described in the `official documentation <https://docs.aws.amazon.com/security-lake/latest/userguide/custom-sources.html#custom-sources-best-practices>`__.

Installing and configuring Logstash
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install Logstash on a dedicated server or on the server hosting the ``wazuh-indexer``. Logstash forwards the data from the ``wazuh-indexer`` to the AWS S3 bucket created previously.

#. Follow the `official documentation <https://www.elastic.co/guide/en/logstash/current/installing-logstash.html>`__ to install Logstash.
#. Install the `logstash-input-opensearch <https://github.com/opensearch-project/logstash-input-opensearch>`__ plugin (this one is installed by default in most cases).

   .. code-block:: console

      sudo /usr/share/logstash/bin/logstash-plugin install logstash-input-opensearch

#. Copy the ``wazuh-indexer`` root certificate on the Logstash server, to any folder of your choice (e.g, ``/usr/share/logstash/root-ca.pem``).
#. Give the ``logstash`` user the required permissions to read the certificate.

   .. code-block:: console

      sudo chmod -R 755 </PATH/TO/WAZUH_INDEXER/CERTIFICATE>/root-ca.pem

Configuring the Logstash pipeline
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A `Logstash pipeline <https://www.elastic.co/guide/en/logstash/current/configuration.html>`__ allows Logstash to use plugins to read the data from the ``wazuh-indexer`` and send them to an AWS S3 bucket.

The Logstash pipeline requires access to the following secrets:

-  ``wazuh-indexer`` credentials: ``INDEXER_USERNAME`` and ``INDEXER_PASSWORD``.
-  AWS credentials for the account with permissions to write to the S3 bucket: ``AWS_ACCESS_KEY_ID`` and ``AWS_SECRET_ACCESS_KEY``.
-  AWS S3 bucket details: ``AWS_REGION`` and ``S3_BUCKET`` (the S3 bucket name for raw events).

#. Use the `Logstash keystore <https://www.elastic.co/guide/en/logstash/current/keystore.html>`__ to securely store these values.

#. Create the configuration file ``indexer-to-s3.conf`` in the ``/etc/logstash/conf.d/`` folder:

   .. code-block:: console

      sudo touch /etc/logstash/conf.d/indexer-to-s3.conf

#. Add the following configuration to the ``indexer-to-s3.conf`` file.

   .. code-block:: ruby

      input {
          opensearch {
              hosts =>  ["<WAZUH_INDEXER_ADDRESS>:9200"]
              user  =>  "${INDEXER_USERNAME}"
              password  =>  "${INDEXER_PASSWORD}"
              ssl => true
              ca_file => "</PATH/TO/WAZUH_INDEXER/CERTIFICATE>/root-ca.pem"
              index =>  "wazuh-alerts-4.x-*"
              query =>  '{
                  "query": {
                      "range": {
                          "@timestamp": {
                          "gt": "now-5m"
                          }
                      }
                  }
              }'
              schedule => "*/5 * * * *"
          }
      }

      output {
          stdout {
              id => "output.stdout"
              codec => json_lines
          }
          s3 {
              id => "output.s3"
              access_key_id => "${AWS_ACCESS_KEY_ID}"
              secret_access_key => "${AWS_SECRET_ACCESS_KEY}"
              region => "${AWS_REGION}"
              bucket => "${S3_BUCKET}"
              codec => "json_lines"
              retry_count => 0
              validate_credentials_on_root_bucket => false
              prefix => "%{+YYYY}%{+MM}%{+dd}"
              server_side_encryption => true
              server_side_encryption_algorithm => "AES256"
              additional_settings => {
              "force_path_style" => true
              }
              time_file => 5
          }
      }

Running Logstash
^^^^^^^^^^^^^^^^^

#. Once you have everything set, run Logstash from the CLI with your configuration:

   .. code-block:: console

      sudo systemctl stop logstash
      sudo -E /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/indexer-to-s3.conf --path.settings /etc/logstash ----config.test_and_exit

#. After confirming that the configuration loads correctly without errors, run Logstash as a service.

   .. code-block:: console

      sudo systemctl enable logstash
      sudo systemctl start logstash

OCSF Mapping
-------------

The integration maps Wazuh Security Events to the *OCSF v1.1.0* `Security Finding (2001) <https://schema.ocsf.io/classes/security_finding>`__ Class.

The tables below represent how the Wazuh Security Events are mapped into the OCSF Security Finding Class.

.. note::

   This does not reflect any transformations or evaluations of the data. Some data evaluation and transformation will be necessary for a correct representation in OCSF that matches all requirements.

Metadata
^^^^^^^^

+------------------------------+---------------------+--------------------+
| **OCSF Key**                 | **OCSF Value Type** | **Value**          |
+------------------------------+---------------------+--------------------+
| category_uid                 | Integer             | 2                  |
+------------------------------+---------------------+--------------------+
| category_name                | String              | "Findings"         |
+------------------------------+---------------------+--------------------+
| class_uid                    | Integer             | 2001               |
+------------------------------+---------------------+--------------------+
| class_name                   | String              | "Security Finding" |
+------------------------------+---------------------+--------------------+
| type_uid                     | Long                | 200101             |
+------------------------------+---------------------+--------------------+
| metadata.product.name        | String              | "Wazuh"            |
+------------------------------+---------------------+--------------------+
| metadata.product.vendor_name | String              | "Wazuh, Inc."      |
+------------------------------+---------------------+--------------------+
| metadata.product.version     | String              | "4.9.0"            |
+------------------------------+---------------------+--------------------+
| metadata.product.lang        | String              | "en"               |
+------------------------------+---------------------+--------------------+
| metadata.log_name            | String              | "Security events"  |
+------------------------------+---------------------+--------------------+
| metadata.log_provider        | String              | "Wazuh"            |
+------------------------------+---------------------+--------------------+

Security events
^^^^^^^^^^^^^^^^

+------------------------+---------------------+----------------------------------------+
| **OCSF Key**           | **OCSF Value Type** | **Wazuh Event Value**                  |
+------------------------+---------------------+----------------------------------------+
| activity_id            | Integer             | 1                                      |
+------------------------+---------------------+----------------------------------------+
| time                   | Timestamp           | timestamp                              |
+------------------------+---------------------+----------------------------------------+
| message                | String              | rule.description                       |
+------------------------+---------------------+----------------------------------------+
| count                  | Integer             | rule.firedtimes                        |
+------------------------+---------------------+----------------------------------------+
| finding.uid            | String              | id                                     |
+------------------------+---------------------+----------------------------------------+
| finding.title          | String              | rule.description                       |
+------------------------+---------------------+----------------------------------------+
| finding.types          | String Array        | input.type                             |
+------------------------+---------------------+----------------------------------------+
| analytic.category      | String              | rule.groups                            |
+------------------------+---------------------+----------------------------------------+
| analytic.name          | String              | decoder.name                           |
+------------------------+---------------------+----------------------------------------+
| analytic.type          | String              | "Rule"                                 |
+------------------------+---------------------+----------------------------------------+
| analytic.type_id       | Integer             | 1                                      |
+------------------------+---------------------+----------------------------------------+
| analytic.uid           | String              | rule.id                                |
+------------------------+---------------------+----------------------------------------+
| risk_score             | Integer             | rule.level                             |
+------------------------+---------------------+----------------------------------------+
| attacks.tactic.name    | String              | rule.mitre.tactic                      |
+------------------------+---------------------+----------------------------------------+
| attacks.technique.name | String              | rule.mitre.technique                   |
+------------------------+---------------------+----------------------------------------+
| attacks.technique.uid  | String              | rule.mitre.id                          |
+------------------------+---------------------+----------------------------------------+
| attacks.version        | String              | "v13.1"                                |
+------------------------+---------------------+----------------------------------------+
| nist                   | String Array        | rule.nist_800_53                       |
+------------------------+---------------------+----------------------------------------+
| severity_id            | Integer             | convert(rule.level)                    |
+------------------------+---------------------+----------------------------------------+
| status_id              | Integer             | 99                                     |
+------------------------+---------------------+----------------------------------------+
| resources.name         | String              | agent.name                             |
+------------------------+---------------------+----------------------------------------+
| resources.uid          | String              | agent.id                               |
+------------------------+---------------------+----------------------------------------+
| data_sources           | String Array        | ['_index', 'location', 'manager.name'] |
+------------------------+---------------------+----------------------------------------+
| raw_data               | String              | full_log                               |
+------------------------+---------------------+----------------------------------------+

Troubleshooting
----------------

+-----------------------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Issue**                                                                                                                                     | **Resolution**                                                                                                                                                                                       |
+-----------------------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The Wazuh alert data is available in the Amazon Security Lake S3 bucket, but the Glue Crawler fails to parse the data into the Security Lake. | This issue typically occurs when the custom source that is created for the integration is using the wrong event class. Make sure you create the custom source with the Security Finding event class. |
+-----------------------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
