.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Register a self-hosted Wazuh deployment to your Wazuh Console organization with a one-time code to receive Wazuh CTI feeds.

.. _cloud_cti_register_deployment:

Registering a deployment
========================

Registering a deployment connects a Wazuh installation that runs on your own infrastructure to your organization in Wazuh Console, so it can receive Wazuh CTI feeds. This page describes the registration steps in the Wazuh dashboard and in Wazuh Console.

Registration starts in the Wazuh dashboard of your deployment, not in Wazuh Console. The Wazuh dashboard issues a one-time code, and you confirm that code in Wazuh Console. You don't need to run any command on your deployment.

You need the Editor role in the organization to register a deployment.

.. warning::

   Only confirm a code that you started yourself from your own Wazuh deployment. If someone sends you a registration link or gives you a code, don't confirm it. Confirming it connects their deployment to your organization.

Before you begin
----------------

-  Sign in to Wazuh Console with an account that has the Editor role in the organization that you want to register the deployment to. If you belong to more than one organization, select it in the header. See :doc:`Organization </cloud-service/organization/index>`.
-  Make sure that your Wazuh deployment can connect to Wazuh CTI over the internet.

Registering a deployment
------------------------

Starting the registration in the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Sign in to the Wazuh dashboard of your deployment.
#. Open the main menu at the top left and, under **Threat intelligence**, select **CTI Feed**. See :doc:`Navigating the Wazuh dashboard </user-manual/wazuh-dashboard/navigating-the-wazuh-dashboard>`.
#. In the **Subscription** panel, click **Register**.
#. In the dialog that opens, click **Register**.

The Wazuh dashboard opens Wazuh Console in your browser, with the code filled in.

Confirming the code in Wazuh Console
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh Console opens the **Register Deployment** dialog. It shows the name of the organization that the deployment is asking to connect to. The dialog refers to the Wazuh dashboard of your deployment as your Wazuh XDR.

#. Check that the code in **Code shown in your Wazuh XDR** matches the code shown in your Wazuh dashboard.
#. In **Deployment name (you can change it later)**, keep the suggested name or enter a name you will recognize.
#. Click **Register Deployment**.

Wazuh Console shows **Deployment registered successfully. You can go back to your terminal.** The deployment appears in the **Deployments** page.

Back in the Wazuh dashboard, the **Subscription** panel confirms the registration, and the deployment starts receiving the Open Feed.

You can also open the **Register Deployment** dialog yourself and enter the code by hand:

#. In the sidebar, under **CTI**, select **Deployments**.
#. Click **Register Deployment**.
#. Fill in the fields and click **Register Deployment**.

To see a summary of these steps in Wazuh Console, click **See how registration works** in the **Deployments** page.

If the registration fails
-------------------------

+------------------------------------------------+-----------------------------------------------------------------+
| Message                                        | What to do                                                      |
+================================================+=================================================================+
| **not found**, under the code field            | The code is wrong. Check the code, or start the registration    |
|                                                | again in the Wazuh dashboard to get a fresh code.               |
+------------------------------------------------+-----------------------------------------------------------------+
| **already granted**, under the code field      | The code was already used. Start the registration again in the  |
|                                                | Wazuh dashboard to get a fresh code.                            |
+------------------------------------------------+-----------------------------------------------------------------+
| **already denied**, under the code field       | The code was rejected. Start the registration again in the      |
|                                                | Wazuh dashboard to get a fresh code.                            |
+------------------------------------------------+-----------------------------------------------------------------+
| **Deployment already exists.**                 | The deployment is already registered. Find it in the            |
|                                                | **Deployments** page.                                           |
+------------------------------------------------+-----------------------------------------------------------------+

Next steps
----------

The registered deployment receives the Open Feed. To upgrade it to the Professional Feed, buy a feed subscription and assign it to the deployment. See :doc:`Feeds </cloud-service/cti/feeds>` and :doc:`Managing deployments </cloud-service/cti/deployments>`.
