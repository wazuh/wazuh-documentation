.. Copyright (C) 2020 Wazuh, Inc.

.. _rules_syntax:

Rules Syntax
============

The Wazuh Ruleset combined with any customs rules is used to analyze incoming events and generate alerts when appropriate. The Ruleset is constant expansion and enhancement thanks to the collaborative effort of our developers and our growing community.

Our aim is to provide the best guidance possible for anyone who may be looking into developing their own custom rules and remember you can always `contribute <../contribute.html>`_ to our community.


Overview
--------

The **xml labels** used to configure ``rules`` are listed here.

+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| Option                  | Values                                                        | Description                                                                                          |
+=========================+===============================================================+======================================================================================================+
| `rule`_                 | See `table <rules.html#rule>`_ below.                         | Its starts a new rule and its defining options.                                                      |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `match`_                | Any `sregex <regex.html#sregex-os-match-syntax>`_.            | It will attempt to find a match in the log, deciding if the rule should be triggered.                |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `regex`_                | Any `regex expression <regex.html#regex-os-regex-syntax>`_.   | It does the same as ``match`` but in *regex* instead of *sregex*.                                    |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `decoded_as`_           | Any decoder's name.                                           | It will match with logs that have been decoded by a specific decoder.                                |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `category`_             | ossec, ids, syslog, firewall, web-log, squid or windows.      | It will match with logs whose decoder's `type <decoders.html#decoder>`_ concur.                      |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `field`_                | Name and `sregex <regex.html#sregex-os-match-syntax>`_        | It will compare a field extracted by the decoder in `order <decoders.html#order>`_ with a specific   |
|                         |                                                               | value.                                                                                               |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `srcip`_                | Any IP address.                                               | It will compare the IP address with the IP decoded as ``srcip``. Use "!" to negate it.               |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `dstip`_                | Any IP address.                                               | It will compare the IP address with the IP decoded as ``dstip``. Use "!" to negate it.               |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `extra_data`_           | Any String.                                                   | It will compare a string with the string decoded as ``extra_data``.                                  |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `user`_                 | Any `sregex <regex.html#sregex-os-match-syntax>`_.            | It will compare a sregex representing a username with a string decoded as ``user``.                  |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `program_name`_         | Any `sregex <regex.html#sregex-os-match-syntax>`_.            | It compares it with the program_name obtained in the pre-decoding phase.                             |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `hostname`_             | Any `sregex <regex.html#sregex-os-match-syntax>`_.            | It compares it with the hostname obtained in the pre-decoding phase.                                 |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `time`_                 | Any time range. e.g. (hh:mm-hh:mm)                            | It checks if the event was generated during that time range.                                         |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `weekday`_              | monday - sunday, weekdays, weekends                           | It checks whether the event was generated during certain weekdays.                                   |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `id`_                   | Any `sregex <regex.html#sregex-os-match-syntax>`_.            | It will look for a match with the field decoded as ``ID``                                            |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `url`_                  | Any `sregex <regex.html#sregex-os-match-syntax>`_.            | It will look for a match with the field decoded as ``url``                                           |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `location`_             | Any `sregex <regex.html#sregex-os-match-syntax>`_.            | Location identifies the origin of the input.                                                         |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `action`_               | Any String.                                                   | It will compare it with the field decoded as ``action``.                                             |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `if_sid`_               | A rule ID.                                                    | It works similar to parent decoder. It will match if that rule ID has previously matched.            |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `if_group`_             | Any group name.                                               | It will match if the indicated group has matched before.                                             |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `if_level`_             | Any level from 1 to 16.                                       | It will match if that level has already been triggered by another rule.                              |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `if_matched_sid`_       | Any rule ID (Number).                                         | Similar to ``if_sid`` but it will only match if the ID has been triggered in a period of time.       |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `if_matched_group`_     | Any group name.                                               | Similar to ``if_group`` but it will only match if the group has been triggered in a period of time.  |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_id`_              | None.                                                         | The decoded ``id`` must be the same.                                                                 |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `not_same_id`_          | None.                                                         | The decoded ``id`` must be different.                                                                |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `different_id`_         | None.                                                         | The decoded ``id`` must be different.                                                                |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_source_ip`_       | None.                                                         | The decoded ``srcip`` must be the same.                                                              |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `not_same_source_ip`_   | None.                                                         | The decoded ``srcip`` must be different.                                                             |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_srcip`_           | None.                                                         | The decoded ``srcip`` must be the same.                                                              |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `different_srcip`_      | None.                                                         | The decoded ``srcip`` must be different.                                                             |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_dstip`_           | None.                                                         | The decoded ``dstip`` must be the same.                                                              |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `different_dstip`_      | None.                                                         | The decoded ``dstip`` must be different.                                                             |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_srcport`_         | None.                                                         | The decoded ``srcport`` must be the same.                                                            |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `different_srcport`_    | None.                                                         | The decoded ``srcport`` must be different.                                                           |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_dstport`_         | None.                                                         | The decoded ``dstport`` must be the same.                                                            |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `different_dstport`_    | None.                                                         | The decoded ``dstport`` must be different.                                                           |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_location`_        | None.                                                         | The ``location`` must be the same.                                                                   |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `different_location`_   | None.                                                         | The ``location`` must be different.                                                                  |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_srcuser`_         | None.                                                         | The decoded ``srcuser`` must be the same.                                                            |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `different_srcuser`_    | None.                                                         | The decoded ``srcuser`` must be different.                                                           |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_user`_            | None.                                                         | The decoded ``user`` must be the same.                                                               |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `not_same_user`_        | None.                                                         | The decoded ``user`` must be different.                                                              |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `different_user`_       | None.                                                         | The decoded ``user`` must be different.                                                              |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `not_same_agent`_       | None.                                                         | The decoded ``agent`` must be different.                                                             |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_field`_           | None.                                                         | The decoded ``field`` must be the same as the previous ones.                                         |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `not_same_field`_       | None.                                                         | The decoded ``field`` must be different than the previous ones.                                      |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `different_field`_      | None.                                                         | The decoded ``field`` must be different than the previous ones.                                      |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_protocol`_        | None.                                                         | The decoded ``protocol`` must be the same.                                                           |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `different_protocol`_   | None.                                                         | The decoded ``protocol`` must be different.                                                          |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_action`_          | None.                                                         | The decoded ``action`` must be the same.                                                             |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `different_action`_     | None.                                                         | The decoded ``action`` must be different.                                                            |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_data`_            | None.                                                         | The decoded ``data`` must be the same.                                                               |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `different_data`_       | None.                                                         | The decoded ``data`` must be different.                                                              |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_extra_data`_      | None.                                                         | The decoded ``extra_data`` must be the same.                                                         |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `different_extra_data`_ | None.                                                         | The decoded ``extra_data`` must be different.                                                        |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_status`_          | None.                                                         | The decoded ``status`` must be the same.                                                             |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `different_status`_     | None.                                                         | The decoded ``status`` must be different.                                                            |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_system_name`_     | None.                                                         | The decoded ``system_name`` must be the same.                                                        |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `different_system_name`_| None.                                                         | The decoded ``system_name`` must be different.                                                       |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_url`_             | None.                                                         | The decoded ``url`` must be the same.                                                                |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `different_url`_        | None.                                                         | The decoded ``url`` must be different.                                                               |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_srcgeoip`_        | None.                                                         | The decoded ``srcgeoip`` must the same.                                                              |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `different_srcgeoip`_   | None.                                                         | The decoded ``srcgeoip`` must be different.                                                          |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `same_dstgeoip`_        | None.                                                         | The decoded ``dstgeoip`` must the same.                                                              |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `different_dstgeoip`_   | None.                                                         | The decoded ``dstgeoip`` must be different.                                                          |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `description`_          | Any String.                                                   | Provides a human-readable description to explain what is the purpose of the rule. Please, use this   |
|                         |                                                               | field when creating custom rules.                                                                    |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `list`_                 | Path to the CDB file.                                         | Perform a CDB lookup using an ossec list.                                                            |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `info`_                 | Any String.                                                   | Extra information using certain attributes.                                                          |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `options`_              | See the table `below. <rules.html#options>`_                  | Additional rule options that can be used.                                                            |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `check_diff`_           | None.                                                         | Determines when the output of a command changes.                                                     |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `group`_                | Any String.                                                   | Add additional groups to the alert.                                                                  |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `status`_               | started, aborted, succeeded, failed, lost, etc.               | Declares the current status of a rule.                                                               |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `mitre`_                | See `Mitre table <rules.html#mitre>`_ below.                  | Contains Mitre Technique IDs that fit the rule                                                       |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| `var`_                  | Name for the variable. Most used: `BAD_WORDS`_                | Defines a variable that can be used anywhere inside the same file.                                   |
+-------------------------+---------------------------------------------------------------+------------------------------------------------------------------------------------------------------+


