.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure different services required to integrate AWS WAF with Wazuh.

Amazon Web Application Firewall (WAF)
=====================================

`Amazon WAF <https://aws.amazon.com/waf/>`__ is a web application firewall that helps protect your web applications from common web exploits that could affect application availability, compromise security, or consume excessive resources. AWS WAF gives you control over which traffic to allow or block to your web applications by defining customizable web security rules.

AWS configuration
-----------------

The following sections cover how to configure different services required to integrate AWS WAF with Wazuh.

.. thumbnail:: /images/cloud-security/aws/waf/firewall.png
   :align: center
   :width: 80%

Native integration
^^^^^^^^^^^^^^^^^^

#. :doc:`Create a new S3 bucket </cloud-security/amazon/services/prerequisites/S3-bucket>`. If you want to use an already created one, skip this step.

#. Go to **Services** > **Security, Identity, & Compliance** > **WAF & Shield**.

   .. thumbnail::  /images/cloud-security/aws/waf-native-1.png
      :align: center
      :width: 70%

#. Click **Create web ACL**:

   .. thumbnail::  /images/cloud-security/aws/waf-native-2.png
      :align: center
      :width: 70%

#. Choose a name for your web ACL and click **Next**:

   .. thumbnail::  /images/cloud-security/aws/waf-native-3.png
      :align: center
      :width: 70%

#. Click **Add rules** and select which type of rule to add. Then, click **Next**:

   .. thumbnail::  /images/cloud-security/aws/waf-native-4.png
      :align: center
      :width: 70%

#. Set the rules priority and click **Next**:

   .. thumbnail::  /images/cloud-security/aws/waf-native-5.png
      :align: center
      :width: 70%

#. Choose a name for your CloudWatch metric and click **Next**:

   .. thumbnail::  /images/cloud-security/aws/waf-native-6.png
      :align: center
      :width: 70%

#. Review the web ACL. Click the **Create web ACL** button at the bottom of the page to create it.

   .. thumbnail::  /images/cloud-security/aws/waf-native-7.png
      :align: center
      :width: 70%

.. note::

   Check :ref:`waf_acls <bucket_waf_acls>` for a comma-separated list of ACLs to iterate over the WAF v2 ACLs.

Integration using Kinesis
^^^^^^^^^^^^^^^^^^^^^^^^^

.. deprecated:: 5.0

Amazon Data Firehose configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create an Amazon Data Firehose delivery stream to store the Amazon WAF logs into the desired S3 bucket so Wazuh can process them.

#. :doc:`Create a new S3 bucket <../prerequisites/S3-bucket>`. If you want to use an already existing one, skip this step.
#. On your AWS console, Search for "*amazon data firehose*" in the search bar at the top of the page or go to **Services** > **Analytics** > **Amazon Data Firehose**.

   .. thumbnail:: /images/cloud-security/aws/waf/01-data-firehose.png
      :align: center
      :width: 80%

#. Click **Create Firehose stream**.

   .. thumbnail:: /images/cloud-security/aws/waf/02-create-firehose-stream.png
      :align: center
      :width: 80%

#. Select **Direct PUT** and **Amazon S3** as the desired *Source* and *Destination*, respectively.

   .. thumbnail:: /images/cloud-security/aws/waf/03-select-direct-put.png
      :align: center
      :width: 80%

#. Under **Firehose stream name**, give the data firehose a name that starts with the prefix ``aws-waf-logs-``.

   .. thumbnail:: /images/cloud-security/aws/waf/04-firehose-stream-name.png
      :align: center
      :width: 80%

#. Select the desired S3 bucket as the destination. It is possible to specify a custom prefix to alter the path where AWS stores the logs. AWS Firehose creates a file structure ``YYYY/MM/DD/HH``, if a prefix is used the created file structure would be ``prefix-name/YYYY/MM/DD/HH``. If a prefix is used it must be specified under the Wazuh bucket configuration. In our case, the prefix is ``waf/``.

   .. thumbnail:: /images/cloud-security/aws/waf/05-select-s3-bucket-and-path.png
      :align: center
      :width: 80%

#. Create or choose an existing IAM role to be used by Amazon Data Firehose in the **Advanced settings** section.

   .. thumbnail:: /images/cloud-security/aws/waf/06-choose-iam-role.png
      :align: center
      :width: 80%

#. Click **Create Firehose stream** at the end of the page. The new delivery stream will be created and its details will be shown as follows.

   .. thumbnail:: /images/cloud-security/aws/waf/07-create-firehose-stream.png
      :align: center
      :width: 80%

AWS WAF configuration
~~~~~~~~~~~~~~~~~~~~~

Send logs from your Web Access Control Lists (web ACLs) to the previously created Amazon Data Firehose with a configured S3 storage destination. After you enable logging, AWS WAF delivers logs to your S3 bucket through the HTTPS endpoint of Firehose.

