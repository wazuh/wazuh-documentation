.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn about the required dependencies for using the AWS integration in a Wazuh agent.
  
.. _amazon_dependencies:

Installing dependencies
=======================

.. note::
  The integration with AWS S3 can be configured in the Wazuh manager (which also behaves as an agent) or directly in a Wazuh agent. This choice merely depends on how you decide to access your AWS infrastructure in your environment. 

.. warning::
  The Wazuh manager includes all dependencies installed, these steps are only necessary when configuring the integration in a Wazuh agent.


Python
------

The AWS module requires Python 3. It is compatible with Python 3.6 to Python 3.9. Future Python releases should maintain compatibility although it cannot be guaranteed.

a) For CentOS/RHEL/Fedora operating systems:

.. code-block:: console

  # yum update && yum install python3

b) For Debian/Ubuntu operating systems:

.. code-block:: console

  # apt-get update && apt-get install python3

The required modules can be installed with Pip, the Python package manager. Most of UNIX distributions have this tool available in their software repositories:

a) For CentOS/RHEL/Fedora operating systems:

.. code-block:: console

  # yum update && yum install python3-pip


b) For Debian/Ubuntu operating systems:

.. code-block:: console

  # apt-get update && apt-get install python3-pip

It is recommended to use a pip version greater than or equal to 19.3 to ease the installation of the required dependencies.

.. code-block:: console

  # pip3 install --upgrade pip

Boto3
-----

`Boto3 <https://boto3.readthedocs.io/>`_ is the official package supported by Amazon to manage AWS resources. It will be used to download the log messages from the S3 Bucket or the log groups for the CloudWatch Logs service integration. The module is compatible with boto3 from ``1.13.1`` to ``1.17.76``. Future boto3 releases should maintain compatibility although it cannot be guaranteed.

To install boto3, execute the following command:

.. code-block:: console

  # pip3 install boto3==1.17.76
