.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: AWS CloudTrail is a service supported by Wazuh that enables auditing AWS accounts. Check out this section of our documentation to learn more about it. 
  
AWS CloudTrail
==============

`AWS CloudTrail <https://aws.amazon.com/cloudtrail/>`_ is a service that enables auditing of your AWS account. With CloudTrail, you can log, monitor, and retain account activity related to actions across your AWS infrastructure. This service provides the event history of your AWS account activity, such as actions taken through the AWS Management Console, AWS SDKs, command line tools, and other AWS services.

Amazon configuration
--------------------

#. From your AWS console, choose “CloudTrail” from the Deployment & Management section:

    .. thumbnail:: /images/cloud-security/aws/aws-cloudtrail-1.png
      :align: center
      :width: 70%

#. Create a new trail:

    .. thumbnail:: /images/cloud-security/aws/aws-cloudtrail-2.png
      :align: center
      :width: 70%

#. Provide a name for the new S3 bucket that will be used to store the CloudTrail logs (remember the name you provide here, you’ll need to reference it during plugin setup):

    .. thumbnail:: /images/cloud-security/aws/aws-cloudtrail-3.png
      :align: center
      :width: 70%

    .. note::
      The standard file system AWS CloudTrail will create has this structure:

      .. code-block:: xml

        <bucket_name>/<prefix>/AWSLogs/<account_id>/CloudTrail/<region>/<year>/<month>/<day>

      The structure may change depending on the different configurations of the services, and the user may only change the **bucket_name** & **prefix** values.

.. _policy_cloudtrail:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst
.. include:: /_templates/cloud/amazon/bucket_policies.rst
.. include:: /_templates/cloud/amazon/attach_policy.rst

Wazuh configuration
-------------------

#. Open the Wazuh configuration file (``/var/ossec/etc/ossec.conf``) and add the following configuration block to enable the integration with CloudTrail:

    .. code-block:: xml

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="cloudtrail">
          <name>wazuh-cloudtrail</name>
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

    To monitor logs for multiple AWS accounts, configure multiple ``<bucket>`` options within the ``aws-s3`` wodle. Bucket tags must have a ``type`` attribute which depends on the service that is monitored.

    .. note::
      Check the :doc:`AWS S3 module </user-manual/reference/ossec-conf/wodle-s3>` reference manual to learn more about each setting.

#. Restart Wazuh in order to apply the changes:

    * If you're configuring a Wazuh manager:

      .. include:: /_templates/common/restart_manager.rst

    * If you're configuring a Wazuh agent:

      .. include:: /_templates/common/restart_agent.rst

.. _cloudtrail-use-cases:

CloudTrail use cases
--------------------

`EC2`_
  - `Run a new instance in EC2`_
  - `Start instances in EC2`_
  - `Stop instances in EC2`_
  - `Create Security Groups in EC2`_
  - `Allocate a new Elastic IP address`_
  - `Associate a new Elastic IP address`_
`IAM`_
  - `Create a user account`_
  - `Create a user account without permissions`_
  - `User login failed`_
  - `Possible break-in attempt`_
  - `Login success`_

EC2
^^^

Amazon EC2 (Elastic Compute Cloud) provides scalable computing capacity in the cloud. When using this service, it is highly recommended to monitor it for intrusion attempts or other unauthorized actions performed against your cloud infrastructure.

Below are some use cases for Wazuh rules built for EC2.

Run a new instance in EC2
+++++++++++++++++++++++++

When a user runs a new instance in EC2 an AWS event is generated. As previously mentioned, the log message is collected by the Wazuh agent, and forwarded to the manager for analysis. The following alert will be shown in the Wazuh dashboard, it shows data such as instance type, the user who created it, or creation date:

.. thumbnail:: /images/cloud-security/aws/aws-ec2-1.png
  :align: center
  :width: 70%

When a user tries to run an instance **without relevant permissions**, then the following alert will be shown in Kibana:

.. thumbnail:: /images/cloud-security/aws/aws-ec2-2.png
  :align: center
  :width: 70%

Start instances in EC2
++++++++++++++++++++++

