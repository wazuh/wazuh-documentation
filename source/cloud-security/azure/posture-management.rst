.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Use Wazuh to monitor Microsoft Azure security posture.

Cloud Security Posture Management
=================================

Cloud Security Posture Management (CSPM) is essential to ensuring the security and compliance of cloud environments. In cloud computing, the potential for security misconfigurations is significantly high due to mismanagement of permissions, gaps in network configurations, and various other vulnerabilities.

Cloud Security Posture Management addresses these challenges by continuously monitoring and assessing cloud workloads to identify vulnerabilities and potential security risks. It also provides remediation steps to rectify the potential security risks identified in the cloud environment.

Wazuh is a free, open source, enterprise-grade security monitoring platform that provides comprehensive protection for cloud, on-premises, containerized, and virtualized environments. Microsoft Azure is a comprehensive cloud computing platform that offers a wide range of services to help businesses build, deploy, and manage their applications and infrastructure.

This section demonstrates how to use Wazuh to monitor Microsoft Azure security posture.

Infrastructure
--------------

The following components are the requirements for this demonstration.

-  A pre-built, ready-to-use Wazuh OVA 4.5.3. Follow the :doc:`Virtual Machine (OVA) </deployment-options/virtual-machine/virtual-machine>` installation guide to download the virtual machine (VM). This VM hosts the Wazuh central components (Wazuh server, Wazuh indexer, and Wazuh dashboard).
-  A Microsoft Azure account with an active subscription and global administrative privileges.

Integrating Wazuh with Microsoft Azure
--------------------------------------

Wazuh integrates with Azure using the Log Analytics Workspace. The Azure Log Analytics workspace is a unique environment for storing log data from Azure Monitor and other Azure services, such as the Microsoft Defender for Cloud. Wazuh provides a native :doc:`integration module for Azure </cloud-security/azure/activity-services/services/log-analytics>` that retrieves logs from the Log Analytics Workspace.

Below is a summary of the actions performed on Azure to integrate with Wazuh.

-  **Creating a service principal application**: This involves registering an application with a Microsoft Entra ID, which automatically creates a service principal for the application registration. The service principal is the application’s identity in the Microsoft Entra tenant and its access to resources is restricted by the roles assigned to it.
-  **Creating a Log Analytics workspace**: The workspace is where logs and data are stored, and it has a unique workspace ID and resource ID. The Wazuh :doc:`Azure module </user-manual/reference/ossec-conf/wodle-azure-logs>` is then configured to query the workspace for new data. 
-  **Enabling Microsoft Defender for Cloud**: We configure the Microsoft Defender for Cloud to scan all resources inside an Azure Subscription. Microsoft Defender for Cloud is configured to send security log data and recommendations to the created Log Analytics workspace.

Microsoft Azure
---------------

Creating a service principal application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We create a Microsoft Entra ID application that Wazuh uses to authenticate to the Log Analytics Workspace. Microsoft Entra ID is the identity directory service from Microsoft.

#. In the Search bar of the Azure portal, type ``Microsoft Entra ID``, then select the same service name. Select **App registrations** from the Default Directory on the sidebar menu.
#. Select **+ New registration** from the command bar to create a new service principal application.
#. On the opened form, enter a unique name for the application and click **Register**. Note the Application (client) ID on the application overview page.

   .. thumbnail:: /images/cloud-security/azure/register-an-application.gif
      :title: Register an application
      :alt: Register an application
      :align: center
      :width: 80%

#. On the opened application overview page:

   -  Select **Certificates & secrets** from the sidebar menu.
   -  Click on the **Client secrets** tab.
   -  Click **+ New client secret**. Enter a description for the secret, select the expiry period, and click **Add**.
   -  Copy and save the client secret value.

   .. note::

      You can only view client secret values immediately after creation. Be sure to save the secret before leaving the page.

   .. thumbnail:: /images/cloud-security/azure/create-secret.gif
      :title: Create secret
      :alt: Create secret
      :align: center
      :width: 80%

#. On the application overview page, select **API permissions**. Select **+ Add a permission**.

