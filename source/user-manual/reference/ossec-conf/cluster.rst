.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out how to configure the Wazuh cluster for manager synchronization. Learn more about it in this section of the Wazuh documentation.

.. _reference_ossec_cluster:

cluster
=======

.. topic:: XML section name

	.. code-block:: xml

		<cluster>
		</cluster>

This section explains how to configure the Wazuh cluster for manager synchronization.

Options
-------

- `name`_
- `node_name`_
- `node_type`_
- `key`_
- `port`_
- `bind_addr`_
- `nodes`_
- `hidden`_
- `disabled`_
- `haproxy_helper`_

.. _cluster_name:

name
^^^^

Specifies the name of the cluster this node belongs to.

+--------------------+---------------+
| **Default value**  | wazuh         |
+--------------------+---------------+
| **Allowed values** | Any name      |
+--------------------+---------------+

.. _cluster_node_name:

node_name
^^^^^^^^^^

Specifies the name of the current node of the cluster.

.. note::
	Each node of the cluster must have a unique name. If two nodes share the same name, one of them will be rejected.

+--------------------+---------------+
| **Default value**  | node01        |
+--------------------+---------------+
| **Allowed values** | Any name      |
+--------------------+---------------+

.. _cluster_node_type:

node_type
^^^^^^^^^

Specifies the role of the node.

+--------------------+------------------+
| **Default value**  | master           |
+--------------------+------------------+
| **Allowed values** | master, worker   |
+--------------------+------------------+

.. warning::

	Using ``client`` as ``node_type`` in configuration is still valid, but a warning message will be shown in logs.

.. _cluster_key:

key
^^^

Defines the key used to encrypt the communication between the nodes. This key must be 32 characters long. Refer to the :doc:`configuring-cluster </user-manual/wazuh-server-cluster/cluster-nodes-configuration>` for information on how to generate a key.

.. note::
	This key must be the same for all of the cluster nodes.

+--------------------+---------------------------------------------+
| **Default value**  | n/a                                         |
+--------------------+---------------------------------------------+
| **Allowed values** | Any alphanumeric string of 32 characters.   |
+--------------------+---------------------------------------------+

.. _cluster_port:

port
^^^^

Specifies the port to use for the cluster communications.

+--------------------+----------------------------------+
| **Default value**  | 1516                             |
+--------------------+----------------------------------+
| **Allowed values** | Any port number from 1 to 65535. |
+--------------------+----------------------------------+

.. _cluster_bind_addr:

bind_addr
^^^^^^^^^^

Specifies which IP address will communicate with the cluster when the node has multiple network interfaces.

+--------------------+-----------------------+
| **Default value**  | 0.0.0.0               |
+--------------------+-----------------------+
| **Allowed values** | Any valid IP address. |
+--------------------+-----------------------+

.. _cluster_nodes:

nodes
^^^^^

Lists all master nodes in the cluster using the ``<node>`` tag for each one.

+--------------------+--------------------------------------------------+
| **Default value**  | NODE_IP                                          |
+--------------------+--------------------------------------------------+
| **Allowed values** | Any valid address (IP or DNS) of a cluster node. |
+--------------------+--------------------------------------------------+

.. note::
	The current cluster only allows one master node. Therefore, this list must have only one element. If more elements are found, **the first one will be used as master**, and the rest will be ignored.

.. _cluster_hidden:

hidden
^^^^^^

Toggles whether or not to show information about the cluster that generated an alert. If this is set to ``yes``, information about the cluster that generated the event won't be included in the alert.

+--------------------+-----------------------------------------+
| **Default value**  | no                                      |
+--------------------+-----------------------------------------+
| **Allowed values** | yes, no                                 |
+--------------------+-----------------------------------------+

.. _cluster_disabled:

disabled
^^^^^^^^

Toggles whether the cluster is enabled or not. If this value is set to **yes**, the cluster won't start.

+--------------------+-----------------------------------------+
| **Default value**  | no                                      |
+--------------------+-----------------------------------------+
| **Allowed values** | yes, no                                 |
+--------------------+-----------------------------------------+

.. _haproxy_helper:

haproxy_helper
--------------

.. topic:: XML sub-section name

	.. code-block:: xml

		<haproxy_helper>
		</haproxy_helper>

