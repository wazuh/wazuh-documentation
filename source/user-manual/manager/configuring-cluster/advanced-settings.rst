.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about load balancing and agent connections in this section of the documentation.

Advanced Settings
=================

Besides the basic method described in :ref:`Cluster nodes configuration <gt-cluster>` to configure a Wazuh cluster, you have additional options.

-  Use HAProxy as a load balancer.
-  Use HAProxy as a load balancer with HAProxy helper as a real-time configuration manager.
-  Connect Wazuh agents directly to Wazuh managers.

HAProxy
-------

.. _haproxy_installation:

Installation
^^^^^^^^^^^^

Using a load balancer, such as `HAProxy <https://www.haproxy.org/>`__, ensures the Wazuh agents register and report to Wazuh manager nodes in a distributed way. The load balancer assigns manager nodes to the agents improving load distribution. If a Wazuh manager node fails, the Wazuh agents reconnect to another node.

There are two main ways to install HAProxy.

-  Using system and PPA packages
-  Using Docker images

.. note::

   The provided examples and configurations are taken as a base Ubuntu and HAProxy 2.8.

.. tabs::

   .. group-tab:: System Package

      #. Install HAProxy

         .. code-block:: console

            # apt install haproxy -y

      #. Check the installation

         .. code-block:: console

            # haproxy -v

         .. code-block:: none
            :class: output

            HAProxy version 2.8.5-1ubuntu3 2024/04/01 - https://haproxy.org/
            Status: long-term supported branch - will stop receiving fixes around Q2 2028.
            Known bugs: http://www.haproxy.org/bugs/bugs-2.8.5.html
            Running on: Linux 6.8.0-76060800daily20240311-generic #202403110203~1714077665~22.04~4c8e9a0 SMP PREEMPT_DYNAMIC Thu A x86_64

      Once installed it requires some :ref:`configuration <haproxy_configuration>` changes.

   .. group-tab:: PPA Package

      #. Add the PPA repository

         .. code-block:: console
   
            # apt update && apt install software-properties-common -y
            # add-apt-repository ppa:vbernat/haproxy-2.8 -y

      #. Install HAProxy

         .. code-block:: console
   
            # apt install haproxy -y

      #. Check the installation

         .. code-block:: console
   
            # haproxy -v
   
         .. code-block:: none
            :class: output
   
            HAProxy version 2.8.9-1ppa1~jammy 2024/04/06 - https://haproxy.org/
            Status: long-term supported branch - will stop receiving fixes around Q2 2028.
            Known bugs: http://www.haproxy.org/bugs/bugs-2.8.9.html
            Running on: Linux 6.8.0-76060800daily20240311-generic #202403110203~1714077665~22.04~4c8e9a0 SMP PREEMPT_DYNAMIC Thu A x86_64

      Once installed it requires some :ref:`configuration <haproxy_configuration>` changes.

   .. group-tab:: Docker

      To install HAProxy with docker we provide:

      .. raw:: html

         <details>
         <summary><b>Dockerfile</b></summary>

      .. code-block:: dockerfile

         FROM haproxytech/haproxy-ubuntu:2.8

         COPY haproxy.cfg /etc/haproxy/haproxy.cfg
         COPY haproxy-service /etc/init.d/haproxy
         COPY entrypoint.sh /entrypoint.sh

         RUN chmod +x /etc/init.d/haproxy
         RUN chmod +x /entrypoint.sh

         ENTRYPOINT [ "/entrypoint.sh" ]

      .. raw:: html

         </details>


      .. raw:: html

         <details>
         <summary><b>entrypoint.sh</b></summary>

      .. code-block:: bash

         #!/usr/bin/env bash

         # Start HAProxy service
         service haproxy start

         tail -f /dev/null

      .. raw:: html

         </details>

      .. raw:: html

         <details>
         <summary><b>haproxy-service</b></summary>

      .. code-block:: bash

         #!/bin/sh
         ### BEGIN INIT INFO
         # Provides:          haproxy
         # Required-Start:    $local_fs $network $remote_fs $syslog $named
         # Required-Stop:     $local_fs $remote_fs $syslog $named
         # Default-Start:     2 3 4 5
         # Default-Stop:      0 1 6
         # Short-Description: fast and reliable load balancing reverse proxy
         # Description:       This file should be used to start and stop haproxy.
         ### END INIT INFO

         # Author: Arnaud Cornet <acornet@debian.org>

         PATH=/sbin:/usr/sbin:/bin:/usr/bin
         BASENAME=haproxy
         PIDFILE=/var/run/${BASENAME}.pid
         CONFIG=/etc/${BASENAME}/${BASENAME}.cfg
         HAPROXY=/usr/sbin/haproxy
         RUNDIR=/run/${BASENAME}
         EXTRAOPTS=

         test -x $HAPROXY || exit 0

         if [ -e /etc/default/${BASENAME} ]; then
               . /etc/default/${BASENAME}
         fi

         test -f "$CONFIG" || exit 0

         [ -f /etc/default/rcS ] && . /etc/default/rcS
         . /lib/lsb/init-functions


         check_haproxy_config()
         {
               $HAPROXY -c -f "$CONFIG" $EXTRAOPTS >/dev/null
               if [ $? -eq 1 ]; then
                  log_end_msg 1
                  exit 1
               fi
         }

         haproxy_start()
         {
               [ -d "$RUNDIR" ] || mkdir "$RUNDIR"
               chown haproxy:haproxy "$RUNDIR"
               chmod 2775 "$RUNDIR"

               check_haproxy_config

               start-stop-daemon --quiet --oknodo --start --pidfile "$PIDFILE" \
                  --exec $HAPROXY -- -f "$CONFIG" -D -p "$PIDFILE" \
                  $EXTRAOPTS || return 2
               return 0
         }

         haproxy_stop()
         {
               if [ ! -f $PIDFILE ] ; then
                  # This is a success according to LSB
                  return 0
               fi

               ret=0
               tmppid="$(mktemp)"

               # HAProxy's pidfile may contain multiple PIDs, if nbproc > 1, so loop
               # over each PID. Note that start-stop-daemon has a --pid option, but it
               # was introduced in dpkg 1.17.6, post wheezy, so we use a temporary
               # pidfile instead to ease backports.
               for pid in $(cat $PIDFILE); do
                  echo "$pid" > "$tmppid"
                  start-stop-daemon --quiet --oknodo --stop \
                     --retry 5 --pidfile "$tmppid" --exec $HAPROXY || ret=$?
               done

               rm -f "$tmppid"
               [ $ret -eq 0 ] && rm -f $PIDFILE

               return $ret
         }

         haproxy_reload()
         {
               check_haproxy_config

               $HAPROXY -f "$CONFIG" -p $PIDFILE -sf $(cat $PIDFILE) -D $EXTRAOPTS \
                  || return 2
               return 0
         }

         haproxy_status()
         {
               if [ ! -f $PIDFILE ] ; then
                  # program not running
                  return 3
               fi

               for pid in $(cat $PIDFILE) ; do
                  if ! ps --no-headers p "$pid" | grep haproxy > /dev/null ; then
                     # program running, bogus pidfile
                     return 1
                  fi
               done

               return 0
         }


         case "$1" in
         start)
               log_daemon_msg "Starting haproxy" "${BASENAME}"
               haproxy_start
               ret=$?
               case "$ret" in
               0)
                  log_end_msg 0
                  ;;
               1)
                  log_end_msg 1
                  echo "pid file '$PIDFILE' found, ${BASENAME} not started."
                  ;;
               2)
                  log_end_msg 1
                  ;;
               esac
               exit $ret
               ;;
         stop)
               log_daemon_msg "Stopping haproxy" "${BASENAME}"
               haproxy_stop
               ret=$?
               case "$ret" in
               0|1)
                  log_end_msg 0
                  ;;
               2)
                  log_end_msg 1
                  ;;
               esac
               exit $ret
               ;;
         reload|force-reload)
               log_daemon_msg "Reloading haproxy" "${BASENAME}"
               haproxy_reload
               ret=$?
               case "$ret" in
               0|1)
                  log_end_msg 0
                  ;;
               2)
                  log_end_msg 1
                  ;;
               esac
               exit $ret
               ;;
         restart)
               log_daemon_msg "Restarting haproxy" "${BASENAME}"
               haproxy_stop
               haproxy_start
               ret=$?
               case "$ret" in
               0)
                  log_end_msg 0
                  ;;
               1)
                  log_end_msg 1
                  ;;
               2)
                  log_end_msg 1
                  ;;
               esac
               exit $ret
               ;;
         status)
               haproxy_status
               ret=$?
               case "$ret" in
               0)
                  echo "${BASENAME} is running."
                  ;;
               1)
                  echo "${BASENAME} dead, but $PIDFILE exists."
                  ;;
               *)
                  echo "${BASENAME} not running."
                  ;;
               esac
               exit $ret
               ;;
         *)
               echo "Usage: /etc/init.d/${BASENAME} {start|stop|reload|restart|status}"
               exit 2
               ;;
         esac

         :


      .. raw:: html

         </details>

      And a :ref:`Configuration file <haproxy_configuration>` to get the service up and running.

      #. It will be needed to put these files in the same directory and build the image

         .. code-block:: console
   
            # tree
            .
            ├── Dockerfile
            ├── entrypoint.sh
            ├── haproxy.cfg
            └── haproxy-service
   
         .. code-block:: console
   
            # docker build --tag=haproxy-deploy .

      #. After building the image can we run the haproxy service

         .. code-block:: console
   
            # docker run haproxy-deploy
   
         .. code-block:: none
            :class: output
   
            TCPLOG: true HTTPLOG: true
            * Starting haproxy haproxy
            [NOTICE]   (33) : haproxy version is 2.8.9-1842fd0
            [NOTICE]   (33) : path to executable is /usr/sbin/haproxy
            [ALERT]    (33) : config : parsing [/etc/haproxy/haproxy.cfg:3] : 'pidfile' already specified. Continuing.


