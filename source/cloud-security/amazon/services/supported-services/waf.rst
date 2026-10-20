.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure different services required to integrate AWS WAF with Wazuh.

AWS WAF
=======

`AWS WAF <https://aws.amazon.com/waf/>`__ is a web application firewall that protects your web applications from common web exploits. These exploits can affect availability, compromise security, or consume excessive resources. AWS WAF gives you control over which traffic to allow or block to your web applications by defining customizable web security rules.

AWS configuration
-----------------

The following sections cover how to configure different services required to integrate AWS WAF with Wazuh. The following diagram shows how AWS WAF sends logs through Amazon Data Firehose to the S3 bucket, and how Wazuh collects them from the bucket.

.. thumbnail:: /images/cloud-security/aws/waf/firewall.png
   :title: AWS WAF logs flow through Amazon Data Firehose and an S3 bucket to Wazuh
   :alt: AWS WAF logs flow through Amazon Data Firehose and an S3 bucket to Wazuh
   :align: center
   :width: 80%

Amazon Data Firehose configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Create an Amazon Data Firehose delivery stream to store the AWS WAF logs into the desired S3 bucket so Wazuh can process them.

#. :doc:`Create a new </cloud-security/amazon/services/prerequisites/S3-bucket>` S3 bucket, or skip this step to use an existing bucket.

#. On your AWS console, search for ``amazon data firehose`` in the search bar or go to **Services** > **Analytics** > **Amazon Data Firehose**.

   .. thumbnail:: /images/cloud-security/aws/waf/01-data-firehose.png
      :title: Search for Amazon Data Firehose on the AWS console
      :alt: Search for Amazon Data Firehose on the AWS console
      :align: center
      :width: 80%

#. Click **Create Firehose stream**.

   .. thumbnail:: /images/cloud-security/aws/waf/02-create-firehose-stream.png
      :title: Create Firehose stream
      :alt: Create Firehose stream
      :align: center
      :width: 80%

#. Select **Direct PUT** and **Amazon S3** as the desired **Source** and **Destination**, respectively, and choose a **Firehose stream name** that starts with ``aws-waf-logs-``.

   .. thumbnail:: /images/cloud-security/aws/waf/03-select-direct-put.png
      :title: Select Direct PUT as source, Amazon S3 as destination, and a Firehose stream name starting with aws-waf-logs-
      :alt: Select Direct PUT as source, Amazon S3 as destination, and a Firehose stream name starting with aws-waf-logs-
      :align: center
      :width: 80%

#. Select the desired S3 bucket as the destination. You can specify a custom prefix to change the path where AWS stores the logs. Amazon Data Firehose creates a file structure ``YYYY/MM/DD/HH``. If you use a prefix, the file structure is ``prefix-name/YYYY/MM/DD/HH``, and you must enter the same prefix as the path value in the Wazuh configuration. In this example, the prefix is ``waf/``.

   .. thumbnail:: /images/cloud-security/aws/waf/05-select-s3-bucket-and-path.png
      :title: Select the destination S3 bucket and the waf/ prefix
      :alt: Select the destination S3 bucket and the waf/ prefix
      :align: center
      :width: 80%

#. Create or choose an existing IAM role to be used by Amazon Data Firehose in the **Advanced settings** section.

   .. thumbnail:: /images/cloud-security/aws/waf/06-choose-iam-role.png
      :title: Choose the IAM role in Advanced settings
      :alt: Choose the IAM role in Advanced settings
      :align: center
      :width: 80%

#. Click **Create Firehose stream** at the end of the page.

   .. thumbnail:: /images/cloud-security/aws/waf/07-create-firehose-stream.png
      :title: Firehose stream created
      :alt: Firehose stream created
      :align: center
      :width: 80%

AWS WAF configuration
^^^^^^^^^^^^^^^^^^^^^

Send logs from your Web Access Control Lists (web ACLs) to the previously created Amazon Data Firehose with an S3 storage destination configured. After you enable logging, AWS WAF sends logs to the Firehose stream, which delivers them to your S3 bucket.

