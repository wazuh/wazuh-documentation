.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to deploy a Wazuh cluster. In this section of our documentation we explain more about the agents connections.

*****************
Advanced Settings
*****************

.. _haproxy_helper_setup:

HAProxy helper
==============

This is a tool to manage HAProxy configuration, through the Dataplane API, depending on the Wazuh cluster status in real-time.
Provides the manager with the ability to automatically balance the agent TCP sessions.

Some of its key features are:

* Add/remove new servers to the Wazuh backend (1514/tcp) when detecting changes on the Wazuh cluster (e.g. new workers connected).
* Balance excess agents per node when adding new servers to the Wazuh backend.
* Balance agents when detecting an imbalance that exceeds the given tolerance.

.. thumbnail:: /images/manual/cluster/haproxy-helper-architecture.png
    :title: HAProxy helper architecture
    :alt: HAProxy helper architecture
    :align: center
    :width: 80%


The helper runs in an independent thread, that initiates with the ``wazuh-cluster`` daemon, and completes the next flow:

.. thumbnail:: /images/manual/cluster/haproxy-helper-flow.png
    :title: HAProxy helper flow
    :alt: HAProxy helper flow
    :align: center
    :width: 80%


How to enable it
----------------

To use this feature is needed to have a :ref:`HAProxy <haproxy_installation>`  instance balancing the cluster using the **least connections** algorithm.

In the Wazuh side, the :ref:`configuration <haproxy_helper>` file (``/var/ossec/etc/ossec.conf``) we will include the ``<haproxy_helper>...</haproxy_helper>`` labels within the ``<cluster>...</cluster>`` section.

We are going to configure a basic HAProxy helper within an already configured cluster master node:

    - :ref:`haproxy_disabled <haproxy_disabled>`: Indicates whether the helper will be enabled or not in the master node.
    - :ref:`haproxy_address <haproxy_address>`: Address (IP or DNS) to connect with HAProxy.
    - :ref:`haproxy_user <haproxy_user>`: Username to authenticate with HAProxy.
    - :ref:`haproxy_password <haproxy_password>`: Password to authenticate with HAProxy.


.. code-block:: xml

    <cluster>
        <name>wazuh</name>
        <node_name>master-node</node_name>
        <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
        <node_type>master</node_type>
        <port>1516</port>
        <bind_addr>0.0.0.0</bind_addr>
        <nodes>
            <node>WAZUH-MASTER-ADDRESS</node>
        </nodes>
        <hidden>no</hidden>
        <disabled>no</disabled>
        <haproxy_helper>
            <haproxy_disabled>no</haproxy_disabled>
            <haproxy_address>wazuh-proxy</haproxy_address>
            <haproxy_user>haproxy</haproxy_user>
            <haproxy_password>haproxy</haproxy_password>
      </haproxy_helper>
    </cluster>

Restart the master node:

    .. code-block:: console

        # systemctl restart wazuh-manager

Now the HAProxy helper is running:

    .. code-block:: console
        :emphasize-lines: 12

        # tail /var/ossec/logs/cluster.log
        2024/04/05 19:23:06 DEBUG: [Cluster] [Main] Removing '/var/ossec/queue/cluster/'.
        2024/04/05 19:23:06 DEBUG: [Cluster] [Main] Removed '/var/ossec/queue/cluster/'.
        2024/04/05 19:23:06 INFO: [Local Server] [Main] Serving on /var/ossec/queue/cluster/c-internal.sock
        2024/04/05 19:23:06 DEBUG: [Local Server] [Keep alive] Calculating.
        2024/04/05 19:23:06 DEBUG: [Local Server] [Keep alive] Calculated.
        2024/04/05 19:23:06 INFO: [Master] [Main] Serving on ('0.0.0.0', 1516)
        2024/04/05 19:23:06 DEBUG: [Master] [Keep alive] Calculating.
        2024/04/05 19:23:06 DEBUG: [Master] [Keep alive] Calculated.
        2024/04/05 19:23:06 INFO: [Master] [Local integrity] Starting.
        2024/04/05 19:23:06 INFO: [Master] [Local agent-groups] Sleeping 30s before starting the agent-groups task, waiting for the workers connection.
        2024/04/05 19:23:06 INFO: [HAPHelper] [Main] Proxy was initialized
        2024/04/05 19:23:06 INFO: [HAPHelper] [Main] Ensuring only exists one HAProxy process. Sleeping 12s before start...
        2024/04/05 19:23:06 INFO: [Master] [Local integrity] Finished in 0.090s. Calculated metadata of 34 files.
        2024/04/05 19:23:14 INFO: [Master] [Local integrity] Starting.
        2024/04/05 19:23:14 INFO: [Master] [Local integrity] Finished in 0.005s. Calculated metadata of 34 files.
        2024/04/05 19:23:18 DEBUG2: [HAPHelper] [Proxy] Obtained proxy backends
        2024/04/05 19:23:18 DEBUG2: [HAPHelper] [Proxy] Obtained proxy frontends
        2024/04/05 19:23:18 INFO: [HAPHelper] [Main] Starting HAProxy Helper
        2024/04/05 19:23:18 DEBUG2: [HAPHelper] [Proxy] Obtained proxy servers