rule
^^^^

``<rule>`` is the label that starts the block that defines a *rule*. In this section, different options for this label are explained.

+---------------+----------------+----------------------------------------------------------------------------------------+
| **level**     | Definition     | Specifies the level of the rule. Alerts and responses use this value.                  |
+               +----------------+----------------------------------------------------------------------------------------+
|               | Allowed values | 0 to 16                                                                                |
+---------------+----------------+----------------------------------------------------------------------------------------+
| **id**        | Definition     | Specifies the ID of the rule.                                                          |
+               +----------------+----------------------------------------------------------------------------------------+
|               | Allowed values | Any number from 1 to 999999                                                            |
+---------------+----------------+----------------------------------------------------------------------------------------+
| **maxsize**   | Definition     | Specifies the maximum size of the event.                                               |
+               +----------------+----------------------------------------------------------------------------------------+
|               | Allowed values | Any number from 1 to 9999                                                              |
+---------------+----------------+----------------------------------------------------------------------------------------+
| **frequency** | Definition     | Number of times the rule must have matched before firing.                              |
+               +----------------+----------------------------------------------------------------------------------------+
|               | Allowed values | Any number from 2 to 9999                                                              |
+---------------+----------------+----------------------------------------------------------------------------------------+
| **timeframe** | Definition     | The timeframe in seconds. This option is intended to be used with the frequency option.|
+               +----------------+----------------------------------------------------------------------------------------+
|               | Allowed values | Any number from 1 to 99999                                                             |
+---------------+----------------+----------------------------------------------------------------------------------------+
| **ignore**    | Definition     | The time (in seconds) to ignore this rule after firing it (to avoid floods).           |
+               +----------------+----------------------------------------------------------------------------------------+
|               | Allowed values | Any number from 1 to 999999                                                            |
+---------------+----------------+----------------------------------------------------------------------------------------+
| **overwrite** | Definition     | Used to supersede an OSSEC rule with local changes.                                    |
+               +----------------+----------------------------------------------------------------------------------------+
|               | Allowed values | yes, no                                                                                |
+---------------+----------------+----------------------------------------------------------------------------------------+
| **noalert**   | Definition     | Not trigger an alert if the rule matches.                                              |
+               +----------------+----------------------------------------------------------------------------------------+
|               | Allowed values | Attribute with no value                                                                |
+---------------+----------------+----------------------------------------------------------------------------------------+

Example:

  .. code-block:: xml

    <rule id="3151" level="10" frequency="8" timeframe="120">
      <if_matched_sid>3102</if_matched_sid>
      <same_source_ip />
      <description>sendmail: Sender domain has bogus MX record. </description>
      <description>It should not be sending e-mail.</description>
      <group>multiple_spam,pci_dss_11.4,gdpr_IV_35.7.d,nist_800_53_SI.4,</group>
    </rule>

The rule is created with ID: ``3151`` and it will trigger a level 10 alert if the rule ``3102`` has matched 8 times in the last 120 seconds.

match
^^^^^
Used as a requisite to trigger the rule, will search for a match in the log event.

+--------------------+-----------------------------------------------------------------+
| **Default Value**  | n/a                                                             |
+--------------------+-----------------------------------------------------------------+
| **Allowed values** | Any `sregex expression <regex.html#sregex-os-match-syntax>`_    |
+--------------------+-----------------------------------------------------------------+

Example:

  .. code-block:: xml

    <rule id="100001" maxsize="300" level="3">
      <if_sid>100200</if_sid>
      <match>Queue flood!</match>
      <description>Flooded events queue.</description>
    </rule>

If the rule matches the ``id`` 100200 and the log contains the ``Queue flood!`` phrase in it, rule activates and triggers a level 3 alert.

regex
^^^^^

Used as a requisite to trigger the rule, will search for a match in the log event.

+--------------------+---------------------------------------------------------------+
| **Default Value**  | n/a                                                           |
+--------------------+---------------------------------------------------------------+
| **Allowed values** | Any `regex expression <regex.html#regex-os-regex-syntax>`_    |
+--------------------+---------------------------------------------------------------+

