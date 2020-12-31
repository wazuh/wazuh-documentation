.. Copyright (C) 2020 Wazuh, Inc.

:orphan:

.. _unattended_distributed_elasticsearch:

Elasticsearch & Kibana unattended installation
==============================================

This section will explain how to install Open Distro for Elasticsearch and Open Distro for Kibana using an automated script. This script will perform a health check to verify that the system has enough resources to achieve an optimal performance. This script uses the Search Guard offline TLS tool to create the certificates. 


Requirements
------------

This section aims to provide guidance about the supported operating systems as well as the minimum hardware requirements for an Elastic Stack server. 

Supported operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Elastic Stack components can be installed in the following operating systems:

- Amazon Linux 1 and 2.

- CentOS 6 or greater.

- Debian 8 or greater.

- Oracle Linux 6 or greater.

- Red Hat Enterprise Linux 6 or greater.

- Ubuntu 16 or greater.

- openSUSE Leap 42.

- SLES 12 or greater. 

- Windows Server 2012/R2 or greater. 


Hardware requirements
^^^^^^^^^^^^^^^^^^^^^

Elastic Stack can be installed as a single-node or as multi-node cluster. Kibana can either be installed in the same node as Elasticsearch, or in a dedicated host. For each Elastic Stack node, the hardware recommendations are: 

+-------------------------+-------------------------+-------------------------------+
|                         |  Minimum                |   Recommended                 |
+-------------------------+----------+--------------+--------------+----------------+
| Component               |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
+=========================+==========+==============+==============+================+
| Elastic Stack           |     4    |     2        |     16       |       8        |
+-------------------------+----------+--------------+--------------+----------------+

A 64-bit operating system is required.  

Regarding the disk space requirements, the amount of data depends on the alerts per second (APS) generated. The following table shows an estimate of disk space per agent needed to store 90 days of alerts on an Elasticsearch server depending on the type of monitored endpoints. 


+-------------------------------------------------+-----+-----------------------------+
| Monitored endpoints                             | APS | Storage in Elasticsearch    |
|                                                 |     |   (GB/90 days)              | 
+=================================================+=====+=============================+
| Servers                                         | 0.25|           3.7               |       
+-------------------------------------------------+-----+-----------------------------+
| Workstations                                    | 0.1 |           1.5               |                    
+-------------------------------------------------+-----+-----------------------------+       
| Network devices                                 | 0.5 |           7.4               |
+-------------------------------------------------+-----+-----------------------------+

For example for an environment with 80 workstations, 10 servers and 10 networks devices the storage needed for 90 days of alerts would be around 230 GB on the Elasticsearch server.



Installing Open Distro for Elasticsearch
----------------------------------------

The script allows installing both Elasticsearch and Kibana. They can be installed either together or in separate machines. The available options to run the script are:

+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| Options                       | Purpose                                                                                                       |
+===============================+===============================================================================================================+
| -e / --install-elasticsearch  | Installs Open Distro for Elasticsearch (cannot be used together with option ``-k``)                           |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -k / --install-kibana         | Installs Open Distro for Kibana (cannot be used together with option ``-e``)                                  |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -n / --node-name              | Indicates the name of the instance                                                                            |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -c / --create-certificates    | Generates the certificates for all the nodes indicated on the configuration file (only for multi-node mode)   |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -d / --debug                  | Shows the complete installation output                                                                        |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -i / --ignore-healthcheck     | Ignores the health-check                                                                                      |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -h / --help                   | Shows help                                                                                                    |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+

.. note:: Root user privileges are required to run all the commands described below. To download the script the package ``curl`` will be used.

Download the script and the configuration file. After downloading them, configure the installation and run the script. Choose the cluster mode between single-node or multi-node:

.. tabs::

  .. group-tab:: Single-node

    **Download the script and the configuration file config.yml**

      .. code-block:: console

          # curl -so ~/elastic-stack-installation.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/3074_installation_guide_new_structure/resources/open-distro/unattended-installation/distributed/elastic-stack-installation.sh 
          # curl -so ~/config.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/3074_installation_guide_new_structure/resources/open-distro/unattended-installation/distributed/templates/config.yml

    **Configure the installation** 
      
      Edit the ``~/config.yml`` file to specify the IP you want the Elasticsearch service to bind to. 

      .. note:: In order to create valid certificates for the communication between the various components of Wazuh and the Elastic Stack, external IPs must be used.

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


      In case of having more than one Wazuh server, there can be added as many nodes for their certificates creation as needed, changing the ``name`` of the certificate and the ``CN`` value. This should be indicated on the ``Clients certificates`` section: 

        .. code-block:: yaml

          - name: filebeat-X
            dn: CN=filebeat-x,OU=Docu,O=Wazuh,L=California,C=US          



    **Run the script**

      - To install Elasticsearch, run the script with the option ``-e`` and ``-n <node-name>``:

      .. code-block:: console

        # bash ~/elastic-stack-installation.sh -e -n <node_name>

      
      

  .. group-tab:: Multi-node

    **Initial node configuration and installation**

    - Download the script and the configuration file ``~/config.yml``:

      .. code-block:: console

          # curl -so ~/elastic-stack-installation.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/3074_installation_guide_new_structure/resources/open-distro/unattended-installation/distributed/elastic-stack-installation.sh 
          # curl -so ~/config.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/3074_installation_guide_new_structure/resources/open-distro/unattended-installation/distributed/templates/config_cluster.yml

    - Configure the installation:

      .. code-block:: yaml
        :emphasize-lines: 5, 8, 9, 10, 13, 14, 15, 31, 34

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
          - name: kibana
            dn: CN=kibana,OU=Docu,O=Wazuh,L=California,C=US    
          - name: filebeat
            dn: CN=filebeat,OU=Docu,O=Wazuh,L=California,C=US


        # Kibana-instance
        - <kibana_ip>

        # Wazuh-master-configuration
        - <wazuh_master_server_IP>  

      The highlighted lines indicate the values that must be replaced in the ``config.yml``. These values are: 

        - ``<elastic_cluster>``: Name of the cluster. 
        - ``<master_node_x>``: Name of the node ``X``.
        - ``<elasticsearch_ip_nodeX>``: Elasticsearch IP of the node ``X``.
        - ``<kibana_ip>``: Kibana server IP.
        - ``<wazuh_master_server_IP>``: Wazuh Server IP.

      There can be added as many Elasticsearch nodes as needed. To generate certificates for them, the ``opendistro_security.nodes_dn`` must be also updated, adding the information of these new certificates. There must be the same number of certificates rows as nodes will be on the installation.

      In case of having more than one Wazuh server, there can be added as many nodes for their certificates creation as needed, changing the ``name`` of the certificate and the ``CN`` value. This should be indicated on the ``Clients certificates`` section: 

      .. code-block:: yaml

        - name: filebeat-X
          dn: CN=filebeat-x,OU=Docu,O=Wazuh,L=California,C=US                

    - To install Elasticsearch, run the script with the option ``-e``, ``-c``, and ``-n <node_name>`` (this name must be the same used in ``config.yml`` for the certificate creation, e.g. ``master_node_1``):

      .. code-block:: console

        # bash ~/elastic-stack-installation.sh -e -c -n <node_name>


    **Subsequent nodes installation**

      During the installation of the Elasticsearch initial node, the certificates were created and placed at ``~/certs.tar``. Before installing the subsequent nodes, this file must be placed on each involved node. After placing the ``certs.tar`` in the subsequent node, the installation can start:

    - Download the script:

      .. code-block:: console

        # curl -so ~/elastic-stack-installation.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/3074_installation_guide_new_structure/resources/open-distro/unattended-installation/distributed/elastic-stack-installation.sh 


    - In order to install the subsequent nodes, run the script with the option ``-e`` and ``-n <node_name>`` (this name must be the same used in ``config.yml`` for the certificate creation, e.g. ``master_node_x``):

      .. code-block:: console

        # bash ~/elastic-stack-installation.sh -e -n <node_name>   


    **Cluster initialization**

      Once all the nodes on the cluster have been started, run the ``securityadmin`` script  on the **initial node** to load the new certificates information and start the cluster. To run this command, the value ``<elasticsearch_IP>`` must be replaced by the Elasticsearch installation IP:

      .. code-block:: console

        # /usr/share/elasticsearch/plugins/opendistro_security/tools/securityadmin.sh -cd /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/ -icl -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin.key -h <elasticsearch_IP>
           
    

Configuring Elasticsearch
^^^^^^^^^^^^^^^^^^^^^^^^^

Once Elasticsearch is installed, the script will start the services automatically. The certificates will be placed at ``~/certs.tar``. This file must be copied into the :ref:`Wazuh server <unattended_distributed_wazuh>` to extract the certificates needed.

If Kibana will be installed in a different server, the ``certs.tar`` file should be also copied into its server to extract the corresponding certificates.


.. _install_kibana_unattended:

Installing Kibana
-----------------

#. Download the script. In case of installing Kibana on the same server as Open Distro for Elasticsearch, this step must be skipped:

    .. code-block:: console

      # curl -so ~/elastic-stack-installation.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/3074_installation_guide_new_structure/resources/open-distro/unattended-installation/distributed/elastic-stack-installation.sh

#. Run the script:

    .. code-block:: console

      # bash ~/elastic-stack-installation.sh -k -n <node_name>

    The following values must be replaced:

      - ``node_name``: Name of the instance (this name must be the same used in ``config.yml`` for the certificate creation, e.g. ``kibana``).

#. Access the web interface: 

    .. code-block:: none

      URL: https://<kibana_ip>
      user: admin
      password: admin  
  

Upon the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or,  for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser.  Alternatively, a certificate from a trusted authority can be configured. 

.. note:: If Kibana is accessed before installing the Wazuh server, the Wazuh Kibana plugin will indicate that it cannot establish a connection with the Wazuh API. Proceed with the Wazuh server installation to remediate this.

.. _configure_kibana_unattended:

Configuring Kibana
^^^^^^^^^^^^^^^^^^

It is highly recommended to change Elasticsearch’s default passwords for the users found at the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. More information about this process can be found :ref:`here <change_elastic_pass>`.

Once Kibana is running it is necessary to assign each user its corresponding role. To learn more visit the :ref:`Setting up the Wazuh Kibana plugin <connect_kibana_app>` section. 


Next steps
----------

Once the Elastic Stack environment is ready, the Wazuh server can be installed. The Wazuh server installation guide can be found :ref:`here<unattended_distributed_wazuh>`.

Uninstall
---------

In case you need to uninstall the Elastic Stack components follow the instructions below:  



Uninstall Elasticsearch
^^^^^^^^^^^^^^^^^^^^^^^


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_elasticsearch.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_elasticsearch.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/elastic/zypp/uninstall_elasticsearch.rst




Uninstall Kibana
^^^^^^^^^^^^^^^^


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_kibana.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_kibana.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/elastic/zypp/uninstall_kibana.rst   
