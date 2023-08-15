.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about client configuration, connection to the manager, and its configuring options in this section of the Wazuh documentation.

.. _reference_ossec_client:

client
======

.. topic:: XML section name

	.. code-block:: xml

		<client>
		</client>

This section explains how to configure the connection to the manager.

.. note::
  To avoid a permanent loss of communication with the manager, the only setting included in the shared configuration of this section is **force_reconnect_interval**.

Subsections
-----------

- `server`_
- `enrollment`_

server
^^^^^^

Configures the connection parameters for each server an agent connects to.

Server subsection options
-------------------------

- `address`_
- :ref:`port <server_port>`
- :ref:`protocol <server_protocol>`
- `interface_index`_
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

Specifies the port to send events to the manager.  This must match the associated listening port configured on the Wazuh manager.

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

.. _interface_index:

interface_index
^^^^^^^^^^^^^^^

The index by which the agent must try to connect to the server when setting link-local IPv6 addresses. If the configured IP address is not link-local IPv6 the ``interface_index`` option has no effect.

+--------------------+--------------------+
| **Default value**  | n/a                |
+--------------------+--------------------+
| **Allowed values** | A positive number. |
+--------------------+--------------------+

.. note:: In the case that the interface number changes, you must change this setting mannually.

.. _server_max_retries:

max_retries
^^^^^^^^^^^

The number of connection retries.

+--------------------+--------------------+
| **Default value**  | 5                  |
+--------------------+--------------------+
| **Allowed values** | 1 to 1.000.000.000 |
+--------------------+--------------------+

.. _server_retry_interval:

retry_interval
^^^^^^^^^^^^^^

Time interval between connection attempts (seconds).

+--------------------+--------------------+
| **Default value**  | 10                 |
+--------------------+--------------------+
| **Allowed values** | 1 to 1.000.000.000 |
+--------------------+--------------------+

Options
-------

- `config-profile`_
- `notify_time`_
- `time-reconnect`_
- `force_reconnect_interval`_
- `ip_update_interval`_
- `local_ip`_
- `auto_restart`_
- `crypto_method`_

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

Specifies the time after which the agent is forced to be reconnected to the manager. The reconnection is forced to be done even if the agent is having a successful two-way communication with the manager.

+--------------------+--------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 0s (disabled)                                                                                                                                    |
+--------------------+--------------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should end with a character indicating a time unit, such as: s (seconds), m (minutes), h (hours), d (days), or w (weeks). |
+--------------------+--------------------------------------------------------------------------------------------------------------------------------------------------+

.. _ip_update_interval:

ip_update_interval
^^^^^^^^^^^^^^^^^^

Specifies how often an agent will query the control module for its main IP address.


Any value equal to or lower than the configured ``notify_time`` will cause the IP address to be queried on each keep-alive message.

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

Sample link-local IPv6 configuration
------------------------------------

.. code-block:: xml

   <client>
     <server>
       <address>fe80:0000:0000:0000:a00:27ff:feff:6b0b</address>
       <interface_index>3</interface_index>
       <port>1514</port>
       <protocol>tcp</protocol>
     </server>
     <config-profile>ubuntu, ubuntu22, ubuntu22.04</config-profile>
     <notify_time>10</notify_time>
     <time-reconnect>60</time-reconnect>
     <auto_restart>yes</auto_restart>
     <crypto_method>aes</crypto_method>
   </client>

.. _enrollment:

enrollment
^^^^^^^^^^

Configures the connection parameters for the agent enrollment.

Options
-------

- `enabled`_
- `manager_address`_
- :ref:`port <enrollment_manager_port>`
- :ref:`interface_index <enrollment_interface_index>`
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

.. _enrollment_manager_address:

manager_address
^^^^^^^^^^^^^^^

Hostname or IP address of the manager where the agent will be enrolled. If no value is set, the agent will try enrolling to the same manager that was specified for connection.

+--------------------+---------------------------------------+
| **Default value**  | n/a                                   |
+--------------------+---------------------------------------+
| **Allowed values** | string -  Should be valid IP/Hostname |
+--------------------+---------------------------------------+

.. _enrollment_manager_port:

port
^^^^

Specifies the port on the manager to send enrollment request.  This must match the associated listening port configured on the Wazuh manager.

+--------------------+---------------------------------------------+
| **Default value**  | 1515                                        |
+--------------------+---------------------------------------------+
| **Allowed values** | Any port number from 0 to 65535 is allowed. |
+--------------------+---------------------------------------------+

.. _enrollment_interface_index:

interface_index
^^^^^^^^^^^^^^^

The index by which the agent must send enrollment requests to the server when setting link-local IPv6 addresses. If the configured IP address is not link-local IPv6 the ``interface_index`` option has no effect.

+--------------------+--------------------+
| **Default value**  | n/a                |
+--------------------+--------------------+
| **Allowed values** | A positive number. |
+--------------------+--------------------+

 .. note:: In the case that the interface number changes, you must change this setting mannually.