#. On the **Request API permissions** page:

   -  Click on the **APIs my organization uses** tab.
   -  Search for ``Log Analytics`` and select **Log Analytics API** from the list. 
   -  Click on **Application permissions**.
   -  Select the **Read Log Analytics data** permission.
   -  Click **Add permissions**.
   -  On the **API permissions** page, Click on **Grant admin consent for Default Directory**.
   -  Click **Yes**.

   .. thumbnail:: /images/cloud-security/azure/request-api-permissions.gif
      :title: Request API permissions
      :alt: Request API permissions
      :align: center
      :width: 80%

Create a Log Analytics workspace
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We create a Log Analytics Workspace that enables Wazuh to retrieve log data from Azure. 

#. In the search bar of the Azure portal, type ``Log Analytics workspaces``, then select the same service name. Select **+ Create** from the command bar to create a new workspace.
#. On the opened dialog box, select **Create new** to create a Resource group for the Log Analytics. Enter a unique name for the **Resource group** and click **OK**.
#. In the **Instance details** section, enter a unique name for the Log Analytics workspace.
#. Select the **Review + Create** tab. Once the workspace validation has passed, select **Create**. Wait for the new workspace to be provisioned, this may take a few minutes.

   .. thumbnail:: /images/cloud-security/azure/log-analytics-workspace.gif
      :title: Create Log analytics workspace
      :alt: Create Log analytics workspace
      :align: center
      :width: 80%

#. In the search bar of the Azure portal, type ``Log Analytics workspaces``, select the new workspace. Copy the **Workspace ID** from the **Essentials** section. The Workspace ID will be used as part of the configuration in Wazuh.

   .. thumbnail:: /images/cloud-security/azure/log-analytics-workspace-id.png
      :title: Log analytics workspace
      :alt: Log analytics workspace
      :align: center
      :width: 80%

#. Click on the **Access control (IAM)** on the sidebar menu of the Log Analytics workspace page. 

   -  Click on **+ Add** on the command bar and select **Add role assignment**.
   -  On the **Add role assignment** page, search for ``Log Analytics Reader``. Select it and click **Next**.
   -  On the **Members** page, click on **+ Select members**.
   -  Search for your service principal application name on the **Select members** box and click **Select**.
   -  Click **Next** then **Review + assign**.

   .. thumbnail:: /images/cloud-security/azure/add-role-assignment.gif
      :title: Add role assignment
      :alt: Add role assignment
      :align: center
      :width: 80%

#. In the Search bar of the Azure portal, type ``Microsoft Entra ID``, then select the same service name.
#. Copy the Azure tenant **Primary domain** name from the **Basic Information** section. This will be used as part of the configuration in Wazuh.

   .. thumbnail:: /images/cloud-security/azure/copy-primary-domain.png
      :title: Copy primary domain
      :alt: Copy primary domain
      :align: center
      :width: 80%

Enable Microsoft Defender for Cloud
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We enable and configure Microsoft Defender for Cloud to report all security misconfigurations using its CSPM module.

#. In the search bar of the Azure portal, type ``Microsoft Defender``, then select **Microsoft Defender for Cloud**.
#. Select **Getting started** on the sidebar menu. On the **Getting started** page, under the **Upgrade** tab, select your subscription, and then click the **Upgrade** button at the bottom of the page.

   .. thumbnail:: /images/cloud-security/azure/microsoft-defender-for-cloud-upgrade.png
      :title: Microsoft defender for Cloud upgrade
      :alt: Microsoft defender for Cloud upgrade
      :align: center
      :width: 80%

#. In the left menu for Microsoft Defender for Cloud;

   -  Navigate to the **Management** section, select **Environment settings**.
   -  Expand **Azure** > **Tenant Root Group** to reveal your Azure subscription.
   -  Select your Azure subscription.

   On the **Settings** page, verify the **Status** of the entries is **On**, else, click **Enable all plans** and **Save**.

   .. thumbnail:: /images/cloud-security/azure/enable-all-plans.png
      :title: Enable all plans
      :alt: Enable all plans
      :align: center
      :width: 80%

#. 