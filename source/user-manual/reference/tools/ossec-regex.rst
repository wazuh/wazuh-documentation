.. Copyright (C) 2018 Wazuh, Inc.

.. _ossec-regex:

ossec-regex
===========

The ossec-regex program is used to validate a regex expression.

The pattern should be enclosed in single quotes to help prevent any unintended interactions with the shell.

The syntax for ossec-regex is as follows:

``/var/ossec/bin/ossec-regex '<pattern>'``

It then reads strings from stdin and outputs matches to stdout.

``+OSRegex_Execute`` and ``+OS_Regex`` are displayed if a match is successful.
