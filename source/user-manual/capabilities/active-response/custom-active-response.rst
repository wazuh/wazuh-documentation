.. Copyright (C) 2021 Wazuh, Inc.

.. _custom-active-response:

Custom Active Response
======================

It is possible to create a custom AR in any programming language and configure a :ref:`command <reference_ossec_commands>` and an :ref:`active response <reference_ossec_active_response>` to refer to it.

The full alert is passed to the AR via ``STDIN`` within a JSON object and each AR is responsible for extracting the information necessary for its execution.

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


**Additional steps for a Stateful AR**

A *Stateful* AR will undo its original action after the period of time specified in the active response. So, as part of the timeout behavior, when the recived command is ``add`` the AR must send a control message to the ``execd`` through ``STDOUT`` to check the keys, wait for the response via ``STDIN`` and check the ``command`` field if it has to continue the execution or abort it.

The keys must be sufficient to identify an execution instance, for example to block a user on a specific host, with the ip and the user keys it is enough.

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
        "keys":["10.0.0.1", "root"]
    }
  }


The response message from execd is a follows:

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

    When the ``STDIN`` reading occurs, it must be read up to the newline character (``\n``), in the same way when writing to ``STDOUT`` the newline character must be added at the end, otherwise a deadlock may occur in ``execd`` and in the ``AR`` waiting for messages.


The AR can be done in whatever language you are comfortable with, but it should at least be able to:

1. Read through ``STDIN``.

2. Parse the read JSON object.

3. Extract the necessary information for its execution.

4. Write ``STDOUT`` to send control message to execd.

5. Wait for the response via ``STDIN``.

6. Check the ``command`` field.

.. note::
  **Only for Windows Agents** For scripts developed in python for example, it is necessary to create the executable file(``.exe``) of this script and configure it in :ref:`command <reference_ossec_commands>`. To create the ``.exe`` file it is possible to use tools such as ``pyinstaller``.

Here is an example of the message that is passed to the ``firewall-drop`` AR:

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

**Custom AR Example**

This Python script could be use as template to develop your own custom AR.

Customize the script behavior modifying 3 sections:

1. Start/End Custom Key: Select necessary parameters to use from an alert. ie: ``srcip`` to block that ip, ``processname`` to stop the process.

2. Start/End Custom Action Add: Execute main action, calling a system function. ie: ``pkill <processname>``.

3. Start/End Custom Action Delete: Execute secondary action, usually as recovery section after a time period. ie: wait a time period to unblock an ip after main action blocked it.


Following Python script run on Linux, it creates a file with rule id legend that triggered AR, after 60 seconds it deletes the file. in this case sections contains.

1. Start/End Custom Key:
    It tooks from alert the rule id

.. code-block:: python

  keys = [alert["rule"]["id"]]

2. Start/End Custom Action Add:
    It create ``ar-test-result`` file into ``/var/ossec/logs/`` folder, and write "Active response triggered by rule ID: XXX" into.

.. code-block:: python

  with open("/var/ossec/logs/ar-test-result", mode="a") as test_file:
    test_file.write("Active response triggered by rule ID: " + str(keys) + "\n")

3. Start/End Custom Action Delete:
    It deletes the file ones timeout triggered. Timeout action must set in AR section into ``ossec.conf`` manager file.

.. code-block:: python

  os.system('rm /var/ossec/logs/ar-test-result')


Manager ossec.conf used for this test:

.. code-block:: xml

  <command>
    <name>custom-ar</name>
    <executable>custom-ar.py</executable>
    <timeout_allowed>yes</timeout_allowed>
  </command>

  <active-response>
    <disabled>no</disabled>
    <command>custom-ar</command>
    <location>server</location>
    <rules_id>591</rules_id>
    <timeout>60</timeout>
  </active-response>

Command executable section must have same name as Pyhton script.


Python script must be sotore into ``/var/ossec/active-response/bin/``, in this case script name is ``custom-ar``

