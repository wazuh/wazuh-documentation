.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Learn more about how to monitor AWS based services with Wazuh. In this section, you will learn more about the installing dependencies. 
  
.. _amazon_dependencies:

Installing dependencies
=======================

.. note::
  **The integration** with AWS S3 **can be configured in the Wazuh manager** (which also behaves as an agent) **or directly in a Wazuh agent**. This choice merely depends on how you decide to access your AWS infrastructure in your environment. 

.. warning::
  The Wazuh manager includes all dependencies installed, **these steps are only necessary** when configuring the integration **in a Wazuh agent**.

Pip
---

The required modules can be installed with Pip, the Python package manager. Most of UNIX distributions have this tool available in their software repositories, but it can be compiled from sources too:

a) For **CentOS/RHEL/Fedora** systems:

.. code-block:: console

  # yum install python-pip

b) For **Debian/Ubuntu** systems:

.. code-block:: console

  # apt-get update && apt-get install python-pip

c) From sources:

.. code-block:: console

  # curl -O https://bootstrap.pypa.io/get-pip.py
  # python get-pip.py

Boto3
-----

`Boto3 <https://boto3.readthedocs.io/>`_ is the official package supported by Amazon to manage AWS resources. It will be used to download the log messages from the S3 Bucket or the log groups for the CloudWatch Logs service integration. To install this package, execute the following command:

.. code-block:: console

  # pip install boto3
