
.. _ossec-dbd:

ossec-dbd
=============

The ``ossec-dbd`` daemon inserts the alert logs into a database, either postgresql or mysql.

+-------------------------+---------------------------------+
| Options                 | Descriptions                    |
+=========================+=================================+
| `-c`_                   | Run using a configuration file  |
+-------------------------+---------------------------------+
| `-D <#dbd-directory>`__ | Chroot to a directory           |
+-------------------------+---------------------------------+
| `-d <#dbd-debug>`__     | Run in debug mode               |
+-------------------------+---------------------------------+
| `-f`_                   | Run in foreground               |
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

Run ``ossec-dbd`` using ``<config>`` as the configuration file.

.. topic:: Arguments

  -c ``<config>``

.. topic:: Default

  ``/var/ossec/etc/ossec.conf``


.. _dbd-directory:

``-D``
------

Chroot to ``<dir>``.

.. topic:: Arguments

  -D ``<dir>``

.. topic:: Default

  ``/var/ossec``



.. _dbd-debug:

``-d``
------

Execute ossec-dbd in debug mode. This option can be used multiple times to increase the verbosity of the debug messages.

``-f``
------

Run ``ossec-dbd`` in the foreground.

``-g``
------

Run ossec-dbd as <group>.

.. topic:: Arguments

  -g <group>


``-h``
------

Display the help message.

``-t``
------

Test configuration.


``-u``
------

Run ossec-dbd as ``<user>``.

.. topic:: Arguments

  -u ``<user>``

.. topic:: Default

  ossecm

``-V``
------

Version and license information.
