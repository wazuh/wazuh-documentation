.. Copyright (C) 2019 Wazuh, Inc.

.. _amazon_dependencies:

Installing dependencies
=======================

.. note::
  The integration with AWS S3 can be done at the Wazuh manager (which also behaves as an agent) or directly at a Wazuh agent. This choice merely depends on how you decide to access your AWS infrastructure in your environment.

Python Boto3 module is required on the system running the Wazuh module to pull AWS events.

Pip
---

The required modules can be installed with Pip, the Python package manager. The majority of UNIX distributions have this tool availabel in their software repositories, but it can be compiled from sources too:

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

`Boto3 <https://boto3.readthedocs.io/>`_ is the official package supported by Amazon to manage AWS resources. It will be used to download the log messages from the S3 Bucket. To install this package, execute the following command:

.. code-block:: console

  # pip install boto3
