.. Copyright (C) 2018 Wazuh, Inc.

.. _azure_integration:

Manager Requirements
=====================

.. meta::
  :description: Detailed instructions to install and configure the necessary dependencies to monitor Microsoft Azure instances with Wazuh.

The Wazuh manager is in charge of carrying out the integration with Microsoft Azure when monitoring infrastructure activity services. In order to work properly, the integration requires the installation of some dependencies.

Required dependencies
---------------------

- Microsoft Azure
- Wazuh >= v3.7.0
- Python >= v2.7
- Pip
- pytz
- azure-storage-blob

Microsoft Azure
^^^^^^^^^^^^^^^

The `Microsoft Azure <https://azure.microsoft.com/en-us/>`_ infrastructure is mandatory. To have access to the infrastructure it will be necessary to have the credentials corresponding to the modules we want to use to obtain the logs.

Wazuh v3.7.0
^^^^^^^^^^^^

The Microsoft Azure integration is available since Wazuh v.3.7.0. If you need to update your Wazuh installation, check out the :ref:`upgrading section <upgrading_wazuh>`

Python 2.7
^^^^^^^^^^

Part of the integration has been implemented in `Python <https://www.python.org/>`_ so we will need to install at least the ``2.7`` version or higher.

Pip
^^^

We'll use `Pip <https://pypi.org/project/pip/>`_, the Python package tool, to install all the neccesary libraries and dependencies for the Azure integration.

pytz
^^^^

The `pytz <https://pypi.org/project/pytz/>`_ library allows accurate and cross platform time zone calculations and date arithmetic using local times.

azure-storage-blob
^^^^^^^^^^^^^^^^^^

The `azure-storage-blob <https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-python>`_ library makes easy to use and access Microsoft Azure Storage content.

Installing the dependencies
---------------------------

The ``pytz`` and ``azure-storage-blob`` modules are required on the system running the Wazuh module to pull Microsoft Azure events.

Pip
^^^

You can install ``pip`` on RPM or DEB based Operating Systems, or compile it from sources too. Follow these instructions according to your needs:

a) CentOS/RHEL/Fedora:

  .. code-block:: console

      # yum install python-pip

  .. note:: It may be necessary to enable the EPEL repository. Read more about it on the `Fedora wiki <https://fedoraproject.org/wiki/EPEL>`_.

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
