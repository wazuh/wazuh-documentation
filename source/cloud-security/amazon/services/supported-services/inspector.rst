.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure the Amazon Inspector service to integrate with Wazuh.

Amazon Inspector
================

`Amazon Inspector <https://aws.amazon.com/inspector/>`__ is an automated vulnerability management and security assessment service that helps improve the security posture of workloads running on AWS. It provides continuous scanning for Amazon EC2 instances, container images in Amazon ECR, and AWS Lambda functions, helping identify software vulnerabilities and unintended network exposure.

Amazon Inspector generates detailed security findings that are prioritized by severity, enabling teams to focus on the most critical risks. Findings can be reviewed directly or included in reports accessible through the Amazon Inspector console or API. The Wazuh module for AWS collects findings from Amazon Inspector only. Amazon Inspector Classic isn't supported.

AWS configuration
-----------------

The following sections cover how to configure Amazon Inspector to integrate with Wazuh.

Amazon Inspector configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Activate Amazon Inspector in each AWS Region where you want Wazuh to collect findings:

#. On your AWS console, search for ``inspector`` in the search bar or go to **Services** > **Security, Identity, & Compliance** > **Amazon Inspector**.
#. Use the Region selector in the upper-right corner of the console to select the Region where you want to activate Amazon Inspector.
#. Click **Get Started**.
#. Click **Activate Amazon Inspector**. For a standalone account, this activates all scan types by default, including Amazon EC2 scanning, Amazon ECR scanning, and Lambda standard scanning.
#. To activate a scan type later, go to **Account management** in the navigation pane, select your account, click **Activate**, and select the scan type.

.. note::

   Amazon ECR scanning in Amazon Inspector replaces basic scanning with enhanced scanning for your whole private registry. The Amazon ECR image scanning integration only receives results from basic scanning. If you use that integration, deactivate Amazon ECR scanning in Amazon Inspector. Otherwise, collect your container image findings through this Amazon Inspector integration instead. For detailed instructions on activating scan types, see the `Amazon Inspector documentation <https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html>`__.

.. _inspector_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst

.. include:: /_templates/cloud/amazon/read_only_policy_description.rst

.. code-block:: json

   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "VisualEditor0",
               "Effect": "Allow",
               "Action": [
                   "inspector2:ListFindings"
               ],
               "Resource": "*"
           }
       ]
   }

.. include:: /_templates/cloud/amazon/attach_policy.rst

Configure Wazuh to process Amazon Inspector logs
------------------------------------------------

#. Make sure that the AWS integrations are enabled on the Wazuh dashboard, as described in :doc:`Enable AWS integration on the Wazuh dashboard </cloud-security/amazon/services/prerequisites/enabling-integration>`.
#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the ``/var/ossec/etc/ossec.conf`` file on the Wazuh agent. Replace the Regions in the example with the Regions where you activated Amazon Inspector. If the file already has a ``<wodle name="aws-s3">`` block, add only the ``<service>`` section to it:

   .. code-block:: xml

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <service type="inspector">
          <aws_profile>default</aws_profile>
          <regions>us-east-1,us-east-2</regions>
        </service>
      </wodle>

   .. note::

      This example uses the ``aws_profile`` authentication parameter. Check the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section to learn more about the different authentication options and how to use them.

#. Save the changes and restart the Wazuh agent service to apply the changes.

   .. code-block:: console

      # systemctl restart wazuh-agent

Inspector use case
------------------

Wazuh collects the Inspector findings through the configured AWS integration and displays them on the Wazuh dashboard. The screenshot below shows the ingested findings, including network reachability findings for publicly reachable ports on an EC2 instance.

.. thumbnail:: /images/cloud-security/aws/inspector/1-inspector-findings.png
   :title: Amazon Inspector findings on the Wazuh dashboard
   :alt: Amazon Inspector findings on the Wazuh dashboard
   :align: center
   :width: 80%
