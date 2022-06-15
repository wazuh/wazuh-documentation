.. Copyright (C) 2022 Wazuh, Inc.
.. meta::
  :description: Learn more about regular expressions or regex. The Wazuh Ruleset is used to analyze incoming events and generate alerts when appropriate. 
  
Regular Expression Syntax
=========================

Regular expressions, or regex, are sequences of characters that define a pattern. In the Wazuh ruleset, some of the options used in rules definitions take a regular expression as their value. For example:

.. code-block:: xml

   <match>^Installed|^Updated|^Erased</match>

There are three types of regular expressions that are recognized within the Wazuh ruleset.

-  OS_Regex or regex syntax
-  OS_Match or sregex syntax
-  PCRE2 syntax

The type values ``osregex``, ``osmatch``, and ``pcre2`` can be set  using the ``type`` key. For example:

.. code-block:: xml

   <srcport type="pcre2">^5000[0-7]$</srcport>

For most of the options using regular expressions, ``osmatch`` is the type used by default. Check the :doc:`/user-manual/ruleset/ruleset-xml-syntax/rules` for more information.

.. _os_regex_syntax:

OS_Regex or regex syntax
------------------------

This is a fast and simple library for regular expressions in C.

This library is designed to be simple while still supporting the most common regular expressions.

.. topic:: Supported expressions

  +------------+-----------------------------------------+
  | Expressions| Valid characters                        |
  +============+=========================================+
  | \\w        | A-Z, a-z, 0-9, '-', '@', '_' characters |
  +------------+-----------------------------------------+
  | \\d        | 0-9 character                           |
  +------------+-----------------------------------------+
  | \\s        | Spaces " "                              |
  +------------+-----------------------------------------+
  | \\t        | Tabs                                    |
  +------------+-----------------------------------------+
  | \\p        | ()*+,-.:;<=>?[]!"'#$%&|{}               |
  +------------+-----------------------------------------+
  | \\W        | Anything not \\w                        |
  +------------+-----------------------------------------+
  | \\D        | Anything not \\d                        |
  +------------+-----------------------------------------+
  | \\S        | Anything not \\s                        |
  +------------+-----------------------------------------+
  | \\.        | Anything                                |
  +------------+-----------------------------------------+


.. topic:: Modifiers

  +------------+-----------------------------+
  | Expressions| Actions                     |
  +============+=============================+
  | \+         | To match one or more times  |
  +------------+-----------------------------+
  | \*         | To match zero or more times |
  +------------+-----------------------------+


.. topic:: Special characters

  +-------------+--------------------------------------------------+
  | Expressions | Actions                                          |
  +=============+==================================================+
  | ^           | To specify the beginning of the text             |
  +-------------+--------------------------------------------------+
  | $           | To specify the end of the text                   |
  +-------------+--------------------------------------------------+
  | \|          | To create a logical OR between multiple patterns |
  +-------------+--------------------------------------------------+


.. topic:: Characters escaping

  To utilize the following characters they must be escaped with: \\

  +-----+-----+-----+-------+-----+-----+
  | $   | (   | )   | \\    | \|  | <   |
  +=====+=====+=====+=======+=====+=====+
  | \\$ | \\( | \\) | \\ \\ | \\| | \\< |
  +-----+-----+-----+-------+-----+-----+

.. topic:: Limitations

  - The ``*`` and ``+`` modifiers can only be applied to backslash expressions, not bare characters (e.g. ``\d+`` is supported, ``0+`` is not)
  - You cannot use alternation in a group, e.g. ``(foo|bar)`` is not permitted
  - Complex backtracking is not supported, e.g. ``\p*\d*\s*\w*:`` does not match a single colon, because ``\p*`` consumes the colon
  - ``.`` matches a literal dot, whereas ``\.`` matches any character
  - ``\s`` matches only an ASCII space (32), not other whitespace like tab
  - there is no syntax to match a literal caret, asterisk or plus (although ``\p`` will match asterisk or plus, along with some other characters)

.. _os_sregex_syntax:

OS_Match or sregex syntax
-------------------------

This is faster than OS_Regex, but only supports simple string matching and the
following special characters.

