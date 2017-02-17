
.. _ossec-logcollector:

ossec-logcollector
==================

The ``ossec-logcollector`` daemon monitors configured files and commands for new log messages.


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

Run ossec-logcollector using ``<config>`` as the configuration file.

.. topic:: Arguments

  ``-c <config>``

.. topic:: Default

  ``/var/ossec/etc/ossec.conf``

``-d``
------


Execute ``ossec-logcollector`` in debug mode. This option can be used multiple times to increase the verbosity of the debug messages.

``-f``
------

Run ``ossec-logcollector`` in the foreground.

``-h``
------

Display the help message.


``-t``
------

Test configuration.

``-V``
------

Version and license information.
