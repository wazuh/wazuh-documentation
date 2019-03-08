.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_guardduty:

Amazon GuardDuty
================

`Amazon GuardDuty <https://aws.amazon.com/guardduty/?nc1=h_ls>`_ is a threat detection service that continuously monitors for malicious or unauthorized behavior to help you protect your AWS accounts and workloads. It monitors for activity such as unusual API calls or potentially unauthorized deployments that indicate a possible account compromise. GuardDuty also detects potentially compromised instances or reconnaissance by attackers.

Amazon configuration
--------------------

1. Select an existing S3 Bucket or :ref:`create a new one. <S3_bucket>`

2. Go to Services > Analytics > Kinesis:

.. thumbnail:: ../../images/aws/aws-create-firehose-4.png
  :align: center
  :width: 70%

3. If it's the first time you're using this service, you'll see the following screen. Just click on *Get started*:

.. thumbnail:: ../../images/aws/aws-create-firehose-4.1.png
  :align: center
  :width: 70%

4. Click on *Create delivery stream* button:

.. thumbnail:: ../../images/aws/aws-create-firehose-5.png
  :align: center
  :width: 70%

5. Put a name to your delivery stream and click on the *Next* button at the bottom of the page:

.. thumbnail:: ../../images/aws/aws-create-firehose-6.png
  :align: center
  :width: 70%

6. On the next page, leave both options as *Disabled* and click on *Next*:

.. thumbnail:: ../../images/aws/aws-create-firehose-7.png
  :align: center
  :width: 70%

7. Select *Amazon S3* as destination, then select the previously created S3 bucket and add a prefix where logs will be stored. AWS Firehose creates a file structure *YYYY/MM/DD/HH*, if a prefix is used the created file structure would be *firehose/YYYY/MM/DD/HH*. If a prefix is used it must be specified under the Wazuh Bucket configuration:

.. thumbnail:: ../../images/aws/aws-create-firehose-8.png
  :align: center
  :width: 70%

8. You can select which compression do your prefer. Wazuh supports any kind of compression but Snappy. After that, click on *Create new or choose*:

.. thumbnail:: ../../images/aws/aws-create-firehose-9.png
  :align: center
  :width: 70%

9. Give a proper name to the role and click on the *Allow* button:

.. thumbnail:: ../../images/aws/aws-create-firehose-10.png
  :align: center
  :width: 70%

10. The following page is just a summary about the Firehose stream created, go to the bottom of the page and click on the *Create delivery stream* button:

.. thumbnail:: ../../images/aws/aws-create-firehose-11.png
  :align: center
  :width: 70%

11. Go to Services > Management Tools > CloudWatch:

.. thumbnail:: ../../images/aws/aws-create-firehose-12.png
  :align: center
  :width: 70%

12. Select *Rules* on the left menu and click on the *Create rule* button:

.. thumbnail:: ../../images/aws/aws-create-firehose-13.png
  :align: center
  :width: 70%

13. Select which service do you want to get logs from using the *Service name* slider, then, click on the *Add target* button and add the previously created Firehose delivery stream there. Also, create a new role to access the delivery stream:

.. thumbnail:: ../../images/aws/aws-create-firehose-14.png
  :align: center
  :width: 70%

14. Give the rule some name and click on the *Create rule* button:

.. thumbnail:: ../../images/aws/aws-create-firehose-15.png
  :align: center
  :width: 70%

15. Once the rule is created, data will start to be sent to the previously created S3 bucket. Remember to first enable the service you want to monitor, otherwise you won't get any data.

Wazuh configuration
-------------------

1. Open the Wazuh configuration file (``/var/ossec/etc/ossec.conf``) and add the following block:

.. code-block:: xml

  <wodle name="aws-s3">
    <disabled>no</disabled>
    <interval>10m</interval>
    <run_on_start>yes</run_on_start>
    <skip_on_error>yes</skip_on_error>
    <bucket type="guardduty">
      <name>wazuh-aws-wodle</name>
      <path>guardduty</path>
      <aws_profile>default</aws_profile>
    </bucket>
  </wodle>

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

GuarDuty use cases
------------------

- `Brute force attacks`_
- `EC2 API Calls made from unsual network`_
- `Compromised EC2 instance`_

Amazon EC2 (Elastic Compute Cloud) provides scalable computing capacity in the cloud. When using this service, it is highly recommended to monitor it for intrusion attempts or other unauthorized actions performed against your cloud infrastructure.

Below are some use cases for Wazuh rules built for EC2.

Brute force attacks
^^^^^^^^^^^^^^^^^^^

If an instance has any open port which is receiving a brute force attack, the following alert will be shown on Kibana. It shows information about the attacked host, about the attacker and which port is being attacked:

.. thumbnail:: ../../images/aws/aws-ec2-guardduty.png
  :align: center
  :width: 70%

EC2 API Calls made from unsual network
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If an API call is made from an unsual network, the following alert will be shown on Kibana. It shows the location of the unusual network, the user who did the API calls and which API calls it did:

.. thumbnail:: ../../images/aws/aws-ec2-guardduty2.png
  :align: center
  :width: 70%

Compromised EC2 instance
^^^^^^^^^^^^^^^^^^^^^^^^

If there is any indicator of a compromised EC2 instance, an alert will be shown on Kibana explaining what's happening. Some example of alerts are shown below:

.. thumbnail:: ../../images/aws/aws-ec2-guardduty3.png
  :align: center
  :width: 70%

.. thumbnail:: ../../images/aws/aws-ec2-guardduty4.png
  :align: center
  :width: 70%

.. thumbnail:: ../../images/aws/aws-ec2-guardduty5.png
  :align: center
  :width: 70%

To sum up, the following screenshot shows some alerts generated for a compromised EC2 instance:

.. thumbnail:: ../../images/aws/aws-ec2-guardduty6.png
  :align: center
  :width: 70%

And here are the Kibana dashboards for EC2 events:

+----------------------------------------------------------+------------------------------------------------------------+
| Pie Chart                                                | Stacked Groups                                             |
+==========================================================+============================================================+
| .. thumbnail:: ../../images/aws/aws-ec2-pannels-1.png    | .. thumbnail:: ../../images/aws/aws-ec2-pannels-2.png      |
|    :align: center                                        |    :align: center                                          |
|    :width: 70%                                           |    :width: 70%                                             |
+----------------------------------------------------------+------------------------------------------------------------+
