.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the remote configuration section of wazuh-manager.conf, which configures the listeners that receive events from Wazuh agents.

.. _reference_wazuh_manager_conf_remote:

remote
======

.. topic:: XML section name

   .. code-block:: xml

      <remote>
      </remote>

The ``<remote>`` section configures the Wazuh manager listeners that receive connections from Wazuh agents. Wazuh 5.0 managers accept two kinds of agent connections at once: a legacy TCP/UDP listener for Wazuh 4.x agents (``<legacy>``), and an HTTPS listener for Wazuh 5.0 agents (``<https>``). Both can be active simultaneously; ``<https>`` has no enable/disable toggle of its own; it always attempts to start and self-gates on the presence of a valid certificate and key.

Legacy listener options (``<legacy>``)
----------------------------------------

.. topic:: XML section name

   .. code-block:: xml

      <remote>
        <legacy>
        </legacy>
      </remote>

- `enabled`_
- `ca_delivery`_
- :ref:`port <reference_wazuh_manager_conf_remote_legacy_port>`
- `protocol`_
- `ipv6`_
- `local_ip`_
- `queue_size`_
- `rids_closing_time`_
- `connection_overtake_time`_
- `agents/allow_higher_versions`_

enabled
^^^^^^^^

Enables the classic TCP/UDP listener that serves 4.x agents.

+--------------------+-----------------------------------------------------------------------------------+
| **Default value**  | yes, when ``<legacy>`` is present. The absence of the whole ``<legacy>`` block is |
|                    | equivalent to ``no``                                                              |
+--------------------+-----------------------------------------------------------------------------------+
| **Allowed values** | yes, no                                                                           |
+--------------------+-----------------------------------------------------------------------------------+

.. note::
   With ``no``, remoted binds no legacy socket and only 5.x agents (served over ``<https>``) can connect. Disabling this also causes remote-upgrade task creation for agents below v5.0.0 to be rejected at creation time.

ca_delivery
^^^^^^^^^^^^

Sends the Wazuh manager CA certificate to Wazuh agents below v5.0.0 during a remote upgrade, over the WPK transfer channel, so the upgraded agent has a trust anchor. Disable it when a corporate PKI or a configuration-management tool distributes the CA certificate instead.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

.. _reference_wazuh_manager_conf_remote_legacy_port:

port
^^^^

Port on which the Wazuh manager listens for incoming agent connections.

+----------------------+---------------------------+
| **Default value**    | 1514                      |
+----------------------+---------------------------+
| **Allowed values**   | Integer from 1 to 65535   |
+----------------------+---------------------------+

protocol
^^^^^^^^

Network protocol used for agent communication. Specify one protocol or a comma-separated pair to enable both protocols.

+----------------------+-------------+
| **Default value**    | tcp         |
+----------------------+-------------+
| **Allowed values**   | - tcp       |
|                      | - udp       |
|                      | - tcp,udp   |
|                      | - udp,tcp   |
+----------------------+-------------+

The order of the values does not affect the configuration.

ipv6
^^^^

Enable IPv6 support for this listener.

+----------------------+-----------+
| **Default value**    | no        |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

local_ip
^^^^^^^^

Local IP address to which the listener binds. Use this option on hosts with multiple network interfaces.

+--------------------+---------------------------------------------------------------------------------------------+
| **Default value**  | 0.0.0.0 (all IPv4 interfaces) when ``ipv6`` is ``no``; ``::`` (all IPv6 interfaces) when    |
|                    | ``ipv6`` is ``yes``                                                                         |
+--------------------+---------------------------------------------------------------------------------------------+
| **Allowed values** | Any valid IPv4 or IPv6 address configured on the host. IPv6 addresses are expanded to their |
|                    | full form.                                                                                  |
+--------------------+---------------------------------------------------------------------------------------------+

queue_size
^^^^^^^^^^

Maximum number of messages that the internal queue can hold while worker threads process incoming events.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | 131072                                                                                       |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | Positive integer (minimum: 1). Values above 262144 generate a startup warning about          |
|                      | potential increase in memory usage.                                                          |
+----------------------+----------------------------------------------------------------------------------------------+

rids_closing_time
^^^^^^^^^^^^^^^^^^