Example:


  .. code-block:: xml

    <rule id="100001" level="3">
      <if_sid>100500</if_sid>
      <regex>\d+.\d+.\d+.\d+</regex>
      <description>Matches any valid IP</description>
    </rule>

If the rule matches the ``ìd`` 100500 and the event contains any valid IP, the rule is triggered and generates a level 3 alert.

decoded_as
^^^^^^^^^^

Used as a requisite to trigger the rule. It will be triggered if the event has been decoded by a certain ``decoder``. Useful to group rules and have child rules inheriting from it.

+--------------------+------------------+
| **Default Value**  | n/a              |
+--------------------+------------------+
| **Allowed values** | Any decoder name |
+--------------------+------------------+


Example:

  .. code-block:: xml

      <rule id="53500" level="0">
        <decoded_as>smtpd</decoded_as>
        <description>OpenSMTPd grouping.</description>
      </rule>

The rule will be triggered if the event was decoded by the ``smtpd`` decoder. Now is possible to make more rules that will inherit from this one, specifically made for OpenSMTPd events.

category
^^^^^^^^


Used as a requisite to trigger the rule. It will be triggered if the ``decoder`` included that log in said category. The main categories are: ids, syslog, firewall, web-log, squid or windows.

+--------------------+--------------+
| **Default Value**  | n/a          |
+--------------------+--------------+
| **Allowed values** | Any category |
+--------------------+--------------+



Example:

  .. code-block:: xml

      <rule id="01" level="0" noalert="1">
        <category>syslog</category>
        <description>Generic template for all syslog rules.</description>
      </rule>

The rule will be triggered if the event has previously been cataloged ``syslog`` by the decoder, but it will not trigger an alert. Instead, it will be matched by other rules that might trigger alerts if needed.

field
^^^^^

Used as a requisite to trigger the rule. It will check for a match in the content of a field extracted by the decoder.

+--------------------+-----------------------------------------------------------------+
| **name**           | Specifies the name of the field extracted by the decoder.       |
+--------------------+-----------------------------------------------------------------+
| **Allowed values** | Any `regex expression <regex.html#regex-os-regex-syntax>`_      |
+--------------------+-----------------------------------------------------------------+

Example:

  .. code-block:: xml

      <rule id="87100" level="0">
          <decoded_as>json</decoded_as>
          <field name="integration">virustotal</field>
          <description>VirusTotal integration messages.</description>
          <options>no_full_log</options>
      </rule>

This rule, groups events decoded from json that belong to an integration called `VirusTotal <../../capabilities/virustotal-scan/index.html>`_. It checks the field decoded as ``integration`` and if its content is ``virustotal`` the rule is triggered.

srcip
^^^^^

Used as a requisite to trigger the rule. It will compare any IP address or CIDR block to an IP decoded as srcip. Use "!" to negate it.

+--------------------+-----------+
| **Default Value**  | n/a       |
+--------------------+-----------+
| **Allowed values** | Any srcip |
+--------------------+-----------+

Example:

  .. code-block:: xml

      <rule id="100105" level="8">
          <if_sid>100100<if_sid>
          <srcip>10.25.23.12</srcip>
          <description>Forbidden srcip has been detected.</description>
      </rule>

This rule will trigger when that exact ``scrip`` has been decoded.

dstip
^^^^^

Used as a requisite to trigger the rule. It will compare any IP address or CIDR block to an IP decoded as dstip. Use "!" to negate it.

+--------------------+-----------+
| **Default Value**  | n/a       |
+--------------------+-----------+
| **Allowed values** | Any dstip |
+--------------------+-----------+

Example:

  .. code-block:: xml

      <rule id="100110" level="5">
          <if_sid>100100<if_sid>
          <dstip>!198.168.41.30</dstip>
          <description>A different dstip has been detected.</description>
      </rule>

This rule will trigger when an ``dstip`` different from ``198.168.41.30`` is detected.


data
^^^^

Any string that is decoded into the ``data`` field.

+--------------------+-----------------------------------------------------------------+
| **Default Value**  | n/a                                                             |
+--------------------+-----------------------------------------------------------------+
| **Allowed values** | Any `sregex expression <regex.html#sregex-os-match-syntax>`_    |
+--------------------+-----------------------------------------------------------------+

extra_data
^^^^^^^^^^

Used as a requisite to trigger the rule. It will compare any string with the one decoded into the extra_data field.

+--------------------+-------------+
| **Default Value**  | n/a         |
+--------------------+-------------+
| **Allowed values** | Any string. |
+--------------------+-------------+

Example:

  .. code-block:: xml

      <rule id="7301" level="0">
        <category>windows</category>
        <extra_data>^Symantec AntiVirus</extra_data>
        <description>Grouping of Symantec AV rules from eventlog.</description>
      </rule>

This rule will trigger when the log belongs to ``windows`` category and the decoded field ``extra_data`` is: ``Symantec AntiVirus``

user
^^^^

Used as a requisite to trigger the rule. It will check the username (decoded as ``user``).

+--------------------+------------------------------------------------------------------+
| **Default Value**  | n/a                                                              |
+--------------------+------------------------------------------------------------------+
| **Allowed values** | Any `sregex expression <regex.html#sregex-os-match-syntax>`_     |
+--------------------+------------------------------------------------------------------+


Example:

  .. code-block:: xml

      <rule id="140101" level="12">
        <if_group>authentication_success</if_group>
        <user>mysql</user>
        <description>System user successfully logged to the system.</description>
      </rule>

This rule will trigger when the user ``mysql`` successfully logs into the system. Being a System user it should never log in to the system.

system_name
^^^^^^^^^^^^

Any string that is decoded into the ``system_name`` field.

+--------------------+------------------------------------------------------------------+
| **Default Value**  | n/a                                                              |
+--------------------+------------------------------------------------------------------+
| **Allowed values** | Any `sregex expression <regex.html#sregex-os-match-syntax>`_     |
+--------------------+------------------------------------------------------------------+

program_name
^^^^^^^^^^^^

Used as a requisite to trigger the rule. The program's name is decoded from syslog process name.

+--------------------+------------------------------------------------------------------+
| **Default Value**  | n/a                                                              |
+--------------------+------------------------------------------------------------------+
| **Allowed values** | Any `sregex expression <regex.html#sregex-os-match-syntax>`_     |
+--------------------+------------------------------------------------------------------+

Example:

  .. code-block:: xml

      <rule id="1005" level="5">
        <program_name>syslogd</program_name>
        <match>^restart</match>
        <description>Syslogd restarted.</description>
        <group>pci_dss_10.6.1,gpg13_10.1,gpg13_4.14,gdpr_IV_35.7.d,hipaa_164.312.b,nist_800_53_AU.6,</group>
      </rule>

