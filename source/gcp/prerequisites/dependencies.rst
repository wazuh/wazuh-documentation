.. Copyright (C) 2021 Wazuh, Inc.

.. _gcp_dependencies:

Installing dependencies
=======================

.. note::
  The GCP module can be configured in both Wazuh manager and agent. The choice merely depends on where do you want to reach the GCP services from.

.. warning::
  The Wazuh manager includes all dependencies installed, the following steps are only necessary when configuring the integration in a Wazuh agent.


Python
------

The module requires python 3.6 or superior compatibility.

Pip
---

The required Python modules can be installed with Pip, the Python package manager. Most of UNIX distributions have this tool available in their software repositories, but it can be compiled from sources too:

a) For **CentOS/RHEL/Fedora** systems:

.. code-block:: console

  # yum install python-pip

b) For **Debian/Ubuntu** systems:

.. code-block:: console

  # apt-get update && apt-get install python-pip

c) From sources:

.. code-block:: console

  # curl -O https://bootstrap.pypa.io/get-pip.py
  # python get-pip.py

google-cloud-pubsub
-------------------

`google-cloud-pubsub <https://pypi.org/project/google-cloud-pubsub//>`_ is the official python library supported by Google to manage Google Cloud Pub/Sub resources. It will be used to pull the log messages from the Pub/Sub queue. To install this package, execute the following command:

.. code-block:: console

  # pip install google-cloud-pubsub
