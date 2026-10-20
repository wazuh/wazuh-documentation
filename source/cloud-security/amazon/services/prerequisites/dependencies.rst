.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Integrating AWS services with the Wazuh agent requires certain dependencies to be installed on the agent.

Install dependencies
====================

You can configure the integration of AWS services with Wazuh on a Wazuh agent installed on a Linux endpoint. To run the integration on the Wazuh manager host, install a Wazuh agent on that host.

Install the following dependencies on the Linux endpoint where the Wazuh agent runs.

Python
------

The Wazuh module for AWS is compatible with Python 3.8–3.14. Later `Python versions <https://www.python.org/downloads/>`__ might also work, but we can't guarantee they're compatible. If you do not have Python 3 already installed, run the following command on the Wazuh agent endpoint.

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         # yum update && yum install python3

   .. group-tab:: APT

      .. code-block:: console

         # apt-get update && apt-get install python3

You can install the required modules with pip, the Python package manager. Most UNIX distributions have this tool available in their software repositories. If pip isn't installed, run the following command on the Wazuh agent endpoint to install it.

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         # yum update && yum install python3-pip

   .. group-tab:: APT

      .. code-block:: console

         # apt-get update && apt-get install python3-pip

We recommend using pip ``19.3`` or later to simplify the installation of the dependencies. Run this command to check your pip version.

.. code-block:: console

   $ pip3 --version

An example output is as follows.

.. code-block:: none
   :class: output

   pip 22.0.2 from /usr/lib/python3/dist-packages/pip (python 3.10)

If your pip version is earlier than ``19.3``, run the following command to upgrade the version.

.. tabs::

   .. group-tab:: Python 3.8–3.10

      .. code-block:: console

         # pip3 install --upgrade pip

   .. group-tab:: Python 3.11–3.14

      .. code-block:: console

         # pip3 install --upgrade pip --break-system-packages

      .. note::

         This command modifies the default externally managed Python environment. See the `PEP 668 <https://peps.python.org/pep-0668/>`__ description for more information.

         To prevent the modification, you can run ``pip3 install --upgrade pip`` within a virtual environment. You must update the shebang of the ``/var/ossec/wodles/aws/aws-s3`` Python script with your virtual environment interpreter, for example, ``#!/path/to/your/virtual/environment/bin/python3``.

.. _boto-3:

AWS client library for Python
-----------------------------

`Boto3 <https://docs.aws.amazon.com/boto3/latest/>`__ is the official package supported by Amazon to manage AWS resources. It is used to download log messages from the different AWS services supported by Wazuh. The Wazuh module for AWS is tested with ``boto3`` version ``1.34.135``, the version used in the commands below. Later boto3 releases are likely to stay compatible, but we can't guarantee it.

Run the following command on the Wazuh agent endpoint to install the dependencies:

.. tabs::

   .. group-tab:: Python 3.8–3.10

      .. code-block:: console

         # pip3 install boto3==1.34.135 pyarrow==14.0.1 numpy==1.26.0

   .. group-tab:: Python 3.11–3.12

      .. code-block:: console

         # pip3 install --break-system-packages boto3==1.34.135 pyarrow==14.0.1 numpy==1.26.0

      .. note::

         If you're using a virtual environment, remove the ``--break-system-packages`` parameter from the command above.

   .. group-tab:: Python 3.13–3.14

      .. code-block:: console

         # pip3 install --break-system-packages "numpy==2.3.3" "pyarrow==22.0.0" "boto3==1.34.135"

      .. note::

         If you're using a virtual environment, remove the ``--break-system-packages`` parameter from the command above.
