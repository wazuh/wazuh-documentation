.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Amazon Inspector Classic is an automated security assessments service that improves the security of applications deployed on AWS. Learn how to configure and monitor its findings with Wazuh.


.. _amazon_inspector:

Amazon Inspector Classic
========================

`Amazon Inspector Classic <https://docs.aws.amazon.com/inspector/v1/userguide/inspector_introduction.html>`_ is an automated security assessment service that helps improve the security and compliance of applications deployed on AWS. Amazon Inspector Classic automatically assesses applications for exposure, vulnerabilities, and deviations from best practices. After performing an assessment, Amazon Inspector Classic produces a detailed list of security findings prioritized by level of severity. These findings can be reviewed directly or as part of detailed assessment reports which are available via the Amazon Inspector console or API.


.. note::
   Wazuh does not yet support the `new Amazon Inspector module <https://aws.amazon.com/inspector/>`_, but it has support for the `Amazon Inspector Classic service <https://docs.aws.amazon.com/inspector/v1/userguide/inspector_introduction.html>`_.

Amazon configuration
--------------------

#. To start using Amazon Inspector Classic, go to the Amazon Web Services management console and search for the Inspector service. Once there, click on the left side menu.

    .. thumbnail:: /images/cloud-security/aws/aws-inspector-overview.png
	:align: center
	:width: 100%

#. Click on **Switch to Inspector Classic**.

    .. thumbnail:: /images/cloud-security/aws/aws-inspector-side-menu.png
	:align: center
	:width: 100%

#. Click on **Get started**.

    .. thumbnail:: /images/cloud-security/aws/aws-inspector-get-started.png
	:align: center
	:width: 100%

#. Click on **Advanced setup**.

    .. thumbnail:: /images/cloud-security/aws/aws-inspector-advanced-setup.png
	:align: center
	:width: 100%

#. Configure the assessment target:

   #. Choose a name for the assessment target.

   #. Select if you are going to include all EC2 instances in the scans or if you prefer to filter them based on a tag by enabling or disabling the **Include all EC2 instances in this AWS account and region** checkbox.

   #. If you prefer to install the agents by hand, disable the **Install the Amazon Inspector Agent on all EC2 instances in this assessment target** checkbox.

   #. Click on **Next**.

	   .. thumbnail:: /images/cloud-security/aws/aws-inspector-assessment-target.png
	       :align: center
	       :width: 100%

    .. note:: If you prefer to install the Inspector Classic agents by hand follow the instructions on the `AWS documentation's agent installation section <https://docs.aws.amazon.com/inspector/v1/userguide/inspector_installing-uninstalling-agents.html>`_.

#. Configure the assessment template. Choose the name, duration, and periodicity of the analysis and click on **Next**.

    .. thumbnail:: /images/cloud-security/aws/aws-inspector-assessment-template.png
	:align: center
	:width: 100%

#. Finally, review the details of the configured target and template and click on **Next**.

    .. thumbnail:: /images/cloud-security/aws/aws-inspector-review.png
	:align: center
	:width: 100%

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst

.. include:: /_templates/cloud/amazon/read_only_policy_description.rst

.. code-block:: json

    {
	"Version": "2012-10-17",
	"Statement": [
	    {
		"Sid": "VisualEditor0",
		"Effect": "Allow",
		"Action": [
		    "inspector:ListFindings",
		    "inspector:DescribeFindings"
		],
		"Resource": "*"
	    }
	]
    }

.. include:: /_templates/cloud/amazon/attach_policy.rst

Wazuh configuration
-------------------

#. Open the Wazuh configuration file (``/var/ossec/etc/ossec.conf``) and add the following configuration block to enable the integration with Inspector Classic:

    .. code-block:: xml

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>no</run_on_start>
        <skip_on_error>no</skip_on_error>
        <service type="inspector">
          <aws_profile>default</aws_profile>
        </service>
      </wodle>

    Users must specify at least a region. Multiple regions can be added separated by commas.

    .. note::
      Check the :doc:`AWS S3 module </user-manual/reference/ossec-conf/wodle-s3>` reference manual to learn more about each setting.

#. Restart Wazuh in order to apply the changes:

    * If you're configuring a Wazuh manager:

      .. include:: /_templates/common/restart_manager.rst

    * If you're configuring a Wazuh agent:

      .. include:: /_templates/common/restart_agent.rst

