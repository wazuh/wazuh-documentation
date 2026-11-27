.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This PoC shows how the Wazuh module for AWS (aws-s3) collects AWS CloudTrail logs from an S3 bucket to detect activity in your AWS account. Learn more about it in our documentation.

Monitoring AWS infrastructure
=============================

The Wazuh module for AWS (``aws-s3``) collects logs from AWS services. In this use case, you configure Wazuh to read AWS CloudTrail logs from an S3 bucket and detect activity in your AWS account. See :doc:`Using Wazuh to monitor AWS </cloud-security/amazon/index>`.

Endpoints
---------

+----------------+-------------------------------------------------------------------------------+
| Component      | Role                                                                          |
+================+===============================================================================+
| AWS CloudTrail | Records the activity in your AWS account and stores the logs in an S3 bucket. |
+----------------+-------------------------------------------------------------------------------+
| Ubuntu 24.04   | The Wazuh agent collects the CloudTrail logs from the S3 bucket.              |
+----------------+-------------------------------------------------------------------------------+

Like other supported AWS services, CloudTrail needs the :doc:`necessary policies </cloud-security/amazon/services/supported-services/cloudtrail>` for user permissions and a valid authentication method. This use case uses the :doc:`profile authentication </cloud-security/amazon/services/prerequisites/credentials>` method.

Configuration
-------------

AWS CloudTrail
^^^^^^^^^^^^^^

#. In the AWS console, open the CloudTrail service.

#. `Create a new trail <https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-a-trail-using-the-console-first-time.html>`__.

#. Create a new S3 bucket or select an existing one to store the CloudTrail logs. Note the bucket name, because you need it in the Wazuh configuration. The image below shows a new trail with a new S3 bucket.

   .. thumbnail:: /images/poc/cloudtrail.gif
      :title: Creating a CloudTrail service
      :alt: Animation showing how to open the CloudTrail service in the AWS console and create a new trail with an S3 bucket
      :align: center
      :width: 80%

Wazuh dashboard
^^^^^^^^^^^^^^^

#. Go to **Ruleset management** > **Overview**.

#. Search for ``aws`` and click the **aws** integration name to open it.

#. Click **Actions** and select **Enable**.

   .. thumbnail:: /images/poc/aws-integration-enable.png
      :title: Enable the aws integration
      :alt: Wazuh dashboard Ruleset management page of the aws integration with the Enable option in the Actions menu
      :align: center
      :width: 80%

Ubuntu endpoint
^^^^^^^^^^^^^^^

#. Install the Python dependencies of the Wazuh module for AWS. This command is for Python 3.12, the default on Ubuntu 24.04. For other Python versions, see :doc:`Install dependencies </cloud-security/amazon/services/prerequisites/dependencies>`:

   .. code-block:: console

      $ sudo apt update
      $ sudo apt install -y python3-pip
      $ sudo pip3 install --break-system-packages boto3==1.34.135 pyarrow==14.0.1 numpy==1.26.0

#. Create an IAM user for Wazuh with the ``s3:GetObject`` and ``s3:ListBucket`` permissions on the bucket, plus ``kms:Decrypt`` if the trail encrypts its logs with AWS KMS.

#. Create an access key for the user and save it as root in ``/root/.aws/credentials`` under a profile name, for example ``wazuh-poc``.

#. Append the following configuration to ``/var/ossec/etc/ossec.conf``. Replace ``<AWS_BUCKET_NAME>`` with the name of your S3 bucket and ``<AWS_PROFILE_NAME>`` with that profile name. See :doc:`Configuring AWS credentials </cloud-security/amazon/services/prerequisites/credentials>`:

   .. code-block:: xml

      <ossec_config>
        <wodle name="aws-s3">
          <disabled>no</disabled>
          <interval>30m</interval>
          <run_on_start>yes</run_on_start>
          <skip_on_error>no</skip_on_error>

          <bucket type="cloudtrail">
            <name><AWS_BUCKET_NAME></name>
            <aws_profile><AWS_PROFILE_NAME></aws_profile>
          </bucket>
        </wodle>
      </ossec_config>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Verify data ingestion
---------------------

Check that the module ran without errors:

.. code-block:: console

   $ sudo grep -i aws-s3 /var/ossec/logs/ossec.log

The output includes ``Module AWS started`` and ``Executing Bucket Analysis`` with your bucket name.

Test the configuration
----------------------

Generate a CloudTrail event, for example by `creating a new IAM user <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html>`__ in the IAM service. The default Wazuh ruleset parses AWS logs and creates findings automatically. Findings appear after the next run of the module, every ``<interval>`` (``30m`` in this example). To test sooner, set ``<interval>`` to ``5m``. See more :ref:`CloudTrail use cases <cloudtrail-use-cases>`.

View the findings
-----------------

You see findings such as ``New user account <TEST_USER> created``, where ``<TEST_USER>`` is the IAM user you created. CloudTrail delivers events to the bucket a few minutes after the API call.

In the Wazuh dashboard, go to **Cloud security** > **Amazon Web Services** and select **Findings**.

.. thumbnail:: /images/poc/aws-findings.png
   :title: Visualize Amazon Web Services findings
   :alt: Wazuh dashboard Amazon Web Services Findings tab listing the findings generated from the CloudTrail logs
   :align: center
   :width: 80%

.. thumbnail:: /images/poc/aws-findings-details.png
   :title: Amazon Web Services finding details
   :alt: Document details of an Amazon Web Services finding about a new user account created
   :align: center
   :width: 80%

Troubleshooting
---------------

+------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------+
| Check                              | How                                                                                                                                               |
+====================================+===================================================================================================================================================+
| The module runs without errors     | ``sudo grep -i aws-s3 /var/ossec/logs/ossec.log``                                                                                                 |
+------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------+
| The agent can read the bucket      | The profile has ``s3:GetObject`` and ``s3:ListBucket`` on the bucket, and ``kms:Decrypt`` on the key if the trail encrypts its logs with AWS KMS. |
+------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------+
| CloudTrail delivered the event     | The bucket has a log file newer than the IAM call.                                                                                                |
+------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------+
| The module ran after the delivery  | Restart the Wazuh agent to force a run.                                                                                                           |
+------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------+
| The ``aws`` integration is enabled | **Ruleset management** > **Overview** shows it enabled. With it off, Wazuh drops the events without any message.                                  |
+------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------+

Clean up
--------

Delete the test IAM user. If you no longer need the trail, delete it in the CloudTrail service so it stops writing logs to the S3 bucket.