When an instance in EC2 is started, the following alert will be shown on the Wazuh dashboard, it shows information such as the instance id and the user who started it:

.. thumbnail:: /images/cloud-security/aws/aws-ec2-3.png
  :align: center
  :width: 70%

If a user tries to start instances **without relevant permissions** the following alert will be shown on Kibana:

.. thumbnail:: /images/cloud-security/aws/aws-ec2-4.png
  :align: center
  :width: 70%

Stop instances in EC2
+++++++++++++++++++++

When an instance in EC2 is stopped, the following alert will be shown on Kibana:

.. thumbnail:: /images/cloud-security/aws/aws-ec2-5.png
  :align: center
  :width: 70%

If a user tries to stop instances **without relevant permissions**, the following alert will be shown on Kibana:

.. thumbnail:: /images/cloud-security/aws/aws-ec2-6.png
  :align: center
  :width: 70%

Create Security Groups in EC2
+++++++++++++++++++++++++++++

When a new security group is created, the following alert is shown on the Wazuh dashboard. It shows information such as the user who created it and information about the security group:

.. thumbnail:: /images/cloud-security/aws/aws-ec2-7.png
  :align: center
  :width: 70%

Allocate a new Elastic IP address
+++++++++++++++++++++++++++++++++

If a new Elastic IP address is allocated, the following alert will be shown on Kibana:

.. thumbnail:: /images/cloud-security/aws/aws-ec2-8.png
  :align: center
  :width: 70%

Associate a new Elastic IP address
++++++++++++++++++++++++++++++++++

If an Elastic IP address is associated, then rule ``80446`` will apply, generating the corresponding alert:

.. thumbnail:: /images/cloud-security/aws/aws-ec2-9.png
  :align: center
  :width: 70%

IAM
^^^

AWS Identity and Access Management (IAM) log data can be used to monitor user access to AWS services and resources. Using IAM, you can create and manage AWS users and groups, and manage permissions to allow and deny their access to AWS resources.

Below are some use cases for Wazuh alerts built and used for IAM events.

Create a user account
+++++++++++++++++++++

When we create a new user account in IAM an AWS event is generated. As previously mentioned, the log message is collected by the Wazuh agent, and forwarded to the manager for analysis. When a user account is created, the following alert will appear on the Wazuh dashboard. You can see the username of the created user and who created it:

.. thumbnail:: /images/cloud-security/aws/aws-login-1.png
  :align: center
  :width: 70%

Create a user account without permissions
+++++++++++++++++++++++++++++++++++++++++

If an unauthorized user attempts to create new users, the following alert will be shown in the Wazuh dashboard. It will show you which user has tried to create a user account and the username it tried to create:

.. thumbnail:: /images/cloud-security/aws/aws-login-2.png
  :align: center
  :width: 70%

User login failed
+++++++++++++++++

When a user tries to log in with an invalid password, the following alert will be shown in the Wazuh dashboard. There will be shown data such as the user who tried to log in or the browser it was using:

.. thumbnail:: /images/cloud-security/aws/aws-login-3.png
  :align: center
  :width: 70%

Possible break-in attempt
+++++++++++++++++++++++++

When more than 4 authentication failures occur in a **360** second time window, Wazuh raises this alert:

.. thumbnail:: /images/cloud-security/aws/aws-login-4.png
  :align: center
  :width: 70%

Login success
+++++++++++++

After a successful login, the following event will be shown in the Wazuh dashboard. It shows the user who logged in, the browser it used, and other useful information:

.. thumbnail:: /images/cloud-security/aws/aws-login-5.png
  :align: center
  :width: 70%

Here are the Wazuh dashboard charts for IAM events:

+-----------------------------------------------------------------+-------------------------------------------------------------------+
| Pie Chart                                                       | Stacked Groups                                                    |
+=================================================================+===================================================================+
| .. thumbnail:: /images/cloud-security/aws/aws-iam-pannels-1.png | .. thumbnail:: /images/cloud-security/aws/aws-iam-pannels-2.png   |
|    :align: center                                               |    :align: center                                                 |
|    :width: 70%                                                  |    :width: 70%                                                    |
+-----------------------------------------------------------------+-------------------------------------------------------------------+
