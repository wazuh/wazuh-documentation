.. _reference_ossec_client:

client
======

.. topic:: XML section name

	.. code-block:: xml

		<client>
		</client>

Configure the connection parameters related to connecting to the manager. It
can also be used to configure the agent buffer parameters in order to avoid events flooding.

Options
-------

- `server-ip`_
- `server-hostname`_
- `port`_
- `protocol`_
- `config-profile`_
- `notify_time`_
- `time-reconnect`_
- `disable_buffer`_
- `buffer_length`_
- `events_per_second`_
- `local_ip`_
- `disable-active-response`_

server-ip
^^^^^^^^^^^^^

Specify the IP address of the Wazuh manager.

+--------------------+----------------------------------+
| **Default value**  | n/a                              |
+--------------------+----------------------------------+
| **Allowed values** | Any valid IP address is allowed. |
+--------------------+----------------------------------+


server-hostname
^^^^^^^^^^^^^^^

Specify the hostname of the Wazuh manager.

+--------------------+-------------------------------------+
| **Default value**  | n/a                                 |
+--------------------+-------------------------------------+
| **Allowed values** | Any resolvable hostname is allowed. |
+--------------------+-------------------------------------+

.. warning::
		This parameter is incompatible with `server-ip`_.

port
^^^^

Specify the port on the manager to send events to.  This must match the associated listening port configured on the Wazuh manager.

+--------------------+---------------------------------------------+
| **Default value**  | 1514                                        |
+--------------------+---------------------------------------------+
| **Allowed values** | Any port number from 1 to 65535 is allowed. |
+--------------------+---------------------------------------------+

protocol
^^^^^^^^^^^

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

disable_buffer
^^^^^^^^^^^^^^

This parameter allows to disable the Agent Buffer and send events to the manager without any congestion control.

+--------------------+------------------------------------------------+
| **Default value**  | **no**                                         |
+--------------------+------------------------------------------------+
| **Allowed values** | The options accepted are **yes** and **no**.   |
+--------------------+------------------------------------------------+

.. warning::
	Disabling this functionality in large environments, agents may collapse the manager and the network.


buffer_length
^^^^^^^^^^^^^

The capacity of Agent Buffer in number of events.

+--------------------+----------------------------------+
| **Default value**  | 5000                             |
+--------------------+----------------------------------+
| **Allowed values** | Any number between 1 and 100000. |
+--------------------+----------------------------------+

events_per_second
^^^^^^^^^^^^^^^^^

Specifies the number of events sent to the manager per seconds. Note that this parameter should be configurated according to the capacity of the network and the manager.

+--------------------+----------------------------------+
| **Default value**  | 500                              |
+--------------------+----------------------------------+
| **Allowed values** | Any number between 1 and 1000.   |
+--------------------+----------------------------------+

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

Example of configuration
------------------------

.. code-block:: xml

    <client>
      <server-ip>192.168.1.100</server-ip>
      <config-profile>webserver, debian8</config-profile>

      <!-- Agent buffer options -->
      <disable_buffer>no</disable_buffer>
      <buffer_length>4000</buffer_length>
      <events_per_second>300</events_per_second>
    </client>