Time after which the Wazuh manager closes inactive agent RIDS (registration identifier) file handles to release file descriptors.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | 300 (5 minutes)                                                                              |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | Positive time value with optional suffix - s, m, h, d. The value 300 without a suffix is     |
|                      | treated as seconds.                                                                          |
+----------------------+----------------------------------------------------------------------------------------------+

connection_overtake_time
^^^^^^^^^^^^^^^^^^^^^^^^^

Time, in seconds, that the Wazuh manager waits before allowing a new connection to replace an existing connection for the same Wazuh agent. Set this option to ``0`` to disable connection overtake protection.

+----------------------+--------------------------+
| **Default value**    | 60                       |
+----------------------+--------------------------+
| **Allowed values**   | Integer from 0 to 3600   |
+----------------------+--------------------------+

agents/allow_higher_versions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Controls whether the listener accepts connections from agents running a newer Wazuh version than the Wazuh manager.

+----------------------+-----------+
| **Default value**    | no        |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

.. note::
   This option controls the connection gate (remoted, port 1514). There is an independent option with the same name under ``<auth><agents>`` that controls the enrollment gate (authd, port 1515). Both must be set to ``yes`` for a higher-version agent to enroll and connect. If you set them differently, for example allowing connection but not enrollment, agents cannot obtain keys and therefore cannot communicate.

The ``<allow_higher_versions>`` option is nested under an ``<agents>`` sub-element:

.. code-block:: xml

   <remote>
     <agents>
       <allow_higher_versions>no</allow_higher_versions>
     </agents>
   </remote>

HTTPS listener options (``<https>``)
----------------------------------------

.. topic:: XML section name

   .. code-block:: xml

      <remote>
        <https>
        </https>
      </remote>

All options are optional. An absent ``<https>`` block, or an absent individual option, falls back to built-in defaults.

- :ref:`port <reference_wazuh_manager_conf_remote_https_port>`
- `bind_addr`_
- `global_prefix`_
- `dual_stack`_
- `certificate`_
- `key`_
- `ca`_
- `ca_certificate`_
- `verification_mode`_
- `ciphers`_
- `max_body_size`_
- `enroll_rate_limit`_
- `cacerts_rate_limit`_

.. _reference_wazuh_manager_conf_remote_https_port:

port
^^^^

Port on which the Wazuh manager listens for incoming agent connections.

+----------------------+---------------------------+
| **Default value**    | 1517                      |
+----------------------+---------------------------+
| **Allowed values**   | Integer from 1 to 65535   |
+----------------------+---------------------------+

bind_addr
^^^^^^^^^

Address the HTTPS listener binds to.

+--------------------+----------------------------------------------------------------------------------------+
| **Default value**  | 0.0.0.0 (all IPv4 interfaces). The listener is reachable from any interface unless you |
|                    | restrict it.                                                                           |
+--------------------+----------------------------------------------------------------------------------------+
| **Allowed values** | Valid IPv4 or IPv6 address                                                             |
+--------------------+----------------------------------------------------------------------------------------+

global_prefix
^^^^^^^^^^^^^

URL path prefix every HTTPS endpoint is served under (for example, with ``/wazuh-manager/`` configured, the health probe is ``GET /wazuh-manager/``). This is a URL routing path, unrelated to the ``/var/wazuh-manager`` install directory.

+--------------------+-------------------------------------+
| **Default value**  | ``/wazuh-manager/``                 |
+--------------------+-------------------------------------+
| **Allowed values** | ``/``, or ``/segment[/segment...]`` |
+--------------------+-------------------------------------+

dual_stack
^^^^^^^^^^

Whether an IPv6 ``bind_addr`` also accepts IPv4 clients on the same socket.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | no (force IPv6-only)                                                                         |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | yes (force dual-stack on), no (force IPv6-only); any other value is rejected as a            |
|                      | configuration error                                                                          |
+----------------------+----------------------------------------------------------------------------------------------+

certificate
^^^^^^^^^^^

Path to the TLS certificate chain (PEM) presented by the server.

+----------------------+------------------------------+
| **Default value**    | etc/certs/remoted.pem        |
+----------------------+------------------------------+

key
^^^

Path to the TLS private key (PEM) matching ``certificate``.

