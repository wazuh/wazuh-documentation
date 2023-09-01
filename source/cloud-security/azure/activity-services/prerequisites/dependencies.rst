.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the required dependencies for using the AZURE integration in a Wazuh agent.

Installing dependencies
=======================

Python
------

The Azure module requires `Python 3 <https://www.python.org/>`__. Specifically, it's compatible with
`Python |PYTHON_CLOUD_CONTAINERS_MIN|–|PYTHON_CLOUD_CONTAINERS_MAX| <https://www.python.org/downloads/>`_. While later Python versions should work as well, we can't assure they are compatible.

Azure Storage client library for Python
---------------------------------------

.. warning::

   The Wazuh manager includes all dependencies installed. These steps are only necessary when configuring the integration in a Wazuh agent.

`Azure Storage Blobs client library <https://pypi.org/project/azure-storage-blob/>`_ is the official Python library for Microsoft's Azure Blob storage.

To install the dependencies, execute the following command:

.. code-block:: console

   # pip3 install azure-storage-blob==2.1.0 SQLAlchemy==1.3.11 pytz==2020.1
