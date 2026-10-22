.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: AWS CloudTrail is a service that enables auditing of your AWS account. Learn more in this section of the documentation.

AWS CloudTrail
==============

`AWS CloudTrail <https://aws.amazon.com/cloudtrail/>`__ is a service that enables auditing of your AWS account. With CloudTrail, you can log, monitor, and retain account activity related to actions across your AWS infrastructure. It records your AWS account activity, such as actions taken through the AWS Management Console, AWS SDKs, command-line tools, and other AWS services.

AWS configuration
-----------------

The following sections cover how to configure the AWS CloudTrail service to integrate with Wazuh.

AWS CloudTrail configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. :doc:`Create a new S3 bucket </cloud-security/amazon/services/prerequisites/S3-bucket>`, or skip this step to use an existing bucket.

#. On your AWS console, search for ``cloudtrail`` in the search bar or go to **Services** > **Management & Governance** > **CloudTrail**.

   .. thumbnail:: /images/cloud-security/aws/01-search-for-cloudtrail.png
      :title: CloudTrail
      :alt: CloudTrail
      :align: center
      :width: 80%

#. Click **Create trail** to create a new trail.

   .. thumbnail:: /images/cloud-security/aws/02-create-trail.png
      :title: Click create trail
      :alt: Click create trail
      :align: center
      :width: 80%

#. Assign a **Trail name** and choose the S3 bucket that stores the CloudTrail logs. Note the bucket name, because the Wazuh module for AWS configuration needs it. If **Log file SSE-KMS encryption** is enabled, assign a name for a new AWS KMS alias or choose an existing one. The CloudTrail console enables this encryption by default. If you keep it enabled, keep the ``KMSDecrypt`` statement in the policies of the next section so that Wazuh can decrypt the logs.

   .. thumbnail:: /images/cloud-security/aws/03-assign-trail-name-1.png
      :title: Trail name, storage location, and SSE-KMS encryption settings
      :alt: Trail name, storage location, and SSE-KMS encryption settings
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/03-assign-trail-name-2.png
      :title: AWS KMS alias and additional trail settings
      :alt: AWS KMS alias and additional trail settings
      :align: center
      :width: 80%

   .. note::

      By default, AWS CloudTrail creates this file structure:

      .. code-block:: none

         <WAZUH_AWS_BUCKET>/<PREFIX>/AWSLogs/<ACCOUNT_ID>/CloudTrail/<REGION>/<YEAR>/<MONTH>/<DAY>

      The structure might change depending on the configuration of the services, or changing of the ``<WAZUH_AWS_BUCKET>`` and ``<PREFIX>`` values.

#. Select the log events to record and click **Next**.

   .. thumbnail:: /images/cloud-security/aws/04-choose-log-events.png
      :title: Choose log events for the trail
      :alt: Choose log events for the trail
      :align: center
      :width: 80%

#. Review the configuration and click **Create trail**.

   .. thumbnail:: /images/cloud-security/aws/05-review-and-create-trail.png
      :title: Review the trail configuration and create the trail
      :alt: Review the trail configuration and create the trail
      :align: center
      :width: 80%

.. _cloudtrail_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst

.. include:: /_templates/cloud/amazon/read_only_policy_description.rst

