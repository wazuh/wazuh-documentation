.. Copyright (C) 2020 Wazuh, Inc.

.. _automatic_api:

Insert a Wazuh API entry automatically
======================================

If you want to add the Wazuh API credentials on Splunk app more quickly (for instance, for deployment purposes) you can execute the following command:

Splunk app
----------

.. code-block:: console

  # curl -X POST "http://<SPLUNK_IP>:<SPLUNK_PORT>/en-US/custom/SplunkAppForWazuh/manager/add_api?url=<WAZUH_API_URL>&portapi=<WAZUH_API_PORT>&userapi=<WAZUH_API_USERNAME>&passapi=<WAZUH_API_PASSWORD>"

**Note the following:**

1. ``<SPLUNK_IP>`` is the **hostname or IP address** of the Splunk instance where the app was installed.
2. ``<SPLUNK_PORT>`` is the **port of the Splunk instance** where the app was installed. By default, it's 8000.
3. ``<WAZUH_API_URL>``, ``<WAZUH_API_PORT>``, ``<WAZUH_API_USERNAME>`` and ``<WAZUH_API_PASSWORD>`` represent the **Wazuh API credentials** to be stored on the app. Keep in mind that the Wazuh API URL must include ``http://`` or ``https://``, depending on the current configuration.