.. _haproxy_configuration:

Configuration
^^^^^^^^^^^^^

   #. The configuration must be put into ``/etc/haproxy/haproxy.cfg``.

      .. raw:: html

         <details>
         <summary><b>haproxy.cfg</b></summary>

      .. code-block:: cfg
         :emphasize-lines: 36-47

         global
               chroot      /var/lib/haproxy
               pidfile     /var/run/haproxy.pid
               maxconn     4000
               user        haproxy
               group       haproxy
               stats socket /var/lib/haproxy/stats level admin
               log 127.0.0.1 local2 info

         defaults
               mode http
               maxconn 4000
               log global
               option redispatch
               option dontlognull
               option tcplog
               timeout check 10s
               timeout connect 10s
               timeout client 1m
               timeout queue 1m
               timeout server 1m
               retries 3

         frontend wazuh_register
               mode tcp
               bind :1515
               default_backend wazuh_register

         backend wazuh_register
               mode tcp
               balance leastconn
               server master <IP_OR_DNS_OF_WAZUH_MASTER_NODE>:1515 check
               server worker1 <IP_OR_DNS_OF_WAZUH_WORKER_NODE>:1515 check
               server workern <IP_OR_DNS_OF_WAZUH_WORKER_NODE>:1515 check

         # Do not include the following if you will enable HAProxy Helper
         frontend wazuh_reporting_front
               mode tcp
               bind :1514 name wazuh_reporting_front_bind
               default_backend wazuh_reporting

         backend wazuh_reporting
               mode tcp
               balance leastconn
               server master <IP_OR_DNS_OF_WAZUH_MASTER_NODE>:1514 check
               server worker1 <IP_OR_DNS_OF_WAZUH_WORKER_NODE>:1514 check
               server worker2 <IP_OR_DNS_OF_WAZUH_WORKER_NODE>:1514 check

      .. raw:: html

         </details>

      The provided setup is ready to work with a Wazuh cluster. Some of the sections covered are:

      - The *backend* is a set of servers (Wazuh cluster nodes) that receive the forwarded agent connections, and is defined by:

         - the load balancing mode
         - which load balance algorithm to use
         - a list of servers and ports, in this case, the default one pointing to the master node of the cluster.

         .. code-block:: console

            backend wazuh_register
               mode tcp
               balance leastconn
               server master_node <WAZUH_REGISTRY_HOST>:1515 check

      - A *frontend* defines how requests should be forwarded to backends and is composed of:

         - the type of load balancing
         - the port to bind the connections
         - the default backend to forward requests

         .. code-block:: console

            frontend wazuh_register
               mode tcp
               bind :1515
               default_backend wazuh_register

   #. Now can we start the service with

      .. code-block:: console

         # service haproxy start

      .. code-block:: none
         :class: output

         * Starting haproxy haproxy
         [NOTICE]   (13231) : haproxy version is 2.8.9-1ppa1~jammy
         [NOTICE]   (13231) : path to executable is /usr/sbin/haproxy
         [ALERT]    (13231) : config : parsing [/etc/haproxy/haproxy.cfg:3] : 'pidfile' already specified. Continuing.

