.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to use Active Response to remove a malicious file detected on a monitored endpoint.

Removing a malicious file with active response
====================================================

In this use case, we download a malicious test file to a Windows 11 endpoint. Wazuh file integrity monitoring detects the file and evaluates the resulting finding against the configured Alerting monitor. When the finding meets the monitor conditions, Wazuh runs a custom ``remove-file`` script on the endpoint to delete the file.

Infrastructure
-----------------

+------------------+----------------------------------------------------------------------------------------------------+
| Endpoint         | Description                                                                                        |
+==================+====================================================================================================+
| **Windows 11**   | We download a test malware file to this victim endpoint. This endpoint requires an installed Wazuh |
|                  | agent enrolled with the Wazuh manager.                                                             |
+------------------+----------------------------------------------------------------------------------------------------+

Configuration
----------------

Windows endpoint
^^^^^^^^^^^^^^^^^^

Perform the following steps to configure the Wazuh agent to monitor filesystem changes in the ``C:\Users\*\Downloads`` directory.

#. Edit the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file on the monitored Windows endpoint. Add the directories for monitoring within the ``<syscheck>`` block. To get additional information about the user and the process that made the changes, enable who-data audit:

   .. code-block:: xml

      <directories check_all="yes" report_changes="yes" whodata="yes">C:\Users\*\Downloads</directories>

#. Restart the Wazuh agent using PowerShell with administrator privileges to apply the changes:

   .. code-block:: powershell

      > Restart-Service -Name wazuh

#. Create a ``remove-file.py`` file in the ``C:\Users\public`` directory and add the following script to it:

   .. code-block:: python

      #!/usr/bin/python3
      # Wazuh - Custom Active Response script (5.x compliant, stateless)
      # This program is free software; you can redistribute it
      # and/or modify it under the terms of the GNU General Public
      # License (version 2) as published by the FSF - Free Software
      # Foundation.

      import os
      import sys
      import json
      import datetime
      from pathlib import PureWindowsPath, PurePosixPath
      import platform

      LOG_FILE = "C:\\Program Files (x86)\\ossec-agent\\active-response\\active-responses.log"

      OS_SUCCESS = 0
      OS_INVALID = -1


      def write_debug_file(ar_name, msg):
          with open(LOG_FILE, mode="a") as log_file:
              ar_name_posix = str(PurePosixPath(PureWindowsPath(ar_name[ar_name.find("active-response"):])))
              log_file.write(str(datetime.datetime.now().strftime('%Y/%m/%d %H:%M:%S')) + " " + ar_name_posix + ": " + msg + "\n")


      def main(argv):

          write_debug_file(argv[0], "Started")

          # get alert from stdin
          input_str = ""
          for line in sys.stdin:
              input_str = line
              break

          write_debug_file(argv[0], input_str)

          try:
              data = json.loads(input_str)
          except ValueError:
              write_debug_file(argv[0], "Decoding JSON has failed, invalid input format")
              sys.exit(OS_INVALID)

          command = data.get("command")

          # Stateless AR only ever receives "enable" - guard anyway
          if command != "enable":
              write_debug_file(argv[0], "Command is not 'enable' (got: " + str(command) + "), nothing to do")
              sys.exit(OS_SUCCESS)

          file_path = data.get("file", {}).get("path")

          if not file_path:
              write_debug_file(argv[0], "No file.path present in the active response payload")
              sys.exit(OS_INVALID)

          write_debug_file(argv[0], "Removing file: " + file_path)

          try:
              os.remove(file_path)
              write_debug_file(argv[0], "Removed file: " + file_path)
          except FileNotFoundError:
              write_debug_file(argv[0], "File not found, nothing to remove: " + file_path)
          except PermissionError:
              write_debug_file(argv[0], "Permission denied removing file: " + file_path)
              sys.exit(OS_INVALID)
          except OSError as e:
              write_debug_file(argv[0], "Failed to remove file " + file_path + ": " + str(e))
              sys.exit(OS_INVALID)

          write_debug_file(argv[0], "Ended")

          sys.exit(OS_SUCCESS)


      if __name__ == "__main__":
          main(sys.argv)

#. Install Python 3 for Windows from `https://www.python.org/downloads/windows/ <https://www.python.org/downloads/windows/>`__ and select **Add python.exe to PATH** during the installation. Then open a new PowerShell window with administrator privileges and install PyInstaller:

   .. code-block:: powershell

      > pip install pyinstaller
      > cd C:\Users\Public
      > pyinstaller --version

#. Run the following commands using PowerShell with user privileges to create the executable file:

   .. code-block:: powershell

      > cd C:\Users\public
      > pyinstaller -F C:\Users\public\remove-file.py

   You can find the created ``remove-file.exe`` executable in the ``C:\Users\public\dist\`` directory.

#. Copy the ``remove-file.exe`` executable file to the ``C:\Program Files (x86)\ossec-agent\active-response\bin\`` directory.

Wazuh dashboard
^^^^^^^^^^^^^^^^

Perform the following steps to configure an active response script that triggers when a suspicious file is detected.

On the Wazuh dashboard, create the active response configuration as described in :doc:`configuration <../configuration>`, with the following settings:

+----------------+---------------------+
| Field          | Value               |
+================+=====================+
| **Name**       | ``remove_file_ar``  |
+----------------+---------------------+
| **Executable** | ``remove-file.exe`` |
+----------------+---------------------+
| **Location**   | ``Local``           |
+----------------+---------------------+
| **Type**       | ``Stateless``       |
+----------------+---------------------+

