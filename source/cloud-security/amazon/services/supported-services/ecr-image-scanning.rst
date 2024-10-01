.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure AWS to store the scan findings in CloudWatch Logs and how to ingest them into Wazuh.

Amazon ECR Image scanning
=========================

`Amazon ECR image scanning <https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html>`__ uses the Common Vulnerabilities and Exposures (CVEs) database from the open source `Clair project <https://github.com/quay/clair>`__ to detect software vulnerabilities in container images and provide a list of scan findings, which can be easily integrated into Wazuh thanks to the :doc:`Amazon CloudWatch Logs <cloudwatchlogs>`  integration.

Amazon ECR sends an event to Amazon EventBridge when an image scan is completed. The event itself is only a summary and does not contain the details of the scan findings. However, it is possible to configure a Lambda function to request the scan findings details and store them in CloudWatch Logs. Here is a quick summary of what the workflow looks like:

#. An image scan is triggered.
#. Once the scan is completed Amazon ECR sends an event to EventBridge.
#. The "Scan completed" event triggers a Lambda function.
#. The lambda function takes the data from the "Scan completed" event and requests the scan details.
#. The Lambda function creates a log group and a log stream in CloudWatch Logs to store the response received.
#. Wazuh pulls the logs from the CloudWatch log groups using the CloudWatch Logs integration.

.. thumbnail:: /images/cloud-security/aws/ecr-image-scanning/ecr-image-scanning.png
   :align: center
   :width: 80%

AWS configuration
-----------------

The following sections cover how to configure AWS to store the scan findings in CloudWatch Logs and how to ingest them into Wazuh.

Amazon ECR Image scan configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

AWS provides a `template <https://github.com/aws-samples/ecr-image-scan-findings-logger/blob/main/Template-ECR-SFL.yml>`__ that logs to CloudWatch the findings of Amazon ECR scans of images. The template uses an AWS Lambda function to accomplish this.

Uploading the template and creating a stack, uploading the images to Amazon ECR, scanning the images, and using the logger all require specific permissions. Because of this, you need to create a custom policy granting these permissions.

Take into account that the policies below follow the principle of least privilege to ensure that only the minimum permissions are provided to the AWS IAM user.

Policy configuration
^^^^^^^^^^^^^^^^^^^^

Follow the :ref:`creating an AWS policy <creating_an_AWS_policy>` guide to create a policy using the Amazon Web Services console.

You need the permissions listed below inside the sections for ``RoleCreator`` and ``PassRole`` to create and delete the stack based on the template.

.. warning::

   These permissions must be bound to the specific resources due to overly permissive actions.

.. code-block:: json

   {
      "Sid": "RoleCreator",
      "Effect": "Allow",
      "Action": [
         "iam:CreateRole",
         "iam:PutRolePolicy",
         "iam:AttachRolePolicy",
         "iam:DeleteRolePolicy",
         "iam:DeleteRole",
         "iam:GetRole",
         "iam:GetRolePolicy",
         "iam:PassRole"
      ],
      "Resource": "arn:aws:iam::<ACCOUNT_ID>:role/*"
   },
   {
      "Sid": "PassRole",
      "Effect": "Allow",
      "Action": "iam:PassRole",
      "Resource": "arn:aws:iam::<ACCOUNT_ID>:role/*-LambdaExecutionRole*"
   }

CloudFormation stack permissions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A CloudFormation stack is a collection of AWS resources that can be managed as a single unit, including creation, update, or deletion. You need the following permissions to create and delete any template-based CloudFormation stack.

.. code-block:: json

   {
      "Sid": "CloudFormationStackCreation",
      "Effect": "Allow",
      "Action": [
         "cloudformation:CreateStack",
         "cloudformation:ValidateTemplate",
         "cloudformation:CreateUploadBucket",
         "cloudformation:GetTemplateSummary",
         "cloudformation:DescribeStackEvents",
         "cloudformation:DescribeStackResources",
         "cloudformation:ListStacks",
         "cloudformation:DeleteStack",
         "s3:PutObject",
         "s3:ListBucket",
         "s3:GetObject",
         "s3:CreateBucket"
      ],
      "Resource": "*"
   }

ECR registry and repository permissions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This `Amazon ECR <https://docs.aws.amazon.com/AmazonECR/latest/userguide/set-repository-policy.html>`__ permission allows calls to the API through an IAM policy.

.. note::

   Before authenticating to a registry and pushing or pulling any images from any Amazon ECR repository, you need ``ecr:GetAuthorizationToken``.

.. code-block:: json

   {
      "Sid": "ECRUtilities",
      "Effect": "Allow",
      "Action": [
         "ecr:GetAuthorizationToken",
         "ecr:DescribeRepositories"
      ],
      "Resource": "*"
   }

Image pushing and scanning permissions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You need the following Amazon ECR permissions to `push images <https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-push.html#image-push-iam>`__. They are scoped down to a specific repository. The steps to push Docker images are described in the `Amazon ECR - pushing a docker image <https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html>`__ documentation.

