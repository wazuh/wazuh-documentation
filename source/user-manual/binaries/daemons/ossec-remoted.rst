
.. _ossec-remoted:

ossec-remoted
=============

``ossec-remoted`` is the server side daemon that communicates with the agents.
It can listen to port 1514/udp (for Wazuh communications) and/or 514 (for syslog).
It runs as ossecr and is chrooted to ``/var/ossec`` by default.


+------------------------------+---------------------------------+
| Options                      | Descriptions                    |
+==============================+=================================+
| `-c`_                        | Run using a configuration file  |
+------------------------------+---------------------------------+
| `-D <#remoted-directory>`__  | Chroot to a directory           |
+------------------------------+---------------------------------+
| `-d <#remoted-debug>`__      | Run in debug mode               |
+------------------------------+---------------------------------+
| `-f`_                        | Run in foreground               |
+------------------------------+---------------------------------+
| `-g`_                        | Run as a group                  |
+------------------------------+---------------------------------+
| `-h`_                        | Display the help message        |
+------------------------------+---------------------------------+
| `-t`_                        | Test configuration              |
+------------------------------+---------------------------------+
| `-u`_                        | Run as an user                  |
+------------------------------+---------------------------------+
| `-V`_                        | Version and license information |
+------------------------------+---------------------------------+



``-c``
------

Run ``ossec-remoted`` using ``<config>`` as the configuration file.

.. topic:: Arguments

  -c ``<config>``

.. topic:: Default

  ``/var/ossec/etc/ossec.conf``


.. _remoted-directory:

``-D``
------

Chroot to ``<dir>``.

.. topic:: Arguments

  -D ``<dir>``

.. topic:: Default

  ``/var/ossec``


.. _remoted-debug:

``-d``
------

Execute ``ossec-remoted`` in debug mode. This can be used more than once to increase the verbosity of the debug messages.


``-f``
------

Run ossec-remoted in the foreground.

``-g``
------

Run ``ossec-remoted`` as ``<group>``.

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

Run ``ossec-remoted`` as ``<user>``.

.. topic:: Arguments

  -u ``<user>``

.. topic:: Default

  ossecm


``-V``
------


Version and license information.
