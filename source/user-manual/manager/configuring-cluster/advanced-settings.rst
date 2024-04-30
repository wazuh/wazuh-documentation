.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to deploy a Wazuh cluster. In this section of our documentation we explain more about the agents connections.

*****************
Advanced Settings
*****************

    In this section, we are going to explore other ways to configure our cluster. We'll see that besides the basic way described in our :ref:`Getting started <gt-cluster>`, we have the option to use a load balancer or a failover mode.

    .. note::

        We recommend using the **load balancer** option. This way, the agents will be able to report to the nodes in a distributed way and it will be the load balancer who assigns which worker they report to. Using this option, we can better distribute the load, and in case of a fall in some worker node, its agents will **reconnect** to another one.


.. _haproxy_installation:

HAProxy Installation
====================

As a load balancer, we recommend using `HAProxy <https://www.haproxy.org/>`_.

There are two main ways to install HAProxy, using `packages <https://github.com/haproxy/wiki/wiki/Packages>`_ or docker `images <https://hub.docker.com/_/haproxy/tags>`_.

Once installed, regardless of the method, it is needed to do some configurations.

Configuration
-------------

    The HAProxy configuration, present in the ``<HAPROXY_INSTALLATION_PATH>/haproxy.cfg`` must at least have some sections covered:

    - Wazuh agents registration front and backend:

    .. code-block:: console

        frontend wazuh_register
            mode tcp
            bind :1515
            default_backend wazuh_register

        backend wazuh_register
            mode tcp
            balance leastconn
            server master_register <WAZUH_REGISTRY_HOST>:1515 check

    - Configured PID file and stats socket (with ``level admin``):

    .. code-block:: console

        global
            pidfile     /var/run/haproxy.pid
            stats socket /var/lib/haproxy/stats level admin

    - Accessible stats page (optional):

    .. code-block:: console

        frontend stats
            bind *:9000
            stats enable
            stats uri /stats
            stats refresh 5s
            stats admin if TRUE
            option httplog

Also, it will be needed an init script to manage the HAProxy service. Below we provide an example that can be used.

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
    CONFIG=/etc/${BASENAME}/conf.d/
    HAPROXY=/usr/sbin/haproxy
    RUNDIR=/run/${BASENAME}
    EXTRAOPTS=

    # Load env vars
    export $(grep -v '^#' .env-file | xargs)

    test -x $HAPROXY || exit 0

    if [ -e /etc/default/${BASENAME} ]; then
        . /etc/default/${BASENAME}
    fi

    test -d "$CONFIG" || exit 0

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

Start the HAProxy service.

.. code-block:: console

    service haproxy start


.. _cluster_agents_connections:

Agents connections
==================

.. _load_balancer:

Pointing agents to the cluster with a load balancer
---------------------------------------------------

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


Pointing agents to the cluster (Failover mode)
----------------------------------------------

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

.. _haproxy_helper_setup:

HAProxy helper
==============

This is an optional tool to manage HAProxy configuration depending on the Wazuh cluster status in real-time.
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

.. note::
    The recommended version of HAProxy, that we currently test, is the 2.8 LTS.

To use this feature is needed to have a :ref:`HAProxy <haproxy_installation>`  instance balancing the cluster using the **least connections** algorithm.

Dataplane API configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^

    The Dataplane API is used by the helper to communicate with HAProxy and update the configuration according to the changes in the Wazuh cluster.

    1. This is the basic configuration (``<HAPROXY_INSTALLATION_PATH/dataplaneapi.yml>``) to enable it:

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
            config_file: /etc/haproxy/conf.d/haproxy.cfg
            haproxy_bin: /usr/sbin/haproxy
            reload:
                reload_delay: 5
                reload_cmd: service haproxy reload
                restart_cmd: service haproxy restart

    2. Start the process with:

    .. code-block:: console

        dataplaneapi -f <HAPROXY_INSTALLATION_PATH/dataplaneapi.yml>


    3. Add Dataplane API credentials in ``<HAPROXY_INSTALLATION_PATH>/haproxy.cfg``:

    .. code-block:: console

        userlist haproxy-dataplaneapi
            user <DATAPLANE_USER> insecure-password <DATAPLANE_PASSWORD>

    4. Restart the HAProxy service:

    .. code-block:: console

        service haproxy restart


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
            <haproxy_address><HAPROXY_ADDRESS></haproxy_address>
            <haproxy_user><DATAPLANE_USER></haproxy_user>
            <haproxy_password><DATAPLANE_USER></haproxy_password>
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
