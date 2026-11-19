.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure the Amazon Inspector service to integrate with Wazuh.

Amazon Inspector
================

`Amazon Inspector <https://aws.amazon.com/inspector/>`__ is an automated vulnerability management service that continually scans Amazon EC2 instances, container images in Amazon ECR, and AWS Lambda functions for software vulnerabilities and unintended network exposure. It produces detailed security findings prioritized by severity, which you can review in the Amazon Inspector console or through its API.

.. note::

   The Wazuh module for AWS collects findings from Amazon Inspector only. Amazon Inspector Classic isn't supported.

AWS configuration
-----------------

Learn how to configure the Amazon Inspector integration in Wazuh.

Amazon Inspector configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Open the Amazon Inspector page in the AWS Management Console.
#. Click **Get Started** to access the dashboard.
#. Configure your scanning preferences under **General settings**:

   -  Enable EC2 scanning
   -  Enable ECR scanning
   -  Enable Lambda function scanning

.. note::

   For detailed instructions on configuring scanning preferences, see the `Amazon Inspector documentation <https://docs.aws.amazon.com/inspector/latest/user/getting-started.html>`__.

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

#. Access the Wazuh configuration in **Server management** > **Settings** using the Wazuh dashboard or by manually editing the ``/var/ossec/etc/ossec.conf`` file in the Wazuh server or agent.

   .. thumbnail:: /images/cloud-security/aws/inspector/01-wazuh-configuration.png
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/inspector/02-wazuh-configuration.png
      :align: center
      :width: 80%

#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration block to enable the integration with Amazon Inspector:

   .. code-block:: xml

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>no</run_on_start>
        <skip_on_error>no</skip_on_error>
        <service type="inspector">
          <aws_profile>default</aws_profile>
          <regions>us-east-1,us-east-2</regions>
        </service>
      </wodle>

   You must specify at least a region. You can add multiple comma-separated regions.

   .. note::

      Amazon Inspector findings have ``aws.source`` set to ``inspector2``.

#. Save the changes and restart Wazuh to apply the changes. The service can be manually restarted using the following command outside the Wazuh dashboard:

   -  Wazuh manager:

      .. code-block:: console

         # systemctl restart wazuh-manager

   -  Wazuh agent:

      .. code-block:: console

         # systemctl restart wazuh-agent
