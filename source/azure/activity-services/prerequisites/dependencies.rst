.. Copyright (C) 2015, Wazuh, Inc.

:orphan:

.. _azure_monitoring_dependencies:


Installing dependencies
=======================

.. note::

  The Azure monitoring module can be configured in the Wazuh manager (which also behaves as an agent) or directly in a Wazuh agent.

.. warning::
  The Wazuh manager includes all dependencies installed, these steps are only necessary when configuring the integration in a Wazuh agent.


Python
------

The Azure module requires Python 3. It is compatible with Python 3.6 to Python 3.9. Future Python releases should maintain compatibility although it cannot be guaranteed.

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

Azure Storage Blobs client library for Python
---------------------------------------------

`Azure Storage Blobs client library <https://pypi.org/project/azure-storage-blob/>`_ is the official Python library for Microsoft's Azure Blob storage.

To install the Azure Storage Blobs client library for Python, execute the following command:

.. code-block:: console

  # pip3 install azure-common==1.1.25 azure-storage-blob==2.1.0 azure-storage-blob==2.1.0 azure-storage-common==2.1.0 pytz==2020.1 requests==2.25.1