#. On your AWS console, search for ``waf`` in the search bar or go to **Services** > **Security, Identity, & Compliance** > **WAF & Shield**.

   .. thumbnail:: /images/cloud-security/aws/waf/01-search-for-waf.png
      :title: Search for WAF & Shield on the AWS console
      :alt: Search for WAF & Shield on the AWS console
      :align: center
      :width: 80%

#. Go to **Web ACLs** and click the name of the web ACL attached to your web application. If you haven't configured a web ACL, follow the `set up AWS WAF <https://docs.aws.amazon.com/waf/latest/developerguide/getting-started.html#getting-started-aws-account>`__ guide.

   .. thumbnail:: /images/cloud-security/aws/waf/03-go-to-web-acl.png
      :title: Select the web ACL in Web ACLs
      :alt: Select the web ACL in Web ACLs
      :align: center
      :width: 80%

#. Go to **Logging and metrics**, under **Logging**, click **Enable**.

   .. thumbnail:: /images/cloud-security/aws/waf/04-enable-logging.png
      :title: Enable logging in Logging and metrics
      :alt: Enable logging in Logging and metrics
      :align: center
      :width: 80%

#. Select the **Amazon Data Firehose stream** as the **Logging destination**, and select the previously created Firehose stream under **Amazon Data Firehose stream**.

   .. thumbnail:: /images/cloud-security/aws/waf/05-select-logging-destination.png
      :title: Select Amazon Data Firehose stream as the logging destination
      :alt: Select Amazon Data Firehose stream as the logging destination
      :align: center
      :width: 80%

#. Under **Filter logs**, apply your preferred filtering requirements and click **Save**. In this example, the filter logs only blocked web requests.

   .. thumbnail:: /images/cloud-security/aws/waf/06-filter-logs.png
      :title: Filter logs to keep only blocked web requests
      :alt: Filter logs to keep only blocked web requests
      :align: center
      :width: 80%

#. Confirm that logging is enabled.

   .. thumbnail:: /images/cloud-security/aws/waf/07-confirm-logging-is-enabled.png
      :title: Logging enabled on the web ACL
      :alt: Logging enabled on the web ACL
      :align: center
      :width: 80%

.. _waf_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

Follow the :ref:`creating an AWS policy <creating_an_AWS_policy>` guide to create a policy using the Amazon Web Services console.

Take into account that the policies below follow the principle of least privilege, ensuring that only the minimum permissions are granted to the AWS IAM user.

To allow an AWS user to use the Wazuh module for AWS with read-only permissions, the user must have a policy like the following attached:

