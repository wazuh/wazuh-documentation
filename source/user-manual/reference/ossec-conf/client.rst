.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the client configuration section of ossec.conf, which configures the Wazuh agent connection to the Wazuh manager and enrollment settings.

.. _reference_ossec_client:

client
======

.. topic:: XML section name

   .. code-block:: xml

      <client>
      </client>

The ``<client>`` section configures the Wazuh agent connection to the Wazuh manager and the agent enrollment settings.

Options
-------

- `manager`_
- `config-profile`_
- `notify_time`_
- `time-reconnect`_
- `ip_update_interval`_
- `auto_restart`_
- `enrollment`_

manager
^^^^^^^

The ``<manager>`` subsection configures the connection parameters for a Wazuh manager. Define multiple ``<manager>`` subsections to configure more than one manager.

Manager subsection options
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- `address`_
- :ref:`port <ossec_client_manager_port>`
- :ref:`interface_index <ossec_client_manager_interface_index>`
- `max_retries`_
- `retry_interval`_

address
""""""""

Specifies the IP address or the hostname of the Wazuh manager.

+----------------------+---------------------------------------------------------------+
| **Default value**    | n/a                                                           |
+----------------------+---------------------------------------------------------------+
| **Allowed values**   | Any valid IP address or any resolvable hostname is allowed.   |
+----------------------+---------------------------------------------------------------+

.. _ossec_client_manager_port:

port
"""""

Specifies the port to send events to the manager. This must match the associated listening port configured on the Wazuh manager.

+----------------------+-----------------------------------------------+
| **Default value**    | 1514                                          |
+----------------------+-----------------------------------------------+
| **Allowed values**   | Any port number from 1 to 65535 is allowed.   |
+----------------------+-----------------------------------------------+

.. _ossec_client_manager_interface_index:

interface_index
""""""""""""""""

Specifies the network interface index used to connect to a link-local IPv6 address. If the configured IP address is not link-local IPv6 the ``interface_index`` option has no effect.

+----------------------+----------------------+
| **Default value**    | n/a                  |
+----------------------+----------------------+
| **Allowed values**   | A positive number.   |
+----------------------+----------------------+

.. note::
   In the case that the interface number changes, you must change this setting manually.

max_retries
""""""""""""

The number of connection retries.

+----------------------+-------------------+
| **Default value**    | 5                 |
+----------------------+-------------------+
| **Allowed values**   | 1 to 1000000000   |
+----------------------+-------------------+