This section explains how to configure the HAProxy helper for agent balancing.

.. contents::
   :local:
   :depth: 1
   :backlinks: none


.. _haproxy_disabled:

haproxy_disabled
^^^^^^^^^^^^^^^^

Toggles whether the HAProxy helper is enabled or not. If this value is set to ``yes``, the helper won't start.

+--------------------+-----------------------------------------+
| **Default value**  | yes                                     |
+--------------------+-----------------------------------------+
| **Allowed values** | yes, no                                 |
+--------------------+-----------------------------------------+


.. _haproxy_address:

haproxy_address
^^^^^^^^^^^^^^^

Specifies the address of HAProxy to communicate with.

+--------------------+--------------------------------------------------+
| **Default value**  | n/a                                              |
+--------------------+--------------------------------------------------+
| **Allowed values** | Any valid address (IP or DNS) of a cluster node. |
+--------------------+--------------------------------------------------+

.. _haproxy_user:

haproxy_user
^^^^^^^^^^^^

Specifies the user of HAProxy to connect with.

+--------------------+--------------------------------------------------+
| **Default value**  | n/a                                              |
+--------------------+--------------------------------------------------+
| **Allowed values** | Any valid username.                              |
+--------------------+--------------------------------------------------+

.. _haproxy_password:

haproxy_password
^^^^^^^^^^^^^^^^

Specifies the password of HAProxy to connect with.

+--------------------+--------------------------------------------------+
| **Default value**  | n/a                                              |
+--------------------+--------------------------------------------------+
| **Allowed values** | Any password.                                    |
+--------------------+--------------------------------------------------+

.. _haproxy_port:

haproxy_port
^^^^^^^^^^^^

Specifies the port to use for the HAProxy communication.

+--------------------+-------------------------------------+
| **Default value**  | 5555                                |
+--------------------+-------------------------------------+
| **Allowed values** | Any port number from 1024 to 65535. |
+--------------------+-------------------------------------+

.. _haproxy_protocol:

haproxy_protocol
^^^^^^^^^^^^^^^^

Specifies the protocol to use for the HAProxy communication.

+--------------------+-------------------------------------+
| **Default value**  | http                                |
+--------------------+-------------------------------------+
| **Allowed values** | http, https                         |
+--------------------+-------------------------------------+

.. _haproxy_cert:

haproxy_cert
^^^^^^^^^^^^

Specifies the location of the HAProxy certificate file.

+--------------------+-------------------------------------+
| **Default value**  | n/a                                 |
+--------------------+-------------------------------------+
| **Allowed values** | Path to a valid certificate file.   |
+--------------------+-------------------------------------+

.. _client_cert:

client_cert
^^^^^^^^^^^^

Specifies the location of the client-side certificate file.

+--------------------+-------------------------------------+
| **Default value**  | n/a                                 |
+--------------------+-------------------------------------+
| **Allowed values** | Path to a valid certificate file.   |
+--------------------+-------------------------------------+

.. _client_cert_key:

client_cert_key
^^^^^^^^^^^^^^^

Specifies the location of the client-side certificate key file.

+--------------------+-----------------------------------------+
| **Default value**  | n/a                                     |
+--------------------+-----------------------------------------+
| **Allowed values** | Path to a valid certificate key file.   |
+--------------------+-----------------------------------------+

.. _client_cert_password:

client_cert_password
^^^^^^^^^^^^^^^^^^^^

Specifies the password for the client-side certificate.

+--------------------+--------------------------------------------------------+
| **Default value**  | n/a                                                    |
+--------------------+--------------------------------------------------------+
| **Allowed values** | Password used for the Client Side Certificate files.   |
+--------------------+--------------------------------------------------------+

.. _haproxy_backend:

haproxy_backend
^^^^^^^^^^^^^^^

Specifies the name of the backend that will be created in HAProxy.

+--------------------+-------------------------------------+
| **Default value**  | wazuh_reporting                     |
+--------------------+-------------------------------------+
| **Allowed values** | Any valid name.                     |
+--------------------+-------------------------------------+

.. _haproxy_resolver:

haproxy_resolver
^^^^^^^^^^^^^^^^

Specifies the name of the HAProxy resolver to use.

