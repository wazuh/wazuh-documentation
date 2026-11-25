.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Detect a known vulnerable driver load on a Windows Server endpoint with Sysmon and a custom Wazuh rule that matches driver hashes. Learn more about this in this PoC.

Detecting vulnerable driver loading
===================================

In a Bring Your Own Vulnerable Driver (BYOVD) attack, a threat actor with administrator rights installs a legitimately signed driver that has a known flaw. The actor then exploits the driver to run code in the kernel, for example to stop security tools. Windows loads the driver because its signature is valid. Sysmon logs every driver load as Event ID 6, with the driver path, hashes, and signature details.

In this use case, you collect Sysmon events from the Windows Server endpoint with the Wazuh agent. Then you create a custom rule that matches driver loads against a list of vulnerable driver hashes. Finally, you load a test driver and check that Wazuh raises a finding.

.. note::

   This use case doesn't use a real vulnerable driver. You load a renamed copy of ``beep.sys``, a benign driver that Microsoft signs and ships with Windows. You add its hash to the list of vulnerable drivers. Keep vulnerable driver binaries off your endpoints. Use public lists, such as the `LOLDrivers project <https://www.loldrivers.io/>`__, only as hash data.

How it works
------------

Detection runs on the events that the standard ``windows`` integration already decodes. You add a custom integration, a rule, and a detector, but no decoders. The following steps describe the flow.

#. Sysmon logs Event ID 6 (Driver loaded) when the kernel loads a driver.

#. The Wazuh agent forwards the events of the ``Microsoft-Windows-Sysmon/Operational`` channel to the Wazuh manager.

#. The ``decoder/windows-sysmon/0`` decoder of the standard ``windows`` integration normalizes the event and sets ``event.dataset`` to ``sysmon`` and ``event.action`` to ``driver-loaded``.

#. The ``vulnerable_drivers_detector`` detector runs your custom rule. The rule generates a finding when the driver hash is in its list.

The decoder maps the Sysmon Event ID 6 fields to the following Wazuh Common Schema (WCS) fields.

+---------------------+-------------------------------------------------------------------------------------------------------------------------------+
| Sysmon field        | WCS field                                                                                                                     |
+=====================+===============================================================================================================================+
| ``ImageLoaded``     | ``file.path``, plus ``file.name``, ``file.directory``, and ``file.extension``                                                 |
+---------------------+-------------------------------------------------------------------------------------------------------------------------------+
| ``Hashes``          | ``file.hash.sha256``, ``file.hash.sha1``, and ``file.hash.md5``, one for each algorithm Sysmon records, plus ``related.hash`` |
+---------------------+-------------------------------------------------------------------------------------------------------------------------------+
| ``Signed``          | ``file.code_signature.valid``                                                                                                 |
+---------------------+-------------------------------------------------------------------------------------------------------------------------------+
| ``Signature``       | ``file.code_signature.subject_name``                                                                                          |
+---------------------+-------------------------------------------------------------------------------------------------------------------------------+
| ``SignatureStatus`` | ``file.code_signature.status``, and ``file.code_signature.valid`` set to ``true`` when the status is ``Valid``                |
+---------------------+-------------------------------------------------------------------------------------------------------------------------------+

The standard ``windows`` integration also includes a rule titled ``Unsigned kernel driver loaded``. It raises a finding when a driver without a valid signature loads. A BYOVD driver has a valid signature, so that rule doesn't flag it. The hash list in your custom rule closes that gap.

Endpoints
---------

This use case needs one monitored Windows Server endpoint with the Wazuh agent installed.

+---------------------+----------------------------------------------------------------------+
| Endpoint            | Role                                                                 |
+=====================+======================================================================+
| Windows Server 2022 | Sysmon logs driver loads. You load the test driver on this endpoint. |
+---------------------+----------------------------------------------------------------------+

.. warning::

   This use case loads a kernel driver and creates a kernel service. Use a disposable lab endpoint.

Configuration
-------------

Configure Sysmon and the Wazuh agent on the Windows Server endpoint, then create the detection content in the Wazuh dashboard.

