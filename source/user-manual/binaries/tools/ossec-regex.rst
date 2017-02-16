
.. _ossec-regex:

ossec-regex
===========

``ossec-regex`` is a simple program that will validate a regex expression.

The pattern should be enclosed in single quotes to help prevent any strange interactions with the shell.

The syntax for ossec-regex is simple:

``/var/ossec/bin/ossec-regex '<pattern>'``

It then reads strings from stdin and outputs matches to stdout.

``+OSRegex_Execute`` and ``+OS_Regex`` are printed if a match is successful.
