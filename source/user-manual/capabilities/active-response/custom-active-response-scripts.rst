.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn more about the active response scripts you can create in this section of the documentation.

Custom active response scripts
==============================

You can create custom active response scripts that execute when an alert of a specific rule ID, alert level, or rule group triggers. You can create active response scripts in any programming language. A trigger initiates the script using a defined :doc:`command </user-manual/reference/ossec-conf/commands>`. An :doc:`active response </user-manual/reference/ossec-conf/active-response>` configuration determines when and where the command executes.

Programming an active response
------------------------------

The active response script receives a JSON input including the full alert via STDIN. Each active response script extracts from this JSON the information necessary for its execution.

This is an example of a message. It includes a full alert for the ``firewall-drop`` active response script:

.. code-block:: json

   {
       "version":1,
       "origin":{
           "name":"worker01",
           "module":"wazuh-execd"
       },
       "command":"add",
       "parameters":{
           "extra_args":[],
           "alert":{
               "timestamp":"2021-02-01T20:58:44.830+0000",
               "rule":{
                   "level":15,
                   "description":"Shellshock attack detected",
                   "id":"31168",
                   "mitre":{
                       "id":["T1068","T1190"],
                       "tactic":["Privilege Escalation","Initial Access"],
                       "technique":["Exploitation for Privilege Escalation","Exploit Public-Facing Application"]
                   },
                   "info":"CVE-2014-6271https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6271",
                   "firedtimes":2,
                   "mail":true,
                   "groups":["web","accesslog","attack"],
                   "pci_dss":["11.4"],
                   "gdpr":["IV_35.7.d"],
                   "nist_800_53":["SI.4"],
                   "tsc":["CC6.1","CC6.8","CC7.2","CC7.3"]
               },
               "agent":{
                   "id":"000",
                   "name":"wazuh-server"
               },
               "manager":{
                   "name":"wazuh-server"
               },
               "id":"1612213124.6448363",
               "full_log":"192.168.0.223 - - [01/Feb/2021:20:58:43 +0000] \"GET / HTTP/1.1\" 200 612 \"-\" \"() { :; }; /bin/cat /etc/passwd\"",
               "decoder":{
                   "name":"web-accesslog"
               },
               "data":{
                   "protocol":"GET",
                   "srcip":"192.168.0.223",
                   "id":"200",
                   "url":"/"
               },
               "location":"/var/log/nginx/access.log"
           },
           "program":"/var/ossec/active-response/bin/firewall-drop"
       }
   }

As you can see, the JSON message format that an active response script analyzes is as follows:

.. code-block:: json

   {
       "version":1,
       "origin":{
           "name":"",
           "module":""
       },
       "command":"",
       "parameters":{
           "extra_args":[],
           "alert":{},
           "program":""
       }
   }

The ``parameters`` field of the active response alert corresponds to:

-  ``extra_args``: The extra arguments required to execute the active response script.
-  ``alert``: The full alert that triggered the active response script.
-  ``program``: The active response script to execute.

As we mentioned before, an active response can either be stateless or stateful.

Stateless active response
^^^^^^^^^^^^^^^^^^^^^^^^^

Stateless active responses are one-time actions without an event definition to revert or stop them.

Wazuh allows you to program stateless custom active responses in any programming language. They need to be able to perform the following actions for proper execution:

#. Read ``STDIN`` to get the JSON message.
#. Parse the JSON message.
#. Confirm that the ``command`` field has the ``add`` action.
#. Extract the necessary information for its execution.

.. _stateful_active_response:

Stateful active response
^^^^^^^^^^^^^^^^^^^^^^^^

A stateful active response reverts or stops its action after a specified period of time. As part of the timed out behavior, the active response must execute the following operations:

#. Read ``STDIN`` to get the JSON message.
#. Parse the JSON message.
#. Analyze the ``command`` field to check if it has the ``add`` or ``delete`` actions. If it has the ``add`` action, the active response executes the main action. Conversely, if it has the ``delete`` action, then the active response stops or reverts the main action.
#. Extract the necessary information for its control and execution. As an example, the ``firewall-drop`` script uses the value in the ``srcip`` alert field to block or unblock an IP address.
#. Build a control message in JSON format with keys extracted from alert fields. The control message contains relevant information to identify the specific conditions and assess the active response. For example, it might contain a ``srcip`` key with the IP address to block. The script extracts this value from the alert.

   The control message is as follows:

   .. code-block:: json

      {
          "version":1,
          "origin":{
              "name":"program-name",
              "module":"active-response"
          },
          "command":"check_keys",
          "parameters":{
              "keys":["10.0.0.1"]
          }
      }

#. Write ``STDOUT`` to send the control message.
#. Wait for the response via ``STDIN``.
#. Parse the JSON object in the response.
#. Analyze the ``command`` field to check if it has to ``continue`` or ``abort`` the execution. For example, it might need to abort the action if it’s repeating a previous active response action that hasn’t timed out yet and it’s already in execution.

   The response message is as follows:

   .. code-block:: json

      {
        "version":1,
        "origin":{
            "name":"node01",
            "module":"wazuh-execd"
        },
        "command":"continue",
        "parameters":{}
      }

.. warning::

   When the ``STDIN`` reading occurs, the active response script reads up to the newline character (``\n``). In the same way, when writing to ``STDOUT``, the active response must add a newline character at the end. Otherwise, a deadlock might occur.

Python active response script sample
------------------------------------

This subsection provides an example of a Python active response script, which you can use as a template to develop your custom scripts.

You can customize the behavior of the script by modifying three sections:

-  **Custom key**: Select the necessary parameters to use from the alert message fields. For example, select the ``srcip`` parameter to use in blocking an IP address or the ``processname`` parameter to use in stopping a process.
-  **Custom action** - ``add``: Perform the main action of the active response script. For example, execute the command: ``pkill <PROCESS_NAME>``.
-  **Custom action** - ``delete``: Perform the secondary action, which is usually a recovery action after a time period. For example, unblocking an IP address after the main action has blocked it for a period of time.

Stateless active response configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Stateless active responses perform one-time actions. You must set the following sections only for stateless active response:

-  Custom key
-  Custom action - ``add``

Stateful active response configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Stateful active responses need the following sections so they can undo the action after a specified period of time:

-  Custom key
-  Custom action - ``add``
-  Custom action - ``delete``

You must also set the following:

-  ``<timeout>`` option in the ``<active-response>`` block in the ``/var/ossec/etc/ossec.conf`` file on the Wazuh server.

Configuring the Python active response script sample
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We show how to configure the sample ``custom-ar.py`` Python script below as an active response script on Linux and Windows endpoints. The script creates a file called ``ar-test-result.txt`` in the Wazuh agent directory to demo an active response performed. This file is then deleted after the configured timeout period has elapsed to demo an active response reverted. The file contains the rule ID that triggered the active response — ``Active response triggered by rule ID: <RULE_ID>``.

