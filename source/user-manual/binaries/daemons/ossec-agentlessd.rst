
.. _ossec-agentlessd:


ossec-agentlessd
================

Agentless monitoring allows you to run integrity checking on systems without an agent installed.



+-------------------------------+---------------------------------+
| Options                       | Descriptions                    |
+===============================+=================================+
| `-c`_                         | Run using a configuration file  |
+-------------------------------+---------------------------------+
| `-D <#agentlessd-directory>`__| Chroot to a directory           |
+-------------------------------+---------------------------------+
| `-d <#agentlessd-debug>`__    | Run in debug mode               |
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
| `-V`_                         | Version and license information |
+-------------------------------+---------------------------------+



``-c``
------

Read the configuration from file ``<config>``.

.. topic:: Arguments

  -c ``<config>``


.. _agentlessd-directory:

``-D``
------

Chroot to ``<dir>``.

.. topic:: Arguments

  -D ``<dir>``


.. _agentlessd-debug:

``-d``
------

Execute ossec-agentlessd in debug mode. This option can be used multiple times to increase the verbosity of the debug messages.

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

Display OSSEC Version and license information.
