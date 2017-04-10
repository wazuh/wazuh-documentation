.. _reference_ossec_client:

client
======

.. topic:: XML section name

	.. code-block:: xml

		<client>

Configure the connection parameters related to connecting to the manager.

Options
-------

- `server-ip`_
- `server-hostname`_
- `port`_
- `config-profile`_
- `notify_time`_
- `time-reconnect`_


server-ip
^^^^^^^^^^^^^

Specify the IP address of the Wazuh manager.

+--------------------+----------------------------------+
| **Default Value**  | n/a                              |
+--------------------+----------------------------------+
| **Allowed values** | Any valid IP address is allowed. |
+--------------------+----------------------------------+


server-hostname
^^^^^^^^^^^^^^^

Specify the hostname of the Wazuh manager.

+--------------------+-------------------------------------+
| **Default Value**  | n/a                                 |
+--------------------+-------------------------------------+
| **Allowed values** | Any resolvable hostname is allowed. |
+--------------------+-------------------------------------+


port
^^^^

Specify the port on the manager to send events to.  This must match the associated listening port configured on the Wazuh manager.

+--------------------+---------------------------------------------+
| **Default Value**  | n/a                                         |
+--------------------+---------------------------------------------+
| **Allowed values** | Any port number from 1 to 65535 is allowed. |
+--------------------+---------------------------------------------+

config-profile
^^^^^^^^^^^^^^

Specify the agent.conf profile(s) to be used by the agent.

+--------------------+----------------------------------------------------------------------+
| **Default Value**  | n/a                                                                  |
+--------------------+----------------------------------------------------------------------+
| **Allowed values** | Multiple profiles can be included, separated by a comma and a space. |
+--------------------+----------------------------------------------------------------------+

  Example:

.. code-block:: xml

   <client>
         <config-profile>webserver, lowmemory</config-profile>
   </client>


notify_time
^^^^^^^^^^^^

Specify the time in seconds between agent checkins to the manager.  More frequent checkins speed up dissemination of an updated agent.conf file to agents, but also could put undue load on the manager if there are a large number of agents.

+--------------------+-----------------------------+
| **Default Value**  | n/a                         |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+


time-reconnect
^^^^^^^^^^^^^^

This is the time in seconds until a reconnection attempt. This should be set to a higher number than notify_time.  For example, a notify_time time of 60 combined with a time-reconnect of 300 would mean that agents will cause the agent to attempt to check in once per minute, but if a checkin attempt fails to get a response from the manager, the agent will wait five minutes before trying again.  Once it again succeeds, checkins will resume their normal one-minute interval.

+--------------------+-----------------------------+
| **Default Value**  | n/a                         |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

.. warning::
	Notice that the notify_time value uses an underscore while the time-reconnect value uses a dash.  This is an unfortunate legacy naming inconsistency, and is easy to mix up.
