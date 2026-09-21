.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the agent configuration section of ossec.conf, the Wazuh 5.0 equivalent of client, which configures the agent's connection to the manager and enrollment settings.

.. _reference_ossec_agent:

agent
=====

.. topic:: XML section name

   .. code-block:: xml

      <agent>
      </agent>

The ``<agent>`` section is the Wazuh 5.0 equivalent of ``<client>``. It configures the agent's connection to the manager and enrollment settings.

Options
-------

- `manager`_
- `ssl`_
- `config-profile`_
- `notify_time`_
- `time-reconnect`_
- `auto_restart`_
- `ip_update_interval`_
- `crypto_method`_
- `enrollment`_

manager
^^^^^^^

Manager connection configuration block.

endpoint
~~~~~~~~

The complete connection target: the Wazuh manager's address, optionally a port, and optionally a URL path prefix. This replaces the separate ``address`` and ``port`` tags.

+--------------------+---------------------------------------------------------------------------------------------+
| **Required**       | Yes (host is the only mandatory part)                                                       |
+--------------------+---------------------------------------------------------------------------------------------+
| **Allowed values** | [ "https://" ] host [ ":" port ] [ "/" [ prefix ] ] - host is an IPv4 address, hostname, or |
|                    | bracketed IPv6 literal. Port defaults to 1517.                                              |
+--------------------+---------------------------------------------------------------------------------------------+
| **Example**        | ``192.168.1.100``, ``manager.example.com:8443/gateway``, ``[2001:db8::1]:1517``             |
+--------------------+---------------------------------------------------------------------------------------------+

address / port (deprecated)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Folded into ``endpoint``. Still read for agents upgraded in place from 4.x (an upgrade never rewrites ``ossec.conf``): the agent composes the target from ``address`` + ``port`` (or its 1517 default), logs the equivalent ``<endpoint>`` line at INFO, and uses that. If ``endpoint`` is also present, it wins and ``address``/``port`` are ignored with a warning.

protocol / max_retries / retry_interval (deprecated, ignored)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Parsed but have no effect - communication is hard-coded to TCP (HTTPS transport), and the connection-retry/server-rotation loop was removed with it.

ssl
^^^

TLS configuration for the agent's HTTPS connection to the manager.

Sub options

+-----------------------------+-----------------------------------------------------------------------+----------------------------------------+----------------------------------------------------------------------+
| Option                      | Description                                                           | Default                                | Allowed values                                                       |
+=============================+=======================================================================+========================================+======================================================================+
| ``certificate``             | Optional client (mTLS) certificate the agent presents to the manager. | None                                   | Path to a PEM-encoded certificate file, readable by the agent        |
|                             | Must be set together with ``key`` - setting only one of the two is    |                                        |                                                                      |
|                             | rejected.                                                             |                                        |                                                                      |
+-----------------------------+-----------------------------------------------------------------------+----------------------------------------+----------------------------------------------------------------------+
| ``key``                     | Private key matching ``certificate``. Must be set together with       | None                                   | Path to a PEM-encoded private key file, readable by the agent        |
|                             | ``certificate``.                                                      |                                        |                                                                      |
+-----------------------------+-----------------------------------------------------------------------+----------------------------------------+----------------------------------------------------------------------+
| ``certificate_authorities`` | CA bundle used to verify the manager's certificate - a flat path      | None                                   | Path to a PEM-encoded CA bundle file, readable by the agent          |
|                             | value, not a container. Required when ``verification_mode`` is        |                                        |                                                                      |
|                             | ``full`` or ``certificate`` (agent fails closed without it). Must NOT |                                        |                                                                      |
|                             | be set when ``verification_mode`` is ``system``. Ignored (with a      |                                        |                                                                      |
|                             | warning if unreadable) when ``verification_mode`` is ``none``.        |                                        |                                                                      |
+-----------------------------+-----------------------------------------------------------------------+----------------------------------------+----------------------------------------------------------------------+
| ``verification_mode``       | How strictly the agent verifies the manager's TLS certificate.        | none                                   | ``none`` (no verification - insecure, testing only). ``certificate`` |
|                             |                                                                       |                                        | (verify against CA, no hostname check) ``full`` (verify + hostname)  |
|                             |                                                                       |                                        | ``system`` (verify against the OS trust store instead of             |
|                             |                                                                       |                                        | ``certificate_authorities``). Any other value is rejected at config- |
|                             |                                                                       |                                        | parse time.                                                          |
+-----------------------------+-----------------------------------------------------------------------+----------------------------------------+----------------------------------------------------------------------+
| ``ciphers``                 | TLS 1.3 ciphersuite list to offer during the handshake.               | None (libcurl/OpenSSL TLS 1.3 default) | Colon-separated list of TLS 1.3 ciphersuite names, e.g.              |
|                             |                                                                       |                                        | ``TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256``              |
+-----------------------------+-----------------------------------------------------------------------+----------------------------------------+----------------------------------------------------------------------+

config-profile
^^^^^^^^^^^^^^^

Specifies the ``agent.conf`` profile(s) to be used by the agent.

+--------------------+----------------------------------------------------------------------+
| **Default value**  | n/a                                                                  |
+--------------------+----------------------------------------------------------------------+
| **Allowed values** | Multiple profiles can be included, separated by a comma and a space. |
+--------------------+----------------------------------------------------------------------+

notify_time
^^^^^^^^^^^^

Specifies the interval, in seconds, between agent keepalive messages sent to the Wazuh manager. Lower values propagate centrally distributed configuration updates more quickly but increase the load on the Wazuh manager when many agents are connected.

+--------------------+-----------------------------+
| **Default value**  | 20                          |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

.. note::
   Set this value lower than the agent disconnection time configured on the Wazuh manager. This ensures that the agent sends a keepalive before the manager marks it as disconnected.

