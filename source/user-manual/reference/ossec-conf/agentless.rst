.. Copyright (C) 2018 Wazuh, Inc.

.. _reference_ossec_agentless:

agentless
=========

.. topic:: XML section name

	.. code-block:: xml

		<agentless>
		</agentless>

Agentless monitoring allows you to run integrity checks on systems without an agent installed.

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
| **Allowed values** | ssh_integrity_check_bsd   | Requires a list of directories in <arguments>.                         |
|                    |                           |                                                                        |
+                    +---------------------------+ Wazuh will integrity scan the files in the specified directories.      +
|                    | ssh_integrity_check_linux |                                                                        |
|                    |                           | The system will alert if these files have changed.                     |
+                    +---------------------------+------------------------------------------------------------------------+
|                    | ssh_generic_diff          | Supply an <arguments> value that consists of a set of commands to run. |
|                    |                           |                                                                        |
|                    |                           | Their output is then processed, looking for changes or rule matches.   |
+                    +---------------------------+------------------------------------------------------------------------+
|                    | ssh_pixconfig_diff        | Specifically for checking if the config of a Cisco PIX/router changes. |
|                    |                           |                                                                        |
|                    |                           | No <arguments> required.                                               |
+--------------------+---------------------------+------------------------------------------------------------------------+

frequency
^^^^^^^^^

Controls the number of seconds between each check of the agentless device.

+--------------------+--------------------------------------------------------+
| **Default value**  | n/a                                                    |
+--------------------+--------------------------------------------------------+
| **Allowed values** | An integer in seconds                                  |
+--------------------+--------------------------------------------------------+

host
^^^^

Defines the username and the name of the agentless host.

+--------------------+--------------------------------------------------------+
| **Default value**  | n/a                                                    |
+--------------------+--------------------------------------------------------+
| **Allowed values** | Any username and host (username@hostname)              |
+--------------------+--------------------------------------------------------+

state
^^^^^

Determines whether the type of checkis periodic or periodic_diff.

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

Defines the arguments passed to the agentless check.

+--------------------+------------------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                                      |
+--------------------+------------------------------------------------------------------------------------------+
| **Allowed values** | This is a space-delimited list of files or directories to be monitored.                  |
+--------------------+------------------------------------------------------------------------------------------+

Sample configuration
--------------------

.. code-block:: xml

    <agentless>
      <type>ssh_integrity_check_linux</type>
      <frequency>300</frequency>
      <host>admin@192.168.1.108</host>
      <state>periodic_diff</state>
      <arguments>/etc /usr/bin /usr/sbin</arguments>
    </agentless>
