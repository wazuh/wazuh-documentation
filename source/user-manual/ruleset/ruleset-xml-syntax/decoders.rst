.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh decoders extract the information from the received events. learn more in this section of the documentation.

Decoders Syntax
===============

The decoders extract the information from the received events. When an event is received, the decoders separate the information into blocks to prepare them for subsequent analysis.

How it works
------------

To understand how decoders work, it will be easier through examples.

Let’s consider the following log sample:

.. code-block:: none

   Apr 14 19:28:21 gorilla sshd[31274]: Connection closed by 192.168.1.33

The first step should always be to run the ```` utility and  input the event log to test the current decoder and rule before creating your own decoder.

With the event log above, we obtain the following result:

.. code-block:: none

   Type one log per line

   Apr 14 19:28:21 gorilla sshd[31274]: Connection closed by 192.168.1.33

   **Phase 1: Completed pre-decoding.
           full event: 'Apr 14 19:28:21 gorilla sshd[31274]: Connection closed by 192.168.1.33'
           timestamp: 'Apr 14 19:28:21'
           hostname: 'gorilla'
           program_name: 'sshd'

   **Phase 2: Completed decoding.
           name: 'sshd'
           parent: 'sshd'
           srcip: '192.168.1.33'

We can observe two phases of decoding. The input log first goes through the pre-decoding phase, during which general information, such as a timestamp, a hostname, and a program name, are extracted when a Syslog-like header is present.

In the decoding phase, the decoder extracts information from the remaining log. In this example, the decoder only analyzes the message: ``Connection closed by 192.168.1.33``.

Options
-------

There are several decoder configuration options. Below, you can find a description of the XML labels used to configure decoders:

+------------------------------+---------------------------------------------------------------+-------------------------------------------------------------------------------------------------+
| Option                       | Values                                                        | Description                                                                                     |
+==============================+===============================================================+=================================================================================================+
| `decoder`_                   | Name of the decoder                                           | This attribute defines the decoder.                                                             |
+------------------------------+---------------------------------------------------------------+-------------------------------------------------------------------------------------------------+
| `parent`_                    | Any decoder's name                                            | It will reference a parent decoder and the current one will become a child decoder.             |
+------------------------------+---------------------------------------------------------------+-------------------------------------------------------------------------------------------------+
| `accumulate`_                | None                                                          | It allows tracking events over multiple log messages.                                           |
+------------------------------+---------------------------------------------------------------+-------------------------------------------------------------------------------------------------+
| :ref:`decoders_program_name` | Any :ref:`regex <os_regex_syntax>`,                           | Sets a program name as a condition for applying the decoder. The log header must have a program |
|                              | :ref:`sregex <sregex_os_match_syntax>` or                     | name matching the regular expression.                                                           |
|                              | :ref:`pcre2 <pcre2_syntax>` expression.                       |                                                                                                 |
+------------------------------+---------------------------------------------------------------+-------------------------------------------------------------------------------------------------+
| :ref:`decoders_prematch`     | Any :ref:`regex <os_regex_syntax>` or                         | Sets a regular expression as a condition for applying the decoder. The log must match the       |
|                              | :ref:`pcre2 <pcre2_syntax>` expression.                       | regular expression without considering any Syslog-like header.                                  |
+------------------------------+---------------------------------------------------------------+-------------------------------------------------------------------------------------------------+
| :ref:`decoders_regex`        | Any :ref:`regex <os_regex_syntax>` or                         | The decoder will use this option to find fields of interest and extract them.                   |
|                              | :ref:`pcre2 <pcre2_syntax>` expression.                       |                                                                                                 |
+------------------------------+---------------------------------------------------------------+-------------------------------------------------------------------------------------------------+
| :ref:`decoders_order`        | See :ref:`order table <decoders_order>`                       | The values that :ref:`decoders_regex` will extract will be stored in these groups.              |
+------------------------------+---------------------------------------------------------------+-------------------------------------------------------------------------------------------------+
| :ref:`decoders_fts`          | See :ref:`fts table <decoders_fts>`                           | First time seen.                                                                                |
+------------------------------+---------------------------------------------------------------+-------------------------------------------------------------------------------------------------+
| `ftscomment`_                | Any String                                                    | Adds a comment to fts.                                                                          |
+------------------------------+---------------------------------------------------------------+-------------------------------------------------------------------------------------------------+
| :ref:`plugin_decoder`        | See :ref:`below <plugin_decoder>`                             | Specifies a plugin that will do the decoding. Useful when the extraction with regex is not      |
|                              |                                                               | feasible.                                                                                       |
+------------------------------+---------------------------------------------------------------+-------------------------------------------------------------------------------------------------+
| `use_own_name`_              | True                                                          | Only for child decoders.                                                                        |
+------------------------------+---------------------------------------------------------------+-------------------------------------------------------------------------------------------------+
| `json_null_field`_           | String                                                        | Adds the option of deciding how a null value from a JSON will be stored.                        |
+------------------------------+---------------------------------------------------------------+-------------------------------------------------------------------------------------------------+
| `json_array_structure`_      | String                                                        | Adds the option of deciding how an array structure from a JSON will be stored.                  |
+------------------------------+---------------------------------------------------------------+-------------------------------------------------------------------------------------------------+
| `var`_                       | Name for the variable.                                        | Defines variables that can be reused inside the same file.                                      |
+------------------------------+---------------------------------------------------------------+-------------------------------------------------------------------------------------------------+
| :ref:`decoders_type`         | See :ref:`type table <decoders_type>`                         | It will set the type of log that the decoder is going to match.                                 |
+------------------------------+---------------------------------------------------------------+-------------------------------------------------------------------------------------------------+

