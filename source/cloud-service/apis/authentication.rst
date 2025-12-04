.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh Cloud supports API key-based authentication. Learn how to obtain and revoke an API key directly from the Wazuh Cloud Console in this section.

Authentication
==============

Wazuh Cloud supports only API key-based authentication.

To obtain a Wazuh Cloud API key:

#. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_.
#. Go to the **Account** section and select **API Keys**.
#. Click **Generate API Key**.
#. Provide a name and click **Generate API key**.
#. Copy the generated API key and store it in a safe place.

.. note::

   The API key has no expiration date, so it can be used indefinitely. You might also have multiple API keys for different purposes, and you can revoke them when you no longer need them.

To revoke an API key:

#. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_.
#. Go to the **Account** section and select **API Keys**.
#. Click the trash icon under the **Revoke** column for any API key you want to delete.
#. Click **Revoke Api key** to confirm the action.

The deleted API is removed from the list of API keys.
