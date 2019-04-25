.. Copyright (C) 2019 Wazuh, Inc.

.. _reference_ossec_reports:

reports
=======

.. topic:: XML section name

	.. code-block:: xml

		<reports>
		</reports>

In this section are listed the different options for the configuration of daily reports based on alerts.

.. note::

  Any number of ``<reports>`` blocks can be declared in the same ``ossec.conf`` file.

Options
-------

- `group`_
- `category`_
- `rule`_
- `level`_
- `location`_
- `srcip`_
- `user`_
- `title`_
- `email_to`_
- `showlogs`_

group
^^^^^

Filter by group/category. It only accepts one group/category.

+--------------------+-------------------------------+
| **Default value**  | n/a                           |
+--------------------+-------------------------------+
| **Allowed values** | Any group used is allowed.    |
+--------------------+-------------------------------+

category
^^^^^^^^

Filter by group/category.

+--------------------+-------------------------------+
| **Default value**  | n/a                           |
+--------------------+-------------------------------+
| **Allowed values** | Any category used is allowed. |
+--------------------+-------------------------------+

rule
^^^^

Rule ID to filter for.

+--------------------+---------------------------------------+
| **Default value**  | n/a                                   |
+--------------------+---------------------------------------+
| **Allowed values** | Any Rule ID in Wazuh Rules is allowed |
+--------------------+---------------------------------------+

level
^^^^^

Alert level to filter for. The report will include all levels above and including level specified.

+--------------------+------------------------------------------+
| **Default value**  | n/a                                      |
+--------------------+------------------------------------------+
| **Allowed values** | Any Alert level from 1 to 16 can be used |
+--------------------+------------------------------------------+

location
^^^^^^^^

Filter by the log location or agent name.

+--------------------+-----------------------------------------------+
| **Default value**  | n/a                                           |
+--------------------+-----------------------------------------------+
| **Allowed values** | Any file path, hostname or network is allowed |
+--------------------+-----------------------------------------------+

srcip
^^^^^

Filter by the source ip of the event.

+--------------------+--------------------------------------+
| **Default value**  | n/a                                  |
+--------------------+--------------------------------------+
| **Allowed values** | Any hostname or network can be used. |
+--------------------+--------------------------------------+

user
^^^^

Filter by the user name. This will match either the srcuser or dstuser.

+--------------------+--------------+
| **Default value**  | n/a          |
+--------------------+--------------+
| **Allowed values** | Any username |
+--------------------+--------------+


title
^^^^^

Name of the report. **This is a required field.**

+--------------------+----------+
| **Default value**  | n/a      |
+--------------------+----------+
| **Allowed values** | Any text |
+--------------------+----------+

email_to
^^^^^^^^

The email address to send the completed report. **This is a required field.**

+--------------------+-------------------+
| **Default value**  | n/a               |
+--------------------+-------------------+
| **Allowed values** | Any email address |
+--------------------+-------------------+

showlogs
^^^^^^^^

Enable or disable the inclusion of logs when creating the report.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+


Example of configuration
------------------------

  .. code-block:: xml

    <reports>
      <title>Auth_Report</title>
      <group>authentication_failed,</group>
      <srcip>192.168.1.10</srcip>
      <email_to>recipient@example.wazuh.com</email_to>
      <showlogs>yes</showlogs>
    </reports>

    <reports>
      <title>List of logged users</title>
      <rule>535</rule>
      <email_to>recipient@example.wazuh.com</email_to>
      <srcip>192.168.1.10</srcip>
      <showlogs>yes</showlogs>
    </reports>
