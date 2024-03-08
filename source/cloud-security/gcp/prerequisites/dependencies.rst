.. Copyright (C) 2015, Wazuh, Inc.
.. meta::
  :description: 

Installing dependencies
=======================

The Wazuh module for Google Cloud Pub/Sub and the Wazuh module for Google Cloud Storage buckets can be configured on both the Wazuh server and the monitored endpoint. This choice depends on where you want to reach the Google Cloud services. Perform the steps below to install Python and Pip on the endpoint you are performing the integration.

.. warning::
   
   The Wazuh server includes all dependencies installed; the following steps are only necessary when configuring the modules on a monitored endpoint.

Python
------

The Wazuh module for Google Cloud Pub/Sub and the Wazuh module for Google Cloud Storage buckets require Python 3. It is compatible with Python 3.7 and above. 

Run the following command to install Python 3 if you do not already have it installed:

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         $ sudo yum update && yum install python3

   .. group-tab:: APT

      .. code-block:: console

         $ sudo apt-get update && apt-get install python3

Run the command below to install Pip, the Python package manager. Most UNIX distributions have this tool available in their software repositories by default.

Perform the next steps if you do not already have it installed.

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         $ sudo yum update && yum install python3-pip

   .. group-tab:: APT

      .. code-block:: console

         $ sudo apt-get update && apt-get install python3-pip

If you already have Python3 and Pip installed, perform the following steps to upgrade your Pip version. We recommend using a pip version greater than or equal to 19.3 to ease the installation of the required dependencies.

.. tabs::

   .. group-tab:: Python 3.11

      .. code-block:: console

         $ sudo pip3 install --upgrade pip --break-system-packages
      
      .. note::

         This command modifies the default externally managed Python environment. See the `PEP 668 <https://peps.python.org/pep-0668/>`__ description for more information.

         To prevent the modification, you can run ``pip3 install --upgrade pip`` within a virtual environment. You must update the gcloud ``var/ossec/wodles/gcloud/gcloud`` module shebang with your virtual environment interpreter. For example: ``#!</path/to/your/virtual/environment>/bin/python3``.

   .. group-tab:: Python 3.7–3.10

      .. code-block:: console

         $ sudo pip3 install --upgrade pip

Google Cloud pip dependencies
-----------------------------

`google-cloud-pubsub <https://pypi.org/project/google-cloud-pubsub/>`__ and `google-cloud-storage <https://pypi.org/project/google-cloud-storage/>`__ are the official Python libraries supported by Google to manage Google Cloud Pub/Sub and Cloud Storage resources. 

Google Cloud Pub/Sub API is used to pull the log messages from the Pub/Sub queue, while Google Cloud Storage API is used to store and retrieve data.

Run the following command to install the dependencies depending on your Python version:

.. tabs::

   .. group-tab:: Python 3.11

      .. note::
         
         If you're using a virtual environment, remove the ``--break-system-packages`` parameter from the command below.
      
      .. code-block:: console

         $ sudo pip3 install --break-system-packages cachetools==4.1.0 certifi==2022.12.07 cffi==1.15.1 chardet==3.0.4 charset-normalizer==2.0.4 google-api-core==1.30.0 google-auth==1.28.0 google-cloud-core==1.7.1 google-cloud-pubsub==2.7.1 google-cloud-storage==1.39.0 google-crc32c==1.1.2 google-resumable-media==1.3.1 googleapis-common-protos==1.51.0 grpc-google-iam-v1==0.12.3 grpcio==1.38.1 idna==2.9 libcst==0.3.20 mypy-extensions==0.4.3 packaging==20.9 proto-plus==1.19.0 protobuf==3.19.6 pyasn1-modules==0.2.8 pyasn1==0.4.8 pycparser==2.20 pyparsing==2.4.7 pytz==2020.1 PyYAML==6.0.1 requests==2.25.1 rsa==4.7.2 setuptools==59.6.0 six==1.14.0 typing-extensions==3.10.0.2 typing-inspect==0.7.1 urllib3==1.26.5

   .. group-tab:: Python 3.7–3.10
      
      .. code-block:: console

         $ sudo pip3 install cachetools==4.1.0 certifi==2022.12.07 cffi==1.15.1 chardet==3.0.4 charset-normalizer==2.0.4 google-api-core==1.30.0 google-auth==1.28.0 google-cloud-core==1.7.1 google-cloud-pubsub==2.7.1 google-cloud-storage==1.39.0 google-crc32c==1.1.2 google-resumable-media==1.3.1 googleapis-common-protos==1.51.0 grpc-google-iam-v1==0.12.3 grpcio==1.38.1 idna==2.9 libcst==0.3.20 mypy-extensions==0.4.3 packaging==20.9 proto-plus==1.19.0 protobuf==3.19.6 pyasn1-modules==0.2.8 pyasn1==0.4.8 pycparser==2.20 pyparsing==2.4.7 pytz==2020.1 PyYAML==5.4.1 requests==2.25.1 rsa==4.7.2 setuptools==59.6.0 six==1.14.0 typing-extensions==3.10.0.2 typing-inspect==0.7.1 urllib3==1.26.5