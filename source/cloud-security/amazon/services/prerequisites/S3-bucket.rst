.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In this section we describe how to create an Amazon S3 bucket.

Configuring an S3 Bucket
========================

Amazon Simple Storage Service (Amazon S3) is an object storage service that delivers industry-leading scalability, data availability, security, and performance.

The Wazuh module for AWS requires every supported AWS service except ``Inspector Classic``, ``CloudWatch Logs``, and ``Security Lake`` to store their logs in an S3 bucket. However, you can use a single S3 bucket for all these services, eliminating the need to create individual buckets for them. Wazuh retrieves these logs from the bucket for analysis.

In this section we describe how to create an Amazon S3 bucket:

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

#. Enter the name of your S3 bucket, then click **Create bucket**.

   .. thumbnail:: /images/cloud-security/aws/config-S3-bucket/create-bucket-2.png
      :title: Create bucket 2
      :alt: Create bucket 2
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/config-S3-bucket/create-bucket-3.png
      :title: Create bucket 3
      :alt: Create bucket 3
      :align: center
      :width: 80%

.. note::

   Copy the bucket ARN because it will be needed later for some AWS services.
