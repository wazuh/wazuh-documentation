.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_kms:

AWS Key Management Service
==========================

`AWS Key Management Service <https://aws.amazon.com/kms/>`_ (KMS) makes it easy for users to create and manage keys and control the use of encryption across a wide range of AWS services and in their applications. AWS KMS is a secure and resilient service that uses FIPS 140-2 validated hardware security modules to protect their keys. AWS KMS is integrated with AWS CloudTrail to provide users with logs of all key usage to help meet their regulatory and compliance needs.

Amazon configuration
--------------------

1. Go to Services > Storage > S3:

.. thumbnail:: ../../images/aws/aws-create-firehose-1.png
  :align: center
  :width: 70%

2. Click on the *Create bucket*:

.. thumbnail:: ../../images/aws/aws-create-firehose-2.png
  :align: center
  :width: 70%

3. Create a new bucket, giving it a name and clicking on the *Create* button:

.. thumbnail:: ../../images/aws/aws-create-firehose-3.png
  :align: center
  :width: 50%

4. Go to Services > Analytics > Kinesis:

.. thumbnail:: ../../images/aws/aws-create-firehose-4.png
  :align: center
  :width: 70%

4.1. If it's the first time you're using this service, you'll see the following screen. Just click on *Get started*:

.. thumbnail:: ../../images/aws/aws-create-firehose-4.1.png
  :align: center
  :width: 70%

5. Click on *Create delivery stream* button:

.. thumbnail:: ../../images/aws/aws-create-firehose-5.png
  :align: center
  :width: 70%

6. Put a name to your delivery stream and click on the *Next* button at the bottom of the page:

.. thumbnail:: ../../images/aws/aws-create-firehose-6.png
  :align: center
  :width: 70%

7. On the next page, leave both options as *Disabled* and click on *Next*:

.. thumbnail:: ../../images/aws/aws-create-firehose-7.png
  :align: center
  :width: 70%

8. Select *Amazon S3* as destination, then select the previously created S3 bucket and add a prefix where logs will be stored. AWS Firehose creates a file structure *YYYY/MM/DD/HH*, if a prefix is used the created file structure would be *firehose/YYYY/MM/DD/HH*. If a prefix is used it must be specified under the Wazuh Bucket configuration:

.. thumbnail:: ../../images/aws/aws-create-firehose-8.png
  :align: center
  :width: 70%

9. Users can select which compression do they prefer. Wazuh supports any kind of compression but Snappy. After that, click on *Create new or choose*:

.. thumbnail:: ../../images/aws/aws-create-firehose-9.png
  :align: center
  :width: 70%

10. Give a proper name to the role and click on the *Allow* button:

.. thumbnail:: ../../images/aws/aws-create-firehose-10.png
  :align: center
  :width: 70%

11. The following page is just a summary about the Firehose stream created, go to the bottom of the page and click on the *Create delivery stream* button:

.. thumbnail:: ../../images/aws/aws-create-firehose-11.png
  :align: center
  :width: 70%

12. Go to Services > Management Tools > CloudWatch:

.. thumbnail:: ../../images/aws/aws-create-firehose-12.png
  :align: center
  :width: 70%

13. Select *Rules* on the left menu and click on the *Create rule* button:

.. thumbnail:: ../../images/aws/aws-create-firehose-13.png
  :align: center
  :width: 70%

14. Select which service do you want to get logs from using the *Service name* slider, then, click on the *Add target* button and add the previously created Firehose delivery stream there. Also, create a new role to access the delivery stream:

.. thumbnail:: ../../images/aws/aws-create-firehose-14.png
  :align: center
  :width: 70%

15. Give the rule some name and click on the *Create rule* button:

.. thumbnail:: ../../images/aws/aws-create-firehose-15.png
  :align: center
  :width: 70%

16. Once the rule is created, data will start to be sent to the previously created S3 bucket. Remember to first enable the service you want to monitor, otherwise you won't get any data.

Wazuh configuration
-------------------

1. Open the Wazuh configuration file (``/var/ossec/etc/ossec.conf``) and add the following block:

.. code-block:: xml

  <wodle name="aws-s3">
    <disabled>no</disabled>
    <interval>10m</interval>
    <run_on_start>yes</run_on_start>
    <skip_on_error>yes</skip_on_error>
    <bucket type="custom">
      <name>wazuh-aws-wodle</name>
      <path>kms_compress_encrypted</path>
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
