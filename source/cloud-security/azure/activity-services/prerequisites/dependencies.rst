.. Copyright (C) 2015, Wazuh, Inc.

.. _azure_monitoring_dependencies:


Installing dependencies
=======================

.. note::

  The Azure monitoring module can be configured in the Wazuh manager (which also behaves as an agent) or directly in a Wazuh agent.

.. warning::
  The Wazuh manager includes all dependencies installed, these steps are only necessary when configuring the integration in a Wazuh agent.


Python
------

The Azure module requires Python 3. It is compatible with Python 3.7 and above.

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         # yum update && yum install python3

   .. group-tab:: APT

      .. code-block:: console

         # apt-get update && apt-get install python3


The required modules can be installed with Pip, the Python package manager. Most of UNIX distributions have this tool available in their software repositories:

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         # yum update && yum install python3-pip

   .. group-tab:: APT

      .. code-block:: console

         # apt-get update && apt-get install python3-pip


It is recommended to use a pip version greater than or equal to 19.3 to ease the installation of the required dependencies.

.. tabs::

   .. group-tab:: Python 3.7 - 3.10

      .. code-block:: console

         # pip3 install --upgrade pip

   .. group-tab:: Python 3.11

      .. code-block:: console

         # pip3 install --upgrade pip --break-system-packages
   
      .. note::
         
         The ``--break-system-packages`` parameter is required to make the install on the default externally managed environment (more information on the `PEP 668 description <https://peps.python.org/pep-0668/>`_). To avoid it, the command can be executed inside a virtual environment but this would require a modification on the ``aws-s3`` script shebang to use the environment's interpreter. 

Azure Storage Blobs client library for Python
---------------------------------------------

`Azure Storage Blobs client library <https://pypi.org/project/azure-storage-blob/>`_ is the official Python library for Microsoft's Azure Blob storage.

To install the Azure Storage Blobs client library for Python, execute the following command:

.. tabs::

   .. group-tab:: Python 3.7 - 3.10

      .. code-block:: console

         # pip3 install azure-storage-blob==2.1.0 azure-storage-common==2.1.0 azure-common==1.1.25 cryptography==3.3.2 cffi==1.14.4 pycparser==2.20 six==1.14.0 python-dateutil==2.8.1 requests==2.25.1 certifi==2022.12.07 chardet==3.0.4 idna==2.9 urllib3==1.26.5 SQLAlchemy==1.3.11 pytz==2020.1

   .. group-tab:: Python 3.11

      .. code-block:: console

         # pip3 install --break-system-packages azure-storage-blob==2.1.0 azure-storage-common==2.1.0 azure-common==1.1.25 cryptography==3.3.2 cffi==1.14.4 pycparser==2.20 six==1.14.0 python-dateutil==2.8.1 requests==2.25.1 certifi==2022.12.07 chardet==3.0.4 idna==2.9 urllib3==1.26.5 SQLAlchemy==1.3.11 pytz==2020.1

      .. note::
         
         In the case of using a virtual environment, the ``--break-system-packages`` parameter should be removed from the command.
