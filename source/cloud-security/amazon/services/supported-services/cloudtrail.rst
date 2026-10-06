.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: AWS CloudTrail is a service that enables auditing of your AWS account. Learn more in this section of the documentation.

AWS CloudTrail
==============

`AWS CloudTrail <https://aws.amazon.com/cloudtrail/>`__ is a service that enables auditing of your AWS account. With CloudTrail, you can log, monitor, and retain account activity related to actions across your AWS infrastructure. This service provides the event history of your AWS account activity, such as actions taken through the AWS Management Console, AWS SDKs, command line tools, and other AWS services.

AWS configuration
-----------------

The following sections cover how to configure the Amazon CloudTrail service to integrate with Wazuh.

Amazon CloudTrail configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. :doc:`Create a new S3 bucket <../prerequisites/S3-bucket>`. If you want to use an already existing one, skip this step.

#. On your AWS console, search for *“cloudtrail”* in the search bar at the top of the page or go to **Management & Governance** > **CloudTrail**.

   .. thumbnail:: /images/cloud-security/aws/01-search-for-cloudtrail.png
      :align: center
      :width: 80%

#. Click **Create trail** to create a new trail.

   .. thumbnail:: /images/cloud-security/aws/02-create-trail.png
      :align: center
      :width: 80%

#. Assign a **Trail Name** and choose the S3 bucket that will store the CloudTrail logs (remember the name you provide here, you’ll need to reference it the Wazuh module for AWS configuration). If **Log file SSE-KMS encryption** is enabled, assign a name for a new AWS KMS alias or choose an existing one:

   .. thumbnail:: /images/cloud-security/aws/03-assign-trail-name-1.png
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/03-assign-trail-name-2.png
      :align: center
      :width: 80%

   .. note::

      The standard file system AWS CloudTrail will create has this structure:

      .. code-block:: xml

         <WAZUH_AWS_BUCKET>/<prefix>/AWSLogs/<ACCOUNT_ID>/CloudTrail/<REGION>/<year>/<month>/<day>

      The structure may change depending on the different configurations of the services, or changing of the ``<WAZUH_AWS_BUCKET>`` & ``<prefix>`` values by the user.

#. Choose log events to be recorded and click **Next**.

   .. thumbnail:: /images/cloud-security/aws/04-choose-log-events.png
      :align: center
      :width: 80%

#. Review the configuration and click **Create trail**.

   .. thumbnail:: /images/cloud-security/aws/05-review-and-create-trail.png
      :align: center
      :width: 80%

.. _cloudtrail_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst
.. include:: /_templates/cloud/amazon/bucket_policies.rst
.. include:: /_templates/cloud/amazon/attach_policy.rst

Configure Wazuh to process AWS CloudTrail logs
----------------------------------------------

#. Access the Wazuh configuration in **Server management** > **Settings** using the Wazuh dashboard or by manually editing the ``/var/ossec/etc/ossec.conf`` file in the Wazuh server or agent.

   .. thumbnail:: /images/cloud-security/aws/config-wazuh-cloudtrail/01-wazuh-configuration.png
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/config-wazuh-cloudtrail/02-wazuh-configuration.png
      :align: center
      :width: 80%

#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the file, replacing ``<WAZUH_AWS_BUCKET>`` with the name of the S3 bucket:

   .. code-block:: xml

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

      In this example, the ``aws_profile`` authentication parameter was used. Check the :doc:`credentials <../prerequisites/credentials>` section to learn more about the different authentication options and how to use them.

#. Save the changes and restart Wazuh to apply the changes. The service can be manually restarted using the following command outside the Wazuh dashboard:

   -  Wazuh manager:

      .. code-block:: console

         # systemctl restart wazuh-manager

   -  Wazuh agent:

      .. code-block:: console

         # systemctl restart wazuh-agent

.. _cloudtrail-use-cases:

CloudTrail use cases
--------------------

Below you find examples of some of how Wazuh integrates with CloudTrail to monitor EC2 and IAM events. This enhances the security monitoring capabilities of AWS environments by providing near real-time detection of security incidents and compliance violations.

EC2
^^^

Amazon EC2 (Elastic Compute Cloud) provides scalable computing capacity in the cloud. When using this service, it is highly recommended to monitor it for intrusion attempts or other unauthorized actions performed against your cloud infrastructure.

Below are some use cases for EC2 monitoring.

.. contents::
   :local:
   :depth: 2
   :backlinks: none

Run a new instance in EC2
~~~~~~~~~~~~~~~~~~~~~~~~~

When a user creates a new instance in EC2, a CloudTrail event is generated. As previously mentioned, the log message is collected by the Wazuh agent, and forwarded to the Wazuh manager for analysis. The following alerts with rule ID *80202* will be shown on the Wazuh dashboard, it shows data such as instance type, the user who created it, or the creation date.

.. thumbnail:: /images/cloud-security/aws/ec2/1.run-a-new-instance-in-ec2.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/ec2/1.1.run-a-new-instance-in-ec2.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/ec2/1.2.run-a new-instance-in-ec2.png
   :align: center
   :width: 80%

When a user tries to run an instance without relevant permissions, then the following alert with rule ID *80203* will be shown on the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/aws/ec2/3.run-instance-without-permissions-1.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/ec2/3.run-instance-without-permissions-2.png
   :align: center
   :width: 80%

