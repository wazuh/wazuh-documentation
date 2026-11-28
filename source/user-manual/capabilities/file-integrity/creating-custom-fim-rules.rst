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

This section shows how to use fields decoded from FIM events in custom rules, explaining what each decoded field represents in the Wazuh Common Schema.

Mapping FIM fields to Wazuh findings
--------------------------------------

The following table shows a subset of Wazuh Common Schema (WCS) fields as they appear in a finding. Refer to `WCS fields <https://github.com/wazuh/wazuh-indexer-plugins/blob/5.0.0/wcs/stateless/events/main/docs/fields.csv>`__ for the complete list.

+-----------------------------------+------------------------------------------------------------------------------------------------------+
| WCS field                         | Field description                                                                                    |
+===================================+======================================================================================================+
| ``wazuh.agent.id``                | Unique identifier of the Wazuh agent.                                                                |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``wazuh.agent.name``              | Name assigned to the agent.                                                                          |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``wazuh.agent.version``           | Version of the Wazuh agent.                                                                          |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``wazuh.agent.host.architecture`` | Host system architecture.                                                                            |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``wazuh.cluster.name``            | Name of the Wazuh cluster.                                                                           |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``wazuh.cluster.node``            | Cluster node where the event originated.                                                             |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``file.path``                     | Absolute path of the monitored file.                                                                 |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``file.size``                     | File size in bytes.                                                                                  |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``file.mtime``                    | Last modification timestamp.                                                                         |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``file.inode``                    | Inode number of the file.                                                                            |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``file.uid``                      | User ID of the file owner.                                                                           |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``file.owner``                    | Username of the file owner.                                                                          |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``file.gid``                      | Group ID of the file.                                                                                |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``file.group``                    | Group name owning the file.                                                                          |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``file.mode``                     | File permissions, for example, ``rw-r--r--``. On Windows, the access control list (ACL) of the file. |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``event.reason``                  | For created and deleted files, how the FIM module detected the change: ``scheduled``, ``realtime``,  |
|                                   | or ``whodata``. For modified files, each changed attribute with its old and new values, for example, |
|                                   | ``file.size: 6 -> 12``.                                                                              |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``file.attributes``               | File attributes (system‑dependent).                                                                  |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``file.device``                   | Device associated with the file.                                                                     |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``file.hash.md5``                 | MD5 hash of the file contents.                                                                       |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``file.hash.sha1``                | SHA‑1 hash of the file contents.                                                                     |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``file.hash.sha256``              | SHA‑256 hash of the file contents.                                                                   |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``event.created``                 | Time when the FIM module detected the change.                                                        |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``event.action``                  | Type of change: ``created``, ``modified``, or ``deleted``.                                           |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``process.real_user.name``        | Name of the user who ran the process that changed the file. Who-data mode only.                      |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``process.real_user.id``          | ID of that user. On Windows, it holds the user's security identifier (SID). Who-data mode only.      |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``process.executable``            | Process that changed the file. It holds the full path on Windows and in Linux audit mode, and only   |
|                                   | the process name in Linux eBPF mode. Who-data mode only.                                             |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``process.name``                  | File name of the process that changed the file, for example, ``powershell.exe``. Who-data mode only. |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``process.pid``                   | ID of the process that changed the file. Who-data mode only.                                         |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``process.parent.pid``            | ID of the parent process of the process that changed the file. Linux who-data mode only.             |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``user.name``                     | Login name of the user who started the session, for example, the user who ran ``sudo``. On Windows,  |
|                                   | it holds the same user as ``process.real_user.name``. Who-data mode only.                            |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``user.id``                       | ID of that user. On Windows, it holds the user's security identifier (SID). Who-data mode only.      |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``user.effective.name``           | Effective user of the process. Linux who-data mode only.                                             |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``user.effective.id``             | ID of the effective user, for example, 0 when the user ran the command with ``sudo``. Linux who-data |
|                                   | mode only.                                                                                           |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``user.group.id``                 | ID of the group the process ran as, for example, 0 when the user ran the command with ``sudo``.      |
|                                   | Linux who-data mode only.                                                                            |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| ``user.group.name``               | Name of that group. Linux who-data mode only.                                                        |
+-----------------------------------+------------------------------------------------------------------------------------------------------+

Custom FIM rules example
----------------------------

Trigger file deletion findings
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

Create custom integration
""""""""""""""""""""""""""""

An integration is a logical grouping of decoders, KVDBs, and rules that belong to a common log source or product. Perform the following steps on the Wazuh dashboard in **Ruleset management**.

#. Go to **Ruleset management** → **Overview** → **Integrations** → **Actions** → **Create**. Make sure the :doc:`space </user-manual/data-analysis/space>` selector reads Draft.

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

Wazuh rules define the detection logic for identifying relevant security activity in normalized events. Make sure the space selector reads **Draft** and then follow these steps to create a custom rule.

#. Go to **Ruleset management** → **Detection** → **Rules**, and click **Actions** → **Create**.

#. Select **YAML Editor**, choose the integration ``wazuh-fim-custom``, and paste the rule below:

   .. code-block:: yaml

      logsource:
        product: wazuh-fim-custom
      level: medium
      status: stable
      detection:
        condition: selection
        selection:
          event.action: deleted
          file.path|startswith: 'c:\test\'
      metadata:
        title: Wazuh FIM - Monitored file deleted by {{process.real_user.name}} with {{process.name}}
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

#. Click **Create rule** to complete the rule creation process.

   .. thumbnail:: /images/manual/fim/create-rule.png
     :title: Create rule
     :alt: Create rule
     :align: center
     :width: 80%

The rule title uses two fields that the FIM module fills only in who-data mode: ``process.real_user.name``, the user who ran the process, and ``process.name``, the process that deleted the file. For this reason, the Windows endpoint configuration below monitors ``C:\test`` with ``whodata="yes"``. On Linux, ``process.real_user.name`` holds the real user of the process, which is ``root`` when a user runs the command with ``sudo``. The login user is in ``user.name``. The ``file.path`` condition limits the rule to deletions in the ``C:\test`` directory. Write the path in lowercase, because Windows paths in findings are lowercase.

.. note::

   The ``logsource.product`` field must hold the same value as ``metadata.title`` from the integration it belongs to. In our case, this is ``wazuh-fim-custom``.

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

#. After promotion, the integration becomes active, and detectors can use its rules to generate findings from incoming FIM events. Changes apply to events within about 2 minutes. If the rule doesn't appear in the rule list of the detector, wait and reload the page.

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
