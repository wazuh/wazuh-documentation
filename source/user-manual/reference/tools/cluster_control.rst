.. _cluster_control:

cluster_control
===============

.. versionadded:: 3.0.0

The cluster_control program allows you to manage the cluster from any manager. It is necessary that ``wazuh-clusterd-internal`` is running
in order to use this tool.

cluster_control options
-----------------------

+-------------------------------------------+------------------------------------------------------------+
| ``-h, --help``                            | Display the help message.                                  |
+-------------------------------------------+------------------------------------------------------------+
| ``-p, --push``                            | Send all not synchronized files.                           |
+-------------------------------------------+------------------------------------------------------------+
| ``-f, --force``                           | Send all files. It can be combined with ``-m``.            |
+-------------------------------------------+------------------------------------------------------------+
| ``-s, --scan``                            | Scan for new files in the manager                          |
+-------------------------------------------+------------------------------------------------------------+
| ``-l, --files [FILE [FILE ...]]``         | List the status of specified files.                        |
+-------------------------------------------+------------------------------------------------------------+
| ``-m, --manager [MANAGER [MANAGER ...]]`` | List the status of the synchronized files in that manager. |
+-------------------------------------------+------------------------------------------------------------+
| ``-a, --agents [AGENT [AGENT ...]]``      | List configuration files in group.                         |
+-------------------------------------------+------------------------------------------------------------+
| ``-n, --nodes [NODE [NODE ...]]``         | List the status of nodes of the cluster.                   |
+-------------------------------------------+------------------------------------------------------------+

.. note::
    The ``--manager`` parameter must be be used with the ``--files`` parameter for retrieving the synchronized files in a specific manager or with the ``--force`` parameter to force synchronization in a specific manager. Multiple managers can be specified.

Examples of use
---------------

* Synchronize the shared files with other nodes:

.. code-block:: console

    # /var/ossec/bin/cluster_control -p
    2017-11-21 16:21:53,390 INFO: Starting to sync localhost's files
    2017-11-21 16:21:53,391 DEBUG: Connected to cluster database socket
    2017-11-21 16:21:53,391 DEBUG: Nodes to sync: ['192.168.56.103', '192.168.56.104']
    2017-11-21 16:21:53,393 DEBUG: Retrieving 192.168.56.103's files from database
    2017-11-21 16:21:53,400 DEBUG: Retrieving 192.168.56.104's files from database
    2017-11-21 16:21:53,405 DEBUG: Time retrieving info from DB: 0.145690917969
    2017-11-21 16:21:53,411 INFO: Sending 192.168.56.103 1 files
    2017-11-21 16:21:53,417 DEBUG: {'updated': 1, 'invalid': [], 'error': []}
    2017-11-21 16:21:53,419 INFO: Sending 192.168.56.104 1 files
    2017-11-21 16:21:53,424 DEBUG: {'updated': 1, 'invalid': [], 'error': []}
    2017-11-21 16:21:53,425 DEBUG: Time sending info: 0.0196959972382
    2017-11-21 16:21:53,425 INFO: Updating 192.168.56.104's file status in DB
    2017-11-21 16:21:53,436 INFO: Updating 192.168.56.103's file status in DB
    2017-11-21 16:21:53,444 DEBUG: Time updating DB: 0.0193810462952

* Force synchronization in all managers:

.. code-block:: console

    # /var/ossec/bin/cluster_control --force
    2017-11-30 10:30:01,880 INFO: Starting to sync node01's files
    2017-11-30 10:30:01,880 DEBUG: Connected to cluster database socket
    2017-11-30 10:30:01,880 DEBUG: Nodes to sync: ['192.168.56.103', '192.168.56.104']
    2017-11-30 10:30:01,880 INFO: Found 2 connected nodes
    2017-11-30 10:30:01,997 DEBUG: Retrieving 192.168.56.103's files from database
    2017-11-30 10:30:02,114 DEBUG: Retrieving 192.168.56.104's files from database
    2017-11-30 10:30:02,119 DEBUG: Time retrieving info from DB: 0.399097919464
    2017-11-30 10:30:02,119 INFO: Sending 192.168.56.103 20 files
    2017-11-30 10:30:02,165 DEBUG: {'updated': 20, 'invalid': [], 'error': []}
    2017-11-30 10:30:02,166 INFO: Sending 192.168.56.104 20 files
    2017-11-30 10:30:02,216 DEBUG: {'updated': 20, 'invalid': [], 'error': []}
    2017-11-30 10:30:02,216 DEBUG: Time sending info: 0.0974159240723
    2017-11-30 10:30:02,217 INFO: Updating 192.168.56.104's file status in DB
    2017-11-30 10:30:02,225 INFO: Updating 192.168.56.103's file status in DB
    2017-11-30 10:30:02,235 DEBUG: Time updating DB: 0.0181400775909

