.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-manager-conf tool validates the Wazuh manager configuration file and prints the effective configuration, with default values applied.

.. _wazuh_manager_conf_tool:

wazuh-manager-conf
==================

The ``wazuh-manager-conf`` tool validates the Wazuh manager configuration file and prints the effective configuration, with default values applied to every option that the file doesn't set.

The tool is located at ``/var/wazuh-manager/bin/wazuh-manager-conf``.

Use it to check ``/var/wazuh-manager/etc/wazuh-manager.conf`` before you restart the Wazuh manager, or to find the value that the Wazuh manager uses for an option.

Usage
-----

.. code-block:: none

   wazuh-manager-conf [-f <file>] [-H <home>] [--skip-file-checks] <command>

Commands
--------

+----------------+----------------------------------------------------------------------------------------------+
| Command        | Description                                                                                  |
+================+==============================================================================================+
| validate       | Checks the file: XML syntax, schema, and rules that involve more than one option. Prints     |
|                | nothing on success.                                                                          |
+----------------+----------------------------------------------------------------------------------------------+
| get <key.path> | Prints one option of the effective configuration, with defaults applied. Scalar values print |
|                | as plain text, and objects and lists print as JSON. The key path uses dots between section   |
|                | and option names, for example ``remote.https.port``.                                         |
+----------------+----------------------------------------------------------------------------------------------+
| dump           | Prints the whole effective configuration as JSON.                                            |
+----------------+----------------------------------------------------------------------------------------------+

Options
-------

+--------------------+--------------------------------------------------------------------------------------------+
| Option             | Description                                                                                |
+====================+============================================================================================+
| -f <file>          | Configuration file to read. Default: ``<home>/etc/wazuh-manager.conf``.                    |
+--------------------+--------------------------------------------------------------------------------------------+
| -H <home>          | Wazuh manager home directory, used to resolve relative paths. Default: the value of        |
|                    | ``$WAZUH_MANAGER_HOME``, or else the parent of the ``bin/`` directory that holds the tool. |
+--------------------+--------------------------------------------------------------------------------------------+
| --skip-file-checks | Doesn't require the certificate and key files named in the configuration to exist.         |
+--------------------+--------------------------------------------------------------------------------------------+
| -h, --help         | Displays the help message and exits.                                                       |
+--------------------+--------------------------------------------------------------------------------------------+
| -V, --version      | Displays the version and exits.                                                            |
+--------------------+--------------------------------------------------------------------------------------------+

Exit codes
----------

+------+------------------------------------------------------+
| Code | Meaning                                              |
+======+======================================================+
| 0    | Success.                                             |
+------+------------------------------------------------------+
| 1    | Invalid configuration, missing file, or usage error. |
+------+------------------------------------------------------+
| 2    | The requested key is not set and has no default.     |
+------+------------------------------------------------------+

Examples
--------

Validate the configuration file. The command prints nothing when the file is valid:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-conf validate

When the file contains an unknown option, the command exits with code 1 and prints the location of the problem:

.. code-block:: none
   :class: output

   (1244): Invalid configuration at '/global/agents_disconnection_alert_time': unknown option (does not satisfy 'additionalProperties') [schema /properties/global].

Print the port of the HTTPS listener for Wazuh agents:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-conf get remote.https.port

The command output looks similar to this:

.. code-block:: none
   :class: output

   1517

Print a whole section:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-conf get global

The command output looks similar to this:

.. code-block:: none
   :class: output

   {"agents_disconnection_time":"15m"}

Print the whole effective configuration:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-conf dump

The command output looks similar to this:

.. code-block:: none
   :class: output

   {
       "global": {
           "agents_disconnection_time": "15m"
       },
       "logging": {
           "log_format": [
               "plain"
           ]
       },
       "remote": {
           "https": {
               "port": 1517,
               "bind_addr": "0.0.0.0",
               "global_prefix": "/wazuh-manager/",
   ...

Check a configuration file before you copy it into place:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-conf -f /tmp/new-wazuh-manager.conf validate