decoder
^^^^^^^

The ``decoder`` option serves as the root element of a decoder file in Wazuh. It encapsulates the definition of a decoder, including its name, type, and the specific attributes that dictate how it processes and extracts information from log messages.

The attributes listed below define a decoder.

+-----------+---------------------------+
| Attribute | Description               |
+===========+===========================+
| name      | The name of the decoder   |
+-----------+---------------------------+

Example:

Below is a custom JSON decoder that extracts specific fields from a log message.

.. code-block:: xml

   <decoder name="json_custom_decoder">
     <type>json</type>
     <program_name>application_logs</program_name>
     <regex>"message": "(.*?)"</regex>
     <order>message_content</order>
     <plugin_decoder>JSON_Decoder</plugin_decoder>
   </decoder>

parent
^^^^^^

It is used to link a subordinate decoder to its parent. A parent decoder can have many child decoders but take into account that a child decoder cannot be a parent. It is possible to create :doc:`sibling decoders <../decoders/sibling-decoders>`, which is a handy decoding strategy to handle dynamic logs.

+--------------------+------------------+
| Default Value      | n/a              |
+--------------------+------------------+
| Allowed values     | Any decoder name |
+--------------------+------------------+

Example:

``decoder_junior`` will trigger only if ``decoder_father`` has previously matched.

.. code-block:: xml

   <decoder name="decoder_junior">
     <parent>decoder_father</parent>
     ...
   </decoder>

accumulate
^^^^^^^^^^^

Allows Wazuh to track events over multiple log messages based on a decoded id. This is particularly useful for logs that span multiple lines or entries.

.. note::

   Requires a regex populating the id field.

+--------------------+--------------------+
| Example of use     | <accumulate />     |
+--------------------+--------------------+

.. _decoders_program_name:

program_name
^^^^^^^^^^^^

This defines the program name that must be found in the log header to apply the decoder. The pre-decoding phase extracts the program name from input logs with Syslog-like headers.

+--------------------+--------------------------------------------------------------------+
| Default Value      | n/a                                                                |
+--------------------+--------------------------------------------------------------------+
| Allowed value      | Any :ref:`regex <os_regex_syntax>`,                                |
|                    | :ref:`sregex <sregex_os_match_syntax>` or                          |
|                    | :ref:`pcre2 <pcre2_syntax>` expression.                            |
+--------------------+--------------------------------------------------------------------+

The attributes below are optional.

+-------------+---------------------------------------+----------------+---------------+
| Attribute   |              Description              | Value range    | Default value |
+=============+=======================================+================+===============+
| type        | allows to set regular expression type |   osmatch      |    osmatch    |
|             |                                       +----------------+               |
|             |                                       |   osregex      |               |
|             |                                       +----------------+               |
|             |                                       |   pcre2        |               |
+-------------+---------------------------------------+----------------+---------------+

