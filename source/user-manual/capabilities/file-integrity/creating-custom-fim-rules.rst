.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh includes out-of-the-box rules that trigger findings on the creation, modification, or deletion of monitored files. Learn more about it in this section.

Creating custom FIM rules
==========================

Wazuh includes out-of-the-box rules that trigger findings when monitored files are created, modified, or deleted. The image below shows findings for file addition, modification, and deletion.

.. thumbnail:: /images/manual/fim/fim-findings.png
  :title: FIM findings
  :alt: FIM findings
  :align: center
  :width: 80%

You can use custom Wazuh FIM rules to monitor changes to files and directories based on specific criteria such as filename, permissions, and content. For example, you can create a custom rule to detect changes to a critical system file or configuration file. Whenever a user or process modifies the file, Wazuh triggers a specific finding indicating the change and the details of the modification.

Custom FIM rules extend the out-of-the-box detection capability of the Wazuh FIM module, making it easier to identify and respond to security incidents such as data breaches, insider threats, and other cyberattacks involving file manipulation.

This section shows how to use fields decoded from FIM events in custom rules, explaining what each decoded field represents in the Wazuh Common Schema.

Mapping FIM fields to Wazuh findings
--------------------------------------

Fields are information that the Wazuh decoder extracts from events the Wazuh manager receives. Each event type has specific fields. The decoder identifies them with a field name. The Wazuh manager translates these fields into Wazuh Common Schema (WCS) fields and sends them to the Wazuh indexer for storage and threat detection.

FIM findings: fields correspondence
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following table shows a subset of FIM event fields and their corresponding Wazuh Common Schema (WCS) fields as they appear in a finding. Refer to `WCS fields <https://github.com/wazuh/wazuh-indexer-plugins/blob/5.0.0/wcs/stateless/events/main/docs/fields.csv>`__ for the complete list.

+--------------------------+-----------------------------------+---------------------------------------------+
| FIM event field          | WCS field                         | Field description                           |
+==========================+===================================+=============================================+
| ``agent.id``             | ``wazuh.agent.id``                | Unique identifier of the Wazuh agent.       |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``agent.name``           | ``wazuh.agent.name``              | Name assigned to the agent.                 |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``agent.version``        | ``wazuh.agent.version``           | Version of the Wazuh agent.                 |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``agent.arch``           | ``wazuh.agent.host.architecture`` | Host system architecture.                   |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``cluster.name``         | ``wazuh.cluster.name``            | Name of the Wazuh cluster.                  |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``cluster.node``         | ``wazuh.cluster.node``            | Cluster node where the event originated.    |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``path``                 | ``file.path``                     | Absolute path of the monitored file.        |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``size``                 | ``file.size``                     | File size in bytes.                         |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``mtime``                | ``file.mtime``                    | Last modification timestamp.                |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``inode``                | ``file.inode``                    | Inode number of the file.                   |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``uid``                  | ``file.uid``                      | User ID of the file owner.                  |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``owner``                | ``file.owner``                    | Username of the file owner.                 |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``gid``                  | ``file.gid``                      | Group ID of the file.                       |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``group``                | ``file.group``                    | Group name owning the file.                 |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``permissions``          | ``file.mode``                     | File permissions, for example, rw-r--r--.   |
|                          |                                   | On Windows, the access control list (ACL)   |
|                          |                                   | of the file.                                |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``mode``                 | ``event.reason``                  | For created and deleted files, how the      |
|                          |                                   | FIM module detected the change:             |
|                          |                                   | ``scheduled``, ``realtime``, or             |
|                          |                                   | ``whodata``.                                |
|                          |                                   | For modified files, each changed            |
|                          |                                   | attribute with its old and new values, for  |
|                          |                                   | example, ``file.size: 6 -> 12``.            |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``attributes``           | ``file.attributes``               | File attributes (system‑dependent).         |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``device``               | ``file.device``                   | Device associated with the file.            |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``md5``                  | ``file.hash.md5``                 | MD5 hash of the file contents.              |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``sha1``                 | ``file.hash.sha1``                | SHA‑1 hash of the file contents.            |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``sha256``               | ``file.hash.sha256``              | SHA‑256 hash of the file contents.          |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``created``              | ``event.created``                 | Time when the FIM module detected the       |
|                          |                                   | change.                                     |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``type``                 | ``event.action``                  | Type of change: created, modified, or       |
|                          |                                   | deleted.                                    |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``audit.user_name``      | ``process.real_user.name``        | Name of the user who ran the process that   |
|                          |                                   | changed the file. Who-data mode only.       |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``audit.user_id``        | ``process.real_user.id``          | ID of that user. On Windows, it holds the   |
|                          |                                   | user's security identifier (SID). Who-data  |
|                          |                                   | mode only.                                  |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``audit.process_name``   | ``process.executable``            | Process that changed the file. It holds the |
|                          |                                   | full path on Windows and in Linux audit     |
|                          |                                   | mode, and only the process name in Linux    |
|                          |                                   | eBPF mode. Who-data mode only.              |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``audit.process_name``   | ``process.name``                  | File name of the process that changed the   |
|                          |                                   | file, for example, ``powershell.exe``.      |
|                          |                                   | Who-data mode only.                         |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``audit.process_id``     | ``process.pid``                   | ID of the process that changed the file.    |
|                          |                                   | Who-data mode only.                         |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``audit.audit_name``     | ``user.name``                     | Login name of the user who started the      |
|                          |                                   | session, for example, the user who ran      |
|                          |                                   | ``sudo``. On Windows, it holds the same     |
|                          |                                   | user as ``process.real_user.name``.         |
|                          |                                   | Who-data mode only.                         |
+--------------------------+-----------------------------------+---------------------------------------------+
| ``audit.effective_name`` | ``user.effective.name``           | Effective user of the process. Linux        |
|                          |                                   | who-data mode only.                         |
+--------------------------+-----------------------------------+---------------------------------------------+

