.. Copyright (C) 2021 Wazuh, Inc.

.. _reference_ossec_client:

client
======

.. topic:: XML section name

	.. code-block:: xml

		<client>
		</client>

This section explains how to configure the connection to the manager.

Subsections
-----------

- `server`_
- `enrollment`_

server
^^^^^^

.. versionadded:: 3.0.0

Configures the connection parameters for each server an agent connects to.

Server subsection options
-------------------------

- `address`_
- :ref:`port <server_port>`
- :ref:`protocol <server_protocol>`
- `max_retries`_
- `retry_interval`_

.. _server_address:

address
^^^^^^^^

Specifies the IP address or the hostname of the Wazuh manager.

+--------------------+-------------------------------------------------------------+
| **Default value**  | n/a                                                         |
+--------------------+-------------------------------------------------------------+
| **Allowed values** | Any valid IP address or any resolvable hostname is allowed. |
+--------------------+-------------------------------------------------------------+

.. _server_port:

port
^^^^

Specifies the port to send events to on the manager.  This must match the associated listening port configured on the Wazuh manager.

+--------------------+---------------------------------------------+
| **Default value**  | 1514                                        |
+--------------------+---------------------------------------------+
| **Allowed values** | Any port number from 1 to 65535 is allowed. |
+--------------------+---------------------------------------------+

.. _server_protocol:

protocol
^^^^^^^^

Specifies the protocol to use when connecting to the manager.

+--------------------+----------+
| **Default value**  | tcp      |
+--------------------+----------+
| **Allowed values** | udp, tcp |
+--------------------+----------+

.. _server_max_retries:

max_retries
^^^^^^^^^^^

.. versionadded:: 3.13.1

Number of connection retries.

+--------------------+--------------------+
| **Default value**  | 5                  |
+--------------------+--------------------+
| **Allowed values** | 1 to 1.000.000.000 |
+--------------------+--------------------+

.. _server_retry_interval:

retry_interval
^^^^^^^^^^^^^^

.. versionadded:: 3.13.1

Time interval between connection attempts (seconds).

+--------------------+--------------------+
| **Default value**  | 10                 |
+--------------------+--------------------+
| **Allowed values** | 1 to 1.000.000.000 |
+--------------------+--------------------+

Options
-------

- :ref:`server-ip <legacy_server-ip>`
- :ref:`server-hostname <legacy_server-hostname>`
- :ref:`port <legacy_port>`
- :ref:`protocol <legacy_protocol>`
- `config-profile`_
- `notify_time`_
- `time-reconnect`_
- `force_reconnect_interval`_
- `ip_update_interval`_
- `local_ip`_
- `disable-active-response`_
- `auto_restart`_
- `crypto_method`_

.. _legacy_server-ip:

server-ip
^^^^^^^^^

.. deprecated:: 3.0.0

Specifies the IP address of the Wazuh manager.

+--------------------+----------------------------------+
| **Default value**  | n/a                              |
+--------------------+----------------------------------+
| **Allowed values** | Any valid IP address is allowed. |
+--------------------+----------------------------------+


.. _legacy_server-hostname:

server-hostname
^^^^^^^^^^^^^^^

.. deprecated:: 3.0.0

Specifies the hostname of the Wazuh manager.

+--------------------+-------------------------------------+
| **Default value**  | n/a                                 |
+--------------------+-------------------------------------+
| **Allowed values** | Any resolvable hostname is allowed. |
+--------------------+-------------------------------------+

.. warning::
		This parameter is incompatible with `server-ip`_. Since version 3.0, these fields have been merged into a single field called `address` that accepts both formats.

.. _legacy_port:

port
^^^^

.. deprecated:: 3.0.0

Specifies the port on the manager to send events to.  This must match the associated listening port configured on the Wazuh manager.

+--------------------+---------------------------------------------+
| **Default value**  | 1514                                        |
+--------------------+---------------------------------------------+
| **Allowed values** | Any port number from 1 to 65535 is allowed. |
+--------------------+---------------------------------------------+

.. _legacy_protocol:

protocol
^^^^^^^^

.. deprecated:: 3.0.0

Specifies the protocol to use when connecting to manager.

+--------------------+----------+
| **Default value**  | tcp      |
+--------------------+----------+
| **Allowed values** | udp, tcp |
+--------------------+----------+

.. _reference_ossec_client_config_profile:

config-profile
^^^^^^^^^^^^^^

Specifies the ``agent.conf`` profile(s) to be used by the agent.

+--------------------+----------------------------------------------------------------------+
| **Default value**  | n/a                                                                  |
+--------------------+----------------------------------------------------------------------+
| **Allowed values** | Multiple profiles can be included, separated by a comma and a space. |
+--------------------+----------------------------------------------------------------------+

.. _notify_time:

notify_time
^^^^^^^^^^^

Specifies the time in seconds between agent checkins to the manager.  More frequent checkins speed up dissemination of an updated ``agent.conf`` file to the agents, but may also put an undo load on the manager if there are a large number of agents.

