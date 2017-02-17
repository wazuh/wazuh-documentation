
.. _ossec-execd:

ossec-execd
=============

``ossec-execd`` executes active responses by running the configured scripts.

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

Run ossec-execd using ``<config>`` as the configuration file.

.. topic:: Arguments

  ``-c <config>``

.. topic:: Default

  ``/var/ossec/etc/ossec.conf``

``-d``
------

Execute ``ossec-execd`` in debug mode. This option can be used multiple times to increase the verbosity of the debug messages.

``-f``
------

Run ``ossec-execd`` in the foreground.

``-g``
------

Run as group.

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

Version and license information.
