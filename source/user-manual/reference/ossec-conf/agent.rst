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
- `disable-active-response`_
- `stats_report`_
- `config_report`_
- `ip_update_interval`_
- `crypto_method`_
- `enrollment`_

manager
^^^^^^^

Manager connection configuration block.

endpoint
~~~~~~~~

The complete connection target: the Wazuh manager's address, optionally a port, and optionally a URL path prefix. This replaces the separate ``address`` and ``port`` tags.

+--------------------+-------------------------------------------------------------------------------------------------+
| **Required**       | Yes (host is the only mandatory part)                                                           |
+--------------------+-------------------------------------------------------------------------------------------------+
| **Allowed values** | [ "``https://``" ] host [ ":" port ] [ "/" [ prefix ] ] - host is an IPv4 address, hostname, or |
|                    | bracketed IPv6 literal. Port defaults to 1517.                                                  |
+--------------------+-------------------------------------------------------------------------------------------------+
| **Example**        | ``192.168.1.100``, ``manager.example.com:8443/gateway``, ``[2001:db8::1]:1517``                 |
+--------------------+-------------------------------------------------------------------------------------------------+

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

+-----------------------------+-----------------------------------------------------------------------+-----------------------------------------------------------------+----------------------------------------------------------------------+
| Option                      | Description                                                           | Default                                                         | Allowed values                                                       |
+=============================+=======================================================================+=================================================================+======================================================================+
| ``certificate``             | Optional client (mTLS) certificate the agent presents to the manager. | None                                                            | Path to a PEM-encoded certificate file, readable by the agent        |
|                             | Must be set together with ``key`` - setting only one of the two is    |                                                                 |                                                                      |
|                             | rejected.                                                             |                                                                 |                                                                      |
+-----------------------------+-----------------------------------------------------------------------+-----------------------------------------------------------------+----------------------------------------------------------------------+
| ``key``                     | Private key matching ``certificate``. Must be set together with       | None                                                            | Path to a PEM-encoded private key file, readable by the agent        |
|                             | ``certificate``.                                                      |                                                                 |                                                                      |
+-----------------------------+-----------------------------------------------------------------------+-----------------------------------------------------------------+----------------------------------------------------------------------+
| ``certificate_authorities`` | CA bundle used to verify the manager's certificate - a flat path      | None                                                            | Path to a PEM-encoded CA bundle file, readable by the agent          |
|                             | value, not a container. Required when ``verification_mode`` is        |                                                                 |                                                                      |
|                             | ``full`` or ``certificate`` (agent fails closed without it). Must NOT |                                                                 |                                                                      |
|                             | be set when ``verification_mode`` is ``system``. Ignored (with a      |                                                                 |                                                                      |
|                             | warning if unreadable) when ``verification_mode`` is ``none``.        |                                                                 |                                                                      |
+-----------------------------+-----------------------------------------------------------------------+-----------------------------------------------------------------+----------------------------------------------------------------------+
| ``verification_mode``       | How strictly the agent verifies the manager's TLS certificate.        | Depends on the trust material available: ``certificate`` when   | ``none`` (no verification - insecure, testing only). ``certificate`` |
|                             |                                                                       | ``certificate_authorities`` is set; otherwise ``full`` when the | (verify against CA, no hostname check) ``full`` (verify + hostname)  |
|                             |                                                                       | enrollment CA file ``etc/certs/root-ca.pem`` exists; otherwise  | ``system`` (verify against the OS trust store instead of             |
|                             |                                                                       | ``none``.                                                       | ``certificate_authorities``). Any other value is rejected at config- |
|                             |                                                                       |                                                                 | parse time.                                                          |
+-----------------------------+-----------------------------------------------------------------------+-----------------------------------------------------------------+----------------------------------------------------------------------+
| ``ciphers``                 | TLS 1.3 ciphersuite list to offer during the handshake.               | None (libcurl/OpenSSL TLS 1.3 default)                          | Colon-separated list of TLS 1.3 ciphersuite names, e.g.              |
|                             |                                                                       |                                                                 | ``TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256``              |
+-----------------------------+-----------------------------------------------------------------------+-----------------------------------------------------------------+----------------------------------------------------------------------+

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
| **Default value**  | 10                          |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

.. note::
   Set this value lower than the agent disconnection time configured on the Wazuh manager. This ensures that the agent sends a keepalive before the manager marks it as disconnected.

time-reconnect
^^^^^^^^^^^^^^^

.. deprecated:: 5.0.0

   This option has no effect in Wazuh 5.0. The Wazuh agent sends its data over HTTPS and keeps no persistent connection to reconnect. The option is still accepted so configurations from Wazuh 4.x agents don't fail, and the Wazuh agent logs a deprecation warning when it finds it.

auto_restart
^^^^^^^^^^^^^

Toggles on and off the automatic restart of agents when a new valid configuration is received from the manager.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

disable-active-response
^^^^^^^^^^^^^^^^^^^^^^^^^

Disables active response on the Wazuh agent. When set to ``yes``, the Wazuh agent doesn't run active response commands.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

