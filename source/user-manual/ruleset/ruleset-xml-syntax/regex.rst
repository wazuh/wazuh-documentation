.. Copyright (C) 2018 Wazuh, Inc.

.. _regex_syntax:

Regular Expression Syntax
=========================

There are two types of regular expressions: regex (*OS_Regex*) and sregex (*OS_Match*).

Regex (OS_Regex) syntax
--------------------------------

This is a fast and simple library for regular expressions in C.

This library is designed to be simple while still supporting the most common regular expressions.

.. topic:: Supported expressions

  +------------+------------------------------------+
  | Expressions| Valid characters                   |
  +============+====================================+
  | \\w        | A-Z, a-z, 0-9, '-', '@' characters |
  +------------+------------------------------------+
  | \\d        | 0-9 character                      |
  +------------+------------------------------------+
  | \\s        | Spaces " "                         |
  +------------+------------------------------------+
  | \\t        | Tabs                               |
  +------------+------------------------------------+
  | \\p        | ()*+,-.:;<=>?[]!"'#$%&|{}          |
  +------------+------------------------------------+
  | \\W        | Anything not \w                    |
  +------------+------------------------------------+
  | \\D        | Anything not \d                    |
  +------------+------------------------------------+
  | \\S        | Anything not \s                    |
  +------------+------------------------------------+
  | \\\\.      | Anything                           |
  +------------+------------------------------------+


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
  | \|          | To create a logical or between multiple patterns |
  +-------------+--------------------------------------------------+


.. topic:: Characters escaping

  To utilize the following characters they must be escaped with: \\

  +-----+-----+-----+-------+-----+
  | $   | (   | )   | \\    | \|  |
  +=====+=====+=====+=======+=====+
  | \\$ | \\( | \\) | \\ \\ | \\| |
  +-----+-----+-----+-------+-----+


Sregex (OS_Match) syntax
-----------------------------

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
  | \|          | To create a logic: or, between multiple patterns |
  +-------------+--------------------------------------------------+
  | !           | To negate the expression                         |
  +-------------+--------------------------------------------------+