.. code-block:: json

   {
      "Sid": "ScanPushImage",
      "Effect": "Allow",
      "Action": [
         "ecr:CompleteLayerUpload",
         "ecr:UploadLayerPart",
         "ecr:InitiateLayerUpload",
         "ecr:BatchCheckLayerAvailability",
         "ecr:PutImage",
         "ecr:ListImages",
         "ecr:DescribeImages",
         "ecr:DescribeImageScanFindings",
         "ecr:StartImageScan"
      ],
      "Resource": "arn:aws:ecr:<REGION>:<ACCOUNT_ID>:repository/<repository-name>"
   }

Amazon Lambda and Amazon EventBridge permissions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You need the following permissions to create and delete the resources handled by the Scan Findings Logger template.

.. code-block:: json

   {
      "Sid": "TemplateRequired0",
      "Effect": "Allow",
      "Action": [
         "lambda:RemovePermission",
         "lambda:DeleteFunction",
         "lambda:GetFunction",
         "lambda:CreateFunction",
         "lambda:AddPermission"
      ],
      "Resource": "arn:aws:lambda:<REGION>:<ACCOUNT_ID>:*"
   },
   {
      "Sid": "TemplateRequired1",
      "Effect": "Allow",
      "Action": [
         "events:RemoveTargets",
         "events:DeleteRule",
         "events:PutRule",
         "events:DescribeRule",
         "events:PutTargets"
      ],
      "Resource": "arn:aws:events:<REGION>:<ACCOUNT_ID>:*"
   }

How to create the CloudFormation Stack
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Download the ECR Image Scan findings logger `template <https://github.com/aws-samples/ecr-image-scan-findings-logger/blob/main/Template-ECR-SFL.yml>`__ from the official `aws-samples <https://github.com/aws-samples/>`__ GitHub repository.
#. Access `CloudFormation <https://console.aws.amazon.com/cloudformation/home>`__ and click on **Create stack**.
#. Create a new stack using the template from step 1.

   .. thumbnail:: /images/cloud-security/aws/ecr-image-scanning/01-create-stack.png
      :align: center
      :width: 80%

#. Choose a name for the stack and finish the creation process. No additional configuration is required.

   .. thumbnail:: /images/cloud-security/aws/ecr-image-scanning/02-choose-stack-name.png
      :align: center
      :width: 80%

#. Wait until **CREATE_COMPLETE** status is reached. The stack containing the AWS Lambda is now ready to be used.

   .. thumbnail:: /images/cloud-security/aws/ecr-image-scanning/03-wait-until-create_complete.png
      :align: center
      :width: 80%

Once the stack configuration is completed, the Lambda can be tested by manually triggering an `image scan <https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning-basic.html>`__ of a container in `Amazon ECR private registry <https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html>`__. The scan results in the creation of a CloudWatch log group called ``/aws/ecr/image-scan-findings/<NAME_OF_ECR_REPOSITORY>`` containing the scan results. For every new scan, the corresponding log streams are created inside the log group.

.. thumbnail:: /images/cloud-security/aws/ecr-image-scanning/04-log-group.png
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/ecr-image-scanning/05-log-stream.png
   :align: center
   :width: 80%

Configure Wazuh to process Amazon ECR image scanning logs
---------------------------------------------------------

#. Access the Wazuh configuration in **Server management** > **Settings** using the Wazuh dashboard or by manually editing the ``/var/ossec/etc/ossec.conf`` file in the Wazuh server or agent.

   .. thumbnail:: /images/cloud-security/aws/ecr-image-scanning/01-wazuh-configuration.png
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/ecr-image-scanning/02-wazuh-configuration.png
      :align: center
      :width: 80%

#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration block to enable the integration with Amazon ECR Image scanning. Replace ``<NAME_OF_ECR_REPOSITORY>`` with the name of the Amazon ECR repository:

   .. code-block:: xml

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>5m</interval>
        <run_on_start>yes</run_on_start>
        <service type="cloudwatchlogs">
          <aws_profile>default</aws_profile>
          <aws_log_groups>/aws/ecr/<NAME_OF_ECR_REPOSITORY></aws_log_groups>
        </service>
      </wodle>

   .. note::

      Check the :doc:`AWS CloudWatch Logs integration </cloud-security/amazon/services/supported-services/cloudwatchlogs>` to learn more about how the CloudWatch Logs integration works.

#. Save the changes and restart Wazuh to apply the changes. The service can be manually restarted using the following command outside the Wazuh dashboard:

   -  Wazuh manager:

      .. code-block:: console

         # systemctl restart wazuh-manager

   -  Wazuh agent:

      .. code-block:: console

         # systemctl restart wazuh-agent

Use case
--------

Amazon ECR provides an image scanning feature that uses the Common Vulnerabilities and Exposure (CVEs) database from the open source Clair project to detect vulnerabilities in container images. Wazuh polls and detects these vulnerabilities from AWS CloudWatch.

Detecting vulnerabilities in container images
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Check the `Detecting vulnerabilities in container images using Amazon ECR <https://wazuh.com/blog/detecting-vulnerabilities-in-container-images-using-amazon-ecr/>`__ blog to learn how to detect vulnerabilities in container images using Wazuh and Amazon ECR integration.