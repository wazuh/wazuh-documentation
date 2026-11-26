.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find the details of the Wazuh normalization engine helper functions that need more than a table row: accepted argument values, failure conditions, and worked examples for check and map helpers.

.. collapsible-tables:: helper functions
   :sections:

.. _reference_helper_function_details:

Helper function details
=======================

The helper functions below need more detail than a one-line table row holds. Their entries give the accepted argument values, every condition that makes the helper fail, and a worked example.

Each entry uses the following conventions:

-  **Source**: ``value`` means a literal argument or a reference to a name in the asset ``definitions`` section. The engine replaces a definition reference with its value before it builds the helper. ``reference`` means a field of the event, written with ``$``.
-  **Build failure**: The asset fails to build, and the engine does not load it.
-  **Run failure**: The helper fails for the current event. The stage that holds the call decides what happens next, as described in Failed helper behavior.
-  **Map helpers**: For a Wazuh Common Schema (WCS) target field, the engine checks each result against the field type for every event. A result that does not fit is a run failure.

The examples use temporary fields, whose names start with ``_``.

Check helpers
-------------

These check helpers test arrays, IP ranges, object keys, regular expressions, and the policy setting for unclassified events.

.. _helper_function_array_contains_all:

``array_contains_all``
^^^^^^^^^^^^^^^^^^^^^^

Passes when the target array contains every listed element. An element matches only an array item of the same JSON type and value.

+-------------+---------------+--------------------+----------------------------------------------------------------------------+
| Argument    | Type          | Source             | Accepted values                                                            |
+=============+===============+====================+============================================================================+
| ``element`` | Any JSON type | Value or reference | A string, number, boolean, null, object, or array. Pass 1 to 150 elements. |
+-------------+---------------+--------------------+----------------------------------------------------------------------------+

Behavior:

-  Fails when the target field is missing or not an array.
-  Fails when at least one element is missing from the array.
-  Counts a reference to a field that does not exist as a missing element, so the check fails.
-  Does not check the target type when it builds the asset (no build check).
-  Build failure: no elements or more than 150 elements.

Example:

.. code-block:: yaml

   check:
     - _target_field: array_contains_all('dracut', 'vz-start', 'thin-provisioning-tools')

Input event:

.. code-block:: json

   {
     "_target_field": ["mkinitramfs", "dracut", "thin-provisioning-tools", "lvm2", "vz-start"]
   }

The check passes. With ``'iscsi'`` in place of ``'vz-start'``, the check fails.

.. _helper_function_array_contains_any:

``array_contains_any``
^^^^^^^^^^^^^^^^^^^^^^

Passes when the target array contains at least one listed element. An element matches only an array item of the same JSON type and value.

+-------------+---------------+--------------------+----------------------------------------------------------------------------+
| Argument    | Type          | Source             | Accepted values                                                            |
+=============+===============+====================+============================================================================+
| ``element`` | Any JSON type | Value or reference | A string, number, boolean, null, object, or array. Pass 1 to 150 elements. |
+-------------+---------------+--------------------+----------------------------------------------------------------------------+

Behavior:

-  Passes as soon as it finds one element in the array.
-  Skips a reference to a field that does not exist.
-  Fails when the target field is missing or not an array.
-  Fails when no element is in the array, including when every reference is missing.
-  Does not check the target type when it builds the asset (no build check).
-  Build failure: no elements or more than 150 elements.

Example:

.. code-block:: yaml

   check:
     - _target_field: array_contains_any('dracut', 'hello', 'wazuh')

Input event:

.. code-block:: json

   {
     "_target_field": ["mkinitramfs", "cryptroot", "dracut", "lvm2"]
   }

The check passes because ``dracut`` is in the array.

.. _helper_function_array_contains_none:

``array_contains_none``
^^^^^^^^^^^^^^^^^^^^^^^

Passes when none of the listed elements is in the target array. An element matches only an array item of the same JSON type and value.

+-------------+---------------+--------------------+----------------------------------------------------------------------------+
| Argument    | Type          | Source             | Accepted values                                                            |
+=============+===============+====================+============================================================================+
| ``element`` | Any JSON type | Value or reference | A string, number, boolean, null, object, or array. Pass 1 to 150 elements. |
+-------------+---------------+--------------------+----------------------------------------------------------------------------+

Behavior:

-  Fails as soon as it finds one listed element in the array.
-  Fails when a reference points to a field that does not exist. The engine cannot confirm that a missing value is absent.
-  Fails when the target field is missing or not an array.
-  Does not check the target type when it builds the asset (no build check).
-  Build failure: no elements or more than 150 elements.

Example:

.. code-block:: yaml

   check:
     - _target_field: array_contains_none('dracut', 'hello', 'wazuh')

Input event:

.. code-block:: json

   {
     "_target_field": ["mkinitramfs", "cryptroot", "dracut", "lvm2"]
   }

The check fails because ``dracut`` is in the array.

.. _helper_function_array_length_eq:

``array_length_eq``
^^^^^^^^^^^^^^^^^^^

Passes when the target array has exactly the number of elements you give.

+---------------------+--------+--------+---------------------------------------------------+
| Argument            | Type   | Source | Accepted values                                   |
+=====================+========+========+===================================================+
| ``expected_length`` | Number | Value  | An integer from ``0`` to ``9223372036854775807``. |
+---------------------+--------+--------+---------------------------------------------------+

Behavior:

-  Fails when the target field is missing or not an array.
-  Fails when the array length differs from ``expected_length``.
-  Does not check the target type when it builds the asset (no build check).
-  Build failure: a reference, a negative number, a decimal number, or a non-number as ``expected_length``, or not exactly one argument.

Example:

.. code-block:: yaml

   check:
     - _target_field: array_length_eq(3)

Input event:

.. code-block:: json

   {
     "_target_field": ["first", "second", "third"]
   }

The check passes. A target that holds the string ``"not_an_array"`` fails the check.

.. _helper_function_has_only_keys:

``has_only_keys``
^^^^^^^^^^^^^^^^^

Passes when every top-level key of the target object appears in a list of allowed keys. Use it to reject objects that carry unexpected keys.

+----------+------------------+--------------------+--------------------------------------------------------------------------------+
| Argument | Type             | Source             | Accepted values                                                                |
+==========+==================+====================+================================================================================+
| ``keys`` | Array of strings | Value or reference | An array whose items are all strings, such as ``["ts", "host"]``. The list can |
|          |                  |                    | hold keys that the object does not have.                                       |
+----------+------------------+--------------------+--------------------------------------------------------------------------------+

Behavior:

-  Fails when the target field is missing or not an object.
-  Fails when the target object has a key that is not in the list.
-  Fails when the referenced field is missing, is not an array, or holds an item that is not a string.
-  Expects a WCS field of type ``object`` as the target.
-  Build failure: a literal argument that is not an array of strings, or not exactly one argument.
-  Build failure: a reference to a WCS field that does not hold strings.

Example:

.. code-block:: yaml

   check:
     - _target_field: has_only_keys(["ts", "host", "other"])

Input event:

.. code-block:: json

   {
     "_target_field": {
       "ts": "2021-01-03T01:19:32.488179Z",
       "host": "192.168.4.43"
     }
   }

The check passes. An extra key, such as ``other_key``, makes it fail.

.. _helper_function_in_cidr:

``in_cidr``
^^^^^^^^^^^

Passes when the target IPv4 address is in at least one of the networks you list. Each range includes the network and broadcast addresses.

+----------+--------+--------+----------------------------------------------------------------------------------+
| Argument | Type   | Source | Accepted values                                                                  |
+==========+========+========+==================================================================================+
| ``cidr`` | String | Value  | An IPv4 network as ``a.b.c.d/nn``, with a prefix length from ``0`` to ``32``, or |
|          |        |        | as ``a.b.c.d/m.m.m.m``, with a dotted-decimal mask, such as ``192.168.0.0/16``.  |
|          |        |        | Pass one or more networks.                                                       |
+----------+--------+--------+----------------------------------------------------------------------------------+

Behavior:

-  Fails when the target field is missing or not a string.
-  Fails when the target value is not a valid IPv4 address. IPv6 addresses always fail.
-  Fails when the address is outside every network. The helper tests the networks in order and passes as soon as one of them holds the address.
-  Expects a WCS field of type ``ip``, or of a string type such as ``keyword``, as the target.
-  Build failure: no arguments, a reference or a non-string as an argument, a malformed network, or a prefix length outside ``0`` to ``32``.

Example:

.. code-block:: yaml

   check:
     - _target_field: in_cidr('192.168.0.0/16')

Input event:

.. code-block:: json

   {
     "_target_field": "192.168.1.5"
   }

The check passes. The address ``111.111.1.11`` fails the check.

.. _helper_function_index_unclassified_events:

``index_unclassified_events``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Passes when the policy indexes unclassified events and the event category is ``unclassified``. Outputs use it to route events that no integration decoder classified.

The helper takes no arguments.

Behavior:

-  Reads the ``index_unclassified_events`` policy setting when it builds the asset. Every policy must set it to ``true`` or ``false``.
-  Fails for every event when the setting is ``false``.
-  Fails when ``wazuh.integration.category`` is missing, is not a string, or is not exactly ``unclassified``.
-  Does not check the target type when it builds the asset (no build check).
-  Build failure: a target other than ``wazuh.integration.category``, or any argument.

Example, with ``index_unclassified_events`` set to ``true`` in the policy:

.. code-block:: yaml

   check:
     - wazuh.integration.category: index_unclassified_events()

Input event:

.. code-block:: json

   {
     "wazuh": {
       "integration": {
         "category": "unclassified"
       }
     }
   }

The check passes. The category ``security`` fails the check.

.. _helper_function_regex_match:

``regex_match``
^^^^^^^^^^^^^^^

Passes when the RE2 regular expression matches the target string. The match is partial, so the expression can match any part of the string.

+-----------+--------+--------+--------------------------------------------------------------------------------+
| Argument  | Type   | Source | Accepted values                                                                |
+===========+========+========+================================================================================+
| ``regex`` | String | Value  | A valid RE2 regular expression. Add ``^`` and ``$`` to match the whole string. |
+-----------+--------+--------+--------------------------------------------------------------------------------+

Behavior:

-  Fails when the target field is missing or not a string.
-  Fails when the expression does not match.
-  Expects a WCS string field as the target.
-  Build failure: a reference as the argument, a non-string argument, an invalid RE2 expression, or not exactly one argument.

Example:

.. code-block:: yaml

   check:
     - _target_field: regex_match('^(bye pcre\\d)$')

Input event:

.. code-block:: json

   {
     "_target_field": "bye pcre2"
   }

The check passes. The string ``ye pcre2`` fails the check.

Map helpers that produce a value
--------------------------------

These map helpers build objects from arrays, convert dates and numbers, decode hexadecimal strings, extract text with regular expressions, look up locations, and compute network values. Each one writes its result to the target field and replaces any existing value.

.. _helper_function_array_to_object:

``array_to_object``
^^^^^^^^^^^^^^^^^^^

Builds a key-value object from an array of objects. Each array element gives a key and a value, which the helper reads at dot paths.

+------------------+------------------+------------------+-----------------------------------------------------------------------------+
| Argument         | Type             | Source           | Accepted values                                                             |
+==================+==================+==================+=============================================================================+
| ``source_array`` | Array of objects | Reference        | A field that holds an array of objects.                                     |
+------------------+------------------+------------------+-----------------------------------------------------------------------------+
| ``key_path``     | String           | Value            | A dot path relative to each element, such as ``Name``.                      |
+------------------+------------------+------------------+-----------------------------------------------------------------------------+
| ``value_path``   | String           | Value            | A dot path relative to each element. Use ``.`` for the whole element.       |
+------------------+------------------+------------------+-----------------------------------------------------------------------------+
| ``mode``         | String           | Value (optional) | ``raw_keys`` keeps each key as it is. Without it, the helper normalizes the |
|                  |                  |                  | keys.                                                                       |
+------------------+------------------+------------------+-----------------------------------------------------------------------------+

Behavior:

-  Writes one ``<KEY>: <VALUE>`` entry per element. The value keeps its JSON type.
-  Normalizes each key unless ``mode`` is ``raw_keys``. It lowercases ASCII letters, turns spaces and ``/``, ``.``, ``-``, ``\``, and ``:`` into one ``_``, drops other symbols, and removes leading and trailing ``_``.
-  Skips elements that are not objects, have no non-empty string key, lack the value, or produce an empty key.
-  Run failure: the referenced field is missing or not an array, or no entry is added.
-  Expects a WCS field of type ``object`` or a temporary field as the target.
-  Build failure: fewer than three or more than four arguments, or a value as ``source_array``.
-  Build failure: a path that is not a literal string, is empty, or starts with ``/``, or a ``mode`` other than ``raw_keys``.
-  Build failure: a WCS ``source_array`` reference that is not an ``object`` field.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: array_to_object($_props, 'Name', 'Value')

Input event:

.. code-block:: json

   {
     "_props": [
       {"Name": "UserAgent", "Value": "Mozilla/5.0"},
       {"Name": "Request.Type", "Value": "OAuth2:Authorize"}
     ]
   }

Output event:

.. code-block:: json

   {
     "_props": [
       {"Name": "UserAgent", "Value": "Mozilla/5.0"},
       {"Name": "Request.Type", "Value": "OAuth2:Authorize"}
     ],
     "_target_field": {
       "useragent": "Mozilla/5.0",
       "request_type": "OAuth2:Authorize"
     }
   }

.. _helper_function_array_to_object_changes:

``array_to_object_changes``
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Builds an object from an array of objects. Each array element gives a key, a new value, and an old value, which the helper reads at dot paths.

+--------------------+------------------+------------------+-----------------------------------------------------------------------------+
| Argument           | Type             | Source           | Accepted values                                                             |
+====================+==================+==================+=============================================================================+
| ``source_array``   | Array of objects | Reference        | A field that holds an array of objects.                                     |
+--------------------+------------------+------------------+-----------------------------------------------------------------------------+
| ``key_path``       | String           | Value            | A dot path relative to each element, such as ``Name``.                      |
+--------------------+------------------+------------------+-----------------------------------------------------------------------------+
| ``new_value_path`` | String           | Value            | A dot path relative to each element. Use ``.`` for the whole element.       |
+--------------------+------------------+------------------+-----------------------------------------------------------------------------+
| ``old_value_path`` | String           | Value            | A dot path relative to each element. Use ``.`` for the whole element.       |
+--------------------+------------------+------------------+-----------------------------------------------------------------------------+
| ``mode``           | String           | Value (optional) | ``raw_keys`` keeps each key as it is. Without it, the helper normalizes the |
|                    |                  |                  | keys.                                                                       |
+--------------------+------------------+------------------+-----------------------------------------------------------------------------+

Behavior:

-  Writes one entry per element: ``<KEY>`` holds the new value and the old value under their paths.
-  Normalizes each key unless ``mode`` is ``raw_keys``. It lowercases ASCII letters, turns spaces and ``/``, ``.``, ``-``, ``\``, and ``:`` into one ``_``, drops other symbols, and removes leading and trailing ``_``.
-  Skips elements that are not objects, have no non-empty string key, lack the new value, or produce an empty key.
-  Leaves out an old value that is an empty or blank string.
-  Run failure: the referenced field is missing or not an array, or no entry is added.
-  Expects a WCS field of type ``object`` or a temporary field as the target.
-  Build failure: fewer than four or more than five arguments, or a value as ``source_array``.
-  Build failure: a path that is not a literal string, is empty, or starts with ``/``, or a ``mode`` other than ``raw_keys``.
-  Build failure: a WCS ``source_array`` reference that is not an ``object`` field.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: array_to_object_changes($_props, 'Name', 'NewValue', 'OldValue')

Input event:

.. code-block:: json

   {
     "_props": [
       {"Name": "RequiredResourceAccess", "NewValue": "new-data", "OldValue": "old-data"},
       {"Name": "Included Updated Properties", "NewValue": "RequiredResourceAccess", "OldValue": ""}
     ]
   }

Output event:

.. code-block:: json

   {
     "_props": [
       {"Name": "RequiredResourceAccess", "NewValue": "new-data", "OldValue": "old-data"},
       {"Name": "Included Updated Properties", "NewValue": "RequiredResourceAccess", "OldValue": ""}
     ],
     "_target_field": {
       "requiredresourceaccess": {"NewValue": "new-data", "OldValue": "old-data"},
       "included_updated_properties": {"NewValue": "RequiredResourceAccess"}
     }
   }

.. _helper_function_community_id:

``community_id``
^^^^^^^^^^^^^^^^

Returns the Community ID v1 hash of a network flow, in the form ``1:<BASE64_HASH>``. The hash uses seed ``0`` and does not depend on flow direction.

+----------------------+---------+--------------------+---------------------------------------------------------------------------------+
| Argument             | Type    | Source             | Accepted values                                                                 |
+======================+=========+====================+=================================================================================+
| ``source_ip``        | String  | Reference          | An IPv4 or IPv6 address.                                                        |
+----------------------+---------+--------------------+---------------------------------------------------------------------------------+
| ``destination_ip``   | String  | Reference          | An address of the same IP family as ``source_ip``.                              |
+----------------------+---------+--------------------+---------------------------------------------------------------------------------+
| ``source_port``      | Integer | Reference          | ``1`` to ``65535`` for TCP, UDP, and SCTP. ``0`` to ``255``, the ICMP type, for |
|                      |         |                    | ICMP and ICMPv6. ``0`` to ``65535`` for other protocols.                        |
+----------------------+---------+--------------------+---------------------------------------------------------------------------------+
| ``destination_port`` | Integer | Reference          | The same ranges as ``source_port``. For ICMP and ICMPv6, the ICMP code.         |
+----------------------+---------+--------------------+---------------------------------------------------------------------------------+
| ``protocol``         | Integer | Value or reference | An IANA protocol number from ``0`` to ``255``, such as ``6`` for TCP.           |
+----------------------+---------+--------------------+---------------------------------------------------------------------------------+

