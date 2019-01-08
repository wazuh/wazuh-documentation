.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_dependencies:

Installing dependencies
=======================

.. note::
  The integration with AWS S3 can be done at the Wazuh manager (which also behaves as an agent) or directly at a Wazuh agent. This choice merely depends on how you decide to access your AWS infrastructure in your environment.

Python Boto3 module is required on the system running the Wazuh module to pull AWS events.

Pip
---

Pip can be used as Python package manager to install the required module. In order to use it, we will start installing this tool.

a) CentOS/RHEL/Fedora:

.. code-block:: console

  # yum install python-pip

b) Debian/Ubuntu:

.. code-block:: console

  # apt-get update && apt-get install python-pip

c) From sources:

.. code-block:: console

  # curl -O https://bootstrap.pypa.io/get-pip.py
  # python get-pip.py

Boto3
-----

Boto3 is the official package supported by Amazon to manage AWS resources. It will be used to download the log messages from the S3 Bucket.

.. code-block:: console

  # pip install boto3
