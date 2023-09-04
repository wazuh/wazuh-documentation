.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Install the Wazuh manager for a Wazuh with Splunk installation

Wazuh manager installation
==========================

This document will go through the installation of the Wazuh manager.

.. note:: You need root user privileges to run all the commands described below.

Prerequisites
-------------

Before installing the Wazuh manager, some extra packages must be installed:

.. include:: /_templates/installations/elastic/common/before_installation_kibana_filebeat.rst

Installation
------------

The Wazuh server collects and analyzes data from deployed Wazuh agents. It runs the Wazuh manager and the Splunk forwarder. The first step in setting up Wazuh is adding the Wazuh repository to the server. All the Wazuh packages can be found :doc:`here </installation-guide/packages-list>`. 

#. Add the Wazuh repository

   .. include:: /_templates/installations/wazuh/common/add_repository.rst

#. Install the Wazuh manager package:

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum -y install wazuh-manager|WAZUH_MANAGER_RPM_PKG_INSTALL|

      .. group-tab:: APT

         .. code-block:: console

            # apt-get -y install wazuh-manager|WAZUH_MANAGER_DEB_PKG_INSTALL|

Choose the corresponding tab to configure the installation as a single-node or multi-node cluster: 

.. tabs::

   .. group-tab:: Single-node cluster

      #. Enable and start the Wazuh manager service:

         .. tabs::

            .. group-tab:: Systemd

               .. code-block:: console

                  # systemctl daemon-reload
                  # systemctl enable wazuh-manager
                  # systemctl start wazuh-manager

            .. group-tab:: SysV init

               Choose one option according to your operating system:

               a) RPM-based operating system:

               .. code-block:: console

                 # chkconfig --add wazuh-manager
                 # service wazuh-manager start

               b) Debian-based operating system:

               .. code-block:: console

                 # update-rc.d wazuh-manager defaults 95 10
                 # service wazuh-manager start

      #. Run the following command to check if the Wazuh manager is active: 

         .. include:: /_templates/installations/wazuh/common/check_wazuh_manager.rst

            

   .. group-tab:: Multi-node cluster

      One Wazuh server has to be chosen as a master, the rest will be workers. So, the section ``Wazuh server master node`` will be added in the configuration file of the server chosen for the master role. For all the other servers, the section ``Wazuh server worker node`` should be applied.

      **Wazuh server master node**

      #. Configure the cluster master node by specifying the following settings in the ``/var/ossec/etc/ossec.conf`` file.

         .. code-block:: xml

            <cluster>
              <name>wazuh</name>
              <node_name>master-node</node_name>
              <node_type>master</node_type>
              <key>wazuh-master-key</key>
              <port>1516</port>
              <bind_addr>0.0.0.0</bind_addr>
              <nodes>
                <node>wazuh-master-address</node>
              </nodes>
              <hidden>no</hidden>
              <disabled>no</disabled>
            </cluster>

         Parameters to be configured:

         +-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
         |:ref:`name <cluster_name>`           | Name of the cluster.                                                                                                                                                                                                                                 |
         +-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
         |:ref:`node_name <cluster_node_name>` | Name of the current node.                                                                                                                                                                                                                            |
         +-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
         |:ref:`node_type <cluster_node_type>` | It specifies the role of the node. It has to be set to ``master``.                                                                                                                                                                                   |
         +-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
         |:ref:`key <cluster_key>`             |The key that will be used to encrypt communication between cluster nodes. The key must be 32 characters long and the same for all of the nodes in the cluster. The following command can be used to generate a random key: ``openssl rand -hex 16``.  |
         +-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
         |:ref:`port <cluster_port>`           | Destination port for cluster communication.                                                                                                                                                                                                          |
         +-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
         |:ref:`bind_addr <cluster_bind_addr>` | Network IP address to which the node is bound to listen for incoming requests (0.0.0.0 for any IP).                                                                                                                                                  |
         +-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
         |:ref:`nodes <cluster_nodes>`         | The address of the ``master node``. It must be specified in all nodes, including the master itself. The address can be either an IP or a DNS.                                                                                                        |
         +-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
         |:ref:`hidden <cluster_hidden>`       | It indicates whether to show or hide the cluster information in the generated alerts.                                                                                                                                                                |
         +-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
         |:ref:`disabled <cluster_disabled>`   | It indicates whether the node is enabled or disabled in the cluster. This option must be set to ``no``.                                                                                                                                              |
         +-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

      #. Once the ``/var/ossec/etc/ossec.conf`` configuration file has been modified, enable and start the Wazuh manager service:

         .. include:: ../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

      #. Run the following command to check if the Wazuh manager is active: 

         .. include:: ../../_templates/installations/wazuh/common/check_wazuh_manager.rst

      **Wazuh server worker nodes**

      #. .. include:: ../../_templates/installations/wazuh/common/configure_wazuh_worker_node.rst

      #. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, enable and start the Wazuh manager service:

         .. include:: ../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

      #. Run the following command to check if the Wazuh manager is active: 

         .. include:: ../../_templates/installations/wazuh/common/check_wazuh_manager.rst

      #. Run the following command to check the health of the Wazuh cluster:
      
         .. code-block:: console
         
            # /var/ossec/bin/cluster_control --health