.. code-block:: python

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
  import fileinput
  import datetime

  LOG_FILE = "/var/ossec/logs/active-responses.log"

  ADD_COMMAND = 0
  DELETE_COMMAND = 1
  CONTINUE_COMMAND = 2
  ABORT_COMMAND = 3

  OS_SUCCESS = 0
  OS_INVALID = -1
  OS_NOTFOUND = -2

  VERSION = 1
  AR_MODULE_NAME = "active-response"
  CHECK_KEYS_ENTRY = "check_keys"

  finput = 0

  class message:
      def __init__(self):
          self.alert = ""
          self.command = 0


  def write_debug_file(ar_name, msg):

      with open(LOG_FILE, mode="a") as log_file:
          log_file.write(str(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')) + " " + ar_name + ": " + msg +"\n")
          return OS_SUCCESS
      return OS_NOTFOUND


  def setup_and_check_message(argv):

      # get alert from std input
      global finput
      finput = fileinput.input()
      for input in finput:
          try:
              data = json.loads(input)
              break
          except ValueError:
              write_debug_file(argv[0], 'Decoding JSON has failed, invalid input format')
              message.command = OS_INVALID
              return message

      message.alert = data

      # write debug file
      if (write_debug_file(argv[0], input)):
          message.command = OS_NOTFOUND
          return message

      # get command by json
      command = data.get("command")

      if (command == "add"):
          message.command = ADD_COMMAND
      elif (command == "delete"):
          message.command = DELETE_COMMAND
      else:
          write_debug_file(argv[0], 'Not valid command: ' + command)
          message.command = OS_INVALID

      return message


  def build_json_keys_message(ar_name, keys):

      # add keys
      message = {"version": VERSION,"origin":{"name": ar_name, "module":AR_MODULE_NAME},"command":CHECK_KEYS_ENTRY,"parameters":{"keys":keys}}
      jsonString = json.dumps(message)
      return jsonString


  def send_keys_and_check_message(argv, keys):
      ret = OS_INVALID
      action = None
      # Build and send message with keys
      keys_msg = build_json_keys_message(argv[0], keys)

      write_debug_file(argv[0], keys_msg)
      print(keys_msg + '\0', file = sys.stdout)
      sys.stdout.flush()


      # Read the response of previous message
      global finput
      for input in finput:
          try:
              data = json.loads(input)
              write_debug_file(argv[0], input)
              action = data.get("command")
              break
          except ValueError:
              write_debug_file(argv[0], "Cannot read input from stdin")
              return OS_INVALID

      if ("continue" == action):
          ret = CONTINUE_COMMAND
      elif ("abort" == action):
          ret = ABORT_COMMAND
      else:
          ret = OS_INVALID
          write_debug_file(argv[0], "Invalid value of 'command'")

      return ret


  def main(argv):

      write_debug_file(argv[0], "Started")

      # validate json and get command
      msg = setup_and_check_message(argv)
      if (msg.command < 0):
          sys.exit(OS_INVALID)

      if (msg.command == ADD_COMMAND):

          """ Start Custom Key
          At this point, it's necessary select the keys that we want to use from the alert, add them into keys array.
          This example use rule id parameter from alert.
          """

          alert = msg.alert["parameters"]["alert"]
          keys = [alert["rule"]["id"]]

          """ End Custom Key """

          action2 = OS_INVALID
          action2 = send_keys_and_check_message(argv, keys)

          # If necessary, abort execution
          if (action2 != CONTINUE_COMMAND):

              if (action2 == ABORT_COMMAND):
                  write_debug_file(argv[0], "Aborted")
                  sys.exit(OS_SUCCESS)
              else:
                  write_debug_file(argv[0], "Invalid command")
                  sys.exit(OS_INVALID)

          """ Start Custom Action Add """
          write_debug_file(argv[0], "Add")

          with open("/var/ossec/logs/ar-test-result", mode="a") as test_file:
              test_file.write("Active response triggered by rule ID: " + str(keys) + "\n")

          """ End Custom Action Add """

      elif (msg.command == DELETE_COMMAND):

          """ Start Custom Action Delete """
          write_debug_file(argv[0], "Delete")

          os.system('rm /var/ossec/logs/ar-test-result')

          """ End Custom Action Delete """

      else:
          write_debug_file(argv[0], "Invalid command")

      write_debug_file(argv[0], "Ended")

      sys.exit(OS_SUCCESS)


  if __name__ == "__main__":
      main(sys.argv)
