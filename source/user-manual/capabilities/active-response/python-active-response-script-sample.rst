.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure the Python active response script sample provided in the Wazuh documentation.

Python active response script sample
=====================================

Use the following Python active response script as a template for developing custom active responses. Adapt three sections of the script to implement the required response behavior:

-  **Custom key**: Define the WCS fields that identify the object affected by the response. For example, use ``wazuh.rule.id`` as a key for the finding to match.

-  **Custom action -** ``enable``: Define the primary action that the script performs when the response triggers. For example, execute ``pkill <PROCESS_NAME>`` to terminate a process.

-  **Custom action -** ``disable``: Define the action that reverses or stops the primary action. For example, unblock an IP address after the configured timeout expires.

Stateless active response configuration
------------------------------------------

A stateless active response performs a one-time action and does not require a recovery action. Configure the following sections:

-  Custom key

-  Custom action - ``enable``

Stateful active response configuration
------------------------------------------

A stateful active response performs an action and then reverses it after the configured timeout. Configure all three sections:

-  Custom key

-  Custom action - ``enable``

-  Custom action - ``disable``

Configuring the Python active response script sample
----------------------------------------------------

Use the ``custom-ar.py`` Python script below as an example of a custom active response on Linux, macOS, and Windows endpoints.

The script demonstrates the active response lifecycle by creating a file named ``ar-test-result.txt`` in the Wazuh agent directory when the response receives an ``enable`` command. The file contains the rule ID that triggers the response:

``Active response triggered by rule ID: <['RULE_ID']>``

For a stateful active response, Wazuh sends a ``disable`` command after the configured timeout. The script then removes ``ar-test-result.txt``, demonstrating how the response reverts its action.

The script also writes execution and error information to the active response log on the endpoint.

.. code-block:: python

   #!/usr/bin/python3
   # Wazuh - Custom Active Response script (5.x compliant)
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

   if os.name == 'nt':
       LOG_FILE = "C:\\Program Files (x86)\\ossec-agent\\active-response\\active-responses.log"
   elif platform.system() == 'Darwin':
       LOG_FILE = "/Library/Ossec/logs/active-responses.log"
   else:
       LOG_FILE = "/var/ossec/logs/active-responses.log"

   ENABLE_COMMAND = 0
   DISABLE_COMMAND = 1
   OS_SUCCESS = 0
   OS_INVALID = -1

   class message:
       def __init__(self):
           self.alert = ""
           self.command = 0

   def write_debug_file(ar_name, msg):
       with open(LOG_FILE, mode="a") as log_file:
           ar_name_posix = str(PurePosixPath(PureWindowsPath(ar_name[ar_name.find("active-response"):])))
           log_file.write(str(datetime.datetime.now().strftime('%Y/%m/%d %H:%M:%S')) + " " + ar_name_posix + ": " + msg + "\n")

   def setup_and_check_message(argv):
       msg = message()

       # get message from stdin
       input_str = ""
       for line in sys.stdin:
           input_str = line
           break

       write_debug_file(argv[0], input_str)

       try:
           data = json.loads(input_str)
       except ValueError:
           write_debug_file(argv[0], 'Decoding JSON has failed, invalid input format')
           msg.command = OS_INVALID
           return msg

       msg.alert = data
       command = data.get("command")

       if command == "enable":
           msg.command = ENABLE_COMMAND
       elif command == "disable":
           msg.command = DISABLE_COMMAND
       else:
           msg.command = OS_INVALID
           write_debug_file(argv[0], 'Not valid command: ' + str(command))

       return msg

   def main(argv):
       write_debug_file(argv[0], "Started")

       msg = setup_and_check_message(argv)

       if msg.command < 0:
           sys.exit(OS_INVALID)

       if msg.command == ENABLE_COMMAND:
           """ Start Custom Key """
           alert = msg.alert
           rule_id = alert.get("wazuh", {}).get("rule", {}).get("id", "unknown")
           keys = [rule_id]
           """ End Custom Key """

           """ Start Custom Action Enable """
           with open("ar-test-result.txt", mode="a") as test_file:
               test_file.write("Active response triggered by rule ID: <" + str(keys) + ">\n")
           """ End Custom Action Enable """

       elif msg.command == DISABLE_COMMAND:
           """ Start Custom Action Disable """
           try:
               os.remove("ar-test-result.txt")
           except FileNotFoundError:
               write_debug_file(argv[0], "File not found, nothing to remove")
           """ End Custom Action Disable """

       else:
           write_debug_file(argv[0], "Invalid command")

       write_debug_file(argv[0], "Ended")
       sys.exit(OS_SUCCESS)

   if __name__ == "__main__":
       main(sys.argv)

