
.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: AWS Server Access Logging is a service that provides detailed records for the requests made to a bucket. Learn how to configure and monitor it with Wazuh.

.. _amazon_server_access:

Amazon S3 Server Access
=======================

`Amazon S3 Server Access Logging <https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerLogs.html>`_ provides detailed records for the requests that are made to a bucket. Server access logs are useful for many applications. For example, access log information can be useful in security and access audits. It can also help you learn about your customer base and understand your Amazon S3 bill.

Amazon configuration
--------------------

#. :doc:`Create a new </cloud-security/amazon/services/prerequisites/S3-bucket>` S3 bucket to store the access logs in it. If you want to use an existing one, skip this step.

#. Go to Services > Storage > S3:

    .. thumbnail::  /images/cloud-security/aws/aws-server-access-1.png
      :align: center
      :width: 70%

#. Look for the S3 bucket you want to monitor and click on its name:

    .. thumbnail::  /images/cloud-security/aws/aws-server-access-2.png
      :align: center
      :width: 70%

#. Go to the **Properties** tab, scroll down until you find the **Server access logging**, and click on the **Edit** button:

    .. thumbnail::  /images/cloud-security/aws/aws-server-access-3.png
      :align: center
      :width: 70%

    .. thumbnail::  /images/cloud-security/aws/aws-server-access-4.png
      :align: center
      :width: 70%

#. Check the **Enable** option, and click on the **Browse S3** button to look for the bucket in which you want S3 Server Access logs to be stored:

    .. thumbnail::  /images/cloud-security/aws/aws-server-access-5.png
      :align: center
      :width: 70%

    .. note::
      It is possible to store the S3 Server Access logs in the same bucket to be monitored. It is also possible to specify a custom path inside the bucket to store the logs in it.


#. Finally, click on the **Save changes**. S3 Server Access logs will start to be stored in the specified path.


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
        <bucket type="server_access">
          <name>wazuh-aws-wodle</name>       <!-- PUT HERE THE S3 BUCKET CHOSEN IN STEP 5 -->
          <path>waf</path>                   <!-- PUT HERE THE PATH TO THE LOGS CHOSEN IN STEP 5 IF THE LOGS ARE NOT STORED IN THE BUCKET'S ROOT PATH -->
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