Windows Server endpoint
^^^^^^^^^^^^^^^^^^^^^^^

Sysmon records driver loads with their hashes, and the Wazuh agent forwards them to the Wazuh manager. Run these steps in PowerShell with administrator privileges. The Wazuh agent must be installed and active on the endpoint.

#. Download Sysmon from Microsoft Sysinternals and extract it to ``C:\Sysmon``:

   .. code-block:: ps1con

      > Invoke-WebRequest -Uri https://download.sysinternals.com/files/Sysmon.zip -OutFile $env:TEMP\Sysmon.zip
      > Expand-Archive -Path $env:TEMP\Sysmon.zip -DestinationPath C:\Sysmon

#. Create the ``C:\Sysmon\sysmonconfig.xml`` file with the following content, which logs every driver load with its SHA-256 hash:

   .. code-block:: xml

      <Sysmon schemaversion="4.50">
        <HashAlgorithms>sha256</HashAlgorithms>
        <EventFiltering>
          <DriverLoad onmatch="exclude" />
        </EventFiltering>
      </Sysmon>

   The configuration filters only driver loads. Sysmon also keeps logging its default events, such as process creation and process termination.

#. Install Sysmon with the configuration file:

   .. code-block:: ps1con

      > C:\Sysmon\Sysmon64.exe -accepteula -i C:\Sysmon\sysmonconfig.xml

   If Sysmon is already installed, apply the configuration with ``C:\Sysmon\Sysmon64.exe -c C:\Sysmon\sysmonconfig.xml`` instead. This command replaces the existing Sysmon configuration, and the :ref:`Clean up <poc_vulnerable_driver_clean_up>` steps uninstall Sysmon. Use a lab endpoint whose current Sysmon configuration you can discard.

#. Add the following configuration inside the ``<ossec_config>`` block of ``C:\Program Files (x86)\ossec-agent\ossec.conf`` to collect the Sysmon events:

   .. code-block:: xml

      <localfile>
        <location>Microsoft-Windows-Sysmon/Operational</location>
        <log_format>eventchannel</log_format>
      </localfile>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: ps1con

      > Restart-Service -Name WazuhSvc

#. Print the SHA-256 hash of the test driver, and keep it for the rule:

   .. code-block:: ps1con

      > (Get-FileHash -Path C:\Windows\System32\drivers\beep.sys -Algorithm SHA256).Hash

   The hash differs between Windows builds, so use the value from your endpoint.

Wazuh dashboard
^^^^^^^^^^^^^^^

You create a custom integration and a rule in the **Draft** space, and promote them to the **Custom** space. Then you create the detector that runs the rule. The integration has no decoders, because the standard ``windows`` integration decodes the Sysmon events. A promotion of rules alone needs no root decoder when the **Draft**, **Test**, and **Custom** spaces hold no decoders, key-value databases (KVDBs), or filters. See :doc:`Spaces </user-manual/data-analysis/space>`.

Create the integration
~~~~~~~~~~~~~~~~~~~~~~

The custom integration groups your rule and gives its detector a name to select.

#. Go to **Ruleset management** > **Overview** and select the **Draft** space.

#. In the integrations table, click **Actions** and select **Create**.

   .. thumbnail:: /images/poc/vulnerable-driver-create-integration-menu.png
      :title: Create an integration in the Draft space
      :alt: Wazuh dashboard Ruleset management Overview page with the Draft space selected and the Create option of the Actions menu highlighted
      :align: center
      :width: 80%

#. Enter ``vulnerable_drivers`` as the **Title**, select **System Activity** as the **Category**, and enter your name as the **Author**.

#. Click **Create integration**.

   .. thumbnail:: /images/poc/vulnerable-driver-create-integration-form.png
      :title: Create the vulnerable_drivers integration
      :alt: Wazuh dashboard Create integration form with the vulnerable_drivers title and the System Activity category
      :align: center
      :width: 80%

Create the rule
~~~~~~~~~~~~~~~

