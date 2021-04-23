.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_account_apis_authentication:

.. _cloud_apis_auth:

Authentication
==============

.. meta::
  :description: Wazuh Public API Authentication. 

Wazuh Cloud supports only API key-based authentication.

To obtain an API key:

1. Log in to the Wazuh Cloud Console.

2. Go to **Account** > **API Keys**.
  
3. Click **Generate API Key**.

4. Provide a name and click **Generate API key**.

5. Copy the generated API key and store it in a safe place.

.. note::

  The API key has no expiration, so it may be used indefinitely. You may have multiple API keys for different purposes and you can revoke them when you no longer need them.

To revoke an API key:

1. Log in to the Wazuh Cloud Console.

2. Go to **Account** > **API Keys**.

3. Click the trash icon under the Revoke column for any keys that you want to delete. 