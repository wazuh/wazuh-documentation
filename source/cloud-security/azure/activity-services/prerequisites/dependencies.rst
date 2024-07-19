.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the required dependencies for using the AZURE integration in a Wazuh agent.

Installing dependencies
=======================

.. |service| replace:: Azure

.. include:: /_templates/cloud/notes.rst

Python
------

.. |py_cloud_cont_min| replace:: |PYTHON_CLOUD_CONTAINERS_MIN|
.. |py_cloud_cont_max| replace:: |PYTHON_CLOUD_CONTAINERS_MAX|

.. include:: /_templates/cloud/python_installation.rst

.. |module_script| replace:: ``/var/ossec/wodles/azure/azure-logs``

.. include:: /_templates/cloud/pip_installation.rst

Azure Storage client library for Python
---------------------------------------

`Azure Storage Blobs client library <https://pypi.org/project/azure-storage-blob/>`_ is the official Python library for Microsoft's Azure Blob storage.

To install the dependencies, execute the following command:

.. tabs::

   .. group-tab:: Python 3.8–3.10

      .. code-block:: console

         # pip3 install azure-storage-blob==12.20.0 azure-storage-common==2.1.0 azure-common==1.1.25 cryptography==3.3.2 cffi==1.14.4 pycparser==2.20 six==1.14.0 python-dateutil==2.8.1 requests==2.25.1 certifi==2022.12.07 chardet==3.0.4 idna==2.9 urllib3==1.26.18 SQLAlchemy==2.0.23 pytz==2020.1

   .. group-tab:: Python 3.11

      .. code-block:: console

         # pip3 install --break-system-packages azure-storage-blob==12.20.0 azure-storage-common==2.1.0 azure-common==1.1.25 cryptography==3.3.2 cffi==1.14.4 pycparser==2.20 six==1.14.0 python-dateutil==2.8.1 requests==2.25.1 certifi==2022.12.07 chardet==3.0.4 idna==2.9 urllib3==1.26.18 SQLAlchemy==2.0.23 pytz==2020.1

      .. note::

         If you're using a virtual environment, remove the ``--break-system-packages`` parameter from the command above.
