.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the required dependencies for using the AWS integration in a Wazuh agent.

.. _amazon_dependencies:

Installing dependencies
=======================

AWS module requires `Python 3 <https://www.python.org/>`_. It is compatible with
`Python |PYTHON_CLOUD_CONTAINERS_MIN| - |PYTHON_CLOUD_CONTAINERS_MAX| <https://www.python.org/downloads/>`_.

.. note::
   Newer Python versions should work although it is not guaranteed.

AWS client library for Python
-----------------------------

.. warning::
  The Wazuh manager includes all dependencies installed, these steps are only necessary when configuring the integration in a Wazuh agent.

`Boto3 <https://boto3.readthedocs.io/>`__ is the official package supported by Amazon to manage AWS resources. It is used to download the log messages from the different AWS services supported by Wazuh. The module is compatible with boto3 from ``1.13.1`` to ``1.17.85``. Future boto3 releases should maintain compatibility although it cannot be guaranteed.

To install the dependencies, execute the following command:

.. code-block:: console
  # pip3 install boto3==1.17.85 pyarrow==8.0.0 numpy==1.21.6
