.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The SCA module performs scans to determine if monitored endpoints meet secure configuration and hardening policies. Learn more about it in this section.

Security configuration assessment
=================================

The Wazuh Security Configuration Assessment (SCA) module performs scans to determine if monitored endpoints meet secure configuration and hardening policies. These scans assess the endpoint configuration using policy files. These policy files contain rules that serve as a benchmark for the configurations that exist on the monitored endpoint.

The Wazuh SCA helps to comply with the following NIST 800-53 controls:

-  **SC-7 Boundary protection:** Control traffic at system boundaries with managed interfaces such as gateways and firewalls, and deny connections that aren't explicitly needed.

-  **IA-5 Authenticator management:** Manage passwords, certificates, and other authenticators securely, including changing default credentials before a system goes into use.

-  **CM-6 Configuration settings:** Define secure configuration settings for the hardware, software, and firmware in your systems, and keep every component set to those values.

Wazuh has out-of-the-box SCA policies to check if endpoints meet authentication, network, and boundary policies, among other security policies. The Wazuh SCA module scans endpoints regularly to determine if they comply with specific security policies.

Use case
--------

Check the default deny firewall policy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh helps meet the SC-7 Boundary protection requirement by checking endpoint compliance with the CIS configuration benchmark. In this scenario, Wazuh runs default SCA checks to determine the default firewall deny policy status on an Ubuntu 24.04 LTS endpoint. SCA scans are enabled by default, so you don't need further configuration.

#. Restart the Wazuh agent to trigger a new SCA scan:

   .. code-block:: console

      # systemctl restart wazuh-agent

#. Click the upper-left menu icon (**☰**) and go to **Endpoint security > Configuration Assessment**.

   .. thumbnail:: /images/compliance/nist/select-configuration-assessment.png
      :title: Select Configuration Assessment
      :alt: Select Configuration Assessment
      :align: center
      :width: 80%

#. Click **Explore agent**, then select the Ubuntu 24.04 endpoint.

   .. thumbnail:: /images/compliance/nist/select-the-endpoint.png
      :title: Select the Ubuntu 24.04 endpoint
      :alt: Select the Ubuntu 24.04 endpoint
      :align: center
      :width: 80%

   .. thumbnail:: /images/compliance/nist/sca-endpoint-dashboard.png
      :title: SCA dashboard for the Ubuntu 24.04 endpoint
      :alt: SCA dashboard for the Ubuntu 24.04 endpoint
      :align: center
      :width: 80%

#. Click the **Inventory** tab.

#. Click **Add filter** and add a filter for ``check.id is 35624`` then click **Save**.

   .. thumbnail:: /images/compliance/nist/sca-add-check-id-filter.png
      :title: Add a filter for check ID 35624
      :alt: Add a filter for check ID 35624
      :align: center
      :width: 80%

   .. thumbnail:: /images/compliance/nist/sca-check-35624.png
      :title: SCA check 35624 result
      :alt: SCA check 35624 result
      :align: center
      :width: 80%

   This SCA check returns **Failed** when the endpoint has no default deny firewall policy configured. Additionally, each SCA check contains the reason for performing the check, a description, and possible remediation for the failed SCA check.

   .. thumbnail:: /images/compliance/nist/sca-check-details.png
      :title: SCA check details
      :alt: SCA check details
      :align: center
      :width: 80%
