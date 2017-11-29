.. _reference_ossec_cluster:

cluster
=======

.. topic:: XML section name

	.. code-block:: xml

		<cluster>
		</cluster>

This section allows to configure the Wazuh cluster for synchronize managers.

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

This field specifies the name of the cluster this node belongs to.

+--------------------+---------------+
| **Default value**  | wazuh         |
+--------------------+---------------+
| **Allowed values** | Any name      |
+--------------------+---------------+

node_name
^^^^^^^^^^

The name of the current node of the cluster.

+--------------------+---------------+
| **Default value**  | node01        |
+--------------------+---------------+
| **Allowed values** | Any name      |
+--------------------+---------------+

node_type
^^^^^^^^^^

The role of the node.

+--------------------+------------------+
| **Default value**  | master           |
+--------------------+------------------+
| **Allowed values** | master, client   |
+--------------------+------------------+

key
^^^^

Any key for encrypting the communication between nodes. It must be 32 characters long. Refer to the :doc:`Wazuh cluster manual <../../manager/wazuh-cluster>` to find out how to generate a key.

.. note::
	This key has to be the same for all the nodes of the cluster.

+--------------------+---------------------------------------------+
| **Default value**  | n/a                                         |
+--------------------+---------------------------------------------+
| **Allowed values** | Any alphanumeric string of 32 characters.   |
+--------------------+---------------------------------------------+

interval
^^^^^^^^

Interval between cluster synchronizations.

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 2m                                                                                                                                       |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes)                       |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+


port
^^^^^^

Specify the port for the cluster communications.

+--------------------+---------------------------------------------+
| **Default value**  | 1516                                        |
+--------------------+---------------------------------------------+
| **Allowed values** | Any port number from 1 to 65535 is allowed. |
+--------------------+---------------------------------------------+


bind_addr
^^^^^^^^^^

When the node has multiple network interfaces, this parameter specifies which IP address will comunicate with the cluster.

+--------------------+----------------------------------+
| **Default value**  | 0.0.0.0                          |
+--------------------+----------------------------------+
| **Allowed values** | Any valid IP address is allowed. |
+--------------------+----------------------------------+

nodes
^^^^^^

List to specify all the nodes that make up the cluster, using the ``<node>`` tag for each one.

.. note::
	This list must be the same in all managers of the cluster. For each manager, specify any of the IPs returned
	by the ``hostname --all-ip-addresses`` command. If not, an error will be raised.

+--------------------+-----------------------------------------+
| **Default value**  | localhost                               |
+--------------------+-----------------------------------------+
| **Allowed values** | Any valid IP address of a cluster node. |
+--------------------+-----------------------------------------+

hidden
^^^^^^^

If it is set to yes, information about the cluster that generated the event will be added to the alert.

+--------------------+-----------------------------------------+
| **Default value**  | no                                      |
+--------------------+-----------------------------------------+
| **Allowed values** | yes/no                                  |
+--------------------+-----------------------------------------+

Example of configuration
------------------------

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
