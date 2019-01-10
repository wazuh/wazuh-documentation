.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_cloudtrail:

AWS CloudTrail
==============

`AWS CloudTrail <https://aws.amazon.com/cloudtrail/>`_ is a service that enables auditing of your AWS account. With CloudTrail, you can log, monitor, and retain account activity related to actions across your AWS infrastructure. This service provides event history of your AWS account activity, such as actions taken through the AWS Management Console, AWS SDKs, command line tools, and other AWS services.

Amazon configuration
--------------------

1. From your AWS console, choose “CloudTrail” from the Deployment & Management section:

.. thumbnail:: ../../images/aws/aws-cloudtrail-1.png
  :align: center
  :width: 100%

2. Create a new trail:

.. thumbnail:: ../../images/aws/aws-cloudtrail-2.png
  :align: center
  :width: 100%

3. Provide a name for the new S3 bucket that will be used to store the CloudTrail logs (remember the name you provide here, you’ll need to reference it during plugin setup):

.. thumbnail:: ../../images/aws/aws-cloudtrail-3.png
  :align: center
  :width: 100%

Wazuh configuration
-------------------

1. Open the Wazuh configuration file (``/var/ossec/etc/ossec.conf``) and add the following configuration block to enable the integration with CloudTrail:

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

To monitor logs for multiple AWS accounts, configure multiple ``<bucket>`` options within the ``aws-s3`` wodle. Bucket tags must have a ``type`` attribute which value can be ``cloudtrail`` to monitor CloudTrail logs or ``custom`` to monitor any other type of logs, for example, Firehose ones.

.. note::
  Check the :ref:`AWS S3 module <wodle_s3>` reference manual to learn more about each setting.

2. Restart Wazuh in order to apply the changes:

* If you're configuring a Wazuh manager:

  a. For Systemd:

  .. code-block:: console

    # systemctl restart wazuh-manager

  b. For SysV Init:

  .. code-block:: console

    # service wazuh-manager restart

* If you're configuring a Wazuh agent:

  a. For Systemd:

  .. code-block:: console

    # systemctl restart wazuh-agent

  b. For SysV Init:

  .. code-block:: console

    # service wazuh-agent restart

Use cases
---------

`EC2`_
  - `Run a new instance in EC2`_
  - `Start instances in EC2`_
  - `Stop instances in EC2`_
  - `Create Security Groups in EC2`_
  - `Allocate a new Elastic IP address`_
  - `Associate a new Elastic IP address`_
`IAM`_
  - `Create user account`_
  - `Create user account without permissions`_
  - `User login failed`_
  - `Possible break-in attempt`_
  - `Login success`_

EC2
^^^

Amazon EC2 (Elastic Compute Cloud) provides scalable computing capacity in the cloud. When using this service, it is highly recommended to monitor it for intrusion attempts or other unauthorized actions performed against your cloud infrastructure.

Below are some use cases for Wazuh rules built for EC2.

Run a new instance in EC2
+++++++++++++++++++++++++

When a user runs a new instance in EC2, an AWS event is generated. As previously mentioned, the log message is collected by the Wazuh agent, and forwarded to the manager for analysis. The following alert will be shown in Kibana, it shows data such as instance type, the user who created it or creation date:

.. thumbnail:: ../../images/aws/aws-ec2-1.png
  :align: center
  :width: 100%

When a user tries to run an instance **without relevant permissions**, then the following alert will be shown in Kibana:

.. thumbnail:: ../../images/aws/aws-ec2-2.png
  :align: center
  :width: 100%

Start instances in EC2
++++++++++++++++++++++

When an instance in EC2 is started, the following alert will be shown on Kibana, it shows information such as the instance id and the user who started it:

.. thumbnail:: ../../images/aws/aws-ec2-3.png
  :align: center
  :width: 100%

If a user tries to start instances **without relevant permissions** the following alert will be shown on Kibana:

.. thumbnail:: ../../images/aws/aws-ec2-4.png
  :align: center
  :width: 100%

Stop instances in EC2
+++++++++++++++++++++

When an instance in EC2 is stopped, the following alert will be shown on Kibana:

.. thumbnail:: ../../images/aws/aws-ec2-5.png
  :align: center
  :width: 100%

If a user tries to stop instances **without relevant permissions**, the following alert wil be show on Kibana:

.. thumbnail:: ../../images/aws/aws-ec2-6.png
  :align: center
  :width: 100%

Create Security Groups in EC2
+++++++++++++++++++++++++++++

When a new security group is created, the following alert is shown on Kibana. It shows information such as the user who created it and information about the security group:

.. thumbnail:: ../../images/aws/aws-ec2-7.png
  :align: center
  :width: 100%

Allocate a new Elastic IP address
+++++++++++++++++++++++++++++++++

If a new Elastic IP is allocated, the following alert will be shown on Kibana:

.. thumbnail:: ../../images/aws/aws-ec2-8.png
  :align: center
  :width: 100%

Associate a new Elastic IP address
++++++++++++++++++++++++++++++++++

If an Elastic IP address is associated, then rule ``80446`` will apply, generating the corresponding alert:

.. thumbnail:: ../../images/aws/aws-ec2-9.png
  :align: center
  :width: 100%

IAM
^^^

AWS Identity and Access Management (IAM) log data can be used to monitor user access to AWS services and resources. Using IAM, you can create and manage AWS users and groups, and manage permissions to allow and deny their access to AWS resources.

Below are some use cases for Wazuh alerts built used for IAM events.

Create user account
+++++++++++++++++++

When we create a new user account in IAM, an AWS event is generated. As previously mentioned, the log message is collected by the Wazuh agent, and forwarded to the manager for analysis. When an user account is created, the following alert will appear on Kibana. You can see the username of the created user and who created it:

.. thumbnail:: ../../images/aws/aws-login-1.png
  :align: center
  :width: 100%

Create user account without permissions
+++++++++++++++++++++++++++++++++++++++

If an unauthorized user attempts to create new users, the following alert will be shown in kibana. It will show you which user has tried to create an user account and the username it tried to create:

.. thumbnail:: ../../images/aws/aws-login-2.png
  :align: center
  :width: 100%

User login failed
+++++++++++++++++

When a user tries to log in with an invalid password, the following alert will be shown in Kibana. There will be shown data such as the user who tried to login or the browser it was using:

.. thumbnail:: ../../images/aws/aws-login-3.png
  :align: center
  :width: 100%

Possible break-in attempt
+++++++++++++++++++++++++

When more than 4 authentication failures occur in a **360** second time window, Wazuh raises this alert:

.. thumbnail:: ../../images/aws/aws-login-4.png
  :align: center
  :width: 100%

Login success
+++++++++++++

After a successful login, the following event will be shown in Kibana. It shows the user who logged in, the browser it used and many other useful information:

.. thumbnail:: ../../images/aws/aws-login-5.png
  :align: center
  :width: 100%

And here are the Kibana dashboards for IAM events:

+----------------------------------------------------------+------------------------------------------------------------+
| Pie Chart                                                | Stacked Groups                                             |
+==========================================================+============================================================+
| .. thumbnail:: ../../images/aws/aws-iam-pannels-1.png    | .. thumbnail:: ../../images/aws/aws-iam-pannels-2.png      |
|    :align: center                                        |    :align: center                                          |
|    :width: 100%                                          |    :width: 100%                                            |
+----------------------------------------------------------+------------------------------------------------------------+
