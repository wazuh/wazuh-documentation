.. Copyright (C) 2021 Wazuh, Inc.

.. _custom-active-response:

Custom Active Response
======================

A **custom active response** is a personalized script, configured to execute when a specific alert, alert level, or rule group has been triggered. It is possible to create a custom AR in any programming language and configure a :ref:`command <reference_ossec_commands>` and an :ref:`active response <reference_ossec_active_response>` to refer to it.

- `Types of Active Responses`_
- `Stateless Active Responses`_
- `Stateful Active Responses`_
- `Custom Active Responses Examples`_
- `Custom Active Response Linux Example`_
- `Custom Active Response Windows Example`_

Types of Active Responses
-------------------------

Active response could be stateful or stateless.

- ``Stateless``. Are configured as one-time actions without an event to revert the original effect.

- ``Stateful``. Are configured to undo the action after a specified period of time.

Stateless Active Responses
--------------------------

Stateless active responses is the simplest case, on Wazuh process, the full alert is passed to the AR via ``STDIN`` within a JSON object and each AR is responsible for extracting the information necessary for its execution.

The JSON message format is as follows:

.. code-block:: json

  {
    "version":1,
    "origin":{
        "name":"worker01",
        "module":"wazuh-execd"
    },
    "command":"add/delete",
    "parameters":{
        "extra_args":[],
        "alert":{},
        "program":"program-name"
    }
  }

The AR can be done in whatever language you are comfortable with, but it should at least be able to:

#. Read ``STDIN`` to get the alert.

#. Parse the read JSON object.

#. Analyze the ``command`` field to check if it has to ``add`` the action or ``delete`` it.

#. Extract the necessary information for its execution.

