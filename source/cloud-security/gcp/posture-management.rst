.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Use Wazuh to manage posture security on the Google Cloud Platform (GCP).

Cloud Security Posture Management
=================================

Cloud Security Posture Management (CSPM) is important in ensuring the security and compliance of cloud environments. In cloud computing where organizations can quickly and easily provision, configure, and modify cloud resources, the potential for security misconfigurations increases. These security issues can arise due to mismanagement of permissions, gaps in network configurations, and various other factors.

Cloud Security Posture Management addresses this challenge by continuously monitoring and assessing cloud workloads to identify misconfigurations, vulnerabilities, and potential risks. It also provides remediation steps on how to rectify potential security risks, thereby enhancing the overall security posture of the cloud environment.

Wazuh is a free, open source, enterprise-grade security monitoring platform that provides comprehensive protection for cloud, on-premises, containerized, and virtualized environments. This section demonstrates how to use Wazuh to manage posture security on the Google Cloud Platform (GCP).

Integrating Wazuh with GCP
--------------------------

Wazuh integrates with GCP using the Google Cloud publisher and subscriber service (GCP Pub/Sub). Google Cloud Pub/Sub is a messaging service that helps you send and receive log data between applications. Wazuh provides an :doc:`integration module for GCP <index>` that fetches logs from the Pub/Sub service.

.. thumbnail:: /images/cloud-security/gcp/gcp-integration-overview.png
   :title: Google Cloud Platform integration overview
   :alt: Google Cloud Platform integration overview
   :align: center
   :width: 80%

Google Cloud Platform
^^^^^^^^^^^^^^^^^^^^^

Configuring the GCP account
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create a new GCP project and a service account that enables the Wazuh GCP module to pull log data from the Google Pub/Sub service. Once this is done, configure the Pub/Sub and the Sink services. The Sink service routes cloud security posture logs from the central GCP Cloud Logging service to the Pub/Sub service. 

Follow the steps below to perform the configuration.

#. Create a new _`GCP project`. Take note of the project ID.

   .. thumbnail:: /images/cloud-security/gcp/create-gcp-project.gif
      :title: Create GCP project
      :alt: Create GCP project
      :align: center
      :width: 80%

   Where:

   -  **Project name** is the name given to the project name.
   -  **Organization** is the name of the GCP organization.

#. Go to the **IAM and admin** drop-down menu and select **Service accounts** to create a new service account. On the service accounts creation page, add the ``Pub/Sub Publisher`` and ``Pub/Sub Subscriber`` roles to the account.

   .. thumbnail:: /images/cloud-security/gcp/create-service-account.gif
      :title: Create service account
      :alt: Create service account
      :align: center
      :width: 80%

   Where:

   -  **Service account name** is the privileged account that Wazuh uses to connect to GCP.
   -  **Roles** are the rights given to the service account.

#. Open the newly created service account and create a _`private key in JSON format`. Your browser automatically downloads the key. Wazuh uses the key to authenticate to your GCP project.

   .. thumbnail:: /images/cloud-security/gcp/create-a-private-key-in-json-format.gif
      :title: Create a private key in JSON format
      :alt: Create a private key in JSON format
      :align: center
      :width: 80%

#. Search for ``Pub/Sub`` from the console search field at the top of the page and select it. Click on **Create Topic**. On the **Create Topic** page, input the **Topic ID** and ensure the **Add a default subscription** checkbox is selected. Then, click **Create**. Take note of the _`Subscription ID`.

   .. thumbnail:: /images/cloud-security/gcp/create-topic.gif
      :title: Create topic
      :alt: Create topic
      :align: center
      :width: 80%

#. Search for **Log Router** in the GCP console and select it. Click on **Create Sink**. Name the sink and click **Next**. On the **Sink destination** service, select **Cloud Pub/Sub topic**. Next, select the topic name created above. Click **Create Sink**.

   .. thumbnail:: /images/cloud-security/gcp/create-logs-routing-sink.gif
      :title: Create logs routing sink
      :alt: Create logs routing sink
      :align: center
      :width: 80%

   The Log Router and Sink services in a GCP project are responsible for log management and log destination routing respectively.

#. Configure continuous log export from the GCP Findings service to the GCP Pub/Sub service.

   .. thumbnail:: /images/cloud-security/gcp/configure-continuous-exports.gif
      :title: Configure continuous exports
      :alt: Configure continuous exports
      :align: center
      :width: 80%

Wazuh server
^^^^^^^^^^^^

Configure the Wazuh server to receive logs from GCP by performing the following steps.

.. note::

   Run the commands with root permission.

.. warning::

   The Wazuh GCP module does not support multiple Pub/Sub sections in the same :ref:`Wazuh configuration file<reference_ossec_conf>`. To configure more than one service, deploying multiple agents is required.