The rule will trigger when the program Syslogd restarted.

protocol
^^^^^^^^

Any string that is decoded into the ``protocol`` field.

+--------------------+------------------------------------------------------------------+
| **Default Value**  | n/a                                                              |
+--------------------+------------------------------------------------------------------+
| **Allowed values** | Any `sregex expression <regex.html#sregex-os-match-syntax>`_     |
+--------------------+------------------------------------------------------------------+


hostname
^^^^^^^^

Used as a requisite to trigger the rule. Any hostname (decoded as the syslog hostname) or log file.

+--------------------+------------------------------------------------------------------+
| **Default Value**  | n/a                                                              |
+--------------------+------------------------------------------------------------------+
| **Allowed values** | Any `sregex expression <regex.html#sregex-os-match-syntax>`_     |
+--------------------+------------------------------------------------------------------+

Example:

  .. code-block:: xml

        <rule id="2931" level="0">
          <hostname>yum.log$</hostname>
          <match>^Installed|^Updated|^Erased</match>
          <description>Yum logs.</description>
        </rule>

This rule will group rules for ``Yum logs`` when something is either being installed, updated or erased.

time
^^^^

Used as a requisite to trigger the rule. Used for checking the time that the event was generated.

+--------------------+----------------------------------------------------------------------+
| **Default Value**  | n/a                                                                  |
+--------------------+----------------------------------------------------------------------+
| **Allowed values** | Any time range (hh:mm-hh:mm, hh:mm am-hh:mm pm, hh-hh, hh am-hh pm)  |
+--------------------+----------------------------------------------------------------------+

Example:

  .. code-block:: xml

      <rule id="17101" level="9">
        <if_group>authentication_success</if_group>
        <time>6 pm - 8:30 am</time>
        <description>Successful login during non-business hours.</description>
        <group>login_time,pci_dss_10.2.5,pci_dss_10.6.1,gpg13_7.1,gpg13_7.2,gdpr_IV_35.7.d,gdpr_IV_32.2,hipaa_164.312.b,nist_800_53_AU.14,nist_800_53_AC.7,nist_800_53_AU.6,</group>
      </rule>

This rule will trigger when there is a successful login between 6 pm and 8 am.

weekday
^^^^^^^

Used as a requisite to trigger the rule. Checks the weekday that the event was generated.

+--------------------+-------------------------------------+
| **Default Value**  | n/a                                 |
+--------------------+-------------------------------------+
| **Allowed values** | monday - sunday, weekdays, weekends |
+--------------------+-------------------------------------+

Example:

  .. code-block:: xml

      <rule id="17102" level="9">
        <if_group>authentication_success</if_group>
        <weekday>weekends</weekday>
        <description>Successful login during weekend.</description>
        <group>login_day,pci_dss_10.2.5,pci_dss_10.6.1,gpg13_7.1,gpg13_7.2,gdpr_IV_35.7.d,gdpr_IV_32.2,hipaa_164.312.b,nist_800_53_AU.14,nist_800_53_AC.7,nist_800_53_AU.6,</group>
      </rule>

This rule will trigger when there is a successful login during the weekend.

id
^^

Used as a requisite to trigger the rule. It will check any ID (decoded as the ID).

+--------------------+------------------------------------------------------------------+
| **Default Value**  | n/a                                                              |
+--------------------+------------------------------------------------------------------+
| **Allowed values** | Any `sregex expression <regex.html#sregex-os-match-syntax>`_     |
+--------------------+------------------------------------------------------------------+



Example:

  .. code-block:: xml

      <rule id="81100" level="0">
          <decoded_as>kernel</decoded_as>
          <id>usb</id>
          <description>USB messages grouped.</description>
      </rule>

This rule will group the logs whose decoded ID is usb.

url
^^^

Used as a requisite to trigger the rule. It will check any URL (decoded as the URL).

+--------------------+------------------------------------------------------------------+
| **Default Value**  | n/a                                                              |
+--------------------+------------------------------------------------------------------+
| **Allowed values** | Any `sregex expression <regex.html#sregex-os-match-syntax>`_     |
+--------------------+------------------------------------------------------------------+

Example:

  .. code-block:: xml

      <rule id="31102" level="0">
        <if_sid>31101</if_sid>
        <url>.jpg$|.gif$|favicon.ico$|.png$|robots.txt$|.css$|.js$|.jpeg$</url>
        <compiled_rule>is_simple_http_request</compiled_rule>
        <description>Ignored extensions on 400 error codes.</description>
      </rule>

This rule is a child from a level 5 rule ``31101`` and becomes a level 0 rule when it confirms that the extensions are nothing to worry about.

location
^^^^^^^^

Used as a requisite to trigger the rule. It will check the content of the field location and trying to find a match.

+--------------------+------------------------------------------------------------------+
| **Default Value**  | n/a                                                              |
+--------------------+------------------------------------------------------------------+
| **Allowed values** | Any `sregex expression <regex.html#sregex-os-match-syntax>`_     |
+--------------------+------------------------------------------------------------------+

The location identifies the origin of the input. If the event comes from an agent, its name and registered IP (as it was added) is appended to the location.

Example of a location for a log pulled from "/var/log/syslog" in an agent with name "dbserver" and registered with IP "any":

::

    (dbserver) any->/var/log/syslog

The following components use a static location:

+----------------------+------------------------+
| **Component**        | **Location**           |
+----------------------+------------------------+
| Windows Eventchannel | EventChannel           |
+----------------------+------------------------+
| Windows Eventlog     | WinEvtLog              |
+----------------------+------------------------+
| FIM (Syscheck)       | syscheck               |
+----------------------+------------------------+
| Rootcheck            | rootcheck              |
+----------------------+------------------------+
| Syscollector         | syscollector           |
+----------------------+------------------------+
| Vuln Detector        | vulnerability-detector |
+----------------------+------------------------+
| Azure Logs           | azure-logs             |
+----------------------+------------------------+
| AWS S3 integration   | aws-s3                 |
+----------------------+------------------------+
| Docker integration   | Wazuh-Docker           |
+----------------------+------------------------+
| Osquery integration  | osquery                |
+----------------------+------------------------+
| OpenSCAP integration | open-scap              |
+----------------------+------------------------+
| CIS-CAT integration  | wodle_cis-cat          |
+----------------------+------------------------+
| SCA module           | sca                    |
+----------------------+------------------------+


Example:

  .. code-block:: xml

      <rule id="24000" level="3">
        <location>osquery$</location>
        <description>osquery message</description>
      </rule>