.. _enrollment_agent_name:

agent_name
^^^^^^^^^^

Agent name that will be used for enrollment. Only alphanumeric characters, "-", "_" or "." are allowed, and the minimum length is two characters.

+--------------------+---------------------------------------------+
| **Default value**  | Hostname of the machine.                    |
+--------------------+---------------------------------------------+
| **Allowed values** | string - Registration name for the agent.   |
+--------------------+---------------------------------------------+

.. _enrollment_agent_groups:

groups
^^^^^^

Groups name to which the agent belongs.

+--------------------+---------------------------------------------+
| **Default value**  | NULL                                        |
+--------------------+---------------------------------------------+
| **Allowed values** | string - Name of one or many valid groups.  |
+--------------------+---------------------------------------------+

.. _enrollment_agent_address:

agent_address
^^^^^^^^^^^^^

Force IP address from the agent. If this is not set manager will extract the source IP address from the enrollment message.

+--------------------+---------------------------------------------+
| **Default value**  | src                                         |
+--------------------+---------------------------------------------+
| **Allowed values** | string - Valid IP address                   |
+--------------------+---------------------------------------------+

.. _enrollment_ssl_cipher:

ssl_cipher
^^^^^^^^^^

Override SSL used ciphers.

+--------------------+----------------------------------------------------+
| **Default value**  | HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH |
+--------------------+----------------------------------------------------+
| **Allowed values** | Any valid ssl cipher.                              |
+--------------------+----------------------------------------------------+

.. _enrollment_server_ca_path:

server_ca_path
^^^^^^^^^^^^^^

Used for manager verification. If no CA certificate is set server will not be verified.

+--------------------+---------------------------------------------+
| **Default value**  | NULL                                        |
+--------------------+---------------------------------------------+
| **Allowed values** | Path to a valid CA certificate.             |
+--------------------+---------------------------------------------+

.. note::
  Paths can be referred to as relative paths under the Wazuh installation directory or full paths.

.. _enrollment_agent_certificate_path:

agent_certificate_path
^^^^^^^^^^^^^^^^^^^^^^

Required when agent verification is enabled in the manager.

+--------------------+---------------------------------------------+
| **Default value**  | NULL                                        |
+--------------------+---------------------------------------------+
| **Allowed values** | Path to a valid agent certificate file.     |
+--------------------+---------------------------------------------+

.. _enrollment_agent_key_path:

agent_key_path
^^^^^^^^^^^^^^

Required when agent verification is enabled in the manager.

+--------------------+---------------------------------------------+
| **Default value**  | NULL                                        |
+--------------------+---------------------------------------------+
| **Allowed values** | Path to a valid agent key file.             |
+--------------------+---------------------------------------------+

.. _enrollment_authorization_pass_path:

authorization_pass_path
^^^^^^^^^^^^^^^^^^^^^^^

Required when enrollment is using password verification.

+--------------------+---------------------------------------------+
| **Default value**  | Windows: authd.pass                         |
|                    | Unix:    /etc/authd.pass                    |
+--------------------+---------------------------------------------+
| **Allowed values** | Path to a valid password file               |
+--------------------+---------------------------------------------+

.. _enrollment_auto_method:

auto_method
^^^^^^^^^^^

Auto negotiates the most secure common SSL/TLS method with the manager, use "yes" for auto negotiate or "no" for TLS v1.2 only.

+--------------------+---------------------------------------------+
| **Default value**  | no                                          |
+--------------------+---------------------------------------------+
| **Allowed values** | yes or no                                   |
+--------------------+---------------------------------------------+

.. _enrollment_delay_after_enrollment:

delay_after_enrollment
^^^^^^^^^^^^^^^^^^^^^^

Time that agentd should wait after a successful registration.

+--------------------+---------------------------------------------+
| **Default value**  | 20                                          |
+--------------------+---------------------------------------------+
| **Allowed values** | number of seconds                           |
+--------------------+---------------------------------------------+

.. _enrollment_use_source_ip:

use_source_ip
^^^^^^^^^^^^^

Force manager to compute IP address from agent message.

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
        <ssl_cipher>HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH</ssl_cipher>
        <server_ca_path>/path/to/server_ca</server_ca_path>
        <agent_certificate_path>/path/to/agent.cert</agent_certificate_path>
        <agent_key_path>/path/to/agent.key</agent_key_path>
        <authorization_pass_path>/path/to/agent.pass</authorization_pass_path>
        <auto_method>no</auto_method>
        <delay_after_enrollment>20</delay_after_enrollment>
        <use_source_ip>no</use_source_ip>
      </enrollment>
    </client>


Sample link-local IPv6 enrollment configuration
-----------------------------------------------

.. code-block:: xml

   <client>
     <enrollment>
       <enabled>yes</enabled>
       <manager_address>fe80:0000:0000:0000:a00:27ff:feff:6b0b</manager_address>
       <interface_index>7</interface_index>
       <port>1515</port>
     </enrollment>
   </client>
