.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure different services required to integrate AWS config service with Wazuh.

AWS Config
==========

`AWS Config <https://aws.amazon.com/config/>`__ is a service that enables you to assess, audit, and evaluate the configurations of your AWS resources. AWS Config continuously monitors and records your AWS resource configurations and allows you to automate the evaluation of recorded configurations against desired configurations. With AWS Config, you can review changes in configurations and relationships between AWS resources and explore detailed resource configuration histories. You can also check compliance against the configurations your internal guidelines specify. These capabilities simplify compliance auditing, security analysis, change management, and operational troubleshooting.

AWS configuration
-----------------

The following sections cover how to configure different services required to integrate AWS Config with Wazuh. The following diagram shows how AWS Config logs reach the Wazuh agent through an S3 bucket.

.. thumbnail:: /images/cloud-security/aws/config/config.png
   :title: AWS Config logs reaching Wazuh through an S3 bucket
   :alt: AWS Config logs reaching Wazuh through an S3 bucket
   :align: center
   :width: 80%

AWS Config configuration
^^^^^^^^^^^^^^^^^^^^^^^^

#. On your AWS console, search for ``aws config`` in the search bar, then on the `AWS Config <https://console.aws.amazon.com/config/>`__ page, click **Get started**.

   .. thumbnail:: /images/cloud-security/aws/config/01-get-started-aws-config.png
      :title: Get started with AWS Config
      :alt: Get started with AWS Config
      :align: center
      :width: 80%

#. Under **Recording strategy**, specify the AWS resource types you want AWS Config to record:

   -  All resource types with customizable overrides
   -  Specific resource types

   .. note::

      For more information about these options, see `selecting which resources AWS Config records <https://docs.aws.amazon.com/config/latest/developerguide/select-resources.html>`__.

   .. thumbnail:: /images/cloud-security/aws/config/01-recording-strategy.png
      :title: AWS Config recording strategy
      :alt: AWS Config recording strategy
      :align: center
      :width: 80%

#. Under **IAM role for AWS Config**, choose the AWS Config service-linked role or a role from your account.

#. Select an existing S3 bucket or :doc:`create a new one </cloud-security/amazon/services/prerequisites/S3-bucket>`, and enter a prefix, for example, ``config``. Then click **Next** through the remaining steps until you reach the **Review** page.

   .. thumbnail:: /images/cloud-security/aws/config/02-s3-and-prefix.png
      :title: IAM role and S3 bucket delivery channel for AWS Config
      :alt: IAM role and S3 bucket delivery channel for AWS Config
      :align: center
      :width: 80%

#. Review the configuration and click **Confirm.**

   .. thumbnail:: /images/cloud-security/aws/config/03-review-and-confirm.png
      :title: Review the AWS Config setup and confirm
      :alt: Review the AWS Config setup and confirm
      :align: center
      :width: 80%

AWS Config delivers configuration history files to ``<WAZUH_AWS_BUCKET>/<PREFIX>/AWSLogs/<ACCOUNT_ID>/Config/<REGION>/`` about every 6 hours, so the first events can take that long to appear.

.. _config_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst

.. include:: /_templates/cloud/amazon/bucket_policies.rst

Wazuh deletes the log files from the bucket only if you set ``remove_from_bucket`` to ``yes`` in the bucket configuration. This option is off by default and isn't in the sample configuration, so you need the second policy only if you turn it on.

.. include:: /_templates/cloud/amazon/attach_policy.rst

Configure Wazuh to process AWS Config logs
------------------------------------------

#. Make sure that the AWS integrations are enabled on the Wazuh dashboard, as described in :doc:`Enable AWS integration on the Wazuh dashboard </cloud-security/amazon/services/prerequisites/enabling-integration>`.

#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the ``/var/ossec/etc/ossec.conf`` file on the Wazuh agent. Set ``<path>`` to the prefix you entered in AWS Config and replace ``<WAZUH_AWS_BUCKET>`` with the name of the S3 bucket. If the file already has a ``<wodle name="aws-s3">`` block, add only the ``<bucket>`` section to it:

   .. code-block:: xml
      :emphasize-lines: 7

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="config">
          <name><WAZUH_AWS_BUCKET></name>
          <path>config</path>
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

   .. note::

      This example uses the ``aws_profile`` authentication parameter. Check the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section to learn more about the different authentication options and how to use them.

#. Save the changes and restart the Wazuh agent service to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

AWS Config use cases
--------------------

AWS Config allows you to review changes in configuration and relationships between AWS resources. Below is an example of a use case for AWS Config.

Monitoring configuration changes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

AWS Config configuration changes appear as events on the Wazuh dashboard. To see them, go to **Explore** > **Discover**, select the ``wazuh-events-v5*`` index pattern, and filter by ``cloud.service.name: config``. These events don't raise findings.

.. thumbnail:: /images/cloud-security/aws/config/1-monitor-configuration-changes.png
   :title: AWS Config events in Discover
   :alt: AWS Config events in Discover
   :align: center
   :width: 80%

Expand an event to see its details:

-  Type of change (``event.action``: ``config-created``, ``config-modified``, or ``config-deleted``)
-  Resource type and name (``event.reason``, for example ``AWS::Events::Rule`` ``wazuh-trust-rule``)
-  Configuration item status (``event.code``, for example ``ResourceDiscovered``)
-  Time AWS Config recorded the change (``event.start``)
-  AWS account and region (``cloud.account.id`` and ``cloud.region``)
-  Full configuration item (``event.original``)

.. thumbnail:: /images/cloud-security/aws/config/2-monitor-configuration-changes.png
   :title: Details of an AWS Config event
   :alt: Details of an AWS Config event
   :align: center
   :width: 80%
