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

The GCP module requires python 3. It is compatible with python versions from `3.6.0` to `3.9.5`. Future python releases should maintain compatibility although it cannot be guaranteed.

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


Google cloud pip dependencies
-----------------------------

`google-cloud-pubsub <https://pypi.org/project/google-cloud-pubsub//>`_ is the official python library supported by Google to manage Google Cloud Pub/Sub resources. It will be used to pull the log messages from the Pub/Sub queue. Depending on the Wazuh version used, it is necessary to install a different ``google-cloud-pubsub`` version.

1. For Wazuh versions greater or equal to ``4.2.2``:

.. code-block:: console

  # pip install google-cloud-pubsub==2.7.1

2. For older versions:

.. code-block:: console

  # pip install google-cloud-pubsub==1.4.3

To install the rest of the dependencies, execute the following command:

.. code-block:: console

  # pip3 install google-api-core==1.30.0 google-auth==1.28.0 google-cloud-core==1.7.1 google-cloud-storage==1.39.0 google-crc32c==1.1.2 google-resumable-media==1.3.1 googleapis-common-protos==1.51.0 grpc-google-iam-v1==0.12.3 grpcio==1.38.1 pytz==2020.1