Custom FIM rules example
----------------------------

The following example demonstrates how to customize the default Wazuh FIM detection behavior by building a custom rule from the Wazuh Common Schema (WCS) FIM fields.

Trigger file deletion findings
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Accidental or unauthorized deletion of critical files can cause data loss, system disruption, or downtime. An attacker who gains access to a system can delete critical files, rendering it unusable and disrupting the organization.

Wazuh includes an out-of-the-box rule that generates a finding when a monitored file or a file in a monitored directory is deleted. This example creates a custom FIM rule that triggers a finding and shows the user and application that deleted a file in the rule title.

Use case description
~~~~~~~~~~~~~~~~~~~~~~~

+----------------+-----------------------------------------------------------------------+
| Endpoint       | Description                                                           |
+================+=======================================================================+
| **Windows 11** | The FIM module monitors a folder on this endpoint for file deletions. |
+----------------+-----------------------------------------------------------------------+

Wazuh dashboard
~~~~~~~~~~~~~~~~~

This section describes how to create custom rules in **Ruleset management** on the Wazuh dashboard.

Create custom integration
""""""""""""""""""""""""""""

An integration is a logical grouping of decoders, KVDBs, and rules that belong to a common log source or product. Perform the following steps on the Wazuh dashboard in **Ruleset management**.

#. Go to **Ruleset management** → **Overview** → **Integrations** → **Actions** → **Create**. Make sure the space selector reads Draft.

#. In the form, enter the following values. Make sure the integration is **Enabled**, then click **Create integration**:

   -  **Title**: ``wazuh-fim-custom``
   -  **Category**: ``System Activity``
   -  **Author**: ``Security Team``

   .. thumbnail:: /images/manual/fim/create-integration.png
     :title: Create integration
     :alt: Create integration
     :align: center
     :width: 80%

Create a custom rule
""""""""""""""""""""""

Wazuh rules define the detection logic for identifying relevant security activity in normalized events. They describe what should be detected by specifying conditions on event fields. Make sure the space selector reads **Draft** and then follow these steps to create a custom rule.

#. Go to **Ruleset management** → **Detection** → **Rules**, and click **Actions** → **Create**.

