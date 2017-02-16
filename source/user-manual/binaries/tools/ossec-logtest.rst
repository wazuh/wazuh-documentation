
.. _ossec-logtest:

ossec-logtest
=============

ossec-logtest is the single most useful tool when working with ossec.  This tool allows oneself
to test and verify log files in the exact same way that ossec-anaylistd does.

Something ossec-logtest can help with:

- Writing rules (Debugging your custom rules)
- Troubleshooting false positives or false negatives

ossec-logtest accepts standard input for all log to test.

+-----------------------------+------------------------------------------------------------+
| Options                     | Descriptions                                               |
+=============================+============================================================+
| `-a`_                       | Analyze of input lines                                     |
+-----------------------------+------------------------------------------------------------+
| `-c`_                       | Run using a configuration file                             |
+-----------------------------+------------------------------------------------------------+
| `-D <#logtest-directory>`__ | Chroot to a directory                                      |
+-----------------------------+------------------------------------------------------------+
| `-d <#logtest-debug>`__     | Run in debug mode                                          |
+-----------------------------+------------------------------------------------------------+
| `-h`_                       | Display the help message                                   |
+-----------------------------+------------------------------------------------------------+
| `-t`_                       | Test configuration                                         |
+-----------------------------+------------------------------------------------------------+
| `-U`_                       | Check if the last line tested matches the arguments passed |
+-----------------------------+------------------------------------------------------------+
| `-V <#logtest-version>`__   | Version and license information                            |
+-----------------------------+------------------------------------------------------------+
| `-v <#logtest-output>`__    | Full output of all details                                 |
+-----------------------------+------------------------------------------------------------+

``-a``
------

Analyze of input lines as if they are live events.

``-c``
------

<config> is the path and filename to load.

.. topic:: Arguments

  -c <config>

.. topic:: Default

  /var/ossec/etc/ossec.conf

.. _logtest-directory:

``-D``
------

This is the path that ossec-logtest will chroot to before it completes loading all rules,
decoders, and lists and processing standard input.

.. topic:: Arguments

  -D <dir>


.. _logtest-debug:

``-d``
------

Print debug output to the terminal. This option can be used multiple times to increase the verbosity of the debug messages.

``-h``
------

Print the help message to the console.


``-t``
------

Test configuration.  This will print file details on the ossec-anaylistd rules,
decoders, and lists as they are loaded and the order they were processed.


``-U``
------

This option will cause ossec-logtest to return with an exit status other then zero unless
the last line tested matches the arguments passed.

.. topic:: Arguments

  -U <rule-id:alert-level:decoder-name>

.. note::

  This only works for the last, line so passing many lines into ossec-logtest with
  this argument may not provide the desired results.

.. note::

  This ossec-logtest code requires access to all ossec configuation files.




.. _logtest-version:

``-V``
------

Print the Version and license message for OSSEC and ossec-logtest.



.. _logtest-output:

``-v``
------

Full output of all details and matches.

.. note::

    This the key argument to troubleshoot a rule, decoder problem.
