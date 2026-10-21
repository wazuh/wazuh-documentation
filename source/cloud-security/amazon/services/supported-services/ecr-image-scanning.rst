.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure AWS to store the scan findings in CloudWatch Logs and how to ingest them into Wazuh.

Amazon ECR image scanning
=========================

`Amazon ECR image scanning <https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html>`__ detects software vulnerabilities in container images and lists them as scan findings. Amazon ECR basic scanning uses AWS native technology and more than 50 data feeds to detect common vulnerabilities and exposures (CVEs). Wazuh collects these findings from :doc:`Amazon CloudWatch Logs </cloud-security/amazon/services/supported-services/cloudwatchlogs>`. This method covers Amazon ECR basic scanning only. If your registry uses enhanced scanning, collect the findings with :doc:`Amazon Inspector </cloud-security/amazon/services/supported-services/inspector>` instead.

Amazon ECR sends an event to Amazon EventBridge when an image scan is completed. The event itself is only a summary and does not contain the details of the scan findings. However, you can configure a Lambda function to request the scan findings details and store them in CloudWatch Logs. The following list and diagram summarize the workflow:

#. An image scan is triggered.
#. Once the scan is completed, Amazon ECR sends an event to EventBridge.
#. The "Scan completed" event triggers a Lambda function.
#. The Lambda function takes the data from the "Scan completed" event and requests the scan details.
#. The Lambda function creates a log group and a log stream in CloudWatch Logs to store the response received.
#. Wazuh retrieves logs from CloudWatch log groups with the Wazuh module for AWS.

.. thumbnail:: /images/cloud-security/aws/ecr-image-scanning/ecr-image-scanning.png
   :title: Amazon ECR image scanning workflow
   :alt: Amazon ECR image scanning workflow
   :align: center
   :width: 80%

AWS configuration
-----------------

The following sections cover configuring AWS to store scan findings in CloudWatch Logs and ingesting them into Wazuh.

Amazon ECR image scan configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

AWS provides a `template <https://github.com/aws-samples/ecr-image-scan-findings-logger/blob/main/Template-ECR-SFL.yml>`__ that logs findings from Amazon ECR image scans to CloudWatch. The template uses an AWS Lambda function to accomplish this. The Lambda function runs when an Amazon ECR basic scan completes. If your registry uses enhanced scanning with Amazon Inspector, Amazon ECR doesn't send this event, so the function writes no logs. In that case, use basic scanning for the repository, or collect the findings with Amazon Inspector.

Deploying the stack, pushing and scanning images, and reading the scan findings require specific permissions, so you need to create custom policies. Attach the first five policies below to the user who deploys the stack and pushes the images. They cover the IAM roles, the CloudFormation stack, the Amazon ECR registry, image pushing and scanning, and AWS Lambda and Amazon EventBridge. Attach the CloudWatch Logs policy to the IAM user that the Wazuh module for AWS uses. After creating a policy, you can attach it directly to a user or to a group to which the user belongs. In the policies below, replace ``<REGION>``, ``<ACCOUNT_ID>``, and ``<REPOSITORY_NAME>`` with your AWS Region, AWS account ID, and Amazon ECR repository name.

Note that the policies below follow the principle of least privilege, ensuring that only the minimum permissions are granted to the AWS IAM user.

.. _ecr_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

Follow the :ref:`creating an AWS policy <creating_an_AWS_policy>` guide to create a policy using the Amazon Web Services console.

IAM role permissions
~~~~~~~~~~~~~~~~~~~~

You need the permissions listed below inside the statements for ``RoleCreator`` and ``PassRole`` to create and delete the stack based on the template.

.. note::

   The ``RoleCreator`` statement covers all roles in the account because CloudFormation generates the role name. The ``PassRole`` statement limits ``iam:PassRole`` to the Lambda execution role that the template creates.

.. code-block:: json
   :emphasize-lines: 16,22

   {
     "Version": "2012-10-17",
     "Statement": [
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
           "iam:GetRolePolicy"
         ],
         "Resource": "arn:aws:iam::<ACCOUNT_ID>:role/*"
       },
       {
         "Sid": "PassRole",
         "Effect": "Allow",
         "Action": "iam:PassRole",
         "Resource": "arn:aws:iam::<ACCOUNT_ID>:role/*-LambdaExecutionRole*"
       }
     ]
   }

CloudFormation stack permissions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A CloudFormation stack is a collection of AWS resources that can be managed as a single unit, including creation, update, or deletion. You need the following permissions to create and delete any template-based CloudFormation stack.

