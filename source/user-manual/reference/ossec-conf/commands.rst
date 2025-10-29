.. Copyright (C) 2020 Wazuh, Inc.

.. _reference_ossec_commands:

command
=======

.. topic:: XML section name

	.. code-block:: xml

		<command>
		</command>

In the command configuration section, a command is defined that will be used by one or more active responses. There is no limit on the number of commands that may be used by an active response, however, each one must be in its own separate <command> section.

Options
-------

- `name`_
- `executable`_
- `expect`_
- `extra_args`_
- `timeout_allowed`_

name
^^^^

Specifies the name of the command which is called in the :doc:`active-response <active-response>` section.

+--------------------+---------------+
| **Default value**  | n/a           |
+--------------------+---------------+
| **Allowed values** | Any name      |
+--------------------+---------------+
| **use**            | Required      |
+--------------------+---------------+

executable
^^^^^^^^^^

Names an executable file to run. It is not necessary to provide the path.

These files are located in ``/var/ossec/active-response/bin`` directory in Linux based systems, or in ``C:\Program Files\ossec-agent\active-response\bin`` directory in Windows systems.

+--------------------+---------------+
| **Default value**  | n/a           |
+--------------------+---------------+
| **Allowed values** | Any file name |
+--------------------+---------------+
| **use**            | Required      |
+--------------------+---------------+

expect
^^^^^^

.. deprecated:: 4.2.0

Specifies the lists of extracted fields that are to be passed as parameters to the command. If any of the listed fields were not declared in a certain instance, those field values would be passed as a dash (``-``) instead of as no value at all. The command requires finding the expected fields in the alert, otherwise, the AR will be skipped.

A good example is the firewall-block command which expects the ``srcip`` field in order to knows which IP address to block.  Multiple expected field names are comma separated.

+--------------------+------------------------------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                                                  |
+--------------------+------------------------------------------------------------------------------------------------------+
| **Allowed values** | Extracted fields: **srcip**, **user** or **filename** separated by commas if there is more than one. |
+--------------------+------------------------------------------------------------------------------------------------------+
| **use**            | Not required                                                                                         |
+--------------------+------------------------------------------------------------------------------------------------------+

extra_args
^^^^^^^^^^

Allows the user to customize the parameters sent to the active response script living on the agent side.

+--------------------+----------------------------------------------------------------+
| **Default value**  | n/a                                                            |
+--------------------+----------------------------------------------------------------+
| **Allowed values** | Any extra argument to be read by the active-response scripts.  |
+--------------------+----------------------------------------------------------------+
| **use**            | Not required                                                   |
+--------------------+----------------------------------------------------------------+

.. note::
	The content of this setting will be appended to the existent parameters being sent to the agent.


timeout_allowed
^^^^^^^^^^^^^^^

Specifies whether the command is *stateful* or *stateless*. If yes, the command is stateful, meaning it will undo its original action after the period of time specified in the active response.

+--------------------+--------+
| **Default value**  | no     |
+--------------------+--------+
| **Allowed values** | yes, no|
+--------------------+--------+

Sample configuration
--------------------

.. code-block:: xml

    <!-- For Unix systems -->
    <command>
      <name>custom_command</name>
      <executable>custom_script.sh</executable>
      <extra_args>-arg1 --arg2 arg3 ; cat /etc/passwd</extra_args>
      <timeout_allowed>yes</timeout_allowed>
    </command>

    <!-- For Windows systems -->
    <command>
      <name>win_route-null</name>
      <executable>route-null.cmd</executable>
      <expect>srcip</expect>
      <timeout_allowed>yes</timeout_allowed>
    </command>
