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

The GCP module requires `Python 3 <https://www.python.org/>`__. Specifically, it's compatible with
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
         
         To prevent the modification, you can run ``pip3 install --upgrade pip`` within a virtual environment. You must update the ``gcloud`` script shebang with your virtual environment interpreter, for example, ``#!/path/to/your/virtual/environment/bin/python3``.  

Google Cloud client library for Python
--------------------------------------

`google-cloud-pubsub <https://pypi.org/project/google-cloud-pubsub/>`_ is the official python library supported by Google to manage Google Cloud Pub/Sub resources. It is used to pull the log messages from the Pub/Sub queue.

To install the dependencies, execute the following command:

.. tabs::

   .. group-tab:: Python 3.7–3.10

      .. code-block:: console

         # pip3 install google-cloud-core==1.7.1 google-cloud-pubsub==2.7.1 google-cloud-storage==1.39.0 pytz==2020.1 setuptools==68.0.0
   
   .. group-tab:: Python 3.11

      .. code-block:: console

         # pip3 install --break-system-packages google-cloud-core==1.7.1 google-cloud-pubsub==2.7.1 google-cloud-storage==1.39.0 pytz==2020.1 setuptools==68.0.0

      .. note::
         
         If you're using a virtual environment, remove the ``--break-system-packages`` parameter from the command above.
