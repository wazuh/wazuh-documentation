.. _wazuh-cluster:

Deploying a Wazuh cluster
=========================

.. versionadded:: 3.0.0

The Wazuh cluster functionality has been developed to strengthen the communication between agents and managers. The cluster can synchronize events between its nodes to allow agents to report them to any manager that is a part of the cluster.

- `Why do we need a Wazuh cluster?`_
- `How it works`_
- `Use case: Deploying a Wazuh cluster`_

Why do we need a Wazuh cluster?
-------------------------------

The Wazuh cluster provides horizontal scalability to the Wazuh environment, allowing agents to report to any manager belonging to the cluster. This enables Wazuh to process a greater number of events than a single manager environment, distributing the load between multiple managers simultaneously.

Additionally, a cluster of Wazuh managers provides a level of fault tolerance so that if one manager goes off-line, Wazuh can continue operating so long as the master manager is still accessible. To accomplish this, agents that were reporting to a manager that goes off-line will automatically be redirected to another manager in the cluster without losing events. This functionality dramatically increases the availability and efficiency of the Wazuh environment.

Please note, however, that the cluster functionality does not provide automated load balancing. We recommend that a load balancer be configured between agents and the cluster nodes. With a load balancer in place, the agents would be configured to use the IP of the load balancer as their manager IP.

The Wazuh cluster is under continuous development and we hope to include many additional features very soon, including switching the role of master between all managers to provide even greater availability and fault tolerance.

How it works
------------

The Wazuh cluster is managed by a cluster daemon which communicates with the managers following a master-client architecture.

.. note::
  The date and time must be synchronized between all managers in the cluster. This can be done using the `NTP (Network Time Protocol) <https://wiki.debian.org/NTP>`_.

Master
^^^^^^

The master node is the manager that controls the cluster. The configuration of the master node is pushed to the other managers which allows for the centralization of the following:

- agent registration,
- agent deletion,
- configuration of agents grouping, and
- centralized configuration of the ``agent.conf`` file used by the agents within each agent group.

The master node sends to its clients the complete ``etc/shared`` directory contained in its Wazuh installation directory.  This includes the centralized configuration of agents ordered by groups and the ``client.keys`` file. These shared files allow agents to report to any manager of the cluster.

The communication between the nodes of the cluster is performed by means of a self-developed protocol.  This synchronization occurs at the frequency defined in the ``<cluster>`` section of :doc:`Local configuration <../reference/ossec-conf/cluster>`. These cluster communications are sent with the AES encryption algorithm providing for security and confidentiality.

Client
^^^^^^

Cluster managers that have the client role update their files with the data received from the master node. This ensures that the shared configuration for the agents is the same in all managers.

Client nodes send the ``agent-info`` file of their reporting agents to the master. This file contains important information about each agent and allows the master node to have real-time awareness of the connection status of all agents and the manager that each agent is reporting to.

Cluster daemons
^^^^^^^^^^^^^^^
Wazuh clusters function through the use of the following two daemons:

- **wazuh-clusterd** synchronizes the managers in the cluster and outputs a logfile to ``logs/cluster.log``.

- **wazuh-clusterd-internal** monitors the files to synchronize and manages the cluster database. The logs of this daemon can be found in the ``logs/ossec.log`` file.

Both of these daemons must be running in all the managers of the cluster. The **wazuh-clusterd** will automatically start the **wazuh-clusterd-internal** daemon.

Refer to the :doc:`Daemons <../reference/daemons/index>` section for more information about the use of these daemons.

Cluster management
^^^^^^^^^^^^^^^^^^

The cluster can be efficiently controlled from any manager with the **cluster_control** tool. This tool allows you to obtain real-time information about any node, the status of the synchronized files and information about agents connected to the cluster.

The manual for this tool can be found at :doc:`cluster_control tool <../reference/tools/cluster_control>`.

Cluster database
^^^^^^^^^^^^^^^^^

