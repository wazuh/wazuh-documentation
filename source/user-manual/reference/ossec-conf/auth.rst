.. _reference_ossec_auth:


auth
====

.. topic:: XML section name

	.. code-block:: xml

		<auth>
		</auth>


This section has options for the registering service.

.. versionadded:: 2.1

Options
-------

- `port`_
- `use-source-ip`_
- `force-time`_
- `clear-removed`_
- `use-password`_
- `ssl-agent-ca`_
- `ssl-verify-host`_
- `ssl-manager-cert`_
- `ssl-manager-key`_
- `ssl-auto-negotiate`_

port
^^^^

TCP port number to listen to connections.

+--------------------+---------------------+
| **Default value**  | 1515                |
+--------------------+---------------------+
| **Allowed values** | 0 - 65535           |
+--------------------+---------------------+

use-source-ip
^^^^^^^^^^^^^^^^^^^

Use client's source IP address instead of "any" to add agent.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | - yes               |
|                    | - no                |
+--------------------+---------------------+

force-time
^^^^^^^^^^^^^^^^^^^

Force insertion: remove old agent with same name or IP if its keepalive has more than <time> seconds.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | - Positive number   |
|                    | - 0                 |
|                    | - no                |
+--------------------+---------------------+

Value ``0`` means to force always.
Value ``no`` means to force never.

clear-removed
^^^^^^^^^^^^^^^^^^^

Delete definitely agents when removing.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | - yes               |
|                    | - no                |
+--------------------+---------------------+

When set to ``no`` removed agents will be kept in the client keys file, marked as removed.
However, when set to ``yes``, agents will be definitely deleted.

use-password
^^^^^^^^^^^^^^^^^^^

Enable shared password authentication.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | - yes               |
|                    | - no                |
+--------------------+---------------------+

When enabled, the shared password will be read from file at ``/var/ossec/etc/authd.pass``.

If this file does not exist, a **random password** will be generated.

ssl-agent-ca
^^^^^^^^^^^^^^^^^^^

Full path to CA certificate used to verify clients.

+--------------------+---------------------+
| **Allowed values** | A full path         |
+--------------------+---------------------+

ssl-verify-host
^^^^^^^^^^^^^^^^^^^

When CA certificate is specified, this option enables source host verification. This means that the client source IP will be validated using the *Common Name* field.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | - yes               |
|                    | - no                |
+--------------------+---------------------+

ssl-manager-cert
^^^^^^^^^^^^^^^^^^^

Full path to server SSL certificate.

+--------------------+--------------------------------+
| **Default value**  | /var/ossec/etc/sslmanager.cert |
+--------------------+--------------------------------+
| **Allowed values** | A full path                    |
+--------------------+--------------------------------+

ssl-manager-key
^^^^^^^^^^^^^^^^^^^

Full path to server SSL key.

+--------------------+--------------------------------+
| **Default value**  | /var/ossec/etc/sslmanager.key  |
+--------------------+--------------------------------+
| **Allowed values** | A full path                    |
+--------------------+--------------------------------+

ssl-auto-negotiate
^^^^^^^^^^^^^^^^^^^

Auto select SSL/TLS method.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | - yes               |
|                    | - no                |
+--------------------+---------------------+

By default only TLS v1.2 is allowed. When set to ``yes`` the system will negotiate the most secure common method with the client.

In older systems, where the **manager does not support TLS v1.2**, this option will be enabled automatically.
