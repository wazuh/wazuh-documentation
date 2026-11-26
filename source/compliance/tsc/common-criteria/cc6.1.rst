.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh helps meet the architecture, infrastructure, and security software aspects of the common criteria CC6.1 by providing the IT Hygiene capability.

Common criteria 6.1
=====================

The TSC **common criteria CC6.1** states that: *“The entity implements logical access security software, infrastructure, and architectures over protected information assets to protect them from security events to meet the entity's objectives”*. This control is part of the security category of the TSC requirements. It requires the entity to maintain an inventory of its information assets. It also defines minimum expectations for managing logical and physical access to information systems, including user authentication, authorization, access reviews, provisioning and de‑provisioning, encryption, and asset inventory.

The use case below shows how Wazuh helps meet this requirement.

Use case: Maintaining asset inventory on a Windows endpoint
--------------------------------------------------------------

Wazuh helps meet the architecture, infrastructure, and security software aspects of the **common criteria CC6.1** using the :doc:`IT Hygiene </user-manual/capabilities/system-inventory/index>` capability. IT Hygiene collects inventory data from monitored endpoints, such as hardware, operating system, packages, processes, ports, users, and services.

The Syscollector module is enabled by default on the Wazuh agent and collects users, applications, services, ports, and protocols from the endpoint every hour. See :doc:`System inventory configuration </user-manual/capabilities/system-inventory/configuration>` to change the scan interval or the data it collects.

Wazuh dashboard
^^^^^^^^^^^^^^^^

#. Open the menu (**☰**) and go to **Security operations** > **IT Hygiene**.

   .. thumbnail:: /images/compliance/tsc/common-criteria/overview-it-hygiene-card.png
      :title: Wazuh Overview dashboard - IT Hygiene
      :alt: Wazuh Overview dashboard - IT Hygiene
      :align: center
      :width: 80%

   You can see details about installed packages, running processes, used ports, and process start time across several monitored endpoints.

   .. thumbnail:: /images/compliance/tsc/common-criteria/it-hygiene-dashboard-packages-processes.png
      :title: IT Hygiene dashboard - Packages and processes
      :alt: IT Hygiene dashboard - Packages and processes
      :align: center
      :width: 80%

   .. thumbnail:: /images/compliance/tsc/common-criteria/it-hygiene-dashboard-ports.png
      :title: IT Hygiene dashboard - Ports
      :alt: IT Hygiene dashboard - Ports
      :align: center
      :width: 80%

#. Navigate to **Identity** > **Users** to view user profiles within your environment.

   .. thumbnail:: /images/compliance/tsc/common-criteria/it-hygiene-identity-users.png
      :title: IT Hygiene - Identity - Users
      :alt: IT Hygiene - Identity - Users
      :align: center
      :width: 80%