retry_interval
""""""""""""""""

Time interval between connection attempts (seconds).

+----------------------+-------------------+
| **Default value**    | 10                |
+----------------------+-------------------+
| **Allowed values**   | 1 to 1000000000   |
+----------------------+-------------------+

Sample configuration
~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: xml

   <client>
     <manager>
       <address>192.168.1.100</address>
       <port>1514</port>
       <max_retries>5</max_retries>
       <retry_interval>5</retry_interval>
     </manager>
     <manager>
       <address>example.hostname</address>
     </manager>
     <config-profile>webserver, debian8</config-profile>
     <notify_time>30</notify_time>
     <time-reconnect>120</time-reconnect>
     <auto_restart>yes</auto_restart>
   </client>

Sample link-local IPv6 configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: xml

   <client>
     <manager>
       <address>fe80:0000:0000:0000:a00:27ff:feff:6b0b</address>
       <interface_index>3</interface_index>
       <port>1514</port>
     </manager>
     <config-profile>ubuntu, ubuntu22, ubuntu22.04</config-profile>
     <notify_time>20</notify_time>
     <time-reconnect>60</time-reconnect>
     <auto_restart>yes</auto_restart>
   </client>

config-profile
^^^^^^^^^^^^^^^

Specifies the ``agent.conf`` profile(s) to be used by the agent.

+----------------------+------------------------------------------------------------------------+
| **Default value**    | n/a                                                                    |
+----------------------+------------------------------------------------------------------------+
| **Allowed values**   | Multiple profiles can be included, separated by a comma and a space.   |
+----------------------+------------------------------------------------------------------------+

notify_time
^^^^^^^^^^^^

Specifies the interval, in seconds, between agent keepalive messages sent to the Wazuh manager. Lower values propagate centrally distributed configuration updates more quickly but increase the load on the Wazuh manager when many agents are connected.

+----------------------+-------------------------------+
| **Default value**    | 20                            |
+----------------------+-------------------------------+
| **Allowed values**   | A positive number (seconds)   |
+----------------------+-------------------------------+

.. note::
   Set this value lower than the agent disconnection time configured on the Wazuh manager. This ensures that the agent sends a keepalive before the manager marks it as disconnected.

time-reconnect
^^^^^^^^^^^^^^^

Specifies the time in seconds before a reconnection is attempted. This should be set to a higher number than the ``notify_time`` parameter.

For example, a ``notify_time`` setting of 60 combined with a ``time-reconnect`` of 300 would mean that agents will attempt to check in once per minute, but if a checkin attempt fails to get a response from the manager, the agent will wait five minutes before trying again. Checkins will resume their normal one-minute interval following a successful connection attempt.

+----------------------+-------------------------------+
| **Default value**    | 60                            |
+----------------------+-------------------------------+
| **Allowed values**   | A positive number (seconds)   |
+----------------------+-------------------------------+

.. warning::
   Notice that the ``notify_time`` value uses an underscore while the ``time-reconnect`` value uses a dash. This is an unfortunate legacy naming inconsistency that is easy to mix up.

ip_update_interval
^^^^^^^^^^^^^^^^^^^^

Specifies how often an agent will query the control module for its main IP address.

Any value equal to or lower than the configured ``notify_time`` will cause the IP address to be queried on each keep-alive message.

+----------------------+-------------------------------+
| **Default value**    | 0                             |
+----------------------+-------------------------------+
| **Allowed values**   | A positive number (seconds)   |
+----------------------+-------------------------------+

.. note::
   Most systems won't need to modify this value, but on systems with large routing tables this configuration can help lower CPU usage from ``wazuh-modulesd``.

auto_restart
^^^^^^^^^^^^^

Toggles on and off the automatic restart of agents when a new valid configuration is received from the manager.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

enrollment
^^^^^^^^^^^

Configures the connection parameters for the agent enrollment.

Options
~~~~~~~~

- `enabled`_
- `manager_address`_
- :ref:`port <ossec_client_enrollment_port>`
- :ref:`interface_index <ossec_client_enrollment_interface_index>`
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
""""""""

Enables/disables agent enrollment.

+----------------------+-------------+
| **Default value**    | yes         |
+----------------------+-------------+
| **Allowed values**   | yes or no   |
+----------------------+-------------+

manager_address
""""""""""""""""

Hostname or IP address of the manager where the agent will be enrolled. If no value is set, the agent will try enrolling to the same manager that was specified for connection.

+----------------------+----------------------------------------+
| **Default value**    | n/a                                    |
+----------------------+----------------------------------------+
| **Allowed values**   | string - Should be valid IP/Hostname   |
+----------------------+----------------------------------------+

.. _ossec_client_enrollment_port:

port
"""""

Specifies the port on the manager to send enrollment request. This must match the associated listening port configured on the Wazuh manager.

+----------------------+-----------------------------------------------+
| **Default value**    | 1515                                          |
+----------------------+-----------------------------------------------+
| **Allowed values**   | Any port number from 1 to 65535 is allowed.   |
+----------------------+-----------------------------------------------+

.. _ossec_client_enrollment_interface_index:

interface_index
""""""""""""""""

The index by which the agent must send enrollment requests to the manager when setting link-local IPv6 addresses. If the configured IP address is not link-local IPv6 the ``interface_index`` option has no effect.

+----------------------+----------------------+
| **Default value**    | n/a                  |
+----------------------+----------------------+
| **Allowed values**   | A positive number.   |
+----------------------+----------------------+

.. note::
   In the case that the interface number changes, you must change this setting manually.

agent_name
""""""""""""

Agent name that will be used for enrollment. Only alphanumeric characters, "-", "_" or "." are allowed, and the minimum length is two characters.

