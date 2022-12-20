.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out how to configure the Fluentd forwarder module. Learn more about it in this section of the Wazuh documentation.

.. _reference_ossec_fluent_forward:

fluent-forward
==============

.. topic:: XML section name

	.. code-block:: xml

		<fluent-forward>
		</fluent-forward>

This configuration section is used to configure the Fluentd forwarder module.

Options
-------

- `enabled`_
- `socket_path`_
- `tag`_
- `object_key`_
- `address`_
- `port`_
- `shared_key`_
- `ca_file`_
- `user`_
- `password`_
- `timeout`_
- `poll_interval`_
- `keepalive`_

enabled
^^^^^^^

This indicates if the module is enabled or disabled.

+--------------------+--------------+
| **Default value**  | n/a          |
+--------------------+--------------+
| **Allowed values** | yes, no      |
+--------------------+--------------+

socket_path
^^^^^^^^^^^

This indicates the path of the UDP socket to be listened. The socket will be created at runtime in the designated path.

+--------------------+--------------------------------------------------+
| **Default value**  | n/a                                              |
+--------------------+--------------------------------------------------+
| **Allowed values** | Any string indicating the path to the socket     |
+--------------------+--------------------------------------------------+

For example ``<socket_path>/var/run/fluentd.sock</socket_path>``.

tag
^^^

This indicates the tag to be added to the messages forwarded to the Fluentd server.

+--------------------+------------+
| **Default value**  | n/a        |
+--------------------+------------+
| **Allowed values** | Any string |
+--------------------+------------+

For example ``<tag>debug.test</tag>``.

object_key
^^^^^^^^^^

Fluent Forward packs every log into an object. This option defines the key of that object, whose value is the log itself.

+--------------------+----------------------+
| **Default value**  | message              |
+--------------------+----------------------+
| **Allowed values** | Any non-empty string |
+--------------------+----------------------+

For example ``<object_key>message</object_key>``.

address
^^^^^^^

This indicates the address of the Fluentd server.

+--------------------+--------------------------------+
| **Default value**  | n/a                            |
+--------------------+--------------------------------+
| **Allowed values** | Any domain name or IP address  |
+--------------------+--------------------------------+

For example ``<address>localhost</address>``.

port
^^^^

This indicates de port number of the Fluentd server.

+--------------------+------------+
| **Default value**  | 24224      |
+--------------------+------------+
| **Allowed values** | 0 to 65535 |
+--------------------+------------+

For example ``<port>24224</port>``.

shared_key
^^^^^^^^^^

This indicates the key known by the Fluentd server for authentication. This implicitly enables the TLS secure mode;

+--------------------+-------------+
| **Default value**  | n/a         |
+--------------------+-------------+
| **Allowed values** | Any string  |
+--------------------+-------------+

For example ``<shared_key>secret_string</shared_key>``.


ca_file
^^^^^^^

This indicates the path to a CA certificate file to validate the Fluentd server in TLS (secure mode only).

+--------------------+-----------------------------------------------------+
| **Default value**  | n/a                                                 |
+--------------------+-----------------------------------------------------+
| **Allowed values** | Any string indicating the path to the certificate   |
+--------------------+-----------------------------------------------------+

For example ``<ca_file>/root/conf/fluentd.crt</ca_file>``.


user
^^^^

This indicates the user name for authentication used on the Fluentd server TLS (secure mode only).

+--------------------+--------------------------------+
| **Default value**  | n/a                            |
+--------------------+--------------------------------+
| **Allowed values** | Any string                     |
+--------------------+--------------------------------+

For example ``<user>foo</user>``.


password
^^^^^^^^

This indicates the user password for authentication used on the Fluentd server TLS (secure mode only).

+--------------------+--------------------------------+
| **Default value**  | n/a                            |
+--------------------+--------------------------------+
| **Allowed values** | Any string                     |
+--------------------+--------------------------------+

For example ``<password>bar</password>``.


timeout
^^^^^^^

This indicates the timeout in seconds for sending and receiving responses from the Fluentd server.

+--------------------+--------------------------------+
| **Default value**  | 0                              |
+--------------------+--------------------------------+
| **Allowed values** | 0 to 9000                      |
+--------------------+--------------------------------+

For example ``<timeout>10</timeout>``.

.. note::
  The default value 0 means no timeout.


poll_interval
^^^^^^^^^^^^^

Defines the connection health check interval (in seconds). If the module keeps idle during the defined time, it will poll the connection. If the connection is broken, the module will reconnect to the Fluent server.

+--------------------+--------------------------------+
| **Default value**  | 60                             |
+--------------------+--------------------------------+
| **Allowed values** | 1 to 7200                      |
+--------------------+--------------------------------+

For instance: ``<poll_interval>60</poll_interval>``


keepalive
^^^^^^^^^

Enables TCP keepalive on the connection with the Fluent server. With the default configuration, the agent will wait indefinitely for the server to confirm delivery. If ``<timeout>`` is disabled, or no data is available to send, the agent is unable to detect a broken connection.

This option allows enabling TCP keepalive and tunes its options. When the connection becomes idle during ``<idle>`` seconds, the agent will start delivering one keepalive probe every ``<interval>`` seconds. If no response is received after ``<count>`` attempts, the agent will reset the connection.

Attributes
~~~~~~~~~~

+-------------+-------------------+--------------------+-----------------------+
| **Option**  | **Default value** | **Allowed values** | **Description**       |
+-------------+-------------------+--------------------+-----------------------+
| **enabled** | yes               | ``yes`` or ``no``  | Enable TCP keepalive. |
+-------------+-------------------+--------------------+-----------------------+

Keepalive options
~~~~~~~~~~~~~~~~~

+--------------+-------------------+--------------------+--------------------------------------------------------------+
| **Option**   | **Default value** | **Allowed values** | **Description**                                              |
+--------------+-------------------+--------------------+--------------------------------------------------------------+
| **count**    | Defined by the OS | 1 to 32767         | Maximum number of probes before closing the connection.      |
+--------------+-------------------+--------------------+--------------------------------------------------------------+
| **idle**     | Defined by the OS | 1 to 32767         | Idle time: number of seconds before starting to send probes. |
+--------------+-------------------+--------------------+--------------------------------------------------------------+
| **interval** | Defined by the OS | 1 to 32767         | Interval (in seconds) between probes.                        |
+--------------+-------------------+--------------------+--------------------------------------------------------------+


Configuration examples
----------------------

Linux configuration:

.. code-block:: xml

    <!-- Simple usage without using TLS -->
    <fluent-forward>
      <enabled>yes</enabled>
      <socket_path>/var/run/fluent.sock</socket_path>
      <address>localhost</address>
      <port>24224</port>
    </fluent-forward>

    <!-- Simple usage using TLS -->
    <fluent-forward>
      <enabled>yes</enabled>
      <socket_path>/var/run/fluent.sock</socket_path>
      <address>localhost</address>
      <port>24224</port>
      <shared_key>secret_string</shared_key>
      <ca_file>/root/certs/fluent.crt</ca_file>
      <user>foo</user>
      <password>bar</password>
    </fluent-forward>
