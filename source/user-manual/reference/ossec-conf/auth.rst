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
- `force-insert`_
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

force-insert
^^^^^^^^^^^^^^^^^^^

Force insertion: remove old agent with same name or IP.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | - yes               |
|                    | - no                |
+--------------------+---------------------+

Value ``0`` means to force always.
Value ``no`` means to force never.

force-time
^^^^^^^^^^^^^^^^^^^

When forcing to remove old agents with same name or IP, this options specifies
that the deletion will be performed only if the agent's keepalive has more than
a number of seconds.

+--------------------+---------------------+
| **Default value**  | 0                   |
+--------------------+---------------------+
| **Allowed values** | - Positive number   |
|                    | - 0                 |
+--------------------+---------------------+

Value ``0`` means to force always.

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

Default configuration
---------------------

.. code-block:: xml

    <auth>
      <port>1515</port>
      <use-source-ip>no</use-source-ip>
      <force-insert>no</force-insert>
      <force-time>0</force-time>
      <clear-removed>no</clear-removed>
      <use-password>no</use-password>
      <!-- <ssl-agent-ca></ssl-agent-ca> -->
      <ssl-verify-host>no</ssl-verify-host>
      <ssl-manager-cert>/var/ossec/etc/sslmanager.cert</ssl-manager-cert>
      <ssl-manager-key>/var/ossec/etc/sslmanager.key</ssl-manager-key>
      <ssl-auto-negotiate>no</ssl-auto-negotiate>
    </auth>