If ``program_name`` label is declared multiple times within the decoder, the following rules apply:

-  The resulting value is their concatenation.
-  The resulting value of ``type`` attribute corresponds to the one specified in the last label. If it is not specified, the default value is used.

Example:

The decoder below uses the PCRE2 regular expression to match a program name called ``test``, ``TEST`` or their equivalent (case-insensitive) in a log message:

.. code-block:: xml

   <decoder name="test_decoder">
     <program_name type="pcre2">(?i)test</program_name>
     ...
   </decoder>

.. _decoders_prematch:

prematch
^^^^^^^^

Defines a regular expression that the log must match to apply the decoder. It is important to be as specific as possible to avoid matching unwanted events. Note that if the log is Syslog-like, then ``prematch`` only analyzes the log after the Syslog-like header. If the log is not Syslog-like, then it analyzes the entire log.

+--------------------+--------------------------------------------------------------------+
| Default Value      | n/a                                                                |
+--------------------+--------------------------------------------------------------------+
| Allowed values     | Any :ref:`regex <os_regex_syntax>` or                              |
|                    | :ref:`pcre2 <pcre2_syntax>` expression.                            |
+--------------------+--------------------------------------------------------------------+

You can use the optional attributes below  with the ``prematch`` option.

+-------------+----------------------------------------------------+----------------+---------------+
| Attribute   |              Description                           | Value range    | Default value |
+=============+====================================================+================+===============+
| offset      | allows discarding some of the content of the entry | after_regex    |               |
|             |                                                    +----------------+               |
|             |                                                    | after_parent   |               |
+-------------+----------------------------------------------------+----------------+---------------+
| type        | allows to set regular expression type              |   osregex      |    osregex    |
|             |                                                    +----------------+               |
|             |                                                    |   pcre2        |               |
+-------------+----------------------------------------------------+----------------+---------------+

If ``prematch`` label is declared multiple times within the decoder, the following rules apply:

-  The resulting value is their concatenation.
-  The resulting value of ``type`` attribute corresponds to the one specified in the last label. If it is not specified, the default value is used.

.. _decoders_regex:

regex
^^^^^

Regular expressions are sequences of characters that define a pattern. Decoders use them to find words or other patterns within log messages. The decoder will only extract those fields that are contained within parentheses.

An example is this regex that matches any numeral:

.. code-block:: xml

   <regex> [+-]?(\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)? </regex>

+--------------------+--------------------------------------------------------------------+
| Default Value      | n/a                                                                |
+--------------------+--------------------------------------------------------------------+
| Allowed values     | Any :ref:`regex <os_regex_syntax>` or                              |
|                    | :ref:`pcre2 <pcre2_syntax>` expression.                            |
+--------------------+--------------------------------------------------------------------+

When using the ``regex`` label, it is mandatory to define an ``order`` label as well. Besides, ``regex`` labels require a ``prematch`` or a ``program_name`` label defined on the same decoder or a ``parent`` with a ``prematch`` or a ``program_name`` label defined on it.

You can use the optional attributes below  with the ``regex`` option.

+-------------+----------------------------------------------------+----------------+---------------+
| Attribute   |              Description                           | Value range    | Default value |
+=============+====================================================+================+===============+
| offset      | allows to discard some of the content of the entry | after_regex    |               |
|             |                                                    +----------------+               |
|             |                                                    | after_parent   |               |
|             |                                                    +----------------+               |
|             |                                                    | after_prematch |               |
+-------------+----------------------------------------------------+----------------+---------------+
| type        | allows setting regular expression type             |   osregex      |    osregex    |
|             |                                                    +----------------+               |
|             |                                                    |   pcre2        |               |
+-------------+----------------------------------------------------+----------------+---------------+

If ``regex`` label is declared multiple times within the decoder, the following rules apply:

-  The resulting value is their concatenation.
-  The resulting value of the ``type`` attribute corresponds to the one specified in the last label. If it is not specified, the default value is used.

Example:

The decoder below matches a log message indicating when a user executed the sudo command for the first time:

.. code-block:: xml

   <decoder name="sudo-fields">
     <parent>sudo</parent>
     <prematch>\s</prematch>
     <regex>^\s*(\S+)\s*:</regex>
     <order>srcuser</order>
     <fts>name,srcuser,location</fts>
     <ftscomment>First time user executed the sudo command</ftscomment>
   </decoder>