Start instances in EC2
~~~~~~~~~~~~~~~~~~~~~~

When an EC2 instance is started, the following alerts with rule ID *80202* will be shown on the Wazuh dashboard. It shows information such as the instance ID and the user who started it.

.. thumbnail:: /images/cloud-security/aws/ec2/1-start-instance-in-ec2.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/ec2/2-start-instance-in-ec2.png
   :align: center
   :width: 80%

If a user tries to start instances without relevant permissions the following alert will be shown on the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/aws/ec2/3-start-instance-without-permission.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/ec2/4-start-instance-without-permission.png
   :align: center
   :width: 80%

Stop instances in EC2
~~~~~~~~~~~~~~~~~~~~~

When an EC2 instance is stopped, the following alerts with rule ID *80202* will be shown on the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/aws/ec2/1-stop-instance.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/ec2/2-stop-instance.png
   :align: center
   :width: 80%

If a user tries to stop instances without relevant permissions, the following alert with rule ID *80203* will be shown on the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/aws/ec2/3-stop-instance-without-permission.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/ec2/4-stop-instance-without-permission.png
   :align: center
   :width: 80%

Create security groups in EC2
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When a new EC2 security group is created, the following alerts with rule ID *80202* is shown on the Wazuh dashboard. It shows information such as the user who created it and information about the security group.

.. thumbnail:: /images/cloud-security/aws/ec2/1-create-security-groups-in-ec2.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/ec2/2-create-security-groups-in-ec2.png
   :align: center
   :width: 80%

Allocate a new Elastic IP address
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If a new Elastic IP address is allocated, the following with rule ID *80202* alerts will be shown on  the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/aws/ec2/1-allocate-a-new-elastic-ip-address.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/ec2/2-allocate-a-new-elastic-ip-address.png
   :align: center
   :width: 80%

Associate a new Elastic IP address
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If an Elastic IP address is associated, the following alert with rule ID *80202* will be shown on the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/aws/ec2/1-associate-a-new-elastic-ip-address.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/ec2/2-associate-a-new-elastic-ip-address.png
   :align: center
   :width: 80%

IAM
^^^

Identity and Access Management (IAM) allows you to create and manage AWS users and groups, and manage permissions to allow and deny their access to AWS resources. You can use the AWS IAM log data to monitor user access to AWS services and resources.

Below are some use cases for IAM events.

.. contents::
   :local:
   :depth: 2
   :backlinks: none

Create a user account
~~~~~~~~~~~~~~~~~~~~~

When we create a new user account in IAM, a CloudTrail event is generated. As previously mentioned, the log message is collected by the Wazuh agent, and forwarded to the Wazuh server for analysis. When a user account is created, the following alerts with rule ID *80202* will appear on the Wazuh dashboard. You can see the username of the created user, the time it was created, and who created it.

.. thumbnail:: /images/cloud-security/aws/iam/1-create-a-user-account.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/iam/2-create-a-user-account.png
   :align: center
   :width: 80%

Create a user account without permissions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If an unauthorized user attempts to create new users, the following alert with rule ID *80250* will be shown on the Wazuh dashboard. It will show you which user has tried to create a user account and the username it tried to create.

.. thumbnail:: /images/cloud-security/aws/iam/1-create-a-user-account-without-permissions.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/iam/2-create-a-user-account-without-permissions.png
   :align: center
   :width: 80%

User login failed
~~~~~~~~~~~~~~~~~

When a user tries to log in with an invalid password, the following alerts with rule ID *80254* will be shown on the Wazuh dashboard. There will be shown data such as the user who tried to log in and the browser it was using.

.. thumbnail:: /images/cloud-security/aws/iam/1-user-login-failed.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/iam/2-user-login-failed.png
   :align: center
   :width: 80%

Possible break-in attempt
~~~~~~~~~~~~~~~~~~~~~~~~~

When more than four consecutive unsuccessful login attempts to the AWS console occur in a 360-second time window, the following alert with rule ID *80255* will be shown on the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/aws/iam/1-possible-break-in-attempt.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/iam/2-possible-break-in-attempt.png
   :align: center
   :width: 80%

Login success
~~~~~~~~~~~~~

After a successful login, the following alerts with rule ID *80253* will be shown on the Wazuh dashboard. It shows the user who logged in, the browser it used, and other useful information.

.. thumbnail:: /images/cloud-security/aws/iam/1-login-success.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/iam/2-login-success.png
   :align: center
   :width: 80%

You can create visualizations like this on the Wazuh dashboard for IAM events by following the :doc:`custom dashboard </user-manual/wazuh-dashboard/creating-custom-dashboards>` guide:

+-------------------------------------------------------------------+-------------------------------------------------------------------+
| Pie Chart                                                         | Stacked Groups                                                    |
+===================================================================+===================================================================+
| .. thumbnail:: /images/cloud-security/aws/iam/1-visualization.png | .. thumbnail:: /images/cloud-security/aws/iam/2-visualization.png |
|    :align: center                                                 |    :align: center                                                 |
|    :width: 60%                                                    |    :width: 100%                                                   |
+-------------------------------------------------------------------+-------------------------------------------------------------------+
