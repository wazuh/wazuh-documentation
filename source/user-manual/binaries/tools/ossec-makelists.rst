
.. _ossec-makelists:

ossec-makelists
===============

The ``ossec-makelists`` utility to compile cdb databases.  This will scan :ref:`ossec.conf <reference_ossec_conf>` for database files, check the mtime, and recompile all out of date databases.


+-------------------------+---------------------------------+
| Options                 | Descriptions                    |
+=========================+=================================+
| `-c`_                   | Run using a configuration file  |
+-------------------------+---------------------------------+
| `-d`_                   | Run in debug mode               |
+-------------------------+---------------------------------+
| `-F`_                   | Rebuild all databases           |
+-------------------------+---------------------------------+
| `-g`_                   | Run as a group                  |
+-------------------------+---------------------------------+
| `-h`_                   | Display the help message        |
+-------------------------+---------------------------------+
| `-t`_                   | Test configuration              |
+-------------------------+---------------------------------+
| `-u`_                   | Run as a user                   |
+-------------------------+---------------------------------+
| `-V`_                   | Version and license information |
+-------------------------+---------------------------------+


``-c``
------

Run with configuration file of ``<config>``.

.. topic:: Arguments

  ``-c <config>``

.. topic:: Default

  ``/var/ossec/etc/ossec.conf``


``-d``
------

Run in debug mode. This option may be repeated to increase the verbosity of the debug messages.

``-F``
------

Force the rebuild of all configured databases.

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

.. topic:: Arguments

  ``-u <user>``


``-V``
------

Display the version and license information.