.. _decoders_order:

order
^^^^^

It defines what the parenthesis groups contain and the order in which they were received. It requires a ``regex`` label defined on the same decoder. It can contain both :ref:`static fields <traditional_decoders>` and :ref:`dynamic fields <dynamic_fields_dynamic_decoders>`.

+--------------------+--------------------------------------------------------------------+
| Default Value      | n/a                                                                |
+--------------------+------------+-------------------------------------------------------+
| Static fields      | srcuser    | Extracts the source username                          |
+                    +------------+-------------------------------------------------------+
|                    | dstuser    | Extracts the destination (target) username            |
+                    +------------+-------------------------------------------------------+
|                    | user       | An alias to dstuser (only one of the two can be used) |
+                    +------------+-------------------------------------------------------+
|                    | srcip      | Source IP address                                     |
+                    +------------+-------------------------------------------------------+
|                    | dstip      | Destination IP address                                |
+                    +------------+-------------------------------------------------------+
|                    | srcport    | Source port                                           |
+                    +------------+-------------------------------------------------------+
|                    | dstport    | Destination port                                      |
+                    +------------+-------------------------------------------------------+
|                    | protocol   | Protocol                                              |
+                    +------------+-------------------------------------------------------+
|                    | system_name| System name                                           |
+                    +------------+-------------------------------------------------------+
|                    | id         | Event id                                              |
+                    +------------+-------------------------------------------------------+
|                    | url        | Url of the event                                      |
+                    +------------+-------------------------------------------------------+
|                    | action     | Event action (deny, drop, accept, etc.)               |
+                    +------------+-------------------------------------------------------+
|                    | status     | Event status (success, failure, etc.)                 |
+                    +------------+-------------------------------------------------------+
|                    | data       | Data                                                  |
+                    +------------+-------------------------------------------------------+
|                    | extra_data | Any extra data                                        |
+--------------------+------------+-------------------------------------------------------+
| Dynamic fields     | Any string not included in the previous list                       |
+--------------------+------------+-------------------------------------------------------+

.. _decoders_fts:

fts
^^^^

It specifies a decoder that triggers an alert the first time it matches.

+--------------------+--------------------------------------------------------------------+
| Default Value      | n/a                                                                |
+--------------------+------------+-------------------------------------------------------+
| Allowed values     | location   | Indicates the origin of the log.                      |
+                    +------------+-------------------------------------------------------+
|                    | srcuser    | Extracts the source username                          |
+                    +------------+-------------------------------------------------------+
|                    | dstuser    | Extracts the destination (target) username            |
+                    +------------+-------------------------------------------------------+
|                    | user       | An alias to dstuser (only one of the two can be used) |
+                    +------------+-------------------------------------------------------+
|                    | srcip      | Source IP address                                     |
+                    +------------+-------------------------------------------------------+
|                    | dstip      | Destination  IP address                               |
+                    +------------+-------------------------------------------------------+
|                    | srcport    | Source port                                           |
+                    +------------+-------------------------------------------------------+
|                    | dstport    | Destination port                                      |
+                    +------------+-------------------------------------------------------+
|                    | protocol   | Protocol                                              |
+                    +------------+-------------------------------------------------------+
|                    | system_name| System name                                           |
+                    +------------+-------------------------------------------------------+
|                    | id         | Event ID                                              |
+                    +------------+-------------------------------------------------------+
|                    | url        | Url of the event                                      |
+                    +------------+-------------------------------------------------------+
|                    | action     | Event action (deny, drop, accept, etc.)               |
+                    +------------+-------------------------------------------------------+
|                    | status     | Event status (success, failure, etc.)                 |
+                    +------------+-------------------------------------------------------+
|                    | data       | Data                                                  |
+                    +------------+-------------------------------------------------------+
|                    | extra_data | Any extra data                                        |
+--------------------+------------+-------------------------------------------------------+

Example:

The following decoder will extract the user who generated the alert and the location from where it comes:

.. code-block:: xml

   <decoder name="fts-decoder">
     <fts>srcuser, location</fts>
     ...
   </decoder>

The decoder will consider this option if the decoded event triggers a rule that uses :ref:`if_fts <rules_if_fts>`.