This rule, groups logs that come from ``osquery`` location. Triggering a level 3 alert for it.

action
^^^^^^

Used as a requisite to trigger the rule. It will check any action (decoded as the ACTION).

+--------------------+----------------------+
| **Default Value**  | n/a                  |
+--------------------+----------------------+
| **Allowed values** | Any String.          |
+--------------------+----------------------+

Example:

  .. code-block:: xml

      <rule id="4502" level="4">
        <if_sid>4500</if_sid>
        <action>warning</action>
        <description>Netscreen warning message.</description>
      </rule>

This rule will trigger a level 4 alert when the decoded action from Netscreen is ``warning``.

if_sid
^^^^^^

Used as a requisite to trigger the rule. Matches if the ID has previously matched. It is similar to a child decoder, with the key difference that alerts can have as many descendants as necessary, whereas decoder cannot have "grandchildren".

+--------------------+-------------+
| **Default Value**  | n/a         |
+--------------------+-------------+
| **Allowed values** | Any rule id |
+--------------------+-------------+



Example:

  .. code-block:: xml

      <rule id="100110" level="5">
        <if_sid>100100</if_sid>
        <match>Error</match>
        <description>There is an error in the log.</description>
      </rule>

The rule will be triggered if the rule with id: ``100100`` has previously been triggered and the log contains the word "Error".

if_group
^^^^^^^^

Used as a requisite to trigger the rule. Matches if the group has matched before.

+--------------------+-----------+
| **Default Value**  | n/a       |
+--------------------+-----------+
| **Allowed values** | Any Group |
+--------------------+-----------+

Example:

  .. code-block:: xml

      <rule id="184676" level="12">
          <if_group>sysmon_event1</if_group>
          <field name="sysmon.image">lsm.exe</field>
          <description>Sysmon - Suspicious Process - lsm.exe</description>
          <group>pci_dss_10.6.1,pci_dss_11.4,gdpr_IV_35.7.d,hipaa_164.312.b,nist_800_53_AU.6,nist_800_53_SI.4,</group>
      </rule>

The rule matches if the group ``sysmon_event1`` has previously matched before and if the field decoded as ``sysmon.image`` is "lsm.exe".


if_level
^^^^^^^^

Matches if the level has matched before.

+--------------------+------------------------+
| **Default Value**  | n/a                    |
+--------------------+------------------------+
| **Allowed values** | Any level from 1 to 16 |
+--------------------+------------------------+

if_matched_sid
^^^^^^^^^^^^^^

Matches if an alert of the defined ID has been triggered in a set number of seconds.

This option is used in conjunction with ``frequency`` and ``timeframe``.

+--------------------+-------------+
| **Default Value**  | n/a         |
+--------------------+-------------+
| **Allowed values** | Any rule id |
+--------------------+-------------+

.. note::
  Rules at level 0 are discarded immediately and will not be used with the if_matched_rules. The level must be at least 1, but the <no_log> option can be added to the rule to make sure it does not get logged.


Example:

  .. code-block:: xml

      <rule id="30316" level="10" frequency="10" timeframe="120">
        <if_matched_sid>30315</if_matched_sid>
        <same_scrip />
        <description>Apache: Multiple Invalid URI requests from same source.</description>
        <group>invalid_request,pci_dss_10.2.4,pci_dss_11.4,gdpr_IV_35.7.d,hipaa_164.312.b,nist_800_53_AU.14,nist_800_53_AC.7,nist_800_53_SI.4,</group>
      </rule>

The rule is triggered when rule 30315 has been triggered 10 times in 120 seconds and if the requests were made by the same ``srcip``.

if_matched_group
^^^^^^^^^^^^^^^^

Matches if an alert of the defined group has been triggered in a set number of seconds.

This option is used in conjunction with ``frequency`` and ``timeframe``.

+--------------------+-----------+
| **Default Value**  | n/a       |
+--------------------+-----------+
| **Allowed values** | Any Group |
+--------------------+-----------+

Example:

  .. code-block:: xml

      <rule id="40113" level="12" frequency="8" timeframe="360">
        <if_matched_group>virus</if_matched_group>
        <description>Multiple viruses detected - Possible outbreak.</description>
        <group>virus,pci_dss_5.1,pci_dss_5.2,pci_dss_11.4,gpg13_4.2,gdpr_IV_35.7.d,nist_800_53_SI.3,nist_800_53_SI.4,</group>
      </rule>

The rule will trigger when the group ``virus`` has been matched 8 times in the last 360 seconds.

if_fts
^^^^^^

Makes the decoder that processed the event to take the `fts <decoders.html#fts>`_ line into consideration.

+--------------------+--------------------+
| **Example of use** | <if_fts />         |
+--------------------+--------------------+

.. note::
  The dynamic filters same_field or not_same_field will not work with the static fields (user, srcip, dstip, etc.) and the specific ones have to be used instead.

same_id
^^^^^^^

Specifies that the decoded id must be the same.
This option is used in conjunction with ``frequency`` and ``timeframe``.

+--------------------+--------------------+
| **Example of use** | <same_id />        |
+--------------------+--------------------+

not_same_id
^^^^^^^^^^^

.. deprecated:: 3.13.0 Use `different_id`_ instead.

Specifies that the decoded id must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

+--------------------+--------------------+
| **Example of use** | <not_same_id />    |
+--------------------+--------------------+

different_id
^^^^^^^^^^^^

Specifies that the decoded id must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+-------------------+
| **Example of use** | <different_id />  |
+--------------------+-------------------+

same_source_ip
^^^^^^^^^^^^^^

.. deprecated:: 3.13.0 Use `same_srcip`_ instead.

Specifies that the decoded source ip must be the same.
This option is used in conjunction with ``frequency`` and ``timeframe``.

+--------------------+--------------------+
| **Example of use** | <same_source_ip /> |
+--------------------+--------------------+

not_same_source_ip
^^^^^^^^^^^^^^^^^^

Specifies that the decoded source ip must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. deprecated:: 3.13.0 Use `different_srcip`_ instead.

+--------------------+------------------------+
| **Example of use** | <not_same_source_ip /> |
+--------------------+------------------------+

same_srcip
^^^^^^^^^^

Specifies that the decoded source ip must be the same.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+----------------+
| **Example of use** | <same_srcip /> |
+--------------------+----------------+

different_srcip
^^^^^^^^^^^^^^^

Specifies that the decoded source ip must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+----------------------+
| **Example of use** | <different_srcip />  |
+--------------------+----------------------+

