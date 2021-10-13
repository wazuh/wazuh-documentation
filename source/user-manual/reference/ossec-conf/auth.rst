.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: This section of the Wazuh Documentation shows the options for the agents registration service.


.. _reference_ossec_auth:

auth
====

.. topic:: XML section name

    .. code-block:: xml

        <auth>
        </auth>


This section shows the options for the registration service.

.. versionadded:: 2.1

Options
-------

- `disabled`_
- `remote_enrollment`_
- `port`_
- `use_source_ip`_
- `force_insert`_
- `force_time`_
- `purge`_
- `use_password`_
- `ssl_agent_ca`_
- `ssl_verify_host`_
- `ssl_manager_cert`_
- `ssl_manager_key`_
- `ssl_auto_negotiate`_
- `ciphers`_
- `key_request`_

disabled
^^^^^^^^

Toggles the execution of the Auth daemon on or off.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

remote_enrollment
^^^^^^^^^^^^^^^^^

.. versionadded:: 4.2.0

Allow listening for new agents on TLS port (1515 by default).

+--------------------+---------------------+
| **Default value**  | yes                 |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

port
^^^^

Defines the TCP port number for listening to connections.

+--------------------+---------------------+
| **Default value**  | 1515                |
+--------------------+---------------------+
| **Allowed values** | 0 - 65535           |
+--------------------+---------------------+

.. _auth_use_source_ip:

use_source_ip
^^^^^^^^^^^^^

Toggles the use of the client's source IP address or the use of "any" to add an agent.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

force_insert
^^^^^^^^^^^^

Toggles whether or not to force the insertion of an agent if there is a duplicate name or IP address. This will remove the old agent with same name or IP address.

+--------------------+---------------------+
| **Default value**  | yes                 |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

force_time
^^^^^^^^^^

When forcing to remove old agents with the same name or IP address, this options specifies that the deletion will be performed only if the agent's keepalive has more than the defined number of seconds.

+--------------------+---------------------+
| **Default value**  | 0                   |
+--------------------+---------------------+
| **Allowed values** | - Positive number   |
|                    | - 0                 |
+--------------------+---------------------+

Value ``0`` means to always force the deletion.

purge
^^^^^

Toggles the deletion of client keys on or off when agents are removed.

+--------------------+---------------------+
| **Default value**  | yes                 |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

When set to ``no``, removed agents will remain in the client keys file marked as removed.  When set to ``yes``, the client keys file will be purged.

use_password
^^^^^^^^^^^^

Toggles shared password authentication on or off.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

When enabled, the shared password will be read from the ``/var/ossec/etc/authd.pass`` file.

If this file does not exist, a **random password** will be generated.

ssl_agent_ca
^^^^^^^^^^^^

Specifies the path to the CA certificate used to verify clients. It can be referred to a relative path under the Wazuh installation directory, or a full path.

+--------------------+---------------------+
| **Allowed values** | Any valid path      |
+--------------------+---------------------+

ssl_verify_host
^^^^^^^^^^^^^^^

Toggles source host verification on and off when a CA certificate is specified. This means that the client source IP address will be validated using the *Common Name* field.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

ssl_manager_cert
^^^^^^^^^^^^^^^^

Specifies the path to the server SSL certificate. It can be referred to a relative path under the Wazuh installation directory, or a full path.

+--------------------+--------------------------------+
| **Default value**  | etc/sslmanager.cert            |
+--------------------+--------------------------------+
| **Allowed values** | Any valid path                 |
+--------------------+--------------------------------+

ssl_manager_key
^^^^^^^^^^^^^^^

Specifies the path to the server's SSL key. It can be referred to a relative path under the Wazuh installation directory, or a full path.

+--------------------+--------------------------------+
| **Default value**  | etc/sslmanager.key             |
+--------------------+--------------------------------+
| **Allowed values** | Any valid path                 |
+--------------------+--------------------------------+

