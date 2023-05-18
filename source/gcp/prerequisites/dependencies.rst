.. Copyright (C) 2015, Wazuh, Inc.
.. meta::
  :description: The Wazuh GCP module allows you to fetch logs from Google Pub/Sub and Google Storage. Learn more about installing the required dependencies in this section.

.. _gcp_dependencies:

Installing dependencies
=======================

.. warning::
  The Wazuh manager includes all dependencies installed, the following steps are only necessary when configuring the integration in a Wazuh agent.

To learn more about agent cloud monitoring, check out :doc:`this section </user-manual/agents/cloud-and-container-monitoring>`.

`Google-cloud-pubsub <https://pypi.org/project/google-cloud-pubsub/>`_ is the official python library supported by Google to manage Google Cloud Pub/Sub resources. It is used to pull the log messages from the Pub/Sub queue.

To install the dependencies, execute the following command:

  .. code-block:: console

    # pip3 install google-cloud-core==1.7.1 google-cloud-pubsub==2.7.1 google-cloud-storage==1.39.0 cffi==1.14.4 chardet==3.0.4  pyparsing==2.4.7 pytz==2020.1
