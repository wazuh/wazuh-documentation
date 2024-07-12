.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Learn more about how to deploy a Wazuh cluster: introduction, architecture overview, code structure and troubleshooting.

.. _dev-wazuh-cluster:

Wazuh cluster
=============

- `Introduction`_
- `Architecture overview`_
- `Code structure`_
- `Troubleshooting`_

Introduction
------------

Recommended reading: :doc:`Deploying a Wazuh cluster </user-manual/manager/wazuh-server-cluster>`.

Today's environments usually have thousands of new agents every day. A single manager architecture is not capable of managing so many events and, in consequence, the workload needs to be balanced among multiple nodes. Therefore, horizontal scaling arises as the proper approach to balance the load for a large number of agents.

Wazuh's main workload is processing events from the agents and raise alerts. This is why all required information to receive events from the agents needs to be synchronized. This information is:

* The agents' keys so the nodes can accept incoming connections from agents.
* The agents' shared configuration so the nodes can send the agents their configuration.
* The agents' groups assignments, so every node knows which configuration to send to the agents.
* The custom decoders, rules and CDB lists so the nodes can correctly process events from the agents.
* The agents' last keep alive and OS information, which is received once the agents connect to a node and it's necessary to know whether an agent is reporting or not.

Having all this information synchronized, any cluster node is capable of processing and raising alerts from the agents, making it possible to horizontally scale a Wazuh environment when new agents are added.

Architecture overview
---------------------

The following diagram shows a typical Wazuh cluster architecture:

.. thumbnail:: ../images/manual/cluster/cluster-infrastructure.png
    :title: Wazuh cluster architecture
    :alt: Wazuh cluster architecture
    :align: center
    :width: 80%

Agents are usually configured to report to a load balancer which is configured to send network packets to all nodes in the cluster. This way, new nodes can be added without modifying agents' configuration.

.. note::
    The wazuh cluster doesn't manage the load balancer.

Types of nodes
^^^^^^^^^^^^^^

There are two different types of nodes inside the Wazuh cluster. These node types define the node's tasks inside the cluster and also, they define a hierarchy of nodes used to know which information prevails when doing synchronizations.

Master
~~~~~~

The master node is in charge of:

* Receive and manage agent registration requests.
* Creating shared configuration groups.
* Updating custom rules, decoders and CDB lists.
* Synchronizing all this information to the workers.

All this information is called *Integrity* and is synchronized **from** the master **to** the workers no matter if the workers have a more recent modification time or a higher size.

Master nodes can also receive and process events from agents the same way a worker would do.

Worker
~~~~~~

A worker node is in charge of:

* Redirecting agent registration requests to the master.
* Receiving updates from the master.
* Receiving and processing events from agents.
* Sending the master last keepalives from agents and remoted's group assignments.

If any integrity file is modified in a worker node, its content will be replaced with the contents the master node has.

Workflow
^^^^^^^^

The image below shows a schema of how a master node and a worker node interact with each other in the synchronization process. Every dotted square represents a synchronization task and they all work in parallel:

.. thumbnail:: ../images/manual/cluster/cluster-flow.png
    :title: Wazuh cluster workflow
    :alt: Wazuh cluster workflow
    :align: center
    :width: 80%


Threads
^^^^^^^
The following tasks can be found in the cluster, depending on the type of node they are running on:

+--------------------------------+--------+
| Thread name                    | Node   |
+================================+========+
| Keep alive - Send to master    | Worker |
+--------------------------------+        |
| Integrity sync                 |        |
+--------------------------------+        |
| Agent info sync                |        |
+--------------------------------+--------+
| Keep alive - Check workers     | Master |
+--------------------------------+        |
| Agent groups send              |        |
+--------------------------------+        |
| Local agent-groups             |        |
+--------------------------------+        |
| Local integrity                |        |
+--------------------------------+        |
| Sendsync                       |        |
+--------------------------------+--------+
| Distributed API                | Both   |
+--------------------------------+--------+

Keep alive thread
~~~~~~~~~~~~~~~~~

The worker nodes send a keep-alive message to the master every so often. The master keeps the date of the last received keep alive and knows the interval the worker is using to send its keepalives. If the last keep alive received by a worker is older than a determined amount of time, the master considers the worker is disconnected and immediately closes the connection. When a worker realizes the connection has been closed, it automatically tries to reconnect again.

This feature is very useful to drop nodes that are facing a network issue or aren't available at the moment.


Integrity thread
~~~~~~~~~~~~~~~~

This thread is in charge of synchronizing master's integrity information among all worker nodes. The communication is started by the worker node and it has the following stages:

1. The worker asks the master for permission. The permission will be granted only after any previous synchronization process is finished. This is important to prevent overlapping, where a new synchronization process starts while another one is still running. Synchronization processes taking too long are considered locked due to errors. Once the process is flagged as locked, new integrity synchronization permissions can be granted. The maximum time a synchronization process is allowed to run is 1000 seconds by default. This can be modified with the ``max_locked_integrity_time`` variable in the `cluster.json <https://github.com/wazuh/wazuh/blob/v|WAZUH_CURRENT|/framework/wazuh/core/cluster/cluster.json>`__ file.
2. The worker sends the master a JSON file containing the following information:

    * Path
    * Modification time
    * Blake2b checksum
    * Whether the file is a merged file or not. And if it's merged:

        * The merge type
        * The filename

3. The master compares the received checksums with its own and creates three different groups of files:

    * Missing: Files that are present in the master node but missing in the worker. They must be created in the worker.
    * Extra: Files that are present in the worker node but missing in the master. They must be removed in the worker node as well.
    * Shared: Files that are present in both master and worker but have a different checksum. They must be updated in the worker node.

   Then the master prepares a zip package with a JSON containing all this information and the required files the worker needs to update. The maximum zip size is specified in the ``max_zip_size`` variable of the `cluster.json <https://github.com/wazuh/wazuh/blob/v|WAZUH_CURRENT|/framework/wazuh/core/cluster/cluster.json>`__ file. In case it is exceeded, the remaining files will be synced in the next iteration of Integrity.

4. Once the worker receives the package, it updates the necessary files.

If there is no data to synchronize or there has been an error reading data from the worker, the worker is always notified about it. Also, if a timeout error occurs while the worker is waiting to receive the zip, the master will cancel the current task and reduce the zip size limit. The limit will gradually increase again if no new timeout errors occur.

.. _agent-info:

Agent info thread
~~~~~~~~~~~~~~~~~

This thread is in charge of synchronizing the agent's last keepalives and operating system information with the master. The communication here is also started by the worker and it has the following stages:

1. The worker asks the master for permission. This is important to prevent a new synchronization process to start if there is already one synchronization process at the moment.
2. The worker asks to its local :ref:`wazuh-db <wazuh-db>` service for the information of agents marked as not synchronized.
3. The worker sends the master a JSON string containing the information retrieved from wazuh-db.
4. The master sends the received information to its local wazuh-db service, where it is updated.

If there is an error during the update process of one of the chunks in the master's database, the worker is notified.

.. _agent-groups-sync:

Agent groups send thread
~~~~~~~~~~~~~~~~~~~~~~~~

This thread is in charge of synchronizing information of agents' groups assignment (abbr. agent-groups) in the master to all the workers. The aim is that every agent-group received in the master ends up in the database of all the worker nodes. The communication is started by the master node (behaving like a broadcast) and it follows these stages:

1. When there is new agent-groups information, the master sends a JSON string with it to each worker. This is done only once per node.
2. The workers send the received information to their local :ref:`wazuh-db <wazuh-db>` service, where it is updated.
3. The worker compares the checksum of its database with the checksum of the master.
4. If the checksum has been different for 10 consecutive times, the worker notifies the master.
5. When notified, the master sends to the worker all the agent-groups information.
6. The worker overwrites its database with the agent-groups information it has received from the master.

Local agent-groups thread
~~~~~~~~~~~~~~~~~~~~~~~~~

This thread is only executed by the master. It periodically asks to its local :ref:`wazuh-db <wazuh-db>` service new information (since the last time this task was run) of agent-groups. The task is not repeated until such information is sent to all worker nodes.

Local integrity thread
~~~~~~~~~~~~~~~~~~~~~~

This thread is only executed by the master. It periodically reads all its integrity files and calculates their checksums. Calculating a checksum is a slow process, and it can reduce performance when there are multiple workers in the cluster since the checksums would need to be calculated for every worker. To fix that problem, this thread calculates the necessary integrity checksums and stores it in a global variable which is periodically updated.

Sendsync thread
~~~~~~~~~~~~~~~

Although not shown in the workflow schema above, Sendsync is another Wazuh cluster task. It is only executed on the master and allows redirection of messages coming from worker nodes to master services. For example, this process makes possible pointing to the IP address of a worker node when registering an agent. In this case, Sendsync takes the registration request from the worker node and redirects it to the master's Authd service.

Distributed API thread
~~~~~~~~~~~~~~~~~~~~~~

This thread isn't shown in the schema either. It runs in both master and worker since it's independent of the node type. It's used to receive API requests and forward them to the most suitable node to process the request. The operation of this thread will be explained later.

