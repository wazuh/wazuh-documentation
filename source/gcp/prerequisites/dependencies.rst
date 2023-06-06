.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh GCP module allows you to fetch logs from Google Pub/Sub and Google Storage. Learn more about installing the required dependencies in this section.

.. _gcp_dependencies:

Python
------

GCP module require `Python 3 <https://www.python.org/>`_. It is compatible with
`Python |PYTHON_CLOUD_CONTAINERS_MIN| - |PYTHON_CLOUD_CONTAINERS_MAX| <https://www.python.org/downloads/>`_.

.. note::
   Newer Python versions should work although it is not guaranteed.

Installing dependencies
=======================

.. warning::
  The Wazuh manager includes all dependencies installed, the following steps are only necessary when configuring the integration in a Wazuh agent.

`Google-cloud-pubsub <https://pypi.org/project/google-cloud-pubsub/>`_ is the official python library supported by Google to manage Google Cloud Pub/Sub resources. It is used to pull the log messages from the Pub/Sub queue.

To install the necessary dependencies, execute the following command:

.. code-block:: console

  # pip3 install google-cloud-core==1.7.1 google-cloud-pubsub==2.7.1 google-cloud-storage==1.39.0 pytz==2020.1

To learn more, see the :doc:`Cloud and container monitoring </user-manual/agents/cloud-and-container-monitoring>` section under the Agent management.