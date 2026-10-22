.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In this section we describe how to create an Amazon S3 bucket.

Configure an S3 bucket
======================

Amazon Simple Storage Service (Amazon S3) is an object storage service that delivers industry-leading scalability, data availability, security, and performance.

The Wazuh module for AWS requires all supported AWS services, except Inspector, CloudWatch Logs, and Security Lake, to store their logs in an S3 bucket. You can use a single S3 bucket for all these services, avoiding the need to create separate buckets. Wazuh retrieves the logs from this bucket for analysis.

Follow these steps to create an Amazon S3 bucket:

#. On your AWS console, go to **Services** > **Storage** > **S3**.

   .. thumbnail:: /images/cloud-security/aws/config-S3-bucket/configure-S3-bucket-1.png
      :title: S3 storage service
      :alt: S3 storage service
      :align: center
      :width: 80%

#. Click **Create bucket** to create a new S3 bucket.

   .. thumbnail:: /images/cloud-security/aws/config-S3-bucket/create-bucket-1.png
      :title: Create a bucket
      :alt: Create a bucket
      :align: center
      :width: 80%

#. Select **General purpose** as bucket type, enter the name of your S3 bucket, then click **Create bucket**.

   .. thumbnail:: /images/cloud-security/aws/config-S3-bucket/create-bucket-2.png
      :title: Select the bucket type and enter the bucket name
      :alt: Select the bucket type and enter the bucket name
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/config-S3-bucket/create-bucket-3.png
      :title: Click Create bucket
      :alt: Click Create bucket
      :align: center
      :width: 80%

   .. note::

      Copy the bucket Amazon Resource Name (ARN). You need it later to configure some AWS services.
