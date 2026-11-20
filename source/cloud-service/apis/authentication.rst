.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh Console API authenticates requests with organization API keys sent as Bearer tokens. Learn how to create, use, and protect your API keys.

.. _cloud_apis_authentication:

Authentication
==============

The Wazuh Console API authenticates every request with an organization API key. This page explains how to get an API key, how to send it, and how to keep it secure.

Get an API key
--------------

API keys belong to your organization, not to an individual user. A request made with an API key can act on any environment of that organization. You need the Editor role to create, reveal, copy, or delete API keys.

#. In the sidebar, select **Organization**.
#. Select the **API Keys** tab.
#. Click **Create API key** and follow the steps.
#. Click **Copy API key** next to the key value to copy it.

See :doc:`API keys </cloud-service/organization/api-keys>` for details on creating, viewing, and deleting API keys.

Send the API key
----------------

Send the API key in the ``Authorization`` header of each request, using the ``Bearer`` scheme:

.. code-block:: none

   Authorization: Bearer <API_KEY>

For example, the following request gets temporary credentials to access the archive data of an environment:

.. code-block:: console

   $ curl -X POST "https://console.pro.cloud.wazuh.com/api/v1/platform/environments/<CLOUD_ID>/storage/credentials" \
     -H "Authorization: Bearer <API_KEY>" \
     -H "Content-Type: application/json" \
     -d '{"token_expiration": 3600}'

If the API key is missing or invalid, or the environment does not belong to the organization of the API key, the API returns ``401``:

.. code-block:: json
   :class: output

   {
     "errors": {
       "detail": "Unauthorized"
     }
   }

Keep your API keys secure
-------------------------

-  API keys do not expire. They remain valid until an Editor deletes them.
-  Any Editor of your organization can reveal and copy the API keys in the console. Give the Editor role only to trusted users.
-  Store API keys in a secrets manager or in environment variables. Do not commit them to source control or share them in plain text.
-  Create a separate API key for each script or integration, with a descriptive name, so you can delete one without affecting the others.
-  Delete an API key as soon as you stop using it or suspect it is exposed.
