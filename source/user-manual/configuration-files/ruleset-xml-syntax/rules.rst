Rules Syntax
============

+---------------------+-----------------------------------------------------------------+
| Options             | Allowed values                                                  |
+=====================+=================================================================+
| `rule`_             | n/a                                                             |
+---------------------+-----------------------------------------------------------------+
| `match`_            | Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_ |
+---------------------+-----------------------------------------------------------------+
| `regex`_            | Any `regex expression <regex.html#os-regex-or-regex-syntax>`_   |
+---------------------+-----------------------------------------------------------------+
| `decoded_as`_       | Any decoder name                                                |
+---------------------+-----------------------------------------------------------------+
| `category`_         | Any category categories                                         |
+---------------------+-----------------------------------------------------------------+
| `srcip`_            | Any srcip                                                       |
+---------------------+-----------------------------------------------------------------+
| `dstip`_            | Any dstip                                                       |
+---------------------+-----------------------------------------------------------------+
| `extra_data`_       | Any string                                                      |
+---------------------+-----------------------------------------------------------------+
| `user`_             | Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_ |
+---------------------+-----------------------------------------------------------------+
| `program_name`_     | Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_ |
+---------------------+-----------------------------------------------------------------+
| `hostname`_         | Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_ |
+---------------------+-----------------------------------------------------------------+
| `time`_             | Any time range (hh:mm-hh:mm)                                    |
+---------------------+-----------------------------------------------------------------+
| `weekday`_          | monday - sunday, weekday, weekend                               |
+---------------------+-----------------------------------------------------------------+
| `id`_               | Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_ |
+---------------------+-----------------------------------------------------------------+
| `url`_              | Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_ |
+---------------------+-----------------------------------------------------------------+
| `if_sid`_           | Any rule id                                                     |
+---------------------+-----------------------------------------------------------------+
| `if_group`_         | Any group                                                       |
+---------------------+-----------------------------------------------------------------+
| `if_level`_         | Any level from 1 to 16                                          |
+---------------------+-----------------------------------------------------------------+
| `if_matched_sid`_   | Any rule id                                                     |
+---------------------+-----------------------------------------------------------------+
| `if_matched_group`_ | Any group                                                       |
+---------------------+-----------------------------------------------------------------+
| `same_id`_          | n/a                                                             |
+---------------------+-----------------------------------------------------------------+
| `same_source_ip`_   | n/a                                                             |
+---------------------+-----------------------------------------------------------------+
| `same_source_port`_ | n/a                                                             |
+---------------------+-----------------------------------------------------------------+
| `same_dst_port`_    | n/a                                                             |
+---------------------+-----------------------------------------------------------------+
| `same_location`_    | n/a                                                             |
+---------------------+-----------------------------------------------------------------+
| `same_user`_        | n/a                                                             |
+---------------------+-----------------------------------------------------------------+
| `description`_      | Any string                                                      |
+---------------------+-----------------------------------------------------------------+
| `list`_             | Path to the CDB file to be used for lookup                      |
|                     |                                                                 |
|                     | from the OSSEC directory.                                       |
|                     |                                                                 |
|                     | This file must also be included in the ossec.conf file.         |
+---------------------+-----------------------------------------------------------------+
| `info`_             | Any string                                                      |
+---------------------+-----------------------------------------------------------------+
| `options`_          | alert_by_email, no_email_alert, no_log                          |
+---------------------+-----------------------------------------------------------------+
| `check_diff`_       | n/a                                                             |
+---------------------+-----------------------------------------------------------------+
| `group`_            | Any string                                                      |
+---------------------+-----------------------------------------------------------------+



``rule``
--------

The attributes list below defines a rule

.. topic:: Default value

	n/a

.. topic:: Allowed values

  n/a

.. topic:: Attributes

  level
    Specifies the level of the rule.
    Alerts and responses use this value.

    Allowed values
      Any number from 0 to 16
  id
    Specifies the ID of the rule.

    Allowed values
      Any number from 100 to 9999
  maxsize
    Specifies the maximum size of the event.

    Allowed values
      Any number from 1 to 9999
  frequency
    Specifies the number of times the rule must have matched before firing.
    The number that triggers the rule is actually 2 more than this setting.

    Allowed values
      Any number from 1 to 999
  timeframe
    The timeframe is in seconds. This option is intended to be used with the frequency option.

    Allowed values
      Any number from 1 to 9999
  ignore
    The time (in seconds) to ignore this rule after firing it (to avoid floods).

    Allowed values
      Any number from 1 to 9999
  overwrite
    Used to supersed an OSSEC rule with local changes.  This is useful to change the level or other options of rules included  in OSSEC.

    Allowed values
      yes

``match``
---------
Any string to match against the log event.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_

``regex``
---------

Any regex to match against the log event.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any `regex expression <regex.html#os-regex-or-regex-syntax>`_

``decoded_as``
--------------

