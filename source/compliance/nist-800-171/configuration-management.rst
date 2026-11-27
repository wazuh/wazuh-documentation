.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps you meet the NIST SP 800-171 Configuration Management requirement 3.4.1 with log data analysis and IT Hygiene.

Configuration Management (3.4)
==============================

3.4.1 Establish baseline configurations and inventories
-------------------------------------------------------

Requirement 3.4.1 states, "Establish and maintain baseline configurations and inventories of organizational systems (including hardware, software, firmware, and documentation) throughout the respective system development life cycles."

An accurate inventory lets you detect changes to the baseline, such as a new service that nobody approved.

Wazuh helps meet requirement 3.4.1 with log data analysis and the IT Hygiene module. Windows records event ID 7045 in the System event log each time a service is installed. Wazuh generates a ``System service installed`` finding for it. The IT Hygiene module keeps an inventory of the installed packages and services on each endpoint.

Use case: Detecting a new service on a Windows endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how Wazuh detects a new service on a Windows 11 endpoint.

Windows endpoint
~~~~~~~~~~~~~~~~

#. Run the following command in PowerShell as an administrator to create a service named ``RemoteSupportAgent``:

   .. code-block:: ps1con

      > sc.exe create RemoteSupportAgent binPath= "C:\Windows\System32\notepad.exe" start= demand DisplayName= "Remote Support Agent"

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, click **Explore agent**, and select the Windows endpoint. Then switch to the **Findings** tab and enter the following query:

   .. code-block:: none

      wazuh.rule.title:"System service installed - Remote Support Agent"

   One finding matches.

   .. thumbnail:: /images/compliance/nist-800-171/windows-new-service-finding.png
      :title: System service installed finding
      :alt: System service installed finding
      :align: center
      :width: 80%

#. Expand the finding. The ``service.name`` and ``process.executable`` fields describe the new service, and ``event.code`` shows the Windows event ID.

   .. thumbnail:: /images/compliance/nist-800-171/windows-new-service-details.png
      :title: Details of the new service finding
      :alt: Details of the new service finding
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.nist_800_171`` field. The finding maps to 3.4.1, 3.4.2, and 3.3.1.

   .. thumbnail:: /images/compliance/nist-800-171/windows-new-service-nist-800-171-mapping.png
      :title: NIST 800-171 mapping of the new service finding
      :alt: NIST 800-171 mapping of the new service finding
      :align: center
      :width: 80%

#. Open the menu (☰) and go to **Security operations** > **IT Hygiene**. Click **Explore agent**, select the Windows endpoint, and switch to the **Services** tab. Turn on **Advanced filters** and enter the following query:

   .. code-block:: none

      service.name:"Remote Support Agent"

   The **Remote Support Agent** service appears in the services inventory of the Windows endpoint.

   .. thumbnail:: /images/compliance/nist-800-171/it-hygiene-services.png
      :title: New service in the IT Hygiene services inventory
      :alt: New service in the IT Hygiene services inventory
      :align: center
      :width: 80%

After you finish this use case, delete the test service on the Windows endpoint:

.. code-block:: ps1con

   > sc.exe delete RemoteSupportAgent