.. code-block:: json
   :emphasize-lines: 12,13

   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "VisualEditor0",
               "Effect": "Allow",
               "Action": [
                   "s3:GetObject",
                   "s3:ListBucket"
               ],
               "Resource": [
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>/*",
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>"
               ]
           }
       ]
   }

.. include:: /_templates/cloud/amazon/delete_policy_description.rst

.. code-block:: json
   :emphasize-lines: 13,14

   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "VisualEditor0",
               "Effect": "Allow",
               "Action": [
                   "s3:GetObject",
                   "s3:ListBucket",
                   "s3:DeleteObject"
               ],
               "Resource": [
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>/*",
                   "arn:aws:s3:::<WAZUH_AWS_BUCKET>"
               ]
           }
       ]
   }

.. note::

   ``<WAZUH_AWS_BUCKET>`` is a placeholder. Replace it with the actual name of the bucket from which you want to retrieve logs.

Wazuh deletes the log files from the bucket only if you set ``remove_from_bucket`` to ``yes`` in the bucket configuration. This option is off by default and isn't in the sample configuration, so you need the second policy only if you turn it on.

After creating a policy, you can attach it directly to a user or to a group the user belongs to. In :ref:`attaching a policy to an IAM user group <attaching_policy_to_IAM_user_group>`, you see how to attach a policy to a group. More information on using other methods is available in the `AWS documentation <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_change-permissions.html#users_change_permissions-add-console>`__.

Configure Wazuh to process AWS WAF logs
---------------------------------------

#. Make sure that the AWS integrations are enabled on the Wazuh dashboard, as described in :doc:`Enable AWS integration on the Wazuh dashboard </cloud-security/amazon/services/prerequisites/enabling-integration>`.

#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the ``/var/ossec/etc/ossec.conf`` file on the Wazuh agent. Replace ``<WAZUH_AWS_BUCKET>`` with the name of the S3 bucket. Set the path value to the Firehose stream prefix you entered earlier, or remove the path line if the logs are in the bucket root. If the file already has a ``<wodle name="aws-s3">`` block, add only the ``<bucket>`` section to it:

   .. code-block:: xml
      :emphasize-lines: 7

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="waf">
          <name><WAZUH_AWS_BUCKET></name>
          <path>waf</path>
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

   .. note::

      This example uses the ``aws_profile`` authentication parameter. Check the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section to learn more about the different authentication options and how to use them.

#. Save the changes and restart the Wazuh agent service to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

WAF use case
------------

AWS WAF is a security service that helps protect your web applications or APIs from threats. By monitoring blocked requests, you can identify the types of threats your application is facing. Knowing these threats helps you understand the security landscape and adjust your defenses accordingly.

Monitoring blocked web application requests
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If the rules of the web ACL block web requests, you see the Cloud firewall or WAF connection denied or blocked finding on the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/aws/waf/1-monitoring-blocked-web-application-requests.png
   :title: Blocked web request findings on the Wazuh dashboard
   :alt: Blocked web request findings on the Wazuh dashboard
   :align: center
   :width: 80%

Expand a finding to see more information, such as the request path (``url.path``), the method (``http.request.method``), and the name of the web ACL rule that blocked the request (``rule.id``).

.. thumbnail:: /images/cloud-security/aws/waf/2-monitoring-blocked-web-application-requests.png
   :title: Blocked web request finding details
   :alt: Blocked web request finding details
   :align: center
   :width: 80%

HTTP request headers
--------------------

The Wazuh AWS WAF implementation parses the header information present in the ``httpRequest`` field, allowing filtering by these headers and their values on the Wazuh dashboard. During this parsing, the module drops any non-standard header from the event before it sends the event to :doc:`wazuh-manager-analysisd </user-manual/reference/daemons/wazuh-manager-analysisd>`. Here is the complete list of the allowed standard header fields:

+------------------------------------+-----------------------+-----------------------------------+
| ``a-im``                           | ``accept``            | ``accept-charset``                |
+------------------------------------+-----------------------+-----------------------------------+
| ``accept-encoding``                | ``accept-language``   | ``access-control-request-method`` |
+------------------------------------+-----------------------+-----------------------------------+
| ``access-control-request-headers`` | ``authorization``     | ``cache-control``                 |
+------------------------------------+-----------------------+-----------------------------------+
| ``connection``                     | ``content-encoding``  | ``content-length``                |
+------------------------------------+-----------------------+-----------------------------------+
| ``content-type``                   | ``cookie``            | ``date``                          |
+------------------------------------+-----------------------+-----------------------------------+
| ``expect``                         | ``forwarded``         | ``from``                          |
+------------------------------------+-----------------------+-----------------------------------+
| ``host``                           | ``http2-settings``    | ``if-match``                      |
+------------------------------------+-----------------------+-----------------------------------+
| ``if-modified-since``              | ``if-none-match``     | ``if-range``                      |
+------------------------------------+-----------------------+-----------------------------------+
| ``if-unmodified-since``            | ``max-forwards``      | ``origin``                        |
+------------------------------------+-----------------------+-----------------------------------+
| ``pragma``                         | ``prefer``            | ``proxy-authorization``           |
+------------------------------------+-----------------------+-----------------------------------+
| ``range``                          | ``referer``           | ``te``                            |
+------------------------------------+-----------------------+-----------------------------------+
| ``trailer``                        | ``transfer-encoding`` | ``user-agent``                    |
+------------------------------------+-----------------------+-----------------------------------+
| ``upgrade``                        | ``via``               | ``warning``                       |
+------------------------------------+-----------------------+-----------------------------------+
| ``x-requested-with``               | ``x-forwarded-for``   | ``x-forwarded-host``              |
+------------------------------------+-----------------------+-----------------------------------+
| ``x-forwarded-proto``              |                       |                                   |
+------------------------------------+-----------------------+-----------------------------------+
