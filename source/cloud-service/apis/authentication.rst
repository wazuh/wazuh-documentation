.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh Cloud supports API key-based authentication. Learn how to obtain and revoke an API key directly from the Wazuh Cloud Console in this section.


.. _cloud_account_apis_authentication:

.. _cloud_apis_auth:

Authentication
==============

Wazuh Cloud supports only API key-based authentication.

To obtain an API key:

1. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_.

2. Go to the **Account** section and select **API Keys**.
  
3. Click **Generate API Key**.

4. Provide a name and click **Generate API key**.

5. Copy the generated API key and store it in a safe place.

.. note::

  The API key has no expiration date, so it can be used indefinitely. You might also have multiple API keys for different purposes, and you can revoke them when you no longer need them.

To revoke an API key:

1. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_.

2. Go to the **Account** section and select **API Keys**.

3. Click the trash icon under the **Revoke** column for any API key you want to delete.
    
4. Click **Revoke Api key** to confirm the action.
   
The deleted API is removed from the list of API keys.