.. code-block:: json
   :emphasize-lines: 12,13,20

   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "VisualEditor0",
               "Effect": "Allow",
               "Action": [
                   "s3:GetObject",
                   "s3:ListBucket"
               ],
               "Resource": [
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>/*",
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>"
               ]
           },
           {
               "Sid": "KMSDecrypt",
               "Effect": "Allow",
               "Action": "kms:Decrypt",
               "Resource": "arn:aws:kms:<REGION>:<ACCOUNT_ID>:key/<KEY_ID>"
           }
       ]
   }

.. include:: /_templates/cloud/amazon/delete_policy_description.rst

.. code-block:: json
   :emphasize-lines: 13,14,21

   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "VisualEditor0",
               "Effect": "Allow",
               "Action": [
                   "s3:GetObject",
                   "s3:ListBucket",
                   "s3:DeleteObject"
               ],
               "Resource": [
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>/*",
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>"
               ]
           },
           {
               "Sid": "KMSDecrypt",
               "Effect": "Allow",
               "Action": "kms:Decrypt",
               "Resource": "arn:aws:kms:<REGION>:<ACCOUNT_ID>:key/<KEY_ID>"
           }
       ]
   }

.. note::

   ``<WAZUH_AWS_BUCKET>`` is a placeholder. Replace it with the actual name of the bucket from which you want to retrieve logs. If your trail encrypts its log files with SSE-KMS, replace ``<REGION>``, ``<ACCOUNT_ID>``, and ``<KEY_ID>`` in the ``KMSDecrypt`` statement with the Region, account ID, and ID of that KMS key. Otherwise, remove the ``KMSDecrypt`` statement.

Wazuh deletes the log files from the bucket only if you set ``remove_from_bucket`` to ``yes`` in the bucket configuration. This option is off by default and isn't in the sample configuration, so you need the second policy only if you turn it on.

.. include:: /_templates/cloud/amazon/attach_policy.rst

Configure Wazuh to process AWS CloudTrail logs
----------------------------------------------

#. Make sure that the AWS integrations are enabled on the Wazuh dashboard, as described in :doc:`Enable AWS integration on the Wazuh dashboard </cloud-security/amazon/services/prerequisites/enabling-integration>`.

#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the ``/var/ossec/etc/ossec.conf`` file on the Wazuh agent. Replace ``<WAZUH_AWS_BUCKET>`` with the name of the S3 bucket. If the file already has a ``<wodle name="aws-s3">`` block, add only the ``<bucket>`` section to it:

   .. code-block:: xml
      :emphasize-lines: 7

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="cloudtrail">
          <name><WAZUH_AWS_BUCKET></name>
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

   .. note::

      This example uses the ``aws_profile`` authentication parameter. Check the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section to learn more about the different authentication options and how to use them.

#. Save the changes and restart the Wazuh agent service to apply the changes.

   .. code-block:: console

      # systemctl restart wazuh-agent

.. _cloudtrail-use-cases:

CloudTrail use cases
--------------------

The following examples show how Wazuh integrates with CloudTrail to monitor EC2 and IAM events. These use cases show near real-time detection of security incidents and compliance violations in your AWS environment.

EC2
^^^

Amazon Elastic Compute Cloud (Amazon EC2) provides scalable computing capacity in the cloud. We recommend that you monitor this service for intrusion attempts or other unauthorized actions performed against your cloud infrastructure.

Below are some use cases for EC2 monitoring.

-  :ref:`Create a new instance in EC2 <aws_cloudtrail_create_instance>`
-  :ref:`Start instances in EC2 <aws_cloudtrail_start_instances>`
-  :ref:`Stop instances in EC2 <aws_cloudtrail_stop_instances>`
-  :ref:`Create security groups in EC2 <aws_cloudtrail_create_security_groups>`
-  :ref:`Allocate a new Elastic IP address <aws_cloudtrail_allocate_elastic_ip>`
-  :ref:`Associate a new Elastic IP address <aws_cloudtrail_associate_elastic_ip>`

.. _aws_cloudtrail_create_instance:

Create a new instance in EC2
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When a user creates a new instance in EC2, CloudTrail generates an event. The Wazuh agent collects the log message and forwards it to the Wazuh manager for analysis. The Cloud VM instance started finding is shown on the Wazuh dashboard. It shows data such as the instance type, the user who created it, and the creation date.

.. thumbnail:: /images/cloud-security/aws/ec2/1.run-a-new-instance-in-ec2.png
   :title: Cloud VM instance started finding for a new EC2 instance
   :alt: Cloud VM instance started finding for a new EC2 instance
   :align: center
   :width: 80%

Expand the finding to see its details.

.. thumbnail:: /images/cloud-security/aws/ec2/1.1.run-a-new-instance-in-ec2.png
   :title: Details of the Cloud VM instance started finding for a new EC2 instance
   :alt: Details of the Cloud VM instance started finding for a new EC2 instance
   :align: center
   :width: 80%

When a user tries to run an instance without the required permissions, the AWS API call denied by IAM finding is shown on the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/aws/ec2/3.run-instance-without-permissions-1.png
   :title: AWS API call denied by IAM finding for a RunInstances call
   :alt: AWS API call denied by IAM finding for a RunInstances call
   :align: center
   :width: 80%

Expand the finding to see its details.

.. thumbnail:: /images/cloud-security/aws/ec2/3.run-instance-without-permissions-2.png
   :title: Details of the AWS API call denied by IAM finding for a RunInstances call
   :alt: Details of the AWS API call denied by IAM finding for a RunInstances call
   :align: center
   :width: 80%

.. _aws_cloudtrail_start_instances:

Start instances in EC2
~~~~~~~~~~~~~~~~~~~~~~

When an EC2 instance is started, the Cloud VM instance started finding is shown on the Wazuh dashboard. It shows information such as the instance ID and the user who started it.

.. thumbnail:: /images/cloud-security/aws/ec2/1-start-instance-in-ec2.png
   :title: Cloud VM instance started finding for a started EC2 instance
   :alt: Cloud VM instance started finding for a started EC2 instance
   :align: center
   :width: 80%

Expand the finding to see its details.

.. thumbnail:: /images/cloud-security/aws/ec2/2-start-instance-in-ec2.png
   :title: Details of the Cloud VM instance started finding for a started EC2 instance
   :alt: Details of the Cloud VM instance started finding for a started EC2 instance
   :align: center
   :width: 80%

If a user tries to start instances without the required permissions, the AWS API call denied by IAM finding is shown on the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/aws/ec2/3-start-instance-without-permission.png
   :title: AWS API call denied by IAM finding for a StartInstances call
   :alt: AWS API call denied by IAM finding for a StartInstances call
   :align: center
   :width: 80%

Expand the finding to see its details.

.. thumbnail:: /images/cloud-security/aws/ec2/4-start-instance-without-permission.png
   :title: Details of the AWS API call denied by IAM finding for a StartInstances call
   :alt: Details of the AWS API call denied by IAM finding for a StartInstances call
   :align: center
   :width: 80%

.. _aws_cloudtrail_stop_instances:

Stop instances in EC2
~~~~~~~~~~~~~~~~~~~~~

When an EC2 instance is stopped, the Cloud VM instance stopped finding is shown on the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/aws/ec2/1-stop-instance.png
   :title: Cloud VM instance stopped finding
   :alt: Cloud VM instance stopped finding
   :align: center
   :width: 80%

Expand the finding to see its details.

.. thumbnail:: /images/cloud-security/aws/ec2/2-stop-instance.png
   :title: Details of the Cloud VM instance stopped finding
   :alt: Details of the Cloud VM instance stopped finding
   :align: center
   :width: 80%

.. _aws_cloudtrail_create_security_groups:

Create security groups in EC2
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When a new EC2 security group is created, the AWS EC2 security group created finding is shown on the Wazuh dashboard. It shows information such as the user who created it and information about the security group.

.. thumbnail:: /images/cloud-security/aws/ec2/1-create-security-groups-in-ec2.png
   :title: AWS EC2 security group created finding
   :alt: AWS EC2 security group created finding
   :align: center
   :width: 80%

Expand the finding to see its details.

.. thumbnail:: /images/cloud-security/aws/ec2/2-create-security-groups-in-ec2.png
   :title: Details of the AWS EC2 security group created finding
   :alt: Details of the AWS EC2 security group created finding
   :align: center
   :width: 80%

.. _aws_cloudtrail_allocate_elastic_ip:

Allocate a new Elastic IP address
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If a new Elastic IP address is allocated, the AWS EC2 elastic IP address allocated finding is shown on the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/aws/ec2/1-allocate-a-new-elastic-ip-address.png
   :title: AWS EC2 elastic IP address allocated findings
   :alt: AWS EC2 elastic IP address allocated findings
   :align: center
   :width: 80%

Expand the finding to see its details.

.. thumbnail:: /images/cloud-security/aws/ec2/2-allocate-a-new-elastic-ip-address.png
   :title: Details of the AWS EC2 elastic IP address allocated finding
   :alt: Details of the AWS EC2 elastic IP address allocated finding
   :align: center
   :width: 80%

.. _aws_cloudtrail_associate_elastic_ip:

Associate a new Elastic IP address
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If an Elastic IP address is associated, the AWS EC2 elastic IP address associated finding is shown on the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/aws/ec2/1-associate-a-new-elastic-ip-address.png
   :title: AWS EC2 elastic IP address associated findings
   :alt: AWS EC2 elastic IP address associated findings
   :align: center
   :width: 80%

Expand the finding to see its details.

.. thumbnail:: /images/cloud-security/aws/ec2/2-associate-a-new-elastic-ip-address.png
   :title: Details of the AWS EC2 elastic IP address associated finding
   :alt: Details of the AWS EC2 elastic IP address associated finding
   :align: center
   :width: 80%

IAM
^^^

AWS Identity and Access Management (IAM) lets you create and manage AWS users and groups. It also sets the permissions that allow or deny their access to AWS resources. You can use the AWS IAM log data to monitor user access to AWS services and resources.

Below are some use cases for IAM events.

-  :ref:`Create a user account <aws_cloudtrail_create_user_account>`
-  :ref:`Create a user account without permissions <aws_cloudtrail_create_user_account_without_permissions>`
-  :ref:`User login failed <aws_cloudtrail_user_login_failed>`
-  :ref:`Possible break-in attempt <aws_cloudtrail_possible_break_in_attempt>`
-  :ref:`Login success <aws_cloudtrail_login_success>`

.. _aws_cloudtrail_create_user_account:

Create a user account
~~~~~~~~~~~~~~~~~~~~~

When a user creates a new user account in IAM, CloudTrail generates an event. As previously mentioned, the log message is collected by the Wazuh agent, and forwarded to the Wazuh manager for analysis. When a user account is created, the New user account ``<USERNAME>`` created finding is shown on the Wazuh dashboard. If the new user has no permissions, the AWS IAM user created without permissions assignment finding is also shown. You can see the username of the created user, the time it was created, and who created it.

.. thumbnail:: /images/cloud-security/aws/iam/1-create-a-user-account.png
   :title: New user account created and AWS IAM user created without permissions assignment findings
   :alt: New user account created and AWS IAM user created without permissions assignment findings
   :align: center
   :width: 80%

Expand the finding to see its details.

.. thumbnail:: /images/cloud-security/aws/iam/2-create-a-user-account.png
   :title: Details of a user account creation finding
   :alt: Details of a user account creation finding
   :align: center
   :width: 80%

.. _aws_cloudtrail_create_user_account_without_permissions:

Create a user account without permissions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If an unauthorized user attempts to create new users, the AWS API call denied by IAM finding is shown on the Wazuh dashboard. It shows which user has tried to create a user account and the username it tried to create.

.. thumbnail:: /images/cloud-security/aws/iam/1-create-a-user-account-without-permissions.png
   :title: AWS API call denied by IAM finding for a CreateUser call
   :alt: AWS API call denied by IAM finding for a CreateUser call
   :align: center
   :width: 80%

Expand the finding to see its details.

.. thumbnail:: /images/cloud-security/aws/iam/2-create-a-user-account-without-permissions.png
   :title: Details of the AWS API call denied by IAM finding for a CreateUser call
   :alt: Details of the AWS API call denied by IAM finding for a CreateUser call
   :align: center
   :width: 80%

.. _aws_cloudtrail_user_login_failed:

User login failed
~~~~~~~~~~~~~~~~~

When a user tries to log in with an invalid password, the Failed authentication attempt finding is shown on the Wazuh dashboard. It shows data such as the user who tried to log in and the browser they used.

.. thumbnail:: /images/cloud-security/aws/iam/1-user-login-failed.png
   :title: Failed authentication attempt findings
   :alt: Failed authentication attempt findings
   :align: center
   :width: 80%

Expand the finding to see its details.

.. thumbnail:: /images/cloud-security/aws/iam/2-user-login-failed.png
   :title: Details of the Failed authentication attempt finding
   :alt: Details of the Failed authentication attempt finding
   :align: center
   :width: 80%

.. _aws_cloudtrail_possible_break_in_attempt:

Possible break-in attempt
~~~~~~~~~~~~~~~~~~~~~~~~~

When a root user sign-in to the AWS Management Console fails, the Wazuh dashboard shows the AWS Console possible break-in attempt via root account finding. A Failed authentication attempt finding appears with it.

.. thumbnail:: /images/cloud-security/aws/iam/1-possible-break-in-attempt.png
   :title: AWS Console possible break-in attempt via root account findings
   :alt: AWS Console possible break-in attempt via root account findings
   :align: center
   :width: 80%

Expand the finding to see its details.

.. thumbnail:: /images/cloud-security/aws/iam/2-possible-break-in-attempt.png
   :title: Details of a failed root account sign-in finding
   :alt: Details of a failed root account sign-in finding
   :align: center
   :width: 80%

.. _aws_cloudtrail_login_success:

Login success
~~~~~~~~~~~~~

After a successful login, the Successful user authentication finding is shown on the Wazuh dashboard. It shows the user who logged in, the browser they used, and other useful information.

.. thumbnail:: /images/cloud-security/aws/iam/1-login-success.png
   :title: Successful user authentication findings
   :alt: Successful user authentication findings
   :align: center
   :width: 80%

Expand the finding to see its details.

.. thumbnail:: /images/cloud-security/aws/iam/2-login-success.png
   :title: Details of the Successful user authentication finding
   :alt: Details of the Successful user authentication finding
   :align: center
   :width: 80%

You can create visualizations like the following on the Wazuh dashboard for IAM events by following the :ref:`custom dashboard <creating_custom_dashboards>` guide:

+-------------------------------------------------------------------+-------------------------------------------------------------------+
| Pie chart                                                         | Stacked groups                                                    |
+===================================================================+===================================================================+
| .. thumbnail:: /images/cloud-security/aws/iam/1-visualization.png | .. thumbnail:: /images/cloud-security/aws/iam/2-visualization.png |
|    :title: Pie chart of IAM events by action                      |    :title: Stacked groups chart of IAM events over time by user   |
|    :alt: Pie chart of IAM events by action                        |    :alt: Stacked groups chart of IAM events over time by user     |
|    :align: center                                                 |    :align: center                                                 |
|    :width: 100%                                                   |    :width: 100%                                                   |
+-------------------------------------------------------------------+-------------------------------------------------------------------+