#. Create a ``credentials.json`` file in the ``/var/ossec/wodles/gcloud/`` directory:

   .. code-block:: console

      # touch /var/ossec/wodles/gcloud/credentials.json

#. Update the ``/var/ossec/wodles/gcloud/credentials.json`` file with the contents of the `private key in JSON format`_ file downloaded earlier. The Wazuh GCP module uses the key file to authenticate your GCP account.

#. Append the following content to the ``/var/ossec/etc/ossec.conf`` configuration file. The configuration specifies how Wazuh connects to GCP using the project ID, GCP PubSub subscription ID, and a credential.

   .. code-block:: xml

      <ossec_config>
        <gcp-pubsub>
          <pull_on_start>yes</pull_on_start>
          <interval>5m</interval>
          <project_id><PROJECT_ID></project_id>
          <subscription_name><SUBSCRIPTION_ID></subscription_name>
           <credentials_file>/var/ossec/wodles/gcloud/credentials.json</credentials_file>
        </gcp-pubsub>
      </ossec_config>

   Replace the variables in the configuration with the appropriate values.

   Where:

   -  ``<PROJECT_ID>`` is the ID of the `GCP project`_ created above.
   -  ``<SUBSCRIPTION_NAME>`` is the `subscription ID`_ of your GCP Pub/Sub.

#. Create a rule file ``gcp_posture.xml`` in the ``/var/ossec/etc/rules/`` directory and add the following custom rules to detect GCP posture findings:

   .. code-block:: xml

      <group name="gcp,">
      
        <!-- Misconfiguration detection -->
          <rule id="100200" level="10">
              <if_sid>65000</if_sid>
              <field name="gcp.finding.findingClass">MISCONFIGURATION</field>
              <description>A $(gcp.finding.findingClass) with $(gcp.finding.severity) severity has been discovered on the GCP project $(gcp.resource.projectDisplayName). $(gcp.finding.description)</description>
              <mitre>
                <id>T1562</id>
              </mitre>
          </rule>
          
      
        <!-- Threat detection -->
          <rule id="100201" level="10">
              <if_sid>65000</if_sid>
              <field name="gcp.finding.findingClass">THREAT</field>
              <description>A $(gcp.finding.findingClass) with $(gcp.finding.severity) severity has been discovered on the GCP project $(gcp.resource.projectDisplayName). $(gcp.finding.category).</description>
              <mitre>
                <id>T1562</id>
              </mitre>
          </rule>
         
      </group>

   Where:

   -  Rule ID ``100200`` is triggered when Wazuh detects a misconfiguration in a GCP account.
   -  Rule ID ``100201`` is triggered when GCP detects a threat.

#. Restart the Wazuh manager to apply the configuration:

   .. code-block:: console

      # systemctl restart wazuh-manager

Cloud security posture management simulation
--------------------------------------------

The Findings module is a GCP Security Command Centre service that records security misconfigurations across a GCP project. The simulation will produce sample misconfigurations that will be shipped to Wazuh.

Network misconfigurations
^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following actions on the GCP console to simulate network misconfiguration.

#. Enable the **Compute Engine API**. This will enable the internal VPC firewall.

   .. thumbnail:: /images/cloud-security/gcp/enable-compute-engine-api.gif
      :title: Enable the Compute engine API
      :alt: Enable the Compute engine API
      :align: center
      :width: 80%

#. Create a firewall rule, ``verybadrule`` on the GCP network security to simulate multiple network misconfigurations. The firewall rule allows connections from all IP addresses and ports.

   .. thumbnail:: /images/cloud-security/gcp/create-firewall-rule.gif
      :title: Create firewall rule
      :alt: Create firewall rule
      :align: center
      :width: 80%

#. Delete the firewall rule ``verybadrule`` from the list of rules on GCP network security.

   .. thumbnail:: /images/cloud-security/gcp/delete-firewall-rule.gif
      :title: Delete firewall rule
      :alt: Delete firewall rule
      :align: center
      :width: 80%

Identity and access management anomalous activity
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Create a test Gmail email address if you don’t have one already.
#. Navigate to the **IAM & Admin** drop-down menu and select **IAM**. Click on **Grant Access**. On the Grant Access page, enter the test user Gmail address as a **New principal**. Next assign the role, **Project** > **Owner** and click **Save**.

   .. thumbnail:: /images/cloud-security/gcp/grant-access-to-test-email.gif
      :title: Grant access to test email
      :alt: Grant access to test email
      :align: center
      :width: 80%

Posture management result
^^^^^^^^^^^^^^^^^^^^^^^^^

Visualize the GCP posture management results by navigating to **Modules** > **Security events**. Filter for the rule IDs ``100200`` and ``100201``.

.. thumbnail:: /images/cloud-security/gcp/gcp-posture-management-alerts.png
   :title: Wazuh alerts for the GCP posture management
   :alt: Wazuh alerts for the GCP posture management
   :align: center
   :width: 80%