Any decoder name

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any decoder name

``category``
------------

The decoded category to match: ids, syslog, firewall, web-log, squid or windows.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any category

``srcip``
---------

Any IP address or CIDR block to be compared to an IP decoded as srcip. Use "!" to negate it.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any srcip

``dstip``
---------

Any IP address or CIDR block to be compared to an IP decoded as dstip. Use "!" to negate it.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any dstip


``extra_data``
--------------

Any string that is decoded into the ``extra_data`` field.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any string.

``user``
--------

Any username (decoded as the username).

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_

``program_name``
----------------

Program name is decoded from syslog process name.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_


``hostname``
------------

Any hostname (decoded as the syslog hostname) or log file.

.. topic:: Default value

  n/a

.. topic:: Allowed values

  Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_

``time``
--------

Time that the event was generated.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any time range (hh:mm-hh:mm)

``weekday``
-----------

 Week day that the event was generated.

.. topic:: Default value

  n/a

.. topic:: Allowed values

  monday - sunday, weekdays, weekends

``id``
------

Any ID (decoded as the ID).

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_

``url``
-------

Any URL (decoded as the URL).

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_

``if_sid``
----------

Matches if the ID has matched.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any rule id

``if_group``
------------

Matches if the group has matched before.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any Group

``if_level``
------------

Matches if the level has matched before.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any level from 1 to 16

``if_matched_sid``
------------------

Matches if an alert of the defined ID has been triggered in a set number of seconds.

This option is used in conjunction with frequency and timeframe.


.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any rule id

  .. note::
      Rules at level 0 are discarded immediately and will not be used with the ``if_matched_rules``. The level must be at least ``1``, but the ``<no_log>`` option can be added to the rule to make sure it does not get logged.



``if_matched_group``
--------------------

Matches if an alert of the defined group has been triggered in a set number of seconds.

This option is used in conjunction with frequency and timeframe.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any group


``same_id``
-----------

Specifies that the decoded id must be the same.
This option is used in conjunction with frequency and timeframe.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  n/a

``same_source_ip``
------------------

Specifies that the decoded source ip must be the same.
This option is used in conjunction with frequency and timeframe.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  n/a

``same_source_port``
--------------------

Specifies that the decoded source port must be the same.
This option is used in conjunction with frequency and timeframe.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  n/a

``same_dst_port``
-----------------

Specifies that the decoded destination port must be the same.
This option is used in conjunction with frequency and timeframe.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  n/a

``same_location``
-----------------

Specifies that the location must be the same.
This option is used in conjunction with frequency and timeframe.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  n/a

``same_user``
-------------

Specifies that the decoded user must be the same.
This option is used in conjunction with frequency and timeframe.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  n/a

``description``
---------------

Rule description.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any string

``list``
--------

Preform a CDB lookup using an ossec list.  This is a fast on disk database which will always find keys within two seeks of the file.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Path to the CDB file to be used for lookup from the OSSEC directory.  This file must also be included in the ossec.conf file.

.. topic:: Attributes

  field
    Field that is used as the key to look up in the CDB file:
    srcip
    srcport
    dstip
    dstport
    extra_data
    user
    url
    id
    hostname
    program_name
    status
    action

  lookup
    This is the type of lookup that is preformed:

    match_key
      Positive key match: field is the key to search within the cdb and will match if they key is present.
      This is the default if no lookup is specified.
    not_match_key
      Negative key match: field is the key to search and will match if it is not present in the database.
    match_key_value
      Key and Value Match: field is searched for in the cdb and if found the value will be compared with regex from attribute check_value.
    address_match_key
      Positive key match: field is an IP address and the key to search within the cdb and will match if they key is present.
    not_address_match_key
      Negative key match: field is an IP address the key to search and will match if it IS NOT present in the database.
    address_match_key_value
      Key and Value Match: field is an IP address searched for in the cdb and if found the value will be compared with regex from attribute check_value.

  check_value
    regex pattern for matching on the value pulled out of the cdb when using lookup types: address_match_key_value, match_key_value


``info``
--------

Extra information may be added through the following attributes:

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any string

.. topic:: Attributes

  type
    text
      This is the default when no type is selected.
      Just used for additional,information about the alert/event.
    link
      Link to more information about the alert/event.
    cve
      The CVE Number related to this alert/event.
    ovsdb
      The osvdb id related to this alert/event.





``options``
-----------

Additional rule options

.. topic:: Default value

	n/a

.. topic:: Allowed values

  alert_by_email
    Always alert by email.
  no_email_alert
    Never alert by email.
  no_log
    Do not log this alert.

``check_diff``
--------------

Used to determine when the output of a command changes.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  n/a

``group``
---------

Add additional groups to the alert. Groups are optional tags added to alerts.

They can be used by other rules by using ``if_group`` or ``if_matched_group``, or by alert parsing tools to categorize alerts.


.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any string
