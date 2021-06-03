.. Copyright (C) 2021 Wazuh, Inc.

.. _docker_monitoring_dependencies:


Installing dependencies
=======================

.. note::

  The Docker listener module can be configured in the Wazuh manager (which also behaves as an agent) or directly in a Wazuh agent.

.. warning::
  The Wazuh manager includes all dependencies installed, these steps are only necessary when configuring the integration in a Wazuh agent.


Python
------

The Docker listener module requires python 3. It is compatible with python versions from `3.6.0` to `3.9.5`.  Future python releases should maintain compatibility although it cannot be guaranteed.

a) For CentOS/RHEL/Fedora systems:

.. code-block:: console

  # yum update && yum install python3

b) For Debian/Ubuntu systems:

.. code-block:: console

  # apt-get update && apt-get install python3


Pip
---

The required modules can be installed with Pip, the Python package manager. Most of UNIX distributions have this tool available in their software repositories:

a) For CentOS/RHEL/Fedora systems:

.. code-block:: console

  # yum update && yum install python3-pip


b) For Debian/Ubuntu systems:

.. code-block:: console

  # apt-get update && apt-get install python3-pip


Python Docker Library
---------------------

`Python Docker library <https://pypi.org/project/docker/>`_ is the official Python library for the Docker Engine API. The Wazuh docker integration requires ``docker 4.2.0``.

To install the Python Docker Library, execute the following command:

.. code-block:: console

  # pip3 install docker==4.2.0
