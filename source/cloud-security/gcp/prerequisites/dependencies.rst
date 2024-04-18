.. Copyright (C) 2015, Wazuh, Inc.
.. meta::
  :description: Install Python and Pip on the endpoint you are performing the integration to monitor Google Cloud.

Installing dependencies
=======================

The Wazuh module for Google Cloud Pub/Sub and the Wazuh module for Google Cloud Storage buckets can be configured on both the Wazuh server and the monitored endpoint. This choice depends on where you want to reach the Google Cloud services. Perform the steps below to install Python and Pip on the endpoint you are performing the integration.

.. warning::
   
   The Wazuh server includes all dependencies installed; the following steps are only necessary when configuring the modules on a monitored endpoint.

Python
------

The Wazuh module for Google Cloud Pub/Sub and the Wazuh module for Google Cloud Storage buckets require `Python 3 <https://www.python.org/>`__. It's compatible with
`Python |PYTHON_CLOUD_CONTAINERS_MIN|–|PYTHON_CLOUD_CONTAINERS_MAX| <https://www.python.org/downloads/>`_. While later Python versions should work as well, we can't assure they are compatible.

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

   .. group-tab:: Python 3.8–3.10

      .. code-block:: console

         $ sudo pip3 install --upgrade pip

   .. group-tab:: Python 3.11

      .. code-block:: console

         $ sudo pip3 install --upgrade pip --break-system-packages
      
      .. note::

         This command modifies the default externally managed Python environment. See the `PEP 668 <https://peps.python.org/pep-0668/>`__ description for more information.
         
         To prevent the modification, you can run ``pip3 install --upgrade pip`` within a virtual environment. You must update the gcloud ``var/ossec/wodles/gcloud/gcloud`` module shebang with your virtual environment interpreter. For example: ``#!</path/to/your/virtual/environment>/bin/python3``.

Google Cloud pip dependencies
-----------------------------

`google-cloud-pubsub <https://pypi.org/project/google-cloud-pubsub/>`__ and `google-cloud-storage <https://pypi.org/project/google-cloud-storage/>`__ are the official Python libraries supported by Google to manage Google Cloud Pub/Sub and Cloud Storage resources. 

Google Cloud Pub/Sub API is used to pull the log messages from the Pub/Sub queue, while Google Cloud Storage API is used to store and retrieve data.

Run the following command to install the dependencies depending on your Python version:

.. tabs::

   .. group-tab:: Python 3.8–3.10

      .. code-block:: console

         $ sudo pip3 install google-cloud-core==1.7.1 google-cloud-pubsub==2.7.1 google-cloud-storage==1.39.0 pytz==2020.1 setuptools==68.0.0
   
   .. group-tab:: Python 3.11

      .. code-block:: console

         $ sudo pip3 install --break-system-packages google-cloud-core==1.7.1 google-cloud-pubsub==2.7.1 google-cloud-storage==1.39.0 pytz==2020.1 setuptools==68.0.0

      .. note::
         
         If you're using a virtual environment, remove the ``--break-system-packages`` parameter from the command above.
