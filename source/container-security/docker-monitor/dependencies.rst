.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn the steps necessary when configuring a Docker integration in a Wazuh agent, in this section of our documentation.

.. _docker_monitoring_dependencies:

Installing dependencies
=======================

.. note::

  The Docker listener module can be configured in the Wazuh manager (which also behaves as an agent) or directly in a Wazuh agent.

.. warning::
  The Wazuh manager includes all dependencies installed, these steps are only necessary when configuring the integration in a Wazuh agent.


Python
------

The Docker listener module requires Python 3. It is compatible with Python 3.7 and above.

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         # yum update && yum install python3

   .. group-tab:: APT

      .. code-block:: console

         # apt-get update && apt-get install python3


It is recommended to use a pip version greater than or equal to 19.3 to ease the installation of the required dependencies.

.. code-block:: console

  # pip3 install --upgrade pip

Pip
---

The required modules can be installed with Pip, the Python package manager. Most of UNIX distributions have this tool available in their software repositories:

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         # yum update && yum install python3-pip

   .. group-tab:: APT

      .. code-block:: console

         # apt-get update && apt-get install python3-pip


Python Docker Library
---------------------

`Python Docker library <https://pypi.org/project/docker/>`_ is the official Python library for the Docker Engine API. The Wazuh docker integration requires ``docker 4.2.0``.

To install the Python Docker Library, execute the following command:

.. code-block:: console

  # pip3 install docker==4.2.0
