.. Copyright (C) 2021 Wazuh, Inc.

.. _azure_dependencies:


Installing dependencies
=======================

These steps are only necessary when configuring the integration in a **Wazuh agent**. The Wazuh manager includes all dependencies installed.

Python
------

The Azure monitoring module requires python 3. It is compatible with python versions from `3.6.0` to `3.9.5`. Future python releases should maintain compatibility although it cannot be guaranteed.

a) For CentOS/RHEL/Fedora operating systems:

.. code-block:: console

  # yum update && yum install python3

b) For Debian/Ubuntu operating systems:

.. code-block:: console

  # apt-get update && apt-get install python3


Pip
---

The required modules can be installed with Pip, the Python package manager. Most of UNIX distributions have this tool available in their software repositories:

a) For CentOS/RHEL/Fedora operating systems:

.. code-block:: console

  # yum update && yum install python3-pip


b) For Debian/Ubuntu operating systems:

.. code-block:: console

  # apt-get update && apt-get install python3-pip


Azure Storage Blobs client library for Python
---------------------------------------------

`Azure Storage Blobs client library <https://pypi.org/project/azure-storage-blob/>`_ is the official Python library for Microsoft's Azure Blob storage.

To install the Azure Storage Blobs client library for Python, execute the following command:

.. code-block:: console

  # pip3 install azure-common==1.1.25 azure-storage-blob==2.1.0 azure-storage-common==2.1.0 pytz==2020.1 requests==2.25.1
