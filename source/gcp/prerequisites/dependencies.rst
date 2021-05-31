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

The GCP module requires python 3. It is compatible with python versions from `3.6.0` to `3.9.5`.  Future python releases should maintain compatibility although it cannot be guaranteed.

a) For **CentOS/RHEL/Fedora** systems:

.. code-block:: console

  # yum update && yum install python3

b) For **Debian/Ubuntu** systems:

.. code-block:: console

  # apt-get update && apt-get install python3


Pip
---

The required Python modules can be installed with Pip, the Python package manager. Most of UNIX distributions have this tool available in their software repositories, but it can be compiled from sources too:

A) For **CentOS/RHEL/Fedora** systems:

a. Using ``yum``:

.. code-block:: console

  # yum update && yum install python3-pip

b. From sources:

.. code-block:: console

  # yum update && yum install curl python3-distutils
  # curl -O https://bootstrap.pypa.io/get-pip.py
  # python3 get-pip.py


B) For **Debian/Ubuntu** systems:

a. Using ``apt-get``:

.. code-block:: console

  # apt-get update && apt-get install python3-pip

b. From sources:

.. code-block:: console

  # apt-get update && apt-get install curl python3-distutils
  # curl -O https://bootstrap.pypa.io/get-pip.py
  # python3 get-pip.py


Google cloud pip dependencies
-----------------------------

`google-cloud-pubsub <https://pypi.org/project/google-cloud-pubsub//>`_ is the official python library supported by Google to manage Google Cloud Pub/Sub resources. It will be used to pull the log messages from the Pub/Sub queue. Wazuh supports google-cloud-pubsub up to 1.4.3.

`google-cloud-pubsub <https://pypi.org/project/google-cloud-pubsub//>`_ is the official python library supported by Google to manage Google Cloud Pub/Sub resources. It will be used to pull the log messages from the Pub/Sub queue. Depending on the Wazuh version used, it is necessary to install a different ``google-cloud-pubsub`` version.

1. For Wazuh versions greater or equal to ``4.2.2``:

.. code-block:: console

  # pip install google-cloud-pubsub==2.7.1

2. For older versions:

.. code-block:: console

  # pip install google-cloud-pubsub==1.4.3
