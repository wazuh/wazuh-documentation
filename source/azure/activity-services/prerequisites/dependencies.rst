.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the required dependencies for using the AZURE integration in a Wazuh agent.

.. _azure_monitoring_dependencies:

Installing dependencies
=======================

.. warning::
  The Wazuh manager includes all dependencies installed, these steps are only necessary when configuring the integration in a Wazuh agent.

To learn more about agent cloud monitoring, check out :doc:`this section </user-manual/agents/cloud-and-container-monitoring>`.

`Azure Storage Blobs client library <https://pypi.org/project/azure-storage-blob/>`_ is the official Python library for Microsoft's Azure Blob storage.

To install the Azure Storage Blobs client library for Python and the required dependencies, execute the following command:

.. code-block:: console

  # pip3 install azure-storage-blob==2.1.0 SQLAlchemy==1.3.11 pytz==2020.1
