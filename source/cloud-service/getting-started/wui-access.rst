.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_getting_started_wui_access:

Access Wazuh WUI
================

.. meta::
  :description: Learn about how to access Wazuh WUI. 

The Wazuh WUI is a flexible and intuitive web interface. Through this WUI, you have access to the tools for mining and visualizing events, giving you comprehensive insight into your monitored systems.

Follow these steps to access Wazuh WUI:

1. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_.
2. On the **Environments** page, select the environment you want to access.
3. Click **Open Wazuh** to open Wazuh WUI:
4. Choose from one of these methods to log in:
  
  - Log in with the default credentials. You can download them by clicking **Default credentials** on the Environments page. Then, use the `Wazuh WUI - Username` and `Wazuh WUI - Password` to log in.
  - If Single sign-on (SSO) is enabled, use your own account.
  - You can also log in with any user you already created in Wazuh WUI already.

It is highly recommmended for security reasons to change the default password and crate your own users. 

.. note:: You can access the Wazuh WUI directly using the URL ``https://<cloud_id>.cloud.wazuh.com``, where ``<cloud_id>`` is your Cloud ID.