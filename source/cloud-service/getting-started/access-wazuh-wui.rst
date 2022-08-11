.. _cloud_wui_access:

.. meta::
  :description: Learn more about how to get started with Wazuh Cloud Service. Explore the potential of Wazuh Cloud with your 14-day free trial.


Access Wazuh WUI
================

The Wazuh WUI is a flexible and intuitive web interface. Through this WUI, you have access to the tools for mining and visualizing events, giving you a comprehensive insight into your monitored systems.

Follow these steps to access Wazuh WUI:

#. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_.
#. On the **Environments** page, select the environment you want to access.
#. Click **Open Wazuh** to open Wazuh WUI.
#. Choose from one of these methods to log in:
  
  - Log in with the default credentials. You can download them by clicking **Default credentials** on the Environments page. Then, use the `Wazuh WUI - Username` and `Wazuh WUI - Password` to log in.
  - If Single sign-on (SSO) is enabled, use your own account.
  - You can also log in with any user you already created in Wazuh WUI.

It is highly recommended for security reasons to change the default password and create your own users. 

.. note:: You can access the Wazuh WUI directly using the URL *https://<cloud_id>.cloud.wazuh.com*, where ``<cloud_id>`` is the Cloud ID of your environment.


If you have any questions about the Wazuh Cloud, see the :doc:`Cloud service FAQ </cloud-service/getting-started/starting-faq>`.

Next steps
----------

Your Wazuh Cloud environment is ready, and you can install a Wazuh agent on every endpoint to be monitored. To learn how to install agents, check the :ref:`Register agents <cloud_register_agents>` section.