.. code-block:: python

   #!/usr/bin/python3
   # Copyright (C) 2015-2022, Wazuh Inc.
   # All rights reserved.

   # This program is free software; you can redistribute it
   # and/or modify it under the terms of the GNU General Public
   # License (version 2) as published by the FSF - Free Software
   # Foundation.

   import os
   import sys
   import json
   import datetime
   from pathlib import PureWindowsPath, PurePosixPath

   if os.name == 'nt':
       LOG_FILE = "C:\\Program Files (x86)\\ossec-agent\\active-response\\active-responses.log"
   else:
       LOG_FILE = "/var/ossec/logs/active-responses.log"

   ADD_COMMAND = 0
   DELETE_COMMAND = 1
   CONTINUE_COMMAND = 2
   ABORT_COMMAND = 3

   OS_SUCCESS = 0
   OS_INVALID = -1

   class message:
       def __init__(self):
           self.alert = ""
           self.command = 0


   def write_debug_file(ar_name, msg):
       with open(LOG_FILE, mode="a") as log_file:
           ar_name_posix = str(PurePosixPath(PureWindowsPath(ar_name[ar_name.find("active-response"):])))
           log_file.write(str(datetime.datetime.now().strftime('%Y/%m/%d %H:%M:%S')) + " " + ar_name_posix + ": " + msg +"\n")


   def setup_and_check_message(argv):

       # get alert from stdin
       input_str = ""
       for line in sys.stdin:
           input_str = line
           break

       write_debug_file(argv[0], input_str)

       try:
           data = json.loads(input_str)
       except ValueError:
           write_debug_file(argv[0], 'Decoding JSON has failed, invalid input format')
           message.command = OS_INVALID
           return message

       message.alert = data

       command = data.get("command")

       if command == "add":
           message.command = ADD_COMMAND
       elif command == "delete":
           message.command = DELETE_COMMAND
       else:
           message.command = OS_INVALID
           write_debug_file(argv[0], 'Not valid command: ' + command)

       return message


   def send_keys_and_check_message(argv, keys):

       # build and send message with keys
       keys_msg = json.dumps({"version": 1,"origin":{"name": argv[0],"module":"active-response"},"command":"check_keys","parameters":{"keys":keys}})

       write_debug_file(argv[0], keys_msg)

       print(keys_msg)
       sys.stdout.flush()

       # read the response of previous message
       input_str = ""
       while True:
           line = sys.stdin.readline()
           if line:
               input_str = line
               break

       write_debug_file(argv[0], input_str)

       try:
           data = json.loads(input_str)
       except ValueError:
           write_debug_file(argv[0], 'Decoding JSON has failed, invalid input format')
           return message

       action = data.get("command")

       if "continue" == action:
           ret = CONTINUE_COMMAND
       elif "abort" == action:
           ret = ABORT_COMMAND
       else:
           ret = OS_INVALID
           write_debug_file(argv[0], "Invalid value of 'command'")

       return ret


   def main(argv):

       write_debug_file(argv[0], "Started")

       # validate json and get command
       msg = setup_and_check_message(argv)

       if msg.command < 0:
           sys.exit(OS_INVALID)

       if msg.command == ADD_COMMAND:

           """ Start Custom Key
           At this point, it is necessary to select the keys from the alert and add them into the keys array.
           """

           alert = msg.alert["parameters"]["alert"]
           keys = [alert["rule"]["id"]]

           """ End Custom Key """

           action = send_keys_and_check_message(argv, keys)

           # if necessary, abort execution
           if action != CONTINUE_COMMAND:

               if action == ABORT_COMMAND:
                   write_debug_file(argv[0], "Aborted")
                   sys.exit(OS_SUCCESS)
               else:
                   write_debug_file(argv[0], "Invalid command")
                   sys.exit(OS_INVALID)

           """ Start Custom Action Add """

           with open("ar-test-result.txt", mode="a") as test_file:
               test_file.write("Active response triggered by rule ID: <" + str(keys) + ">\n")

           """ End Custom Action Add """

       elif msg.command == DELETE_COMMAND:

           """ Start Custom Action Delete """

           os.remove("ar-test-result.txt")

           """ End Custom Action Delete """

       else:
           write_debug_file(argv[0], "Invalid command")

       write_debug_file(argv[0], "Ended")

       sys.exit(OS_SUCCESS)


   if __name__ == "__main__":
       main(sys.argv)

Configurable sections in this script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Custom key: Rule ID taken from the alert:

   .. code-block:: python

      alert = msg.alert["parameters"]["alert"]
      keys = [alert["rule"]["id"]]

-  Custom action - ``add``: It creates the ``ar-test-result.txt`` file in ``/var/ossec`` folder with this content - ``Active response triggered by rule ID: <503>``:

   .. code-block:: python

      with open("ar-test-result.txt", mode="a") as test_file:
          test_file.write("Active response triggered by rule ID: <" + str(keys) + ">\n")

-  Custom action - ``delete``: It deletes the file once the timeout triggers.

   .. code-block:: python

      os.remove("ar-test-result.txt")

The timeout action must be set in the ``<active-response>`` block in ``/var/ossec/etc/ossec.conf`` configuration file.

Linux/Unix custom active response configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Copy the sample ``custom-ar.py`` script to the ``/var/ossec/active-response/bin`` directory of the monitored endpoint.
#. Change the active response script ownership and permissions as shown below:

   .. code-block:: console

      $ sudo chmod 750 /var/ossec/active-response/bin/custom-ar.py
      $ sudo chown root:wazuh /var/ossec/active-response/bin/custom-ar.py

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

