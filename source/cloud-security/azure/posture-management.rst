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
#. On the opened form, enter a unique name for the application and click **Register**. Note the _`Application (client) ID` on the application overview page.

   .. thumbnail:: /images/cloud-security/azure/register-an-application.gif
      :title: Register an application
      :alt: Register an application
      :align: center
      :width: 80%

#. On the opened application overview page:

   -  Select **Certificates & secrets** from the sidebar menu.
   -  Click on the **Client secrets** tab.
   -  Click **+ New client secret**. Enter a description for the _`secret`, select the expiry period, and click **Add**.
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

.. _create-log-analytics-workspace:

Create a Log Analytics workspace
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We create a Log Analytics Workspace that enables Wazuh to retrieve log data from Azure. 

#. In the search bar of the Azure portal, type ``Log Analytics workspaces``, then select the same service name. Select **+ Create** from the command bar to create a new workspace.
#. On the opened dialog box, select **Create new** to create a _`resource group` for the Log Analytics. Enter a unique name for the **Resource group** and click **OK**.
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
#. Copy the Azure tenant **Primary domain** _`name` from the **Basic Information** section. This will be used as part of the configuration in Wazuh.

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

#. Click **Continuous export** on the sidebar menu and click on the **Log Analytics workspace** tab to configure Defender to continuously send logs to the Log Analytics workspace. Select the **Security alerts** and **Regulatory compliance** checkboxes.

   .. thumbnail:: /images/cloud-security/azure/continuous-export-setup.png
      :title: Continuous export setup
      :alt: Continuous export setup
      :align: center
      :width: 80%

#. Scroll down to the **Export** sections and select the `resource group`_ created for the Log Analytics workspace. Select your tenant Azure subscription and the :ref:`target workspace <create-log-analytics-workspace>`. Click **Save**.

   .. thumbnail:: /images/cloud-security/azure/continuous-export-setup2.png
      :title: Continuous export setup
      :alt: Continuous export setup
      :align: center
      :width: 80%

#. In the left menu for Microsoft Defender for Cloud

   -  Navigate to the **Management** section, select **Environment settings**.
   -  Expand **Azure** > **Tenant Root Group** > your Azure subscription
   -  Select your :ref:`Log Analytics workspace <create-log-analytics-workspace>` created above.
   -  Verify the **Status** of the entries is **On**, else, click **Enable all plans** and **Save**.

   .. thumbnail:: /images/cloud-security/azure/enable-all-plans.gif
      :title: Enable all plans
      :alt: Enable all plans
      :align: center
      :width: 80%

Wazuh server
------------

Configure the Wazuh server to receive logs from Microsoft Azure by performing the following steps.

.. note::
   
   Run the following commands as the root user.

#. Create a ``credentials`` directory in the ``/var/ossec/wodles/`` directory:

   .. code-block:: console

      # mkdir /var/ossec/wodles/credentials

#. Create a ``/var/ossec/wodles/credentials/log_analytics_credentials`` file:

   .. code-block:: console

      # touch /var/ossec/wodles/credentials/log_analytics_credentials

#. Update the ``/var/ossec/wodles/credentials/log_analytics_credentials`` file as shown below:

   .. code-block:: none

      application_id = <SERVICE_PRINCIPAL_APPLICATION_ID>
      application_key = <CLIENT_SECRET_VALUE>

   Replace:

   -  ``<SERVICE_PRINCIPAL_APPLICATION_ID>`` with the service principal `Application (client) ID`_.
   -  ``<CLIENT_SECRET_VALUE>`` with the client `secret`_ value.

#. Append the following content to the ``/var/ossec/etc/ossec.conf`` configuration file. The configuration specifies how Wazuh connects to Azure:

   .. code-block:: xml

      <ossec_config>
        <wodle name="azure-logs">
          <disabled>no</disabled>
          <run_on_start>yes</run_on_start>
          <interval>5m</interval>

          <log_analytics>
              <auth_path>/var/ossec/wodles/credentials/log_analytics_credentials</auth_path>
              <tenantdomain><PRIMARY_DOMAIN></tenantdomain>

              <request>
                  <tag>azurefindings</tag>
                  <query>SecurityRecommendation</query>
                  <workspace><LOG_ANALYTICS_WORKSPACE_ID></workspace>
                  <time_offset>1d</time_offset>
              </request>

              <request>
                  <tag>azurefindings</tag>
                  <query>SecurityAlert</query>
                  <workspace><LOG_ANALYTICS_WORKSPACE_ID></workspace>
                  <time_offset>1d</time_offset>
              </request>

          </log_analytics>
        </wodle>
      </ossec_config>

   .. note::

      The ``interval`` value represents the time between each Azure-Logs module execution. You should set it to a time that is tolerable for your infrastructure.

   Replace:

   -  ``<PRIMARY_DOMAIN>`` with the domain `name`_ of the Azure tenant copied above.
   -  ``<LOG_ANALYTICS_WORKSPACE_ID>`` with the :ref:`ID of the Log Analytics workspace <create-log-analytics-workspace>` created above.

