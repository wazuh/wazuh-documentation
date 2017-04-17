
.. _ossec-execd:

ossec-execd
=============

The ossec-execd program runs active responses by initiating the configured scripts.

+-------------------------+---------------------------------+
| Options                 | Descriptions                    |
+=========================+=================================+
| `-c`_                   | Run using a configuration file  |
+-------------------------+---------------------------------+
| `-d`_                   | Run in debug mode               |
+-------------------------+---------------------------------+
| `-f`_                   | Run in foreground               |
+-------------------------+---------------------------------+
| `-g`_                   | Run as a group                  |
+-------------------------+---------------------------------+
| `-h`_                   | Display the help message        |
+-------------------------+---------------------------------+
| `-t`_                   | Test configuration              |
+-------------------------+---------------------------------+
| `-V`_                   | Version and license information |
+-------------------------+---------------------------------+


``-c``
------

Run using ``<config>`` as the configuration file.

.. topic:: Arguments

  ``-c <config>``

.. topic:: Default

  ``/var/ossec/etc/ossec.conf``

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

Test configuration.

``-V``
------

Display version and license information.