#. Add the ``<command>`` and ``<active-response>`` blocks below to the Wazuh server ``/var/ossec/etc/ossec.conf`` file to use this active response Python script:

   .. code-block:: xml
      :emphasize-lines: 12

      <ossec_config>
        <command>
          <name>linux-custom-ar</name>
          <executable>custom-ar.py</executable>
          <timeout_allowed>yes</timeout_allowed>
        </command>

        <active-response>
          <disabled>no</disabled>
          <command>linux-custom-ar</command>
          <location>local</location>
          <rules_id>503</rules_id>
          <timeout>60</timeout>
        </active-response>
      </ossec_config>

#. Restart the Wazuh manager to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-manager

This configuration executes the Python script on the monitored endpoint anytime rule ID ``503`` is triggered.

macOS custom active response configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Add the Python script to the ``/Library/Ossec/active-response/bin`` directory of the monitored endpoint.
#. Change the active response script permissions and ownership as shown below:

   .. code-block:: console

      $ sudo chmod 750 /Library/Ossec/active-response/bin/custom-ar.py
      $ sudo chown root:wazuh /Library/Ossec/active-response/bin/custom-ar.py

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      $ sudo /Library/Ossec/bin/wazuh-control restart

#. Add the ``<command>`` and ``<active-response>`` blocks below to the Wazuh server ``/Library/Ossec/etc/ossec.conf`` file to use this active response Python script:

   .. code-block:: xml
      :emphasize-lines: 12

      <ossec_config>
        <command>
          <name>macos-custom-ar</name>
          <executable>custom-ar.py</executable>
          <timeout_allowed>yes</timeout_allowed>
        </command>

        <active-response>
          <disabled>no</disabled>
          <command>macos-custom-ar</command>
          <location>local</location>
          <rules_id>503</rules_id>
          <timeout>60</timeout>
        </active-response>
      </ossec_config>

#. Restart the Wazuh manager to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-manager

This configuration executes the Python script on the monitored endpoint anytime rule ID ``503`` is triggered.

Windows custom active response configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can implement the custom Python script on Windows endpoints using two methods. The first method converts Python scripts to executable applications, while the second method uses a Windows Batch launcher to run the Python script.

Both methods require Python installed on the Windows endpoint. Use the following steps below to install Python on the Windows endpoint.

#. Download Python executable installer from the `official Python website <https://www.python.org/downloads/windows/>`__.
#. Run the Python installer once downloaded. Check the following boxes when prompted and start the installation:

   -  **Use admin privileges when installing py.exe**.
   -  **Add python.exe to PATH**. This places the interpreter in the execution path.

Method 1: Convert the Python script to an executable application
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

#. Open an administrator PowerShell terminal and use ``pip`` to install ``pyinstaller``:

   .. code-block:: powershell

      > pip install pyinstaller
      > pyinstaller --version

#. Run the following command using PowerShell with administrator privileges to create the executable file:

   .. code-block:: powershell

      > pyinstaller -F <PATH_TO_CUSTOM-AR.PY>

   You can find the created ``custom-ar.exe`` executable in the ``C:\Users\<USER>\dist\`` directory.

#. Copy the ``custom-ar.exe`` executable file to ``C:\Program Files (x86)\ossec-agent\active-response\bin\`` directory on the monitored endpoint.
#. Restart the Wazuh agent using PowerShell with administrator privileges to apply the changes:

   .. code-block:: console

      > Restart-Service -Name wazuh

#. On the Wazuh server, add the ``<command>`` and ``<active-response>`` blocks below to the ``/var/ossec/etc/ossec.conf`` configuration file. This uses  the ``custom-ar.exe`` executable for Windows endpoints.

   .. code-block:: xml
      :emphasize-lines: 4

      <ossec_config>
        <command>
          <name>windows-custom-ar</name>
          <executable>custom-ar.exe</executable>
          <timeout_allowed>yes</timeout_allowed>
        </command>

        <active-response>
          <disabled>no</disabled>
          <command>windows-custom-ar</command>
          <location>local</location>
          <rules_id>503</rules_id>
          <timeout>60</timeout>
        </active-response>
      </ossec_config>