same_dstip
^^^^^^^^^^

Specifies that the decoded destination ip must be the same.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+----------------+
| **Example of use** | <same_dstip /> |
+--------------------+----------------+

different_dstip
^^^^^^^^^^^^^^^

Specifies that the decoded destination ip must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+----------------------+
| **Example of use** | <different_dstip />  |
+--------------------+----------------------+

same_srcport
^^^^^^^^^^^^

Specifies that the decoded source port must be the same.
This option is used in conjunction with ``frequency`` and ``timeframe``.

+--------------------+-------------------+
| **Example of use** | <same_srcport />  |
+--------------------+-------------------+

different_srcport
^^^^^^^^^^^^^^^^^

Specifies that the decoded source port must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+------------------------+
| **Example of use** | <different_srcport />  |
+--------------------+------------------------+

same_dstport
^^^^^^^^^^^^

Specifies that the decoded destination port must be the same.
This option is used in conjunction with ``frequency`` and ``timeframe``.

+--------------------+-------------------+
| **Example of use** | <same_dstport />  |
+--------------------+-------------------+

different_dstport
^^^^^^^^^^^^^^^^^

Specifies that the decoded destination port must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+------------------------+
| **Example of use** | <different_dstport />  |
+--------------------+------------------------+

same_location
^^^^^^^^^^^^^

Specifies that the location must be the same.
This option is used in conjunction with ``frequency`` and ``timeframe``.

+--------------------+--------------------+
| **Example of use** | <same_location />  |
+--------------------+--------------------+

different_location
^^^^^^^^^^^^^^^^^^

Specifies that the decoded location must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+-------------------------+
| **Example of use** | <different_location />  |
+--------------------+-------------------------+

same_srcuser
^^^^^^^^^^^^

Specifies that the decoded source user must be the same.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+-------------------+
| **Example of use** | <same_srcuser />  |
+--------------------+-------------------+

different_srcuser
^^^^^^^^^^^^^^^^^

Specifies that the decoded source user must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+------------------------+
| **Example of use** | <different_srcuser />  |
+--------------------+------------------------+

same_user
^^^^^^^^^

Specifies that the decoded user must be the same.
This option is used in conjunction with ``frequency`` and ``timeframe``.

+--------------------+--------------------+
| **Example of use** | <same_user />      |
+--------------------+--------------------+

not_same_user
^^^^^^^^^^^^^

.. deprecated:: 3.13.0 Use `different_user`_ instead.

Specifies that the decoded user must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

+--------------------+--------------------+
| **Example of use** | <not_same_user />  |
+--------------------+--------------------+

different_user
^^^^^^^^^^^^^^

Specifies that the decoded user must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+---------------------+
| **Example of use** | <different_user />  |
+--------------------+---------------------+

not_same_agent
^^^^^^^^^^^^^^

.. deprecated:: 3.13.0

Specifies that the decoded agent must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

+--------------------+--------------------+
| **Example of use** | <not_same_agent /> |
+--------------------+--------------------+

same_field
^^^^^^^^^^

The value of the dynamic field specified in this option must appear in previous events a ``frequency`` number of times within the required ``timeframe``.

+--------------------+-------------------------------+
| **Example of use** | <same_field>key</same_field>  |
+--------------------+-------------------------------+

As an example of this option, check these rules:

.. code-block:: xml

  <!-- {"key":"value", "key2":"AAAA"} -->
  <rule id="100001" level="3">
    <decoded_as>json</decoded_as>
    <field name="key">value</field>
    <description>Testing JSON alert</description>
  </rule>

  <rule id="100002" level="10" frequency="4" timeframe="300">
    <if_matched_sid>100001</if_matched_sid>
    <same_field>key2</same_field>
    <description>Testing same_field option</description>
  </rule>

Rule 100002 will fire when ``key2`` in the currently considered event is the same in four events that matched rule 100001 before within the last 300 seconds. Therefore, for the following events sequence:

.. code-block:: json
  :emphasize-lines: 7

  {"key":"value", "key2":"AAAA"}
  {"key":"value", "key2":"AAAA"}
  {"key":"value", "key2":"BBBB"}
  {"key":"value", "key2":"AAAA"}
  {"key":"value", "key2":"CCCC"}
  {"key":"value", "key2":"CCCC"}
  {"key":"value", "key2":"AAAA"}

The last event will fire rule 100002 instead of 100001 becasue it found the value ``AAAA`` in three of the previous events. The corresponding alert looks like this one:

.. code-block:: json
  :emphasize-lines: 5
  :class: output

  {
    "timestamp": "2020-03-04T03:00:28.973-0800",
    "rule": {
      "level": 10,
      "description": "Testing same_field option",
      "id": "100002",
      "frequency": 4,
      "firedtimes": 1,
      "mail": false,
      "groups": [
        "local"
      ]
    },
    "agent": {
      "id": "000",
      "name": "ubuntu"
    },
    "manager": {
      "name": "ubuntu"
    },
    "id": "1583319628.14426",
    "previous_output": "{\"key\":\"value\",\"key2\":\"AAAA\"}\n{\"key\":\"value\",\"key2\":\"AAAA\"}\n{\"key\":\"value\",\"key2\":\"AAAA\"}",
    "full_log": "{\"key\":\"value\",\"key2\":\"AAAA\"}",
    "decoder": {
      "name": "json"
    },
    "data": {
      "key": "value",
      "key2": "AAAA"
    },
    "location": "/root/test.log"
  }

not_same_field
^^^^^^^^^^^^^^

.. deprecated:: 3.13.0 Use `different_field`_ instead.

It is the opposite setting of ``same_field``. The value of the dynamic field specified in this option must be different than the ones found in previous events a ``frequency`` number of times within the required ``timeframe``.

+--------------------+----------------------------------------+
| **Example of use** | <not_same_field>key2</not_same_field>  |
+--------------------+----------------------------------------+

As an example of this option, check these rules:

.. code-block:: xml

  <!-- {"key":"value", "key2":"AAAA"} -->
  <rule id="100001" level="3">
    <decoded_as>json</decoded_as>
    <field name="key">value</field>
    <description>Testing JSON alert</description>
  </rule>

  <rule id="100002" level="10" frequency="4" timeframe="300">
    <if_matched_sid>100001</if_matched_sid>
    <not_same_field>key2</not_same_field>
    <description>Testing not_same_field option</description>
  </rule>

Rule 100002 will fire when ``key2`` in the currently considered event has a different value that the same field in four previous events that matched rule 100001 before within the last 300 seconds. Therefore, for the following events sequence:

.. code-block:: json
  :emphasize-lines: 4

  {"key":"value", "key2":"AAAA"}
  {"key":"value", "key2":"AAAA"}
  {"key":"value", "key2":"BBBB"}
  {"key":"value", "key2":"CCCC"}

The last event will fire rule 100002 instead of 100001 due to the value ``CCCC`` does not appear in three previous events. The corresponding alert looks like this one:

.. code-block:: json
  :emphasize-lines: 5
  :class: output

  {
    "timestamp": "2020-03-04T03:02:21.973-0800",
    "rule": {
      "level": 10,
      "description": "Testing not_same_field option",
      "id": "100002",
      "frequency": 4,
      "firedtimes": 1,
      "mail": false,
      "groups": [
        "local"
      ]
    },
    "agent": {
      "id": "000",
      "name": "ubuntu"
    },
    "manager": {
      "name": "ubuntu"
    },
    "id": "1583319633.14426",
    "previous_output": "{\"key\":\"value\",\"key2\":\"BBBB\"}\n{\"key\":\"value\",\"key2\":\"AAAA\"}\n{\"key\":\"value\",\"key2\":\"AAAA\"}",
    "full_log": "{\"key\":\"value\",\"key2\":\"CCCC\"}",
    "decoder": {
      "name": "json"
    },
    "data": {
      "key": "value",
      "key2": "CCCC"
    },
    "location": "/root/test.log"
  }

different_field
^^^^^^^^^^^^^^^

.. versionadded:: 3.13.0

It is the opposite setting of ``same_field``. The value of the dynamic field specified in this option must be different than the ones found in previous events a ``frequency`` number of times within the required ``timeframe``.

+--------------------+------------------------------------------+
| **Example of use** | <different_field>key2</different_field>  |
+--------------------+------------------------------------------+

global_frequency
^^^^^^^^^^^^^^^^

Specifies that the events of all agents will be contemplated when using the
frequency and ``timeframe`` options. By default, only the events generated by
the same agent will be taken into account to increase the frequency counter for a rule.

+--------------------+----------------------+
| **Example of use** | <global_frequency /> |
+--------------------+----------------------+

.. warning::
  Although the label contains the word `global`, this option works at manager level, not at cluster level.

same_protocol
^^^^^^^^^^^^^

Specifies that the decoded protocol must be the same.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+-------------------+
| **Example of use** | <same_protocol /> |
+--------------------+-------------------+

different_protocol
^^^^^^^^^^^^^^^^^^

Specifies that the decoded protocol must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+-------------------------+
| **Example of use** | <different_protocol />  |
+--------------------+-------------------------+

same_action
^^^^^^^^^^^

Specifies that the decoded action must be the same.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+-----------------+
| **Example of use** | <same_action /> |
+--------------------+-----------------+

different_action
^^^^^^^^^^^^^^^^

Specifies that the decoded action must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+-----------------------+
| **Example of use** | <different_action />  |
+--------------------+-----------------------+

same_data
^^^^^^^^^

Specifies that the decoded data must be the same.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+---------------+
| **Example of use** | <same_data /> |
+--------------------+---------------+

different_data
^^^^^^^^^^^^^^

Specifies that the decoded data must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+---------------------+
| **Example of use** | <different_data />  |
+--------------------+---------------------+

same_extra_data
^^^^^^^^^^^^^^^

Specifies that the decoded extra data must be the same.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+---------------------+
| **Example of use** | <same_extra_data /> |
+--------------------+---------------------+

different_extra_data
^^^^^^^^^^^^^^^^^^^^

Specifies that the decoded extra data must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+---------------------------+
| **Example of use** | <different_extra_data />  |
+--------------------+---------------------------+

same_status
^^^^^^^^^^^

Specifies that the decoded status must be the same.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+-----------------+
| **Example of use** | <same_status /> |
+--------------------+-----------------+

different_status
^^^^^^^^^^^^^^^^

Specifies that the decoded status must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+-----------------------+
| **Example of use** | <different_status />  |
+--------------------+-----------------------+

same_system_name
^^^^^^^^^^^^^^^^

Specifies that the decoded system name must be the same.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+----------------------+
| **Example of use** | <same_system_name /> |
+--------------------+----------------------+

different_system_name
^^^^^^^^^^^^^^^^^^^^^

Specifies that the decoded system name must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+---------------------------+
| **Example of use** | <different_system_name /> |
+--------------------+---------------------------+

same_url
^^^^^^^^

Specifies that the decoded url must be the same.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+--------------+
| **Example of use** | <same_url /> |
+--------------------+--------------+

different_url
^^^^^^^^^^^^^

Specifies that the decoded url must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

+--------------------+--------------------+
| **Example of use** | <different_url />  |
+--------------------+--------------------+

same_srcgeoip
^^^^^^^^^^^^^

Specifies that the source geoip location must be the same.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+-------------------+
| **Example of use** | <same_srcgeoip /> |
+--------------------+-------------------+

different_srcgeoip
^^^^^^^^^^^^^^^^^^

Specifies that the source geoip location must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

+--------------------+------------------------+
| **Example of use** | <different_srcgeoip /> |
+--------------------+------------------------+

Example:

  As an example of these last options, check this rule:

    .. code-block:: xml

      <rule id=100005 level="0">
        <match> Could not open /home </match>
        <same_user />
        <different_srcgeoip />
        <same_dstport />
      </rule>

  That rule filters when the same ``user`` tries to open file ``/home`` but returns an error, on a different ``ip`` and using the same ``port``.

same_dstgeoip
^^^^^^^^^^^^^

.. versionadded:: 3.13.0

Specifies that the destination geoip location must be the same.
This option is used in conjunction with ``frequency`` and ``timeframe``.

+--------------------+-------------------+
| **Example of use** | <same_dstgeoip /> |
+--------------------+-------------------+

different_dstgeoip
^^^^^^^^^^^^^^^^^^

Specifies that the destination geoip location must be different.
This option is used in conjunction with ``frequency`` and ``timeframe``.

.. versionadded:: 3.13.0

+--------------------+------------------------+
| **Example of use** | <different_dstgeoip /> |
+--------------------+------------------------+

description
^^^^^^^^^^^

Specifies a human-readable description to the rule in order to provide context to each alert regarding the nature of the events matched by it. This field is required.

+--------------------+------------+
| **Default Value**  | n/a        |
+--------------------+------------+
| **Allowed values** | Any string |
+--------------------+------------+

