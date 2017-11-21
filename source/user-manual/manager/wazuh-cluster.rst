.. _wazuh-cluster:

Deploying a Wazuh cluster
=========================

.. versionadded:: 3.0.0

The Wazuh cluster has been developed in order to get a stronger communication between agents and managers. This means that the cluster is able to synchronize the necessary files between
its nodes to allow agents to report events to any manager of the cluster.

- `Why do we need a Wazuh cluster?`_
- `How it works`_
- `Use case: Deploying a Wazuh cluster`_

Why do we need a Wazuh cluster?
-------------------------------

The Wazuh cluster provides horizontal scalability to our Wazuh environment, allowing agents to report to any manager belonging to the cluster. This way, we have the ability
to process more events than before distributing the load of information between several managers simultaneously.

In addition, a cluster of Wazuh managers is prepared to handle the fall of any manager without affecting its operation, unless it is the master manager.
Agents that were reporting to this fallen manager will start to report to another manager of the cluster automatically, without the loss of events.

Finally, the Wazuh cluster is in continuous development and we hope it to include many new features very soon. For example, we refer to the possibility of
switching the role of master between all managers to provide high availability.


How it works
------------

The Wazuh cluster is managed by a cluster daemon which communicates managers, following a master-client architecture.

Master
^^^^^^^^

The master node is the manager who has the control of the cluster. This means that every configuration done in the master node is pushed to the others managers, and it allows
to centralize the following configurations:

- Agents registration and deletion.
- Configuration of agents grouping.
- Centralized configuration for agents, synchronizing its ``agent.conf`` file.

To sum up, the master node sends to its clients the whole ``etc/shared`` directory contained in the Wazuh installation directory, with
the centralized configuration of each agent ordered by groups, as well as the ``client.keys`` file. These shared files agents to report to any manager of the cluster.

The comunications between nodes of the cluster are made with a self developed protocol which synchronizes those files with a specific interval time, defined in
the ``<cluster>`` section of :doc:`Local configuration <../reference/ossec-conf/cluster>`.
These communications are encrypted with AES providing confidentiality.


Client
^^^^^^^^

Managers which have the client role in the cluster receive the data from the master node, and update their files with the received ones. This way, it's guaranteed that the shared configuration
for the agents is the same in all managers.

On the other hand, client nodes send to the master the ``agent-info`` file of their reporting agents. This file contains the most important information of each agent, and allows to the master node to know in real-time
the connection state of agents, as well as the manager each agent is reporting to.

Cluster daemons
^^^^^^^^^^^^^^^^^

- **wazuh-clusterd** is the module that manage the synchronization between managers in the cluster. There exits a file located at ``logs/cluster.log`` where can be found all the logging messages of this daemon.

- **wazuh-clusterd-internal** is the daemon in charge of monitoring the files to synchronize and managing the cluster database. The logs of this daemon are stored in ``logs/ossec.log`` file.

Those daemons must be running in all the managers of the cluster in order to ensure everything works properly. The **wazuh-clusterd** will start the **wazuh-clusterd-internal** daemon.

Refer to the section :doc:`Daemons <../reference/daemons/index>` to find out more information about the usage of these daemons.

Cluster database
^^^^^^^^^^^^^^^^^

It has been incorporated a database for each manager in the cluster called `cluster_db`. Information about the state of each synchronized
file is stored in that database. Each row of the database has the structure ``<node> <file> <state>``.


Use case: Deploying a Wazuh cluster
-----------------------------------

In order to deploy a Wazuh cluster, follow these steps:

1. Set the properly configuration in all the managers of the cluster.

In the ``<cluster>`` section of the :doc:`Local configuration <../reference/ossec-conf/cluster>` it should be set the configuration for the cluster regarding the following considerations.

- One manager should be the master and the other ones, the clients. This is specified in the ``<node_type>`` field.
- The key should be the same for all the nodes of the cluster and it must be 32 characters long. To generate a random password you can use the following command:

    .. code-block:: bash

        $ openssl rand -hex 16

- The IP addresses of all **nodes** of the cluster must be specified in the ``<nodes>``, including the IP of the local manager. The managers will use the bash command ``hostname --all-ip-addresses`` to find out which IP from the list is theirs. If none of the IPs match with the ones returned by the ``hostname --all-ip-addresses`` command, an error will be raised.

An example of configuration could be the following.

.. code-block:: xml

    <cluster>
      <name>cluster01</name>
      <node_name>manager_centos</node_name>
      <node_type>master</node_type>
      <key>nso42FGdswR0805tnVqeww0u3Rubwk2a</key>
      <interval>2m</interval>
      <port>1516</port>
      <bind_addr>0.0.0.0</bind_addr>
      <nodes>
        <node>192.168.0.3</node>
        <node>192.168.0.4</node>
        <node>192.168.0.5</node>
      </nodes>
    </cluster>

2. Agents should be configured for connecting to all the managers of the cluster.

For example, if we have three managers in the cluster with the IP addresses ``192.168.0.3-5`` the configuration in agents should be like this.

.. code-block:: xml

    <client>
      ...
      <server>
        <address>192.168.0.3</address>
        <port>1514</port>
        <protocol>udp</protocol>
      </server>
      <server>
        <address>192.168.0.4</address>
        <port>1514</port>
        <protocol>tcp</protocol>
      </server>
      <server>
        <address>192.168.0.5</address>
        <port>1514</port>
        <protocol>tcp</protocol>
      </server>
      ...
    </client>


3. Enable and start the Wazuh cluster daemon in managers for starting the synchronization.

    .. code-block:: bash

        $ sudo /var/ossec/bin/ossec-control enable cluster
        $ sudo /var/ossec/bin/wazuh-clusterd

4. Since this moment, the cluster should be synchronized and the shared files should be the same in all the managers.
