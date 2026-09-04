.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the auth configuration section of wazuh-manager.conf, which configures Wazuh agent enrollment.

.. _reference_wazuh_manager_conf_auth:

auth
====

.. topic:: XML section name

   .. code-block:: xml

      <auth>
      </auth>

The ``<auth>`` section configures the Wazuh enrollment service (:doc:`wazuh-manager-authd </user-manual/reference/daemons/wazuh-manager-authd>`). The service registers new agents and manages enrollment requests.

Options
-------

- `disabled`_
- `port`_
- `ipv6`_
- `use_source_ip`_
- `purge`_
- `use_password`_
- `remote_enrollment`_
- `legacy_enrollment`_
- `ciphers`_
- `ssl_agent_ca`_
- `ssl_verify_host`_
- `ssl_manager_cert`_
- `ssl_manager_key`_
- `force`_
- `agents/allow_higher_versions`_

disabled
^^^^^^^^

Disables the enrollment service entirely. When the ``<auth>`` block is present but this option is not set, the service starts (``disabled=no``).

+----------------------+-----------+
| **Default value**    | no        |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

port
^^^^

TCP port on which the enrollment service listens for incoming requests.

+----------------------+---------------------------+
| **Default value**    | 1515                      |
+----------------------+---------------------------+
| **Allowed values**   | Integer from 1 to 65535   |
+----------------------+---------------------------+

ipv6
^^^^

Enables IPv6 support for the enrollment service.

+----------------------+-----------+
| **Default value**    | no        |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

use_source_ip
^^^^^^^^^^^^^^

Register agents using their source IP address of the enrollment request instead of ``any``.

+----------------------+-----------+
| **Default value**    | no        |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

purge
^^^^^

Controls whether a deleted or replaced agent's old entry is kept as an audit trail. When an agent is removed - including the implicit removal when another agent forces it out via re-enrollment - the active ``client.keys`` entry is always deleted regardless of this setting. ``purge`` decides whether that deleted entry is also retained as a ``!``-prefixed placeholder line in ``client.keys`` (for example ``001 !oldname 1.2.3.4 <key>``), which keeps a record of the old ID/name/IP so it isn't reused. By default, the placeholder is kept; ``yes`` suppresses it, removing the entry with no trace.

+----------------------+-----------+
| **Default value**    | no        |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

use_password
^^^^^^^^^^^^^

Require agents to provide a shared enrollment password.

+----------------------+-------------------------------------+
| **Default value**    | no (the installer sets it to yes)   |
+----------------------+-------------------------------------+
| **Allowed values**   | yes, no                             |
+----------------------+-------------------------------------+

When enabled, the password is read from ``/var/wazuh-manager/etc/authd.pass``. If the file does not exist, ``wazuh-manager-authd`` generates a random password on start, stores it in that file, and reuses it on later starts. If the file exists but is empty or invalid, ``wazuh-manager-authd`` does not start.

In a Wazuh manager cluster, the enrollment password is maintained on the master node and distributed to worker nodes. A worker node rejects enrollment until it receives the file.

Agent-side setup: The Wazuh installer generates a configuration that sets ``use_password`` to ``yes`` by default. Agents must supply the enrollment password, or the manager rejects their enrollment request. First, retrieve the password from the manager:

.. code-block:: console

   $ sudo cat /var/wazuh-manager/etc/authd.pass

We recommend providing it through the ``WAZUH_REGISTRATION_PASSWORD`` install variable. This variable writes ``etc/authd.pass`` and sets its ownership and permissions automatically:

.. code-block:: console

   WAZUH_MANAGER="<WAZUH_MANAGER_IP_ADDRESS>" WAZUH_REGISTRATION_PASSWORD="<password>" apt install ./wazuh-agent.deb

To add it to an already installed agent, write the file manually. The agent daemon (``wazuh-agentd``) runs as the ``wazuh`` user, so the file must be readable by that user:

.. code-block:: console

   $ echo "<PASSWORD>" | sudo tee /var/ossec/etc/authd.pass
   $ sudo chown root:wazuh /var/ossec/etc/authd.pass
   $ sudo chmod 640 /var/ossec/etc/authd.pass

The agent reads the password from ``etc/authd.pass`` (relative to its install directory, typically ``/var/ossec/etc/authd.pass``) at startup.

**Password rotation**: The generated password persists across restarts. To rotate it (for example after a security incident), delete ``/var/wazuh-manager/etc/authd.pass`` on the master and restart ``wazuh-manager-authd``. ``wazuh-manager-authd`` generates a new random password, persists it, and distributes it to workers automatically. It logs the reuse of an existing password at ``INFO`` level on every start.

remote_enrollment
^^^^^^^^^^^^^^^^^^

Master switch for all remote (network) self-enrollment - both this daemon's own TCP/TLS listener on port 1515 and the HTTPS ``POST /enroll`` bridge served by ``remoted_module``. Disabling it turns off both at once; use ``legacy_enrollment`` to turn off only port 1515 while keeping ``/enroll``. Either way, the local socket (``queue/sockets/auth.sock``) used by ``manage_agents``/the API stays available regardless of this setting.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

legacy_enrollment
^^^^^^^^^^^^^^^^^^

Narrows ``remote_enrollment`` further, without affecting it: when ``remote_enrollment`` is ``yes``, this flag controls whether port 1515's TCP/TLS listener specifically starts. Set to ``no`` to retire legacy 1515 while keeping ``/enroll`` available. Has no effect when ``remote_enrollment`` is ``no`` (both paths are already off).

+--------------+-----------------------+-----------------------+-----------+------------------+
| ``disabled`` | ``remote_enrollment`` | ``legacy_enrollment`` | Port 1515 | ``POST /enroll`` |
+==============+=======================+=======================+===========+==================+
| yes          | --                    | --                    | off       | off              |
+--------------+-----------------------+-----------------------+-----------+------------------+
| no           | no                    | --                    | off       | off              |
+--------------+-----------------------+-----------------------+-----------+------------------+
| no           | yes                   | yes (default)         | on        | on               |
+--------------+-----------------------+-----------------------+-----------+------------------+
| no           | yes                   | no                    | off       | on               |
+--------------+-----------------------+-----------------------+-----------+------------------+

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

ciphers
^^^^^^^

Colon-separated list of TLS 1.3 cipher suites (via OpenSSL's ``SSL_CTX_set_ciphersuites``). ``wazuh-manager-authd`` requires TLS 1.3 as the minimum protocol version — legacy OpenSSL cipher-list strings (for example ``HIGH:!ADH:...``) are rejected at startup with an error.

+--------------------+--------------------------------------------------------------------------------+
| **Default value**  | TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256     |
+--------------------+--------------------------------------------------------------------------------+
| **Allowed values** | Colon-separated combination of TLS_AES_128_GCM_SHA256, TLS_AES_256_GCM_SHA384, |
|                    | TLS_CHACHA20_POLY1305_SHA256, TLS_AES_128_CCM_SHA256, TLS_AES_128_CCM_8_SHA256 |
+--------------------+--------------------------------------------------------------------------------+

ssl_agent_ca
^^^^^^^^^^^^^

Path to the CA certificate used to verify agent client certificates during mutual TLS.

+----------------------+--------------------------------------------------------------------------------------+
| **Default value**    | none (agent certificate verification disabled)                                       |
+----------------------+--------------------------------------------------------------------------------------+
| **Allowed values**   | Path to a PEM-encoded CA certificate. The file must exist when the service starts.   |
+----------------------+--------------------------------------------------------------------------------------+

ssl_verify_host
^^^^^^^^^^^^^^^^

Verify that the CN of the agent certificate matches the Wazuh agent's IP address. Requires ``ssl_agent_ca`` to be set.

+----------------------+-----------+
| **Default value**    | no        |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

ssl_manager_cert
^^^^^^^^^^^^^^^^^

Path to the Wazuh manager's TLS certificate presented to agents during enrollment.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | etc/certs/remoted.pem (resolved relative to the Wazuh install directory, for example         |
|                      | /var/wazuh-manager/etc/certs/remoted.pem)                                                    |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | Path to a PEM-encoded certificate (relative paths resolved from the Wazuh install directory) |
+----------------------+----------------------------------------------------------------------------------------------+