.. code-block:: json

   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "CloudFormationStackCreation",
         "Effect": "Allow",
         "Action": [
           "cloudformation:CreateStack",
           "cloudformation:ValidateTemplate",
           "cloudformation:GetTemplateSummary",
           "cloudformation:DescribeStacks",
           "cloudformation:DescribeStackEvents",
           "cloudformation:DescribeStackResources",
           "cloudformation:ListStacks",
           "cloudformation:DeleteStack",
           "s3:CreateBucket",
           "s3:ListBucket",
           "s3:GetObject",
           "s3:PutObject"
         ],
         "Resource": "*"
       }
     ]
   }

ECR registry and repository permissions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You need the following permissions to authenticate to the Amazon ECR registry and to list its repositories. For more information, see `Identity and Access Management for Amazon Elastic Container Registry <https://docs.aws.amazon.com/AmazonECR/latest/userguide/security-iam.html>`__.

.. note::

   Before authenticating to a registry and pushing or pulling any images from any Amazon ECR repository, you need ``ecr:GetAuthorizationToken``.

.. code-block:: json

   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "ECRUtilities",
         "Effect": "Allow",
         "Action": [
           "ecr:GetAuthorizationToken",
           "ecr:DescribeRepositories"
         ],
         "Resource": "*"
       }
     ]
   }

Image pushing and scanning permissions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You need the following Amazon ECR permissions to `push images <https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-push.html#image-push-iam>`__. They are scoped down to a specific repository. The steps to push Docker images are described in the `Amazon ECR - pushing a Docker image <https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html>`__ documentation. They also include ``ecr:CreateRepository``, so you can create the repository if it doesn't exist yet.

.. code-block:: json
   :emphasize-lines: 20

   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "ScanPushImage",
         "Effect": "Allow",
         "Action": [
           "ecr:CreateRepository",
           "ecr:CompleteLayerUpload",
           "ecr:UploadLayerPart",
           "ecr:InitiateLayerUpload",
           "ecr:BatchCheckLayerAvailability",
           "ecr:BatchGetImage",
           "ecr:PutImage",
           "ecr:ListImages",
           "ecr:DescribeImages",
           "ecr:DescribeImageScanFindings",
           "ecr:StartImageScan"
         ],
         "Resource": "arn:aws:ecr:<REGION>:<ACCOUNT_ID>:repository/<REPOSITORY_NAME>"
       }
     ]
   }

AWS Lambda and Amazon EventBridge permissions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You need the following permissions to create and delete the resources handled by the Scan Findings Logger template.

.. code-block:: json
   :emphasize-lines: 14,26

   {
     "Version": "2012-10-17",
     "Statement": [
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
     ]
   }

CloudWatch Logs permissions
~~~~~~~~~~~~~~~~~~~~~~~~~~~

You need the following AWS IAM policy that grants read-only access to all the log streams in the scan findings log group of the repository. In the policy, replace ``<LOG_GROUP_NAME>`` with ``/aws/ecr/image-scan-findings/<REPOSITORY_NAME>``.

.. code-block:: json
   :emphasize-lines: 8,14

   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "VisualEditor0",
               "Effect": "Allow",
               "Action": "logs:DescribeLogStreams",
               "Resource": "arn:aws:logs:<REGION>:<ACCOUNT_ID>:log-group:<LOG_GROUP_NAME>:*"
           },
           {
               "Sid": "VisualEditor1",
               "Effect": "Allow",
               "Action": "logs:GetLogEvents",
               "Resource": "arn:aws:logs:<REGION>:<ACCOUNT_ID>:log-group:<LOG_GROUP_NAME>:log-stream:*"
           }
       ]
   }

.. note::

   ``<REGION>``, ``<ACCOUNT_ID>``, ``<REPOSITORY_NAME>``, and ``<LOG_GROUP_NAME>`` are placeholders. Replace them with the appropriate values.

Create the CloudFormation stack
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Download the ECR Image Scan findings logger `template <https://github.com/aws-samples/ecr-image-scan-findings-logger/blob/main/Template-ECR-SFL.yml>`__ from the official `aws-samples <https://github.com/aws-samples/>`__ GitHub repository.
#. Go to `CloudFormation <https://console.aws.amazon.com/cloudformation/home>`__ and click **Create stack** > **With new resources (standard)**.

   .. thumbnail:: /images/cloud-security/aws/ecr-image-scanning/01-create-stack.png
      :title: Create a CloudFormation stack from a template file
      :alt: Create a CloudFormation stack from a template file
      :align: center
      :width: 80%

#. Select **Upload a template file** and choose the template you downloaded in step 1.
#. Choose a name for the stack and finish the creation process without changing any other settings.

   .. thumbnail:: /images/cloud-security/aws/ecr-image-scanning/02-choose-stack-name.png
      :title: Choose a name for the stack
      :alt: Choose a name for the stack
      :align: center
      :width: 80%

#. Wait until the stack status is ``CREATE_COMPLETE``. The stack containing AWS Lambda is now ready to use.

   .. thumbnail:: /images/cloud-security/aws/ecr-image-scanning/03-wait-until-create_complete.png
      :title: CloudFormation stack creation complete
      :alt: CloudFormation stack creation complete
      :align: center
      :width: 80%

