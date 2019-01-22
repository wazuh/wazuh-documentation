.. Copyright (C) 2018 Wazuh, Inc.

.. _rules_syntax:

Rules Syntax
============

Available options
-----------------

- `rule`_
- `match`_
- `regex`_
- `decoded_as`_
- `category`_
- `field`_
- `srcip`_
- `dstip`_
- `extra_data`_
- `user`_
- `program_name`_
- `hostname`_
- `time`_
- `weekday`_
- `id`_
- `url`_
- `action`_
- `if_sid`_
- `if_group`_
- `if_level`_
- `if_matched_sid`_
- `if_matched_group`_
- `same_id`_
- `same_source_ip`_
- `same_src_port`_
- `same_dst_port`_
- `same_location`_
- `same_user`_
- `different_url`_
- `different_srcgeoip`_
- `description`_
- `list`_
- `info`_
- `options`_
- `check_diff`_
- `group`_

rule
^^^^

+---------------+----------------+---------------------------------------------------------------------------------------------------+
| **level**     | Definition     | Specifies the level of the rule. Alerts and responses use this value.                             |
+               +----------------+---------------------------------------------------------------------------------------------------+
|               | Allowed values | 0 to 16                                                                                           |
+---------------+----------------+---------------------------------------------------------------------------------------------------+
| **id**        | Definition     | Specifies the ID of the rule.                                                                     |
+               +----------------+---------------------------------------------------------------------------------------------------+
|               | Allowed values | Any number from 1 to 999999                                                                       |
+---------------+----------------+---------------------------------------------------------------------------------------------------+
| **maxsize**   | Definition     | Specifies the maximum size of the event.                                                          |
+               +----------------+---------------------------------------------------------------------------------------------------+
|               | Allowed values | Any number from 1 to 9999                                                                         |
+---------------+----------------+---------------------------------------------------------------------------------------------------+
| **frequency** | Definition     | Number of times the rule must have matched before firing.                                         |
+               +----------------+---------------------------------------------------------------------------------------------------+
|               | Allowed values | Any number from 2 to 9999                                                                         |
+---------------+----------------+---------------------------------------------------------------------------------------------------+
| **timeframe** | Definition     | The timeframe in seconds. This option is intended to be used with the frequency option.           |
+               +----------------+---------------------------------------------------------------------------------------------------+
|               | Allowed values | Any number from 1 to 99999                                                                        |
+---------------+----------------+---------------------------------------------------------------------------------------------------+
| **ignore**    | Definition     | The time (in seconds) to ignore this rule after firing it (to avoid floods).                      |
+               +----------------+---------------------------------------------------------------------------------------------------+
|               | Allowed values | Any number from 1 to 999999                                                                       |
+---------------+----------------+---------------------------------------------------------------------------------------------------+
| **overwrite** | Definition     | Used to supersede an OSSEC rule with local changes.                                               |
+               +----------------+---------------------------------------------------------------------------------------------------+
|               | Allowed values | yes, no                                                                                           |
+---------------+----------------+---------------------------------------------------------------------------------------------------+
| **noalert**   | Definition     | Not trigger any alert if the rule matches.                                                        |
+               +----------------+---------------------------------------------------------------------------------------------------+
|               | Allowed values | Attribute with no value                                                                           |
+---------------+----------------+---------------------------------------------------------------------------------------------------+

match
^^^^^
Any string to match against the log event.

+--------------------+-----------------------------------------------------------------+
| **Default Value**  | n/a                                                             |
+--------------------+-----------------------------------------------------------------+
| **Allowed values** | Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_ |
+--------------------+-----------------------------------------------------------------+

regex
^^^^^

Any regex to match against the log event.

+--------------------+---------------------------------------------------------------+
| **Default Value**  | n/a                                                           |
+--------------------+---------------------------------------------------------------+
| **Allowed values** | Any `regex expression <regex.html#os-regex-or-regex-syntax>`_ |
+--------------------+---------------------------------------------------------------+

decoded_as
^^^^^^^^^^