+--------------------+-------------------------------------+
| **Default value**  | n/a                                 |
+--------------------+-------------------------------------+
| **Allowed values** | Any valid name.                     |
+--------------------+-------------------------------------+

.. _excluded_nodes:

excluded_nodes
^^^^^^^^^^^^^^

Specifies the cluster nodes to exclude from the agent distribution.

+--------------------+----------------------------------------------------------------------+
| **Default value**  | n/a                                                                  |
+--------------------+----------------------------------------------------------------------+
| **Allowed values** | Any valid name of a cluster node separated by a comma.               |
+--------------------+----------------------------------------------------------------------+

.. _frequency:

frequency
^^^^^^^^^

Specifies the number of seconds to wait until the next check.

+--------------------+-----------------------------------------+
| **Default value**  | 60                                      |
+--------------------+-----------------------------------------+
| **Allowed values** | Any integer greater than or equal to 10.|
+--------------------+-----------------------------------------+

.. _agent_chunk_size:

agent_chunk_size
^^^^^^^^^^^^^^^^

Specifies the size of the chunk of agents to reconnect at the same time.

+--------------------+------------------------------------------+
| **Default value**  | 300                                      |
+--------------------+------------------------------------------+
| **Allowed values** | Any integer greater than or equal to 100.|
+--------------------+------------------------------------------+

.. _agent_reconnection_time:

agent_reconnection_time
^^^^^^^^^^^^^^^^^^^^^^^

Specifies the number of seconds to wait between the chunks of agents reconnected.

+--------------------+-----------------------------------------+
| **Default value**  | 5                                       |
+--------------------+-----------------------------------------+
| **Allowed values** | Any integer greater than or equal to 0. |
+--------------------+-----------------------------------------+

.. _agent_reconnection_stability_time:

agent_reconnection_stability_time
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Specifies the number of seconds to wait after reconnecting agents to a new worker.

+--------------------+-----------------------------------------+
| **Default value**  | 60                                      |
+--------------------+-----------------------------------------+
| **Allowed values** | Any integer greater than or equal to 10.|
+--------------------+-----------------------------------------+


.. _imbalance_tolerance:

imbalance_tolerance
^^^^^^^^^^^^^^^^^^^

Specifies a tolerance value to determine when a cluster is unbalanced.

+--------------------+-----------------------------------------+
| **Default value**  | 0.1                                     |
+--------------------+-----------------------------------------+
| **Allowed values** | Any float between 0 and 1.              |
+--------------------+-----------------------------------------+

.. _remove_disconnected_node_after:

remove_disconnected_node_after
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Specifies the number of minutes to wait to remove a disconnected worker.

+--------------------+-----------------------------------------+
| **Default value**  | 240                                     |
+--------------------+-----------------------------------------+
| **Allowed values** | Any integer greater than or equal to 0. |
+--------------------+-----------------------------------------+

Sample configuration
--------------------

.. code-block:: xml

    <cluster>
      <name>wazuh</name>
      <node_name>manager_01</node_name>
      <node_type>master</node_type>
      <key>ugdtAnd7Pi9myP7CVts4qZaZQEQcRYZa</key>
      <port>1516</port>
      <bind_addr>0.0.0.0</bind_addr>
      <nodes>
        <node>master</node>
      </nodes>
      <hidden>no</hidden>
      <disabled>no</disabled>
      <haproxy_helper>
        <haproxy_disabled>no</haproxy_disabled>
        <haproxy_address>wazuh-proxy</haproxy_address>
        <haproxy_user>haproxy</haproxy_user>
        <haproxy_password>haproxy</haproxy_password>
        <haproxy_port>5555</haproxy_port>
        <haproxy_protocol>http</haproxy_protocol>
        <haproxy_backend>wazuh_cluster</haproxy_backend>
        <frequency>60</frequency>
        <agent_chunk_size>100</agent_chunk_size>
        <agent_reconnection_time>10</agent_reconnection_time>
        <agent_reconnection_stability_time>60</agent_reconnection_stability_time>
        <imbalance_tolerance>0.1</imbalance_tolerance>
        <remove_disconnected_node_after>10</remove_disconnected_node_after>
      </haproxy_helper>
    </cluster>