If you don't have a private repository yet, create one first. See `Creating an Amazon ECR private repository to store images <https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-create.html>`__. After the stack is created, you can test the Lambda function by manually triggering an `image scan <https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning-basic.html>`__ of a container in `Amazon ECR private registry <https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html>`__. The scan results in the creation of a CloudWatch log group called ``/aws/ecr/image-scan-findings/<REPOSITORY_NAME>`` containing the scan results. For every new scan, the corresponding log streams are created inside the log group. If the scan returns no findings, check that Amazon ECR scanning still supports the image's operating system version. Images based on end-of-life versions return no results. The following images show the log group that the scan creates and the scan findings in its log events.

.. thumbnail:: /images/cloud-security/aws/ecr-image-scanning/04-log-group.png
   :title: CloudWatch log group created by the image scan
   :alt: CloudWatch log group created by the image scan
   :align: center
   :width: 80%

.. thumbnail:: /images/cloud-security/aws/ecr-image-scanning/05-log-stream.png
   :title: Log streams in the image scan findings log group
   :alt: Log streams in the image scan findings log group
   :align: center
   :width: 80%

Configure Wazuh to process Amazon ECR image scanning logs
---------------------------------------------------------

#. Make sure that the AWS integrations are enabled on the Wazuh dashboard, as described in :doc:`Enable AWS integration on the Wazuh dashboard </cloud-security/amazon/services/prerequisites/enabling-integration>`.
#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration block in the ``/var/ossec/etc/ossec.conf`` file of the Wazuh agent to collect the Amazon ECR image scanning findings. Replace ``<REPOSITORY_NAME>`` with the name of the Amazon ECR repository and ``<REGION>`` with its AWS Region. If the file already has a ``<wodle name="aws-s3">`` block, add only the ``<service>`` section to it:

   .. code-block:: xml
      :emphasize-lines: 7,8

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>5m</interval>
        <run_on_start>yes</run_on_start>
        <service type="cloudwatchlogs">
          <aws_profile>default</aws_profile>
          <regions><REGION></regions>
          <aws_log_groups>/aws/ecr/image-scan-findings/<REPOSITORY_NAME></aws_log_groups>
        </service>
      </wodle>

   .. note::

      This example uses the ``aws_profile`` authentication parameter. Check the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section to learn more about the different authentication options and how to use them.

      Check the :doc:`Amazon CloudWatch Logs </cloud-security/amazon/services/supported-services/cloudwatchlogs>` section to learn more about how Wazuh collects CloudWatch Logs.

#. Save the changes and restart the Wazuh agent service to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

ECR image scanning use case
---------------------------

Monitoring container image vulnerabilities
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When Amazon ECR completes a basic scan, the Lambda function writes each finding to the log group as a separate event. The Wazuh dashboard shows one finding per vulnerability:

-  AWS ECR critical or high image vulnerability, for each critical or high vulnerability
-  AWS ECR image vulnerability, for each medium or low vulnerability

The scan summary doesn't raise a finding. To see only Amazon ECR findings, go to **Amazon Web Services** > **Findings** and filter by ``vulnerability.scanner.vendor:"Amazon ECR"``. To see only the critical and high findings, use ``vulnerability.scanner.vendor:"Amazon ECR" and vulnerability.severity:(CRITICAL or HIGH)``:

.. thumbnail:: /images/cloud-security/aws/ecr-image-scanning/1-critical-and-high-findings.png
   :title: Amazon ECR critical and high vulnerability findings
   :alt: Amazon ECR critical and high vulnerability findings
   :align: center
   :width: 80%

To see only the medium and low findings, use ``vulnerability.scanner.vendor:"Amazon ECR" and vulnerability.severity:(MEDIUM or LOW)``:

.. thumbnail:: /images/cloud-security/aws/ecr-image-scanning/2-medium-and-low-findings.png
   :title: Amazon ECR medium and low vulnerability findings
   :alt: Amazon ECR medium and low vulnerability findings
   :align: center
   :width: 80%

Expand a finding to see its details:

-  Vulnerability ID, linked to its page in Wazuh CTI (``vulnerability.id``)
-  Severity (``vulnerability.severity``)
-  CVSS base score and version (``vulnerability.score.base`` and ``vulnerability.score.version``)
-  Affected package and version (``package.name`` and ``package.version``)
-  Vulnerability description (``vulnerability.description``)
-  Reference link (``vulnerability.scanner.reference``)
-  Scanner (``vulnerability.scanner.vendor``)

.. thumbnail:: /images/cloud-security/aws/ecr-image-scanning/3-finding-details.png
   :title: Amazon ECR vulnerability finding details
   :alt: Amazon ECR vulnerability finding details
   :align: center
   :width: 80%