.. _haproxy_helper_setup:

HAProxy helper
--------------

This is an optional tool to manage HAProxy configuration depending on the Wazuh cluster status in real-time.
It provides the manager with the ability to automatically balance the agent TCP sessions.

Some of its key features are:

-  Add/remove new servers to the Wazuh backend (1514/tcp) when detecting changes on the Wazuh cluster (e.g. new workers connected).
-  Balance excess agents per node when adding new servers to the Wazuh backend.
-  Balance agents when detecting an imbalance that exceeds the given tolerance.

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
^^^^^^^^^^^^^^^^

.. note::

   The recommended version of HAProxy is the 2.8 LTS.

To use this feature is required to have a :ref:`HAProxy <haproxy_installation>` instance balancing the cluster using the **least connections** algorithm.

Dataplane API configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Dataplane API is used by the helper to communicate with HAProxy and update the configuration according to the changes in the Wazuh cluster.

This is the basic configuration:

.. code-block:: yaml

   dataplaneapi:
      host: 0.0.0.0
      port: 5555
      transaction:
            transaction_dir: /tmp/haproxy
      user:
      - insecure: true
         password: <DATAPLANE_PASSWORD>
         name: <DATAPLANE_USER>
   haproxy:
      config_file: /etc/haproxy/haproxy.cfg
      haproxy_bin: /usr/sbin/haproxy
      reload:
            reload_delay: 5
            reload_cmd: service haproxy reload
            restart_cmd: service haproxy restart