The rule matches driver loads whose hash is in your list of vulnerable drivers.

#. Go to **Ruleset management** > **Rules**, select the **Draft** space, and select **Actions** > **Create**.

#. Switch to the **YAML Editor**, select the ``vulnerable_drivers`` integration, enter the following rule, and click **Create rule**:

   .. code-block:: yaml
      :emphasize-lines: 18

      logsource:
        product: vulnerable_drivers
        category: driver_load
      tags:
        - attack.privilege-escalation
        - attack.t1068
      falsepositives:
        - Approved software that still uses a vulnerable driver version
      level: high
      status: experimental
      enabled: true
      detection:
        condition: selection
        selection:
          wazuh.integration.name: windows
          event.action: driver-loaded
          file.hash.sha256:
            - <DRIVER_SHA256>
      mitre:
        tactic:
          id:
            - TA0004
          name:
            - Privilege Escalation
        technique:
          id:
            - T1068
          name:
            - Exploitation for Privilege Escalation
      metadata:
        title: Known vulnerable driver loaded - {{file.path}}
        author: Custom
        description: >-
          Detects a driver load, Sysmon Event ID 6, whose SHA-256 hash is in a list
          of known vulnerable drivers.
        references:
          - https://www.loldrivers.io/
        documentation: ''
        supports:
          - ''

   .. thumbnail:: /images/poc/vulnerable-driver-create-rule.png
      :title: Create the vulnerable driver rule
      :alt: Wazuh dashboard Create rule page in the YAML editor with the vulnerable_drivers integration selected
      :align: center
      :width: 80%

Replace ``<DRIVER_SHA256>`` with the hash from step 6 of the Windows Server endpoint configuration. Keep it in uppercase, as ``Get-FileHash`` prints it. Sysmon writes hashes in uppercase, and rule string comparison is case-sensitive.

The ``logsource.product`` value must equal the integration title, ``vulnerable_drivers``. Otherwise, the rule is rejected with an error that says ``logsource.product`` must match the integration ``metadata.title``.

To detect real vulnerable drivers, add their SHA-256 hashes in uppercase as more list items. Keep the list to the drivers you need. A rule whose compiled query exceeds 32000 characters or 1024 clauses never raises a finding. When the query exceeds 32000 characters, the Wazuh indexer log shows a ``DocLevelMonitorQueries`` error on every detector run.

Promote the content
~~~~~~~~~~~~~~~~~~~

Detectors run your rules only from the **Custom** space, so you promote the content twice.

#. Go to **Ruleset management** > **Overview**, select the **Draft** space, and select **Space actions** > **Promote**.

   .. thumbnail:: /images/poc/vulnerable-driver-promote-draft.png
      :title: Promote the Draft space
      :alt: Wazuh dashboard Promote page listing the vulnerable_drivers integration and the Known vulnerable driver loaded rule to promote from the draft to the test space
      :align: center
      :width: 80%

#. Click **Promote**, type ``promote`` in the confirmation dialog, and click **Promote** to move the content to the **Test** space.

   .. thumbnail:: /images/poc/vulnerable-driver-promote-draft-dialog.png
      :title: Confirm the promotion to the Test space
      :alt: Wazuh dashboard Promote to test space confirmation dialog with promote typed in the confirmation field
      :align: center
      :width: 80%

#. Select the **Test** space, select **Space actions** > **Promote**, and confirm the promotion to move the content to the **Custom** space.

   .. thumbnail:: /images/poc/vulnerable-driver-promote-test.png
      :title: Promote the Test space
      :alt: Wazuh dashboard Promote page listing the vulnerable_drivers integration and the Known vulnerable driver loaded rule to promote from the test to the custom space
      :align: center
      :width: 80%

Wait about 2 minutes for the changes to apply to events.

Create the detector
~~~~~~~~~~~~~~~~~~~

The detector runs your rule on the Windows events and creates the findings.

#. Go to **Ruleset management** > **Detectors** and click **Create detector**.

#. Enter ``vulnerable_drivers_detector`` as the **Name** and select ``wazuh-events-v5-system-activity`` in the **Select indexes/aliases** drop-down, in the **Data source** section.