#. Select **YAML Editor**, choose the integration ``wazuh-fim-custom``, and paste the rule below:

   .. code-block:: yaml

      logsource:
        product: wazuh-fim-custom
      tags:
      - attack.defense-evasion
      - attack.impact
      - attack.t1070.004
      - attack.t1485
      falsepositives:
      - Legitimate file cleanup operations or uninstallation of software
      - Authorized administrative removal of files
      - Temporary file deletion by applications
      level: medium
      status: stable
      enabled: true
      detection:
        condition: selection
        selection:
          event.action: deleted
      metadata:
        title: Wazuh FIM - Monitored file deleted by {{process.real_user.name}} with {{process.name}}
        author: Security Team
        description: >-
          Detects file deletion events reported by Wazuh File Integrity Monitoring
          (FIM). A monitored file was removed, which could indicate unauthorized
          deletion, anti-forensics activity, or data destruction.
        references:
        - >-
          https://documentation.wazuh.com/5.0-rc/user-manual/capabilities/file-integrity/index.html
        - >-
          https://documentation.wazuh.com/5.0-rc/user-manual/reference/ossec-conf/syscheck.html
        documentation: ''
        supports:
        - ''
      mitre:
        tactic:
          id:
          - TA0005
          - TA0040
          name:
          - Stealth
          - Impact
        technique:
          id:
          - T1070
          - T1485
          name:
          - Indicator Removal
          - Data Destruction
      compliance:
        cmmc:
        - AU.L2-3.3.1
        - CM.L2-3.4.1
        - SI.L2-3.14.1
        fedramp:
        - AU-6
        - CM-6
        - SI-4
        gdpr:
        - II_5.1.f
        - IV_32.1.a
        - IV_33.1
        - IV_34.1
        hipaa:
        - 164.308.a.1.ii.D
        - 164.308.a.6
        - 164.312.b
        iso_27001:
        - A.12.4.1
        - A.12.6.1
        - A.16.1.2
        nis2:
        - 21.2.a
        - 21.2.e
        - '23'
        nist_800_171:
        - 3.3.1
        - 3.3.2
        - 3.4.1
        - 3.14.6
        - 3.14.7
        nist_800_53:
        - AU-6
        - CM-6
        - SI-4
        pci_dss:
        - '6.2'
        - '10.5'
        - '11.4'
        tsc:
        - A1.2
        - CC7.2
        - CC7.3

   The rule title uses two fields that the FIM module fills only in who-data mode: ``process.real_user.name``, the user who ran the process, and ``process.name``, the process that deleted the file. For this reason, the Windows endpoint configuration below monitors ``C:\test`` with ``whodata="yes"``. On Linux, ``process.real_user.name`` holds the real user of the process, which is ``root`` when a user runs the command with ``sudo``. The login user is in ``user.name``.

   The ``documentation`` and ``supports`` keys are optional. You can leave them empty, as in this example, or delete them.

   .. note::

      The ``logsource.product`` field must hold the same value as ``metadata.title`` from the integration it belongs to. In our case, this is ``wazuh-fim-custom``.

#. Click **Create rule** to complete the rule creation process.

   .. thumbnail:: /images/manual/fim/create-rule.png
     :title: Create rule
     :alt: Create rule
     :align: center
     :width: 80%