.. _haproxy_installation:

HAProxy Installation
--------------------

.. How to install HAProxy? configurations, packages, docker images

.. _cluster_agents_connections:

Agents connections
==================

    In this section, we are going to explore other ways to configure our cluster. We'll see that besides the basic way described in our :ref:`Getting started <gt-cluster>`, we have the options to use a load balancer or a failover mode.

    .. note::

        We recommend using the **load balancer** option. This way, the agents will be able to report to the nodes in a distributed way and it will be the load balancer who assigns which worker they report to. Using this option, we can better distribute the load, and in case of a fall in some worker node, its agents will **reconnect** to another one.


.. _load_balancer:

Pointing agents to the cluster with a load balancer
---------------------------------------------------

    A **load balancer** is a service that distributes workloads across multiple resources.
    In Wazuh's case, users want to use a load balancer to catch all the agent events and distribute them between the different workers in the cluster.
    The correct way to use it is to point every agent to send the events to the *load balancer*:

    1. Edit the Wazuh agent configuration in ``/var/ossec/etc/ossec.conf`` to add the **Load Balancer** IP address. In the ``<client><server>`` section, change the ``LOAD_BALANCER_IP`` value to the ``load balancer`` address and ``port``:

      .. code-block:: xml

        <client>
          <server>
            <address>LOAD_BALANCER_IP</address>
            ...
          </server>
        </client>

    2. Restart the agents:

      .. include:: /_templates/common/restart_agent.rst

    3. Include in the ``Load Balancer`` the IP address of every instance of the cluster we want to deliver events.

        - This configuration will depend on the load balancer service chosen.

        - Here is a short configuration guide for a **load balancer** using Nginx:

        1. Install Nginx in the *load balancer instance*:

            - Download the packages from the `Official Page. <http://nginx.org/en/linux_packages.html>`_
            - Follow the steps related to that guide to install the packages.

        2. Configure the instance as a *load balancer*:

            - The way nginx and its modules work are determined in the configuration file. By default, the configuration file is named nginx.conf and placed in the directory /usr/local/nginx/conf, /etc/nginx, or /usr/local/etc/nginx.
            - Now, open the configuration file and add the following structure:

            .. code-block:: nginx

                stream {
                    upstream cluster {
                        hash $remote_addr consistent;
                        server <WAZUH_MASTER_IP_ADDRESS>:1514;
                        server <WAZUH_WORKER1_IP_ADDRESS>:1514;
                        server <WAZUH_WORKER2_IP_ADDRESS>:1514;
                    }
                    upstream master {
                        server <WAZUH_MASTER_IP_ADDRESS>:1515;
                    }
                    server {
                        listen 1514;
                        proxy_pass cluster;
                    }
                    server {
                        listen 1515;
                        proxy_pass master;
                    }
                }

            - You can find more details in nginx guide for configuring `TCP and UDP load balancer. <https://docs.nginx.com/nginx/admin-guide/load-balancer/tcp-udp-load-balancer/>`_

        3. Restart nginx configuration files:

        .. code-block:: console

            # nginx -s reload


Pointing agents to the cluster (Failover mode)
----------------------------------------------

    We can set to the agents a list of nodes of manager type (workers/master). In case of a disconnection, the agent will connect to another node in order to keep reporting.
    To configure this mode the first thing we must do is configure our cluster as indicated in our :ref:`getting started <gt-cluster>`, with the number of workers nodes we want. Once this is done, we will go directly to configure the agents in the following way.


    Suppose we have the following IPs:

        .. code-block:: none

            worker01: 172.0.0.4
            worker02: 172.0.0.5

    We want all our agents to report to the worker01 node, our worker02 node will be a backup node in case the worker01 node is not available.
    To do this we must modify the configuration file of our agents ``/var/ossec/etc/ossec.conf``. Within this, we have a block ``<server>...</server>``, we will have to create as many blocks **server** as backup nodes we have and want to assign it to the agent:

    .. code-block:: xml

        <client>
            <server>
                <address>172.0.0.4</address>
                <port>1514</port>
                <protocol>tcp</protocol>
            </server>
            <server>
                <address>172.0.0.5</address>
                <port>1514</port>
                <protocol>tcp</protocol>
            </server>
            <config-profile>ubuntu, ubuntu18, ubuntu18.04</config-profile>
            <notify_time>10</notify_time>
            <time-reconnect>60</time-reconnect>
            <auto_restart>yes</auto_restart>
            <crypto_method>aes</crypto_method>
        </client>

    In this way, if the worker01 node is not available, the agents will report to the worker02 node. This process is performed cyclically between all the nodes that we place in the ``ossec.conf`` of the agents.