#. Restart the Wazuh manager to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-manager

With this configuration, Wazuh runs an executable instead of a Python script when triggering an active response on a Windows endpoint.

Method 2: Run a Python script through a Batch launcher
""""""""""""""""""""""""""""""""""""""""""""""""""""""

In this method, the Wazuh active response module executes the ``launcher.cmd`` script which subsequently executes the ``custom-ar.py`` script.

#. Create a ``launcher.cmd`` file in ``C:\Program Files (x86)\ossec-agent\active-response\bin\`` with the following content. This allows you to run any Windows script through the ``launcher.cmd`` script when triggering an active response.

   .. code-block:: batch
      :emphasize-lines: 47, 71

      @echo off

      setlocal enableDelayedExpansion

      set ARPATH="%programfiles(x86)%\ossec-agent\active-response\bin\\"

      if "%~1" equ "" (
          call :read

          set aux=!input:*"extra_args":[=!
          for /f "tokens=1 delims=]" %%a in ("!aux!") do (
              set aux=%%a
          )
          set script=!aux:~1,-1!

          if exist "!ARPATH!!script!" (
              set aux=!input:*"command":=!
              for /f "tokens=1 delims=," %%a in ("!aux!") do (
                  set aux=%%a
              )
              set command=!aux:~1,-1!

              echo !input! >alert.txt

              start /b cmd /c "%~f0" child !script! !command!

              if "!command!" equ "add" (
                  call :wait keys.txt
                  echo(!output!
                  del keys.txt

                  call :read
                  echo !input! >result.txt
              )
          )
          exit /b
      )

      set "name=%~1"
      goto !name!


      :child
      copy nul pipe1.txt >nul
      copy nul pipe2.txt >nul

      "%~f0" launcher %~3 <pipe1.txt >pipe2.txt | <PYTHON_ABSOLUTE_PATH> !ARPATH!%~2 <pipe2.txt >pipe1.txt

      del pipe1.txt pipe2.txt
      exit /b


      :launcher
      call :wait alert.txt
      echo(!output!
      del alert.txt

      if "%~2" equ "add" (
          call :read
          echo !input! >keys.txt

          call :wait result.txt
          echo(!output!
          del result.txt
      )
      exit /b


      :read
      set input=
      for /f "delims=" %%a in ('<PYTHON_ABSOLUTE_PATH> -c "import sys; print(sys.stdin.readline())"') do (
          set input=%%a
      )
      exit /b


      :wait
      if exist "%*" (
          for /f "delims=" %%a in (%*) do (
              set output=%%a
          )
      ) else (
          goto :wait
      )
      exit /b

   Where ``<PYTHON_ABSOLUTE_PATH>`` is the absolute path of the ``Python.exe`` executable.

#. Move the ``custom-ar.py`` script to ``C:\Program Files (x86)\ossec-agent\active-response\bin\`` directory.
#. Restart the Wazuh agent using PowerShell with administrator privileges to apply the changes:

   .. code-block:: console

      > Restart-Service -Name wazuh

#. On the Wazuh server, add the ``<command>`` and ``<active-response>`` blocks below to the Wazuh configuration ``/var/ossec/etc/ossec.conf`` file. The active response module runs the ``launcher.cmd`` script which runs the Python script in its ``<extra_args>`` option. This action executes for 60 seconds when rule ID 503 is triggered.

   .. code-block:: xml
      :emphasize-lines: 4, 5

      <ossec_config>
        <command>
          <name>custom-ar</name>
          <executable>launcher.cmd</executable>
          <extra_args>custom-ar.py</extra_args>
          <timeout_allowed>yes</timeout_allowed>
        </command>

        <active-response>
          <disabled>no</disabled>
          <command>custom-ar</command>
          <location>local</location>
          <rules_id>503</rules_id>
          <timeout>60</timeout>
        </active-response>
      </ossec_config>

#. Restart the Wazuh manager to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-manager
