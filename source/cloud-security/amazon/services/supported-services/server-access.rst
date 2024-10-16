.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure the Amazon S3 Server Access service to integrate with Wazuh.

Amazon S3 Server Access
=======================

`Amazon S3 server access logging <https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerLogs.html>`__ provides detailed records for the requests that are made to a bucket. Server access logs are useful for many applications. For example, access log information can be useful in security and access audits. It can also help you learn about your customer base and understand your Amazon S3 bill.

AWS configuration
-----------------

The following sections cover how to configure the Amazon S3 Server Access service to integrate with Wazuh.

Amazon S3 server access configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. :doc:`Create a new S3 bucket <../prerequisites/S3-bucket>` to store the access logs in it. If you want to use an existing one, skip this step.

#. On your AWS console search for "*S3*" or go to **Services** > **Storage** > **S3**.

   .. thumbnail:: /images/cloud-security/aws/s3-server-access/01-search-for-s3.png
      :align: center
      :width: 80%

#. Look for the S3 bucket you want to monitor and click on its name.

   .. thumbnail:: /images/cloud-security/aws/s3-server-access/02-click-s3-bucket-to-be-monitored.png
      :align: center
      :width: 80%

#. Go to the **Properties** tab, scroll down until you find the **Server access logging**, and click **Edit**.

   .. thumbnail:: /images/cloud-security/aws/s3-server-access/03-go-to-properties-1.png
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/s3-server-access/03-go-to-properties-2.png
      :align: center
      :width: 80%

#. Check the **Enable** option, and click **Browse S3** to look for the bucket in which you want S3 Server Access logs to be stored. In our case, the logs are stored in the ``s3-server-logs/`` path of the monitored S3 bucket.

   .. thumbnail:: /images/cloud-security/aws/s3-server-access/04-enable -and-store-s3-access-logs.png
      :align: center
      :width: 80%

   .. note::

      It is possible to store the S3 Server Access logs in the same bucket to be monitored. It is also possible to specify a custom path inside the bucket to store the logs in it.

#. Finally, click on the **Save changes**. S3 Server Access logs will start to be stored in the specified path.

.. _server_access_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst
.. include:: /_templates/cloud/amazon/bucket_policies.rst
.. include:: /_templates/cloud/amazon/attach_policy.rst

Configure Wazuh to process Amazon S3 Server Access logs
-------------------------------------------------------

#. Access the Wazuh configuration in **Server management** > **Settings** using the Wazuh dashboard or by manually editing the ``/var/ossec/etc/ossec.conf`` file in the Wazuh server or agent.

   .. thumbnail:: /images/cloud-security/aws/s3-server-access/01-wazuh-configuration.png
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/s3-server-access/02-wazuh-configuration.png
      :align: center
      :width: 80%

#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the file, replacing ``<WAZUH_AWS_BUCKET>`` with the name of the S3 bucket:

   .. code-block:: xml

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="server_access">
          <name><WAZUH_AWS_BUCKET></name>       <!-- PUT THE S3 BUCKET CHOSEN IN STEP 5 HERE -->
          <path>s3-server-logs</path>                   <!-- IF THE LOGS ARE NOT STORED IN THE BUCKET'S ROOT PATH, PUT  THE PATH TO THE LOGS CHOSEN IN STEP 5 HERE -->
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

#. Save the changes and restart Wazuh to apply the changes. The service can be manually restarted using the following command outside the Wazuh dashboard:

   -  Wazuh manager:

      .. code-block:: console

         # systemctl restart wazuh-manager

   -  Wazuh agent:

      .. code-block:: console

         # systemctl restart wazuh-agent

Use case
--------

Amazon S3 Server Access logs provide detailed records for the requests that were made to a bucket.

Below is a use case for Wazuh alerts built for Amazon S3 Server Access logs.

Monitoring server access logs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following screenshots shows some alerts with rule ID *80364* and *80367* generated for requests made to a monitored S3 bucket.

.. thumbnail:: /images/cloud-security/aws/s3-server-access/1-monitoring-server-access-logs.png
   :align: center
   :width: 80%

Expand an alert to find more information about the monitored S3 bucket, the operation being performed, and the request URI.

.. thumbnail:: /images/cloud-security/aws/s3-server-access/2-monitoring-server-access-logs.png
   :align: center
   :width: 80%
