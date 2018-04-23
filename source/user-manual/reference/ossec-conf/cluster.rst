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
| **Allowed values** | master, client   |
+--------------------+------------------+

key
^^^

Defines the key used to encrypt the communication between the nodes. This key must be 32 characters long. Refer to the :doc:`Wazuh cluster manual <../../manager/wazuh-cluster>` for information on how to generate a key.

.. note::
	This key must be the same for all of the nodes of the cluster.

+--------------------+---------------------------------------------+
| **Default value**  | n/a                                         |
+--------------------+---------------------------------------------+
| **Allowed values** | Any alphanumeric string of 32 characters.   |
+--------------------+---------------------------------------------+

interval
^^^^^^^^

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

Lists all of the nodes that make up the cluster using the ``<node>`` tag for each one.

+--------------------+-----------------------------------------+
| **Default value**  | localhost                               |
+--------------------+-----------------------------------------+
| **Allowed values** | Any valid IP address of a cluster node. |
+--------------------+-----------------------------------------+

.. note::
	This list must be the same in all managers of the cluster. For each manager, specify any of the IP addresses returned by the ``hostname --all-ip-addresses`` command. If this is not correct, it will result in an error.

hidden
^^^^^^

Toggles whether or not to show information about the cluster that generated an alert. If this is set to ``yes``, information about the cluster that generated the event won't be included in the alert.

+--------------------+-----------------------------------------+
| **Default value**  | no                                      |
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
      <interval>2m</interval>
      <port>1516</port>
      <bind_addr>0.0.0.0</bind_addr>
      <nodes>
        <node>172.17.0.2</node>
        <node>172.17.0.3</node>
        <node>172.17.0.4</node>
      </nodes>
      <hidden>no</hidden>
    </cluster>