Behavior:

-  Uses ``0`` for a port field that does not exist. TCP, UDP, and SCTP flows then fail, because they need ports from ``1``.
-  Run failure: an address field is missing, is not a string, or is not a valid address, or the two addresses belong to different families.
-  Run failure: the protocol field is missing, is not an integer, or is out of range.
-  Run failure: a port field is not an integer, or a port is out of range for the protocol.
-  Build failure: a value as one of the first four arguments, or a literal protocol that is not an integer from ``0`` to ``255``.
-  Build failure: a WCS address reference to a non-string field.
-  Build failure: a WCS port or protocol reference to a field that is not ``integer``, ``short``, or ``long``.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: community_id($_src_ip, $_dst_ip, $_src_port, $_dst_port, 6)

Input event:

.. code-block:: json

   {
     "_src_ip": "192.168.0.1",
     "_dst_ip": "10.0.0.5",
     "_src_port": 12345,
     "_dst_port": 80
   }

Output event:

.. code-block:: json

   {
     "_src_ip": "192.168.0.1",
     "_dst_ip": "10.0.0.5",
     "_src_port": 12345,
     "_dst_port": 80,
     "_target_field": "1:JHvDxB6S6/K68OntUBf4DJZYvkM="
   }

.. _helper_function_date_to_epoch:

``date_to_epoch``
^^^^^^^^^^^^^^^^^

Converts a date string to UNIX epoch seconds. The result is a double that keeps fractional seconds to the microsecond.

+------------+--------+------------------+--------------------------------------------------------------------------------+
| Argument   | Type   | Source           | Accepted values                                                                |
+============+========+==================+================================================================================+
| ``date``   | String | Reference        | A date string that matches ``format`` exactly. A WCS reference must be a       |
|            |        |                  | ``date`` or ``date_nanos`` field.                                              |
+------------+--------+------------------+--------------------------------------------------------------------------------+
| ``format`` | String | Value (optional) | A strftime-style format of 1 to 64 characters, such as ``%FT%T%Ez`` or ``%F %T |
|            |        |                  | %Z``. The default is ``%Y-%m-%dT%H:%M:%SZ``.                                   |
+------------+--------+------------------+--------------------------------------------------------------------------------+

Behavior:

-  Fails when any text is left after the format matches.
-  Applies the UTC offset that ``%z`` or ``%Ez`` reads, such as ``-03:00``.
-  Looks up the time zone name that ``%Z`` reads, such as ``Europe/Berlin``. An unknown zone fails.
-  Treats a date without offset or zone as UTC.
-  Fails when a local time does not exist or is ambiguous because of a daylight saving change.
-  Run failure: the referenced field is missing or not a string, the date does not match, or the result is out of range.
-  Expects a WCS field of type ``double`` as the target.
-  Build failure: a value as ``date``, or more than two arguments.
-  Build failure: a format that is not a string, is empty, or is longer than 64 characters.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: date_to_epoch($_date, '%FT%T%Ez')

Input event:

.. code-block:: json

   {
     "_date": "2024-05-17T12:10:58-03:00"
   }

Output event:

.. code-block:: json

   {
     "_date": "2024-05-17T12:10:58-03:00",
     "_target_field": 1715958658.0
   }

.. _helper_function_decode_hex:

``decode_hex``
^^^^^^^^^^^^^^

Decodes hexadecimal digits into text. Without a mode, the helper decodes one string into ASCII text. With the ``quoted`` mode, it decodes the raw argument values of auditd ``EXECVE`` records, such as the array that :ref:`regex_extract_all <helper_function_regex_extract_all>` returns.

+----------+-----------------+------------------+----------------------------------------------------------------------------------+
| Argument | Type            | Source           | Accepted values                                                                  |
+==========+=================+==================+==================================================================================+
| ``hex``  | String or array | Reference        | Without a mode, a string with an even number of hexadecimal digits, uppercase or |
|          |                 |                  | lowercase, whose bytes are ASCII, ``00`` to ``7F``. With ``quoted``, a string or |
|          |                 |                  | an array of values.                                                              |
+----------+-----------------+------------------+----------------------------------------------------------------------------------+
| ``mode`` | String          | Value (optional) | ``quoted``.                                                                      |
+----------+-----------------+------------------+----------------------------------------------------------------------------------+

Behavior:

-  Without a mode, run failure: the referenced field is missing or is not a string, which includes an array.
-  Without a mode, run failure: the string has an odd number of digits or a character that is not a hexadecimal digit, or a decoded byte is above 7F.
-  With quoted, decodes each value by its quoting. auditd writes an argument between double quotes unless it contains a double quote, a space, a control character, or a non-ASCII byte. It then writes the bytes as uppercase hexadecimal digits without quotes.
-  With quoted, a value between double quotes loses the quotes and stays text, so "10" and "1234" return 10 and 1234.
-  With quoted, an unquoted value of uppercase hexadecimal digits that decodes to valid UTF-8 is decoded, so 636166C3A9 returns café.
-  With quoted, any other value stays unchanged, such as lowercase hexadecimal digits, digits that do not decode to valid UTF-8, or an array element that is not a string.
-  With quoted, returns a string for a string reference and an array, in the same order, for an array reference. An empty array returns an empty array.
-  With quoted, run failure: only when the referenced field is missing or is neither a string nor an array.
-  Expects a WCS string field, such as process.args, as the target. For a keyword target, an array element that is not a string fails the type check, so the helper fails.
-  Build failure: a value as hex, a WCS hex reference to a non-string field, or fewer than one or more than two arguments.
-  Build failure: a reference as mode, or a mode value other than quoted.

Example, with the auditd ``EXECVE`` arguments that the :ref:`regex_extract_all <helper_function_regex_extract_all>` example returns:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: decode_hex($_args, 'quoted')

Input event:

.. code-block:: json

   {
     "_args": ["\"/usr/bin/sudo\"", "\"grep\"", "6B65793D226172742D7465737422", "\"/var/log/audit/audit.log\""]
   }

Output event:

.. code-block:: json

   {
     "_args": ["\"/usr/bin/sudo\"", "\"grep\"", "6B65793D226172742D7465737422", "\"/var/log/audit/audit.log\""],
     "_target_field": ["/usr/bin/sudo", "grep", "key=\"art-test\"", "/var/log/audit/audit.log"]
   }

Without the mode, ``decode_hex($_hex)`` returns ``Hello`` for ``"_hex": "48656C6C6F"`` and fails for an array.

.. _helper_function_float_calculate:

``float_calculate``
^^^^^^^^^^^^^^^^^^^

Applies an arithmetic operator to two or more numbers from left to right and returns a double. For example, ``sub`` with ``10``, ``2``, and ``3`` returns ``(10 - 2) - 3``.

+--------------------------------------------+--------+--------------------+--------------------------------------------------------------------------------+
| Argument                                   | Type   | Source             | Accepted values                                                                |
+============================================+========+====================+================================================================================+
| ``operator``                               | String | Value              | ``sum``, ``sub``, ``mul``, or ``div``.                                         |
+--------------------------------------------+--------+--------------------+--------------------------------------------------------------------------------+
| ``operand_left``, ``operand_right``, [...] | Number | Value or reference | Integers or decimal numbers. Pass 2 to 149 operands. A WCS reference must be a |
|                                            |        |                    | numeric field.                                                                 |
+--------------------------------------------+--------+--------------------+--------------------------------------------------------------------------------+

Behavior:

-  Converts integer operands to doubles.
-  Run failure: a referenced field is missing or not a number, a division by zero occurs, or the result is infinite or not a number.
-  Expects a WCS numeric field as the target.
-  Build failure: fewer than two operands, an unknown or non-string operator, or a literal operand that is not a number.
-  Build failure: a literal ``0`` divisor after the first operand of ``div``, or a WCS reference that is not numeric.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: float_calculate('sum', 2.676, 3.756)

Input event:

.. code-block:: json

   {}

Output event:

.. code-block:: json

   {
     "_target_field": 6.432
   }

.. _helper_function_geoip:

``geoip``
^^^^^^^^^

Looks up an IP address in the GeoLite2-City database and returns its location. The object holds only the fields that the database has for that address.

+----------+--------+-----------+--------------------------------------------------------------------------+
| Argument | Type   | Source    | Accepted values                                                          |
+==========+========+===========+==========================================================================+
| ``ip``   | String | Reference | An IPv4 or IPv6 address string. A WCS reference must be an ``ip`` field. |
+----------+--------+-----------+--------------------------------------------------------------------------+

Behavior:

-  Can return ``city_name``, ``continent_code``, ``continent_name``, ``country_iso_code``, ``country_name``, ``location.lat``, ``location.lon``, ``postal_code``, ``timezone``, ``region_iso_code``, and ``region_name``.
-  Run failure: the referenced field is missing or not a string, or the lookup returns no data. An invalid address or an address without an entry returns no data.
-  Expects a WCS field of type ``object`` as the target.
-  Build failure: the City database is not available, not exactly one argument, a value as the argument, or a WCS reference that is not an ``ip`` field.

Example, with the test database that the engine helper tests use:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: geoip($_ip)

Input event:

.. code-block:: json

   {
     "_ip": "1.2.3.4"
   }

Output event:

.. code-block:: json

   {
     "_ip": "1.2.3.4",
     "_target_field": {
       "city_name": "Wazuh city",
       "continent_code": "WC",
       "continent_name": "Wazuh Continent",
       "country_iso_code": "WCtry",
       "country_name": "Wazuh Country",
       "location": {"lat": 41.7776, "lon": 88.4293},
       "postal_code": "7777",
       "timezone": "Wazuh/Timezone"
     }
   }

.. _helper_function_int_calculate:

``int_calculate``
^^^^^^^^^^^^^^^^^

Applies an arithmetic operator to two or more 64-bit integers from left to right and returns an integer. Division drops the fractional part.

+--------------------------------------------+---------+--------------------+----------------------------------------------------------------------------------+
| Argument                                   | Type    | Source             | Accepted values                                                                  |
+============================================+=========+====================+==================================================================================+
| ``operator``                               | String  | Value              | ``sum``, ``sub``, ``mul``, or ``div``.                                           |
+--------------------------------------------+---------+--------------------+----------------------------------------------------------------------------------+
| ``operand_left``, ``operand_right``, [...] | Integer | Value or reference | Integers from ``-9223372036854775808`` to ``9223372036854775807``. Pass 2 to 149 |
|                                            |         |                    | operands. A WCS reference must be an ``integer``, ``short``, or ``long`` field.  |
+--------------------------------------------+---------+--------------------+----------------------------------------------------------------------------------+

Behavior:

-  Run failure: a referenced field does not exist or does not hold an integer.
-  Run failure: a division by zero, or a result outside the 64-bit integer range.
-  Expects a WCS numeric field as the target.
-  Build failure: fewer than two operands, an unknown or non-string operator, or a literal operand that is not an integer.
-  Build failure: a literal ``0`` divisor after the first operand of ``div``, or a WCS reference of another type.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: int_calculate('sub', $_bytes_in, $_bytes_out)

Input event:

.. code-block:: json

   {
     "_bytes_in": 1500,
     "_bytes_out": 400
   }

Output event:

.. code-block:: json

   {
     "_bytes_in": 1500,
     "_bytes_out": 400,
     "_target_field": 1100
   }

.. _helper_function_ip_version:

``ip_version``
^^^^^^^^^^^^^^

Returns ``IPv4`` or ``IPv6`` for an IP address string.

+----------+--------+-----------+-------------------------------------------------------------------------+
| Argument | Type   | Source    | Accepted values                                                         |
+==========+========+===========+=========================================================================+
| ``ip``   | String | Reference | An IPv4 address in dotted-decimal form or an IPv6 address in text form. |
+----------+--------+-----------+-------------------------------------------------------------------------+

Behavior:

-  Run failure: the referenced field is missing, is not a string, or is not a valid IPv4 or IPv6 address.
-  Expects a WCS string field as the target.
-  Build failure: a value as the argument, a WCS reference to a non-string field, or not exactly one argument.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: ip_version($_ip)

Input event:

.. code-block:: json

   {
     "_ip": "3002:0bd6:0000:0000:0000:ee00:0033:6778"
   }

Output event:

.. code-block:: json

   {
     "_ip": "3002:0bd6:0000:0000:0000:ee00:0033:6778",
     "_target_field": "IPv6"
   }

.. _helper_function_regex_extract:

``regex_extract``
^^^^^^^^^^^^^^^^^

Returns the text that the first capture group of an RE2 regular expression captures. The match is partial, so the expression can match any part of the string.

+--------------------+--------+-----------+------------------------------------------------------------------------------+
| Argument           | Type   | Source    | Accepted values                                                              |
+====================+========+===========+==============================================================================+
| ``field_to_match`` | String | Reference | A string field.                                                              |
+--------------------+--------+-----------+------------------------------------------------------------------------------+
| ``regex``          | String | Value     | A valid RE2 regular expression. Put the text to extract in the first capture |
|                    |        |           | group, ``( )``.                                                              |
+--------------------+--------+-----------+------------------------------------------------------------------------------+

Behavior:

-  Run failure: the referenced field is missing or not a string, or the expression does not match.
-  Expects a WCS string field as the target.
-  Build failure: a value as ``field_to_match``, a WCS reference to a non-string field, or not exactly two arguments.
-  Build failure: a reference or a non-string as ``regex``, or an invalid RE2 expression.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: regex_extract($_message, '^(bye pcre\\d)$')

Input event:

.. code-block:: json

   {
     "_message": "bye pcre2"
   }

Output event:

.. code-block:: json

   {
     "_message": "bye pcre2",
     "_target_field": "bye pcre2"
   }

.. _helper_function_regex_extract_all:

``regex_extract_all``
^^^^^^^^^^^^^^^^^^^^^

Returns an array with the text that the first capture group of an RE2 regular expression captures in every match. Unlike :ref:`regex_extract <helper_function_regex_extract>`, the helper keeps matching after the first match.

+--------------------+--------+-----------+------------------------------------------------------------------------------+
| Argument           | Type   | Source    | Accepted values                                                              |
+====================+========+===========+==============================================================================+
| ``field_to_match`` | String | Reference | A string field.                                                              |
+--------------------+--------+-----------+------------------------------------------------------------------------------+
| ``regex``          | String | Value     | A valid RE2 regular expression with at least one capture group, ``( )``. The |
|                    |        |           | helper keeps only the first group.                                           |
+--------------------+--------+-----------+------------------------------------------------------------------------------+

Behavior:

-  Matches the expression from left to right as many times as it can, without overlapping matches. The array holds the captured texts in match order, without changes.
-  Ignores every group after the first one. An optional first group that does not take part in a match adds an empty string.
-  An expression that can match an empty string, such as ``(x*)``, adds an empty string at each position where it matches nothing.
-  Run failure: the referenced field is missing or not a string, or the expression does not match.
-  Expects a WCS string field, such as ``process.args``, as the target.
-  Build failure: a value as ``field_to_match``, a WCS reference to a non-string field, or not exactly two arguments.
-  Build failure: a reference or a non-string as ``regex``, an invalid RE2 expression, or an expression without a capture group.

Example, with the arguments of an auditd ``EXECVE`` record. Quoted values keep their quotes, so :ref:`decode_hex <helper_function_decode_hex>` with the ``quoted`` mode can tell text from hexadecimal digits. The expression doesn't match arguments that auditd splits into chunks, ``aN_len=`` and ``aN[i]=``.

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: regex_extract_all($_message, '(?:^|\\s)a\\d+=(\\S+)')

Input event:

.. code-block:: json

   {
     "_message": "type=EXECVE msg=audit(1730000000.123:42): argc=4 a0=\"/usr/bin/sudo\" a1=\"grep\" a2=6B65793D226172742D7465737422 a3=\"/var/log/audit/audit.log\""
   }

Output event:

.. code-block:: json

   {
     "_message": "type=EXECVE msg=audit(1730000000.123:42): argc=4 a0=\"/usr/bin/sudo\" a1=\"grep\" a2=6B65793D226172742D7465737422 a3=\"/var/log/audit/audit.log\"",
     "_target_field": ["\"/usr/bin/sudo\"", "\"grep\"", "6B65793D226172742D7465737422", "\"/var/log/audit/audit.log\""]
   }

.. _helper_function_to_int:

``to_int``
^^^^^^^^^^

Converts a number, or a string that holds a number, to a 64-bit integer. The ``truncate`` mode drops the fractional part, and the ``round`` mode rounds to the nearest integer, with halves away from zero.

+-----------+------------------+------------------+-------------------------------------------------------------------------------+
| Argument  | Type             | Source           | Accepted values                                                               |
+===========+==================+==================+===============================================================================+
| ``value`` | Number or string | Reference        | An integer, a decimal number, or a string that holds one, such as ``"42"``. A |
|           |                  |                  | WCS reference must be a numeric or string field.                              |
+-----------+------------------+------------------+-------------------------------------------------------------------------------+
| ``mode``  | String           | Value (optional) | ``truncate`` or ``round``. The default is ``truncate``.                       |
+-----------+------------------+------------------+-------------------------------------------------------------------------------+

Behavior:

-  Returns an integer input without changes.
-  Reads a string as a number first, so ``"42"`` returns ``42`` and ``"4.6"`` returns ``4`` in ``truncate`` mode.
-  Run failure: the referenced field is missing, isn't a number or a string that holds a number, or holds a number outside the 64-bit integer range. A string with more than one sign, such as ``"+-5"``, fails.
-  Expects a WCS numeric field as the target.
-  Build failure: a value as ``value``, a WCS reference that is neither numeric nor a string, or more than two arguments.
-  Build failure: a reference, a non-string, or another mode name as ``mode``.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: to_int($_value, 'round')

