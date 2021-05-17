.. Copyright (C) 2021 Wazuh, Inc.

.. _reference_ossec_auth:

auth
====

.. topic:: XML section name

    .. code-block:: xml

        <auth>
        </auth>


This section shows the options for the registration service.

.. versionadded:: 2.1

Options
-------

- `disabled`_
- `port`_
- `use_source_ip`_
- `force_insert`_
- `force_time`_
- `purge`_
- `use_password`_
- `ssl_agent_ca`_
- `ssl_verify_host`_
- `ssl_manager_cert`_
- `ssl_manager_key`_
- `ssl_auto_negotiate`_
- `ciphers`_

disabled
^^^^^^^^

Toggles the execution of the Auth daemon on or off.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

port
^^^^

Defines the TCP port number for listening to connections.

+--------------------+---------------------+
| **Default value**  | 1515                |
+--------------------+---------------------+
| **Allowed values** | 0 - 65535           |
+--------------------+---------------------+

.. _auth_use_source_ip:

use_source_ip
^^^^^^^^^^^^^

Toggles the use of the client's source IP address or the use of "any" to add an agent.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

force_insert
^^^^^^^^^^^^

Toggles whether or not to force the insertion of an agent if there is a duplicate name or IP address. This will remove the old agent with same name or IP address.

+--------------------+---------------------+
| **Default value**  | yes                 |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

force_time
^^^^^^^^^^

When forcing to remove old agents with the same name or IP address, this options specifies that the deletion will be performed only if the agent's keepalive has more than the defined number of seconds.

+--------------------+---------------------+
| **Default value**  | 0                   |
+--------------------+---------------------+
| **Allowed values** | - Positive number   |
|                    | - 0                 |
+--------------------+---------------------+

Value ``0`` means to always force the deletion.

purge
^^^^^

Toggles the deletion of client keys on or off when agents are removed.

+--------------------+---------------------+
| **Default value**  | yes                 |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

When set to ``no``, removed agents will remain in the client keys file marked as removed.  When set to ``yes``, the client keys file will be purged.

use_password
^^^^^^^^^^^^

Toggles shared password authentication on or off.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

When enabled, the shared password will be read from the ``/var/ossec/etc/authd.pass`` file.

If this file does not exist, a **random password** will be generated.

ssl_agent_ca
^^^^^^^^^^^^

Specifies the path to the CA certificate used to verify clients. It can be referred to a relative path under the Wazuh installation directory, or a full path.

+--------------------+---------------------+
| **Allowed values** | Any valid path      |
+--------------------+---------------------+

ssl_verify_host
^^^^^^^^^^^^^^^

Toggles source host verification on and off when a CA certificate is specified. This means that the client source IP address will be validated using the *Common Name* field.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

ssl_manager_cert
^^^^^^^^^^^^^^^^

Specifies the path to the server SSL certificate. It can be referred to a relative path under the Wazuh installation directory, or a full path.

+--------------------+--------------------------------+
| **Default value**  | etc/sslmanager.cert            |
+--------------------+--------------------------------+
| **Allowed values** | Any valid path                 |
+--------------------+--------------------------------+

ssl_manager_key
^^^^^^^^^^^^^^^

Specifies the path to the server's SSL key. It can be referred to a relative path under the Wazuh installation directory, or a full path.

+--------------------+--------------------------------+
| **Default value**  | etc/sslmanager.key             |
+--------------------+--------------------------------+
| **Allowed values** | Any valid path                 |
+--------------------+--------------------------------+

ssl_auto_negotiate
^^^^^^^^^^^^^^^^^^

Toggles whether or not to auto select the SSL/TLS method.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

By default only TLS v1.2 is allowed. When set to ``yes`` the system will negotiate the most secure common method with the client.

In older systems, where the **manager does not support TLS v1.2**, this option will be enabled automatically.

ciphers
^^^^^^^

Sets the list of ciphers for network communication using SSL.

+--------------------+----------------------------------------------------+
| **Default value**  | ECDHE+AESGCM:!ECDSA                                |
+--------------------+----------------------------------------------------+

The format of this parameter is described in `SSL ciphers <https://www.openssl.org/docs/man1.1.0/apps/ciphers.html>`_.

.. versionadded:: 3.0.0

Default configuration
---------------------

.. code-block:: xml

  <auth>
    <disabled>no</disabled>
    <port>1515</port>
    <use_source_ip>no</use_source_ip>
    <force_insert>yes</force_insert>
    <force_time>0</force_time>
    <purge>yes</purge>
    <use_password>no</use_password>
    <ciphers>ECDHE+AESGCM:!ECDSA</ciphers>
    <!-- <ssl_agent_ca></ssl_agent_ca> -->
    <ssl_verify_host>no</ssl_verify_host>
    <ssl_manager_cert>etc/sslmanager.cert</ssl_manager_cert>
    <ssl_manager_key>etc/sslmanager.key</ssl_manager_key>
    <ssl_auto_negotiate>no</ssl_auto_negotiate>
  </auth>
