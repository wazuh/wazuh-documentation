.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh-cluster:

Configuring a Wazuh cluster
===========================

.. versionadded:: 3.0.0

The Wazuh cluster functionality has been developed to strengthen the communication between agents and managers. The cluster can synchronize events between its nodes to allow agents to report events to any manager that is a part of the cluster.

- `Why do we need a Wazuh cluster?`_
- `How it works`_
- `Types of nodes`_
- `Cluster management`_
- `Deploying a Wazuh cluster`_
- `Updating the cluster from older versions`_
- `Run the cluster in CentOS 6`_

Why do we need a Wazuh cluster?
-------------------------------

The Wazuh cluster provides horizontal scalability to the Wazuh environment, allowing agents to report to any manager belonging to the cluster. This enables Wazuh to process a greater number of events than with a single manager environment as the cluster distributes the load between multiple managers simultaneously.

Additionally, a cluster of Wazuh managers provides a level of fault tolerance so that if one manager goes off-line, Wazuh can continue operating so long as the master manager is still accessible. To accomplish this, agents that were reporting to a manager that goes off-line will automatically be redirected to another manager in the cluster without losing events. This functionality dramatically increases the availability and efficiency of the Wazuh environment.

Please note, however, that the cluster functionality does not provide automated load balancing. We recommend that a load balancer be configured between agents and the cluster nodes. With a load balancer in place, the agents would be configured to use the IP address of the load balancer as their manager IP address.

The Wazuh cluster is under further development and we hope to include many additional features very soon, including switching the role of master between all managers to provide even greater availability and fault tolerance.

How it works
------------

The Wazuh cluster is managed by a cluster daemon which communicates with the managers following a master-client architecture.

The image bellow shows the communications between a client and a master node. Each client-master communication is independent from each other, since clients are the ones who start the communication with the master.

There are different independent threads running, each one is framed in the image:

    - **Keep alive thread**: Responsible of sending a keep alive to the master every so often.
    - **Agent info thread**: Responsible of sending the statuses of the agents that are reporting to that node.
    - **Integrity thread**: Responsible of synchronizing the files sent by the master.

The cluster only uses the daemon **wazuh-clusterd**, which outputs to the file ``logs/cluster.log``. Refer to the :doc:`Daemons <../reference/daemons/clusterd>` section for more information about its use.

.. image:: ../../images/manual/cluster/cluster_flow.png

Keep alive thread
^^^^^^^^^^^^^^^^^

This thread is responsible of sending a keep-alive to the master every so often. This keep-alive thread is necessary to keep the connection opened between master and client, since the cluster uses permanent connections.

.. _agent-info-thread:

Agent info thread
^^^^^^^^^^^^^^^^^

This thread is responsible of sending the :ref:`statuses of the agents <agent-status-cycle>` that are reporting to the sender node. The master checks the modification date of each received agent status file and keeps the most recent one.

The master also checks whether the agent exists or not before saving its status update. This is done to prevent the master to store unnecessary information. For example, this situation is very common when an agent is removed but the master hasn't notified client nodes yet.

.. _integrity-thread:

Integrity thread
^^^^^^^^^^^^^^^^

This thread is responsible of synchrozing the files sent by the master node to the clients. Those files are:

- :ref:`agent-keys-registration` file.
- :doc:`User defined rules, decoders <../ruleset/custom>` and :doc:`CDB lists <../ruleset/cdb-list>`.
- :doc:`Agent groups files and assignments <../agents/grouping-agents>`. The master can require agent groups assignments from a client node if an agent starts reporting in that client node.

The integrity of each file is calculated using its MD5 checksum and its modification time. To avoid calculating the integrity with each client connection, the integrity is calculated in a different thread, called *File integrity thread*, in the master node every so often.

Types of nodes
--------------

Master
^^^^^^

The master node is the manager that controls the cluster. The configuration of the master node is pushed to the client nodes which allows for the centralization of the following:

- agent registration,
- agent deletion,
- rules, decoders and CDB lists synchronization,
- configuration of agents grouping

The master doesn't send its :doc:`local configuration file <../reference/index>` to the clients. If the configuration is changed in the master node, it should be changed manually in the clients. When synchronizing the configuration manually, take care of not overwriting the cluster section in the local configuration of each client.

Also, when rules, decoders or CDB lists are synchronized, the client nodes are not being restarted. They must be restarted manually.