Here is an example of the message with the full alert that is passed to the ``firewall-drop`` AR:

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
                "name":"ubuntu-bionic"
            },
            "manager":{
                "name":"ubuntu-bionic"
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

Stateful Active Responses
-------------------------

A ``Stateful`` AR will undo its original action after the period of time specified in the active response. As part of the timeout behavior, when the received command is ``add`` the AR must execute following steps:

#. Read ``STDIN`` to get the alert.

#. Parse the read JSON object.

#. Analyze the ``command`` field to check if it has to ``add`` the action or ``delete`` it.

#. Extract the necessary information for its execution.

#. Build a control message with the **keys** extracted from the alert in JSON format.

#. Write ``STDOUT`` to send the control message.

#. Wait for the response via ``STDIN``.

#. Parse the read JSON object.

#. Analyze the ``command`` field to check if it has to ``continue`` the execution or ``abort`` it.

.. note::

  The **keys** are those fields extracted from the alert that the AR script will use to execute its action. They must be sufficient to identify an execution instance, for example to block a specific host, with the ip it is enough.

The control message format is as follows:

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

The response message is a follows:

.. code-block:: json

  {
    "version":1,
    "origin":{
        "name":"node01",
        "module":"wazuh-execd"
    },
    "command":"continue/abort",
    "parameters":{}
  }

.. warning::

    When the ``STDIN`` reading occurs, it must be read up to the newline character (``\n``). In the same way, when writing to ``STDOUT`` the newline character must be added at the end, otherwise a deadlock may occur.

Custom Active Responses Examples
--------------------------------

This section provides an example AR Python script which can be used as a template to develop your own custom AR.

It is possible to customize the behavior of the script by modifying 3 sections:

- **Start/End Custom Key**: Select the necessary parameters to use from the alert. ie: ``srcip`` to block that ip, ``processname`` to stop that process.

- **Start/End Custom Action Add**: Execute the main action, calling a system function. ie: ``pkill <processname>``.

- **Start/End Custom Action Delete**: Execute the secondary action, usually as recovery section after a time period. ie: wait a period of time to unblock an ip after the main action has blocked it.

Active responses are either ``Stateful`` or ``Stateless``:

- ``Stateful``: Are configured to undo the action after a specified period of time. Configuration needed for ``Stateful`` case:

      - Set Custom Key.

      - Set Custom Action Add.

      - Set Custom Action Delete.

      - Set timeout option in the ``active-response`` section of the ``ossec.conf`` file.

- ``Stateless``: Are configured as one-time actions without an event to reverse the original effect. Configuration needed for ``Stateless`` case:

      - Set Custom Key.

      - Set Custom Action Add.

Custom Active Response Linux Example
------------------------------------

The following Python script creates a file with the rule id that triggered the AR and after 60 seconds it deletes the file.

.. code-block:: Python

    #!/usr/bin/python3
    # Copyright (C) 2015-2021, Wazuh Inc.
    # All rights reserved.

    # This program is free software; you can redistribute it
    # and/or modify it under the terms of the GNU General Public
    # License (version 2) as published by the FSF - Free Software
    # Foundation.

    import os
    import sys
    import json
    import datetime

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
            log_file.write(str(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')) + " " + ar_name + ": " + msg +"\n")


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

            write_debug_file(argv[0], "Add")

            with open("ar-test-result.txt", mode="a") as test_file:
                test_file.write("Active response triggered by rule ID: " + str(keys) + "\n")

            """ End Custom Action Add """

        elif msg.command == DELETE_COMMAND:

            """ Start Custom Action Delete """

            write_debug_file(argv[0], "Delete")

            os.remove("ar-test-result.txt")

            """ End Custom Action Delete """

        else:
            write_debug_file(argv[0], "Invalid command")

        write_debug_file(argv[0], "Ended")

        sys.exit(OS_SUCCESS)


    if __name__ == "__main__":
        main(sys.argv)

In this case, the configurable sections contain:

- Start/End Custom Key: It tooks from the alert the rule id.

.. code-block:: Python

    alert = msg.alert["parameters"]["alert"]
    keys = [alert["rule"]["id"]]

- Start/End Custom Action Add: It creates the ``ar-test-result.txt`` file with this content: "Active response triggered by rule ID: XXX".

.. code-block:: Python

    with open("ar-test-result.txt", mode="a") as test_file:
        test_file.write("Active response triggered by rule ID: " + str(keys) + "\n")

- Start/End Custom Action Delete: It deletes the file once the timeout is triggered. The timeout action must be set in the ``active-response`` section of the ``ossec.conf`` file.

.. code-block:: Python

    os.remove("ar-test-result.txt")

- Manager ``ossec.conf``: This example configuration is triggered by rule id 591, but it could be any other filter.

.. code-block:: xml

    <command>
        <name>custom-ar</name>
        <executable>custom-ar.py</executable>
        <timeout_allowed>yes</timeout_allowed>
    </command>

    <active-response>
        <disabled>no</disabled>
        <command>custom-ar</command>
        <location>local</location>
        <rules_id>591</rules_id>
        <timeout>60</timeout>
    </active-response>

Custom Active Response Windows Example
--------------------------------------

As Windows AR doesn't reconize Python scripts, these are two options to overcome this issue. First option is convert python scripts to executable application, and run a Python script through a Bash launcher is the second option.

Convert Python Scripts to Executable Application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- The first option is to convert Python scripts into executable application. Use ``pyinstaller`` tool to convert Python script into executable files:

    #. Install PyInstaller from PyPI.

    #. Move to ``C:\Program Files (x86)\ossec-agent\active-response\bin\`` and run:

    .. code-block:: bash

        pyinstaller -F custom-ar.py

    #. Move the ``custom-ar.exe`` file to ``C:\Program Files (x86)\ossec-agent\active-response\bin\``.

    #. Update the manager ``ossec.conf`` with ``custom-ar.exe`` instead of ``custom-ar.py``:

    .. code-block:: xml

        <command>
            <name>custom-ar</name>
            <executable>custom-ar.exe</executable>
            <timeout_allowed>yes</timeout_allowed>
        </command>

  Expected result is run an application instead a Python script when AR trigger.

Run a Python Script Through a Bash Launcher
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- The second option is to run the Python script through a bash launcher. In this case, the AR script will call ``launcher.cmd`` and the last one will works as a bridge calling the ``custom-ar.py``.

    #. Create a ``launcher.cmd`` file into ``C:\Program Files (x86)\ossec-agent\active-response\bin\`` with the following content:

    .. code-block:: console

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

        "%~f0" launcher %~3 <pipe1.txt >pipe2.txt | python !ARPATH!%~2 <pipe2.txt >pipe1.txt

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
        for /f "delims=" %%a in ('python -c "import sys; print(sys.stdin.readline())"') do (
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

    #. Move the ``custom-ar.py`` file to ``C:\Program Files (x86)\ossec-agent\active-response\bin\``.

    #. Update the manager ``ossec.conf``, ``launcher.cmd`` will look for the name of the Python script to run in the option ``extra_args``:

    .. code-block:: xml

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
            <rules_id>591</rules_id>
            <timeout>60</timeout>
        </active-response>

  .. note::

    The Python path must be included in the System user path. Look for it in the Windows ``Environment Variables``.

  Expected result is run any windows script through ``launcher.cmd`` script, when AR is trigger.
