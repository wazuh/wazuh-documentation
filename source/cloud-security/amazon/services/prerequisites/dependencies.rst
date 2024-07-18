.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The integration of AWS services with Wazuh configured on the Wazuh agent requires that certain dependencies be installed on the Wazuh agent. Learn more on this section of the documentation.

Installing dependencies
=======================

The integration of AWS services with Wazuh can be configured on the Wazuh server or the Wazuh agent. This integration requires that certain dependencies be installed on the Wazuh agent. By default, the Wazuh server has all the dependencies installed.

We outline the dependencies needed to configure the integration on a Wazuh agent installed on a Linux endpoint.

Python
------

The Wazuh module for AWS requires `Python 3 <https://www.python.org/>`__. Specifically, it's compatible with `Python |PYTHON_CLOUD_CONTAINERS_MIN|–|PYTHON_CLOUD_CONTAINERS_MAX| <https://www.python.org/downloads/>`__. While later Python versions should work as well, we can't assure they are compatible. If you do not have Python 3 already installed, run the following command to install it on the endpoint where the Wazuh agent is installed.

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         # yum update && yum install python3

   .. group-tab:: APT

      .. code-block:: console

         # apt-get update && apt-get install python3

The required modules can be installed with pip, the Python package manager. Most UNIX distributions have this tool available in their software repositories. Run the following command to install pip on your endpoint if you do not have it already installed.

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         # yum update && yum install python3-pip

   .. group-tab:: APT

      .. code-block:: console

         # apt-get update && apt-get install python3-pip

It is recommended to use a pip version greater than or equal to ``19.3`` to ease the installation of the required dependencies. Run this command to check your pip version.

.. code-block:: console

   # pip3 --version

An example output is as follows.

.. code-block:: none
   :class: output

   pip 22.0.2 from /usr/lib/python3/dist-packages/pip (python 3.10)

If your pip version is less than 19.3, run the following command to upgrade the version.

.. tabs::

   .. group-tab:: Python 3.7

      .. code-block:: console

         # pip3 install --upgrade pip

   .. group-tab:: Python 3.8–3.10

      .. code-block:: console

         # pip3 install --upgrade pip

   .. group-tab:: Python 3.11

      .. code-block:: console

         # pip3 install --upgrade pip --break-system-packages

      .. note::

         This command modifies the default externally managed Python environment. See the `PEP 668 <https://peps.python.org/pep-0668/>`__ description for more information.

         To prevent the modification, you can run ``pip3 install --upgrade pip`` within a virtual environment. You must update the Wazuh module for AWS script shebang with your virtual environment interpreter, for example, ``#!/path/to/your/virtual/environment/bin/python3``.

.. _boto-3:

AWS client library for Python
-----------------------------

`Boto3 <https://boto3.readthedocs.io/>`__ is the official package supported by Amazon to manage AWS resources. It is used to download log messages from the different AWS services supported by Wazuh. The Wazuh module for AWS is compatible with ``boto3`` from version ``1.13.1`` to ``1.17.85``. Future ``boto3`` releases should maintain compatibility although we cannot assure it.

Execute the following command to install the dependencies:

.. tabs::

   .. group-tab:: Python 3.7

      .. code-block:: console

         # pip3 install boto3==1.17.85 pyarrow==8.0.0 pyarrow_hotfix==0.5

   .. group-tab:: Python 3.8–3.10

      .. code-block:: console

         # pip3 install boto3==1.17.85 pyarrow==14.0.1

   .. group-tab:: Python 3.11

      .. code-block:: console

         # pip3 install --break-system-packages boto3==1.17.85 pyarrow==14.0.1

      .. note::

         If you're using a virtual environment, remove the ``--break-system-packages`` parameter from the command above.