Code structure
--------------

The cluster is built on top of `asyncio.Protocol <https://docs.python.org/3/library/asyncio-protocol.html>`_. This Python framework helps us develop asynchronous communication protocols by just defining a few functions:

* ``connection_made``: Defines what to do when a client connects to a server / a server receives a new connection.
* ``connection_lost``: Defines what to do when the connection is closed. It includes an argument containing an exception in case the connection was closed due to an error.
* ``data_received``: Defines what to do when data is received from the other peer.

The wazuh cluster protocol is defined on top of this framework. The following diagram shows all Python classes defined based on ``asyncio.Protocol``:

.. thumbnail:: ../images/development/cluster-protocol-handler.png
    :title: Wazuh cluster protocol class inheritance
    :align: center
    :width: 80%

The higher classes on the diagram (``wazuh.core.cluster.common.Handler``, ``wazuh.core.cluster.server.AbstractServerHandler`` and ``wazuh.core.cluster.client.AbstractClient``) define abstract concepts of what a client and a server is. Those abstract concepts are used by the lower classes on the diagram (``wazuh.core.cluster.local_server.LocalServerHandler``, ``wazuh.core.cluster.master.MasterHandler``, ``wazuh.core.cluster.worker.WorkerHandler`` and ``wazuh.core.cluster.local_client.LocalClientHandler``) to define specific communication protocols. These specific protocols are described in the `Protocols`_ section.

There are abstract server and client classes to handle multiple connections from multiple clients and connecting to the server. This way, all the logic to connect to a server or handling multiple clients can be shared between all types of servers and clients in the cluster. These classes are shown in the diagrams below:

.. thumbnail:: ../images/development/cluster-clients.png
    :title: Wazuh cluster protocol class inheritance
    :align: center
    :width: 80%

.. thumbnail:: ../images/development/cluster-servers.png
    :title: Wazuh cluster protocol class inheritance
    :align: center
    :width: 80%

When the ``wazuh-clusterd`` process starts in the master, it creates a ``Master`` object. Every time a new worker connects to the master, a ``MasterHandler`` object is created to handle the connection with that worker (incoming requests, synchronization processes, etc). That means there will always be at least a ``Master`` object and as many ``MasterHandler`` objects as connected workers. The ``Master`` object will be the one managing all ``MasterHandler`` objects created.

In the worker side, when the ``wazuh-clusterd`` process starts it creates a ``Worker`` object. This object is in charge of initializing worker variables to connect to the master. A ``WorkerHandler`` object is created when connecting to the master node. This object will be the one sending requests to the master and managing synchronization processes.

Protocols
^^^^^^^^^

Protocol definition
~~~~~~~~~~~~~~~~~~~

The communication protocol used in all communications (both cluster and API) is defined in the ``wazuh.core.cluster.common.Handler``. Each message in the protocol has the following structure:

.. thumbnail:: ../images/development/structure-message-protocol.png
    :title: Structure for each message in the protocol
    :align: center
    :width: 80%

The protocol message has two parts: a header and a payload. The payload will be 5242880 bytes long at maximum and the header will be exactly 22 bytes long.

The header has four subparts:

* **Counter**: It specifies the message ID. It's randomly generated for every new sent request. It's very useful when receiving a response, so it indicates which sent request it is replying to.
* **Payload length**: Specifies the amount of data contained in the message payload. Used to know how much data to expect to receive.
* **Command**: Specifies protocol message. This string will always be 11 characters long. If the command is not 11 characters long, a padding of ``-`` is added until the string reaches the expected length. All available commands in the protocol are shown below.
* **Flag message divided**: Specifies whether the message has been divided because its initial payload length was more than 5242880 bytes or not. The flag value can be ``d`` if the message is a divided one, or nothing (it will be ``-`` due to the padding mentioned above) if the message is the end of a divided message or a single message.


Wazuh cluster protocol
~~~~~~~~~~~~~~~~~~~~~~

This communication protocol is used by all cluster nodes to synchronize the necessary information to receive reports from the agents. All communications are made through TCP. These commands are defined in ``wazuh.core.cluster.master.MasterHandler.process_request`` and in ``wazuh.core.cluster.worker.WorkerHandler.process_request``.

