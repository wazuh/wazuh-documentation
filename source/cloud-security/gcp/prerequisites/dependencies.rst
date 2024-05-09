.. Copyright (C) 2015, Wazuh, Inc.
.. meta::
  :description: Install Python and Pip on the endpoint you are performing the integration to monitor Google Cloud.

Installing dependencies
=======================

.. note::
   The integration with Google Cloud Services can be configured in the Wazuh manager (which also behaves as an agent) or directly in a Wazuh agent. This choice merely depends on how you decide to access your AWS infrastructure in your environment.

.. warning::
   
   The Wazuh server includes all dependencies installed; the following steps are only necessary when configuring the modules on a monitored endpoint.

Python
------

The GCP module requires `Python 3 <https://www.python.org/>`__. It's compatible with `Python |PYTHON_CLOUD_CONTAINERS_MIN|–|PYTHON_CLOUD_CONTAINERS_MAX| <https://www.python.org/downloads/>`_. While later Python versions should work as well, we can't assure they are compatible.

.. include:: /_templates/cloud/python_installation.rst

.. include:: /_templates/cloud/pip_installation.rst

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
