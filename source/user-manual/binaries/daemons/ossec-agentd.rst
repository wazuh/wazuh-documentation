
.. _ossec-agentd:

ossec-agentd
============

It is the client side daemon that communicates with the server. It runs as ``ossec`` and is chrooted to ``/var/ossec`` by default.


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
| `-u`_                         | Run as an user                  |
+-------------------------------+---------------------------------+
| `-V`_                         | Version and license information |
+-------------------------------+---------------------------------+




``-c``
------

Run ossec-agentd using ``<config>`` as the configuration file.

.. topic:: Arguments

  -c ``<config>``

.. topic:: Default

  /var/ossec/etc/ossec.conf

.. _agentd-directory:

``-D``
------

Chroot to ``<dir>``.

.. topic:: Arguments

  -D ``<dir>``

.. topic:: Default

  ``/var/ossec``

.. _agentd-debug:

``-d``
------

Run in debug mode. This option can be used multiple times to increase the verbosity of the debug messages.

``-f``
------

Run ossec-agentd in the foreground.

``-g``
------

Run ossec-agentd as <group>.

.. topic:: Arguments

  -g ``<group>``

``-h``
------

Display the help message.

``-t``
------

Test configuration.


``-u``
------

Run ossec-agentd as ``<user>``.

.. topic:: Arguments

  -u ``<user>``

.. topic:: Default

  ossecm

``-V``
------

Version and license information.