+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| Message           | Received in | Arguments             | Description                                                                                     |
+===================+=============+=======================+=================================================================================================+
| ``hello``         | Master      | - Node name<str>      | First message sent by a worker to the master on its first connection.                           |
|                   |             | - Cluster name<str>   |                                                                                                 |
|                   |             | - Node type<str>      |                                                                                                 |
|                   |             | - Wazuh version<str>  |                                                                                                 |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``syn_i_w_m_p``   | Master      | None                  | Ask permission to start synchronization protocol. Message characters define the action to do:   |
| ``syn_a_w_m_p``   |             |                       |                                                                                                 |
|                   |             |                       | - I (integrity), A (agent-info).                                                                |
|                   |             |                       | - W (worker), M (master), P (permission).                                                       |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``syn_i_w_m``     | Master      | None or String ID<str>| Start synchronization protocol. Message characters define the action to do:                     |
| ``syn_a_w_m``     |             |                       |                                                                                                 |
|                   |             |                       | - I (integrity), A (agent-info).                                                                |
|                   |             |                       | - W (worker), M (master).                                                                       |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``syn_i_w_m_e``   | Master      | None or String ID<str>| End synchronization protocol. Message characters define the action to do:                       |
| ``syn_w_g_e``     |             |                       |                                                                                                 |
| ``syn_wgc_e``     |             |                       | - I (integrity), G (agent-groups send), C (agent-groups send full).                             |
|                   |             |                       | - W (worker), M (master), E(end)                                                                |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``syn_g_m_w``     | Worker      | Agent-groups          | Start synchronization protocol. Message characters define the action to do:                     |
| ``syn_g_m_w_c``   |             | data<dict>            |                                                                                                 |
|                   |             |                       | - G (agent-groups recv), C (agent-groups recv full).                                            |
|                   |             |                       | - W (worker), M (master).                                                                       |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``syn_i_w_m_r``   | Master      | Error msg<str>        | Notify an error during synchronization. Message characters define the action to do:             |
| ``syn_w_g_err``   |             |                       |                                                                                                 |
| ``syn_wgc_err``   |             |                       | - I (integrity), G (agent-groups send), C (agent-groups send full).                             |
|                   |             |                       | - W (worker), M (master), R/ERR (error).                                                        |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``sendsync``      | Master      | Arguments<Dict>       | Receive a message from a worker node destined for the specified daemon of the master node.      |
|                   |             |                       |                                                                                                 |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``sendsyn_res``   | Worker      | - Request ID<str>     | Notify the ``sendsync`` response is available.                                                  |
|                   |             | - String ID<str>      |                                                                                                 |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``sendsyn_err``   | Both        | - Local client ID<str>| Notify errors in the ``sendsync`` communication.                                                |
|                   |             | - Error message<str>  |                                                                                                 |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``get_nodes``     | Master      | Arguments<Dict>       | Request sent from ``cluster_control -l`` from worker nodes.                                     |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``get_health``    | Master      | Arguments<Dict>       | Request sent from ``cluster_control -i`` from worker nodes.                                     |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``dapi_clus``     | Master      | Arguments<Dict>       | Receive an API call related to cluster information: Get nodes information or healthcheck.       |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``dapi``          | Both        | - Sender node<str>    | Receive a distributed API request. If the API call has been forwarded multiple times,           |
|                   |             | - Arguments<Dict>     | the sender node contains multiple names separated by a ``*`` character.                         |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``dapi_res``      | Both        | - Request ID<str>     | Receive a distributed API response from a previously forwarded request.                         |
|                   |             | - String ID<str>      | Responses are sent using send long strings protocol so this request only needs the string ID.   |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``dapi_err``      | Both        | - Local client ID<str>| Receive an error related to a previously requested distributed API request.                     |
|                   |             | - Error message<str>  |                                                                                                 |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``syn_m_c_ok``    | Worker      | None                  | Master verifies that worker integrity is correct.                                               |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``syn_m_c``       | Worker      | None                  | Master will send the worker integrity files to update.                                          |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``syn_m_c_e``     | Worker      | - Error msg<str> or   | Master has finished sending integrity files.                                                    |
|                   |             |   Task name<str>      | The files were received in task *Task name* previously created by the worker in ``syn_m_c``.    |
|                   |             | - Filename<str>       | If master had issues sending/processing/receiving worker integrity an error message will be     |
|                   |             |                       | sent instead of the task name and filename.                                                     |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``syn_m_a_e``     | Worker      | Arguments<Dict>       | Master has finished updating agent-info. Number of updated chunks and chunks with               |
|                   |             |                       | errors (if any) will be sent.                                                                   |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``syn_m_a_err``   | Worker      | Error msg<str>        | Notify an error during agent-info synchronization.                                              |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+


Local protocol
~~~~~~~~~~~~~~

