.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Amazon GuardDuty is a threat detection service that continuously monitors for malicious behavior. Learn how to use GuardDuty with Wazuh in this section.

.. _amazon_guardduty_native:

Amazon GuardDuty
================

`Amazon GuardDuty <https://aws.amazon.com/guardduty/?nc1=h_ls>`_ is a threat detection service that continuously monitors for malicious or unauthorized behavior to help you protect your AWS accounts and workloads. It monitors for activity such as unusual API calls or potentially unauthorized deployments that indicate a possible account compromise. GuardDuty also detects potentially compromised instances or reconnaissance by attackers.

Amazon S3 Protection
--------------------

`S3 Protection <https://docs.aws.amazon.com/guardduty/latest/ug/s3-protection.html>`_ enables Amazon GuardDuty to monitor object-level API operations to identify potential security risks for data within your S3 buckets.

Amazon configuration native integration
---------------------------------------

#. :doc:`Create a new S3 bucket </amazon/services/prerequisites/S3-bucket>`. If you want to use a previously created bucket, skip this step).

#. Open the `AWS Guarduty console <https://console.aws.amazon.com/guardduty>`_ : 

    .. thumbnail:: ../../../images/aws/aws-guarduty-console-1.png
      :align: center
      :width: 70%

#. In the navigation pane, under **Settings**, Click on **S3 Protection** :

    .. thumbnail:: ../../../images/aws/aws-guarduty-console-2.png
      :align: center
      :width: 70%

#. The S3 Protection Pane lists the current status of S3 protection for your account, you may enable or disable it at any time by selecting **Enable** or **Disable** respectively:

    .. thumbnail:: ../../../images/aws/aws-guarduty-console-3.png
      :align: center
      :width: 70%

#. Confirm your selection:

    .. thumbnail:: ../../../images/aws/aws-guarduty-console-4.png
      :align: center
      :width: 70%

.. _amazon_kinesis_guardduty:
   
Amazon configuration with Kinesis, Firehose, CloudWatch integration
-------------------------------------------------------------------

.. deprecated:: 4.5

#. :doc:`Create a new S3 bucket </amazon/services/prerequisites/S3-bucket>`. (If you want to use an already created one, skip this step).

#. Go to Services > Analytics > Kinesis:

    .. thumbnail:: ../../../images/aws/guardduty-firehose-1.png
      :align: center
      :width: 70%

#. Click on **Create delivery stream** button:

    .. thumbnail:: ../../../images/aws/guardduty-firehose-2.png
      :align: center
      :width: 70%

#. Choose a *Source* and select *Amazon S3* as the *Destination*:

    .. thumbnail:: ../../../images/aws/guardduty-firehose-3.png
      :align: center
      :width: 70%

    .. thumbnail:: ../../../images/aws/guardduty-firehose-4.png
      :align: center
      :width: 70%

#. Choose a name for your delivery stream, leave Transform and convert records options **Disabled**:

    .. thumbnail:: ../../../images/aws/guardduty-firehose-5.png
      :align: center
      :width: 70%

#. On the *Destination settings* select the previously created S3 bucket and add a prefix where logs will be stored. AWS Firehose creates a file structure *YYYY/MM/DD/HH*, if a prefix is used the created file structure would be *firehose/YYYY/MM/DD/HH*. If a prefix is used it must be specified under the Wazuh Bucket configuration:

    .. thumbnail:: ../../../images/aws/guardduty-firehose-6.png
      :align: center
      :width: 70%

#. You can select the compression you prefer. Wazuh supports any kind of compression but Snappy:
*
    .. thumbnail:: ../../../images/aws/guardduty-firehose-7.png
      :align: center
      :width: 70%

#. Under the *Advanced settings* section you can set the *Permissions*. By default a new IAM role will be created, if you choose an existing IAM role remember to include the permissions that *Kinesis Data Firehose* needs:

    .. thumbnail:: ../../../images/aws/guardduty-firehose-8.png
      :align: center
      :width: 70%
   
