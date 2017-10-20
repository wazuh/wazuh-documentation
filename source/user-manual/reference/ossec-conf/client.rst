.. _reference_ossec_client:

client
======

.. topic:: XML section name

	.. code-block:: xml

		<client>
		</client>

Configure the connection parameters related to connecting to the manager.

Subsections
-----------

- `server`_

server
^^^^^^^^

.. versionadded:: 3.0

Configure the connection parameters for each server connected to an agent.

Server subsection options
-------------------------

- `address`_
- :ref:`port <server_port>`
- :ref:`protocol <server_protocol>`

address
^^^^^^^^

Specify the IP address or the hostname of the Wazuh manager.

+--------------------+-------------------------------------------------------------+
| **Default value**  | n/a                                                         |
+--------------------+-------------------------------------------------------------+
| **Allowed values** | Any valid IP address or any resolvable hostname is allowed. |
+--------------------+-------------------------------------------------------------+

.. _server_port:

port
^^^^^^

Specify the port on the manager to send events to.  This must match the associated listening port configured on the Wazuh manager.

+--------------------+---------------------------------------------+
| **Default value**  | 1514                                        |
+--------------------+---------------------------------------------+
| **Allowed values** | Any port number from 1 to 65535 is allowed. |
+--------------------+---------------------------------------------+

.. _server_protocol:

protocol
^^^^^^^^^^^

Specifies the protocol to use when connecting to manager.

+--------------------+----------+
| **Default value**  | udp      |
+--------------------+----------+
| **Allowed values** | udp, tcp |
+--------------------+----------+

Options
-------

- :ref:`server-ip <legacy_server-ip>`
- :ref:`server-hostname <legacy_server-hostname>`
- :ref:`port <legacy_port>`
- :ref:`protocol <legacy_protocol>`
- `config-profile`_
- `notify_time`_
- `time-reconnect`_
- `local_ip`_
- `disable-active-response`_
- `auto_restart`_

.. _legacy_server-ip:

server-ip
^^^^^^^^^^^^^

.. deprecated:: 3.0

Specify the IP address of the Wazuh manager.

+--------------------+----------------------------------+
| **Default value**  | n/a                              |
+--------------------+----------------------------------+
| **Allowed values** | Any valid IP address is allowed. |
+--------------------+----------------------------------+


.. _legacy_server-hostname:

server-hostname
^^^^^^^^^^^^^^^

.. deprecated:: 3.0

Specify the hostname of the Wazuh manager.

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

.. deprecated:: 3.0

Specify the port on the manager to send events to.  This must match the associated listening port configured on the Wazuh manager.

+--------------------+---------------------------------------------+
| **Default value**  | 1514                                        |
+--------------------+---------------------------------------------+
| **Allowed values** | Any port number from 1 to 65535 is allowed. |
+--------------------+---------------------------------------------+

.. _legacy_protocol:

protocol
^^^^^^^^^^^

.. deprecated:: 3.0

Specifies the protocol to use when connecting to manager.

+--------------------+----------+
| **Default value**  | udp      |
+--------------------+----------+
| **Allowed values** | udp, tcp |
+--------------------+----------+

config-profile
^^^^^^^^^^^^^^

Specify the agent.conf profile(s) to be used by the agent.

+--------------------+----------------------------------------------------------------------+
| **Default value**  | n/a                                                                  |
+--------------------+----------------------------------------------------------------------+
| **Allowed values** | Multiple profiles can be included, separated by a comma and a space. |
+--------------------+----------------------------------------------------------------------+


notify_time
^^^^^^^^^^^^

Specify the time in seconds between agent checkins to the manager.  More frequent checkins speed up dissemination of an updated agent.conf file to agents, but also could put undue load on the manager if there are a large number of agents.

+--------------------+-----------------------------+
| **Default value**  | 600                         |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+


time-reconnect
^^^^^^^^^^^^^^

This is the time in seconds until a reconnection attempt. This should be set to a higher number than notify_time.  For example, a notify_time time of 60 combined with a time-reconnect of 300 would mean that agents will cause the agent to attempt to check in once per minute, but if a checkin attempt fails to get a response from the manager, the agent will wait five minutes before trying again.  Once it again succeeds, checkins will resume their normal one-minute interval.

+--------------------+-----------------------------+
| **Default value**  | 1800                        |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

.. warning::
	Notice that the notify_time value uses an underscore while the time-reconnect value uses a dash.  This is an unfortunate legacy naming inconsistency, and is easy to mix up.

local_ip
^^^^^^^^^^^^^^

When the agent has multiple network interfaces, this parameter specifies which IP address will comunicate with the manager from.

+--------------------+----------------------------------+
| **Default value**  | n/a                              |
+--------------------+----------------------------------+
| **Allowed values** | Any valid IP address is allowed. |
+--------------------+----------------------------------+

disable-active-response
^^^^^^^^^^^^^^^^^^^^^^^

**Deprecated:** This is an obsolete method to disable active response.

.. warning::

        The recommended way is using the :doc:`active-response <active-response>` section.

+--------------------+------------------------------------------------+
| **Default value**  | **no**                                         |
+--------------------+------------------------------------------------+
| **Allowed values** | The options accepted are **yes** and **no**    |
+--------------------+------------------------------------------------+

auto_restart
^^^^^^^^^^^^

This parameter enable or disable the agent restart when it receives a new valid configuration from the manager.

+--------------------+------------------------------------------------+
| **Default value**  | **yes**                                        |
+--------------------+------------------------------------------------+
| **Allowed values** | The options accepted are **yes** and **no**    |
+--------------------+------------------------------------------------+

Example of configuration
------------------------

.. code-block:: xml

    <client>
      <server>
        <address>192.168.1.100</address>
        <port>1514</port>
        <protocol>tcp</protocol>
      </server>
      <server>
        <address>example.hostname</address>
        <protocol>udp</protocol>
      </server>
      <config-profile>webserver, debian8</config-profile>
      <notify_time>300</notify_time>
      <time-reconnect>900</time-reconnect>
      <auto_restart>yes</auto_restart>
    </client>
