
.. _ossec-agentlessd:


ossec-agentlessd
================

The ossec-agentlessd program allows integrity checks to be run on systems without an agent installed.



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
| `-u`_                         | Run as a user                   |
+-------------------------------+---------------------------------+
| `-V`_                         | Version and license information |
+-------------------------------+---------------------------------+



``-c``
------

Read the configuration from file ``<config>``.

.. topic:: Arguments

  ``-c <config>``


.. _agentlessd-directory:

``-D``
------

Chroot to ``<dir>``.

.. topic:: Arguments

  ``-D <dir>``


.. _agentlessd-debug:

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
