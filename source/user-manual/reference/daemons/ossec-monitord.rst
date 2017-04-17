
.. _ossec-monitord:

ossec-monitord
==============

The ossec-monitord program monitors agent connectivity and compresses daily log files.


+-------------------------------+---------------------------------+
| Options                       | Descriptions                    |
+===============================+=================================+
| `-c`_                         | Run using a configuration file  |
+-------------------------------+---------------------------------+
| `-D <#monitord-directory>`__  | Chroot to a directory           |
+-------------------------------+---------------------------------+
| `-d <#monitord-debug>`__      | Run in debug mode               |
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

Run using ``<config>`` as the configuration file.

.. topic:: Arguments

  ``-c <config>``

.. topic:: Default

  ``/var/ossec/etc/ossec.conf``

.. _monitord-directory:

``-D``
------

Chroot to ``<dir>``.

.. topic:: Arguments

  ``-D <dir>``

.. topic:: Default

  ``/var/ossec``

.. _monitord-debug:

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


``-u``
------

Run as a user.

.. topic:: Arguments

  ``-u <user>``

.. topic:: Default

  ossecm


``-V``
------

Display version and license information.