stats_report
^^^^^^^^^^^^

Periodically sends Wazuh agent statistics to the Wazuh manager.

+--------------+--------------------------------+---------+--------------------------------------------------+
| Option       | Description                    | Default | Allowed values                                   |
+==============+================================+=========+==================================================+
| ``enabled``  | Enables the statistics report. | no      | yes, no                                          |
+--------------+--------------------------------+---------+--------------------------------------------------+
| ``interval`` | Time between reports.          | 60s     | Positive time value with optional suffix s, m, h |
|              |                                |         | or d. Maximum 86400s (1d).                       |
+--------------+--------------------------------+---------+--------------------------------------------------+

config_report
^^^^^^^^^^^^^

Periodically sends a snapshot of the Wazuh agent configuration to the Wazuh manager.

+--------------+-----------------------------------+------------+--------------------------------------------------+
| Option       | Description                       | Default    | Allowed values                                   |
+==============+===================================+============+==================================================+
| ``enabled``  | Enables the configuration report. | yes        | yes, no                                          |
+--------------+-----------------------------------+------------+--------------------------------------------------+
| ``interval`` | Time between reports.             | 3600s (1h) | Positive time value with optional suffix s, m, h |
|              |                                   |            | or d. Maximum 86400s (1d).                       |
+--------------+-----------------------------------+------------+--------------------------------------------------+

ip_update_interval
^^^^^^^^^^^^^^^^^^^

.. deprecated:: 5.0.0

   This option has no effect in Wazuh 5.0. It is still accepted, and the Wazuh agent logs a deprecation warning when it finds it.

crypto_method
^^^^^^^^^^^^^^

DEPRECATED: This option is parsed but ignored. Encryption method is hard-coded to AES.

+----------------------+---------------------------------------------------+
| **Status**           | Deprecated (kept for backward compatibility)      |
+----------------------+---------------------------------------------------+
| **Behavior**         | Always uses AES regardless of configured value    |
+----------------------+---------------------------------------------------+

.. _reference_ossec_agent_enrollment:

enrollment
^^^^^^^^^^^

Agent auto-enrollment configuration block (optional). Runs over the same HTTPS channel and TLS material as everything else since 5.0.0 — it dials ``<agent><manager>`` and presents ``<agent><ssl>``, instead of opening a second connection to authd on port 1515. There is no longer a separate address/port/cert configuration for enrollment.

Sub options

+-----------------------------+--------------------------------------------------------------+--------------------+------------------------------------------+
| Option                      | Description                                                  | Default            | Allowed values                           |
+=============================+==============================================================+====================+==========================================+
| **enabled**                 | Enable automatic agent enrollment.                           | yes                | yes, no                                  |
+-----------------------------+--------------------------------------------------------------+--------------------+------------------------------------------+
| **agent_name**              | Custom agent name for enrollment.                            | System hostname    | Any string                               |
+-----------------------------+--------------------------------------------------------------+--------------------+------------------------------------------+
| **groups**                  | Comma-separated list of groups to assign during enrollment.  | default            | Comma-separated group names              |
+-----------------------------+--------------------------------------------------------------+--------------------+------------------------------------------+
| **authorization_pass_path** | Path to file containing enrollment authorization password.   | ``etc/authd.pass`` | Valid file path                          |
+-----------------------------+--------------------------------------------------------------+--------------------+------------------------------------------+
| **agent_address**           | Agent's IP address to use for enrollment (overrides          | Auto-detected      | Valid IPv4 or IPv6 address               |
|                             | auto-detected address).                                      |                    |                                          |
+-----------------------------+--------------------------------------------------------------+--------------------+------------------------------------------+
| **delay_after_enrollment**  | Delay in seconds after successful enrollment before starting | 20                 | Positive integer (seconds) from 1 upward |
|                             | normal agent operations.                                     |                    |                                          |
+-----------------------------+--------------------------------------------------------------+--------------------+------------------------------------------+
| **use_source_ip**           | Use agent's source IP address for enrollment instead of      | no                 | yes, no                                  |
|                             | configured address.                                          |                    |                                          |
+-----------------------------+--------------------------------------------------------------+--------------------+------------------------------------------+

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

Options
^^^^^^^

+--------------+---------------------------------------------------+------------+--------------------------------------------------+
| Option       | Description                                       | Default    | Allowed values                                   |
+==============+===================================================+============+==================================================+
| ``size``     | Maximum size of a batch of events.                | 1M (1 MiB) | Size in bytes, or with a K, M or G suffix (for   |
|              |                                                   |            | example ``512K`` or ``10MB``). Maximum 1G.       |
+--------------+---------------------------------------------------+------------+--------------------------------------------------+
| ``interval`` | Maximum time the Wazuh agent waits before sending | 10s        | Positive time value with optional suffix s, m, h |
|              | a batch.                                          |            | or d. Maximum 86400s (1d).                       |
+--------------+---------------------------------------------------+------------+--------------------------------------------------+

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
