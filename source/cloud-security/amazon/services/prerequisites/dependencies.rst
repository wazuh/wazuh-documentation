.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the required dependencies for using the AWS integration in a Wazuh agent.

.. _amazon_dependencies:

Installing dependencies
=======================

.. |service| replace:: AWS

.. include:: /_templates/cloud/notes.rst

Python
------

.. |py_cloud_cont_min| replace:: |PYTHON_CLOUD_CONTAINERS_MIN|
.. |py_cloud_cont_max| replace:: |PYTHON_CLOUD_CONTAINERS_MAX|

.. include:: /_templates/cloud/python_installation.rst

.. |module_script| replace:: ``/var/ossec/wodles/aws/aws-s3``

.. include:: /_templates/cloud/pip_installation.rst

.. _boto-3:

AWS client library for Python
-----------------------------

`Boto3 <https://boto3.readthedocs.io/>`__ is the official package that Amazon supports to manage AWS resources. It's used to download the log messages from the AWS services that Wazuh supports. The AWS module is compatible with Boto3 versions ``1.13.1``–``1.17.85``. Later Boto3 releases should be compatible although we cannot assure it.

To install the dependencies, execute the following command:

.. tabs::

   .. group-tab:: Python 3.8–3.10

      .. code-block:: console

         # pip3 install boto3==1.34.135 pyarrow==14.0.1 numpy==1.26.0

   .. group-tab:: Python 3.11–3.12

      .. code-block:: console

         # pip3 install --break-system-packages boto3==1.34.135 pyarrow==14.0.1 numpy==1.26.0

      .. note::

         If you're using a virtual environment, remove the ``--break-system-packages`` parameter from the command above.