The cluster database has been incorporated into the database for each manager in the cluster.  This database is called `cluster_db` and contains information about the syncronization status of the files. Each row of the database contains the ``<node> <file> <state>`` fields.


Use case: Deploying a Wazuh cluster
-----------------------------------

.. note::
  To run the wazuh-clusterd binary, **Python 2.7** is required. If your OS has a previous python version, please refer to `Run the cluster in CentOS 6`_ for instructions on how to update to and use **Python 2.7**.

Follow these steps to deploy a Wazuh cluster:

1. Install dependencies

  a. For RPM-based distributions:

    .. code-block:: console

      # yum install python-setuptools python-cryptography

  b. For Debian-based distributions:

    .. code-block:: console

      # apt install python-cryptography

2. Set the configurtion of the managers of the cluster.

  In the ``<cluster>`` section of the :doc:`Local configuration <../reference/ossec-conf/cluster>`, set the configuration for the cluster as below:

  - Designate one manager as the master and the rest as clients under the ``<node_type>`` field.
  - The key must be 32 characters long and should be the same for all of the nodes of the cluster. Use the following command to generate a random password:

      .. code-block:: console

          # openssl rand -hex 16

  - The IP addresses of all of the **nodes** of the cluster must be specified under ``<nodes>``, including the IP of the local manager. The managers will use the bash command ``hostname --all-ip-addresses`` to find out which IP from the list is theirs. If the ``hostname --all-ip-addresses`` command finds there is a duplicate IP address, an error will be displayed.

  The following is an example of this configuration:

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
        <hidden>no</hidden>
        <disabled>yes</disabled>
      </cluster>

3. To enable the Wazuh cluster, set ``<disabled>`` to ``no`` in the ``<cluster>`` section of the ossec.conf file and restart:

    .. code-block:: console

        # /var/ossec/bin/ossec-control restart

4. The cluster should now be synchronized with the same shared files in all managers.

Run the cluster in CentOS 6
---------------------------
Python 2.6 is the default python version in CentOS 6. Since Python 2.7 is required to run the cluster, follow these steps to install and use this version:

1. Install Python 2.7 as follows:
  
  .. code-block:: console

    # yum install -y centos-release-scl
    # yum install -y python27

2. Enable python 2.7 in bash:

  .. code-block:: console

    # scl enable python27 bash

3. The default version of ``sqlite3`` library is also not compatible with Wazuh clusters.  However, a compiled version of ``sqlite3`` that is compatible can be found at ``/var/ossec/framework/lib``. Load this version as follows:
  
  1. Install ``chrpath``:

    .. code-block:: console

      # yum install -y chrpath

  2. Use ``chrpath`` to remove the reference path to the system's sqlite3 library:

    .. code-block:: console

      # chrpath --delete /opt/rh/python27/root/usr/lib64/python2.7/lib-dynload/_sqlite3.so

  3. Add the compiled version of sqlite3 to the ``LD_LIBRARY_PATH`` variable:

    .. code-block:: console

      # export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/var/ossec/framework/lib

  4. Install dependencies:

    .. code-block:: console

      # /opt/rh/python27/root/usr/bin/pip2.7 install cryptography

  5. Use ``python2.7`` to start the cluster daemon:

    .. code-block:: console

      # python2.7 /var/ossec/bin/wazuh-clusterd

  6. Finally, check the status of the cluster as follows:

    .. code-block:: console

      # ps -aux | grep cluster
      ossec     6533  0.0  1.4 135424 15128 ?        S    07:19   0:00 python2.7 /var/ossec/bin/wazuh-clusterd
      root      6536  0.0  0.4 158608  4584 ?        Ssl  07:19   0:00 /var/ossec/bin/wazuh-clusterd-internal -tmaster
      ossec     6539  0.0  1.5 136464 15932 ?        S    07:19   0:00 python2.7 /var/ossec/bin/wazuh-clusterd
      root      6556  0.0  0.2   8032  2092 ?        S+   07:21   0:00 grep cluster
