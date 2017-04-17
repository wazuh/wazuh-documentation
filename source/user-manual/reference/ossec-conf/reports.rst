.. _reference_ossec_reports:

reports
=======

.. topic:: XML section name

	.. code-block:: xml

		<reports>

Configuration options for reporting of alerts.

Options
-------

- `group`_
- `categories`_
- `rule`_
- `level`_
- `location`_
- `srcip`_
- `user`_
- `title`_
- `email_to`_
- `showlogs`_


group
^^^^^^^^^^

Filter by group/category.

+--------------------+-------------------------------+
| **Default Value**  | n/a                           |
+--------------------+-------------------------------+
| **Allowed values** | Any category used is allowed. |
+--------------------+-------------------------------+

categories
^^^^^^^^^^

Filter by group/category.

+--------------------+-------------------------------+
| **Default Value**  | n/a                           |
+--------------------+-------------------------------+
| **Allowed values** | Any category used is allowed. |
+--------------------+-------------------------------+

rule
^^^^^^^^^^

Rule ID to filter for.

+--------------------+---------------------------------------+
| **Default Value**  | n/a                                   |
+--------------------+---------------------------------------+
| **Allowed values** | Any Rule ID in Wazuh Rules is allowed |
+--------------------+---------------------------------------+

level
^^^^^^^^^^

Alert level to filter for. Report will include all levels above and including level specified.

+--------------------+------------------------------------------+
| **Default Value**  | n/a                                      |
+--------------------+------------------------------------------+
| **Allowed values** | Any Alert level from 1 to 16 can be used |
+--------------------+------------------------------------------+

location
^^^^^^^^^^

Filter by the log location or agent name.

+--------------------+-----------------------------------------------+
| **Default Value**  | n/a                                           |
+--------------------+-----------------------------------------------+
| **Allowed values** | Any file path, hostname or network is allowed |
+--------------------+-----------------------------------------------+

srcip
^^^^^^^^^^

Filter by the source ip of the event.

+--------------------+--------------------------------------+
| **Default Value**  | n/a                                  |
+--------------------+--------------------------------------+
| **Allowed values** | Any hostname or network can be used. |
+--------------------+--------------------------------------+

user
^^^^^^^^^^

Filter by the user name. This will match either the srcuser or dstuser.

+--------------------+--------------+
| **Default Value**  | n/a          |
+--------------------+--------------+
| **Allowed values** | Any username |
+--------------------+--------------+


title
^^^^^^^^^^

Name of the report. **This is a required field.**

+--------------------+----------+
| **Default Value**  | n/a      |
+--------------------+----------+
| **Allowed values** | Any text |
+--------------------+----------+

email_to
^^^^^^^^^^

The email address to send the completed report. **This is a required field.**

+--------------------+-------------------+
| **Default Value**  | n/a               |
+--------------------+-------------------+
| **Allowed values** | Any email address |
+--------------------+-------------------+

showlogs
^^^^^^^^^^

Enable or disable the inclusion of logs when creating the report.

+--------------------+---------+
| **Default Value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+