* Force synchronization in one manager:

.. code-block:: console

    # /var/ossec/bin/cluster_control --force -m 192.168.56.104
    2017-11-30 10:29:06,539 DEBUG: Connected to cluster database socket
    2017-11-30 10:29:06,658 DEBUG: Retrieving 192.168.56.104's files from database
    2017-11-30 10:29:06,662 DEBUG: Time retrieving info from DB: 0.126603126526
    2017-11-30 10:29:06,663 INFO: Sending 192.168.56.104 20 files
    2017-11-30 10:29:06,837 DEBUG: {'updated': 20, 'invalid': [], 'error': []}
    2017-11-30 10:29:06,838 DEBUG: Time sending info: 0.175267934799
    2017-11-30 10:29:06,838 INFO: Updating 192.168.56.104's file status in DB
    2017-11-30 10:29:06,847 DEBUG: Time updating DB: 0.00871992111206

* Get the list of agents connected to the cluster:

.. code-block:: console

    $ /var/ossec/bin/cluster_control -a
    ------------------------------------------------------------
    ID   IP              Name           Status  Manager hostname
    ------------------------------------------------------------
    001  192.168.56.105  centos         Active  node01
    ------------------------------------------------------------
    002  192.168.56.106  ubuntu         Active  node01
    ------------------------------------------------------------
    003  192.168.56.107  agent03        Active  node02
    ------------------------------------------------------------
    004  192.168.56.108  centos_apache  Active  node03
    ------------------------------------------------------------
    005  192.168.56.109  ubuntu_14      Active  node03
    ------------------------------------------------------------

In this table we can see in real-time to which manager is reporting each connected agent.

* List the status of all shared files in a specific manager:

.. code-block:: console

    $ /var/ossec/bin/cluster_control -l -m 192.168.56.103
    --------------------------------------------------------------------------
    Manager         Filename                                      Status
    --------------------------------------------------------------------------
    192.168.56.103  /etc/shared/default/cis_sles11_linux_rcl.txt  synchronized
    192.168.56.103  /etc/client.keys                              synchronized
    192.168.56.103  /queue/agent-groups/001                       synchronized
    192.168.56.103  /etc/shared/default/rootkit_files.txt         synchronized
    192.168.56.103  /etc/shared/default/win_malware_rcl.txt       synchronized
    192.168.56.103  /etc/shared/default/cis_rhel7_linux_rcl.txt   synchronized
    192.168.56.103  /etc/shared/default/agent.conf                synchronized
    192.168.56.103  /etc/shared/default/system_audit_ssh.txt      synchronized
    192.168.56.103  /etc/shared/default/cis_rhel5_linux_rcl.txt   synchronized
    192.168.56.103  /etc/shared/default/cis_rhel_linux_rcl.txt    synchronized
    192.168.56.103  /etc/shared/default/rootkit_trojans.txt       synchronized
    192.168.56.103  /etc/shared/ar.conf                           synchronized
    192.168.56.103  /queue/agent-info/centos-192.168.56.105       synchronized
    192.168.56.103  /etc/shared/default/merged.mg                 synchronized
    192.168.56.103  /etc/shared/default/cis_debian_linux_rcl.txt  synchronized
    192.168.56.103  /etc/shared/default/system_audit_rcl.txt      synchronized
    192.168.56.103  /etc/shared/default/win_applications_rcl.txt  synchronized
    192.168.56.103  /etc/shared/default/cis_sles12_linux_rcl.txt  synchronized
    192.168.56.103  /etc/shared/default/cis_rhel6_linux_rcl.txt   synchronized
    192.168.56.103  /etc/shared/default/win_audit_rcl.txt         synchronized
    --------------------------------------------------------------------------

* Get the status of a file in specific managers:

.. code-block:: console

    $ /var/ossec/bin/cluster_control -l /etc/client.keys -m 192.168.56.103, 192.168.56.104
    ----------------------------------------------
    Manager         Filename          Status
    ----------------------------------------------
    192.168.56.103  /etc/client.keys  synchronized
    ----------------------------------------------
    192.168.56.104  /etc/client.keys  synchronized
    ----------------------------------------------

* Get the status of all nodes:

.. code-block:: console

    $ /var/ossec/bin/cluster_control -n
    -------------------------------------------
    Node         Status          Address
    -------------------------------------------
    node01       connected       localhost
    -------------------------------------------
    node02       connected       192.168.56.103
    -------------------------------------------
    node03       connected       192.168.56.104
    -------------------------------------------
    unknown      disconnected    192.168.56.111
    -------------------------------------------
