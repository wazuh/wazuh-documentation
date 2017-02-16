
.. _ossec-monitord:

ossec-monitord
==============

The ossec-monitord daemon monitors agent connectivity and compress daily log files.


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
| `-u`_                         | Run as an user                  |
+-------------------------------+---------------------------------+
| `-V`_                         | Version and license information |
+-------------------------------+---------------------------------+


``-c``
------

Run ossec-monitord using <config> as the configuration file.

.. topic:: Arguments

  -c <config>

.. topic:: Default

  /var/ossec/etc/ossec.conf

.. _monitord-directory:

``-D``
------

Chroot to <dir>.

.. topic:: Arguments

  -D <dir>

.. topic:: Default

  /var/ossec

.. _monitord-debug:

``-d``
------

Execute ossec-monitord in debug mode. This option can be used multiple times to increase the verbosity of the debug messages.

``-f``
------

Run ossec-monitord in the foreground.


``-g``
------

Run ossec-monitord as <group>.

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

Run ossec-monitord as <user>.

.. topic:: Arguments

  -u <user>

.. topic:: Default

  ossecm


``-V``
------

Version and license information.
