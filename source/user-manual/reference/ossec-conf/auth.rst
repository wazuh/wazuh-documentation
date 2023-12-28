.. Copyright (C) 2015, Wazuh, Inc.

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

Options
-------

- `disabled`_
- `remote_enrollment`_
- `port`_
- `ipv6`_
- `use_source_ip`_
- `force`_
- `purge`_
- `use_password`_
- `ssl_agent_ca`_
- `ssl_verify_host`_
- `ssl_manager_cert`_
- `ssl_manager_key`_
- `ssl_auto_negotiate`_
- `ciphers`_
- `key_request`_
- `agents`_

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

ipv6
^^^^^^^^^^^

.. versionadded:: 4.4.0

Enables IPv6 support.

+--------------------+------------------+
| **Default value**  | no               |
+--------------------+------------------+
| **Allowed values** | yes, no          |
+--------------------+------------------+

use_source_ip
^^^^^^^^^^^^^

Toggles the use of the client's source IP address or the use of "any" to add an agent.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

force
^^^^^

The agent replacement options are configured inside this tag. All conditions must be satisfied to perform the replacement.

.. code-block:: xml

    <force>
      <enabled>yes</enabled>
      <disconnected_time enabled="yes">1h</disconnected_time>
      <after_registration_time>1h</after_registration_time>
      <key_mismatch>yes</key_mismatch>
    </force>

**enabled**

Toggles whether or not to force the insertion of an agent if there is a duplicate name or IP address. This will remove the old agent with the same name or IP address.

+--------------------+---------------------+
| **Default value**  | yes                 |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

**disconnected_time**

This option, when enabled, specifies that the replacement will be performed only for agents that have been disconnected longer than the value configured in the setting. This option should be disabled to replace any agent regardless of its state.

+--------------------+----------------------------------------------------------------------------+
| **Default value**  | 1h                                                                         |
+--------------------+----------------------------------------------------------------------------+
| **Allowed values** | Any number greater than or equal to zero. Allowed suffixes (s, m, h, d).   |
+--------------------+----------------------------------------------------------------------------+

Attributes:

+-------------+----------------+---------+
| **enabled** | Default value  | yes     |
+             +----------------+---------+
|             | Allowed values | yes, no |
+-------------+----------------+---------+

Value ``no`` means to force replacement even for active agents.

Value ``0`` means to force the replacement of any disconnected agent.

**after_registration_time**

Specifies that the agent replacement will be performed only when the time passed since the agent registration is greater than the value configured in the setting.

+--------------------+----------------------------------------------------------------------------+
| **Default value**  | 1h                                                                         |
+--------------------+----------------------------------------------------------------------------+
| **Allowed values** | Any number greater than or equal to zero. Allowed suffixes (s, m, h, d).   |
+--------------------+----------------------------------------------------------------------------+

Value ``0`` means to always force replacement.

**key_mismatch**

This option defines that the agent replacement occurs when the key held by the agent is different from the one registered by the manager.

+--------------------+---------------------+
| **Default value**  | yes                 |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

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

Specifies the path to the CA certificate used to verify clients. It can be referred to a relative path under the Wazuh installation directory or a full path.

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

Specifies the path to the server SSL certificate. It can be referred to a relative path under the Wazuh installation directory or a full path.

+--------------------+--------------------------------+
| **Default value**  | etc/sslmanager.cert            |
+--------------------+--------------------------------+
| **Allowed values** | Any valid path                 |
+--------------------+--------------------------------+

ssl_manager_key
^^^^^^^^^^^^^^^

Specifies the path to the server's SSL key. It can be referred to a relative path under the Wazuh installation directory or a full path.

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

The format of this parameter is described in `SSL ciphers <https://www.openssl.org/docs/man1.1.1/man1/ciphers.html>`_.

key_request
^^^^^^^^^^^

.. versionadded:: 4.4.0

The key request settings are configured inside this tag. Read more about this feature at :doc:`agent key request <../../agents/key-request>`.

.. code-block:: xml

    <key_request>
      <enabled>yes</enabled>
      <exec_path>/usr/bin/python /home/script.py</exec_path>
      <socket>/path/to/socket</socket>
      <timeout>60</timeout>
      <threads>1</threads>
      <queue_size>1024</queue_size>
    </key_request>

Configuration options of the ``key request`` feature.


**enabled**

Enable the key request.

+--------------------+-----------------------------+
| **Default value**  | no                          |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

**timeout**

Maximum time for waiting a response from the executable.

+--------------------+------------------------------+
| **Default value**  | 60                           |
+--------------------+------------------------------+
| **Allowed values** | A positive number in seconds |
+--------------------+------------------------------+

**exec_path**

Full path to the executable.

+--------------------+-----------------------------------+
| **Default value**  | none                              |
+--------------------+-----------------------------------+
| **Allowed values** | A string indicating the full path |
+--------------------+-----------------------------------+

**socket**

Full path to the Unix domain socket.

+--------------------+-----------------------------------------------------------+
| **Default value**  | none                                                      |
+--------------------+-----------------------------------------------------------+
| **Allowed values** | A string indicating the full path to a Unix domain socket |
+--------------------+-----------------------------------------------------------+

**threads**

Number of threads for dispatching the external keys requests.

+--------------------+------------------------------------------------------------+
| **Default value**  | 1                                                          |
+--------------------+------------------------------------------------------------+
| **Allowed values** | A positive number indicating the number of threads [1..32] |
+--------------------+------------------------------------------------------------+

**queue_size**


Indicates the maximum size of the queue for fetching external keys.

+--------------------+------------------------------------------------------------+
| **Default value**  | 1024                                                       |
+--------------------+------------------------------------------------------------+
| **Allowed values** | A positive number indicating the queue size [1..220000]    |
+--------------------+------------------------------------------------------------+

agents
^^^^^^

**allow_higher_versions**

.. versionadded:: 4.6.0

Accept agents with a later version than the current manager.

+--------------------+------------------+
| **Default value**  | no               |
+--------------------+------------------+
| **Allowed values** | yes, no          |
+--------------------+------------------+

.. note::

   This option only works when **connection** is set to ``secure``.


Default configuration
---------------------

.. code-block:: xml

  <auth>
    <disabled>no</disabled>
    <remote_enrollment>yes</remote_enrollment>
    <port>1515</port>
    <use_source_ip>no</use_source_ip>
    <force>
      <enabled>yes</enabled>
      <disconnected_time enabled="yes">1h</disconnected_time>
      <after_registration_time>1h</after_registration_time>
      <key_mismatch>yes</key_mismatch>
    </force>
    <purge>yes</purge>
    <use_password>no</use_password>
    <ciphers>HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH</ciphers>
    <!-- <ssl_agent_ca></ssl_agent_ca> -->
    <ssl_verify_host>no</ssl_verify_host>
    <ssl_manager_cert>etc/sslmanager.cert</ssl_manager_cert>
    <ssl_manager_key>etc/sslmanager.key</ssl_manager_key>
    <ssl_auto_negotiate>no</ssl_auto_negotiate>
  </auth>