#. In the **Rules** section, change the space to **Custom** and select ``vulnerable_drivers`` in the **Integration** drop-down.

#. Click **Create detector**.

   .. thumbnail:: /images/poc/vulnerable-driver-create-detector.png
      :title: Create the vulnerable_drivers_detector detector
      :alt: Wazuh dashboard Create detector page with the vulnerable_drivers_detector name, the wazuh-events-v5-system-activity index, the Custom space and the vulnerable_drivers integration
      :align: center
      :width: 80%

.. _poc_vulnerable_driver_verify_data_ingestion:

Verify data ingestion
---------------------

Check that Sysmon events reach Wazuh before you run the test.

#. On the Windows Server endpoint, check that the Wazuh agent reads the Sysmon channel:

   .. code-block:: ps1con

      > Select-String -Path 'C:\Program Files (x86)\ossec-agent\ossec.log' -Pattern 'Sysmon'

   The output includes ``(1951): Analyzing event log: 'Microsoft-Windows-Sysmon/Operational'.``

#. Apply the Sysmon configuration again to make Sysmon log a configuration change event, Event ID 16:

   .. code-block:: ps1con

      > C:\Sysmon\Sysmon64.exe -c C:\Sysmon\sysmonconfig.xml

#. In the Wazuh dashboard, go to **Explore** > **Discover**, select the ``wazuh-events-v5*`` index pattern, and search for ``event.dataset: sysmon`` in the last 15 minutes. You see the configuration change event, with ``event.action`` set to ``config-modified``.

   .. thumbnail:: /images/poc/vulnerable-driver-sysmon-events.png
      :title: Sysmon events in Discover
      :alt: Wazuh dashboard Discover page showing Sysmon events from the WindowsServer2022 agent, with the config-modified event action highlighted
      :align: center
      :width: 80%

.. _poc_vulnerable_driver_attack_emulation:

Attack emulation
----------------

You emulate the BYOVD loading step with a benign driver. Like a threat actor, you rename the driver file and load it through a new kernel service. The hash stays the same, so the rule still matches the renamed copy. Run these steps in PowerShell with administrator privileges on the Windows Server endpoint.

#. Copy the test driver to a new name:

   .. code-block:: ps1con

      > Copy-Item -Path C:\Windows\System32\drivers\beep.sys -Destination C:\Windows\Temp\byovd-test.sys

#. Create a kernel service for the copy:

   .. code-block:: ps1con

      > sc.exe create byovdtest type= kernel binPath= C:\Windows\Temp\byovd-test.sys

   The output is ``[SC] CreateService SUCCESS``. Use ``sc.exe``, because ``sc`` is an alias of the ``Set-Content`` cmdlet in PowerShell.

#. Start the service to load the driver:

   .. code-block:: ps1con

      > sc.exe start byovdtest

   The kernel loads the driver image, and Sysmon logs Event ID 6. The ``STATE`` line of the output shows ``4  RUNNING``. If the original Beep driver already runs, the command can report an error instead. The image still loads, so continue with the next step.

#. Check that Sysmon logged the driver load:

   .. code-block:: ps1con

      > Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational'; Id=6} -MaxEvents 1 | Format-List -Property Message

   The message shows ``ImageLoaded: C:\Windows\Temp\byovd-test.sys``, the SHA-256 hash of the driver in the ``Hashes`` line, ``Signed: true``, and ``SignatureStatus: Valid``.

View the findings
-----------------

You see the finding ``Known vulnerable driver loaded - C:\Windows\Temp\byovd-test.sys``.

#. In the Wazuh dashboard, go to **Threat intelligence** > **Threat Hunting** and click the **Findings** tab.

#. Enter ``event.action: driver-loaded`` in the search bar and click **Update**.

   .. thumbnail:: /images/poc/vulnerable-driver-findings.png
      :title: Known vulnerable driver loaded finding
      :alt: Wazuh dashboard Threat Hunting Findings tab filtered by event.action driver-loaded, showing the Known vulnerable driver loaded finding for the WindowsServer2022 agent
      :align: center
      :width: 80%

