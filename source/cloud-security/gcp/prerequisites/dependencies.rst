.. Copyright (C) 2015, Wazuh, Inc.
.. meta::
  :description: The Wazuh GCP module allows you to fetch logs from Google Pub/Sub and Google Storage. Learn more about installing the required dependencies in this section.

.. _gcp_dependencies:

Installing dependencies
=======================

.. note::
  The GCP module can be configured in both the Wazuh manager and the agent. The choice merely depends on where you want to reach the GCP services from.

.. warning::
  The Wazuh manager includes all dependencies installed, the following steps are only necessary when configuring the integration in a Wazuh agent.


Python
------

The GCP module requires Python 3. It is compatible with Python 3.7 and above.

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

.. code-block:: console

  # pip3 install --upgrade pip

Google Cloud pip dependencies
-----------------------------

`google-cloud-pubsub <https://pypi.org/project/google-cloud-pubsub/>`_ is the official python library supported by Google to manage Google Cloud Pub/Sub resources. It is used to pull the log messages from the Pub/Sub queue.

To install the dependencies, execute the following command:

  .. code-block:: console

    # pip3 install cachetools==4.1.0 certifi==2022.12.07 cffi==1.14.4 chardet==3.0.4 charset-normalizer==2.0.4 google-api-core==1.30.0 google-auth==1.28.0 google-cloud-core==1.7.1 google-cloud-pubsub==2.7.1 google-cloud-storage==1.39.0 google-crc32c==1.1.2 google-resumable-media==1.3.1 googleapis-common-protos==1.51.0 grpc-google-iam-v1==0.12.3 grpcio==1.38.1 idna==2.9 libcst==0.3.20 mypy-extensions==0.4.3 packaging==20.9 proto-plus==1.19.0 protobuf==3.19.6 pyasn1-modules==0.2.8 pyasn1==0.4.8 pycparser==2.20 pyparsing==2.4.7 pytz==2020.1 PyYAML==5.4.1 requests==2.25.1 rsa==4.7.2 setuptools==59.6.0 six==1.14.0 typing-extensions==3.10.0.2 typing-inspect==0.7.1 urllib3==1.26.5
