.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_kms:

AWS Key Management Service
==========================

`AWS Key Management Service <https://aws.amazon.com/kms/>`_ (KMS) makes it easy for you to create and manage keys and control the use of encryption across a wide range of AWS services and in your applications. AWS KMS is a secure and resilient service that uses FIPS 140-2 validated hardware security modules to protect your keys. AWS KMS is integrated with AWS CloudTrail to provide you with logs of all key usage to help meet your regulatory and compliance needs.

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
      <path>kms_compress_encrypted</path>
    </bucket>
  </wodle>

Examples
--------
