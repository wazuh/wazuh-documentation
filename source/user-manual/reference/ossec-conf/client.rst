.. Copyright (C) 2020 Wazuh, Inc.

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

server
^^^^^^

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
| **Default value**  | udp      |
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
| **Default value**  | 5                  |
+--------------------+--------------------+
| **Allowed values** | 1 to 1.000.000.000 |
+--------------------+--------------------+

Options
-------

- `config-profile`_
- `notify_time`_
- `time-reconnect`_
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
