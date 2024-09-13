.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure different services required to integrate AWS config service with Wazuh.

AWS configuration
=================

`AWS Config <https://aws.amazon.com/config/>`__ is a service that enables you to assess, audit, and evaluate the configurations of your AWS resources. AWS Config continuously monitors and records your AWS resource configurations and allows you to automate the evaluation of recorded configurations against desired configurations. With AWS Config, you can review changes in configurations and relationships between AWS resources, dive into detailed resource configuration histories, and determine your overall compliance against the configurations specified in your internal guidelines. This enables you to simplify compliance auditing, security analysis, change management, and operational troubleshooting.

Amazon configuration
--------------------

The following sections cover how to configure different services required to integrate AWS config service with Wazuh.

.. thumbnail:: /images/cloud-security/aws/config/config.png
   :align: center
   :width: 80%

Amazon Data Firehose configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Create an Amazon Data Firehose delivery stream to store the AWS Config events into the desired S3 bucket so Wazuh can process them.

#. :doc:`Create a new S3 bucket <../prerequisites/S3-bucket>`. If you want to use an already existing one, skip this step.

#. On your AWS console, search for "*amazon data firehose*" in the search bar at the top of the page or go to **Services** > **Analytics** > **Amazon Data Firehose**.

   .. thumbnail:: /images/cloud-security/aws/config/01-data-firehose.png
      :align: center
      :width: 80%

#. Click **Create Firehose stream**.

   .. thumbnail:: /images/cloud-security/aws/config/02-create-firehose-stream.png
      :align: center
      :width: 80%

#. Select **Direct PUT** and **Amazon S3** as the desired Source and Destination, respectively.

   .. thumbnail:: /images/cloud-security/aws/config/03-select-direct-put.png
      :align: center
      :width: 80%

#. Choose an appropriate **Firehose stream name**.

   .. thumbnail:: /images/cloud-security/aws/config/04-firehose-stream-name.png
      :align: center
      :width: 80%

#. Select the desired S3 bucket as the destination. It is possible to specify a custom prefix to alter the path where AWS stores the logs. AWS Firehose creates a file structure ``YYYY/MM/DD/HH``, if a prefix is used the created file structure would be ``prefix-name/YYYY/MM/DD/HH``. If a prefix is used it must be specified under the Wazuh bucket configuration. Select your preferred compression, Wazuh supports any kind of compression but Snappy.

   .. thumbnail:: /images/cloud-security/aws/config/05-select-desired-bucket.png
      :align: center
      :width: 80%

#. Create or choose an existing IAM role to be used by Amazon Data Firehose in the **Advanced settings** section.

   .. thumbnail:: /images/cloud-security/aws/config/06-choose-iam-role.png
      :align: center
      :width: 80%

#. Click **Create Firehose stream** at the end of the page. The new delivery stream will be created and its details will be shown as follows.

   .. thumbnail:: /images/cloud-security/aws/config/07-create-firehose-stream.png
      :align: center
      :width: 80%

AWS Config configuration
^^^^^^^^^^^^^^^^^^^^^^^^





#. On the `AWS Config page, <https://console.aws.amazon.com/config/>`_ go to *Settings*.

#. Here, choose the **Resource types to record** (specify the AWS resource types you want AWS Config to record):

    - All resources
    - Specific types

    .. note::
      For more information about these options, see `Selecting Which Resources AWS Config Records. <https://docs.aws.amazon.com/config/latest/developerguide/select-resources.html>`_

#. Select an existing S3 Bucket or :doc:`create a new one </cloud-security/amazon/services/prerequisites/S3-bucket>`.

    .. thumbnail:: /images/cloud-security/aws/aws-create-config-1.png
      :align: center
      :width: 100%

    After these steps, it is necessary to configure the rules.

#. Go to Services > Management Tools > CloudWatch:

    .. thumbnail:: /images/cloud-security/aws/aws-create-firehose-12.png
      :align: center
      :width: 100%

#. Select Rules on the left menu and click on the *Create* rule button:

    .. thumbnail:: /images/cloud-security/aws/aws-create-firehose-13.png
      :align: center
      :width: 100%

#. Select the services you want to get logs from using the Service name slider, then, click on the Add target button and add the previously created Firehose delivery stream there. Also, create a new role to access the delivery stream:

    .. thumbnail:: /images/cloud-security/aws/aws-create-firehose-14.png
      :align: center
      :width: 100%

#. Give the rule some name and click on the *Create* rule button:

    .. thumbnail:: /images/cloud-security/aws/aws-create-firehose-15.png
      :align: center
      :width: 100%

#. Once the rule is created, data will start to be sent to the previously created S3 bucket. Remember to first enable the service you want to monitor, otherwise, you won't get any data.

Policy configuration
++++++++++++++++++++

.. include:: /_templates/cloud/amazon/create_policy.rst
.. include:: /_templates/cloud/amazon/bucket_policies.rst
.. include:: /_templates/cloud/amazon/attach_policy.rst

Wazuh configuration
-------------------

#. Open the Wazuh configuration file (``/var/ossec/etc/ossec.conf``) and add the following block:

    .. code-block:: xml

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="config">
          <name>wazuh-aws-wodle</name>
          <path>config</path>
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

    .. note::
      Check the :doc:`AWS S3 module </user-manual/reference/ossec-conf/wodle-s3>` reference manual to learn more about each setting.

#. Restart Wazuh in order to apply the changes:

    * If you're configuring a Wazuh manager:

      .. include:: /_templates/common/restart_manager.rst

    * If you're configuring a Wazuh agent:

      .. include:: /_templates/common/restart_agent.rst

