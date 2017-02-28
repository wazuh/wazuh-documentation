
.. _ossec-logtest:

ossec-logtest
=============

The ossec-logtest program is a useful tool when working with Wazuh rules.  This tool allows the testing and verification of rules against provided log examples in a way that simulates the action of ossec-analysisd. This can also assist with writing and debugging custom rules and troubleshooting false positives and negatives.

+-----------------------------+------------------------------------------------------------+
| Options                     | Descriptions                                               |
+=============================+============================================================+
| `-a`_                       | Analyze input lines                                        |
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
| `-U`_                       | Check if last log line tested matches the arguments passed |
+-----------------------------+------------------------------------------------------------+
| `-V <#logtest-version>`__   | Version and license information                            |
+-----------------------------+------------------------------------------------------------+
| `-v <#logtest-output>`__    | Full output of all details                                 |
+-----------------------------+------------------------------------------------------------+

``-a``
------

Analysis of input lines as though they are live events.

``-c``
------

Run using ``<config>`` as the configuration file.

.. topic:: Arguments

  ``-c <config>``

.. topic:: Default

  /var/ossec/etc/ossec.conf

.. _logtest-directory:

``-D``
------

Specifies the chroot before it completes loading all rules,
decoders, and lists and processing standard input.

.. topic:: Arguments

  ``-D <dir>``


.. _logtest-debug:

``-d``
------

Print debug output to the terminal. This option may be repeated to increase the verbosity of the debug messages.

``-h``
------

Display the help message.


``-t``
------

Test configuration.  This will display file details on the rules to be loaded by ossec-analysisd,
decoders, and lists as they are loaded and the order they were processed.


``-U``
------

This option will cause ossec-logtest to return a zero exit status if the test results for the provided log line match the criteria in the arguments.  Only one log line should be supplied for this to be useful.

.. topic:: Arguments

  ``-U <rule-id:alert-level:decoder-name>``


.. note::

  This ossec-logtest code requires access to all ossec configuration files.




.. _logtest-version:

``-V``
------

Display the version and license information for Wazuh and ossec-logtest.



.. _logtest-output:

``-v``
------

Display the verbose results.

.. note::

    This is the key option to troubleshoot a rule or decoder problem.