.. topic:: Special characters

  +-------------+--------------------------------------------------+
  | Expressions | Actions                                          |
  +=============+==================================================+
  | ^           | To specify the beginning of the text             |
  +-------------+--------------------------------------------------+
  | $           | To specify the end of the text                   |
  +-------------+--------------------------------------------------+
  | \|          | To create a logical OR between multiple patterns |
  +-------------+--------------------------------------------------+
  | !           | To negate the expression                         |
  +-------------+--------------------------------------------------+

PCRE2 syntax
------------

**Perl Compatible Regular Expressions (PCRE)** tries to match Perl syntax and semantics as closely as it can.

It provides features like recursive patterns, look-ahead and look-behind assertions, non-capturing groups, non-greedy quantifiers, extended syntax for characters and character classes, and many other. For more details, please refer to the `PCRE Syntax documentation <https://www.pcre.org/current/doc/html/pcre2syntax.html>`_.

.. topic:: Supported expressions

  +-------------+----------------------------------------------------------------------------+
  | Expressions | Actions                                                                    |
  +=============+============================================================================+
  | \.          | Any character except newline                                               |
  +-------------+----------------------------------------------------------------------------+
  | \\d         | Any decimal digit, equal to [0-9]                                          |
  +-------------+----------------------------------------------------------------------------+
  | \\D         | Any character that is not a decimal digit, equal to [^0-9]                 |
  +-------------+----------------------------------------------------------------------------+
  | \\h         | Any horizontal white space character                                       |
  +-------------+----------------------------------------------------------------------------+
  | \\H         | Any character that is not a horizontal white space character               |
  +-------------+----------------------------------------------------------------------------+
  | \\s         | Any white space character, equal to [\\t\\r\\n\\f]                         |
  +-------------+----------------------------------------------------------------------------+
  | \\S         | Any character that is not a white space character, equal to [^\\t\\r\\n\\f]|
  +-------------+----------------------------------------------------------------------------+
  | \\w         | Any "word" character                                                       |
  +-------------+----------------------------------------------------------------------------+
  | \\W         | Any "non-word" character                                                   |
  +-------------+----------------------------------------------------------------------------+

.. topic:: Characters escaping

  +-------------+------------------------------------------------------+
  | Expressions | Actions                                              |
  +=============+======================================================+
  | \\f         | Form feed (hex 0C)                                   |
  +-------------+------------------------------------------------------+
  | \\n         | Newline (hex 0A)                                     |
  +-------------+------------------------------------------------------+
  | \\r         | Carriage return (hex 0D)                             |
  +-------------+------------------------------------------------------+
  | \\t         | Tab (hex 09)                                         |
  +-------------+------------------------------------------------------+
  | \\0dd       | Character with octal code 0dd                        |
  +-------------+------------------------------------------------------+
  | \\o{ddd..}  | Character with octal code ddd..                      |
  +-------------+------------------------------------------------------+
  | \\xhh       | Character with hex code hh                           |
  +-------------+------------------------------------------------------+
  | \\x{hh..}   | Character with hex code hh..                         |
  +-------------+------------------------------------------------------+

.. topic:: Quantifiers

  +------------+----------------------------------------+
  | Expressions| Actions                                |
  +============+========================================+
  | ?          | 0 or 1, greedy                         |
  +------------+----------------------------------------+
  | ?+         | 0 or 1, possessive                     |
  +------------+----------------------------------------+
  | ??         | 0 or 1, lazy                           |
  +------------+----------------------------------------+
  | \*         | 0 or more, greedy                      |
  +------------+----------------------------------------+
  | \*+        | 0 or more, possessive                  |
  +------------+----------------------------------------+
  | \*?        | 0 or more, lazy                        |
  +------------+----------------------------------------+
  | \+         | 1 or more, greedy                      |
  +------------+----------------------------------------+
  | ++         | 1 or more, possessive                  |
  +------------+----------------------------------------+
  | +?         | 1 or more, lazy                        |
  +------------+----------------------------------------+
  | {n}        | Exactly n                              |
  +------------+----------------------------------------+
  | {n,m}      | At least n, no more than m, greedy     |
  +------------+----------------------------------------+
  | {n,m}+     | At least n, no more than m, possessive |
  +------------+----------------------------------------+
  | {n,m}?     | At least n, no more than m, lazy       |
  +------------+----------------------------------------+
  | {n,}       | n or more, greedy                      |
  +------------+----------------------------------------+
  | {n,}+      | n or more, possessive                  |
  +------------+----------------------------------------+
  | {n,}?      | n or more, lazy                        |
  +------------+----------------------------------------+