#. Create a rule file ``azure_posture.xml`` in the ``/var/ossec/etc/rules/`` directory and add the following custom rules to detect Azure posture findings:

   .. code-block:: xml

      <group name="azure,">

        <rule id="100200" level="10">
          <if_sid>87801</if_sid>
          <field name="Type">SecurityRecommendation</field>
          <description>Azure Security Posture: $(RecommendationName).</description>
        </rule>

        <rule id="100201" level="10">
          <if_sid>87801</if_sid>
          <field name="Type">SecurityAlert</field>
          <field name="ResourceId">Microsoft.Compute</field>
          <description>Azure Security Posture: $(DisplayName).</description>
          <mitre>
            <id>T1651</id>
          </mitre>
        </rule>

        <rule id="100202" level="10">
          <if_sid>87801</if_sid>
          <field name="Type">SecurityAlert</field>
          <field name="ResourceId">microsoft.keyvault</field>
          <description>Azure Security Posture: $(DisplayName).</description>
          <mitre>
            <id>T1098.004</id>
          </mitre>
        </rule>

        <rule id="100203" level="10">
          <if_sid>87801</if_sid>
          <field name="Type">SecurityAlert</field>
          <field name="ResourceId">Microsoft.Web</field>
          <description>Azure Security Posture: $(DisplayName).</description>
          <mitre>
            <id>T1648</id>
          </mitre>
        </rule>

        <rule id="100204" level="10">
          <if_sid>87801</if_sid>
          <field name="Type">SecurityAlert</field>
          <field name="ResourceId">Microsoft.ApiManagement</field>
          <description>Azure Security Posture: $(DisplayName).</description>
          <mitre>
            <id>T1059.009</id>
          </mitre>
        </rule> 

        <rule id="100205" level="10">
          <if_sid>87801</if_sid>
          <field name="Type">SecurityAlert</field>
          <field name="ResourceId">Microsoft.ContainerService|cluster</field>
          <description>Azure Security Posture: $(DisplayName).</description>
          <mitre>
            <id>T1609</id>
          </mitre>
        </rule> 

      </group>

   Where:

   -  Rule ID ``100200`` is triggered when Wazuh detects a new security posture recommendation in Azure.
   -  Rule ID ``100201`` is triggered when Wazuh detects an attack against Azure Virtual Machine.
   -  Rule ID ``100202`` is triggered when Wazuh detects an attack in Azure Key Vault.
   -  Rule ID ``100203`` is triggered when Wazuh detects an attack in Azure App Service.
   -  Rule ID ``100204`` is triggered when Wazuh detects an attack in Azure API Management.
   -  Rule ID ``100205`` is triggered when Wazuh detects an attack in Azure Container and clusters.

#. Restart the Wazuh manager to apply the configuration:

   .. code-block:: console

      # systemctl restart wazuh-manager

Cloud Security Posture Management simulation
--------------------------------------------

We simulate sample security alerts in Microsoft Defender for Cloud. These alerts mimic real life attacks in a cloud environment.

To create sample alerts, follow the steps below:

#. In the Search bar of the Azure portal, type ``Microsoft Defender``, then select **Microsoft Defender for Cloud**.
#. Click on **Security alerts** on the sidebar menu. On the Security alerts windows, select **Sample alerts** on the command bar. Select your Azure Subscription and the desired Azure service in the **Defender for Cloud plans** dropdown and click **Create sample alerts**.

   .. note::
      
      For this example, we restrict our alert simulation to **App Services**, **Key Vaults**, **Virtual Machines**, **Containers**, and **API**.

#. Refresh the security alerts page to visualize the newly generated alerts.

   .. thumbnail:: /images/cloud-security/azure/defender-for-cloud-security-alerts.png
      :title: Defender for Cloud security alerts
      :alt: Defender for Cloud security alerts
      :align: center
      :width: 80%

Posture management results on the Wazuh dashboard
-------------------------------------------------

Visualize the results by navigating to the **Modules** > **Security events** tab. Filter for the azure rule group.

.. thumbnail:: /images/cloud-security/azure/azure-security-alerts-on-wazuh-dashboard.png
   :title: Azure security alerts on the Wazuh dashboard
   :alt: Azure security alerts on the Wazuh dashboard
   :align: center
   :width: 80%

Conclusion
----------

The integration of Wazuh with Microsoft Azure offers a centralized solution for managing cloud security posture. In this blog post, we show how to integrate Azure with Wazuh using the out of the box Wazuh Azure module. The integration helps organizations with the tools and insights needed to protect their assets, comply with regulations, and maintain a strong security posture in a dynamic cloud landscape.

`Wazuh <https://wazuh.com/>`_ is an open source security platform for threat detection, compliance, and incident handling. You can integrate Wazuh with third-party solutions and technologies. Wazuh also has an ever-growing `community <https://wazuh.com/community/>`__ where users are supported. To learn more about Wazuh, please check out our :doc:`documentation </index>` and `blog <https://wazuh.com/blog/>`_ posts.

References
----------

-  :doc:`Using Wazuh to monitor Microsoft Azure </cloud-security/azure/index>`
-  `Continuously export Microsoft Defender for Cloud data <https://learn.microsoft.com/en-us/azure/defender-for-cloud/continuous-export?tabs=azure-portal>`__
