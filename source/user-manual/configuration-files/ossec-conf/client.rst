.. _reference_ossec_client:

Client
======

.. topic:: XML section name

	.. code-block:: xml

		<client>

Configure the connection parameters related to connecting to the manager.

+--------------------+----------------------------------------------------------------------+
| Options            | Allowed values                                                       |
+====================+======================================================================+
| `server-ip`_       | Any valid IP address                                                 |
+--------------------+----------------------------------------------------------------------+
| `server-hostname`_ | Any valid hostname                                                   |
+--------------------+----------------------------------------------------------------------+
| `port`_            | Any port number from 1 to 65535                                      |
+--------------------+----------------------------------------------------------------------+
| `config-profile`_  | Multiple profiles can be included, separated by a comma and a space  |
+--------------------+----------------------------------------------------------------------+
| `notify_time`_     | A positive number (seconds)                                          |
+--------------------+----------------------------------------------------------------------+
| `time-reconnect`_  | A positive number (seconds)                                          |
+--------------------+----------------------------------------------------------------------+



``server-ip``
-------------

Specifythe IP address of the analysis server

.. topic:: Default value

	n/a

.. topic:: Allowed values

    Any valid IP address is allowed

``server-hostname``
-------------------

Specify the hostname of the analysis server

.. topic:: Default value

	n/a

.. topic:: Allowed values

    Any valid hostname is allowed

``port``
--------

Specifies the port to send the events (must be the same to the one used by the analysis server).

.. topic:: Default value

	n/a

.. topic:: Allowed values

    Any port number from 1 to 65535 is allowed

``config-profile``
------------------

Specifies the ``agent.conf`` profiles to be used by the agent.

.. topic:: Default value

	n/a

.. topic:: Allowed values

    Multiple profiles can be included, separated by a comma and a space.

  Example:

  .. code-block:: xml

     <client>
           <config-profile>webserver, lowmemory</config-profile>
     </client>

``notify_time``
---------------

Specifies the time in seconds between information messages sent by the agents to the server.

.. topic:: Default value

	n/a

.. topic:: Allowed values

    A positive number (seconds)

``time-reconnect``
------------------

Time in seconds until a reconnection attempt. This should be set to a higher number than notify_time.

.. topic:: Default value

	n/a

.. topic:: Allowed values

    A positive number (seconds)
