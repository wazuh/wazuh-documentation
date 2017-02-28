
.. _ossec-agentd:

ossec-agentd
============

The ossec-agentd program is the client-side daemon that communicates with the server. It runs as ``ossec`` and is chrooted to ``/var/ossec``.


+-------------------------------+---------------------------------+
| Options                       | Descriptions                    |
+===============================+=================================+
| `-c`_                         | Run using a configuration file  |
+-------------------------------+---------------------------------+
| `-D <#agentd-directory>`__    | Chroot to a directory           |
+-------------------------------+---------------------------------+
| `-d <#agentd-debug>`__        | Run in debug mode               |
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

  -c ``<config>``

.. topic:: Default

  /var/ossec/etc/ossec.conf

.. _agentd-directory:

``-D``
------

Chroot to ``<dir>``.

.. topic:: Arguments

  ``-D <dir>``

.. topic:: Default

  ``/var/ossec``

.. _agentd-debug:

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

Display the version and license information.
