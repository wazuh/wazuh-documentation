.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_macie:

Amazon Macie
============

`Amazon Macie <https://aws.amazon.com/macie/>`_ is a security service that uses machine learning to automatically discover, classify, and protect sensitive data in AWS. Amazon Macie recognizes sensitive data such as personally identifiable information (PII) or intellectual property, and provides you with dashboards and alerts that give visibility into how this data is being accessed or moved. The fully managed service continuously monitors data access activity for anomalies, and generates detailed alerts when it detects risk of unauthorized access or inadvertent data leaks. Today, Amazon Macie is available to protect data stored in Amazon S3, with support for additional AWS data stores coming later this year.

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
    <bucket type="custom">
      <name>wazuh-aws-wodle</name>
      <path>macie</path>
    </bucket>
  </wodle>

Examples
--------
