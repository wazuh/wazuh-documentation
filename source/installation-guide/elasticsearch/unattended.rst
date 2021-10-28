.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_indexer_unattended:

Installing Elasticsearch in unattended mode
===============================================

Install and configure Elasticsearch, a highly scalable full-text search engine. It offers advanced security, alerting, index management, deep performance analysis, and several other features.


Elasticsearch cluster installation
----------------------------------

Install and configure Elasticsearch as a single-node or multi-node cluster according to your environment needs. If you want to install a single-node cluster, follow the instructions to install the initial node.

The installation process is divided into three stages. 

#. Initial node installation and configuration

#. Subsequent nodes installation and configuration for multi-node clusters   

#. Cluster initialization for multi-node clusters

.. note:: Root user privileges are required to run the commands described below.


1. Initial node installation and configuration
-----------------------------------------------
.. raw:: html

    <div class="accordion-section open">

Install and configure the initial node. During this stage, the SSL certificates to encrypt communications between the Wazuh components are generated. These certificates are later deployed to other Wazuh instances. 

#. Download the unattended installation script and the configuration file. 

      .. code-block:: console

          # curl -so ~/unattended-installation.sh https://packages.wazuh.com/resources/4.2/unattended-installation/unattended-installation.sh      
          # curl -so ~/config.yml https://packages.wazuh.com/resources/4.2/unattended-installation/templates/config.yml

    
#. Edit ``~/config.yml`` and replace the node names and IP values with the corresponding names and IP addresses, including all the Wazuh server, Elasticsearch, and Kibana nodes. Add as many node fields as needed.

      .. code-block:: yaml
        :emphasize-lines: 4, 8, 15, 17, 27, 29

        ## Elasticsearch configuration
        Elasticsearch nodes:
          cluster.initial_master_nodes:
                  - <master_node_1>
                  # - <master_node_2>
                  # - <master_node_3>
          discovery.seed_hosts:
                  - <elasticsearch_ip_node1>
                  # - <elasticsearch_ip_node2>
                  # - <elasticsearch_ip_node3>

        # Wazuh servers configuration
        Wazuh servers IPs:
          name:
            - <node_name>
          ip:
            - <wazuh_master_server_IP>
          master: true
          # name:
          #   - <node_name>
          # ip:
          #   - <wazuh_worker_server_IP>

        # Kibana configuration
        Kibana IP:
          name:
            - <node-name>
          ip:
            - <kibana_ip>



#. Run the script with the options ``-e``, ``-en <node_name>``, and ``-c`` to install Open Distro for Elasticsearch and generate the SSL certificates. The node name must be the same used in ``config.yml`` for the certificate creation, for example, ``master-node-1``.

      .. code-block:: console

        # bash ~/unattended-installation.sh -e -en <node_name> -c


    Options available when running the script:

    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | Options                       | Purpose                                                                                                        |
    +===============================+================================================================================================================+
    | -e / --install-elasticsearch  | Installs Open Distro for Elasticsearch. Must be used with option ``-ename <node-name>``.                       |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -en / --elastic-node-name     | Indicates the name of the Elasticsearch instance.                                                              |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -c / --create-certificates    | Generates the certificates for all the indicated nodes.                                                        |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -o / --overwrite              | Overwrites the existing installation.                                                                          |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -r / --uninstall              | Removes the installation.                                                                                      |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -v / --verbose                | Shows the complete installation output.                                                                        |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -i / --ignore-health-check    | Ignores the health check.                                                                                      |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -h / --help                   | Shows *help*.                                                                                                  |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+        

#.  Copy ``~/certs.tar`` to all the servers of the distributed deployment, including the Wazuh server, Elasticsearch and Kibana nodes. This can be done by using, for example, ``scp``.

You now have installed and configured the initial Elasticsearch node. 

    - If you want a single-node cluster, everything is set and you can proceed directly with :ref:`installing the Wazuh server <wazuh_server_installation>`.
 
    - If you want to install a multi-node cluster, expand the instructions below to install and configure subsequent nodes, and then initialize the cluster. 

2. Subsequent nodes installation and configuration for multi-node clusters 
--------------------------------------------------------------------------
.. raw:: html

    <div class="accordion-section">

Install and configure subsequent nodes of your multi-node cluster. Make sure that a copy of ``certs.tar``, created during the initial node installation, is placed in the root home folder ``(~/)``.


#. Download the script.

      .. code-block:: console

        # curl -so ~/unattended-installation.sh https://packages.wazuh.com/resources/4.2/unattended-installation/unattended-installation.sh   


#. Run the script with the options ``-e`` and ``-en <node_name>`` to install Open Distro for Elasticsearch. The node name must be the same used in ``config.yml`` for the certificate creation, for example, ``master-node-2``.

      .. code-block:: console

        # bash ~/unattended-installation.sh -e -en <node_name> 


Repeat this process on each Elasticsearch node and proceed with initializing the cluster.             


3. Cluster initialization for multi-node clusters
-------------------------------------------------
.. raw:: html

    <div class="accordion-section">

The final stage of the process for installing an Elasticsearch multi-node cluster consists in running the security admin script. 

Run the ``securityadmin`` script on the initial node to load the new certificates information and start the cluster. Replace ``<elasticsearch_IP>`` with the Elasticsearch installation IP and run the command.

  .. code-block:: console

    # export JAVA_HOME=/usr/share/elasticsearch/jdk/ && /usr/share/elasticsearch/plugins/opendistro_security/tools/securityadmin.sh -cd /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/ -icl -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin-key.pem -h <elasticsearch_IP>


Next steps
----------

Elasticsearch is now successfully installed and you can proceed with installing the Wazuh server. To perform this action, see the :ref:`Wazuh server <wazuh_server_unattended>` section.