time-reconnect
^^^^^^^^^^^^^^^

Specifies the time in seconds before a reconnection is attempted. This should be set to a higher number than the ``notify_time`` parameter.

For example, a ``notify_time`` setting of 60 combined with a ``time-reconnect`` of 300 would mean that agents will attempt to check in once per minute, but if a checkin attempt fails to get a response from the manager, the agent will wait five minutes before trying again. Checkins will resume their normal one-minute interval following a successful connection attempt.

+--------------------+-----------------------------+
| **Default value**  | 60                          |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

.. warning::
   Notice that the ``notify_time`` value uses an underscore while the ``time-reconnect`` value uses a dash. This is an unfortunate legacy naming inconsistency that is easy to mix up.

auto_restart
^^^^^^^^^^^^^

Toggles on and off the automatic restart of agents when a new valid configuration is received from the manager.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

ip_update_interval
^^^^^^^^^^^^^^^^^^^

Specifies how often an agent will query the control module for its main IP address.

Any value equal to or lower than the configured ``notify_time`` will cause the IP address to be queried on each keep-alive message.

+--------------------+-----------------------------+
| **Default value**  | 0                           |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

.. note::
   Most systems won't need to modify this value, but on systems with large routing tables this configuration can help lower CPU usage from ``wazuh-modulesd``.

crypto_method
^^^^^^^^^^^^^^

DEPRECATED: This option is parsed but ignored. Encryption method is hard-coded to AES.

+----------------------+---------------------------------------------------+
| **Status**           | Deprecated (kept for backward compatibility)      |
+----------------------+---------------------------------------------------+
| **Behavior**         | Always uses AES regardless of configured value    |
+----------------------+---------------------------------------------------+

enrollment
^^^^^^^^^^^

Agent auto-enrollment configuration block (optional). Runs over the same HTTPS channel and TLS material as everything else since 5.0.0 — it dials ``<agent><manager>`` and presents ``<agent><ssl>``, instead of opening a second connection to authd on port 1515. There is no longer a separate address/port/cert configuration for enrollment.

Sub options

+-----------------------------+---------------------------------------------------------------------------------------+-----------------+------------------------------------------+
| Option                      | Description                                                                           | Default         | Allowed values                           |
+=============================+=======================================================================================+=================+==========================================+
| **enabled**                 | Enable automatic agent enrollment.                                                    | yes             | yes, no                                  |
+-----------------------------+---------------------------------------------------------------------------------------+-----------------+------------------------------------------+
| **agent_name**              | Custom agent name for enrollment.                                                     | System hostname | Any string                               |
+-----------------------------+---------------------------------------------------------------------------------------+-----------------+------------------------------------------+
| **groups**                  | Comma-separated list of groups to assign during enrollment.                           | default         | Comma-separated group names              |
+-----------------------------+---------------------------------------------------------------------------------------+-----------------+------------------------------------------+
| **authorization_pass_path** | Path to file containing enrollment authorization password.                            | None            | Valid file path                          |
+-----------------------------+---------------------------------------------------------------------------------------+-----------------+------------------------------------------+
| **agent_address**           | Agent's IP address to use for enrollment (overrides auto-detected address).           | Auto-detected   | Valid IPv4 or IPv6 address               |
+-----------------------------+---------------------------------------------------------------------------------------+-----------------+------------------------------------------+
| **delay_after_enrollment**  | Delay in seconds after successful enrollment before starting normal agent operations. | 20              | Positive integer (seconds) from 1 upward |
+-----------------------------+---------------------------------------------------------------------------------------+-----------------+------------------------------------------+
| **use_source_ip**           | Use agent's source IP address for enrollment instead of configured address.           | no              | yes, no                                  |
+-----------------------------+---------------------------------------------------------------------------------------+-----------------+------------------------------------------+

Removed options
^^^^^^^^^^^^^^^^

**The following options are no longer read, they are silently ignored with an INFO log line if present:** ``manager_address``, ``port``, ``interface_index`` (superseded by ``<agent><manager>`` - a link-local IPv6 manager's zone id now lives inside ``<endpoint>`` itself, e.g. ``[fe80::1%eth0]:1517``), ``ssl_cipher``, ``server_ca_path``, ``agent_certificate_path``, ``agent_key_path`` (superseded by ``<agent><ssl>``).

Sample configuration
---------------------

.. code-block:: xml

   <agent>
     <manager>
       <endpoint>192.168.1.100:1517</endpoint>
     </manager>
     <ssl>
       <verification_mode>none</verification_mode>
     </ssl>
     <config-profile>webserver, debian8</config-profile>
     <notify_time>60</notify_time>
     <time-reconnect>120</time-reconnect>
     <auto_restart>yes</auto_restart>
     <enrollment>
       <enabled>yes</enabled>
       <agent_name>agent</agent_name>
       <groups>Group1</groups>
       <authorization_pass_path>/path/to/agent.pass</authorization_pass_path>
       <delay_after_enrollment>20</delay_after_enrollment>
     </enrollment>
   </agent>

batch
-----

.. topic:: XML section name

   .. code-block:: xml

      <agent>
        <batch></batch>
      </agent>

This replaces ``<client_buffer>`` in Wazuh 5.0. It is nested inside ``<agent>``, not a top-level section like the old ``<client_buffer>``.

Configures the HTTPS transport's event-batching accumulator (buffering and pacing).

Sample configuration
^^^^^^^^^^^^^^^^^^^^^

.. code-block:: xml

   <agent>
     <manager>
       <endpoint>192.168.1.100</endpoint>
     </manager>
     <batch>
       <size>10MB</size>
       <interval>5s</interval>
     </batch>
   </agent>