.. note::

   Is needed to replace ``<DATAPLANE_USER>`` and ``<DATAPLANE_PASSWORD>`` with the chosen user and password.

To enable it will depend on the :ref:`installation method <haproxy_installation>`.

.. warning::

   For the correct operation of the helper, there must not be a frontend, with the port **1514**, in the ``haproxy.cfg`` file beforehand.

.. tabs::

   .. group-tab:: Packages

      #. Download the binary file for the installed HAProxy version. You can find the available versions `here <https://github.com/haproxytech/dataplaneapi/releases/>`__.

         .. code-block:: console

            # curl -sL https://github.com/haproxytech/dataplaneapi/releases/download/v2.8.X/dataplaneapi_2.8.X_linux_x86_64.tar.gz | tar xz && cp dataplaneapi /usr/local/bin/

      #. Put the configuration in ``/etc/haproxy/dataplaneapi.yml`` and start the process

         .. code-block:: console

            # dataplaneapi -f /etc/haproxy/dataplaneapi.yml &

      #. Verify the API is running properly

         .. code-block:: console

            # curl -X GET --user <DATAPLANE_USER>:<DATAPLANE_PASSWORD> http://localhost:5555/v2/info

         .. code-block:: none
            :class: output

            {"api":{"build_date":"2024-05-13T12:09:33.000Z","version":"v2.8.X 13ba2b34"},"system":{}}

   .. group-tab:: Docker

      #. Put the configuration into ``dataplaneapi.yaml``

         .. code-block:: console

            # tree
            .
            ├── dataplaneapi.yml
            ├── Dockerfile
            ├── entrypoint.sh
            ├── haproxy.cfg
            └── haproxy-service

      #. Modify the Dockerfile to include ``dataplaneapi.yaml`` during the build

         .. code-block:: dockerfile
            :emphasize-lines: 4

            FROM haproxytech/haproxy-ubuntu:2.8

            COPY haproxy.cfg /etc/haproxy/haproxy.cfg
            COPY dataplaneapi.yml /etc/haproxy/dataplaneapi.yml
            COPY haproxy-service /etc/init.d/haproxy
            COPY entrypoint.sh /entrypoint.sh

            RUN chmod +x /etc/init.d/haproxy
            RUN chmod +x /entrypoint.sh

            ENTRYPOINT [ "/entrypoint.sh" ]

      #. Modify the ``entrypoint.sh`` to start the dataplaneapi process

         .. code-block:: bash
            :emphasize-lines: 6

            #!/usr/bin/env bash

            # Start HAProxy service
            service haproxy start
            # Start HAProxy Data Plane API
            dataplaneapi -f /etc/haproxy/dataplaneapi.yml &

            tail -f /dev/null

      #. Build and run the image

         .. code-block:: console

            # docker build --tag=haproxy-deploy .

         .. code-block:: console

            # docker run -p 5555:5555 haproxy-deploy

         .. code-block:: none
            :class: output

            TCPLOG: true HTTPLOG: true
            * Starting haproxy haproxy
            [NOTICE]   (33) : haproxy version is 2.8.9-1842fd0
            [NOTICE]   (33) : path to executable is /usr/sbin/haproxy
            [ALERT]    (33) : config : parsing [/etc/haproxy/haproxy.cfg:3] : 'pidfile' already specified. Continuing.

      #. Verify the API is running properly

         .. code-block:: console

            # curl -X GET --user haproxy:haproxy http://localhost:5555/v2/info

         .. code-block:: none
            :class: output

            {"api":{"build_date":"2024-05-13T14:06:03.000Z","version":"v2.9.3 59f34ea1"},"system":{}}


