.. _reference_ossec_agentless:

agentless
=========

.. topic:: XML section name

	.. code-block:: xml

		<agentless>
		</agentless>

Agentless monitoring allows you to run integrity checking on systems without an agent installed.

Options
-------

- `type`_
- `frequency`_
- `host`_
- `state`_
- `arguments`_

type
^^^^
+--------------------+----------------------------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                                                |
+--------------------+---------------------------+------------------------------------------------------------------------+
| **Allowed values** | ssh_integrity_check_bsd   | Require a list of directories in <arguments>.                          |
|                    |                           |                                                                        |
+                    +---------------------------+ Wazuh will file integrity scan the files in those directories.         +
|                    | ssh_integrity_check_linux |                                                                        |
|                    |                           | System will alert if they have changed.                                |
+                    +---------------------------+------------------------------------------------------------------------+
|                    | ssh_generic_diff          | Supply an <arguments> value that consists of a set of commands to run. |
|                    |                           |                                                                        |
|                    |                           | Their output is then processed, looking for changes or rule matches.   |
+                    +---------------------------+------------------------------------------------------------------------+
|                    | ssh_pixconfig_diff        | Specifically for checking if the config of a Cisco PIX/router changes. |
|                    |                           |                                                                        |
|                    |                           | No <arguments> required                                                |
+--------------------+---------------------------+------------------------------------------------------------------------+

frequency
^^^^^^^^^

This controls the number of seconds between each check of the agentless device.

+--------------------+--------------------------------------------------------+
| **Default value**  | n/a                                                    |
+--------------------+--------------------------------------------------------+
| **Allowed values** | An integer in seconds                                  |
+--------------------+--------------------------------------------------------+

host
^^^^

This defines the username and the name of the agentless host.

+--------------------+--------------------------------------------------------+
| **Default value**  | n/a                                                    |
+--------------------+--------------------------------------------------------+
| **Allowed values** | Any username and host (user@hostname)                  |
+--------------------+--------------------------------------------------------+

state
^^^^^

This determines whether the check type is periodic or periodic_diff.

+--------------------+--------------------------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                                              |
+--------------------+---------------+----------------------------------------------------------------------------------+
| **Allowed values** | periodic      | Output from each check is analyzed with the Wazuh ruleset as if a monitored log. |
+                    +---------------+----------------------------------------------------------------------------------+
|                    | periodic_diff | Output from each agentless check is compared to the output of the previous run.  |
|                    |               |                                                                                  |
|                    |               | Changes are alerted on, similar to file integrity monitoring.                    |
+--------------------+---------------+----------------------------------------------------------------------------------+

arguments
^^^^^^^^^

This defines the arguments passed to the agentless check

+--------------------+------------------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                                      |
+--------------------+------------------------------------------------------------------------------------------+
| **Allowed values** | This is a space-delimited list of files or directories to be monitored.                  |
+--------------------+------------------------------------------------------------------------------------------+

Example of configuration
------------------------

.. code-block:: xml

    <agentless>
      <type>ssh_integrity_check_linux</type>
      <frequency>300</frequency>
      <host>admin@192.168.1.108</host>
      <state>periodic_diff</state>
      <arguments>/etc /usr/bin /usr/sbin</arguments>
    </agentless>