Promote the rule from the draft to the test space
""""""""""""""""""""""""""""""""""""""""""""""""""""

In the draft space, you create and refine your integrations, decoders, and rules. Promoting this rule to the test space allows you to validate it before introducing it to production. Make sure the space selector reads **Draft**, then follow these steps to promote the content.

#. Go to **Ruleset management** → **Overview**, and click **Space actions** → **Promote**. The **Promote** page lists every pending change in the Draft space, not only this rule.

   .. thumbnail:: /images/manual/fim/space-actions-promote.png
      :title: Space actions
      :alt: Ruleset management Overview with the Space actions menu open and the Promote option
      :align: center
      :width: 80%

   .. thumbnail:: /images/manual/fim/promote-draft.png
     :title: Promote draft
     :alt: Promote draft
     :align: center
     :width: 80%

#. Click **Promote**, type ``promote`` in the confirmation dialog, and click **Promote** again.

   .. thumbnail:: /images/manual/fim/promote-draft-confirmation.png
     :title: Promote confirmation
     :alt: Promote confirmation
     :align: center
     :width: 80%

Promote the rule from test to custom
""""""""""""""""""""""""""""""""""""""

Promoting your rule makes it available in production, where detectors can use it to analyze incoming events. Make sure the space selector reads **Test**, then follow these steps to promote the rule.

#. Go to **Ruleset management → Overview**.

#. Click **Space actions** → **Promote**, then click **Promote**. Type ``promote`` in the confirmation dialog, and click **Promote** again.

   .. thumbnail:: /images/manual/fim/promote-test.png
     :title: Promote test
     :alt: Promote test
     :align: center
     :width: 80%

   .. thumbnail:: /images/manual/fim/promote-test-confirmation.png
     :title: Promote test confirmation
     :alt: Promote test confirmation
     :align: center
     :width: 80%

#. After promotion, the integration becomes active, and detectors can use its rules to generate findings from incoming FIM events. Promotion can take a few minutes to take effect. Changes apply to events within about 2 minutes. If the rule doesn't appear in the rule list of the detector, wait and reload the page.

Create a detector
""""""""""""""""""""

A detector is the scheduled job that executes your rule. It scans indexed events from monitored endpoints at a defined interval, applies the selected rules, and generates findings when matches occur. Follow these steps to create a detector. Create the detector before you run the test. The detector checks only the events indexed after it starts.

#. Go to **Ruleset management** → **Detection** → **Detectors** → **Create detector**.

   .. thumbnail:: /images/manual/fim/detector-list.png
     :title: Detector list
     :alt: Detector list
     :align: center
     :width: 80%

#. Fill the required sections with this information and click **Create detector**.

   -  **Name**: ``wazuh-custom-fim-detector``
   -  **Select indexes/aliases**: ``wazuh-events-v5-system-activity`` (this must match the integration category you configured earlier)
   -  **Space**: Custom
   -  **Integration**: ``wazuh-fim-custom``
   -  **Selected rules**: ``Wazuh FIM - Monitored file deleted by {{process.real_user.name}} with {{process.name}}``
   -  **Run every**: ``1 Minutes``

   .. thumbnail:: /images/manual/fim/create-detector-1.png
     :title: Create detector 1
     :alt: Create detector 1
     :align: center
     :width: 80%

   .. thumbnail:: /images/manual/fim/create-detector-2.png
     :title: Create detector 2
     :alt: Create detector 2
     :align: center
     :width: 80%

Windows endpoint
~~~~~~~~~~~~~~~~~~~

Perform the following steps to configure the Wazuh FIM module to monitor file deletion in the ``C:\test`` directory.

#. Run the command below using PowerShell as an administrator to create the ``C:\test`` directory on the endpoint:

   .. code-block:: powershell

      > mkdir C:\test

#. Edit the Wazuh agent configuration file ``C:\Program Files (x86)\ossec-agent\ossec.conf``. Add the ``C:\test`` directory for monitoring inside the ``<ossec_config>`` block:

   .. code-block:: xml

      <syscheck>
        <directories whodata="yes">C:\test</directories>
      </syscheck>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: powershell

      > Restart-Service -Name WazuhSvc

Test the configuration
~~~~~~~~~~~~~~~~~~~~~~~~~

#. Sign in to the Windows endpoint as a regular user. In PowerShell, create the ``hello.txt`` file in the ``C:\test`` directory:

   .. code-block:: powershell

      > Set-Content -Path C:\test\hello.txt -Value "hello"

#. Delete the file:

   .. code-block:: powershell

      > Remove-Item -Path C:\test\hello.txt

Visualize the findings
~~~~~~~~~~~~~~~~~~~~~~~~

Navigate to **Endpoint security** > **File Integrity Monitoring** > **Findings** on the Wazuh dashboard. The custom rule generates the finding ``Wazuh FIM - Monitored file deleted by test with powershell.exe``. The out-of-the-box rule also generates ``Wazuh FIM - File deleted - c:\test\hello.txt``.

.. thumbnail:: /images/manual/fim/deleted-file-finding.png
  :title: Deleted file finding
  :alt: Deleted file finding
  :align: center
  :width: 80%

.. thumbnail:: /images/manual/fim/deleted-file-finding-expanded.png
   :title: Deleted file finding expanded
   :alt: Document details of the Wazuh FIM - Monitored file deleted by test with powershell.exe finding
   :align: center
   :width: 80%

You can see the finding fields in the data below:

.. code-block:: json
   :emphasize-lines: 6-11, 42-44

   {
     "_index": ".ds-wazuh-findings-v5-system-activity-000001",
     "_id": "k5utRTHa4asi1vVZkf9K_g",
     "_score": null,
     "_source": {
       "process": {
         "real_user": {
           "name": "test",
           "id": "S-1-5-21-1349147258-1164413856-2138503564-1000"
         },
         "name": "powershell.exe",
         "pid": 1488,
         "executable": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
       },
       "@timestamp": "2026-11-13T00:16:37.252108582Z",
       "file": {
         "owner": "test",
         "extension": "txt",
         "mtime": "2026-11-13T00:13:36.000Z",
         "directory": "c:\\test",
         "inode": "0",
         "mode": [
           "{\"S-1-5-18\":{\"name\":\"SYSTEM\",\"allowed\":[\"delete\",\"read_control\",\"write_dac\",\"write_owner\",\"synchronize\",\"read_data\",\"write_data\",\"append_data\",\"read_ea\",\"write_ea\",\"execute\",\"read_attributes\",\"write_attributes\"]}}",
           "{\"S-1-5-32-544\":{\"name\":\"Administrators\",\"allowed\":[\"delete\",\"read_control\",\"write_dac\",\"write_owner\",\"synchronize\",\"read_data\",\"write_data\",\"append_data\",\"read_ea\",\"write_ea\",\"execute\",\"read_attributes\",\"write_attributes\"]}}",
           "{\"S-1-5-32-545\":{\"name\":\"Users\",\"allowed\":[\"read_control\",\"synchronize\",\"read_data\",\"read_ea\",\"execute\",\"read_attributes\"]}}",
           "{\"S-1-5-21-1349147258-1164413856-2138503564-1000\":{\"name\":\"test\",\"allowed\":[\"delete\",\"read_control\",\"write_dac\",\"write_owner\",\"synchronize\",\"read_data\",\"write_data\",\"append_data\",\"read_ea\",\"write_ea\",\"execute\",\"read_attributes\",\"write_attributes\"]}}"
         ],
         "path": "c:\\test\\hello.txt",
         "uid": "S-1-5-21-1349147258-1164413856-2138503564-1000",
         "size": 7,
         "name": "hello.txt",
         "attributes": [
           "ARCHIVE"
         ],
         "device": "2",
         "hash": {
           "sha1": "aa5916ae7fd159a18b1b72ea905c757207e26689",
           "sha256": "cd2eca3535741f27a8ae40c31b0c41d4057a7a7b912b33b9aed86485d1c84676",
           "md5": "af5597c29467a96523a70787c319f4db"
         }
       },
       "related": {
         "user": [
           "test"
         ],
         "hash": [
           "af5597c29467a96523a70787c319f4db",
           "aa5916ae7fd159a18b1b72ea905c757207e26689",
           "cd2eca3535741f27a8ae40c31b0c41d4057a7a7b912b33b9aed86485d1c84676"
         ]
       },
       "data_stream": {
         "type": "logs",
         "dataset": "wazuh.fim"
       },
       "wazuh": {
         "cluster": {
           "node": "node01",
           "name": "wazuh"
         },
         "protocol": {
           "location": "syscheck",
           "queue": 56
         },
         "agent": {
           "host": {
             "hostname": "WIN-SERVER-2022",
             "os": {
               "name": "Microsoft Windows Server 2022 Datacenter",
               "type": "windows",
               "version": "10.0.20348.5773",
               "platform": "windows"
             },
             "architecture": "x86_64"
           },
           "name": "WindowsServer2022",
           "groups": [
             "default"
           ],
           "id": "002",
           "version": "v5.0.0"
         },
         "integration": {
           "name": "wazuh-fim",
           "decoders": [
             "decoder/core-wazuh-message/0",
             "decoder/wazuh-fim/0"
           ],
           "category": "system-activity"
         },
         "rule": {
           "level": "medium",
           "compliance": {
             "iso_27001": [
               "A.12.4.1",
               "A.12.6.1",
               "A.16.1.2"
             ],
             "hipaa": [
               "164.308.a.1.ii.D",
               "164.308.a.6",
               "164.312.b"
             ],
             "pci_dss": [
               "6.2",
               "10.5",
               "11.4"
             ],
             "tsc": [
               "A1.2",
               "CC7.2",
               "CC7.3"
             ],
             "nis2": [
               "21.2.a",
               "21.2.e",
               "23"
             ],
             "nist_800_171": [
               "3.3.1",
               "3.3.2",
               "3.4.1",
               "3.14.6",
               "3.14.7"
             ],
             "fedramp": [
               "AU-6",
               "CM-6",
               "SI-4"
             ],
             "nist_800_53": [
               "AU-6",
               "CM-6",
               "SI-4"
             ],
             "cmmc": [
               "AU.L2-3.3.1",
               "CM.L2-3.4.1",
               "SI.L2-3.14.1"
             ],
             "gdpr": [
               "II_5.1.f",
               "IV_32.1.a",
               "IV_33.1",
               "IV_34.1"
             ]
           },
           "mitre": {
             "technique": {
               "name": [
                 "Indicator Removal",
                 "Data Destruction"
               ],
               "id": [
                 "T1070",
                 "T1485"
               ]
             },
             "tactic": {
               "name": [
                 "Stealth",
                 "Impact"
               ],
               "id": [
                 "TA0005",
                 "TA0040"
               ]
             }
           },
           "id": "d45e8063-5f89-4493-8d23-3b7fc3ed3eb9",
           "title": "Wazuh FIM - Monitored file deleted by test with powershell.exe",
           "tags": [
             "medium",
             "wazuh-fim-custom",
             "attack.defense-evasion",
             "attack.impact",
             "attack.t1070.004",
             "attack.t1485"
           ],
           "status": "stable"
         },
         "event": {
           "id": "e0ce6bd3-3ab3-45a5-a594-d293d019440f"
         },
         "space": {
           "name": "standard"
         }
       },
       "event": {
         "reason": "whodata",
         "original": "{\"collector\":\"file\",\"module\":\"fim\",\"data\":{\"event\":{\"created\":\"2026-11-13T00:16:27.289Z\",\"type\":\"deleted\"},\"file\":{\"size\":7,\"permissions\":[\"{\\\"S-1-5-18\\\":{\\\"name\\\":\\\"SYSTEM\\\",\\\"allowed\\\":[\\\"delete\\\",\\\"read_control\\\",\\\"write_dac\\\",\\\"write_owner\\\",\\\"synchronize\\\",\\\"read_data\\\",\\\"write_data\\\",\\\"append_data\\\",\\\"read_ea\\\",\\\"write_ea\\\",\\\"execute\\\",\\\"read_attributes\\\",\\\"write_attributes\\\"]}}\",\"{\\\"S-1-5-32-544\\\":{\\\"name\\\":\\\"Administrators\\\",\\\"allowed\\\":[\\\"delete\\\",\\\"read_control\\\",\\\"write_dac\\\",\\\"write_owner\\\",\\\"synchronize\\\",\\\"read_data\\\",\\\"write_data\\\",\\\"append_data\\\",\\\"read_ea\\\",\\\"write_ea\\\",\\\"execute\\\",\\\"read_attributes\\\",\\\"write_attributes\\\"]}}\",\"{\\\"S-1-5-32-545\\\":{\\\"name\\\":\\\"Users\\\",\\\"allowed\\\":[\\\"read_control\\\",\\\"synchronize\\\",\\\"read_data\\\",\\\"read_ea\\\",\\\"execute\\\",\\\"read_attributes\\\"]}}\",\"{\\\"S-1-5-21-1349147258-1164413856-2138503564-1000\\\":{\\\"name\\\":\\\"test\\\",\\\"allowed\\\":[\\\"delete\\\",\\\"read_control\\\",\\\"write_dac\\\",\\\"write_owner\\\",\\\"synchronize\\\",\\\"read_data\\\",\\\"write_data\\\",\\\"append_data\\\",\\\"read_ea\\\",\\\"write_ea\\\",\\\"execute\\\",\\\"read_attributes\\\",\\\"write_attributes\\\"]}}\"],\"uid\":\"S-1-5-21-1349147258-1164413856-2138503564-1000\",\"owner\":\"test\",\"inode\":\"0\",\"device\":\"2\",\"mtime\":\"2026-11-13T00:13:36.000Z\",\"hash\":{\"md5\":\"af5597c29467a96523a70787c319f4db\",\"sha1\":\"aa5916ae7fd159a18b1b72ea905c757207e26689\",\"sha256\":\"cd2eca3535741f27a8ae40c31b0c41d4057a7a7b912b33b9aed86485d1c84676\"},\"attributes\":[\"ARCHIVE\"],\"path\":\"c:\\\\test\\\\hello.txt\",\"mode\":\"whodata\",\"audit\":{\"user_id\":\"S-1-5-21-1349147258-1164413856-2138503564-1000\",\"user_name\":\"test\",\"process_name\":\"C:\\\\Windows\\\\System32\\\\WindowsPowerShell\\\\v1.0\\\\powershell.exe\",\"process_id\":1488}}}}",
         "kind": "event",
         "created": "2026-11-13T00:16:27.289Z",
         "action": "deleted",
         "index": ".ds-wazuh-events-v5-system-activity-000001",
         "category": [
           "file"
         ],
         "type": [
           "deletion"
         ],
         "dataset": "wazuh.fim",
         "doc_id": "M0JD0qEB348XT2D6rUg9",
         "outcome": "success"
       }
     },
     "sort": [
       1794528997252108582
     ]
   }
