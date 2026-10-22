.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure the Amazon S3 Server Access service to integrate with Wazuh.

Amazon S3 server access
=======================

`Amazon S3 server access logging <https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerLogs.html>`__ provides detailed records of requests made to a bucket. Server access logs are useful for many applications. For example, access log information can be useful in security and access audits. It can also help you learn about your customer base and understand your Amazon S3 bill.

AWS configuration
-----------------

The following sections cover how to configure the Amazon S3 server access logging to integrate with Wazuh.

Amazon S3 server access configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. :doc:`Create a new </cloud-security/amazon/services/prerequisites/S3-bucket>` S3 bucket to store the access logs in it, or skip this step to use an existing bucket.

#. On your AWS console, search for ``s3`` in the search bar or go to **Services** > **Storage** > **S3**.

   .. thumbnail:: /images/cloud-security/aws/s3-server-access/01-search-for-s3.png
      :title: Search for S3 on the AWS console
      :alt: Search for S3 on the AWS console
      :align: center
      :width: 80%

#. Click the name of the S3 bucket you want to monitor.

   .. thumbnail:: /images/cloud-security/aws/s3-server-access/02-click-s3-bucket-to-be-monitored.png
      :title: Click the S3 bucket to monitor
      :alt: Click the S3 bucket to monitor
      :align: center
      :width: 80%

#. Go to the **Properties** tab, scroll down until you find the **Server access logging**, and click **Edit**.

   .. thumbnail:: /images/cloud-security/aws/s3-server-access/03-go-to-properties-1.png
      :title: Edit Server access logging in the Properties tab
      :alt: Edit Server access logging in the Properties tab
      :align: center
      :width: 80%

#. Select **Enable**, and click **Browse S3** to look for the bucket where you want to store the server access logs. In this example, the logs are stored in the ``s3-server-logs/`` path of the destination bucket.

   .. thumbnail:: /images/cloud-security/aws/s3-server-access/04-enable-and-store-s3-access-logs.png
      :title: Enable server access logging and select the destination bucket and path
      :alt: Enable server access logging and select the destination bucket and path
      :align: center
      :width: 80%

   .. note::

      Store the server access logs in a different bucket from the one you monitor, in the same AWS Region. If the source and destination bucket are the same, each log write creates more log entries and adds cost. You can also specify a custom path within the destination bucket to store the logs.

#. Click **Save changes**. S3 server access logs are then stored at the specified path.

.. _server_access_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst

To allow an AWS user to use the Wazuh module for AWS with read-only permissions, the user must have a policy like the following attached:

.. code-block:: json
   :emphasize-lines: 12,13

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
           }
       ]
   }

.. include:: /_templates/cloud/amazon/delete_policy_description.rst

.. code-block:: json
   :emphasize-lines: 13,14

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
           }
       ]
   }

.. note::

   ``<WAZUH_AWS_BUCKET>`` is a placeholder. Replace it with the actual name of the bucket from which you want to retrieve logs.

Wazuh deletes the log files from the bucket only if you set ``remove_from_bucket`` to ``yes`` in the bucket configuration. This option is off by default and isn't in the sample configuration, so you need the second policy only if you turn it on.

After creating a policy, you can attach it directly to a user or to a group the user belongs to. In :ref:`attaching a policy to an IAM user group <attaching_policy_to_IAM_user_group>`, you see how to attach a policy to a group. More information on using other methods is available in the `AWS documentation <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_change-permissions.html#users_change_permissions-add-console>`__.

Configure Wazuh to process Amazon S3 server access logs
-------------------------------------------------------

#. Make sure that the AWS integrations are enabled on the Wazuh dashboard, as described in :doc:`Enable AWS integration on the Wazuh dashboard </cloud-security/amazon/services/prerequisites/enabling-integration>`.

#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the ``/var/ossec/etc/ossec.conf`` file on the Wazuh agent. Replace ``<WAZUH_AWS_BUCKET>`` with the name of the bucket that stores the logs. If you store the logs under a prefix, set the path value to that prefix. If the file already has a ``<wodle name="aws-s3">`` block, add only the ``<bucket>`` section to it:

   .. code-block:: xml
      :emphasize-lines: 7

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="server_access">
          <name><WAZUH_AWS_BUCKET></name>
          <path>s3-server-logs</path>
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

   .. note::

      This example uses the ``aws_profile`` authentication parameter. Check the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section to learn more about the different authentication options and how to use them.

#. Save the changes and restart the Wazuh agent service to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

S3 server access use case
-------------------------

Below is a use case for Wazuh findings built for Amazon S3 server access logs.

Monitoring server access logs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When a request deletes an object from the monitored bucket, for example ``aws s3 rm s3://<MONITORED_BUCKET>/<OBJECT_KEY>``, the Wazuh dashboard shows the AWS S3 object deleted finding. When a request to the bucket fails with an error, the dashboard shows the Cloud services API call failed finding. For example, ``aws s3api get-bucket-policy --bucket <MONITORED_BUCKET>`` fails on a bucket that has no bucket policy. Amazon S3 delivers server access logs on a best-effort basis, usually within a few hours. The findings appear after the logs reach the destination bucket and Wazuh collects them. To see these findings, go to **Amazon Web Services** > **Findings**.

.. thumbnail:: /images/cloud-security/aws/s3-server-access/1-monitoring-server-access-logs.png
   :title: Amazon S3 server access findings on the Wazuh dashboard
   :alt: Amazon S3 server access findings on the Wazuh dashboard
   :align: center
   :width: 80%

Expand a finding to see the operation (``event.code``), the object key (``url.path``), and the caller (``client.user.id``). The bucket name and the full request URI are in the full event, ``event.original``.

.. thumbnail:: /images/cloud-security/aws/s3-server-access/2-monitoring-server-access-logs.png
   :title: Amazon S3 server access finding details
   :alt: Amazon S3 server access finding details
   :align: center
   :width: 80%
