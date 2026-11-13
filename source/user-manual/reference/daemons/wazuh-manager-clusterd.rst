.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-manager-clusterd program runs the Wazuh manager cluster service, which coordinates communication and synchronization between cluster nodes.

.. _wazuh_manager_clusterd:

wazuh-manager-clusterd
=========================

The ``wazuh-manager-clusterd`` executable runs the Wazuh manager cluster service.

The cluster service enables multiple Wazuh managers to operate as a cluster. It coordinates communication between cluster nodes, synchronizes cluster data, and manages the distribution of tasks across the cluster.

For more information about configuring and managing a Wazuh cluster, see the :doc:`Wazuh cluster section </user-manual/manager/wazuh-manager-services>` of the User Manual.

+---------------+------------------------------------------------------------------------+
| Option        | Description                                                            |
+===============+========================================================================+
| -c <config>   | Specifies the configuration file to use. The default is                |
|               | ``/etc/wazuh-manager/wazuh-manager.conf``.                             |
+---------------+------------------------------------------------------------------------+
| -d            | Enables debug messages. Repeat the option to increase the verbosity.   |
+---------------+------------------------------------------------------------------------+
| -f            | Runs the service in the foreground.                                    |
+---------------+------------------------------------------------------------------------+
| -h, --help    | Displays the help message and exits.                                   |
+---------------+------------------------------------------------------------------------+
| -r            | Keeps the service running as root. Without this option, the service    |
|               | switches to the ``wazuh-manager`` user when it starts as root.         |
+---------------+------------------------------------------------------------------------+
| -t            | Tests the configuration and exits.                                     |
+---------------+------------------------------------------------------------------------+
| -V            | Displays version information.                                          |
+---------------+------------------------------------------------------------------------+
