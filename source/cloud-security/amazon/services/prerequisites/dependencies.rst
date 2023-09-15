.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the required dependencies for using the AWS integration in a Wazuh agent.

.. _amazon_dependencies:

Installing dependencies
=======================

.. note::
  The integration with AWS S3 can be configured in the Wazuh manager (which also behaves as an agent) or directly in a Wazuh agent. This choice merely depends on how you decide to access your AWS infrastructure in your environment.

.. warning::
  The Wazuh manager includes all dependencies installed, these steps are only necessary when configuring the integration in a Wazuh agent.


Python
------

The AWS module requires Python 3. It is compatible with Python 3.7 and above.

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         # yum update && yum install python3

   .. group-tab:: APT

      .. code-block:: console

         # apt-get update && apt-get install python3


The required modules can be installed with Pip, the Python package manager. Most UNIX distributions have this tool available in their software repositories:

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         # yum update && yum install python3-pip

   .. group-tab:: APT

      .. code-block:: console

         # apt-get update && apt-get install python3-pip

It is recommended to use a pip version greater than or equal to 19.3 to ease the installation of the required dependencies.

.. tabs::

   .. group-tab:: Python 3.7 - 3.10

      .. code-block:: console

         # pip3 install --upgrade pip

   .. group-tab:: Python 3.11

      .. code-block:: console

         # pip3 install --upgrade pip --break-system-packages
   
      .. note::
         
         The ``--break-system-packages`` parameter is required to make the install on the default externally managed environment (more information on the `PEP 668 description <https://peps.python.org/pep-0668/>`_). To avoid it, the command can be executed inside a virtual environment but this would require a modification on the ``aws-s3`` script shebang to use the environment's interpreter. 


.. _boto-3:

AWS pip dependencies
-----------------------

`Boto3 <https://boto3.readthedocs.io/>`_ is the official package supported by Amazon to manage AWS resources. It is used to download the log messages from the different AWS services supported by Wazuh. The module is compatible with boto3 from ``1.13.1`` to ``1.17.85``. Future boto3 releases should maintain compatibility although it cannot be guaranteed.

To install the dependencies, execute the following command:

.. tabs::

   .. group-tab:: Python 3.7 - 3.10

      .. code-block:: console

         # pip3 install boto3==1.17.85 botocore==1.20.85 jmespath==0.9.5 python-dateutil==2.8.1 six==1.14.0 urllib3==1.26.5 s3transfer==0.4.2 pyarrow==8.0.0
   
   .. group-tab:: Python 3.11

      .. code-block:: console

         # pip3 install --break-system-packages boto3==1.17.85 botocore==1.20.85 jmespath==0.9.5 python-dateutil==2.8.1 six==1.14.0 urllib3==1.26.5 s3transfer==0.4.2 pyarrow==13.0.0

      .. note::
         
         In the case of using a virtual environment, the ``--break-system-packages`` parameter should be removed from the command.
