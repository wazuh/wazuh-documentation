.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Amazon WAF is web application firewall that helps protecting web applications from common web exploits. Learn how to configure and monitor it with Wazuh.

Amazon Web Application Firewall (WAF)
=====================================

`Amazon WAF <https://aws.amazon.com/waf/>`_ is a web application firewall that helps protect your web applications from common web exploits that could affect application availability, compromise security, or consume excessive resources. ``AWS WAF`` gives you control over which traffic to allow or block to your web applications by defining customizable web security rules. 

Amazon configuration native integration
---------------------------------------

#. :doc:`Create a new </cloud-security/amazon/services/prerequisites/S3-bucket>` S3 bucket. (If you want to use an already created one, skip this step).

#. Go to Services > Security, Identity, & Compliance > WAF & Shield:

    .. thumbnail::  /images/aws/waf-native-1.png
      :align: center
      :width: 70%

#. Click on *Create web ACL*:

    .. thumbnail::  /images/aws/waf-native-2.png
      :align: center
      :width: 70%

#. Choose a name for your Web ACL and click on *Next*:

    .. thumbnail::  /images/aws/waf-native-3.png
      :align: center
      :width: 70%

#. Click on *Add rules* and select which type of rule to add, then click on *Next*:

    .. thumbnail::  /images/aws/waf-native-4.png
      :align: center
      :width: 70%

#. Set the rules priority and click on *Next*:

    .. thumbnail::  /images/aws/waf-native-5.png
      :align: center
      :width: 70%

#. Choose a name for your CloudWatch metric and click on *Next*:

    .. thumbnail::  /images/aws/waf-native-6.png
      :align: center
      :width: 70%

#. Review the ACL web and click on the *Create web ACL* button at the bottom of the page to create it

    .. thumbnail::  /images/aws/waf-native-7.png
      :align: center
      :width: 70%  

Amazon configuration with Kinesis
---------------------------------

.. deprecated:: 5.0

#. :doc:`Create a new </cloud-security/amazon/services/prerequisites/S3-bucket>` S3 bucket. (If you want to use an already created one, skip this step).

#. Go to Services > Analytics > Kinesis:

    .. thumbnail::  /images/cloud-security/aws/aws-create-firehose-4.png
      :align: center
      :width: 70%

#. If it's the first time you're using this service, you'll see the following screen. Just click on *Get started*:

    .. thumbnail::  /images/cloud-security/aws/aws-create-firehose-4.1.png
      :align: center
      :width: 70%

#. Click on *Create delivery stream* button:

    .. thumbnail::  /images/cloud-security/aws/aws-create-firehose-5.png
      :align: center
      :width: 70%

#. Put a name to your delivery stream and click on the *Next* button at the bottom of the page:

    .. thumbnail::  /images/cloud-security/aws/aws-create-firehose-6.png
      :align: center
      :width: 70%

#. On the next page, leave both options as *Disabled* and click on *Next*:

    .. thumbnail::  /images/cloud-security/aws/aws-create-firehose-7.png
      :align: center
      :width: 70%

#. Select *Amazon S3* as the destination, then select the previously created S3 bucket and add a prefix where logs will be stored. AWS Firehose creates a file structure *YYYY/MM/DD/HH*, if a prefix is used the created file structure would be *firehose/YYYY/MM/DD/HH*. If a prefix is used it must be specified under the Wazuh Bucket configuration:

    .. thumbnail::  /images/cloud-security/aws/aws-create-firehose-8.png
      :align: center
      :width: 70%

#. Users can select the compression they prefer. Wazuh supports any kind of compression but Snappy. After that, click on **Create new or choose**:

    .. thumbnail::  /images/cloud-security/aws/aws-create-firehose-9.png
      :align: center
      :width: 70%

#. Give a proper name to the role and click on the *Allow* button:

    .. thumbnail::   /images/cloud-security/aws/aws-create-firehose-10.png
      :align: center
      :width: 70%

#. The following page is just a summary of the Firehose stream created, go to the bottom of the page and click on the *Create delivery stream* button:

    .. thumbnail::  /images/cloud-security/aws/aws-create-firehose-11.png
      :align: center
      :width: 70%

#. Go to Services > Management Tools > CloudWatch:

    .. thumbnail::  /images/cloud-security/aws/aws-create-firehose-12.png
      :align: center
      :width: 70%

#. Select *Rules* on the left menu and click on the *Create rule* button:

    .. thumbnail::  /images/cloud-security/aws/aws-create-firehose-13.png
      :align: center
      :width: 70%

#. Select the services you want to get logs from using the **Service name** slider, then, click on the **Add target** button and add the previously created Firehose delivery stream there. Also, create a new role to access the delivery stream.

    .. thumbnail:: /images/cloud-security/aws/aws-create-firehose-14.png
      :align: center
      :width: 70%

#. Give the rule some name and click on the *Create rule* button:

    .. thumbnail::  /images/cloud-security/aws/aws-create-firehose-15.png
      :align: center
      :width: 70%

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
        <bucket type="waf">
          <name>wazuh-aws-wodle</name>       <!-- PUT HERE THE S3 BUCKET CHOSEN IN STEP 7 -->
          <path>waf</path>                   <!-- PUT HERE THE PREFIX CHOSEN IN STEP 7 -->
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


HTTP Request headers
--------------------

The Wazuh AWS WAF implementation parses the header information present in the ``httpRequest`` field, allowing filtering by these headers and their values in the Wazuh UI. During this parsing, any non-standard header will be extracted and removed from the event before sending it to ``Analysisd``. Here is the complete list of the allowed standard header fields:

.. code-block:: console

  a-im
  accept
  accept-charset
  accept-encoding
  accept-language
  access-control-request-method
  access-control-request-headers
  authorization
  cache-control
  connection
  content-encoding
  content-length
  content-type
  cookie
  date
  expect
  forwarded
  from
  host
  http2-settings
  if-match
  if-modified-since
  if-none-match
  if-range
  if-unmodified-since
  max-forwards
  origin
  pragma
  prefer
  proxy-authorization
  range
  referer
  te
  trailer
  transfer-encoding
  user-agent
  upgrade
  via
  warning
  x-requested-with
  x-forwarded-for
  x-forwarded-host
  x-forwarded-proto