ssl_auto_negotiate
^^^^^^^^^^^^^^^^^^

Toggles whether or not to auto select the SSL/TLS method.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

By default only TLS v1.2 is allowed. When set to ``yes`` the system will negotiate the most secure common method with the client.

In older systems, where the **manager does not support TLS v1.2**, this option will be enabled automatically.

ciphers
^^^^^^^

Sets the list of ciphers for network communication using SSL.

+--------------------+----------------------------------------------------+
| **Default value**  | HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH |
+--------------------+----------------------------------------------------+

The format of this parameter is described in `SSL ciphers <https://www.openssl.org/docs/man1.1.0/apps/ciphers.html>`_.

.. versionadded:: 3.0.0

key_request
^^^^^^^^^^^

The key polling settings are configured inside this tag.

.. code-block:: xml
  <key_request>
    <enabled>yes</enabled>
    <exec_path>/usr/bin/python /home/script.py</exec_path>
    <socket>/path/to/socket</socket>
    <timeout>60</timeout>
    <threads>1</threads>
    <queue_size>1024</queue_size>
  </key_request>

Configuration options of the key polling.

Options
-------

- `enabled`_
- `timeout`_
- `exec_path`_
- `socket`_
- `threads`_
- `queue_size`_

enabled
^^^^^^^

Enable the key polling.

+--------------------+-----------------------------+
| **Default value**  | yes                         |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

timeout
^^^^^^^

Maximum time for waiting a response from the executable.

+--------------------+------------------------------+
| **Default value**  | 60                           |
+--------------------+------------------------------+
| **Allowed values** | A positive number in seconds |
+--------------------+------------------------------+

exec_path
^^^^^^^^^

Full path to the executable.

+--------------------+-----------------------------------+
| **Default value**  | none                              |
+--------------------+-----------------------------------+
| **Allowed values** | A string indicating the full path |
+--------------------+-----------------------------------+

socket
^^^^^^

Full path to the unix domain socket.

+--------------------+-----------------------------------------------------------+
| **Default value**  | none                                                      |
+--------------------+-----------------------------------------------------------+
| **Allowed values** | A string indicating the full path to a unix domain socket |
+--------------------+-----------------------------------------------------------+

threads
^^^^^^^

Number of threads for polling external keys.

+--------------------+------------------------------------------------------------+
| **Default value**  | 1                                                          |
+--------------------+------------------------------------------------------------+
| **Allowed values** | A positive number indicating the number of threads [1..32] |
+--------------------+------------------------------------------------------------+

queue_size
^^^^^^^^^^

Indicates the maximum size of the queue for polling external keys.

+--------------------+------------------------------------------------------------+
| **Default value**  | 1024                                                       |
+--------------------+------------------------------------------------------------+
| **Allowed values** | A positive number indicating the queue size [1..220000]    |
+--------------------+------------------------------------------------------------+

Default configuration
---------------------

.. code-block:: xml

  <auth>
    <disabled>no</disabled>
    <remote_enrollment>yes<remote_enrollment>
    <port>1515</port>
    <use_source_ip>no</use_source_ip>
    <force_insert>yes</force_insert>
    <force_time>0</force_time>
    <purge>yes</purge>
    <use_password>no</use_password>
    <ciphers>HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH</ciphers>
    <!-- <ssl_agent_ca></ssl_agent_ca> -->
    <ssl_verify_host>no</ssl_verify_host>
    <ssl_manager_cert>etc/sslmanager.cert</ssl_manager_cert>
    <ssl_manager_key>etc/sslmanager.key</ssl_manager_key>
    <ssl_auto_negotiate>no</ssl_auto_negotiate>
    <key_request>
      <enabled>yes</enabled>
      <exec_path>/usr/bin/python /home/script.py</exec_path>
      <socket>/path/to/socket</socket>
      <timeout>60</timeout>
      <threads>1</threads>
      <queue_size>1024</queue_size>
    </key_request>
  </auth>
