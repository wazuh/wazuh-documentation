.. _cloud_wui_access:

.. meta::
  :description: Learn more about how to get started with Wazuh Cloud Service. Explore the potential of Wazuh Cloud with your 14-day free trial.


Access Wazuh WUI
================

The Wazuh WUI is a flexible and intuitive web interface. Through this WUI, you have access to visualized tools that gives you a comprehensive insight into your monitored endpoints.

Follow these steps to access Wazuh WUI:

#. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_.
#. Select the environment you want to access from the **Environments** page.
#. Click **Open Wazuh** to open Wazuh WUI.
#. Choose from one of these methods to log in:
  
  - Log in with the default credentials. You can view them by clicking the **Manage** button and selecting **Default credentials** on the environments page. These credentials will grant you access to the Wazuh WUI. 
  - If Single sign-on (SSO) is enabled, use your own account.
  - You can also log in with any user you created in Wazuh WUI.

It is highly recommended for security reasons to change the default password and create your own users. 

  .. note:: You can access the Wazuh WUI directly using the URL *https://<CLOUD_ID>.cloud.wazuh.com*, where ``<CLOUD_ID>`` is the Cloud ID of your environment.


If you have any questions about the Wazuh Cloud, see the :doc:`Cloud service FAQ </cloud-service/getting-started/starting-faq>`.

Next steps
----------

Your Wazuh Cloud environment is ready, and you can install the Wazuh agent on the endpoint you want to monitor. Check out the :ref:`Enroll agents <cloud_register_agents>` section to learn how to install agents.