#. Go to the bottom of the page and click on the **Create delivery stream** button:

    .. thumbnail:: ../../../images/aws/guardduty-firehose-9.png
      :align: center
      :width: 70%

#. Go to Services > Management & Governance > CloudWatch:

    .. thumbnail:: ../../../images/aws/guardduty-firehose-10.png
      :align: center
      :width: 70%

#. In the Cloudwatch pane, under **Rules**, Click on **Rules**:

    .. thumbnail:: ../../../images/aws/guardduty-firehose-11.png
      :align: center
      :width: 70%

#. Amazon EventBridge pane will load, Click on the **Create rule** button:

    .. thumbnail:: ../../../images/aws/guardduty-firehose-12.png
      :align: center
      :width: 70%

#. Under the *Define rule detail* section, Name the rule and Click on **Next**:

    .. thumbnail:: ../../../images/aws/guarddury-firehose-13.png
      :align: center
      :width: 70%

#. On the *Build event pattern* section, under the *Event source* section Choose AWS events as your event source:

    .. thumbnail:: ../../../images/aws/guarddury-firehose-14.png
      :align: center
      :width: 70%

#. Under the *Event pattern* section, Choose *GuardDuty* as your *AWS service* and *All Events* as your *Event type* and Click on **Next**:

    .. thumbnail:: ../../../images/aws/guarddury-firehose-15.png
        :align: center
        :width: 70%

#. On the *Select target(s)* section, Choose *AWS service* as your *target types*, select *Firehose delivery stream* as your target type and add the previously created Firehose delivery stream as your *Stream*, Click on **Next**. 

    .. thumbnail:: ../../../images/aws/aws-create-firehose-16.png
      :align: center
      :width: 70%

#. On the *Configure tags section* a tag can be configured to search and filter resources, Click on **Next**:

    .. thumbnail:: ../../../images/aws/aws-create-firehose-17.png
      :align: center
      :width: 70%

#. Last section is a summary of the created rule, confirm the selection is correct, Click on **Create Rule**:

    .. thumbnail:: ../../../images/aws/aws-create-firehose-17.png
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

Native Integration
^^^^^^^^^^^^^^^^^^^

    .. code-block:: xml

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="guardduty">
          <name>wazuh-aws-wodle</name>
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

Firehose, Kinesis, CloudWatch Integration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

.. thumbnail:: ../../../images/aws/aws-ec2-guardduty.png
  :align: center
  :width: 70%

EC2 API Calls made from unusual network
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If an API call is made from an unusual network, the following alert will be shown on the Wazuh dashboard. It shows the location of the unusual network, the user who did the API calls, and which API calls it did:

.. thumbnail:: ../../../images/aws/aws-ec2-guardduty2.png
  :align: center
  :width: 70%

Compromised EC2 instance
^^^^^^^^^^^^^^^^^^^^^^^^

If there is any indicator of a compromised EC2 instance, an alert will be shown on the Wazuh dashboard explaining what's happening. Some examples of alerts are shown below:

.. thumbnail:: ../../../images/aws/aws-ec2-guardduty3.png
  :align: center
  :width: 70%

.. thumbnail:: ../../../images/aws/aws-ec2-guardduty4.png
  :align: center
  :width: 70%

.. thumbnail:: ../../../images/aws/aws-ec2-guardduty5.png
  :align: center
  :width: 70%

To sum up, the following screenshot shows some alerts generated for a compromised EC2 instance:

.. thumbnail:: ../../../images/aws/aws-ec2-guardduty6.png
  :align: center
  :width: 70%

And here are the Wazuh dashboard charts for EC2 events:

+----------------------------------------------------------+------------------------------------------------------------+
| Pie Chart                                                | Stacked Groups                                             |
+==========================================================+============================================================+
| .. thumbnail:: ../../../images/aws/aws-ec2-pannels-1.png | .. thumbnail:: ../../../images/aws/aws-ec2-pannels-2.png   |
|    :align: center                                        |    :align: center                                          |
|    :width: 70%                                           |    :width: 70%                                             |
+----------------------------------------------------------+------------------------------------------------------------+