Input event:

.. code-block:: json

   {
     "_value": -4.716666736602783
   }

Output event:

.. code-block:: json

   {
     "_value": -4.716666736602783,
     "_target_field": -5
   }

Map helpers that modify the event
---------------------------------

These map helpers append to arrays, mark events as discarded, read key-value databases (KVDBs), merge objects, parse strings, and normalize keys. They change the target field in place or act on the whole event.

.. _helper_function_array_append:

``array_append``
^^^^^^^^^^^^^^^^

Appends one or more values to the target array, in order. The helper creates the array when the target field does not exist.

+-----------+---------------+--------------------+--------------------------------------------------------------------------------+
| Argument  | Type          | Source             | Accepted values                                                                |
+===========+===============+====================+================================================================================+
| ``value`` | Any JSON type | Value or reference | A string, number, boolean, object, or array. Every value must have the element |
|           |               |                    | type of the array. Pass 1 to 150 values.                                       |
+-----------+---------------+--------------------+--------------------------------------------------------------------------------+

Behavior:

-  Sets the element type from the WCS field type, then from the first item of the existing array, then from the first value.
-  Run failure: the target exists and is not an array, a referenced field does not exist, or a value has a different JSON type.
-  Run failure: the new array does not pass the WCS field validation.
-  Does not check the target type when it builds the asset (no build check).
-  Build failure: no values, more than 150 values, or a literal value whose type differs from the WCS field type.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: array_append(5)

Input event:

.. code-block:: json

   {
     "_target_field": [1, 2, 3, 4]
   }

Output event:

.. code-block:: json

   {
     "_target_field": [1, 2, 3, 4, 5]
   }

.. _helper_function_array_append_any:

``array_append_any``
^^^^^^^^^^^^^^^^^^^^

Appends one or more values to the target array and skips references to fields that do not exist. The helper creates the array when the target field does not exist.

+-----------+---------------+--------------------+--------------------------------------------------------------------------------+
| Argument  | Type          | Source             | Accepted values                                                                |
+===========+===============+====================+================================================================================+
| ``value`` | Any JSON type | Value or reference | A string, number, boolean, object, or array. Every value must have the element |
|           |               |                    | type of the array. Pass 1 to 150 values.                                       |
+-----------+---------------+--------------------+--------------------------------------------------------------------------------+

Behavior:

-  Sets the element type from the WCS field type, then from the first item of the existing array, then from the first value.
-  Run failure: the target exists and is not an array, or a value has a different JSON type.
-  Run failure: nothing is appended because every reference is missing.
-  Run failure: the new array does not pass the WCS field validation.
-  Does not check the target type when it builds the asset (no build check).
-  Build failure: no values, more than 150 values, or a literal value whose type differs from the WCS field type.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: array_append_any($_missing, $_value)

Input event:

.. code-block:: json

   {
     "_value": 6,
     "_target_field": [1, 2, 3, 4]
   }

Output event:

.. code-block:: json

   {
     "_value": 6,
     "_target_field": [1, 2, 3, 4, 6]
   }

.. _helper_function_array_append_unique:

``array_append_unique``
^^^^^^^^^^^^^^^^^^^^^^^

Appends only the values that the target array does not hold yet. The helper creates the array when the target field does not exist.

+-----------+---------------+--------------------+--------------------------------------------------------------------------------+
| Argument  | Type          | Source             | Accepted values                                                                |
+===========+===============+====================+================================================================================+
| ``value`` | Any JSON type | Value or reference | A string, number, boolean, object, or array. Every value must have the element |
|           |               |                    | type of the array. Pass 1 to 150 values.                                       |
+-----------+---------------+--------------------+--------------------------------------------------------------------------------+

Behavior:

-  Skips a value that is already in the array, including a value appended earlier in the same call.
-  Run failure: nothing new is appended because every value is already in the array.
-  Run failure: the target exists and is not an array, a referenced field does not exist, or a value has a different JSON type.
-  Run failure: the new array does not pass the WCS field validation.
-  Does not check the target type when it builds the asset (no build check).
-  Build failure: no values, more than 150 values, or a literal value whose type differs from the WCS field type.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: array_append_unique(5)

Input event:

.. code-block:: json

   {
     "_target_field": [1, 2, 3, 4]
   }

Output event:

.. code-block:: json

   {
     "_target_field": [1, 2, 3, 4, 5]
   }

With ``[1, 2, 3, 4, 5]`` as the target, the helper fails and the target does not change.

.. _helper_function_array_append_unique_any:

``array_append_unique_any``
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Appends only the values that the target array does not hold yet, and skips references to fields that do not exist. The helper creates the array when the target field does not exist.

+-----------+---------------+--------------------+--------------------------------------------------------------------------------+
| Argument  | Type          | Source             | Accepted values                                                                |
+===========+===============+====================+================================================================================+
| ``value`` | Any JSON type | Value or reference | A string, number, boolean, object, or array. Every value must have the element |
|           |               |                    | type of the array. Pass 1 to 150 values.                                       |
+-----------+---------------+--------------------+--------------------------------------------------------------------------------+

Behavior:

-  Skips a value that is already in the array, and a reference to a field that does not exist.
-  Run failure: nothing new is appended.
-  Run failure: the target exists and is not an array, or a value has a different JSON type.
-  Run failure: the new array does not pass the WCS field validation.
-  Does not check the target type when it builds the asset (no build check).
-  Build failure: no values, more than 150 values, or a literal value whose type differs from the WCS field type.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: array_append_unique_any(5, 6)

Input event:

.. code-block:: json

   {
     "_target_field": [1, 2, 3, 4, 5]
   }

Output event:

.. code-block:: json

   {
     "_target_field": [1, 2, 3, 4, 5, 6]
   }

.. _helper_function_discard_event:

``discard_event``
^^^^^^^^^^^^^^^^^

Sets ``wazuh.space.event_discarded`` to ``true`` to mark the event as discarded. The helper does not stop processing, so the operations after it still run.

The helper takes no arguments.

Behavior:

-  Reads the ``index_discarded_events`` policy setting when it builds the asset. Every policy must set it to ``true`` or ``false``.
-  Keeps every event field when the setting is ``false``. The pipeline then drops the event before enrichment.
-  Erases every event field before it sets the flag when the setting is ``true``. The event continues to the outputs with the flag.
-  Does not check the target type when it builds the asset (no build check).
-  Build failure: a target other than ``wazuh.space.event_discarded``, or any argument.

Example, with ``index_discarded_events`` set to ``false`` in the policy:

.. code-block:: yaml

   normalize:
     - map:
         - wazuh.space.event_discarded: discard_event()

Input event:

.. code-block:: json

   {
     "event": {
       "original": "healthcheck OK"
     }
   }

Output event:

.. code-block:: json

   {
     "event": {
       "original": "healthcheck OK"
     },
     "wazuh": {
       "space": {
         "event_discarded": true
       }
     }
   }

.. _helper_function_kvdb_decode_bitmask:

``kvdb_decode_bitmask``
^^^^^^^^^^^^^^^^^^^^^^^

Decodes a hexadecimal bitmask into an array of values. A bit table stored in a KVDB maps each bit position to a value.

+-----------+--------+-----------+--------------------------------------------------------------------------------+
| Argument  | Type   | Source    | Accepted values                                                                |
+===========+========+===========+================================================================================+
| ``db``    | String | Value     | The name of a KVDB that exists. When the integration lists its KVDBs, the KVDB |
|           |        |           | must be in the list and enabled.                                               |
+-----------+--------+-----------+--------------------------------------------------------------------------------+
| ``table`` | String | Value     | A key of that KVDB whose value is the bit table.                               |
+-----------+--------+-----------+--------------------------------------------------------------------------------+
| ``mask``  | String | Reference | A hexadecimal string that fits in 64 bits, such as ``11`` for bits 0 and 4.    |
+-----------+--------+-----------+--------------------------------------------------------------------------------+

Behavior:

-  Requires a bit table that is a non-empty JSON object. Its keys are decimal bit positions from ``"0"`` to ``"63"``, and all its values share one JSON type.
-  Loads the table once, when it builds the asset, not for each event.
-  Appends the value of each set bit, from bit 0 upward, and skips bits that the table does not map. A target that is not an array is replaced.
-  Run failure: the mask field is missing, is not a string, doesn't start with a hexadecimal number, or doesn't fit in 64 bits. The helper ignores text after the leading hexadecimal digits.
-  Run failure: no set bit maps to a value, including a mask of ``0``.
-  A WCS target must hold strings.
-  Build failure: the KVDB cannot be loaded, the table key does not exist, or the table breaks a rule above.
-  Build failure: a reference as ``db`` or ``table``, a value as ``mask``, a non-string argument, or not exactly three arguments.

