.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
   :description: Wazuh can monitor and analyze the security issues found by AWS Inspector Classic. Learn how to configure and use the AWS Inspector Classic integration in this section.

.. _amazon_inspector:

Amazon Inspector Classic
========================

`Amazon Inspector Classic <https://docs.aws.amazon.com/inspector/v1/userguide/inspector_introduction.html>`_ is an automated security assessment service that helps improve the security and compliance of applications deployed on AWS. Amazon Inspector Classic automatically assesses applications for exposure, vulnerabilities, and deviations from best practices. After performing an assessment, Amazon Inspector Classic produces a detailed list of security findings prioritized by level of severity. These findings can be reviewed directly or as part of detailed assessment reports which are available via the Amazon Inspector console or API.

.. note::
   Wazuh does not yet support the `new Amazon Inspector module <https://aws.amazon.com/inspector/>`_, but it has support for the `Amazon Inspector Classic service <https://docs.aws.amazon.com/inspector/v1/userguide/inspector_introduction.html>`_.

Amazon configuration
--------------------

#. To start using Amazon Inspector Classic, go to the Amazon Web Services management console and search for the Inspector service. Once there, click on the left side menu.

    .. thumbnail:: ../../../images/aws/aws-inspector-overview.png
	:align: center
	:width: 100%

#. Click on ``Switch to Inspector Classic``.

    .. thumbnail:: ../../../images/aws/aws-inspector-side-menu.png
	:align: center
	:width: 100%

#. Click on ``Get started``.

    .. thumbnail:: ../../../images/aws/aws-inspector-get-started.png
	:align: center
	:width: 100%

#. Click on ``Advanced setup``.

    .. thumbnail:: ../../../images/aws/aws-inspector-advanced-setup.png
	:align: center
	:width: 100%

#. Choose a name for the assessment target and select if you are going to include all EC2 instances in the scans or if you prefer to filter them based on a tag by enabling or disabling the ``Include all EC2 instances in this AWS account and region`` checkbox.

   If you prefer to install the agents by hand, disable the ``Install the Amazon Inspector Agent on all EC2 instances in this assessment target`` checkbox.

   Then, click on ``Next``.

    .. thumbnail:: ../../../images/aws/aws-inspector-assessment-target.png
	:align: center
	:width: 100%

    .. note:: If you prefer to install the Inspector Classic agents by hand follow the instructions on the `AWS documentation's agent installation section <https://docs.aws.amazon.com/inspector/v1/userguide/inspector_installing-uninstalling-agents.html>`_.

#. Choose the name, duration, and periodicity of the analysis and click on ``Next``.

    .. thumbnail:: ../../../images/aws/aws-inspector-assessment-template.png
	:align: center
	:width: 100%

#. Finally, review the details of the configured target and template and click on ``Next``.

    .. thumbnail:: ../../../images/aws/aws-inspector-review.png
	:align: center
	:width: 100%

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
      Check the :ref:`AWS S3 module <wodle_s3>` reference manual to learn more about each setting.

#. Restart Wazuh in order to apply the changes:

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
