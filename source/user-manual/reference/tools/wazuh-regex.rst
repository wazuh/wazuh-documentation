.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the wazuh-regex tool in this section of the Wazuh documentation.

wazuh-regex
===========

The wazuh-regex program is used to validate a regex expression. The pattern should be enclosed in single quotes to help prevent any unintended interactions with the shell.

The syntax for wazuh-regex is as follows: ``/var/ossec/bin/wazuh-regex '<PATTERN>'``

It then reads strings from stdin and outputs matches to stdout. ``+OSRegex_Execute`` and ``+OS_Regex`` are displayed if a match is successful.

.. note::

   The wazuh-regex tool works with OSRegex. It does not support PCRE2.

Example
-------

Validate a regex expression:

.. code-block:: console

   # /var/ossec/bin/wazuh-regex '^(\d\d\d\d-\d\d-\d\d)'

   2025-08-04T08:31:43.115608Z 21 Query SELECT * FROM users where username='' or 123=123 -- ' and password='abc'

.. code-block:: none
   :class: output

   +OSRegex_Execute: 2025-08-04T08:31:43.115608Z 21 Query SELECT * FROM users where username='' or 123=123 -- ' and password='abc'
    -Substring: 2025-08-04
   +OS_Regex       : 2025-08-04T08:31:43.115608Z 21 Query SELECT * FROM users where username='' or 123=123 -- ' and password='abc'