ftscomment
^^^^^^^^^^^

It adds a comment to a decoder when ``<fts>`` tag is used.

+--------------------+------------+
| Default Value      | n/a        |
+--------------------+------------+
| Allowed values     | Any string |
+--------------------+------------+

.. _plugin_decoder:

plugin_decoder
^^^^^^^^^^^^^^^

Use a specific plugin decoder to decode the incoming fields. It is useful for particular cases where it would be tricky to extract the fields by using regexes.

+--------------------+--------------------------------------------------------------------+
| Default Value      | n/a                                                                |
+--------------------+--------------------------------------------------------------------+
| Allowed values     | PF_Decoder                                                         |
+                    +--------------------------------------------------------------------+
|                    | SymantecWS_Decoder                                                 |
+                    +--------------------------------------------------------------------+
|                    | SonicWall_Decoder                                                  |
+                    +--------------------------------------------------------------------+
|                    | OSSECAlert_Decoder                                                 |
+                    +--------------------------------------------------------------------+
|                    | JSON_Decoder                                                       |
+--------------------+--------------------------------------------------------------------+

The attribute below is optional; it allows to start the decode process after a particular point of the log.

+--------------------+--------------------+
| Attribute          | Value              |
+====================+====================+
| offset             | after_parent       |
+                    +                    +
|                    | after_prematch     |
+--------------------+--------------------+

An example of its use is described at the :doc:`JSON decoder <../decoders/json-decoder>` section.

use_own_name
^^^^^^^^^^^^^

Allows setting the name of the child decoder from the name attribute instead of using the name of the parent decoder.

+--------------------+------------+
| Default Value      | n/a        |
+--------------------+------------+
| Allowed values     | true       |
+--------------------+------------+

json_null_field
^^^^^^^^^^^^^^^

Specifies how to treat the NULL fields coming from the JSON events. Only for the JSON decoder.

+--------------------+-------------------------------------------------------------------------+
| Default Value      | string                                                                  |
+--------------------+-------------------------------------------------------------------------+
| Allowed values     | string (It shows the NULL value as a string)                            |
+                    +-------------------------------------------------------------------------+
|                    | discard (It discards NULL fields and doesn't store them into the alert) |
+--------------------+-------------------------------------------------------------------------+

json_array_structure
^^^^^^^^^^^^^^^^^^^^

Specifies how to treat the array structures coming from the JSON events. Only for the JSON decoder.

+--------------------+-------------------------------------------------------------------------+
| Default Value      | array                                                                   |
+--------------------+-------------------------------------------------------------------------+
| Allowed values     | array (It shows the array structures as JSON arrays)                    |
+                    +-------------------------------------------------------------------------+
|                    | csv (It shows the array structures as CSV strings)                      |
+--------------------+-------------------------------------------------------------------------+

var
^^^

Defines a variable that can be used in any decoder within the same decoder file. It must be defined at the beginning of the decoder file and not inside a tagged section.

+----------------+------------------------+
| Attribute      | Value                  |
+================+========================+
| name           | Name for the variable. |
+----------------+------------------------+

Example:

.. code-block:: xml

   <var name="header">myprog</var>
   <var name="offset">after_parent</var>
   <var name="type">syscall</var>

   <decoder name="syscall">
     <prematch>^$header</prematch>
   </decoder>

   <decoder name="syscall-child">
     <parent>syscall</parent>
     <prematch offset="$offset">^: $type </prematch>
     <regex offset="after_prematch">(\S+)</regex>
     <order>syscall</order>
   </decoder>

.. _decoders_type:

type
^^^^

It sets the type of log that the decoder is going to match.

+--------------------+------------------+
| Default Value      | syslog           |
+--------------------+------------------+
| Allowed values     | firewall         |
+                    +------------------+
|                    | ids              |
+                    +------------------+
|                    | web-log          |
+                    +------------------+
|                    | syslog           |
+                    +------------------+
|                    | squid            |
+                    +------------------+
|                    | windows          |
+                    +------------------+
|                    | host-information |
+                    +------------------+
|                    | ossec            |
+--------------------+------------------+

Example:

Set type of decoder to *syslog*:

.. code-block:: xml

   <decoder>
     <type>syslog</type>
     ...
   </decoder>