Linux/Unix custom active response configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Copy the ``custom-ar.py`` script to ``/var/ossec/active-response/bin/custom-ar`` on the monitored endpoint. Then, set the required permissions and ownership:

.. code-block:: console

   $ sudo cp custom-ar.py /var/ossec/active-response/bin/custom-ar
   $ sudo chmod 750 /var/ossec/active-response/bin/custom-ar
   $ sudo chown root:wazuh /var/ossec/active-response/bin/custom-ar

macOS custom active response configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Copy the ``custom-ar.py`` script to ``/Library/Ossec/active-response/bin/custom-ar`` on the monitored endpoint. Then, set the required permissions and ownership:

.. code-block:: console

   $ sudo cp custom-ar.py /Library/Ossec/active-response/bin/custom-ar
   $ sudo chmod 750 /Library/Ossec/active-response/bin/custom-ar
   $ sudo chown root:wazuh /Library/Ossec/active-response/bin/custom-ar

Windows custom active response configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh agent for Windows executes active response scripts through executable files. Before using ``custom-ar.py`` as an active response script, convert it to an executable application or run it through a batch wrapper.

Method 1: Convert the script to an executable
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Open PowerShell with administrator privileges and install PyInstaller:

   .. code-block:: powershell

      > pip install pyinstaller
      > pyinstaller --version

#. Use PowerShell with user privileges to convert ``custom-ar.py`` into an executable:

   .. code-block:: powershell

      > pyinstaller -F <PATH_TO_CUSTOM-AR.PY>

   PyInstaller creates the ``custom-ar.exe`` executable in the ``dist\`` folder of the script's directory.

#. Copy the ``custom-ar.exe`` executable file to the ``C:\Program Files (x86)\ossec-agent\active-response\bin\`` directory on the monitored endpoint.

Method 2: Run through a Batch launcher
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use a batch launcher when you want the Wazuh active response module to execute a Python script without converting it into an executable. In this method, Wazuh executes ``launcher.cmd``, which then starts ``custom-ar.py``.

#. Create a ``launcher.cmd`` file in ``C:\Program Files (x86)\ossec-agent\active-response\bin\`` with the following content:

   .. code-block:: batch

      @echo off
      setlocal EnableDelayedExpansion
      set "ARPATH=%programfiles(x86)%\ossec-agent\active-response\bin\"
      set "script=custom-ar.py"

      <PYTHON_ABSOLUTE_PATH> "%ARPATH%%script%"

   Where ``<PYTHON_ABSOLUTE_PATH>`` is the absolute path of the ``python.exe`` executable.

#. Move the ``custom-ar.py`` script to the ``C:\Program Files (x86)\ossec-agent\active-response\bin\`` directory.

Configuring the active response on the Wazuh dashboard
----------------------------------------------------------

Configure the active response on the Wazuh dashboard to run when a suspicious file triggers the specified detection condition.

#. On the Wazuh dashboard, create the active response configuration as described in :doc:`configuration`, with the following settings:

   +------------------------+--------------------+
   | Field                  | Value              |
   +========================+====================+
   | **Name**               | ``custom-ar``      |
   +------------------------+--------------------+
   | **Executable**         | ``custom-ar``      |
   +------------------------+--------------------+
   | **Type**               | ``stateful``       |
   +------------------------+--------------------+
   | **Stateful timeout**   | ``60``             |
   +------------------------+--------------------+
   | **Location**           | ``Local``          |
   +------------------------+--------------------+

   If the Windows endpoint is configured using the Batch launcher method, use the below configuration instead:

   +------------------------+--------------------+
   | Field                  | Value              |
   +========================+====================+
   | **Name**               | ``custom-ar``      |
   +------------------------+--------------------+
   | **Executable**         | ``launcher.cmd``   |
   +------------------------+--------------------+
   | **Type**               | ``stateful``       |
   +------------------------+--------------------+
   | **Stateful timeout**   | ``60``             |
   +------------------------+--------------------+
   | **Location**           | ``Local``          |
   +------------------------+--------------------+

#. Create a monitor of type **Active response**, a trigger, and an active response action to invoke this configuration when a finding matches your chosen condition. See :doc:`Use cases <ar-use-cases/index>` for a complete walkthrough of this pattern.
