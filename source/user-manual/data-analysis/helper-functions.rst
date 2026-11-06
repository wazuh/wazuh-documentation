.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Helper functions are built-in operations of the Wazuh normalization engine that evaluate event fields, compute values, and transform events in decoders and filters. Learn how they work, how to call them, and how the engine handles a failed helper.

.. _data_analysis_helper_functions:

Helper functions
================

Helper functions are built-in operations of the :doc:`Wazuh normalization engine </user-manual/manager/wazuh-normalization-engine>`. You use them in decoders and filters to evaluate event fields, compute values, and transform events. The engine provides 128 helper functions across three categories: :ref:`filter <helper_functions_filter>`, :ref:`map <helper_functions_map>`, and :ref:`transformation <helper_functions_transformation>`.

How helper functions work
-------------------------

You call helper functions inside assets. An asset is a :doc:`decoder </user-manual/data-analysis/decoders>`, :doc:`filter </user-manual/data-analysis/filters>`, or :ref:`output <output_process>` that the normalization engine loads into its processing pipeline. Each asset is made of stages, such as ``check`` and ``normalize``. The engine builds each asset before it processes events, and a helper error, such as a wrong helper category or argument count, makes that build fail.

Each helper call operates on one event field, called the *target field*. The helper category determines what the call does to that field and where you can use it.

You can use helper functions in two stages:

-  ``check``: Evaluates conditions on the event. It runs at the top level of decoders and filters, inside ``normalize`` blocks, and in the ``first_of`` branches of outputs.
-  ``map``: Sets or modifies event fields. It runs inside the ``normalize`` blocks of a decoder.

The ``parse|<FIELD>`` stage uses parser expressions, not helper functions. To parse a field within a ``map`` operation, use a ``parse_*`` transformation helper.

The following table compares the three helper categories.

+----------------+-----------+----------------------------------------+----------------------------------+
| Category       | Stage     | Effect on the target field             | When the helper fails            |
+================+===========+========================================+==================================+
| Filter         | ``check`` | Reads the field and doesn't change the | The condition fails.             |
|                |           | event.                                 |                                  |
+----------------+-----------+----------------------------------------+----------------------------------+
| Map            | ``map``   | Writes the value that the helper       | The target field doesn't change. |
|                |           | returns.                               |                                  |
+----------------+-----------+----------------------------------------+----------------------------------+
| Transformation | ``map``   | Changes the field in place, or changes | The target field doesn't change. |
|                |           | the event.                             |                                  |
+----------------+-----------+----------------------------------------+----------------------------------+

The normalization engine validates helper categories when building an asset. Using a filter helper in a ``map`` operation, or a map or transformation helper in a ``check`` operation, causes the asset build to fail.

In output assets, map and transformation helpers can write only to fields listed in the outputs section of the allowed-fields schema document. By default, this document lists no fields for outputs. If a map or transformation helper writes to an unlisted field, the asset build fails unless the target is the event root (``.``). The ``discard_events``, ``erase_custom_fields``, and ``sanitize_fields`` helpers don't have this restriction.

Filter assets accept only a ``check`` stage. Therefore, they cannot contain map or transformation helpers.

Helper call syntax
------------------

A helper call is a YAML key-value pair. The key specifies the target field, and the value contains the helper name followed by its arguments in parentheses.

.. code-block:: yaml

   <TARGET_FIELD>: <HELPER_NAME>(<ARGUMENT_1>, <ARGUMENT_2>)

Where:

-  ``<TARGET_FIELD>`` is the field that the helper tests or writes to. It must be a :doc:`Wazuh Common Schema (WCS) field </user-manual/reference/wazuh-common-schema/wcs-field-reference>` or a temporary field whose first segment starts with ``_``, such as ``_json.src_ip``.
-  ``<HELPER_NAME>`` is the name of a helper function listed in :ref:`Helper function reference <helper_functions_reference_tables>`.
-  ``<ARGUMENT_1>`` and ``<ARGUMENT_2>`` represent helper arguments, separated by commas. The number of arguments varies by helper.

Arguments
^^^^^^^^^

Each argument is a literal value or a reference to another field. The normalization engine resolves each argument using the first matching rule.

The rules are applied in the following order:

#. **Quoted string**: Text between single quotes, such as ``'192.168.0.0'``. Escape a single quote or a backslash with ``\``.
#. **Reference**: A field path that starts with ``$``, such as ``$source.ip``. The engine reads the value of that field when it processes each event.
#. **JSON value**: A number, boolean, ``null``, array, object, or double-quoted string, such as ``24``, ``true``, or ``{"key": "value"}``.
#. **Raw string**: Any other text. Escape ``$``, ``,``, ``)``, ``\``, and spaces with ``\``.

A reference to a name in the asset ``definitions`` section resolves to the typed value defined there, not to an event field.

In the helpers reference tables, square brackets indicate an optional argument. The notation ``[...]`` indicates that a helper accepts additional arguments of the same type as the last argument. A helper can accept up to 150 arguments in total.

Target field types
^^^^^^^^^^^^^^^^^^

When the target is a WCS field, the engine checks its type against the expected target type in the reference tables when building the asset. A mismatch causes the build to fail. The engine skips this check for the ``any`` type and types marked ``(no build check)``.

Map helpers also reject values that do not match the WCS field type when processing an event. The following transformation helpers perform the same check: the four ``array_append`` helpers, ``get_key_in``, ``kvdb_get``, ``kvdb_get_array``, ``kvdb_get_merge``, ``kvdb_get_merge_recursive``, ``merge_key_in``, and ``merge_recursive_key_in``.

The ``rename`` helper does not validate the value it moves. Filter helpers do not validate values against the schema. They evaluate the values they read and pass or fail accordingly.

Temporary fields and the event root (``.``) accept any type.

The reference tables specify the expected target type. Types shown in code font, such as ``long``, are WCS field types.

Values and references without a helper
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A plain value or field reference does not require a helper. In a ``check`` operation, it compares the target field with the value. In a ``map`` operation, it assigns the value to the target field.

.. code-block:: yaml

   check:
     - event.kind: event
     - user.name: $user.effective.name
   normalize:
     - map:
         - event.dataset: apache.access
         - source.ip: $_json.src_ip

To set a string that starts with ``$`` as a literal value, escape the first character: ``\$``.

Helpers in conditional expressions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A ``check`` stage can also be a single conditional expression string. In this form, the first argument of a filter helper specifies the target field as a reference.

.. code-block:: yaml

   check: ip_cidr_match($source.ip, '192.168.0.0', '24')

The comparison operators ``==``, ``!=``, ``<``, ``<=``, ``>``, and ``>=`` are short forms of filter helpers. The left side must be a reference. The ``==`` operator uses the built-in comparison, and its right side can be a value or a reference. The other operators use the ``string_*`` or ``number_*`` helper that matches the value type, such as ``number_greater`` for ``>`` with a number. Their right side must be a literal string or number, not a reference.

.. code-block:: yaml

   check: $event.severity > 3

Combine conditions with the ``AND``, ``OR``, and ``NOT`` operators, and group them with parentheses.

.. code-block:: yaml

   check: ip_cidr_match($source.ip, '10.0.0.0', '8') OR ip_cidr_match($source.ip, '192.168.0.0', '16')

.. _helper_functions_failed_behavior:

Failed helper behavior
----------------------

Every helper call succeeds or fails for each event. The stage that holds the call determines how the engine handles a failure.

A failed helper call has the following effect in each stage:

-  ``check`` **at the top level of a decoder or filter**: The engine evaluates conditions in order, and all conditions must pass. If a condition fails, the decoder or filter rejects the event. If a decoder rejects an event, the engine tries the next sibling decoder.
-  ``check`` **inside a** ``normalize`` **block**: If a condition fails, the engine skips the block and runs the next one. The decoder still accepts the event.
-  ``map``: The engine runs each operation in order. If an operation fails, the engine leaves its target field unchanged and continues with the next operation. A ``map`` operation never causes the decoder to reject the event.

A helper fails if a referenced field does not exist, a value has the wrong type, or a lookup returns no match. Helpers whose description says they skip missing references, such as ``concat_any`` and ``array_append_any``, don't fail on a missing reference.

Other errors prevent the asset from building. These include an unknown helper name, an incorrect number of arguments, a helper from the wrong category, or a target type mismatch.

For the arguments, target field types, and behavior of every helper, see :ref:`reference_helper_functions`.