+--------------------+-----------------------------+
| **Default value**  | 10                          |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

.. warning::

  This setting should always be lower than :ref:`disconnection time <reference_agents_disconnection_time>` configured for the agents in the manager. This allows them to always notify the manager before it would consider them disconnected.

.. _time_reconnect:

time-reconnect
^^^^^^^^^^^^^^

Specifies the time in seconds before a reconnection is attempted. This should be set to a higher number than the ``notify_time`` parameter.

For example, a ``notify_time`` setting of 60 combined with a time-reconnect of 300 would mean that agents will attempt to check in once per minute, but if a checkin attempt fails to get a response from the manager, the agent will wait five minutes before trying again.  Checkins will resume their normal one-minute interval following a successful connection attempt.

+--------------------+-----------------------------+
| **Default value**  | 60                          |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

.. warning::
	Notice that the ``notify_time`` value uses an underscore while the ``time-reconnect`` value uses a dash.  This is an unfortunate legacy naming inconsistency that is easy to mix up.

  .. _force_reconnect_interval:

force_reconnect_interval
^^^^^^^^^^^^^^^^^^^^^^^^

.. versionadded:: 4.3.0

Specifies the time after which the agent is forced to be reconnected to the manager. The reconnection is forced to be done even if the agent is having a successful two-way communication with the manager.

+--------------------+--------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 0s (disabled)                                                                                                                                    |
+--------------------+--------------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should end with a character indicating a time unit, such as: s (seconds), m (minutes), h (hours), d (days), or w (weeks). |
+--------------------+--------------------------------------------------------------------------------------------------------------------------------------------------+

.. _ip_update_interval:

ip_update_interval
^^^^^^^^^^^^^^^^^^

.. versionadded:: 4.2.0

Specifies how often an agent will query the control module for its main IP.


Any value equal to or lower than the configured ``notify_time`` will cause the IP to be queried on each keep-alive message.

+--------------------+-----------------------------+
| **Default value**  | 0                           |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

 .. note:: Most systems won't need to modify this value, but on systems with large routing tables this configuration can help lower CPU usage from wazuh-modulesd.

local_ip
^^^^^^^^

Specifies which IP address will be used to communicate with the manager when the agent has multiple network interfaces.

+--------------------+----------------------------------+
| **Default value**  | n/a                              |
+--------------------+----------------------------------+
| **Allowed values** | Any valid IP address is allowed. |
+--------------------+----------------------------------+

disable-active-response
^^^^^^^^^^^^^^^^^^^^^^^

**Deprecated:**

.. warning::

        This is an obsolete method to disable active response. The recommended way is by configuring as shown in the :doc:`active-response <active-response>` section.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

auto_restart
^^^^^^^^^^^^

Toggles on and off the automatic restart of agents when a new valid configuration is received from the manager.

+--------------------+---------------------+
| **Default value**  | yes                 |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

crypto_method
^^^^^^^^^^^^^

.. versionadded:: 3.5.0

Choose the encryption of the messages that the agent sends to the manager.

+--------------------+---------------------+
| **Default value**  | aes                 |
+--------------------+---------------------+
| **Allowed values** | blowfish, aes       |
+--------------------+---------------------+

Sample configuration
--------------------

.. code-block:: xml

    <client>
      <server>
        <address>192.168.1.100</address>
        <port>1514</port>
        <protocol>tcp</protocol>
        <max_retries>5</max_retries>
        <retry_interval>5</retry_interval>
      </server>
      <server>
        <address>example.hostname</address>
        <protocol>udp</protocol>
      </server>
      <config-profile>webserver, debian8</config-profile>
      <notify_time>30</notify_time>
      <time-reconnect>120</time-reconnect>
      <auto_restart>yes</auto_restart>
    </client>

enrollment
^^^^^^^^^^

.. versionadded:: 4.0

Configures the connection parameters for the agent enrollment.

Options
-------

- `enabled`_
- `manager_address`_
- :ref:`port <enrollment_port>`
- `agent_name`_
- `groups`_
- `agent_address`_
- `ssl_cipher`_
- `server_ca_path`_
- `agent_certificate_path`_
- `agent_key_path`_
- `authorization_pass_path`_
- `auto_method`_
- `delay_after_enrollment`_
- `use_source_ip`_

enabled
^^^^^^^

Enables/disables agent enrollment.

+--------------------+----------------------------------+
| **Default value**  | yes                              |
+--------------------+----------------------------------+
| **Allowed values** | yes or no                        |
+--------------------+----------------------------------+

manager_address
^^^^^^^^^^^^^^^

Hostname or IP of the manager where the agent will be enrolled. If no value is set, the agent will try enrolling to the same manager that was specified for connection.

+--------------------+---------------------------------------+
| **Default value**  | n/a                                   |
+--------------------+---------------------------------------+
| **Allowed values** | string -  Should be valid IP/Hostname |
+--------------------+---------------------------------------+

.. _enrollment_port:

port
^^^^

Specifies the port on the manager to send enrollment request.  This must match the associated listening port configured on the Wazuh manager.

