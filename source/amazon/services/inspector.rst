.. Copyright (C) 2019 Wazuh, Inc.

.. _amazon_inspector:

Amazon Inspector
================

`Amazon Inspector <https://aws.amazon.com/inspector/>`_ is an automated security assessment service that helps improve the security and compliance of applications deployed on AWS. Amazon Inspector automatically assesses applications for exposure, vulnerabilities, and deviations from best practices. After performing an assessment, Amazon Inspector produces a detailed list of security findings prioritized by level of severity. These findings can be reviewed directly or as part of detailed assessment reports which are available via the Amazon Inspector console or API.

Amazon configuration
--------------------

Amazon Inspector does not need to store logs into a bucket. It uses API calls to retrieve the information.

Wazuh configuration
-------------------

1. Open the Wazuh configuration file (``/var/ossec/etc/ossec.conf``) and add the following configuration block to enable the integration with Inspector:

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

You must specify at least a region. Multiple regions can be added separated by commas.

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