#. On the AWS console, search for "*waf*" or go to **Services** > **Security, Identity, & Compliance** > **WAF & Shield**.

   .. thumbnail:: /images/cloud-security/aws/waf/01-search-for-waf.png
      :align: center
      :width: 80%

#. Click **Go to AWS WAF**.

   .. thumbnail:: /images/cloud-security/aws/waf/02-go-to-aws-waf.png
      :align: center
      :width: 80%

#. Go to **Web ACLs** and click the name of the Web ACL attached to your web application. If you have not configured the Web ACL, follow the `set up AWS WAF <https://docs.aws.amazon.com/waf/latest/developerguide/getting-started.html#getting-started-aws-account>`__ guide.

   .. thumbnail:: /images/cloud-security/aws/waf/03-go-to-web-acl.png
      :align: center
      :width: 80%

#. Go to **Logging and metrics**, under **Logging**, click **Enable**.

   .. thumbnail:: /images/cloud-security/aws/waf/04-enable-logging.png
      :align: center
      :width: 80%

#. Select **Amazon Data Firehose stream** as **Logging destination**, and select the previously created firehose stream under **Amazon Data Firehose stream**.

   .. thumbnail:: /images/cloud-security/aws/waf/05-select-logging-destination.png
      :align: center
      :width: 80%

#. Under **Filter logs**, apply your preferred filtering requirements and click **Save**. In our case, we set up the filter to log blocked web requests only.

   .. thumbnail:: /images/cloud-security/aws/waf/06-filter-logs.png
      :align: center
      :width: 80%

#. Confirm that logging is enabled.

   .. thumbnail:: /images/cloud-security/aws/waf/07-confirm-logging-is-enabled.png
      :align: center
      :width: 80%

.. _waf_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst
.. include:: /_templates/cloud/amazon/bucket_policies.rst
.. include:: /_templates/cloud/amazon/attach_policy.rst

Configure Wazuh to process Amazon WAF logs
------------------------------------------

Native Integration
^^^^^^^^^^^^^^^^^^

#. Open the Wazuh configuration file (``/var/ossec/etc/ossec.conf``) and add the following block:

   .. code-block:: xml

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="waf">
          <name>wazuh-aws-wodle</name>
          <waf_acls>acls</waf_acls>
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

#. Restart Wazuh in order to apply the changes:

   -  If you're configuring a Wazuh manager:

      .. include:: /_templates/common/restart_manager.rst

   -  If you're configuring a Wazuh agent:

      .. include:: /_templates/common/restart_agent.rst

Integration using Kinesis
^^^^^^^^^^^^^^^^^^^^^^^^^

#. Access the Wazuh configuration in **Server management** > **Settings** using the Wazuh dashboard or by manually editing the ``/var/ossec/etc/ossec.conf`` file in the Wazuh server or agent.

   .. thumbnail:: /images/cloud-security/aws/waf/01-wazuh-configuration.png
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/waf/02-wazuh-configuration.png
      :align: center
      :width: 80%

#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the file, replacing ``<WAZUH_AWS_BUCKET>`` with the name of the S3 bucket:

   .. code-block:: xml

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="waf">
          <name><WAZUH_AWS_BUCKET></name>
          <path>waf</path>                   <!-- PUT THE S3 BUCKET PREFIX IF THE LOGS ARE NOT STORED IN THE BUCKET'S ROOT PATH -->
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

#. Save the changes and restart Wazuh to apply the changes. The service can be manually restarted using the following command outside the Wazuh dashboard:

   -  Wazuh manager:

      .. code-blocK:: console

         # systemctl restart wazuh-manager

   -  Wazuh agent:

      .. code-block:: console

         # systemctl restart wazuh-agent

HTTP Request headers
--------------------

The Wazuh AWS WAF implementation parses the header information present in the ``httpRequest`` field, allowing filtering by these headers and their values on the Wazuh dashboard. During this parsing, any non-standard header will be extracted and removed from the event before sending it to :doc:`analysisd </user-manual/reference/daemons/wazuh-analysisd>`. Here is the complete list of the allowed standard header fields:

.. code-block:: none

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

Use case
--------

AWS WAF is a security service that helps protect your web applications or APIs from threats. By monitoring blocked requests, you can identify the types of threats your application is facing. This can help you understand the security landscape and adjust your defenses accordingly.

Monitoring blocked web application requests
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If web requests are blocked by the rules of the Amazon Web ACL, the following alerts with rule ID *80442* and *80443* will be shown on the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/aws/waf/1-monitoring-blocked-web-application-requests.png
   :align: center
   :width: 80%

Expand an alert to find more information such as the Request-URI, the method, and the Web ACL rule label that blocked the request.

.. thumbnail:: /images/cloud-security/aws/waf/2-monitoring-blocked-web-application-requests.png
   :align: center
   :width: 80%
