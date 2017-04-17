
.. _ossec-analysisd:

ossec-analysisd
===============

The ossec-analysisd program receives the log messages and compares them to the rules.  It then creates an alert when a log message matches an applicable rule.

+-------------------------------+---------------------------------+
| Options                       | Descriptions                    |
+===============================+=================================+
| `-c`_                         | Run using a configuration file  |
+-------------------------------+---------------------------------+
| `-D <#analysisd-directory>`__ | Chroot to a directory           |
+-------------------------------+---------------------------------+
| `-d <#analysisd-debug>`__     | Run in debug mode               |
+-------------------------------+---------------------------------+
| `-f`_                         | Run in foreground               |
+-------------------------------+---------------------------------+
| `-g`_                         | Run as a group                  |
+-------------------------------+---------------------------------+
| `-h`_                         | Display the help message        |
+-------------------------------+---------------------------------+
| `-t`_                         | Test configuration              |
+-------------------------------+---------------------------------+
| `-u`_                         | Run as a user                   |
+-------------------------------+---------------------------------+
| `-V`                          | Version and license information |
+-------------------------------+---------------------------------+


``-c``
------

Configuration file ossec-analysisd should use.

.. topic:: Arguments

  ``-c <config>``

.. _analysisd-directory:

``-D``
------

Chroot to ``<dir>``.

.. topic:: Arguments

  ``-D <dir>``


.. _analysisd-debug:

``-d``
------

Run in debug mode. This option may be repeated to increase the verbosity of the debug messages.

``-f``
------

Run in the foreground.

``-g``
------

Run as a group.

.. topic:: Arguments

  ``-g <group>``


``-h``
------

Display the help message.

``-t``
------

Test the configuration.

``-u``
------

Run as a user.

``-V``
------

Display the version and license information.