Example, with the KVDB ``windows_kerberos_status_code_to_code_name`` from the engine helper tests, whose ``access_mask`` table maps ``"0"`` to ``Create Child`` and ``"4"`` to ``Read Property``:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: kvdb_decode_bitmask('windows_kerberos_status_code_to_code_name', 'access_mask', $_mask)

Input event:

.. code-block:: json

   {
     "_mask": "11"
   }

Output event:

.. code-block:: json

   {
     "_mask": "11",
     "_target_field": ["Create Child", "Read Property"]
   }

.. _helper_function_kvdb_lookup:

``kvdb_lookup``
^^^^^^^^^^^^^^^

Copies to the target field the value of a key in a KVDB. The value keeps its JSON type: string, number, boolean, null, object, or array.

+----------+--------+--------------------+--------------------------------------------------------------------------------+
| Argument | Type   | Source             | Accepted values                                                                |
+==========+========+====================+================================================================================+
| ``db``   | String | Value              | The name of a KVDB that exists. When the integration lists its KVDBs, the KVDB |
|          |        |                    | must be in the list and enabled.                                               |
+----------+--------+--------------------+--------------------------------------------------------------------------------+
| ``key``  | String | Value or reference | A key string. A WCS reference must be a string field.                          |
+----------+--------+--------------------+--------------------------------------------------------------------------------+

Behavior:

-  Replaces the current value of the target field.
-  Run failure: the key field is missing or not a string, or the key is not in the KVDB.
-  Run failure: the value does not pass the WCS field validation.
-  Does not check the target type when it builds the asset (no build check).
-  Build failure: the KVDB is not declared, is disabled, or cannot be loaded.
-  Build failure: a reference or a non-string as ``db``, a non-string literal ``key``, or not exactly two arguments.

Example, with the KVDB ``windows_kerberos_status_code_to_code_name`` from the engine helper tests:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: kvdb_lookup('windows_kerberos_status_code_to_code_name', $_status)

Input event:

.. code-block:: json

   {
     "_status": "0x0"
   }

Output event:

.. code-block:: json

   {
     "_status": "0x0",
     "_target_field": "KDC_ERR_NONE"
   }

.. _helper_function_kvdb_lookup_append:

``kvdb_lookup_append``
^^^^^^^^^^^^^^^^^^^^^^

Looks up each key of an array in a KVDB and appends the values to the target array. The helper creates the array when the target field does not exist.

+----------+------------------+--------------------+--------------------------------------------------------------------------------+
| Argument | Type             | Source             | Accepted values                                                                |
+==========+==================+====================+================================================================================+
| ``db``   | String           | Value              | The name of a KVDB that exists. When the integration lists its KVDBs, the KVDB |
|          |                  |                    | must be in the list and enabled.                                               |
+----------+------------------+--------------------+--------------------------------------------------------------------------------+
| ``keys`` | Array of strings | Value or reference | An array whose items are all strings, such as ``["0x0", "0x1"]``. A WCS        |
|          |                  |                    | reference must hold strings.                                                   |
+----------+------------------+--------------------+--------------------------------------------------------------------------------+

Behavior:

-  Appends nothing unless every key is in the KVDB.
-  Requires values of one JSON type. Mixed types fail.
-  Replaces a target that is not an array.
-  Run failure: the referenced field is missing, is not an array, or holds a non-string item.
-  Run failure: a key is not in the KVDB, the values have different types, or the array does not pass the WCS field validation.
-  Does not check the target type when it builds the asset (no build check).
-  Build failure: the KVDB is not declared, is disabled, or cannot be loaded.
-  Build failure: a reference or a non-string as ``db``, a literal ``keys`` that is not an array of strings, or not exactly two arguments.

Example, with the KVDB ``windows_kerberos_status_code_to_code_name`` from the engine helper tests:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: kvdb_lookup_append('windows_kerberos_status_code_to_code_name', ["0x0", "0x1"])

Input event:

.. code-block:: json

   {
     "_target_field": []
   }

Output event:

.. code-block:: json

   {
     "_target_field": ["KDC_ERR_NONE", "KDC_ERR_NAME_EXP"]
   }

.. _helper_function_kvdb_lookup_merge:

``kvdb_lookup_merge``
^^^^^^^^^^^^^^^^^^^^^

Merges the value of a KVDB key into the target field, one level deep or, in ``deep`` mode, at every level. Use it to add default fields from a KVDB to an existing object.

+----------+--------+--------------------+--------------------------------------------------------------------------------+
| Argument | Type   | Source             | Accepted values                                                                |
+==========+========+====================+================================================================================+
| ``db``   | String | Value              | The name of a KVDB that exists. When the integration lists its KVDBs, the KVDB |
|          |        |                    | must be in the list and enabled.                                               |
+----------+--------+--------------------+--------------------------------------------------------------------------------+
| ``key``  | String | Value or reference | A key string. A WCS reference must be a string field.                          |
+----------+--------+--------------------+--------------------------------------------------------------------------------+
| ``mode`` | String | Value (optional)   | ``deep`` merges nested objects and arrays at every level.                      |
+----------+--------+--------------------+--------------------------------------------------------------------------------+

Behavior:

-  Requires a target and a KVDB value of the same type: both objects or both arrays.
-  Objects: Copies each top-level key of the KVDB value and replaces the target value on a key collision.
-  Objects, ``deep`` mode: Merges nested objects and arrays recursively, and replaces other values on a key collision. A nested type conflict fails the merge and leaves the target unchanged.
-  Arrays: Appends only the KVDB items that the target array does not hold yet.
-  Run failure: the target does not exist, the types differ, or the value is not an object or array.
-  Run failure: the key field is missing or not a string, or the key is not in the KVDB.
-  Run failure: the value does not pass the WCS field validation.
-  Expects a WCS field of type ``object`` as the target. Only temporary targets can merge arrays.
-  Build failure: the KVDB is not declared, is disabled, or cannot be loaded, the arguments break the ``kvdb_lookup`` rules, or a third argument other than ``deep``.

Example, for a KVDB ``<KVDB_NAME>`` whose key ``defaults`` holds ``{"severity": "low", "tags": {"source": "kvdb"}}``:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: kvdb_lookup_merge('<KVDB_NAME>', 'defaults')

Input event:

.. code-block:: json

   {
     "_target_field": {
       "severity": "high",
       "tags": {"team": "soc"}
     }
   }

Output event:

.. code-block:: json

   {
     "_target_field": {
       "severity": "low",
       "tags": {"source": "kvdb"}
     }
   }

Replace ``<KVDB_NAME>`` with the name of your KVDB.

.. _helper_function_lookup_merge:

``lookup_merge``
^^^^^^^^^^^^^^^^

Looks up a key in an object and merges the value under that key into the target field, one level deep or, in ``deep`` mode, at every level.

+------------+--------+--------------------+--------------------------------------------------------------------------------+
| Argument   | Type   | Source             | Accepted values                                                                |
+============+========+====================+================================================================================+
| ``object`` | Object | Value or reference | A JSON object literal, a definition, or a reference to an object field.        |
+------------+--------+--------------------+--------------------------------------------------------------------------------+
| ``key``    | String | Value or reference | A key string, or a string field that holds the key. The key is matched exactly |
|            |        |                    | as written, so ``a.b`` is a top-level key named ``a.b``.                       |
+------------+--------+--------------------+--------------------------------------------------------------------------------+
| ``mode``   | String | Value (optional)   | ``deep`` merges nested objects and arrays at every level.                      |
+------------+--------+--------------------+--------------------------------------------------------------------------------+

Behavior:

-  Copies each top-level key of the value and replaces the target value on a key collision.
-  In ``deep`` mode, merges nested objects and arrays recursively, and replaces other values on a key collision. A nested type conflict fails the merge and leaves the target unchanged.
-  Does not change or delete the source object.
-  Run failure: the key field is missing or not a string, or the key is not in the object.
-  Run failure: the object field is missing or not an object.
-  Run failure: the value does not pass WCS validation, or the merge fails. The merge needs an existing target of the same type: both objects or both arrays.
-  Expects a WCS field of type ``object`` as the target.
-  Build failure: an ``object`` literal or WCS reference that is not an object, a ``key`` literal that is not a string or is empty, a ``key`` WCS reference that is not a string field, a third argument other than ``deep``, fewer than two or more than three arguments, or a WCS target that is not an object field.
-  Build failure: a WCS ``object`` reference that is not an ``object`` field, or a WCS ``key`` reference that is not a string field.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: lookup_merge($_lookup, $_key)

Input event:

.. code-block:: json

   {
     "_lookup": {
       "input_key_1": {"v1": "k1"},
       "input_key_2": {"v2": "k2"}
     },
     "_key": "input_key_1",
     "_target_field": {"v0": "k0"}
   }

Output event:

.. code-block:: json

   {
     "_lookup": {
       "input_key_1": {"v1": "k1"},
       "input_key_2": {"v2": "k2"}
     },
     "_key": "input_key_1",
     "_target_field": {"v0": "k0", "v1": "k1"}
   }