On the Wazuh's side, we will include the ``<haproxy_helper>...</haproxy_helper>`` labels in the :ref:`configuration <haproxy_helper>` file (``/var/ossec/etc/ossec.conf``)  within the ``<cluster>...</cluster>`` section.

.. note::

   This configuration is only necessary on the master node.


We are going to configure a basic HAProxy helper within an already configured cluster master node:

-  :ref:`haproxy_disabled <haproxy_disabled>`: Indicates whether the helper will be enabled or not in the master node.
-  :ref:`haproxy_address <haproxy_address>`: Address (IP or DNS) to connect with HAProxy.
-  :ref:`haproxy_user <haproxy_user>`: Username to authenticate with HAProxy.
-  :ref:`haproxy_password <haproxy_password>`: Password to authenticate with HAProxy.


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
         <haproxy_address><HAPROXY_ADDRESS></haproxy_address>
         <haproxy_user><DATAPLANE_USER></haproxy_user>
         <haproxy_password><DATAPLANE_PASSWORD></haproxy_password>
      </haproxy_helper>
   </cluster>

Restart the master node:

.. code-block:: console

   # systemctl restart wazuh-manager

Now the HAProxy helper is running:

.. code-block:: console

   # tail /var/ossec/logs/cluster.log

.. code-block:: none
   :class: output
   :emphasize-lines: 11

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

.. _cluster_agents_connections:

Agents connections
------------------

.. _point_agents_to_a_load_balancer:

Pointing agents to the cluster with a load balancer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A **load balancer** is a service that distributes workloads across multiple resources.

The correct way to use it is to point every agent to send the events to the *load balancer*:

#. Edit the Wazuh agent configuration in ``/var/ossec/etc/ossec.conf`` to add the **Load Balancer** IP address. In the ``<client><server>`` section, change the ``LOAD_BALANCER_IP`` value to the ``load balancer`` address and ``port``:

   .. code-block:: xml

      <client>
         <server>
         <address>LOAD_BALANCER_IP</address>
         ...
         </server>
      </client>

#. Restart the agents:

   .. include:: /_templates/common/restart_agent.rst

#. Include in the ``Load Balancer`` the IP address of every instance of the cluster we want to deliver events.

Pointing agents to the cluster (Failover mode)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We can set to the agents a list of nodes of manager type (workers/master). In case of a disconnection, the agent will connect to another node to keep reporting.

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