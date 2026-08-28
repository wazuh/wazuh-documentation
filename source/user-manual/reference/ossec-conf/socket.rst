.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the socket configuration section of ossec.conf, which defines custom output sockets for collected events.

.. _reference_ossec_socket:

socket
======

.. topic:: XML section name

   .. code-block:: xml

      <socket>
      </socket>

Configuration options for defining output sockets.

Options
-------

- `name`_
- `location`_
- `mode`_
- `prefix`_

name
^^^^

Name of the socket. This is a required field.

+----------------------+------------------------------------+
| **Default value**    | n/a                                |
+----------------------+------------------------------------+
| **Allowed values**   | Any name is allowed except agent   |
+----------------------+------------------------------------+

location
^^^^^^^^

Path of the socket. This is a required field.

+----------------------+------------------------+
| **Default value**    | n/a                    |
+----------------------+------------------------+
| **Allowed values**   | Any path is allowed.   |
+----------------------+------------------------+

mode
^^^^

UNIX socket communication protocol.

+----------------------+------------+
| **Default value**    | tcp        |
+----------------------+------------+
| **Allowed values**   | tcp, udp   |
+----------------------+------------+

prefix
^^^^^^

The prefix is placed before the message.

+----------------------+--------------+
| **Default value**    | n/a          |
+----------------------+--------------+
| **Allowed values**   | Any string   |
+----------------------+--------------+

Default configuration
------------------------

.. code-block:: xml

   <socket>
     <name>custom_socket</name>
     <location>/var/run/custom.sock</location>
     <mode>tcp</mode>
     <prefix>custom_syslog: </prefix>
   </socket>
