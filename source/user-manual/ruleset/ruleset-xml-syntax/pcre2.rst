.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh Ruleset is used to analyze incoming events and generate alerts when appropriate. Learn more about Perl-compatible regular expressions here.

.. _regex_pcre2:

Perl-compatible Regular Expressions
***********************************

.. versionadded:: 4.1.0

Log collecting and processing is one of the most important features in Wazuh,
allowing users to know the status in real-time of the Wazuh agent operating system and
their running applications. Incorporation of PCRE regex support along with
already existent OSRegex and OSMatch regex will open up a range of possibilities
and, at the same time, enhances log comprehension and interpretation.


This section briefly the features of this type of regex, its enablement
in rules and decoders, and some use cases applied to the default ruleset.

#. `Advantages`_
#. `Configuring PCRE`_
#. `Use case: Accurate PAM user alerts`_

Advantages
==========

Quantifiers
-----------

In addition to the already known ``*`` and ``+`` quantifiers, PCRE incorporates:

- ``?`` try match zero or one times. Example: ``https?`` regex will match `http` and `https`
- ``{n}`` try match exactly n times. Example: ``\d{4}`` regex will match `1000` and any second or third millennium year.
- ``{n,}`` try match n or more times. Example: ``\d{2,}`` will `12`, `123`, `1234` and so on
- ``{n,m}`` try to match between n and m times. Example: ``\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}`` will match any IPv4 address.

All quantifiers can be used and combined with groups, expressions and literals.
Example: ``(\d{1,3}\.?){4}`` it is shorter and equivalent to ``\d{1,3}\.?\d{1,3}\.?\d{1,3}\.?\d{1,3}.?``



Case sensitivity
----------------

Compared to :ref:`OSRegex <os_regex_syntax>` and :ref:`OSMatch <sregex_os_match_syntax>`, which are case insensitive, PCRE regex are case sensitive by default. This can be changed by using ``(?i)``.
Example: `post` will match ``(?i)POST|GET|PUT`` regex but not ``POST|GET|PUT``.

Groups within groups
--------------------

PCRE provides ease and flexibility in data extraction. Unlike OSRegex, it allows groups within groups.
For example, in the next log, the regular expression ``from=<(.*?@(.*?))>`` extracts the email
(`john@email-dom.com`) and domain (`email-dom.com`) into separate fields.

    .. code-block:: none

      Sep 29 17:11:02 ramp sendmail[21549]: v8TLB2x7021549: from=<john@email-dom.com>, size=909, class=0, nrcpts=1, msgid=<201709292111.v8TLB1Nj021545@email.com>, proto=ESMTP, daemon=MTA, relay=[2001:0db8:85a3:0000:0000:8a2e:0370:7334]


Groups comparing: backreferences
--------------------------------

Backreferences match the same text as previously matched by a capturing group.
Groups can be referenced in the order they are declared with a backslash followed by the group number.
For example, in the next log, the regular expression ``^(\d+\.\d+\.\d+\.\d+) \1`` only match if both IPs
at the beginning of the log are equal.

    .. code-block:: none

      10.10.10.11 10.10.10.11 - - [10/Apr/2017:13:18:05 -0700] "GET /injection/%0d%0aSet-Cookie HTTP/1.1" 404 271 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:22.0) Gecko/20100101 Firefox/22.0"


Character classes (character set)
---------------------------------

In addition to the types of characters like ``\w`` to match a `word` character  or ``\d`` to match the decimal digit,
a custom set of characters can be specified with ``[]``.
Ranges of letters and numbers can also be specified. For example, ``[A-zA-Z0-5]`` includes the numbers
from 0 to 5 and the entire alphabet in upper and lower case letters.
Example: The next regex ``\d+[-\/]\d+[-\/]\d+`` will match any datetime despite separation character used.


Configuring PCRE
================

PCRE can be enabled in rules and decodes using the ``type="pcre2"`` attribute,
which also will allow to set other regex like ``type="osregex"`` and ``type="osmatch"`` for
:ref:`OSRegex <os_regex_syntax>` and :ref:`OSMatch <sregex_os_match_syntax>`, respectively, depending on the case.

Decoders
--------

-  :ref:`program_name <decoders_program_name>`
-  :ref:`prematch <decoders_prematch>`
-  :ref:`regex <decoders_regex>`

A simple example of data extraction with PCRE. Here is a log of a program called example_pcre2:

    .. code-block:: none

      Dec 25 20:45:02 MyHost example_pcre2[12345]: User 'admin' change email to 'admin@suspicious-domain.com'

Using PCRE in a decoder it is possible to extract the user, email and email domain:

    .. code-block:: xml

      <decoder name="example_pcre2">
            <program_name>^example_pcre2$</program_name>
      </decoder>

      <decoder name="example_pcre2">
            <parent>example_pcre2</parent>
            <regex type="pcre2">User '(.*?)' change email to '(.*?@(.*?))'</regex>
            <order>user, email, domain</order>
      </decoder>


Rules
-----

- **Options**: :ref:`OSRegex <os_regex_syntax>`, :ref:`OSMatch <sregex_os_match_syntax>`
- **Static fields**:
  :ref:`action <rules_action>`,
  :ref:`extra_data <rules_extra_data>`, :ref:`hostname <rules_hostname>`, :ref:`id <rules_id>`,
  :ref:`location <rules_location>`, :ref:`match <rules_match>`, :ref:`program_name <rules_prog_name>`,
  :ref:`protocol <rules_protocol>`, :ref:`user <rules_user>`, :ref:`url <rules_url>`,
  :ref:`srcport <rules_srcport>`, :ref:`dstport <rules_dstport>`, :ref:`status <rules_status>`,
  :ref:`system_name <rules_sys_name>`, :ref:`dstgeoip <rules_dstgeoip>`,
  :ref:`srcgeoip <rules_srcgeoip>`
- **Dynamic fields**: field

Use case: Accurate PAM user alerts
==================================

The *Linux Pluggable Authentication Modules(PAM)* is a key component that brings authentication support for applications
and services in UNIX-like systems, most of which are case sensitive.
By default, some false positive alerts related to usernames may be generated,
i.e users `FOO` and `foo` are not differentiated by the rules.
This can be avoided by using PCRE case sensitivity, so they are handled as different users.
The next custom rule generates an alert when `foo` user is logged to the system via ssh.


.. code-block:: xml

 <rule id="100002" level="5">
    <if_sid>5501</if_sid>
    <description>foo user logged in.</description>
    <user type="pcre2">foo</user>
 </rule>



wazuh-logtest output show the triggered alert

.. code-block:: none
    :class: output

    Type one log per line

    Dec  1 11:27:21 ip-10-0-0-220 sshd(pam_unix)[17365]: session opened for user foo by (uid=508)

    **Phase 1: Completed pre-decoding.
            full event: 'Dec  1 11:27:21 ip-10-0-0-220 sshd(pam_unix)[17365]: session opened for user foo by (uid=508)'
            timestamp: 'Dec  1 11:27:21'
            hostname: 'ip-10-0-0-220'
            program_name: 'sshd(pam_unix)'

    **Phase 2: Completed decoding.
            name: 'pam'
            parent: 'pam'
            dstuser: 'foo'
            uid: '508'

    **Phase 3: Completed filtering (rules).
            id: '100002'
            level: '5'
            description: 'foo user logged in.'
            groups: '['local', 'syslog', 'sshd']'
            firedtimes: '1'
            mail: 'False'
    **Alert to be generated.
