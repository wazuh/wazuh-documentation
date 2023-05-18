.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the required dependencies for using the AWS integration in a Wazuh agent.

.. _amazon_dependencies:

Installing dependencies
=======================

.. warning::
  The Wazuh manager includes all dependencies installed, these steps are only necessary when configuring the integration in a Wazuh agent.

To learn more about agent cloud monitoring, check out :doc:`this section </user-manual/agents/cloud-and-container-monitoring>`.

`Boto3 <https://boto3.readthedocs.io/>`__ is the official package supported by Amazon to manage AWS resources. It is used to download the log messages from the different AWS services supported by Wazuh. The module is compatible with boto3 from ``1.13.1`` to ``1.17.85``. Future boto3 releases should maintain compatibility although it cannot be guaranteed.

To install the dependencies, execute the following command:

.. code-block:: console

  # pip3 install boto3==1.17.85
