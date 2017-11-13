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
- `host`_
- `nodes`_

name
^^^^

This field specifies the name of the cluster to which this node belongs.

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

The role of this node.

+--------------------+------------------+
| **Default value**  | master           |
+--------------------+------------------+
| **Allowed values** | master, slave    |
+--------------------+------------------+

key
^^^^

**Describe this field.**

interval
^^^^^^^^

Interval between cluster synchronizations.

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 2m                                                                                                                                       |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days). |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+


port
^^^^^^

Specify the port for the cluster communications.

+--------------------+---------------------------------------------+
| **Default value**  | 1516                                        |
+--------------------+---------------------------------------------+
| **Allowed values** | Any port number from 1 to 65535 is allowed. |
+--------------------+---------------------------------------------+


host
^^^^

**Describe this field.**

nodes
^^^^^^

List to specify all the nodes that make up the cluster, using the `<node>` tag for each one.

+--------------------+---------------------------------+
| **Default value**  | localhost                       |
+--------------------+---------------------------------+
| **Allowed values** | Any node name                   |
+--------------------+---------------------------------+

Example of configuration
------------------------

.. code-block:: xml

    <cluster>
      <name>wazuh</name>
      <node_name>manager_01</node_name>
      <key>ugdtAnd7Pi9myP7CVts4qZaZQEQcRYZa</key>
      <interval>2m</interval>
      <port>1516</port>
      <host></host>
      <nodes>
        <node>manager_01</node>
        <node>manager_02</node>
        <node>manager_03</node>
      <nodes>
    </cluster>
