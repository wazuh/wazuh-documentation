.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the required dependencies for using the AZURE integration in a Wazuh agent.

Installing dependencies
=======================

.. note::

  The Azure monitoring module can be configured in the Wazuh manager (which also behaves as an agent) or directly in a Wazuh agent.

.. warning::
  The Wazuh manager includes all dependencies installed, these steps are only necessary when configuring the integration in a Wazuh agent.


Python
------

The Azure module requires `Python 3 <https://www.python.org/>`__. Specifically, it's compatible with
`Python |PYTHON_CLOUD_CONTAINERS_MIN|–|PYTHON_CLOUD_CONTAINERS_MAX| <https://www.python.org/downloads/>`_. While later Python versions should work as well, we can't assure they are compatible.

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

   .. group-tab:: Python 3.7–3.10

      .. code-block:: console

         # pip3 install --upgrade pip

   .. group-tab:: Python 3.11

      .. code-block:: console

         # pip3 install --upgrade pip --break-system-packages
   
      .. note::
         
         This command modifies the default externally managed Python environment. See the `PEP 668 <https://peps.python.org/pep-0668/>`__ description for more information.
         
         To prevent the modification, you can run ``pip3 install --upgrade pip`` within a virtual environment. You must update the ``azure-logs`` script shebang with your virtual environment interpreter, for example, ``#!/path/to/your/virtual/environment/bin/python3``. 

Azure Storage client library for Python
---------------------------------------

`Azure Storage Blobs client library <https://pypi.org/project/azure-storage-blob/>`_ is the official Python library for Microsoft's Azure Blob storage.

To install the dependencies, execute the following command:

.. tabs::

   .. group-tab:: Python 3.7–3.10

      .. code-block:: console

         # pip3 install azure-storage-blob==12.19.1 SQLAlchemy==2.0.23 pytz==2020.1

   .. group-tab:: Python 3.11

      .. code-block:: console

         # pip3 install --break-system-packages azure-storage-blob==12.19.1 SQLAlchemy==2.0.23 pytz==2020.1

      .. note::
         
         If you're using a virtual environment, remove the ``--break-system-packages`` parameter from the command above.
