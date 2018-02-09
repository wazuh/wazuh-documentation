.. _amazon_integration:

Installation
============

Prior to enabling the Wazuh rules for Amazon Web Services, follow the steps below to enable the AWS API to generate log messages and store them as JSON data files in an Amazon S3 bucket. A detailed description of each of the steps can be found below.


The integration can be configured in Wazuh Manager or Wazuh Agent, centralized configuration is as well supported.


Requirements
-------------
- AWS CloudTrail
- Wazuh >= 3.2
- Python >= 2.7
- Pip
- Boto3


AWS: Subscribe to CloudTrail
----------------------------

1. From your AWS console, choose “CloudTrail” from the Deployment & Management section.


.. thumbnail:: ../images/aws/aws-cloudtrail-1.png
    :align: center
    :width: 100%

2. Create a new trail

.. thumbnail:: ../images/aws/aws-cloudtrail-2.png
    :align: center
    :width: 100%

3. Provide a name for the new S3 bucket that will hold the CloudTrail logs. (Remember the name you provide here, you’ll need to reference it during plugin set up.)

.. thumbnail:: ../images/aws/aws-cloudtrail-3.png
    :align: center
    :width: 100%




AWS: Create IAM User
--------------------

Wazuh will need permission to pull the CloudTrail log data from your S3 bucket. The easiest way to accomplish this is by creating a new IAM user on your account. The new user will have only permission to read from the S3 bucket.
The integration as well support an IAM role configured in the instance.

1. Create new user

.. thumbnail:: ../images/aws/aws-user.png
    :align: center
    :width: 100%

2. Create policy

.. thumbnail:: ../images/aws/aws-create-policy.png
    :align: center
    :width: 100%

Ensure that the policy looks like this

.. thumbnail:: ../images/aws/aws-summary-policy.png
    :align: center
    :width: 100%

3. Attach policy

.. thumbnail:: ../images/aws/aws-attach-policy.png
    :align: center
    :width: 100%

4. Confirm user creation and get credentials

.. thumbnail:: ../images/aws/aws-summary-user.png
    :align: center
    :width: 100%

Wazuh host: Installing dependencies
-----------------------------------

Pip
^^^
AWS SDK for Python is required in this integration, in order to complete the installation pip package manager must be installed.

a) CentOS/RHEL/Fedora:

.. code-block:: console

    # yum install python-pip

b) Debian/Ubuntu:

.. code-block:: console

    # apt-get update && apt-get install python-pip

c) From sources:

.. code-block:: console

    # curl -O https://bootstrap.pypa.io/get-pip.py
    # python get-pip.py

.. _Boto3:

Boto3
^^^^^^

Boto3 is the official package supported by Amazon to manage AWS resources. It will be used to handle logs from the S3 Bucket, including the authentication.

.. code-block:: console

    # pip install boto3

Wazuh host: Plugin configuration
--------------------------------

1. Open Wazuh configuration file.

.. code-block:: console

    # vi /var/ossec/etc/ossec.conf

2. Add the following block of configuration to enable the integration, enter the AWS IAM User credentials you created before.

.. code-block:: xml

    <wodle name="aws-cloudtrail">
      <disabled>no</disabled>
      <bucket>wazuh-cloudtrail</bucket>
      <access_key>insert_access_key</access_key>
      <secret_key>insert_secret_key</secret_key>
      <remove_from_bucket>no</remove_from_bucket>
      <interval>10m</interval>
      <run_on_start>no</run_on_start>
    </wodle>

*Check the user manual reference to read more details about each setting:* :doc:`AWS CloudTrail settings <../user-manual/reference/ossec-conf/wodle-cloudtrail>`

Credentials could be loaded from different locations, you could either specify the credentials as they are in the previous block of configuration or load them from other `Boto3 supported locations. <http://boto3.readthedocs.io/en/latest/guide/configuration.html#configuring-credentials>`_

3. Restart Manager or Agent to apply changes.


Wazuh host: Validate the integration
-------------------------------------

A successful boot up and fetch will output the logs below in the manager/agent log file ``logs/ossec.log``

1. Module starting

.. code-block:: console

    2018/01/12 18:47:09 wazuh-modulesd:aws-cloudtrail: INFO: Module AWS-CloudTrail started


2. Scheduled scan

.. code-block:: console

    2018/01/12 18:49:10 wazuh-modulesd:aws-cloudtrail: INFO: Fetching logs started
    2018/01/12 18:49:11 wazuh-modulesd:aws-cloudtrail: INFO: Fetching logs finished.


Troubleshooting
----------------

- Wrong credentials

AWS IAM credentials were not set properly or they don't have enough privileges.

.. code-block:: console

    2018/01/12 19:02:22 wazuh-modulesd:aws-cloudtrail: WARNING: Returned exit code 3.
    2018/01/12 19:02:22 wazuh-modulesd:aws-cloudtrail: WARNING: Invalid credentials to access S3 Bucket


- Missing Boto3 dependency

Boto3 package is not installed in the system. Please, Boto3 installation section.

.. code-block:: console

    2018/01/12 19:03:17 wazuh-modulesd:aws-cloudtrail: WARNING: Returned exit code 4.
    2018/01/12 19:03:17 wazuh-modulesd:aws-cloudtrail: WARNING: boto3 module is required.


- Time interval overtaken

In case the fetching and forwarding process extends for longer than interval time, a warning will be displayed. There is no impact in the current process and the module will keep running.


.. code-block:: console

    2018/01/12 19:10:37 wazuh-modulesd:aws-cloudtrail: WARNING: Interval overtaken.
