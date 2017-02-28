
.. _ossec-maild:

ossec-maild
=============

The ossec-maild program sends alerts via email.  It is started by :ref:`ossec-control`.

+-------------------------------+---------------------------------+
| Options                       | Descriptions                    |
+===============================+=================================+
| `-c`_                         | Run using a configuration file  |
+-------------------------------+---------------------------------+
| `-D <#maild-directory>`__     | Chroot to a directory           |
+-------------------------------+---------------------------------+
| `-d <#maild-debug>`__         | Run in debug mode               |
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

.. _maild-directory:

``-D``
------

Chroot to ``<dir>``.

.. topic:: Arguments

  ``-D <dir>``

.. topic:: Default

  ``/var/ossec``


.. _maild-debug:

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