+--------------------+------------------+
| **Default Value**  | n/a              |
+--------------------+------------------+
| **Allowed values** | Any decoder name |
+--------------------+------------------+

category
^^^^^^^^^^

The decoded category to match: ids, syslog, firewall, web-log, squid or windows.

+--------------------+--------------+
| **Default Value**  | n/a          |
+--------------------+--------------+
| **Allowed values** | Any category |
+--------------------+--------------+

field
^^^^^

Any regex to be compared to a field extracted by the decoder.

+----------+-----------------------------------------------------------+
| **name** | Specifies the name of the field extracted by the decoder. |
+----------+-----------------------------------------------------------+

srcip
^^^^^

Any IP address or CIDR block to be compared to an IP decoded as srcip. Use "!" to negate it.

+--------------------+-----------+
| **Default Value**  | n/a       |
+--------------------+-----------+
| **Allowed values** | Any srcip |
+--------------------+-----------+

dstip
^^^^^

Any IP address or CIDR block to be compared to an IP decoded as dstip. Use "!" to negate it.

+--------------------+-----------+
| **Default Value**  | n/a       |
+--------------------+-----------+
| **Allowed values** | Any dstip |
+--------------------+-----------+

extra_data
^^^^^^^^^^

Any string that is decoded into the extra_data field.

+--------------------+-------------+
| **Default Value**  | n/a         |
+--------------------+-------------+
| **Allowed values** | Any string. |
+--------------------+-------------+

user
^^^^^

Any username (decoded as the username).

+--------------------+------------------------------------------------------------------+
| **Default Value**  | n/a                                                              |
+--------------------+------------------------------------------------------------------+
| **Allowed values** | Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_  |
+--------------------+------------------------------------------------------------------+

program_name
^^^^^^^^^^^^^^^

Program name is decoded from syslog process name.

+--------------------+------------------------------------------------------------------+
| **Default Value**  | n/a                                                              |
+--------------------+------------------------------------------------------------------+
| **Allowed values** | Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_  |
+--------------------+------------------------------------------------------------------+

hostname
^^^^^^^^^^

Any hostname (decoded as the syslog hostname) or log file.

+--------------------+------------------------------------------------------------------+
| **Default Value**  | n/a                                                              |
+--------------------+------------------------------------------------------------------+
| **Allowed values** | Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_  |
+--------------------+------------------------------------------------------------------+

time
^^^^^

Time that the event was generated.

+--------------------+------------------------------+
| **Default Value**  | n/a                          |
+--------------------+------------------------------+
| **Allowed values** | Any time range (hh:mm-hh:mm) |
+--------------------+------------------------------+

weekday
^^^^^^^^

Week day that the event was generated.

+--------------------+-------------------------------------+
| **Default Value**  | n/a                                 |
+--------------------+-------------------------------------+
| **Allowed values** | monday - sunday, weekdays, weekends |
+--------------------+-------------------------------------+

id
^^^

Any ID (decoded as the ID).

+--------------------+------------------------------------------------------------------+
| **Default Value**  | n/a                                                              |
+--------------------+------------------------------------------------------------------+
| **Allowed values** | Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_  |
+--------------------+------------------------------------------------------------------+

url
^^^

Any URL (decoded as the URL).

+--------------------+------------------------------------------------------------------+
| **Default Value**  | n/a                                                              |
+--------------------+------------------------------------------------------------------+
| **Allowed values** | Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_  |
+--------------------+------------------------------------------------------------------+

action
^^^^^^

Any action (decoded as the ACTION).

+--------------------+------------------------------------------------------------------+
| **Default Value**  | n/a                                                              |
+--------------------+------------------------------------------------------------------+
| **Allowed values** | Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_  |
+--------------------+------------------------------------------------------------------+

if_sid
^^^^^^

Matches if the ID has matched.

+--------------------+-------------+
| **Default Value**  | n/a         |
+--------------------+-------------+
| **Allowed values** | Any rule id |
+--------------------+-------------+

if_group
^^^^^^^^

Matches if the group has matched before.