The communication between the nodes of the cluster is performed by means of a self-developed protocol. These cluster communications are sent with the AES encryption algorithm providing for security and confidentiality.

Client
^^^^^^

Client nodes are responsible of two main tasks:

    - Synchronizing :ref:`integrity files <integrity-thread>` from the master node.
    - Sending :ref:`agent status updates <agent-info-thread>` to the master.


Cluster management
------------------

The cluster can be efficiently controlled from any manager with the **cluster_control** tool. This tool allows you to obtain real-time information about the cluster health, connected nodes and the agents reporting to the cluster.

The manual for this tool can be found at :doc:`cluster_control tool <../reference/tools/cluster_control>`.


.. _deploy_wazuh_cluster:

Deploying a Wazuh cluster
-------------------------

.. note::
  To run the wazuh-clusterd binary, **Python 2.7** or higher is required. If your OS has a previous python version, please refer to `Run the cluster in CentOS 6`_ for instructions on how to update to and use **Python 2.7**.

Follow these steps to deploy a Wazuh cluster:

1. Install dependencies

  a. For RPM-based distributions:

    .. code-block:: console

      # yum install python-setuptools python-cryptography

  b. For Debian-based distributions:

    .. code-block:: console

      # apt install python-cryptography

2. Set the cluster configuration

  Using the ``<cluster>`` section in the :doc:`Local configuration <../reference/ossec-conf/cluster>`, set the cluster configuration as below:

  - Select one manager as the master and the rest as clients under the ``<node_type>`` field.
  - Add a key under the ``<key>``. The key must be 32 characters long and should be the same for all of the nodes of the cluster. Use the following command to generate a random one:

      .. code-block:: console

          # openssl rand -hex 16

  - Enable the cluster setting the field ``<disabled>`` to ``no``.
  - The address of the **master** must be specified under ``<nodes>`` in all nodes (including the master itself). The address can be either an IP or a DNS.

  The following is an example of this configuration:

  .. code-block:: xml

    <cluster>
        <name>wazuh</name>
        <node_name>node02</node_name>
        <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
        <node_type>client</node_type>
        <port>1516</port>
        <bind_addr>0.0.0.0</bind_addr>
        <nodes>
          <node>master</node>
        </nodes>
        <hidden>no</hidden>
        <disabled>no</disabled>
    </cluster>


3. Restart the node

    .. code-block:: console

        # /var/ossec/bin/ossec-control restart

.. _run-cluster-centos6:

Updating the cluster from older versions
----------------------------------------
If you already have a cluster installation from a **version inferior to 3.2.2**, you should do some changes in your cluster configuration:

    * Remove ``<interval>`` section.
    * Remove client nodes from ``<nodes>`` section.

The cluster will work with an old configuration but it is recommended to update it.


Run the cluster in CentOS 6
---------------------------
Python 2.6 is the default python version in CentOS 6. Since Python 2.7 is required to run the cluster, follow these steps to install and use this version:

1. Install Python 2.7 as follows:

  .. code-block:: console

    # yum install -y centos-release-scl
    # yum install -y python27

2. Install the Python package ``cryptography`` via pip:

  .. code-block:: console

    # export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/rh/python27/root/usr/lib64:/opt/rh/python27/root/usr/lib
    # /opt/rh/python27/root/usr/bin/pip2.7 install cryptography

3. Since the cluster doesn't use the default python version in CentOS 6, the service file should be modified to load the correct python version when ``wazuh-manager`` service starts:

  .. code-block:: console

     # sed -i 's#echo -n "Starting OSSEC: "#echo -n "Starting OSSEC (EL6): "; source /opt/rh/python27/enable; export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/var/ossec/framework/lib#' /etc/init.d/wazuh-manager

4. Use ``service`` command instead of ``/var/ossec/bin/ossec-control`` to start, stop and restart Wazuh:

  .. code-block:: console

    # service wazuh-manager restart
    Stopping OSSEC:                                            [  OK  ]
    Starting OSSEC (EL6):                                      [  OK  ]

5. Finally, check the cluster is running:

  .. code-block:: console

    # ps aux | grep cluster
    ossec     9725  0.1  1.3 137364 14216 ?        S    14:22   0:00 python /var/ossec/bin/wazuh-clusterd
    root      9767  0.0  0.0 103340   904 pts/0    S+   14:22   0:00 grep cluster
