.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out the configuration options of the osquery wodle. Learn more about it in this section of the Wazuh documentation.

.. _wodle-osquery:

wodle name="osquery"
==========================

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="osquery">
		</wodle>

Configuration options of the osquery wodle.

.. warning::
    Osquery is not installed by default. It is an open source software that you have to obtain for using this module.


Options
-------

- `disabled`_
- `run_daemon`_
- `bin_path`_
- `log_path`_
- `config_path`_
- `add_labels`_
- `pack`_

+----------------------+-----------------------------+
| Options              | Allowed values              |
+======================+=============================+
| `disabled`_          | yes, no                     |
+----------------------+-----------------------------+
| `run_daemon`_        | yes, no                     |
+----------------------+-----------------------------+
| `bin_path`_          | Any valid path              |
+----------------------+-----------------------------+
| `log_path`_          | Any valid path              |
+----------------------+-----------------------------+
| `config_path`_       | Any valid path              |
+----------------------+-----------------------------+
| `add_labels`_        | yes, no                     |
+----------------------+-----------------------------+
| `pack`_              | Any available pack          |
+----------------------+-----------------------------+


disabled
^^^^^^^^

Disable the osquery wodle.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

run_daemon
^^^^^^^^^^

Makes the module run `osqueryd` as a subprocess or lets the module monitor the results log without running Osquery.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

bin_path
^^^^^^^^

Full path to the folder that contains the `osqueryd` executable.

+-------------------------------+---------------------------------------------------------------------------------------------------+
| **Default value on Linux**    | Empty                                                                                             |
+-------------------------------+---------------------------------------------------------------------------------------------------+
| **Default value on Windows**  | C:\\Program Files\\osquery\\osqueryd                                                              |
+-------------------------------+---------------------------------------------------------------------------------------------------+
| **Allowed values**            | Any valid path                                                                                    |
|                               | Any environment variable                                                                          |
|                               |                                                                                                   |
|                               | Note that on Windows, UNC paths and mapped drives are not allowed. Refer to                       |
|                               | :doc:`Windows agent path restrictions </user-manual/agent/agent-management/windows-restrictions>`.|
+-------------------------------+---------------------------------------------------------------------------------------------------+

log_path
^^^^^^^^

Full path to the results log written by Osquery.

+-------------------------------+-------------------------------------------------------+
| **Default value on Linux**    | /var/log/osquery/osqueryd.results.log                 |
+-------------------------------+-------------------------------------------------------+
| **Default value on Windows**  | C:\\Program Files\\osquery\\log\\osqueryd.results.log |
+-------------------------------+-------------------------------------------------------+
| **Allowed values**            | Any valid path                                        |
+-------------------------------+-------------------------------------------------------+

config_path
^^^^^^^^^^^

Path to the Osquery configuration file. This path can be relative to the folder where the Wazuh agent is running.

+-------------------------------+------------------------------------------------------+
| **Default value on Linux**    | /etc/osquery/osquery.conf                            |
+-------------------------------+------------------------------------------------------+
| **Default value on Windows**  | C:\\Program Files\\osquery\\osquery.conf             |
+-------------------------------+------------------------------------------------------+
| **Allowed values**            | Any valid path                                       |
+-------------------------------+------------------------------------------------------+

add_labels
^^^^^^^^^^

Add the agent labels defined as decorators.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

pack
^^^^

Add a query pack to the configuration. This option can be defined multiple times.

+--------------------+---------------------------------+
| **Default value**  | Empty                           |
+--------------------+---------------------------------+
| **Allowed values** | Path to pack configuration file |
+--------------------+---------------------------------+

Attributes:

+----------+----------------------+
| **name** | Name for this pack   |
|          +----------------+-----+
|          | Allowed values | Any |
+----------+----------------+-----+


Example of configuration
------------------------

.. code-block:: xml

    <wodle name="osquery">
        <disabled>no</disabled>
        <run_daemon>yes</run_daemon>
        <bin_path>/usr/bin</bin_path>
        <log_path>/var/log/osquery/osqueryd.results.log</log_path>
        <config_path>/etc/osquery/osquery.conf</config_path>
        <add_labels>no</add_labels>
        <pack name="custom_pack">/path/to/custom_pack.conf</pack>
    </wodle>
