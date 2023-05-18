.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn the steps necessary when configuring a Docker integration in a Wazuh agent, in this section of our documentation.

.. _docker_monitoring_dependencies:

Installing dependencies
=======================

.. warning::
  The Wazuh manager includes all dependencies installed, these steps are only necessary when configuring the integration in a Wazuh agent.

To learn more about agent container monitoring, check out :doc:`this section </user-manual/agents/cloud-and-container-monitoring>`.

`Python Docker library <https://pypi.org/project/docker/>`_ is the official Python library for the Docker Engine API. The Wazuh docker integration requires ``docker 4.2.0``.

To install the Python Docker Library, execute the following command:

.. code-block:: console

  # pip3 install docker==4.2.0