+-------------------+---------------------------+
| **Default value** | etc/certs/remoted-key.pem |
+-------------------+---------------------------+

ca
^^

Path to a CA bundle (PEM) used to verify client (agent) certificates.

+-------------------+---------------------------------------------------------------------------------------------+
| **Default value** | Empty (agent certificate verification disabled). If ``verification_mode`` is set explicitly |
|                   | and ``ca`` is empty, ``etc/certs/root-ca.pem`` is used.                                     |
+-------------------+---------------------------------------------------------------------------------------------+

ca_certificate
^^^^^^^^^^^^^^

Path to the CA certificate that signs the HTTPS listener certificate. The Wazuh manager serves it on ``GET /cacerts``, and enrollment tokens pin it. This is not the CA used to verify agent certificates (``ca``).

+-------------------+-----------------------+
| **Default value** | etc/certs/root-ca.pem |
+-------------------+-----------------------+

verification_mode
^^^^^^^^^^^^^^^^^^

Client-certificate verification strictness.

+--------------------+----------------------------------------------------------------------------------------------+
| **Default value**  | ``certificate`` when ``ca`` is set; ``none`` otherwise.                                      |
+--------------------+----------------------------------------------------------------------------------------------+
| **Allowed values** | none - the client certificate is not verified. certificate - the client certificate chain is |
|                    | validated against ``ca``. full - same as certificate, plus the address the peer connects     |
|                    | from must appear as an IP entry in that certificate's Subject Alternative Name.              |
+--------------------+----------------------------------------------------------------------------------------------+

ciphers
^^^^^^^

TLS 1.3 ciphersuite override for the HTTPS listener (``SSL_CTX_set_ciphersuites()`` naming scheme, for example ``TLS_AES_256_GCM_SHA384``). The listener requires TLS 1.3 as its minimum protocol version.

+-------------------+----------------------------------------------------------------------------+
| **Default value** | TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256 |
+-------------------+----------------------------------------------------------------------------+

max_body_size
^^^^^^^^^^^^^

Maximum accepted HTTP request body size.

+--------------------+-----------------------------------------------------------------------------------------+
| **Default value**  | 10M (10 MiB)                                                                            |
+--------------------+-----------------------------------------------------------------------------------------+
| **Allowed values** | Size with an optional unit suffix: B, K, M or G (case-insensitive). A bare number is in |
|                    | bytes.                                                                                  |
+--------------------+-----------------------------------------------------------------------------------------+

enroll_rate_limit
^^^^^^^^^^^^^^^^^

Maximum sustained number of requests per second that the Wazuh manager serves across ``POST /enroll`` and ``POST /enroll/secret`` together. The limit applies to the manager as a whole, not per agent. Requests above the limit receive HTTP 429. Short bursts of up to twice the value are absorbed. Set it to ``0`` to disable the limit.

+--------------------+--------------------------+
| **Default value**  | 100                      |
+--------------------+--------------------------+
| **Allowed values** | Integer from 0 to 100000 |
+--------------------+--------------------------+

cacerts_rate_limit
^^^^^^^^^^^^^^^^^^

Maximum sustained number of ``GET /cacerts`` requests per second that the Wazuh manager serves. The limit applies to the manager as a whole, not per agent. Requests above the limit receive HTTP 429. Short bursts of up to twice the value are absorbed. Set it to ``0`` to disable the limit.

+--------------------+--------------------------+
| **Default value**  | 50                       |
+--------------------+--------------------------+
| **Allowed values** | Integer from 0 to 100000 |
+--------------------+--------------------------+

Sample configuration
---------------------

.. code-block:: xml

   <remote>
     <https>
       <port>1517</port>
       <bind_addr>0.0.0.0</bind_addr>
       <global_prefix>/wazuh-manager/</global_prefix>
       <certificate>etc/certs/remoted.pem</certificate>
       <key>etc/certs/remoted-key.pem</key>
     </https>
     <legacy>
       <enabled>yes</enabled>
       <port>1514</port>
       <protocol>tcp</protocol>
       <local_ip>0.0.0.0</local_ip>
       <queue_size>131072</queue_size>
     </legacy>
     <agents>
       <allow_higher_versions>no</allow_higher_versions>
     </agents>
   </remote>
