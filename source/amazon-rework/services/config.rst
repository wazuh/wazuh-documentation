.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_config:

AWS Config
==========

`AWS Config <https://aws.amazon.com/config/>`_ is a service that enables you to assess, audit, and evaluate the configurations of your AWS resources. Config continuously monitors and records your AWS resource configurations and allows you to automate the evaluation of recorded configurations against desired configurations. With Config, you can review changes in configurations and relationships between AWS resources, dive into detailed resource configuration histories, and determine your overall compliance against the configurations specified in your internal guidelines. This enables you to simplify compliance auditing, security analysis, change management, and operational troubleshooting.

Configuration
-------------

Amazon configuration
^^^^^^^^^^^^^^^^^^^^

Wazuh configuration
^^^^^^^^^^^^^^^^^^^

1. Open the configuration file and add the following block:

.. code-block:: xml

  <wodle name="aws-s3">
    <disabled>no</disabled>
    <interval>10m</interval>
    <run_on_start>yes</run_on_start>
    <skip_on_error>yes</skip_on_error>
    <bucket type="config">
      <name>wazuh-aws-wodle</name>
      <path>config</path>
    </bucket>
  </wodle>

Examples
--------