This communication protocol is used by the API to forward requests to other cluster nodes. All communications are made using a Unix socket since the communication is all local (from the process running the API to the process running the cluster). These commands are defined in ``wazuh.core.cluster.local_server.LocalServerHandler.process_request``, ``wazuh.core.cluster.local_server.LocalServerHandlerMaster.process_request`` and ``wazuh.core.cluster.local_server.LocalServerHandlerWorker.process_request``.

+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| Message           | Received in | Arguments             | Description                                                                                     |
+===================+=============+=======================+=================================================================================================+
| ``get_config``    | Both        | None                  | Returns active cluster configuration. Necessary for active configuration API calls.             |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``get_nodes``     | Both        | Arguments<Dict>       | Request sent from ``cluster_control -l``.                                                       |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``get_health``    | Both        | Arguments<Dict>       | Request sent from ``cluster_control -i``.                                                       |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``get_hash``      | Both        | None                  | Receive a request to obtain custom ruleset files and their hashes.                              |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``send_file``     | Both        | Filepath<str>,        | Request used to test send file protocol.                                                        |
|                   |             | Node name<str>        | Node name parameter is ignored in worker nodes (it's always sent to the master node).           |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``dapi``          | Both        | Arguments<Dict>       | Receive a distributed API request from the API. When this request is received in a worker node  |
|                   |             |                       | it is forwarded to the master. But when the master receives it, it will execute it locally.     |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+
| ``dapi_fwd``      | Server      | Node name<str>,       | Forward a distributed API request to the specified node.                                        |
|                   |             | Arguments<Dict>       | To forward the request to all nodes use ``fw_all_nodes`` as node name.                          |
+-------------------+-------------+-----------------------+-------------------------------------------------------------------------------------------------+


Common messages
~~~~~~~~~~~~~~~

As said before, all protocols are built from a common abstract base. This base defines some messages to manage connections, keep alives, etc. These commands are defined in ``wazuh.core.cluster.common.Handler.process_request``, ``wazuh.core.cluster.server.AbstractServerHandler.process_request`` and ``wazuh.core.cluster.client.AbstractClient.process_request``.

+-----------------+-------------+--------------------+--------------------------------------------------------------------------+
| Message         | Received in | Arguments          | Description                                                              |
+=================+=============+====================+==========================================================================+
| ``new_str``     | Both        | String length<int> | Used to start the sending long strings process.                          |
+-----------------+-------------+--------------------+--------------------------------------------------------------------------+
| ``str_upd``     | Both        | String Id<str>,    | Used to send a string chunk during the sending long strings process.     |
|                 |             | Data chunk<str>    |                                                                          |
+-----------------+-------------+--------------------+--------------------------------------------------------------------------+
| ``err_str``     | Both        | String length<int> | Used to notify an error while sending a string so the reserved space is  |
|                 |             |                    | freed.                                                                   |
+-----------------+-------------+--------------------+--------------------------------------------------------------------------+
| ``new_file``    | Both        | Filename<str>      | Used to start the sending file process.                                  |
+-----------------+-------------+--------------------+--------------------------------------------------------------------------+
| ``file_upd``    | Both        | Filename<str>,     | Used to send a file chunk during the sending file process.               |
|                 |             | Data chunk<str>    |                                                                          |
+-----------------+-------------+--------------------+--------------------------------------------------------------------------+
| ``file_end``    | Both        | Filename<str>,     | Used to finish the sending file process.                                 |
|                 |             | File checksum<str> |                                                                          |
+-----------------+-------------+--------------------+--------------------------------------------------------------------------+
| ``cancel_task`` | Both        | Task name<str>,    | Used to cancel the task in progress in the sending node.                 |
|                 |             | Error msg<str>     |                                                                          |
+-----------------+-------------+--------------------+--------------------------------------------------------------------------+
| ``echo``        | Both        | Message<str>       | Used to send keepalives to the peer. Replies the same received message.  |
+-----------------+-------------+--------------------+--------------------------------------------------------------------------+
| ``echo-c``      | Server      | Message<str>       | Used by the client to send keepalives to the server.                     |
+-----------------+-------------+--------------------+--------------------------------------------------------------------------+
| ``echo-m``      | Client      | Message<str>       | Used by the server to send keepalives to the client.                     |
+-----------------+-------------+--------------------+--------------------------------------------------------------------------+
| ``hello``       | Server      | Client name<str>   | First message sent by a client to the server on its first connection.    |
|                 |             |                    | The Wazuh protocol modifies this command to add extra arguments.         |
+-----------------+-------------+--------------------+--------------------------------------------------------------------------+


Cluster performance
^^^^^^^^^^^^^^^^^^^
Asynchronous tasks
~~~~~~~~~~~~~~~~~~
Part of the magic behind the cluster performance is using asynchronous tasks. An asynchronous task is like a thread in Python, because it will be executed concurrently with the main task and other ones, but it is much more lightweight than a thread and it's faster to create. Asynchronous tasks take advantage of how slow I/O is to do its concurrent execution: while a task is waiting for some data to be fetched/sent from/to a socket, another one is executing. Imagine a chef who's cooking multiple meals at the same time to better picture the idea of "asynchronous" in your head.

Each of the "threads" described in the `Workflow`_ section are implemented as asynchronous tasks. These tasks are started in ``wazuh.core.cluster.client.AbstractClientManager.start``, ``wazuh.core.cluster.server.AbstractServer.start``, and ``wazuh.core.cluster.local_server.LocalServer.start`` and they are all implemented using infinite loops.

In addition to those already mentioned, there are more tasks that are created when a received request requires a complex process to be solved. These tasks are created to solve the received request and destroyed once the response has been sent. This type of architecture is necessary to prevent the server to be busy serving a single request.

One of those tasks, which is defined as a class, is the task created to receive and process a file from the other peer. This class is instantiated when a synchronization process is started and it is destroyed once the synchronization process ends. It creates an asynchronous task that waits until the necessary files to do the synchronization process are received. This asynchronous task has a `callback <https://docs.python.org/3/library/asyncio-task.html#asyncio.Task.add_done_callback>`_ that checks if there was an error during the synchronization process.

.. thumbnail:: ../images/development/receive-file-task-cluster.png
    :title: Receive file class inheritance
    :align: center
    :width: 80%

Multiprocessing
~~~~~~~~~~~~~~~

While the use of asynchronous tasks is a good solution to optimize work and avoid waiting times for I/O, it is not a good solution to execute multiple tasks that require intensive use of CPU. The reason is the way in which Python works. Python allows a single thread to take control over the Python interpreter through the Global Interpreter Lock (GIL). Therefore, asynchronous tasks run concurrently and not in parallel. Following the analogy of the previous section, it is as if there is effectively only one chef who has to do all the tasks. The chef can only do one at a time so if one task requires all his/her attention, the other ones are delayed.

The master node in the cluster is under a heavy workload, especially in large environments. Although the tasks are asynchronous, they have sections that require high CPU usage, such as calculating the hash of the files to be synchronized with the Local integrity thread. To avoid other tasks to wait for the Python interpreter to complete the CPU-bound parts, multiprocessing is used. Using the same analogy again, multiprocessing would be equivalent to having more chefs working in the same kitchen.

Multiprocessing is implemented in the cluster process of both the master node and the worker nodes, and `concurrent.futures.ProcessPoolExecutor <https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.ProcessPoolExecutor>`_ is used for this purpose. Cluster tasks can use any free process in the process pool to delegate and execute in parallel those parts of their logic that are more CPU intensive. With this, it is possible to take advantage of more CPU cores and increase the overall performance of the cluster process. When combined with asyncio, best results are obtained.

Child processes are created when the parent `wazuh-clusterd` starts. They stay in the process pool waiting for new jobs to be assigned to them. There are two child processes by default within the master node pool. This value can be changed in the `process_pool_size` variable in the `cluster.json <https://github.com/wazuh/wazuh/blob/v|WAZUH_CURRENT|/framework/wazuh/core/cluster/cluster.json>`__ file. The worker nodes, on the other hand, create a single child process and this number is not modifiable. The tasks that use multiprocessing in the cluster are the following.

Master node
###########
* **Local integrity thread**: Calculates the hash of all the files to be synchronized. This requires high CPU usage.
* **Agent info thread**: A section of this task sends all the agents' information to the wazuh-db. The communication is done in small chunks so as not to saturate the service socket. This turned this task into a somewhat slow process and not a good candidate for asyncio.
* **Integrity thread**: Compressing files, which is done inside this task, is fully synchronous and can block the parent cluster process.

Worker nodes
############
* **Integrity thread**: This is the only task in workers that uses multiprocessing. It carries out the following CPU-intensive actions.

   * **Hash calculation**: Calculates the hash of all the files to be synchronized every time Integrity check is started.
   * **Unzip files**: Extracts files and can take too long when the zip is large.
   * **Process master files**: Processes and moves all the files that were received from the master node to the appropriate destination.

Below is an example diagram of how the process pool is used in the master node:

.. thumbnail:: ../images/development/cluster-process-pool.png
    :title: Cluster process pool
    :align: center
    :width: 80%


Integrity synchronization process
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Let's review the integrity synchronization process to see how asyncio tasks are created to process data from the peer. The following diagram shows the whole process of synchronizing integrity:

.. thumbnail:: ../images/development/sync-integrity-diagram.png
    :title: Sync integrity diagram
    :align: center
    :width: 80%


* **1**: The worker's ``sync_integrity`` task wakes up after sleeping during *interval* seconds (which is defined in the `cluster.json <https://github.com/wazuh/wazuh/blob/v|WAZUH_CURRENT|/framework/wazuh/core/cluster/cluster.json>`__ file). The first thing it does is checking whether the previous synchronization process is finished or not using the ``syn_i_w_m_p`` command. The master replies with a boolean value specifying that the previous synchronization process is finished and, therefore, the worker can start a new one.
* **2**: The worker starts the synchronization process using ``syn_i_w_m`` command. When the master receives the command, it creates an asyncio task to process the received integrity from the worker node. But since no file has been received yet, the task keeps waiting until the worker sends the file. The master sends the worker the task ID so the worker can notify the master to wake it up once the file has been sent.
* **3**: The worker starts the sending file process. Which has three steps: ``new_file``, ``file_upd`` and ``file_end``.
* **4**: The worker notifies the master that the integrity file has already been sent. In that moment, the master wakes the previously created task up and compares the worker files with its own. In this example the master finds out the worker integrity is outdated.
* **5**: The master starts a sync integrity process with the worker using the ``syn_m_c`` command. The worker creates a task to process the received integrity from the master but the task is sleeping since it's not been received yet. This is the same process the worker has done with the master but changing directions.
* **6**: The master sends all information to the worker using the sending file process.
* **7**: The master notifies the worker that the integrity information has already been sent using the ``syn_m_c_e`` command. The worker wakes the previously created task up to process and update the required files.

To sum up, asynchronous tasks are created only when the received request needs to wait for some data to be available (for example, synchronization tasks waiting for the zip file from the other peer). If the request can be solved instantly, no asynchronous tasks are created for it.

Distributed API requests
^^^^^^^^^^^^^^^^^^^^^^^^

Another example that can show how asynchronous tasks are used is Distributed API requests. Before explaining the example, let's review the different type of requests that can be done in the distributed API:

* ``local_any``: The request can be solved by any node. These requests are usually information that the master distributes to all nodes such as rules, decoders or CDB lists. These requests will never be forwarded or solved remotely.
* ``local_master``: The request can be solved by the master node. These requests are usually information about the global status/management of the cluster such as agent information/status/management, agent groups management, cluster information, etc.
* ``distributed_master``: The master must forward the request to the most suitable node to solve it.

The type association with every endpoint can be found here: `API controllers <https://github.com/wazuh/wazuh/tree/v|WAZUH_CURRENT|/api/api/controllers>`__.

Imagine a cluster with two nodes, where there is an agent reporting to the worker node with id *020*. The following diagram shows the process of requesting ``GET/syscollector/020/os`` API endpoint:

.. thumbnail:: ../images/development/distributed-dapi-worker.png
    :title: Distributed API requests
    :align: center
    :width: 80%

* **1**: The user does an API request. The API server receives the connection and calls ``distribute_function``. Since the requested endpoint is ``distributed_master`` the worker realizes it can't solve the request locally and proceeds to forward the request to the master node.
* **2**: The API server doesn't have direct contact with the cluster master node. So the API process forwards the request to a Unix socket the cluster has to receive API requests locally. This Unix server is running inside the cluster process, so it can send requests to the master node. In order to identify the API request when the master sends a response back, the local server adds an ID (``local_client1`` in the example).
* **3**: When the master receives the API request, it is added to a queue where all pending requests from all nodes are stored. Since this queue is shared with all other nodes, the master adds the node ID to the request (``node2`` in this example).
* **4**: The master pops the received request out of its queue. It then realizes the agent *020* is reporting in the worker node ``node2`` so it forwards the request to this node because it's the one who has the most updated information about the agent.
* **5**: The master creates a new request to get the necessary information from the worker. This request includes a new ID (``request1`` in the example) so the master can identify the response when the worker sends it. The original request sent by the worker node remains in the master node awaiting to be solved.
* **6**: The worker receives the request from the master and adds it to its request queue. The worker solves the request locally and sends the request response to the master using the long string process. Once the response has been sent, the worker notifies the master using the ``dapi_res`` command. The ``task_id`` is necessary since the master can receive multiple long string at the same time and it needs a way to identify each one.
* **7**: Once the master receives the required information from the worker, it's able to solve the originally received request from the worker. The master notifies the distributed API that the response has already been received.
* **8**: The master uses the long string process to send the response to the worker node.
* **9**: The worker node receives the response from the master and starts a new send long string process to forward it to the API process. Once the API receives the response over the Unix socket connection it had with the cluster process, the response is returned to the user.

To sum up, asynchronous tasks are created to forward the request from one node to the other so the servers can always be available to receive new requests. None of the objects shown in the diagram remain blocked waiting for a response, they just wait to be notified when the response is available. That is achieved using `Events <https://docs.python.org/3/library/asyncio-sync.html#asyncio.Event>`_.

Why is it necessary to forward the request to the master node if the agent was reporting in the worker where the request was originally done? The worker nodes don't have a global vision of the cluster state. Just a local one. If an agent was previously reporting to a node and then changes to a new one, the worker won't realize about the change since it's not notified about it. Only the master receives the ``agent-info`` data from all worker nodes, it's the only node that knows where an agent is really reporting. This is why all API requests are always forwarded to the master node, except the ``local_any`` ones.

Troubleshooting
---------------

The cluster has lots of different components working together: a network protocol, I/O and some Wazuh specific logic. All these components log their progress in ``logs/cluster.log`` file. To make things easier for the developer, each component includes a log tag to help the developer see which exact component logged the event. The following is an example of how the log file looks:

.. code-block:: none
    :class: output

    2021/03/29 07:05:26 INFO: [Worker worker1] [Integrity check] Starting. Received metadata of 12 files.
    2021/03/29 07:05:26 INFO: [Worker worker1] [Integrity check] Finished in 0.016s. Sync required.
    2021/03/29 07:05:26 INFO: [Worker worker1] [Integrity sync] Starting.
    2021/03/29 07:05:26 INFO: [Worker worker1] [Integrity sync] Files to create in worker: 0 | Files to update in worker: 0 | Files to delete in worker: 1 | Files to receive: 0
    2021/03/29 07:05:26 INFO: [Worker worker1] [Integrity sync] Finished in 0.015838s.
    2021/03/29 07:05:27 INFO: [Master] [Local integrity] Starting.
    2021/03/29 07:05:27 INFO: [Master] [Local integrity] Finished in 0.013s. Calculated metadata of 11 files.
    2021/03/29 07:05:27 INFO: [Worker worker1] [Agent-info sync] Starting.
    2021/03/29 07:05:27 INFO: [Worker worker1] [Agent-info sync] Finished in 0.001s (0 chunks received).
    2021/03/29 07:05:31 INFO: [Master] [D API] Receiving request: check_user_master from worker1 (237771)

When there is an error in the cluster, it will be logged under the ``ERROR:`` tag. That means a good healthcheck to do when there is a problem in the cluster is the following:

.. code-block:: console

    # grep -i error /var/ossec/logs/cluster.log

.. code-block:: none
    :class: output

    2019/04/10 15:37:58 wazuh-clusterd: ERROR: [Cluster] [Main] Could not get checksum of file client.keys: [Errno 13] Permission denied: '/var/ossec/etc/client.keys'

If the log error message isn't clarifying enough, the traceback can be logged setting the log level to ``DEBUG2``. To do so, use the following command:

.. code-block:: console

    # sed -i "s:wazuh_clusterd.debug=1:wazuh_clusterd.debug=2:g" /var/ossec/etc/internal_options.conf
    # systemctl restart wazuh-manager
    # grep -i error /var/ossec/logs/cluster.log -A 10

.. code-block:: none
    :class: output

    2019/04/10 15:50:37 wazuh-clusterd: ERROR: [Cluster] [Main] Could not get checksum of file client.keys: [Errno 13] Permission denied: '/var/ossec/etc/client.keys'
    Traceback (most recent call last):
    File "/var/ossec/framework/python/lib/python3.9/site-packages/wazuh-|WAZUH_CURRENT|-py3.7.egg/wazuh/core/cluster/cluster.py", line 217, in walk_dir
        entry_metadata['blake2b'] = blake2b(os.path.join(common.ossec_path, full_path))
    File "/var/ossec/framework/python/lib/python3.9/site-packages/wazuh-|WAZUH_CURRENT|-py3.7.egg/wazuh/core/utils.py", line 555, in blake2b
        with open(fname, "rb") as f:
    PermissionError: [Errno 13] Permission denied: '/var/ossec/etc/client.keys'

Having the traceback usually helps to understand what's happening.

There are two ways of configuring the log level:
* Modifying the ``wazuh_clusterd.debug`` variable in the ``internal_options.conf`` file.
* Using the argument ``-d`` in the ``wazuh-clusterd`` binary.