#. Expand the finding to see the driver details.

   .. thumbnail:: /images/poc/vulnerable-driver-finding-details.png
      :title: Details of the vulnerable driver finding
      :alt: Wazuh dashboard Document Details panel of the finding with the file path, file hash, and code signature fields highlighted
      :align: center
      :width: 80%

The finding carries ``wazuh.integration.name: windows``, the integration that decoded the event, not ``vulnerable_drivers``. Search by ``event.action`` as shown, not by your integration name.

.. note::

   The detector checks new events every minute by default, so findings appear a few minutes after the driver load.

The finding includes these fields to start an investigation:

-  ``file.path``: The location of the loaded driver. A driver outside ``C:\Windows\System32\drivers`` is unusual.
-  ``file.hash.sha256``: The hash that matched your list.
-  ``file.code_signature.subject_name`` and ``file.code_signature.valid``: The signer and the signature state. A valid signature doesn't make a vulnerable driver safe.
-  ``wazuh.agent.name``: The endpoint that loaded the driver.

The test driver has a valid Microsoft signature, so the standard ``Unsigned kernel driver loaded`` rule raises no finding for it. The emulation also raises two standard findings for the new service, outside the ``event.action: driver-loaded`` search. The first is ``Kernel driver service created with sc.exe (Sysmon)``, followed by the ``sc.exe`` command line. The second is ``System service installed - byovdtest``.

Troubleshooting
---------------

Run these checks when the expected finding doesn't appear.

+----------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| Check                                  | How                                                                                                                                                    |
+========================================+========================================================================================================================================================+
| Sysmon logs driver loads               | The ``Get-WinEvent`` command from :ref:`Attack emulation <poc_vulnerable_driver_attack_emulation>` returns an Event ID 6 event for ``byovd-test.sys``. |
+----------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| The agent reads the Sysmon channel     | The ``(1951)`` message from :ref:`Verify data ingestion <poc_vulnerable_driver_verify_data_ingestion>` is in the Wazuh agent log.                      |
+----------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| Events reach Wazuh                     | In **Explore** > **Discover**, search for ``event.dataset: sysmon and event.action: driver-loaded``.                                                   |
+----------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| The hash matches                       | The rule hash is in uppercase and equals the ``SHA256`` value of the ``Hashes`` line in the Sysmon event.                                              |
+----------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| The rule is in the Custom space        | **Ruleset management** > **Rules** lists the rule in the **Custom** space.                                                                             |
+----------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| The detector is active                 | ``vulnerable_drivers_detector`` is active in **Ruleset management** > **Detectors**.                                                                   |
+----------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| The ``windows`` integration is enabled | **Ruleset management** > **Overview** shows it enabled in the **Standard** space.                                                                      |
+----------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+

.. _poc_vulnerable_driver_clean_up:

Clean up
--------

Restore your lab snapshot, or complete these steps on the Windows Server endpoint in PowerShell with administrator privileges.

#. Stop and delete the test service, then delete the driver copy:

   .. code-block:: ps1con

      > sc.exe stop byovdtest
      > sc.exe delete byovdtest
      > Remove-Item -Path C:\Windows\Temp\byovd-test.sys

   The output shows ``1  STOPPED`` in the ``STATE`` line and ``[SC] DeleteService SUCCESS``. The ``sc.exe stop`` command reports an error if the service isn't running. If ``Remove-Item`` reports that the file is in use, restart the endpoint and run it again.

#. Uninstall Sysmon:

   .. code-block:: ps1con

      > C:\Sysmon\Sysmon64.exe -u

   The output includes ``Sysmon64 removed.`` and ``SysmonDrv removed.``

#. Remove the ``<localfile>`` block you added to ``C:\Program Files (x86)\ossec-agent\ossec.conf`` and restart the Wazuh agent.

To stop the detection, delete ``vulnerable_drivers_detector`` in **Ruleset management** > **Detectors**.
