.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the wazuh-regex tool in this section of the Wazuh documentation.

.. _wazuh-regex:

wazuh-regex
===========

The wazuh-regex program is used to validate a regex expression.

The pattern should be enclosed in single quotes to help prevent any unintended interactions with the shell.

The syntax for wazuh-regex is as follows:

``/var/ossec/bin/wazuh-regex '<pattern>'``

It then reads strings from stdin and outputs matches to stdout.

``+OSRegex_Execute`` and ``+OS_Regex`` are displayed if a match is successful.
