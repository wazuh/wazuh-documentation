.. Copyright (C) 2022 Wazuh, Inc.
.. meta::
  :description: Check out how to install Open Distro for Elasticsearch and Open Distro for Kibana using a script that automates the installation process.
  
.. _unattended_distributed_elasticsearch:

Elasticsearch & Kibana unattended installation
==============================================

You can install Open Distro for Elasticsearch and Open Distro for Kibana using an automated script. This script performs a health check to verify that the system has enough resources to achieve optimal performance.

For more information on system resources, see the :ref:`Requirements <installation_requirements>` section.


.. note:: Root user privileges are required to run all the commands. To download the script, the package ``curl`` is used.


The script allows installing both Elasticsearch and Kibana, either together or on separate machines. There are options available for you to use when running the script:

+-------------------------------+----------------------------------------------------------------------------------------------------------------+
| Options                       | Purpose                                                                                                        |
+===============================+================================================================================================================+
| -e / --install-elasticsearch  | Installs Open Distro for Elasticsearch (cannot be used together with option ``-k``)                            |
+-------------------------------+----------------------------------------------------------------------------------------------------------------+
| -k / --install-kibana         | Installs Open Distro for Kibana (cannot be used together with option ``-e``)                                   |
+-------------------------------+----------------------------------------------------------------------------------------------------------------+
| -n / --node-name              | Name of the node                                                                                               |
+-------------------------------+----------------------------------------------------------------------------------------------------------------+
| -c / --create-certificates    | Generates the certificates for all the indicated nodes                                                         |
+-------------------------------+----------------------------------------------------------------------------------------------------------------+
| -d / --debug                  | Shows the complete installation output                                                                         |
+-------------------------------+----------------------------------------------------------------------------------------------------------------+
| -i / --ignore-healthcheck     | It ignores the health-check                                                                                    |
+-------------------------------+----------------------------------------------------------------------------------------------------------------+
| -h / --help                   | Shows help                                                                                                     |
+-------------------------------+----------------------------------------------------------------------------------------------------------------+

Installing Open Distro for Elasticsearch
----------------------------------------

To install Open Distro for Elasticsearch, you need to choose the cluster mode first and follow the installation process. 

Choose the cluster mode between single-node or multi-node:

.. tabs::

  .. group-tab:: Single-node

    **Download the script and the configuration file config.yml**

      .. code-block:: console

          # curl -so ~/elastic-stack-installation.sh https://packages.wazuh.com/resources/4.2/open-distro/unattended-installation/distributed/elastic-stack-installation.sh 
          # curl -so ~/config.yml https://packages.wazuh.com/resources/4.2/open-distro/unattended-installation/distributed/templates/config.yml

    **Configure the installation** 
      
      Edit the ``config.yml`` file to specify the IP address you want the Elasticsearch service to bind to. 

      .. note:: To create valid certificates for the communication between the various components of Wazuh and the Elastic Stack, external IP addresses must be used.

      .. code-block:: yaml
        :emphasize-lines: 5, 18, 21

        ## Single-node configuration

        ## Elasticsearch configuration

        network.host: <elasticsearch_ip>


        # Clients certificates
        clients:
          - name: admin
            dn: CN=admin,OU=Docu,O=Wazuh,L=California,C=US
            admin: true 
          - name: filebeat
            dn: CN=filebeat,OU=Docu,O=Wazuh,L=California,C=US


        # Kibana-instance
        - <kibana_ip>

        # Wazuh-master-configuration
        - <wazuh_master_server_IP>


      If you have more than one Wazuh server, you can add as many nodes as needed by changing the ``name`` of the certificate and the ``CN`` value. You need to make these changes in the ``Clients certificates`` section: 

        .. code-block:: yaml

          - name: filebeat-X
            dn: CN=filebeat-x,OU=Docu,O=Wazuh,L=California,C=US          



    **Run the script**

      - To install Elasticsearch, run the script with the options ``-e`` and ``-n <node-name>``:

      .. code-block:: console

        # bash ~/elastic-stack-installation.sh -e -n <node_name>

      

  .. group-tab:: Multi-node

    **Initial node configuration and installation**

    - Download the script and the configuration file ``config.yml``:

      .. code-block:: console

          # curl -so ~/elastic-stack-installation.sh https://packages.wazuh.com/resources/4.2/open-distro/unattended-installation/distributed/elastic-stack-installation.sh 
          # curl -so ~/config.yml https://packages.wazuh.com/resources/4.2/open-distro/unattended-installation/distributed/templates/config_cluster.yml

    - Configure the installation:

      .. code-block:: yaml
        :emphasize-lines: 5, 8, 9, 10, 13, 14, 15, 29, 32

        ## Multi-node configuration

        ## Elasticsearch configuration

        cluster.name: <elastic_cluster>

        cluster.initial_master_nodes:
                - <master_node_1>
                - <master_node_2>
                - <master_node_3>

        discovery.seed_hosts:
                - <elasticsearch_ip_node1>
                - <elasticsearch_ip_node2>
                - <elasticsearch_ip_node3>

        ## Certificates creation
                  
        # Clients certificates
        clients:
          - name: admin
            dn: CN=admin,OU=Docu,O=Wazuh,L=California,C=US
            admin: true  
          - name: filebeat
            dn: CN=filebeat,OU=Docu,O=Wazuh,L=California,C=US


        # Kibana-instance
        - <kibana_ip>

        # Wazuh-master-configuration
        - <wazuh_master_server_IP>  

      The highlighted lines indicate the values that must be replaced in the ``config.yml``. These values are: 

        - ``<elastic_cluster>``: Name of the cluster 
        - ``<master_node_x>``: Name of the node ``X``
        - ``<elasticsearch_ip_nodeX>``: Elasticsearch IP address of the node ``X``
        - ``<kibana_ip>``: Kibana server IP address
        - ``<wazuh_master_server_IP>``: Wazuh Server IP address

      You can add as many Elasticsearch nodes as needed. To generate certificates for them, the ``opendistro_security.nodes_dn`` must be also updated, adding the information of the new certificates. There must be the same number of certificates rows as nodes are on the installation.

      If you have more than one Wazuh server, you can add as many nodes as needed and certificates are created for each of them. To do this, change the ``name`` of the certificate and the ``CN`` value in the ``Clients certificates`` section: 

      .. code-block:: yaml

        - name: filebeat-X
          dn: CN=filebeat-x,OU=Docu,O=Wazuh,L=California,C=US                

    - To install Elasticsearch, run the script with the options ``-e``, ``-c``, and ``-n <node_name>``. The name of the node must be the same used in ``config.yml`` for the certificate creation, e.g. ``master_node_1``:

      .. code-block:: console

        # bash ~/elastic-stack-installation.sh -e -c -n <node_name>

    **Subsequent nodes installation**

      During the installation of the Elasticsearch initial node, the certificates are created and placed at ``~/certs.tar``. Before installing the subsequent nodes, this file must be placed on each involved node. After placing the ``certs.tar`` in the subsequent node, the installation can start:

    - Download the script:

      .. code-block:: console

        # curl -so ~/elastic-stack-installation.sh https://packages.wazuh.com/resources/4.2/open-distro/unattended-installation/distributed/elastic-stack-installation.sh 


    - In order to install the subsequent nodes, run the script with the options ``-e`` and ``-n <node_name>``. The name of the node must be the same used in ``config.yml`` for the certificate creation, e.g. ``master_node_x``:

      .. code-block:: console

        # bash ~/elastic-stack-installation.sh -e -n <node_name>   

    **Cluster initialization**

      Once all the nodes of the cluster are started, run the ``securityadmin`` script  on the **initial node** to load the new certificates information and start the cluster. To run this command, the value ``<elasticsearch_IP>`` must be replaced by the Elasticsearch installation IP:

      .. code-block:: console

        # export JAVA_HOME=/usr/share/elasticsearch/jdk/ && /usr/share/elasticsearch/plugins/opendistro_security/tools/securityadmin.sh -cd /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/ -icl -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin.key -h <elasticsearch_IP>
           
    

.. note:: The Open Distro for Elasticsearch performance analyzer plugin is removed during the installation to prevent any negative impact on system resources. 

Configuring Elasticsearch
^^^^^^^^^^^^^^^^^^^^^^^^^

Once Elasticsearch is installed, the script starts the services automatically. The certificates are placed at ``~/certs.tar``. This file must be copied into the :ref:`Wazuh server <unattended_distributed_wazuh>` to extract the certificates needed.

In case Kibana is installed on a different server, the ``certs.tar`` file should be also copied into the Wazuh server to extract the corresponding certificates.


.. _install_kibana_unattended:

Installing Kibana
-----------------

#. Download the script. Skip this step if you are installing Kibana on the same server as Open Distro for Elasticsearch:

    .. code-block:: console

      # curl -so ~/elastic-stack-installation.sh https://packages.wazuh.com/resources/4.2/open-distro/unattended-installation/distributed/elastic-stack-installation.sh

#. Run the script:

    .. code-block:: console

      # bash ~/elastic-stack-installation.sh -k -n <node_name>

    The following values must be replaced:

      - ``node_name``: Name of the instance. This name must be the same used in ``config.yml`` for the certificate creation, e.g. ``kibana``. 

#. Access the web interface: 

    .. code-block:: none

      URL: https://<kibana_ip>
      user: admin
      password: admin  
  

Upon the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or,  for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser.  Alternatively, a certificate from a trusted authority can be configured. 

.. note:: If Kibana is accessed before installing the Wazuh server, the Wazuh Kibana plugin indicates that it cannot establish a connection with the Wazuh API. Proceed with the Wazuh server installation to remediate this.

.. _configure_kibana_unattended:


.. note:: It is highly recommended to change the default passwords of Elasticsearch for the users' passwords. To perform this action, see the :ref:`Elasticsearch tuning <change_elastic_pass>` section.

If you need to uninstall Elasticsearch and Kibana, visit the :ref:`Uninstalling <user_manual_uninstall_wazuh_installation_open_distro>` section.

Next steps
----------

Once the Elastic Stack environment is ready, the Wazuh server can be installed. To do this, follow the steps described in the :ref:`Wazuh server <unattended_distributed_wazuh>` section of the installation guide.