+--------------------+---------------------------------------------+
| **Default value**  | 1515                                        |
+--------------------+---------------------------------------------+
| **Allowed values** | Any port number from 0 to 65535 is allowed. |
+--------------------+---------------------------------------------+

agent_name
^^^^^^^^^^

Agent name that will be used for enrollment. Only alphanumeric characters, "-", "_" or "." are allowed, and the minimum length is two characters.

+--------------------+---------------------------------------------+
| **Default value**  | Hostname of the machine.                    |
+--------------------+---------------------------------------------+
| **Allowed values** | string - Registration name for the agent.   |
+--------------------+---------------------------------------------+

groups
^^^^^^

Groups name to which the agent belongs.

+--------------------+---------------------------------------------+
| **Default value**  | NULL                                        |
+--------------------+---------------------------------------------+
| **Allowed values** | string - Name of one or many valid groups.  |
+--------------------+---------------------------------------------+

agent_address
^^^^^^^^^^^^^

Force IP address from the agent. If this is not set manager will extract source IP from enrollment message.

+--------------------+---------------------------------------------+
| **Default value**  | src                                         |
+--------------------+---------------------------------------------+
| **Allowed values** | string - Valid IP.                          |
+--------------------+---------------------------------------------+

ssl_cipher
^^^^^^^^^^

Override SSL used ciphers.

+--------------------+----------------------------------------------------+
| **Default value**  | ECDHE+AESGCM:!ECDSA                                |
+--------------------+----------------------------------------------------+
| **Allowed values** | valid ssl ciphers.                                 |
+--------------------+----------------------------------------------------+

server_ca_path
^^^^^^^^^^^^^^

Used for manager verification. If no CA certificate is set server will not be verified.

+--------------------+---------------------------------------------+
| **Default value**  | NULL                                        |
+--------------------+---------------------------------------------+
| **Allowed values** | Path to a valid CA certificate.             |
+--------------------+---------------------------------------------+

.. note::
  Paths can be referred to relative paths under the Wazuh installation directory, or full paths.

agent_certificate_path
^^^^^^^^^^^^^^^^^^^^^^

Required when agent verification is enabled in the manager.

+--------------------+---------------------------------------------+
| **Default value**  | NULL                                        |
+--------------------+---------------------------------------------+
| **Allowed values** | Path to a valid agent certificate file.     |
+--------------------+---------------------------------------------+

agent_key_path
^^^^^^^^^^^^^^

Required when agent verification is enabled in the manager.

+--------------------+---------------------------------------------+
| **Default value**  | NULL                                        |
+--------------------+---------------------------------------------+
| **Allowed values** | Path to a valid agent key file.             |
+--------------------+---------------------------------------------+

authorization_pass_path
^^^^^^^^^^^^^^^^^^^^^^^

Required when enrollment is using password verification.

+--------------------+---------------------------------------------+
| **Default value**  | Windows: authd.pass                         |
|                    | Unix:    /etc/authd.pass                    |
+--------------------+---------------------------------------------+
| **Allowed values** | Path to a valid password file               |
+--------------------+---------------------------------------------+

auto_method
^^^^^^^^^^^

Auto negotiates the most secure common SSL/TLS method with the manager, use "yes" for auto negotiate or "no" for TLS v1.2 only.

+--------------------+---------------------------------------------+
| **Default value**  | no                                          |
+--------------------+---------------------------------------------+
| **Allowed values** | yes or no                                   |
+--------------------+---------------------------------------------+

delay_after_enrollment
^^^^^^^^^^^^^^^^^^^^^^

Time that agentd should wait after a successful registration.

+--------------------+---------------------------------------------+
| **Default value**  | 20                                          |
+--------------------+---------------------------------------------+
| **Allowed values** | number of seconds                           |
+--------------------+---------------------------------------------+

use_source_ip
^^^^^^^^^^^^^

Force manager to compute IP from agent message.

+--------------------+-------------------------------------+
| **Default value**  | no                                  |
+--------------------+-------------------------------------+
| **Allowed values** | yes or no                           |
+--------------------+-------------------------------------+

Sample configuration
--------------------

.. code-block:: xml

    <client>
      <enrollment>
        <enabled>yes</enabled>
        <manager_address>192.168.1.100</manager_address>
        <port>1515</port>
        <agent_name>agent</agent_name>
        <groups>Group1</groups>
        <agent_address>192.168.0.110</agent_address>
        <ssl_cipher>ECDHE+AESGCM:!ECDSA</ssl_cipher>
        <server_ca_path>/path/to/server_ca</server_ca_path>
        <agent_certificate_path>/path/to/agent.cert</agent_certificate_path>
        <agent_key_path>/path/to/agent.key</agent_key_path>
        <authorization_pass_path>/path/to/agent.pass</authorization_pass_path>
        <auto_method>no</auto_method>
        <delay_after_enrollment>20</delay_after_enrollment>
        <use_source_ip>no</use_source_ip>
      </enrollment>
    </client>
