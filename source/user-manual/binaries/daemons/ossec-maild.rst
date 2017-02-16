
.. _ossec-maild:

ossec-maild
=============

The ossec-maild daemon sends OSSEC alerts via email.
ossec-maild is started by ossec-control.

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
| `-u`_                         | Run as an user                  |
+-------------------------------+---------------------------------+
| `-V`_                         | Version and license information |
+-------------------------------+---------------------------------+

``-c``
------

Run ossec-maild using <config> as the configuration file.

.. topic:: Arguments

  -c <config>

.. topic:: Default

  /var/ossec/etc/ossec.conf

.. _maild-directory:

``-D``
------

Chroot to <dir>.

.. topic:: Arguments

  -D <dir>

.. topic:: Default

  /var/ossec


.. _maild-debug:

``-d``
------

Execute ossec-maild in debug mode. This option can be used multiple times to increase the verbosity of the debug messages.

``-f``
------

Run ossec-maild in the foreground.


``-g``
------

Run ossec-maild as <group>.

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

Run ossec-maild as <user>.

.. topic:: Arguments

  -u <user>

.. topic:: Default

  ossecm

``-V``
------

Version and license information.
