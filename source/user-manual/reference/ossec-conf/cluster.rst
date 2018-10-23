.. Copyright (C) 2018 Wazuh, Inc.

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
- `interval`_
- `port`_
- `bind_addr`_
- `nodes`_
- `hidden`_
- `disabled`_

name
^^^^

Specifies the name of the cluster this node belongs to.

+--------------------+---------------+
| **Default value**  | wazuh         |
+--------------------+---------------+
| **Allowed values** | Any name      |
+--------------------+---------------+

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

node_type
^^^^^^^^^

Specifies the role of the node.

+--------------------+------------------+
| **Default value**  | master           |
+--------------------+------------------+
| **Allowed values** | master, worker   |
+--------------------+------------------+

.. warning::

	Using ``client`` as ``node_type`` in configuration is still valid but a warning message will be shown in logs.

key
^^^

Defines the key used to encrypt the communication between the nodes. This key must be 32 characters long. Refer to the :ref:`deploy_wazuh_cluster` for information on how to generate a key.

.. note::
	This key must be the same for all of the nodes of the cluster.

+--------------------+---------------------------------------------+
| **Default value**  | n/a                                         |
+--------------------+---------------------------------------------+
| **Allowed values** | Any alphanumeric string of 32 characters.   |
+--------------------+---------------------------------------------+

interval
^^^^^^^^

.. deprecated:: 3.2.3

Sets the interval between cluster synchronizations.

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 2m                                                                                                                                       |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number ending with a character that indicates a time unit, such as s (seconds) or m (minutes).                                |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+


port
^^^^

Specifies the port to use for the cluster communications.

+--------------------+----------------------------------+
| **Default value**  | 1516                             |
+--------------------+----------------------------------+
| **Allowed values** | Any port number from 1 to 65535. |
+--------------------+----------------------------------+


bind_addr
^^^^^^^^^^

Specifies which IP address will communicate with the cluster when the node has multiple network interfaces.

+--------------------+-----------------------+
| **Default value**  | 0.0.0.0               |
+--------------------+-----------------------+
| **Allowed values** | Any valid IP address. |
+--------------------+-----------------------+

nodes
^^^^^

Lists all master nodes in the cluster using the ``<node>`` tag for each one.

+--------------------+--------------------------------------------------+
| **Default value**  | NODE_IP                                          |
+--------------------+--------------------------------------------------+
| **Allowed values** | Any valid address (IP or DNS) of a cluster node. |
+--------------------+--------------------------------------------------+

.. note::
	The current cluster only allows one master node, therefore this list must have only one element. If more elements are found, **the first one will be used as master** and the rest will be ignored.

hidden
^^^^^^

Toggles whether or not to show information about the cluster that generated an alert. If this is set to ``yes``, information about the cluster that generated the event won't be included in the alert.

+--------------------+-----------------------------------------+
| **Default value**  | no                                      |
+--------------------+-----------------------------------------+
| **Allowed values** | yes, no                                 |
+--------------------+-----------------------------------------+

disabled
^^^^^^^^

Toggles whether the cluster is enabled or not. If this value is set to **yes**, the cluster won't start.

+--------------------+-----------------------------------------+
| **Default value**  | yes                                     |
+--------------------+-----------------------------------------+
| **Allowed values** | yes, no                                 |
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
    </cluster>
