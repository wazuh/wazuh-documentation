.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_apis_examples:

API Examples
============

.. meta::
  :description: Learn about Wazuh Cloud RESTful API with some examples

Storage Endpoint
----------------

:cloud-api-ref:`POST /storage/token <tag/storage/paths/~1storage~1token/post>`


Payload:

.. code-block:: console

   {
       "token_expiration": 3600,
       "environment_id": 13245356356
   }

Response samples:

200 Successful:

.. code-block:: console

   {
       "environment_id": "0123456789ab",
       "credentials": {
           "access_key_id": "mUdT2dBjlHd...Gh7NniyZKR5If",
	   "secret_acces_key": "qEzCk63a224...5aB+e4fCDBR0G",
	   "session_token": "MRgpt7HIuoA...4o4BXSAcPfUD8",
	   "expires_in": 3600
       }
   }

