.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the required dependencies for using the AWS integration in a Wazuh agent.

Installing dependencies
=======================

Python
------

The AWS module requires `Python 3 <https://www.python.org/>`__. Specifically, it's compatible with
`Python |PYTHON_CLOUD_CONTAINERS_MIN|–|PYTHON_CLOUD_CONTAINERS_MAX| <https://www.python.org/downloads/>`_. While later Python versions should work as well, we can't assure they are compatible.

AWS client library for Python
-----------------------------

.. warning::

   The Wazuh manager includes all dependencies installed. These steps are only necessary when configuring the integration in a Wazuh agent.

`Boto3 <https://boto3.readthedocs.io/>`__ is the official package that Amazon supports to manage AWS resources. It's used to download the log messages from the AWS services that Wazuh supports. The AWS module is compatible with Boto3 versions ``1.13.1``–``1.17.85``. Later Boto3 releases should be compatible although we cannot assure it.

To install the dependencies, execute the following command:

.. code-block:: console

   # pip3 install boto3==1.17.85 pyarrow==8.0.0 numpy==1.21.6
