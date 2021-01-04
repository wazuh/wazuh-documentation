.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_apis:

RESTful API
===========

.. meta::
  :description: Learn about Wazuh Cloud RESTful API

Wazuh Cloud Service provides a RESTful API that allows interaction with your environments, such as :ref:`accessing cold storage<cloud_your_environment_accessing_cold_storage>`, from a command line tool like cURL or any script or program able to make HTTP requests.

.. _cloud_apis_auth:

Authentication
--------------

From the Wazuh Cloud Console an API key can be generated.

1- Go to **Account** > **API Keys** > **Generate API Key**.

2- Save the API key for its subsequent use. It will not be shown again.


Using the API
-------------

Use the desired endpoint by making a request to it. The following reference describes the requests which can be done.

   .. toctree::
      :maxdepth: 1
		 
      reference
