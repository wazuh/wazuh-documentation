
.. _ossec-analysisd:

ossec-analysisd
===============

It recveives the log messages and compares them to the rules. It will create alerts when a log message matches an applicable rule.

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
| `-u`_                         | Run as an user                  |
+-------------------------------+---------------------------------+
| `-V`                          | Version and license information |
+-------------------------------+---------------------------------+


``-c``
------

Configuration file ossec-analysisd should use.

.. topic:: Arguments

  -c ``<config>``

.. _analysisd-directory:

``-D``
------

Chroot to ``<dir>``.

.. topic:: Arguments

  -D ``<dir>``


.. _analysisd-debug:

``-d``
------

Execute ossec-analysisd in debug mode. This can be used more than once to increase the verbosity of the debug messages.

``-f``
------

Run ossec-agentlessd in the foreground.

``-g``
------

Run as group.

.. topic:: Arguments

  -g ``<group>``


``-h``
------

Display a help message.

``-t``
------

Test the configuration.

``-u``
------

Run as user.

``-V``
------

Display the version and license information.
