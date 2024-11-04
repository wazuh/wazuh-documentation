.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The integration of AWS services with Wazuh configured on the Wazuh agent requires that certain dependencies be installed on the Wazuh agent. Learn more on this section of the documentation.

Installing dependencies
=======================

.. |service| replace:: AWS

.. include:: /_templates/cloud/notes.rst

We outline the dependencies needed to configure the integration on a Wazuh agent installed on a Linux endpoint.

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

`Boto3 <https://boto3.readthedocs.io/>`__ is the official package supported by Amazon to manage AWS resources. It is used to download log messages from the different AWS services supported by Wazuh. The Wazuh module for AWS is compatible with ``boto3`` from version ``1.13.1`` to ``1.17.85``. Future ``boto3`` releases should maintain compatibility although we cannot assure it.

Execute the following command to install the dependencies:

.. tabs::

   .. group-tab:: Python 3.8–3.10

      .. code-block:: console

         # pip3 install boto3==1.34.135 pyarrow==14.0.1 numpy==1.26.0

   .. group-tab:: Python 3.11–3.12

      .. code-block:: console

         # pip3 install --break-system-packages boto3==1.34.135 pyarrow==14.0.1 numpy==1.26.0

      .. note::

         If you're using a virtual environment, remove the ``--break-system-packages`` parameter from the command above.
