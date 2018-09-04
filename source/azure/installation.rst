.. Copyright (C) 2018 Wazuh, Inc.

.. _azure_integration:

Installation
============

The use of Wazuh integration with Microsoft Azure depends on a previous configuration and the installation of certain requirements. 

Requirementes
-------------
-	Microsoft Azure
-	Wazuh >= 3.7
-	Python >= 2.7
-	Pip
-	pytz
-	azure-storage-blob

Microsoft Azure
^^^^^^^^^^^^^^^

The `Microsoft Azure <https://azure.microsoft.com/en-us/>`_ infrastructure is mandatory. To have access to the infrastructure it will be necessary to have the authentication corresponding to the modules we want to use to obtain the logs. 

Wazuh 3.7
^^^^^^^^^

Integration with Microsoft Azure is an added capability in Wazuh version 3.7. The configuration regarding the integration by Wazuh will be implemented in the Wazuh manager with version 3.7 or higher. 

Python 2.7
^^^^^^^^^^

Part of the integration has been implemented in `Python <https://www.python.org/>`_, so we will need to have Python installed with a version 2.7 or higher. 

Pip
^^^

The correct functioning of the integration implemented in Python requires the presence of certain libraries that we will mention below. To install these libraries the easiest option is to use `Pip <https://pypi.org/project/pip/>`_. 

pytz
^^^^

One of the libraries to install is `pytz <https://pypi.org/project/pytz/>`_. pytz allows accurate and cross platform time zone calculations and allows to do date arithmetic using local times.

azure-storage-blob
^^^^^^^^^^^^^^^^^^

`azure-storage-blob <https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-python>`_ library makes it easy to use and access Microsoft Azure Storage content.

Installing dependencies
-----------------------

Python pytz and azure-storage-blob modules are required on the system running the Wazuh module to pull Microsoft Azure events. 

Pip
^^^

Pip can be used as Python package manager to install the required module. In order to use it, we will start installing this tool.


a) CentOS/RHEL/Fedora:

.. note::

        It may be necessary to enable the EPEL repository

.. code-block:: console

    # yum install python-pip

b) Debian/Ubuntu:

.. code-block:: console

    # apt-get update && apt-get install python-pip

c) From sources:

.. code-block:: console

    # curl -O https://bootstrap.pypa.io/get-pip.py
    # python get-pip.py

pytz
^^^^

.. code-block:: console

    # pip install pytz

azure-storage-blob
^^^^^^^^^^^^^^^^^^

.. code-block:: console

    # pip install azure-storage-blob


Plugin configuration
--------------------