.. _helper_function_merge:

``merge``
^^^^^^^^^

Merges a referenced object or array into the target field, one level deep or, in ``deep`` mode, at every level, and then deletes the referenced field.

+------------+-----------------+------------------+-----------------------------------------------------------+
| Argument   | Type            | Source           | Accepted values                                           |
+============+=================+==================+===========================================================+
| ``source`` | Object or array | Reference        | A field of the same type as the target field.             |
+------------+-----------------+------------------+-----------------------------------------------------------+
| ``mode``   | String          | Value (optional) | ``deep`` merges nested objects and arrays at every level. |
+------------+-----------------+------------------+-----------------------------------------------------------+

Behavior:

-  Objects: Copies each top-level key of the source and replaces the target value on a key collision.
-  Objects, ``deep`` mode: Merges nested objects and arrays recursively, and replaces other values on a key collision. A nested type conflict fails the merge and leaves both fields unchanged.
-  Arrays: Appends only the source items that the target array does not hold yet, after the existing items.
-  Deletes the referenced field after the merge.
-  Run failure: the target or the referenced field does not exist, their types differ, or they are not objects or arrays. Neither field changes.
-  Does not check the target type when it builds the asset (no build check).
-  Build failure: a value as ``source``, a second argument other than ``deep``, or more than two arguments. In ``deep`` mode, a WCS target that is not an ``object`` field also fails the build.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: merge($_source)

Input event:

.. code-block:: json

   {
     "_source": {
       "key": "name",
       "key2": {"age": 27, "address": "new york"}
     },
     "_target_field": {"key3": "surname"}
   }

Output event:

.. code-block:: json

   {
     "_target_field": {
       "key3": "surname",
       "key": "name",
       "key2": {"age": 27, "address": "new york"}
     }
   }

.. _helper_function_parse_csv:

``parse_csv``
^^^^^^^^^^^^^

Splits a comma-separated string and stores each value in the output field you name. The result is an object that replaces the target value.

+---------------------------+--------+-----------+----------------------------------------------------------------------------------+
| Argument                  | Type   | Source    | Accepted values                                                                  |
+===========================+========+===========+==================================================================================+
| ``input``                 | String | Reference | A string field. A WCS reference must be a string field.                          |
+---------------------------+--------+-----------+----------------------------------------------------------------------------------+
| ``out1``, ``out2``, [...] | String | Value     | Output field names. A ``.`` or ``/`` in a name creates a nested field. Pass 2 to |
|                           |        |           | 149 names.                                                                       |
+---------------------------+--------+-----------+----------------------------------------------------------------------------------+

Behavior:

-  Uses ``,`` as the delimiter and ``"`` as the quote and escape character. Quoted values can contain commas, and ``""`` stands for a literal quote.
-  Stores every value as a string, and an empty value as ``null``.
-  Run failure: the input field is missing or not a string, or the number of values differs from the number of output names.
-  Run failure: the quotes are not balanced, or text is left after the last value.
-  Expects a WCS field of type ``object`` as the target.
-  Build failure: fewer than two output names, or a reference or non-string as an output name.
-  Build failure: a value as ``input``, or a WCS input reference to a non-string field.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: parse_csv($_input, 'out1', 'out2', 'out3')

Input event:

.. code-block:: json

   {
     "_input": "value1,value2,value3"
   }

Output event:

.. code-block:: json

   {
     "_input": "value1,value2,value3",
     "_target_field": {"out1": "value1", "out2": "value2", "out3": "value3"}
   }

.. _helper_function_parse_dsv:

``parse_dsv``
^^^^^^^^^^^^^

Splits a string at a delimiter character you choose and stores each value in the output field you name. The result is an object that replaces the target value.

+---------------------------+--------+-----------+----------------------------------------------------------------------------------+
| Argument                  | Type   | Source    | Accepted values                                                                  |
+===========================+========+===========+==================================================================================+
| ``input``                 | String | Reference | A string field. A WCS reference must be a string field.                          |
+---------------------------+--------+-----------+----------------------------------------------------------------------------------+
| ``delimiter``             | String | Value     | Exactly one character, such as ``;``.                                            |
+---------------------------+--------+-----------+----------------------------------------------------------------------------------+
| ``quote``                 | String | Value     | Exactly one character, such as ``'``. Quoted values can contain the delimiter.   |
+---------------------------+--------+-----------+----------------------------------------------------------------------------------+
| ``escape``                | String | Value     | Exactly one character that escapes the quote character inside quoted values.     |
+---------------------------+--------+-----------+----------------------------------------------------------------------------------+
| ``out1``, ``out2``, [...] | String | Value     | Output field names. A ``.`` or ``/`` in a name creates a nested field. Pass 2 to |
|                           |        |           | 146 names.                                                                       |
+---------------------------+--------+-----------+----------------------------------------------------------------------------------+

Behavior:

-  Stores every value as a string, and an empty value as ``null``.
-  Run failure: the input field is missing or not a string, or the number of values differs from the number of output names.
-  Run failure: the quotes are not balanced, or text is left after the last value.
-  Expects a WCS field of type ``object`` as the target.
-  Build failure: fewer than two output names, a ``delimiter``, ``quote``, or ``escape`` that is not exactly one character, or a non-string value argument.
-  Build failure: a value as ``input``, or a WCS input reference to a non-string field.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: parse_dsv($_input, '|', "'", '\\', 'out1', 'out2')

Input event:

.. code-block:: json

   {
     "_input": "value1|value2"
   }

Output event:

.. code-block:: json

   {
     "_input": "value1|value2",
     "_target_field": {"out1": "value1", "out2": "value2"}
   }

.. _helper_function_parse_ip:

``parse_ip``
^^^^^^^^^^^^

Stores the input string in the target field when it is a valid IPv4 or IPv6 address. The helper does not change the address text.

+-----------+--------+-----------+-----------------------------------------------------------------------------+
| Argument  | Type   | Source    | Accepted values                                                             |
+===========+========+===========+=============================================================================+
| ``input`` | String | Reference | A dotted-decimal IPv4 address with octets from ``0`` to ``255``, or an IPv6 |
|           |        |           | address, including compressed forms such as ``::1``.                        |
+-----------+--------+-----------+-----------------------------------------------------------------------------+

Behavior:

-  Run failure: the input field is missing or not a string, or the text is not a valid address.
-  Run failure: text is left after the address, such as a port.
-  Expects a WCS field of type ``ip`` as the target.
-  Build failure: more than one argument, a value as ``input``, or a WCS input reference to a non-string field.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: parse_ip($_input)

Input event:

.. code-block:: json

   {
     "_input": "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
   }

Output event:

.. code-block:: json

   {
     "_input": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
     "_target_field": "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
   }

The input ``999.999.999.999`` fails, and the target does not change.

.. _helper_function_parse_json:

``parse_json``
^^^^^^^^^^^^^^

Parses a JSON string and stores the resulting value in the target field, replacing any existing value.

+-----------+--------+-----------+---------------------------------------------------------------------+
| Argument  | Type   | Source    | Accepted values                                                     |
+===========+========+===========+=====================================================================+
| ``input`` | String | Reference | A string that holds one JSON value, nested 256 levels deep at most. |
+-----------+--------+-----------+---------------------------------------------------------------------+

Behavior:

-  Run failure: the input field is missing or not a string, or the text is not valid JSON.
-  Run failure: the JSON is nested more than 256 levels deep, or text is left after the JSON value.
-  Expects a WCS field of type ``object`` as the target.
-  Build failure: more than one argument, a value as ``input``, or a WCS input reference to a non-string field.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: parse_json($_input)

Input event:

.. code-block:: json

   {
     "_input": "{\"key\": {\"innerKey\": \"value\"}}"
   }

Output event:

.. code-block:: json

   {
     "_input": "{\"key\": {\"innerKey\": \"value\"}}",
     "_target_field": {"key": {"innerKey": "value"}}
   }

.. _helper_function_parse_kv:

``parse_kv``
^^^^^^^^^^^^

Parses a list of key-value pairs and stores each value under its key. The result is an object that replaces the target value.

+---------------+--------+-----------+----------------------------------------------------------------------------------+
| Argument      | Type   | Source    | Accepted values                                                                  |
+===============+========+===========+==================================================================================+
| ``input``     | String | Reference | A string field. A WCS reference must be a string field.                          |
+---------------+--------+-----------+----------------------------------------------------------------------------------+
| ``separator`` | String | Value     | One or more characters between a key and its value, such as ``=`` or ``::=``.    |
+---------------+--------+-----------+----------------------------------------------------------------------------------+
| ``delimiter`` | String | Value     | One or more characters between pairs, such as a space or ``&&``. It must differ  |
|               |        |           | from ``separator``.                                                              |
+---------------+--------+-----------+----------------------------------------------------------------------------------+
| ``quote``     | String | Value     | Exactly one character. Quoted keys and values can contain both tokens.           |
+---------------+--------+-----------+----------------------------------------------------------------------------------+
| ``escape``    | String | Value     | Exactly one character that escapes the quote character, the escape character, or |
|               |        |           | a token.                                                                         |
+---------------+--------+-----------+----------------------------------------------------------------------------------+

