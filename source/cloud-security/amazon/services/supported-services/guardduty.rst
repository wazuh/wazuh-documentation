.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Amazon GuardDuty is a threat detection service that continuously monitors for malicious behavior. Learn how to use GuardDuty with Wazuh in this section.

.. _amazon_guardduty:

Amazon GuardDuty
================

`Amazon GuardDuty <https://aws.amazon.com/guardduty/?nc1=h_ls>`_ is a threat detection service that continuously monitors for malicious or unauthorized behavior to help you protect your AWS accounts and workloads. It monitors for activity such as unusual API calls or potentially unauthorized deployments that indicate a possible account compromise. GuardDuty also detects potentially compromised instances or reconnaissance by attackers.

Amazon configuration
--------------------

#. :doc:`Create a new </cloud-security/amazon/services/prerequisites/S3-bucket>` S3 bucket. (If you want to use an already created one, skip this step).

#. Go to Services > Analytics > Kinesis:

    .. thumbnail:: /images/cloud-security/aws/aws-create-firehose-4.png
      :align: center
      :width: 70%

#. If it's the first time you're using this service, you'll see the following screen. Just click on *Get started*:

    .. thumbnail:: /images/cloud-security/aws/aws-create-firehose-4.1.png
      :align: center
      :width: 70%

#. Click on *Create delivery stream* button:

    .. thumbnail:: /images/cloud-security/aws/aws-create-firehose-5.png
      :align: center
      :width: 70%

#. Put a name to your delivery stream and click on the *Next* button at the bottom of the page:

    .. thumbnail:: /images/cloud-security/aws/aws-create-firehose-6.png
      :align: center
      :width: 70%

#. On the next page, leave both options as *Disabled* and click on *Next*:

    .. thumbnail:: /images/cloud-security/aws/aws-create-firehose-7.png
      :align: center
      :width: 70%

#. Select *Amazon S3* as the destination, then select the previously created S3 bucket and add a prefix where logs will be stored. AWS Firehose creates a file structure *YYYY/MM/DD/HH*, if a prefix is used the created file structure would be *firehose/YYYY/MM/DD/HH*. If a prefix is used it must be specified under the Wazuh Bucket configuration:

    .. thumbnail:: /images/cloud-security/aws/aws-create-firehose-8.png
      :align: center
      :width: 70%

#. You can select the compression you prefer. Wazuh supports any kind of compression but Snappy. After that, click on **Create new or choose**:

    .. thumbnail:: /images/cloud-security/aws/aws-create-firehose-9.png
      :align: center
      :width: 70%

#. Give a proper name to the role and click on the *Allow* button:

    .. thumbnail:: /images/cloud-security/aws/aws-create-firehose-10.png
      :align: center
      :width: 70%

#. The following page is just a summary of the Firehose stream created. Go to the bottom of the page and click on the **Create delivery stream** button.

    .. thumbnail:: /images/cloud-security/aws/aws-create-firehose-11.png
      :align: center
      :width: 70%

#. Go to Services > Management Tools > CloudWatch:

    .. thumbnail:: /images/cloud-security/aws/aws-create-firehose-12.png
      :align: center
      :width: 70%

#. Select *Rules* on the left menu and click on the *Create rule* button:

    .. thumbnail:: /images/cloud-security/aws/aws-create-firehose-13.png
      :align: center
      :width: 70%

#. Select the services you want to get logs from using the **Service name** slider, then, click on the **Add target** button and add the previously created Firehose delivery stream there. Also, create a new role to access the delivery stream.

    .. thumbnail:: /images/cloud-security/aws/aws-create-firehose-14.png
      :align: center
      :width: 70%

#. Give the rule some name and click on the *Create rule* button:

    .. thumbnail:: /images/cloud-security/aws/aws-create-firehose-15.png
      :align: center
      :width: 70%

#. Once the rule is created, data will start to be sent to the previously created S3 bucket. Remember to first enable the service you want to monitor, otherwise, you won't get any data.

Policy configuration
^^^^^^^^^^^^^^^^^^^^

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
        <bucket type="guardduty">
          <name>wazuh-aws-wodle</name>
          <path>firehose/</path>
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
        

GuardDuty use cases
-------------------

- `Brute force attacks`_
- `EC2 API Calls made from unusual network`_
- `Compromised EC2 instance`_

Amazon EC2 (Elastic Compute Cloud) provides scalable computing capacity in the cloud. When using this service, it is highly recommended to monitor it for intrusion attempts or other unauthorized actions performed against your cloud infrastructure.

Below are some use cases for Wazuh rules built for EC2.

Brute force attacks
^^^^^^^^^^^^^^^^^^^

If an instance has an open port that is receiving a brute force attack, the following alert will be shown on the Wazuh dashboard. It shows information about the attacked host, the attacker, and which port is being attacked:

.. thumbnail:: /images/cloud-security/aws/aws-ec2-guardduty.png
  :align: center
  :width: 70%

EC2 API Calls made from unusual network
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If an API call is made from an unusual network, the following alert will be shown on the Wazuh dashboard. It shows the location of the unusual network, the user who did the API calls, and which API calls it did:

.. thumbnail:: /images/cloud-security/aws/aws-ec2-guardduty2.png
  :align: center
  :width: 70%

Compromised EC2 instance
^^^^^^^^^^^^^^^^^^^^^^^^

If there is any indicator of a compromised EC2 instance, an alert will be shown on the Wazuh dashboard explaining what's happening. Some examples of alerts are shown below:

.. thumbnail:: /images/cloud-security/aws/aws-ec2-guardduty3.png
  :align: center
  :width: 70%

.. thumbnail:: /images/cloud-security/aws/aws-ec2-guardduty4.png
  :align: center
  :width: 70%

.. thumbnail:: /images/cloud-security/aws/aws-ec2-guardduty5.png
  :align: center
  :width: 70%

To sum up, the following screenshot shows some alerts generated for a compromised EC2 instance:

.. thumbnail:: /images/cloud-security/aws/aws-ec2-guardduty6.png
  :align: center
  :width: 70%

And here are the Wazuh dashboard charts for EC2 events:

+-----------------------------------------------------------------+-------------------------------------------------------------------+
| Pie Chart                                                       | Stacked Groups                                                    |
+=================================================================+===================================================================+
| .. thumbnail:: /images/cloud-security/aws/aws-ec2-pannels-1.png | .. thumbnail:: /images/cloud-security/aws/aws-ec2-pannels-2.png   |
|    :align: center                                               |    :align: center                                                 |
|    :width: 70%                                                  |    :width: 70%                                                    |
+-----------------------------------------------------------------+-------------------------------------------------------------------+
