
.. _ossec-makelists:

ossec-makelists
===============

The ``ossec-makelists`` utility to compile cdb databases.
``ossec-makelists`` will scan :ref:`ossec.conf <reference_ossec_conf>` for database files, check the mtime, and recompile all out of date databases.



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
| `-u`_                   | Run as an user                  |
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

Execute ``ossec-makelists`` in debug mode. This option can be used multiple times to increase the verbosity of the debug messages.

``-F``
------

Force the rebuild of all configured databases.

``-g``
------

Run as ``<group>``.

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

Run as ``<user>``.

.. topic:: Arguments

  ``-u <user>``


``-V``
------

Diplay the version and license information.
