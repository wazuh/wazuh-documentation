.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn the steps necessary when configuring a Docker integration in a Wazuh agent, in this section of our documentation.

.. _docker_monitoring_dependencies:

Python
------

Docker container module require `Python 3 <https://www.python.org/>`_. It is compatible with
`Python |PYTHON_CLOUD_CONTAINERS_MIN| - |PYTHON_CLOUD_CONTAINERS_MAX| <https://www.python.org/downloads/>`_.

.. note::
   Newer Python versions should work although it is not guaranteed.

Installing dependencies
=======================

.. warning::
  The Wazuh manager includes all dependencies installed, these steps are only necessary when configuring the integration in a Wazuh agent.

`Python Docker library <https://pypi.org/project/docker/>`_ is the official Python library for the Docker Engine API. The Wazuh docker integration requires ``docker 4.2.0``.

To install the Python Docker Library, execute the following command:

.. code-block:: console

  # pip3 install docker==4.2.0

To learn more, see the :doc:`Cloud and container monitoring </user-manual/agents/cloud-and-container-monitoring>` section under the Agent management.