+--------------------+-----------+
| **Default Value**  | n/a       |
+--------------------+-----------+
| **Allowed values** | Any Group |
+--------------------+-----------+

if_level
^^^^^^^^

Matches if the level has matched before.

+--------------------+------------------------+
| **Default Value**  | n/a                    |
+--------------------+------------------------+
| **Allowed values** | Any level from 1 to 16 |
+--------------------+------------------------+

if_matched_sid
^^^^^^^^^^^^^^^

Matches if an alert of the defined ID has been triggered in a set number of seconds.

This option is used in conjunction with frequency and timeframe.

+--------------------+-------------+
| **Default Value**  | n/a         |
+--------------------+-------------+
| **Allowed values** | Any rule id |
+--------------------+-------------+

.. note::
  Rules at level 0 are discarded immediately and will not be used with the if_matched_rules. The level must be at least 1, but the <no_log> option can be added to the rule to make sure it does not get logged.

if_matched_group
^^^^^^^^^^^^^^^^

Matches if an alert of the defined group has been triggered in a set number of seconds.

This option is used in conjunction with frequency and timeframe.

+--------------------+-----------+
| **Default Value**  | n/a       |
+--------------------+-----------+
| **Allowed values** | Any Group |
+--------------------+-----------+


same_id
^^^^^^^

Specifies that the decoded id must be the same.
This option is used in conjunction with frequency and timeframe.

+--------------------+--------------------+
| **Example of use** | <same_id />        |
+--------------------+--------------------+

same_source_ip
^^^^^^^^^^^^^^

Specifies that the decoded source ip must be the same.
This option is used in conjunction with frequency and timeframe.

+--------------------+--------------------+
| **Example of use** | <same_source_ip /> |
+--------------------+--------------------+

same_src_port
^^^^^^^^^^^^^

Specifies that the decoded source port must be the same.
This option is used in conjunction with frequency and timeframe.

+--------------------+--------------------+
| **Example of use** | <same_src_port />  |
+--------------------+--------------------+

same_dst_port
^^^^^^^^^^^^^

Specifies that the decoded destination port must be the same.
This option is used in conjunction with frequency and timeframe.

+--------------------+--------------------+
| **Example of use** | <same_dst_port />  |
+--------------------+--------------------+

same_location
^^^^^^^^^^^^^

Specifies that the location must be the same.
This option is used in conjunction with frequency and timeframe.

+--------------------+--------------------+
| **Example of use** | <same_location />  |
+--------------------+--------------------+

same_user
^^^^^^^^^

Specifies that the decoded user must be the same.
This option is used in conjunction with frequency and timeframe.

+--------------------+--------------------+
| **Example of use** | <same_user />      |
+--------------------+--------------------+

different_url
^^^^^^^^^^^^^

Specifies that the decoded url must be different.
This option is used in conjunction with frequency and timeframe.

+--------------------+--------------------+
| **Example of use** | <different_url />  |
+--------------------+--------------------+

different_srcgeoip
^^^^^^^^^^^^^^^^^^

Specifies that the source geoip location must be different.
This option is used in conjunction with frequency and timeframe.

+--------------------+------------------------+
| **Example of use** | <different_srcgeoip /> |
+--------------------+------------------------+

description
^^^^^^^^^^^^

Rule description.

+--------------------+------------+
| **Default Value**  | n/a        |
+--------------------+------------+
| **Allowed values** | Any string |
+--------------------+------------+

Since Wazuh v3.3.0 it is possible to include any decoded field (static or dynamic) to the description message.

list
^^^^

Perform a CDB lookup using an ossec list.  This is a fast on disk database which will always find keys within two seeks of the file.

+--------------------+-------------------------------------------------------------------------------------------------------------------+
| **Default Value**  | n/a                                                                                                               |
+--------------------+-------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | Path to the CDB file to be used for lookup from the OSSEC directory.Must also be included in the ossec.conf file. |
+--------------------+-------------------------------------------------------------------------------------------------------------------+

