.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps meet the CMMC Configuration Management (CM) requirements, with a use case that detects a new service on a Windows endpoint.

Configuration Management (CM)
=============================

CM.L2-3.4.1 System Baselining
-----------------------------

CM.L2-3.4.1 requires you to establish and maintain baseline configurations and inventories of your systems, including hardware, software, firmware, and documentation.

An accurate inventory lets you detect changes to the baseline, such as a new service that nobody approved.

Wazuh helps meet CM.L2-3.4.1 with log data analysis and the IT Hygiene module. Windows records event ID 7045 in the System event log each time a service is installed, and Wazuh generates a ``System service installed`` finding for it. The IT Hygiene module keeps an inventory of the installed packages and services on each endpoint.

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

   .. thumbnail:: /images/compliance/cmmc/system-service-installed-finding.png
      :title: System service installed finding
      :alt: System service installed finding
      :align: center
      :width: 80%

#. Expand the finding. The ``service.name`` and ``process.executable`` fields describe the new service, and ``event.code`` shows the Windows event ID.

   .. thumbnail:: /images/compliance/cmmc/system-service-installed-details.png
      :title: Details of the System service installed finding
      :alt: Details of the System service installed finding
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.cmmc`` field. The finding maps to CM.L2-3.4.1, CM.L2-3.4.2, and AU.L2-3.3.1.

   .. thumbnail:: /images/compliance/cmmc/system-service-installed-cmmc.png
      :title: CMMC requirements of the System service installed finding
      :alt: CMMC requirements of the System service installed finding
      :align: center
      :width: 80%

#. Open the menu (☰) and go to **Security operations** > **IT Hygiene**. Click **Explore agent**, select the Windows endpoint, and switch to the **Services** tab. Turn on **Advanced filters** and enter the following query:

   .. code-block:: none

      service.name:"Remote Support Agent"

   The **Remote Support Agent** service appears in the services inventory of the Windows endpoint.

   .. thumbnail:: /images/compliance/cmmc/it-hygiene-services.png
      :title: Service in the IT Hygiene inventory
      :alt: Service in the IT Hygiene inventory
      :align: center
      :width: 80%

After you finish this use case, delete the test service on the Windows endpoint:

.. code-block:: ps1con

   > sc.exe delete RemoteSupportAgent