Examples:

  .. code-block:: xml

    <rule id="100015" level="2">
      ...
      <description> A timeout occurred. </description>
    </rule>

    <rule id="100035" level="4">
      ...
      <description> File missing. Root access unrestricted. </description>
    </rule>

Since Wazuh version 3.3 it is possible to include any decoded field (static or dynamic) to the description message. You can use the following syntax: ``$(field_name)`` to add a field to the description.

Example:

  .. code-block:: xml

    <rule id="100005" level="8">
      <match>illegal user|invalid user</match>
      <description>sshd: Attempt to login using a non-existent user from IP $(attempt_ip)</description>
      <options>no_log</options>
    </rule>


list
^^^^

Perform a CDB lookup using an ossec list.  This is a fast on-disk database which will always find keys within two seeks of the file.

+--------------------+--------------------------------------------------------------------------------------------------------------------+
| **Default Value**  | n/a                                                                                                                |
+--------------------+--------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | Path to the CDB file to be used for lookup from the OSSEC directory. Must also be included in the ossec.conf file. |
+--------------------+--------------------------------------------------------------------------------------------------------------------+

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


Example:

  .. code-block:: xml

      <rule id="80780" level="3">
          <if_sid>80700</if_sid>
          <list field="audit.key" lookup="match_key_value" check_value="write">etc/lists/audit-keys</list>
          <description>Audit: Watch - Write access</description>
          <group>audit_watch_write,gdpr_IV_30.1.g,</group>
      </rule>

The rule will look for "audit.key" in the CDB list. Where it will check if its equal to "write", in which case it will match and trigger a level 3 alert.

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
| type      | **text**       | This is the default when no type is selected. Additional information about the alert/event.               |
+           +----------------+-----------------------------------------------------------------------------------------------------------+
|           | **link**       | Link to more information about the alert/event.                                                           |
+           +----------------+-----------------------------------------------------------------------------------------------------------+
|           | **cve**        | The CVE Number related to this alert/event.                                                               |
+           +----------------+-----------------------------------------------------------------------------------------------------------+
|           | **ovsdb**      | The osvdb id related to this alert/event.                                                                 |
+-----------+----------------+-----------------------------------------------------------------------------------------------------------+



Example:

  .. code-block:: xml

      <rule id="5714" level="14" timeframe="120" frequency="3">
        <if_matched_sid>5713</if_matched_sid>
        <match>Local: crc32 compensation attack</match>
        <description>sshd: SSH CRC-32 Compensation attack</description>
        <info type="cve">2001-0144</info>
        <info type="link">http://www.securityfocus.com/bid/2347/info/</info>
        <group>exploit_attempt,pci_dss_11.4,pci_dss_6.2,gpg13_4.12,gdpr_IV_35.7.d,nist_800_53_SI.4,nist_800_53_SI.2,</group>
      </rule>

The rule provides additional information about the threat it detects.

.. _rules_options:

options
^^^^^^^

Additional rule options.

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

Example:

  .. code-block:: xml

    <rule id="9800" level="8">
      <match>illegal user|invalid user</match>
      <description>sshd: Attempt to login using a non-existent user</description>
      <options>no_log</options>
    </rule>

.. note::
  Use one ``<options>`` tag for each option you want to add.

.. _rules_check_diff:

check_diff
^^^^^^^^^^

Used to determine when the output of a command changes.

Example:

  .. code-block:: xml

      <rule id="534" level="1">
        <if_sid>530</if_sid>
        <match>ossec: output: 'w'</match>
        <check_diff />
        <options>no_log</options>
        <description>List of logged in users. It will not be alerted by default.</description>
      </rule>

group
^^^^^

Add additional groups to the alert. Groups are optional tags added to alerts.

They can be used by other rules by using if_group or if_matched_group, or by alert parsing tools to categorize alerts.

Groups are variables that define behavior. When an alert includes that group label, this behavior will occur.

Example:

  .. code-block:: xml

    <rule id="3801" level="4">
      <description>Group for rules related with spam.</description>
      <group>spam,</group>
    </rule>

Now, every rule with the line ``<group>spam,</group>`` will be included in that group.

It's a very useful label to keep the rules ordered.

+--------------------+------------+
| **Default Value**  | n/a        |
+--------------------+------------+
| **Allowed values** | Any String |
+--------------------+------------+

status
^^^^^^

Checks the actual status of an event.

+--------------------+----------------------------------------------+
| **Default Value**  | n/a                                          |
+--------------------+----------------------------------------------+
| **Allowed values** | started, aborted, succeded, failed, lost...  |
+--------------------+----------------------------------------------+

Example:

  .. code-block:: xml

      <rule id="213" level="7">
        <if_sid>210</if_sid>
        <status>aborted</status>
        <description>Remote upgrade could not be launched. Error: $(error).</description>
        <group>upgrade,upgrade_failure,</group>
      </rule>


mitre
^^^^^
.. versionadded:: 3.13.0

Specifies the `MITRE ATT&CK <https://attack.mitre.org>`_ technique ID or IDs that fit in well with the rule.

+----------------+----------------------------+
| Required label | Value                      |
+================+============================+
| **id**         | MITRE ATT&CK technique ID. |
+----------------+----------------------------+

Example:

  .. code-block:: xml

    <rule id="100002" level="10">
      <description>Attack technique sample.</description>
      <mitre>
        <id>T1110</id>
        <id>T1037</id>
      </mitre>
    </rule>

var
^^^

Defines a variable that may be used in any place of the same file.

+----------------+------------------------+
| Attribute      | Value                  |
+================+========================+
| **name**       | Name for the variable. |
+----------------+------------------------+

Example:

  .. code-block:: xml

     <var name="joe_folder">/home/joe/</var>

      <group name="local,">

        <rule id="100001" level="5">
          <if_sid>550</if_sid>
          <field name="file">^$joe_folder</field>
          <description>A Joe's file was modified.</description>
          <group>ossec,pci_dss_10.6.1,gpg13_10.1,gdpr_IV_35.7.d,</group>
        </rule>

    </group>

BAD_WORDS
^^^^^^^^^

<var name="BAD_WORDS">error|warning|failure</var>

``BAD_WORDS`` is a very used use case of ``<var>`` option.

It is used to include many words in the same variable. Later, this variable can be matched into the decoders to check if any of those words are in a caught event.

Example:

  .. code-block:: xml

    <var name="BAD_WORDS">error|warning|failure</var>

    <group name="syslog,errors,">
      <rule id="XXXX" level="2">
        <match>$BAD_WORDS</match>
        <description>Error found.</description>
      </rule>
    </group>