+-----------------+-------------------------+---------------------------------------------------------------------------------------------------------+
| Attribute       | Description                                                                                                                       |
+-----------------+-------------------------+---------------------------------------------------------------------------------------------------------+
| **field**       | key in the CDB: srcip, srcport, dstip, dstport, extra_data, user, url, id, hostname, program_name, status, action, dynamic field. |
+-----------------+-------------------------+---------------------------------------------------------------------------------------------------------+
| **lookup**      | match_key               | key to search within the cdb and will match if they key is present. Default.                            |
+-----------------+-------------------------+---------------------------------------------------------------------------------------------------------+
|                 | not_match_key           | key to search and will match if it is not present in the database.                                      |
+-----------------+-------------------------+---------------------------------------------------------------------------------------------------------+
|                 | match_key_value         | searched for in the cdb. It will be compared with regex from attribute check_value.                     |
+-----------------+-------------------------+---------------------------------------------------------------------------------------------------------+
|                 | address_match_key       | IP and the key to search within the cdb and will match if they key is present.                          |
+-----------------+-------------------------+---------------------------------------------------------------------------------------------------------+
|                 | not_address_match_key   | IP the key to search and will match if it IS NOT present in the database                                |
+-----------------+-------------------------+---------------------------------------------------------------------------------------------------------+
|                 | address_match_key_value | IP to search in the cdb. It will be compared with regex from attribute check_value.                     |
+-----------------+-------------------------+---------------------------------------------------------------------------------------------------------+
| **check_value** | regex for matching on the value pulled out of the cdb when using types: address_match_key_value, match_key_value                  |
+-----------------+-----------------------------------------------------------------------------------------------------------------------------------+

info
^^^^

Extra information may be added through the following attributes:

+--------------------+------------+
| **Default Value**  | n/a        |
+--------------------+------------+
| **Allowed values** | Any string |
+--------------------+------------+

+-----------+----------------+-----------------------------------------------------------------------------------------------------------+
| Attribute | Allowed values | Description                                                                                               |
+-----------+----------------+-----------------------------------------------------------------------------------------------------------+
| type      | **text**       | This is the default when no type is selected. Additional,information about the alert/event.               |
+           +----------------+-----------------------------------------------------------------------------------------------------------+
|           | **link**       | Link to more information about the alert/event.                                                           |
+           +----------------+-----------------------------------------------------------------------------------------------------------+
|           | **cve**        | The CVE Number related to this alert/event.                                                               |
+           +----------------+-----------------------------------------------------------------------------------------------------------+
|           | **ovsdb**      | The osvdb id related to this alert/event.                                                                 |
+-----------+----------------+-----------------------------------------------------------------------------------------------------------+

.. _rules_options:

options
^^^^^^^^

Additional rule options

+--------------------+-----------------------------------------------------+
| Attribute          | Description                                         |
+====================+=====================================================+
| **alert_by_email** | Always alert by email.                              |
+--------------------+-----------------------------------------------------+
| **no_email_alert** | Never alert by email.                               |
+--------------------+-----------------------------------------------------+
| **no_log**         | Do not log this alert.                              |
+--------------------+-----------------------------------------------------+
| **no_full_log**    | Do not include the ``full_log`` field in the alert. |
+--------------------+-----------------------------------------------------+
| **no_counter**     | Omit field ``rule.firedtimes`` in the JSON alert.   |
+--------------------+-----------------------------------------------------+

.. note::
  Use one ``<options>`` tag for each option you want to add.

.. _rules_check_diff:

check_diff
^^^^^^^^^^^

Used to determine when the output of a command changes.

+--------------------+--------------------+
| **Example of use** | <check_diff />     |
+--------------------+--------------------+

group
^^^^^^

Add additional groups to the alert. Groups are optional tags added to alerts.

They can be used by other rules by using if_group or if_matched_group, or by alert parsing tools to categorize alerts.

+--------------------+------------+
| **Default Value**  | n/a        |
+--------------------+------------+
| **Allowed values** | Any String |
+--------------------+------------+
