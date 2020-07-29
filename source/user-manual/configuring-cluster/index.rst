.. Copyright (C) 2020 Wazuh, Inc.

.. _configuring-cluster:

Deploying a Wazuh cluster
===========================

.. meta::
  :description: A complete user manual about how to configure a Wazuh cluster.

.. toctree::
    :maxdepth: 1
    :hidden:

    basics
    advanced-settings
    cluster_management

.. title:: Getting started

.. _gt-cluster:

.. topic:: Cluster nodes configuration

    The Wazuh cluster is made up by manager type nodes where one of them is the master node and the rest are worker nodes. For both node types, the configuration file ``/var/ossec/etc/ossec.conf`` contains the cluster configuration values.
    Inside the labels ``<cluster>...</cluster>`` are the following configuration values:

        - :ref:`name <cluster_name>`: Name that we will assign to the cluster
        - :ref:`node_name <cluster_node_name>`: Name of the current node
        - :ref:`key <cluster_key>`: The key must be 32 characters long and should be the same for all of the nodes of the cluster. You may use the following command to generate a random one:

            .. code-block:: console

                # openssl rand -hex 16

        - :ref:`node_type <cluster_node_type>`: Set the node type (master/worker)
        - :ref:`port <cluster_port>`: Destination port for cluster communication
        - :ref:`bind_addr <cluster_bind_addr>`: IP where this node is listening to (0.0.0.0 any IP)
        - :ref:`nodes <cluster_nodes>`: The address of the **master** must be specified in all nodes (including the master itself). The address can be either an IP or a DNS.
        - :ref:`hidden <cluster_hidden>`: Toggles whether or not to show information about the cluster that generated an alert.
        - :ref:`disabled <cluster_disabled>`: Indicates whether the node will be enabled or not in the cluster.

    We are going to configure a cluster with a master node and a single worker node, for the **master node** we set the following configuration:

        .. code-block:: xml

            <cluster>
                <name>wazuh</name>
                <node_name>master-node</node_name>
                <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
                <node_type>master</node_type>
                <port>1516</port>
                <bind_addr>0.0.0.0</bind_addr>
                <nodes>
                    <node>master</node>
                </nodes>
                <hidden>no</hidden>
                <disabled>no</disabled>
            </cluster>

    Restart the master node:

        .. code-block:: console

            # systemctl restart wazuh-manager

    Now it is time to configure the **worker node**:

        .. code-block:: xml

            <cluster>
                <name>wazuh</name>
                <node_name>worker01-node</node_name>
                <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
                <node_type>worker</node_type>
                <port>1516</port>
                <bind_addr>0.0.0.0</bind_addr>
                <nodes>
                    <node>master</node>
                </nodes>
                <hidden>no</hidden>
                <disabled>no</disabled>
            </cluster>

    Restart the worker node:

        .. code-block:: console

            # systemctl restart wazuh-manager

    Let's execute the following command (works on both worker and master nodes) to check that everything works correctly:

        .. code-block:: console

            # /var/ossec/bin/cluster_control -l

        .. code-block:: none
            :class: output

            NAME           TYPE    VERSION  ADDRESS
            master-node    master  |WAZUH_LATEST|   wazuh-master
            worker01-node  worker  |WAZUH_LATEST|   172.22.0.3


    .. warning::

        **All agents must be registered in the master node, even if the agent is going to report to the worker node**. The master is responsible for replicating the new agent's information across all worker nodes. If an agent is registered in a worker node, it will be **deleted** by the master node.


.. topic:: Forwarder installation

    - The apps must be configured to point to the master's API.
    - All manager nodes need an event forwarder in order to send data to Elasticsearch or Splunk. Install **Filebeat** if you're using the **Elastic stack** or **Splunk forwarder** if you're using **Splunk**. This is only necessary if the node is in a separated instance from Elasticsearch or Splunk.

    **Installing Filebeat:**

    +---------------------------------------------------------------------+------------------------------------------------+
    | Type                                                                | Description                                    |
    +=====================================================================+================================================+
    | :ref:`Wazuh single node cluster<wazuh_server_single_node_filebeat>` | Install Filebeat on Wazuh single node cluster. |
    +---------------------------------------------------------------------+------------------------------------------------+
    | :ref:`Wazuh multi node cluster<wazuh_server_multi_node_filebeat>`   | Install Filebeat on Wazuh multi node cluster.  |
    +---------------------------------------------------------------------+------------------------------------------------+
    

    **Installing Splunk forwarder:**

    +-------------------------------------------------------------------+-------------------------------------------------------------+
    | Type                                                              | Description                                                 |
    +===================================================================+=============================================================+
    | :ref:`RPM/DEB packages <splunk_forwarder>`                        | Install Splunk forwarder for RPM or DEB based OS.           |
    +-------------------------------------------------------------------+-------------------------------------------------------------+


.. _deploy_wazuh_agents_cluster:

.. topic:: Pointing agents to the cluster nodes

    Finally, the configuration of the agents has to be modified in order to report to the cluster.
    In this case the agent 001 will report to the worker01-node node. To achieve this we must modify the information contained in the labels ``<client><server>`` in the file ``/var/ossec/etc/ossec.conf``, where we will place the IP of the node we want to report to, in our case it would look like this:

        .. code-block:: xml

            <client>
                <server>
                    <address>WORKER01_NODE_IP</address>
                    ...
                </server>
            </client>

    Restart the agent:

        .. code-block:: console

            # systemctl restart wazuh-agent

    The second agent will report to the master-node node, for this we will place the IP of our master in the agent configuration, as we have seen in the previous case:

        .. code-block:: xml

            <client>
                <server>
                    <address>MASTER_NODE_IP</address>
                    ...
                </server>
            </client>

    Restart the agent:

        .. code-block:: console

            # systemctl restart wazuh-agent


    Let's execute the following command (works on both, worker and master nodes) to check that the agents are correctly connected:

        .. code-block:: console

            # /var/ossec/bin/agent_control -l

        .. code-block:: none
            :class: output

            Wazuh agent_control. List of available agents:
                ID: 000, Name: agent000 (server), IP: 127.0.0.1, Active/Local
                ID: 001, Name: agent001, IP: 172.18.0.5, Active
                ID: 002, Name: agent002, IP: 172.18.0.6, Active

    .. note::

        We recommend using a :ref:`load balancer <load_balancer>` for connecting the agents. This way the agents will be able to report to the nodes in a distributed way and it will be the load balancer who assigns which worker they report to. Using this option we can better distribute the load and in case of a fall in some worker node, its agents will **reconnect** to another one.