+----------------------+---------------------------------------------+
| **Default value**    | Hostname of the machine.                    |
+----------------------+---------------------------------------------+
| **Allowed values**   | string - Registration name for the agent.   |
+----------------------+---------------------------------------------+

groups
"""""""

Groups name to which the agent belongs.

+----------------------+----------------------------------------------+
| **Default value**    | NULL                                         |
+----------------------+----------------------------------------------+
| **Allowed values**   | string - Name of one or many valid groups.   |
+----------------------+----------------------------------------------+

agent_address
""""""""""""""

Specifies the IP address registered for the agent. When this option is not set, the Wazuh manager obtains the address from the enrollment request.

+----------------------+-----------------------------+
| **Default value**    | src                         |
+----------------------+-----------------------------+
| **Allowed values**   | string - Valid IP address   |
+----------------------+-----------------------------+

ssl_cipher
"""""""""""

Override SSL used ciphers.

+----------------------+------------------------------------------------------+
| **Default value**    | HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH   |
+----------------------+------------------------------------------------------+
| **Allowed values**   | Any valid ssl cipher.                                |
+----------------------+------------------------------------------------------+

server_ca_path
""""""""""""""""

Specifies the CA certificate used to verify the identity of the Wazuh manager during enrollment. When this option is not defined, the agent does not verify the manager certificate against a CA.

+----------------------+-----------------------------------+
| **Default value**    | NULL                              |
+----------------------+-----------------------------------+
| **Allowed values**   | Path to a valid CA certificate.   |
+----------------------+-----------------------------------+

.. note::
   Paths can be referred to as relative paths under the Wazuh installation directory or full paths.

agent_certificate_path
"""""""""""""""""""""""

Specifies the agent certificate used when agent certificate verification is enabled on the Wazuh manager.

+----------------------+-------------------------------------------+
| **Default value**    | NULL                                      |
+----------------------+-------------------------------------------+
| **Allowed values**   | Path to a valid agent certificate file.   |
+----------------------+-------------------------------------------+

agent_key_path
""""""""""""""""

Specifies the private key associated with the agent certificate.

+----------------------+-----------------------------------+
| **Default value**    | NULL                              |
+----------------------+-----------------------------------+
| **Allowed values**   | Path to a valid agent key file.   |
+----------------------+-----------------------------------+

authorization_pass_path
""""""""""""""""""""""""

Specifies the file containing the enrollment password.

+----------------------+---------------------------------------------+
| **Default value**    | Windows: authd.pass Unix: /etc/authd.pass   |
+----------------------+---------------------------------------------+
| **Allowed values**   | Path to a valid password file               |
+----------------------+---------------------------------------------+

auto_method
""""""""""""

Controls TLS method negotiation during enrollment.

Set this option to ``yes`` to negotiate the most secure TLS method supported by both the agent and the Wazuh manager. Set it to ``no`` to use TLS 1.2 only.

+----------------------+-------------+
| **Default value**    | no          |
+----------------------+-------------+
| **Allowed values**   | yes or no   |
+----------------------+-------------+

delay_after_enrollment
""""""""""""""""""""""""

Specifies how long the agent waits after successful enrollment before continuing startup.

+----------------------+---------------------+
| **Default value**    | 20                  |
+----------------------+---------------------+
| **Allowed values**   | number of seconds   |
+----------------------+---------------------+

use_source_ip
""""""""""""""

Specifies whether the Wazuh manager determines the agent IP address from the source address of the enrollment request.

+----------------------+-------------+
| **Default value**    | no          |
+----------------------+-------------+
| **Allowed values**   | yes or no   |
+----------------------+-------------+

Sample configuration
~~~~~~~~~~~~~~~~~~~~~~

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

Sample link-local IPv6 configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: xml

   <client>
     <enrollment>
       <enabled>yes</enabled>
       <manager_address>fe80:0000:0000:0000:a00:27ff:feff:6b0b</manager_address>
       <interface_index>7</interface_index>
       <port>1515</port>
     </enrollment>
   </client>
