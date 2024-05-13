.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to deploy a Wazuh cluster. In this section of our documentation we explain more about the agents connections. 
    
.. _cluster_agents_connections:

Agents connections
==================

    In this section, we are going to explore other ways to configure our cluster. We'll see that besides the basic way described in our :ref:`Getting started <gt-cluster>`, we have the options to use a load balancer or a failover mode.

    .. note::

        We recommend using the **load balancer** option. This way, the agents will be able to report to the nodes in a distributed way and it will be the load balancer who assigns which worker they report to. Using this option, we can better distribute the load, and in case of a fall in some worker node, its agents will **reconnect** to another one.


.. _load_balancer:

Pointing agents to the cluster with a load balancer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