Behavior:

-  Removes the quotes around a quoted key or value.
-  Stores every value as a string, and an empty value as ``null``. A ``.`` in a key creates a nested field.
-  Run failure: the input field is missing or not a string, no pair parses, or text is left after the last pair.
-  Run failure: a key creates fields nested more than 256 levels deep.
-  Expects a WCS field of type ``object`` as the target.
-  Build failure: not exactly five arguments, an empty or equal ``separator`` and ``delimiter``, or a ``quote`` or ``escape`` that is not one character.
-  Build failure: a value as ``input``, or a WCS input reference to a non-string field.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: parse_kv($_input, '=', ' ', "'", '\\')

Input event:

.. code-block:: json

   {
     "_input": "key1=value1 key2=value2 key3=value3"
   }

Output event:

.. code-block:: json

   {
     "_input": "key1=value1 key2=value2 key3=value3",
     "_target_field": {"key1": "value1", "key2": "value2", "key3": "value3"}
   }

.. _helper_function_parse_quoted:

``parse_quoted``
^^^^^^^^^^^^^^^^

Stores the text between a pair of quote characters, without the quotes and escape characters.

+------------+--------+------------------+--------------------------------------------------------------------------------+
| Argument   | Type   | Source           | Accepted values                                                                |
+============+========+==================+================================================================================+
| ``input``  | String | Reference        | A string that starts with the quote character and ends with the closing quote. |
+------------+--------+------------------+--------------------------------------------------------------------------------+
| ``quote``  | String | Value (optional) | Exactly one character. The default is ``"``.                                   |
+------------+--------+------------------+--------------------------------------------------------------------------------+
| ``escape`` | String | Value (optional) | Exactly one character that differs from ``quote``. The default is ``\``.       |
+------------+--------+------------------+--------------------------------------------------------------------------------+

Behavior:

-  Accepts the escape character only before the quote character or another escape character.
-  Run failure: the input field is missing or not a string, or the input does not start with the quote character.
-  Run failure: the closing quote is missing, an escape character precedes another character, or text is left after the closing quote.
-  Expects a WCS field of type ``text`` as the target.
-  Build failure: more than three arguments, a ``quote`` or ``escape`` that is not one character, or the same character for both.
-  Build failure: a value as ``input``, or a WCS input reference to a non-string field.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: parse_quoted($_input)

Input event:

.. code-block:: json

   {
     "_input": "\"Hello, my name is 'Wazuh'.\""
   }

Output event:

.. code-block:: json

   {
     "_input": "\"Hello, my name is 'Wazuh'.\"",
     "_target_field": "Hello, my name is 'Wazuh'."
   }

.. _helper_function_parse_uri:

``parse_uri``
^^^^^^^^^^^^^

Parses a URI and stores its parts as string fields of a URL object in the target field.

+-----------+--------+-----------+----------------------------------------------------------------+
| Argument  | Type   | Source    | Accepted values                                                |
+===========+========+===========+================================================================+
| ``input`` | String | Reference | An absolute URI with a scheme, such as ``http://someurl.com``. |
+-----------+--------+-----------+----------------------------------------------------------------+

Behavior:

-  Writes the parts that the URI has: ``original``, ``scheme``, ``domain``, ``port``, ``path``, ``query``, ``fragment``, ``username``, and ``password``.
-  Stores every part as a string. The ``original`` part is the normalized URI, so ``http://someurl.com`` becomes ``http://someurl.com/``.
-  Run failure: the input field is missing or not a string, or the URI does not parse. A URI without a scheme, such as ``www.someurl.com``, fails.
-  Expects a WCS field of type ``object`` as the target.
-  Build failure: more than one argument, a value as ``input``, or a WCS input reference to a non-string field.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: parse_uri($_input)

Input event:

.. code-block:: json

   {
     "_input": "http://someurl.com"
   }

Output event:

.. code-block:: json

   {
     "_input": "http://someurl.com",
     "_target_field": {
       "original": "http://someurl.com/",
       "scheme": "http",
       "domain": "someurl.com",
       "path": "/"
     }
   }

.. _helper_function_parse_xml:

``parse_xml``
^^^^^^^^^^^^^

Parses an XML string into an object that replaces the target value. The optional ``windows`` mode reshapes Windows Event Log XML.

+-----------+--------+------------------+-------------------------------------------------------------------------+
| Argument  | Type   | Source           | Accepted values                                                         |
+===========+========+==================+=========================================================================+
| ``input`` | String | Reference        | A well-formed XML string, nested 256 levels deep at most.               |
+-----------+--------+------------------+-------------------------------------------------------------------------+
| ``mode``  | String | Value (optional) | ``windows``. Without the argument, the helper uses the default mapping. |
+-----------+--------+------------------+-------------------------------------------------------------------------+

Behavior:

-  Default mapping: Each element becomes a key, element text goes in ``#text``, and each attribute goes in ``@<ATTRIBUTE_NAME>``. Repeated sibling elements become an array.
-  The ``windows`` mode: Each ``<Data Name="X">`` element becomes the key ``X`` with the element text as its value. A ``<Data>`` element without ``Name`` adds its text to an array.
-  Run failure: the input field is missing or not a string.
-  Run failure: the XML is not valid, or it is nested more than 256 levels deep.
-  Expects a WCS field of type ``object`` as the target.
-  Build failure: more than two arguments, or a ``mode`` other than ``windows``.
-  Build failure: a value as ``input``, or a WCS input reference to a non-string field.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: parse_xml($_input)

Input event:

.. code-block:: json

   {
     "_input": "<greeting>some greeting</greeting>"
   }

Output event:

.. code-block:: json

   {
     "_input": "<greeting>some greeting</greeting>",
     "_target_field": {"greeting": {"#text": "some greeting"}}
   }

.. _helper_function_snake_case_keys:

``snake_case_keys``
^^^^^^^^^^^^^^^^^^^

Normalizes the keys of the target object, or the strings of the target array or string, to lowercase snake case.

+----------+--------+------------------+-------------------------------------------------------------------------------+
| Argument | Type   | Source           | Accepted values                                                               |
+==========+========+==================+===============================================================================+
| ``mode`` | String | Value (optional) | ``deep``. Without it, the helper processes only the top level of the target   |
|          |        |                  | object. With ``deep``, it also processes the objects and arrays nested inside |
|          |        |                  | it.                                                                           |
+----------+--------+------------------+-------------------------------------------------------------------------------+

Behavior:

-  Normalization lowercases ASCII letters, turns spaces and ``/``, ``.``, ``-``, ``\``, and ``:`` into one ``_``, drops other symbols, and removes leading and trailing ``_``.
-  Object target: Renames the keys and does not change string values.
-  Array target: Normalizes each string item and the keys of each object item.
-  String target: Normalizes the string.
-  Applies no change when it fails.
-  Run failure: the target is missing or not an object, array, or string, or two keys normalize to the same key.
-  Run failure: a key or string normalizes to an empty value, or an array holds a number, boolean, or null.
-  Does not check the target type when it builds the asset (no build check).
-  Build failure: an argument other than ``deep``, or more than one argument.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: snake_case_keys()

Input event:

.. code-block:: json

   {
     "_target_field": {"Full Name": "Ana", "e-mail": "x", "Pais": "AR"}
   }

Output event:

.. code-block:: json

   {
     "_target_field": {"full_name": "Ana", "e_mail": "x", "pais": "AR"}
   }

.. _helper_function_split:

``split``
^^^^^^^^^

Splits a string at a separator and stores the parts in the target field as an array of strings. The helper keeps the spaces around each part.

+---------------+--------+-----------+---------------------------------------------------------+
| Argument      | Type   | Source    | Accepted values                                         |
+===============+========+===========+=========================================================+
| ``input``     | String | Reference | A string field. A WCS reference must be a string field. |
+---------------+--------+-----------+---------------------------------------------------------+
| ``separator`` | String | Value     | One or more characters, such as ``,`` or ``::``.        |
+---------------+--------+-----------+---------------------------------------------------------+

Behavior:

-  Ignores a separator at the start of the string and drops an empty part at the end. Keeps empty parts between two separators.
-  Replaces any previous value of the target field, including an existing array.
-  Run failure: the input field is missing or not a string.
-  Expects a WCS string field as the target.
-  Build failure: a separator that is empty or not a literal string, or not exactly two arguments.
-  Build failure: a value as ``input``, or a WCS input reference to a non-string field.

Example:

.. code-block:: yaml

   normalize:
     - map:
         - _target_field: split($_input, '|')

Input event:

.. code-block:: json

   {
     "_input": "val 1 | val 2 | val 3"
   }

Output event:

.. code-block:: json

   {
     "_input": "val 1 | val 2 | val 3",
     "_target_field": ["val 1 ", " val 2 ", " val 3"]
   }
