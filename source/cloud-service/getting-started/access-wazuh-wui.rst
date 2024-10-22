.. meta::
   :description: The Wazuh dashboard has a flexible and intuitive web interface. Follow these steps to access the Wazuh dashboard.

Access the Wazuh dashboard
==========================

The Wazuh dashboard has a flexible and intuitive web interface. Through this dashboard, you have access to visualizations that give you a comprehensive insight into your monitored endpoints.

Follow these steps to access the Wazuh dashboard:

#. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`__.
#. Select the environment you want to access from the **Environments** page.
#. Click **Open Wazuh** to open the Wazuh dashboard.
#. Choose from one of these methods to log in:

   -  Log in with the default credentials. You can view them by clicking the **Manage** button and selecting **Default credentials** on the environments page. These credentials will grant you access to the Wazuh dashboard.
   -  If Single sign-on (SSO) is enabled, use your own account.
   -  You can also log in with any user you created in the Wazuh dashboard.

It is highly recommended for security reasons to change the default password and create your own users.

Follow these steps to reset the default credentials to connect to the Wazuh dashboard:

#. Log in to the Wazuh dashboard with the default credentials.
#. Click the wazuh_admin user on the top right corner.
#. Click **Reset password**.
#. On the Reset password page, fill in the current password and new password.
#. Click **Reset**.

.. note::

   You can access the Wazuh dashboard directly using the URL *https://<CLOUD_ID>.cloud.wazuh.com*, where ``<CLOUD_ID>`` is the Cloud ID of your environment.

If you have any questions about the Wazuh Cloud, see the :doc:`Cloud service FAQ <starting-faq>`.

Next steps
----------

Your Wazuh Cloud environment is ready, and you can install the Wazuh agent on the endpoint you want to monitor. Check out the :doc:`Enroll agents <enroll-agents>` section to learn how to install agents.