ssl_manager_key
^^^^^^^^^^^^^^^^

Path to the private key corresponding to ``ssl_manager_cert``.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | etc/certs/remoted-key.pem (resolved relative to the Wazuh install directory)                 |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | Path to a PEM-encoded private key (relative paths resolved from the Wazuh install directory) |
+----------------------+----------------------------------------------------------------------------------------------+

force
^^^^^

The ``<force>`` element configures the conditions under which an existing agent entry can be replaced during enrollment.

.. code-block:: xml

   <force>
     <enabled>yes</enabled>
     <key_mismatch>yes</key_mismatch>
     <disconnected_time enabled="yes">1h</disconnected_time>
     <after_registration_time>1h</after_registration_time>
   </force>

force/enabled
~~~~~~~~~~~~~~

Allow forced re-enrollment (overwrite an existing agent entry).

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

force / key_mismatch
~~~~~~~~~~~~~~~~~~~~~~

Force re-enrollment when an agent reconnects with a key that does not match what the manager has stored.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

force / disconnected_time
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Minimum time an agent must have been disconnected before it can be forcibly re-enrolled. The ``enabled`` attribute gates this check. The value is the duration; ``enabled`` controls whether the check is active.

+----------------------+---------------------------------------------------------------------------+
| **Default value**    | 1h with enabled="yes"                                                     |
+----------------------+---------------------------------------------------------------------------+
| **Allowed values**   | Time value with optional suffix - s, m, h, d; attribute enabled: yes/no   |
+----------------------+---------------------------------------------------------------------------+

.. code-block:: xml

   <!-- Enable the check, require 2h disconnection -->
   <disconnected_time enabled="yes">2h</disconnected_time>
   <!-- Disable the check entirely -->
   <disconnected_time enabled="no">0</disconnected_time>

force / after_registration_time
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Minimum time since an agent was last registered before a forced re-enrollment is permitted. This prevents an agent from being replaced immediately after its initial enrollment.

+----------------------+------------------------------------------------+
| **Default value**    | 1h                                             |
+----------------------+------------------------------------------------+
| **Allowed values**   | Time value with optional suffix - s, m, h, d   |
+----------------------+------------------------------------------------+

agents/allow_higher_versions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Accept enrollment from agents running a newer Wazuh version than the manager.

+----------------------+-----------+
| **Default value**    | no        |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

.. note::
   This option controls the enrollment gate (authd, port 1515). There is an independent option with the same name under ``<remote><agents>`` that controls the connection gate (remoted, port 1514). Both options must be set to ``yes`` for a higher-version agent to enroll and connect. If enrollment is allowed but connection is not, the agent can obtain an authentication key but cannot establish communication with the Wazuh manager.

.. code-block:: xml

   <agents>
     <allow_higher_versions>no</allow_higher_versions>
   </agents>

Sample configuration
---------------------

.. code-block:: xml

   <auth>
     <disabled>no</disabled>
     <port>1515</port>
     <use_source_ip>no</use_source_ip>
     <purge>yes</purge>
     <use_password>yes</use_password>
     <ssl_verify_host>no</ssl_verify_host>
     <ssl_manager_cert>etc/certs/remoted.pem</ssl_manager_cert>
     <ssl_manager_key>etc/certs/remoted-key.pem</ssl_manager_key>
     <force>
       <enabled>yes</enabled>
       <key_mismatch>yes</key_mismatch>
       <disconnected_time enabled="yes">1h</disconnected_time>
       <after_registration_time>1h</after_registration_time>
     </force>
   </auth>
