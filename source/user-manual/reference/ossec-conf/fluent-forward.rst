.. Copyright (C) 2018 Wazuh, Inc.

.. _reference_ossec_fluent_forward:

fluent-forward
==============

.. topic:: XML section name

	.. code-block:: xml

		<fluent_forward>
		</fluent_forward>

This configuration section is used to configure the Fluentd forwarder module.

Options
-------

- `enabled`_
- `socket_path`_
- `tag`_
- `address`_
- `port`_
- `shared_key`_
- `ca_file`_
- `user`_
- `password`_
- `timeout`_

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

This indicates the path of the UPD socket to be read from. The socket will be created at runtime in the designated path.

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

address
^^^^^^^

This indicates the address of the Fluentd server.

+--------------------+--------------------------------+
| **Default value**  | n/a                            |
+--------------------+--------------------------------+
| **Allowed values** | Any string                     |
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

This indicates path to a CA certificate file to validate the Fluentd server in TLS (secure mode only).

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
| **Allowed values** | any string                     |
+--------------------+--------------------------------+

For example ``<user>foo</user>``.


password
^^^^^^^^

This indicates the user password for authentication used on the Fluentd server TLS (secure mode only).

+--------------------+--------------------------------+
| **Default value**  | n/a                            |
+--------------------+--------------------------------+
| **Allowed values** | any string                     |
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

For example ``<timeout>10</timeout>``

.. note::
  The default value 0 means no timeout.


Configuration examples
----------------------

Linux configuration:

.. code-block:: xml

    <!-- Simple usage without using TLS -->
    <fluent_forward>
      <enabled>yes</enabled>
      <socket_path>/var/run/fluent.sock</socket_path>
      <address>localhost</address>
      <port>24224</port>
    </fluent_forward>

    <!-- Simple usage using TLS -->
    <fluent_forward>
      <enabled>yes</enabled>
      <socket_path>/var/run/fluent.sock</socket_path>
      <address>localhost</address>
      <port>24224</port>
      <shared_key>secret_string</shared_key>
      <ca_file>/root/certs/fluent.crt</ca_file>
      <user>foo</user>
      <password>bar</password>
    </fluent_forward>
