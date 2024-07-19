.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how to configure Amazon ECR Image scanning to export the scan results to CloudWatch Logs.

Amazon ECR Image scanning
=========================

`Amazon ECR image scanning <https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html>`_ uses the Common Vulnerabilities and Exposures (CVEs) database from the open-source `Clair project <https://github.com/quay/clair>`_ to detect software vulnerabilities in container images and provide a list of scan findings, which can be easily integrated into Wazuh thanks to the :doc:`AWS CloudWatch Logs integration </cloud-security/amazon/services/supported-services/cloudwatchlogs>`.

Amazon ECR sends an event to Amazon EventBridge when an image scan is completed. The event itself is only a summary and does not contain the details of the scan findings. However, it is possible to configure a Lambda function to request the scan findings details and store them in CloudWatch Logs. Here is a quick summary of what the workflow looks like:

#. An image scan is triggered.
#. Once the scan is completed Amazon ECR sends an event to EventBridge.
#. The "Scan completed" event triggers a Lambda function.
#. The lambda function takes the data from the "Scan completed" event and requests the scan details.
#. The Lambda function creates a log group and a log stream in CloudWatch Logs to store the response received.
#. Wazuh pulls the logs from the CloudWatch log groups using the CloudWatch Logs integration.

The following sections cover how to configure AWS to store the scan findings in CloudWatch Logs and how to ingest them into Wazuh.


AWS configuration
-----------------

AWS provides a `template <https://github.com/aws-samples/ecr-image-scan-findings-logger/blob/main/Template-ECR-SFL.yml>`__ that logs to CloudWatch the findings of Amazon ECR scans of images. The template uses an AWS Lambda function to accomplish this.

Uploading the template and creating a stack, uploading the images to Amazon ECR, scanning the images, and using the logger all require specific permissions. Because of this, you need to create a custom policy granting these permissions.

.. include:: /_templates/cloud/amazon/create_policy.rst

IAM permissions
^^^^^^^^^^^^^^^

You need the permissions listed below inside the sections for  ``RoleCreator`` and ``PassRole`` to create and delete the stack based on the template.

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
      "Resource": "arn:aws:iam::<account-ID>:role/*"
   },
   {
      "Sid": "PassRole",
      "Effect": "Allow",
      "Action": "iam:PassRole",
      "Resource": "arn:aws:iam::<account-ID>:role/*-LambdaExecutionRole*"
   }

CloudFormation stack permissions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You need the following permissions to create and delete any template-based CloudFormation stack.

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This `Amazon ECR <https://docs.aws.amazon.com/AmazonECR/latest/userguide/set-repository-policy.html>`__ permission allows calls to the API through an IAM policy.

.. note::

   Before authenticating to a registry and pushing or pulling any images from any Amazon ECR repository, you need  ``ecr:GetAuthorizationToken``. 

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You need the following Amazon ECR permissions to `push images <https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-push.html#image-push-iam>`__. They are scoped down to a specific repository. The steps to push Docker images are described in the `Amazon ECR - Pushing a Docker image <https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html>`_ documentation.

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
      "Resource": "arn:aws:ecr:<region>:<account-ID>:repository/<repository-name>"
   }

Amazon Lambda and Amazon EventBridge permissions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
      "Resource": "arn:aws:lambda:<region>:<account-ID>:*"
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
      "Resource": "arn:aws:events:<region>:<account-ID>:*"
    }

How to create the CloudFormation Stack
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Download the ECR Image Scan findings logger `template <https://github.com/aws-samples/ecr-image-scan-findings-logger/blob/main/Template-ECR-SFL.yml>`_ from the official `aws-samples <https://github.com/aws-samples/>`_ GitHub repository.

2. Access `CloudFormation <https://console.aws.amazon.com/cloudformation/home>`_ and click on **Create stack**.

3. Create a new stack using the template from step 1.

.. thumbnail:: /images/cloud-security/aws/aws-create-stack.png
    :title: Create new stack
    :align: center
    :width: 100%

4. Choose a name for the stack and finish the creation process. No additional configuration is required.

5. Wait until "CREATE_COMPLETE" status is reached. The stack containing the AWS Lambda is now ready to be used.

.. thumbnail:: /images/cloud-security/aws/aws-create-completed.png
    :title: Stack creation completed
    :align: center
    :width: 100%


Once the stack configuration is completed, the Lambda can be tested by manually triggering an image scan. The scan results in the creation of a CloudWatch log group called ``/aws/ecr/image-scan-findings/<name of the ECR repository>`` containing the scan results. For every new scan, the corresponding log streams are created inside the log group.

.. thumbnail:: /images/cloud-security/aws/aws-findings-1.png
    :title: Stack creation completed
    :align: center
    :width: 100%

.. thumbnail:: /images/cloud-security/aws/aws-findings-2.png
    :title: Stack creation completed
    :align: center
    :width: 100%


Wazuh configuration
-------------------

#. Open the Wazuh configuration file (``/var/ossec/etc/ossec.conf``) and add the following configuration block:

    .. code-block:: xml

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>5m</interval>
        <run_on_start>yes</run_on_start>
        <service type="cloudwatchlogs">
          <aws_profile>default</aws_profile>
          <aws_log_groups>/aws/ecr/image-scan-findings/name_of_the_ECR_repository</aws_log_groups>
        </service>
      </wodle>

    .. note::
      Check the :doc:`AWS CloudWatch Logs integration </cloud-security/amazon/services/supported-services/cloudwatchlogs>` to learn more about how the CloudWatch Logs integration works.

#. Restart Wazuh to apply the configuration changes.

    * If you are configuring a Wazuh manager:

      .. include:: /_templates/common/restart_manager.rst

    * If you are configuring a Wazuh agent:

      .. include:: /_templates/common/restart_agent.rst

