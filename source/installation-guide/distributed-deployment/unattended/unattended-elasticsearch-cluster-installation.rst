.. Copyright (C) 2020 Wazuh, Inc.

.. _unattended_distributed_elasticsearch:

Elasticsearch & Kibana unattended installation
==============================================

This section will explain how to install Open Distro for Elasticsearch and Open Distro for Kibana using an automated script. This script will perform a health check to verify that the system has enough resources to ensure a proper performance of the installation. For more information, please visit the :ref:`requirements <distributed_requirements>` section.

Run the script
--------------

.. note:: Root user privileges are required to run all the commands described below.

In order to download the script, ``curl`` package must be installed on the system:

.. tabs::

  .. group-tab:: Yum

    .. code-block:: console

        # yum install curl


  .. group-tab:: APT

    .. code-block:: console

        # apt install curl

The script allows installing both Elasticsearch and Kibana. They can be installed either together or in separate machines. The available options to run the script are:

+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| Options                       | Purpose                                                                                                       |
+===============================+===============================================================================================================+
| -e / --install-elasticsearch  | Installs Open Distro for Elasticsearch                                                                        |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -k / --install-kibana         | Installs Open Distro for Kibana                                                                               |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -c / --create-certificates    | Generates the certificates for all the nodes indicated on the configuration file (only for multi-node mode)   |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -i / --ignore-healthcheck     | Ignores the health-check                                                                                      |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -h / --help                   | Shows help                                                                                                    |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+

Download the script and the configuration file. After downloading them, configure the installation and run the script. Choose between single-node or multi-node depending on the type of installation:

.. tabs::

  .. group-tab:: Single-node

    **Download the script and the configuration file config.yml**

      .. code-block:: console

          # curl -so ~/elastic-stack-installation.sh https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/unattended-installation/distributed/elastic-stack-installation.sh 
          # curl -so ~/config.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/unattended-installation/distributed/templates/config.yml

    **Configure the installation** 

      .. code-block:: yaml
        :emphasize-lines: 4, 14, 27, 28, 31

        ## Single-node configuration

        ## Elasticsearch configuration
        network.host: <elasticsearch_ip>
        node.name: node-1
        cluster.initial_master_nodes: node-1

        ## Certificates creation
        # Nodes certificates
        nodes:
          - name: node-1
            dn: CN=node-1,OU=Docu,O=Wazuh,L=California,C=US
            ip:
              - <elasticsearch_ip>
        # Clients certificates
        clients:
          - name: admin
            dn: CN=admin,OU=Docu,O=Wazuh,L=California,C=US
            admin: true
          - name: kibana
            dn: CN=kibana,OU=Docu,O=Wazuh,L=California,C=US    
          - name: filebeat
            dn: CN=filebeat,OU=Docu,O=Wazuh,L=California,C=US


        ## Kibana configuration
        server.host: "<kibana-ip>"
        elasticsearch.hosts: https://<elasticsearch-ip>:9200

        ## Wazuh master configuration
        url: https://<wazuh_master_server_IP>

      The highlighted lines indicates the values that must be replaced. These values are: 

        - ``<elasticsearch_ip>``: Elasticsearch IP.
        - ``<kibana_ip>``: Kibana server IP.
        - ``<wazuh_master_server_IP>``: Wazuh Server IP.

      In case of having more than one Wazuh server, there can be added as much nodes for their certificates creation as needed, changing the ``name`` of the certificate and the ``CN`` value. This should be indicated on the ``Clients certificates`` section: 

        .. code-block:: yaml

          - name: filebeat-X
            dn: CN=filebeat-x,OU=Docu,O=Wazuh,L=California,C=US          



    **Run the script**

      - To install Elasticsearch, run the script with the option ``-e``:

      .. code-block:: console

        # bash ~/elastic-stack-installation.sh -e 

      - To install Kibana, run the script with the option ``-k``:

      .. code-block:: console

        # bash ~/elastic-stack-installation.sh -k

      - To install Elasticsearch and Kibana together on the same server, run the script with the options ``-e`` and ``-k``:

      .. code-block:: console

        # bash ~/elastic-stack-installation.sh -e -k      


  .. group-tab:: Multi-node

    **Download the script and the configuration file config.yml**

      .. code-block:: console

          # curl -so ~/elastic-stack-installation.sh https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/unattended-installation/distributed/elastic-stack-installation.sh 
          # curl -so ~/config.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/unattended-installation/distributed/templates/config_cluster.yml

    **Configure the installation**

      .. code-block:: yaml
        :emphasize-lines: 4, 5, 6, 8, 9, 10, 12, 13, 14, 26, 30, 34, 47, 48, 51

        ## Multi-node configuration

        ## Elasticsearch configuration
        network.host: <elasticsearch_ip>
        node.name: <node_name>
        cluster.name: <elastic_cluster>
        cluster.initial_master_nodes:
                - <master_node_1>
                - <master_node_2>
                - <master_node_3>
        discovery.seed_hosts:
                - <elasticsearch_ip_node1>
                - <elasticsearch_ip_node2>
                - <elasticsearch_ip_node3>
        opendistro_security.nodes_dn:
                - CN=node-1,OU=Docu,O=Wazuh,L=California,C=US
                - CN=node-2,OU=Docu,O=Wazuh,L=California,C=US
                - CN=node-3,OU=Docu,O=Wazuh,L=California,C=US     

        ## Certificates creation
        # Nodes certificates
        nodes:
          - name: node-1
            dn: CN=node-1,OU=Docu,O=Wazuh,L=California,C=US
            ip:
              - <elasticsearch_ip_1>
          - name: node-2
            dn: CN=node-2,OU=Docu,O=Wazuh,L=California,C=US
            ip:
              - <elasticsearch_ip_2>
          - name: node-3
            dn: CN=node-3,OU=Docu,O=Wazuh,L=California,C=US
            ip:
              - <elasticsearch_ip_3>            
        # Clients certificates
        clients:
          - name: admin
            dn: CN=admin,OU=Docu,O=Wazuh,L=California,C=US
            admin: true
          - name: kibana
            dn: CN=kibana,OU=Docu,O=Wazuh,L=California,C=US    
          - name: filebeat
            dn: CN=filebeat,OU=Docu,O=Wazuh,L=California,C=US


        ## Kibana configuration
        server.host: "<kibana-ip>"
        elasticsearch.hosts: https://<elasticsearch-ip>:9200

        ## Wazuh master configuration
        url: https://<wazuh_master_server_IP>   

      The highlighted lines indicates the values that must be replaced. These values are: 

        - ``<elasticsearch_ip>``: Elasticsearch IP.
        - ``<node_name>``: Name of the node
        - ``<elastic_cluster>``: Name of the cluster. This value must be the same in all the involved nodes.
        - ``<master_node_x>``: Name of the node ``X``.
        - ``<elasticsearch_ip_nodeX>``: Elasticsearch IP of the node ``X``.
        - ``<kibana_ip>``: Kibana server IP.
        - ``<wazuh_master_server_IP>``: Wazuh Server IP.

      There can be added as many Elasticsearch nodes as needed. To generate certificates for them, the ``opendistro_security.nodes_dn`` must be also updated, adding the information of these new certificates. There must be the same number of certificates rows as nodes will be on the installation.

      In case of having more than one Wazuh server, there can be added as many nodes for their certificates creation as needed, changing the ``name`` of the certificate and the ``CN`` value. This should be indicated on the ``Clients certificates`` section: 

        .. code-block:: yaml

          - name: filebeat-X
            dn: CN=filebeat-x,OU=Docu,O=Wazuh,L=California,C=US                

    **Run the script**

      - To install Elasticsearch, run the script with the option ``-e``:

      .. code-block:: console

        # bash ~/elastic-stack-installation.sh -e -c

      The flag ``-c`` can be added to generate the certificates. This must be done in only one of the nodes of Elasticsearch.

      - To install Kibana, run the script with the option ``-k``:

      .. code-block:: console

        # bash ~/elastic-stack-installation.sh -k

      - To install Elasticsearch and Kibana together on the same server, run the script with the options ``-e`` and ``-k``:

      .. code-block:: console

        # bash ~/elastic-stack-installation.sh -e -k -c              



Configure Elasticsearch
-----------------------

After the installation of Elasticsearch, some steps must be done manually. Choose the corresponding tab depending on the type of installation:

.. tabs::

  .. group-tab:: Single-node

    Once Elasticsearch is installed, the script will start the services automatically. The certificates will be placed at ``/etc/elasticsearch/certs/certs.tar``. This file must be copied into the :ref:`Wazuh server <unattended_distributed_wazuh>` to extract the certificates needed.

    In case that Kibana was installed in a different server, the certs.tr file should be also copied into its server to extract the :ref:`corresponding certificates <configure_kibana_unattended>`.


  .. group-tab:: Multi-node

    Once Elasticsearch has been installed, the certificates must be placed on their corresponding server. If the installation was run using the option ``-c``, the Elasticsearch service will be automatically started. On the other hand, the rest of the nodes where the certificates were not created, will not start the service since they need their corresponding certificates to start:

    Copy the  ``certs.tar`` file into each Elasticsearch node, except the master node, for example, using ``scp``. This guide assumes that the file is placed in ~/ (home user folder).

    The ``X`` must be replaced with the number used in the certificate name defined for the corresponding Elasticsearch server:

    .. code-block:: console

      # mv ~/certs.tar /etc/elasticsearch/certs/
      # cd /etc/elasticsearch/certs/
      # tar -xf certs.tar node-X.pem node-X.key node-X_http.pem node-X_http.key root-ca.pem
      # mv /etc/elasticsearch/certs/node-X.pem /etc/elasticsearch/certs/elasticsearch.pem
      # mv /etc/elasticsearch/certs/node-X.key /etc/elasticsearch/certs/elasticsearch.key
      # mv /etc/elasticsearch/certs/node-X_http.pem /etc/elasticsearch/certs/elasticsearch_http.pem
      # mv /etc/elasticsearch/certs/node-X_http.key /etc/elasticsearch/certs/elasticsearch_http.key

    When the certificates have been copied, the Elasticsearch service can be started:

    .. include:: ../../../_templates/installations/elastic/common/enable_elasticsearch.rst

    Once all the nodes on the cluster have been started, run the ``securityadmin`` script to load the new certificates information and start the cluster. To run this command, the value ``<elasticsearch_IP>`` must be replaced by the Elasticsearch installation IP:

    .. code-block:: console

      # cd /usr/share/elasticsearch/plugins/opendistro_security/tools/
      # ./securityadmin.sh -cd ../securityconfig/ -icl -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin.key -h <elasticsearch_IP>  



.. _configure_kibana_unattended:

Configure Kibana
----------------

When the script finishes, some steps must be done manually to finish the installation. Choose the corresponding tab depending on the type of installation:

.. tabs::


  .. group-tab:: Elasticsearch single-node

    If Kibana was installed on the same server as Elasticsearch, it will be ready to use once the script finishes. On the other hand, if Kibana was installed on a different host, some steps must be done manually to finish the installation:

    #. Copy the ``certs.tar`` file from the Elasticsearch’s node into the server where Kibana has been installed. It can be copied using ``scp``. This guide assumes that the file is placed in ~/ (home user folder):

        .. code-block:: console

          # mv ~/certs.tar /etc/kibana/certs/
          # cd /etc/kibana/certs/
          # tar -xf certs.tar kibana.pem kibana.key root-ca.pem

    #. Enable and start the Kibana service:

      .. include:: ../../../_templates/installations/elastic/common/enable_kibana.rst           



  .. group-tab:: Elasticsearch multi-node

    To finish Kibana's installation, some steps must be done manually. These steps will vary on whether the installation was made on the same server as Elasticsearch or in a different server:

    **Kibana installed on the same server as Elasticsearch**

      - Copy Kibana's certificates into ``/etc/kibana/certs/`` directory:

      .. code-block:: console

        # mkdir /etc/kibana/certs/
        # cp /etc/elasticsearch/certs/elasticsearch.pem /etc/kibana/certs/kibana.pem
        # cp /etc/elasticsearch/certs/elasticsearch.key /etc/kibana/certs/kibana.key

    **Kibana installed on a different server from Elasticsearch**

      - Copy the ``certs.tar`` file from the Elasticsearch’s node into the server where Kibana has been installed. It can be copied using ``scp``. This guide assumes that the file is placed in ~/ (home user folder):

          .. code-block:: console

            # mv ~/certs.tar /etc/kibana/certs/
            # cd /etc/kibana/certs/
            # tar -xf certs.tar kibana.pem kibana.key root-ca.pem

    Once the certificates have been palced, Kibana can be started:

      .. include:: ../../../_templates/installations/elastic/common/enable_kibana.rst           
          

With the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. This can be accepted by clicking on ``Advanced options`` to add an exception or, for increased security, by importing the ``root-ca.pem`` previously created to the Certificate Manager of each browser that will access the Kibana interface or use a certificate from a trusted authority.

.. note:: The Kibana service listens to port ``443``. The browser address is: ``https://<kibana_ip>`` replacing ``<kibana_ip>`` by the Kibana server IP. The default user and password to access Kibana is ``wazuh_user``.

It is highly recommended to change Elasticsearch’s default passwords for the users found at the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. More information about this process can be found :ref:`here <change_elastic_pass>`.

With the first access attempt, the Wazuh Kibana plugin may prompt a message that indicates that the Wazuh API is not working. To solve this issue edit the file ``/usr/share/kibana/optimize/wazuh/config/wazuh.yml`` and replace the ``url`` value by the Wazuh's server IP in which the Wazuh API is installed:

.. code-block:: yaml

  hosts:
    - default:
       url: <Wazuh_server_IP>
       port: 55000
       user: foo
       password: bar


Next steps
~~~~~~~~~~

Once the Elastic Stack environment is ready, the Wazuh server can be installed. The Wazuh server installation guide can be found :ref:`here<unattended_distributed_wazuh>`.
