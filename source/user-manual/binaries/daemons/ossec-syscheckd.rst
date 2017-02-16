
.. _ossec-syscheckd:

ossec-syscheckd
===============

The ossec-syscheckd daemon checks configured files for changes to the checksums, permissions or ownership.
ossec-syscheckd is started by ossec-control.

+-------------------------+---------------------------------+
| Options                 | Descriptions                    |
+=========================+=================================+
| `-c`_                   | Run using a configuration file  |
+-------------------------+---------------------------------+
| `-d`_                   | Run in debug mode               |
+-------------------------+---------------------------------+
| `-f`_                   | Run in foreground               |
+-------------------------+---------------------------------+
| `-h`_                   | Display the help message        |
+-------------------------+---------------------------------+
| `-t`_                   | Test configuration              |
+-------------------------+---------------------------------+
| `-V`_                   | Version and license information |
+-------------------------+---------------------------------+

``-c``
------

Run ossec-syscheckd using <config> as the configuration file.

.. topic:: Arguments

  -c <config>

.. topic:: Default

  /var/ossec/etc/ossec.conf

``-d``
------

Execute ossec-syscheckd in debug mode. This can be used more than once to increase the verbosity of the debug messages.

``-f``
------

Run ossec-syscheckd in the foreground.

``-h``
------

Display the help message.

``-t``
------

Test configuration.

``-V``
------

Version and license information.
