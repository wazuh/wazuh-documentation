.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Open the Wazuh dashboard of your Wazuh Cloud environment from Wazuh Console, log in with the default credentials, and change the default password.

.. _cloud_getting_started_access_wazuh_wui:

Accessing the Wazuh dashboard
=============================

Each Wazuh Cloud environment includes a Wazuh dashboard, the web interface where you monitor your endpoints, investigate alerts, and configure Wazuh. This page explains how to open it from Wazuh Console, log in for the first time, and change the default password.

Opening the Wazuh dashboard
---------------------------

The environment must be **Active** to open its Wazuh dashboard.

#. Log in to `Wazuh Console <https://console.cloud.wazuh.com>`__.
#. In the sidebar, under **Wazuh Cloud**, select **Environments**.
#. Select **Open XDR** on the environment card. You can also open the environment and select **Open XDR** on its details page, or select **Open XDR** in the options menu of the table view.

The Wazuh dashboard opens in a new browser tab.

You can also open the Wazuh dashboard directly at ``https://<CLOUD_ID>.cloud.wazuh.com``, where ``<CLOUD_ID>`` is the identifier of your environment. To use your own domain name, see :doc:`Custom DNS </cloud-service/your-environment/custom-dns>`.

Getting the default credentials
-------------------------------

Wazuh creates a default user with super user access for each environment. To see its credentials:

#. In the sidebar, under **Wazuh Cloud**, select **Environments**.
#. Open the options menu of the environment and select **See credentials**. On the environment details page, select **See credentials**.
#. In the **Default Credentials** window, copy the **Username** and **Password**.
#. Select **Close**.

The credentials are available once the environment is active. Any member of your organization can see them.

.. note::

   Your Wazuh Console account doesn't give you access to the Wazuh dashboard. Log in to the Wazuh dashboard with the default credentials or with a Wazuh dashboard user you create. Wazuh Cloud doesn't support single sign-on (SSO) for the Wazuh dashboard.

Changing the default password
-----------------------------

The default user has super user access. We strongly recommend changing its password the first time you log in. Once you change it, the default password stops working.

#. Open the Wazuh dashboard and log in with the default credentials.
#. Select the user icon in the upper-right corner and select **Reset password**.
#. Enter the **Current password**, then enter and confirm the password you want to use.
#. Select **Reset**.

We also recommend creating a Wazuh dashboard user for each person who needs access, instead of sharing the default user. In the Wazuh dashboard, go to **Indexer management** > **Users and data access** > **Internal users**. See :doc:`Authentication and authorization </cloud-service/your-environment/manage-auth>`.

Next steps
----------

Your environment is ready. :doc:`Enroll Wazuh agents </cloud-service/getting-started/enroll-agents>` on the endpoints you want to monitor.
