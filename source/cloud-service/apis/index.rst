.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh Console API lets you automate operations on your Wazuh Cloud environments, such as getting credentials to download archive data.

.. _cloud_apis:

Wazuh Console API
=================

The Wazuh Console API lets you automate operations on the Wazuh Cloud environments of your organization. This section explains how to authenticate and where to find the endpoint reference.

The Wazuh Console API offers the following operation:

-  **Archive data credentials**: Request temporary AWS credentials to list and download the archive data of an environment. See :doc:`Access archive data </cloud-service/archive-data/access>`.

All endpoints share the following base URL:

.. code-block:: none

   https://console.cloud.wazuh.com/api/v1

Requests and responses use JSON. Each request authenticates with an organization API key. See :doc:`Authentication </cloud-service/apis/authentication>`.

.. toctree::
   :maxdepth: 1

   authentication
   reference