.. thumbnail:: /images/manual/active-response/removing-malicious-file-create-active-response.png
   :title: Create the remove_file_ar active response
   :alt: Create active response form with the remove_file_ar settings
   :align: center
   :width: 80%

Then create an Alerting monitor that runs the active response when a finding matches your conditions. This use case uses the Extraction query editor to match the FIM integration name, the file action, and the file path.

#. Navigate to **Explore** > **Alerting**, switch to the **Monitors** tab, then click **Create monitor**. Fill in the following parameters.

   +-------------------------+-----------------------------------+
   | Field                   | Value                             |
   +=========================+===================================+
   | Monitor name            | remove_file_ar_monitor            |
   +-------------------------+-----------------------------------+
   | Monitor type            | Active Response monitor           |
   +-------------------------+-----------------------------------+
   | Monitor defining method | Extraction query editor           |
   +-------------------------+-----------------------------------+
   | Frequency               | By interval                       |
   +-------------------------+-----------------------------------+
   | Run every               | 1 Minute(s)                       |
   +-------------------------+-----------------------------------+
   | Index                   | wazuh-findings-v5-system-activity |
   +-------------------------+-----------------------------------+

   .. thumbnail:: /images/manual/active-response/removing-malicious-file-create-monitor.png
      :title: Create the remove_file_ar_monitor Active response monitor
      :alt: Create monitor form with the remove_file_ar_monitor details
      :align: center
      :width: 80%

#. Replace the content of the **Define extraction query** field with the following query:

   .. code-block:: json

      {
          "description": "Detects files with a known malicious hash",
          "queries": [
              {
                  "name": "remove_file_ar_query",
                  "query": "wazuh.rule.title:*Malicious\\ hash\\ detected*",
                  "tags": []
              }
          ]
      }

   .. thumbnail:: /images/manual/active-response/removing-malicious-file-extraction-query.png
      :title: Define the remove_file_ar_query extraction query
      :alt: Extraction query editor with the remove_file_ar_query query and its response
      :align: center
      :width: 80%

#. In the **Triggers** section, click **Add trigger** and fill in the following parameters.

   +-------------------+----------------------------------+
   | Field             | Value                            |
   +===================+==================================+
   | Trigger name      | remove_file_ar_trigger           |
   +-------------------+----------------------------------+
   | Severity level    | 1 (Highest)                      |
   +-------------------+----------------------------------+
   | Trigger condition | query[name=remove_file_ar_query] |
   +-------------------+----------------------------------+

   .. thumbnail:: /images/manual/active-response/removing-malicious-file-create-trigger.png
      :title: Create the remove_file_ar_trigger trigger
      :alt: Trigger form for remove_file_ar_trigger with the query[name=remove_file_ar_query] condition
      :align: center
      :width: 80%

#. In the **Actions** subsection, click **Add active response**. Set **Action name** to ``remove_file_ar_action`` and select ``remove_file_ar`` as the **Active response**.

   .. thumbnail:: /images/manual/active-response/removing-malicious-file-create-action.png
      :title: Create the remove_file_ar_action active response action
      :alt: Active response action form for remove_file_ar_action
      :align: center
      :width: 80%

#. Click **Create** to save the monitor.

.. note::

   Extraction queries use the query string syntax. The ``*`` wildcard matches any sequence of characters. For example, ``wazuh.rule.title:*Malicious\ hash\ detected*`` matches any rule title that contains Malicious hash detected. A backslash escapes each space, and the JSON needs each backslash twice.

Attack emulation
-------------------

Use PowerShell to download an EICAR test file to the ``C:\Users\*\Downloads`` directory:

.. code-block:: powershell

   > cd "C:\Users\<USER>\Downloads"
   > Invoke-WebRequest -Uri https://secure.eicar.org/eicar.com.txt -OutFile eicar.txt

Replace ``<USER>`` with your username.

.. note::

   If the monitored endpoint has endpoint protection or antivirus software, such as Microsoft Defender, turn off its real-time protection before you download the test file. Otherwise, it quarantines the file as soon as it's written, and the active response has no file to remove. On Microsoft Defender, run ``Set-MpPreference -DisableRealtimeMonitoring $true`` in PowerShell with administrator privileges. If Tamper Protection is on, turn it off first in Windows Security. After the test, turn real-time protection back on with ``Set-MpPreference -DisableRealtimeMonitoring $false``.

Visualize the findings
--------------------------

You can visualize the findings in the Wazuh dashboard. To do this, go to the **Threat Hunting** module and add the filters below in the search bar to query the findings.

-  ``event.dataset:wazuh.fim``

.. thumbnail:: /images/manual/active-response/removing-malicious-file-threat-hunting.png
   :title: Malicious file finding in Threat Hunting
   :alt: Threat Hunting findings of the malicious file
   :align: center
   :width: 80%

The ``remove-file`` active response triggers to remove the malicious file. Navigate to **Security operations** > **Incident Response**. Switch to the **Responses** tab to see details about the triggered Active response.

.. thumbnail:: /images/manual/active-response/removing-malicious-file-incident-response.png
   :title: Triggered Active response in Incident Response
   :alt: Incident Response Responses tab showing the triggered remove-file active response
   :align: center
   :width: 80%
